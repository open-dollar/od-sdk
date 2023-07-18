import { BigNumberish } from '@ethersproject/bignumber'
import { ethers } from 'ethers'
import { ContractApis } from './api/contract-apis'
import { TokenList } from './contracts/addreses'
import { GebDeployment } from './contracts/index'

/**
 * The main package used to interact with the GEB system. Includes [[deployProxy |helper functions]] for safe
 *  management and the [[contracts | contract interface object]] to directly call smart contracts.
 */
export class LiquidationActions {
    /**
     * Constructor for the main Geb.js object.
     * @param  {GebDeployment} network Either `'kovan'`, `'mainnet'` or an actual list of contract addresses.
     * @param  {GebProviderInterface|ethers.providers.Provider} provider Either a Ethers.js provider or a Geb provider (support for Web3 will be added in the future)
     */
    constructor(public contracts: ContractApis, public tokenList: TokenList) {}

    // ==== Liquidation Actions ====
    liquidateSAFE(safeId: BigNumberish): Promise<ethers.PopulatedTransaction> {
        return this.contracts.safeManager
            .safeData(safeId)
            .then((safeData) =>
                this.contracts.liquidationEngine.populateTransaction.liquidateSAFE(
                    safeData.collateralType,
                    safeData.safeHandler
                )
            )
    }
}
