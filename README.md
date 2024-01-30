<p align="center">
<img width="60" height="60"  src="https://raw.githubusercontent.com/open-dollar/.github/main/od-logo.svg">
</p>
<h1 align="center">
  @opendollar/sdk
</h1>

<p align="center">
   <a href="https://www.npmjs.org/package/@opendollar/sdk" target="_blank">
    <img alt="npm package" src="https://img.shields.io/npm/v/@opendollar/sdk.svg?style=flat-square" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg" />
  </a>
  <a href="https://twitter.com/open_dollar" target="_blank">
    <img alt="Twitter: open_dollar" src="https://img.shields.io/twitter/follow/open_dollar.svg?style=social" />
  </a>
</p>

Library to interact with the Open Dollar smart contracts. Manage your vaults, mint OD, inspect the system state, and much more.

The library is written in Typescript with full typing support. It allows access to the low level API to directly interact with the contracts.

## Usage 📖

```bash
yarn add @opendollar/sdk
```


```typescript
import { ethers, utils as ethersUtils } from 'ethers'
import { Geb, utils } from '@opendollar/sdk'
import { fetchUserSafes } from '@opendollar/sdk/lib/virtual/virtualUserSafes.js'

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
const txData = await geb.deployProxy()
const tx = await wallet.sendTransaction(txData)
console.log(`Transaction ${tx.hash} waiting to be mined...`)
await tx.wait()

// Open a vault
// TODO
```

## How Information is Fetched with Subgraphs 📊

Our SDK uses subgraphs to fetch indexed information about auctions (collateral, surplus, and debt) from the blockchain. The subgraphs are hosted on The Graph, 
and we also have our own Render-hosted subgraph. For more information about how to deploy your own subgraph check
out our [od-subgraph](https://github.com/open-dollar/od-subgraph) repo.

The main way we fetch auction information is through the `querySubgraph` function. This function take in a subgraph URL and a GraphQL query
corresponding to the auction type (for example, `fetchSurplusAuctionEvents` will fetch the surplus auctions). The function will return
a promise that resolves to an array of auction events. The auction events will be persisted in `od-app` through the Redux store 
in `auctionModel.ts`.

### Subgraph Redundancy

When a request fails to our hosted subgraph in The Graph, we will automatically retry the request to our Render-hosted subgraph
in the `querySubgraph` function. Make sure in `od-app` you've set `REACT_APP_FALLBACK_SUBGRAPH_URL` as a .env variable to ensure
there's a fallback subgraph to query.


## Resources 🧑‍💻

Documentation

## Contributing 💡  

Running `prebuild` is required to generate the solidity artifacts files

```bash
yarn
yarn prebuild
```
