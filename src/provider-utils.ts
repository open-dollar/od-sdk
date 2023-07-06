import { AbiDefinition, Inputs, Outputs, TransactionRequest } from './contracts'
import { providers, utils } from 'ethers'
import { Result } from 'ethers/lib/utils'
import { isNumber } from 'util'

function processEthersResults(results: Result): any {
    if (results.length === 0) {
        return []
    } else if (results.length === 1) {
        return results[0]
    } else {
        // Do this to remove positional references
        let ret: any = {}
        for (let key in results) {
            if (isNumber(key)) continue
            ret[key] = results[key]
        }

        return ret
    }
}

export async function ethCall(provider: providers.Provider, transaction: TransactionRequest): Promise<string> {
    return provider.call(transaction)
}

export function decodeFunctionData(data: string, abiFragment: AbiDefinition): Outputs {
    const coder = new utils.Interface([abiFragment])
    const result = coder.decodeFunctionResult(abiFragment.name, data)
    return processEthersResults(result)
}

export function encodeFunctionData(params: Inputs[], abiFragment: AbiDefinition): string {
    const coder = new utils.Interface([abiFragment])
    return coder.encodeFunctionData(abiFragment.name, params)
}

export async function chainId(provider: providers.Provider): Promise<number> {
    return (await provider.getNetwork()).chainId
}

export async function extCodeHash(provider: providers.Provider, address: string): Promise<string> {
    const code = await provider.getCode(address)
    return utils.keccak256(code)
}
