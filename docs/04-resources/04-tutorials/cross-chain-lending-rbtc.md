---
sidebar_label: Cross-Chain RBTC Lending Starter Kit
sidebar_position: 3
title: Cross-Chain RBTC-Backed Lending & USDT0 Stablecoin Starter Kit
description: 'A minimal RBTC-collateralized lending starter kit for Rootstock. Includes mock oracle integration, USDT0 ERC-20 support, and guidance for extending the system with LayerZero and Umbrella/RedStone price feeds.'
tags: [rsk, rootstock, lending, cross-chain, layerzero, umbrella, redstone, smart contracts, tutorials]
---


This starter kit provides a minimal RBTC-backed USDT0 lending example on Rootstock. It includes a mock oracle that simulates Umbrella and Redstone price feeds. It is designed to be extended with LayerZero for cross-chain collateral flows. 

## What This Project Does 

This project consists of the lending pool contract that manages the lending process. It has an adapter contract that simulates the Umbrella oracle, so you can replace it with a real oracle integration when building out for real users. It also has a mock USDT0 token contract that mimics a stablecoin that you might want to interact with when creating your app. LendingPool accepts native RBTC as collateral and uses an ERC-20 (USDT0) as the borrowable asset.

The user can deposit RBTC from the Rootstock blockchain and borrow USDT0 (ERC-20 on Rootstock). The LendingPool contract accepts the RBTC deposit and calculates the USD value of collateral and debt, and determines how much USDT0 the user can safely borrow. The LendingPool is modular and oracle-agnostic. LayerZero is an interoperability protocol that allows multiple chains to send messages. By adding a LayerZero receiver, you can extend the LendingPool to credit collateral from other blockchains. 

**Project illustration:**

              +---------------------------+
              |      LendingPool.sol      |
              |---------------------------|
              | - accepts RBTC deposits   |
User -------> | - tracks collateral       |
              | - handles USDT0 debt      |
              +--------------+------------+
                             |
                             | requests price
                             v
                 +----------------------------+
                 |   Price Oracle Adapter     |
                 |----------------------------|
                 | returns USD price (1e18)   |
                 +--------------+-------------+
                             |
                             | price result
                             v
              +-------------------------------+
              |  LendingPool computes:        |
              |  - collateral USD value       |
              |  - debt USD value             |
              |  - max borrowable USDT0       |
              +-------------------------------+





### Cross-chain Data flow

Although the boilerplate is Rootstock-native, it can be extended to other chains using LayerZero.  RBTC is the underlying collateral asset, but LayerZero allows deposits to originate on other chains. Cross-chain communication does not mean sending RBTC across chains. The system sends messages instead of bridging tokens directly. The LendingPool contract has to be able to receive the LayerZero "credit collateral" message. Other source chains can be integrated into the system as LayerZero senders. 

Essentially, the flow follows the following steps.

1. User interacts with a vault that holds "wrapped RBTC" on a source chain (e.g., Ethereum)
2. User deposits or locks rBTC-equivalent collateral
3. The dApp uses LayerZero to send a message to Rootstock
4. The message includes:
    - user address
    - amount of collateral
5. Rootstock receives the message through a LayerZero Receiver contract
6. The Receiver contract calls LendingPool to increase `collateralRBTC[user]`
7. User can now borrow USDT0 on Rootstock

**NB:** 
- A wrapped RBTC is the representation of RBTC on a non-Rootstock chain.

- This boilerplate does **not** include the LayerZero sender or receiver contracts.  
You must implement a LayerZero receiver on Rootstock that calls the LendingPool  
`creditCollateral()` internally. The LendingPool does not currently include  
this function; you must add it.

- You must also implement a LayerZero sender contract on the remote chain to send  
the `{user, collateralAmount}` payload.
 

**Cross-chain data flow illustration:**

User (Chain A)
   | sends wrapped-rBTC + LZ message
   v
LayerZero Endpoint
   | forwards payload
   v
LZ Receiver Contract (Rootstock)
   | credit collateral event
   v
LendingPool.sol updates collateralRBTC[user]


## Prerequisites

* Node.js and `npm`
* Hardhat
* Rootstock RPC
* Wallet with tRBTC
* Basic Solidity knowledge

> See [how to install Node and NPM](https://dev.rootstock.io/developers/requirements/#installing-nodejs-and-npm).



## Quick Setup

To run the project, you can clone the repo with the following command:
```bash
git clone https://github.com/rsksmart/rbtc-usdt0-lending-boilerplate
```

Then, navigate into the cloned directory and install the Node dependencies
```bash
cd rbtc-usdt0-lending-boilerplate
npm install
```

Run the demo script to see the app in action:
```bash
npm run demo
```


You should get the following output:
```bash
> rbtc-usdt0-lending-boilerplate@0.1.0 demo
> hardhat run scripts/demo.js

Compiled 13 Solidity files successfully (evm target: paris).
Deployer: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Alice   : 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
USDT0  : 0x5FbDB2315678afecb367f032d93F642f64180aa3
Oracle : 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
Pool   : 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
Alice deposited 0.01 RBTC

== After deposit ==
Collateral (RBTC): 0.01
Debt (USDT0)     : 0.0
Collateral USD   : 650.0
Debt USD         : 0.0
Max Debt USD     : 455.0
Health Factor    : 115792089237316195423570985008687907853269984665640564039457.584007913129639935
Alice borrowed 400 USDT0

== After borrow ==
Collateral (RBTC): 0.01
Debt (USDT0)     : 400.0
Collateral USD   : 650.0
Debt USD         : 400.0
Max Debt USD     : 455.0
Health Factor    : 1.1375
Alice repaid 200 USDT0

== After repay ==
Collateral (RBTC): 0.01
Debt (USDT0)     : 200.0
Collateral USD   : 650.0
Debt USD         : 200.0
Max Debt USD     : 455.0
Health Factor    : 2.275
Alice withdrew 0.002 RBTC

== After withdraw ==
Collateral (RBTC): 0.008
Debt (USDT0)     : 200.0
Collateral USD   : 520.0
Debt USD         : 200.0
Max Debt USD     : 364.0
Health Factor    : 1.82

Demo complete ✅
```

In the output, a user, Alice, deposits 0.01 RBTC as collateral, which is equivalent to 650 USD. 
She is entitled to borrow up to 455 USD, so she borrowed 400 USDT0. 
After borrowing, she repaid 200 USDT0 and withdrew 0.002 RBTC of her collateral. 
She now has 0.008 RBTC remaining as collateral and a 364 USD maximum-debt allowance. 


### Some Deployment Tips

 Getting tRBTC: you can follow the following steps to get tRBTC to if you want to deploy to the testnet:

1. Go to the [Rootstock faucet](https://faucet.rootstock.io/)
2. Enter your wallet address
3. Complete the captcha and request funds
4. Wait a few minutes for the transaction to be confirmed
5. Follow the [testnet deployment guide](https://dev.rootstock.io/developers/smart-contracts/hardhat/deploy-smart-contracts/) on the Rootstock website to deploy to testnet.




### Umbrella / RedStone Integration Guide

The `UmbrellaOracleAdapter` in the boilerplate is a mock and not a real oracle feed. It manually stores prices with `setPriceE18()` or `setBatch()`. This works for local and testnet development. The `getPrice(asset)` currently reads from a mapping `mapping(address => uint256) public pricesE18;`.

If you plan to go into production, you will have to revamp it and write a real oracle adapter. You would likely still keep the `IPriceOracle` interface but replace the internal logic of `getPrice(asset)` by calling the real Umbrella on-chain feed instead of reading from the mapping. The return value must be normalized to **1e18 decimals**. You can maintain the LendingPool contract or extend it to meet your design.

Alternatively, you can use the RedStone price feed oracles. You would have to implement a RedStone adapter that also exposes `getPrice(address)` and returns `uint256 priceE18`. RedStone adapters generally read signed price data from calldata.  
LendingPool uses the `IPriceOracle` interface in a plug-and-play manner and not the adapter-specific logic. This enables you to easily change the adapter without affecting the lending logic.


## **Contracts Breakdown Section**

- `LendingPool.sol`: The lending pool contract handles deposit, borrow, repayment, and withdrawal. It calculates collateral and debt in USD and applies the health-factor logic.

- `UmbrellaOracleAdapter.sol`: A mock oracle adapter that stores and sets prices manually. This is a simplified version meant only for local/testnet development. You must integrate a real Umbrella or RedStone adapter for production use.

- `MockUSDT0.sol`: A mock ERC-20 token used for local development. You must replace this with the real USDT0 contract address when deploying to testnet or mainnet.

- `IPriceOracle.sol`: Interface that ensures any oracle implementation fits the LendingPool. It simply returns a USD price with 18 decimals.

- **Scripts:**
	- `demo.js` runs the full flow locally with Hardhat, deploying the mock USDT0, the mock oracle, and the LendingPool contract. It demonstrates the deposit → borrow → repay → withdraw lifecycle.

	- `demo-testnet.js` is similar but runs on the Rootstock testnet using tRBTC.


## Use Cases 

* Cross-chain stablecoin borrowing: with LayerZero integration, you can extend the boilerplate to build a cross-chain lending platform, allowing your users to use RBTC to borrow against assets on other blockchains.
* Yield strategies: you can extend the starter kit to set up staking, yield farming, and liquidity-providing systems.
* Developer projects: developers can use this project as a starter kit for experimenting with different lending protocol designs.


## Repo & Resources

* GitHub repo: https://github.com/rsksmart/rbtc-usdt0-lending-boilerplate/
* Rootstock docs: https://dev.rootstock.io/



