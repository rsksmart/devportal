---
menu_order: 2100
menu_title: Deploy a smart contract using Remix and Geth
layout: rsk
title: Deploy a Smart Contract on Rootstock Local Node using Geth and Remix
tags: tutorial, rsk, geth, remix, ethereum, smart contract
description: "How to compile a smart contract using Remix and deploy it on a local node using Geth."
---


This section walks you through deploying a smart contract on your Rootstock local node using Geth and Remix, a popular online development environment for Ethereum and EVM-compatible blockchains like Rootstock.

Before you begin, ensure the following:
- **Java JDK:** Installed and accessible on your system. You can check the version using java -version on your terminal.
- **Rootstock Local Node:** Up and running. Refer to the Rootstock documentation for installation instructions.
- **Geth:** Installed and configured to connect to the Rootstock node (refer to previous sections for guidance).
- **Internet connection:** Remix is an online tool that requires internet access.
- **Basic understanding of:**
    - Smart contracts (optional)
    - Using a terminal/command prompt

### Connect Geth to a Rootstock node
[](#top "collapsible")
- Run Rootstock node and connect Geth
    - Run your Rootstock node using the following command:
        ```
        java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --regtest
        ```
    > Note: Replace with your path to the JAR file.
- Connect to the node using Geth attach
    - After running the node, connect Geth by running the following command:
        ```
        geth attach http://127.0.0.1:4444
        ```


### Create and deploy a smart contract on Remix
[](#top "collapsible")
- Create a Smart Contract in Remix
    - Open https://remix.ethereum.org/ in your web browser.
    - Click on the dropdown under the Workspaces section on the left side of the screen.
    - Select -create a new workspace- from the dropdown menu.
        ![Remix Interface](/assets/img/kb/port-eth-dapp/rem-interface.png)
    - Create a new file, Register.sol by clicking the file icon under the dropdown.
    - Paste the following code in your newly created file:
        ```
        // SPDX-License-Identifier: MIT

        pragma solidity 0.8.24;

        contract Register {
            string private info;

            function setInfo(string memory _info) public {
                info = _info;
            }

            function getInfo() public view returns (string memory) {
                return info;
            }
        }
        ```
- Compile the Smart Contract
    - Click the third button from the left menu pane (Solidity compiler icon).
    - Ensure Enable auto-compile is checked and click Compile Register.sol.
    - Verify a green checkmark and Compilation successful message appear.
        ![Compile Contract](/assets/img/kb/port-eth-dapp/compile-contract.png)
- Create Deployment Script
    - Switch to your terminal and create a new file, register.js, using your preferred text editor.
    - In the Remix compiler screen, click the Compilation Details button.
    - Scroll down and find web3Deploy.
    - Copy the text and paste it into your register.js file.
        ![Web3Deploy](/assets/img/kb/port-eth-dapp/compilation-web3deploy.png)
    - Save the file.
- Deploy the Smart Contract
    - In your Geth terminal, type the following command, replacing <path-to-register.js> with the actual path to your file:
        ```
        loadScript("<path-to-register.js>")
        ```
    > Wait for messages and watch for "Contract mined!" indicating successful deployment.
- Interact with the Smart Contract:
    - In your Geth terminal, type register. and press Tab twice to see available methods and the contract address.
    - For example, you can:
        - Check initial information with register.getInfo().
        - Set new information with register.setInfo("RSK", {from: eth.accounts[1]}), replacing "RSK" with your desired information and specifying the sender account (e.g., eth.accounts[1]).
        - Verify the update with register.getInfo().
            ![Interact](/assets/img/kb/port-eth-dapp/fig9.png)