import { ethers } from 'ethers'
import * as types from '../typechained'
import { GebDeployment, getAddressList } from '../contracts'
import { getTokenList } from '../contracts/addreses'

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
    public surplusAuctionHouse: types.SurplusAuctionHouse
    public postSettlementSurplusAuctionHouse: types.PostSettlementSurplusAuctionHouse
    public postSettlementSurplusAuctioneer: types.SettlementSurplusAuctioneer
    public stabilityFeeTreasury: types.StabilityFeeTreasury
    public safeManager: types.HaiSafeManager
    public joinCoin: types.CoinJoin
    public proxyRegistry: types.HaiProxyRegistry
    public rateSetter: types.PIDRateSetter
    public piCalculator: types.PIDController

    public oracleJob: types.OracleJob
    public accountingJob: types.AccountingJob
    public liquidationJob: types.LiquidationJob
    
    public protocolToken: types.ERC20
    public systemCoin: types.ERC20
    public weth: types.WETH9

    public tokenCollateralJoin: { [key: string]: types.CoinJoin }
    public tokenCollateralAuctionHouse: { [key: string]: types.CollateralAuctionHouse }

    constructor(
        network: GebDeployment,
        signerOrProvider: ethers.Wallet | ethers.providers.JsonRpcSigner | ethers.providers.Provider,
    ) {
        // Set the contract address list
        const addressList = getAddressList(network)
        const tokenList = getTokenList(network)

        this.systemCoin = types.ERC20__factory.connect(addressList.GEB_SYSTEM_COIN, signerOrProvider)
        this.protocolToken = types.ERC20__factory.connect(addressList.GEB_PROTOCOL_TOKEN, signerOrProvider)
        this.safeEngine = types.SAFEEngine__factory.connect(addressList.GEB_SAFE_ENGINE, signerOrProvider)
        this.accountingEngine = types.AccountingEngine__factory.connect(addressList.GEB_ACCOUNTING_ENGINE, signerOrProvider)
        this.taxCollector = types.TaxCollector__factory.connect(addressList.GEB_TAX_COLLECTOR, signerOrProvider)
        this.liquidationEngine = types.LiquidationEngine__factory.connect(addressList.GEB_LIQUIDATION_ENGINE, signerOrProvider)
        this.oracleRelayer = types.OracleRelayer__factory.connect(addressList.GEB_ORACLE_RELAYER, signerOrProvider)
        this.globalSettlement = types.GlobalSettlement__factory.connect(addressList.GEB_GLOBAL_SETTLEMENT, signerOrProvider)
        this.debtAuctionHouse = types.DebtAuctionHouse__factory.connect(addressList.GEB_DEBT_AUCTION_HOUSE, signerOrProvider)
        this.surplusAuctionHouse = types.SurplusAuctionHouse__factory.connect(addressList.GEB_SURPLUS_AUCTION_HOUSE, signerOrProvider)
        this.postSettlementSurplusAuctionHouse = types.PostSettlementSurplusAuctionHouse__factory.connect(addressList.GEB_POST_SETTLEMENT_SURPLUS_AUCTION_HOUSE, signerOrProvider)
        this.postSettlementSurplusAuctioneer = types.SettlementSurplusAuctioneer__factory.connect(addressList.GEB_POST_SETTLEMENT_SURPLUS_AUCTIONEER, signerOrProvider)
        this.stabilityFeeTreasury = types.StabilityFeeTreasury__factory.connect(addressList.GEB_STABILITY_FEE_TREASURY, signerOrProvider)
        this.joinCoin = types.CoinJoin__factory.connect(addressList.GEB_COIN_JOIN, signerOrProvider)
        this.rateSetter = types.PIDRateSetter__factory.connect(addressList.GEB_RRFM_SETTER, signerOrProvider)
        this.piCalculator = types.PIDController__factory.connect(addressList.GEB_RRFM_CALCULATOR, signerOrProvider)
        
        this.oracleJob = types.OracleJob__factory.connect(addressList.JOB_ORACLES, signerOrProvider)
        this.accountingJob = types.AccountingJob__factory.connect(addressList.JOB_ACCOUNTING, signerOrProvider)
        this.liquidationJob = types.LiquidationJob__factory.connect(addressList.JOB_LIQUIDATION, signerOrProvider)

        this.safeManager = types.HaiSafeManager__factory.connect(addressList.SAFE_MANAGER, signerOrProvider)
        this.proxyRegistry = types.HaiProxyRegistry__factory.connect(addressList.PROXY_REGISTRY, signerOrProvider)
        
        this.weth = types.WETH9__factory.connect(addressList.ETH, signerOrProvider)

        this.tokenCollateralAuctionHouse = Object.values(tokenList).filter(token => token.isCollateral).reduce((accum, token) => {
            const collateralAuctionHouse = types.CollateralAuctionHouse__factory.connect(token.collateralAuctionHouse, signerOrProvider)
            return { ...accum, [token.symbol]: collateralAuctionHouse }
        }, {})
    }
}
