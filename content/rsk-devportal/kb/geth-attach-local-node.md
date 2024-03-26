---
menu_order: 2000
menu_title: Geth attach to RSK local node
layout: rsk
title: How to Attach Geth to Rootstock Node
tags: tutorial, rsk, geth, ethereum
description: "How to use the Ethereum client Geth to attach to an RSK local node (regtest) and run JSON-RPC commands."
---

Attaching Geth (Go Ethereum) to a Rootstock node involves connecting the Ethereum-compatible Geth console to the Rootstock blockchain. Rootstock's virtual machine has been designed to be compatible with the Ethereum Virtual Machine (EVM), allowing for the seamless use of numerous Ethereum development tools within the Rootstock ecosystem. 
This process will confirm that your local node is operational and allow you to interact using Ethereum's tooling, thanks to Rootstock's compatibility with the Ethereum Virtual Machine (EVM). To use Geth, the popular Ethereum client, to attach to a Rootstock local node (also known as regtest) and execute JSON-RPC commands, follow the steps in the tutorial below:

### Installing Rootstock Node
[](#top "collapsible")
-  Install Java
    - First, check if you already have Java installed:
      ```
      java -version
      ```
    - If you don’t have it installed, go to [Java Download](https://www.java.com/en/download/) to install it:
    > For Linux and Mac users, install Java using the SDKMAN! 
    - Open your terminal and enter the following command:
      ```
      curl -s "https://get.sdkman.io" | bash
      ```
    > This command downloads and runs the SDKMAN installation script.
    - After installation, you'll need to initialize SDKMAN with the following command:
      ```
      source "$HOME/.sdkman/bin/sdkman-init.sh"
      ```
    > This command adds SDKMAN to your current shell session.
    - Install Java using SDKMAN. To install a specific version of Java, use:
      ```
      sdk install java 8.0.<version>-<dist>
      ```
    > Replace <version> with the update number, and <dist> with the distribution identifier, such as `adoptopenjdk` or any other distribution available through SDKMAN.
    - If you just want to install the latest version of Java 8, you can use:
      ```
      sdk install java 8.0.<dist>
      ```
    - If you have multiple versions of Java installed, you can switch between them using:
      ```
      sdk use java <version>
      ```
    - To see all available Java versions and distributions, use:
      ```
      sdk list java
      ```
- Installing Rootstock Local Node
  - To install a Rootstock node locally, follow the [full guide on installing RSKj](/rsk/node/install/).
- Run RSKj
  - Depending on the method you used to install the Rootstock node, you can check the appropriate method to run the node in the [installation page](/rsk/node/install/). If you used Java, you can run the node using any of the following commands:
  - On Windows:
    ```
    java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --regtest
    ```
  - On Linux and Mac:
    ```
    java -cp <PATH-TO-THE-RSKJ-JAR>.Start --regtest
  ```
  > Replace <PATH-TO-THE-RSKJ-JAR> with the full path to the JAR file on your computer. Suppose you saved the JAR file at C:\Rootstock\node; the full path will be C:\Rootstock\node\rskj-core-6.0.0-ARROWHEAD-all.jar or similar.

  > **Note**: Do not close this terminal window. If closed, the Rootstock node will stop running.
-  Check if the node is running using cURL
    - To confirm that your Rootstock node is now running, open a new terminal window and send the following request to the node's RPC HTTP server:
    ```
    curl localhost:4444/1.1.0/ -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
    ```
    - This should return a response similar to the following:
    ```
    {"jsonrpc":"2.0","id":1,"result":"0xfc0"}
    ```
    >
    > The result property in the response is the number of the latest block that has been synced. Note that this value is in hexadecimal, so the output above indicates that the current block number is 4032.

### Download and Install Geth
[](#top "collapsible")
- Download Geth
  - Visit the official Go-Ethereum website: https://geth.ethereum.org/downloads.
  - Select the appropriate download from the Stable Releases section for your operating system (Windows, macOS, Linux).
    ![Geth Website](/assets/img/kb/port-eth-dapp/geth-interface.png)
- Install Geth
  - Windows:
    - Double-click the downloaded .exe file.
    - Follow the on-screen instructions. We recommend that you accept the default installation options. You do not need to install the optional Development tools.
    - Click Finish to complete the installation.
  - macOS/Linux:
    - Open a terminal window.
    - Navigate to the directory containing the downloaded .tar.gz file.
    - Extract the archive using the following command (replace filename.tar.gz with the actual downloaded file name):
      ```
      tar -xvf filename.tar.gz
      ```
    - Move the extracted folder (typically named geth) to a desired location using the mv command. For example,  mv geth /usr/local/bin
- Verify Installation
  - Open a new terminal window.
  - Type geth version and press Enter.
  - If the command displays the installed Geth version, the installation was successful.
    ![Running Geth Version](/assets/img/kb/port-eth-dapp/running-geth-version.png)
- Connect Geth to Roostock Node
  - Ensure your Rootstock node is up and running before connecting with Geth. You can verify this by following the instructions in the previous section on installing and running the node.
  - To connect Geth with your Rootstock local node, launch a new terminal window and run the following command:
    ```
    geth attach http://127.0.0.1:4444
    ```
  ![Running Geth Attach](/assets/img/kb/port-eth-dapp/running-geth-attach.png)
  > geth attach connects to the Rootstock local node with HTTP-RPC server enabled and listening on port 4444.


### Interact with Rootstock Node using Geth
Once connected to your Rootstock node through Geth, you can explore its functionalities using various commands. Here's a breakdown of some commonly used commands:
[](#top "collapsible")
- Checking Node Information
  - eth.blockNumber: This displays the latest block number on the node, indicating the number of blocks mined so far. This number will continuously increase as the node continues mining.
  - eth.gasPrice: This shows the current gas price on the network, which is typically 0 for a local node.
  - net.version: This reveals the network ID of your Rootstock node, helping you identify the specific network you're connected to.
  - net.peerCount: This command checks the number of other nodes connected to your local node in the network. Since you're running a local node, this will likely return 0, indicating you're alone on the network.
- Managing Accounts
  - personal: This command provides information about accounts and available functions on your local node. The example output shows that your pre-configured Rootstock node typically comes with some accounts.
  ![Result of Personal](/assets/img/kb/port-eth-dapp/result-of-personal.png)
  - personal.listAccounts: This retrieves a list of all account addresses present on your local node. This is similar to running eth.accounts.
  - personal.newAccount("password"): This creates a new account on the node and requires assigning a strong password ("password" is a placeholder, use a complex and unique password you can remember). The command will return the newly created account's address.
- Checking Account Balances
  - eth.getBalance(accountAddress): This command checks the balance of a specific account. Replace accountAddress with the actual address of the account you want to check. The returned value will be a large number in "wei," the smallest denomination of the currency.
  web3.fromWei(balanceInWei, "ether"): Use this command to convert the balance from wei to a more readable unit like Ether. Replace balanceInWei with the value obtained from eth.getBalance and specify "ether" as the conversion unit.
  ![Result of fromWei](/assets/img/kb/port-eth-dapp/getBalance-fromWei.png)
- Transferring RBTC
  - eth.sendTransaction({from: senderAddress, to: receiverAddress, value: amountInWei}): This command initiates a transfer of RBTC from one account to another. Replace senderAddress and receiverAddress with the actual addresses of the sending and receiving accounts, respectively. The value parameter specifies the amount of RBTC to transfer, provided in wei.
- Exploring Commands
  - Type two spaces and hit the Tab button twice: This displays a list of available Geth commands and their syntax, similar to the example output shown. This helps you discover and explore additional functionalities within Geth.
- Exiting Geth Console
  - exit: This command disconnects you from the Rootstock node and exits the Geth console.
  > Note: When executing commands, replace placeholders like <address_to_transfer_rbtc_to> and "password" with the actual values. These examples utilize test RBTC specific to the local node environment.
