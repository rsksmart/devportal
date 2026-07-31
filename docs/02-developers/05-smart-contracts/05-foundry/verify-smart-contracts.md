---
sidebar_label: Verify Smart Contract
sidebar_position: 105
title: Verify Smart Contract
description: "Learn how to verify your Rootstock smart contract using forge."
tags: [guides, developers, smart contracts, rsk, rootstock, foundry, dApps, verify]
---

In this section, you'll verify your `counter` smart contract on the Rootstock Explorer using Foundry, so the users of your dApp can see the actual code of your contract, confirm it doesn't have malicious code, and interact with it.

## Verify simple contract

After you have deployed your smart contract, you can verify it using Foundry with a simple command.

```bash
forge verify-contract \
    --chain-id 31 \
    --watch \
    --compiler-version v0.8.30 \
    --verifier custom \
    --verifier-url https://be.explorer.testnet.rootstock.io/api/v3/etherscan \
    0x499e802a6825d30482582d9b9dd669ba82ba8ba4 \
    src/Counter.sol:Counter
```

The verification will be executed, and you will receive the following response:

```bash
Start verifying contract `0x499e802a6825d30482582d9b9dd669ba82ba8ba4` deployed on rsk-testnet
Compiler version: v0.8.30
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

Then you can run the verification command passing the constructor argument as ABI encoded:

```bash
forge verify-contract \
    --constructor-args 0x00000000000000000000000000000000000000000000000000000000000003e8 \
    --chain-id 31 \
    --watch \
    --compiler-version v0.8.30 \
    --verifier custom \
    --verifier-url https://be.explorer.testnet.rootstock.io/api/v3/etherscan \
    0x499e802a6825d30482582d9b9dd669ba82ba8ba4 \
    src/Counter.sol:Counter
```

:::tip[Tip]
If you deployed with a script, you do not have to reconstruct the arguments from memory. Each entry in `transactions[]` of `broadcast/<script>.s.sol/<chainId>/run-latest.json` carries its own `arguments`, holding what was passed at deploy time — pick the transaction that created your contract. They are stored decoded, so run them through `cast abi-encode` before passing them to `--constructor-args`.
:::

## Verify a contract that uses libraries

`forge verify-contract` submits only the libraries in your Foundry configuration for that command — the `--libraries` flags you pass, plus any `libraries` entry in `foundry.toml`. It **never** reads your deploy's broadcast file or artifacts, even when your deploy script passed those same flags, so a contract that deployed fine will fail verification if a library is left out. The recompiled bytecode keeps unresolved placeholders where the missing library should be, and the comparison against the deployed bytecode fails.

Pass every deployed library, one flag each:

```bash
forge verify-contract \
    --chain-id 31 \
    --watch \
    --compiler-version v0.8.30 \
    --verifier custom \
    --verifier-url https://be.explorer.testnet.rootstock.io/api/v3/etherscan \
    --libraries src/libraries/MathLib.sol:MathLib:0x1111111111111111111111111111111111111111 \
    --libraries src/libraries/QuoteLib.sol:QuoteLib:0x2222222222222222222222222222222222222222 \
    <contract-address> \
    src/Vault.sol:Vault
```

The file part of each flag is the source path as the compiler sees it, after remappings. A library that comes from a dependency keeps the path inside that dependency, for example `node_modules/@scope/pkg/contracts/MathLib.sol:MathLib:0x…`.

The source of truth for library names and addresses is the top-level `libraries[]` array in `broadcast/<script>.s.sol/<chainId>/run-latest.json`. If you no longer have the broadcast file, the same linking is recorded as `metadata.settings.libraries` in the build artifact.

To see exactly which libraries your command ships before you submit it, dump the Standard JSON input and inspect `settings.libraries`:

```bash
forge verify-contract ... --show-standard-json-input > standard-input.json
```
