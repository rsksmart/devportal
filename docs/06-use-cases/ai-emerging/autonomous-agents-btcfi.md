---
sidebar_position: 3
sidebar_label: Autonomous AI Agents
title: Deploying Autonomous AI Agents for BTCFi Management
description: "How to combine AI logic with Rootstock spend permissions for autonomous portfolio rebalancing." 
tags: [ai, agents, btcfi, automation]
---

Autonomous agents are programs that can execute transactions on behalf of a user based on predefined AI logic. By combining Rootstock’s security with smart contract "Spend Permissions," you can build agents that autonomously move BTC between yield vaults to maximize returns.

## Prerequisites

* **Spend Permission Contract:** A deployed contract that limits the agent's ability to move funds (e.g., "Only move between Vault A and Vault B").
* **LLM API Key:** (OpenAI, Anthropic, or a local model) to process market data.
* **Rootstock Vaults SDK:** For interacting with rBTC and USDRIF vaults.

## Getting Started

### 1. Defining the Agent's Logic
The agent needs to ingest data (APY, TVL) to make decisions. You can use an MCP server or a standard script to feed this to the AI.

```javascript
const marketData = await fetchVaultStats(); // APY for rBTC vs USDRIF
const prompt = `Currently, rBTC Vault APY is ${marketData.rbtc}% and USDRIF is ${marketData.usdrif}%. 
If USDRIF is 2% higher, move 50% of liquidity. What is the next action?`;
```

### 2. Executing Authorized Transactions
Instead of giving the AI your private key, use a "Session Key" or a restricted permission contract. This ensures the agent can only interact with specific vaults within a set limit.

```js
// The agent calls the rebalance function on your behalf
const tx = await agentContract.rebalance({
  fromVault: 'rBTC_VAULT_ADDRESS',
  toVault: 'USDRIF_VAULT_ADDRESS',
  amount: ethers.parseEther('0.5')
});
```

## Troubleshooting
Oracle Discrepancies: Agents rely on accurate price and yield data. Always use a decentralized oracle (e.g., Chainlink) to prevent the agent from making decisions based on manipulated or stale data.

Slippage Protection: Ensure your agent's transaction logic includes strict slippage parameters to avoid "sandwich attacks" during rebalancing.

## Related Use Cases or Resources
- [Deploy and Interact with Rootstock using the MCP Server](/use-cases/ai-emerging/mcp-rootstock)

- Yield Optimization with Beefy

- Institutional Risk Management