import { ContractApis } from './api/contract-apis'
import { ERC20__factory, ERC20 } from './typechained'
import { getAddressList, ContractList, GebDeployment } from './contracts/index'
import { ethers } from 'ethers'
import { GebError, GebErrorTypes } from './errors'
import { GebProxyActions } from './proxy-action'
import { NULL_ADDRESS } from './utils'
import { Safe } from './schema/safe'

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
    public provider: ethers.providers.Provider
    public signer?: ethers.Signer
    protected addresses: ContractList
    /**
     * Constructor for the main Geb.js object.
     * @param  {GebDeployment} network Either `'kovan'`, `'mainnet'` or an actual list of contract addresses.
     * @param  {ethers.providers.Provider} provider Either a Ethers.js provider or a Geb provider (support for Web3 will be added in the future)
     */
    constructor(
        public network: GebDeployment,
        signerOrProvider:
            | ethers.providers.JsonRpcSigner
            | ethers.providers.Provider
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
        this.contracts = new ContractApis(network, signerOrProvider)
    }

    /**
     * Given an address, it returns a GebProxyActions object used to execute bundled operations.
     * Important: This requires that the address deployed a GEB proxy through the proxy registry contract. It will throw a `DOES_NOT_OWN_HAVE_PROXY` error if the address specified does not have a proxy. Use the [[deployProxy]] function to get a new proxy.
     * @param ownerAddress Externally owned user account aka Ethereum address that owns a GEB proxy.
     */
    public async getProxyAction(ownerAddress: string) {
        const address = await this.contracts.proxyRegistry.proxies(ownerAddress)

        if (address === NULL_ADDRESS) {
            throw new GebError(GebErrorTypes.DOES_NOT_OWN_HAVE_PROXY)
        }
        return new GebProxyActions(address, this.network, this.signer.provider)
    }

    /**
     * Deploy a new proxy owned by the sender.
     */
    public deployProxy() {
        return this.contracts.proxyRegistry['build()']()
    }

    /**
     * Get the SAFE object given a `safeManager` id or a `safeEngine` handler address.
     * @param idOrHandler Safe Id or SAFE handler
     */
    public async getSafe(
        idOrHandler: string | number,
        collateralType?: string
    ): Promise<Safe> {
        let handler: string
        let isManaged: boolean
        let safeId: number
        let safeData: {
            lockedCollateral: ethers.BigNumber
            generatedDebt: ethers.BigNumber
        }

        if (typeof idOrHandler === 'number') {
            if (collateralType) {
                throw new GebError(
                    GebErrorTypes.INVALID_FUNCTION_INPUT,
                    'Do not specify a collateral type when providing a SAFE Id.'
                )
            }

            isManaged = true
            safeId = idOrHandler
            handler = await this.contracts.safeManager.safes(idOrHandler)
            collateralType = await this.contracts.safeManager.collateralTypes(
                idOrHandler
            )

            if (handler === NULL_ADDRESS) {
                throw new GebError(
                    GebErrorTypes.SAFE_DOES_NOT_EXIST,
                    `Safe id ${idOrHandler} does not exist`
                )
            }

            safeData = await this.contracts.safeEngine.safes(
                collateralType,
                handler
            )
        } else {
            // We're given a handler
            if (!collateralType) {
                throw new GebError(
                    GebErrorTypes.INVALID_FUNCTION_INPUT,
                    'Collateral type needs to be specified when providing a SAFE handler'
                )
            }

            handler = idOrHandler
            safeData = await this.contracts.safeEngine.safes(
                collateralType,
                handler
            )
            const safeRights = await this.contracts.safeEngine.safeRights(
                handler,
                this.contracts.safeManager.address
            )

            // If SafeManager has rights over the safe, it's a managed safe
            isManaged = !safeRights.isZero()
            handler = idOrHandler
        }
        return new Safe(
            this.contracts,
            handler,
            safeData.generatedDebt,
            safeData.lockedCollateral,
            collateralType,
            isManaged,
            safeId
        )
    }

    /**
     * Fetch the list of safes owned by an address. This function will fetch safes owned directly
     * through the safeManager and safes owned through the safe manager by a proxy. Safes owned
     * directly by the address at the safeEngine level won't appear here.
     *
     * Note that this function will make a lot of network calls and is therefore very slow. For
     * front-ends we recommend using pre-indexed data from a source such as the geb-subgraph.
     *
     * @param  {string} address
     */
    public async getSafeFromOwner(address: string): Promise<Safe[]> {
        // Fetch safes for a proxy
        const proxy = await this.contracts.proxyRegistry.proxies(address)
        const safes: Safe[] = []
        let safeId = await this.contracts.safeManager.firstSAFEID(proxy)
        while (!safeId.isZero()) {
            safes.push(await this.getSafe(safeId.toNumber()))
            safeId = (await this.contracts.safeManager.safeList(safeId)).next
        }

        // Fetch safes that are owned directly
        safeId = await this.contracts.safeManager.firstSAFEID(address)
        while (!safeId.isZero()) {
            safes.push(await this.getSafe(safeId.toNumber()))
            safeId = (await this.contracts.safeManager.safeList(safeId)).next
        }
        return safes
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
        return ERC20__factory.connect(
            tokenAddress,
            this.signer || this.provider
        )
    }
}
