---
sidebar_position: 3
title: "Build AI Agents: Integrating SDK Logic into Agentic Workflows"
sidebar_label: Integrating SDK Logic
description: "Equip your AI agents with the eyes to read the chain and the hands to execute Bitcoin-native transactions."
tags: [ai, agents, mcp, sdk, btcfi, automation, x402]
---

Autonomous agents require access to real-time blockchain data to make informed decisions. The Rootstock SDK provides a modular framework to connect Large Language Models (LLMs) to the Rootstock Virtual Machine (RVM). This tutorial explains how to use the SDK layers to give an agent the ability to read chain state and execute transactions.

## Architecture Overview
The Rootstock SDK uses a three-layer pattern to separate blockchain logic from business logic:

* Web3 Core Layer (@rskSmart/w3layer): This independent package handles low-level interactions like providers and JSON-RPC methods.

* Shared Base Functions (@rskSmart/sdk-base): This repository encapsulates cross-SDK utilities like error management and logging.

* Module Specific Functions: These contain business logic for domains like Collective DAO or Yield Vaults.

## The Agentic Architecture: Eyes and Hands
To act autonomously, an AI agent requires two things:
1.  **Context (The Eyes):** Real-time data about balances, vault APYs, and contract states.
2.  **Execution (The Hands):** The ability to sign and broadcast transactions to the Rootstock Virtual Machine (RVM).

## Prerequisites
You must install the following packages to begin the integration:

* Node.js v18 or higher.
* Access to a Rootstock RPC node.
* The `@rskSmart/w3layer` and `@rskSmart/collective` SDK modules.

## Providing Chain Context to the Agent
An AI agent needs data to perform its role. You use the SDK "Read" functions to fetch this context. The following flow demonstrates how an agent requests account information through the SDK module and the Contract Registry.

### Implementation: Reading Balances
The agent calls a function to check its current rBTC holdings before it suggests a trade or a vote.

```ts
// Initialize the Web3 Core Layer to interact with the chain
const core = new Web3CoreLayer(config);

// Load the specific module for the agent's task
const collective = new CollectiveSDK(core);

// Request the balance for a specific address
// The SDK fetches contract addresses and ABIs from the registry automatically
const balance = await collective.readBalance(agentAddress);
```

The LLM receives this balance as part of its prompt context. The agent now possesses the data required to decide on the next action.

## Executing Autonomous Actions
When the agent decides to act, it follows the SDK "Write" sequence. This process involves transaction simulation and signature requests to ensure safety.

### Implementation: Executing a Write Function
The agent initiates a transaction, such as staking rBTC or voting on a proposal. The SDK simulates the transaction first to validate the result.

```ts
// Define the parameters for the write function
const stakeParams = { amount: parseEther("0.1") };

// The SDK simulates the TX via the Web3 Core Layer
// This step validates the transaction before the user signs it
const txHash = await collective.writeContract("stakeRif", stakeParams, signer);

// Check for confirmations to ensure the action is finalized
const status = await core.checkConfirmations(txHash);
```

Ensure to implement spend permissions if the agent acts autonomously. These permissions limit the amount of rBTC an agent can move without a new manual signature.

## Next Steps
Now that your agent can interact with the SDK, you should explore specific logic modules:

* Implementing Governance Voting with Collective SDK

* Managing Automated Vaults with Vaults SDK

* Automating Payments using the x402 Standard