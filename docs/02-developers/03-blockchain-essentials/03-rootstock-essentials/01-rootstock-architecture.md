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



## Architecture Diagram

| Pink | Orange | Green | Purple | Cyan |
| --- | --- | --- | --- | --- |
| User / dApp | Bitcoin | RVM execution | PowPeg bridge | rBTC |

Rootstock is a Bitcoin sidechain. Merged mining provides security. The RVM runs EVM-compatible contracts. The PowPeg moves value between BTC and rBTC.

```mermaid
flowchart LR
  User["User / dApp"]

  subgraph Bitcoin["Bitcoin"]
    BTC["Bitcoin PoW"]
  end

  subgraph Rootstock["Rootstock"]
    direction TB
    RVM["Rootstock Virtual Machine<br/>(EVM-compatible)"]
    Peg["PowPeg / Bridge"]
    rBTC["rBTC (1:1 with BTC)"]
  end

  BTC -->|"1. Merged mining<br/>secures consensus"| RVM
  User -->|"2. Deploy and call<br/>contracts"| RVM
  User -->|"3. Peg-in BTC"| Peg
  Peg -->|"4. Mint rBTC"| rBTC
  User -->|"5. Peg-out rBTC"| Peg
  Peg -->|"6. Release BTC<br/>after confirmations"| BTC

  classDef user fill:#FCE4F6,stroke:#FF71E1,stroke-width:2px,color:#1a1a1a
  classDef btc fill:#FFF0D9,stroke:#FF9100,stroke-width:2px,color:#1a1a1a
  classDef rsk fill:#E8F5D0,stroke:#79C600,stroke-width:2px,color:#1a1a1a
  classDef peg fill:#EDE7FF,stroke:#9E76FF,stroke-width:2px,color:#1a1a1a
  classDef token fill:#E0FFFA,stroke:#08FFD0,stroke-width:2px,color:#1a1a1a

  class User user
  class BTC btc
  class RVM rsk
  class Peg peg
  class rBTC token
```

Merged mining (1) is continuous security, not a user click. Peg-in (3–4) and peg-out (5–6) are separate flows through the same Bridge.

## Summary

Rootstock combines:
- **Bitcoin security** via merged mining
- **EVM programmability** via the Rootstock Virtual Machine
- **BTC ↔ rBTC transfers** via the PowPeg (peg-outs require confirmations and PowHSM signatures)

:::note[Before You Continue]
Make sure you've completed the [Development Prerequisites](/developers/requirements/) to set up your environment with Node.js, Hardhat, and wallet configuration.
:::

**Next:** [Smart Contract Fundamentals](/developers/blockchain-essentials/rootstock-essentials/smart-contract-fundamentals/)
