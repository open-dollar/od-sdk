
<h1 align="center">Weclome to @usekeyp/od-sdk 👋</h1>
<p align="center">
   <a href="https://www.npmjs.org/package/@usekeyp/od-sdk" target="_blank">
    <img alt="npm package" src="https://img.shields.io/npm/v/@usekeyp/od-sdk.svg?style=flat-square" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg" />
  </a>
  <a href="https://twitter.com/UseKeyp" target="_blank">
    <img alt="Twitter: UseKeyp" src="https://img.shields.io/twitter/follow/UseKeyp.svg?style=social" />
  </a>
</p>

Library to interact with the Open Dollar smart contracts. Manage your vaults, mint OD, inspect the system state, and much more.

The library is written in Typescript with full typing support. It allows access to the low level API to directly interact with the contracts.

## Usage 📖

```bash
yarn add @usekeyp/od-sdk
```


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

// Create a proxy 
const txData = await geb.contracts.proxyRegistry.populateTransaction['build()']()
const tx = await wallet.sendTransaction(txData)
console.log(`Transaction ${tx.hash} waiting to be mined...`)
await tx.wait()

// Open a vault
// TODO
```

## Resources 🧑‍💻

Documentation

## Contributing 💡  

Running `prebuild` is required to generate the solidity artifacts files

```bash
yarn
yarn prebuild
```
