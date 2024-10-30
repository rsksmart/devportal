---
sidebar_position: 2
title: Interact with Rootstock using Rust
sidebar_label: Interact with Rootstock using Rust
tags: [rsk, rootstock, rust, tutorials, resources, smart contracts, alloy]
description: "Rust is extensively getting used on backend side of many defi applications, dApps, developer tools, indexers and bridges. This guide will help developers to start using Rust on Rootstock blockchain."
---

Rust is a fast and memory-efficient language, it can power performance-critical services, 
run on embedded devices, and easily integrate with other languages.

> This tutorial helps to get started on Rootstock using Rust by performing basic operations such as sending transactions and calling contracts using Alloy crate, similiar to ethers. 

## Introduction to Alloy

[Alloy](https://github.com/alloy-rs/alloy) connects applications to blockchains, it serves as an entry point to connect with evm compatible blockchains. It is a rewrite of [ethers-rs](https://github.com/gakonst/ethers-rs) library from the ground up, with new features, high performance, etc. An example is [Foundry](https://github.com/foundry-rs/foundry), a tool written in Rust which uses Alloy as a dependency to connect with blockchains. 

For more information, see [Alloy Examples](https://github.com/alloy-rs/examples) to help you get started.

## Prerequisites

* Rust
    * Install the latest version of [Rust](https://www.rust-lang.org/tools/install). If you already have Rust installed, make sure to use the latest version or update using the `rustup` toolchain. 

## Getting Started

### Create a Rust project

Run the command below using cargo to create a starter project.

```bash
cargo new rootstock-rs
```

> Next step is to update `cargo.toml` file with dependencies explained in next section.

## Setup Alloy 

To install [Alloy](https://github.com/alloy-rs/alloy) run the following command below in the root directory of the project:

```bash
cd rootstock-rs
cargo add alloy --git https://github.com/alloy-rs/alloy
```

Find more about [Alloy setup using meta crate](https://alloy.rs/getting-started/installation.html)

> Note: All the dependencies required are mentioned in the `.toml` file below. Copy and paste into the `cargo.toml` file.

```bash
[package]
name = "rootstock-alloy"
version = "0.1.0"
edition = "2021"

[dependencies]
alloy = { git = "https://github.com/alloy-rs/alloy", version = "0.1.3", default-features = true, features = ["providers", "rpc-client", "transport-http", "sol-types", "json", "contract", "rpc-types", "rpc-types-eth", "network", "signers", "signer-local"] }
eyre = "0.6.12"
futures-util = "0.3.30"
tokio = { version = "1", features = ["full"] }
```

> The types and import statements in [Alloy](https://github.com/alloy-rs/alloy) dependencies are expected to change. If you face any type related errors while running the given examples in this tutorial, its recommended to check the [Alloy](https://github.com/alloy-rs/alloy) repo and [documentation](https://alloy.rs/).

## Connect to the Rootstock node

To connect to the Rootstock node., we will require a provider setup. A [Provider](https://alloy-rs.github.io/alloy/alloy_provider/provider/trait/trait.Provider.html) is an abstraction of a connection to the Rootstock network, it provides a concise, and consistent interface to standard Ethereum node functionality. 

To run this program, use `cargo run` in the root of the project:

```bash
cd rootstock-rs
cargo run
```

The response should look like this:

```bash
Finished `dev` profile [unoptimized + debuginfo] target(s) in 29.28s
    Running `target/debug/rootstock-alloy`
Hello, world!
```

Next, update the `rootstock-rs/src/main.rs` file with the program below:

:::info[Info]

Replace `API_KEY` with your RPC API Key. To get an API_KEY, see the [RPC Docs](/developers/rpc-api/rootstock/setup/). 

:::

```rs
use alloy::providers::{ Provider, ProviderBuilder };
use eyre::Result;

#[tokio::main]
async fn main() -> eyre::Result<()> {
    // Set up the HTTP transport which is consumed by the RPC client.
    let rpc_url = "https://rpc.testnet.rootstock.io/{YOUR_APIKEY}".parse()?;

    // Create a provider with the HTTP transport using the `reqwest` crate.
    let provider = ProviderBuilder::new().on_http(rpc_url);

    // Get chain id
    let chain_id = provider.get_chain_id().await?;

    println!("chain id: {chain_id}");

    // Get latest block number.
    let latest_block = provider.get_block_number().await?;

    println!("Latest block number: {latest_block}");

    Ok(())
}
```

The response should look like this:

```bash
Finished `dev` profile [unoptimized + debuginfo] target(s) in 1.43s
    Running `target/debug/rootstock-alloy`
chain id: 31
Latest block number: 5292505
```

## Get RBTC / RIF balance

After setting up the provider, interact with Rootstock node, fetch balance of an address or call a contract. Now, copy and paste the code below.

We will do the following: 
* Codegen from ABI file to interact with the contract.
* Create an abi directory in the root of the project and put RIF token abi in rif.json file.

Run the below commands in the root folder:

```bash
mkdir abi
touch rif.json
```

Replace `rootstock-rs/abi/rif.json file` with the RIF Abi below:

```bash
[ { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]
```

Update the `rootstock-rs/src/main.rs` file with this program:

```rs 
use alloy::providers::{Provider, ProviderBuilder};
use alloy::sol;
use alloy::primitives::{ address, utils::format_units  };
 
sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    RIF,
    "abi/rif.json"
);

#[tokio::main]
async fn main() -> eyre::Result<()> {
    // Set up the HTTP transport which is consumed by the RPC client.
    let rpc_url = "https://rpc.testnet.rootstock.io/{YOUR_APIKEY}".parse()?;

    // Create a provider with the HTTP transport using the `reqwest` crate.
    let provider = ProviderBuilder::new().on_http(rpc_url);

    // Address without 0x prefix
    let alice = address!("8F1C0185bB6276638774B9E94985d69D3CDB444a");

    let rbtc = provider.get_balance(alice).await?;

    let formatted_balance: String = format_units(rbtc, "ether")?;

    println!("Balance of alice: {formatted_balance} rbtc");

    // Using rif testnet contract address
    let contract = RIF::new("0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE".parse()?, provider);


    let RIF::balanceOfReturn { balance } = contract.balanceOf(alice).call().await?;

    println!("Rif balance: {:?}", balance);

    Ok(())
}
```

:::info[Info]

Replace `API_KEY` with your RPC API Key. To get an API_KEY, see the [RPC Docs](/developers/rpc-api/rootstock/setup/). Also replace RIF Testnet contract addresses with your own address as you would be required to use a private key later.

:::

Note: Run the cargo command in the root of the project:

```bash
cd rootstock-rs
cargo run
```

You should get the following response:

```bash
Finished `dev` profile [unoptimized + debuginfo] target(s) in 3.01s
    Running `target/debug/rootstock-alloy`
Balance of alice: 0.315632721175825996 rbtc
Rif balance: 183000000000000000000
```

## Send a transaction

The following program sends tRBTC from one account to the other using `TransactionRequest` Builder. 

Running this program will require setting your `PRIVATE_KEY` env variable and then run the program using `cargo run` in root.   

```bash
cd rootstock-rs
PRIVATE_KEY=0x12... cargo run
```

Replace `PRIVATE_KEY` with your private key in the command above to run this program.

You should see the following response:

```bash
% cargo run
Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.35s
    Running `target/debug/rootstock-alloy`
Balance of alice: 0.315632721175825996 rbtc
Rif balance: 183000000000000000000
```

Next, update the `rootstock-rs/src/main.rs` file with this program:

```rs
use alloy::{
    network::{EthereumWallet, TransactionBuilder},
    primitives::{address, U256},
    providers::{Provider, ProviderBuilder},
    rpc::types::TransactionRequest,
    signers::local::PrivateKeySigner,
};
use eyre::Result;
use std::env;

#[tokio::main]
async fn main() -> Result<()> {

    // Get private key
    let mut pk = String::new();

    match env::var("PRIVATE_KEY") {
        Ok(value) => {
            pk.push_str(value.as_str());
        },
        Err(_e) => {
            panic!("Private key not setup");
        },
    }
    
    // Set up the HTTP transport which is consumed by the RPC client.
    let rpc_url = "https://rpc.testnet.rootstock.io/{YOUR_APIKEY}".parse()?;

    let signer: PrivateKeySigner = pk.parse().unwrap();

    let wallet = EthereumWallet::from(signer);

    // Create a provider with the HTTP transport using the `reqwest` crate.
    let provider = ProviderBuilder::new()
    .wallet(wallet)
    .on_http(rpc_url);

    // Get chain id
    let chain_id = provider.get_chain_id().await?;

   // Create two users, Alice and Bob.
   // Address without 0x prefix
   let alice = address!("8F1C0185bB6276638774B9E94985d69D3CDB444a");
   let bob = address!("8F1C0185bB6276638774B9E94985d69D3CDB444a");

   let nonce = provider.get_transaction_count(alice).await?;

    // Build a transaction to send 100 wei from Alice to Bob.
    let tx = TransactionRequest::default()
        .with_from(alice)
        .with_to(bob)
        .with_chain_id(chain_id)
        .with_nonce(nonce)
        .with_value(U256::from(100))  // To see value in rbtc: 100 / 10 ** 18 RBTC
        .with_gas_price(65_164_000) // provider.estimate_gas(&tx).await? * 1.1 as u128 / 100)
        .with_gas_limit(21_000);    // Change this value if you face gas related issues

    // Send the transaction and wait for the receipt.
    let pending_tx = provider.send_transaction(tx).await?;

    println!("Pending transaction... {}", pending_tx.tx_hash());

    // Wait for the transaction to be included.
    
    let receipt = pending_tx.get_receipt().await?;

    println!(
        "Transaction included in block {}",
        receipt.block_number.expect("Failed to get block number")
    );

    // assert_eq!(receipt.from, alice);
    // assert_eq!(receipt.to, Some(bob));

    Ok(())
}
```

- ERROR: deserialization error: missing field effectiveGasPrice at line 1 column 959
    - It's expected that you will encounter a missing `effectiveGasPrice` error. 
        - Kindly ignore above error. RSKj team is familiar with this error and fix would be part of new release. This error does not block the sending of a transaction. Transaction will be mined successfully. 

## Transfer ERC20 Token

This program setups up wallet with provider and sends RIF from one account to the other. Run this program using: `cargo run`.

Update the `rootstock-rs/src/main.rs` file with this program:

```rs
use alloy::{
    network::{EthereumWallet},
    primitives::{address, U256},
    providers::{Provider, ProviderBuilder},
    signers::local::PrivateKeySigner,
};
use eyre::Result;
use std::env;
use alloy::sol;

// Codegen from ABI file to interact with the contract.
// Make a abi directory in the root of the project and put RIF token abi in rif.json file.
 
sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    RIF,
    "abi/rif.json"
);

// See the contents of rootstock-rs/abi/rif.json file below.
/*
[ { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]
*/

#[tokio::main]
async fn main() -> eyre::Result<()> {
    // Get private key
    let mut pk = String::new();

    match env::var("PRIVATE_KEY") {
        Ok(value) => {
            pk.push_str(value.as_str());
        }
        Err(_e) => {
            panic!("Private key not setup");
        }
    }

    // Set up the HTTP transport which is consumed by the RPC client.
    let rpc_url = "https://rpc.testnet.rootstock.io/{YOUR_APIKEY}".parse()?;

    let signer: PrivateKeySigner = pk.parse().unwrap();

    let wallet = EthereumWallet::from(signer);

    // Create a provider with the HTTP transport using the `reqwest` crate.
    let provider = ProviderBuilder::new()
        .wallet(wallet)
        .on_http(rpc_url);

    // Address without 0x prefix
    let alice = address!("8F1C0185bB6276638774B9E94985d69D3CDB444a");

    let nonce = provider.get_transaction_count(alice).await?;
    let chain_id = provider.get_chain_id().await?;

    let contract = RIF::new(
        "0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE".parse()?,
        provider,
    );

    let RIF::balanceOfReturn { balance } = contract.balanceOf(alice).call().await?;

    println!("Rif balance: {:?}", balance);

    // Transfer
    let amount = U256::from(100);
    let receipt = contract
        .transfer(alice, amount)
        .chain_id(chain_id)
        .nonce(nonce)
        .gas_price(65_164_000) // gas price: provider.estimate_gas(&tx).await? * 1.1 as u128 / 100)
        .gas(25_000)  // Change this value according to tx type if you face gas related issues
        .send()
        .await?
        .get_receipt()
        .await?;

    println!("Send transaction: {}", receipt.transaction_hash);

    Ok(())
}
```

Run the below command to transfer an ERC20 Token:

```bash
cd rootstock-rs
PRIVATE_KEY=0x12... cargo run
```

> Note to replace `PRIVATE_KEY` with your private key in the command above to run this program.

For more details, see the [complete code example](https://alloy.rs/examples/transactions/transfer_erc20.html)

See [foundry](https://github.com/foundry-rs/foundry) codebase for more advanced usage of Rust and Alloy to interact with EVM compatible blockchains including Rootstock.

## Useful Resources

- [Alloy website](https://www.paradigm.xyz/oss/alloy)
- See [Alloy reference documentation](https://alloy.rs/index.html)
- Code examples using Alloy [visit this repo](https://github.com/alloy-rs/examples)
- Alloy GitHub [repo](https://github.com/alloy-rs)