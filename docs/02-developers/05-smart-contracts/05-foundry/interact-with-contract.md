---
sidebar_label:  Interact with the Smart Contract
sidebar_position: 106
title:  Interact with the Smart Contract
description: "Learn how to interact with your smart contract using cast"
tags: [guides, developers, smart contracts, rsk, rootstock, hardhat, dApps, ethers]
---


Interacting with a smart contract is a crucial part of the development process. Here, we'll focus on using `cast`, a command-line tool that allows you to interact with your smart contract.

## Interacting with the Contract
If the contract is already deployed, then you can interact with it using `cast` this command allows you to interact with the contract, in this case, read the value of the counter.

### Reading the Value of the counter

In your terminal, run the following command, replacing the placeholders with your values:

```bash
cast call <CONTRACT_ADDRESS> "number()(uint256)" --rpc-url $ROOTSTOCK_RPC_URL
```

The result should look like this:

```bash
0
```

> Using cast call to retrieve the current value of the counter does not use any gas since it does not
involve a change in state.

### Incrementing the Counter

To increment the counter, you’ll need to send a transaction to call the `increment()` function.
This is a state-changing operation, so it requires gas and must be signed with a private key.

Run the following command in your terminal:

```bash
cast send 0xdD5a630e078eA5aF5756447e95dd7945AD20F5eE "increment()" \
  --private-key $PRIVATE_KEY \
  --rpc-url $ROOTSTOCK_RPC_URL \
  --legacy
```

Once the transaction is confirmed, the counter will be incremented.
To verify, [read the value of the counter](#reading-the-value-of-the-counter) again.

This time, you should see the result:

```bash
1
```
