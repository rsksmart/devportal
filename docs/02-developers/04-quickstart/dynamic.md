---
section_position: 103
sidebar_label: Dynamic
title: Dynamic Starter Kit
description: "The Rootstock Dynamic Starter Kit uses the wagmi library for faster integration of Web3 features into a Next.js application. It uses Wagmi hooks, ability to connect to wallets, retrieve balances, transfer tokens, and sign messages."
tags: [rsk, Dynamic, developers, Kit, rootstock, Starter, dApps, smart contracts]
---

The Rootstock Dynamic Starter Kit uses the `Wagmi` library for faster integration of Web3 features into a Next.js application. Using `Wagmi` hooks, you can connect to wallets, retrieve balances, transfer tokens, and sign messages. 

At the end of this guide, you’ll know how to set up and configure a Next.js project with Web3 support, connect to different wallets, retrieve data from the blockchain, send transactions to transfer tokens or interact with smart contracts, and securely sign messages to verify user identities. 

Using Dynamic embedded wallet feature in your dApps  simplifies the onboarding experience for your users by abstracting lower-level blockchain interactions, so you can focus on the application layer.

:::note
For more details on Dynamic Embedded Wallets, 
refer to the official [Dynamic Embedded Wallets Documentation](https://www.dynamic.xyz/features/embedded-wallets).
:::

## **What is Dynamic?**

**Dynamic** is a tool that simplifies wallet management and integration for Web3 applications. It provides developers with an "Embedded Wallet" solution, allowing seamless wallet interactions directly within the app without requiring users to switch to external wallet apps.

This makes it easier to create a smooth user experience and improves accessibility, particularly for those new to blockchain.

## **Why Use Wagmi?**

The **wagmi** library offers a set of React hooks specifically designed for Web3 development. These hooks handle essential wallet interactions, such as connecting to MetaMask or WalletConnect, fetching balances, sending tokens, and signing messages. 

## **Key Features**

 1. **Wallet Connection**

This supports connecting wallets like **MetaMask** and **WalletConnect** to provide users with a seamless login into the dApp. MetaMask is a popular browser wallet, while WalletConnect enables connection to a variety of mobile wallets through QR code scanning. With wagmi hooks, handling wallet connections becomes simple, allowing users to securely and easily access the dApp. This removes the need for custom connection logic, making the process quick and straightforward.

2. **Balance Retrieval**

Retrieving token balances is essential for users to monitor their assets. It enables the app to fetch balances for tokens like **RBTC**, **tRIF**, and **DOC** on the Rootstock Testnet. Using wagmi’s hooks, balances are updated in real-time, allowing users to view their holdings within the app. This feature is key for applications where users need to keep track of their assets, such as finance or trading dApps.

3. **Token Transfers**

Token transfers allow users to send assets to other addresses directly from the dApp. This feature lets users select a token, specify an amount, and input a recipient address to complete the transfer. With wagmi’s transaction hooks, token transfers are handled seamlessly, removing the need for complex contract interactions. This functionality is useful for dApps where peer-to-peer payments or transfers are common, like in DeFi or tipping applications.

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

## **Getting Started**

<Steps>
  <Step title=" Clone the Repository">
   Clone the repository to use the starter kit locally.

```bash
git clone https://github.com/RookieCol/rootstock-dynamic
cd rootstock-dynamic
```
  </Step>
  <Step title="Install Dependencies">
    Install the necessary dependencies with either Bun or Yarn.
  <Tabs>
  <TabItem value="contribute" label="Using Bun" default>
    ```
    bun install
    ```
  </TabItem>
  <TabItem value="contest" label="Using Yarn">
   ```
   yarn install
   ```
  </TabItem>

</Tabs>

  </Step>
  <Step title="Get Environment Variables from Dynamic">

  :::note
Create a FREE account on Dynamic and login to your Dashboard. Then obtain your `ENVIRONMENT_ID` from the [Dynamic dashboard](https://app.dynamic.xyz/dashboard/overview). 

:::
   
Follow these steps to locate and copy your Environment ID:

<img src="/img/developers/quickstart/dynamic-starter-kit/image1.png" alt="Dynamic.xyz dashobard"/>

An Environment ID is needed to configure and secure your application. Here’s how to get it:

* **Open the Developer Section**:  
   * Look at the menu on the left side of the screen. Find and click **Developers** to expand the options.  
* **Go to SDK & API Keys**:  
   * Under **Developers**, click on **SDK & API Keys**. This is where your Environment ID is stored.  
* **Copy the Environment ID**:  
   * Find the box labeled **Environment ID**. Click the copy icon next to the ID to copy it to your clipboard.

</Step>

   <Step title="Set Up Environment Variables">
   Create a `.env.local` file in the project’s root directory to store environment variables.

```bash
mv .env.local.example .env.local
```

Setting up the `.env.local` file is critical for securely storing your environment ID. This ID is necessary for accessing Dynamic’s features and connecting to the Web3 backend.

Open the `.env.local` file and add your environment ID for Dynamic.

```bash
NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=YOUR_ENVIRONMENT_ID
```
  </Step>
   <Step title="Run the Development Server">
    Start the development server using Bun or Yarn.
    <Tabs>
  <TabItem value="contribute" label="Using Bun" default>
    ```
    bun dev
    ```
  </TabItem>
  <TabItem value="contest" label="Using Yarn">
   ```
   yarn dev
   ```
  </TabItem>

</Tabs>


Visit [http://localhost:3000](http://localhost:3000) in your browser to view your project.

<img src="/img/developers/quickstart/dynamic-starter-kit/image2.png" alt="The homepage of the Rootstock Dynamic Starterkit"/>
  </Step>

</Steps>


## **Interacting with the Frontend**

<Steps>
  <Step title="Connect Wallet">
  * Use the `DynamicWidget` component for connecting to a wallet through options like MetaMask or WalletConnect. You can also offer social login options for enhanced accessibility.  
   * Once logged in, you will see a similar image like this

<img src="/img/developers/quickstart/dynamic-starter-kit/image3.png" alt="Connect wallet using DynamicWidget component"/>

  </Step>
  <Step title="Check Token Balances">
   
   The [`Balances`](https://github.com/RookieCol/rootstock-dynamic/blob/main/components/Balances.tsx) component fetches and displays the wallet's token balances, supporting multiple tokens like RBTC, tRIF, and DOC. 
  </Step>
  <Step title="Send Tokens">
   Through the [`Transfer`](https://github.com/RookieCol/rootstock-dynamic/blob/main/components/Transfer.tsx) component, users can transfer tokens directly within the dApp. It includes fields to specify the recipient address and token amount, along with secure hooks to initiate the transfer.

   **Features:**

   * **Dropdown**: Select a token from available options (**RBTC, tRIF, and DOC**)  
   * **Input Fields**:

      - **Amount:** Enter the amount to send.

      - **Recipient Address:** Enter the address to send tokens to.
  </Step>

  <Step title="Sign Messages">
   The [`SignMessage`](https://github.com/RookieCol/rootstock-dynamic/blob/main/components/SignMessage.tsx) component enables the user to sign arbitrary messages using the connected wallet. This feature is useful for activities like authentication or data validation.

  </Step>
</Steps>
<br/>

By the end of this guide, we learned how to integrate Web3 features into a **Next.js** app using the **Dynamic Starter Kit for Rootstock**. With **wagmi hooks**, we can easily connect wallets, manage token balances, send tokens, and sign messages directly within your application.

We’ve also learnt how **Dynamic’s embedded wallet** simplifies the user experience by eliminating the need for external wallet apps. This integration makes Web3 more accessible, especially for beginners to the blockchain. With support for popular wallets like **MetaMask** and **WalletConnect**, and pre-configuration for the **Rootstock Testnet**, developers now have a secure, user-friendly foundation to build and test their Web3 applications.

View the complete project and code on [Github](https://github.com/rsksmart/rootstock-dynamic).