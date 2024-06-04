---
sidebar_label: Hardhat
menu_title: Overview - Introduction to Hardhat
layout: rsk
title: 'Getting Started with Hardhat | Rootstock (RSK)'
description: 'Get started with creating a dApps on Rootstock using Hardhat and other tools.'
tags: [quick-start, getting-started, guide, how-to, transactions, explorer, bitcoin, rsk, rootstock, peer-to-peer, merged-mining, blockchain, powpeg]
---

The quick start guide is designed to smoothly transition Web2 developers into the Rootstock Ecosystem. Rootstock is the first, and longest-lasting Bitcoin sidechain. It is the only layer 2 solution that combines the security of Bitcoin's proof-of-work, with Ethereum's smart contract capabilities. The platform is open-source, EVM-compatible, and secured by over 60% of Bitcoin’s hashing power, making it the gateway to a vibrant ecosystem of dApps that continues to evolve to become fully trustless.

> If you're new to Web3 and Smart Contract Development, begin by exploring the [Rootstock network](/guides/quickstart/overview/). Then progress step by step to the quick start Guide with Hardhat for a comprehensive understanding of the network and getting started with writing, testing, and deploying smart contracts on Rootstock.

> For your convenience, we've established a [GitHub repository](https://github.com/rsksmart/rootstock-quick-start-guide) dedicated to this guide. The [master branch](https://github.com/rsksmart/rootstock-quick-start-guide/tree/master) contains the initial project state, while the [feat/complete](https://github.com/rsksmart/rootstock-quick-start-guide/tree/feat/complete) branch features the complete project, equipped with all the necessary installations for your reference.

> Note: This guide is optimized for Node.js version 18 or earlier. If you're using a later version, consider using a version manager like [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md) to switch to a compatible version.

> Need to ramp up fast and get started with Hardhat? Use the [Hardhat Starter Kit](https://github.com/rsksmart/rootstock-hardhat-starterkit) or [Wagmi Starter Kit](https://github.com/rsksmart/rsk-wagmi-starter-kit)

<div class="features-list">
    <ul id="card-list" class="row">
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/guides/starter-kits/hackathon-starter#quick-start-setup">
            <div class="content-container">
               <div class="card-title"><h2 class="zg-text-bg">Prerequisites</h2><span class="zg-label ml-1">01</span></div> 
                <p class="card-desc">Learn about the tools you need to have in place to follow along with this guide.</p>
            </div>
            </a><div class="btn-container "><a href="/guides/starter-kits/hackathon-starter#quick-start-setup">
                </a>
                <a class="green" href="/guides/starter-kits/hackathon-starter#quick-start-setup">View the Prerequisites</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/guides/quickstart/hardhat/create-hardhat-project/">
            <div class="content-container">
              <div class="card-title"><h2 class="zg-text-bg bg-yellow">Create a Hardhat Project</h2><span class="zg-label ml-1 bg-yellow">02</span></div> 
                <p class="card-desc">Learn how to set up your environment for development using Hardhat.</p>
            </div>
            </a><div class="btn-container"><a href="/guides/quickstart/hardhat/create-hardhat-project/">
                </a>
                <a class="green" href="/guides/quickstart/hardhat/create-hardhat-project/">Setup Environment</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/guides/quickstart/hardhat/configure-hardhat/">
            <div class="content-container">
               <div class="card-title"><h2 class="zg-text-bg bg-yellow">Configure Hardhat for Rootstock</h2><span class="zg-label ml-1 bg-yellow">03</span></div> 
                <p class="card-desc">Learn how to configure your Hardhat project for development on Rootstock testnet and mainnet.</p>
            </div>
            </a><div class="btn-container"><a href="/guides/quickstart/hardhat/configure-hardhat/">
                </a>
                <a class="green" href="/guides/quickstart/hardhat/configure-hardhat/">View the libraries</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content two-line-title-content"><a href="/guides/quickstart/hardhat/write-smart-contract/">
            <div class="content-container">
            <div class="card-title"><h2 class="zg-text-bg bg-purple">Write Smart Contracts</h2><span class="zg-label ml-1 bg-purple">04</span></div>
                <p class="card-desc">Learn how to create a smart contract on the Rootstock network.</p>
            </div>
            </a><div class="btn-container"><a href="/guides/quickstart/hardhat/write-smart-contract/">
                </a>
                <a class="green" href="/guides/quickstart/hardhat/write-smart-contract/">Get Started</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/guides/quickstart/hardhat/test-smart-contract/">
            <div class="content-container">
               <div class="card-title"><h2 class="zg-text-bg bg-pink">Test Smart Contracts</h2><span class="zg-label ml-1 bg-pink">05</span></div> 
                <p class="card-desc">Learn how to test your smart contract to ensure it's working as expected.</p>
            </div>
            </a><div class="btn-container"><a href="/guides/quickstart/hardhat/test-smart-contract/">
                </a>
                <a class="green" href="/guides/quickstart/hardhat/test-smart-contract/">Start Testing</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/guides/quickstart/hardhat/deploy-smart-contract/">
            <div class="content-container">
               <div class="card-title"><h2 class="zg-text-bg bg-green">Deploy Smart Contracts</h2><span class="zg-label ml-1 bg-green">06</span></div> 
                <p class="card-desc">Learn how to deploy your smart contract to your local environment and the Rootstock network.</p>
            </div>
            </a><div class="btn-container"><a href="/guides/quickstart/hardhat/deploy-smart-contract/">
                </a>
                <a class="green" href="/guides/quickstart/hardhat/deploy-smart-contract/">Start Deployment</a>
            </div>
            </div>
        </div>
        </li>
<li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/guides/quickstart/hardhat/interact-with-frontend/">
            <div class="content-container">
               <div class="card-title"><h2 class="zg-text-bg bg-cyan">Interact with the Frontend</h2><span class="zg-label ml-1 bg-cyan">07</span></div> 
                <p class="card-desc">Learn how to interact with the smart contract from the front-end application.</p>
            </div>
            </a><div class="btn-container"><a href="/guides/quickstart/hardhat/interact-with-frontend/">
                </a>
                <a class="green" href="/guides/quickstart/hardhat/interact-with-frontend/">Start interacting</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/guides/quickstart/hardhat/debugging-and-troubleshooting/">
            <div class="content-container">
               <div class="card-title"><h2 class="zg-text-bg bg-cyan">Debugging and Troubleshooting Tips</h2><span class="zg-label ml-1 bg-cyan">08</span></div> 
                <p class="card-desc">Learn about the common issues you can come across while building following this guide and how you can solve them.</p>
            </div>
            </a><div class="btn-container"><a href="/guides/quickstart/hardhat/debugging-and-troubleshooting/">
                </a>
                <a class="green" href="/guides/quickstart/hardhat/debugging-and-troubleshooting/">Learn how to Debug</a>
            </div>
            </div>
        </div>
        </li>
    </ul>
</div>
