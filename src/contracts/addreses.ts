import { WETH, ARB, OD, WSTETH, CBETH, RETH } from '../utils'

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
    | 'CAMELOT_WSTETH_NITRO_POOL'
    | 'CAMELOT_RETH_NITRO_POOL'
    | 'CAMELOT_ODG_POOL'

export type ContractList = {
    [key in ContractKey]: string
}

export declare type GebDeployment = 'arbitrum' | 'arbitrum-sepolia'

const addresses: Record<GebDeployment, ContractList> = {
    'arbitrum-sepolia': {
        MULTICALL: '0xcA11bde05977b3631167028862bE2a173976CA11',
        ETH: '0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f',
        GEB_SYSTEM_COIN: '0x167c118AAB87c015Ef954dBe2FeD6C87c0038C0a',
        GEB_PROTOCOL_TOKEN: '0xF76F8C225C3dFAF06Ea46784d3375b5Ef2B83bF5',
        GEB_SAFE_ENGINE: '0x4D3a921E278C4620826328eB0F71e54F9A85Fd2f',
        GEB_ORACLE_RELAYER: '0xF563Eb6872c2FCd94056e6b9886760999fE47313',
        GEB_SURPLUS_AUCTION_HOUSE: '0xB7Dabdfd6dcc91be1A6a18cde0a1cce924AeE4e3',
        GEB_DEBT_AUCTION_HOUSE: '0x18b070eFEB92dBB4CB5D5fA08e8C542E215e34e3',
        GEB_COLLATERAL_AUCTION_HOUSE_FACTORY: '0x760c61830a17484872a209E1870d5B578c07B1Da',
        GEB_ACCOUNTING_ENGINE: '0xc0344db20A4bD59E2aa784A897b1b6782ec70e0F',
        GEB_LIQUIDATION_ENGINE: '0x47d88A6270950741C3E850717c49dc609Ace98c9',
        GEB_COIN_JOIN: '0xe11B1a77f0eAA3116701a6cC862dbC6D9447095B',
        GEB_COLLATERAL_JOIN_FACTORY: '0xba1575e55F81aaaCD9ff837E409F82b3E92429Fb',
        GEB_TAX_COLLECTOR: '0x4aB8dB2408F109C60ad4a2C093F54177C6e4ff6B',
        GEB_STABILITY_FEE_TREASURY: '0xf51AfC62619895A68b8bA0056EE5ad6dE9306678',
        GEB_GLOBAL_SETTLEMENT: '0xCBe8E8494C0B5C70092C1bB3252D48963A536876',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTION_HOUSE: '0xefD0A1EF8393CC6d9262b14DfB883f2fD3cbA452',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTIONEER: '0x1EB1da0b3441FE51E95D7C1cdc600E056180DffF',
        GEB_RRFM_SETTER: '0xDCeC4C33ff27EC1A345FCC9F46aDCAF72d995Ee9',
        GEB_RRFM_CALCULATOR: '0x5cC64A4cd04248475728138B9cF686C9dC561737',
        SAFE_MANAGER: '0x1499dbe31eD0adcedB064AdDf58b1af320D8400d',
        PROXY_BASIC_ACTIONS: '0xb4d35E55119eB58c3653Ba1011fB35702475F552',
        PROXY_REGISTRY: '0x075E3850f6577842F89695CC0e66d94dB76c4c90',
        PROXY_DEBT_AUCTION_ACTIONS: '0x76c87A774f80cd84E4727b543Df638322B5FBF99',
        PROXY_SURPLUS_AUCTION_ACTIONS: '0x3cA89F41bC3b9ABAeed53e549C4c5972c16C992D',
        PROXY_COLLATERAL_AUCTION_ACTIONS: '0x90Eced4c898A442C1Aa53bD8b477F68c578f27A4',
        PROXY_POST_SETTLEMENT_SURPLUS_AUCTION_ACTIONS: '0xE6a176ea72B01FE266316c70f721e786c18a14a5',
        PROXY_GLOBAL_SETTLEMENT_ACTIONS: '0x80428b57Ea8779260aca9dBCF0658A2c1CAFe36E',
        PROXY_REWARDED_ACTIONS: '0x9b641694a9d62231fcf7b07D2A8122AA8ad975d1',
        JOB_ACCOUNTING: '0xD32Fd23334f882C86d704A599a451c4484dd1aB5',
        JOB_LIQUIDATION: '0x391CD55b967b55dd559612e95201D4Ac0e341835',
        JOB_ORACLES: '0x03B5B64AdAE5CF46aC870AAeF6350222942333B3',
        CAMELOT_WSTETH_NITRO_POOL: '',
        CAMELOT_RETH_NITRO_POOL: '',
        CAMELOT_ODG_POOL: '',
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
        // ARB-USDC Test address for now
        CAMELOT_WSTETH_NITRO_POOL: '0x6aCdfD8Bd4f5AC6F5E0cA54024663C251e9Cf0f4',
        CAMELOT_RETH_NITRO_POOL: '',
        CAMELOT_ODG_POOL: '',
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
    camelotPoolAddress?: string
    chainlinkRelayer?: string
}

export type TokenList = {
    [key: string]: TokenData
}

const tokens: Record<GebDeployment, TokenList> = {
    arbitrum: {
        ODG: {
            address: '0x000D636bD52BFc1B3a699165Ef5aa340BEA8939c',
            decimals: 18,
            symbol: 'ODG',
            bytes32String: '',
            collateralJoin: '',
            collateralAuctionHouse: '',
            isCollateral: false,
            camelotPoolAddress: '0xF935263c9950EB2881FF58Bd6a76c3D2564A78D5',
        },
    },
    'arbitrum-sepolia': {
        OD: {
            address: '0x167c118AAB87c015Ef954dBe2FeD6C87c0038C0a',
            decimals: 18,
            symbol: 'OD',
            bytes32String: OD,
            collateralJoin: '',
            collateralAuctionHouse: '',
            isCollateral: false,
            camelotPoolAddress: '0x167c118AAB87c015Ef954dBe2FeD6C87c0038C0a',
        },
        ODG: {
            address: '0xF76F8C225C3dFAF06Ea46784d3375b5Ef2B83bF5',
            decimals: 18,
            symbol: 'ODG',
            bytes32String: '',
            collateralJoin: '',
            collateralAuctionHouse: '',
            isCollateral: false,
            camelotPoolAddress: '',
        },
        WETH: {
            address: '0x0091f4e75a03C11cB9be8E3717219005eb780D89',
            collateralJoin: '',
            collateralAuctionHouse: '',
            decimals: 18,
            symbol: 'WETH',
            bytes32String: WETH,
            isCollateral: false,
            chainlinkRelayer: '',
        },
        WSTETH: {
            address: '0xC9b4061eA8429B708A08b5C5954A1756D284D22a',
            collateralJoin: '0xd5bE0708c85e0F0e1990bbe1e07b6AFE9d0d1f7e',
            collateralAuctionHouse: '0x9A0AbD7bC17E84cBEDdb8B11cFe2fD5caF09FC32',
            decimals: 8,
            symbol: 'WSTETH',
            bytes32String: WSTETH,
            isCollateral: true,
            chainlinkRelayer: '',
        },
        CBETH: {
            address: '0xF7ADA503C5599F18caDc5f6dc63bfdC5983F9574',
            collateralJoin: '0x21c668Fc66a372dcAa59E80c0Dd5120C486B0387',
            collateralAuctionHouse: '0x245Fc6aF8E9Cbc9F9DAf7F12A4001a1fb3749937',
            decimals: 8,
            symbol: 'CBETH',
            bytes32String: CBETH,
            isCollateral: true,
        },
        RETH: {
            address: '0x2bF2A9E3A07B9f75fC1b36D56Efd6999b3AF7951',
            collateralJoin: '0x59b263871Eb16c0186fBA10aA5F4D879D5C3f8cE',
            collateralAuctionHouse: '0x6A4cfa6902194B9239b7174CB999258931B443B9',
            decimals: 3,
            symbol: 'RETH',
            bytes32String: RETH,
            isCollateral: true,
        },
        ARB: {
            address: '0x04B57842D2115413CC702C77827a43DBBA0D7426',
            collateralJoin: '0xd3F8690229362cbA261ED76F30c3A6a2a574E5AB',
            collateralAuctionHouse: '0x8d1f218AEF424b0333CeBccdBDd6aC207Cce1dFc',
            decimals: 18,
            symbol: 'ARB',
            bytes32String: ARB,
            isCollateral: true,
        },
    },
}

const subgraphs: Record<GebDeployment, string> = {
    'arbitrum-sepolia': 'https://api.studio.thegraph.com/query/52770/open-dollar---testnet/v1.6.0-rc.1',
    arbitrum: '',
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

export const getSubgraph = (network: GebDeployment): string => {
    return subgraphs[network]
}
