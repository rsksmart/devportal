---
sidebar_label: MetaMask
layout: rsk
title: MetaMask Wallet Integration Guide for Rootstock | Rootstock (RSK)
description: "Learn how to connect to Rootstock with a Metamask Wallet"
tags: [json-rpc, metamask, rif, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto]
---

For MetaMask installation, please <a href="https://metamask.io/" target="_blank">visit here</a>.

You can either use the [metamask-landing.rifos.org](https://metamask-landing.rifos.org/) tool to download/install Metamask, and add RSK custom network or follow the steps listed in [metamask.io](https://metamask.io/). 

## Connect with MetaMask

(1) Open MetaMask extension.

(2) In the network selector (top right corner), choose Custom RPC.

  <div style="text-align:center"><img class="metamask-screenshot" src="/assets/img/metamask/metamask.png"/></div>

(3) Fill with these values to connect to RSK Mainnet or Testnet

  <table class="table">
  <thead>
    <tr>
      <th scope="col">Field</th>
      <th scope="col">RSK Mainnet</th>
      <th scope="col">RSK Testnet</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Network Name</td>
      <td>RSK Mainnet</td>
      <td>RSK Testnet</td>
    </tr>
    <tr>
      <td>RPC URL</td>
      <td>https://public-node.rsk.co</td>
      <td>https://public-node.testnet.rsk.co</td>
    </tr>
    <tr>
      <td>ChainID</td>
      <td>30</td>
      <td>31</td>
    </tr>
    <tr>
      <td>Symbol</td>
      <td>RBTC</td>
      <td>tRBTC</td>
    </tr>
    <tr>
      <td>Block explorer URL</td>
      <td><a href="https://explorer.rsk.co" target="_blank">https://explorer.rsk.co</a></td>
      <td><a href="https://explorer.testnet.rsk.co" target="_blank">https://explorer.testnet.rsk.co</a></td>
    </tr>
  </tbody>
  </table>

Now MetaMask is ready to use with RSK!

## Now what?

Try out the RSK Testnet:

- [Get test RBTC](https://faucet.rsk.co)
- [Get test RIF tokens](https://faucet.rifos.org)

If you would like to know more about the values used in the
custom network configuration above, check out
[account based addresses on RSK](/rsk/architecture/account-based/).

## Limitations

MetaMask does not yet fully comply with the technical specifications
of [account based addresses on RSK](/rsk/architecture/account-based/).
Thankfully, there are workarounds available,
which allow most users to use MetaMask on RSK successfully.

MetaMask uses the Ethereum value for **derivation path**,
and presently does not allow it to be configured.
This means that if you use the same seed phrase in MetaMask and other wallets,
you will get a different set of addresses.
A **workaround** for this is to use custom derivation paths
when using other wallets that support this feature.

MetaMask does not presently support EIP-1191 **checksums**.
This means that if you use the addresses copied from MetaMask,
you may encounter checksum validation errors.
A **workaround** for this is to lowercase the addresses after copying them.

## Disclaimer

- Currency may be mistakenly displayed as `ETH` within some screens of MetaMask.
  The RSK network uses `RBTC` as its cryptocurrency.
- This tutorial uses [RSK public nodes](/rsk/public-nodes).
  You can connect to another node by changing the RPC URL.
- The node must enable CORS for browser-based DApps to work.
  - Please review the [configuration file reference](/rsk/node/configure) for CORS settings.
