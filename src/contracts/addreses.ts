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

export type ContractList = {
    [key in ContractKey]: string
}

export declare type GebDeployment = 'arbitrum' | 'arbitrum-sepolia'

const addresses: Record<GebDeployment, ContractList> = {
    'arbitrum-sepolia': {
        MULTICALL: '0xcA11bde05977b3631167028862bE2a173976CA11',
        ETH: '0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f',
        GEB_SYSTEM_COIN: '0x36D197e6145B37b8E2c6Ed20B568860835b55584',
        GEB_PROTOCOL_TOKEN: '0x3b22b14ecB163B8d9eaBE8565d9b4c86B7cC84eC',
        GEB_SAFE_ENGINE: '0xda29B91e16d649e7B6F60A70102B288C4202a73D',
        GEB_ORACLE_RELAYER: '0x1e9D2b79c6Ec39b7c6BF4DA3f51a609C5d929464',
        GEB_SURPLUS_AUCTION_HOUSE: '0xd012b20C84Caf5266057c6DF69Eee81Af7136bFF',
        GEB_DEBT_AUCTION_HOUSE: '0xCEaC6a8Ea36a0b3059C74B1f5390e46dc7B35067',
        GEB_COLLATERAL_AUCTION_HOUSE_FACTORY: '0x0FeeF854DC426b5d61dD11AE74c3E43d2eaba340',
        GEB_ACCOUNTING_ENGINE: '0x22c89791FAac0c93c5dabCe08fcA49010eA02f7a',
        GEB_LIQUIDATION_ENGINE: '0x76d90151Ae5bD1Fc5e09F5A02A42824E26a323DB',
        GEB_COIN_JOIN: '0x93544B224AB94F2b568CaeD5A074f4217fC782c7',
        GEB_COLLATERAL_JOIN_FACTORY: '0xb4793C576Cc7163cDa4463804Dde543b2d85bF8E',
        GEB_TAX_COLLECTOR: '0x8D5978b4bf95407AeA0909440a1837ac531c586B',
        GEB_STABILITY_FEE_TREASURY: '0x047c081F604e677403de7aFb38bD8B0a5b1cDD50',
        GEB_GLOBAL_SETTLEMENT: '0xB021185694795C4c0fc2529d64185c49B01aBb79',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTION_HOUSE: '0x1b6Cc7354e1D594647E6EE87114145B50145CcAa',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTIONEER: '0x70cd27026d487deeFf817b3ca2A2aC9a8F30E62B',
        GEB_RRFM_SETTER: '0xa3Dd8BFf2a2c371DD8b8A1a3C5bFA85a76D7e161',
        GEB_RRFM_CALCULATOR: '0xBD2fcEC8838Fab2C31BE80583f666664Ef82867A',
        SAFE_MANAGER: '0x8ca7D88eaFB6f666997Ca0F62Beddd8A09a62910',
        PROXY_BASIC_ACTIONS: '0x60487E0a0eFbfbD30908b03ea6b7833E2520604F',
        PROXY_REGISTRY: '0xa602c0cFf8028Dd4c99fbC5e85cF0c083C5b991A',
        PROXY_DEBT_AUCTION_ACTIONS: '0xA5969D1D5DB3D9456B062b55b52244108130E05D',
        PROXY_SURPLUS_AUCTION_ACTIONS: '0xaA2d962926c4a09FdB6323a46400A2d848C9A97f',
        PROXY_COLLATERAL_AUCTION_ACTIONS: '0xf8D494A026075Ccc3FC62dED62cD821F1320c300',
        PROXY_POST_SETTLEMENT_SURPLUS_AUCTION_ACTIONS: '0xfF5b17F3D1E3329aB50677110A290f99F39af4c5',
        PROXY_GLOBAL_SETTLEMENT_ACTIONS: '0x2c281AF052959073ad1B9d9Cd437aEFf6114569F',
        PROXY_REWARDED_ACTIONS: '0x27E1A17629645f5F7cAF9733E55aA6b2207bea2F',
        JOB_ACCOUNTING: '0x9F097D43Cb9E2f2056b2625Fcd8645ca73d08984',
        JOB_LIQUIDATION: '0x97d8dA5c2CC50ec53fC16C7457692D68871E3aCF',
        JOB_ORACLES: '0x975aB5F04B6B43c2c3F74097fDDa99af52a90989',
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
    arbitrum: {},
    'arbitrum-sepolia': {
        OD: {
            address: '0x36D197e6145B37b8E2c6Ed20B568860835b55584',
            decimals: 18,
            symbol: 'OD',
            bytes32String: OD,
            collateralJoin: '',
            collateralAuctionHouse: '',
            isCollateral: false,
            camelotPoolAddress: '0x167c118AAB87c015Ef954dBe2FeD6C87c0038C0a',
        },
        ODG: {
            address: '0x3b22b14ecB163B8d9eaBE8565d9b4c86B7cC84eC',
            decimals: 18,
            symbol: 'ODG',
            bytes32String: '',
            collateralJoin: '',
            collateralAuctionHouse: '',
            isCollateral: false,
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
            address: '0x5Ae92E2cBce39b74f149B7dA16d863382397d4a7',
            collateralJoin: '0x52400D3AEB82b0923898D918be51439A9198D980',
            collateralAuctionHouse: '0x2Cd3BF07a4d434a78EA2d2fd3BD97Ffd1643991e',
            decimals: 8,
            symbol: 'WSTETH',
            bytes32String: WSTETH,
            isCollateral: true,
        },
        CBETH: {
            address: '0x5884954cfC2B2344DEE7DB8b2bb1b19Bf9b770cd',
            collateralJoin: '0xA1f2739a44c42A3DdE6d6e21852b77b0F90790f4',
            collateralAuctionHouse: '0xa752610Dc28602b6608Ff3F1eFc34e47a8909e26',
            decimals: 8,
            symbol: 'CBETH',
            bytes32String: CBETH,
            isCollateral: true,
        },
        RETH: {
            address: '0x3246B6d95FAFA609C5D124576364Cf9356b65988',
            collateralJoin: '0x707AD742ce9064bab6B54670Be90866987596eFa',
            collateralAuctionHouse: '0xfCbBBF6Ed1f93cFA5794C9952444fdef21AEcEfE',
            decimals: 3,
            symbol: 'RETH',
            bytes32String: RETH,
            isCollateral: true,
        },
        ARB: {
            address: '0xDEF0fB3BF49E1d20F7679753F4215ADD081BBf68',
            collateralJoin: '0x5C65890F15d9d78A7c0F7e83ab62a87ed0BD4cee',
            collateralAuctionHouse: '0x16FF8Eb3b8144E00fd9Aa958f02b2Fbf3814c8F7',
            decimals: 18,
            symbol: 'ARB',
            bytes32String: ARB,
            isCollateral: true,
        },
    },
}

const subgraphs: Record<GebDeployment, string> = {
    'arbitrum-sepolia': 'https://api.studio.thegraph.com/query/52770/open-dollar---testnet/v1.6.4-rc.1',
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
