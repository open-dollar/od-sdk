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
    | 'PROXY_GLOBAL_SETTLEMENT_ACTIONS'

export type ContractList = {
    [key in ContractKey]: string
}

export declare type GebDeployment = 'mainnet' | 'optimism-goerli' | 'arbitrum-goerli'

const addresses: Record<GebDeployment, ContractList> = {
    'arbitrum-goerli': {
        MULTICALL: '',
        ETH: '',
        GEB_SYSTEM_COIN: '0x3a35bF1Cf9fa82B216F1f7E25C3b6eFCCc3d031B',
        GEB_PROTOCOL_TOKEN: '0x95BC1cAe012b7F084BECEa8162F13e4a7292F7e1',
        GEB_SAFE_ENGINE: '0x18F501460f2eD907f12621678d676014138094AC',
        GEB_ORACLE_RELAYER: '0x14f9D7feA518890E431afCf01B70818fbf30D97d',
        GEB_SURPLUS_AUCTION_HOUSE: '0x9c857d5B0508e312b015Ee300Ac11857b6875Ce3',
        GEB_DEBT_AUCTION_HOUSE: '0x28D76996ff24C8Bb174242A79dfD860B0Da7b173',
        GEB_ACCOUNTING_ENGINE: '0x0987F0270778A901fB58cA90fb7545d13D463261',
        GEB_LIQUIDATION_ENGINE: '0xA11974F58bC2B55Bb45B4104a8b07B93210f8eBa',
        GEB_COIN_JOIN: '0x479e3B7da96a3cF7235831641Db95A8eCb98BBEB',
        GEB_TAX_COLLECTOR: '0xa6859040ff2f4fC41F5e3Cd9300887768FbEeEE1',
        GEB_STABILITY_FEE_TREASURY: '0x5DAE4245CfA26788B9f23B7EaA5C5d9DA2eE123e',
        GEB_RRFM_CALCULATOR: '0xf373598b2E0E936216EDeDd9Ee52cC2AF25ff23E',
        GEB_RRFM_SETTER: '0xE9A8cD9A7a6Eb4b1E722911fCd98E6B39FAaB300',
        GEB_GLOBAL_SETTLEMENT: '0x48133Deba716dCa3E9AcB2210E72FF8Ea56D603e',
        SAFE_MANAGER: '0x43b5D6FF641C5db02fe3890b3ef714044cf9193c',
        PROXY_FACTORY: '0x79a83634268127b99639af392D48F0Ab0a55E73F',
        PROXY_REGISTRY: '0x1eeA49507De4b482F002Db8AD75663EA1b443E28',
        PROXY_BASIC_ACTIONS: '0x0Ef74400C4fBE8979da6658De6464A2197abE841',
        PROXY_DEBT_AUCTION_ACTIONS: '0xE6AB752cFdD1B8310f5B125E69Cd5D35eDC8C14b',
        PROXY_SURPLUS_AUCTION_ACTIONS: '0xA283ADDB70d15033d3c16630EA16F644cb5048AA',
        PROXY_COLLATERAL_AUCTION_ACTIONS: '0xE6B66f657B4E61c046621215C71c56C85239B074',
        PROXY_REWARDED_ACTIONS: '0x4900ed8E641ca7671e94Ad2Ca640a964C944ea3e',
        PROXY_GLOBAL_SETTLEMENT_ACTIONS: '',
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
        PROXY_GLOBAL_SETTLEMENT_ACTIONS: '0x0000000000000000000000000000000000000000',
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
    'arbitrum-goerli': {
        WETH: {
            address: '',
            decimals: 18,
            symbol: 'WETH',
            bytes32String: WETH,
            collateralJoin: '0xe18DDcf644e36f4d232CDbE8330C8BF2Bb2aa200',
            collateralAuctionHouse: '0x81dd2cc191a8ECE5FF7858aC9946043B34d1f7B7',
            isCollateral: true,
        },
        FTRG: {
            address: '',
            decimals: 18,
            symbol: 'FTRG',
            bytes32String: FTRG,
            collateralJoin: '0x8b0711fED18a947a3BF46b7356f1Ab8D416074df',
            collateralAuctionHouse: '0x323D952a9bA1bE39AF824C79107D97A39487c3a1',
            isCollateral: true,
        },
        WBTC: {
            address: '0xa793Aea0A3B0D200f4C3b20B877b43dc5bf9c17c',
            decimals: 8,
            symbol: 'WBTC',
            bytes32String: WBTC,
            collateralJoin: '0xb7E52601250357C1FCE47954c6a7D24B4113a774',
            collateralAuctionHouse: '0xF1AeB8F15812B50498a30CD570a71bb921E9cb5E',
            isCollateral: true,
        },
        STN: {
            address: '0x2C3E2E6cd0DD83C7233Af5a13172974F00AcFE23',
            decimals: 3,
            symbol: 'STN',
            bytes32String: STONES,
            collateralJoin: '0x08F8e63EC811a56B7227AE8772d87D9672727fa8',
            collateralAuctionHouse: '0x73c2DB6Dc83a2Dc62139ac89e9014F669d85Ea17',
            isCollateral: true,
        },
        TOTEM: {
            address: '0xa65E8F7e398B82899C83412Ab552593b67da1b83',
            decimals: 3,
            symbol: 'TOTEM',
            bytes32String: STONES,
            collateralJoin: '0xee7DC58C7A911dB8770D85b68549537455b9241E',
            collateralAuctionHouse: '0x54867Db0aF2FcAb98BbC054A37a121f6e9f85E19',
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
