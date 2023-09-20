import { BuyCollateralEventQuery, StartAuctionEventQuery } from '../schema/auction'

export const querySubgraph = async (query: string): Promise<Array<any>> => {
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
    const response = await fetch('https://api.studio.thegraph.com/query/52770/od-test/v0.0.16', options)
    const data = await response.json()
    if (data.errors) console.log(data.errors)
    if (data?.data) return data?.data
    return []
}

export const fetchCollateralAuctionEvents = async (address: string): Promise<any> => {
    const query = `query CollateralAuctionEvents {
        startAuction: collateralAuctionHouseStartAuctions(
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
            _blockTimestamp: blockTimestamp
        }
        buyEvents: collateralAuctionHouseBuyCollaterals(
            orderBy: blockNumber
            orderDirection: asc
            where: {address: "${address}"}
        ){
            _id: _auctionId
            _bidder
            _raisedAmount
            _soldAmount
            transactionHash
            _blockTimestamp: blockTimestamp
        }
        settleEvents: collateralAuctionHouseSettleAuctions(
            orderBy: blockNumber
            orderDirection: desc
            where: {address: "${address}"}
          ){
            _blockTimestamp: blockTimestamp
            _leftoverReceiver
            _leftoverCollateral
            _auctionId
            transactionHash
        }
    }`
    return querySubgraph(query)
}

export const fetchDebtAuctionEvents = async (fromBlock: number): Promise<any> => {
    const query = `query DebtAuctionEvents {
        restartAuctions: debtAuctionHouseRestartAuctions(orderBy: blockNumber, orderDirection: desc) {
          _auctionDeadline
          _id: _auctionId
          blockNumber
          _blockTimestamp: blockTimestamp
          transactionHash
        }
        settledAuctions: debtAuctionHouseSettleAuctions(orderBy: blockNumber, orderDirection: desc) {
          _id: _auctionId
          _highBidder
          _raisedAmount
          blockNumber
          _blockTimestamp: blockTimestamp
          transactionHash
        }
        startAuction: debtAuctionHouseStartAuctions(orderBy: blockNumber, orderDirection: desc) {
          _id: _auctionId
          _amountToRaise
          _amountToSell
          _auctionDeadline
          blockNumber
          _blockTimestamp: blockTimestamp
          transactionHash
        }
        bidEvents: debtAuctionHouseDecreaseSoldAmounts(orderBy: blockNumber, orderDirection: desc) {
          _id: _auctionId
          _bidExpiry
          _bidder
          _raisedAmount
          _soldAmount
          blockNumber
          _blockTimestamp: blockTimestamp
          transactionHash
        }
      }`
    return querySubgraph(query)
}

export const fetchSurplusAuctionEvents = async (fromBlock: number): Promise<any> => {
    const query = `query SurplusAuctionEvents {
        startAuction: surplusAuctionHouseStartAuctions(orderBy: blockNumber, orderDirection: desc) {
          _id: _auctionId
          _amountToRaise
          _amountToSell
          _auctionDeadline
          blockNumber
          _blockTimestamp: blockTimestamp
          transactionHash
        }
        bidEvents: surplusAuctionHouseIncreaseBidSizes(orderBy: blockNumber, orderDirection: desc) {
          _id: _auctionId
          _bidExpiry
          _bidder
          _raisedAmount
          _soldAmount
          blockNumber
          _blockTimestamp: blockTimestamp
          transactionHash
        }
        restartAuctions: surplusAuctionHouseRestartAuctions(orderBy: blockNumber, orderDirection: desc) {
          _id: _auctionId
          _auctionDeadline
          blockNumber
          _blockTimestamp: blockTimestamp
          transactionHash
        }
        settledAuctions: surplusAuctionHouseSettleAuctions(orderBy: blockNumber, orderDirection: desc) {
          _id: _auctionId
          _highBidder
          _raisedAmount
          blockNumber
          _blockTimestamp: blockTimestamp
          transactionHash
        }
      }`
    return querySubgraph(query)
}
