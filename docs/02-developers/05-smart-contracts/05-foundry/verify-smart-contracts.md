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

## Verifying a project that compiles with via-IR

With `via_ir = true`, Solc output for a contract depends on which other sources were in the compilation unit, not only on the contract and its imports. `forge verify-contract` submits just the target's import closure, which is a smaller set than the one your deploy compiled, so the recompiled bytecode can differ.

Run the plain command first. On the project this guidance comes from, thirteen of the fourteen deployed contracts verified with it, and the one that failed was the largest. If it comes back as a bytecode mismatch and your project sets `via_ir = true`, use the build-info path below. The outcome is deterministic for a given source tree: once it fails, it keeps failing until the input changes.

### Verifying a contract that is already deployed

The compilation unit it was deployed from is the one input guaranteed to reproduce its bytecode, so recover that from the build info of the deploy. If you archived that file, use it. Otherwise check out the exact commit you deployed and rebuild, because a source added or removed since the deploy can change the via-IR output:

```bash
forge build --build-info
```

```bash
grep -l '"src/Vault.sol"' out/build-info/*.json
```

Pick the file that holds your target — the command above finds it — because a project can accumulate several. Then extract the input, dropping `test/` and `script/` so the submission fits the explorer's budget. That is a trim to verify, not to assume: under via-IR even a source your contract never imports can change the output, so confirm the digest still matches before you submit.

```bash
jq '.input | {language, sources: (.sources | with_entries(select((.key | startswith("test/")) or (.key | startswith("script/")) | not))), settings}' out/build-info/<hash>.json > standard-input.json
```

Standard JSON accepts only `language`, `sources`, and `settings`, which is why the filter names them; Foundry's build info also keeps `allowPaths`, `basePath`, `includePaths`, and `version` under `.input` for its own use.

The trim is part of the recipe, not a fallback: the Rootstock Explorer caps a Standard JSON submission at 100 sources and 1.5 MiB (1,572,864 bytes) of source content by default, and over either limit it returns `SOURCE_BUDGET_EXCEEDED` instead of compiling. The build this guidance comes from is 127 sources and 1,694,332 bytes; dropping `test/` and `script/` brings it to 77 sources and 1,209,091 bytes.

Submit `standard-input.json` through the **Standard JSON Input** method on the [Rootstock Explorer](/developers/smart-contracts/verify-smart-contracts/rootstock-explorer/).

:::warning[Re-check the bytecode after every change to the source set]
Under via-IR, changing which sources are in the input changes the compiled output — in both directions. Adding a source the contract never imports can break an input that matched, and an input less than half the size can still match. There is no size rule and no safe direction.

So after every change, recompile and compare against a build you know matches your deploy. No RPC needed:

```bash
jq -r '.output.contracts["src/Vault.sol"].Vault.evm.bytecode.object' out/build-info/<hash>.json | shasum -a 256
```

```bash
solc --standard-json standard-input.json > recompiled.json
jq -r '.errors // [] | map(select(.severity == "error")) | length' recompiled.json
jq -r '.contracts["src/Vault.sol"].Vault.evm.bytecode.object' recompiled.json | shasum -a 256
```

Use the Solc version your deploy used — `solcVersion` in the same build-info file, or the full `metadata.compiler.version` from the artifact — because a different compiler changes the digest on its own. Check the error count first: if the compile failed, `jq` prints `null` and you would be digesting that string rather than any bytecode.

The two digests must be equal; if they differ, put the sources back. Note that `standard-input.json` holds only `language`, `sources`, and `settings` — there is no bytecode inside it to read — and `cast code` returns runtime bytecode, not the creation bytecode these fields hold.
:::

### Keeping the next deployment verifiable

Redeploying a live contract from a smaller tree is not an option, since its address and state are already in use. What you can do is make the *next* deployment easy to verify: put the filters on the command that compiles your deploy, and keep the build info that run writes.

```bash
forge script script/Deploy.s.sol --rpc-url <rpc-url> --broadcast --build-info --skip 'test/**'
```

`--skip` and `--build-info` are accepted by `forge build`, `forge script`, and `forge create`. Two rules go with them:

- **Use globs, not the bare aliases.** `--skip` filters which files are compiled as *targets*, not which files end up in the compilation unit — anything a surviving target imports is pulled back in. The `test` and `script` aliases match only `.t.sol` and `.s.sol`, so a helper like `test/BaseTest.sol` stays in the build and drags its own imports back with it. On the project this guidance comes from, of 127 sources the aliases left 96, `'test/**'` left 83, and `'test/**' 'script/**'` — which you can pass to `forge build` but not to the deploy command — left 55.
- **Never pass `--skip script` to `forge script`.** It skips the script you are running and the run stops with `Could not find target contract`.

Keeping via-IR off is the other pre-deployment option, and it removes the failure mode rather than working around it: legacy codegen is not sensitive to the source set. That is a decision about your contracts, not about verification — via-IR exists to compile code that legacy codegen cannot.

:::tip[Archive the build info]
Keep the `out/build-info/<hash>.json` your deploy wrote with your deployment records, and keep it **outside** `out/` — `forge build --force` clears the artifacts folder. It is the input that reproduces the deployed bytecode exactly. Without it you are rebuilding from the commit you deployed, where anything added or removed since then can change the via-IR output. If the code body does reproduce, a metadata footer that differs by the same length still verifies on the Rootstock Explorer, though some other explorers record that as a partial match.
:::
