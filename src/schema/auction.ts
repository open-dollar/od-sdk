import { BigNumber } from 'ethers'
import {
    IncreaseBidSizeEvent,
    StartAuctionEvent as SurplusStartAuctionEvent,
} from '../typechained/RecyclingSurplusAuctionHouse'
import { StartAuctionEvent as DebtStartAuctionEvent } from '../typechained/DebtAuctionHouse'
import {
    BuyCollateralEvent,
    StartAuctionEvent as CollateralAuctionStartEvent,
} from '../typechained/IncreasingDiscountCollateralAuctionHouse'

export interface ISurplusAuction {
    auctionDeadline: string
    auctionId: string
    createdAt: string
    createdAtTransaction: string
    biddersList: Array<IAuctionBidder>
    isClaimed: boolean
    amount: string
    initialBid: string
}

export interface IDebtAuction {
    auctionDeadline: string
    auctionId: string
    createdAt: string
    createdAtTransaction: string
    biddersList: Array<IAuctionBidder>
    isClaimed: boolean
    amount: string
    initialBid: string
    incomeReceiver: string
}

export interface ICollateralAuction {
    auctionId: string
    createdAt: string
    createdAtTransaction: string
    amountToSell: string
    initialBid: string
    amountToRaise: string
    startingDiscount: string
    maxDiscount: string
    perSecondDiscountUpdateRate: string
    forgoneCollateralReceiver: string
    auctionIncomeRecipient: string
    isClaimed: boolean
    biddersList: Array<ICollateralAuctionBidder>
}

export interface ICollateralAuctionBidder {
    bid: string
    boughtCollateral: string
}

export interface IAuctionBidder {
    bidder: string
    bid: string
    createdAt: string
    createdAtTransaction: string
    buyAmount: string
}

export function surplusStartAuctionEventToAuction(
    startAuction: SurplusStartAuctionEvent,
    bids: { [key: string]: IAuctionBidder[] },
    restarts: { [key: string]: BigNumber },
    settled: { [key: string]: boolean }
): ISurplusAuction {
    const id = startAuction.args.id.toString()
    return {
        auctionDeadline: restarts[id] ? restarts[id].toString() : startAuction.args.auctionDeadline.toString(),
        auctionId: id,
        amount: startAuction.args.amountToSell.toString(),
        initialBid: startAuction.args.initialBid.toString(),
        createdAt: startAuction.blockNumber.toString(),
        createdAtTransaction: startAuction.transactionHash.toString(),
        biddersList: bids[id],
        isClaimed: settled[id] || false,
    }
}

export function debtStartAuctionEventToAuction(
    startAuction: DebtStartAuctionEvent,
    bids: { [key: string]: IAuctionBidder[] },
    restarts: { [key: string]: BigNumber },
    settled: { [key: string]: boolean }
): IDebtAuction {
    const id = startAuction.args.id.toString()
    return {
        auctionDeadline: restarts[id] ? restarts[id].toString() : startAuction.args.auctionDeadline.toString(),
        auctionId: id,
        amount: startAuction.args.amountToSell.toString(),
        initialBid: startAuction.args.initialBid.toString(),
        createdAt: startAuction.blockNumber.toString(),
        createdAtTransaction: startAuction.transactionHash.toString(),
        biddersList: bids[id],
        isClaimed: settled[id] || false,
        incomeReceiver: startAuction.args.incomeReceiver.toString(),
    }
}

export function collateralStartAuctionEventToAuction(
    startAuction: CollateralAuctionStartEvent,
    bids: { [key: string]: ICollateralAuctionBidder[] },
    settled: { [key: string]: boolean }
): ICollateralAuction {
    return {
        auctionId: startAuction.args._id.toString(),
        createdAt: startAuction.blockNumber.toString(),
        createdAtTransaction: startAuction.transactionHash.toString(),
        amountToSell: startAuction.args._amountToSell.toString(),
        initialBid: startAuction.args._initialBid.toString(),
        amountToRaise: startAuction.args._amountToRaise.toString(),
        startingDiscount: startAuction.args._startingDiscount.toString(),
        maxDiscount: startAuction.args._maxDiscount.toString(),
        perSecondDiscountUpdateRate: startAuction.args._perSecondDiscountUpdateRate.toString(),
        forgoneCollateralReceiver: startAuction.args._forgoneCollateralReceiver.toString(),
        auctionIncomeRecipient: startAuction.args._auctionIncomeRecipient.toString(),
        isClaimed: settled[startAuction.args._id.toString()] || false,
        biddersList: bids[startAuction.args._id.toString()],
    }
}

export function bidEventToBid(bid: IncreaseBidSizeEvent): IAuctionBidder {
    return {
        bidder: bid.args.highBidder,
        bid: bid.args.bid.toString(),
        createdAt: bid.blockNumber.toString(),
        buyAmount: bid.args.amountToBuy.toString(),
        createdAtTransaction: bid.transactionHash,
    }
}

export function collateralBidEventToBid(bid: BuyCollateralEvent): ICollateralAuctionBidder {
    return {
        bid: bid.args._wad.toString(),
        boughtCollateral: bid.args._boughtCollateral.toString(),
    }
}
