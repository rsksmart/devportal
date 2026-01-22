---
title: "Understanding Gas and Transactions"
sidebar_label: "Gas and Transactions"
sidebar_position: 3
description: "Learn how transactions work, what gas is, and how the EVM executes smart contracts."
tags: [guides, developers, blockchain, rsk, rootstock, beginners, gas, evm]
---

# Understanding Gas and Transactions

This module explains how transactions flow through the network, what gas is, and how the Ethereum Virtual Machine (EVM) executes smart contracts.

## Gas, Transactions, and Blocks

Every transaction must pay **gas** to compensate miners/validators.  
For EVM chains like Rootstock, gas is paid in rBTC.

A transaction flows through three steps:

1. Submitted to the network  
2. Picked up by miners  
3. Included in a block  

### Transaction Components

| Field | Description |
|-------|-------------|
| `from` | Sender address |
| `to` | Recipient address (or contract) |
| `value` | Amount of rBTC to send |
| `data` | Contract call data (if applicable) |
| `gasLimit` | Maximum gas units to spend |
| `gasPrice` | Price per gas unit |

### Gas Calculation

```
Transaction Cost = Gas Used × Gas Price
```

If a transaction runs out of gas, it reverts but you still pay for the gas consumed.

## EVM Overview

The **Ethereum Virtual Machine (EVM)** is a runtime environment for executing smart contracts.

Key concepts:

- **Bytecode execution** — Contracts compile to bytecode
- **Storage, memory, stack** — Different data locations
- **Opcodes** — Low-level instructions
- **Contract ABI** — Application Binary Interface for function calls

Rootstock is fully EVM-compatible, so Ethereum tools work with minimal or zero modification.

## Bitcoin vs EVM Smart Contracts

Rootstock merges Bitcoin's security guarantees with Ethereum-compatible smart contracts.

| Feature | Bitcoin | EVM-Compatible Chains |
|--------|---------|--------------------------|
| Smart Contracts | Limited (Bitcoin Script) | Full Solidity support |
| Token Standard | None | ERC-20, ERC-721, etc. |
| VM | Bitcoin Script | EVM |
| Strength | Security, finality | Programmability |

Rootstock sits at the intersection: **Bitcoin-backed security + EVM programmability.**

## Summary

Before moving forward, ensure you understand:

- How blockchains maintain shared state  
- How keys, wallets, and addresses work  
- What gas is and why it's required  
- How the EVM executes smart contracts  

**Next:** [Rootstock Architecture](/developers/blockchain-essentials/rootstock-essentials/rootstock-architecture/)
