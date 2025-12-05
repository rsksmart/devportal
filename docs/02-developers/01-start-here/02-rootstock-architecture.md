---
title: Beginner Developer: Rootstock Architecture
sidebar_label: Beginner Path
description: Learn about how Rootstock works under the hood.
tags: [guides, developers, blockchain, rsk, rootstock]
---


# 02 — Rootstock Architecture

This module explains how Rootstock works under the hood, including the Bitcoin peg, merge-mining, and the Rootstock Virtual Machine (RVM).

---

## What Is Rootstock?

Rootstock is a smart contract platform that is:

- **EVM-compatible**  
- **Secured via Bitcoin merge-mining**  
- **Uses RBTC as the native token**  
- **Connected to Bitcoin via the 2-Way Peg (PowPeg)**

Rootstock is part of the broader BTCFi ecosystem, designed to bring DeFi and programmable assets to Bitcoin.

---

## Merge-Mining Explained (2–3 Paragraph Deep Dive)

Merge-mining allows Bitcoin miners to validate both Bitcoin blocks and Rootstock blocks **without extra computational cost**. A miner includes Rootstock block headers in their Bitcoin blocks, proving that they have performed the same Proof-of-Work for both chains.

This means Rootstock inherits Bitcoin’s hashpower: the majority of Bitcoin miners can simultaneously secure Rootstock. Unlike typical sidechains that rely on small validator sets, Rootstock leverages Bitcoin’s energy and security guarantees.

Every Rootstock block is tied to Bitcoin’s PoW via this process, giving Rootstock **the strongest security of any EVM-compatible chain**.

---

## The 2-Way Peg (PowPeg)

The **PowPeg** is Rootstock’s trust-minimized bridge to Bitcoin.  
It enables the transfer of BTC ↔ RBTC.

Process:

1. User sends BTC to a multisig address controlled by PowHSMs.  
2. Once confirmed, the equivalent RBTC is released on Rootstock.  
3. When sending back to Bitcoin, RBTC is locked and BTC is released.

PowPeg is secured by:

- Hardware modules (PowHSM)  
- Federation of participants  
- Bitcoin’s Proof-of-Work  

This system ensures that pegging operations are transparent, verifiable, and resistant to tampering.


## Further Reading

For a more detailed understanding of PowPeg's architecture, please refer to the [Rootstock Architecture Guide](https://dev.rootstock.io/resources/guides/powpeg-app/advanced-operations/design-architecture/).


---

## RBTC: Rootstock’s Gas Token

RBTC is pegged 1:1 with BTC and is used to:

- Pay gas fees  
- Deploy contracts  
- Execute transactions  

This allows Bitcoin holders to participate in smart contract activity.

---

## Rootstock Virtual Machine (RVM)

The RVM is fully compatible with the EVM:

- Same opcodes  
- Same gas model  
- Same Solidity tooling  
- Same developer experience  

This allows developers to port Ethereum dApps to Rootstock with minimal changes.

---

## Architecture Diagram Placeholder

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
|              RBTC            |
+------------------------------+


