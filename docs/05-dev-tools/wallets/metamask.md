---
sidebar_label: MetaMask
sidebar_position: 3
title: Configure MetaMask Wallet for Rootstock
tags: [metamask, rootstock, tools, rsk, wallets, guides]
description: "Learn how to connect to Rootstock with a MetaMask Wallet"
---

In this guide, you will learn how to download, install MetaMask, and set up custom networks.

:::note[Download and Install MetaMask]

Visit the [metamask-landing.rifos.org](https://metamask-landing.rifos.org/) tool to download/install Metamask, and add Rootstock custom networks or follow the steps in the video below.
:::

<div class="video-container">
  <iframe width="949" height="534" src="https://youtube.com/embed/VyPewQoWhn0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Connect with MetaMask

1. Open the MetaMask extension.
2. In the network selector (top right corner), choose Custom RPC.

  <div styles="text-align: center">
    <img class="metamask-screenshot" src="/img/tools/metamask/metamask.png" />
  </div>

3. Fill with these values to connect to Rootstock Mainnet or Testnet

<table class="table">
  <thead>
    <tr>
      <th scope="col">Field</th>
      <th scope="col">Rootstock Mainnet</th>
      <th scope="col">Rootstock Testnet</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Network Name</td>
      <td>Rootstock Mainnet</td>
      <td>Rootstock Testnet</td>
    </tr>
    <tr>
      <td>RPC URL</td>
      <td>https://rpc.mainnet.rootstock.io/{YOUR_APIKEY}</td>
      <td>https://rpc.testnet.rootstock.io/{YOUR_APIKEY}</td>
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
      <td><a href="https://explorer.rootstock.io/" target="_blank">https://explorer.rootstock.io/</a></td>
      <td><a href="https://explorer.testnet.rootstock.io/" target="_blank">https://explorer.testnet.rootstock.io/</a></td>
    </tr>
  </tbody>
</table>

:::tip[Get RPC API Key]

Visit the [RPC API Docs](/developers/rpc-api/) to sign up and get an API Key.
:::

Now MetaMask is ready to use with Rootstock!

## Next Steps

Try out the Rootstock Testnet:
- [Get test RBTC](https://faucet.rootstock.io)
- [Get test RIF tokens](https://faucet.rifos.org)

If you would like to know more about the values used in the
custom network configuration above, check out
[account based addresses on Rootstock](/concepts/account-based-addresses/).

### Limitations

MetaMask does not yet fully comply with the technical specifications
of [account based addresses on Rootstock](/concepts/account-based-addresses/).
Note that there are workarounds available,
which allow most users to use MetaMask on Rootstock successfully.

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

:::warning[Disclaimer]

- Currency may be mistakenly displayed as `ETH` within some screens of MetaMask.
  The Rootstock network uses `RBTC` as its cryptocurrency.
- This tutorial uses [Rootstock RPC API](/developers/rpc-api/).
  You can connect to other nodes or use the [Public Node](/node-operators/public-nodes/) by changing the RPC URL.
- The node must enable CORS for browser-based dApps to work.
  - Please review the [configuration file reference](/node-operators/setup/configuration/) for CORS settings.
:::

## Useful Resources
- [Connect Rootstock to Metamask Programmatically](/resources/tutorials/rootstock-metamask/)
