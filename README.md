[![image](https://img.shields.io/npm/v/@hai-on-op/sdk.svg?style=flat-square)](https://www.npmjs.org/package/@hai-on-op/sdk)

# SDK

Library to interact with the GEB smart contracts. Manage your safes, mint RAI, inspect the system state, and much more.

The library is written in Typescript with full typing support. It allows access to the low level API to directly interact with the contracts.

## Install

```
npm install @usekeyp/od-sdk
```

## Examples

```typescript
import { ethers, utils as ethersUtils } from 'ethers'
import { Geb, utils } from '@usekeyp/od-sdk'
import { fetchUserSafes } from '@usekeyp/od-sdk/lib/virtual/virtualUserSafes.js'

// Setup Ether.js
const provider = new ethers.providers.JsonRpcProvider(
    'http://kovan.infura.io/<API KEY>'
)
const wallet = new ethers.Wallet('0xdefiisawesome...', provider)

// Create the main GEB object
const geb = new Geb('arbitrum', provider)

// Get a Vault by ID
let safe = await geb.getSafe(4)

// Get a Vault by user address
safes = await fetchUserSafes(geb, wallet.address)
```

# Contributing 

### Install

```bash
yarn

# Generate artifacts from solidity/
yarn prebuild
```

Create the built package with

```bash
yarn build
```
