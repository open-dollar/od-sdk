import { WETH, OP, WBTC, STONES } from '../utils'

// All keys are mandatory
export type ContractKey =
    | 'ETH_FROM'
    | 'STARTING_BLOCK_NUMBER'
    | 'PROXY_DEPLOYER'
    | 'COIN_TYPE'
    | 'GOVERNANCE_TYPE'
    | 'MULTICALL'
    | 'FAUCET'
    | 'GEB_MULTISIG'
    | 'GEB_DEPLOY'
    | 'GEB_PROT'
    | 'GEB_SAFE_ENGINE'
    | 'GEB_TAX_COLLECTOR'
    | 'GEB_LIQUIDATION_ENGINE'
    | 'GEB_ACCOUNTING_ENGINE'
    | 'GEB_COIN_JOIN'
    | 'GEB_SURPLUS_AUCTION_HOUSE'
    | 'GEB_DEBT_AUCTION_HOUSE'
    | 'GEB_ORACLE_RELAYER'
    | 'GEB_GLOBAL_SETTLEMENT'
    | 'GEB_STABILITY_FEE_TREASURY'
    | 'BASIC_ACTIONS'
    | 'PROXY_ACTIONS_GLOBAL_SETTLEMENT'
    | 'SAFE_MANAGER'
    | 'PROXY_FACTORY'
    | 'PROXY_REGISTRY'
    | 'ETH'
    | 'MEDIANIZER_ETH'
    // | 'MEDIANIZER_OP'
    | 'PROXY_DEPLOYER'
    | 'GEB_RRFM_SETTER'
    | 'MEDIANIZER_RAI'
    | 'GEB_RRFM_CALCULATOR'
    | 'SPOT_RAI'
    | 'PROXY_DEBT_AUCTION_ACTIONS'
    | 'PROXY_SURPLUS_AUCTION_ACTIONS'
    | 'PROXY_COLLATERAL_AUCTION_ACTIONS'

export type ContractList = {
    [key in ContractKey]: string
}

export declare type GebDeployment = 'mainnet' | 'optimism-goerli'

const addresses: Record<GebDeployment, ContractList> = {
    mainnet: {
        ETH_FROM: '0x7FAfc11677649DB6AbFEC127B4B776D585520ae1',
        STARTING_BLOCK_NUMBER: '11848304',
        PROXY_DEPLOYER: '0x631e38D6Dc0F4A26F6BE0d3d0E4ebA3d02033aB4',
        COIN_TYPE: 'INDEX',
        GOVERNANCE_TYPE: 'MULTISIG-SAFE',
        MULTICALL: '0x51812e07497586ce025D798Bb44b6d11bBEe3a01',
        FAUCET: '0x0000000000000000000000000000000000000000',
        GEB_MULTISIG: '0x427A277eA53e25143B3b509C684aA4D0EB8bA01b',
        GEB_DEPLOY: '0x24AcC85528e6dd5B9C297fb8821522D36B1Ae09f',
        GEB_PROT: '0x6243d8CEA23066d098a15582d81a598b4e8391F4',
        GEB_SAFE_ENGINE: '0xCC88a9d330da1133Df3A7bD823B95e52511A6962',
        GEB_TAX_COLLECTOR: '0xcDB05aEda142a1B0D6044C09C64e4226c1a281EB',
        GEB_LIQUIDATION_ENGINE: '0x4fFbAA89d648079Faafc7852dE49EA1dc92f9976',
        GEB_ACCOUNTING_ENGINE: '0xcEe6Aa1aB47d0Fb0f24f51A3072EC16E20F90fcE',
        GEB_COIN_JOIN: '0x0A5653CCa4DB1B6E265F47CAf6969e64f1CFdC45',
        GEB_SURPLUS_AUCTION_HOUSE: '0x4EEfDaE928ca97817302242a851f317Be1B85C90',
        GEB_DEBT_AUCTION_HOUSE: '0x1896adBE708bF91158748B3F33738Ba497A69e8f',
        GEB_ORACLE_RELAYER: '0x4ed9C0dCa0479bC64d8f4EB3007126D5791f7851',
        GEB_GLOBAL_SETTLEMENT: '0xee4cf96e5359d9619197fd82b6ef2a9eae7b91e1',
        GEB_STABILITY_FEE_TREASURY: '0x83533fdd3285f48204215E9CF38C785371258E76',
        GEB_RRFM_CALCULATOR: '0x5CC4878eA3E6323FdA34b3D28551E1543DEe54C6',
        GEB_RRFM_SETTER: '0x7acfc14dbf2decd1c9213db32ae7784626daeb48',
        BASIC_ACTIONS: '0x174097a14a03Adb0039B0b7476E7fc2217d99579',
        PROXY_ACTIONS_GLOBAL_SETTLEMENT: '0x17b5d9914194a08c7Ef14451BA15E8aE4f92Cb93',
        PROXY_DEBT_AUCTION_ACTIONS: '0x943C6Bb9FD652f6e4a9dA32894075e5aBECAd394',
        PROXY_SURPLUS_AUCTION_ACTIONS: '0x16B0BF0Bf031A3691f4bD600e5340fEDd149C0ED',
        SAFE_MANAGER: '0xEfe0B4cA532769a3AE758fD82E1426a03A94F185',
        PROXY_FACTORY: '0xA26e15C895EFc0616177B7c1e7270A4C7D51C997',
        PROXY_REGISTRY: '0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4',
        MEDIANIZER_RAI: '0xFbF4849a06F6e6F53EcB31D2f8BD61aA7874b268',
        SPOT_RAI: '0x7235a0094eD56eB2Bd0de168d307C8990233645f',
        ETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        MEDIANIZER_ETH: '0xb825e25856bD98b3f2FAF2aEb6Cb8742B38C4025',
        PROXY_COLLATERAL_AUCTION_ACTIONS: '0x0000000000000000000000000000000000000000',
    },
    'optimism-goerli': {
        ETH_FROM: '0x0000000000000000000000000000000000000100',
        STARTING_BLOCK_NUMBER: '23275958',
        PROXY_DEPLOYER: '0x0000000000000000000000000000000000000101',
        COIN_TYPE: 'INDEX',
        GOVERNANCE_TYPE: 'MULTISIG-SAFE',
        MULTICALL: '0xcA11bde05977b3631167028862bE2a173976CA11',
        FAUCET: '0x0000000000000000000000000000000000000000',
        GEB_MULTISIG: '0x0000000000000000000000000000000000000103',
        GEB_DEPLOY: '0x0000000000000000000000000000000000000105',
        GEB_PROT: '0xe305D09d46bD6c9C0178799Bc1424282b798876C',
        GEB_SAFE_ENGINE: '0xBDd34044Ab215Fd5547251D29e6972F7dCfb7D60',
        GEB_TAX_COLLECTOR: '0x979175221543b23ef11577898dA53C87779A54cE',
        GEB_LIQUIDATION_ENGINE: '0xcCF4aef289CfbA9E5D1f55D6B2Cd6719E56c16D9',
        GEB_ACCOUNTING_ENGINE: '0xA639a991A6efce6Cf07075E2a85eD7Ac680A9a8A',
        GEB_COIN_JOIN: '0x1ceABCDB63dFF8734bB9D969C398936C0d6B4ad5',
        GEB_SURPLUS_AUCTION_HOUSE: '0xe96EeAb3b69d026FF319a310459AD7ADDD8d22a9',
        GEB_DEBT_AUCTION_HOUSE: '0xbEcB8EB637B486dCfbd8c6bb4C4ED2e9b673766a',
        GEB_ORACLE_RELAYER: '0x93de8CBD2C4D4A3101EE602f43232A1f5acb8CaC',
        GEB_GLOBAL_SETTLEMENT: '0x1de67dA2aa6C3C0BEa350546f9BA4a8281b4CEAe',
        GEB_STABILITY_FEE_TREASURY: '0x37ee83E054D2f64efda73B48e360b30f8070858D',
        GEB_RRFM_CALCULATOR: '0x0000000000000000000000000000000000000114',
        GEB_RRFM_SETTER: '0x0000000000000000000000000000000000000116',
        BASIC_ACTIONS: '0x48fC4859e06c1096b3A02d391F96376AdA9259a8',
        PROXY_ACTIONS_GLOBAL_SETTLEMENT: '0x0000000000000000000000000000000000000000',
        PROXY_DEBT_AUCTION_ACTIONS: '0x5fc994EBfAe4ABeFca0f2DeeFDC2C8A46AD2bEb0',
        PROXY_SURPLUS_AUCTION_ACTIONS: '0xB0C1470255f08a06A5123e03554Fb7CeBF41Ed6a',
        PROXY_COLLATERAL_AUCTION_ACTIONS: '0xE4f9DbD083419944e401Bd709eA74fb52a8dcdCa',
        SAFE_MANAGER: '0xE5559B4C5605a2cd4F6F3DD84D9eeF2Df7aC3EB1',
        PROXY_FACTORY: '0x74044fDd9C267050f5b11987e1009b76b5ef806b',
        PROXY_REGISTRY: '0x8505e8D84654467d032DB394637D0FaFf477568a',
        MEDIANIZER_RAI: '0x0000000000000000000000000000000000000420',
        SPOT_RAI: '0x0000000000000000000000000000000000000127',
        ETH: '0x4200000000000000000000000000000000000006',
        MEDIANIZER_ETH: '0x74558a1470c714BB5E24a6ba998905Ee5F3F0A25',
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
            address: '0xf1FDB809f41c187cE6F2A4C8cC6562Ba7479B4EF',
            decimals: 8,
            symbol: 'WBTC',
            bytes32String: WBTC,
            collateralJoin: '0xd19065f7b903ce0d54a320cb7a960cd56fab0347',
            collateralAuctionHouse: '0xf9d1d16af6b3d1a271df450fb7a3ff5775add1ff',
            isCollateral: true,
        },
        STN: {
            address: '0x4FC4CB45A812AE5d85bE39b6D7fc9D169405a31F',
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
