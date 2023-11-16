import { WETH, ARB, OD, WSTETH, CBETH, RETH, MAGIC } from '../utils'

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

export declare type GebDeployment = 'arbitrum' | 'arbitrum-goerli' | 'arbitrum-sepolia'

const addresses: Record<GebDeployment, ContractList> = {
    'arbitrum-sepolia': {
        MULTICALL: '0xcA11bde05977b3631167028862bE2a173976CA11',
        ETH: '0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f',
        GEB_SYSTEM_COIN: '0x94beB5fC16824338Eaa538c3c857D7f7fFf4B2Ce',
        GEB_PROTOCOL_TOKEN: '0x22d953bc460246199a02A4c6C2dAA929335645d0',
        GEB_SAFE_ENGINE: '0x30fdA32a673Af230D69cb4A11a6125D7E7E4c11D',
        GEB_ORACLE_RELAYER: '0x9978BBC228B5dAf625315a4A7696f0f0D3930fDa',
        GEB_SURPLUS_AUCTION_HOUSE: '0x0eFe9B7aF21C8d345fff787082bbB5fc7B07BA82',
        GEB_DEBT_AUCTION_HOUSE: '0x750ecadB0086F28e541f09eF11a759a5548E97f9',
        GEB_COLLATERAL_AUCTION_HOUSE_FACTORY: '0x56Cae2E66D0Dd4C0e6f1944B82F3C082DCCe41EF',
        GEB_ACCOUNTING_ENGINE: '0x62c7CAE5c017016BEd5f404FD23D43a097f1d9Ba',
        GEB_LIQUIDATION_ENGINE: '0xd99Ea0A9566d7e5d7e3bB504E7Ea5851dD1BF35f',
        GEB_COIN_JOIN: '0x266358F318D9b331Ba06cabb1f2A2211FE2BFF44',
        GEB_COLLATERAL_JOIN_FACTORY: '0x8E68B53d0c3d3f4A9bDffD87782949041395019C',
        GEB_TAX_COLLECTOR: '0xFefAd2d690895604c8588e4d5bEE31261D06A620',
        GEB_STABILITY_FEE_TREASURY: '0x8b68dda01E3c17edeb2fb03c6e390D25b906f8A2',
        GEB_GLOBAL_SETTLEMENT: '0x5e6F4CF324cf9f8Dbb27f4E9Abb2d00f8000Ed27',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTION_HOUSE: '0x03355b951eD8936902eF21073A1c370E9d9Ac432',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTIONEER: '0x1D6AC552B5f642A82dbB1e2697a0c1fa9585e02d',
        GEB_RRFM_SETTER: '0x39192F857b0909ddC4d5B5272383C3c0b43a3967',
        GEB_RRFM_CALCULATOR: '0xfBF482CEdA400487aa740f602A1f51431aA8a4bc',
        SAFE_MANAGER: '0xA3EF1c4ef0FDC10501C6F907b004Be3A5905be65',
        PROXY_BASIC_ACTIONS: '0xeE34Cda23dAF9C92D417379dc258825311420bb2',
        PROXY_REGISTRY: '0x677Bd90AB6A27552D0744a0Af196DA127f014656',
        PROXY_DEBT_AUCTION_ACTIONS: '0xe98882f63F1d1F749f627Ef2BA4D86B3c597Cb59',
        PROXY_SURPLUS_AUCTION_ACTIONS: '0xb4Efb9a37f0af1b7316f2e4df52A8eB541306263',
        PROXY_COLLATERAL_AUCTION_ACTIONS: '0xEbAB30335CB9D05B3edC9CFb38b7663f7047da4A',
        PROXY_POST_SETTLEMENT_SURPLUS_AUCTION_ACTIONS: '0x3BC35240184d6ddd63d189fEa5328deA0906FD7C',
        PROXY_GLOBAL_SETTLEMENT_ACTIONS: '0x9fD3826e3C89EE7f2808D877117A55d732EBa477',
        PROXY_REWARDED_ACTIONS: '0x2A2C3C71107E390FDB0862d835B638bfC7064c50',
        JOB_ACCOUNTING: '0x3D65B41898dB1504C78497A0f4FAe7a926355A5B',
        JOB_LIQUIDATION: '0x08D43780b55F31bAeE80199Bef527C9BeF4D5A28',
        JOB_ORACLES: '0xC4813f7ca4b73A94b3077D5bADBDca1be1222735',
    },
    'arbitrum-goerli': {
        MULTICALL: '0xcA11bde05977b3631167028862bE2a173976CA11',
        ETH: '0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f',
        GEB_SYSTEM_COIN: '0xc065c5d279E581aCAd056fDF825B0a55EAb9884e',
        GEB_PROTOCOL_TOKEN: '0x52C0d18d7771ad9e0c8b700c84a4e845b2C3a41A',
        GEB_SAFE_ENGINE: '0x6609C41a6eCf555ceA3766D0B671e6E7601360e5',
        GEB_ORACLE_RELAYER: '0x50573a7C750CEbaa4F269905bfAe87C1a53d52C1',
        GEB_SURPLUS_AUCTION_HOUSE: '0x7398B59C5BF71f78c1aE27341ceC089Ed9B91fb9',
        GEB_DEBT_AUCTION_HOUSE: '0x4e3eb382Add436542188b37b2d10077fb6E4DCF7',
        GEB_COLLATERAL_AUCTION_HOUSE_FACTORY: '0x321d278E1bDF686145C8fD185dDdA2178A3e3424',
        GEB_ACCOUNTING_ENGINE: '0xf916f00f0BA6C0bb74ff7958e225eD7091017732',
        GEB_LIQUIDATION_ENGINE: '0xbA63249276e48CCa3f19A1FC731cCf969d88Dd38',
        GEB_COIN_JOIN: '0xf077E445B4D60891ABFfE6294F08c12c4fAD51F9',
        GEB_COLLATERAL_JOIN_FACTORY: '0x91931AcaDbd3c94305787dAb972DC9b414412040',
        GEB_TAX_COLLECTOR: '0xd7363C24068191a8DFFeA32C270298347c5D533f',
        GEB_STABILITY_FEE_TREASURY: '0xfB91c222Bc1Aae5d3Ee922E90ab7Aa58De0E16c7',
        GEB_GLOBAL_SETTLEMENT: '0x6fABa65097693F251aBC7589465e591cA646Ca2b',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTION_HOUSE: '0x10B6097733e9C4d7025Dee03B01F48a9989515Ab',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTIONEER: '0x6759EEEe4194A89D0f9900EDC2A0d920fB860e38',
        GEB_RRFM_SETTER: '0xcD62999559dE678664e2f59230C8Aa3e6B86efdb',
        GEB_RRFM_CALCULATOR: '0x5B8d3C6909DA6baa436be102d16bBfA5a6D8c1a4',
        SAFE_MANAGER: '0xe0e95c4BB8A6ae4822DC8760563AE1e6d8bBd75f',
        PROXY_BASIC_ACTIONS: '0x22d0257DB39f4191e5df2cb1D23163208FAF7870',
        PROXY_REGISTRY: '0xea319d259e93f68Ed6414134ffCFA4912Bea85dB',
        PROXY_DEBT_AUCTION_ACTIONS: '0xc5b40e23fe1f6a26D85B0956A396f9F64551Ec94',
        PROXY_SURPLUS_AUCTION_ACTIONS: '0x2ff7998E6C491aE85Cdb7979eE8F003e2f094513',
        PROXY_COLLATERAL_AUCTION_ACTIONS: '0x1e08dFdd274BAe08059112920A413eB9Ac3D0CA8',
        PROXY_POST_SETTLEMENT_SURPLUS_AUCTION_ACTIONS: '0x7E184ed247Ff368De5a61Bf0C68dC23525F78cD6',
        PROXY_GLOBAL_SETTLEMENT_ACTIONS: '0x7D47f78C7989A6600EA1A921D8eF9FA52153D272',
        PROXY_REWARDED_ACTIONS: '0x9b57f00Ed2509e365E7b8C84e1B68aF5b5b9AC39',
        JOB_ACCOUNTING: '0xa6D3F5162F711240250472eAEfdAdC706C1F3a33',
        JOB_LIQUIDATION: '0xc938F05af0949D3de802DC874599dEE9BaCB250b',
        JOB_ORACLES: '0x920553927193474b4E25Fb73Ae51D1DdA0A5283f',
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
            address: '0x94beB5fC16824338Eaa538c3c857D7f7fFf4B2Ce',
            decimals: 18,
            symbol: 'OD',
            bytes32String: OD,
            collateralJoin: '',
            collateralAuctionHouse: '',
            isCollateral: false,
            camelotPoolAddress: '',
        },
        ODG: {
            address: '0x22d953bc460246199a02A4c6C2dAA929335645d0',
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
            address: '0x93b19315A575532907DeB0FA63Bbd74972934784',
            collateralJoin: '0xE0dF883Bc3a60Ef8e5522d7B5fE03ee2E5e4e31b',
            collateralAuctionHouse: '0x9d71cff8e3E2B0DC53983f9E3F38142EE99F8AB8',
            decimals: 18,
            symbol: 'WSTETH',
            bytes32String: WSTETH,
            isCollateral: true,
        },
        CBETH: {
            address: '0x11afeD730373251392b4bA3D146a334196998201',
            collateralJoin: '0xC40e96b01f526943596bd57854DAD4285878B989',
            collateralAuctionHouse: '0x56c04D90766bf64426037680d6bC79fEdba47E79',
            decimals: 18,
            symbol: 'CBETH',
            bytes32String: CBETH,
            isCollateral: true,
        },
        RETH: {
            address: '0xfaB4E79F883620CE5F9d65F4f760FF706475BFca',
            collateralJoin: '0x165b9CcB20cc313131c0152450dB91a7ee14E21e',
            collateralAuctionHouse: '0x88A755ee64e48A3dd239D6d0989D1e27E518ABE8',
            decimals: 18,
            symbol: 'RETH',
            bytes32String: RETH,
            isCollateral: true,
        },
        MAGIC: {
            address: '0x0F97Fc4b35b1C3c8c9fd6E723ebed6C267e6E2dd',
            collateralJoin: '0x05f8230CD0C85c43d9a7eDf26532F39B9D7E1896',
            collateralAuctionHouse: '0x7eeF092e0e89d46986C987Dfb89AA306fc2374d0',
            decimals: 18,
            symbol: 'MAGIC',
            bytes32String: MAGIC,
            isCollateral: true,
        },
        ARB: {
            address: '0x7Ff1f29BbFee60cFC4f004E9C8B58b57Ff003b3a',
            collateralJoin: '0x5900EB92788168A8Fa518461652E889f2caBA199',
            collateralAuctionHouse: '0x7A8152bb519b399e85d446fFe2F432D75AEA6bf9',
            decimals: 18,
            symbol: 'ARB',
            bytes32String: ARB,
            isCollateral: true,
        },
    },
    'arbitrum-goerli': {
        OD: {
            address: '0xc065c5d279E581aCAd056fDF825B0a55EAb9884e',
            decimals: 18,
            symbol: 'OD',
            bytes32String: OD,
            collateralJoin: '',
            collateralAuctionHouse: '',
            isCollateral: false,
            camelotPoolAddress: '0x2A09411c7208c6dDcEC0fe8e3E58841f5F0F2030',
        },
        ODG: {
            address: '0x52C0d18d7771ad9e0c8b700c84a4e845b2C3a41A',
            decimals: 18,
            symbol: 'ODG',
            bytes32String: '',
            collateralJoin: '',
            collateralAuctionHouse: '',
            isCollateral: false,
        },
        WETH: {
            address: '0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f',
            collateralJoin: '',
            collateralAuctionHouse: '',
            decimals: 18,
            symbol: 'WETH',
            bytes32String: WETH,
            isCollateral: false,
            chainlinkRelayer: '0x11a33A7A2b6F3fc120b833Dad41e09364A842756',
        },
        WSTETH: {
            address: '0x62AD1FEBB228bF824A63aD60081782CdB79a3D5F',
            collateralJoin: '0x1FbD7112aF8de5DBB7a26100417A4dfaF50c109b',
            collateralAuctionHouse: '0x446f0Fb6798e6AfA21234Fe4d8aa793DEee1efCF',
            decimals: 18,
            symbol: 'WSTETH',
            bytes32String: WSTETH,
            isCollateral: true,
        },
        CBETH: {
            address: '0xe50359EE05Bca07f21BfDBac94559db80BaaAE6D',
            collateralJoin: '0xf6B63F93889C70ED1dCbfF8d36FF3f58738651f2',
            collateralAuctionHouse: '0x9a645Aacf89b54a2a2e04326d5091a7cEbd5a61e',
            decimals: 18,
            symbol: 'CBETH',
            bytes32String: CBETH,
            isCollateral: true,
        },
        RETH: {
            address: '0x9a03853710513A0FE6DE50e660e96471D5ECEB94',
            collateralJoin: '0x30640b29Aafe0c958187d951a2a443C3eca3b3E1',
            collateralAuctionHouse: '0x46E67d383934c2f9C97eB733102C248Aec3f6Df2',
            decimals: 18,
            symbol: 'RETH',
            bytes32String: RETH,
            isCollateral: true,
        },
        MAGIC: {
            address: '0x4785cE54fAc50A793bEf8D7B0fBcbE476726ed51',
            collateralJoin: '0x4ec74508fc6E2eB524c70c894C5878a94A82b9bd',
            collateralAuctionHouse: '0x27C698F2206c28b05393a792c96E491F8f8E1644',
            decimals: 18,
            symbol: 'MAGIC',
            bytes32String: MAGIC,
            isCollateral: true,
        },
        ARB: {
            address: '0x6cf4f5A945B956355Bc33b992DF87C8A445855E1',
            collateralJoin: '0x2006A04Cd2C46fd6421845f4Ee2B7A2804A45394',
            collateralAuctionHouse: '0xA7164b02514a4532a841347377F182Cc47f6Bd3B',
            decimals: 18,
            symbol: 'ARB',
            bytes32String: ARB,
            isCollateral: true,
        },
    },
}

const subgraphs: Record<GebDeployment, string> = {
    'arbitrum-sepolia': 'https://api.studio.thegraph.com/query/52770/open-dollar---testnet/v1.5.8-rc.5',
    'arbitrum-goerli': 'https://api.studio.thegraph.com/query/52770/open-dollar---testnet/v1.5.6-rc.1',
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
