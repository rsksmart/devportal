---
title: Converting BTC to RBTC and vice versa
sidebar_label: Networks
tags: [rsk, rootstock, rbtc, conversion, peg, 2-way, peg-in, peg-out, federation]
description: 'Converting BTC to RBTC (peg-in) and RBTC to BTC (peg-out) on Mainnet and Testnet.'
sidebar_position: 303
---

## Mainnet Conversion

In this section we will go over the steps of converting BTC to RBTC and vice versa in Bitcoin and Rootstock (RSK) Networks.

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
- Send Bitcoin to Rootstock Federation address
  - The Rootstock Federation address is retrieved by making a Smart Contract call on Rootstock Mainnet. To make the call, you need to have [MyCrypto](https://mycrypto.com/contracts/interact) installed:
    1. Select Rootstock (RSK) Network.
    2. Navigate to **MyCrypto** -> **Contracts**.
    3. Select **Existing Contracts**  and choose **Bridge** from the drop-down menu.
    4. Click **getFederationAddress** to execute the call.
        It should look like the screenshot below:
        <div align="left"><img width="70%" src="/img/mycrypto-federation.png" alt="Get Rootstock Federation address from MyCrypto"/></div>
    Once you have the Rootstock Federation address, you can send Bitcoin to it from your Bitcoin address.
    >
    > Note: You must send a minimum amount of 0.005 BTC.
- Wait for BTC confirmations
  -  To ensure the transaction is successful, we need to wait for 100 BTC network confirmations.
    > 100 blocks \* 10 minutes/block = 1000 minutes = 16.667 hours. That is, this will take approximately 17 hours.
- Get RBTC address with BTC private key
  -  You can get a corresponding RBTC address from your BTC private key by using the [Rootstock Utils](https://github.com/rsksmart/utils). If you do not want to compile the utility, you can download the [latest release](https://github.com/rsksmart/utils/releases/latest).
    > Note: when entering Bitcoin private key do not include _p2pkh:_ in the front.
- Check RBTC balance
  -  You can check balance of RBTC address on Metamask, MyCrypto, or any [Rootstock compatible wallets](https://blog.rootstock.io/noticia/rootstock-wallets/).
    > Note: You have to wait a minimum of 100 confirmations + a minimum of 5 minutes for checking your RBTC balance.

### RBTC to BTC conversion

Instructions on how to do a Mainnet peg-out.

- Get BTC address with RBTC private key
  -  You can get a corresponding BTC address from your RBTC private key by using the [Rootstock](https://github.com/rsksmart/utils). If you do not want to compile the utility, you can download the [latest release](https://github.com/rsksmart/utils/releases/latest).
- Send RBTC to Rootstock Bridge Contract
  -  Rootstock Bridge Contract address: `0x0000000000000000000000000000000001000006`
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
    ![Customize Gas in Metamask before send transaction on Rootstock](/img/metamask-gas-limit.png)
- Check balance of BTC address
  -  You can either use Electrum wallet downloaded earlier or from any
    Bitcoin explorer to check the balance.
    > Note: The release process on Bitcoin network takes
    > 4000 Rootstock block confirmations and at least 10 more minutes.

## Testnet Conversion

In this section we will go over the steps of converting t-BTC to tRBTC, and vice versa on the Bitcoin and Rootstock Testnets.

> Note: The minimum amount of Bitcoin to convert is **0.005 tBTC** for Testnet.

### tBTC to tRBTC conversion

Instructions on how to do a Testnet peg-in.

**1 Connect a wallet to Bitcoin Testnet**

We recommend to use Electrum BTC wallet for connecting to Bitcoin Testnet.

- Download the wallet from
  [Electrum Website](https://bitzuma.com/posts/a-beginners-guide-to-the-electrum-bitcoin-wallet/)
- Install Electrum
- Start Electrum in Testnet mode
  - For example on MacOS:
    `/Applications/Electrum.app/Contents/MacOS/Electrum --testnet`
- After Electrum starts, create or import a wallet
- Go to the third tab, "Receive".
  You will see a Bitcoin Testnet address like below.

![Create a Legacy (`p2pkh`) wallet](/img/legacy-private-key.png)

> Note: The Bitcoin wallet needs to be legacy (not Segwit)
> whose public key starts with either `m` or `n`,
> and private key starting with `p2pkh:`

![Get a Bitcoin Testnet address in Electrum Wallet](/img/electrum-wallet.png)

**2 Get test Bitcoin from Testnet Faucet**

There are a few options to get Bitcoin on Testnet.
We use [https://testnet-faucet.mempool.co/](https://testnet-faucet.mempool.co/)

**3 Send Bitcoin to Rootstock Federation address**

The Rootstock Federation address is retrieved by making a Smart Contract call
on Rootstock Testnet.
In order to make the call, you will need to have
[MyCrypto](https://mycrypto.com/contracts/interact)
installed, select Rootstock Testnet in
_"More Networks"_, and Navigate to _"MyCrypto -> Contracts -> Select Existing Contracts -> "Bridge" -> "getFederationAddress"_
to execute the call.
It should look like the screenshot below.

![Get Rootstock Federation address from MyCrypto](/img/mycrypto-federation.png)

Once you have the Rootstock Federation address,
you can send Bitcoin to it from your Bitcoin address.

> Note: You need to send a minimum amount of 0.01 tBTC for conversion.

**4 Get tRBTC address with tBTC private key**

You can get a corresponding tRBTC address from your tBTC private key by using [github.com/rsksmart/utils](https://github.com/rsksmart/utils). If you do not want to compile the utility, you can download the [latest release](https://github.com/rsksmart/utils/releases/latest).

> Note: when entering Bitcoin private key do not include _p2pkh:_ in the front.

**5 Check tRBTC balance on Testnet**

You can check the balance of the above tRBTC address on Metamask,
MyCrypto or any Rootstock Testnet compatible wallets.

> Note: You have to wait a minimum of 10 confirmations +
> a minimum of 5 minutes for checking your RBTC balance

### tRBTC to tBTC conversion

Instructions on how to do a Testnet peg-out.

**1 Get tBTC address with tRBTC private key**

You can get a corresponding tBTC address from your tRBTC private key by using [github.com/rsksmart/utils](https://github.com/rsksmart/utils). If you do not want to compile the utility, you can download the [latest release](https://github.com/rsksmart/utils/releases/latest).

**2 Send tRBTC to Rootstock Bridge Contract**

Rootstock Bridge Contract address: `0x0000000000000000000000000000000001000006`

> **Important note**: The minimum amount to send must be **at least** 0.004 tRBTC for Testnet, values below that will be rejected and reimbursed to the sender.

Gas Limit of the transaction needs to be manually set at 100,000 gas;
otherwise the transaction will fail.
Gas Price can be set to 0.06 gwei.

![Customize Gas in Metamask before send transaction on Rootstock](/img/metamask-gas-limit.png)

**3 Check balance of tBTC address on Bitcoin Testnet**

You can either use Electrum wallet downloaded earlier or from
any Bitcoin explorer to check the balance.

> Note: The release process on Bitcoin network takes
> 10 Rootstock block confirmations and at least 10 more minutes.
