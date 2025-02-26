---
sidebar_label:  Interact with the Smart Contract
sidebar_position: 106
title:  Interact with the Smart Contract
description: "Learn how to interact with your smart contract using cast"
tags: [guides, developers, smart contracts, rsk, rootstock, hardhat, dApps, ethers]
---


Interacting with a smart contract is a crucial part of the development process. Here, we'll focus on using `cast`, a command-line tool that allows you to interact with your smart contract.

## Interacting with the Contract
If the contract is already deployed, then you can interact with it using ```cast``` this command allows you to interact with the contract, in this case, read the balance of an account.

### Reading the Balance of an Account
In your terminal, run the following command, replacing the placeholders with actual values:

```bash
cast call <contract_address> "balanceOf(address)(uint256)" <wallet_address> --rpc-url <rpc_url>
```
The result should look like this:
```bash
1000000000000000000000 [1e21]
```
