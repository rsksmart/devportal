---
sidebar_label: Smart Contract
sidebar_position: 103
title: Smart Contract
description: "Learn how to write a smart contract using Solidity and OpenZeppellin"
tags: [guides, developers, smart contracts, rsk, rootstock, hardhat, dApps, ethers]
---

## Folder Structure

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

## Demo smart contract
In the `src` folder, you will find a simple smart contract called `counter.sol`. Which contains a simple counter contract.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}
```

## Compile the Contract
To build the contract, run the following command in the project's root directory.

```bash
forge build
```

This will compile your smart contracts and generate `out` directory:

```bash
forge build
[⠊] Compiling...
[⠒] Compiling 36 files with Solc 0.8.24
[⠑] Solc 0.8.24 finished in 1.56s
Compiler run successful!
```
