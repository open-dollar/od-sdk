import { BigNumber } from 'ethers'
import { ContractApis } from './api/contract-apis'
import { TokenList } from './contracts/addreses'

import {
    IDebtAuction,
    ISurplusAuction,
    IAuctionBidder,
    bidEventToBid,
    collateralBidEventToBid,
    collateralStartAuctionEventToAuction,
    debtStartAuctionEventToAuction,
    surplusStartAuctionEventToAuction,
    ICollateralAuction,
    BuyCollateralEventQuery,
    StartAuctionEventQuery,
} from './schema/auction'
import {
    IncreaseBidSizeEventFilter as SurplusIncreaseBidSizeEventFilter,
    RestartAuctionEventFilter as SurplusRestartAuctonEventFilter,
    SettleAuctionEventFilter as SurplusSettleAuctionEventFilter,
    StartAuctionEventFilter as SurplusStartAuctionEventFilter,
} from './typechained/SurplusAuctionHouse'

import {
    DecreaseSoldAmountEventFilter as DebtDecreaseSoldAmountEventFilter,
    RestartAuctionEventFilter as DebtRestartAuctonEventFilter,
    SettleAuctionEventFilter as DebtSettleAuctionEventFilter,
    StartAuctionEventFilter as DebtStartAuctionEventFilter,
} from './typechained/DebtAuctionHouse'

const fetchCollateralAuctionHouseEvents = async (address: string, query: string): Promise<Array<any>> => {
    const graphqlQuery = {
        operationName: 'CollateralAuctionEvents',
        query,
    }
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: '<token>',
        },
        body: JSON.stringify(graphqlQuery),
    }
    const response = await fetch('https://api.studio.thegraph.com/query/52770/od-test/v0.0.11', options)
    const data = await response.json()
    if (data.errors) console.log(data.errors)
    if (data?.data?.collateralAuctionHouseStartAuctions) return data?.data?.collateralAuctionHouseStartAuctions
    return []
}

const fetchStartEvents = async (address: string): Promise<Array<StartAuctionEventQuery>> => {
    const query = `query CollateralAuctionHouseStartAuctions {
        collateralAuctionHouseStartAuctions(
            orderBy: blockNumber
            orderDirection: desc
            where: {address: "${address}"}
        ) {
            address
            _id: _auctionId
            _amountToRaise
            _amountToSell
            _auctionId
            transactionHash
            blockTimestamp
        }
    }`
    return fetchCollateralAuctionHouseEvents(address, query)
}
const fetchBuyEvents = async (address: string): Promise<Array<BuyCollateralEventQuery>> => {
    const query = `query CollateralAuctionHouseBuyCollaterals {
        collateralAuctionHouseBuyCollaterals(
            orderBy: blockNumber
            orderDirection: desc
            where: {address: "${address}"}
        ){
            _id: _auctionId
            _bidder
            _raisedAmount
            _soldAmount
            transactionHash
            blockTimestamp
          }
    }`
    return fetchCollateralAuctionHouseEvents(address, query)
}
const fetchSettleEvents = async (address: string): Promise<Array<BuyCollateralEventQuery | StartAuctionEventQuery>> => {
    const query = `query CollateralAuctionHouseStartEvents {
        collateralAuctionHouseSettleAuctions(
            orderBy: blockNumber
            orderDirection: desc
            where: {address: "${address}"}
          ){
            blockTimestamp
            _leftoverReceiver
            _leftoverCollateral
            _auctionId
            transactionHash
          }
    }`
    return fetchCollateralAuctionHouseEvents(address, query)
}

/**
 * The main package used to interact with the GEB system. Includes [[deployProxy |helper functions]] for safe
 *  management and the [[contracts | contract interface object]] to directly call smart contracts.
 */
export class Auctions {
    protected surplusStartAuctionFilter: SurplusStartAuctionEventFilter
    protected surplusBidFilter: SurplusIncreaseBidSizeEventFilter
    protected surplusRestartAuctionFilter: SurplusRestartAuctonEventFilter
    protected surplusSettleAuctionFilter: SurplusSettleAuctionEventFilter

    protected debtStartAuctionFilter: DebtStartAuctionEventFilter
    protected debtDecreaseSoldAmountFilter: DebtDecreaseSoldAmountEventFilter
    protected debtRestartAuctionFilter: DebtRestartAuctonEventFilter
    protected debtSettleAuctionFilter: DebtSettleAuctionEventFilter

    /**
     * Constructor for the main Geb.js object.
     * @param  {GebDeployment} network Either `'kovan'`, `'mainnet'` or an actual list of contract addresses.
     * @param  {GebProviderInterface|ethers.providers.Provider} provider Either a Ethers.js provider or a Geb provider (support for Web3 will be added in the future)
     */
    constructor(public contracts: ContractApis, public tokenList: TokenList) {
        this.tokenList = tokenList

        // Surplus Auctions
        this.surplusStartAuctionFilter = this.contracts.surplusAuctionHouse.filters.StartAuction()
        this.surplusBidFilter = this.contracts.surplusAuctionHouse.filters.IncreaseBidSize()
        this.surplusRestartAuctionFilter = this.contracts.surplusAuctionHouse.filters.RestartAuction()
        this.surplusSettleAuctionFilter = this.contracts.surplusAuctionHouse.filters.SettleAuction()

        // Debt Auctions
        this.debtStartAuctionFilter = this.contracts.debtAuctionHouse.filters.StartAuction()
        this.debtDecreaseSoldAmountFilter = this.contracts.debtAuctionHouse.filters.DecreaseSoldAmount()
        this.debtRestartAuctionFilter = this.contracts.debtAuctionHouse.filters.RestartAuction()
        this.debtSettleAuctionFilter = this.contracts.debtAuctionHouse.filters.SettleAuction()
    }

    public getSurplusAuctions(fromBlock: number): Promise<{ auctions: ISurplusAuction[] }> {
        const startAuctionEvents = this.contracts.surplusAuctionHouse.queryFilter(
            this.surplusStartAuctionFilter,
            fromBlock
        )
        const bidFilterEvents = this.contracts.surplusAuctionHouse.queryFilter(this.surplusBidFilter, fromBlock)
        const restartAuctionEvents = this.contracts.surplusAuctionHouse.queryFilter(
            this.surplusRestartAuctionFilter,
            fromBlock
        )
        const settledAuctionEvents = this.contracts.surplusAuctionHouse.queryFilter(
            this.surplusSettleAuctionFilter,
            fromBlock
        )

        return Promise.all([startAuctionEvents, bidFilterEvents, restartAuctionEvents, settledAuctionEvents]).then(
            ([startAuction, bidEvents, restartAuctions, settledAuctions]) => {
                const bids = bidEvents.reduce((accum: { [key: string]: IAuctionBidder[] }, bid) => {
                    const parsedBid = bidEventToBid(bid)
                    const id = bid.args._id.toString()
                    const bidsForId = accum[id]
                    return { ...accum, [id]: bidsForId ? bidsForId.concat(parsedBid) : [parsedBid] }
                }, {})

                const restarts = restartAuctions.reduce((accum: { [key: string]: BigNumber }, restart) => {
                    const id = restart.args._id.toString()
                    const lastRestart = accum[id]
                    const newRestart = restart.args._auctionDeadline // Do events always come ordered correctly?
                    return { ...accum, [id]: !lastRestart || newRestart.gt(lastRestart) ? newRestart : lastRestart }
                }, {})

                const settled = settledAuctions.reduce((accum: { [key: string]: boolean }, settled) => {
                    const id = settled.args._id.toString()
                    return { ...accum, [id]: true }
                }, {})

                const auctions = startAuction.map((auc) =>
                    surplusStartAuctionEventToAuction(auc, bids, restarts, settled)
                )

                return { auctions }
            }
        )
    }

    public getDebtAuctions(fromBlock: number): Promise<{ auctions: IDebtAuction[] }> {
        const startAuctionEvents = this.contracts.debtAuctionHouse.queryFilter(this.debtStartAuctionFilter, fromBlock)
        const bidFilterEvents = this.contracts.debtAuctionHouse.queryFilter(
            this.debtDecreaseSoldAmountFilter,
            fromBlock
        )
        const restartAuctionEvents = this.contracts.debtAuctionHouse.queryFilter(
            this.debtRestartAuctionFilter,
            fromBlock
        )
        const settledAuctionEvents = this.contracts.debtAuctionHouse.queryFilter(
            this.debtSettleAuctionFilter,
            fromBlock
        )

        return Promise.all([startAuctionEvents, bidFilterEvents, restartAuctionEvents, settledAuctionEvents]).then(
            ([startAuction, bidEvents, restartAuctions, settledAuctions]) => {
                const bids = bidEvents.reduce((accum: { [key: string]: IAuctionBidder[] }, bid) => {
                    const parsedBid = bidEventToBid(bid)
                    const id = bid.args._id.toString()
                    const bidsForId = accum[id]
                    return { ...accum, [id]: bidsForId ? bidsForId.concat(parsedBid) : [parsedBid] }
                }, {})

                const restarts = restartAuctions.reduce((accum: { [key: string]: BigNumber }, restart) => {
                    const id = restart.args._id.toString()
                    const lastRestart = accum[id]
                    const newRestart = restart.args._auctionDeadline // Do events always come ordered correctly?
                    return { ...accum, [id]: !lastRestart || newRestart.gt(lastRestart) ? newRestart : lastRestart }
                }, {})

                const settled = settledAuctions.reduce((accum: { [key: string]: boolean }, settled) => {
                    const id = settled.args._id.toString()
                    return { ...accum, [id]: true }
                }, {})

                const auctions = startAuction.map((auc) => debtStartAuctionEventToAuction(auc, bids, restarts, settled))

                return { auctions }
            }
        )
    }

    public getCollateralAuctions(fromBlock: number, collateral: string): Promise<{ auctions: ICollateralAuction[] }> {
        const collateralAuctionHouse = this.contracts.tokenCollateralAuctionHouse[collateral]
        const startFilter = collateralAuctionHouse.filters.StartAuction()
        const buyCollateralFilter = collateralAuctionHouse.filters.BuyCollateral()
        const settleAuctionFilter = collateralAuctionHouse.filters.SettleAuction()
        return Promise.all([
            fetchStartEvents(this.tokenList[collateral].collateralAuctionHouse),
            fetchBuyEvents(this.tokenList[collateral].collateralAuctionHouse),
            fetchSettleEvents(this.tokenList[collateral].collateralAuctionHouse),
        ]).then(([startAuction, buyEvents, settleEvents]) => {
            const bids = buyEvents.reduce((accum: { [key: string]: IAuctionBidder[] }, bid) => {
                const parsedBid = collateralBidEventToBid(bid)
                const id = bid._id.toString()
                const bidsForId = accum[id]
                return { ...accum, [id]: bidsForId ? bidsForId.concat(parsedBid) : [parsedBid] }
            }, {})

            const settled = settleEvents.reduce((accum: { [key: string]: boolean }, settled) => {
                const id = settled._id.toString()
                return { ...accum, [id]: true }
            }, {})

            const auctions = startAuction.map((auc: any) => collateralStartAuctionEventToAuction(auc, bids, settled))
            return { auctions }
        })
    }
}
