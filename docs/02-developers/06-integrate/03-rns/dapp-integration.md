---
sidebar_label: Integration
sidebar_position: 200
title: RIF Name Service (RNS) Integration
description: Learn how to integrate RNS into your dApp
tags: [rns, integrate, integration guide, rif, sdk]
---

This guide demonstrates how to integrate the **RIF Name Service (RNS)** into your dApp to enable human-readable names for blockchain addresses.
By integrating RNS, you enable users register new domains, resolve existing ones, and simplify wallet or marketplace interactions by replacing long hexadecimal addresses with simple names.

## Introduction

There are two main ways to integrate RNS into your dApp:

- **Frontend integration:**  
  This involves using the [RNS JavaScript SDK](https://www.npmjs.com/package/@rsksmart/rns) directly from your web interface.  
  With a few function calls, you can resolve domains to addresses, check availability, or perform reverse lookups.

- **Smart contract integration:**  
  This approach is used when your contracts need to interact with the RNS registry or resolver directly on-chain.  
  It’s ideal for cases like marketplaces or identity systems that store or verify domain ownership at the contract level.

## Prerequisites

Before starting, ensure you have the following:

- [Node.js](https://nodejs.org/en/download) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) installed  
- A wallet preferably MetaMask configured for **Rootstock Mainnet** or **Testnet**  
- Basic understanding of Solidity and Web3.js or ethers.js
- [Rootstock Testnet Faucet](https://faucet.rootstock.io/)
