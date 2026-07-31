---
sidebar_label: Verify a Smart Contract using the Rootstock Explorer
sidebar_position: 107
title: Verify a Smart Contract using the Rootstock Explorer
description: "How to Verify a Smart Contract on the Rootstock Explorer"
tags: [Explorer, tutorial, developers, quick starts, rsk, rootstock]
---

Contract verification is essential in the Rootstock ecosystem. It allows Rootstock Explorer users to inspect and validate the source code of deployed smart contracts.

The Rootstock Explorer provides a transparent view of the Rootstock blockchain, showing transactions, blocks, and deployed contracts. This transparency, enabled by verification, builds trust and understanding in decentralized applications.

:::tip[Tip]
See [Rootstock Explorer guides](/dev-tools/explorers/rootstock-explorer/) to navigate the explorer and submit dApps.
:::

**Key reasons for verifying a smart contract**

- **Builds trust**:
  - Verification allows anyone to see the source code of a deployed smart contract, which fosters trust with users and the community.
- **Increases transparency**:
  - Users can audit the code to confirm it performs the actions it claims to, providing confidence in the contract's operations.
- **Aids in security**:
  - By making the code public, it can be reviewed for vulnerabilities, though users should still conduct their own security assessments.
- **Enables proper tooling**:
  - Many development and analysis tools, such as those from Tenderly, require the contract's source code to be verified to function correctly.
- **Provides public interaction**:
  - Verification allows users to interact with the contract on the Rootstock Explorer.
- **Confirms code integrity**:
  - The verification process proves that the bytecode on the blockchain was generated from a specific, known source code, ensuring the contract hasn't been tampered with.
- **Helps with compliance**:
  - Verification is essential for meeting certain compliance and regulatory requirements.

## What does verification do?

- Adds a Verified badge to the contract page, confirming that the published source code matches the deployed bytecode.
- Enables human-readable interaction with the contract. It allows users to view and call its functions directly.
- Allows downloading the contract's Application Binary Interface (ABI).

## Prerequisites

- Address of the deployed contract on Rootstock.
- Complete source code of the contract.
- Compiler details:
  - Solc (Solidity Compiler) version.
  - Number of optimization runs.
- Constructor parameters (if applicable).
- Library addresses (if used).

## Getting Started

- To start the verification process, visit the [Rootstock Explorer Testnet](https://explorer.testnet.rootstock.io/) or [Rootstock Explorer Mainnet](https://explorer.rootstock.io/), and find your contract using the search field.

![init](/img/developers/smart-contracts/rsk-explorer/init.png)

- Once you reach your contract's address view, navigate to the "Contract" tab and click the "Verify Contract" button.

![verify](/img/developers/smart-contracts/rsk-explorer/verify-btn.png)

## Choosing a Verification Method

Rootstock Explorer offers 5 main methods for contract verification:

### 1. Single File

The Solidity (**Single File**) method is intended for verifying contracts that exist entirely within a single `.sol` file, or where the developer has already flattened all imports into one file. This method recompiles the provided contract and compares the resulting bytecode to the deployed contract on Rootstock.

Follow the steps below to successfully complete the verification process.

- Select Solidity **(Single File)** Method:
  ![single](/img/developers/smart-contracts/rsk-explorer/single.png)

- **Solc Version**: Choose the Solc version you used to compile your contract.
  ![version](/img/developers/smart-contracts/rsk-explorer/solc-version.png)

- **EVM Version**: Choose the appropriate EVM version.
  ![evm](/img/developers/smart-contracts/rsk-explorer/evm.png)

- **Optimization**: `Runs` tells the Solidity optimizer how many times your contract will be executed. You must use the same runs value in verification that you used when compiling.
  - If you used optimization run when compiling/deploying, enable it during verification and set the same runs (default 200).
  - If you didn't use optimization, leave it disabled and don't enter any runs.

  ![runs](/img/developers/smart-contracts/rsk-explorer/runs.png)

- **Contract Name**: Enter the exact name of the contract you deployed. This is required so the verifier can match the correct bytecode.
  ![name](/img/developers/smart-contracts/rsk-explorer/contract-name.png)

- **Paste/Upload source code**: Provide the full Solidity source file.

  You may choose between:
  - **Paste code**: Paste the raw contract source code into the field. This must be the exact source used during deployment.
    ![code](/img/developers/smart-contracts/rsk-explorer/code.png)

  - **Upload file**: Upload a `.sol` file directly from your computer.
    ![sol](/img/developers/smart-contracts/rsk-explorer/sol.png)

- **Constructor Arguments**: You must enter constructor arguments separated by commas if you have more than one.
  - Suppose your Solidity constructor looks like this:

  ```solidity
  constructor(address owner, uint256 maxSupply)
  ```

  - To verify the contract, enter the arguments like this:

  ```text
  0xACa52b1Ab7dA04532127d22D47Dc3d34CFe0Cd5e,1000
  ```

  Example:
  ![args](/img/developers/smart-contracts/rsk-explorer/args.png)
  - If you already have them in ABI-encoded format, enable the "ABI encoded" checkbox and paste the encoded string instead.

  ![encoded](/img/developers/smart-contracts/rsk-explorer/encoded.png)

- How to encode arguments:
  - ABI-ENCODING with Ethers.js

  ```ts
  import { AbiCoder } from "ethers";

  const coder = AbiCoder.defaultAbiCoder();

  const encoded = coder.encode(
    ["address", "uint256"],
    ["0xaca52b1ab7da04532127d22d47dc3d34cfe0cd5e", "1000"],
  );

  console.log(encoded);
  ```

  Result:

  ```text
  0x000000000000000000000000aca52b1ab7da04532127d22d47dc3d34cfe0cd5e00000000000000000000000000000000000000000000000000000000000003e8
  ```

  - ABI-ENCODING from Remix:
    - Open the Remix console
    - Paste the following into the console:

  ```js
  web3.eth.abi.encodeParameters(
    ["address", "uint256"],
    ["0xaca52b1ab7da04532127d22d47dc3d34cfe0cd5e", "1000"],
  );
  ```

  Result:

  ```text
  0x000000000000000000000000aca52b1ab7da04532127d22d47dc3d34cfe0cd5e00000000000000000000000000000000000000000000000000000000000003e8
  ```

  - ABI-ENCODING with Foundry (cast):

  ```bash
  cast abi-encode "constructor(address,uint256)" \
      0xaca52b1ab7da04532127d22d47dc3d34cfe0cd5e 1000
  ```

  Result:

  ```text
  0x000000000000000000000000aca52b1ab7da04532127d22d47dc3d34cfe0cd5e00000000000000000000000000000000000000000000000000000000000003e8
  ```

- **Libraries**: If your contract links external libraries add each required library.

  Provide:
  - Library Name.
  - Library Contract Address (the address where the library was deployed).

  This step is required only if the compiled bytecode contains libraries.

![lib](/img/developers/smart-contracts/rsk-explorer/lib.png)

### 2. Multiple Files

The Solidity (**Multiple Files**) method is designed for more complex contracts that use imports, have multiple `.sol` files, or cannot be flattened safely. This method allows you to upload all your Solidity source files exactly as they exist in your project.

Only the parts that differ from **Single File** are described below.

- **Source Files**: Upload all Solidity files required to compile your contract, preserving the original folder structure.

You can:

- Drag and drop multiple `.sol` files.
- Upload an entire folder containing your contracts.
- Combine both approaches if needed.

Important rules:

- Every imported file must be included.
- Filenames must match exactly (case-sensitive).
- Folder structure should reflect your project layout.
- Do not flatten the files. This method expects multi-file compilation.

During verification, the explorer will reconstruct the compilation environment using the files you provide.

![multiple](/img/developers/smart-contracts/rsk-explorer/multiple.png)

- **Other Settings**:
  All other fields (compiler version, EVM version, optimization, contract name, constructor arguments, libraries) work exactly the same as described in the **Single File** section.

### 3. Standard JSON

The **Standard JSON** Input method is the most reliable and exact verification approach. It reproduces the full Solidity compiler configuration used during deployment by providing a complete standard-json object, exactly as consumed by `solc --standard-json`.

This method is strongly recommended for:

- Projects compiled with Hardhat, Foundry, Truffle, or custom build scripts.
- Contracts with complex dependency structures.
- Projects where preserving metadata (AST, settings, compiler options) is essential.
- Ensuring a byte-for-byte deterministic match with the deployed bytecode.

![json](/img/developers/smart-contracts/rsk-explorer/json.png)

- **Other Settings**: All other fields (compiler version, optimization, contract name, constructor arguments, libraries) work exactly the same as described in the **Single File** section.

**How to Generate Standard JSON Input**

**Hardhat**:

```bash
npx hardhat compile --show-stack-traces
```

Then locate the Hardhat build-info file under `artifacts/build-info/*.json`; this file contains the Standard JSON compiler input in its `input` field.

- How to Extract the Standard JSON Input:

  After generating the file from Hardhat:
  - Open the JSON file that was produced.
  - Inside it, locate the field named "input".
  - Copy everything inside the input object. This is the actual Standard JSON Input expected by the verifier.
  - Paste it into a new file, and save it using the contract's name.
  - Your file should look similar to the following structure:

```json
{
  "language": "Solidity",
  "sources": {
    "Token.sol": {
      "content": "..."
    },
    "PriceFeed.sol": {
      "content": "..."
    },
    "Vault.sol": {
      "content": "..."
    }
  },
  "settings": {
    "optimizer": {
      "enabled": false,
      "runs": 200
    },
    "outputSelection": {
      "*": {
        "": ["ast"],
        "*": [
          "abi",
          "metadata",
          "devdoc",
          "userdoc",
          "storageLayout",
          "evm.legacyAssembly",
          "evm.bytecode",
          "evm.deployedBytecode",
          "evm.methodIdentifiers",
          "evm.gasEstimates",
          "evm.assembly"
        ]
      }
    },
    "remappings": [],
    "evmVersion": "london"
  }
}
```

**Foundry**:

```bash
forge verify-contract \
    --chain-id 31 \
    --watch \
    --compiler-version <compiler-version> \
    --show-standard-json-input \
    <contract-address> \
    <contract-file>:<contract-name> \
    > <contract-name>.json
```

Replace:

- `<contract-address>` → the deployed contract address.
- `<contract-file>` → path to the Solidity file inside your project.
- `<contract-name>` → name of the contract inside that file.
- `<compiler-version>` → the Solidity compiler version used to compile and deploy the contract (for example, `v0.8.28`).

> The `> <contract-name>.json` at the end of the command redirects the Standard JSON input output into a file in the current directory, which can then be uploaded as-is to the Rootstock Explorer verification tool.

If your contract links external libraries, add one `--libraries` flag per library so they are written into `settings.libraries` of the generated JSON:

```bash
--libraries <library-file>:<library-name>:<library-address>
```

### 4. Hardhat Verification

Select Hardhat as your verification method to verify contracts directly from your Hardhat project. This method does not require uploading files through the interface. Instead, verification is performed using the Hardhat CLI.

![hardhat](/img/developers/smart-contracts/rsk-explorer/hardhat.png)

Copy the configuration snippet into your `hardhat.config.ts` file.

This snippet includes:

- The Hardhat Verify plugin
- Rootstock Testnet/Mainnet RPC URLs
- Chain IDs
- Account setup for signing requests

Make sure your `PRIVATE_KEY` is defined in your `.env` file.

Run the verification command in the terminal:

```bash
npx hardhat verify \
    --network rootstockTestnet \
    <contract-address> \
    [constructor-args]
```

Replace:

- `<contract-address>` with your deployed contract address
- `[constructor-args]` with constructor parameters (if any)

> Once it completes successfully, your contract will be verified on the Rootstock Explorer.

For a detailed walkthrough, see [Verify Smart Contracts using the Hardhat Verify Plugin](/developers/smart-contracts/verify-smart-contracts/hardhat-verify-plugin/).

### 5. Foundry Verification

Select **Foundry** as your verification method to verify contracts using the forge verify-contract command.

This method integrates Foundry directly with the Rootstock Explorer's verification API, allowing you to verify a deployed contract from your local environment.

Run the verification command in the terminal:

```bash
forge verify-contract \
    --chain-id 31 \
    --watch \
    --compiler-version <compiler-version> \
    --verifier custom \
    --verifier-url https://be.explorer.testnet.rootstock.io/api/v3/etherscan \
    <contract-address> \
    <contract-file>:<contract-name>
```

Replace:

- `<contract-address>` → the deployed contract address.
- `<contract-file>` → path to the Solidity file inside your project.
- `<contract-name>` → name of the contract inside that file.
- `<compiler-version>` → the Solidity compiler version used to compile and deploy the contract (for example, `v0.8.28`).

If your contract links external libraries, add one `--libraries` flag per library. Verification does not reuse the linking from your deploy, so each library has to be named again:

```bash
--libraries <library-file>:<library-name>:<library-address>
```

Once the command finishes, your contract will appear as Verified on the Rootstock Explorer.

For a detailed walkthrough, see [Verify Smart Contracts using Foundry](/developers/smart-contracts/foundry/verify-smart-contracts/).

## Submit and Validate

Once you have entered all the details, click "Verify Contract".

- **Expected statuses**: The verification status will change from "Pending" to "Success" or "Failure".
- **On successful status**:

  a. You will see the `Verified` badge on the contract page.
  ![verified](/img/developers/smart-contracts/rsk-explorer/verified.png)

  b. Source code tabs will be visible.
  ![tabs](/img/developers/smart-contracts/rsk-explorer/tabs.png)

  c. You will be able to download the contract ABI.
  ![abi](/img/developers/smart-contracts/rsk-explorer/abi.png)

  d. Contract read and write panels will be available.
  - **Read Methods**:
    ![contract-interaction](/img/developers/smart-contracts/rsk-explorer/contract-interaction.png)
  - **Write Methods**:
    ![write](/img/developers/smart-contracts/rsk-explorer/write.png)

## Troubleshooting

Verification compares the bytecode the explorer recompiles against the bytecode on chain. The code body has to match; a metadata footer that differs is tolerated when it is the same length and still decodes as valid metadata. Every failure below is a real difference between the compilation you submitted and the one that produced the deployed bytecode — except where the failure happens in your local tooling, before anything reaches the explorer.

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">Compiler version mismatch</Accordion.Header>
    <Accordion.Body>
      - Use the exact **Solc version** your deploy used, not the version shown in an example command. Do not read it off the `pragma` either: a pragma often only bounds the version, and even when it pins one exactly it omits the `+commit` hash that identifies the build.
      - Foundry: read `solc_version` from `foundry.toml` (`solc` is the same setting; Foundry accepts either), or take the full version from `metadata.compiler.version` in `out/<File>.sol/<Contract>.json`.
      - Hardhat: take `solcLongVersion` from the build info under `artifacts/build-info/` — it carries the `+commit.…` suffix that `solcVersion` omits. In your config it lives under `solidity` in Hardhat 2 (a bare version string, `solidity.version`, or an entry in `solidity.compilers[]`), and under the compiler profile in Hardhat 3.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">Library not found / address mismatch</Accordion.Header>
    <Accordion.Body>
      `forge verify-contract` submits **only** the libraries in your Foundry configuration for that command — the `--libraries` flags you pass, plus any `libraries` entry in `foundry.toml`. It never reads your deploy's broadcast file or artifacts, so the flags your deploy script passed have to be repeated here. A missing library leaves unresolved placeholders in the recompiled bytecode, so the comparison fails.

      - Pass every deployed library, one `--libraries` flag each:

      ```bash
      --libraries src/libraries/MyLib.sol:MyLib:0x1111111111111111111111111111111111111111
      ```

      - The file part is the source path as the compiler sees it, after remappings. For a library that comes from a dependency, that is its path inside the dependency — for example `node_modules/@scope/pkg/contracts/MyLib.sol:MyLib:0x…`.
      - The source of truth for names and addresses is the top-level `libraries[]` array in `broadcast/<script>.s.sol/<chainId>/run-latest.json`.
      - To see what your command actually ships before submitting, dump the Standard JSON input and inspect its `settings.libraries`:

      ```bash
      forge verify-contract ... --show-standard-json-input > standard-input.json
      ```
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">Invalid constructor arguments</Accordion.Header>
    <Accordion.Body>
      - Verify the precise **encoding**, **order**, and **types** of your constructor arguments.
      - Read the values from the `arguments` field of the deploying entry in `transactions[]` of `broadcast/<script>.s.sol/<chainId>/run-latest.json` (`null` when the constructor takes none). They are stored decoded, so ABI-encode them with [cast abi-encode](https://getfoundry.sh/cast/reference/abi-encode/) before passing them.
      - `--guess-constructor-args` can fail its own preflight with `Local bytecode doesn't match on-chain bytecode` even when your local artifact and the deployed bytecode are identical. Drop `--guess-constructor-args` and `--rpc-url`, and pass the arguments explicitly instead:

      ```bash
      --constructor-args 0x00000000000000000000000000000000000000000000000000000000000003e8
      ```
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">Optimization settings differ</Accordion.Header>
    <Accordion.Body>
      - The optimizer flag, the number of **runs**, and the **EVM version** all change the output bytecode. Each must match what you compiled with.
      - Read them from `foundry.toml` (`optimizer`, `optimizer_runs`, `evm_version`) or from your Hardhat config. Do not assume the form defaults match your project.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">Flattening / import issues</Accordion.Header>
    <Accordion.Body>
      - Consider using the **Standard JSON** verification method to avoid path or flattening issues.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">Proxy and Implementation</Accordion.Header>
    <Accordion.Body>
      - Verify the **implementation contract** and the proxy separately. Each is its own address with its own source and constructor arguments.
      - A proxy's constructor arguments usually include the implementation address and the encoded initializer call. Read them from the deploy broadcast file rather than reconstructing them by hand.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

:::tip[Tip]
If verification keeps failing, stop adjusting the form and compare inputs instead. Take the Standard JSON your tooling actually submits (`forge verify-contract ... --show-standard-json-input`) and check it against the build info from the deploy. The difference between those two files is the reason verification fails.
:::

## Resources

- Verify smart contracts using [Blockscout](foundry-blockscout.md) or [Hardhat Plugin](hardhat-verify-plugin.md)
