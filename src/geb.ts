import { ethers } from 'ethers'
import { ContractApis } from './api/contract-apis'
import { Auctions } from './auctions'
import { TokenList, getTokenList } from './contracts/addreses'
import { ContractList, GebDeployment, getAddressList } from './contracts/index'
import { GebError, GebErrorTypes } from './errors'
import { BasicActions } from './proxy-action'
import { Safe } from './schema/safe'
import { ERC20, ERC20__factory } from './typechained'
import { NULL_ADDRESS } from './utils'
import { LiquidationActions } from './liquidation-actions'

/**
 * The main package used to interact with the GEB system. Includes [[deployProxy |helper functions]] for safe
 *  management and the [[contracts | contract interface object]] to directly call smart contracts.
 */
export class Geb {
    /**
     * Object containing all GEB core smart contract instances for direct level interactions. All of the
     * following contract objects are one-to-one API typed to the underlying smart contracts. Read-only
     * functions that do not change blockchain state return a promise of the return data. State modifying
     * function will synchronously return a pre-filled transaction request object:
     * ```
     * {
     *   to: "0x123abc.."
     *   data: "0xabab234ab..."
     * }
     * ```
     * This object follow the [[https://docs.ethers.io/v5/api/providers/types/#providers-TransactionRequest
     * TransactionRequest model of ethers.js]] (also similar to the
     * [[https://web3js.readthedocs.io/en/v1.3.0/web3-eth.html#id84 | model used by web.js]]). The object can
     * be completed with properties such as ` from `, ` gasPrice `, ` gas ` (gas limit, web3.js ony) or
     * ` gasLimit ` (gas limit, ethers.js only). The object can then be passed to the `sendTransaction` of
     * [[https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction|ehters.js]] or
     * [[https://web3js.readthedocs.io/en/v1.3.0/web3-eth.html#sendtransaction | web3.js]]
     *
     *  Example:
     *  ```typescript
     *  // Setup geb.js an ethers
     *  const provider = new ethers.providers.JsonRpcProvider('http://kovan.infura.io/<API KEY>')
     *  const wallet = new ethers.Wallet('<Private key>', provider)
     *  const geb = new Geb('kovan', provider)
     *
     *  // Contract read function: fetch the debt ceiling
     *  const debtCeiling = await geb.contracts.safeEngine.globalDebtCeiling()
     *
     *  // State changing function: manualy liquidate a SAFE
     *  const tx = geb.contracts.liquidationEngine.liquidateSAFE(ETH_A, '0x1234abc...')
     *  await wallet.sendTransaction(tx) // Send the Ethereum transaction
     *  ```
     *
     * Currently the following contracts ae available in this property:
     * - SAFEEngine
     * - AccountingEngine
     * - TaxCollector
     * - LiquidationEngine
     * - OracleRelayer
     * - GlobalSettlement
     * - DebtAuctionHouse
     * - PostSettlementSurplusAuctionHouse
     * - SettlementSurplusAuctioneer
     * - GebSafeManager
     * - GetSafes
     * - BasicCollateralJoin
     * - CoinJoin
     * - Coin (System coin ERC20 contract)
     * - GebProxyRegistry
     * - FixedDiscountCollateralAuctionHouse
     * - Weth (ERC20)
     *
     * For detailed information about the functions of each contract we recommend the smart contract
     * [[https://github.com/reflexer-labs/geb | code]] and [[https://docs.reflexer.finance/ |
     * documentation]]
     */
    public contracts: ContractApis
    public tokenList: TokenList
    public auctions: Auctions
    public liquidations: LiquidationActions
    public provider: ethers.providers.Provider
    public signer?: ethers.Signer
    protected addresses: ContractList

    /**
     * Constructor for the main Geb.js object.
     * @param  {GebDeployment} network Either `'kovan'`, `'mainnet'` or an actual list of contract addresses.
     * @param  {GebProviderInterface|ethers.providers.Provider} provider Either a Ethers.js provider or a Geb provider (support for Web3 will be added in the future)
     */
    constructor(
        public network: GebDeployment,
        signerOrProvider: ethers.Wallet | ethers.providers.JsonRpcSigner | ethers.providers.Provider
    ) {
        if (ethers.providers.JsonRpcSigner.isSigner(signerOrProvider)) {
            this.signer = signerOrProvider
            this.provider = signerOrProvider.provider
        } else if (ethers.providers.Provider.isProvider(signerOrProvider)) {
            this.provider = signerOrProvider
        } else {
            throw new GebError(GebErrorTypes.INVALID_PROVIDER)
        }

        this.addresses = getAddressList(network)
        this.tokenList = getTokenList(network)
        this.contracts = new ContractApis(network, signerOrProvider)
        this.auctions = new Auctions(this.contracts)
        this.liquidations = new LiquidationActions(this.contracts, this.tokenList)
    }

    /**
     * Given an address, it returns a BasicActions object used to execute bundled operations.
     * Important: This requires that the address deployed a GEB proxy through the proxy registry contract. It will throw a `DOES_NOT_OWN_HAVE_PROXY` error if the address specified does not have a proxy. Use the [[deployProxy]] function to get a new proxy.
     * @param ownerAddress Externally owned user account aka Ethereum address that owns a GEB proxy.
     */
    public async getProxyAction(ownerAddress: string) {
        const address = await this.contracts.proxyRegistry.proxies(ownerAddress)

        if (address === NULL_ADDRESS) {
            throw new GebError(GebErrorTypes.DOES_NOT_OWN_HAVE_PROXY)
        }
        return new BasicActions(address, this.network, this.signer.provider)
    }

    /**
     * Deploy a new proxy owned by the sender.
     */
    public async deployProxy() {
        return await this.contracts.proxyRegistry['build()']()
    }

    /**
     * Returns an object that can be used to interact with an ERC20 token.
     * Example:
     * ```typescript
     * const USDCAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
     * const USDC = geb.getErc20Contract(USDCAddress)
     *
     * // Get 0xdefiisawesome's balance
     * const balance = USDC.balanceOf("0xdefiisawesome..")
     *
     * // Send 1 USDC to 0xdefiisawesome (USDC is 6 decimals)
     * const tx = USDC.transfer("0xdefiisawesome..", "1000000")
     * await wallet.sendTransaction(tx)
     * ```
     *
     * @param  {string} tokenAddress Token contract address
     * @returns Erc20
     */
    public getErc20Contract(tokenAddress: string): ERC20 {
        return ERC20__factory.connect(tokenAddress, this.signer || this.provider)
    }
}
