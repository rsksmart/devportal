---
sidebar_position: 7
sidebar_label: Wormhole Messaging
title: Wormhole Messaging
description: "Wormhole is a cross-chain messaging protocol that lets you send arbitrary byte payloads between Rootstock and other supported networks for governance, data synchronization, and multi-chain application logic."
tags: [wormhole, messaging, bridges, developer tools, rsk, rootstock, ethereum, dApps, smart contracts, vaa]
---

Rootstock supports [Wormhole](https://wormhole.com/docs/), a general-purpose cross-chain messaging protocol. Beyond token transfers, Wormhole lets you send arbitrary byte payloads between any two Wormhole-supported networks, which makes it suitable for cross-chain governance, data synchronization, and multi-chain application logic on Rootstock.

Messages are co-signed by the Wormhole Guardian Network into Verified Action Approvals (VAAs), which your destination contract on Rootstock verifies through the Wormhole Core Contract.

## Resources
- [Cross-Chain Messaging with Wormhole](/use-cases/interoperability/rootstock-wormhole-messaging/) — a step-by-step guide to building a Solidity receiver contract and fetching VAAs with the Wormhole SDK on Rootstock.
- [Wormhole supported networks (Rootstock)](https://wormhole.com/docs/build/start-building/supported-networks/evm/#rootstock)
- [Wormhole contract addresses](https://wormhole.com/docs/build/reference/contract-addresses/)
