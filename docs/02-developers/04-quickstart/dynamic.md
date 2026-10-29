---
sidebar_position: 112
sidebar_label: Dynamic
title: Integrate Dynamic Wallets with Wagmi on Rootstock
description: "Integrate Dynamic embedded wallets and Wagmi hooks in a Next.js dApp on Rootstock. Secured by over 85% of Bitcoin's hash power through merge mining."
tags: [rsk, Dynamic, developers, Kit, rootstock, Starter, dApps, smart contracts]
---

The Rootstock Dynamic Starter Kit uses the `Wagmi` library for faster integration of Web3 features into a Next.js application. Using `Wagmi` hooks, you can connect to wallets, retrieve balances, transfer tokens, and sign messages.

At the end of this guide, you’ll know how to set up and configure a Next.js project with Web3 support, connect to different wallets, retrieve data from the blockchain, send transactions to transfer tokens or interact with smart contracts, and securely sign messages to verify user identities.

Using Dynamic embedded wallet feature in your dApps  simplifies the onboarding experience for your users by abstracting lower-level blockchain interactions, so you can focus on the application layer.

:::note
For more details on Dynamic Embedded Wallets,
refer to the official [Dynamic Embedded Wallets Documentation](https://www.dynamic.xyz/features/embedded-wallets).
:::

## What you'll achieve

- Set up a Next.js project with Dynamic embedded wallets and Wagmi
- Connect wallets and read balances on Rootstock
- Send transactions and sign messages from your dApp

## **What is Dynamic?**

**Dynamic** is a tool that simplifies wallet management and integration for Web3 applications. It provides developers with an "Embedded Wallet" solution, so users can sign transactions and manage keys inside the app without switching to external wallet apps.

This makes it easier to create a smooth user experience and improves accessibility, particularly for those new to blockchain.

## **Why Use Wagmi?**

The **wagmi** library offers a set of React hooks specifically designed for Web3 development. These hooks handle essential wallet interactions, such as connecting to MetaMask or WalletConnect, fetching balances, sending tokens, and signing messages.

## **Key Features**

 1. **Wallet Connection**

This supports connecting wallets like **MetaMask** and **WalletConnect** so users can log in without leaving the dApp. MetaMask is a popular browser wallet, while WalletConnect enables connection to a variety of mobile wallets through QR code scanning. With wagmi hooks, handling wallet connections becomes simple, allowing users to securely and easily access the dApp. This removes the need for custom connection logic, making the process quick and straightforward.

2. **Balance Retrieval**

Retrieving token balances is essential for users to monitor their assets. It enables the app to fetch balances for tokens like **RBTC**, **tRIF**, and **DOC** on the Rootstock Testnet. Using wagmi’s hooks, balances are updated in real-time, allowing users to view their holdings within the app. This feature is key for applications where users need to keep track of their assets, such as finance or trading dApps.

3. **Token Transfers**

Token transfers allow users to send assets to other addresses directly from the dApp. This feature lets users select a token, specify an amount, and input a recipient address to complete the transfer. With wagmi's transaction hooks, you can submit transfers without writing custom contract call logic. This functionality is useful for dApps where peer-to-peer payments or transfers are common, like in DeFi or tipping applications.

4. **Message Signing and Verification**

Message signing lets users prove their identity or authorize actions without exposing sensitive information. This feature allows users to sign and verify messages, which is useful for secure authentication or transaction confirmation. Wagmi’s signature hooks streamlines the signing process, providing both security and flexibility for the dApp. It’s especially helpful for applications where identity verification is required.

5. **Rootstock Testnet Support**

This project is preconfigured for the **Rootstock Testnet**, which allows developers to test dApps without spending real assets. By building on the testnet, developers can ensure their dApp is ready for deployment to the mainnet. This provides a risk-free space to experiment with blockchain features, making it ideal for early-stage development and testing.

## **Prerequisites**

This project leverages key libraries to handle server-side rendering, Web3 interactions, and blockchain contract communication.

Before starting the project, make sure you have these essential tools installed on your computer:

1. **Node.js**:
   * You’ll need Node.js, version **19.x** or later. Node.js allows you to run JavaScript on the server, which is required for building and running modern web applications.
     [Download Node.js here](https://nodejs.org/) if you haven't installed it yet.

2. **Bun** or **Yarn** (recommended for Next.js projects):
   * **Bun** (version **1.1.x** or later): A fast JavaScript runtime and package manager.
     See how to [Download Bun](https://bun.sh/).

3. **Next.js**:

   * Next.js is a powerful React framework that enables server-rendered web applications, helping to make your website faster and more SEO-friendly.
    In this project, Next.js serves as the backbone for building the front end.

4. **Wagmi**:

   * `wagmi` is a collection of React hooks for interacting with Web3, which lets you connect to blockchain networks, handle user authentication, and more.
   This library makes it easier to integrate Web3 functionality into React components.

5. **Viem**:

    * `viem` provides an easy way to interact with smart contracts on the Rootstock blockchain.
    This library will be used to connect to Rootstock and make contract calls.

:::warning[Warning]
This is a starter kit designed for rapid prototyping. It is intended for educational and experimental purposes only. Use it at your own risk, and ensure thorough testing before deploying in production environments.

:::

## Summary

Build a Next.js dApp on Rootstock with **Dynamic** embedded wallets and **Wagmi** hooks. Repo: [github.com/rsksmart/rootstock-dynamic](https://github.com/rsksmart/rootstock-dynamic).

### What you'll achieve

- Set up a Next.js project with Dynamic embedded wallets and Wagmi
- Connect wallets and read balances on Rootstock testnet
- Send token transfers and sign messages from the dApp

### Setup steps

| Step | Action |
|------|--------|
| 1 | Clone `https://github.com/rsksmart/rootstock-dynamic` |
| 2 | Install dependencies with `bun install` or `yarn install` |
| 3 | Create a free [Dynamic dashboard](https://app.dynamic.xyz/dashboard/overview) account |
| 4 | Copy **Environment ID** from Developers → SDK & API Keys |
| 5 | Create `.env.local` with `NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=YOUR_ENVIRONMENT_ID` |
| 6 | Run `bun dev` or `yarn dev`. Open `http://localhost:3000` |

### Frontend interactions

| Feature | Component | Tokens supported |
|---------|-----------|------------------|
| Connect wallet | `DynamicWidget` | MetaMask, WalletConnect, social login |
| Check balances | `Balances` | rBTC, tRIF, DOC |
| Send tokens | `Transfer` | rBTC, tRIF, DOC |
| Sign messages | `SignMessage` | Arbitrary message signing |

### Prerequisites

- Node.js 19.x or later
- Bun 1.1.x+ or Yarn
- Next.js, Wagmi, and Viem (included in starter kit)
- Rootstock Testnet configured (chain ID 31)

## Getting Started

Clone the starter kit, install dependencies, add your Dynamic Environment ID, then run the Next.js app.

### Clone the repository

Clone the repository to use the starter kit locally.

```bash
git clone https://github.com/rsksmart/rootstock-dynamic
cd rootstock-dynamic
```

### Install dependencies

Install the necessary dependencies with either Bun or Yarn (choose one).

```bash
bun install
# or
yarn install
```

### Get environment variables from Dynamic

Create a free account on Dynamic and log in to your dashboard. Then obtain your `ENVIRONMENT_ID` from the [Dynamic dashboard](https://app.dynamic.xyz/dashboard/overview).

Follow these steps to locate and copy your Environment ID:

<img src="/img/developers/quickstart/dynamic-starter-kit/image1.png" alt="Dynamic.xyz dashboard"/>

An Environment ID is needed to configure and secure your application.

* **Open the Developer Section**:
   * Look at the menu on the left side of the screen. Find and click **Developers** to expand the options.
* **Go to SDK & API Keys**:
   * Under **Developers**, click on **SDK & API Keys**. This is where your Environment ID is stored.
* **Copy the Environment ID**:
   * Find the box labeled **Environment ID**. Click the copy icon next to the ID to copy it to your clipboard.

### Set up environment variables

Create a `.env.local` file in the project’s root directory to store environment variables.

```bash
mv .env.local.example .env.local
```

Setting up the `.env.local` file stores your environment ID so the app can access Dynamic’s features and connect to the Web3 backend.

Open the `.env.local` file and add your environment ID for Dynamic.

```bash
NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=YOUR_ENVIRONMENT_ID
```

### Run the development server

Start the development server using Bun or Yarn.

```bash
bun dev
```

```bash
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to view your project.

<img src="/img/developers/quickstart/dynamic-starter-kit/image2.png" alt="The homepage of the Rootstock Dynamic Starterkit"/>

## Interacting with the Frontend

The starter kit includes React components for connecting a wallet, reading balances, sending tokens, and signing messages.

### Connect wallet

Use the `DynamicWidget` component to connect a wallet through MetaMask or WalletConnect. You can also offer social login.

Once logged in, you will see a similar image like this:

<img src="/img/developers/quickstart/dynamic-starter-kit/image3.png" alt="Connect wallet using DynamicWidget component"/>

### Check token balances

The [`Balances`](https://github.com/rsksmart/rootstock-dynamic/blob/main/components/Balances.tsx) component fetches and displays the wallet's token balances. It supports rBTC, tRIF, and DOC.

### Send tokens

The [`Transfer`](https://github.com/rsksmart/rootstock-dynamic/blob/main/components/Transfer.tsx) component lets users transfer tokens in the dApp. It includes fields for the recipient address and token amount, plus hooks to initiate the transfer.

Features:

* **Dropdown**: Select a token from available options (**rBTC, tRIF, and DOC**)
* **Amount**: Enter the amount to send.
* **Recipient Address**: Enter the address to send tokens to.

### Sign messages

The [`SignMessage`](https://github.com/rsksmart/rootstock-dynamic/blob/main/components/SignMessage.tsx) component lets the user sign arbitrary messages with the connected wallet. Use this for authentication or data validation.

By the end of this guide, we learned how to integrate Web3 features into a **Next.js** app using the **Dynamic Starter Kit for Rootstock**. With **wagmi hooks**, we can easily connect wallets, manage token balances, send tokens, and sign messages directly within your application.

We’ve also learnt how **Dynamic’s embedded wallet** simplifies the user experience by eliminating the need for external wallet apps. This integration makes Web3 more accessible, especially for beginners to the blockchain. With support for popular wallets like **MetaMask** and **WalletConnect**, and pre-configuration for the **Rootstock Testnet**, developers now have a secure, user-friendly foundation to build and test their Web3 applications.

View the complete project and code on [Github](https://github.com/rsksmart/rootstock-dynamic).
