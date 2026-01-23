---
sidebar_position: 1
title: Bridge Assets
sidebar_label: Overview
description: "Understanding how Rootstock connects Bitcoin to the world of programmable finance."
tags: [interoperability, bridges, powpeg, flyover, bitvmx, fundamentals]
---

Interoperability is the ability for Bitcoin to move seamlessly between its native layer and programmable smart contract environments. Rootstock provides the infrastructure to transform Bitcoin into a multi-chain asset while maintaining its core security principles.

<!-- On Rootstock, interoperability is not just about moving tokens; it is about extending Bitcoin’s security to decentralized applications. -->

<!-- ## The Purpose: Why Interoperability?
Bitcoin is the most secure network in the world, but it lacks a native environment for complex logic. Interoperability allows users to port their BTC value into Rootstock to access lending, trading, and yield without selling their original asset. This "Layer 2" approach ensures that Bitcoin remains the ultimate settlement layer.

## Technical Architecture
Interoperability on Rootstock is handled at the protocol level through the **Bridge Precompiled Contract**. Developers can interact with this infrastructure using standard EVM tools to track peg-in and peg-out events.

<details>
<summary>Click to expand full architecture stack</summary>
<div className="rootstock-stack-container">
    {/* Application Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF71E1' }}>APPLICATIONS</div>
        <div className="layer-content bg-pink">
            <div className="sub-module">CROSS-CHAIN DEX</div>
            <div className="sub-module">ASSET MIGRATION</div>
            <div className="sub-module">CUSTODY TOOLS</div>
            <div className="sub-module">Bridges</div>
        </div>
    </div>
    {/* Tooling Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#9E76FF' }}>DEVTOOL</div> 
        <div className="layer-content bg-purple" style={{ gridTemplateColumns: '1fr', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', letterSpacing: '2px' }}>
            REMIX • HARDHAT • FOUNDRY • OPENZEPPELIN
        </div>
    </div>
    {/* Bridge Infrastructure Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#08FFD0' }}>INTEROP</div>
        <div className="layer-content bg-cyan">
            <div className="sub-module">UNION (BITVMX)</div>
            <div className="sub-module">FLYOVER SDK</div>
            <div className="sub-module">POWPEG NATIVE</div>
            <div className="sub-module">RNS</div>
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

## Core Pillars

| Pillar | Description | Best Use Case |
| :--- | :--- | :--- |
| **PowPeg** | The decentralized, native bridge secured by the hardware security modules of the federation. | Institutional & high-value transfers. |
| **Flyover** | A liquidity-based fast bridge that uses LPs to front the funds for the user. | Retail users & fast dApp onboarding. |
| **Union (BitVMX)** | A trust-minimized 1-of-N bridge that uses optimistic fraud proofs on Bitcoin. | Trustless DeFi & L2 interoperability. |

## Key Concepts

### 1. Peg-In (Bitcoin to Rootstock)
A Peg-In occurs when you send native BTC to a designated vault address on the Bitcoin network. Once confirmed, the Rootstock network mints an equivalent amount of rBTC to your Rootstock address.

### 2. Peg-Out (Rootstock to Bitcoin)
A Peg-Out is the reverse process: rBTC is burned on Rootstock, and the bridge infrastructure releases native BTC to your Bitcoin address.

### 3. Trust-Minimized Security (BitVMX)
With the advent of **BitVMX**, Rootstock bridges are moving toward an optimistic verification model. This allows for Bitcoin-native fraud proofs, meaning that as long as one participant is honest, the bridge remains secure.

## Top Tools for Developers
* **Flyover SDK:** The primary library for integrating near-instant bridging into your frontend.
* **Bridge API:** Query the status of peg-ins and peg-outs in real-time.
* **Rootstock Explorer:** Visually track cross-chain transactions and bridge health.

## Implementation Guides
Explore the recipes below to start integrating bridging solutions into your application.

import DocCardList from '@theme/DocCardList';

<DocCardList />