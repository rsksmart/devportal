---
sidebar_position: 1
title: Automate Payments
sidebar_label: Overview
description: "A technical foundation for launching custom tokens and integrating Bitcoin-native payments."
tags: [payments, assets, erc-20, stablecoins, checkout, fundamentals]
---

The ability to move value instantly and programmatically is the core promise of the blockchain. **Payments & Assets** on Rootstock allows developers to leverage the world’s most secure network—Bitcoin—for everyday commerce. Whether you are launching a custom ERC-20 token or integrating a stablecoin checkout flow, Rootstock provides the infrastructure for fast, low-cost, and final settlement.

<!-- On Rootstock, every payment is more than a transaction; it is an exchange backed by the security of the Bitcoin network.

## The Purpose: Why Payments & Assets?

Global commerce requires assets that are borderless, permissionless, and resistant to censorship. While Bitcoin's base layer is the ultimate store of value, its 10-minute block times make it impractical for point-of-sale transactions. Rootstock solves this by providing a high-performance execution layer that settles in seconds while remaining anchored to Bitcoin’s proof-of-work. -->

<!-- ## The Role of Rootstock
Rootstock acts as the **Value Exchange Layer** for the Bitcoin ecosystem. 
* **Custom Tokenization:** Deploy fungible (ERC-20) or non-fungible (ERC-721) tokens that inherit Bitcoin’s security.
* **Stablecoin Utility:** Access USD-pegged assets like **USDRIF** to eliminate the volatility of crypto-payments while maintaining decentralization.
* **Scalable Settlement:** Handle thousands of transactions with significantly lower gas fees than Ethereum or the Bitcoin mainchain.

> By utilizing the [PowPeg](/concepts/powpeg/), users can move BTC into the Rootstock ecosystem (as rBTC) to use as the primary currency for gas and collateral in payment dApps.

## Technical Architecture
When building payment solutions, you deploy **ERC-20 smart contracts** and utilize **RIF Relay** for gasless user experiences. This ensures that users can pay for items using the tokens they hold, without needing to manage separate gas balances. Refer to [The Stack](/concepts/fundamentals/stack).

<details>
<summary>Click to expand full architecture stack</summary>
<div className="rootstock-stack-container">
    {/* Application Layer (Pink) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF71E1' }}>APPLICATIONS</div>
        <div className="layer-content bg-pink">
            <div className="sub-module">TOKEN LAUNCHPADS</div>
            <div className="sub-module">CHECKOUT FLOWS</div>
            <div className="sub-module">PAYMENT LINKS</div>
            <div className="sub-module">ASSET TRACKERS</div>
        </div>
    </div>
    {/* Tooling Layer (Purple) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#9E76FF' }}>DEVTOOL</div> 
        <div className="layer-content bg-purple" style={{ gridTemplateColumns: '1fr', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', letterSpacing: '2px' }}>
            REMIX • HARDHAT • FOUNDRY • OPENZEPPELIN
        </div>
    </div>
    {/* Infrastructure Layer (Cyan) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#08FFD0' }}>RIF SERVICES</div>
        <div className="layer-content bg-cyan">
            <div className="sub-module">RIF RELAY</div>
            <div className="sub-module">USDRIF STABLECOIN</div>
            <div className="sub-module">RNS</div>
            <div className="sub-module">FLYOVER BRIDGE</div>
        </div>
    </div>
    {/* Execution Layer (Green) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#79C600' }}>EXECUTION</div>
        <div className="layer-content bg-green" style={{ gridTemplateColumns: '1fr' }}>
            <div className="sub-module">ROOTSTOCK VIRTUAL MACHINE (EVM-COMPATIBLE)</div>
        </div>
    </div>
    {/* Security Layer (Orange) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF9100' }}>SECURITY</div>
        <div className="layer-content bg-orange" style={{ gridTemplateColumns: '1fr' }}>
            <div className="sub-module">BITCOIN: MERGED MINING</div>
        </div>
    </div>
</div>
</details> -->

## Core Pillars

| Pillar | Description | Primary Tool/Protocol |
| :--- | :--- | :--- |
| **Token Standards** | Deploying custom assets using the ERC-20 and x402 Agentic Payments standard. | [OpenZeppelin Contracts](#) |

## Key Concepts

### 1. ERC-20 Assets
The ERC-20 standard allows for the creation of fungible tokens that can represent anything from loyalty points to fractionalized real-world assets. Because Rootstock is EVM-compatible, these tokens work out-of-the-box with wallets and exchanges.

### 2. Native rBTC Payments
rBTC is the native currency of Rootstock and is pegged 1:1 to BTC. Using rBTC for payments allows users to settle transactions with the full security of Bitcoin but with the speed and lower cost of the Rootstock network.

### 3. Programmable Money
Unlike traditional wire transfers, payments on Rootstock can be programmed. You can create escrow contracts, conditional payments (e.g., pay only upon delivery), or streaming payments that release funds block-by-block.

## Top Tools for Developers
* **Hardhat / Foundry:** The primary environments for writing and testing payment smart contracts.
* **RIF Relay SDK:** Essential for building "gasless" payment flows where users pay in stablecoins.
* **Rootstock Explorer API:** Real-time data feeds for tracking transaction status and asset movement.

## Implementation Guides
Explore the recipes below to start building secure payment and asset solutions on Rootstock.

import DocCardList from '@theme/DocCardList';

<DocCardList />