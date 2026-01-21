---
sidebar_position: 2
sidebar_label: Launching a Token
title: Launching a Custom RRC-20 Token on Rootstock
description: "A developer guide for deploying and managing fungible tokens using the RRC-20 standard." 
tags: [payments, tokens, rrc-20, smart-contracts]
---

# Launching a Custom RRC-20 Token

The RRC-20 standard is Rootstock's implementation of the ERC-20 standard. Because Rootstock is fully EVM-compatible, you can use the same Solidity code and tools (Hardhat, Foundry, Remix) to launch tokens that benefit from Bitcoin's security and Rootstock's low transaction costs.

## Prerequisites

* **Development Framework:** Hardhat or Foundry installed locally.
* **Testnet Funds:** Obtain **t-rBTC** from the [Rootstock Faucet](https://faucet.rootstock.io/).
* **OpenZeppelin Contracts:** We use these industry-standard libraries for security.

## Getting Started

### 1. Project Initialization
Set up your workspace and install the OpenZeppelin dependency.

```bash
mkdir rrc20-token && cd rrc20-token
npm init -y
npm install --save-dev hardhat @openzeppelin/contracts
npx hardhat init # Choose "Create a TypeScript project"
```

### 2. Write the Token Contract
Create `contracts/MyToken.sol`. This example features a fixed-supply token that is minted entirely to the deployer's address.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Rootstock Asset", "RSA") {
        _mint(msg.sender, initialSupply * (10 ** decimals()));
    }
}
```

### 3. Deploy to Testnet
Configure your `hardhat.config.ts` with the Rootstock Testnet RPC (https://public-node.testnet.rsk.co) and run the deployment script.

```bash
npx hardhat ignition deploy ./ignition/modules/TokenModule.ts --network rskTestnet
```

## Troubleshooting
- Verification Failed: If you cannot verify your contract on the explorer, ensure the Solidity compiler version in your config exactly matches the one used during deployment.

- Insufficient Gas: If transactions fail, manually set your gas price to at least 0.06 Gwei, which is the current minimum for the Rootstock network.

## Related Use Cases or Resources
- Rootstock Explorer (Token Tracker)

- Building a Crowdfunding App

- Institutional Governance with stRIF