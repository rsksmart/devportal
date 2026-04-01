---
sidebar_position: 1
title: Automation and AI
sidebar_label: Overview
description: "Connect automation and AI tooling to Rootstock for read and write flows with clear guardrails."
tags: [ai, mcp, agents, autonomous-finance, emerging-tech, fundamentals]
---

This section is for builders who want **read access** to chain data and **limited writes** from automated workflows. MCP servers, SDK modules, and explicit permission scopes support that pattern. They do not replace a threat model: you still decide what an agent may spend, to which addresses, and for how long.

<!-- On Rootstock, AI is more than a chatbot; it is a participant in the economy.

## The Purpose: Why AI on Bitcoin?
As AI models become more capable, they require a secure value layer to store capital and execute financial logic. Bitcoin is the world’s premier neutral money, and Rootstock is the programmable layer that allows AI to interact with it. Whether it is a portfolio rebalancing agent or a DAO governor, AI needs the trust-minimized execution that only Rootstock provides.

## The Role of Rootstock
Rootstock acts as the **Standardized Interface** between Large Language Models and Bitcoin. 
* **Verifiable Action:** Every decision an AI agent makes on-chain is recorded and auditable.
* **Connectivity:** Through the **Model Context Protocol (MCP)**, LLMs can query Rootstock balances and contracts in real-time.

## Technical Architecture
When you connect an LLM to Rootstock, you usually pair an [MCP-based server](/use-cases/ai-automation/mcp-rootstock/) for context with explicit transaction permissions for anything that moves value. See the [stack overview](/concepts/fundamentals/stack/) for where MCP fits.

<details>
<summary>Click to expand full architecture stack</summary>
<div className="rootstock-stack-container">
    {/* Application Layer (Pink) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF71E1' }}>APPLICATIONS</div>
        <div className="layer-content bg-pink">
            <div className="sub-module">PORTFOLIO AGENTS</div>
            <div className="sub-module">PREDICTION MARKETS</div>
            <div className="sub-module">AI GOVERNANCE</div>
            <div className="sub-module">AUTONOMOUS DAOs</div>
        </div>
    </div>
    {/* Tooling Layer (Purple) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#9E76FF' }}>DEVTOOL</div> 
        <div className="layer-content bg-purple" style={{ gridTemplateColumns: '1fr', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', letterSpacing: '2px' }}>
            REMIX • HARDHAT • FOUNDRY • MCP SERVER
        </div>
    </div>
    {/* Infrastructure Layer (Cyan) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#08FFD0' }}>RIF SERVICES</div>
        <div className="layer-content bg-cyan">
            <div className="sub-module">MCP SERVERS</div>
            <div className="sub-module">RIF RELAY</div>
            <div className="sub-module">FLYOVER BRIDGE</div>
            <div className="sub-module">RNS</div>
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
| **Connectivity** | Expose chain reads and scoped actions to MCP clients. | [Rootstock MCP Server](https://github.com/rsksmart/rootstock-mcp-server) |
| **SDK** | Read state and submit guarded transactions from your stack. | [Rootstock SDK base](https://github.com/rsksmart/sdk-base) |
| **Indexing** | Historical and aggregate data for dashboards and automation. | [The Graph on Rootstock](/dev-tools/data/thegraph/) |

## Key concepts

### 1. Model Context Protocol (MCP)

MCP connects clients to tools and data sources. The **Rootstock MCP Server** can read balances, contract state, and gas estimates so responses reflect current chain data. Writes still need user-approved keys or policies you control.

### 2. Spend permissions and session keys

Automation should not hold an unrestricted private key. Use spend permissions or session scopes that limit amount, destination, and duration for any transfer a model can request.

### 3. Rules-based actions

With clear rules and permissions, a workflow can react to on-chain signals (for example vault or price conditions). You own the policy, monitoring, and rollback path. No guide here guarantees returns or strategy performance.

## Tools

* **Rootstock MCP Server:** Exposes chain reads and safe actions to MCP clients.
* **LangChain / Eliza:** Orchestration frameworks you can point at Rootstock RPC and wallets.
* **Safe SDK:** Multi-sig and policy-based execution for high-value automation.

## Implementation guides

Published guides in this section are listed below.

import DocCardList from '@theme/DocCardList';

<DocCardList />