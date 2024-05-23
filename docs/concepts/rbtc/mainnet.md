---
layout: rsk
section_title: User Guides
title: Mainnet Guide | Rootstock (RSK)
sidebar_label: Mainnet Guide
tags: [rsk, rbtc, conversion, peg, 2-way, peg-in, peg-out, federation]
description: 'Converting BTC to RBTC (peg-in) and RBTC to BTC (peg-out).'
sidebar_position: 100
permalink: /rsk/rbtc/conversion/networks/mainnet/
---

In this section we will go over the steps of converting BTC to RBTC and vice versa in Bitcoin and RSK Mainnets.

> Note: The minimum amount of Bitcoin to convert is **0.005 BTC** for Mainnet.

### BTC to RBTC conversion
Instructions on how to do a Mainnet peg-in.

[](#top "collapsible")
- Get a BTC address with balance
  - Any Bitcoin wallet that supports legacy (`p2pkh`) private key works for this step. In this section, we use the Electrum BTC wallet for connecting to BTC Mainnet.
    1. Download the wallet from [Electrum Website](https://electrum.org/)
    2. Install Electrum
    3. Start Electrum
    4. Once Electrum starts, create or import a wallet
    5. Go to the third tab "Receive". You will see a Bitcoin Testnet address like below:
        <div align="left"><img width="70%" src="/img/legacy-private-key.png" alt="Create a Legacy (`p2pkh`) walletn"/></div>
    > Note: Use a legacy Bitcoin wallet (not Segwit) with a public key beginning with `m` or `n`, and a private key prefixed by `p2pkh`.
- Send Bitcoin to RSK Federation address
  - The RSK Federation address is retrieved by making a Smart Contract call on RSK Mainnet. To make the call, you need to have [MyCrypto](https://mycrypto.com/contracts/interact) installed:
    1. Select RSK Network.
    2. Navigate to **MyCrypto** -> **Contracts**.
    3. Select **Existing Contracts**  and choose **Bridge** from the drop-down menu.
    4. Click **getFederationAddress** to execute the call.
        It should look like the screenshot below:
        <div align="left"><img width="70%" src="/img/mycrypto-federation.png" alt="Get RSK Federation address from MyCrypto"/></div>
    Once you have the RSK Federation address, you can send Bitcoin to it from your Bitcoin address.
    >
    > Note: You must send a minimum amount of 0.005 BTC.
- Wait for BTC confirmations
  -  To ensure the transaction is successful, we need to wait for 100 BTC network confirmations.
    > 100 blocks \* 10 minutes/block = 1000 minutes = 16.667 hours. That is, this will take approximately 17 hours.
- Get RBTC address with BTC private key
  -  You can get a corresponding RBTC address from your BTC private key by using the [Rootstock Utils](https://github.com/rsksmart/utils). If you do not want to compile the utility, you can download the [latest release](https://github.com/rsksmart/utils/releases/latest).
    > Note: when entering Bitcoin private key do not include _p2pkh:_ in the front.
- Check RBTC balance
  -  You can check balance of RBTC address on Metamask, MyCrypto, or any RSK compatible wallets.
    > Note: You have to wait a minimum of 100 confirmations + a minimum of 5 minutes for checking your RBTC balance.

### RBTC to BTC conversion

Instructions on how to do a Mainnet peg-out.

[](#top "collapsible")
- Get BTC address with RBTC private key
  -  You can get a corresponding BTC address from your RBTC private key by using the [Rootstock](https://github.com/rsksmart/utils). If you do not want to compile the utility, you can download the [latest release](https://github.com/rsksmart/utils/releases/latest).
- Send RBTC to RSK Bridge Contract
  -  RSK Bridge Contract address: `0x0000000000000000000000000000000001000006`
    <div class="fade alert alert-warning show">
      <strong>Important note</strong>:
      The minimum amount to send must be
      <strong>at least 0.004 RBTC</strong>
      for Mainnet
      Sending any lower amount fails and
      <strong>funds will be reimbursed</strong>.
      The Gas Limit of the transaction needs to be manually set at 100,000 gas;
      otherwise the transaction will fail.
      Gas Price can be set to 0.06 gwei
      (or the gas price suggested by the wallet).
    </div>
    ![Customize Gas in Metamask before send transaction on RSK](/img/metamask-gas-limit.png)
- Check balance of BTC address
  -  You can either use Electrum wallet downloaded earlier or from any
    Bitcoin explorer to check the balance.
    > Note: The release process on Bitcoin network takes
    > 4000 RSK block confirmations and at least 10 more minutes.
