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

export type ContractList = {
    [key in ContractKey]: string
}

export declare type GebDeployment = 'arbitrum' | 'arbitrum-goerli' | 'arbitrum-sepolia'

const addresses: Record<GebDeployment, ContractList> = {
    'arbitrum-sepolia': {
        MULTICALL: '0xcA11bde05977b3631167028862bE2a173976CA11',
        ETH: '0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f',
        GEB_SYSTEM_COIN: '0x00D0f23771915A857d6483C7734838b87Fc90fD2',
        GEB_PROTOCOL_TOKEN: '0x00D2363Ea723d8Bc3D664b87Cf51A04033BD0Ef1',
        GEB_SAFE_ENGINE: '0xBa3a99892B601eFc34F51082AeAc521f322E4980',
        GEB_ORACLE_RELAYER: '0x65a5C8952248AA105cAcD7aB6E2c007bb4B69F94',
        GEB_SURPLUS_AUCTION_HOUSE: '0xCACA0b053d46bDFfea441Cef3364cc4582c72e23',
        GEB_DEBT_AUCTION_HOUSE: '0xaC427c92a5c3a687c1F8Fa95b885f535f1034FC4',
        GEB_COLLATERAL_AUCTION_HOUSE_FACTORY: '0xd31D7574080F2b29Bd61a4037428629b445c35cC',
        GEB_ACCOUNTING_ENGINE: '0x6C0EB178388446CdC0818F8b4ca80d872B598e0c',
        GEB_LIQUIDATION_ENGINE: '0x5CFc443Db66A8e8C39D9c769fD5EE1c139BaD159',
        GEB_COIN_JOIN: '0x2f01Ff86E91EAe7fcEFD7dC7339F74aaB58F0943',
        GEB_COLLATERAL_JOIN_FACTORY: '0x6Ff1fe02B2E64338Ed8E25B44AeB084A086121DC',
        GEB_TAX_COLLECTOR: '0xF0A280223d037F5c2e0Bd345963b2dF7AE697ef4',
        GEB_STABILITY_FEE_TREASURY: '0x0dE9E5252BEBb25abD4b1992E49f8CC352060fC8',
        GEB_GLOBAL_SETTLEMENT: '0x78FfF4E713EaEd0329E907788F037A170124eE88',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTION_HOUSE: '0x53aCAec26afBfad20a2C92CA7f555e2ABC707a21',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTIONEER: '0x7A83F5Ab23210d1Eb050aFE5f7e9E9a454782ea6',
        GEB_RRFM_SETTER: '0xf65E9F9d2A939069D6FE07d6a7F12a81d4013cf6',
        GEB_RRFM_CALCULATOR: '0x9a18558741691D07618f3D06a883077E528fA9ad',
        SAFE_MANAGER: '0xf98Ef7Ba4E5BaDaD414eAec6EA90DF29fcA75142',
        PROXY_BASIC_ACTIONS: '0x053dDd9738Aa8072cF48B19fC176e94351f960f6',
        PROXY_REGISTRY: '0x445f4bc91D3d96C968044328bF8cE59A7C2D56Da',
        PROXY_DEBT_AUCTION_ACTIONS: '0xfcAB538555b3aea34181D60e63eB033c008031B9',
        PROXY_SURPLUS_AUCTION_ACTIONS: '0x468bAA010369E06aB27B011601881cfFEf122fc6',
        PROXY_COLLATERAL_AUCTION_ACTIONS: '0x01d1e78695268cb95876C2Be35409fB3Fd73Af4B',
        PROXY_POST_SETTLEMENT_SURPLUS_AUCTION_ACTIONS: '0x8d76F570c496EA43B0163B834D8b3232a4cDffFB',
        PROXY_GLOBAL_SETTLEMENT_ACTIONS: '0xa0D4fCe94F3FA94A820D471791ccb35D166672a2',
        PROXY_REWARDED_ACTIONS: '0xC7a8CCFF6f09dC536c164bA6448F87553d60778D',
        JOB_ACCOUNTING: '0x5178C1A616CaF67184104Cc6555c0310bbB7F6d5',
        JOB_LIQUIDATION: '0xD1D1a18a459d9Be1a7C237578DF1aB3CFf051282',
        JOB_ORACLES: '0x67cAD916b2572708E352eDE3A16E54F8d353ebDB',
        // TODO: Add nitro and ODG pool addresses
        CAMELOT_WSTETH_NITRO_POOL: '0x0000000000000000000000000000000000000000',
        CAMELOT_RETH_NITRO_POOL: '0x0000000000000000000000000000000000000000',
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
        CAMELOT_WSTETH_NITRO_POOL: '0x0000000000000000000000000000000000000000',
        CAMELOT_RETH_NITRO_POOL: '0x0000000000000000000000000000000000000000',
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
        // TODO: Replace with mainnet addresses
        CAMELOT_WSTETH_NITRO_POOL: '0x4391D56A8E56BE1fB30a45bAa0E5B7a4b488FbAa',
        CAMELOT_RETH_NITRO_POOL: '0x4391D56A8E56BE1fB30a45bAa0E5B7a4b488FbAa',
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
    // TODO: Replace with mainnet addresses
    arbitrum: {
        OD: {
            address: '0x00D0f23771915A857d6483C7734838b87Fc90fD2',
            decimals: 18,
            symbol: 'OD',
            bytes32String: OD,
            collateralJoin: '',
            collateralAuctionHouse: '',
            isCollateral: false,
            camelotPoolAddress: '0x00D0f23771915A857d6483C7734838b87Fc90fD2',
        },
        ODG: {
            address: '0x0dc0caB40adDB6694B089dEdfC35B694a9B60Aac',
            decimals: 18,
            symbol: 'ODG',
            bytes32String: '',
            collateralJoin: '',
            collateralAuctionHouse: '',
            isCollateral: false,
            // The mainnet pool is at 0xF935263c9950EB2881FF58Bd6a76c3D2564A78D5
            camelotPoolAddress: ''
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
            address: '0xE5A21382f6ef9c3B6F873f69d583fFD3b91449F0',
            collateralJoin: '0x7B6583a843b41E5CB3E52055452052813496958C',
            collateralAuctionHouse: '0x965f467706bE40f2020e0eFa85Ef38607d592c65',
            decimals: 18,
            symbol: 'WSTETH',
            bytes32String: WSTETH,
            isCollateral: true,
            chainlinkRelayer: '',
        },
        CBETH: {
            address: '0x098bbDB3575CA05273837043f9F59946C62201e4',
            collateralJoin: '0x4BaD88483C9C98b76A0eF4413B6f5F19fF5f76D5',
            collateralAuctionHouse: '0xEe54B801ac028d76d35290816b0b18383b404254',
            decimals: 18,
            symbol: 'CBETH',
            bytes32String: CBETH,
            isCollateral: true,
        },
        RETH: {
            address: '0x2bF2A9E3A07B9f75fC1b36D56Efd6999b3AF7951',
            collateralJoin: '0xD5Caf52F4f2365789f5dC75b5847A5873DABad95',
            collateralAuctionHouse: '0x3e9D80DD8538222d81dF41cd001D4aDcb096CFc4',
            decimals: 18,
            symbol: 'RETH',
            bytes32String: RETH,
            isCollateral: true,
        },
        ARB: {
            address: '0x2F6aeB8D80C0726DEec970F615769f1c989d36b2',
            collateralJoin: '0xF14405230f195287d426616bE103B5227815D40F',
            collateralAuctionHouse: '0xbb5484cd846685152b0758Fd7265763Fb095698A',
            decimals: 18,
            symbol: 'ARB',
            bytes32String: ARB,
            isCollateral: true,
        },
    },
    'arbitrum-sepolia': {
        OD: {
            address: '0x00D0f23771915A857d6483C7734838b87Fc90fD2',
            decimals: 18,
            symbol: 'OD',
            bytes32String: OD,
            collateralJoin: '',
            collateralAuctionHouse: '',
            isCollateral: false,
            camelotPoolAddress: '0x00D0f23771915A857d6483C7734838b87Fc90fD2',
        },
        ODG: {
            address: '0x00D2363Ea723d8Bc3D664b87Cf51A04033BD0Ef1',
            decimals: 18,
            symbol: 'ODG',
            bytes32String: '',
            collateralJoin: '',
            collateralAuctionHouse: '',
            isCollateral: false,
            // The mainnet pool is at 0xF935263c9950EB2881FF58Bd6a76c3D2564A78D5
            camelotPoolAddress: ''
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
            address: '0xC586f5022D13de3462bC5456b8F895ef49b02Fb2',
            collateralJoin: '0x7B6583a843b41E5CB3E52055452052813496958C',
            collateralAuctionHouse: '0x965f467706bE40f2020e0eFa85Ef38607d592c65',
            decimals: 18,
            symbol: 'WSTETH',
            bytes32String: WSTETH,
            isCollateral: true,
            chainlinkRelayer: '',
        },
        CBETH: {
            address: '0x098bbDB3575CA05273837043f9F59946C62201e4',
            collateralJoin: '0x4BaD88483C9C98b76A0eF4413B6f5F19fF5f76D5',
            collateralAuctionHouse: '0xEe54B801ac028d76d35290816b0b18383b404254',
            decimals: 18,
            symbol: 'CBETH',
            bytes32String: CBETH,
            isCollateral: true,
        },
        RETH: {
            address: '0x2bF2A9E3A07B9f75fC1b36D56Efd6999b3AF7951',
            collateralJoin: '0xD5Caf52F4f2365789f5dC75b5847A5873DABad95',
            collateralAuctionHouse: '0x3e9D80DD8538222d81dF41cd001D4aDcb096CFc4',
            decimals: 18,
            symbol: 'RETH',
            bytes32String: RETH,
            isCollateral: true,
        },
        // MAGIC: {
        //     address: '0x0F97Fc4b35b1C3c8c9fd6E723ebed6C267e6E2dd',
        //     collateralJoin: '0x05f8230CD0C85c43d9a7eDf26532F39B9D7E1896',
        //     collateralAuctionHouse: '0x7eeF092e0e89d46986C987Dfb89AA306fc2374d0',
        //     decimals: 18,
        //     symbol: 'MAGIC',
        //     bytes32String: MAGIC,
        //     isCollateral: true,
        // },
        ARB: {
            address: '0x2F6aeB8D80C0726DEec970F615769f1c989d36b2',
            collateralJoin: '0xF14405230f195287d426616bE103B5227815D40F',
            collateralAuctionHouse: '0xbb5484cd846685152b0758Fd7265763Fb095698A',
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
            camelotPoolAddress: ''
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
        // MAGIC: {
        //     address: '0x4785cE54fAc50A793bEf8D7B0fBcbE476726ed51',
        //     collateralJoin: '0x4ec74508fc6E2eB524c70c894C5878a94A82b9bd',
        //     collateralAuctionHouse: '0x27C698F2206c28b05393a792c96E491F8f8E1644',
        //     decimals: 18,
        //     symbol: 'MAGIC',
        //     bytes32String: MAGIC,
        //     isCollateral: true,
        // },
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
    'arbitrum-sepolia': 'https://api.studio.thegraph.com/query/52770/open-dollar---testnet/v1.5.9-rc.2',
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
