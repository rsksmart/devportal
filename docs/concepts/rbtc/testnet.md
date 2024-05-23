---
layout: rsk
title: "Testnet RBTC Conversion on Rootstock: Seamless Cross-Network Transactions"
menu_title: Testnet Guide
tags: [rsk, rbtc, conversion, peg, 2-way, peg-in, peg-out, federation]
description: 'Converting t-BTC to tRBTC (peg-in) and tRBTC to t-BTC (peg-out).'
menu_order: 200
permalink: /rsk/rbtc/conversion/networks/testnet/
---

In this section we will go over the steps of converting t-BTC to tRBTC,
and vice versa on the Bitcoin and RSK Testnets.

Note:
The minimum amount of Bitcoin to convert is **0.005 tBTC** for Testnet.

## tBTC to tRBTC conversion

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

**3 Send Bitcoin to RSK Federation address**

The RSK Federation address is retrieved by making a Smart Contract call
on RSK Testnet.
In order to make the call, you will need to have
[MyCrypto](https://mycrypto.com/contracts/interact)
installed, select RSK Testnet in
_"More Networks"_, and Navigate to _"MyCrypto -> Contracts -> Select Existing Contracts -> "Bridge" -> "getFederationAddress"_
to execute the call.
It should look like the screenshot below.

![Get RSK Federation address from MyCrypto](/img/mycrypto-federation.png)

Once you have the RSK Federation address,
you can send Bitcoin to it from your Bitcoin address.

> Note: You need to send a minimum amount of 0.01 tBTC for conversion.

**4 Get tRBTC address with tBTC private key**

You can get a corresponding tRBTC address from your tBTC private key by using [github.com/rsksmart/utils](https://github.com/rsksmart/utils). If you do not want to compile the utility, you can download the [latest release](https://github.com/rsksmart/utils/releases/latest).

> Note: when entering Bitcoin private key do not include _p2pkh:_ in the front.

**5 Check tRBTC balance on Testnet**

You can check the balance of the above tRBTC address on Metamask,
MyCrypto or any RSK Testnet compatible wallets.

> Note: You have to wait a minimum of 10 confirmations +
> a minimum of 5 minutes for checking your RBTC balance

## tRBTC to tBTC conversion

Instructions on how to do a Testnet peg-out.

**1 Get tBTC address with tRBTC private key**

You can get a corresponding tBTC address from your tRBTC private key by using [github.com/rsksmart/utils](https://github.com/rsksmart/utils). If you do not want to compile the utility, you can download the [latest release](https://github.com/rsksmart/utils/releases/latest).

**2 Send tRBTC to RSK Bridge Contract**

RSK Bridge Contract address: `0x0000000000000000000000000000000001000006`

> **Important note**: The minimum amount to send must be **at least** 0.004 tRBTC for Testnet, values below that will be rejected and reimbursed to the sender.

Gas Limit of the transaction needs to be manually set at 100,000 gas;
otherwise the transaction will fail.
Gas Price can be set to 0.06 gwei.

![Customize Gas in Metamask before send transaction on RSK](/img/metamask-gas-limit.png)

**3 Check balance of tBTC address on Bitcoin Testnet**

You can either use Electrum wallet downloaded earlier or from
any Bitcoin explorer to check the balance.

> Note: The release process on Bitcoin network takes
> 10 RSK block confirmations and at least 10 more minutes.
