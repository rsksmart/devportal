---
title: "Understanding Distributed Ledgers"
sidebar_label: "Distributed Ledgers"
sidebar_position: 1
description: "Learn the fundamental concepts of blockchain technology: what blockchains are, how they work, and why they matter."
tags: [guides, developers, blockchain, rsk, rootstock, beginners]
---

This module introduces the core concepts a developer must understand before building on Rootstock. Even if you are familiar with Ethereum, this serves as a unified foundation for the course.

## What Is a Blockchain?

A blockchain is a distributed ledger maintained by a network of nodes that collectively agree on the state of the system. Instead of relying on a central authority, blockchains use consensus mechanisms to validate transactions.

Each block contains:

- A list of transactions  
- A timestamp  
- A reference (hash) to the previous block  
- A proof of work or proof of stake (depending on chain)

Because each block links to the previous one, altering past data becomes extremely difficult—this creates immutability.

## Why Distributed Ledgers Matter

Traditional databases rely on a central authority to maintain records. Distributed ledgers solve several key problems:

| Traditional Database | Distributed Ledger |
|---------------------|-------------------|
| Single point of failure | Redundant across nodes |
| Trust in authority | Trust in consensus |
| Centralized control | Decentralized governance |
| Mutable history | Immutable records |

## Consensus Mechanisms

Blockchains achieve agreement through consensus mechanisms:

- **Proof of Work (PoW):** Miners solve computational puzzles to validate blocks. Bitcoin and Rootstock use this approach.
- **Proof of Stake (PoS):** Validators stake tokens to participate in block creation.

Rootstock leverages Bitcoin's Proof of Work through **merge-mining**, inheriting Bitcoin's security guarantees.

## Summary

Before moving forward, ensure you understand:

- What a blockchain is and how blocks are linked
- Why distributed ledgers provide security guarantees
- How consensus mechanisms validate transactions
- The difference between centralized and decentralized systems

**Next:** [Understanding Keys and Wallets](/developers/blockchain-essentials/new-to-blockchain/keys-wallets/)
