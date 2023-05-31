import { ethers } from 'ethers'
import * as types from '../typechained'
import { GebDeployment, getAddressList } from '../contracts'

// Container class used to instantiate most GEB contracts
// prettier-ignore
export class ContractApis {

    public safeEngine: types.SAFEEngine
    public accountingEngine: types.AccountingEngine
    public taxCollector: types.TaxCollector
    public liquidationEngine: types.LiquidationEngine
    public oracleRelayer: types.OracleRelayer
    public globalSettlement: types.GlobalSettlement
    public debtAuctionHouse: types.DebtAuctionHouse
    public surplusAuctionHouse: types.BurningSurplusAuctionHouse
    public stabilityFeeTreasury: types.StabilityFeeTreasury
    public safeManager: types.GebSafeManager
    public getSafes: types.GetSafes
    public joinETH_A: types.BasicCollateralJoin
    public joinCoin: types.CoinJoin
    public coin: types.Coin
    public proxyRegistry: types.GebProxyRegistry
    public collateralAuctionHouseETH_A: types.FixedDiscountCollateralAuctionHouse
    public protocolToken: types.DSDelegateToken
    public medianizerEth: types.ChainlinkRelayer
    public medianizerCoin: types.UniswapConsecutiveSlotsMedianRAIUSD
    public rateSetter: types.PIRateSetter
    public piCalculator: types.PRawPerSecondCalculator
    public fsmEth: types.OSM
    public weth: types.WETH9_
    public stakingRewardFactory: types.StakingRewardsFactory
    public uniswapPairCoinEth: types.UniswapV2Pair
    public merkleDistributorFactory: types.MerkleDistributorFactory
    public coinNativeUniswapSaviour: types.NativeUnderlyingUniswapSafeSaviour
    public yearnCurveMaxSafeSaviour: types.YearnCurveMaxSafeSaviour
    public saviourCRatioSetter: types.SaviourCRatioSetter
    public saviourUniswapLiquidityManager: types.UniswapLiquidityManagerLike
    public uniswapV3PairCoinEth: types.UniswapV3Pool
    public uniswapV3TwoTrancheLiquidityManager: types.GebUniswapV3TwoTrancheManager
    public stakingFirstResort: types.GebLenderFirstResort
    public stakingAuctionHouse: types.StakedTokenAuctionHouse
    public stakingToken: types.ERC20
    public stakedProt: types.DSDelegateTokenNoTransfer
    public stakingEscrow: types.StakingRewardsEscrow

    constructor(
        network: GebDeployment,
        signerOrProvider: ethers.providers.JsonRpcSigner | ethers.providers.Provider,
    ) {
        // Set the contract address list
        const addressList = getAddressList(network)

        this.safeEngine = types.SAFEEngine__factory.connect(addressList.GEB_SAFE_ENGINE, signerOrProvider)
        this.accountingEngine = types.AccountingEngine__factory.connect(addressList.GEB_ACCOUNTING_ENGINE, signerOrProvider)
        this.taxCollector = types.TaxCollector__factory.connect(addressList.GEB_TAX_COLLECTOR, signerOrProvider)
        this.liquidationEngine = types.LiquidationEngine__factory.connect(addressList.GEB_LIQUIDATION_ENGINE, signerOrProvider)
        this.oracleRelayer = types.OracleRelayer__factory.connect(addressList.GEB_ORACLE_RELAYER, signerOrProvider)
        this.globalSettlement = types.GlobalSettlement__factory.connect(addressList.GEB_GLOBAL_SETTLEMENT, signerOrProvider)
        this.debtAuctionHouse = types.DebtAuctionHouse__factory.connect(addressList.GEB_DEBT_AUCTION_HOUSE, signerOrProvider)
        this.surplusAuctionHouse = types.BurningSurplusAuctionHouse__factory.connect(addressList.GEB_SURPLUS_AUCTION_HOUSE, signerOrProvider)
        this.stabilityFeeTreasury = types.StabilityFeeTreasury__factory.connect(addressList.GEB_STABILITY_FEE_TREASURY, signerOrProvider)
        this.safeManager = types.GebSafeManager__factory.connect(addressList.SAFE_MANAGER, signerOrProvider)
        this.getSafes = types.GetSafes__factory.connect(addressList.GET_SAFES, signerOrProvider)
        this.joinETH_A = types.BasicCollateralJoin__factory.connect(addressList.GEB_JOIN_ETH_A, signerOrProvider)
        this.joinCoin = types.CoinJoin__factory.connect(addressList.GEB_COIN_JOIN, signerOrProvider)
        this.coin = types.Coin__factory.connect(addressList.GEB_COIN, signerOrProvider)
        this.proxyRegistry = types.GebProxyRegistry__factory.connect(addressList.PROXY_REGISTRY, signerOrProvider)
        this.collateralAuctionHouseETH_A = types.FixedDiscountCollateralAuctionHouse__factory.connect(addressList.GEB_COLLATERAL_AUCTION_HOUSE_ETH_A, signerOrProvider)
        this.medianizerEth = types.ChainlinkRelayer__factory.connect(addressList.MEDIANIZER_ETH, signerOrProvider)
        this.medianizerCoin = types.UniswapConsecutiveSlotsMedianRAIUSD__factory.connect(addressList.MEDIANIZER_RAI, signerOrProvider)
        this.rateSetter = types.PIRateSetter__factory.connect(addressList.GEB_RRFM_SETTER, signerOrProvider)
        this.piCalculator = types.PRawPerSecondCalculator__factory.connect(addressList.GEB_RRFM_CALCULATOR, signerOrProvider)
        this.fsmEth = types.OSM__factory.connect(addressList.FEED_SECURITY_MODULE_ETH, signerOrProvider)
        this.weth = types.WETH9___factory.connect(addressList.ETH, signerOrProvider)
        this.protocolToken = types.DSDelegateToken__factory.connect(addressList.GEB_PROT, signerOrProvider)
        this.stakingRewardFactory = types.StakingRewardsFactory__factory.connect(addressList.GEB_INCENTIVES_MINER, signerOrProvider)
        this.uniswapPairCoinEth = types.UniswapV2Pair__factory.connect(addressList.GEB_COIN_UNISWAP_POOL, signerOrProvider)
        this.merkleDistributorFactory = types.MerkleDistributorFactory__factory.connect(addressList.MERKLE_DISTRIBUTOR_FACTORY, signerOrProvider)
        this.coinNativeUniswapSaviour = types.NativeUnderlyingUniswapSafeSaviour__factory.connect(addressList.GEB_COIN_ETH_UNISWAP_V2_POOL_SAVIOUR, signerOrProvider)
        this.yearnCurveMaxSafeSaviour = types.YearnCurveMaxSafeSaviour__factory.connect(addressList.GEB_YEARN_CURVE_MAX_SAVIOUR, signerOrProvider)
        this.saviourCRatioSetter = types.SaviourCRatioSetter__factory.connect(addressList.GEB_SAVIOUR_CRATIO_SETTER, signerOrProvider)
        this.saviourUniswapLiquidityManager = types.UniswapLiquidityManagerLike__factory.connect(addressList.GEB_UNISWAP_SAVIOUR_LIQUIDITY_MANAGER, signerOrProvider)
        this.uniswapV3PairCoinEth = types.UniswapV3Pool__factory.connect(addressList.GEB_COIN_UNISWAP_V3_POOL, signerOrProvider)
        this.uniswapV3TwoTrancheLiquidityManager = types.GebUniswapV3TwoTrancheManager__factory.connect(addressList.GEB_UNISWAP_TWO_TRANCHE_MANAGER, signerOrProvider)
        this.stakingFirstResort = types.GebLenderFirstResort__factory.connect(addressList.GEB_STAKING, signerOrProvider)
        this.stakingAuctionHouse = types.StakedTokenAuctionHouse__factory.connect(addressList.GEB_STAKING_AUCTION_HOUSE, signerOrProvider)
        this.stakingToken = types.ERC20__factory.connect(addressList.GEB_STAKING_TOKEN, signerOrProvider)
        this.stakedProt = types.DSDelegateTokenNoTransfer__factory.connect(addressList.GEB_STAKED_PROT, signerOrProvider)
        this.stakingEscrow = types.StakingRewardsEscrow__factory.connect(addressList.GEB_STAKING_REWARDS_ESCROW, signerOrProvider)
    }
}
