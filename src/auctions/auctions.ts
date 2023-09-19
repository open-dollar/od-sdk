import { BigNumber } from 'ethers'
import { ContractApis } from '../api/contract-apis'
import { TokenList } from '../contracts/addreses'

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
} from '../schema/auction'

import {
    fetchStartEvents,
    fetchBuyEvents,
    fetchSettleEvents,
    fetchDebtAuctionEvents,
    fetchSurplusAuctionEvents,
} from './subgraph'

import {
    IncreaseBidSizeEventFilter as SurplusIncreaseBidSizeEventFilter,
    RestartAuctionEventFilter as SurplusRestartAuctonEventFilter,
    SettleAuctionEventFilter as SurplusSettleAuctionEventFilter,
    StartAuctionEventFilter as SurplusStartAuctionEventFilter,
} from '../typechained/SurplusAuctionHouse'

import {
    DecreaseSoldAmountEventFilter as DebtDecreaseSoldAmountEventFilter,
    RestartAuctionEventFilter as DebtRestartAuctonEventFilter,
    SettleAuctionEventFilter as DebtSettleAuctionEventFilter,
    StartAuctionEventFilter as DebtStartAuctionEventFilter,
} from '../typechained/DebtAuctionHouse'

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
        this.surplusBidFilter = this.contracts.surplusAuctionHouse.filters.IncreaseBidSize()
        this.surplusRestartAuctionFilter = this.contracts.surplusAuctionHouse.filters.RestartAuction()
        this.surplusSettleAuctionFilter = this.contracts.surplusAuctionHouse.filters.SettleAuction()
    }

    public getSurplusAuctions(fromBlock: number): Promise<{ auctions: ISurplusAuction[] }> {
        return fetchSurplusAuctionEvents(fromBlock).then(
            ({ startAuction, bidEvents, restartAuctions, settledAuctions }) => {
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
        return fetchDebtAuctionEvents(fromBlock).then(
            ({ startAuction, bidEvents, restartAuctions, settledAuctions }) => {
                const bids = bidEvents.reduce((accum: { [key: string]: IAuctionBidder[] }, bid: any) => {
                    const parsedBid = bidEventToBid(bid)
                    const id = bid.args._id.toString()
                    const bidsForId = accum[id]
                    return { ...accum, [id]: bidsForId ? bidsForId.concat(parsedBid) : [parsedBid] }
                }, {})

                const restarts = restartAuctions.reduce((accum: { [key: string]: BigNumber }, restart: any) => {
                    const id = restart.args._id.toString()
                    const lastRestart = accum[id]
                    const newRestart = restart.args._auctionDeadline // Do events always come ordered correctly?
                    return { ...accum, [id]: !lastRestart || newRestart.gt(lastRestart) ? newRestart : lastRestart }
                }, {})

                const settled = settledAuctions.reduce((accum: { [key: string]: boolean }, settled: any) => {
                    const id = settled.args._id.toString()
                    return { ...accum, [id]: true }
                }, {})

                const auctions = startAuction.map((auc: any) =>
                    debtStartAuctionEventToAuction(auc, bids, restarts, settled)
                )

                return { auctions }
            }
        )
    }

    public getCollateralAuctions(fromBlock: number, collateral: string): Promise<{ auctions: ICollateralAuction[] }> {
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
