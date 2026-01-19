---
sidebar_label: Verify Smart Contract
sidebar_position: 105
title: Verify Smart Contract
description: "Learn how to verify your Rootstock smart contract using forge."
tags: [guides, developers, smart contracts, rsk, rootstock, foundry, dApps, verify]
---

In this section, you'll verify your `counter` smart contract to the Rootstock Explorer using Foundry, so the users of you dApp can be able to see the actual code of your contract to analyze that it doesn't have malicious code, and they can also interact with it.

## Verify simple contract

After you have deployed your smart contract, you can verify it using Foundry with a simple command.

```bash
forge verify-contract \
    --chain-id 31 \
    --watch \
    --compiler-version v0.8.24 \
    --verifier custom \
    --verifier-url https://be.explorer.testnet.rootstock.io/api/v3/etherscan \
    0x499e802a6825d30482582d9b9dd669ba82ba8ba4 \
    src/Counter.sol:Counter
```

The verification will be executed, and you will receive the following response:

```bash
Start verifying contract `0x499e802a6825d30482582d9b9dd669ba82ba8ba4` deployed on rsk-testnet
Compiler version: v0.8.28
Optimizations:    0

Submitting verification for [src/Counter.sol:Counter] 0x499e802a6825d30482582d9b9dd669ba82ba8ba4.
Submitted contract for verification:
	Response: `OK`
	GUID: `72f0b154-6d94-40bc-bf7d-61b3b266ed5b`
	URL: https://be.explorer.testnet.rootstock.io/api/v3/etherscan/address/0x499e802a6825d30482582d9b9dd669ba82ba8ba4
Contract verification status:
Response: `NOTOK`
Details: `Pending in queue`
Warning: Verification is still pending...; waiting 15 seconds before trying again (7 tries remaining)
Contract verification status:
Response: `OK`
Details: `Pass - Verified`
Contract successfully verified
```

## Verify with constructor arguments

If your contract has constructor arguments, you must pass them in order to successfully verify it. Foundry accepts the constructor arguments as ABI encoded.

For that, you can use the [cast abi-encode](https://getfoundry.sh/cast/reference/abi-encode/) foundry tool.

As an example, for a contract that has a constructor argument like `constructor(uint256 initialSupply)`, initialized with the value of `1000` at the contract deploy, you can execute the following command:

```bash
cast abi-encode "constructor(uint)" 1000
```

result:

```bash
0x00000000000000000000000000000000000000000000000000000000000003e8
```

And, then, you can run the verification command passing the constructor argment as ABI encoded:

```bash
forge verify-contract \
    --constructor-args 0x00000000000000000000000000000000000000000000000000000000000003e8
    --chain-id 31 \
    --watch \
    --compiler-version v0.8.24 \
    --verifier custom \
    --verifier-url https://be.explorer.testnet.rootstock.io/api/v3/etherscan \
    0x499e802a6825d30482582d9b9dd669ba82ba8ba4 \
    src/Counter.sol:Counter
```