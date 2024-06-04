---
sidebar_label: Remix
layout: rsk
title: Remix and Metamask Integration on Rootstock Testnet | Rootstock (RSK)
tags: [tutorial, rsk, remix, metamask]
description: "Configure a wallet using Metamask, connect with Remix, compile and deploy a smart contract at Rootstock testnet."
---

RSK's virtual machine implementation is compatible with the Ethereum EVM,
we can also use many of Ethereum's developer tools.

In this tutorial I will show you step-by-step how to use Remix and Metamask, which are tools that were originally built for Ethereum, to create and deploy a simple smart contract on RSK's Testnet.

## Overview

We will do these steps:

1. Configure Metamask to connect to RSK testnet;
2. Get some testnet RBTCs at faucet;
3. Connect Remix with RSK Testnet;
3. Create a smart contract at Remix;
4. Compile it;
5. Using Remix, deploy the smart contract at RSK Testnet;
6. Know the RSK explorer;
7. Interact with the smart contract;
8. Check the transactions in Metamask.

## Webinar

We have run a
[webinar](/webinars/#event-id-202003-002 "Create and Deploy your first Smart Contract to the RSK Network using Remix and Metamask")
in which we run through this tutorial:

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube-nocookie.com/embed/-pJahYxJ4ms?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

The same webinar is also available in
[Español](https://www.youtube.com/watch?v=TyKkkwF1PdM)
and [Português](https://www.youtube.com/watch?v=45ii2vFLKJc).

Check out our [other webinars](/webinars).

## Translations

This article is also available in
[Português](https://rsk.solange.dev/#/pt/remix-metamask/readme "Crie seu primeiro smart contract utilizando Remix e Metamask com a RSK testnet").

## Requirements

- Metamask
- Remix

### Metamask

Metamask is a kind of web wallet which facilitates transactions using yours accounts.
It can be used with RSK networks too.
It has versions for several browsers, like Chrome, Firefox, Opera and Brave.

Go to [metamask.io](https://metamask.io/) and install it.

You can either use the [metamask-landing.rifos.org](https://metamask-landing.rifos.org/) tool to download/install Metamask, and add RSK custom network or follow the steps listed in [metamask.io](https://metamask.io/). 

Create an account.

Write down your seed phrase, or mnemonic, or backup phrase (all these terms mean the same), with 12 words. This is used to recover your account, in case you lose your password.

The seed phrase is the most important thing in a wallet / account!

### Remix

Remix is an online web tool. It is an IDE (Integrated Development Environment) used to write, compile, deploy and debug Solidity code. Can be connected with Metamask and used to deploy smart contracts to both the RSK Testnet and Mainnet.

Can be accessed at [remix.ethereum.org](https://remix.ethereum.org/)

## Connect MetaMask to RSK testnet

- Go to networks
- Custom RPC

![networks - custom RPC](/img/kb/remix-and-metamask-with-rsk-testnet/image-01.png)

- Network Name

  `RSK Testnet`
- New RPC URL

  [`https://public-node.testnet.rsk.co`](https://public-node.testnet.rsk.co)
- ChainID (optional)

  `31`
- Symbol (optional)

  `tRBTC`
- Block Explorer URL (optional)

  [`https://explorer.testnet.rsk.co`](https://explorer.testnet.rsk.co)


![RSK Testnet configuration](/img/kb/remix-and-metamask-with-rsk-testnet/image-02.png)

After configuring it, select the RSK Testnet.

## TestNet Faucet

You can get some Testnet RBTC at [faucet.testnet.rsk.co](https://faucet.testnet.rsk.co/).

Copy your address from Metamask

![Copy address from Metamask](/img/kb/remix-and-metamask-with-rsk-testnet/image-03.png)

Enter your wallet address and pass the CAPTCHA.

Wait a few seconds...

![Wait a few seconds](/img/kb/remix-and-metamask-with-rsk-testnet/image-04.png)

![Received some RBTCs](/img/kb/remix-and-metamask-with-rsk-testnet/image-05.png)

You can see the transaction hash, for example [`0xf63c45dabd52e0b44f4cf15825985e9ddfe790b4323a88a3531f762a417f9011`](https://explorer.testnet.rsk.co/tx/0xf63c45dabd52e0b44f4cf15825985e9ddfe790b4323a88a3531f762a417f9011).

Now I have 0.05 RBTC!

![RBTCs at Metamask wallet](/img/kb/remix-and-metamask-with-rsk-testnet/image-06.png)

## Remix

Go to

[remix.ethereum.org](http://remix.ethereum.org/)

In the home / welcome page, choose environment `Solidity`.

![Remix environment Solidity](/img/kb/remix-and-metamask-with-rsk-testnet/image-08.png)

## Remix Connect RSK Testnet

With the RSK network selected at Metamask...

At Remix, on the left side, locate the button `Deploy and run transactions`.
For now it is the 4th button

![Deploy and run transactions](/img/kb/remix-and-metamask-with-rsk-testnet/image-09.png)

At Environment, choose `Injected Web3`

![Injected Web3](/img/kb/remix-and-metamask-with-rsk-testnet/image-10.png)

Injected Web3 connects Remix with active account in Metamask

![Injected Web3 - ChainID 31](/img/kb/remix-and-metamask-with-rsk-testnet/image-11.png)

ChainID 31 was defined at RSK Testnet custom network in Metamask.

## Create a smart contract

Click on the second button on the left side - file explorer

![file explorer](/img/kb/remix-and-metamask-with-rsk-testnet/image-12.png)

Click on + create a new file

![create a new file](/img/kb/remix-and-metamask-with-rsk-testnet/image-13.png)

File name: `SimpleStorage.sol`

![SimpleStorage.sol](/img/kb/remix-and-metamask-with-rsk-testnet/image-14.png)

Copy this example:

```shell
pragma solidity >=0.4.0 <0.7.0;

contract SimpleStorage {
    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
```

And paste it here:
![SimpleStorage.sol](/img/kb/remix-and-metamask-with-rsk-testnet/image-15.png)

### SimpleStorage.sol

This smart contract has:

* A variable `storedData` to store a number
* A function `get()` to return the number stored at variable `storedData`
* A function `set()` to change the number stored at variable `storedData`

## Compile a smart contract

In the 3rd button at left side click on Solidity compiler

![Compile smart contract](/img/kb/remix-and-metamask-with-rsk-testnet/image-16.png)

It is useful to enable auto-compile

![enable auto-compile](/img/kb/remix-and-metamask-with-rsk-testnet/image-17.png)

![enable auto-compile](/img/kb/remix-and-metamask-with-rsk-testnet/image-18.png)

For now click in the button Compile SimpleStorage.sol

![Compile SimpleStorage.sol](/img/kb/remix-and-metamask-with-rsk-testnet/image-19.png)

Check the green sign at 3rd button with the message compilation successful

![compilation successful](/img/kb/remix-and-metamask-with-rsk-testnet/image-20.png)

## Deploy a smart contract at RSK testnet

In the left side panel, go to the button `Deploy and run transactions`. Actually, it is the 4th button.

![Deploy and run transactions](/img/kb/remix-and-metamask-with-rsk-testnet/image-21.png)

For now we have only one smart contract, so it is automatically selected in the dropdown.

![SimpleStorage.sol](/img/kb/remix-and-metamask-with-rsk-testnet/image-22.png)

Click in the button `Deploy`.

It will open a Metamask popup window, to confirm the transaction to create the smart contract SimpleStorage.sol

![Deploy](/img/kb/remix-and-metamask-with-rsk-testnet/image-23.png)

Click on confirm.

At bottom right, we can check the message: `creation of SimpleStorage pending...`

![creation of SimpleStorage pending](/img/kb/remix-and-metamask-with-rsk-testnet/image-24.png)


![transaction confirmed](/img/kb/remix-and-metamask-with-rsk-testnet/image-25.png)

Once it is confirmed, we can check it

![check the transaction](/img/kb/remix-and-metamask-with-rsk-testnet/image-26.png)

Click on the transaction line or the debug button (at the right side) to see more details of the transaction:

![transaction details](/img/kb/remix-and-metamask-with-rsk-testnet/image-27.png)

Copy the transaction hash to verify at blockchain explorer

![transaction hash](/img/kb/remix-and-metamask-with-rsk-testnet/image-28.png)

![transaction hash copied](/img/kb/remix-and-metamask-with-rsk-testnet/image-29.png)

Is this example, the transaction hash is:

0x419c4b17ec0bf59568d9b5f5c7f0e4678039f52b9c644c2914ccd0bd2bb331da

## RSK Explorer

The RSK explorer is the blockchain explorer for RSK transactions. We will use the Testnet explorer:

[explorer.testnet.rsk.co](https://explorer.testnet.rsk.co/)

![explorer](/img/kb/remix-and-metamask-with-rsk-testnet/image-30.png)

Past the transaction hash at search field, at the top of the screen

![search](/img/kb/remix-and-metamask-with-rsk-testnet/image-31.png)

![search transaction](/img/kb/remix-and-metamask-with-rsk-testnet/image-32.png)

This is the result:

![transaction result](/img/kb/remix-and-metamask-with-rsk-testnet/image-33.png)

You can verify my example at: [`0x419c4b17ec0bf59568d9b5f5c7f0e4678039f52b9c644c2914ccd0bd2bb331da`](https://explorer.testnet.rsk.co/tx/0x419c4b17ec0bf59568d9b5f5c7f0e4678039f52b9c644c2914ccd0bd2bb331da)

## Interact with the smart contract

When a smart contract is deployed with Remix, we can see it in the left panel under deploy and run transactions:

![deployed contracts](/img/kb/remix-and-metamask-with-rsk-testnet/image-34.png)

Click on > to expand SimpleStorage:

![SimpleStorage](/img/kb/remix-and-metamask-with-rsk-testnet/image-35.png)

These are the same functions we created in our smart contract!

The orange buttons are functions which will change some information stored on the blockchain, we call it state changes. This kind of function expends gas when used.

The blue buttons are functions which are read-only and it does not change anything stored on the blockchain. We do not need to expend gas when using them.

### Get

First of all, we will check the value stored at deploy.

Click in the button get

![get](/img/kb/remix-and-metamask-with-rsk-testnet/image-36.png)

We do not have any value stored, because we do not define anything at the moment when we deployed.

At bottom right, we can check that it was a call to `SimpleStorage.get()` function:

![transaction get](/img/kb/remix-and-metamask-with-rsk-testnet/image-37.png)

### Set

Put a value in the field at the right side of the set button, and click on the button

![value to set](/img/kb/remix-and-metamask-with-rsk-testnet/image-38.png)

It will open a Metamask popup window, to confirm the transaction to store a value.

![confirm transaction](/img/kb/remix-and-metamask-with-rsk-testnet/image-39.png)

Click on confirm

At bottom right, we can verify that the transaction is pending, waiting confirmation at blockchain:

![transaction status](/img/kb/remix-and-metamask-with-rsk-testnet/image-40.png)

After a few seconds, Metamask will show when the transaction has been confirmed!

![transaction mined](/img/kb/remix-and-metamask-with-rsk-testnet/image-41.png)

At bottom right, we have the transaction’s details

![transaction details](/img/kb/remix-and-metamask-with-rsk-testnet/image-42.png)

You can copy the transaction hash and verify at RSK explorer too: [`0xb9f4d73e7555d2b3cdf516f2d3044daa58669f7324cb957f2b83da21a6c89b4b`](https://explorer.testnet.rsk.co/tx/0xb9f4d73e7555d2b3cdf516f2d3044daa58669f7324cb957f2b83da21a6c89b4b)

![explorer](/img/kb/remix-and-metamask-with-rsk-testnet/image-43.png)

### Get (again)

Now we have the value 2020 saved, and we can check it

Click in the button get

![get](/img/kb/remix-and-metamask-with-rsk-testnet/image-44.png)

And the value is correct!

## Transactions in Metamask

It is possible to verify all transactions in metamask

![Metamask transactions](/img/kb/remix-and-metamask-with-rsk-testnet/image-45.png)

![Metamask transactions](/img/kb/remix-and-metamask-with-rsk-testnet/image-46.png)

## Final considerations

Did you think that it would be so easy to use Remix and Metamask to create a smart contract which can be used on both Ethereum or RSK networks?

I showed to you how we can use some Ethereum developer tools, and it is great to realize that they can be used on the RSK network as well.

Our goal is to join forces and give options to people who believe in smart contracts based on Ethereum, and also believe in the power of Bitcoin, through RSK.

I hope this tutorial has been helpful and I'd appreciate your feedback. Share it if you like it :)
