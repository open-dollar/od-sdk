import { ContractList, GebDeployment, getAddressList } from './contracts'
import { BytesLike } from '@ethersproject/bytes'
import { BigNumberish } from '@ethersproject/bignumber'
import { BigNumber } from '@ethersproject/bignumber'
import { ethers } from 'ethers'

import * as types from './typechained'
import { NULL_ADDRESS } from './utils'

/**
 * Convenience class to call functions from [GebProxyActions](https://github.com/reflexer-labs/geb-proxy-actions/blob/master/src/GebProxyActions.sol) through a proxy contract registered in the [GebProxyRegistry](https://github.com/reflexer-labs/geb-proxy-registry/blob/master/src/GebProxyRegistry.sol). These actions bundle multiple actions in one (e.g: open a safe + lock some ETH + draw some system coins).
 */
export class GebProxyActions {
    /**
     * Underlying proxy object. Can be use to make custom calls to the proxy using `proxy.execute()` function.
     * For the details of each function
     */
    public proxy: types.DSProxy

    /**
     * Address of the base proxy actions contract.
     */
    public proxyActionCoreAddress: string

    /**
     * Address of the proxy actions contract for global settlement.
     */
    public proxyActionGlobalSettlementAddress: string

    /**
     * Address of the proxy actions contract for Uniswap LP share staking.
     */
    public proxyActionIncentiveAddress: string

    /**
     * Address of the proxy actions contract used for leverage with flash loans.
     */
    public proxyActionLeverageAddress: string

    /**
     * Address of the proxy actions contract for debt auctions.
     */
    public proxyActionDebtAuctionAddress: string

    /**
     * Address of the proxy actions contract for surplus auctions.
     */
    public proxyActionSurplusAuctionAddress: string

    /**
     * Address of the proxy actions contract for staked token auctions.
     */
    public proxyStakedTokenAuctionAddress: string

    /**
     * Address of the proxy actions contract for surplus auctions.
     */
    public proxyActionSaviourAddress: string

    private addressList: ContractList
    private proxyActionCore: types.GebProxyActions
    private proxyActionGlobalSettlement: types.GebProxyActionsGlobalSettlement
    private proxyActionIncentive: types.GebProxyIncentivesActions
    private proxyActionLeverage: types.GebProxyLeverageActions
    private proxyActionDebtAuction: types.GebProxyDebtAuctionActions
    private proxyActionSurplusAuction: types.GebProxySurplusAuctionActions
    private proxyStakedTokenAuction: types.GebProxyStakedTokenAuctionActions
    private proxyActionSaviour: types.GebProxySaviourActions

    constructor(
        /**
         * Address of the underlying proxy
         */
        public proxyAddress: string,
        network: GebDeployment,
        private chainProvider: ethers.providers.Provider
    ) {
        this.addressList = getAddressList(network)

        this.proxy = types.DSProxy__factory.connect(
            proxyAddress,
            this.chainProvider
        )

        // Set proxy action contract addresses
        this.proxyActionCoreAddress = this.addressList.PROXY_ACTIONS
        this.proxyActionGlobalSettlementAddress =
            this.addressList.PROXY_ACTIONS_GLOBAL_SETTLEMENT
        this.proxyActionIncentiveAddress =
            this.addressList.PROXY_ACTIONS_INCENTIVES
        this.proxyActionLeverageAddress = this.addressList.LEVERAGE_PROXY_ACTION
        this.proxyActionDebtAuctionAddress =
            this.addressList.PROXY_DEBT_AUCTION_ACTIONS
        this.proxyActionSurplusAuctionAddress =
            this.addressList.PROXY_SURPLUS_AUCTION_ACTIONS
        this.proxyStakedTokenAuctionAddress =
            this.addressList.GEB_STAKED_TOKEN_PROXY_ACTIONS
        this.proxyActionSaviourAddress = this.addressList.PROXY_SAVIOUR_ACTIONS

        // Proxy contract APIs
        this.proxyActionCore = types.GebProxyActions__factory.connect(
            this.proxyActionCoreAddress,
            this.chainProvider
        )
        this.proxyActionGlobalSettlement =
            types.GebProxyActionsGlobalSettlement__factory.connect(
                this.proxyActionGlobalSettlementAddress,
                this.chainProvider
            )

        this.proxyActionIncentive =
            types.GebProxyIncentivesActions__factory.connect(
                this.proxyActionIncentiveAddress,
                this.chainProvider
            )

        this.proxyActionLeverage =
            types.GebProxyLeverageActions__factory.connect(
                this.proxyActionLeverageAddress,
                this.chainProvider
            )
        this.proxyActionDebtAuction =
            types.GebProxyDebtAuctionActions__factory.connect(
                this.proxyActionDebtAuctionAddress,
                this.chainProvider
            )
        this.proxyActionSurplusAuction =
            types.GebProxySurplusAuctionActions__factory.connect(
                this.proxyActionSurplusAuctionAddress,
                this.chainProvider
            )
        this.proxyStakedTokenAuction =
            types.GebProxyStakedTokenAuctionActions__factory.connect(
                this.proxyStakedTokenAuctionAddress,
                this.chainProvider
            )
        this.proxyActionSaviour = types.GebProxySaviourActions__factory.connect(
            this.proxyActionSaviourAddress,
            this.chainProvider
        )
    }

    private async getProxiedTransactionRequest(
        txPromise: Promise<ethers.PopulatedTransaction>
    ): Promise<ethers.PopulatedTransaction> {
        const tx = await txPromise
        let ethValue = tx.value
        if (!ethValue) {
            ethValue = BigNumber.from('0')
        }

        if (tx.to === NULL_ADDRESS) {
            throw Error('This proxy action is not supported on this network')
        }

        return this.proxy.populateTransaction['execute(address,bytes)'](
            tx.to,
            tx.data,
            { value: ethValue }
        )
    }

    // ==== Proxy Action Core ====

    allowSAFE(
        safe: BigNumberish,
        usr: string,
        ok: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.allowSAFE(
                this.addressList.SAFE_MANAGER,
                safe,
                usr,
                ok
            )
        )
    }

    approveSAFEModification(
        obj: string,
        usr: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.approveSAFEModification(
                obj,
                usr
            )
        )
    }

    coinJoin_join(
        apt: string,
        safeHandler: string,
        wad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.coinJoin_join(
                apt,
                safeHandler,
                wad
            )
        )
    }

    denySAFEModification(
        obj: string,
        usr: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.denySAFEModification(
                obj,
                usr
            )
        )
    }

    enterSystem(
        src: string,
        safe: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.enterSystem(
                this.addressList.SAFE_MANAGER,
                src,
                safe
            )
        )
    }

    exitETH(
        safe: BigNumberish,
        wad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.exitETH(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                safe,
                wad
            )
        )
    }

    exitTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        amt: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.exitTokenCollateral(
                this.addressList.SAFE_MANAGER,
                collateralJoin,
                safe,
                amt
            )
        )
    }

    freeETH(
        safe: BigNumberish,
        wad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.freeETH(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                safe,
                wad
            )
        )
    }

    freeTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        amt: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.freeTokenCollateral(
                this.addressList.SAFE_MANAGER,
                collateralJoin,
                safe,
                amt
            )
        )
    }

    generateDebt(
        safe: BigNumberish,
        wad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.generateDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                safe,
                wad
            )
        )
    }

    generateDebtAndProtectSAFE(
        safe: BigNumberish,
        wad: BigNumberish,
        saviour: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.generateDebtAndProtectSAFE(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                safe,
                wad,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                saviour
            )
        )
    }

    lockETH(
        ethValue: BigNumberish,
        safe: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.lockETH(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                safe,
                { value: ethValue }
            )
        )
    }

    lockETHAndGenerateDebt(
        ethValue: BigNumberish,
        safe: BigNumberish,
        deltaWad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.lockETHAndGenerateDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                safe,
                deltaWad,
                { value: ethValue }
            )
        )
    }

    lockTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        amt: BigNumberish,
        transferFrom: boolean
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.lockTokenCollateral(
                this.addressList.SAFE_MANAGER,
                collateralJoin,
                safe,
                amt,
                transferFrom
            )
        )
    }

    lockTokenCollateralAndGenerateDebt(
        collateralJoin: string,
        safe: BigNumberish,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish,
        transferFrom: boolean
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.lockTokenCollateralAndGenerateDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                collateralJoin,
                this.addressList.GEB_COIN_JOIN,
                safe,
                collateralAmount,
                deltaWad,
                transferFrom
            )
        )
    }

    lockTokenCollateralGenerateDebtAndProtectSAFE(
        collateralJoin: string,
        safe: BigNumberish,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish,
        transferFrom: boolean,
        saviour: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.lockTokenCollateralGenerateDebtAndProtectSAFE(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                collateralJoin,
                this.addressList.GEB_COIN_JOIN,
                safe,
                collateralAmount,
                deltaWad,
                transferFrom,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                saviour
            )
        )
    }

    makeCollateralBag(
        collateralJoin: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.makeCollateralBag(
                collateralJoin
            )
        )
    }

    modifySAFECollateralization(
        safe: BigNumberish,
        deltaCollateral: BigNumberish,
        deltaDebt: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.modifySAFECollateralization(
                this.addressList.SAFE_MANAGER,
                safe,
                deltaCollateral,
                deltaDebt
            )
        )
    }

    moveSAFE(
        safeSrc: BigNumberish,
        safeDst: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.moveSAFE(
                this.addressList.SAFE_MANAGER,
                safeSrc,
                safeDst
            )
        )
    }

    openLockETHAndGenerateDebt(
        ethValue: BigNumberish,
        collateralType: BytesLike,
        deltaWad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.openLockETHAndGenerateDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                collateralType,
                deltaWad,
                { value: ethValue }
            )
        )
    }

    openLockETHGenerateDebtAndProtectSAFE(
        ethValue: BigNumberish,
        collateralType: BytesLike,
        deltaWad: BigNumberish,
        saviour: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.openLockETHGenerateDebtAndProtectSAFE(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                collateralType,
                deltaWad,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                saviour,
                { value: ethValue }
            )
        )
    }

    openLockGNTAndGenerateDebt(
        gntJoin: string,
        collateralType: BytesLike,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.openLockGNTAndGenerateDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                gntJoin,
                this.addressList.GEB_COIN_JOIN,
                collateralType,
                collateralAmount,
                deltaWad
            )
        )
    }

    openLockGNTGenerateDebtAndProtectSAFE(
        gntJoin: string,
        collateralType: BytesLike,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish,
        saviour: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.openLockGNTGenerateDebtAndProtectSAFE(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                gntJoin,
                this.addressList.GEB_COIN_JOIN,
                collateralType,
                collateralAmount,
                deltaWad,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                saviour
            )
        )
    }

    openLockTokenCollateralAndGenerateDebt(
        collateralJoin: string,
        collateralType: BytesLike,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish,
        transferFrom: boolean
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.openLockTokenCollateralAndGenerateDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                collateralJoin,
                this.addressList.GEB_COIN_JOIN,
                collateralType,
                collateralAmount,
                deltaWad,
                transferFrom
            )
        )
    }

    openLockTokenCollateralGenerateDebtAndProtectSAFE(
        collateralJoin: string,
        collateralType: BytesLike,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish,
        transferFrom: boolean,
        saviour: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.openLockTokenCollateralGenerateDebtAndProtectSAFE(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                collateralJoin,
                this.addressList.GEB_COIN_JOIN,
                collateralType,
                collateralAmount,
                deltaWad,
                transferFrom,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                saviour
            )
        )
    }

    openSAFE(
        collateralType: BytesLike,
        usr: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.openSAFE(
                this.addressList.SAFE_MANAGER,
                collateralType,
                usr
            )
        )
    }

    quitSystem(
        safe: BigNumberish,
        dst: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.quitSystem(
                this.addressList.SAFE_MANAGER,
                safe,
                dst
            )
        )
    }

    repayAllDebt(safe: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.repayAllDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_COIN_JOIN,
                safe
            )
        )
    }

    repayAllDebtAndFreeETH(
        safe: BigNumberish,
        collateralWad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.repayAllDebtAndFreeETH(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                safe,
                collateralWad
            )
        )
    }

    repayAllDebtAndFreeTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        collateralAmount: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.repayAllDebtAndFreeTokenCollateral(
                this.addressList.SAFE_MANAGER,
                collateralJoin,
                this.addressList.GEB_COIN_JOIN,
                safe,
                collateralAmount
            )
        )
    }

    repayDebt(
        safe: BigNumberish,
        wad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.repayDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_COIN_JOIN,
                safe,
                wad
            )
        )
    }

    repayDebtAndFreeETH(
        safe: BigNumberish,
        collateralWad: BigNumberish,
        deltaWad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.repayDebtAndFreeETH(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                safe,
                collateralWad,
                deltaWad
            )
        )
    }

    repayDebtAndFreeTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.repayDebtAndFreeTokenCollateral(
                this.addressList.SAFE_MANAGER,
                collateralJoin,
                this.addressList.GEB_COIN_JOIN,
                safe,
                collateralAmount,
                deltaWad
            )
        )
    }

    safeLockETH(
        ethValue: BigNumberish,
        safe: BigNumberish,
        owner: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.safeLockETH(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                safe,
                owner,
                { value: ethValue }
            )
        )
    }

    safeLockTokenCollateral(
        collateralJoin: string,
        safe: BigNumberish,
        amt: BigNumberish,
        transferFrom: boolean,
        owner: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.safeLockTokenCollateral(
                this.addressList.SAFE_MANAGER,
                collateralJoin,
                safe,
                amt,
                transferFrom,
                owner
            )
        )
    }

    safeRepayAllDebt(
        safe: BigNumberish,
        owner: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.safeRepayAllDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_COIN_JOIN,
                safe,
                owner
            )
        )
    }

    safeRepayDebt(
        safe: BigNumberish,
        wad: BigNumberish,
        owner: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.safeRepayDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_COIN_JOIN,
                safe,
                wad,
                owner
            )
        )
    }

    tokenCollateralJoin_join(
        apt: string,
        safe: string,
        amt: BigNumberish,
        transferFrom: boolean
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.tokenCollateralJoin_join(
                apt,
                safe,
                amt,
                transferFrom
            )
        )
    }

    transfer(
        collateral: string,
        dst: string,
        amt: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.transfer(
                collateral,
                dst,
                amt
            )
        )
    }

    transferCollateral(
        safe: BigNumberish,
        dst: string,
        wad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.transferCollateral(
                this.addressList.SAFE_MANAGER,
                safe,
                dst,
                wad
            )
        )
    }

    transferInternalCoins(
        safe: BigNumberish,
        dst: string,
        rad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.transferInternalCoins(
                this.addressList.SAFE_MANAGER,
                safe,
                dst,
                rad
            )
        )
    }

    transferSAFEOwnership(
        safe: BigNumberish,
        usr: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.transferSAFEOwnership(
                this.addressList.SAFE_MANAGER,
                safe,
                usr
            )
        )
    }

    transferSAFEOwnershipToProxy(
        safe: BigNumberish,
        dst: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.transferSAFEOwnershipToProxy(
                this.addressList.PROXY_REGISTRY,
                this.addressList.SAFE_MANAGER,
                safe,
                dst
            )
        )
    }

    // ==== Proxy Actions Global Settlement ====

    prepareCoinsForRedeemingGlobalSettlement(
        wad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionGlobalSettlement.prepareCoinsForRedeeming(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.GEB_GLOBAL_SETTLEMENT,
                wad
            )
        )
    }

    freeTokenCollateralGlobalSettlement(
        collateralJoin: string,
        safe: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionGlobalSettlement.freeTokenCollateral(
                this.addressList.SAFE_MANAGER,
                collateralJoin,
                this.addressList.GEB_GLOBAL_SETTLEMENT,
                safe
            )
        )
    }

    redeemETHGlobalSettlement(
        ethJoin: string,
        collateralType: BytesLike,
        wad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionGlobalSettlement.redeemETH(
                ethJoin,
                this.addressList.GEB_GLOBAL_SETTLEMENT,
                collateralType,
                wad
            )
        )
    }

    redeemTokenCollateralGlobalSettlement(
        collateralJoin: string,
        collateralType: BytesLike,
        wad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionGlobalSettlement.redeemTokenCollateral(
                collateralJoin,
                this.addressList.GEB_GLOBAL_SETTLEMENT,
                collateralType,
                wad
            )
        )
    }

    // ==== Proxy Actions Incentive ====

    exitAndRemoveLiquidity(
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.exitAndRemoveLiquidity(
                this.addressList.GEB_COIN_JOIN,
                campaignAddress,
                this.addressList.UNISWAP_ROUTER,
                minTokenAmounts
            )
        )
    }

    exitMine(campaignAddress: string): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.exitMine(campaignAddress)
        )
    }

    exitRemoveLiquidityRepayDebt(
        safe: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.exitRemoveLiquidityRepayDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_COIN_JOIN,
                safe,
                campaignAddress,
                this.addressList.UNISWAP_ROUTER,
                minTokenAmounts
            )
        )
    }

    generateDebtAndProvideLiquidityStake(
        ethValue: BigNumberish,
        safe: BigNumberish,
        wad: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.generateDebtAndProvideLiquidityStake(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.UNISWAP_ROUTER,
                campaignAddress,
                safe,
                wad,
                minTokenAmounts,
                { value: ethValue }
            )
        )
    }

    generateDebtAndProvideLiquidityUniswap(
        ethValue: BigNumberish,
        safe: BigNumberish,
        wad: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.generateDebtAndProvideLiquidityUniswap(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.UNISWAP_ROUTER,
                safe,
                wad,
                minTokenAmounts,
                { value: ethValue }
            )
        )
    }

    lockETHGenerateDebtProvideLiquidityStake(
        ethValue: BigNumberish,
        safe: BigNumberish,
        deltaWad: BigNumberish,
        liquidityWad: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.lockETHGenerateDebtProvideLiquidityStake(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.UNISWAP_ROUTER,
                campaignAddress,
                safe,
                deltaWad,
                liquidityWad,
                minTokenAmounts,
                { value: ethValue }
            )
        )
    }

    lockETHGenerateDebtProvideLiquidityUniswap(
        ethValue: BigNumberish,
        safe: BigNumberish,
        deltaWad: BigNumberish,
        liquidityWad: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish]
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.lockETHGenerateDebtProvideLiquidityUniswap(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.UNISWAP_ROUTER,
                safe,
                deltaWad,
                liquidityWad,
                minTokenAmounts,
                { value: ethValue }
            )
        )
    }

    openLockETHGenerateDebtProvideLiquidityStake(
        ethValue: BigNumberish,
        deltaWad: BigNumberish,
        collateralType: string,
        liquidityWad: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.openLockETHGenerateDebtProvideLiquidityStake(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.UNISWAP_ROUTER,
                campaignAddress,
                collateralType,
                deltaWad,
                liquidityWad,
                minTokenAmounts,
                { value: ethValue }
            )
        )
    }

    openLockETHGenerateDebtProvideLiquidityUniswap(
        ethValue: BigNumberish,
        deltaWad: BigNumberish,
        collateralType: string,
        liquidityWad: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish]
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.openLockETHGenerateDebtProvideLiquidityUniswap(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.UNISWAP_ROUTER,
                collateralType,
                deltaWad,
                liquidityWad,
                minTokenAmounts,
                { value: ethValue }
            )
        )
    }

    provideLiquidityUniswap(
        ethValue: BigNumberish,
        wad: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish]
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.provideLiquidityUniswap(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.UNISWAP_ROUTER,
                wad,
                minTokenAmounts,
                { value: ethValue }
            )
        )
    }

    removeLiquidityUniswap(
        systemCoin: string,
        value: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish]
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.removeLiquidityUniswap(
                this.addressList.UNISWAP_ROUTER,
                systemCoin,
                value,
                minTokenAmounts
            )
        )
    }

    stakeInMine(
        wad: BigNumberish,
        campaignAddress: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.stakeInMine(campaignAddress, wad)
        )
    }

    withdrawAndHarvest(
        value: BigNumberish,
        campaignAddress: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.withdrawAndHarvest(campaignAddress, value)
        )
    }

    withdrawAndRemoveLiquidity(
        value: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.withdrawAndRemoveLiquidity(
                this.addressList.GEB_COIN_JOIN,
                campaignAddress,
                value,
                this.addressList.UNISWAP_ROUTER,
                minTokenAmounts
            )
        )
    }

    withdrawFromMine(
        value: BigNumberish,
        campaignAddress: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.withdrawFromMine(campaignAddress, value)
        )
    }

    withdrawRemoveLiquidityRepayDebt(
        safe: BigNumberish,
        value: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.withdrawRemoveLiquidityRepayDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_COIN_JOIN,
                safe,
                campaignAddress,
                value,
                this.addressList.UNISWAP_ROUTER,
                minTokenAmounts
            )
        )
    }

    getRewards(campaignAddress: string): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.getRewards(campaignAddress)
        )
    }

    provideLiquidityStake(
        ethValue: BigNumberish,
        wad: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.provideLiquidityStake(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.UNISWAP_ROUTER,
                campaignAddress,
                wad,
                minTokenAmounts,
                { value: ethValue }
            )
        )
    }

    withdrawHarvestRemoveLiquidity(
        amount: BigNumberish,
        minTokenAmounts: [BigNumberish, BigNumberish],
        campaignAddress: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.withdrawHarvestRemoveLiquidity(
                campaignAddress,
                this.addressList.UNISWAP_ROUTER,
                this.addressList.GEB_COIN,
                amount,
                minTokenAmounts
            )
        )
    }

    migrateCampaign(
        oldCampaignAddress: string,
        newCampaignAddress: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionIncentive.migrateCampaign(
                oldCampaignAddress,
                newCampaignAddress
            )
        )
    }

    // ==== Proxy Actions Leverage ====

    flashDeleverage(
        uniswapV2Pair: string,
        callbackProxy: string,
        collateralType: BytesLike,
        safe: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionLeverage.flashDeleverage(
                uniswapV2Pair,
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.ETH,
                callbackProxy,
                collateralType,
                safe
            )
        )
    }

    flashDeleverageFreeETH(
        uniswapV2Pair: string,
        callbackProxy: string,
        collateralType: BytesLike,
        safe: BigNumberish,
        amountToFree: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionLeverage.flashDeleverageFreeETH(
                uniswapV2Pair,
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.ETH,
                callbackProxy,
                collateralType,
                safe,
                amountToFree
            )
        )
    }

    flashLeverage(
        uniswapV2Pair: string,
        callbackProxy: string,
        collateralType: BytesLike,
        safe: BigNumberish,
        leverage: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionLeverage.flashLeverage(
                uniswapV2Pair,
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.ETH,
                callbackProxy,
                collateralType,
                safe,
                leverage
            )
        )
    }

    lockETHLeverage(
        ethValue: BigNumberish,
        uniswapV2Pair: string,
        callbackProxy: string,
        collateralType: BytesLike,
        safe: BigNumberish,
        leverage: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionLeverage.lockETHLeverage(
                uniswapV2Pair,
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.ETH,
                callbackProxy,
                collateralType,
                safe,
                leverage,
                { value: ethValue }
            )
        )
    }

    openLockETHLeverage(
        ethValue: BigNumberish,
        uniswapV2Pair: string,
        callbackProxy: string,
        collateralType: BytesLike,
        leverage: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionLeverage.openLockETHLeverage(
                uniswapV2Pair,
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_JOIN_ETH_A,
                this.addressList.GEB_TAX_COLLECTOR,
                this.addressList.GEB_COIN_JOIN,
                this.addressList.ETH,
                callbackProxy,
                collateralType,
                leverage,
                { value: ethValue }
            )
        )
    }

    uniswapV2Call(
        _sender: string,
        _amount0: BigNumberish,
        _amount1: BigNumberish,
        _data: BytesLike
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionLeverage.uniswapV2Call(
                _sender,
                _amount0,
                _amount1,
                _data
            )
        )
    }

    // ==== Proxy Actions Debt Auctions ====

    debtAuctionStartAndDecreaseSoldAmount(
        amountToBuy: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionDebtAuction.startAndDecreaseSoldAmount(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.GEB_ACCOUNTING_ENGINE,
                amountToBuy
            )
        )
    }

    debtAuctionDecreaseSoldAmount(
        amountToBuy: BigNumberish,
        auctionId: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionDebtAuction.decreaseSoldAmount(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.GEB_DEBT_AUCTION_HOUSE,
                auctionId,
                amountToBuy
            )
        )
    }

    debtAuctionSettleAuction(
        auctionId: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionDebtAuction.settleAuction(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.GEB_DEBT_AUCTION_HOUSE,
                auctionId
            )
        )
    }

    exitAllCoin(): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionDebtAuction.exitAllCoin(
                this.addressList.GEB_COIN_JOIN
            )
        )
    }

    exitCoin(amount: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionDebtAuction.exitCoin(
                this.addressList.GEB_COIN_JOIN,
                amount
            )
        )
    }

    // ==== Proxy Actions Surplus Auctions ====

    surplusStartAndIncreaseBidSize(
        bidSize: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSurplusAuction.startAndIncreaseBidSize(
                this.addressList.GEB_ACCOUNTING_ENGINE,
                bidSize
            )
        )
    }

    surplusIncreaseBidSize(
        bidSize: BigNumberish,
        auctionId: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSurplusAuction.increaseBidSize(
                this.addressList.GEB_SURPLUS_AUCTION_HOUSE,
                auctionId,
                bidSize
            )
        )
    }

    surplusSettleAuction(
        auctionId: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSurplusAuction.settleAuction(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.GEB_SURPLUS_AUCTION_HOUSE,
                auctionId
            )
        )
    }

    // ==== Proxy Recycling surplus auctions ====

    recyclingSurplusIncreaseBidSize(
        bidSize: BigNumberish,
        auctionId: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSurplusAuction.increaseBidSize(
                this.addressList.GEB_STAKE_RECYCLING_SURPLUS_AUCTION_HOUSE,
                auctionId,
                bidSize
            )
        )
    }

    recyclingSurplusSettleAuction(
        auctionId: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSurplusAuction.settleAuction(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.GEB_STAKE_RECYCLING_SURPLUS_AUCTION_HOUSE,
                auctionId
            )
        )
    }

    // ==== Proxy Actions Staked Token Auctions ====

    stakedTokenAuctionStartAndIncreaseBidSize(
        bidSize: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyStakedTokenAuction.startAndIncreaseBidSize(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.GEB_STAKING,
                bidSize
            )
        )
    }

    stakedTokenAuctionIncreaseBidSize(
        bidSize: BigNumberish,
        auctionId: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyStakedTokenAuction.increaseBidSize(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.GEB_STAKING_AUCTION_HOUSE,
                auctionId,
                bidSize
            )
        )
    }

    stakedTokenSettleAuction(
        auctionId: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyStakedTokenAuction.settleAuction(
                this.addressList.GEB_STAKING_AUCTION_HOUSE,
                auctionId
            )
        )
    }

    // ==== Proxy Actions Saviour ====

    transferTokensToCaller(
        tokens: string[]
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.transferTokensToCaller(tokens)
        )
    }

    protectSAFE(
        saviour: string,
        safe: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.protectSAFE(
                saviour,
                this.addressList.SAFE_MANAGER,
                safe,
                this.addressList.GEB_LIQUIDATION_ENGINE
            )
        )
    }

    setDesiredCollateralizationRatio(
        collateralType: string,
        safe: BigNumberish,
        cRatio: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.setDesiredCollateralizationRatio(
                this.addressList.GEB_SAVIOUR_CRATIO_SETTER,
                collateralType,
                safe,
                cRatio
            )
        )
    }
    deposit(
        collateralSpecific: boolean,
        saviour: string,
        token: string,
        safe: BigNumberish,
        tokenAmount: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.deposit(
                collateralSpecific,
                saviour,
                this.addressList.SAFE_MANAGER,
                token,
                safe,
                tokenAmount
            )
        )
    }
    setDesiredCRatioDeposit(
        collateralSpecific: boolean,
        saviour: string,
        token: string,
        safe: BigNumberish,
        tokenAmount: BigNumberish,
        cRatio: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.setDesiredCRatioDeposit(
                collateralSpecific,
                saviour,
                this.addressList.GEB_SAVIOUR_CRATIO_SETTER,
                this.addressList.SAFE_MANAGER,
                token,
                safe,
                tokenAmount,
                cRatio
            )
        )
    }
    withdraw(
        collateralSpecific: boolean,
        saviour: string,
        safe: BigNumberish,
        tokenAmount: BigNumberish,
        dst: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.withdraw(
                collateralSpecific,
                saviour,
                this.addressList.SAFE_MANAGER,
                safe,
                tokenAmount,
                dst
            )
        )
    }
    setDesiredCRatioWithdraw(
        collateralSpecific: boolean,
        saviour: string,
        safe: BigNumberish,
        tokenAmount: BigNumberish,
        cRatio: BigNumberish,
        dst: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.setDesiredCRatioWithdraw(
                collateralSpecific,
                saviour,
                this.addressList.GEB_SAVIOUR_CRATIO_SETTER,
                this.addressList.SAFE_MANAGER,
                safe,
                tokenAmount,
                cRatio,
                dst
            )
        )
    }
    protectSAFEDeposit(
        collateralSpecific: boolean,
        saviour: string,
        token: string,
        safe: BigNumberish,
        tokenAmount: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.protectSAFEDeposit(
                collateralSpecific,
                saviour,
                this.addressList.SAFE_MANAGER,
                token,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                safe,
                tokenAmount
            )
        )
    }
    protectSAFESetDesiredCRatioDeposit(
        collateralSpecific: boolean,
        saviour: string,
        token: string,
        safe: BigNumberish,
        tokenAmount: BigNumberish,
        cRatio: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.protectSAFESetDesiredCRatioDeposit(
                collateralSpecific,
                saviour,
                this.addressList.GEB_SAVIOUR_CRATIO_SETTER,
                this.addressList.SAFE_MANAGER,
                token,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                safe,
                tokenAmount,
                cRatio
            )
        )
    }
    withdrawUncoverSAFE(
        collateralSpecific: boolean,
        saviour: string,
        token: string,
        safe: BigNumberish,
        tokenAmount: BigNumberish,
        dst: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.withdrawUncoverSAFE(
                collateralSpecific,
                saviour,
                this.addressList.SAFE_MANAGER,
                token,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                safe,
                tokenAmount,
                dst
            )
        )
    }
    withdrawProtectSAFEDeposit(
        withdrawCollateralSpecific: boolean,
        depositCollateralSpecific: boolean,
        withdrawSaviour: string,
        depositSaviour: string,
        depositToken: string,
        safe: BigNumberish,
        withdrawTokenAmount: BigNumberish,
        depositTokenAmount: BigNumberish,
        withdrawDst: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.withdrawProtectSAFEDeposit(
                withdrawCollateralSpecific,
                depositCollateralSpecific,
                withdrawSaviour,
                depositSaviour,
                this.addressList.SAFE_MANAGER,
                depositToken,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                safe,
                withdrawTokenAmount,
                depositTokenAmount,
                withdrawDst
            )
        )
    }
    getReserves(
        saviour: string,
        safe: BigNumberish,
        dst: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.getReserves(saviour, safe, dst)
        )
    }

    getReservesAndUncover(
        saviour: string,
        safe: BigNumberish,
        dst: string
    ): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSaviour.getReservesAndUncover(
                saviour,
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_LIQUIDATION_ENGINE,
                safe,
                dst
            )
        )
    }
}
