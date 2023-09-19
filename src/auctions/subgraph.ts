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
    const response = await fetch('https://api.studio.thegraph.com/query/52770/hai-test/v0.0.3', options)
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
            blockTimestamp
        }
        buyEvents: collateralAuctionHouseBuyCollaterals(
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
        settleEvents: collateralAuctionHouseSettleAuctions(
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
    return querySubgraph(query)
}

export const fetchDebtAuctionEvents = async (fromBlock: number): Promise<any> => {
    const query = `query DebtAuctionEvents {
        restartAuctions: debtAuctionHouseRestartAuctions(orderBy: blockNumber, orderDirection: desc) {
          _auctionDeadline
          _auctionId
          blockNumber
          blockTimestamp
          id
          transactionHash
        }
        settledAuctions: debtAuctionHouseSettleAuctions(orderBy: blockNumber, orderDirection: desc) {
          _auctionId
          _highBidder
          _raisedAmount
          blockNumber
          blockTimestamp
          id
          transactionHash
        }
        startAuction: debtAuctionHouseStartAuctions(orderBy: blockNumber, orderDirection: desc) {
          _amountToRaise
          _amountToSell
          _auctionDeadline
          _auctionId
          blockNumber
          blockTimestamp
          id
          transactionHash
        }
        bidEvents: debtAuctionHouseDecreaseSoldAmounts(orderBy: blockNumber, orderDirection: desc) {
          _auctionId
          _bidExpiry
          _bidder
          _raisedAmount
          _soldAmount
          blockNumber
          blockTimestamp
          id
          transactionHash
        }
      }`
    return querySubgraph(query)
}

export const fetchSurplusAuctionEvents = async (fromBlock: number): Promise<any> => {
    const query = `query SurplusAuctionEvents {
        startAuction: surplusAuctionHouseStartAuctions(orderBy: blockNumber, orderDirection: desc) {
          _amountToRaise
          _amountToSell
          _auctionDeadline
          _auctionId
          blockNumber
          blockTimestamp
          id
          transactionHash
        }
        bidEvents: surplusAuctionHouseIncreaseBidSizes(orderBy: blockNumber, orderDirection: desc) {
          _auctionId
          _bidExpiry
          _bidder
          _raisedAmount
          _soldAmount
          blockNumber
          blockTimestamp
          id
          transactionHash
        }
        restartAuctions: surplusAuctionHouseRestartAuctions(orderBy: blockNumber, orderDirection: desc) {
          _auctionId
          _auctionDeadline
          blockNumber
          blockTimestamp
          id
          transactionHash
        }
        settledAuctions: surplusAuctionHouseSettleAuctions(orderBy: blockNumber, orderDirection: desc) {
          _auctionId
          _highBidder
          _raisedAmount
          blockNumber
          blockTimestamp
          id
          transactionHash
        }
      }`
    return querySubgraph(query)
}
