import { BigNumber } from 'ethers'
import {
    IncreaseBidSizeEvent,
    StartAuctionEvent as SurplusStartAuctionEvent,
} from '../typechained/imported/ISurplusAuctionHouse'
import { StartAuctionEvent as DebtStartAuctionEvent } from '../typechained/imported/IDebtAuctionHouse'
import {
    BuyCollateralEvent,
    StartAuctionEvent as CollateralAuctionStartEvent,
} from '../typechained/imported/ICollateralAuctionHouse'

export interface ISurplusAuction {
    auctionId: string
    auctioneer: string
    auctionDeadline: string
    createdAt: string
    createdAtTransaction: string
    biddersList: Array<IAuctionBidder>
    isClaimed: boolean
    amount: string
    initialBid: string
}

export interface IDebtAuction {
    auctionId: string
    auctioneer: string
    auctionDeadline: string
    createdAt: string
    createdAtTransaction: string
    biddersList: Array<IAuctionBidder>
    isClaimed: boolean
    amount: string
    initialBid: string
}

export interface ICollateralAuctionEvent {
    _id: string
    auctioneer: string
    createdAt: string
    createdAtTransaction: string
    amountToSell: string
    initialBid: string
    amountToRaise: string
    isClaimed: boolean
    biddersList: Array<IAuctionBidder>
}

export interface ICollateralAuction {
    auctionId: string
    auctioneer: string
    createdAt: string
    createdAtTransaction: string
    amountToSell: string
    initialBid: string
    amountToRaise: string
    isClaimed: boolean
    biddersList: Array<IAuctionBidder>
}

export interface IAuctionBidder {
    bidder: string
    bid: string
    createdAt: string
    createdAtTransaction: string
    buyAmount: string
}

export function surplusStartAuctionEventToAuction(
    startAuction: any,
    bids: { [key: string]: IAuctionBidder[] },
    restarts: { [key: string]: BigNumber },
    settled: { [key: string]: boolean }
): ISurplusAuction {
    const id = startAuction._id.toString()
    return {
        auctionId: id,
        auctioneer: startAuction._auctioneer,
        auctionDeadline: restarts[id] ? restarts[id].toString() : startAuction._auctionDeadline.toString(),
        amount: startAuction._amountToSell.toString(),
        initialBid: startAuction._amountToRaise.toString(),
        createdAt: startAuction._blockTimestamp.toString(),
        createdAtTransaction: startAuction.transactionHash.toString(),
        biddersList: bids[id] || [],
        isClaimed: settled[id] || false,
    }
}

export function debtStartAuctionEventToAuction(
    startAuction: any,
    bids: { [key: string]: IAuctionBidder[] },
    restarts: { [key: string]: BigNumber },
    settled: { [key: string]: boolean }
): IDebtAuction {
    const id = startAuction._id.toString()
    return {
        auctionId: id,
        auctioneer: startAuction._auctioneer,
        auctionDeadline: restarts[id] ? restarts[id].toString() : startAuction._auctionDeadline.toString(),
        amount: startAuction._amountToSell.toString(),
        initialBid: startAuction._amountToRaise.toString(),
        createdAt: startAuction._blockTimestamp.toString(),
        createdAtTransaction: startAuction.transactionHash.toString(),
        biddersList: bids[id] || [],
        isClaimed: settled[id] || false,
    }
}

export interface StartAuctionEventQuery {
    _id: BigNumber
    _auctioneer: string
    _amountToSell: BigNumber
    _amountToRaise: BigNumber
    _blockTimestamp: BigNumber
    transactionHash: string
}

export function collateralStartAuctionEventToAuction(
    startAuction: StartAuctionEventQuery,
    bids: { [key: string]: IAuctionBidder[] },
    settled: { [key: string]: boolean }
): ICollateralAuction {
    return {
        auctionId: startAuction._id.toString(),
        auctioneer: startAuction._auctioneer,
        createdAt: startAuction._blockTimestamp.toString(),
        createdAtTransaction: startAuction.transactionHash.toString(),
        amountToSell: startAuction._amountToSell.toString(),
        initialBid: startAuction._amountToRaise.toString(),
        amountToRaise: startAuction._amountToRaise.toString(),
        isClaimed: settled[startAuction._id.toString()] || false,
        biddersList: bids[startAuction._id.toString()] || [],
    }
}

export function bidEventToBid(bid: any): IAuctionBidder {
    return {
        bidder: bid._bidder,
        bid: bid._raisedAmount.toString(),
        createdAt: bid._blockTimestamp.toString(),
        buyAmount: bid._soldAmount.toString(),
        createdAtTransaction: bid.transactionHash,
    }
}

export interface BuyCollateralEventQuery {
    _id: BigNumber
    _bidder: string
    _blockTimestamp: BigNumber
    _raisedAmount: BigNumber
    _soldAmount: BigNumber
    transactionHash: string
}

export function collateralBidEventToBid(bid: any): IAuctionBidder {
    return {
        bidder: bid._bidder,
        createdAt: bid._blockTimestamp.toString(),
        bid: bid._soldAmount.toString(),
        buyAmount: bid._raisedAmount.toString(),
        createdAtTransaction: bid.transactionHash,
    }
}
