---
sidebar_position: 2
sidebar_label: CLI Commands on Rootstock CLI
title: CLI Commands on Rootstock CLI
description: "The Rootstock CLI  (Command Line Interface) lets you manage your Rootstock wallet directly from the terminal. Create, manage, and fund your wallet with RBTC (Rootstock Bitcoin) easily and securely." 
tags: [Rootstock CLI, developer tools, guides, rsk, rootstock, dApps, smart contracts, solidity, dev-environments]
---

The **Rootstock CLI (rsk-cli)** allows for creating and managing wallets on the Rootstock network. Create, manage, and fund your wallet with tokens directly from the terminal or via a [Sandbox](https://replit.com/@rootstockDevX/Rootstock-CLI).

With the Rootstock CLI, managing your wallet is simple. You can view saved wallets, switch between them, update wallet names, or delete wallets. Its user-friendly design ensures easy handling of all wallet tasks quickly and efficiently from the terminal.

## Managing Your Wallet

To begin managing your wallet using Rootstock CLI, run the following command in your terminal:

```bash
rsk-cli wallet
```

This command opens up a prompt that will guide you through managing your wallet. Once executed, you will see a screen with several options, like the one below:                


```bash
📁 Wallet data file found.
? What would you like to do? (Use arrow keys)
❯ 🆕 Create a new wallet
  🔑 Import existing wallet
  🔍 List saved wallets
  🔁 Switch wallet
  📝 Update wallet name
  ❌ Delete wallet
```

:::info[How to Use:]

- Use the arrow keys to navigate through the options. 

- Press **Enter** to select the desired action. 


:::

This interface allows you to manage your wallets with the following options: 

1. **🆕 Create a new wallet:** Generate a brand-new wallet for managing your assets securely on the Rootstock network. 


2. **🔑 Import existing wallet:** Import an existing wallet by providing your private key or recovery phrase. 

3. **🔍 List saved wallets**: View a list of all wallets saved locally in your application. 

4. **🔁 Switch wallet:** Quickly switch between your saved wallets to access the one you need. 

5. **📝 Update wallet name:** Rename your saved wallets for better organization and identification. 

6. ❌ **Delete wallet:** Remove a wallet from your saved list (note: this action does not delete the wallet from the blockchain). 



<Steps>
 <Step title="Creating a New Wallet">
   When creating a a new wallet, the system generates a new wallet address and private key. You'll see a screen like this:

```bash
🎉 Wallet created successfully on Rootstock!
📄 Address: 0x05BFa711ef4B2f40855C4E73bA96a8Da86a4be9F
🔑 Private Key: 0x5c8250445d6d6b08d6debb4e9137e189b8bd7fe06299c0452b517178415b278a
```
<Button size="sm" href="https://replit.com/@rootstockDevX/Rootstock-CLI">Try in Replit</Button>

:::warning[Warning]

The private key is a critical piece of information that enables users access funds. **Never share it** with anyone and store it securely, as losing the private key means losing access to your wallet.

:::


You’ll be prompted to enter a password to encrypt your wallet:

```bash
? 🔒 Enter a password to encrypt your wallet:
```

#### **Choosing a Password:**

The password you enter will encrypt your wallet, adding an extra layer of security. Choose a strong password (avoid using simple passwords like **'1234567890'**), as this protects your wallet file in case someone gains access to your computer.

Once you’ve entered the password, you’ll see a message confirming the secure storage of your wallet:

```shell
💾 Wallet saved securely at /Users/your_username/Documents/Rootstock/rsk-cli/rootstock-wallet.json
```

**Tip:** Backup the rootstock-wallet.json file as this is your encrypted wallet file, which can be used to recover your wallet if lost.

#### **Importing an Existing Wallet (Using a Private Key)**

If you already have a wallet and want to import it, select the "Insert your private key" option. You'll be prompted to enter your private key:

```bash
? 🔑 Enter your private key: ******************************************************************
```

Once entered, the system will validate the private key and display the associated wallet address:

```shell
✅ Wallet validated successfully!
📄 Address: 0x05BFa711ef4B2f40855C4E73bA96a8Da86a4be9F
```

You’ll then be asked to create a password to encrypt the wallet, similar to when you create a new one. After this, the wallet file will be saved securely on your local machine:

```bash
💾 Wallet saved securely at /Users/your_username/Documents/Rootstock/rsk-cli/rootstock-wallet.json
```

 </Step>
 <Step title="List Saved Wallets">
    Use the arrow keys on your keyboard to navigate to the option labeled:

```bash
🔍 List saved wallets
```

-  Press the Enter key to select this option.

-  After selecting `List saved wallets`, you will see an output similar to the following on your terminal:

```bash
📜 Saved wallets (1):
- iktesty: 0x3874788Fd23c951525c535Cd5F396574E58e3551

🔑 Current wallet: iktesty
```

:::note[The output provides:]

*  **📜 Saved wallets (1):**   This indicates the total number of wallets saved in the system. In this case, there is 1 saved wallet.

*  **\- iktesty:**   This is the name of the saved wallet. Wallet names can help to identify and organize multiple wallets.

*  **0x3874788Fd23c951525c535Cd5F396574E58e3551:**   This is the public address of the saved wallet. Use it to send or receive assets.

*  🔑 **Current wallet:** iktesty:   This indicates the currently active wallet. Any actions, such as transactions, will default to using this wallet.

:::


#### **Multiple Wallets Saved:**

 You’ll see a list of all saved wallets, like this:

```bash
📜 Saved wallets (3):
- wallet1: 0x1234567890abcdef1234567890abcdef12345678  
- wallet2: 0xabcdef1234567890abcdef1234567890abcdef12  
- iktesty: 0x3874788Fd23c951525c535Cd5F396574E58e3551  
🔑 Current wallet: iktesty
```



* Identify the wallet needed based on its name or address.

* If necessary, switch to a different wallet using the Switch wallet option from the main menu.


 </Step>
 <Step title="Switch Wallets">
    Use the arrow keys on your keyboard to navigate to the option labeled:

- If multiple wallets are saved, you will see a prompt like this:

```bash
🔁 Switch wallets
```

- Press the Enter key to select this option.

-  After selecting `Switch wallets`, you will see an output similar to the following on your terminal:

```bash
? 🔁 Select the wallet you want to switch to: (Use arrow keys) 
❯ tyhge
  testdd
```

- Use the arrow keys to scroll through the list of available wallets.  
- Highlight the wallet you want to switch to (e.g., `tyhge`).  
- Press Enter to confirm your selection.

 After selecting a wallet, you will see a confirmation similar to this:

```bash
✅ Successfully switched to wallet: tyhge  
📄 Address: 0x09ea9Ea39663634F546c0fbEF507811AD7cC4182  
💾 Changes saved at /Users/wisdomnwokocha/rootstock-wallet.json
```

:::note[The output provides:]

* **✅ Successfully switched to wallet:** Confirms the wallet switch was successful.  
* **📄 Address:** Displays the public address of the newly selected wallet.  
* **💾 Changes saved:** Confirms the updated wallet information has been saved to the specified file.

:::



#### **No Other Wallets Available**

If you attempt to switch wallets but only have one wallet saved, you will receive the following error:

```text
🔁 Switch wallet  
❌ No other wallets available to switch to.
```

 </Step>
 <Step title="Update Wallet Name">
  Use the arrow keys on your keyboard to navigate to the option labeled:

```text
📝 Update wallet name
```

-  Press the Enter key to select this option.

-  After selecting this option, you will see a list of saved wallets like this:

```bash
📜 Available wallets:
- iktesty: 0x3874788Fd23c951525c535Cd5F396574E58e3551
- tyhge: 0x09ea9Ea39663634F546c0fbEF507811AD7cC4182 (Current)
? 📝 Select the wallet you want to update the name for: (Use arrow keys)
❯ iktesty  
  tyhge
```

- Use the **arrow keys** to highlight the wallet you want to rename (e.g., `iktesty`).  
- Press **Enter** to confirm your selection.  
- After selecting the wallet, you will be prompted to enter a new name:

```text
🖋️ Enter the new name for the wallet "iktesty":
```

- Type the new name (e.g., `wistest`) and press **Enter**.  
- Once the name is updated, you will see a response like this:

```text
✅ Wallet name updated from "iktesty" to "wistest".  
💾 Changes saved at /Users/wisdomnwokocha/rootstock-wallet.json
```

**Verify the Updated Wallet Name:**

To confirm the update, return to the main menu and select:

```text
🔍 List saved wallets
```

You will see a list of wallets reflecting the updated name:

```bash
📜 Saved wallets (2):  
- tyhge: 0x09ea9Ea39663634F546c0fbEF507811AD7cC4182  
- wistest: 0x3874788Fd23c951525c535Cd5F396574E58e3551  

🔑 Current wallet: tyhge  
```
 </Step>
 <Step title="Delete Wallet">
   
 Use the arrow keys on your keyboard to navigate to the option labeled:

```text
❌ Delete wallet
```

-  Press the Enter key to select this option.

-  After selecting this option, you will see the information about your wallets, like this:

```text
📁 Wallet data file found.

🔑 Current wallet: tyhge
? What would you like to do? ❌ Delete wallet
📜 Other available wallets:
- wistest: 0x3874788Fd23c951525c535Cd5F396574E58e3551
? ❌ Select the wallet you want to delete: (Use arrow keys)
❯ wistest
```

#### **Key Points:**

* **🔑 Current wallet:** The current active wallet (e.g., `tyhge`). The system does not allow deleting the currently active wallet.  
* **📜 Other available wallets:** A list of all wallets that can be deleted (e.g., `wistest`).  
* Use the **arrow keys** to highlight the wallet you want to delete (e.g., `wistest`).  
* Press **Enter** to confirm your selection.

- After selecting the wallet to delete, you will be prompted to confirm the action:

```text
❗️ Are you sure you want to delete the wallet "wistest"? This action cannot be undone. (y/N)
```

- Type **`y`** to confirm the deletion and press **Enter** to proceed.  
- Once the wallet is deleted, you will see the following response:

```text
🗑️ Wallet "wistest" has been deleted.  
💾 Changes saved at /Users/wisdomnwokocha/rootstock-wallet.json
```

- To confirm that the wallet has been deleted, return to the main menu and select `🔍 List saved wallets`

- You should see an updated list of wallets without the deleted one, like this:

```text
📜 Saved wallets (1):  
- tyhge: 0x09ea9Ea39663634F546c0fbEF507811AD7cC4182  

🔑 Current wallet: tyhge  
```

> If only one wallet is saved, you cannot delete it because the system does not allow deleting the current wallet.

```shell
❌ No other wallets available to delete.
```
  </Step>
</Steps>


## Confirming Your Wallet Exists

Once the wallet has been created, we need to ensure it’s registered on the Rootstock blockchain. Rootstock provides two blockchain explorers to check a wallet's existence and track its transactions:

- **Testnet Explorer**: For testing purposes, view your wallet on the Rootstock Testnet Explorer at [https://explorer.testnet.rootstock.io/](https://explorer.testnet.rootstock.io/).  
- **Mainnet Explorer**: For real transactions on the main Rootstock network, use the Mainnet Explorer at [https://explorer.rootstock.io/](https://explorer.rootstock.io/).

Enter your wallet address in the search bar of the explorer to view transaction history and balance information.

:::tip[Tip]

When practicing or testing, always use the Testnet to avoid risking actual funds.

:::


## Adding Funds to Your Wallet

To perform transactions on the Rootstock network, we’ll need RBTC. To easily fund your wallet, request RBTC from the Rootstock faucet.

#### **Steps to Add RBTC:**

1. Visit the official Rootstock Faucet: [faucet.rootstock.io](https://faucet.rootstock.io/).  
2. Enter your wallet address in the provided field.  
3. Click the **"Get RBTC"** button.

You’ll see a transaction confirmation screen, similar to this:

<figure>
<img src="/img/guides/rsk-cli/rsk-cli-faucets.png" alt="Rootstock Faucet Transaction Confirmation"/>
  <figcaption>Rootstock Faucet Transaction Confirmation (fig 1.)</figcaption>
</figure>

#### **Viewing the Transaction:**

Click on the **Transaction Hash** button to view the transaction details on the Rootstock explorer. This will show you if the transaction has been confirmed and how much RBTC was credited to your wallet.

> The Rootstock faucet provides free RBTC for testing on the Rootstock testnet. This faucet is intended for development and testing purposes only.  You can also find  [alternative faucets available](https://dev.rootstock.io/dev-tools/#filters=faucet).

## Checking Your Wallet Balance

The balance command in the Rootstock CLI allows for viewing the amount of RBTC in your wallet on the Rootstock network. This command supports both Mainnet (live network) and Testnet (testing network). Always make sure to use the correct network to avoid any confusion.

<Tabs>
   <TabItem value="contribute" label="Mainnet" default>
  
  To check the balance on the Mainnet, run this command:

   ```bash
   rsk-cli balance
   ```

<Button size="sm" href="https://replit.com/@rootstockDevX/Rootstock-CLI">Try in Replit</Button>
 
<br/>
<br/>
  **Expected Output:**
    ```bash
     📄 Wallet Address: 0x05BFa711ef4B2f40855C4E73bA96a8Da86a4be9F
     🌐 Network: Rootstock Mainnet
     💰 Current Balance: 0 RBTC
    🔗 Ensure that transactions are conducted on the correct network.
     ```

:::note[The output provides:]

 - **Wallet Address**: Your unique Rootstock wallet address.  
 - **Network**: This specifies that the balance is being checked on the Mainnet.  
 - **Current Balance**: Displays the amount of RBTC currently in your wallet.

:::

  
</TabItem>

  <TabItem value="contest" label="Testnet">
    To check your balance on the Testnet, add the -t or --testnet flag, this indicates that you want to check a balance on testnet:

    ```bash
    rsk-cli balance -t
    ```

  **Expected Output:**

  ```bash
  📄 Wallet Address: 0x05BFa711ef4B2f40855C4E73bA96a8Da86a4be9F
  🌐 Network: Rootstock Testnet
  💰 Current Balance: 0.000499835435453 RBTC
  🔗 Ensure that transactions are conducted on the correct network.
  ```
  </TabItem>

</Tabs>


## Transferring RBTC

The transfer command allows for sending RBTC from your wallet to another address on the Rootstock network. As with the balance command, you can perform transfers on either the Mainnet or Testnet.

:::info[Info]

For testing, always use the Testnet to avoid risking real funds.

:::

<Tabs>
  <TabItem value="contribute" label="Mainnet" default>
    
To transfer funds on the Mainnet, use the following command, replacing 0xRecipientAddress with the address you want to send RBTC to and 0.001 with the amount you wish to send:

### **Parameters:**

- `--address \<RecipientAddress\>`: This specifies the recipient’s address on the RSK network. Replace `<RecipientAddress\>` with the actual RSK-compatible wallet address of the recipient.  

- `--value \<Amount\>`: This defines the amount of RSK (RBTC) you want to transfer. Replace `<Amount\>` with the exact amount of RBTC you want to send. Make sure to verify that the amount is correct and that your account has enough balance to cover the transaction and any fees.

```bash
rsk-cli transfer --address 0xRecipientAddress --value 0.001
```

**Expected Output:**

```shell
📄 Wallet Address: 0xcfEa49816A22fa49524e1d62FDF8f0F938b1FE5C
🎯 Recipient Address: 0x05BFa711ef4B2f40855C4E73bA96a8Da86a4be9F
💵 Amount to Transfer: 0.001 RBTC
💰 Current Balance: 0.000499835710721 RBTC
```
  </TabItem>
  <TabItem value="contest" label="Testnet">
   To transfer RBTC on the Testnet, use the \-t or \--testnet flag:

### Parameters

**`--txid \<TransactionID\>`: This specifies the transaction ID of the transaction you want to retrieve details for. Replace `<TransactionID\>` with the unique identifier of the transaction.

```bash
rsk-cli transfer --testnet --address 0xRecipientAddress --value 0.001
```

If the specified amount exceeds your wallet balance, the CLI will provide an error message:

```text
🚫 Insufficient balance to transfer 0.001 RBTC.
```

If there’s sufficient funds, you’ll be prompted to enter your password to decrypt the wallet:

```text
? Enter your password to decrypt the wallet: **********
```

Upon successful password entry, you’ll receive transaction details:

**Expected Output:**

```bash
🔄 Transaction initiated. TxHash: 0xdbef066d61aa9074232ed9c8eabf3e779d2bf9fe29c59bf86bb8027503f38b0a
✅ Transaction confirmed successfully!
📦 Block Number: 5682575
⛽ Gas Used: <Gas details>
```

  </TabItem>
 
</Tabs>


