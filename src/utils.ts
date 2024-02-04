// Adapted from Lyra Finance
// https://github.com/lyra-finance/interface

import { BigNumberish, BigNumber, FixedNumber } from '@ethersproject/bignumber'
import { Contract } from 'ethers'
import { Geb } from './geb'
import { formatUnits } from 'ethers/lib/utils'

export const SECONDS_IN_YEAR = 31536000

export type CamelotMulticallRequest<C extends Contract = Contract, F extends keyof C['functions'] & string = string> = {
    contract: C
    function: F
    args: Parameters<C['functions'][F]>
}

type MulticallResponse<R extends CamelotMulticallRequest> = Awaited<
    ReturnType<R['contract']['functions'][R['function']]>
>

type MulticallResponses<Reqs extends CamelotMulticallRequest[]> = { [K in keyof Reqs]: MulticallResponse<Reqs[K]> }

export async function multicall<Reqs extends CamelotMulticallRequest[]>(
    geb: Geb,
    requests: Reqs
): Promise<{
    returnData: MulticallResponses<Reqs>
    blockNumber: number
}> {
    const multicall3Contract = geb.contracts.multicall
    const calls = requests.map((req) => ({
        target: req.contract.address,
        callData: req.contract.interface.encodeFunctionData(req.function, req.args),
    }))
    const { returnData, blockNumber } = await multicall3Contract.callStatic.aggregate(calls)
    const result = requests.map((req, idx) => {
        const contract = req.contract
        const result = contract.interface.decodeFunctionResult(req.function, returnData[idx])
        return result
    })
    return {
        returnData: result as MulticallResponses<Reqs>,
        blockNumber: blockNumber.toNumber(),
    }
}

export function fromBigNumber(number: BigNumber, decimals: number = 18): number {
    return parseFloat(formatUnits(number.toString(), decimals))
}

// === Constants ===

/**
 * byte32 values for each collateral
 */
const WETH = '0x5745544800000000000000000000000000000000000000000000000000000000'
const ARB = '0x4152420000000000000000000000000000000000000000000000000000000000'
const OD = '0x4f44000000000000000000000000000000000000000000000000000000000000'
const WSTETH = '0x5753544554480000000000000000000000000000000000000000000000000000'
const CBETH = '0x4342455448000000000000000000000000000000000000000000000000000000'
const RETH = '0x5245544800000000000000000000000000000000000000000000000000000000'
// const MAGIC = '0x4d41474943000000000000000000000000000000000000000000000000000000'

/**
 * 0x0 address or burn address
 */
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

/**
 * Constant 10^18
 */
const WAD = BigNumber.from('1000000000000000000')

/**
 * Constant 10^27
 */
const RAY = BigNumber.from('1000000000000000000000000000')

/**
 * Constant 10^45
 */
const RAD = BigNumber.from('1000000000000000000000000000000000000000000000')

// ==== Utils functions ===

/**
 * Return a fixed number object from a RAD
 * @param  {BigNumberish} rad
 */
const radToFixed = (rad: BigNumberish) => {
    return FixedNumber.fromValue(BigNumber.from(rad), 45, 'fixed256x45')
}

/**
 * Return a fixed number object from a RAD
 * @param  {BigNumberish} rad
 */
const rayToFixed = (ray: BigNumberish) => {
    return FixedNumber.fromValue(BigNumber.from(ray), 27, 'fixed256x27')
}

/**
 * Return a fixed number object from a RAD
 * @param  {BigNumberish} wad
 */
const wadToFixed = (wad: BigNumberish) => {
    return FixedNumber.fromValue(BigNumber.from(wad), 18, 'fixed256x18')
}

/**
 * Multiply by the power of 10 !! Precision loss if shift < 0 !!
 * @param val Value to convert
 * @param shift Number of places to shift the decimal
 */
const decimalShift = (val: BigNumberish, shift: number) => {
    if (shift > 0) {
        return BigNumber.from(val).mul(BigNumber.from(10).pow(shift))
    } else if (shift < 0) {
        return BigNumber.from(val).div(BigNumber.from(10).pow(Math.abs(shift)))
    } else {
        BigNumber.from(val)
    }

    return BigNumber.from(val)
}

/**
 * Given any kind of error object from an Ethereum RPC, this Will look for an error string from a Solidity require statement. Returns null if not found.
 * @param  {any} RPC error object of any kind
 * @returns string
 */
const getRequireString = (error: any): string | null => {
    // Stringify to object
    let str: string
    try {
        str = JSON.stringify(error)
    } catch {
        return null
    }
    // Search for the require error string selector 0x08c379a0
    const hexerrorArray = str.match(/0x08c379a0[0-9a-fA-F]*/g)

    if (hexerrorArray) {
        // Convert from hex to UTF-8 string
        return decodeURIComponent(hexerrorArray[0].slice(12).replace(/[0-9a-f]{2}/g, '%$&'))
            .replace(/\0/g, '')
            .slice(2)
    } else {
        return null
    }
}

export {
    // Constants
    WETH,
    ARB,
    OD,
    WSTETH,
    CBETH,
    RETH,
    // MAGIC,
    NULL_ADDRESS,
    WAD,
    RAY,
    RAD,
    //Utils
    wadToFixed,
    rayToFixed,
    radToFixed,
    decimalShift,
    getRequireString,
}
