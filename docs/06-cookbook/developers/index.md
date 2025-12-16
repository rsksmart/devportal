---
sidebar_position: 200
title: Developer Recipes 
sidebar_label: Developer Recipes 
tags: [rsk, rootstock, solutions, guides, tutorials, developers]
description: "Here you will find hands-on code examples to help you integrate Rootstock's core features into your dApps, wallets, and services."
---

Here you will find hands-on code examples ("recipes") to help you integrate Rootstock's core features into your dApps, wallets, and services.

## The Yield Engines

Use these recipes to integrate the **Bitcoin** and **USDRIF** vaults directly into your application.

<CardsGrid>
  <CardsGridItem
    title="Integrate USDRIF"
    subtitle="USDRIF"
    color="green"
    description="Mint and redeem USDRIF stablecoins or integrate the RIF savings rate."
    linkHref="/cookbook/developers/integrate/"
    linkTitle="Learn more"
  />
  <CardsGridItem
    title="Integrate rBTC Yield"
    subtitle="rBTC"
    color="cyan"
    linkHref="/cookbook/developers/integrate/"
    linkTitle="Learn more"
    description="Learn how to programmatically deposit rBTC and read APY data using the Vaults SDK."
  />
</CardsGrid>

## Getting Started

Browse our collection of technical guides by category.

### Vaults & Yield
* [**Integrate rBTC Yield Vaults**](/developers/integrate) - *The core Bitcoin yield integration.*
* [**Querying Vault Data**](/developers/integrate/) - *How to fetch APY, TVL, and user balances via RPC.*
* [**Building a Yield Dashboard**](/developers/integrate/) - *Frontend patterns for displaying Vault stats.*

### DeFi Primitives
* [**Swapping Tokens (Uniswap v3)**](/resources/tutorials/oku-rootstock/) - *Interact with the Rootstock v3 router.*
* [**Lending & Borrowing**](/resources/tutorial/sumbiosis-rootstock/) - *Integrate with MoneyOnChain or Trov.*
* [**Flash Loans**](/developers/integrate) - *Execute atomic arbitrage strategies.*

### Infrastructure & Tooling
* [**Connect to RPC Nodes**](/developers/rpc-api/) - *Public and private endpoints for Mainnet/Testnet.*
* [**Indexing with The Graph**](/dev-tools/data/thegraph/) - *Querying on-chain data with subgraphs.*
* [**Oracles & Price Feeds**](/dev-tools/oracles/) - *Using DIA or API3 for price data.*

## Quick Start

New to Rootstock? Start here to set up your environment.

| Tool | Purpose | Command / Link |
| :--- | :--- | :--- |
| **Vaults SDK** | Official Yield Integration | Coming Soon |
| **Foundry** | Smart Contract Dev | [Foundry for Rootstock Guide](/developers/quickstart/foundry) |
| **Hardhat** | Smart Contract Dev | [Hardhat Config Guide](/developers/quickstart/hardhat) |
| **Rootstock CLI** | Node Management | `npm install -g @rsk-cli` |