---
sidebar_position: 2
title: BTCFi & Finance Fundamentals
sidebar_label: Overview
description: "Understanding the role of Rootstock in the Bitcoin Finance (BTCFi) ecosystem."
---

BTCFi refers to the ecosystem of decentralized financial services such as lending, borrowing, and yield generation, built specifically for Bitcoin holders.

On Rootstock, users can earn yield, provide liquidity, and borrow against their Bitcoin without ever giving up the security of the Bitcoin network.

## The Purpose: Why BTCFi?
For years, Bitcoiners had to choose between holding their BTC securely or wrapping it on centralized exchanges to earn interest. BTCFi on Rootstock removes this trade-off by providing decentralized, smart-contract-based financial services that are anchored directly to [Bitcoin’s hash power](https://stats.rootstock.io).

## The Role of Rootstock

Rootstock serves as the **Smart Contract Engine** that unlocks Bitcoin's utility for the Bitcoin network.
* **Security:** It uses **Merged Mining**, meaning over 80% of Bitcoin miners secure Rootstock simultaneously with the main chain.
* **Compatibility:** It is fully **EVM-compatible**, allowing developers to use proven DeFi tools (Solidity, OpenZeppelin, Foundry, Hardhat, etc.) on top of Bitcoin.
* **Peg Stability:** The **PowPeg** ensures that every 1 rBTC on Rootstock is backed by exactly 1 BTC on the Bitcoin network.

> By using a [two-way peg (PowPeg)](/concepts/powpeg/), native BTC is locked on the Bitcoin network and an equivalent amount of **rBTC** is released on Rootstock. This rBTC is the lifeblood of BTCFi, allowing you to use Bitcoin's value with Ethereum-style smart contract flexibility.

## Technical Architecture
When building BTCFi dApps, you are interacting with the **Rootstock Virtual Machine (RVM)**. Because the RVM is fully EVM-compatible, you can use industry-standard tools like **Foundry, Hardhat, and OpenZeppelin** to manage Bitcoin-native assets.

<details>
<summary>Click to expand full architecture stack</summary>
<div className="rootstock-stack-container">
    {/* Application Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF71E1' }}>APPLICATIONS</div>
        <div className="layer-content bg-pink">
            <div className="sub-module">YIELD VAULTS</div>
            <div className="sub-module">LIQUID STAKING</div>
            <div className="sub-module">AI AGENTS</div>
            <div className="sub-module">DAOs</div>
        </div>
    </div>
    {/* Tooling Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#9E76FF' }}>DEVTOOL</div> 
        <div className="layer-content bg-purple" style={{ gridTemplateColumns: '1fr', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', letterSpacing: '2px' }}>
            REMIX • HARDHAT • FOUNDRY • OPENZEPPELIN • VAULTS SDK
        </div>
    </div>
    {/* Infrastructure Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#08FFD0' }}>RIF SERVICES</div>
        <div className="layer-content bg-cyan">
            <div className="sub-module">RIF RELAY</div>
            <div className="sub-module">RNS</div>
            <div className="sub-module">FLYOVER BRIDGE</div>
            <div className="sub-module">MCP SERVERS</div>
        </div>
    </div>
    {/* Execution Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#79C600' }}>EXECUTION</div>
        <div className="layer-content bg-green" style={{ gridTemplateColumns: '1fr' }}>
            <div className="sub-module">ROOTSTOCK VIRTUAL MACHINE (EVM-COMPATIBLE)</div>
        </div>
    </div>
    {/* Security Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF9100' }}>SECURITY</div>
        <div className="layer-content bg-orange" style={{ gridTemplateColumns: '1fr' }}>
            <div className="sub-module">BITCOIN: MERGED MINING</div>
        </div>
    </div>
</div>
</details>

## Core Pillars of Rootstock BTCFi

| Pillar | Description | Primary Tool/Protocol |
| :--- | :--- | :--- |
| **Yield Engines** | Standardized vaults that generate organic yield on rBTC or stablecoins. | [Rootstock Vaults SDK](/use-cases/btcfi-finance/vaults-btcfi/) |
| **Stablecoins** | Bitcoin-backed stablecoins (USDRIF) that provide a hedge against volatility. | [RIF On Chain](https://rifonchain.com/) |
| **Lending & Borrowing** | Using your BTC as collateral to borrow assets without selling your Bitcoin. | [Tropykus](https://tropykus.com/) |
| **Liquid Staking** | Staking BTC to secure the network while receiving a liquid token (st-rBTC) in return. | [st-rBTC Protocol](#) |

## Key Concepts

### 1. rBTC (Programmable Bitcoin)
rBTC is the native token of Rootstock. It is not a"wrapped token in the traditional sense; it is a 1:1 representation of BTC. When you [Peg-In](/resources/guides/powpeg-app/pegin/), your BTC is locked on the Bitcoin chain, and rBTC is minted for you on Rootstock. It is used to pay for gas and as the primary collateral for all DeFi activities.

### 2. USDRIF & Stablecoins
Because Bitcoin is volatile, BTCFi requires stable units of account. **USDRIF** is a decentralized stablecoin pegged to the US Dollar and over-collateralized by Bitcoin-backed assets. This allows users to lock in value or borrow "cash" against their BTC holdings.

### 3. Liquid Staking (st-rBTC)
**Liquid Staking Tokens (LSTs)** have become the foundation of BTCFi. By staking rBTC, you receive a receipt token (like `st-rBTC`). This token earns protocol rewards automatically while remaining "liquid," meaning you can still use it as collateral in other dApps.

## Top Tools for Developers
* **Vaults SDK:** The primary toolkit for building yield products.
* **MoneyOnChain:** The protocol for Bitcoin-backed stablecoins and decentralized leverage.
* **Tropykus:** Leading protocols for non-custodial lending and borrowing.

## Implementation Guides
Explore the recipes below to start building your financial application on Rootstock.

import DocCardList from '@theme/DocCardList';

<DocCardList />