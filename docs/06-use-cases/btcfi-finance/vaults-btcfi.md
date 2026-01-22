---
sidebar_position: 3
sidebar_label: ERC-4626 Vaults
title: Implementing an ERC-4626 Tokenized Vault on Rootstock
description: "A technical guide to building standardized, yield-bearing vaults for rBTC." 
tags: [btcfi, vaults, erc-4626, finance]
---

# Implementing an ERC-4626 Tokenized Vault

The ERC-4626 standard provides a unified API for tokenized yield-bearing vaults. On Rootstock, implementing this standard allows your vault to be instantly compatible with yield aggregators, lending protocols, and institutional dashboards.

## Prerequisites

* **Foundry:** Installed on your local machine.
* **Wallet:** A Rootstock Testnet account with a small amount of **t-rBTC**.
* **EVM Familiarity:** Basic understanding of Solidity and ERC-20 standards.

## Getting Started

### 1. Initialize the Project
Set up your development environment and install the OpenZeppelin contracts library.

```bash
forge init rbtc-vault && cd rbtc-vault
forge install OpenZeppelin/openzeppelin-contracts
```

### 2. The Vault Implementation
Create a new file src/RootstockVault.sol. This vault accepts rBTC as the underlying asset and issues "v-rBTC" (Vault rBTC) shares to represent the user's position.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";

/**
 * @title RootstockVault
 * @dev Implementation of a yield-bearing vault for native rBTC.
 */
contract RootstockVault is ERC4626 {
    constructor(IERC20 asset) 
        ERC4626(asset) 
        ERC20("Vault rBTC", "v-rBTC") 
    {}

    // Logic for yield generation would be integrated here
}
```

### 3. Deployment
Deploy the vault to the Rootstock Testnet. Replace YOUR_KEY with your private key and `ASSET_ADDRESS` with the rBTC wrapper address.

```bash
forge create --rpc-url [https://public-node.testnet.rsk.co](https://public-node.testnet.rsk.co) \
--private-key YOUR_KEY \
src/RootstockVault.sol:RootstockVault \
--constructor-args YOUR_ASSET_ADDRESS
```

## Troubleshooting
- Inaccurate Share Calculation: Ensure your vault accounts for "dust" when calculating exchange rates between the asset and shares.

- Gas Limits: While Rootstock is EVM-compatible, complex yield logic inside the deposit function may require higher gas limits during high congestion.

## Related Use Cases or Resources

- Vaults SDK Documentation

- Institutional Integration Hub

- Managing ERC-20 Assets