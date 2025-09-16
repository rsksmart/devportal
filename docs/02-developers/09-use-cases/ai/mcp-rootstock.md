---
sidebar_label: Model Context Protocols (MCP) | Overview
sidebar_position: 200
title: Understanding Model Context Protocols (MCPs)
tags: [rsk, rootstock, mcp, ai agents, ai]
description: "This section demonstrates how to interact with the Rootstock blockchain to build and deploy innovative AI-enabled dApps."
---

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro) is an open protocol that standardizes how applications provide context to [large language models (LLMs)](https://en.wikipedia.org/wiki/Large_language_model). 
It was developed by Anthropic in 2024 as a new standard for connecting AI models to the systems where data lives, including content repositories, business tools, and development environments. 
It's aimed at helping AI models produce better and more relevant responses. MCPs can be used by both developers and general users to interact, build or automate everyday applications. 

In this section, we will dive into MCPs, how they work, key use cases and applications on Rootstock.

:::info[Model Context Protocols on Rootstock]

Ready to build? See the [Developer Guide to interacting with Rootstock using the MCP Server](/developers/quickstart/mcp/) to get started building and deploying AI Enabled dApps on Rootstock for step-by-step instructions or use the [MCP Starter Kit](https://github.com/rsksmart/rsk-mcp-server) or use the [NPM Package](https://www.npmjs.com/package/@rsksmart/rsk-mcp-server) for remote configuration of the AI client.

:::


## What are MCPs?

To better understand MCPs, let's break down its term:

* Model: This refers to AI models or LLMs, these models are designed to process information and generate responses or perform specific tasks.

* Context: Context is the relevant information and data that an AI model needs to understand and act on a request. In the case of MCPs, this context includes real-world data, such as blockchain addresses, transaction details, and smart contract specs.

* Protocol: A protocol is a set of rules and standards that dictate how data is formatted and transmitted. The protocol ensures that different systems—in this case, an AI model and a blockchain—can communicate with each other effectively and securely.

***Simply put; An MCP is a framework or set of standards that define how AI models communicate, share context, and perform verified actions.***

## Key Differences

| Key Differences | Before MCPs (AI Models) | After MCPs (AI Models \+ Context) |
| :---- | :---- | :---- |
| Required Domain Knowledge | AI models needed to understand the blockchain (JSON-RPC) and complex transaction formats. | Only need to know the simple, standardized language of the MCP. |
| Transaction Method | Generates complex, raw transaction objects to perform an action, such as deploying a new token contract. This object would need to include specific details. E.g,   `{"jsonrpc": "2.0", "method": "eth_call", "params":,...`   | Sends **simple, standardized requests**. E.g., `{"action": "deployContract"}` to the MCP Server, which handles the complex on-chain actions. |
| User Experience | The process was too complex for non-developers, creating a high barrier to entry. | The technical complexity is handled behind the scenes, making the process seamless and secure for all users. |

## How MCP Works

1. **Choose an MCP Server**: Use the [Rootstock MCP Server](https://github.com/rsksmart/rsk-mcp-server)   
2. **Connect AI Client**: Configure your AI Client (like Claude or Cursor or any MCP compatible LLM Client) to connect to the MCP server. The AI Client can now see available tools, resources and prompts from the connected server.  
3. **Work with Context**: The AI-powered application can now access real data, execute actions, and provide more helpful responses based on your actual context.

## Why MCP on Rootstock?

**Connecting AI to Blockchain:** MCPs allow AI to perform direct actions on the Rootstock blockchain, such as sending or verifying transactions or deploying smart contracts.

**Verified AI Actions:** By using MCPs, actions performed by an AI can be transparent and verifiable on the blockchain. The blockchain's public ledger records every action, so you can always see exactly what the AI did.

**Enabling AI dApps:** MCPs can help build decentralized applications where AI models perform tasks autonomously without a central authority.

:::info[Model Context Protocols on Rootstock]

Ready to build? See the [Developer Guide to interacting with Rootstock using the MCP Server](/developers/quickstart/mcp/) to get started building and deploying AI Enabled dApps on Rootstock for step-by-step instructions or use the [MCP Starter Kit](https://github.com/rsksmart/rsk-mcp-server) or use the [NPM Package](https://www.npmjs.com/package/@rsksmart/rsk-mcp-server) for remote configuration of the AI client.

:::

## Key Use Cases for MCP on Rootstock

Here's how you can leverage the Rootstock MCP Server to create impactful AI dApps:

**On-Chain AI Agent Trust & Reputation Systems:** The MCP can enable AI agents to attest to their actions and internal states on-chain. This creates a transparent record of an agent's past behavior and can form the basis for a decentralized reputation system. 

With the MCP Server, developers can leverage the following operations to build AI dApps;

* `Contract Deployment` to establish reputation contracts on Rootstock.  
* `Contract Reading` allows dApps to query and display an AI agent's reputation score.  
* `Transaction Tracking` to monitor and confirm on-chain reputation updates.

**Off-chain and On-chain Verifiable Attestations:** MCPs, combined with the Rootstock MCP Server, provide mechanisms for off-chain data providers (oracles, specialized AI models, human validators) to attest to the context and integrity of data before it's submitted to Rootstock. This involves signing data off-chain and then recording the attestation (signature, data hash, timestamp, AI model used) on-chain. Potential dApps can include:

* **Decentralized Identity Verification with AI-backed Attestations:** dApps where AI models analyze identity documents off-chain, and an MCP ensures that the "verified" status, along with the AI's confidence score and model version, is immutably attested on Rootstock.  
* **Verifiable Supply Chain Data:** IoT sensors collect data on product conditions (temperature, location). The Rootstock MCP can be used by an off-chain AI to process this data and then attest to specific conditions (e.g., "product stayed within temperature range") on Rootstock, enabling trusted supply chain dApps.

With the MCP Server, developers can leverage the following operations to build AI dApps;

* `Contract Deployment` to deploy your custom attestation smart contracts.  
* `Contract Reading` allows dApps to easily query and verify attestations stored on-chain.  
* `Transaction Tracking` confirms the successful submission of attestations to the blockchain.  
* `Wallet Management` is used by the attesting entities (AI or human) to sign and submit transactions.

### General Use Cases for MCPs 

* **Decentralized AI Audit Platforms**: dApps where auditors can verify the history and parameters of AI models used in critical sectors (e.g., loan approvals, medical diagnostics) against on-chain records.  
* **AI Model Version Control Systems:** Tools that use Rootstock to track and timestamp every change to an AI model, ensuring reproducibility and accountability.  
* **AI-Enhanced DAO Treasury Management:** AI recommends investment strategies, and the rationale is logged on Rootstock for DAO member review and approval.  
* **Decentralized Content Moderation:** AI flags problematic content, and its context (e.g., input, model version, confidence score) is logged on-chain for transparent community oversight.  
* **Verifiable AI-as-a-Service (AIaaS):** Developers can offer AI services where the execution of AI models and their outputs are verifiable on Rootstock, increasing client trust.  
* **Decentralized Autonomous Agents (DAAs)** with On-Chain Reputation: AI bots that earn reputation based on verifiable, MCP-logged actions on Rootstock.

## Build and Deploy AI-Enabled Tools on Rootstock
Ready to build? See the Developer Guide on Model Context Protocol to get started building and deploying AI Enabled dApps on Rootstock for step-by-step instructions or use the [MCP Server Starter Kit](https://github.com/rsksmart/rsk-mcp-server).
