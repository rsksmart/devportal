---
sidebar_position: 2
title: Generate Yield
sidebar_label: Overview
description: "BTCFi on Rootstock: rBTC, vaults, and stable units of account for builders."
---

BTCFi on Rootstock is lending, borrowing, yield, and liquidity built with rBTC and other on-chain assets, with EVM-compatible smart contracts secured by 85% of Bitcoin’s hash power.

This hub enables builders integrate vault flows, strategies, and external market protocols.

## Core pillars

| Pillar | Description | Where to go |
| :--- | :--- | :--- |
| **Vaults SDK** | ERC-4626 style flows for the USDRIF vault on Rootstock. | [Integrate USDRIF Vault](/use-cases/btcfi-finance-yield/yield-vaults-sdk/). Install and API details stay in the [Vaults SDK README](https://github.com/rsksmart/vaults-sdk). |
| **Stable units of account** | USD-pegged assets such as USDRIF for pricing and debt. | [RIF On Chain](https://rifonchain.com/) |
| **Liquidity and credit** | Lending and borrowing markets on top of rBTC and stable assets. | Protocol documentation for the venues you integrate (for example [Tropykus](https://app.tropykus.com/), [Money on Chain](https://moneyonchain.com/)) |


## Key Concepts

### 1. rBTC (Bitcoin-pegged gas and collateral)

rBTC is the native asset on Rootstock. It is pegged 1:1 with BTC through the PowPeg. When you [peg in](/resources/guides/powpeg-app/pegin/), BTC is locked on Bitcoin and rBTC is available on Rootstock. You pay gas in rBTC and use it as collateral in DeFi protocols.

### 2. USDRIF and stablecoins

Bitcoin is volatile, so many apps need a stable unit of account. **USDRIF** is a decentralized, USD-pegged asset with Bitcoin-backed collateral. Read the issuer and pool documentation before you integrate it in production.

### 3. Liquid staking (LSTs)

Some protocols issue receipt tokens when you stake rBTC (for example `st-rBTC`). Behavior, rewards, and risk depend on each protocol. Read the contract and liquidation rules before you treat an LST as collateral elsewhere.

## Tools developers use

* **Vaults SDK:** Yield and vault UX on Rootstock.
* **Money on Chain:** Bitcoin-backed stablecoins and leverage products.
* **Tropykus:** Lending and borrowing markets.

## Implementation guides

When you publish a guide in this folder (remove the leading `_` from the filename), it appears as a card below. Until then this section stays empty.

import DocCardList from '@theme/DocCardList';

<DocCardList />