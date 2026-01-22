---
title: "Rootstock Architecture"
sidebar_label: "Rootstock Architecture"
sidebar_position: 1
description: "Learn how Rootstock works under the hood, including the Bitcoin peg, merge-mining, and the Rootstock Virtual Machine."
tags: [guides, developers, blockchain, rsk, rootstock, architecture]
---

# Rootstock Architecture

This module explains how Rootstock works under the hood, including the Bitcoin peg, merge-mining, and the Rootstock Virtual Machine (RVM).

## What Is Rootstock?

Rootstock is a smart contract platform that is:

- **EVM-compatible**  
- **Secured via Bitcoin merge-mining**  
- **Uses rBTC as the native token**  
- **Connected to Bitcoin via the 2-Way Peg (PowPeg)**

Rootstock is part of the broader BTCFi ecosystem, designed to bring DeFi and programmable assets to Bitcoin.

## Merge-Mining Explained

Merge-mining allows Bitcoin miners to validate both Bitcoin blocks and Rootstock blocks **without extra computational cost**. A miner includes Rootstock block headers in their Bitcoin blocks, proving that they have performed the same Proof-of-Work for both chains.

This means Rootstock inherits Bitcoin's hashpower: the majority of Bitcoin miners can simultaneously secure Rootstock. Unlike typical sidechains that rely on small validator sets, Rootstock leverages Bitcoin's energy and security guarantees.

Every Rootstock block is tied to Bitcoin's PoW via this process, giving Rootstock **the strongest security of any EVM-compatible chain**.

## The 2-Way Peg (PowPeg)

The **PowPeg** is Rootstock's trust-minimized bridge to Bitcoin.  
It enables the transfer of BTC ↔ rBTC.

### Peg-In / Peg-Out Process

1. User sends BTC to a multisig address controlled by PowHSMs.  
2. Once confirmed, the equivalent rBTC is released on Rootstock.  
3. When sending back to Bitcoin, rBTC is locked and BTC is released.

PowPeg is secured by:

- Hardware modules (PowHSM)  
- Federation of participants  
- Bitcoin's Proof-of-Work  

This system ensures that pegging operations are transparent, verifiable, and resistant to tampering.

:::tip[Further Reading]
For a more detailed understanding of PowPeg's architecture, see the [PowPeg Architecture Guide](https://dev.rootstock.io/resources/guides/powpeg-app/advanced-operations/design-architecture/).
:::

## rBTC: Rootstock's Gas Token

rBTC is pegged 1:1 with BTC and is used to:

- Pay gas fees  
- Deploy contracts  
- Execute transactions  

This allows Bitcoin holders to participate in smart contract activity without leaving the Bitcoin ecosystem.

## Rootstock Virtual Machine (RVM)

The RVM is fully compatible with the EVM:

- Same opcodes  
- Same gas model  
- Same Solidity tooling  
- Same developer experience  

This allows developers to port Ethereum dApps to Rootstock with minimal changes.

## Architecture Diagram

```text
+------------------------------+
|          Bitcoin             |
|  (Merge-Mined – PoW)         |
+--------------+---------------+
               |
         Merge-Mining
               |
+--------------v---------------+
|          Rootstock           |
|   EVM-Compatible Smart       |
|         Contract Layer       |
+--------------+---------------+
               |
           PowPeg
               |
+--------------v---------------+
|              rBTC            |
+------------------------------+
```

## Summary

Rootstock combines:
- **Bitcoin's security** via merge-mining
- **Ethereum's programmability** via EVM compatibility
- **Seamless BTC integration** via the PowPeg

:::note[Before You Continue]
Make sure you've completed the [Development Prerequisites](/developers/requirements/) to set up your environment with Node.js, Hardhat, and wallet configuration.
:::

**Next:** [Smart Contract Fundamentals](/developers/blockchain-essentials/rootstock-essentials/smart-contract-fundamentals/)
