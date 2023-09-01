import { WETH, OP, WBTC, STONES, FTRG, TOTEM } from '../utils'

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

export declare type GebDeployment = 'arbitrum' | 'arbitrum-goerli' | 'optimism-goerli'

const addresses: Record<GebDeployment, ContractList> = {
    'arbitrum-goerli': {
        MULTICALL: '0xcA11bde05977b3631167028862bE2a173976CA11',
        ETH: '0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f',
        GEB_SYSTEM_COIN: '0x1214fC79f895060fAA48e3CAf0C212E3D48B9696',
        GEB_PROTOCOL_TOKEN: '0xC6d32056a6AF761c6ecAA2CC89A82e140a9a6774',
        GEB_SAFE_ENGINE: '0x04b4A62152DaB552f976461bA7a490349a72Fe66',
        GEB_ORACLE_RELAYER: '0x6453154B95B74ee7daDE7490D1A6398e94673AF1',
        GEB_SURPLUS_AUCTION_HOUSE: '0x6eB5E0973a0159ba07821681034836660bC9AEbf',
        GEB_DEBT_AUCTION_HOUSE: '0x8E4baFC67aA2C3DaA621a566560F3fb1492A43fA',
        GEB_COLLATERAL_AUCTION_HOUSE_FACTORY: '0x3bB21228dfb7617f2851e859C118dc2A9FB65c90',
        GEB_ACCOUNTING_ENGINE: '0x86507aA80324D3a739F9349742b42f1966E7fD5A',
        GEB_LIQUIDATION_ENGINE: '0xba72145909Fd2AF2763322902fBc8CFa2593Ddc9',
        GEB_COIN_JOIN: '0x0d730679d360bE6Aaed68B1CdDe618302175bdb0',
        GEB_COLLATERAL_JOIN_FACTORY: '0x8c01992a71491EC9C167F3d87D83471926583232',
        GEB_TAX_COLLECTOR: '0xa0A2A6beA8F1BaAdfC4d4CCC516A4a784333f74A',
        GEB_STABILITY_FEE_TREASURY: '0x68837a35eF213dE47221F1Af26c4C60896432825',
        GEB_GLOBAL_SETTLEMENT: '0x8A77C343E5348399E93926c89782b6c38776C6E0',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTION_HOUSE: '0x593B822C8aeA7F09225F8555Dd74Aa439FCb2Cf2',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTIONEER: '0x7768284827bc13ADe18040e0aA0437f49AA394Bd',
        GEB_RRFM_SETTER: '0x7D9f230DC1f2a51f3865d81e0E6Af9eB506F0c49',
        GEB_RRFM_CALCULATOR: '0xeD332e3FB53f7274D596c9987bb5fB0012f66e35',
        SAFE_MANAGER: '0x2F365eB51495C3730C0928aE863d8f711c4a89dd',
        PROXY_FACTORY: '0x8B7b43d4439732794f9a859EaDf83ceF2FeB0C1e',
        PROXY_BASIC_ACTIONS: '0xF7A2663c9D07153eF88d489952396752d19fB689',
        PROXY_REGISTRY: '0x8B7b43d4439732794f9a859EaDf83ceF2FeB0C1e',
        PROXY_DEBT_AUCTION_ACTIONS: '0x714bed2FE18fbD8637ac0578f2E983096E785b28',
        PROXY_SURPLUS_AUCTION_ACTIONS: '0xeeB25da60F3F9C7D8fd9094d3e68C5a49e2441E8',
        PROXY_COLLATERAL_AUCTION_ACTIONS: '0x840Ba7107B739c7936f35f6f8070AB3a12bF00A0',
        PROXY_POST_SETTLEMENT_SURPLUS_AUCTION_ACTIONS: '0x1C465a2aC0362306A5a130be59409C4aCCab4636',
        PROXY_GLOBAL_SETTLEMENT_ACTIONS: '0xc258E9217a38aff39001e1b768710a0D4ac440cD',
        PROXY_REWARDED_ACTIONS: '0x987b7F8330e2f167C4f3e43bfD94f122942d645c',
        JOB_ACCOUNTING: '0x10BE006CCE05b29B4EfFC89C009db837A6Ad903f',
        JOB_LIQUIDATION: '0x58343Bc4e0764d404Ec1d8ED188d50317C27BE84',
        JOB_ORACLES: '0x55E38c1f7989601eAF23Dfac65EC9b7258a0FD01',
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
    'optimism-goerli': {
        // hai-on-op/sdk 1.2.0-rc.2
        //     MULTICALL: '0xcA11bde05977b3631167028862bE2a173976CA11',
        //     ETH: '0x4200000000000000000000000000000000000006',
        //     GEB_SYSTEM_COIN: '0x82535c9585A070BfA914924F6D83F7162D17A869',
        //     GEB_PROTOCOL_TOKEN: '0xbcc847DdE48E579fa8d98E0d4bd46161A0f84F8A',
        //     GEB_SAFE_ENGINE: '0x4ADe84BB4da143af07F9f89E00B65E3a08E2035A',
        //     GEB_ORACLE_RELAYER: '0xB6AA4B291ff95565dd6ECd9F7C811372468520ff',
        //     GEB_SURPLUS_AUCTION_HOUSE: '0x8e75186BC45ffEbedaA90773670a9f805e661894',
        //     GEB_DEBT_AUCTION_HOUSE: '0x8D602868C1d00F2A428719d680F81BDe6E1e50A1',
        //     GEB_COLLATERAL_AUCTION_HOUSE_FACTORY: '0xf979110B7EEDce98603b504f73Fd71Db5BE8146a',
        //     GEB_ACCOUNTING_ENGINE: '0x1eC0925d31590dAE3bB9aB7DE65109090B2c510a',
        //     GEB_LIQUIDATION_ENGINE: '0xd7d402568046651FEDef30AD62d1b876b76F5EE6',
        //     GEB_COIN_JOIN: '0x8D0452eD670872b91Ee0d4c0450af01840974025',
        //     GEB_COLLATERAL_JOIN_FACTORY: '0xeB7E2307f2994e9E7C5153E1a3B3407a4BF9B421',
        //     GEB_TAX_COLLECTOR: '0x99fBdeD15FCCC5D2284c3b07E438C76D3A9d045C',
        //     GEB_STABILITY_FEE_TREASURY: '0xb6f335AaC75184B8b18Cd5aF12Bd183C2Bd9b571',
        //     GEB_RRFM_CALCULATOR: '0xB800827d75074Df2152A75aB84fE06351F3E105f',
        //     GEB_RRFM_SETTER: '0xAafd9E0f3f3afD662bBE6819eaaEB7099bf22E4E',
        //     GEB_GLOBAL_SETTLEMENT: '0x84DFaefaB51Ce02DE5B7811983B68C9f402f99dd',
        //     GEB_POST_SETTLEMENT_SURPLUS_AUCTION_HOUSE: '0xD486fD908B6637eaEE2dD625A48537a2A4Ed826f',
        //     GEB_POST_SETTLEMENT_SURPLUS_AUCTIONEER: '0x8145F99712aA294523403C2B88198D92Da66d6b2',
        //     SAFE_MANAGER: '0x033Fa671B4743f343b3CA685845e48a412EC0302',
        //     PROXY_FACTORY: '0x129ed50D28B4A85F3862B25413142FE24eEd185c',
        //     PROXY_REGISTRY: '0xC33265Bd031D1B57b3555f31B36dB60A8A766Bfa',
        //     PROXY_BASIC_ACTIONS: '0xD34D69b9063A641F62F2a39CADd2996B54AC1C0b',
        //     PROXY_DEBT_AUCTION_ACTIONS: '0xb05984f73E7AcD8450B3244A0AB7C073065F4dF3',
        //     PROXY_SURPLUS_AUCTION_ACTIONS: '0x034c184E034c992AbE22F8a7930C03483586E459',
        //     PROXY_COLLATERAL_AUCTION_ACTIONS: '0x0c852243Bc5891aC2D418c3b507eBEE99d781e04',
        //     PROXY_POST_SETTLEMENT_SURPLUS_AUCTION_ACTIONS: '0xa79653eE7CB9ED9f42f026F799433c9aaa4e8A44',
        //     PROXY_GLOBAL_SETTLEMENT_ACTIONS: '0x3ab8129bb9456aE25538f1B3a0694f2D15357110',
        //     PROXY_REWARDED_ACTIONS: '0x39407e84B77eAF49176740704b9a9eD9a6B2DA4c',
        //     JOB_ACCOUNTING: '0x2b0Abebdd29c0a0A82aF96E76709c771cCaD194b',
        //     JOB_LIQUIDATION: '0xbDdCBE327610803B681868A9AE4EF61feA56DD9E',
        //     JOB_ORACLES: '0xE181f3dE1E196CD939E1006674C9466ACdF74143',

        // @hai-on-op/sdk v1.1
        MULTICALL: '0xcA11bde05977b3631167028862bE2a173976CA11',
        ETH: '0x4200000000000000000000000000000000000006',
        GEB_SYSTEM_COIN: '0x8548Dd38Fd5f54173cf349E99379C1FEC945b469',
        GEB_PROTOCOL_TOKEN: '0xbcc847DdE48E579fa8d98E0d4bd46161A0f84F8A',
        GEB_SAFE_ENGINE: '0xa81aAbe0A4c730E59715aef1a48B83D622022709',
        GEB_ORACLE_RELAYER: '0x10028d4ba68900b6894349F9Eaa179d2094A2f00',
        GEB_SURPLUS_AUCTION_HOUSE: '0x57927FBF2E396Cb2B246dD412984127200927b87',
        GEB_DEBT_AUCTION_HOUSE: '0x8728a476Bc15C08b8b22d08e527B9778e9Bbb32f',
        GEB_COLLATERAL_AUCTION_HOUSE_FACTORY: '0xD456de3189A77b6edbf928139f1eCEf2cd3e2644',
        GEB_ACCOUNTING_ENGINE: '0x64D93F245F921414416b0FcaDe2C035C67A971D6',
        GEB_LIQUIDATION_ENGINE: '0x5530B52229bA616Ac300F479268c1b7381eF16a4',
        GEB_COIN_JOIN: '0xfc63F2CfbfB09131a87452dF713E84885fFF9466',
        GEB_COLLATERAL_JOIN_FACTORY: '0xdcB44723463E2635416e8508dA8a1caEf08D5f1B',
        GEB_TAX_COLLECTOR: '0x18059871eA044bFE1e92F5EF0D5D6e621160C94d',
        GEB_STABILITY_FEE_TREASURY: '0xB8F9619ADC510F2B120A998AeEeDa42cABCB6990',
        GEB_RRFM_CALCULATOR: '0xB6F2aCB8CBD4A2BEC57e72e32b424CF16350c4fc',
        GEB_RRFM_SETTER: '0x4048AC752280F22b398643E6726660147fbcF1A5',
        GEB_GLOBAL_SETTLEMENT: '0xFd4fB8e5f11A3FD403761a832bC35F31d5579B83',
        SAFE_MANAGER: '0xc0C6e2e5a31896e888eBEF5837Bb70CB3c37D86C',
        PROXY_FACTORY: '0xCA969d78b986dE02CC6E44194e99C0b2F77F3cEc',
        PROXY_REGISTRY: '0x8FF12e19f1f246D0257D478C90eB47a960F4DBb4',
        PROXY_BASIC_ACTIONS: '0x659302F39e4a02C207fff42886be67e03eA9eEf6',
        PROXY_DEBT_AUCTION_ACTIONS: '0x68879209C06aFD673cF908A8b4E7cF80586a7bec',
        PROXY_SURPLUS_AUCTION_ACTIONS: '0xa1693DC0C081051f505A79e9bA94BDEa86f7B028',
        PROXY_COLLATERAL_AUCTION_ACTIONS: '0x1bfaA6EFd8AB497f3D5fA592186eA41322805D65',
        PROXY_GLOBAL_SETTLEMENT_ACTIONS: '0x718CfA7e479D3B155c736F71F1ebe28fF56E2265',
        PROXY_REWARDED_ACTIONS: '0x3884089C2DB189F866b82a6b214e7217e23cDE4c',
        JOB_ACCOUNTING: '0x3cE8DD6D2496190B0769A9743567e1919cDB1e47',
        JOB_LIQUIDATION: '0xAD038eFce5dE9DBC1acfe2e321Dd8F2D6f16e26b',
        JOB_ORACLES: '0x3e05f863afa6ACcAE0ED1e535559c881CB3f6b85',

        // from v1.2 but required for types
        PROXY_POST_SETTLEMENT_SURPLUS_AUCTION_ACTIONS: '0xa79653eE7CB9ED9f42f026F799433c9aaa4e8A44',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTION_HOUSE: '0xD486fD908B6637eaEE2dD625A48537a2A4Ed826f',
        GEB_POST_SETTLEMENT_SURPLUS_AUCTIONEER: '0x8145F99712aA294523403C2B88198D92Da66d6b2',
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
            address: '0x007b1aC6B1894351cD5B025470119cf07a719d5b',
            decimals: 18,
            symbol: 'OD',
            bytes32String: '',
            collateralJoin: '',
            collateralAuctionHouse: '',
            isCollateral: false,
        },
        ODG: {
            address: '0x1A095c17f8503A79E754371EfBb232c1C0D9cb07',
            decimals: 18,
            symbol: 'ODG',
            bytes32String: '',
            collateralJoin: '',
            collateralAuctionHouse: '',
            isCollateral: false,
        },
        WETH: {
            address: '0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f',
            decimals: 18,
            symbol: 'WETH',
            bytes32String: WETH,
            collateralJoin: '0xd4F5Dc250893cA025603A03d1fe5650D03fA5891',
            collateralAuctionHouse: '0x74B840D4B626e9bD174F74eFF8a59dE30Fc03eF9',
            isCollateral: true,
        },
        FTRG: {
            address: '0x0Ed89D4655b2fE9f99EaDC3116b223527165452D',
            decimals: 18,
            symbol: 'FTRG',
            bytes32String: FTRG,
            collateralJoin: '0x01c9E717B10605163D5B0beB45ab93497C34E77A',
            collateralAuctionHouse: '0xEc467776f0D8FF8FDE41057b8b2D0ed298072edF',
            isCollateral: true,
        },
        WBTC: {
            address: '0xAcFb9e6FD04FE18c56995C8d58C0785042766736',
            decimals: 8,
            symbol: 'WBTC',
            bytes32String: WBTC,
            collateralJoin: '0x32490555704591fF252287E888523bDC0cC42226',
            collateralAuctionHouse: '0xf214ADE436451fbb6909F444efFf7C34C2F2bB92',
            isCollateral: true,
        },
        STN: {
            address: '0x7e6Ee244FA65cEEb8b698E7866E127cD8C7440D0',
            decimals: 3,
            symbol: 'STN',
            bytes32String: STONES,
            collateralJoin: '0xeB8AcA91fc4BcEEc73ee8EE6Bcb3a6608F858bD1',
            collateralAuctionHouse: '0x85b35CEF271e6c9653b308b6130142B41d1992B8',
            isCollateral: true,
        },
        TOTEM: {
            address: '0x0Da1F0E501b20f963Ce671e62E11B09259f714c4',
            decimals: 3,
            symbol: 'TOTEM',
            bytes32String: STONES,
            collateralJoin: '0xC458429Fc706E4d6eA4852592d4d0F3E19563469',
            collateralAuctionHouse: '0x50298A8cAFdB116700Ba84189Ca426464fE872d5',
            isCollateral: true,
        },
    },
    'optimism-goerli': {
        // hai-on-op/sdk v1.2.0-rc.1
        // WETH: {
        //     address: '0x4200000000000000000000000000000000000006',
        //     decimals: 18,
        //     symbol: 'WETH',
        //     bytes32String: WETH,
        //     collateralJoin: '0x344a156575B6528CC6FfB2BDCA11462B2E1e8b36',
        //     collateralAuctionHouse: '0x1f89b2f02ff17368417e4D106FAd1E33e448811e',
        //     isCollateral: true,
        // },
        // OP: {
        //     address: '0x4200000000000000000000000000000000000042',
        //     decimals: 18,
        //     symbol: 'OP',
        //     bytes32String: OP,
        //     collateralJoin: '0x4A54a29b9bA80bfd0056E8E7a96329E4e6906d6d',
        //     collateralAuctionHouse: '0x742De44F54b157a73484816ECBe71769861956A4',
        //     isCollateral: true,
        // },
        // WBTC: {
        //     address: '0xA5553A3ec007914fC12d648cd9A00164535BFf98',
        //     decimals: 8,
        //     symbol: 'WBTC',
        //     bytes32String: WBTC,
        //     collateralJoin: '0x523a000b6A840c2927a3f9333F585d01565A9E9A',
        //     collateralAuctionHouse: '0x3A1Ca3d9c7B5c761776ADd7868D4983d9396B987',
        //     isCollateral: true,
        // },
        // STN: {
        //     address: '0x07Fe26b7a9247311b1587510BAd5B02CD33a7F64',
        //     decimals: 3,
        //     symbol: 'STN',
        //     bytes32String: STONES,
        //     collateralJoin: '0xAfE7A0565B8Bf0203DCF88D606fa49CF5E13E84f',
        //     collateralAuctionHouse: '0xFa17ae1cB6b887D6ce074116a09130eF39badAF7',
        //     isCollateral: true,
        // },
        // TTM: {
        //     address: '0x51d5F9Cc09394Ee3cF2601b18F8Af931e19460Bd',
        //     decimals: 0,
        //     symbol: 'TTM',
        //     bytes32String: TOTEM,
        //     collateralJoin: '0x96959F8fBBe22eA0d4581d8D2274Ad60e1Fc90dd',
        //     collateralAuctionHouse: '0xB54D5EBDE6F1c220ce846CE1a64274dfC0dF922b',
        //     isCollateral: true,
        // },
        // OD: {
        //     address: '0x82535c9585A070BfA914924F6D83F7162D17A869',
        //     decimals: 18,
        //     symbol: 'HAI',
        //     bytes32String: '',
        //     collateralJoin: '0x8D0452eD670872b91Ee0d4c0450af01840974025',
        //     collateralAuctionHouse: '',
        //     isCollateral: false,
        // },
        // ODG: {
        //     address: '0xbcc847DdE48E579fa8d98E0d4bd46161A0f84F8A',
        //     decimals: 18,
        //     symbol: 'KITE',
        //     bytes32String: '',
        //     collateralJoin: '',
        //     collateralAuctionHouse: '',
        //     isCollateral: false,
        // },

        // @hai-on-op/sdk v1.1
        WETH: {
            address: '0x4200000000000000000000000000000000000006',
            decimals: 18,
            symbol: 'WETH',
            bytes32String: WETH,
            collateralJoin: '0xFb0758b07B4260958Cb1589091489E2A2d9af513',
            collateralAuctionHouse: '0x40B5dAD43D2582d5c3975c3B1b55c36b7D2812c8',
            isCollateral: true,
        },
        OP: {
            address: '0x4200000000000000000000000000000000000042',
            decimals: 18,
            symbol: 'OP',
            bytes32String: OP,
            collateralJoin: '0x66b42623a06744d40dF27bb32816d4d1A6905914',
            collateralAuctionHouse: '0xbe5940d9572DD1e8A594b5691894CDb8eb130BE6',
            isCollateral: true,
        },
        WBTC: {
            address: '0x5E0e96b2c318E63EceA56Be06c7dEc0e8E87D5de',
            decimals: 8,
            symbol: 'WBTC',
            bytes32String: WBTC,
            collateralJoin: '0xfa27ed51bd028085C29b69dced2bDdd3FA777Ecd',
            collateralAuctionHouse: '0x92591B6EA0552E1B09d1fAB697628dA306401aD6',
            isCollateral: true,
        },
        STN: {
            address: '0x5eb7112b1cC8E6AC08566881c6F4f6508Fd99578',
            decimals: 3,
            symbol: 'STN',
            bytes32String: STONES,
            collateralJoin: '0xDc89c1dc710847a2CaffA65680bf3f182bFd5d0f',
            collateralAuctionHouse: '0x0F61583E8e558D9D1caA76533db7C97d7Ef76592',
            isCollateral: true,
        },
        TTM: {
            address: '0x09880394A9034e0337893A201A4B6AAC89bE6Cae',
            decimals: 0,
            symbol: 'TTM',
            bytes32String: TOTEM,
            collateralJoin: '0xa9002Dd9Dc6867E5D5f41152C926317B834241e6',
            collateralAuctionHouse: '0xB0e3dd0fFA9DCc0F6866711bFFDa13406e2850C9',
            isCollateral: true,
        },
        OD: {
            address: '0x8548Dd38Fd5f54173cf349E99379C1FEC945b469',
            decimals: 18,
            symbol: 'HAI',
            bytes32String: '',
            collateralJoin: '0xfc63F2CfbfB09131a87452dF713E84885fFF9466',
            collateralAuctionHouse: '',
            isCollateral: false,
        },
        ODG: {
            address: '0xbcc847DdE48E579fa8d98E0d4bd46161A0f84F8A',
            decimals: 18,
            symbol: 'KITE',
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
