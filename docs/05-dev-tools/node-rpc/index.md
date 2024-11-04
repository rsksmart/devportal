---
sidebar_position: 8
sidebar_label: Node Providers
title: Node Providers
description: "Building dApps on Rootstock involves interacting with the blockchain network. See available node rpc providers on Rootstock." 
tags: [hardhat, quick start, developer tools, rsk, rootstock, ethereum, dApps, smart contracts]
---

Building dApps on Rootstock involves interacting with the blockchain network. But how do you access this network? That's where node providers come in. Think of them as gateways to the blockchain.

## What are Node Providers?

Imagine a vast library filled with information about everything happening on the Rootstock network. Node providers maintain copies of this information, allowing developers to connect and retrieve essential details. These details can include transaction history, account balances, and smart contract data.

## How Node Providers Work

* Full Nodes: Node providers run full nodes, which download and store the entire history of the Rootstock blockchain.
* API Access: They offer an interface (API) that developers can use to communicate with these nodes and request specific data. This eliminates the need for developers to download the entire blockchain themselves, saving time and resources.

Several node provider services are available for Rootstock

<CardsGrid>
  <CardsGridItem
    title="RPC API"
    subtitle="node-rpc"
    color="cyan"
    description="The RPC API provides a seamless and intuitive web interface for developers to interact with Rootstock nodes via JSON-RPC methods"
    linkHref="http://rpc.rootstock.io/"
    linkTitle="Make First API Call"
  />
  <CardsGridItem
    title="GetBlock"
    subtitle="node-rpc"
    color="cyan"
    description="GetBlock provides instant connection to blockchain nodes including Rootstock, Bitcoin (BTC), Ethereum (ETH), among others."
    linkHref="https://getblock.io/nodes/rsk/"
    linkTitle="Make First API Call"
  />
   <CardsGridItem
    title="NOWNodes"
    subtitle="node-rpc"
    color="green"
    description="NOWNodes is a blockchain-as-a-service enterprise solution that lets users get access to full Nodes and blockbook Explorers via an API."
    linkHref="https://nownodes.io/nodes/rsk"
    linkTitle="Make First API Call"
  />
    <CardsGridItem
    title="dRPC"
    subtitle="node-rpc"
    color="green"
    description="dRPC provides access to a distributed network of node providers."
    linkHref="https://drpc.org/chainlist/rootstock?utm_source=docs&utm_medium=rootstock"
    linkTitle="Make First API Call"
  />
    <CardsGridItem
    title="Alchemy"
    subtitle="node-rpc"
    color="green"
    description="Powerful APIs, SDKs, and tools to build and scale your web3 app with ease."
    linkHref="https://www.alchemy.com/rootstock/"
    linkTitle="Make First API Call"
  />
</CardsGrid>


