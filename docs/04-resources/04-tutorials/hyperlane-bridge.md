---
sidebar_position: 300
title: Run Hyperlane Bridge on Rootstock
sidebar_label: Hyperlane Bridge
tags: [hyperlane, rootstock, tutorials, rsk, blockchain, interoperability, cross chain bridge, defi]
description: "Hyperlane is the open interoperability framework to connect anywhere onchain. Build dApps that seamlessly communicates between Rootstock to other EVM-compatible chains."
---

[Hyperlane](https://www.hyperlane.xyz/) is the first universal and permissionless interoperability layer built for the modular blockchain stack.

This tutorial guides you through the process of setting up Hyperlane on the Rootstock blockchain to create seamless asset bridging between Rootstock and other compatible chains. You will learn how to install Hyperlane, configure custom chains, deploy contracts, and run validator and relayer nodes.

Some example dApps that can be developed using Hyperlane bridge:

1) Warp Routes, which allow native and ERC20 tokens to move seamlessly across chains such (e.g. Sending ERC20 tokens to/from Rootstock to BNB chian)
2) Interchain accounts, which allows an account on one chain (e.g. a DAO) to make smart contract calls on remote chains
3) Interchain queries, which allows an account on one chain such as Rootstock to make view (read calls) on remote chains such as BNB chain or any other EVM compatible chain

## Hyperlane CLI

The Hyperlane CLI is the official command-line tool for deploying Hyperlane contracts to new chains. It also includes utilities for interacting with deployed contracts and registries.

Both Rootstock testnet and mainnet are integrated in the CLI via the [Hyperlane registry](https://github.com/hyperlane-xyz/hyperlane-registry).

To get started, install the hyperlane cli using [npm](https://www.npmjs.com/package/@hyperlane-xyz/cli).

### Installation

There are two options for installing the Hyperlane CLI:

- Global installaton

  Use `-g` flag to globally install Hyperlane cli and access anywhere in your terminal

  ```bash
  npm i @hyperlane-xyz/cli -g
  ```

- Install within a directory

  In the terminal, make a directory to install Hyperlane cli:

  ```bash
  mkdir hyperlane_cli
  cd hyperlane_cli
  npm i @hyperlane-xyz/cli --save
  ```

  This will install Hyperlane cli within the `hyperlane_cli` directory inside `node_modules`. This is the most recommended way to use Hyperlane cli. Now test the installation by running following command inside `hyperlane_cli` directory:

  ```bash
  npx hyperlane --version
  ```

:::note
If you installed Hyperlane CLI within a directory using the second option, you'll need to use `npx hyperlane` instead of just `hyperlane` in your terminal. This ensures that npx can locate the CLI within your local node_modules directory. If you installed Hyperlane CLI globally, you can use `hyperlane` directly. 
:::

## Registry

Let’s create a custom chain config, run:

```bash
// Use `npx hyperlane` in case of local installation
hyperlane registry init
```

Output:

```
# yaml-language-server: $schema=../schema.json
name: rootstocktestnet
displayName: rootstocktestnet
chainId: 31
domainId: 31
protocol: ethereum
rpcUrls:
  - http: https://public-node.testnet.rsk.co
nativeToken:
  symbol: ETH
  name: Ether
  decimals: 18
transactionOverrides:
  gasLimit: 6800000
```

- Under $HOME/.hyperlane/chains you will find a new folder named with your custom chain’s name, and a file named metadata.yaml within that folder.
- On Mac, use the following commands to view the folder.

```bash
ls $HOME/.hyperlane/chains
cd $HOME/.hyperlane/chains/rootstocktestnet
```

Open the folder in your code editor to view the file: `metadata.yml`.

:::tip[Tip]
Append `transactionOverrides` gasLimit if it's not automatically added by cli by editing the metadata.yaml file at: $HOME/.hyperlane/chains
:::

Reference: https://docs.hyperlane.xyz/docs/deploy-hyperlane#1-registry

## Core init
Next, let’s configure, deploy and test your custom chain’s core contracts.

#### Initialize configuration

To initialize, set the private key or seed phrase of your funded deployer address to HYP_KEY in a local environment variable. For example: export HYP_KEY=`<YOUR_PRIVATE_KEY>`. 
From the same terminal instance, run:

```bash
// Use `npx hyperlane` in case of local installation
hyperlane core init
```

Output

```
Hyperlane Core Configure
------------------------
Creating a new core deployment config...
? Detected owner address as 0xd624E015A308d7917F07424bb4985a024af1188a from signer, is this correct? yes
Creating trustedRelayerIsm...
Created trustedRelayerIsm!
Creating merkleTreeHook...
Created merkleTreeHook!
Creating protocolFee...
Created protocolFee!
Core config is valid, writing to file ./configs/core-config.yaml:

 owner: "0xd624E015A308d7917F07424bb4985a024af1188a"
    defaultIsm:
      type: trustedRelayerIsm
      relayer: "0xd624E015A308d7917F07424bb4985a024af1188a"
    defaultHook:
      type: merkleTreeHook
    requiredHook:
      owner: "0xd624E015A308d7917F07424bb4985a024af1188a"
      type: protocolFee
      beneficiary: "0xd624E015A308d7917F07424bb4985a024af1188a"
      maxProtocolFee: "100000000000000000"
      protocolFee: "0"

    
✅ Successfully created new core deployment config.

```
Reference: https://docs.hyperlane.xyz/docs/deploy-hyperlane#2-core

## Deploy contracts

To deploy contracts, run:

```bash
// Use `npx hyperlane` in case of local installation
hyperlane core deploy
```

Output: 

```
hyperlane core deploy
Hyperlane CLI
{"level":30,"time":1726741403674,"pid":51011,"msg":"Your CLI version: 5.1.2, latest version: 5.2.0"}
? Please enter private key or use the HYP_KEY environment variable.

Hyperlane Core deployment
------------------------------------------------
? Select network type Testnet
? Select chain to connect: rootstocktestnet
? Do you want to use an API key to verify on this (rootstocktestnet) chain's block explorer no


Deployment plan
===============
Transaction signer and owner of new contracts: 0xA0365b08A56c75701415610Bf49B30DbfA285ac4
Deploying core contracts to network: rootstocktestnet
┌────────────────────────┬──────────────────────────────────────┐
│ (index)                │ Values                               │
├────────────────────────┼──────────────────────────────────────┤
│ Name                   │ 'rootstocktestnet'                   │
│ Display Name           │ 'rootstocktestnet'                   │
│ Chain ID               │ 31                                   │
│ Domain ID              │ 31                                   │
│ Protocol               │ 'ethereum'                           │
│ JSON RPC URL           │ 'https://public-node.testnet.rsk.co' │
│ Native Token: Symbol   │ 'ETH'                                │
│ Native Token: Name     │ 'Ether'                              │
│ Native Token: Decimals │ 18                                   │
└────────────────────────┴──────────────────────────────────────┘
Note: There are several contracts required for each chain, but contracts in your provided registries will be skipped.
? Mailbox already exists at 0xCfA3E807DEF506Db480328cB975fC9108eb59e52. Are you sure you want 
to deploy a new mailbox and overwrite existing registry artifacts? yes
? Is this deployment plan correct? yes
Running pre-flight checks for chains...
✅ Chains are valid
✅ Signer is valid
✅ Balances are sufficient
🚀 All systems ready, captain! Beginning deployment...
Deploying to rootstocktestnet from https://explorer.rootstock.io/address/0xA0365b08A56c75701415610Bf49B30DbfA285ac4
Deploying staticMerkleRootMultisigIsmFactory on rootstocktestnet with constructor args ()...
Pending https://explorer.rootstock.io/tx/0x53e9c7b043964bd6d28540a83a1f414b159af6a03fcbeccebbf54ba1648c58fc (waiting 1 blocks for confirmation)
```

You should see the following response:

```
Done updating chain rootstocktestnet at filesystem registry
✅ Core contract deployments complete:

    staticMerkleRootMultisigIsmFactory: "0xe43c9a892c0747020892ca204FfB04E0b25D0d09"
    staticMessageIdMultisigIsmFactory: "0x384930CCe5a044074c30bb7108284ea92728308c"
    staticAggregationIsmFactory: "0xa3725eAC59776F075dC5bb02D2997a7feb326595"
    staticAggregationHookFactory: "0xb58F0aB24165a33ae0167C9B036de7C4b1626450"
    domainRoutingIsmFactory: "0x2D687f5B6f868F510B9F3b7714A748Fe9492b848"
    proxyAdmin: "0xB820707a39eeE38389601cb801146aCaDdE8905e"
    mailbox: "0x7C7e9d0578A2CC3FCd086045265d667901eF7D2c"
    interchainAccountRouter: "0xc84693adE9c3F2421da4522E585f1380FC1Ef1F4"
    interchainAccountIsm: "0x102C9C8527797a2eD435A8d08EFF96e5D2D46638"
    validatorAnnounce: "0x04756442951D09f61362AFd9A2Ff48653eaa2E06"
    testRecipient: "0xc50EE7C40602f4c6425f25a139939bb8C5236290"
```

Note that deployment can take a few minutes.

Under $HOME/.hyperlane/chains you will find a new folder named with your custom chain’s name, and a file named `addresses.yaml` within that folder.

Here is the Rootstock metadata and addresses.yml:

- [Rootstock testnet metadata](https://github.com/hyperlane-xyz/hyperlane-registry/tree/main/chains/rootstocktestnet)
- [Rootstock mainnet metadata](https://github.com/hyperlane-xyz/hyperlane-registry/tree/main/chains/rootstock)

We have successfully deployed the Hyperlane contracts on Rootstock testnet. The next step is to run Hyperlane relayer and validator nodes so that the message could be sent from source chain to destination chain.

## Running a validator node
Validators provide the security for messages sent from your chain to remote chains. To get started:

- Clone the [hyperlane monorepo](https://github.com/hyperlane-xyz/hyperlane-monorepo)
- Build and run the [validator](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/rust/README.md#running-locally) using the steps listed in the README.md.
- Use the reference script below to build and run the validator for Rootstock.
- Add rootstock contract addresses and metadata in `./config/testnet4_config.json` file located in your filesystem inside the Rust project.
- [Example config.json file](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/rust/config/testnet_config.json)


To run a validator node, enter the following commands:

```bash
cargo build --release --bin relayer
CONFIG_FILES=./config/testnet4_config.json
./target/release/validator --validator.key 0x... --db ./hyperlane_db --originChainName rootstock --reorgPeriod 2 --checkpointSyncer.type localStorage --checkpointSyncer.path ./checkpointSyncer
```

View full validator configurations in [Run a Validator](https://docs.hyperlane.xyz/docs/guides/deploy-hyperlane-local-agents#3-run-a-validator)

## Running a Relayer node

Relayers deliver interchain messages sent between the local and remote chains. Learn more about [what relayers do](https://docs.hyperlane.xyz/docs/protocol/agents/relayer).


- Build and run the [relayer](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/rust/README.md)
- Use the reference script below to build and run the relayer for Rootstock.
- Add rootstock contract addresses and metadata in `./config/testnet4_config.json` file located in your filesystem inside the Rust project.
- [Example config.json file](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/rust/config/testnet_config.json)


To run a relayer node, enter the following commands:

```bash
CONFIG_FILES=./config/testnet4_config.json ./target/release/relayer --db ./hperlane_db --relayChains rootstock,bsctestnet --defaultSigner.key 0x... --allowLocalCheckpointSyncers true --checkpointSyncer.type localStorage --checkpointSyncer.path ./hyperlaneSyncer --gasPaymentEnforcement '[{"type": "none", "matchingList": []}, {"type": "minimum", "payment": 0}]'
```

View the full [relayer configurations](https://docs.hyperlane.xyz/docs/guides/deploy-hyperlane-local-agents#4-run-a-relayer)

## Sending a message 

You can verify that everything is working correctly by sending a test message between pairs of chains. To verify, initiate the message with the CLI.


```bash
npx hyperlane send message --origin rootstock --destination bsctestnet --key 0x...
```

See more details [here](https://docs.hyperlane.xyz/docs/your-first-message) about sending a message.


## Wrap route setup

Until now we have a Hyperlane mailbox and core contracts deployed on Rootstock, it’s time to set up token bridging between Rootstock chain and other Hyperlane chains.

See the [full guide](https://docs.hyperlane.xyz/docs/guides/deploy-warp-route) for how to do a wrap route setup.

## Useful Resources

- [How Hyperlane Works](https://docs.hyperlane.xyz/docs/protocol/protocol-overview)
- [Hyperlane Explorer](https://explorer.hyperlane.xyz/)
- [Deployed Addresses](https://docs.hyperlane.xyz/docs/reference/contract-addresses)
- [Hyperlane Github Repos](https://github.com/hyperlane-xyz)
- [Hyperlane Cli](https://docs.hyperlane.xyz/docs/reference/cli)
- [Hyperlane Registries](https://docs.hyperlane.xyz/docs/reference/registries)
- [Hyperlane Validators](https://docs.hyperlane.xyz/docs/operate/validators/run-validators)
- [Hyperlane Relayers](https://docs.hyperlane.xyz/docs/operate/relayer/run-relayer)
- [Hyperlane Demo Template](https://hyperlane-warp-template.vercel.app/)
