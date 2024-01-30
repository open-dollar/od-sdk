// Adapted from Lyra Finance
// https://github.com/lyra-finance/interface

import { BigNumber, ethers } from 'ethers'

import { CamelotPoolTotalSupply, ERC20 } from '../typechained'
import { Geb } from '../geb'
import { fromBigNumber, multicall, MulticallRequest, SECONDS_IN_YEAR } from '../utils'

export type NitroPoolDetails = {
    tvl: number
    apy: number
    valuePerLPToken: number
    odgPerLPToken: number
    wstETHPerLPToken: number
    lpTokenBalance: number
}

/**
 * Fetches the data for the ODG-WSTETH Camelot Nitro pool
 * @param geb
 * @param address
 */
export default async function fetchNitroPoolODGwstETH(geb: Geb, address: string | null): Promise<NitroPoolDetails> {
    const ODGAddress = geb.tokenList['ODG'].address
    const wstETHAddress = geb.tokenList['wstETH'].address


    if (!ODGAddress || !wstETHAddress) {
        console.warn('Missing token info in tokenlist')
        return {
            tvl: 0,
            apy: 0,
            valuePerLPToken: 0,
            odgPerLPToken: 0,
            wstETHPerLPToken: 0,
            lpTokenBalance: 0,
        }
    }

    const odg = geb.getErc20Contract(geb.tokenList['ODG'].address)
    const wstETH = geb.getErc20Contract(geb.tokenList['WSTETH'].address)

    // For some reason our camelotPool ABI does not have the totalSupply() function
    const camelotPool = await geb.contracts.camelotODGPool

    const camelotwstETHNitroPool = await geb.contracts.camelotwstETHNitroPool

    const odgMarketPrice = await geb.contracts.oracleRelayer.marketPrice()
    const odgMarketPriceFloat = parseFloat(ethers.utils.formatEther(odgMarketPrice))

    const chainlinkRelayerContract = new ethers.Contract(
        geb.tokenList['WSTETH'].chainlinkRelayer,
        ['function getResultWithValidity() external view returns (uint256 _result, bool _validity)'],
        geb.provider
    )

    const wstETH_market_price = await chainlinkRelayerContract.getResultWithValidity()

    const [
        {
            returnData: [[poolODGBalanceBN], [poolwstETHBalanceBN]],
        },
        nitroRewardsPerSecond,
        odgPrice,
        wstETHPrice,
        userInfo,
    ] = await Promise.all([
        multicall<
            [
                // Using type CamelotPoolTotalSupply because of the missing totalSupply() function in the CamelotPool ABI
                MulticallRequest<CamelotPoolTotalSupply, 'totalSupply'>,
                MulticallRequest<ERC20, 'balanceOf'>,
                MulticallRequest<ERC20, 'balanceOf'>
            ]
        >(geb, [
            {
                // TODO: Need to replace this camelotPool object with a contract that has totalSupply()
                contract: camelotPool,
                function: 'totalSupply',
                args: [],
            },
            {
                contract: odg,
                function: 'balanceOf',
                args: [camelotPool.address],
            },
            {
                contract: wstETH,
                function: 'balanceOf',
                args: [camelotPool.address],
            },
        ]),
        camelotwstETHNitroPool.rewardsToken1PerSecond(),
        odgMarketPrice,
        wstETH_market_price,
        address ? camelotwstETHNitroPool.userInfo(address) : null,
    ])

    const poolODGBalance = fromBigNumber(poolODGBalanceBN)
    const poolwstETHBalance = fromBigNumber(poolwstETHBalanceBN)
    const totalSupply = fromBigNumber(totalSupplyBN)
    const odgPerLPToken = totalSupply > 0 ? poolODGBalance / totalSupply : 0
    const wstETHPerLPToken = totalSupply > 0 ? poolwstETHBalance / totalSupply : 0
    const tvl = poolODGBalance * odgMarketPriceFloat + poolwstETHBalance * wstETHPrice
    const valuePerLPToken = totalSupply > 0 ? tvl / totalSupply : 0
    const rewardsPerSecond = totalSupply > 0 ? fromBigNumber(BigNumber.from(nitroRewardsPerSecond)) / totalSupply : 0
    const apy = valuePerLPToken > 0 ? (rewardsPerSecond * SECONDS_IN_YEAR * odgPrice) / valuePerLPToken : 0
    const lpTokenBalance = userInfo ? fromBigNumber(userInfo.totalDepositAmount) : 0
    return {
        tvl,
        apy,
        odgPerLPToken,
        wstETHPerLPToken,
        valuePerLPToken,
        lpTokenBalance,
    }
}