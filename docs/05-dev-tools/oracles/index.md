---
sidebar_position: 10
sidebar_label: Oracles
title: Oracles
description: "How to get started with writing, deploying and testing smart contracts on Rootstock using Hardhat." 
tags: [hardhat, quick start, developer tools, rsk, rootstock, ethereum, dApps, smart contracts]
---

Oracles act as bridges, securely bringing external data onto the Rootstock blockchain for dApps to utilize.

## How Oracles Work:
* Data Request: A dApp sends a request to an oracle network, specifying the data it needs.
* Data Collection: Oracles retrieve the data from reliable sources (weather APIs, stock exchanges).
* Verification: Multiple oracles within the network verify the data for accuracy and security.
* Delivery: The verified data is then delivered to the dApp.

<CardsGrid>
  <CardsGridItem
    title="Umbrella Network"
    subtitle="oracles"
    color="cyan"
    description="Umbrella Network provides access to reliable and secure data verified by Umbrella's decentralized network. Utilize Umbrella's Data Layer to build customizable and composable data streams on demand on Rootstock."
    linkHref="https://umb.network//"
    linkTitle="Access on-chain data"
  />
   <CardsGridItem
    title="Redstone Finance"
    subtitle="oracles"
    color="cyan"
    description="RedStone provides data feeds to blockchains such as Rootstock and layer 2 scaling solutions across the entire blockchain ecosystem that are both EVM and non-EVM compatible. RedStone allows data to be provided on-demand rather than on a fixed schedule, reducing the costs of putting data 'on-chain'. This is achieved by storing data off of the blockchain as cryptography signed packages and allowing smart contracts of dApps to fetch data when necessary."
    linkHref="https://redstone.finance/"
    linkTitle="Access on-chain data"
  />
</CardsGrid>