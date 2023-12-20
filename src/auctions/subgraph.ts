export const querySubgraph = async (query: string, subgraph: string): Promise<Array<any>> => {
    const graphqlQuery = {
        operationName: 'CollateralAuctionEvents',
        query,
    }

    let headers: {
        'content-type': string
        Authorization?: string
    } = {
        'content-type': 'application/json',
    }

    if (subgraph.startsWith('https://api.studio.thegraph.com')) {
        headers.Authorization = '<token>'
    }

    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(graphqlQuery),
    };

    try {
        const response = await fetch(subgraph, options);
        const data = await response.json()
        if (data.errors) {
            console.log(data.errors)
        }
        return data?.data ?? [];
    } catch (error) {
        console.error('Primary subgraph fetch failed:', error)

        const fallbackSubgraph = process.env.REACT_APP_FALLBACK_SUBGRAPH_URL;
        if (fallbackSubgraph) {
            headers = {
                'content-type': 'application/json',
            }
            const fallbackOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(graphqlQuery),
            };
            try {
                const fallbackResponse = await fetch(fallbackSubgraph, fallbackOptions);
                const fallbackData = await fallbackResponse.json()
                if (fallbackData.errors) {
                    console.log(fallbackData.errors)
                }
                return fallbackData?.data ?? []
            } catch (fallbackError) {
                console.error('Fallback subgraph fetch failed:', fallbackError)
                return []
            }
        } else {
            console.error('No fallback subgraph URL provided.')
            return []
        }
    }
}


export const fetchCollateralAuctionEvents = async (address: string, subgraph: string): Promise<any> => {
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
    return querySubgraph(query, subgraph)
}

export const fetchDebtAuctionEvents = async (fromBlock: number, subgraph: string): Promise<any> => {
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
    return querySubgraph(query, subgraph)
}

export const fetchSurplusAuctionEvents = async (fromBlock: number, subgraph: string): Promise<any> => {
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
    return querySubgraph(query, subgraph)
}
