---
sidebar_label: Write a Smart Contract
sidebar_position: 103
title: Write a Smart Contract
description: "Learn how to write a smart contract using Solidity and OpenZeppellin"
tags: [getting-started, guide, smart contracts, rsk, rootstock, hardhat, blockchain]
---

In this section, we'll learn how to write a smart contract using the [OpenZeppelin library](https://www.openzeppelin.com/contracts) and Solidity. OpenZeppelin is widely used for its secure, community-vetted, and standardized codebase, which simplifies developing robust and secure smart contracts.

## Create a Smart Contract

### Step 1: Install OpenZeppelin Contracts

Run the following command to install the OpenZeppelin's library of reusable smart contracts.

```shell
    npm install @openzeppelin/contracts
```

#### Step 2: Create a Token Contract

- Navigate to the `contracts` directory in the root directory of quick start project:

```shell
    cd contracts
```

- In the contracts directory, open the `MyToken.sol` file for your token contract:
    
To configure an ERC20 token, copy the code snippet below and paste it in your token file or view the complete [`MyToken.sol` file](https://raw.githubusercontent.com/rsksmart/rootstock-quick-start-guide/feat/complete/contracts/MyToken.sol) on GitHub.
        
```shell
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

    contract MyToken is ERC20 {
        constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
            _mint(msg.sender, initialSupply);
        }
    }
```

This contract defines an `ERC20` token named `MyToken` with the symbol `MTK`, using OpenZeppelin's ERC20 standard implementation.

## Compile the Contract

To build the contract, run the following command in the project's root directory.

```shell
npx hardhat compile
```

This will compile your smart contracts and generate artifacts:

```shell
% npx hardhat compile
Downloading compiler 0.8.20
Compiled 6 Solidity files successfully (evm target: paris).
```

---

## Next

- [Test your Smart Contract](developers/smart-contracts/hardhat/test-smart-contract/) to ensure it's working as expected.
