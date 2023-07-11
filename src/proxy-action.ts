import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { ethers } from 'ethers'
import { ContractList, GebDeployment, getAddressList } from './contracts'

import { TokenList, getTokenList } from './contracts/addreses'
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
     * Address of the proxy actions contract for debt auctions.
     */
    public proxyActionDebtAuctionAddress: string

    /**
     * Address of the proxy actions contract for surplus auctions.
     */
    public proxyActionSurplusAuctionAddress: string

    /**
     * Address of the proxy actions contract for surplus auctions.
     */
    // public proxyActionSaviourAddress: string

    private addressList: ContractList
    private tokenList: TokenList
    private proxyActionCore: types.GebProxyActions
    private proxyActionGlobalSettlement: types.GebProxyActionsGlobalSettlement
    private proxyActionDebtAuction: types.GebProxyDebtAuctionActions
    private proxyActionSurplusAuction: types.SurplusBidActions

    constructor(
        /**
         * Address of the underlying proxy
         */
        public proxyAddress: string,
        network: GebDeployment,
        private chainProvider: ethers.providers.Provider
    ) {
        this.addressList = getAddressList(network)
        this.tokenList = getTokenList(network)

        this.proxy = types.DSProxy__factory.connect(proxyAddress, this.chainProvider)

        // Set proxy action contract addresses
        this.proxyActionCoreAddress = this.addressList.BASIC_ACTIONS
        this.proxyActionGlobalSettlementAddress = this.addressList.PROXY_ACTIONS_GLOBAL_SETTLEMENT
        this.proxyActionDebtAuctionAddress = this.addressList.PROXY_DEBT_AUCTION_ACTIONS
        this.proxyActionSurplusAuctionAddress = this.addressList.PROXY_SURPLUS_AUCTION_ACTIONS

        // Proxy contract APIs
        this.proxyActionCore = types.GebProxyActions__factory.connect(this.proxyActionCoreAddress, this.chainProvider)
        this.proxyActionGlobalSettlement = types.GebProxyActionsGlobalSettlement__factory.connect(
            this.proxyActionGlobalSettlementAddress,
            this.chainProvider
        )

        this.proxyActionDebtAuction = types.GebProxyDebtAuctionActions__factory.connect(
            this.proxyActionDebtAuctionAddress,
            this.chainProvider
        )

        this.proxyActionSurplusAuction = types.SurplusBidActions__factory.connect(
            this.proxyActionSurplusAuctionAddress,
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

        return this.proxy.populateTransaction['execute(address,bytes)'](tx.to, tx.data, { value: ethValue })
    }

    // ==== Proxy Action Core ====

    allowSAFE(safe: BigNumberish, usr: string, ok: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.allowSAFE(this.addressList.SAFE_MANAGER, safe, usr, ok)
        )
    }

    approveSAFEModification(obj: string, usr: string): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.approveSAFEModification(obj, usr)
        )
    }

    coinJoin_join(apt: string, safeHandler: string, wad: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.coinJoin_join(apt, safeHandler, wad)
        )
    }

    denySAFEModification(obj: string, usr: string): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.denySAFEModification(obj, usr)
        )
    }

    enterSystem(src: string, safe: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.enterSystem(this.addressList.SAFE_MANAGER, src, safe)
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

    freeTokenCollateral(
        collateralName: string,
        safe: BigNumberish,
        amt: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        let collateralJoin = this.tokenList[collateralName].collateralJoin
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.freeTokenCollateral(
                this.addressList.SAFE_MANAGER,
                collateralJoin,
                safe,
                amt
            )
        )
    }

    generateDebt(safe: BigNumberish, wad: BigNumberish): Promise<ethers.PopulatedTransaction> {
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

    lockTokenCollateral(
        collateralName: string,
        safe: BigNumberish,
        amt: BigNumberish,
        transferFrom: boolean
    ): Promise<ethers.PopulatedTransaction> {
        let collateralJoin = this.tokenList[collateralName].collateralJoin
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
        collateralName: string,
        safe: BigNumberish,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish,
        transferFrom: boolean
    ): Promise<ethers.PopulatedTransaction> {
        let collateralJoin = this.tokenList[collateralName].collateralJoin
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

    moveSAFE(safeSrc: BigNumberish, safeDst: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.moveSAFE(this.addressList.SAFE_MANAGER, safeSrc, safeDst)
        )
    }

    openLockTokenCollateralAndGenerateDebt(
        collateralName: string,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish,
        transferFrom: boolean
    ): Promise<ethers.PopulatedTransaction> {
        let collateralJoin = this.tokenList[collateralName].collateralJoin
        let collateralType = this.tokenList[collateralName].bytes32String
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

    openSAFE(collateralName: string, usr: string): Promise<ethers.PopulatedTransaction> {
        let collateralType = this.tokenList[collateralName].bytes32String
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.openSAFE(this.addressList.SAFE_MANAGER, collateralType, usr)
        )
    }

    quitSystem(safe: BigNumberish, dst: string): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.quitSystem(this.addressList.SAFE_MANAGER, safe, dst)
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

    repayAllDebtAndFreeTokenCollateral(
        collateralName: string,
        safe: BigNumberish,
        collateralAmount: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        let collateralJoin = this.tokenList[collateralName].collateralJoin
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

    repayDebt(safe: BigNumberish, wad: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.repayDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_COIN_JOIN,
                safe,
                wad
            )
        )
    }

    repayDebtAndFreeTokenCollateral(
        collateralName: string,
        safe: BigNumberish,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        let collateralJoin = this.tokenList[collateralName].collateralJoin
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

    safeRepayAllDebt(safe: BigNumberish, owner: string): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.safeRepayAllDebt(
                this.addressList.SAFE_MANAGER,
                this.addressList.GEB_COIN_JOIN,
                safe,
                owner
            )
        )
    }

    safeRepayDebt(safe: BigNumberish, wad: BigNumberish, owner: string): Promise<ethers.PopulatedTransaction> {
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
            this.proxyActionCore.populateTransaction.tokenCollateralJoin_join(apt, safe, amt, transferFrom)
        )
    }

    transfer(collateral: string, dst: string, amt: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.transfer(collateral, dst, amt)
        )
    }

    transferCollateral(safe: BigNumberish, dst: string, wad: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.transferCollateral(this.addressList.SAFE_MANAGER, safe, dst, wad)
        )
    }

    transferInternalCoins(safe: BigNumberish, dst: string, rad: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.transferInternalCoins(
                this.addressList.SAFE_MANAGER,
                safe,
                dst,
                rad
            )
        )
    }

    transferSAFEOwnership(safe: BigNumberish, usr: string): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.transferSAFEOwnership(this.addressList.SAFE_MANAGER, safe, usr)
        )
    }

    transferSAFEOwnershipToProxy(safe: BigNumberish, dst: string): Promise<ethers.PopulatedTransaction> {
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

    prepareCoinsForRedeemingGlobalSettlement(wad: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionGlobalSettlement.populateTransaction.prepareCoinsForRedeeming(
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
            this.proxyActionGlobalSettlement.populateTransaction.freeTokenCollateral(
                this.addressList.SAFE_MANAGER,
                collateralJoin,
                this.addressList.GEB_GLOBAL_SETTLEMENT,
                safe
            )
        )
    }

    redeemETHGlobalSettlement(
        ethJoin: string,
        collateralName: string,
        wad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        let collateralType = this.tokenList[collateralName].bytes32String
        return this.getProxiedTransactionRequest(
            this.proxyActionGlobalSettlement.populateTransaction.redeemETH(
                ethJoin,
                this.addressList.GEB_GLOBAL_SETTLEMENT,
                collateralType,
                wad
            )
        )
    }

    redeemTokenCollateralGlobalSettlement(
        collateralJoin: string,
        collateralName: string,
        wad: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        let collateralType = this.tokenList[collateralName].bytes32String
        return this.getProxiedTransactionRequest(
            this.proxyActionGlobalSettlement.populateTransaction.redeemTokenCollateral(
                collateralJoin,
                this.addressList.GEB_GLOBAL_SETTLEMENT,
                collateralType,
                wad
            )
        )
    }

    // ==== Proxy Actions Debt Auctions ====

    debtAuctionStartAndDecreaseSoldAmount(amountToBuy: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionDebtAuction.populateTransaction.startAndDecreaseSoldAmount(
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
            this.proxyActionDebtAuction.populateTransaction.decreaseSoldAmount(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.GEB_DEBT_AUCTION_HOUSE,
                auctionId,
                amountToBuy
            )
        )
    }

    debtAuctionSettleAuction(auctionId: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionDebtAuction.populateTransaction.settleAuction(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.GEB_DEBT_AUCTION_HOUSE,
                auctionId
            )
        )
    }

    exitAllCoin(): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionDebtAuction.populateTransaction.exitAllCoin(this.addressList.GEB_COIN_JOIN)
        )
    }

    exitCoin(amount: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionDebtAuction.populateTransaction.exitCoin(this.addressList.GEB_COIN_JOIN, amount)
        )
    }

    // ==== Proxy Actions Surplus Auctions ====

    surplusStartAndIncreaseBidSize(bidSize: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSurplusAuction.populateTransaction.startAndIncreaseBidSize(
                this.addressList.GEB_ACCOUNTING_ENGINE,
                bidSize
            )
        )
    }

    surplusIncreaseBidSize(bidSize: BigNumberish, auctionId: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSurplusAuction.populateTransaction.increaseBidSize(
                this.addressList.GEB_SURPLUS_AUCTION_HOUSE,
                auctionId,
                bidSize
            )
        )
    }

    surplusSettleAuction(auctionId: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionSurplusAuction.populateTransaction.settleAuction(
                this.addressList.GEB_COIN_JOIN,
                this.addressList.GEB_SURPLUS_AUCTION_HOUSE,
                auctionId
            )
        )
    }

    // ==== Proxy Actions Saviour ====
    /*
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
    
    */
}
