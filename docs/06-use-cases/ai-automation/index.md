---
sidebar_position: 1
title: AI Agents
sidebar_label: Overview
description: "Build AI agents that stake, bridge, swap and transact on Rootstock with guardrails."
tags: [ai, mcp, agents, autonomous-finance, emerging-tech, fundamentals]
---

This hub is for builders who ship AI agents. Connect MCP clients to live chain data, submit transactions through the Rootstock SDK, and use indexers when the agent needs historical or aggregate state.

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