import { WETH, ARB, OD, ETH_A, WSTETH, CBETH, RETH, MAGIC } from '../utils'

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
    | 'GEB_COLLATERAL_AUCTION_HOUSE_FACTORY'
    | 'GEB_ACCOUNTING_ENGINE'
    | 'GEB_LIQUIDATION_ENGINE'
    | 'GEB_COIN_JOIN'
    | 'GEB_COLLATERAL_JOIN_FACTORY'
    | 'GEB_TAX_COLLECTOR'
    | 'GEB_STABILITY_FEE_TREASURY'
    | 'GEB_GLOBAL_SETTLEMENT'
    | 'GEB_POST_SETTLEMENT_SURPLUS_AUCTION_HOUSE'
    | 'GEB_POST_SETTLEMENT_SURPLUS_AUCTIONEER'
    | 'GEB_RRFM_SETTER'
    | 'GEB_RRFM_CALCULATOR'
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
    | 'PROXY_POST_SETTLEMENT_SURPLUS_AUCTION_ACTIONS'
    | 'PROXY_GLOBAL_SETTLEMENT_ACTIONS'
    | 'PROXY_REWARDED_ACTIONS'
    | 'JOB_ACCOUNTING'
    | 'JOB_LIQUIDATION'
    | 'JOB_ORACLES'

export type ContractList = {
    [key in ContractKey]: string
}

export declare type GebDeployment = 'arbitrum' | 'arbitrum-goerli'

const addresses: Record<GebDeployment, ContractList> = {
    'arbitrum-goerli': {
        MULTICALL: '0xcA11bde05977b3631167028862bE2a173976CA11',
        ETH: '0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f',
        GEB_SYSTEM_COIN: '0x9a8c7c709839EbA4B0C5DbfAD38Ed9b712A31a3C',
        GEB_PROTOCOL_TOKEN: '0x84D59476D70b6C0F00D60d9E6eD811d9E83118d5',
        GEB_SAFE_ENGINE: '0x70E2ac0Aa8AfF6316808A47436Bb09f674f87827',
        GEB_ORACLE_RELAYER: '0xbF0b62F8C50090F729B176e8c4106D49B9c8EAE9',
        GEB_SURPLUS_AUCTION_HOUSE: '0x701572AA1Db1965300ADad95e21687834611a8a9',
        GEB_DEBT_AUCTION_HOUSE: '0xC6B113e4c6F13162A8f8149D764E25272B1D0771',
        GEB_COLLATERAL_AUCTION_HOUSE_FACTORY: '0xc8062817d63a4eC3AD465afa37894b4058E7230C',
        GEB_ACCOUNTING_ENGINE: '0x150D3f92DED9713592593EC74af834c4eaB1C5e0',
        GEB_LIQUIDATION_ENGINE: '0x3412b012C056aFd89453e200d2C62321f4c68939',
        GEB_COIN_JOIN: '0x8A65b144d940cCFdc292A43E046754a3Fd87538b',
        GEB_COLLATERAL_JOIN_FACTORY: '0x51685612573F67853B67162d3B15e8872fdAD606',
        GEB_TAX_COLLECTOR: '0xa4c7eA8eB64a0d1c5666afC0166Bd0dfbe0FB9C2',
        GEB_STABILITY_FEE_TREASURY: '0xEE198092c4F39Fe2D8adA345715f3D3C15aBF360',
        GEB_GLOBAL_SETTLEMENT: '0x3a90F0030b8599E88fB4f3A4303b2152bC3c276A',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTION_HOUSE: '0x0Eab5893C868432a1c7769dad618B14C4a14A1bE',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTIONEER: '0x70F16b0796E5b542b380B52f519eCAc351f08e2A',
        GEB_RRFM_SETTER: '0xA4AE244204BD9D1b918B6d30B19097530D4516A0',
        GEB_RRFM_CALCULATOR: '0x768fD1EAC0A5aEFFE63385f5244952f1D6d4f237',
        SAFE_MANAGER: '0xf4ac690C6457AD6629206Ad4CCB45545860F3AcA',
        PROXY_FACTORY: '0xD8970af0878fB9437c4b1c788C333e5F0E40eFB3',
        PROXY_BASIC_ACTIONS: '0xE81956bd8Fec817A442FD2f3531A2f81C3090ceF',
        PROXY_REGISTRY: '0xD8970af0878fB9437c4b1c788C333e5F0E40eFB3',
        PROXY_DEBT_AUCTION_ACTIONS: '0xC7F4cfce44EC28001517eee4625541F833f8F747',
        PROXY_SURPLUS_AUCTION_ACTIONS: '0xFa90fD507e129B9b168306522C6e2e95bB349F39',
        PROXY_COLLATERAL_AUCTION_ACTIONS: '0xb6f8AF22cd29759ae70d6d3A44E3161BdCeBd825',
        PROXY_POST_SETTLEMENT_SURPLUS_AUCTION_ACTIONS: '0x1876e48C23f2B5a735465CC8b723DB23fD67E0dD',
        PROXY_GLOBAL_SETTLEMENT_ACTIONS: '0xd77b283F2fe0b04e5eF12da4a9d50f0784A08dDF',
        PROXY_REWARDED_ACTIONS: '0x09d73dCE94069372D7cd921a7027CF6cf788Cb34',
        JOB_ACCOUNTING: '0x72ED2F5E9899F84223Fc7fc4F965d8B668B888d3',
        JOB_LIQUIDATION: '0x7c533401714bd86e4d06Ebf440313fd3593c038F',
        JOB_ORACLES: '0xd591f9C718d3ac1d1F53664B04c248c97c5a1828',
    },
    arbitrum: {
        MULTICALL: '0xcA11bde05977b3631167028862bE2a173976CA11',
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
        GEB_COLLATERAL_AUCTION_HOUSE_FACTORY: '0x0000000000000000000000000000000000000000',
        GEB_COLLATERAL_JOIN_FACTORY: '0x0000000000000000000000000000000000000000',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTION_HOUSE: '0x0000000000000000000000000000000000000000',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTIONEER: '0x0000000000000000000000000000000000000000',
        PROXY_POST_SETTLEMENT_SURPLUS_AUCTION_ACTIONS: '0x0000000000000000000000000000000000000000',
        PROXY_GLOBAL_SETTLEMENT_ACTIONS: '0x0000000000000000000000000000000000000000',
        JOB_ACCOUNTING: '0x0000000000000000000000000000000000000000',
        JOB_LIQUIDATION: '0x0000000000000000000000000000000000000000',
        JOB_ORACLES: '0x0000000000000000000000000000000000000000',
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
    arbitrum: {},
    'arbitrum-goerli': {
        OD: {
            address: '0x9a8c7c709839EbA4B0C5DbfAD38Ed9b712A31a3C',
            decimals: 18,
            symbol: 'OD',
            bytes32String: OD,
            collateralJoin: '',
            collateralAuctionHouse: '',
            isCollateral: false,
        },
        ODG: {
            address: '0x84D59476D70b6C0F00D60d9E6eD811d9E83118d5',
            decimals: 18,
            symbol: 'ODG',
            bytes32String: '',
            collateralJoin: '',
            collateralAuctionHouse: '',
            isCollateral: false,
        },
        WETH: {
            address: '0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f',
            collateralJoin: '0xF807f5b6E9f7891178FfC6005e70CDC4af1f44aE',
            collateralAuctionHouse: '0x9E779a5F70DBf488cee0c0fe7737bf35Db1a07bA',
            decimals: 18,
            symbol: 'WETH',
            bytes32String: WETH,
            isCollateral: true,
        },
        ARB: {
            address: '',
            collateralJoin: '',
            collateralAuctionHouse: '',
            decimals: 18,
            symbol: 'ARB',
            bytes32String: ARB,
            isCollateral: true,
        },
        ETH_A: {
            address: '',
            collateralJoin: '',
            collateralAuctionHouse: '',
            decimals: 18,
            symbol: 'ETH-A',
            bytes32String: ETH_A,
            isCollateral: true,
        },
        WSTETH: {
            address: '',
            collateralJoin: '',
            collateralAuctionHouse: '',
            decimals: 18,
            symbol: 'WSTETH',
            bytes32String: ARB,
            isCollateral: true,
        },
        CBETH: {
            address: '',
            collateralJoin: '',
            collateralAuctionHouse: '',
            decimals: 18,
            symbol: 'CBETH',
            bytes32String: CBETH,
            isCollateral: true,
        },
        RETH: {
            address: '',
            collateralJoin: '',
            collateralAuctionHouse: '',
            decimals: 18,
            symbol: 'RETH',
            bytes32String: RETH,
            isCollateral: true,
        },
        MAGIC: {
            address: '',
            collateralJoin: '',
            collateralAuctionHouse: '',
            decimals: 18,
            symbol: 'MAGIC',
            bytes32String: MAGIC,
            isCollateral: true,
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
