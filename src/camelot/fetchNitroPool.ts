import { BigNumber } from 'ethers'

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
    lpTokenBalance: number
    userInfo: {
        totalDepositAmount: BigNumber
        rewardDebtToken1: BigNumber
        rewardDebtToken2: BigNumber
        pendingRewardsToken1: BigNumber
        pendingRewardsToken2: BigNumber
    } | null
    apy: number
}

const fetchNitroPoolODGWSTETH = async (geb: Geb, address: string | null): Promise<NitroPoolDetails> => {
    const ODGAddress = geb.tokenList['ODG'].address
    const WSTETHAddress = geb.tokenList['WSTETH'].address

    if (!ODGAddress || !WSTETHAddress) {
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
            lpTokenBalance: 0,
            userInfo: null,
            apy: 0,
        }
    }

    const odg = geb.getErc20Contract(ODGAddress)
    const WSTETH = geb.getErc20Contract(WSTETHAddress)

    const camelotWSTETHNitroPool = await geb.contracts.camelotWSTETHNitroPool

    let odgMarketPriceFloat = 1.6
    let WSTETHPriceFloat = 2000

    const results = await Promise.all([
        multicall<
            [
                CamelotMulticallRequest<CamelotNitroPool, 'settings'>,
                CamelotMulticallRequest<ERC20, 'balanceOf'>,
                CamelotMulticallRequest<ERC20, 'balanceOf'>
            ]
        >(geb, [
            {
                contract: camelotWSTETHNitroPool,
                function: 'settings',
                args: [],
            },
            {
                contract: odg,
                function: 'balanceOf',
                args: [camelotWSTETHNitroPool.address],
            },
            {
                contract: WSTETH,
                function: 'balanceOf',
                args: [camelotWSTETHNitroPool.address],
            },
        ]),
        camelotWSTETHNitroPool.rewardsToken1PerSecond(),
        Promise.resolve(odgMarketPriceFloat),
        Promise.resolve(WSTETHPriceFloat),
        address ? camelotWSTETHNitroPool.userInfo(address) : Promise.resolve(null),
    ])

    const [
        {
            returnData: [settings, [poolODGBalanceBN], [poolWSTETHBalanceBN]],
        },
        nitroRewardsPerSecond,
        odgMarketPrice,
        WSTETH_market_price,
        userInfo,
    ] = results as [
        { returnData: [any, BigNumber[], BigNumber[]] },
        BigNumber,
        number,
        number,
            {
                totalDepositAmount: BigNumber
                rewardDebtToken1: BigNumber
                rewardDebtToken2: BigNumber
                pendingRewardsToken1: BigNumber
                pendingRewardsToken2: BigNumber
            } | null
    ]

    const poolODGBalance = fromBigNumber(poolODGBalanceBN)
    const poolWSTETHBalance = fromBigNumber(poolWSTETHBalanceBN)
    const tvl = poolODGBalance * odgMarketPrice + poolWSTETHBalance * WSTETHPriceFloat
    const rewardsPerSecond = fromBigNumber(nitroRewardsPerSecond)
    const lpTokenBalance = userInfo ? fromBigNumber(userInfo.totalDepositAmount) : 0
    const apy = (rewardsPerSecond * SECONDS_IN_YEAR * odgMarketPrice) / tvl
    return {
        tvl,
        settings,
        rewardsPerSecond,
        lpTokenBalance,
        userInfo,
        apy,
    }
}

export { fetchNitroPoolODGWSTETH }
