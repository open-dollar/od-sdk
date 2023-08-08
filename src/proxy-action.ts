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
    public proxy: types.HaiProxy

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
     * Address of the proxy actions contract for rewarded actions.
     */
    public proxyRewardedActionsAddress: string

    private addressList: ContractList
    private tokenList: TokenList
    private proxyActionCore: types.BasicActions
    // private proxyActionGlobalSettlement: types.GebProxyActionsGlobalSettlement
    private proxyActionDebtAuction: types.DebtBidActions
    private proxyActionSurplusAuction: types.SurplusBidActions
    private proxyActionCollateralAuction: types.CollateralBidActions
    private proxyActionRewarded: types.RewardedActions

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

        this.proxy = types.HaiProxy__factory.connect(proxyAddress, this.chainProvider)

        // Set proxy action contract addresses
        this.proxyActionCoreAddress = this.addressList.PROXY_BASIC_ACTIONS
        // this.proxyActionGlobalSettlementAddress = this.addressList.PROXY_GLOBAL_SETTLEMENT_ACTIONS
        this.proxyActionDebtAuctionAddress = this.addressList.PROXY_DEBT_AUCTION_ACTIONS
        this.proxyActionSurplusAuctionAddress = this.addressList.PROXY_SURPLUS_AUCTION_ACTIONS
        this.proxyActionCollateralAuctionAddress = this.addressList.PROXY_COLLATERAL_AUCTION_ACTIONS
        this.proxyRewardedActionsAddress = this.addressList.PROXY_REWARDED_ACTIONS

        // Proxy contract APIs
        this.proxyActionCore = types.BasicActions__factory.connect(this.proxyActionCoreAddress, this.chainProvider)
        // this.proxyActionGlobalSettlement = types.GebProxyActionsGlobalSettlement__factory.connect(
        //     this.proxyActionGlobalSettlementAddress,
        //     this.chainProvider
        // )

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

        this.proxyActionRewarded = types.RewardedActions__factory.connect(
            this.proxyRewardedActionsAddress,
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

        return this.proxy.populateTransaction.execute(tx.to, tx.data)
    }

    // ==== Basic Actions ====

    exitTokenCollateral(collateralJoin: string, amt: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.exitCollateral(collateralJoin, amt)
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
        amt: BigNumberish
    ): Promise<ethers.PopulatedTransaction> {
        let collateralJoin = this.tokenList[collateralName].collateralJoin
        return this.getProxiedTransactionRequest(
            this.proxyActionCore.populateTransaction.lockTokenCollateral(
                this.addressList.SAFE_MANAGER,
                collateralJoin,
                safe,
                amt
            )
        )
    }

    lockTokenCollateralAndGenerateDebt(
        collateralName: string,
        safe: BigNumberish,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish
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
                deltaWad
            )
        )
    }

    openLockTokenCollateralAndGenerateDebt(
        collateralName: string,
        collateralAmount: BigNumberish,
        deltaWad: BigNumberish
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
                deltaWad
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
                this.addressList.GEB_TAX_COLLECTOR,
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
                this.addressList.GEB_TAX_COLLECTOR,
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
                this.addressList.GEB_TAX_COLLECTOR,
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
                this.addressList.GEB_TAX_COLLECTOR,
                collateralJoin,
                this.addressList.GEB_COIN_JOIN,
                safe,
                collateralAmount,
                deltaWad
            )
        )
    }

    // ==== Proxy Actions Global Settlement ====
    /* TODO: implement Global Settlement actions

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

     */

    // ==== Proxy Actions Debt Auctions ====

    // TODO: implement rewarded action (debtStartAuction)
    // debtAuctionStart(): Promise<ethers.PopulatedTransaction> {
    //     return this.getProxiedTransactionRequest(
    //         this.proxyActionDebtAuction.populateTransaction.startAndDecreaseSoldAmount(
    //             this.addressList.GEB_COIN_JOIN,
    //             this.addressList.GEB_ACCOUNTING_ENGINE,
    //             amountToBuy
    //         )
    //     )
    // }

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
            this.proxyActionDebtAuction.populateTransaction.collectProtocolTokens(this.addressList.GEB_PROTOCOL_TOKEN)
        )
    }

    // ==== Proxy Actions Surplus Auctions ====

    // TODO: implement rewarded action (surplusStartAuction)
    // surplusStartAndIncreaseBidSize(bidSize: BigNumberish): Promise<ethers.PopulatedTransaction> {
    //     return this.getProxiedTransactionRequest(
    //         this.proxyActionSurplusAuction.populateTransaction.startAndIncreaseBidSize(
    //             this.addressList.GEB_ACCOUNTING_ENGINE,
    //             bidSize
    //         )
    //     )
    // }

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
}
