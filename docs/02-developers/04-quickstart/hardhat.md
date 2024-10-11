---
sidebar_label: Using Hardhat
sidebar_position: 400
title: Rootstock Hardhat Starter dApp
description: 'Whether you are a seasoned developer or just starting your journey into smart contract development, the hardhat starter kit provides a solid foundation for building decentralized applications (dApps) on the Rootstock network.'
tags: [rsk, rootstock, tutorials, developers, hardhat, quick starts, dApps, smart contracts]
---

Whether you’re a seasoned developer or just starting your journey into smart contract development, the hardhat starter kit provides a solid foundation for building decentralized applications (dApps) on the Rootstock network.

Rootstock is fully EVM (Ethereum Virtual Machine) compatible. It brings the power of smart contracts to Bitcoin, allowing developers to leverage Bitcoin’s security while benefiting from Ethereum’s ecosystem.

## Prerequisites

Before starting the dApp, make sure to have the following prerequisites:

1. **Familiarity with Smart Contracts:**
   - If you’re new to smart contracts, consider learning the basics. Understanding how smart contracts work will enhance your experience with Rootstock development.

2. **Node.js and Hardhat Installed:**
   - Ensure you have Node.js installed on your system. See the [prerequisites section](/developers/requirements/#installing-nodejs-and-npm).

3. **Install Hardhat Shorthand:**
- We recommend installing `hh` autocomplete to use `hh` shorthand globally.

     ```bash
     npm i -g hardhat-shorthand
     ```
- For more details, refer to their [official guide](https://hardhat.org/guides/shorthand.html).

4. **Metamask Setup with Rootstock:**
- Install the Metamask browser extension if you haven’t already.
- Configure Metamask to connect to the Rootstock network. Visit the [MetaMask Integration on the Rootstock Dev Portal](/dev-tools/wallets/metamask/).

5. **Basic Knowledge of Hardhat:**
- Familiarity with Hardhat's core concepts and functionalities is recommended. If you're new to Hardhat, refer to the [Rootstock Hardhat Guide](/developers/smart-contracts/hardhat/).

:::tip[Rootstock Blockchain Developer Course]

Learn how to write, test, secure, deploy and verify smart contracts on the Rootstock blockchain network. Enroll for the [Rootstock Blockchain Developer Course](/resources/courses/).
:::

## Setting Up the Sample dApp

### Clone the Repository

Open your terminal or command prompt and run the following command to clone the repository from GitHub:

```bash
git clone https://github.com/rsksmart/rootstock-hardhat-starterkit.git
```

### Install Dependencies

Navigate to the cloned repository folder:

```bash
cd rootstock-hardhat-starterkit
```

Install all required dependencies using npm:

```bash
npm install
```

### Obtain Rootstock Testnet and Mainnet RPC URLs

This section will walk you through adding Rootstock Testnet and Mainnet RPC URLs to your development environment. These URLs are essential for connecting your application to the Rootstock network and interacting with smart contracts.

There are two ways to obtain RPC URLs:

#### Using Public RPC URLs

- Visit the [MetaMask Integration on the Rootstock Dev Portal](/dev-tools/wallets/metamask/). This guide provides instructions on setting up MetaMask for Rootstock. While following these steps, pay close attention to the sections on adding custom networks. You'll find the RPC URLs for Rootstock Testnet and Mainnet listed.

#### Using RPC API
- Create an account at the [Rootstock RPC API](https://rpc.rootstock.io/). Once logged in, navigate to your dashboard and copy the API Key. 


### Adding the URLs to your project

After obtaining the RPC URLs, create a file named `.env` in your project's root directory (important: this file should not be committed to version control). Add the necessary environment variables to the `.env` file:
```
PRIVATE_KEY: Your private key (e.g., from your Metamask account details).
RSK_MAINNET_RPC_URL: The RPC URL for the Rootstock mainnet.
RSK_TESTNET_RPC_URL: The RPC URL for the Rootstock testnet.
```

## Deploying an ERC721 Token Contract
This section uses the Hardhat development framework to deploy an ERC721 token (a non-fungible token) on the Rootstock network.

Run the following command, replacing `<network>` with either `rskTestnet` or `rskMainnet` depending on your desired deployment environment:

```bash
hh deploy --network <network> --tags 721
```
Example command:
```bash
hh deploy --network rskTestnet --tags 721
```
This command will compile your Solidity contracts, generate type information, and deploy your ERC721 contract to the specified Rootstock network. The output will display the deployed contract address and the amount of gas used.

The above command will return an output similar to the following:

```bash
Generating typings for: 36 artifacts in dir: typechain-types for target: ethers-v6
Successfully generated 106 typings!
Compiled 34 Solidity files successfully (evm target: paris).
deploying "MockERC721" (tx: 0x9ad1dbc047b78594cf2cad105ded54c851fc0895ae69e4381908fecedd0ee3fc)...: deployed at 0x2E027a3a05f3de6777B23397a50a60ecd04fe34C with 2849621 gas
```

## Interacting with the Contract - Minting a Token
On contract deployment, you can interact with it using Hardhat's `erc721-mint` command. This command allows you to mint (create) new ERC721 tokens.

### Minting a Token:
In your terminal, run the following command, replacing the placeholders with actual values:

```bash
hh erc721-mint \
  --contract <ContractAddress> \
  --recipient <RecipientAddress> \
  --network rskTestnet
```
Example command:
```bash
hh erc721-mint --contract 0x2E027a3a05f3de6777B23397a50a60ecd04fe34C --recipient 0xB0f22816750851D18aD9bd54c32C5e09D1940F7d --network rskTestnet
```
- `<ContractAddress>`: Replace this with the address of your deployed ERC721 contract obtained from the previous step.
- `<RecipientAddress>`: Replace this with the wallet address to receive the newly minted token.
- `<network>`: Replace this with either `rskTestnet` or `rskMainnet`, depending on the network where your contract is deployed.

This command will initiate a transaction to mint a new ERC721 tokens and send it to the specified recipient address. 

The output will display the transaction details:

```bash
Transaction Hash: 0xa127ff008e20d8b3944cecb374f28535cd84555881cde157708ec5545603a4e4
Transaction confirmed
```