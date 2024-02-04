// Adapted from Lyra Finance
// https://github.com/lyra-finance/interface

import { BigNumber, ethers } from 'ethers'

import { CamelotNitroPool, ERC20 } from '../typechained'
import { Geb } from '../geb'
import { fromBigNumber, multicall, CamelotMulticallRequest, SECONDS_IN_YEAR } from '../utils'

export type NitroPoolDetails = {
    tvl: number
    settings: {
        startTime: BigNumber
        endTime: BigNumber
        harvestStartTime: BigNumber
        depositEndTime: BigNumber
        lockDurationReq: BigNumber
        lockEndReq: BigNumber
        depositAmountReq: BigNumber
        whitelist: boolean
        description: string
    }
    rewardsPerSecond: number
    // lpTokenBalance: number
    // userInfo: {
    //     totalDepositAmount: BigNumber
    //     rewardDebtToken1: BigNumber
    //     rewardDebtToken2: BigNumber
    //     pendingRewardsToken1: BigNumber
    //     pendingRewardsToken2: BigNumber
    // } | null
    apy: number
}

/**
 * Fetches the relevant pool data for the ODG-WSTETH Camelot Nitro pool. Note that a user deposits an spNFT
 * by transferring it to the NitroPool, and the NitroPool contract will have ownership of the spNFT and provide data
 * on the user's deposit
 *
 * @param geb
 * @param address
 */
const fetchNitroPoolODGwstETH = async (geb: Geb, address: string | null): Promise<NitroPoolDetails> => {
    const ODGAddress = geb.tokenList['ODG'].address
    const wstETHAddress = geb.tokenList['WSTETH'].address

    if (!ODGAddress || !wstETHAddress) {
        console.warn('Missing token info in tokenlist')
        return {
            tvl: 0,
            settings: {
                startTime: BigNumber.from(0),
                endTime: BigNumber.from(0),
                harvestStartTime: BigNumber.from(0),
                depositEndTime: BigNumber.from(0),
                lockDurationReq: BigNumber.from(0),
                lockEndReq: BigNumber.from(0),
                depositAmountReq: BigNumber.from(0),
                whitelist: false,
                description: '',
            },
            rewardsPerSecond: 0,
            // lpTokenBalance: 0,
            // userInfo: null,
            apy: 0,
        }
    }

    const odg = geb.getErc20Contract(geb.tokenList['ODG'].address)
    const wstETH = geb.getErc20Contract(geb.tokenList['WSTETH'].address)

    const camelotwstETHNitroPool = await geb.contracts.camelotwstETHNitroPool

    let odgMarketPrice = '16000000000000000000'
    let odgMarketPriceFloat = 1.6
    let wstETH_market_price = '2000000000000000000000'
    try {
        const odgMarketPrice = await geb.contracts.oracleRelayer.marketPrice()
        odgMarketPriceFloat = parseFloat(ethers.utils.formatEther(odgMarketPrice))

        const chainlinkRelayerContract = new ethers.Contract(
            geb.tokenList['WSTETH'].chainlinkRelayer,
            ['function getResultWithValidity() external view returns (uint256 _result, bool _validity)'],
            geb.provider
        )

        const wstETH_market_price = await chainlinkRelayerContract.getResultWithValidity()
    } catch (e) {
        // TODO: Pull correct market prices
        console.log(e)
    }

    const [
        {
            returnData: [settings, [poolODGBalanceBN], [poolwstETHBalanceBN]],
        },
        nitroRewardsPerSecond,
        wstETHPrice,
        userInfo,
    ] = await Promise.all([
        multicall<
            [
                CamelotMulticallRequest<CamelotNitroPool, 'settings'>,
                CamelotMulticallRequest<ERC20, 'balanceOf'>,
                CamelotMulticallRequest<ERC20, 'balanceOf'>
            ]
        >(geb, [
            {
                contract: camelotwstETHNitroPool,
                function: 'settings',
                args: [],
            },
            {
                contract: odg,
                function: 'balanceOf',
                args: [camelotwstETHNitroPool.address],
            },
            {
                contract: wstETH,
                function: 'balanceOf',
                args: [camelotwstETHNitroPool.address],
            },
        ]),
        camelotwstETHNitroPool.rewardsToken1PerSecond(),
        odgMarketPrice,
        wstETH_market_price,
        address ? camelotwstETHNitroPool.userInfo(address) : null,
    ])

    const poolODGBalance = fromBigNumber(poolODGBalanceBN)
    const poolwstETHBalance = fromBigNumber(poolwstETHBalanceBN)
    const wstETHPriceFloat = parseFloat(ethers.utils.formatEther(wstETHPrice))
    const tvl = poolODGBalance * odgMarketPriceFloat + poolwstETHBalance * wstETHPriceFloat
    const rewardsPerSecond = fromBigNumber(BigNumber.from(nitroRewardsPerSecond))
    // const lpTokenBalance = userInfo ? fromBigNumber(userInfo.totalDepositAmount) : (0 as number)
    // Assumes rewardsPerSecond and odgMarketPrice are constant. Also does not take into account compounding
    const apy = (rewardsPerSecond * SECONDS_IN_YEAR * odgMarketPriceFloat) / tvl
    return {
        tvl,
        settings,
        rewardsPerSecond,
        // lpTokenBalance,
        // userInfo,
        apy,
    }
}

export { fetchNitroPoolODGwstETH }
