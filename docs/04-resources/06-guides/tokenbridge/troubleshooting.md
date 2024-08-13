---
sidebar_label: Token Bridge Troubleshooting
title: 'Rootstock Token Bridge Troubleshooting Guide'
description: 'Having issues crossing your tokens on the token bridge? See the troubleshooting guide for help.'
tags: [resources, tokenbridge, blockchain, bridges, tokens, ethereum, rootstock, rsk]
---

See the [Token Bridge FAQs](https://dev.rootstock.io/resources/guides/tokenbridge/faq/)

Visit the [Mainnet Token Bridge](https://dapp.tokenbridge.rootstock.io/) or the [Testnet Token Bridge](https://dapp.testnet.bridges.rootstock.io/)

<!-- <div class="rsk-token-bridge-support">
  <div class="rsk-token-bridge-support-input-area">
    <div>
      <label>Transaction Hash</label>
      <br />
      <input name="txHash" id="rsk-token-bridge-support-txHash" type="text" />
    </div>
    <div>
      <label>Crossing from</label>
      <br />
      <select name="fromNetwork" id="rsk-token-bridge-support-fromNetwork">
        <option value="ethereum-mainnet">Ethereum to Rootstock</option>
        <option value="rsk-mainnet">Rootstock to Ethereum</option>
      </select>
    </div>
    <div>
      <label>Wallet</label>
      <br />
      <select name="walletName" id="rsk-token-bridge-support-walletName">
        <option value="metamask">MetaMask</option>
        <option value="liquality">Liquality</option>
      </select>
    </div>
    <div>
      <button id="rsk-token-bridge-support-check-button">Check &hellip;</button>
    </div>
  </div>
  <div class="rsk-token-bridge-support-output-area">
  </div>
</div>

> Note that what follows below are generic troubleshooting queries.
> To see more specific information, use the form above. -->

## Transferred tokens from Ethereum, and after 24 hours have not received tokens on Rootstock

**Network:** ETH to Rootstock

**When:** Current Block - Transaction Block Number < 5760

**Answer:** 24 hours is an approximation, it is not fixed. Wait until 5760 blocks have past since the transaction block number, plus 5 minutes.

## Transferred tokens from Ethereum, and after 24 hours have not received tokens on Rootstock

**Network:** ETH to Rootstock

**When:** Current Block - Transaction Block Number > 5760

**Answer:**  Look in the [Rootstock Explorer](https://explorer.rootstock.io/) at the SAME ADDRESS on Rootstock. If you do not see the correct balance in the tokens tab, please share your Transaction Hash in the **#token-bridge** channel on Rootstock Discord (go to [Discord Community](https://rootstock.io/discord) to join.

## Transferred tokens from Rootstock, and after 24 hours have not received tokens on Ethereum

**Network:** Rootstock to ETH

**When:** Current Block - Transaction Block Number < 2880

**Answer:**  24 hours is an approximation, it is not fixed. Wait until 5760 blocks have past since the transaction block number, plus 5 minutes.

## Transferred tokens from Rootstock, and after 24 hours have not received tokens on Ethereum

**Network:** Rootstock to ETH

**When:** Current Block - Transaction Block Number > 2880

**Answer:**  Look in [Etherscan](https://etherscan.io/) at the SAME ADDRESS on Rootstock. If you do not see the correct balance in the tokens tab, please share your Transaction Hash in the **#token-bridge** channel on Rootstock Discord (go to [ Discord Community](https://rootstock.io/discord) to join).

## Transferred tokens from Ethereum to Rootstock, but do not see them in my wallet

**Network:** ETH to Rootstock

**When:** always

**Answer:**  Rootstock has a different derivation path (m/44’/137’/0’/0) from Ethereum (m/44’/60’/0’/0). Software wwallets respects this convention. Copy your mnemonic or private key and use Metamask and add Rootstock as custom network, to get the same address as ethereum.

## Transferred tokens from Rootstock to Ethereum, but do not see them in my wallet

**Network:** Rootstock to ETH

**When:** always

**Answer:**  Rootstock has a different derivation path (m/44’/137’/0’/0) from Ethereum (m/44’/60’/0’/0). Software wallets respects this convention. Copy your mnemonic or private key and use MyEtherwallet or My Crypto with the Rootstock derivation path m/44’/137’/0’/0 to get the same address as Rootstock.

## Why does it take 24 hours? Can it be faster?

**Network:** Both

**When:** always

**Answer:**  This is for security measures. 24 hours is an approximation, it is not exact. We are working to reduce this time in the next version.

## Why can't I choose the address?

**Network:** Both

**When:** always

**Answer:**  Currently, it uses the token bridge always sends tokens to the same address on the other blockchain network, and so the sender and the receiver will always have the same address. You will have the option to send to another address in the next version.

## Metamask threw an error

**Network:** ETH

**When:** always

**Answer:**  This is usually a timeout as the Transaction was not mined on the time expected by Metamask. This does not mean that transaction has not been mined. Please share your Transaction Hash in the **#token-bridge** channel on Rootstock Discord (go to [Discord Community](https://rootstock.io/discord) to join).

## I don't see my transaction on the Token Bridge list

**Network:** N/A

**When:** always

**Answer:**  The list is stored in the local cache, so it’s not shared across devices, and it's erased if you clear your browser cookies and temporary files. You can be sure that if the transaction is mined the tokens will cross no matter what the list says. If this is not the reason why it is not there please let us know in the `#token-bridge` channel on Rootstock Discord (go to [Discord Community](https://rootstock.io/discord) to join).

## I used the Sovryn Token Bridge

**Network:** N/A

**When:** always

If you have used `bridge.sovryn.app`,
note that this is **not** the same as the Rootstock Token Bridge.
To get support, please ask on the
[Sovryn discord group](https://discord.com/channels/729675474665603133/813119624098611260).

## I sent Rootstock tokens to an Ethereum address

**Network:** N/A

**When:** always

Note that if you have tokens on the Rootstock network, such as RIF or USDRIF,
including "crossed" tokens such as rUSDT or rDAI,
you **should not** send them to an Ethereum address in a regular transaction.
This **does not** work!
Instead, you should use the Rootstock Token Bridge to cross the tokens
from one blockchain to the other.

If you have done this already,
and sent the tokens to an address that **is not** under your control -
where you **do not have** the private key or the seed phrase -
then you have **burnt** the tokens, and they are not recoverable.
If you have done this already,
and sent the tokens to an address that **is** not under your control -
where you **do have** the private key or the seed phrase -
then it may be possible to recover your tokens.

## I have multiple wallets installed, but i'm only given one option

**Network:** N/A

**When:** always

Decentralised apps on websites, such as the Rootstock Token Bridge,
interact with the blockchain network through a standard interface
known as a **web3 provider**.
Each browser wallet attempts to "inject" a web3 provider as soon as it is loaded.
This means that if you have multiple browser extensions doing the same thing,
one of them will override the other(s).

In order to avoid this problem, and if you already have multiple wallets installed,
is to choose which wallet you wish to use, and disable the other ones.
To do this in in Chrome, enter `chrome://extensions/` in your address bar,
which brings you to a settings screen that lists all of
the browser extensions that you have installed.
Click on the toggle button to disable all of the browser extensions
that inject **web3 providers**, except for the one that you wish to use.
After this go to the Rootstock token bridge again, and refresh.
