---
sidebar_label: Quick Start with Hardhat
sidebar_position: 6
title: Rootstock Hardhat Starter Kit! 
description: 'Whether you are a seasoned developer or just starting your journey into smart contract development, the hardhat starter kit provides a solid foundation for building decentralized applications (dApps) on the Rootstock network.'
tags: [rsk, rootstock, tutorials, resources, hardhat, starter kit, etherspot, dApp, smart contracts]
---


Whether you’re a seasoned developer or just starting your journey into smart contract development, the hardhat starter kit provides a solid foundation for building decentralized applications (dApps) on the Rootstock network.

## What Is Rootstock?
Rootstock (RSK) is fully compatible with Ethereum. It brings the power of smart contracts to Bitcoin, allowing developers to leverage Bitcoin’s security while benefiting from Ethereum’s ecosystem.

## Rootstock Hardhat Starter Kit Configuration

1.  [Typechain Plugin Enabled:](https://github.com/dethcrypto/TypeChain)
    - Enables TypeScript type bindings for smart contracts, enhancing type safety and developer experience.

2. [Hardhat-deploy Plugin Enabled:](https://github.com/wighawag/hardhat-deploy)
    - Provides deployment capabilities within Hardhat, streamlining contract deployment workflows.

3. Testing Environment:
    - Configured and operational, including test coverage.
    - Allows you to write and run tests for your smart contracts.

4. Code Formatting and Linting:
    - Prettier and ESLint are set up for project files and Solidity smart contracts.
    - Prettier ensures consistent code formatting, while ESLint catches potential issues.

5. Best Practices Enforcement:
    - [Solhint](https://github.com/protofire/solhint) is configured to enforce best practices in your Solidity code.
    - Helps maintain code quality and adherence to recommended patterns.

6. Prepared Examples and Tasks:
    - Includes examples, tests, deployments, and tasks for common ERC standards (ERC20, ERC721, ERC1155).
    - Jumpstart your development by leveraging these templates.

## Supported Networks
We support the following networks for this starter kit:
1. **Hardhat Network (localhost):** 
    - Test your smart contracts and dApp functionality on the Hardhat local network.
2. **Rootstock Mainnet:** 
    - Deploy your dApp on the Rootstock Mainnet for production use.
3. **Rootstock Testnet:** 
    - Test your smart contracts and dApp functionality on the Rootstock testnet before deploying to the mainnet.

## Prerequisites
Before starting the Rootstock Hardhat starter kit, make sure you have the following prerequisites in place:

1. **Familiarity with Smart Contracts:**
   - If you’re new to smart contracts, consider learning the basics. Understanding how smart contracts work will enhance your experience with Rootstock (RSK) development.

2. **Node.js and Hardhat Installed:**
   - Ensure you have Node.js installed on your system. You can download it from the [official Node.js website](https://nodejs.org/).
   - Install Hardhat globally using npm:

     ```bash
     npm install -g hardhat
     ```

3. **Install Hardhat Shorthand:**
   - We recommend installing `hh` autocomplete to use `hh` shorthand globally.

     ```bash
     npm i -g hardhat-shorthand
     ```
   - For more details, refer to their [official guide](https://hardhat.org/guides/shorthand.html).

4. **Metamask Setup with RSK:**
   - Install the Metamask browser extension if you haven’t already.
   - Configure Metamask to connect to the RSK network. Visit the [MetaMask Integration on the Rootstock Dev Portal](https://developers.rsk.co/wallet/use/metamask/).

5. **Basic Knowledge of Hardhat:**
   - Familiarity with Hardhat's core concepts and functionalities is recommended. If you're new to Hardhat, refer to the [Rootstock Hardhat documentation's starter guide](https://developers.rsk.co/guides/ethereum-devs/hardhat/).

## Setting Up the Rootstock Hardhat Starter Kit

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
This section will walk you through adding Rootstock (RSK) Testnet and Mainnet RPC URLs to your development environment. These URLs are essential for connecting your application to the RSK network and interacting with smart contracts.

There are two ways to obtain RPC URLs:

#### Using Public RPC URLs:
- Visit the [MetaMask Integration on the Rootstock Dev Portal](https://developers.rsk.co/wallet/use/metamask/). This guide provides instructions on setting up MetaMask for RSK. While following these steps, pay close attention to the sections on adding custom networks. You'll find the RPC URLs for RSK Testnet and Mainnet listed there.

#### Using Hosted RPC URLs (GetBlock):
- Create an account at the [GetBlock website](https://getblock.io/). Once logged in, navigate to your dashboard.

<img src="/img/resources/rootstock-metamask/rootstock-hardhat-starter-kit.png"  width="800" height="600"/>

### Adding the URLs to your project:
After obtaining the RPC URLs, create a file named `.env` in your project's root directory (important: this file should not be committed to version control). Add the necessary environment variables to the `.env` file:
```
PRIVATE_KEY: Your private key (e.g., from your Metamask account details).
RSK_MAINNET_RPC_URL: The RPC URL for the RSK mainnet.
RSK_TESTNET_RPC_URL: The RPC URL for the RSK testnet.
```

## Deploying an ERC721 Token Contract
This section uses the Hardhat development framework to deploy an ERC721 token (a non-fungible token) on the RSK network.

Run the following command, replacing `<network>` with either `rskTestnet` or `rskMainnet` depending on your desired deployment environment:

```bash
hh deploy --network <network> --tags 721
```
Example command:
```bash
hh deploy --network rskTestnet --tags 721
```
This command will compile your Solidity contracts, generate type information, and deploy your ERC721 contract to the specified RSK network. The output will display the deployed contract address and the amount of gas used.

The above command will return an output similar to the following:
```
Generating typings for: 36 artifacts in dir: typechain-types for target: ethers-v6
Successfully generated 106 typings!
Compiled 34 Solidity files successfully (evm target: paris).
deploying "MockERC721" (tx: 0x9ad1dbc047b78594cf2cad105ded54c851fc0895ae69e4381908fecedd0ee3fc)...: deployed at 0x2E027a3a05f3de6777B23397a50a60ecd04fe34C with 2849621 gas
```

## Interacting with the Contract - Minting a Token
Once your contract is deployed, you can interact with it using Hardhat's `erc721-mint` command. This command allows you to mint (create) new ERC721 tokens.

### Minting a Token:
In your terminal, run the following command, replacing the placeholders with your actual values:
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
```
Transaction Hash: 0xa127ff008e20d8b3944cecb374f28535cd84555881cde157708ec5545603a4e4
Transaction confirmed
```