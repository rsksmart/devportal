---
section_title: Foundry
menu_title: Foundry
layout: rsk
title: Getting Started with Foundry
description: 'How to write, test, and deploy smart contracts with Foundry'
tags: foundry, quick-start, rootstock, testing, networks, deployment, npm, tools, rsk, ethereum, smart-contracts, install, windows, mac, linux, get-started, how-to
menu_order: 410
render_features: 'collapsible'
---

[Foundry](https://book.getfoundry.sh) is a smart contract development toolchain, and user-friendly development environment for writing and testing smart contracts in Solidity. It manages dependencies, compiles, run tests, deploy contracts and allows for interaction with EVM-compatible chains using a command-line tool called [Forge](https://book.getfoundry.sh/forge/). 

In this guide, we will learn about Foundry and its benefits for smart contract development, how to setup your environment, create a Foundry project and execute a deployment script.

## Why use Foundry?

Forge is ideal for advanced smart contract analysis, auditing, and for fast execution of smart contract tests. 

> Note: Use the [hardhat-foundry plugin](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-foundry) to have your Foundry project work alongside Hardhat. 

Here are some reason why you may prefer Foundry:

1. Local Networks: 
It provides a local blockchain environment using the [anvil tool](https://book.getfoundry.sh/reference/anvil/), allowing developers to deploy contracts, run tests, and debug code. It can also be used to fork other EVM compatible networks.
 
2. Advanced Testing: 
[Forge](https://book.getfoundry.sh/forge/advanced-testing) comes with a number of advanced testing methods including:
   - Fuzz testing
   - Invariant testing
   - Differential testing
   - Symbolic Execution
   - Mutation Testing

3. Advanced Debugging: 
[Forge](https://book.getfoundry.sh/forge/debugger) allows for advanced debugging using an interactive debugger. 

The debugger terminal is divided into four quadrants:

[](#top "collapsible")
- Quadrant 1
   - The opcodes in the debugging session, with the current opcode highlighted. Additionally, the address of the current account, the program counter and the accumulated gas usage is also displayed.
- Quadrant 2
   - The current stack, as well as the size of the stack
- Quadrant 3
   - The source view.
- Quadrant 4
   - The current memory of the EVM.
 
   
## Getting Started

### Prerequisites

To get started with Foundry, ensure the following tools are installed:
- The [Rust](https://rust-lang.org/) Compiler
- Cargo Package Manager

> For an easy installation of the above tools, use the [rustup installer](https://rustup.rs).

### Installation

To install, use Foundryup. Foundryup is the Foundry toolchain installer. You can find more information in the [Foundry README](https://github.com/foundry-rs/foundry/blob/master/foundryup/README.md).

```bash
curl -L https://foundry.paradigm.xyz | bash
```

Running foundryup by itself will install the latest (nightly) precompiled binaries: `forge`, `cast`, `anvil`, and `chisel`.

> Visit the [installation guides](https://book.getfoundry.sh/getting-started/installation) for more information.

### Create a foundry project

To start a new project with Foundry, use [forge init](https://book.getfoundry.sh/reference/forge/forge-init.html).

```bash
forge init hello_foundry
```

> See more details on how to [create a new project](https://book.getfoundry.sh/projects/creating-a-new-project) using the Foundry guide.

### Write your first contract

Let’s view the file structure for a default foundry project:

```bash
$ cd hello_foundry
$ tree . -d -L 1
.
├── lib
├── script
├── src
└── test

4 directories
```

The `src` directory contains counter smart contract with test written in the `test` directory. Now, let's build the foundry project.

```bash
forge build
```

And then run tests.

```bash
forge test
```

### Deploy contract on the Rootstock

To deploy the counter contract on Rootstock mainnet or testnet, further configure Foundry by setting up a [Rootstock RPC URL](/tools/rpc-api/) and a private key of an account that’s funded with tRBTC. 

#### Environment Configuration

Once you have an account with a private key and a API key to interact with the RPC API, create a `.env` file in the root of the foundry project and add the variables. 

Foundry automatically loads a `.env` file present in the project directory.

The `.env` file should follow this format:

```bash
ROOTSTOCK_RPC_URL=https://rpc.testnet.rootstock.io/API_KEY
PRIVATE_KEY=0x...
```

> Replace `"API_KEY"` with the api key that you have created for this App. For information on how to create an API key, see [How to get started with RPC API](/tools/rpc-api/).

At the root of the project, run:

```bash
# To load the variables in the .env file
source .env
```

#### Modify Deployment Script

Modify the deployment counter deploy script in the `scripts` directory to use the private key by modifying the run method, see below example:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import "../src/Counter.sol";


contract CounterScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        new Counter();

        vm.stopBroadcast();

    }
}

```

By default, scripts are executed by calling the function named `run` at the entrypoint.

```solidity
uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
```

> - CAUTION: Be cautious when exposing private keys in a `.env` file and loading them into programs. 
   > - This is only recommended for use with non-privileged deployers or for local / test setups.

When calling `vm.startBroadcast()`, the contract creation will be recorded by Forge, and we can broadcast the transaction to deploy the contract on-chain.

#### Execute the deployment script

We will use Forge to run our script and broadcast the transactions - this can take a little while, since Forge also waits for the transaction receipts. 

```bash
forge script script/Counter.s.sol --rpc-url $ROOTSTOCK_RPC_URL --broadcast --legacy
```

[](#top "collapsible")
- Note:
   - [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) is not supported or not activated on the Rootstock RPC url
   - The `--legacy` flag is passed to use legacy transactions instead of `EIP-1559`.

The result should look like this:

```bash
[⠰] Compiling...
No files changed, compilation skipped
Script ran successfully.

== Logs ==
  Counter: 

## Setting up 1 EVM.

==========================

Chain 31

Estimated gas price: 0.065164 gwei

Estimated total gas used for script: 138734

Estimated amount required: 0.000009040462376 ETH

==========================
##
Sending transactions [0 - 0].
⠁ [00:00:00] [###############################################################################################################################################] 1/1 txes (0.0s)##
Waiting for receipts.
⠉ [00:00:25] [###########################################################################################################################################] 1/1 receipts (0.0s)
##### 31
✅  [Success]Hash: 0x015de35ffae94f491d4630f2aec84c49ae8170d5ecf3f4c1cdc8718bc4a00052
Contract Address: 0x64B24E046259042e16a337Be4648CeAAF8Eb72C6
Block: 5071408
Gas Used: 106719

==========================

ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.
Total Paid: 0. ETH (106719 gas * avg 0 gwei)

Transactions saved to: /hello_foundry/broadcast/Counter.s.sol/31/run-latest.json

Sensitive values saved to: /hello_foundry/cache/Counter.s.sol/31/run-latest.json
```

> The broadcast directory will be updated automatically with the latest output of the deployment. 

See the [foundry deployment documentation](https://book.getfoundry.sh/tutorials/solidity-scripting#deploying-our-contract).

### Related Docs

- [Quick start guide with Hardhat](/guides/quickstart/hardhat/)
- [Tools](/tools/)
- [Foundry Project Layout](https://book.getfoundry.sh/projects/project-layout)
- [RPC Calls Using Cast](https://book.getfoundry.sh/cast/)
- [Foundry Configurations](https://book.getfoundry.sh/config/)
- [Solidity Scripting](https://book.getfoundry.sh/tutorials/solidity-scripting)
- [Deploy Smart Contracts To Deterministic Addresses](https://book.getfoundry.sh/tutorials/create2-tutorial)
- [Getting Started with Hardhat](/guides/quickstart/hardhat/)
- [Gas Tracking](https://book.getfoundry.sh/forge/gas-tracking)
- [Debugging](https://book.getfoundry.sh/forge/debugger)
- [Chisel](https://book.getfoundry.sh/chisel/)
- [Forge - Deploy and Verify ](https://book.getfoundry.sh/forge/deploying)
- [Forge - Advanced Testing](https://book.getfoundry.sh/forge/advanced-testing)
