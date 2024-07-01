---
menu_title: Getting started with Rootstock using Rust
title: 'Interact with Rootstock blockchain using Rust'
description: 'Rust is extensively getting used on backend side of many defi applications, dApps, developer tools, indexers and bridges. This guide will help developers to start using Rust on Rootstock blockchain.'
tags: knowledge-base, rust, rootstock, ethers, alloy-rs, tutorial, overview, guides, web3, bitcoin, rsk, peer-to-peer, blockchain
layout: 'rsk'
---

Rust is a powerful language with memory safety, performance and great community. Most of the blockchain nodes, indexers, defi projects are built using Rust making it most loved programming language by developers. 

This tutorial helps to get start on Rootstock using Rust by performing basic operations such as sending transactions and calling contracts by using alloy crate similiar to ethers. 

## Alloy Introduction
Alloy connects applications to blockchains. [alloy](https://github.com/alloy-rs/alloy) is a rewrite of [ethers-rs](https://github.com/gakonst/ethers-rs) from the ground up, with exciting new features, high performance, and excellent docs.

## Prerequisites
Install latest version of [Rust](https://www.rust-lang.org/tools/install). If you already have Rust installed, make sure to use the latest version or update using `rustup` toolchain. 

## Create a Rust project
Use cargo to create a starter project.

```bash
cargo new rootstock-rs

```

Next step is to update cargo.toml file with dependencies explained in next section.

## Setup Alloy 

To install [alloy](https://github.com/alloy-rs/alloy) run the following command in the root directory of the project:

```bash
cd rootstock-rs
cargo add alloy --git https://github.com/alloy-rs/alloy
```

Find more about alloy setup using meta crate [here](https://alloy.rs/getting-started/installation.html)

All the dependencies required for this tutorial are mentioned in below toml file. 

```bash
// Cargo.toml

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

## Disclaimer 
The types and import statements in [alloy](https://github.com/alloy-rs/alloy) dependencies are expected to change. If you face any type relelated errors while running the given examples in the tutorial, its recommended to check the [alloy](https://github.com/alloy-rs/alloy) repo and [documentation](https://alloy.rs/).

## Connect with Rootstock node
Connecting to a blockchain node requires a provider setup. [Provider](https://alloy-rs.github.io/alloy/alloy_provider/provider/trait/trait.Provider.html) is an abstraction of a connection to the Rootstock network, providing a concise, consistent interface to standard Ethereum node functionality. Run this program using: `cargo run`. 

Make sure to run the cargo command in the root of the project:

```bash
cd rootstock-rs
cargo run
```

Update the rootstock-rs/src/main.rs file with this program:

```rs
use alloy::providers::{ Provider, ProviderBuilder };
use eyre::Result;

#[tokio::main]
async fn main() -> eyre::Result<()> {
    // Set up the HTTP transport which is consumed by the RPC client.
    let rpc_url = "https://rpc.testnet.rootstock.io/API_KEY".parse()?;

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

## Get RBTC / RIF balance

After setting up the provider, interact with Rootstock node, fetch balance of an address or call a contract. See the below example code or run it using: `cargo run`.

Make sure to run the cargo command in the root of the project:

```bash
cd rootstock-rs
cargo run
```

Update the rootstock-rs/src/main.rs file with this program:

```rs 
use alloy::providers::{Provider, ProviderBuilder};
use alloy::sol;
use alloy::primitives::{ address, utils::format_units  };

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
    // Set up the HTTP transport which is consumed by the RPC client.
    let rpc_url = "https://rpc.testnet.rootstock.io/API_KEY".parse()?;

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

## Send a transaction

Following program sends tRBTC from one account to the other using TransactionRequest Builder. Running this program will require setting `PRIVATE_KEY` env variable and then run program using `cargo run` command.  


Make sure to run the cargo command in the root of the project:

```bash
cd rootstock-rs
PRIVATE_KEY=0x12... cargo run
```

Replace your private key in above command to run this program.

Update the rootstock-rs/src/main.rs file with this program:

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
    let rpc_url = "https://rpc.testnet.rootstock.io/API_KEY".parse()?;

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

Note: It's expected to that you will face missing `effectiveGasPrice` error. 

```bash
Error: deserialization error: missing field `effectiveGasPrice` at line 1 column 959
```

Ignore this error. Rskj team is familiar with this error and fix would be part of new release. This error does not block the sending of a transaction. Transaction will be mined successfully. 

## Transfer ERC20 Token

This program setups up wallet with provider and sends RIf from one account to the other. Run this program using: `cargo run`.

```bash
cd rootstock-rs
PRIVATE_KEY=0x12... cargo run
```

Replace your private key in above command to run this program.

Update the rootstock-rs/src/main.rs file with this program:

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
    let rpc_url = "https://rpc.testnet.rootstock.io/API_KEY".parse()?;

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

```

For more details see the complete example [here](https://alloy.rs/examples/transactions/transfer_erc20.html)


## Conclusion
Alloy serves as an entry point to connect with evm compatible blockchains. For example, Foundry is a tool written in Rust and uses Alloy as dependency to connect with blockchains. 

See [foundry](https://github.com/foundry-rs/foundry) codebase for more advanced usage of Rust and Alloy to interact with EVM compatible blockchains including Rootstock.

## Resources

- [Alloy website](https://www.paradigm.xyz/oss/alloy)
- See Alloy reference documentation [here](https://alloy.rs/index.html)
- To see more code examples using Alloy [see this repo](https://github.com/alloy-rs/examples)
- Alloy github [repo](https://github.com/alloy-rs)