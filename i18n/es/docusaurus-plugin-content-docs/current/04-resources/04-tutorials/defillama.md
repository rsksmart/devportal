---
sidebar_position: 6
title: Add a Protocol To DefiLlama
sidebar_label: Add a Protocol To DefiLlama
description: DefiLlama is the largest TVL aggregator for DeFi. Learn how to list a DeFi project and write an SDK adapter to add a Protocol to DefiLlama.
tags:
  - knowledge-base
  - defillama
  - protocol
  - rootstock
  - defi
---

<!-- ![DefiLlama](/img/resources/defillama-logo.png)  -->

[DefiLlama](https://defillama.com/) is the leading aggregator for Total Value Locked (TVL) in the decentralized finance (DeFi) ecosystem. Its open-source data is maintained by a community of contributors from various protocols. DefiLlama prioritizes accuracy and transparency in its methodology.

TVL is calculated by assessing the value of tokens locked in the contracts of DeFi protocols and platforms. While bridge projects are included in the calculation, their TVL does not contribute to the overall TVL of any specific blockchain.

> Check out the [DefiLlama website](https://defillama.com/) and [DefiLlama docs](https://docs.llama.fi/list-your-project/readme) for more details.

## How to list a DeFi project

Most adapters featured on DefiLlama are provided and managed by their individual communities, and any modifications are organized through the [DefiLlama/DefiLlama-Adapters](https://github.com/DefiLlama/DefiLlama-Adapters) GitHub repository.

<div class="btn-container">
  <span></span>
    <a class="green" href="https://docs.llama.fi/list-your-project/submit-a-project">How to Submit a Project</a>
</div>

## How to write an SDK adapter

An adapter is a piece of code designed to receive a UNIX timestamp and blockchain block heights as inputs. It then provides the balances of assets held within a protocol, considering the associated decimals (i.e., how they are stored on the blockchain). The SDK handles the conversion of raw asset balances into their equivalent in USD and aggregate them to calculate the total TVL. Consequently, the adapter requires minimal processing, as most of the conversion work is performed by the SDK.

<div class="btn-container">
  <span></span>
    <a class="green" href="https://docs.llama.fi/list-your-project/how-to-write-an-sdk-adapter">How to write an SDK Adapter</a>
</div>

## Resources

- Visit [DeFiLlama About](https://defillama.com/about) to learn more.