import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { ethers } from 'ethers'
import { ContractList, GebDeployment, getAddressList } from './contracts'

import { TokenList, getTokenList } from './contracts/addreses'
import * as types from './typechained'
import { NULL_ADDRESS } from './utils'

/**
 * Convenience class to call functions from [BasicActions](https://github.com/reflexer-labs/geb-proxy-actions/blob/master/src/BasicActions.sol) through a proxy contract registered in the [GebProxyRegistry](https://github.com/reflexer-labs/geb-proxy-registry/blob/master/src/GebProxyRegistry.sol). These actions bundle multiple actions in one (e.g: open a safe + lock some ETH + draw some system coins).
 */
export class BasicActions {
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
     * Address of the proxy actions contract for collateral auctions.
     */
    public proxyActionCollateralAuctionAddress: string

    /**
     * Address of the proxy actions contract for surplus auctions.
     */
    // public proxyActionSaviourAddress: string

    private addressList: ContractList
    private tokenList: TokenList
    private proxyActionCore: types.BasicActions
    private proxyActionGlobalSettlement: types.GebProxyActionsGlobalSettlement
    private proxyActionDebtAuction: types.DebtBidActions
    private proxyActionSurplusAuction: types.SurplusBidActions
    private proxyActionCollateralAuction: types.CollateralBidActions

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
        this.proxyActionCollateralAuctionAddress = this.addressList.PROXY_COLLATERAL_AUCTION_ACTIONS

        // Proxy contract APIs
        this.proxyActionCore = types.BasicActions__factory.connect(this.proxyActionCoreAddress, this.chainProvider)
        this.proxyActionGlobalSettlement = types.GebProxyActionsGlobalSettlement__factory.connect(
            this.proxyActionGlobalSettlementAddress,
            this.chainProvider
        )

        this.proxyActionDebtAuction = types.DebtBidActions__factory.connect(
            this.proxyActionDebtAuctionAddress,
            this.chainProvider
        )

        this.proxyActionSurplusAuction = types.SurplusBidActions__factory.connect(
            this.proxyActionSurplusAuctionAddress,
            this.chainProvider
        )

        this.proxyActionCollateralAuction = types.CollateralBidActions__factory.connect(
            this.proxyActionCollateralAuctionAddress,
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

    // ==== Basic Actions ====

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
                this.addressList.GEB_TAX_COLLECTOR,
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
            this.proxyActionDebtAuction.populateTransaction.exitAllSystemCoins(this.addressList.GEB_COIN_JOIN)
        )
    }

    exitCoin(amount: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionDebtAuction.populateTransaction.exitSystemCoins(this.addressList.GEB_COIN_JOIN, amount)
        )
    }

    collectProtocolTokens(): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionDebtAuction.populateTransaction.collectProtocolTokens(this.addressList.GEB_PROT)
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

    // ==== Proxy Actions Collateral Auctions ====

    buyCollateral(
        collateral: string,
        auctionId: BigNumberish,
        minCollateralAmount: BigNumberish,
        bidAmount: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        const collateralData = this.tokenList[collateral]
        return this.getProxiedTransactionRequest(
            this.proxyActionCollateralAuction.populateTransaction.buyCollateral(
                this.addressList.GEB_COIN_JOIN,
                collateralData.collateralJoin,
                collateralData.collateralAuctionHouse,
                auctionId,
                minCollateralAmount,
                bidAmount
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
