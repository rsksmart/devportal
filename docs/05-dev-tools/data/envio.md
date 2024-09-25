---
sidebar_label: Envio
sidebar_position: 2
title: Get Started with Envio
description: "Easily query on-chain data through a decentralized network of indexers"
tags: [Envio, indexers, data, subgraphs, dApps, smart contracts, developers, developer tools, get-started, how-to]
---

[Envio](https://envio.dev/) is a feature-rich indexing solution that provides developers with a seamless and efficient way to index and aggregate real-time or historical blockchain data for Rootstock, and **other EVM chains**. The indexed data is easily accessible through custom [GraphQL](https://graphql.org/) queries, giving developers the flexibility and power to retrieve specific information. See [Getting started with Envio](/dev-tools/data/envio/)

Developers can choose whether they want to start from a template (e.g. Blank, ERC-20, etc.), or use the Contract Import feature: 

## Prerequisites

The following are the prerequisite packages required for Envio:

* [Node.js](http://node.js) (use[ v18](https://nodejs.org/download/release/v18.18.0/) or newer)
* [pnpm](https://pnpm.io/installation) (use v8 or newer)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Docker is required specifically for running the Envio indexer locally.


## Installation

You can install Envio by running the command below:


```bash
npm i -g envio
```

Command to see available CLI commands for Envio.

```bash
envio --help
```

The following files are required from the user to run the Envio indexer:

* Configuration (defaults to config.yaml)
* GraphQL Schema (defaults to schema.graphql)
* Event Handlers (defaults to src/EventHandlers.* depending on the language chosen)

These files are auto-generated according to the template and language chosen by running the envio init command.


## Contract Import Tutorial

This walkthrough explains how to initialise an indexer using single or multiple contracts that are already deployed on a blockchain. This process allows a user to quickly and easily start up a basic indexer and a queryable GraphQL API for their blockchain application within a few minutes.


### Initialize your indexer

cd into the folder of your choice and run


```bash
envio init
```


Name your indexer:

```bash
? Name your indexer:
```

Choose the directory where you would like to set up your project (default is the current directory)

```text
? Set the directory:  (.) .
```


Select Contract Import as the initialization option.


```text
? Choose an initialization option
  Template
> ContractImport
[↑↓ to move, enter to select, type to filter]
```



```text
? Would you like to import from a block explorer or a local abi?
  Block Explorer
> Local ABI
[↑↓ to move, enter to select, type to filter]
```


The Block Explorer option only requires users to input the contract address and chain. This is the quickest setup if the contract is verified and deployed on one of the supported chains, as it will retrieve all needed contract information from a block explorer.

> _**📣Please note**: The Block Explorer option currently only supports networks with Etherscan. You can use the Local ABI option if the network doesn't have Etherscan._

Choosing Local ABI option will allow you to point to a JSON file containing the smart contract ABI. The Contract Import process will then populate the required files from the ABI.

**Specify the directory of the JSON file containing ABI**


```text
? What is the path to your json abi file?
```


**Choose which events to include in the config.yaml file**


```text
? Which events would you like to index?
> [x] ClaimRewards(address indexed from, address indexed reward, uint256 amount)
  [x] Deposit(address indexed from, uint256 indexed tokenId, uint256 amount)
  [x] NotifyReward(address indexed from, address indexed reward, uint256 indexed epoch, uint256 amount)
  [x] Withdraw(address indexed from, uint256 indexed tokenId, uint256 amount)
[↑↓ to move, space to select one, → to all, ← to none, type to filter]
```


**Specify which chain the contract is deployed on**


```text
? Choose network:
 <Enter Network Id>
  ethereum-mainnet
  goerli
  optimism
  base
  bsc
> rootstock
v polygon
[↑↓ to move, enter to select, type to filter]
```


**Enter the name of the contract**


```text
? What is the name of this contract?
```


**Enter the address of the contract**


```text
? What is the address of the contract?
[Use the proxy address if your abi is a proxy implementation]
```


> _**📣Note**: if you use a proxy contract with an implementation, the address should be for the proxy._

**Select the continuation option**


```text
? Would you like to add another contract?
> I'm finished
  Add a new address for same contract on same network
  Add a new network for same contract
  Add a new contract (with a different ABI)
[Current contract: BribeVotingReward, on network: rootstock]
```


The Contract Import process will prompt the user whether they would like to finish the import process or continue adding more addresses for the same contract on the same network, addresses for the same contract on a different network, or a different contract.

For more information on the contract import feature, visit the documentation[ here](https://docs.envio.dev/docs/contract-import).


## Envio Indexer Examples

Click [here](https://docs.envio.dev/docs/example-uniswap-v3) for more examples.


## Get in touch

Indexing can be a rollercoaster, especially for more complex use cases. Our engineers are available to help you with your data availability needs.

For any technical queries or issues feel free to reach us at [hello@envio.dev](mailto:hello@envio.dev). 


## Resources

* [Landing page](https://envio.dev/)
* [Documentation](https://docs.envio.dev/docs/overview)
* [Blog](https://docs.envio.dev/blog)
* [GitHub](https://github.com/enviodev)
