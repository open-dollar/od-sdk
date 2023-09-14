import { ethers } from 'ethers'
import { Geb } from '../geb'
import TokensData from '../artifacts/contracts/TokensData.sol/TokensData.json'
import { TokenData } from '../contracts/addreses'

export interface TokenFetchData {
    balanceE18: string
    decimals: string
}

export interface PoolData {
    OD_balance: string;
    WETH_balance: string;
    totalLiquidity: string;
}

/**
 * Fetches the liquidity data for an OD-WETH pool
 * @param geb
 * @returns Promise<PoolData>
 */
export async function fetchPoolData(geb: Geb): Promise<PoolData> {

    const oracleAddress = await geb.contracts.oracleRelayer.systemCoinOracle();

    const oracleContract = new ethers.Contract(
        oracleAddress,
        ['function priceSource() external view returns (IBaseOracle)'],
        geb.provider
    );

    const uniV3RelayerAddress = await oracleContract.priceSource();

    //TODO: check ABI for uniV3Relayer and replace function uniV3Pool()
    const uniV3RelayerContract = new ethers.Contract(
        uniV3RelayerAddress,
        ['function uniV3Pool() external view returns (address)'],
        geb.provider
    );

    const uniV3PoolAddress = await uniV3RelayerContract.uniV3Pool();

    const OD_balance = await geb.contracts.systemCoin.balanceOf(uniV3PoolAddress);

    const WETH_balance = await geb.contracts.weth.balanceOf(uniV3PoolAddress);

    const totalLiquidity = OD_balance.add(WETH_balance);

    return {
        OD_balance: OD_balance.toString(),
        WETH_balance: WETH_balance.toString(),
        totalLiquidity: totalLiquidity.toString(),
    };
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
