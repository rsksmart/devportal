---
sidebar_position: 300
sidebar_label: Prerequisites
title: "Prerequisites"
description: "Welcome to the overview section of the 2 way peg app documentation."
tags: [2 way peg, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, rootstock, testnet, mainnet, guide, setup, integrate, use]
---

> **Note:** We will be using the 2 way peg app on [2-Way Peg App - Testnet](https://app.2wp.testnet.rootstock.io/) for learning purposes.
> For transactions using **real tokens**, use the [2-Way Peg App - Mainnet](https://app.2wp.rootstock.io/) application.

### Install Apps

The Bitcoin testnet app does not show on Ledger live manager by default. To be able to see the BTC Testnet app you need to enable the developer mode in Ledger live.

- Enable Developer Mode for Bitcoin Testnet
    1. Connect your ledger hardware device and unlock it.
    2. Open Ledger live, click on Manager and open settings. 
    3. Navigate to the experimental features menu and enable developer mode. This will show developer and testnet apps in the manager.
         <div align="left"><img width="70%" src="/img/resources/two-way-peg-app/install-apps-settings.png" alt="Install Apps Settings"/></div>
    4. Go to Ledger live manager and search for Bitcoin testnet app
    5. Click on install to install the Bitcoin Testnet application. To use the testnet app you also need the main Bitcoin app. So install both the apps to your device.
        <div align="left"><img width="70%" src="/img/resources/two-way-peg-app/install-bitcoin-test.png" alt="Install bitcoin test"/></div>
- Get Testnet address
    - On your ledger device, you’ll find all the apps installed on your device. The Bitcoin app to be used on Mainnet, and Bitcoin Test app to be used on Testnet. To start using testnet, we need the testnet address, to get this address:
        1. Open the Bitcoin test app on your ledger device. You will see a “Bitcoin Testnet is ready” screen
        2. In the ledger live app, go to accounts tab, click on add account.
            <div align="left"><img width="70%" src="/img/resources/two-way-peg-app/add-account.png" alt="Add Account"/></div>
        3. Search testnet and select Bitcoin Testnet (BTC). Click on Continue
            <div align="left"><img width="70%" src="/img/resources/two-way-peg-app/add-accounts.png" alt="Add Account 2"/></div>
        4. Approve the Bitcoin Test app on your hardware wallet device
        5. On the next screen choose the address format (Native SegWit / SegWit).
        6. Click on **Add Account**:
            <div align="left"><img width="70%" src="/img/resources/two-way-peg-app/add-account-3.png" alt="Add Accounts 3"/></div>
        > Note: See [supported addresses](/resources/guides/two-way-peg-app/advanced-operations/supported-wallets/) for the types of addresses supported by the 2 way peg app.
        - You have successfully added the Bitcoin testnet app to your account.
            <div align="left"><img width="70%" src="/img/resources/two-way-peg-app/account-added-successfully.png" alt="Account Added Successfully"/></div>

### Get Funds

[](#top "collapsible")
- Get Testnet Tokens
    1. Go to the receive tab on Ledger live.
        <div align="left"><img width="70%" src="/img/resources/two-way-peg-app/receive-tab.png" alt="Receive tab"/></div>
    2. Select Bitcoin testnet and click on continue. 
        <div align="left"><img width="70%" src="/img/resources/two-way-peg-app/receive-tab-select-bitcoin-testnet.png" alt="Receive Tab - Select Bitcoin Testnet"/></div>
    3. Copy BTC Testnet address
        <div align="left"><img width="70%" src="/img/resources/two-way-peg-app/copy-btc-testnet-address.png" alt="Copy BTC Testnet Address"/></div>
    4. Use the following faucet to receive testnet tokens:
        - Open [Coinfaucet](https://coinfaucet.eu/en/btc-testnet/)
        - Paste the address into the field and click on Get Bitcoins. 
    > _Note: You need at least **0.005 BTC** to perform a peg-in on Mainnet and Testnet. Likewise, you need at least **0.004 RBTC** to perform a peg-out on Mainnet and Testnet._
- Get Mainnet Tokens
    - See [Get Crypto on Rootstock](/dev-tools/wallets).
    > The 2 way peg app is available on both Mainnet and Testnet. Both applications follow the same process, for production purposes, use [Mainnet](https://app.2wp.rootstock.io/), for testing and development purposes, use the [Testnet](https://app.2wp.testnet.rootstock.io/). 
    > See [glossary](/resources/guides/two-way-peg-app/glossary/) for explanation of these terms.
    
### Setup Requirements

To get started with the 2-way peg app, ensure you have the following:

[](#top "collapsible")
- System Requirements
    - A computer with at least Windows 8.1 (64-bit), macOS 10.10, or a Linux distribution, and an internet connection.
- Hardware Wallets
    - **Ledger Nano S / Ledger Nano X:**
        - Install [Ledger Live](https://support.ledger.com/hc/en-us/articles/4404389503889-Getting-started-with-Ledger-Live?docs=true) to manage your device and install the Bitcoin and Bitcoin testnet apps. If you haven't, download it from [here](https://www.ledger.com/ledger-live/download).
        - For Ledger Nano S setup, see [Set up your Ledger Nano S](https://support.ledger.com/hc/en-us/articles/360000613793?docs=true).
        - For Ledger Nano X setup, see [Set up your Ledger Nano X](https://support.ledger.com/hc/en-us/articles/360018784134-Set-up-your-Ledger-Nano-X?docs=true).
    - **Trezor Wallet:**
        - Follow the [setup guide](https://wiki.trezor.io/User_manual:Setting_up_the_Trezor_device) for Trezor hardware wallet.
    - **Liquality Software Wallet (Peg-out Requirements only):**
        - Setup the Liquality software wallet by visiting [Liquality's website](https://www.liquality.io/). For more information, see [Liquality - Solutions on RSK](/solutions/liquality/).
    - **Metamask Wallet (Peg-out Requirements only):**
        - For more details, see [Metamask Wallet](/dev-tools/wallets/metamask/)
    > For Peg-out requirements, ensure you have either the Liquality or Metamask wallet installed in your browser. For more information, see [Supported Browsers](/resources/guides/two-way-peg-app/advanced-operations/supported-browsers/) and [Supported Wallets](/resources/guides/two-way-peg-app/advanced-operations/supported-wallets/).
- Funds
    - A minimum balance of 0.005 BTC for peg-in and 0.004 RBTC for peg-out processes.

> **Note:** This guide primarily uses the Ledger Nano S hardware wallet for illustration, but all models of Ledger and Trezor wallets are compatible with the 2-way peg app. If you do not have any of the listed hardware wallets, consider purchasing one from the official [Ledger](https://shop.ledger.com/products/ledger-nano-s-plus) or [Trezor](https://shop.trezor.io/) websites.


### Resources

* See the [overview section](/resources/guides/two-way-peg-app/overview/) to learn about the 2 way peg app
* Convert [BTC to RBTC using the 2 way peg app](/resources/guides/two-way-peg-app/pegin/)
* 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
* 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
* [Rootstock Testnet Faucet](https://faucet.rootstock.io/)
* [Get RBTC using Exchanges](/resources/guides/get-crypto-on-rsk/rbtc-exchanges/)
* [Design architecture](/resources/guides/two-way-peg-app/advanced-operations/design-architecture/)