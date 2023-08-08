import { WETH, OP, WBTC, STONES } from '../utils'

// All keys are mandatory
export type ContractKey =
    | 'MULTICALL'
    | 'ETH'
    | 'GEB_SYSTEM_COIN'
    | 'GEB_PROTOCOL_TOKEN'
    | 'GEB_SAFE_ENGINE'
    | 'GEB_ORACLE_RELAYER'
    | 'GEB_SURPLUS_AUCTION_HOUSE'
    | 'GEB_DEBT_AUCTION_HOUSE'
    | 'GEB_ACCOUNTING_ENGINE'
    | 'GEB_LIQUIDATION_ENGINE'
    | 'GEB_COIN_JOIN'
    | 'GEB_TAX_COLLECTOR'
    | 'GEB_STABILITY_FEE_TREASURY'
    | 'SAFE_MANAGER'
    | 'GEB_GLOBAL_SETTLEMENT'
    | 'PROXY_FACTORY'
    | 'PROXY_BASIC_ACTIONS'
    | 'PROXY_REGISTRY'
    | 'GEB_RRFM_SETTER'
    | 'GEB_RRFM_CALCULATOR'
    | 'PROXY_DEBT_AUCTION_ACTIONS'
    | 'PROXY_SURPLUS_AUCTION_ACTIONS'
    | 'PROXY_COLLATERAL_AUCTION_ACTIONS'
    | 'PROXY_REWARDED_ACTIONS'
    | 'PROXY_GLOBAL_SETTLEMENT_ACTIONS'

export type ContractList = {
    [key in ContractKey]: string
}

export declare type GebDeployment = 'mainnet' | 'optimism-goerli'

const addresses: Record<GebDeployment, ContractList> = {
    mainnet: {
        MULTICALL: '0x0000000000000000000000000000000000000000',
        ETH: '0x0000000000000000000000000000000000000000',
        GEB_SYSTEM_COIN: '0x0000000000000000000000000000000000000000',
        GEB_PROTOCOL_TOKEN: '0x0000000000000000000000000000000000000000',
        GEB_SAFE_ENGINE: '0x0000000000000000000000000000000000000000',
        GEB_ORACLE_RELAYER: '0x0000000000000000000000000000000000000000',
        GEB_SURPLUS_AUCTION_HOUSE: '0x0000000000000000000000000000000000000000',
        GEB_DEBT_AUCTION_HOUSE: '0x0000000000000000000000000000000000000000',
        GEB_ACCOUNTING_ENGINE: '0x0000000000000000000000000000000000000000',
        GEB_LIQUIDATION_ENGINE: '0x0000000000000000000000000000000000000000',
        GEB_COIN_JOIN: '0x0000000000000000000000000000000000000000',
        GEB_TAX_COLLECTOR: '0x0000000000000000000000000000000000000000',
        GEB_STABILITY_FEE_TREASURY: '0x0000000000000000000000000000000000000000',
        GEB_RRFM_CALCULATOR: '0x0000000000000000000000000000000000000000',
        GEB_RRFM_SETTER: '0x0000000000000000000000000000000000000000',
        GEB_GLOBAL_SETTLEMENT: '0x0000000000000000000000000000000000000000',
        SAFE_MANAGER: '0x0000000000000000000000000000000000000000',
        PROXY_FACTORY: '0x0000000000000000000000000000000000000000',
        PROXY_REGISTRY: '0x0000000000000000000000000000000000000000',
        PROXY_BASIC_ACTIONS: '0x0000000000000000000000000000000000000000',
        PROXY_DEBT_AUCTION_ACTIONS: '0x0000000000000000000000000000000000000000',
        PROXY_SURPLUS_AUCTION_ACTIONS: '0x0000000000000000000000000000000000000000',
        PROXY_COLLATERAL_AUCTION_ACTIONS: '0x0000000000000000000000000000000000000000',
        PROXY_REWARDED_ACTIONS: '0x0000000000000000000000000000000000000000',
        PROXY_GLOBAL_SETTLEMENT_ACTIONS: '0x0000000000000000000000000000000000000000',
    },
    'optimism-goerli': {
        MULTICALL: '0xcA11bde05977b3631167028862bE2a173976CA11',
        ETH: '0x4200000000000000000000000000000000000006',
        GEB_SYSTEM_COIN: '0xD0fbafe59e8af03C81b48ADbd3c3679E5D7Fa613',
        GEB_PROTOCOL_TOKEN: '0xe305D09d46bD6c9C0178799Bc1424282b798876C',
        GEB_SAFE_ENGINE: '0xBDd34044Ab215Fd5547251D29e6972F7dCfb7D60',
        GEB_ORACLE_RELAYER: '0x93de8CBD2C4D4A3101EE602f43232A1f5acb8CaC',
        GEB_SURPLUS_AUCTION_HOUSE: '0xe96EeAb3b69d026FF319a310459AD7ADDD8d22a9',
        GEB_DEBT_AUCTION_HOUSE: '0xbEcB8EB637B486dCfbd8c6bb4C4ED2e9b673766a',
        GEB_ACCOUNTING_ENGINE: '0xA639a991A6efce6Cf07075E2a85eD7Ac680A9a8A',
        GEB_LIQUIDATION_ENGINE: '0xcCF4aef289CfbA9E5D1f55D6B2Cd6719E56c16D9',
        GEB_COIN_JOIN: '0x1ceABCDB63dFF8734bB9D969C398936C0d6B4ad5',
        GEB_TAX_COLLECTOR: '0x979175221543b23ef11577898dA53C87779A54cE',
        GEB_STABILITY_FEE_TREASURY: '0x37ee83E054D2f64efda73B48e360b30f8070858D',
        GEB_RRFM_CALCULATOR: '0x0000000000000000000000000000000000000114',
        GEB_RRFM_SETTER: '0x0000000000000000000000000000000000000116',
        GEB_GLOBAL_SETTLEMENT: '0x1de67dA2aa6C3C0BEa350546f9BA4a8281b4CEAe',
        SAFE_MANAGER: '0xE5559B4C5605a2cd4F6F3DD84D9eeF2Df7aC3EB1',
        PROXY_FACTORY: '0x74044fDd9C267050f5b11987e1009b76b5ef806b',
        PROXY_REGISTRY: '0x8505e8D84654467d032DB394637D0FaFf477568a',
        PROXY_BASIC_ACTIONS: '',
        PROXY_DEBT_AUCTION_ACTIONS: '0x5fc994EBfAe4ABeFca0f2DeeFDC2C8A46AD2bEb0',
        PROXY_SURPLUS_AUCTION_ACTIONS: '0xB0C1470255f08a06A5123e03554Fb7CeBF41Ed6a',
        PROXY_COLLATERAL_AUCTION_ACTIONS: '0xE4f9DbD083419944e401Bd709eA74fb52a8dcdCa',
        PROXY_REWARDED_ACTIONS: '',
        PROXY_GLOBAL_SETTLEMENT_ACTIONS: '0x0000000000000000000000000000000000000000',
    },
}

export type TokenData = {
    address: string
    decimals: number
    symbol: string
    bytes32String: string
    collateralJoin: string
    collateralAuctionHouse: string
    isCollateral: boolean
}

export type TokenList = {
    [key: string]: TokenData
}

const tokens: Record<GebDeployment, TokenList> = {
    mainnet: {},
    'optimism-goerli': {
        WETH: {
            address: '0x4200000000000000000000000000000000000006',
            decimals: 18,
            symbol: 'WETH',
            bytes32String: WETH,
            collateralJoin: '0xCf18E34417dd9f617A5d3eb37dB155Fc47a3Fa06',
            collateralAuctionHouse: '0x69e60011be9F3A5Db592C3e726E06230ff06C6F5',
            isCollateral: true,
        },
        OP: {
            address: '0x4200000000000000000000000000000000000042',
            decimals: 18,
            symbol: 'OP',
            bytes32String: OP,
            collateralJoin: '0x71a79c3ff0b971b6d3e81c71227f1ad83394e1f9',
            collateralAuctionHouse: '0x86dba55f125345db33ff1523914c81c93f3bfa0b',
            isCollateral: true,
        },
        WBTC: {
            address: '0x5E0e96b2c318E63EceA56Be06c7dEc0e8E87D5de',
            decimals: 8,
            symbol: 'WBTC',
            bytes32String: WBTC,
            collateralJoin: '0xd19065f7b903ce0d54a320cb7a960cd56fab0347',
            collateralAuctionHouse: '0xf9d1d16af6b3d1a271df450fb7a3ff5775add1ff',
            isCollateral: true,
        },
        STN: {
            address: '0x5eb7112b1cC8E6AC08566881c6F4f6508Fd99578',
            decimals: 3,
            symbol: 'STN',
            bytes32String: STONES,
            collateralJoin: '0xc27670f3cf4c1a6928df8658f2dc926d85b8a51d',
            collateralAuctionHouse: '0x55f7885cc3ccaf68549d1bed30ae23482f2f76d9',
            isCollateral: true,
        },
        OD: {
            address: '0xD0fbafe59e8af03C81b48ADbd3c3679E5D7Fa613',
            decimals: 18,
            symbol: 'OD',
            bytes32String: '',
            collateralJoin: '0x1ceABCDB63dFF8734bB9D969C398936C0d6B4ad5',
            collateralAuctionHouse: '0x0000000000000000000000000000000000000000',
            isCollateral: false,
        },
        ODG: {
            address: '0xe305D09d46bD6c9C0178799Bc1424282b798876C',
            decimals: 18,
            symbol: 'ODG',
            bytes32String: '',
            collateralJoin: '',
            collateralAuctionHouse: '',
            isCollateral: false,
        },
    },
}

export const getTokenList = (network: GebDeployment): TokenList => {
    return tokens[network]
}

export const getAddressList = (network: GebDeployment): ContractList => {
    return addresses[network]
}

export const getTokenDetails = (network: GebDeployment, tokenSymbol: string): TokenData | null => {
    const tokenList = getTokenList(network)
    if (tokenSymbol in tokenList) {
        return tokenList[tokenSymbol]
    }
    return null
}
