---
sidebar_label: Web3Auth
sidebar_position: 108
title: Rootstock Web3Auth Starter Kit
description: "A step-to-step guide for developers to build and deploy passwordless dApps on Rootstock using Web3Auth and Wagmi starter dApp."
tags: [rsk, rootstock, developers, web3auth, wagmi, quickstart, dApps, Smart Contracts]
---

The [blockchain trilemma](https://www.coinbase.com/en-gb/learn/crypto-glossary/what-is-the-blockchain-trilemma) states that a blockchain can only optimally achieve two out of three desirable properties: decentralization, security, and scalability. This inherent limitation often translates into challenges for dApp developers and, more importantly, for users. It complicates user onboarding (setting up wallets and acquiring cryptocurrency), makes interactions cumbersome (managing wallets and transaction fees), raises security concerns (protecting private keys), and can lead to slow performance due to transaction speeds and fees which directly impacts the user experience of dApps.

Web3Auth bridges this gap by offering a streamlined Single Factor Authentication (SFA) solution that simplifies user onboarding and wallet connections on Rootstock. Whether you're developing a decentralized application (dApp) for experienced crypto users or beginners new to blockchain, Web3Auth makes user interactions intuitive and secure.

By the end of this guide, you will learn how to use the starter kit to integrate Web3Auth and configure your dApp for Rootstock.

## Who is this guide for?

This guide is designed for developers who:
* Are new to blockchain development and want to build user-friendly decentralized applications (dApps).
* Have experience with JavaScript and frameworks like Next.js but are unfamiliar with integrating blockchain functionalities.
* Want to simplify authentication and onboarding for their dApps using Web3Auth.


## Why use Web3Auth?

Web3Auth enhances the dApp experience:
1. Enhanced User Experience
* Provide passwordless logins, eliminating the need for users to remember complicated credentials.
* Simplify wallet management for both technical and non-technical users.
2. Secure Authentication
* Implement robust Single Factor Authentication to protect user data and assets.
3. Seamless Blockchain Interaction
* Enable direct integration with Rootstock blockchain using Wagmi, optimizing interactions like transaction signing and contract interaction.

## Prerequisites

Before getting started, ensure to have the following tools installed:

1. Node.js
    * Install **Node.js** (version **19.x** or later recommended).
    * Verify your installation by running:
        ```shell
        node -v
        ```
2.  Package Manager (Yarn or Bun)
    * Use Yarn (preferred for Next.js projects) or Bun for package management.
    * Install Yarn globally using:
    ```shell
    npm install -g yarn
    ```

    Confirm installation:
    ```shell
    yarn -v
    ```
3. Fund Your Rootstock Blockchain Wallet
    * **Get test RBTC (tRBTC)** from the [Rootstock Faucet](https://faucet.rootstock.io/) to fund your test account.

4. Web3Auth Account
    * Sign up on the [Web3Auth Dashboard](https://web3auth.io/).
    * Create a project to generate your **unique Client ID**.
    * Keep your **Client ID** handy for integration.

5. WalletConnect Account
    * Sign up on [WalletConnect Cloud](https://cloud.walletconnect.com/).
    * Create a project and obtain your **WalletConnect Project ID**.

## Set up the Project 

To set up the sample dApp project, follow the steps below:

<Steps>
  <Step title="1. Set Up a Next.js Project">
    Begin by cloning the [Web3 Auth Sample dApp Starter Kit](https://github.com/rsksmart/w3a-rsk-starter-kit) to set up your project environment. 
    ```shell
    git clone https://github.com/rsksmart/w3a-rsk-starter-kit.git
    ```
    > This will create a local copy of the starter kit, providing a solid foundation for development.
  </Step>
  <Step title="Step 2: Configure Web3Auth Client ID and WalletConnect Project ID">
    1. Copy the Client ID
    <img src="/img/developers/quickstart/web3auth/1.copy_client_id.png"  width="800" height="600"/>
    
    - After creating a project, view the project details screen.
    - Copy the Client ID from the dashboard. This will be used for initializing Web3Auth.

    2. Add Client ID in page.tsx
    <img src="/img/developers/quickstart/web3auth/2.show_client_id.png"  width="800" height="600"/>

    - Open `page.tsx` file in your project.
    - Copy and paste the copied Client ID into the appropriate configuration field in your code.

    3. Create a .env.local File
    - In the root directory of your project, create a file named `.env.local`.
    - Use this env file to store sensitive project information, including the client secret and Project ID.
    ```shell
    NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=your-client-id
    ``` 

    4. Get the WalletConnect Project ID

    <img src="/img/developers/quickstart/web3auth/3.copy_client_id.png"  width="800" height="600"/>

    - Visit https://cloud.reown.com/ and create a WalletConnect project if you don’t already have one.
    - Copy the **Project ID** provided by WalletConnect.
  </Step>

    5. Add WalletConnect to Web3Auth

    <img src="/img/developers/quickstart/web3auth/4.add_walletconnect_web3auth.png "  width="800" height="600"/>

    * Go to the Web3Auth dashboard, and navigate to `Dashboard > Project > Add-ons`
    * Select WalletConnect v2 and input the WalletConnect Project ID.

    Save changes. Ensure all configurations are saved in the Web3Auth dashboard and project files.
  <Step title="Step 3 Start the Project">
    1. Run your project locally using:

    ```shell
    npm run dev
    ```

    OR;

    ```shell
    yarn dev
    ```
    - Open browser and go to http://localhost:3000/.
    - You should see the Rootstock & Web3Auth Starter Kit welcome screen.
  </Step>
</Steps>

## Interacting with the dApp

<img src="/img/developers/quickstart/web3auth/5.web3auth_landing.png" width="800" height="600"/>

1. Click the "Log In / Sign Up" button.
2. A Web3Auth authentication modal will appear, offering multiple sign-in options:
    * Social logins: Google, Facebook, Reddit, Discord, and others.
    * Phone number or email authentication.
    * Wallet-based authentication (connect with a crypto wallet).
    * Once logged in, your connected wallet address will be displayed at the top.

> Tip: You can copy your wallet address by clicking on the copy icon next to it.

3. Choose a Login Method
    * Select the preferred login method from the available options.
    * Follow the on-screen instructions to authenticate.

4. Successfully Sign In
    * Once authenticated, you will be redirected to a new screen.
    * This screen will allow you to interact with blockchain features, such as:
        - Checking balances.
        - Signing messages.
        - Sending transactions.

## Interacting with Rootstock 

To interact with Rootstock using the sample dApp, we will do the following:
- Check balances
- Sign a message
- Send transactions on the Rootstock blockchain using Web3Auth authentication

### Check Balances

The "Check Balances" section displays the token balances in your connected wallet.
It shows the balances for the following Rootstock-based tokens:
- tRIF (Test Rootstock Infrastructure Framework token)
- tRBTC (Test Rootstock Bitcoin token)
- USDRIF (USD-pegged Rootstock token)
- DoC (Dollar on Chain stablecoin)

If you have any of these tokens in your wallet, the token balances will be updated automatically.

> Tip: To add more tokens, use the "Custom token" input field and enter the token contract address. 

### Sign a Message

Click the "Sign a Message" button to sign a message with the connected Web3Auth wallet.

This feature can be used to verify ownership of your wallet or perform off-chain authentication.
Once signed, the message will be securely linked to your wallet.

> Tip: Signing a message attracts _Zero_ gas fees.

### Send a Transaction

1. Select a Token
    * Click the "Select Token" dropdown to choose the token you want to send (e.g., tRBTC, tRIF, USDRIF, DOC, or Custom token).
2. Enter Recipient Address
Paste the recipient’s wallet address into the "To" field.
3. Specify the Amount
    * Enter the amount of tokens you want to send in the "Amount" field.
4. Send Transaction
    * Click the "Send Transaction" button to initiate the transfer.
5. Confirm the transaction in your Web3Auth wallet.

> Tip: Ensure you have enough [tRBTC](https://faucet.rootstock.io/) in your wallet to cover gas fees before sending transactions.


## Resources

- [Wagmi starter kit](/developers/quickstart/wagmi/)
- [Rootstock Faucet](https://faucet.rootstock.io/)
- [Rootstock Explorer](https://explorer.rootstock.io/)