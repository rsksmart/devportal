---
sidebar_position: 14
sidebar_label: General Tools
title: General Tools
description: "General tools to build on Rootstock" 
tags: [hardhat, quick start, developer tools, rsk, rootstock, ethereum, dApps, smart contracts]
---

## Faucets

* [Rootstock Faucet](https://faucet.rootstock.io/): Get free test RBTC tokens for development and testing.
* [RIF Testnet Faucet](https://faucet.rifos.org/): Obtain free RIF testnet tokens to explore the RIF ecosystem.
* [Thirdweb Faucet](https://thirdweb.com/rootstock-testnet): Get free test RBTC tokens for development and testing.
* [Blast Faucet](https://blastapi.io/faucets/rootstock-testnet): Get free test RBTC tokens for development and testing.

## Gas Fees
* [Rootstock Gas Station](https://rskgasstation.info/?AspxAutoDetectCookieSupport=1): Estimate gas fees for your transactions on the Rootstock network.

## Exchanges - Getting RBTC

To acquire RBTC or RIF, you can use various methods:

* Exchanges: Purchase RBTC or RIF on cryptocurrency exchanges that support them. See the [RBTC](https://rootstock.io/rbtc/) section to get started. To get RIF, see the [RIF Token](https://rif.technology/rif-token/) section.
* Bridges: Transfer your tokens from other blockchains to the Rootstock network using bridges.

## Code Quality

To ensure the quality and security of your smart contracts, consider using these tools:

* [Sourcify](https://sourcify.dev/): Verify smart contracts on Rootstock, Sourcify enables transparent and human-readable smart contract interactions through automated Solidity contract verification, contract metadata.
* [Slither](https://github.com/crytic/slither): Slither built with Solidity & Vyper static analysis framework written in Python3, enables developers to find vulnerabilities, enhance their code comprehension, and quickly prototype custom analyses.
* [SolidityScan](https://solidityscan.com/): Secure your smart contracts on Rootstock, and get accurate security audit results and detailed reports.

## dApp Testing

Effectively test your dApps with these tools:

* Cucumber: Write clear and concise test scenarios using Gherkin syntax. Get started using the [dApp automation with Cucumber and Playwright](/resources/tutorials/dapp-automation-cucumber)
* Playwright: Automate browser interactions to simulate real-world user behavior.
* Synpress: Specifically designed for dApp testing, seamlessly integrates with MetaMask and other wallets.

## CI/CD

* [Tenderly Virtual TestNets](https://docs.tenderly.co/virtual-testnets?mtm_campaign=ext-docs&mtm_kwd=rsk) are hosted on-demand infrastructure for running automated tests and staging smart contracts and dapps. Virtual TestNets are simulated blockchain networks, providing access to actual network data through State Sync, allowing full control over the simulated network via Admin RPC, and making it easy to obtain native and ERC-20 tokens through Unlimited Faucet. Rely on [Tenderly GitHub Action](https://docs.tenderly.co/virtual-testnets/ci-cd/github-actions-foundry?mtm_campaign=ext-docs&mtm_kwd=rsk) for provisioning Virtual TestNets for tests and contract staging.

## Monitoring
To monitor smart contract interactions and react accordingly, explore the following options:

- Configure [Tenderly Alerts](https://docs.tenderly.co/alerts/intro-to-alerts?mtm_campaign=ext-docs&mtm_kwd=rsk) for notifications on transactions and contract events to enable awareness of critical issues or signal problems to external webhooks. Use [Alerts API](https://docs.tenderly.co/reference/api#/operations/createAlert?mtm_campaign=ext-docs&mtm_kwd=rsk) to programmatically set up more complex alerts with higher granularity of triggering criteria.
- Use [Tenderly Web3 Actions](https://docs.tenderly.co/web3-actions/intro-to-web3-actions?mtm_campaign=ext-docs&mtm_kwd=rsk) to automate predefined responses, improving security and user experience. 

## Simulations
Transaction simulations give a prediction of a transaction's execution on the desired network. Obtaining predicted gas usage and asset changes enables additional security layers for dApps and makes security research easier.
- [Tenderly Simulator UI](https://docs.tenderly.co/simulator-ui?mtm_campaign=ext-docs&mtm_kwd=rsk) makes it easy to compose single transactions and debug existing ones using [Tenderly Debugger](https://docs.tenderly.co/debugger?mtm_campaign=ext-docs&mtm_kwd=rsk).
- [Tenderly Simulation API](https://docs.tenderly.co/simulations/single-simulations#simulate-via-rpc?mtm_campaign=ext-docs&mtm_kwd=rsk) lets you perform simulations from your code and access asset changes, gas used, decoded transaction trace, and more. To simulate several transactions, use [simulation bundles API](https://docs.tenderly.co/simulations/bundled-simulations?mtm_campaign=ext-docs&mtm_kwd=rsk).

## Mining Tools

Interested in mining on the Rootstock network? Consider using these mining pools:

* [BraiinsPool](https://braiins.com/pool)
* [Luxor](https://luxor.tech/mining)
* [F2Pool](https://www.f2pool.com/)
* [ViaBTC](https://www.viabtc.com/)
* [Antpool](https://www.antpool.com/home)

:::info[Info]

If you're looking to set up your node for merged mining. See the [Node Operator](/node-operators/merged-mining/) section for more information.

:::