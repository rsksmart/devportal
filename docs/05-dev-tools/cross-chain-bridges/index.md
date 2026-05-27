---
sidebar_position: 5
sidebar_label: Cross Chain Bridges
title: Cross Chain - Bridging between Blockchains
description: "Explore cross-chain bridging solutions on Rootstock." 
tags: [cross chain, bridges, developer tools, rsk, rootstock, ethereum, dApps, smart contracts]
---

Imagine different islands, each with its own unique economy and currency. To trade with each other, these islands need bridges to connect them. In the world of blockchain, these islands are different blockchains, and the bridges are called cross-chain bridges. Unlike physical bridges, cross-chain bridges carry chain-specific risks and wait times that you should understand before moving assets or messages between networks.

## Why do we need cross-chain bridges?

* Asset movement across chains: Cross-chain bridges allow users to move digital assets between different blockchains, similar to transfers between bank accounts but with chain-specific risks and wait times.
* Expanded Opportunities: By connecting different blockchains, you can access a wider range of financial services, decentralized applications (dApps), and investment opportunities.

## How do cross-chain bridges work?

* Lock and Mint: When you want to move assets from one blockchain (e.g., Chain A) to another (e.g., Chain B), the bridge locks your assets on Chain A and mints a corresponding amount of wrapped assets on Chain B.
* Transfer and Burn: You can then transfer these wrapped assets on Chain B. Once you're ready to move them back to Chain A, the bridge burns the wrapped assets on Chain B and releases your original assets on Chain A. Because each bridge handles custody and verification differently, review the chain-specific risks and wait times before initiating a transfer.

## Cross-Chain Bridging Solutions on Rootstock

<CardsGrid>
  <CardsGridItem
    title="Stargate"
    subtitle="cross-chain"
    color="green"
    description="Bridge rBTC, DOC, MOC, USDRIF, USDT0, and more from Rootstock to other chains."
    linkHref="https://stargate.finance/"
    linkTitle="Start Bridging"
  />
   <CardsGridItem
    title="Atlas"
    subtitle="cross-chain"
    color="green"
    description="Bridge supported assets between Rootstock and other networks using provider routes shown in Atlas."
    linkHref="https://atlas.rootstock.io"
    linkTitle="Start Bridging"
  />
  <CardsGridItem
    title="PowPeg App"
    subtitle="cross-chain"
    color="green"
    description="Convert BTC to rBTC and vice versa. The PowPeg protocol secures locked bitcoin using Bitcoin hashrate that also supports Rootstock consensus."
    linkHref="https://powpeg.rootstock.io/"
    linkTitle="Start Bridging"
  />
  <CardsGridItem
    title="Wormhole"
    subtitle="cross-chain"
    color="green"
    description="The Wormhole platform overview and supported-network reference for developers building dApps that use multiple blockchains, including Rootstock."
    linkHref="https://wormhole.com/docs/build/start-building/supported-networks/evm/#rootstock"
    linkTitle="Start Bridging"
  />
  <CardsGridItem
    title="Hyperlane Bridge"
    subtitle="cross-chain"
    color="green"
    description="Build dApps that communicate between Rootstock and other EVM-compatible chains."
    linkHref="/resources/tutorials/hyperlane-bridge/"
    linkTitle="Start Bridging"
  />
  <CardsGridItem
    title="Layerzero"
    subtitle="cross-chain"
    color="green"
    description="LayerZero is a cross-chain messaging protocol for moving Bitcoin-backed assets from Rootstock to other blockchains so developers can build omnichain applications (OApps) across multiple chains."
    linkHref="/use-cases/interoperability/rootstock-layerzero/"
    linkTitle="Start Bridging"
  />
  <CardsGridItem
    title="Wormhole Messaging"
    subtitle="cross-chain"
    color="green"
    description="A step-by-step Rootstock integration guide for sending arbitrary byte payloads between chains using Verified Action Approvals (VAAs) and the Wormhole Core Contract."
    linkHref="/dev-tools/cross-chain-bridges/wormhole-messaging/"
    linkTitle="Read the Guide"
  />
</CardsGrid>