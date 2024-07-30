---
sidebar_label: Quick Start using Wagmi and React Hooks
sidebar_position: 4
title: Rootstock Wagmi Starter Kit
description: 'The Rootstock Wagmi Starter Kit provides a solid foundation for developing decentralized applications (dApps) on the Rootstock blockchain. It streamlines development by leveraging the React, Wagmi, and Shadcn libraries.'
tags: [rsk, rootstock, tutorials, resources, wagmi, starter kit, react, dApps, Smart Contracts]
---


The Rootstock Wagmi Starter Kit provides a solid foundation for developing decentralized applications (dApps) on the Rootstock blockchain. It streamlines development by leveraging the [React](https://react.dev/learn), [Wagmi](https://wagmi.sh/), and [Shadcn libraries](https://ui.shadcn.com/).

## Features

1. [Rainbowkit](https://www.rainbowkit.com/) Integration
Easily connect your dApp to wallets using Rainbowkit. This integration simplifies wallet interactions and allows users to interact securely with smart contracts.

2. Token Interactions
Sample integrations demonstrate interactions with various tokens, including:
- **ERC20:** Standard fungible tokens.
- **ERC721:** Non-fungible tokens (NFTs) with unique properties.
- **ERC1155:** Multi-token standard for managing multiple NFTs within a single contract.

3. Code Quality Tools
- **Prettier and ESLint:** Set up Prettier and ESLint configurations for consistent code formatting and linting. Maintain code quality throughout your project.

4. Styling with Tailwindcss and Shadcn
- **Tailwindcss:** Utilize the utility-first CSS framework Tailwindcss for efficient styling. Create responsive and visually appealing interfaces.
- **Shadcn:** Enhance your design capabilities by integrating Shadcn, a library that provides additional styling options.

### Supported Networks
- **Rootstock Mainnet:** Deploy your dApp on the Rootstock Mainnet for production use.
- **Rootstock Testnet:** Test your smart contracts and dApp functionality on the Rootstock testnet before deploying to the mainnet.

## What is Wagmi?
Wagmi is a React Hooks library specifically designed for Ethereum development. It provides a set of custom hooks that simplify interactions with Ethereum smart contracts and blockchain networks.

### Key Points about Wagmi:
1. **React Hooks Integration:** Wagmi is built on React, leveraging its component-based architecture. It allows developers to use familiar React Hooks (such as useState, useEffect, etc.) to manage Ethereum-related state and side effects.

2. **Smart Contract Interactions:** With Wagmi, you can easily connect your React components to Ethereum smart contracts. It abstracts the complexities of interacting with contract functions, events, and state variables. You can read data from contracts or send transactions seamlessly.

3. **Web3 Integration:** Under the hood, Wagmi integrates with Web3.js (or other Ethereum libraries like ethers.js) to communicate with Ethereum nodes. It handles account management, signing transactions, and querying blockchain data.

4. **Custom Hooks:** Wagmi provides a set of custom hooks, such as:
  - `useContract:` A hook to load and interact with a specific smart contract.
  - `useAccount:` A hook to manage the user’s Ethereum account.
  - `useBalance:` A hook to retrieve the account balance.
  - `useContractEvents:` A hook to listen to contract events.

5. **Ethereum Development Made Easier:** Whether you’re building decentralized applications (DApps), DeFi projects, or NFT platforms, Wagmi aims to simplify the development process by abstracting away low-level details and providing a more intuitive API.

## What is Shadcn?
Shadcn is a library that extends styling capabilities beyond what’s offered by standard CSS frameworks. It allows developers to create unique and visually appealing designs by adding shadows, gradients, and other effects to their UI elements.

## Prerequisites
- **Node.js and Git Installation:** Make sure you have Node.js and Git installed on your system. If not, download and install them from their official websites.
- **Yarn Installation:** Install Yarn, a package manager for Node.js projects. You can do this by running the following command in your terminal:
  ```bash
  npm install -g yarn
  ```
- **Basic Knowledge:** Familiarize yourself with React (a JavaScript library for building user interfaces) and Solidity (a programming language for Ethereum smart contracts).

## Setup

### 1. Clone the Repository
First, you’ll need to clone the Rootstock Wagmi Starter Kit repository. Open your terminal and run the following commands:
```bash
git clone https://github.com/chrisarevalodev/rsk-wagmi-starter-kit.git
cd rsk-wagmi-starter-kit
```

### 2. Get Project ID
Every dApp that relies on WalletConnect now needs to obtain a projectId from [WalletConnect Cloud](https://cloud.walletconnect.com/). This is free and only takes few minutes.

To get the key:
1. Go to this [URL](https://cloud.walletconnect.com/sign-up) and sign up.
2. Create a new project by clicking on **Create Project**.
3. Add a Name and Link to your project, select a product (AppKit or WalletKit), select **WalletKit**.
4. Now you will see the project ID, copy it.

### 3. Environment Setup
To set up your environment, follow these steps:
1. Create a `.env` file and add your environment variables.
    ```env
    VITE_WC_PROJECT_ID=Your projectid from cloud Walletconnect
    ```

### 4. Install Dependencies
Before running the project, make sure you have the necessary dependencies installed. We recommend using the yarn package manager due to potential conflicts with npm packages. Run the following command to install dependencies:
```bash
yarn
```

### 5. Run the Project
Now that you’ve cloned the repository and installed dependencies, it’s time to run the project. Execute the following command:
```bash
yarn dev
```
This will start your Rootstock Wagmi Starter Kit locally, allowing you to develop and test your smart contracts. You can access the Vite server at [http://localhost:5173](http://localhost:5173).

## Result

<img src="/img/resources/wagmi-starterkit/wagmi-starterkit.png"  width="800" height="600"/>

After successfully running your project using the command above, you’ll see this screen. Click the “Connect Wallet” button to log in. Once connected, you can:
- **Switch Networks:** Easily switch between Mainnet and Testnet.
- **View and Copy Your Address:** Access your wallet address.
- **Check Your tRBTC Balance:** See your tRBTC balance.
- **Disconnect:** Log out from the project.

## Test Project
To test the Wagmi project, follow these simple steps:
1. **Connect Your Wallet:** Click the “Connect Wallet” button.
2. **Navigate to the Wagmi Section:** Scroll down and find the card labeled “Contract Interaction with Wagmi Starter Kit.” Click on it.
3. **Explore the Tabs:** In the Wagmi section, you’ll see three tabs: ERC-20, ERC-721, and ERC-1155. Click on any of these tabs to explore further.

<img src="/img/resources/wagmi-starterkit/wagmi-starterkit-tabs.png"  width="800" height="600"/>

Provide a section on the document about how  the contracts are called in the code, folder structure for ease of finding codes and the main features from Wagmi and Rainbowkit used in the codebase.

## Understanding the Codebase

### Folder Structure

```
Public
Src
.env
.env.example

```

The `src` folder is organized to streamline the development process and make it easy to locate specific code or assets. Here's a detailed breakdown:

#### `.src` Folder Structure
- **Assets:** Contains the ABIs (Application Binary Interfaces) for ERC20, ERC721, and ERC1155.
- **Components:**
  - **AccountAbstraction:** Contains code related to account abstraction.
  - **Home:** Holds components specific to the homepage.
  - **Icons:** Contains various icon components.
  - **Tokens:** Includes components for different token types.
  - **UI:** General UI components used across the application.
  - **Footers.tsx:** Footer component.
  - **Navbar.tsx:** Navbar component.
- **Config:**
  - **provider.tsx:** Configuration for providers.
  - **rainbowkitConfig.ts:** Configuration for RainbowKit.
  - **wagmiProviderConfig.ts:** Configuration for WAGMI providers.
- **Lib:** Contains various utility folders for easy organization:
  - **Constants:** Application constants.
  - **Functions:** General functions used across the app.
  - **Types:** Type definitions.
  - **Utils:** Utility functions.
- **Pages:**
  - **index.ts:** Main entry point.
  - **Etherspot.tsx:** Page component for Etherspot.
  - **Home.tsx:** Homepage component.
  - **Wagmi.tsx:** Wagmi-related page component.

### Code for ERC20, ERC721, and ERC1155 Tabs
The code responsible for the tabs corresponding to ERC20, ERC721, and ERC1155 can be found within the components folder:

- **ERC20:** Located in the `components/tokens/ERC20` directory.
- **ERC721:** Located in the `components/tokens/ERC721` directory.
- **ERC1155:** Located in the `components/tokens/ERC1155` directory.

This structured approach ensures that code and assets are logically grouped, facilitating ease of navigation and maintainability.

#### Understanding the ERC20 Tab Code
The code interacts with a smart contract to mint tRSK tokens. Here's a detailed breakdown of how this is achieved:

1. **Smart Contract Reference:**
  - **Address:** The smart contract's address is specified by the `ERC20_ADDRESS` constant.
  - **ABI:** The contract's ABI (Application Binary Interface), which defines the contract functions and their parameters, is provided by the `abi` constant.

2. **Reading Contract Data:**

  ```javascript
  const { data, isLoading, isError, refetch } = useReadContract({
      abi,
      address: ERC20_ADDRESS,
      functionName: "balanceOf",
      args: [address],
  });
  ```

3. **Writing to the Contract:**
  The `useWriteContract` hook from the wagmi library is used to interact with the contract's write functions (functions that modify the state).

4. **Minting Tokens:**
  The `mintTokens` function calls `writeContractAsync` to mint tRSK tokens. 

 - Arguments:
     - abi: Defines the contract functions and their parameters.
     - address: The address of the deployed ERC-20 contract.
     - functionName: The name of the function to call, which is "mint" in this case.
     - args: An array containing the user's wallet address and the amount to mint (100 in this case).

  ```javascript
  const mintTokens = async () => {
    setLoading(true);
    try {
        const txHash = await writeContractAsync({
            abi,
            address: ERC20_ADDRESS,
            functionName: "mint",
            args: [address, 100],
        });
        await waitForTransactionReceipt(rainbowkitConfig, {
            confirmations: 1,
            hash: txHash,
        });
        setLoading(false);
        toast({
            title: "Successfully minted tRSK tokens",
            description: "Refresh the page to see changes",
        });
        refetch();
    } catch (e) {
        toast({
            title: "Error",
            description: "Failed to mint tRSK tokens",
            variant: "destructive",
        });
        setLoading(false);
        console.error(e);
    }
};

```
This sends a transaction to the blockchain to execute the "mint" function on the smart contract, thereby minting tRSK tokens and depositing them into the user's wallet.

## Understanding the ERC721 Tab Code

This code defines a React component named `ERC721Tab`, which provides a user interface for interacting with an ERC-721 smart contract.

The Key Functions Within This Component:

1. `useReadContract`:
This hook is used to read data from the ERC-721 contract. It fetches the balance of NFTs held by the connected user's address.

- **Parameters**:
    - `abi`: The ABI (Application Binary Interface) of the ERC-721 contract.
    - `address`: The address of the ERC-721 contract.
    - `functionName`: The name of the function to call on the contract (balanceOf).
    - `args`: The arguments to pass to the contract function ([address]).

2. `useWriteContract`:
This hook is used to write data to the ERC-721 contract, specifically to mint a new NFT.

**Function**:
- `writeContractAsync`: Asynchronously writes to the contract by calling the `safeMint` function of the ERC-721 contract.

3. `mintNFT`:
This is an asynchronous function that handles the minting process of a new NFT.

- **Steps**:
   - Sets the loading state to true.
   - Attempts to call the `safeMint` function on the ERC-721 contract using `writeContractAsync`.
   - Waits for the transaction to be confirmed using `waitForTransactionReceipt`.
   - Displays a success toast message if the minting is successful.
   - Refetches the user's NFT balance by calling `refetch`.
   - Catches any errors, logs them, and displays an error toast message.
   - Sets the loading state to false.

4. `refetch`:
This function is part of the `useReadContract` hook and is used to refresh the balance of NFTs after a successful minting operation.

5. `toast`:
This function is used to display toast notifications for success or error messages.

The rest of the component contains JSX to render the UI elements, including a button to mint the NFT, a balance display, and a link to view the minted NFTs on a block explorer.

## Understanding the ERC1155 Tab Code

The code provided is a React component that interacts with a smart contract using the ERC-1155 standard. It allows users to mint tokens and check their balances.

The Key Functions Within This Component:

1. `ERC1155Tab` Component:

**State Variables**:
- `loading`: Boolean to manage the loading state during token minting.
- `value`: Number to store the selected token type for minting.
- `address`: The user's wallet address obtained from the `useAccount` hook.


2. `useReadContract` Hooks:
These hooks are used to read data from the smart contract.

- `useReadContract` for checking the balance of Type A tokens (with ID 1).
- `useReadContract` for checking the balance of Type B tokens (with ID 2).


3. `mintTokens` Function:
An asynchronous function that handles the minting of tokens.

- **Steps**:
   - Calls `writeContractAsync` to interact with the smart contract and mint tokens.
   - Waits for the transaction receipt using `waitForTransactionReceipt`.
   - Displays success or error toasts based on the outcome.
   - Refetches the balance data after minting.

## Conclusion

The Rootstock Wagmi Starter Kit offers a well-organized framework to build scalable dApps efficiently. Key features include:

- **Structured Folder Organization**: Clear categorization for easy navigation.
- **Pre-configured Environment**: Ready-to-use environment settings.
- **Reusable Components**: Comprehensive set of UI and token interaction components.
- **Comprehensive Configurations**: Pre-configured settings for RainbowKit and WAGMI.
- **Utilities and Constants**: Essential utilities and type definitions.

## Join the Community

Building dApps can be challenging, but you’re not alone. Join our active Discord community for help, questions, and collaboration.
