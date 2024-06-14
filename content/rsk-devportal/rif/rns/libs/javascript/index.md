---
menu_order: 200
section_title: Javascript
menu_title: About JS Library
layout: rsk
title: RNS JS Library
tags: rif, rns, rif-name-service, javascript,  domains, address, integrate, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
description: Learn more about RNS JS Library.
---

**RNS JS** Library has been built to make blockchain easy for developers. In simple words, it allows developers to interact with the entire RNS suite without needing to go deep into the RNS blockchain solution architecture. No more ABIs to instantiate contracts, no more contract addresses, just one library: **RNS JS**. It is fully customizable and has the needed presets to work with either Rootstock (RSK) Mainnet or Rootstock (RSK) Testnet without any extra configuration.

### Set it up in your local environment

## 1. Installation

```
npm i web3 @rsksmart/rns
```

## 2. Instantiate

```javascript
import Web3 from 'web3'
import RNS from '@rsksmart/rns'

const web3 = new Web3('https://rpc.testnet.rootstock.io/API_KEY') // or 'https://rpc.rootstock.io/'
const rns = new RNS(web3)
```

> Replace `"API_KEY"` with the api key that you have created for this App. For information on how to create an api key, see [How to get started with RPC API](/tools/rpc-api/).

## 3. Get an address!

```javascript
rns.addr('testing.rsk').then(console.log)
```

Are you excited about it and want to know more? Let's dive into the library with our [getting started](/rif/rns/libs/javascript/Getting-started) guide for beginners, or jump directly to the [available operations](/rif/rns/libs/javascript/Operations) section and start using them in your local environment. You can even try them out right here on this page:

<script async src="//jsfiddle.net/anonymoussssrs/bduearnw/1/embed/js,html,css,result/dark/"></script>
<br />

**RNS JS** has been built by and for developers, so we are always looking for collaboration. Check out our [contribution](/rif/rns/libs/javascript/Contribute) section, where you will find how can help RNS with proposals, issues, or pull requests.
