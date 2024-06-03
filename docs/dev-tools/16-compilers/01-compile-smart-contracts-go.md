---
sidebar_label: GO
layout: rsk
title: "Compiling Smart Contracts in Go: Developer Insights on Rootstock (RSK)"
description: "Learn how to interact with a Smart Contract in a Go application"
tags: [go, rif, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto]
---

> Instructions valid for Ubuntu
> - In order to interact with a Smart Contract in a Go application, the ABI ([application binary interface](https://solidity.readthedocs.io/en/latest/abi-spec.html)) of the contract must first be generated, and then compiled so that it can be imported in said application.

## 1. Prerequisites
### 1.1 Solidity compiler
Also known as `solc`, follow the instructions [here](https://solidity.readthedocs.io/en/latest/installing-solidity.html) to install it.

### 1.2 `abigen`
This is the tool used to generate the `.go` files with the contract ABI as input.

### 1.2.1 `protoc` tool (dependency)
Check [latest](https://github.com/protocolbuffers/protobuf/releases) stable version and replace `PROTOC_ZIP` accordingly.
```
PROTOC_ZIP=protoc-x.x.x-linux-x86_64.zip
curl -OL https://github.com/google/protobuf/releases/download/vx.x.x/$PROTOC_ZIP
sudo unzip -o $PROTOC_ZIP -d /usr/local bin/protoc
sudo unzip -o $PROTOC_ZIP -d /usr/local include/*
rm -f $PROTOC_ZIP
```

### 1.2.2 `abigen` tool
Install `abigen` by doing:
```sh
go get -u github.com/ethereum/go-ethereum
cd $GOPATH/src/github.com/ethereum/go-ethereum/
make
make devtools
```
### 1.3 ABI file
Save the Smart Contract ABI to your local drive and keep the location at hand.

If you do not have an ABI, you can generate one from the contract replacing the `.sol` file with your own smart contract filename:
```sh
solc --abi Contract.sol -o build
```
For this example, the resulting file will be `./build/Contract.abi`.

## 2. Compilation
To convert the ABI into a Go file, execute the following command:
```sh
abigen --abi=./build/Contract.abi --pkg=mypackage --out=Contract.go
```
Replace the contract and package names with your own.

## Example
In this fashion, the [RNS Resolver](https://github.com/rnsdomains/rns-go-lib/tree/master/resolver/multi_chain_resolver) was compiled by doing:
```sh
abigen --abi=MultiChainResolverABI.json --pkg=multichainresolver --out=multi_chain_resolver.go
```
and then imported to and used in the `rns-go-lib` project.

------

_Guide based on [Smart Contract Compilation & ABI](https://goethereumbook.org/en/smart-contract-compile/) by Miguel Mota._