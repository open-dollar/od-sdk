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
    public stabilityFeeTreasury: types.StabilityFeeTreasury
    public safeManager: types.GebSafeManager
    public getSafes: types.GetSafes
    public joinCoin: types.CoinJoin
    public coin: types.ERC20
    public proxyRegistry: types.GebProxyRegistry
    public protocolToken: types.ERC20
    public medianizerEth: types.IBaseOracle
    public medianizerCoin: types.IBaseOracle
    public rateSetter: types.PIRateSetter
    public piCalculator: types.PRawPerSecondCalculator
    public weth: types.WETH9_
    public tokenCollateralAuctionHouse: { [key: string]: types.CollateralAuctionHouse }

    constructor(
        network: GebDeployment,
        signerOrProvider: ethers.providers.JsonRpcSigner | ethers.providers.Provider,
    ) {
        // Set the contract address list
        const addressList = getAddressList(network)
        const tokenList = getTokenList(network)

        this.safeEngine = types.SAFEEngine__factory.connect(addressList.GEB_SAFE_ENGINE, signerOrProvider)
        this.accountingEngine = types.AccountingEngine__factory.connect(addressList.GEB_ACCOUNTING_ENGINE, signerOrProvider)
        this.taxCollector = types.TaxCollector__factory.connect(addressList.GEB_TAX_COLLECTOR, signerOrProvider)
        this.liquidationEngine = types.LiquidationEngine__factory.connect(addressList.GEB_LIQUIDATION_ENGINE, signerOrProvider)
        this.oracleRelayer = types.OracleRelayer__factory.connect(addressList.GEB_ORACLE_RELAYER, signerOrProvider)
        this.globalSettlement = types.GlobalSettlement__factory.connect(addressList.GEB_GLOBAL_SETTLEMENT, signerOrProvider)
        this.debtAuctionHouse = types.DebtAuctionHouse__factory.connect(addressList.GEB_DEBT_AUCTION_HOUSE, signerOrProvider)
        this.surplusAuctionHouse = types.SurplusAuctionHouse__factory.connect(addressList.GEB_SURPLUS_AUCTION_HOUSE, signerOrProvider)
        this.stabilityFeeTreasury = types.StabilityFeeTreasury__factory.connect(addressList.GEB_STABILITY_FEE_TREASURY, signerOrProvider)
        this.safeManager = types.GebSafeManager__factory.connect(addressList.SAFE_MANAGER, signerOrProvider)
        this.getSafes = types.GetSafes__factory.connect(addressList.SAFE_MANAGER, signerOrProvider)
        this.joinCoin = types.CoinJoin__factory.connect(addressList.GEB_COIN_JOIN, signerOrProvider)
        this.coin = types.ERC20__factory.connect(tokenList.HAI.address, signerOrProvider)
        this.proxyRegistry = types.GebProxyRegistry__factory.connect(addressList.PROXY_REGISTRY, signerOrProvider)
        this.medianizerEth = types.IBaseOracle__factory.connect(addressList.MEDIANIZER_ETH, signerOrProvider)
        this.medianizerCoin = types.IBaseOracle__factory.connect(addressList.MEDIANIZER_RAI, signerOrProvider)
        this.rateSetter = types.PIRateSetter__factory.connect(addressList.GEB_RRFM_SETTER, signerOrProvider)
        this.piCalculator = types.PRawPerSecondCalculator__factory.connect(addressList.GEB_RRFM_CALCULATOR, signerOrProvider)
        this.weth = types.WETH9___factory.connect(addressList.ETH, signerOrProvider)
        this.protocolToken = types.ERC20__factory.connect(addressList.GEB_PROT, signerOrProvider)

        this.tokenCollateralAuctionHouse = Object.values(tokenList).filter(token => token.isCollateral).reduce((accum, token) => {
            const collateralAuctionHouse = types.CollateralAuctionHouse__factory.connect(token.collateralAuctionHouse, signerOrProvider)
            return { ...accum, [token.symbol]: collateralAuctionHouse }
        }, {})
    }
}
