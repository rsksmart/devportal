Smart contracts are the backbone of decentralized applications (dApps). They automate agreements and processes, but their code can be complex and prone to errors. Verifying your smart contracts is crucial to ensure they function as intended.

This tutorial will guide you through verifying your contracts using Foundry on the Rootstock Blockscout Explorer. Foundry is a powerful toolkit spektrum for Ethereum development, and its `forge` tool simplifies the verification of Solidity smart contracts deployed on the Rootstock network. By verifying the contracts, you allow Blockscout, an open-source block explorer, to link your contract's source code with its deployed bytecode on the blockchain, enabling trustless interaction with the code.

In this tutorial, we'll do the following steps:

- Set up your Foundry configuration environment in your project
- Use Foundry's `forge verify-contract` to verify a contract address

## Prerequisites

To follow this tutorial, you should have knowledge of the following:

- Foundry
- Basic knowledge of smart contracts

:::note[Foundry Starter Project]
A Foundry starter project can be set up with preset configurations for the Rootstock network. Initialize a new Foundry project using `forge init` and configure it as shown below. Ensure you set up the `.env` variables to match the `foundry.toml` configuration.
:::


## Configuration

Create or update the `foundry.toml` file in your project root to include Rootstock network configurations. Add the following:

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc_version = "0.8.24"
optimizer = true
optimizer_runs = 200
evm_version = "london"

[rpc_endpoints]
rskTestnet = "${RSK_TESTNET_RPC_URL}"
rskMainnet = "${RSK_MAINNET_RPC_URL}"
anvil = "http://127.0.0.1:8545"

[etherscan]
rskTestnet = { key = "any-non-empty-string", url = "https://rootstock-testnet.blockscout.com/api" }
rskMainnet = { key = "any-non-empty-string", url = "https://rootstock-blockscout.com/api" }
```

Create a `.env` file to store sensitive information:

```bash
RSK_TESTNET_RPC_URL=https://public-node.testnet.rsk.co
RSK_MAINNET_RPC_URL=https://public-node.rsk.co
PRIVATE_KEY=your-private-key-here
```

Load the environment variables:

```bash
source .env
```

## Usage

To verify a deployed contract, use the `forge verify-contract` command. You need the contract address and the contract name (as defined in your Solidity file). Run the following command:

For Rootstock Testnet:

```bash
forge verify-contract --chain-id 31 --verifier blockscout --verifier-url https://rootstock-testnet.blockscout.com/api DEPLOYED_CONTRACT_ADDRESS src/YourContract.sol:YourContract
```

For Rootstock Mainnet:

```bash
forge verify-contract --chain-id 30 --verifier blockscout --verifier-url https://rootstock.blockscout.com/api DEPLOYED_CONTRACT_ADDRESS src/YourContract.sol:YourContract
```
To deploy and verify with your script, use the `forge script` command. Run the following command:

For Rootstock Testnet:

```bash
forge script script/deploy.s.sol --rpc-url RSK_TESTNET_RPC_URL --broadcast --verify --legacy --evm-version london --verifier-url https://rootstock-testnet.blockscout.com/api --verifier blockscout
```

For Rootstock Mainnet:

```bash
forge script script/deploy.s.sol --rpc-url RSK_MAINNET_RPC_URL --broadcast --verify --legacy --evm-version london --verifier-url https://rootstock.blockscout.com/api --verifier blockscout
```

:::tip[Tip]
Replace `DEPLOYED_CONTRACT_ADDRESS` with the actual contract address and `YourContract` with the name of your contract. The contract address can be found in the deployment artifacts or logs after running `forge script`.
:::

### Example

Assuming you deployed a contract named `MockERC721` at address `0x33aC0cc41B11282085ff6db7E1F3C3c757143722` on the Rootstock Testnet, run:

```bash
forge verify-contract --chain-id 31 --verifier blockscout --verifier-url https://rootstock-testnet.blockscout.com/api 0x33aC0cc41B11282085ff6db7E1F3C3c757143722 src/ERC721.sol:MockERC721
```

The response should look like this:

```
Submitting verification for MockERC721...
Successfully submitted source code for contract src/ERC721.sol:MockERC721 at 0x33aC0cc41B11282085ff6db7E1F3C3c757143722
Waiting for verification result...
Successfully verified contract MockERC721 on the block explorer.
https://rootstock-testnet.blockscout.com/address/0x33aC0cc41B11282085ff6db7E1F3C3c757143722#code
```

## Resources
- [Deploy, Interact and Verify Smart Contracts using Remix and Rootstock Explorer](/developers/quickstart/remix/)
- Visit [hardhat-verify](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#hardhat-verify)
- Visit [blockscout](https://docs.blockscout.com/for-users/verifying-a-smart-contract/hardhat-verification-plugin)
- [Hardhat Starter Kit for Rootstock](https://github.com/rsksmart/rootstock-hardhat-starterkit)