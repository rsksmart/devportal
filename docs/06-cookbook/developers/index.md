---
sidebar_position: 200
title: Developer Hub
sidebar_label: Developers 
tags: [rsk, rootstock, solutions, guides, tutorials, developers]
description: "Here you will find hands-on code examples to help you integrate Rootstock's core features into your dApps, wallets, and services."
---

Here you will find hands-on code examples ("recipes") to help you integrate Rootstock's core features into your dApps, wallets, and services.

## The Yield Engines

Use the **Vaults SDK** to build yield-bearing applications on the Bitcoin and Dollar engines.

<CardsGrid>
  <CardsGridItem
    title="Integrate USDRIF"
    subtitle="Stablecoins"
    color="green"
    description="Mint and redeem USDRIF stablecoins or integrate the RIF savings rate into your dApp."
    linkHref="/cookbook/developers/"
    linkTitle="View Recipe"
  />
  <CardsGridItem
    title="Integrate rBTC Yield"
    subtitle="Bitcoin"
    color="orange"
    description="Use the Vaults SDK to programmatically deposit rBTC and display yield data in your UI."
    linkHref="/cookbook/institutions/"
    linkTitle="SDK Guide"
  />
</CardsGrid>

## Getting Started

Browse our collection of technical guides by category.

### Vaults & Yield

Technical resources for the Rootstock Vaults SDK.

* [**Vaults SDK Reference**](/cookbook/developers/vaults-sdk/) - *Installation, initialization, and core methods.*
* [**Querying Vault Data**](/cookbook/developers/query-vault-data/) - *How to fetch APY, TVL, and user balances via RPC.*
* [**Building a Yield Dashboard**](/cookbook/developers/yield-dashboard/) - *Frontend patterns for displaying Vault stats.*

### DeFi Guides
* [**Swapping Tokens (Uniswap v3)**](/resources/tutorials/oku-rootstock/) - *Interact with the Rootstock v3 router.*
* [**Lending & Borrowing**](/resources/tutorial/sumbiosis-rootstock/) - *Integrate with MoneyOnChain or Trov.*
* [**Flash Loans**](/developers/integrate) - *Execute atomic arbitrage strategies.*

### Infrastructure & Tooling Guides
* [**Connect to RPC Nodes**](/developers/rpc-api/) - *Public and private endpoints for Mainnet/Testnet.*
* [**Indexing with The Graph**](/dev-tools/data/thegraph/) - *Querying on-chain data with subgraphs.*
* [**Oracles & Price Feeds**](/dev-tools/oracles/) - *Using DIA or API3 for price data.*

## Quick Start

New to Rootstock? Start here to set up your environment.

| Tool | Purpose | Command / Link |
| :--- | :--- | :--- |
| **Vaults SDK** | Yield Integration | `npm install @rootstocklabs/vaults-sdk` |
| **Foundry** | Smart Contract Dev | [Foundry for Rootstock Guide](/developers/quickstart/foundry) |
| **Hardhat** | Smart Contract Dev | [Hardhat Config Guide](/developers/quickstart/hardhat) |
| **Rootstock CLI** | Node Management | `npm install -g @rsk-cli` |