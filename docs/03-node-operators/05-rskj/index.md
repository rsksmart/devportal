---
sidebar_label: Getting Started with RSKj
title: 'Getting Started with RSKj'
description: 'Explore the different ways to get started with rskj as a developer, node runner or as miner on RSK '
tags: [knowledge-base, rskj,rootstock, rsk, node, blockchain, developers, wallets]
layout: 'rsk'
---

**RSKj** is the software used to run nodes on the Rootstock network.

You can run
[RSKj](/rsk/node/) locally to connect to the public Rootstock networks -
[RSK Mainnet](https://explorer.rsk.co/), and the
[RSK Testnet](https://explorer.testnet.rsk.co/).
This is an alternative to connecting to the
[public nodes](/rsk/public-nodes/).

RSKj can also run in a “localhost”-only environment, without connecting to any public network - [Rootstock Regtest](/rsk/node/configure/switch-network/#regtest)

> The `--import` feature can be used to import the block database from an external source. See example for [using the import feature](/kb/rskj-for-developers/#import). This is to be used ONLY for testing and development purposes and not in production.

If you do one of the following activities, you are likely to need to run RSKj on your computer.

- Development <!-- → /kb/rskj-for-developers TODO add link -->
- Running nodes <!-- → /kb/rskj-for-node-runners  TODO add link -->
- Mining <!-- → /kb/rskj-for-miners TODO add link -->

If none of the above applies to you, it is quite likely that you do not need to run RSKj software on your computer.

- If you would like to interact with a DApp
  - Use [Web3 enabled wallet software](/develop/wallet/use/) 
  <!-- (URL) → /kb/dapps-web3 -->
  - [Configure MetaMask to connect to Rootstock](/tutorials/ethereum-devs/remix-and-metamask-with-rsk-testnet/)
    is a step by step guide demonstrating how to interact with a DApp on Rootstock using MetaMask.
- If you would like to build a DApp on Rootstock
    - Use the [Quick Start Guide on Rootstock](/guides/quickstart/)
    - Check out the [Complete Full Stack dApp Guide on Rootstock](/guides/full-stack-dapp-on-rsk/part1-overview/)
    - How to [Configure Hardhat for Rootstock](/kb/hardhat-setup-on-rsk/)
- If you would like to check the status of the Rootstock network, use;
  - [Rootstock Mainnet Stats](https://stats.rsk.co/)
  - [Rootstock Testnet Stats](https://stats.testnet.rsk.co/)
- If you would like to check the status of a particular transaction, use;
  - [Rootstock Explorer](https://explorer.rsk.co/)
  - [Rootstock Testnet Explorer](https://explorer.testnet.rsk.co/)
  - [Make JSON-RPC requests](/rsk/node/architecture/json-rpc/)
- If you would like to obtain or transfer RBTC or tokens on the Rootstock network
  - See [Get Crypto on Rootstock](/guides/get-crypto-on-rsk/) for the various options available
