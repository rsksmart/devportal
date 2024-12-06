---
sidebar_position: 700
sidebar_label: Verify address ownership
title: 'Verify Address Ownership with Metamask Wallet'
description: 'Confirm that you own an Rootstock address using RIF Identity Manager'
tags: [metamask, address, account, smart contracts]
---

Let's say that you need to receive a transfer of RBTC,
or tokens on the Rootstock network,
for the very first time.
To do this you need to set up a wallet and connect it to the Rootstock network.

However, you may be unsure if you actually "control" the addresses in the wallet.
Understandably so, because it is your first time using it.
That concern has a technical basis too -
you need to **be sure** that you are **able to sign** transactions at this address,
before you ask others to send you cryptocurrency or tokens at this address.

Here we will demonstrate exactly how to do this,
and be sure that you truly "control" a particular address.
All you need is Chrome (web browser) and MetaMask (browser extension).
You do not need any RBTC balance to do so.

## Getting Started

:::tip[Install MetaMask]

You can either use the [metamask-landing.rifos.org](https://metamask-landing.rifos.org/) tool to download/install Metamask, and add Rootstock custom network or follow the steps listed in [metamask.io](https://metamask.io/). 

:::

In Chrome, visit [metamask.io](https://metamask.io/),
and follow the instructions to install this extension in your browser.
If you are doing this for the first time,
you will need to generate a *seed phrase*,
and it is extremely important that you record this somewhere.

### Enable only one Web3 browser extension

If you have more than one Web3 browser extension installed,
for example, if you have either MetaMask, Liquality or Nifty,
be aware that they can conflict with each other.

Paste `chrome://extensions/` in your address bar,
to see all the browser extensions that you have installed.
Verify that you only have MetaMask installed, **or**
if you have other Web3 browser extensions,
you should disable all of the others by clicking on the toggle buttons.

![](/img/developers/verify-address-ownership/rif-identity-metamask-disable-other-web3-extensions.png)

:::info[Optional]

For a better user experience, you may also wish to
- Click on the extensions icon (jigsaw shape), and in the dropdown,
- Click the pin icon next to MetaMask to ensure it is always visible.

:::

![](/img/developers/verify-address-ownership/rif-identity-metamask-pin-extension-dropdown.png)

### Unlock MetaMask

After installing the extension or starting your browser,
MetaMask should display a popup asking you to unlock the account.
Enter your MetaMask password.
(Note that this is *not* the same as your seed phrase.)

If it does not popup, you can manually enter
`chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#unlock`
in your address bar to navigate there in "expanded view",
instead of within a popup.

![](/img/developers/verify-address-ownership/rif-identity-metamask-unlock.png)

### Add custom network for Rootstock

MetaMask only contains network configurations to connect to Ethereum by default.
To connect to Rootstock you will need to add Rootstock Network configurations.

You have the option to manually add
[Rootstock Mainnet network configuration to MetaMask](/dev-tools/wallets/metamask/).

Alternatively, you can do this automatically,
by visiting [identity.rifos.org](https://identity.rifos.org/),
and when you attempt to connect using MetaMask,
you will get presented with the following:

![](/img/developers/verify-address-ownership/rif-identity-metamask-auto-network-1.png)

Click "RSK Mainnet". MetaMask will then show this popup:

![](/img/developers/verify-address-ownership/rif-identity-metamask-auto-network-2.png)

Click "Approve". This will automatically fill out the network configuration for you.

![](/img/developers/verify-address-ownership/rif-identity-metamask-auto-network-3.png)

Then click "Switch Network" to connect to the Rootstock Mainnet.

## Verifying your Rootstock account

At this point, you should have everything set up:
You have a wallet installed,
that wallet is connected to the RSK Mainnet,
and you have addresses inside that wallet.

You're ready to verify that you can use your wallet to sign messages!

### View transaction history

In MetaMask, you can view your transaction history for a particular address
by selecting the "Activity" tab in the main screen.

> "Expanded view": `chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#`

![](/img/developers/verify-address-ownership/rif-identity-metamask-transaction-history.png)

If your activity tab is empty, like the one above,
it means that there are zero transactions at this address.
Let's copy the address by clicking on it.
It is located near the top, begins with `0x`,
and should be under a label similar to "Account 1".

###  Visit block explorer

Let's check the address that you've just copied
on the Rootstock block explorer.

Visit `explorer.rsk.co/address/${YOUR_ADDRESS}`.
Replace `${YOUR_ADDRESS}` with the address copied from MetaMask earlier.
For example, if you copied `0xdfc0e6361fd1846a223e2d7834a5ebd441a16dd4`,
the URL will be `https://explorer.rsk.co/address/0xdfc0e6361fd1846a223e2d7834a5ebd441a16dd4`

![](/img/developers/verify-address-ownership/rif-identity-metamask-block-explorer-address-not-found.png)

Here you may see "Not Found".
This does not necessarily mean that the account does not exist.
Instead, it means that there simply are no transactions on the blockchain at this address.

### Visit RIF Identity Manager

So far, not so good, right?
... Nothing we've seen thus far assures you
that you do indeed control this address.

This is where the RIF Identity Manager comes in!
This DApp allows you to verify whether we control this address.
You'll do this by signing a message that is **not** a blockchain transaction.

Visit [identity.rifos.org](https://identity.rifos.org/).

![](/img/developers/verify-address-ownership/rif-identity-metamask-visit.png)

Click on "Connect your Wallet"

![](/img/developers/verify-address-ownership/rif-identity-metamask-connect-wallet.png)

Select "MetaMask"

> Note that if you have multiple Web3 browser extensions installed,
> disable all of them except for one.
> If not, this confuses most DApps including RIF Identity Manager,
> and you may not see MetaMask here as a result.
> See the "before you begin" section for details.

### MetaMask site connection permission

You will be presented with a popup from MetaMask,
which essentially is asking you whether you trust RIF Identity Manager.

![](/img/developers/verify-address-ownership/rif-identity-metamask-connect-site-permission.png)

Click "Next".
This allows MetaMask to interact with RIF Identity Manager

MetaMask will then show another popup,
asking you whether you want to allow RIF Identity Manager
to see your account addresses.

![](/img/developers/verify-address-ownership/rif-identity-metamask-view-addresses-permission.png)

Click "Connect".
This allows MetaMask to see your account addresses.

### RIF Identity Authentication

Upon granting these permissions,
the RIF Identity Manager DApp
presents you with yet another MetaMask popup.

![](/img/developers/verify-address-ownership/rif-identity-metamask-sign-authentication-text-message.png)

This time, it asks to sign a text message,
which should look similar to the following:

```text
Are you sure you want to login to the RIF Data Vault?
URL: https://data-vault.identity.rifos.org
Verification code: ${SOME_RANDOM_VALUE}
```

Click "Sign".
When you do this, the **crucial part** happens!

- MetaMask uses the **private key** corresponding to the address
  to sign that message.
- The signed message is transmitted to RIF Identity Manager's backend,
  which performs digital signature verification,
  which it uses to confirm whether it has indeed been signed by this particular address.
- Since this is a plain text message,
  and does not involve adding a transaction to the blockchain,
  no gas fees need to be paid,
  and therefore your RBTC balance can be zero.

This is perfect for newly generated accounts!

### Check the dashboard

Once you have signed the message and it has been verified,
you will see the dashboard for the RIF Identity Manager.

![](/img/developers/verify-address-ownership/rif-identity-metamask-dashboard.png)

Check that the "Persona Address" field that is displayed here **matches**
the address of your account in MetaMask.

![](/img/developers/verify-address-ownership/rif-identity-metamask-dashboard-persona-address.png)

That's all - now you can be confident that you do control this address on the Rootstock Mainnet!

## Resources

- [Verify Smart Contracts with SolidityScan](https://blog.rootstock.io/noticia/rootstock-guide-to-verifying-smart-contracts-with-solidityscan/)
- [Developer Tools](/dev-tools/)
- [Verify Smart Contracts using Hardhat Verify Plugin for Rootstock](/developers/smart-contracts/verify-smart-contracts/)