---
sidebar_position: 2
title: Generate Yield
sidebar_label: Overview
description: "BTCFi on Rootstock: rBTC, vaults, and stable units of account for builders."
---

BTCFi on Rootstock means lending, borrowing, yield, and liquidity apps that use rBTC and other assets on an EVM-compatible chain anchored to Bitcoin.

This section is for **builders** who implement strategies and vault integrations. **Who may use a live vault product** depends on the program, jurisdiction, and whether access is institutional, retail, or partner-only.

<!-- On Rootstock, users can earn yield, provide liquidity, and borrow against their Bitcoin without ever giving up the security of the Bitcoin network.

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
</details> -->

## Core pillars

| Pillar | Description | Where to go |
| :--- | :--- | :--- |
| **Vaults SDK** | ERC-4626 style flows and automation patterns for yield products. | Step-by-step Dev Portal guides are not published yet. Use your protocol docs and the Vaults SDK package until those pages ship. |
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