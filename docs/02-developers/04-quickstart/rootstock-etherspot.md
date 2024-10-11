---
sidebar_label: Account Abstraction
sidebar_position: 600
title: Account Abstraction using Etherspot Prime SDK
description: 'In this guide, you will learn how to use the Etherspot Prime SDK to deploy an Account Abstraction dApp on the Rootstock network. By following these steps, you will empower your users to interact with your dApp without managing private keys directly.'
tags: [rsk, rootstock, developers, quick starts, etherspot, dApps, account abstraction]
---

In this guide, you will learn how to use the Etherspot Prime SDK to deploy an Account Abstraction dApp on the Rootstock network. 
By following these steps, you'll empower your users to interact with your dApp without managing private keys directly.

## Prerequisites

- Ensure git is installed
- Basic understanding of React and JavaScript
- Node.js and npm (or yarn) installed on your machine
- A code editor of your choice (e.g., Visual Studio Code)
- Familiarity with the [Wagmi starter kit](https://github.com/rsksmart/rsk-wagmi-starter-kit/tree/aa-sdk)

:::info[Info]
*This guide assumes you have a [Wagmi starter kit](https://github.com/rsksmart/rsk-wagmi-starter-kit/tree/aa-sdk) already set up.*
:::

## Understanding Account Abstraction

Abstraction involves hiding unnecessary data about an "object" to simplify the system and improve efficiency. When applied to Ethereum's blockchain technology, Account Abstraction aims to create a single account type that includes only relevant aspects.

There are two main types of Ethereum accounts: User Accounts (EOA) and Contracts. User Accounts are designed for individuals and are controlled by private keys. These accounts, also known as externally owned accounts (EOA), can hold a balance in Ether and conduct transactions with other EOAs using Ether and other ERC-supported tokens.

On the other hand, Contracts are controlled by code and can perform various functions, including interacting with external accounts and initiating activities such as exchanging tokens or creating new contracts.

With account abstraction, a single account can hold both code and Ether, enabling it to execute transactions and smart contract functions. This eliminates the need for a separate EOA to manage transactions, allowing contracts to handle funds directly.

Etherspot Prime, an open-source SDK, simplifies the implementation of Account Abstraction for dApp developers. Using an Etherspot smart wallet, users can enjoy a seamless web2-like experience through social logins or transaction batching.

## Getting Started

To explore Account Abstraction with Etherspot, follow these steps:

### Using a Different Branch:

1. Clone the Wagmi starter kit repository:

```sh
git clone https://github.com/wagmi-dev/wagmi-starter-kit.git
```

2. Navigate to the project directory:

```javascript
cd wagmi-starter-kit
```

3. Instead of using the main branch, switch to the branch containing the Account Abstraction functionalities:

```javascript
git checkout aa-sdk  
```

4. Run the project:
Now that you’ve cloned the repository and installed dependencies, it’s time to run the project. Execute the following command:

```javascript
yarn dev
```

This will start your Rootstock Wagmi dApp locally, allowing you to develop and test your smart contracts. You can access the Vite server at `http://localhost:5173.`

## Interact with Account abstraction
<img src="/img/resources/rootstock-metamask/accountabstraction.png"  width="800" height="600"/>

1. **Generate a Random Account:**
- Click the “Generate” button to create a random account.

2. **Generate a Payment Address:**
- Click the “Generate” button to obtain a payment address.

3. **Check Account Balance:**
- Clicking the Get Balance will show the balance of the payment address.

4. **Estimate and Send a Transaction:**
- This section has two fields:
    - **Receipt Address:** This field is where you specify the recipient’s Ethereum address. It’s the address where you want to send the transaction. Think of it as the destination for your funds. Make sure you enter a valid Ethereum address here.

    - **Value (in Eth):** In this field, you indicate the amount of Ether (ETH) you want to send in the transaction. Enter the value you wish to transfer. For example, if you want to send 0.5 ETH, input “0.5” in this field.

    - Click the “Estimate and Send” button to initiate the transaction.

## Understanding the codebase

This code defines a React component named Demo, which provides a user interface for interacting with blockchain functionalities through the Etherspot SDK. 

The component allows users to generate a random externally owned account (EOA), generate an Etherspot wallet, check the balance of the Etherspot wallet, and estimate and send transactions using the Arka Paymaster. 

The component handles various states and interactions, making it easier to manage wallets and perform blockchain transactions without directly dealing with private keys.

1. **generateRandomEOA**
  
- This function generates a random externally owned account (EOA).

- **Function:**

This Asynchronously generates a private key and derives an account address from it, setting the EOA wallet address and private key state variables.

2. **getBalance**
   
- This function fetches the balance of the current Etherspot wallet.

- **Function:**
This Asynchronously uses the SDK to retrieve the native balance of the account and updates the balance state variable.

3. **generateEtherspotWallet**

- This function generates a counterfactual address for the Etherspot wallet.

- **Function:**
    This Asynchronously interacts with the SDK to generate an Etherspot wallet address and fetches its balance.

4. **estimateAndTransfer**

- This function estimates the transaction cost and sends a specified value to a recipient using the Arka Paymaster.

- **Function:**
This Validates recipient address and value inputs.
Uses the SDK to set up the transaction, estimate the gas cost, send the transaction, and waits for the transaction receipt.

5. **useEffect Hook**
      
- This hook initializes the Prime SDK when the EOA private key is set.

**Parameters:**

**eoaPrivateKey:** The private key of the externally owned account (EOA).

- **Function:**

**useEffect:**
Sets up the Prime SDK instance with the eoaPrivateKey.
Configures the SDK with the specified bundler provider.

## Resources

- [Rootstock Account Abstraction Starter Kit](https://github.com/wagmi-dev/wagmi-starter-kit.git)
- [Using Prime SDK Examples](https://etherspot.fyi/prime-sdk/examples/intro)
- [Etherspot Prime SDK Repo](https://github.com/etherspot/etherspot-prime-sdk/)
