---
sidebar_label: Envio
sidebar_position: 2
title: Get Started with Envio
description: "Index real-time and historical Rootstock data into a GraphQL API with Envio HyperIndex"
tags: [Envio, indexers, data, subgraphs, dApps, smart contracts, developers, developer tools, get-started, how-to]
---

[Envio](https://envio.dev/) HyperIndex is an indexing framework for real-time and historical blockchain data on Rootstock and **other EVM chains**. You define the contracts and events to index, write handlers that turn those events into entities, and query the result through a [GraphQL](https://graphql.org/) API. Envio is currently supported on: <Shield title="mainnet" color="orange" />.

On Rootstock mainnet (chain ID 30), HyperIndex uses [HyperSync](https://docs.envio.dev/docs/HyperSync/overview), Envio's data retrieval layer, as its default data source. Handlers are written in TypeScript (the default) or ReScript. You can run an indexer locally, self-host it, or deploy it to [Envio Cloud](https://docs.envio.dev/docs/HyperIndex/hosted-service), Envio's managed hosting.

Developers can start from a template (for example, ERC20 or Greeter), or use contract import to generate an indexer from an existing contract. You pick a template from the list that `envio init` shows. The template source code is in the [HyperIndex repository](https://github.com/enviodev/hyperindex/tree/main/packages/cli/templates/static).

<Button size="sm" href="/dev-tools/data/envio/">Getting started with Envio</Button>

## Prerequisites

The following are required for Envio:

* [Node.js](https://nodejs.org/en/download) <Shield version="22" /> or newer
* [pnpm](https://pnpm.io/installation)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Docker is required only to run the Envio indexer locally. See [Run your indexer](#run-your-indexer).

You also need an Envio API token to use HyperSync. To create one, follow the [API tokens guide](https://docs.envio.dev/docs/HyperSync/api-tokens#generating-api-tokens), which walks through the [Envio app](https://envio.dev/app/api-tokens) step by step.

## Run the Envio CLI

You don't need to install Envio globally. Run CLI commands with `pnpx`. For example, to see the available commands:

```bash
pnpx envio --help
```

The following files are required to run an Envio indexer:

* Configuration (`config.yaml`)
* GraphQL schema (`schema.graphql`)
* Event handlers (`src/handlers/`)

`envio init` generates these files from the template or contract you choose. The templates are listed in the **Choose an initialization option** step below, next to the contract import options.

## Contract import tutorial

This walkthrough creates an indexer from a contract that is already deployed on Rootstock. It gives you a basic indexer and a GraphQL API for your app.

### Initialize your indexer

`cd` into the folder of your choice and run:

```bash
pnpx envio init
```

Enter a folder name for the project, or press Enter to use the current directory:

```text
? Specify a folder name (ENTER to skip):  (.)
```

Select `Evm` as the blockchain ecosystem:

```text
? Choose blockchain ecosystem
> Evm
  Svm
  Fuel
[↑↓ to move, enter to select, type to filter]
```

Choose how to import the contract:

```text
? Choose an initialization option
> From Address - Lookup ABI from block explorer
  From ABI File - Use your own ABI file
  Template: ERC20
  Template: Greeter
  Feature: External Calls
  Feature: Factory Contract
[↑↓ to move, enter to select, type to filter]
```

The **From Address** option only needs the chain and the contract address. If the contract is verified, the CLI fetches the ABI from a block explorer.

The **From ABI File** option uses a JSON file that contains the contract ABI. Use it if the contract isn't verified. The steps below follow this option.

**Enter the path to the JSON file that contains the ABI**

```text
? What is the path to your json abi file?
```

**Choose which events to include in the config.yaml file**

```text
? Which events would you like to index?
> [x] Transfer(address indexed from, address indexed to, uint256 value)
[↑↓ to move, space to select one, → to all, ← to none, type to filter]
```

**Specify which chain the contract is deployed on**

Rootstock mainnet is listed as `rsk`. Type `rsk` to filter the list:

```text
? Choose network: rsk
> rsk
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
[Current contract: Wrbtc, on network: rsk]
```

You can finish, or add more addresses for the same contract on the same network, the same contract on a different network, or a different contract.

**Add your API token**

```text
? Add an Envio API token to your .env file?
> Create a new API token (Opens https://envio.dev/app/api-tokens)
  Add an existing API token
[↑↓ to move, enter to select, type to filter]
```

You can also run contract import without prompts. Set your Envio API token in `ENVIO_API_TOKEN` so the CLI can write it to the `.env` file. For a verified contract on Rootstock mainnet:

```bash
ENVIO_API_TOKEN=<YOUR_API_TOKEN> pnpx envio init contract-import explorer -b rsk -c <CONTRACT_ADDRESS> --single-contract --all-events -n my-indexer -d my-indexer
```

For more information, see the [HyperIndex quickstart](https://docs.envio.dev/docs/HyperIndex/quickstart).

## Run your indexer

Make sure Docker is running, then start the indexer from the project folder:

```bash
pnpm dev
```

This opens the local Hasura console, where you can query the indexed data with GraphQL. The local admin password is `testing`. See [running the indexer locally](https://docs.envio.dev/docs/HyperIndex/running-locally) and [deploying to Envio Cloud](https://docs.envio.dev/docs/HyperIndex/hosted-service-deployment).

## Envio indexer examples

See the [HyperIndex tutorials](https://docs.envio.dev/docs/HyperIndex/tutorial-erc20-token-transfers) for examples.

## Get in touch

For technical questions, join the [Envio Discord](https://discord.gg/envio) or email [hello@envio.dev](mailto:hello@envio.dev).

## Resources

* [Landing page](https://envio.dev/)
* [Documentation](https://docs.envio.dev/docs/HyperIndex/overview)
* [Blog](https://docs.envio.dev/blog)
* [GitHub](https://github.com/enviodev)
