---
sidebar_position: 3
sidebar_label: RPC Node Providers
title: RPC Node Providers
description: "Building dApps on Rootstock involves interacting with the blockchain network. See available node rpc providers on Rootstock." 
tags: [hardhat, quick start, developer tools, rsk, rootstock, ethereum, dApps, smart contracts]
---

Building dApps on Rootstock involves interacting with the blockchain network. But how do you access this network? That's where node providers come in. Think of them as gateways to the blockchain.

## What are Node Providers?

Imagine a vast library filled with information about everything happening on the Rootstock network. Node providers maintain copies of this information, allowing developers to connect and retrieve essential details. These details can include transaction history, account balances, and smart contract data.

## How Node Providers Work

* Full Nodes: Node providers operate by running full nodes on the Rootstock blockchain. These full nodes download and store the complete history of the blockchain, enabling them to verify transactions and maintain a consistent view of the network.  To interact with these full nodes, developers and applications utilize a remote procedure call (RPC) mechanism, specifically the JSON-RPC protocol. This protocol allows remote communication with the node, enabling the submission of requests and the receipt of responses.
* API Access: Node providers like the Rootstock RPC API, Alchemy, GetBlock, NOWNodes, dRPC, and Blast API etc offer an interface (API) that developers can use to communicate with these nodes and request specific data. This eliminates the need for developers to download the entire blockchain themselves, saving time and resources.

## RPC Node Providers on Rootstock

Here you can find a list of rpc node providers on Rootstock. 

<CardsGrid>
  <CardsGridItem
    title="RPC API"
    subtitle="node-rpc"
    color="cyan"
    description="The RPC API provides a seamless and intuitive web interface for developers to interact with Rootstock nodes via JSON-RPC methods"
    linkHref="/developers/rpc-api/rootstock/"
    linkTitle="Make First API Call"
  />
  <CardsGridItem
    title="Alchemy"
    subtitle="node-rpc"
    color="cyan"
    description="Powerful APIs, SDKs, and tools to build and scale your web3 app with ease."
    linkHref="/developers/rpc-api/alchemy/"
    linkTitle="Make First API Call"
  />
  <CardsGridItem
    title="GetBlock"
    subtitle="node-rpc"
    color="cyan"
    description="GetBlock provides instant connection to blockchain nodes including Rootstock, Bitcoin (BTC), Ethereum (ETH), among others."
    linkHref="/dev-tools/node-rpc/getblock/"
    linkTitle="Make First API Call"
  />
   <CardsGridItem
    title="NOWNodes"
    subtitle="node-rpc"
    color="cyan"
    description="NOWNodes is a blockchain-as-a-service enterprise solution that lets users get access to full Nodes and blockbook Explorers via an API."
    linkHref="/dev-tools/node-rpc/nownodes/"
    linkTitle="Make First API Call"
  />
<CardsGridItem
    title="dRPC"
    subtitle="node-rpc"
    color="cyan"
    description="dRPC provides access to a distributed network of node providers."
    linkHref="/dev-tools/node-rpc/drpc/"
    linkTitle="Make First API Call"
  />
<CardsGridItem
    title="Blast API"
    subtitle="node-rpc"
    color="cyan"
    description="Blast API is a Blockchain-optimized cloud infrastructure for low-latency, cost-effective RPC services on Rootstock."
    linkHref="/dev-tools/node-rpc/blast-api/"
    linkTitle="Make First API Call"
  />
</CardsGrid>


