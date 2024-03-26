---
menu_order: 2200
menu_title: Remix and Metamask with RSK testnet
layout: rsk
title: Using Remix and Metamask with RSK testnet
tags: tutorial, rsk, remix, metamask
description: "Configure a wallet using Metamask, connect with Remix, compile and deploy a smart contract at RSK testnet."
---
This section walks you through creating and deploying a simple smart contract on the Rootstock Testnet using Remix and Metamask. Rootstock's virtual machine is compatible with the Ethereum virtual machine (EVM), allowing you to use familiar development tools and platforms.

Before you begin, you'll need:

- Metamask: Metamask is a browser wallet extension that facilitates transactions with your crypto accounts. It works with various blockchain networks, including Rootstock and Ethereum. Install the appropriate extension for your browser (Chrome, Firefox, Opera, Brave) from https://metamask.io/.
- Remix: An online IDE for writing, compiling, and deploying Solidity smart contracts. Access it at https://remix.ethereum.org/.
- Some Testnet RBTC: You can get these for free from the Rootstock Testnet Faucet at https://faucet.rootstock.io/. You'll need them to cover transaction fees. We’ve covered how to get them in this guide.

### Deploying a Smart Contract on Rootstock Testnet with Remix and Metamask

[](#top "collapsible")

- Setting Up Metamask for Rootstock Testnet

  - Follow the Rootstock Metamask guide to download and connect MetaMask to the Rootstock network. Once set up, switch your Metamask network to Rootstock Testnet.
- Getting Testnet RBTC

  - Visit the Rootstock Testnet Faucet: https://faucet.rootstock.io/
  - Copy your wallet address from Metamask.
  - Paste the address into the faucet and complete the CAPTCHA.
  - After a few seconds, you'll receive some test RBTC (tRBTC).

  > Refresh your Metamask wallet after a few seconds to confirm some tRBTC is now in your wallet.
  >
- Connecting Remix to Rootstock Testnet

  - Navigate to Remix at https://remix.ethereum.org/.
  - Click the Deploy & Run Transactions button (usually the 4th from the left).
  - In the Environment dropdown at the top of the page, select Injected Provider - Metamask. This prompts you to enter your Metamask password and connects Remix with your active Metamask account.
  - Click on Next, then Confirm to establish the connection.
- Creating and Compiling the Smart Contract

  - Click the file explorer icon (second icon on the left pane).
  - Click the file icon to create a new file (e.g., SimpleStorage.sol).
  - Paste the following code into the file:
    ```s
    // SPDX-License-Identifier: MIT

    pragma solidity 0.8.24;
    contract SimpleStorage {
      uint storedData;
      function set(uint x) public {
        storedData = x;
      }
      function get() public view returns (uint) {
        return storedData;
      }
    }
    ```

  > This simple contract stores a number (storedData) and has functions to set (set()) and retrieve (get()) that value.
  >

  - Click the Solidity compiler icon (third icon on the left pane).
  - Ensure Enable auto-compile is checked and click Compile SimpleStorage.sol

  > Verify a green checkmark and a Compilation successful message appears.
  >
- Deploying the Smart Contract

  - Navigate back to the Deploy & Run Transactions button.
  - The contract (SimpleStorage.sol) should be automatically selected.
  - Click Deploy to initiate deployment.
  - A Metamask popup will appear, requesting confirmation for the transaction fee. Click Confirm

  > The deployment process will begin. You can monitor its progress in Remix terminal at the bottom of the page and on your Metamask interface.
  >
  > Once confirmed, you'll see the transaction details and a transaction hash, which you can use to verify on the blockchain explorer.
  >
- Interacting with the Smart Contract

  > At the bottom of the Deploy & Run Transactions panel, you should see your deployed contract (e.g., SimpleStorage).
  >

  - Click the > symbol to expand the contract details.
  - The get() function allows you to retrieve the stored data (currently empty). Click the blue get() button to see the stored value.
  - To set a new value, enter a number (2000, for example) in the field next to the orange set() button and click it.
  - Confirm the transaction fee in the Metamask popup.

  > After confirming the transaction fee for setting a new value, the process will be initiated. You can monitor the transaction progress in the Remix terminal or Metamask.
  >
  > Upon confirmation, you can use the get() button again to see the updated stored value reflecting the new number you entered.
  >
- Exploring the Rootstock Testnet Explorer

  - The Rootstock Testnet Explorer allows you to view transaction details on the blockchain.
  - Copy the transaction hash from the deployment or interaction process.
  - Go to the Rootstock Testnet Explorer: https://explorer.testnet.rootstock.io/.
  - Paste the transaction hash into the search bar at the top of the screen and press enter.

  > The explorer will display detailed information about the transaction, including its status, block number, gas used, and more.
  >
  > Congratulations! You've successfully deployed and interacted with a smart contract on the Rootstock Testnet using Remix and Metamask. This is a great starting point for exploring smart contract development on Rootstock.
  >
