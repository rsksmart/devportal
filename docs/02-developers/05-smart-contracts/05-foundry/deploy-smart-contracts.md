---
sidebar_label: Deploy Smart Contract
sidebar_position: 105
title: Deploy Smart Contract
description: "Learn how to deploy your Rootstock smart contract using forge."
tags: [guides, developers, smart contracts, rsk, rootstock, foundry, dApps]
---

In this section, you'll deploy a `counter` smart contract to the Rootstock network using Foundry.

## Step 1: Deployment Script
You will see a directory called `deploy` in the root of your project. This is where you can view/write your deployment scripts. The demo `counter.sol` comes with a deployment script `counter.s.sol`, which contains:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";

contract CounterScript is Script {
  function setUp() public {}

  function run() public {
    vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

    new Counter();

    vm.stopBroadcast();
  }
}
```
## Step 2: Deploy Your Contract on Rootstock Network
Run the following command, replacing `https://public-node.testnet.rsk.co` with either `rskTestnet` or `rskMainnet` rpc url if you have, depending on your desired deployment environment:

```bash
forge script script/Deploy.s.sol --rpc-url https://public-node.testnet.rsk.co --broadcast --legacy
```
:::info[Info]

- [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) is not supported or not activated on the Rootstock RPC url
- The `--legacy` flag is passed to use legacy transactions instead of `EIP-1559`.
- You can remove the `--broadcast` flag if you wan to simulate the transaction without broadcasting it.
:::

> If you get an error like `Transaction dropped from the mempool: <tx-id>` or the ```transaction not completed```, check the tx-id in the explorer. The tx may have went successful but the error is still in the logs. Here are the [mainnet](https://explorer.rootstock.io/) and [testnet](https://explorer.testnet.rootstock.io/) explorers.

> Also you can see the transaction registry locally, by checking the folder ```broadcast/Counter.s.sol/``` and opening the file called ```run-latest.json```, if you check the fields, there is one called ```contractAddress``` which contains the new address deployed for our ERC20 smart contract.

The result in the console should look like this:
```bash
Sending transactions [0 - 0].
⠁ [00:00:00] [###############################################################################################################################################] 1/1 txes (0.0s)##
Waiting for receipts.
⠉ [00:00:25] [###########################################################################################################################################] 1/1 receipts (0.0s)
##### 31
✅  [Success]Hash: 0x48ea2b06b39cd436a2d7564e20ea5bb598ddc2769e6b18c855170f0e9e4d5687
Contract Address: 0x499e802a6825d30482582d9b9dd669ba82ba8ba4
Block: 5071408
Gas Used: 106719

==========================

ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.
Total Paid: 0. ETH (106719 gas * avg 0 gwei)
```
