---
sidebar_position: 1
title: RIF economy and governance
sidebar_label: Overview
description: "Multi-sig custody, Collective governance, and RIF utility patterns on Rootstock."
tags: [institutional, governance, dao, safe, multi-sig, fundamentals]
---

This section is for teams that need **shared control of funds** and **on-chain governance** on Rootstock. Common building blocks are multi-sig wallets (for example Safe), the Collective SDK for RIF staking and votes, and indexers for operations and reporting. Compliance and policy are still your responsibility, the chain gives you transparent history, not legal sign-off.

<!-- On Rootstock, institutional-grade security is backed by the planet's most secure settlement layer: Bitcoin.

## The Purpose: Why Institutions & Governance?
Entities managing significant capital or community mandates require robust "checks and balances." Institutional frameworks on Rootstock eliminate single points of failure through multi-signature workflows and allow for decentralized coordination where stakeholders—not a central authority—dictate the future of the treasury.

## The Role of Rootstock
Rootstock provides the **Verifiable Trust Layer** for organizations building on Bitcoin. 
* **Immutable Custody:** Use smart-contract-based wallets that require signatures for any asset movement.
* **Transparent Coordination:** Launch DAOs with automated voting and execution, ensuring every governance decision is auditable on-chain.
* **Auditability:** Every transaction is time-stamped and recorded on a public ledger, simplifying compliance and regulatory reporting.

## Technical Architecture
When building institutional solutions, you utilize Vaults Whitelabel infrastructure and RootstockCollective on top of the RVM. This ensures that organizational logic is executed with the same finality as a Bitcoin transaction. Refer to [The Stack](/concepts/fundamentals/stack).

<details>
<summary>Click to expand full architecture stack</summary>
<div className="rootstock-stack-container">
    {/* Application Layer (Pink) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF71E1' }}>APPLICATIONS</div>
        <div className="layer-content bg-pink">
            <div className="sub-module">TREASURY MGMT</div>
            <div className="sub-module">DAO VOTING</div>
            <div className="sub-module">COMPLIANCE</div>
            <div className="sub-module">CUSTODY</div>
        </div>
    </div>
    {/* Tooling Layer (Purple) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#9E76FF' }}>DEVTOOL</div> 
        <div className="layer-content bg-purple" style={{ gridTemplateColumns: '1fr', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', letterSpacing: '2px' }}>
            REMIX • HARDHAT • FOUNDRY • OZ • COLLECTIVE SDK
        </div>
    </div>
    {/* Infrastructure Layer (Cyan) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#08FFD0' }}>RIF SERVICES</div>
        <div className="layer-content bg-cyan">
            <div className="sub-module">SAFE WALLET</div>
            <div className="sub-module">RNS</div>
            <div className="sub-module">RIF RELAY</div>
            <div className="sub-module">INDEXERS</div>
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

## Core pillars

| Pillar | Description | Primary tool |
| :--- | :--- | :--- |
| **RIF Token** | The RIF (Rootstock Infrastructure Framework) token makes it easier, faster and more rewarding to build on Bitcoin. It also enables governance on RootstockCollective DAO. | [Token](/concepts/rif-suite/token) · [Stake RIF](https://app.rootstockcollective.xyz/) |
| **On-chain voting** | Stake RIF, mint stRIF, and vote on ecosystem proposals. | [Collective SDK](https://github.com/rsksmart/collective-sdk) · [Quick start](/developers/quickstart/collective/) · [Use case guide](/use-cases/integrate-rif-economy/build-dao-voting-collective-sdk/) |
| **Governance apps** | Proposals, treasury moves, and delegation through RootstockCollective. | [RootstockCollective](https://app.rootstockcollective.xyz/) |

## Key concepts

### 1. Multi-signature custody (Safe)

A multi-sig wallet needs a threshold of signatures before a transaction executes. That pattern limits single-key theft and matches how many teams run treasuries. You still define who holds keys and how rotation works.

### 2. stRIF and delegated voting

In RootstockCollective, voting power is tied to **stRIF** (staked RIF). Holders vote on proposals or delegate to others. Rules and epochs are defined by the contracts; read them before you promise users a specific voting timeline.

### 3. On-chain history and your reporting

Explorers and indexers give you a public history of transfers and events. That helps operations and internal controls. It does not replace accounting, tax, or regulatory workflows your jurisdiction requires.

## Tools

* **Safe SDK:** Multi-sig and policy-based custody.
* **Tally:** Governance dashboards for proposals and votes (where supported).
* **Subgraphs / indexers:** Query events for dashboards and internal reporting.

## Implementation guides

Published guides in this section are listed below.

import DocCardList from '@theme/DocCardList';

<DocCardList />