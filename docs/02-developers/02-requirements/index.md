---
sidebar_label: Rootstock Development Prerequisites
sidebar_position: 2
title: Rootstock Development Prerequisites
tags: [rsk, rootstock, prerequisites, setup, requirements]
description: "Minimum hardware requirements for Rootstock."
---

This guide provides clear instructions for developers on the supported Solidity versions and the necessary configurations needed to ensure your smart contracts are deployed on the Rootstock network. 
 
:::tip[Hackathons & Workshops]

- Participating in a Rootstock Hackathon or Workshop?
- Visit the [Hackathon Resources](/resources/hackathon/)  section for details.

- **Resources:**  
  - Explore the [Developer Tools](/dev-tools/) section for a full list of tools and resources.  

:::
<Steps>
 <Step title="Software Requirements:">
   

Set up the necessary software for a seamless development experience:  

- **Solidity Version:**  
  - Supported compiler version: **`solc 0.8.19`**.  
  - Use compatible versions to avoid deployment errors.  

- **Node RPC Access:**  
  - Interact with Rootstock using its RPC API.  
  - [Get an API Key](/developers/rpc-api/rootstock/setup/) and configure it in your applications.  

- **Hardhat:**  
  - Install Hardhat to streamline contract development and testing:  
    ```bash
    npm install --save-dev hardhat
    ```   
    :::tip[Recommended]
    For added convenience, install shorthand globally
    - Install `hh` autocomplete to use `hh` shorthand globally.
    ```bash
    npm i -g hardhat-shorthand
    ```

    - Use the [Hardhat Starter Kit](/developers/quickstart/hardhat)

    - Learn how to write, interact, deploy, and test smart contracts on Rootstock using [Hardhat](/developers/smart-contracts/hardhat) or [Foundry](/developers/smart-contracts/foundry/).

     :::

- **Foundry (Optional):**  
  - Install Foundry as an alternative to Hardhat for building, deploying, and testing contracts:  
    ```bash
    curl -L https://foundry.paradigm.xyz | bash
    ```  
  - Run `foundryup` to install tools like `forge`, `cast`, `chisel` and `anvil`.  
</Step>

<Step title="Wallet Configuration:">
   
Set up your wallet to connect with Rootstock networks:  

- **MetaMask Integration:**  
  - Configure MetaMask with the necessary values to connect to the Rootstock Mainnet or Testnet.  
  - Refer to the [MetaMask Wallet Configuration](/dev-tools/wallets/metamask/) guide for detailed steps.  

- **Derivation Paths:**  
  - Use these paths for BIP-44-compatible wallets:  
    - **Mainnet:** `m/44'/137'/0'/0/N`  
    - **Testnet:** `m/44'/37310'/0'/0/N`  

 *See the [Account-Based Addresses](#account-based-addresses) section for guidance on address verification.*  
:::info[Info]
See [Account based addresses](/concepts/account-based-addresses/) section for more information or [how to verify address ownership](/developers/smart-contracts/verify-address-ownership/).
:::

</Step>

<Step title="Contract Addresses">
 
Understand and reference key contract addresses for development:  
- Access the full list of **[Rootstock Contract Addresses](#contract-addresses)**.  

</Step>

<Step title="Development Environments:">
    
Choose one of the following environments to build and deploy your contracts:  

- **Hardhat:**  
  - A popular framework for managing smart contract development and testing.  
  - Use the [Hardhat Starter Kit](#hardhat-starter-kit) to jumpstart your project.  

- **Foundry:**  
  - A lightweight, fast alternative to Hardhat.   
  - Install and manage using `foundryup`.  

 
:::note[Development Environments]
Learn how to write, interact, deploy, and test smart contracts on Rootstock using [Hardhat](/developers/smart-contracts/hardhat) or [Foundry](/developers/smart-contracts/foundry/).

💡 *You don’t need to use both  (Hardhat and Foundry); pick the one that suits your workflow.* 
:::
</Step>

<Step title="Command Line Tools">

Boost productivity with these CLI tools:  

> POSIX Compliant Shell

<Tabs>
  <TabItem value="windows" label="Windows">
    Standard terminals like `cmd` or PowerShell may not support some commands. We recommended installing [Git for Windows](https://gitforwindows.org/) for Git Bash, which provides a more UNIX-like experience. 
    
    Here's a [tutorial on Git Bash](https://www.atlassian.com/git/tutorials/git-bash).
  </TabItem>
  <TabItem value="macos" label="MacOS">
    Standard terminal.
  </TabItem>
  <TabItem value="Linux" label="Linux">
    Standard terminal.
  </TabItem>
</Tabs>

### Installing Node.js and NPM

<Tabs>
  <TabItem value="nvm" label="NVM" default>
    - Node v18 or later. 
        - For installation, use [NVM install script](https://github.com/nvm-sh/nvm#install--update-script).
  </TabItem>
  <TabItem value="windows" label="Windows">
    1. Download the Node.js Installer from [Node.js Downloads](https://nodejs.org/en/download).
    2. Run the installer and follow the on-screen instructions.
    3. Open Command Prompt or PowerShell and check versions with `node -v` and `npm -v`. 
        - See Posix Compliant Shell.
  </TabItem>
  <TabItem value="macos" label="MacOS">
    1. Install Homebrew (if not installed):
        ```bash
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)
        ``` 
    2. Install Node.js and npm with `brew install node` 
    3. Check versions in Terminal with `node -v` and `npm -v`
  </TabItem>
  <TabItem value="linux" label="Linux">
      1. Open a terminal.
      2. Update package manager with sudo apt update
      3. Install Node.js and npm with sudo apt install nodejs npm
      4. Check versions in the terminal with `node -v` and `npm -v`
  </TabItem>
</Tabs>
 
  </Step>
</Steps>
