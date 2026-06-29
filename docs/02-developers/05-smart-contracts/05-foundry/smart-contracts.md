---
sidebar_label: Smart Contract
sidebar_position: 103
title: Smart Contract
description: "Learn how to write a smart contract using Solidity and OpenZeppellin"
tags: [guides, developers, smart contracts, rsk, rootstock, hardhat, dApps, ethers]
remix_label: "Try in Remix IDE"
remix: "https://remix.ethereum.org/?#code=Ly8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IFVOTElDRU5TRUQKcHJhZ21hIHNvbGlkaXR5IF4wLjguMzA7Cgpjb250cmFjdCBDb3VudGVyIHsKICAgIHVpbnQyNTYgcHVibGljIG51bWJlcjsKCiAgICBmdW5jdGlvbiBzZXROdW1iZXIodWludDI1NiBuZXdOdW1iZXIpIHB1YmxpYyB7CiAgICAgICAgbnVtYmVyID0gbmV3TnVtYmVyOwogICAgfQoKICAgIGZ1bmN0aW9uIGluY3JlbWVudCgpIHB1YmxpYyB7CiAgICAgICAgbnVtYmVyKys7CiAgICB9Cn0%3D"
---

import CodeBlock from '@theme/CodeBlock';

export const counterSource = `// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.30;

contract Counter {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}`;

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

## Demo smart contract
In the `src` folder, you will find a simple smart contract called `counter.sol`. Which contains a simple counter contract.

<CodeBlock language="solidity">{counterSource}</CodeBlock>

:::info[Try this contract in Remix]
Want to deploy and interact with `Counter.sol` without any local setup? Use the button below to open it directly in the Remix IDE. You'll need MetaMask with [Rootstock Testnet configured](/dev-tools/wallets/metamask/) — see the full [Remix + Rootstock guide](/developers/quickstart/remix/) for the exact steps.

<RemixLaunchButton contractName="counter" code={counterSource} />
:::

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
