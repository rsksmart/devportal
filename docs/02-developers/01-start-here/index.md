---
title: Beginner Developer Learning Path
sidebar_label: Beginner Path
description: A complete learning path for developers new to blockchain and Rootstock.
---


<Filter
values={[
  { label: 'Getting Started', value: 'getting-started' },
]}>
  <FilterItem
    value="getting-started"
    title="Start Here: Beginner Onboarding"
    subtitle="Developers"
    color="green"
    linkHref="/developers/getting-started/start-here-for-beginners/"
    description="Learn the core concepts, tools, and steps required to begin building on Rootstock."
  />
</Filter>

# Beginner Developer Learning Path

This guide provides a structured path for developers who are new to blockchain and to the Rootstock ecosystem. It introduces the core concepts, tools, and workflows required to begin building and deploying smart contracts on Rootstock.

---

## 1. Blockchain Fundamentals

This section introduces foundational concepts needed to understand blockchain networks and smart contract platforms.

### Topics Covered

- What blockchains are and how distributed ledgers work  
- Public/private key cryptography  
- Wallets, addresses, and transaction signing  
- Blocks, confirmations, and gas fees  
- Overview of the Ethereum Virtual Machine (EVM)  
- Differences between Bitcoin and EVM-compatible chains  

---

## 2. Introduction to Rootstock

Rootstock (RSK) is an EVM-compatible smart contract platform secured through Bitcoin merge-mining.

### Key Concepts

- EVM compatibility with Ethereum tooling  
- Merge-mining and Bitcoin-backed security  
- RBTC as the native gas token  
- Rootstock Virtual Machine (RVM)  
- Role within the BTCFi ecosystem  

### Resources

- [Rootstock Fundamentals →](https://dev.rootstock.io/concepts/fundamentals/)
- [What Is Merge-Mining? →](https://dev.rootstock.io/concepts/glossary/#merge-mining)
- [RBTC Basics →](https://dev.rootstock.io/developers/integrate/flyover/glossary/)
- [Rootstock Whitepaper →](https://rootstock.io/rsk-white-paper-updated.pdf)

---

## 3. Development Environment Setup

Required tools and configuration for building and deploying smart contracts.

### Required Tools

- [Node.js (LTS) →](https://nodejs.org/en)
- [Hardhat Documentation →](https://hardhat.org/docs)
- [MetaMask →](https://metamask.io/)

### Rootstock Testnet Configuration

- RPC: `https://public-node.testnet.rsk.co`  
- Chain ID: `31`  
- [Testnet Explorer →](https://explorer.testnet.rootstock.io/)  
- [Testnet Faucet →](https://faucet.rootstock.io/)  

---

## 4. Solidity Essentials

Core Solidity concepts to understand before writing smart contracts on Rootstock.

### Core Concepts

- Variables and data types  
- Function visibility  
- Mappings, arrays, and structs  
- Events  
- Constructors  
- Compilation basics  

### Resources

- [Solidity Documentation →](https://docs.soliditylang.org)
- [Solidity by Example →](https://solidity-by-example.org)

---

## 5. First Contract Deployment (Rootstock Testnet)

A basic workflow for deploying a simple smart contract.

### Workflow Steps

1. Initialize a Hardhat or Foundry project  
2. Create a simple contract (`Storage.sol`)  
3. Add Rootstock Testnet RPC to `hardhat.config.js`  
4. Compile the contract  
5. Deploy using a script + private key  
6. Confirm deployment on the Testnet Explorer  
7. Interact with read/write functions  

### Resources

- [Deploy with Hardhat →](https://www.youtube.com/watch?v=7ps52dwWQkk)
- [Deploy with Foundry →](https://dev.rootstock.io/developers/smart-contracts/foundry/)

---

## 6. Rootstock Tools & Infrastructure

Key tools available to support Rootstock development.

### What to Know

- Rootstock Developer Portal is the central hub  
- EVM tooling support: Hardhat, Foundry, Truffle  
- RIF Services for identity, relay, and storage  

### Resources

- [Rootstock Developer Portal →](https://dev.rootstock.io/)
- [RIF Relay Deployment →](https://dev.rootstock.io/developers/integrate/rif-relay/deployment/)

---

## 7. Building a Simple DApp

Frontend integration for interacting with deployed contracts.

### Components

- React/Next.js UI  
- Ethers.js or Wagmi for contract calls  
- MetaMask or Rabby for signing  
- ABI usage  
- Read/write operations  

### Resources

- [Port an Ethereum dApp to Rootstock →](https://dev.rootstock.io/resources/port-to-rootstock/ethereum-dapp/)
- [Build a Rootstock dApp With Next.js →](https://hackernoon.com/how-to-build-dapp-on-rootstock-with-nextjs-typescript-and-solidity)

---

## 8. Recommended Next Steps

Areas to explore after completing the beginner path.

### Suggested Topics

- Hardhat or Foundry testing  
- Intermediate Solidity  
- Gas optimization  
- PowPeg (Rootstock ↔ Bitcoin)  
- BTCFi building opportunities  

### Resources

- [Gas Optimization Techniques →](https://dev.rootstock.io/developers/smart-contracts/smart-contracts-best-practices/#gas-optimization-techniques)
- [PowPeg Overview →](https://dev.rootstock.io/resources/guides/powpeg-app/)
- [BTCFi Use Cases →](https://dev.rootstock.io/developers/use-cases/)

---

## 9. Community & Support

Stay updated and get help from the Rootstock community.

- [Discord →](https://discord.gg/rootstock)
- [Telegram →](https://t.me/rskofficialcommunity)
- [GitHub →](https://github.com/rsksmart)
- [X (Twitter) →](https://twitter.com/rootstock_io)

---

## Summary

By following this learning path, beginners gain:

- Strong blockchain fundamentals  
- Understanding of Rootstock architecture  
- Ability to deploy contracts on Testnet  
- Skills to build simple dApps  
- Familiarity with core tools and ecosystem resources  

This foundation prepares developers for intermediate and advanced Rootstock development.
