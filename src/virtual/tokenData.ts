import { ethers } from 'ethers'
import { Geb } from '../geb'
import TokensData from '../artifacts/contracts/TokensData.sol/TokensData.json'
import { TokenData } from '../contracts/addreses'

export interface TokenFetchData {
    balanceE18: string
    decimals: string
}

export interface PoolData {
    OD_balance: string
    WETH_balance: string
    totalLiquidityUSD: string
}

/**
 * Fetches the liquidity data for an OD-WETH pool
 * @param geb
 * @returns Promise<PoolData>
 */
export async function fetchPoolData(geb: Geb): Promise<PoolData> {
    try {
        let uniV3PoolAddress = '0x0000000000000000000000000000000000000000'
        try {
            uniV3PoolAddress = geb.tokenList['OD'].camelotPoolAddress
            if (!uniV3PoolAddress) uniV3PoolAddress = geb.tokenList['HAI'].camelotPoolAddress
        } catch {
            // do nothing
        }

        const OD_balance = await geb.contracts.systemCoin.balanceOf(uniV3PoolAddress)

        const WETH_balance = await geb.contracts.weth.balanceOf(uniV3PoolAddress)

        const OD_market_price = await geb.contracts.oracleRelayer.marketPrice()

        const chainlinkRelayerContract = new ethers.Contract(
            geb.tokenList['WETH'].chainlinkRelayer,
            ['function getResultWithValidity() external view returns (uint256 _result, bool _validity)'],
            geb.provider
        )

        const WETH_market_price = await chainlinkRelayerContract.getResultWithValidity()

        const OD_market_price_float = parseFloat(ethers.utils.formatEther(OD_market_price))

        const WETH_market_price_float = parseFloat(ethers.utils.formatEther(WETH_market_price._result))

        const OD_market_cap = OD_market_price_float * parseFloat(ethers.utils.formatEther(OD_balance))

        const WETH_market_cap = WETH_market_price_float * parseFloat(ethers.utils.formatEther(WETH_balance))

        const total_market_cap = OD_market_cap + WETH_market_cap

        return {
            OD_balance: OD_balance.toString(),
            WETH_balance: WETH_balance.toString(),
            totalLiquidityUSD: total_market_cap.toString(),
        }
    } catch (error) {
        console.log('Error fetching pool data: ', error)
        return {
            OD_balance: '0',
            WETH_balance: '0',
            totalLiquidityUSD: '0',
        }
    }
}

export async function fetchTokenData(
    geb: Geb,
    user: string,
    tokens: { [token: string]: TokenData }
): Promise<{ [token: string]: TokenFetchData }> {
    // Encoded input data to be sent to the batch contract constructor
    const inputData = ethers.utils.defaultAbiCoder.encode(
        ['address', 'address[]'],
        [
            user,
            Object.values(tokens)
                .map((token) => token.address)
                .filter((address) => address !== undefined && address !== ''),
        ]
    )

    // Generate payload from input data
    const payload = TokensData.bytecode.concat(inputData.slice(2))

    // Call the deployment transaction with the payload
    const returnedData = await geb.provider.call({ data: payload })

    // Parse the returned value to the struct type in order
    const decoded = ethers.utils.defaultAbiCoder.decode(
        [
            `tuple(
            uint256 balanceE18, 
            uint256 decimals
            )[]`,
        ],
        returnedData
    )[0] as TokenFetchData[]

    const result: { [token: string]: TokenFetchData } = Object.keys(tokens).reduce(
        (obj, key, i) => ({ ...obj, [key]: decoded[i] }),
        {}
    )

    const parsedResult = Object.entries(result).reduce((newObj, [key, value]) => {
        return {
            ...newObj,
            [key]: {
                ...value,
                balanceE18: value.balanceE18.toString(),
                decimals: value.decimals.toString(),
            },
        }
    }, {})

    return parsedResult
}
