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

const fetchNitroPool = async (geb: Geb, collateralType: 'RETH' | 'WSTETH', address: string | null): Promise<NitroPoolDetails> => {
    const ODGAddress = geb.tokenList['ODG'].address
    const collateralAddress = geb.tokenList[collateralType].address

    if (!ODGAddress || !collateralAddress) {
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
    const collateral = geb.getErc20Contract(collateralAddress)

    const camelotNitroPool = await geb.contracts[`camelot${collateralType}NitroPool`]

    let odgMarketPriceFloat = 1.6
    // Hardcode price for now
    let collateralPriceFloat = collateralType === 'WSTETH' ? 2000 : 1700

    const results = await Promise.all([
        multicall<
            [
                CamelotMulticallRequest<CamelotNitroPool, 'settings'>,
                CamelotMulticallRequest<ERC20, 'balanceOf'>,
                CamelotMulticallRequest<ERC20, 'balanceOf'>
            ]
        >(geb, [
            {
                contract: camelotNitroPool,
                function: 'settings',
                args: [],
            },
            {
                contract: odg,
                function: 'balanceOf',
                args: [camelotNitroPool.address],
            },
            {
                contract: collateral,
                function: 'balanceOf',
                args: [camelotNitroPool.address],
            },
        ]),
        camelotNitroPool.rewardsToken1PerSecond(),
        Promise.resolve(odgMarketPriceFloat),
        Promise.resolve(collateralPriceFloat),
        address ? camelotNitroPool.userInfo(address) : Promise.resolve(null),
    ])

    const [
        {
            returnData: [settings, [poolODGBalanceBN], [poolCollateralBalanceBN]],
        },
        nitroRewardsPerSecond,
        odgMarketPrice,
        collateralMarketPrice,
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
    const poolCollateralBalance = fromBigNumber(poolCollateralBalanceBN)
    const tvl = poolODGBalance * odgMarketPrice + poolCollateralBalance * collateralMarketPrice
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

export { fetchNitroPool }