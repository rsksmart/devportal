---
title: "Beginner Developer: Blockchain Basics"
sidebar_label: "Beginner Path"
description: "Learn about how the blockchain works."
tags: [guides, developers, blockchain, rsk, rootstock]
---


# 01 — Blockchain Basics

This module introduces the core concepts a developer must understand before building on Rootstock. Even if you are familiar with Ethereum, this serves as a unified foundation for the course.

---

## What Is a Blockchain?

A blockchain is a distributed ledger maintained by a network of nodes that collectively agree on the state of the system. Instead of relying on a central authority, blockchains use consensus mechanisms to validate transactions.

Each block contains:

- A list of transactions  
- A timestamp  
- A reference (hash) to the previous block  
- A proof of work or proof of stake (depending on chain)

Because each block links to the previous one, altering past data becomes extremely difficult—this creates immutability.

---

## Public/Private Keys

Every user interacts with a blockchain through a cryptographic key pair:

- **Private Key:** A secret number used to sign transactions.  
- **Public Key:** Derived from the private key.  
- **Address:** A shortened, user-friendly representation of the public key.

Transactions are “signed” using the private key, proving ownership without revealing the key itself.

---

## Wallets

A wallet is a tool (software or hardware) that:

- Stores your private key  
- Signs transactions  
- Generates addresses  

Examples: MetaMask, Rabby, Rootstock Web Wallet.

---

## Gas, Transactions, and Blocks

Every transaction must pay **gas** to compensate miners/validators.  
For EVM chains like Rootstock, gas is paid in RBTC.

A transaction flows through three steps:

1. Submitted to the network  
2. Picked up by miners  
3. Included in a block  

---

## EVM Overview

The **Ethereum Virtual Machine (EVM)** is a runtime environment for executing smart contracts.

Key concepts:

- Bytecode execution  
- Storage, memory, stack  
- Opcodes  
- Contract ABI (Application Binary Interface)

Rootstock is fully EVM-compatible, so Ethereum tools work with minimal or zero modification.

---

## Bitcoin vs EVM Smart Contracts

Rootstock merges Bitcoin’s security guarantees with Ethereum-compatible smart contracts.

| Feature | Bitcoin | EVM-Compatible Chains |
|--------|---------|------------------------|
| Smart Contracts | Limited | Full Solidity support |
| Token Standard | None | ERC-20, ERC-721, etc. |
| VM | Bitcoin Script | EVM |
| Strength | Security, finality | Programmability |

Rootstock sits at the intersection: **Bitcoin-backed security + EVM programmability.**

---

## Summary

Before moving to Rootstock specifics, ensure you understand:

- How blockchains maintain shared state  
- How keys, wallets, and addresses work  
- What gas is and why it's required  
- How the EVM executes smart contracts  

Next: **Rootstock architecture and the BTC-backed security model.**
