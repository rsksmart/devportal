---
sidebar_label: Blockchain Overview
sidebar_position: 200
title: "Getting Started with Rootstock (RSK) Development"
description: "Learn how to interact with Rootstock in your web browser, how to look at Rootstock transactions, develop and deploy your very first smart contract to the Rootstock network."
tags:
  [
    quick-starts,
    rsk,
    rootstock,
    blockchain,
    browser wallets,
    developers,
    beginners,
  ]
---

Learn about Rootstock, how it enables smart contract on Bitcoin, and its compatibility with Ethereum and other platforms.

## What is Rootstock?

Rootstock’s full technology stack is built on top of Bitcoin:
From Rootstock smart contracts to the Rootstock Infrastructure Framework.
The stack is designed to create a more fair and inclusive financial system.

> See [The Stack](/concepts/fundamentals/stack/)

Bitcoin, is a store and transfer of value.
The blockchain is secure because miners with high infrastructure and energy costs create new blocks to be added to the blockchain every 10 minutes.
The more hashing power they provide, the more secure the network is.
Rootstock is the first open source smart contract platform that is powered by the bitcoin network.
Rootstock’s goal is to add value and functionality to the bitcoin ecosystem by enabling smart-contracts,
near instant payments, and higher-scalability.
RIF is an all-in-one suite of open and decentralized infrastructure applications and services that enable faster,
easier and scalable development of distributed applications (dApps) within a unified blockchain environment.

Rootstock is connected to Bitcoin in terms of how its blocks are mined,
and also in terms of a common currency.
Rootstock is also compatible with Ethereum in terms of its virtual machine (which executes smart contracts),
as well as the RPC (external API) that it exposes.
Let’s briefly look at each of these areas.

## Powpeg

The second point of contact is the [Powpeg](/concepts/powpeg/).
This component connects both networks to allow the transfer of bitcoins to Rootstock,
thereby allowing developers to interact with smart contracts.
They pay gas using the same bitcoin, the smart bitcoin.

<div class="sprite-transform-animation-wrapper rsk-peg">
  <div class="sprite-transform-animation rsk-peg"></div>
</div>

To do so, you send bitcoin to a special address,
where they are locked in the bitcoin network.
Next, in the same address over in the Rootstock network,
that same bitcoin is released to the user for use in the Rootstock network.
This is called peg-in.
You can do the reverse operation called peg-out,
by sending your bitcoin to a special address in the Rootstock network,
and receiving your bitcoin back in the bitcoin network.

## Differences with Rootstock and Ethereum

Rootstock is not 100% compatible with Ethereum: It has differences in the way checksums are calculated,
the derivation path it uses, and how gas is calculated.

### Checksum differences

- Different Ethereum-compatible networks differentiate themselves using “chain IDs”.
- Each blockchain network has its own unique chain ID.
- Rootstock uses the chain ID when calculating checksums for its addresses, whereas Ethereum does not take this into account.
- Checksums in both networks are represented using capitalisation (uppercase and lowercase letters), so the “same” address will not pass checksum validations on both Rootstock and Ethereum.

### Derivation path differences

Remembering or storing private keys for your crypto wallets can be super challenging, even for technical people.
This is because these keys are essentially extremely large numbers.
So to make things easier, the crypto community has come up with a technique called “HD wallets”, where using a seed phrase (a set of randomly chosen dictionary words), plus a “derivation path”. Rootstock and Ethereum have different derivation paths, therefore, the same seed phrase results in a different set of keys and addresses between Rootstock and Ethereum.

### Gas differences

The EVM and RVM are compatible in that they support the same op-codes, and therefore can run the same smart contracts.
However, the price of each op-code (measured in units known as gas) is different between EVM and RVM, thus the total gas consumed in various transactions is different.
Further to that, gas units are multiplied by gas price to calculate the transaction cost.
Since Rootstock’s gas price is denominated in RBTC and Ethereum’s gas price is denominated in Ether, there is another difference between gas prices on Rootstock and Ethereum.

Note that when `eth_estimateGas` is called, the node simulates the transaction execution without broadcasting it to the network.
The simulation runs through the entire transaction process as if it were being executed, including checking for sufficient balance, contract code execution, etc.
During the simulation, the method calculates the exact amount of gas that would be consumed by the transaction if it were to be executed on the blockchain. The estimated gas amount is returned, helping users set an appropriate gas limit for the actual transaction.

There is a difference in Rootstock compared to Ethereum, and it is that if one of the steps of the simulated transaction fails, the node will return the gas estimation needed for the transaction, while on Ethereum, the node will return an error instead of the gas estimation.

You can see this behavior in the following example, where a call for `eth_estimateGas` on a transaction that would be executed from an address without enough balance.

Example:

```js
{
    "jsonrpc":"2.0",
    "method":"eth_estimateGas",
    "params":[
        {"from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
        "gas": "0x76c0",
        "gasPrice": "0x9184e72a000",
        "value": "0x9184e72a",
        "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"},
        "latest"
    ],
    "id":0
}
```

Response on Rootstock:

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x5498"
}
```

Response on Ethereum:

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "error": {
        "code": -32000,
        "message": "insufficient funds for transfer"
    }
}
```

## EVM Compatible Smart Contracts

If you are familiar with smart contract development or dApp development using solidity, web3, and other compatible technologies; you might be excited to know that the Rootstock Virtual Machine (RVM) is compatible with the Ethereum Virtual machine (EVM).
So you can use the same code, tools, and libraries when developing with Rootstock too.
Thus, the smart contract/dApp development skills that you’re used to will transfer across quite nicely too!

> See supported Solidity version in [requirements](/developers/requirements/)

### Tools

- [Hardhat](https://hardhat.org/docs) is an Ethereum development environment designed for professionals. It's primarily used in the development of smart contracts for the Ethereum blockchain.
  Refer to the [Hardhat Overview](/dev-tools/environments/hardhat/) for an overview of how it's used on Rootstock.

- [Metamask](https://metamask.io/) is a browser extension cryptocurrency wallet or mobile app,
  enabling users to interact with the Rootstock blockchain,
  including sending RBTC, sending Rootstock-based tokens such as RIF,
  and interacting with smart contracts deployed to the Rootstock network.
  See how to [configure MetaMask to connect to Rootstock](/dev-tools/wallets/metamask/).

- [Mocha](https://mochajs.org/) is a popular JavaScript test framework running on Node.js.
  See [Testing Smart Contracts](/developers/smart-contracts/hardhat/test-smart-contracts/) to see how to use it to test your smart contracts on Rootstock.

- [Solidity](https://docs.soliditylang.org/) is the most popular programming language for implementing smart contracts.
  The bytecode and ABI that the Solidity compiler, `solc`, outputs can be used to deploy and interact with smart contracts on Rootstock, thanks to the compatibility between RVM and EVM.

> For a comprehensive list of tools, see [Dev Tools](/dev-tools/) section.

## Ethereum Compatible JSON RPC

The set of remote procedure calls (RPCs) that Rootstock supports is largely the same as the RPCs supported by Ethereum.
This is another layer of compatibility, in addition to the virtual machine implementation, which allows the same tools and libraries to be used.

## Merged Mining

The bitcoin miners do what is known as [merged mining](/concepts/merged-mining/),
securing both networks with the same infrastructure and energy consumption.

<div class="sprite-transform-animation-wrapper rsk-mining">
  <div class="sprite-transform-animation rsk-mining"></div>
</div>

They create blocks on the bitcoin network every 10 minutes, including transfer of bitcoin from different addresses, and in the process they create new bitcoins.
On Rootstock, blocks are created every 30 seconds, to secure the execution of smart contracts.
This does not mint any new coins in the process, but does earn a reward from the merged mining.
Check out [rootstock.io/mine-btc-with-rootstock](https://rootstock.io/mine-btc-with-rootstock/) to learn more about mining.

:::info[Note]
The time between blocks on each network listed above are approximate values.
:::
