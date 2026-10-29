---
title: "Rootstock Architecture"
sidebar_label: "Rootstock Architecture"
sidebar_position: 1
description: "Learn how Rootstock works under the hood, including the Bitcoin peg, merge-mining, and the Rootstock Virtual Machine."
tags: [guides, developers, blockchain, rsk, rootstock, architecture]
---

This module explains how Rootstock works under the hood, including the Bitcoin peg, merge-mining, and the Rootstock Virtual Machine (RVM).

:::tip[New to Rootstock?]
Before diving into the architecture, ensure you have read the [Blockchain Overview](/developers/blockchain-essentials/overview/) for a high-level understanding of Rootstock's core features and compatibility.
:::

## Architecture Overview

Rootstock combines the best of both worlds: Bitcoin's industry-leading security and Ethereum's powerful smart contract capabilities. This is achieved through three main architectural pillars:

- **[Merge-Mining](/developers/blockchain-essentials/overview/#merged-mining):** Allows Bitcoin miners to secure the Rootstock network simultaneously.
- **[PowPeg](/developers/blockchain-essentials/overview/#powpeg):** A trust-minimized bridge enabling 2-way transfers between BTC and rBTC.
- **[Rootstock Virtual Machine (RVM)](/developers/blockchain-essentials/overview/#evm-compatible-smart-contracts):** An EVM-compatible execution environment for smart contracts.

This architecture ensures that Rootstock remains the most secure and functional smart contract platform tied to the Bitcoin ecosystem.

## rBTC: Rootstock's Gas Token

rBTC is pegged 1:1 with BTC and is the native token used to pay for transaction fees (gas) and smart contract execution on Rootstock. This allows you to use Bitcoin for decentralized applications without leaving the ecosystem. To understand how gas works on Rootstock, see the [Gas Differences](/developers/blockchain-essentials/overview/#gas-differences) section.



## Architecture diagram

Rootstock is a Bitcoin sidechain. Merged mining secures consensus. The RVM runs EVM-compatible contracts. rBTC pays gas and moves through the PowPeg. Peg-in and peg-out use the same Bridge on separate paths.

```mermaid
flowchart LR
  User["User / dApp"]

  subgraph Bitcoin["Bitcoin"]
    direction TB
    PoW["Bitcoin PoW<br/>(merged mining)"]
    BTCNet["Bitcoin network"]
  end

  subgraph Rootstock["Rootstock"]
    direction TB
    Consensus["Consensus / block production"]
    RVM["Rootstock Virtual Machine<br/>(EVM-compatible)"]
    Peg["PowPeg / Bridge"]
    rBTC["rBTC (1:1 with BTC)"]
  end

  PoW -->|"Merged mining secures<br/>consensus"| Consensus
  Consensus --> RVM
  User -->|"Deploy and call contracts"| RVM
  rBTC -->|"Pays gas"| RVM
  User -->|"Peg-in BTC"| Peg
  Peg -->|"Bridge releases rBTC"| rBTC
  User -->|"Peg-out: return rBTC"| Peg
  Peg -->|"Release BTC after<br/>confirmations"| BTCNet

  classDef user fill:#FCE4F6,stroke:#FF71E1,stroke-width:2px,color:#1a1a1a
  classDef btc fill:#FFF0D9,stroke:#FF9100,stroke-width:2px,color:#1a1a1a
  classDef rsk fill:#E8F5D0,stroke:#79C600,stroke-width:2px,color:#1a1a1a
  classDef peg fill:#EDE7FF,stroke:#9E76FF,stroke-width:2px,color:#1a1a1a
  classDef token fill:#E0FFFA,stroke:#08FFD0,stroke-width:2px,color:#1a1a1a

  class User user
  class PoW,BTCNet btc
  class Consensus,RVM rsk
  class Peg peg
  class rBTC token
```

## Summary

Rootstock combines:
- **Bitcoin security** via merged mining
- **EVM programmability** via the Rootstock Virtual Machine
- **BTC ↔ rBTC transfers** via the PowPeg (peg-outs require confirmations and PowHSM signatures)

:::note[Before You Continue]
Make sure you've completed the [Development Prerequisites](/developers/requirements/) to set up your environment with Node.js, Hardhat, and wallet configuration.
:::

**Next:** [Smart Contract Fundamentals](/developers/blockchain-essentials/rootstock-essentials/smart-contract-fundamentals/)
