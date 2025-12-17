---
sidebar_position: 200
title: Build BTCFi dApps
sidebar_label: Build BTCFi dApps
tags: [rsk, rootstock, solutions, guides, tutorials, developers]
description: "Hands-on recipes to build Bitcoin Finance (BTCFi) applications on Rootstock."
---

Here you will find hands-on code examples ("recipes") to help you build **BTCFi (Bitcoin Finance)** applications. Whether you are building a lending protocol, a DEX, or a Yield Dashboard, these guides will get you started.

## Vault Integration (BTCFi)

Use the **Vaults SDK** to build yield-bearing applications on the Bitcoin and Dollar engines.

<CardsGrid>
  <CardsGridItem
    title="Integrate USDRIF Yield"
    subtitle="USDRIF Yield Vault"
    color="green"
    description="Mint and redeem USDRIF stablecoins or integrate the RIF savings rate into your dApp."
    linkHref="/cookbook/developers/integrate-usdrif/"
    linkTitle="View Recipe"
  />
  <CardsGridItem
    title="Integrate rBTC Yield"
    subtitle="rBTC Yield Vault"
    color="orange"
    description="Use the Vaults SDK to programmatically deposit rBTC and display yield data in your UI."
    linkHref="/cookbook/developers/vaults-sdk/"
    linkTitle="SDK Guide"
  />
</CardsGrid>

## Getting Started

Browse our collection of technical guides by category.

### Vaults & Yield
Technical resources for the Rootstock Vaults SDK.
* [**Vaults SDK Reference**](/cookbook/developers/vaults-sdk/) - *Installation, initialization, and core methods.*
* [**Querying Vault Data**](/cookbook/developers/query-vault-data/) - *How to fetch APY, TVL, and user balances via RPC.*

### DeFi Primitives
* [**Swapping Tokens (Uniswap v3)**](/resources/tutorials/oku-rootstock/) - *Interact with the Rootstock v3 router.*
* [**Lending & Borrowing**](/resources/tutorial/sumbiosis-rootstock/) - *Integrate with MoneyOnChain or Trov.*

## Quick Start

New to Rootstock? Start here to set up your environment.

| Tool | Purpose | Command / Link |
| :--- | :--- | :--- |
| **Vaults SDK** | Yield Integration | `npm install @rootstocklabs/vaults-sdk` |
| **Foundry** | Smart Contract Dev | [Foundry for Rootstock Guide](/developers/quickstart/foundry) |
| **Hardhat** | Smart Contract Dev | [Hardhat Config Guide](/developers/quickstart/hardhat) |
| **Rootstock CLI** | Node Management | `npm install -g @rsk-cli` |