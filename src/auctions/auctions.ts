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

import { fetchCollateralAuctionEvents, fetchDebtAuctionEvents, fetchSurplusAuctionEvents } from './subgraph'

/**
 * The main package used to interact with the GEB system. Includes [[deployProxy |helper functions]] for safe
 *  management and the [[contracts | contract interface object]] to directly call smart contracts.
 */
export class Auctions {
    constructor(public contracts: ContractApis, public tokenList: TokenList, public subgraph: string) {
        this.tokenList = tokenList
        this.subgraph = subgraph
    }

    public getSurplusAuctions(fromBlock: number): Promise<{ auctions: ISurplusAuction[] }> {
        return fetchSurplusAuctionEvents(fromBlock, this.subgraph).then(
            ({ startAuction, bidEvents, restartAuctions, settledAuctions }) => {
                const bids = bidEvents.reduce((accum: { [key: string]: IAuctionBidder[] }, bid: any) => {
                    const parsedBid = bidEventToBid(bid)
                    const id = bid._id.toString()
                    const bidsForId = accum[id]
                    return { ...accum, [id]: bidsForId ? bidsForId.concat(parsedBid) : [parsedBid] }
                }, {})

                const restarts = restartAuctions.reduce((accum: { [key: string]: BigNumber }, restart: any) => {
                    const id = restart._id.toString()
                    const lastRestart = accum[id]
                    const newRestart = restart._auctionDeadline // Do events always come ordered correctly?
                    return { ...accum, [id]: !lastRestart || newRestart.gt(lastRestart) ? newRestart : lastRestart }
                }, {})

                const settled = settledAuctions.reduce((accum: { [key: string]: boolean }, settled: any) => {
                    const id = settled._id.toString()
                    return { ...accum, [id]: true }
                }, {})

                const auctions = startAuction.map((auc: any) =>
                    surplusStartAuctionEventToAuction(auc, bids, restarts, settled)
                )

                return { auctions }
            }
        )
    }

    public getDebtAuctions(fromBlock: number): Promise<{ auctions: IDebtAuction[] }> {
        return fetchDebtAuctionEvents(fromBlock, this.subgraph).then(
            ({ startAuction, bidEvents, restartAuctions, settledAuctions }) => {
                const bids = bidEvents.reduce((accum: { [key: string]: IAuctionBidder[] }, bid: any) => {
                    const parsedBid = bidEventToBid(bid)
                    const id = bid._id.toString()
                    const bidsForId = accum[id]
                    return { ...accum, [id]: bidsForId ? bidsForId.concat(parsedBid) : [parsedBid] }
                }, {})

                const restarts = restartAuctions.reduce((accum: { [key: string]: BigNumber }, restart: any) => {
                    const id = restart._id.toString()
                    const lastRestart = accum[id]
                    const newRestart = restart._auctionDeadline // Do events always come ordered correctly?
                    return { ...accum, [id]: !lastRestart || newRestart.gt(lastRestart) ? newRestart : lastRestart }
                }, {})

                const settled = settledAuctions.reduce((accum: { [key: string]: boolean }, settled: any) => {
                    const id = settled._id.toString()
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
        return fetchCollateralAuctionEvents(this.tokenList[collateral].collateralAuctionHouse, this.subgraph).then(
            ({ startAuction, buyEvents, settleEvents }) => {
                const bids = buyEvents.reduce((accum: { [key: string]: IAuctionBidder[] }, bid: any) => {
                    const parsedBid = collateralBidEventToBid(bid)
                    const id = bid._id.toString()
                    const bidsForId = accum[id]
                    return { ...accum, [id]: bidsForId ? bidsForId.concat(parsedBid) : [parsedBid] }
                }, {})

                const settled = settleEvents.reduce((accum: { [key: string]: boolean }, settled: any) => {
                  if (!settled._id) {
                    return accum;
                  }
                  const id = settled._id.toString()
                  return { ...accum, [id]: true }
                }, {})

                const auctions = startAuction.map((auc: any) =>
                    collateralStartAuctionEventToAuction(auc, bids, settled)
                )
                return { auctions }
            }
        )
    }
}
