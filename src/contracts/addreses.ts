import { WETH, OP, WBTC, STONES, FTRG } from '../utils'

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

export type ContractList = {
    [key in ContractKey]: string
}

export declare type GebDeployment = 'mainnet' | 'optimism-goerli' | 'arbitrum-goerli'

const addresses: Record<GebDeployment, ContractList> = {
    'arbitrum-goerli': {
        MULTICALL: '',
        ETH: '0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f',
        GEB_SYSTEM_COIN: '0x007b1aC6B1894351cD5B025470119cf07a719d5b',
        GEB_PROTOCOL_TOKEN: '0x1A095c17f8503A79E754371EfBb232c1C0D9cb07',
        GEB_SAFE_ENGINE: '0x3Ea69ED1931929678DE2de8E0b0C8FBd6FA5CFBA',
        GEB_ORACLE_RELAYER: '0x276f2F3e4A5Ca476Ef018cbe8646A5e00Db2dC32',
        GEB_SURPLUS_AUCTION_HOUSE: '0x97Ba91F8161c67eC0f5600f96Aa6B78eEcA83E2f',
        GEB_DEBT_AUCTION_HOUSE: '0x73098945f3e73caf01909C957A6bd65ED910F637',
        GEB_ACCOUNTING_ENGINE: '0xbeed3E8a9F70A91C5bc5f955B71317C456366CFA',
        GEB_LIQUIDATION_ENGINE: '0xd4E8C2463ac3388ddAC401EC91652190805E375E',
        GEB_COIN_JOIN: '0xb340D8890e90AFb7a79f3cFe88Df9E03B4b99b1f',
        GEB_TAX_COLLECTOR: '0xA290676CED25e26828b00294dBbEebCb356CD2E5',
        GEB_STABILITY_FEE_TREASURY: '0xf805849c1dE4627ba171F6C93540F77D9B9E6d20',
        GEB_RRFM_CALCULATOR: '0x63F197A871dF1485311762bc3284c2E4f0A65c0b',
        GEB_RRFM_SETTER: '0xb8E0FF656c799A79F08d44dDaf508D343693DE4e',
        GEB_GLOBAL_SETTLEMENT: '0x472Ec291F772F9FF3D3397553A32EdBfDBd881Ec',
        SAFE_MANAGER: '0xE4a203f79b4DEf769E4624387bEF5516AC74e7B8',
        PROXY_FACTORY: '0x7e65C1e8161e49Ed414bf0C751e9D6B0E370C4db',
        PROXY_REGISTRY: '0x7e65C1e8161e49Ed414bf0C751e9D6B0E370C4db',
        PROXY_BASIC_ACTIONS: '0x3C929D32b85ffF713b15e6d9C3B0D5868B0C9157',
        PROXY_DEBT_AUCTION_ACTIONS: '0xAF44D66b9d035a028328c99f0Adb7AB85928724c',
        PROXY_SURPLUS_AUCTION_ACTIONS: '0x267D4BDf13DaDD3Da7C90074E163c44443505CA5',
        PROXY_COLLATERAL_AUCTION_ACTIONS: '0x92A093f53360ffc42f75f6D00af51E26138725b4',
        PROXY_REWARDED_ACTIONS: '0xA2C86fBae73C2672ace63a732274a1D4c0FE938F',
    },
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
    },
    'optimism-goerli': {
        MULTICALL: '0xcA11bde05977b3631167028862bE2a173976CA11',
        ETH: '0x4200000000000000000000000000000000000006',
        GEB_SYSTEM_COIN: '0x8548Dd38Fd5f54173cf349E99379C1FEC945b469',
        GEB_PROTOCOL_TOKEN: '0xbcc847DdE48E579fa8d98E0d4bd46161A0f84F8A',
        GEB_SAFE_ENGINE: '0xa81aAbe0A4c730E59715aef1a48B83D622022709',
        GEB_ORACLE_RELAYER: '0x10028d4ba68900b6894349F9Eaa179d2094A2f00',
        GEB_SURPLUS_AUCTION_HOUSE: '0x57927FBF2E396Cb2B246dD412984127200927b87',
        GEB_DEBT_AUCTION_HOUSE: '0x8728a476Bc15C08b8b22d08e527B9778e9Bbb32f',
        GEB_ACCOUNTING_ENGINE: '0x64D93F245F921414416b0FcaDe2C035C67A971D6',
        GEB_LIQUIDATION_ENGINE: '0x5530B52229bA616Ac300F479268c1b7381eF16a4',
        GEB_COIN_JOIN: '0xfc63F2CfbfB09131a87452dF713E84885fFF9466',
        GEB_TAX_COLLECTOR: '0x18059871eA044bFE1e92F5EF0D5D6e621160C94d',
        GEB_STABILITY_FEE_TREASURY: '0xB8F9619ADC510F2B120A998AeEeDa42cABCB6990',
        GEB_RRFM_CALCULATOR: '0xB6F2aCB8CBD4A2BEC57e72e32b424CF16350c4fc',
        GEB_RRFM_SETTER: '0x4048AC752280F22b398643E6726660147fbcF1A5',
        GEB_GLOBAL_SETTLEMENT: '0xFd4fB8e5f11A3FD403761a832bC35F31d5579B83',
        SAFE_MANAGER: '0xc0C6e2e5a31896e888eBEF5837Bb70CB3c37D86C',
        PROXY_FACTORY: '0xCA969d78b986dE02CC6E44194e99C0b2F77F3cEc',
        PROXY_REGISTRY: '0x8FF12e19f1f246D0257D478C90eB47a960F4DBb4',
        PROXY_BASIC_ACTIONS: '0x0c3287b5C1Ea5b04E90A3d1af02B78544b33f573',
        PROXY_DEBT_AUCTION_ACTIONS: '0xFb47e938010Cbd6f6b5953Be7aDc10F9c07d5CAA',
        PROXY_SURPLUS_AUCTION_ACTIONS: '0x85f9a28F7F7e343e1806E112272bd783eA73b4B9',
        PROXY_COLLATERAL_AUCTION_ACTIONS: '0x85f9a28F7F7e343e1806E112272bd783eA73b4B9',
        PROXY_REWARDED_ACTIONS: '0xdD481aF67e8dfee190545Ae1b97c36373BfA1a7e',
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
    'arbitrum-goerli': {
        WETH: {
            address: '0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f',
            decimals: 18,
            symbol: 'WETH',
            bytes32String: WETH,
            collateralJoin: '0xd4F5Dc250893cA025603A03d1fe5650D03fA5891',
            collateralAuctionHouse: '0x74B840D4B626e9bD174F74eFF8a59dE30Fc03eF9',
            isCollateral: true,
        },
        // FTRG: {
        //     address: '',
        //     decimals: 18,
        //     symbol: 'FTRG',
        //     bytes32String: FTRG,
        //     collateralJoin: '0x01c9E717B10605163D5B0beB45ab93497C34E77A',
        //     collateralAuctionHouse: '0xEc467776f0D8FF8FDE41057b8b2D0ed298072edF',
        //     isCollateral: true,
        // },
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
