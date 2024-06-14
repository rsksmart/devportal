---
menu_order: 300
menu_title: RNS.js Instance
layout: rsk
title: RNS JS Library - Instance
tags: rif, rns, rif-name-service, javascript,  domains, address, integrate, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

## Installation

```
npm i web3 @rsksmart/rns
```

- Source code: [github.com/rnsdomains/rns-js](https://github.com/rnsdomains/rns-js)
- npm: [npmjs.com/package/@rsksmart/rns](https://www.npmjs.com/package/@rsksmart/rns)

Or just use it directly in your webpage:
```
<script src="https://unpkg.com/web3@1.2.6/dist/web3.min.js"></script>
<script src="https://unpkg.com/@rsksmart/rns@1.5.11/lib/rns.min.js"></script>
```
> Don't forget to specify the desired version of the package!

## Instance for queries to RSK Mainnet/Testnet

```javascript
import Web3 from 'web3'
import RNS from '@rsksmart/rns'

const web3 = new Web3('https://rpc.testnet.rootstock.io/API_KEY') // or 'https://rpc.rootstock.io/'
const rns = new RNS(web3)
```

> Remember that if you are running the code in a webpage, no `import` statements are needed, just instantiate the libs made available in the global scope.

> Replace `"API_KEY"` with the api key that you have created for this App. For information on how to create an api key, see [How to get started with RPC API](/tools/rpc-api/).

## Instance in Chrome with wallet extension (Metamask)

```javascript
import Web3 from 'web3'
import RNS from '@rsksmart/rns'

if (!window.web3) {
  throw new Error('No wallet installed')
}

const web3 = new Web3(window.web3.currentProvider)
const rns = new RNS(web3)
```

> Find instructions in the [advanced usage](/rif/rns/libs/javascript/Advanced-usage) section if running local or custom blockchains.
