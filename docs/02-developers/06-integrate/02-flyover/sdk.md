---
sidebar_label: Using the SDK
sidebar_position: 110
title: rBTC Flyover - SDK Integration
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg]
description: The Flyover SDK streamlines integration between client applications and the Flyover Protocol. This easy-to-use JavaScript/TypeScript toolkit provides configuration options for Liquidity Providers (LPs) and custom network setups for connecting to Rootstock.
---

The rBTC Flyover SDK streamlines integration between client applications and the Flyover Protocol. This easy-to-use JavaScript/TypeScript toolkit provides configuration options for Liquidity Providers (LPs) and custom network setups for connecting to Rootstock.

Here you can find step-by-step guides on how to integrate and perform basic operations using the SDK. 

## Prerequisites 
The following are the minimum requirements and dependencies required for integrating the Flyover SDK.

### Hardware Requirements
* See the [minimum hardware requirements](/node-operators/setup/requirements/) to set up and run a Rootstock Node.

### Networks
* See the list of supported networks by the Flyover SDK

:::tip[Tip]

To set up a Rootstock node (RSKj). Read the [Installation Guide](/node-operators/setup/installation/) for different operating systems or use the [Reproducible build](/node-operators/setup/reproducible-build/). 

:::

### Getting Testnet Funds
You can get test BTC funds on [Coinfaucet](https://coinfaucet.eu/en/btc-testnet/). To get test funds for rBTC, use the [Rootstock Faucet](https://faucet.rootstock.io/). To get a legacy wallet address for use on Testnet, consider using an [Electrum Bitcoin wallet](https://electrum.org/).

### Contract Addresses
Find a list of contract addresses for the [Liquidity Bridge Contract (LBC)](https://github.com/rsksmart/liquidity-bridge-contract), mainnet, and testnet addresses.
* [LBC Mainnet](https://explorer.rootstock.io/address/0xaa9caf1e3967600578727f975f283446a3da6612)
* [LBC Testnet](https://explorer.testnet.rootstock.io/address/0xc2a630c053d12d63d32b025082f6ba268db18300)

## Installation 

To install the Flyover SDK. See the different installation types.

```bash
npm install @rsksmart/flyover-sdk
```

## Usage

Import the Flyover SDK into project:

```javascript
import { Flyover } from '@rsksmart/flyover-sdk';
```

### Initialise the SDK

```javascript
const flyover = new Flyover({ 
	network: 'Regtest',
captchaTokenResolver: async () => Promise.resolve(''),
})
```

> This creates a new instance of the Flyover and sets the network to "Regtest". See available network options.

:::warning[catpchaTokenResolver]

There is a mandatory parameter called `catpchaTokenResolver`, this is because some LPs might want to enforce only human-generated quotes to provide their services.

:::

## Configuring the SDK
* See section on how to configure the Flyover SDK in the `FlyoverConfig` object.

## Connect to Rootstock

Note that you can provide a [Regtest environment URL](/node-operators/setup/configuration/switch-network/#regtest). For insecure custom environment URLs, it is required to allow for insecure connections.

```javascript
const flyover = new Flyover({
    network: 'Regtest',
    customRegtestUrl: 'http://localhost:8080',
    allowInsecureConnections: true
})
```

## Peg in Operations

A Peg-in is the process of converting BTC to rBTC.

### Choose a Liquidity Provider (LP)
First, you need to choose the LP that will be providing the service to advance the rBTC, in order to do this, you should fetch the LPs list and select one of them by using the `useLiquidityProvider` method. Before making this selection you may want to present the options to the final users so they can choose based on the delivery time or fees.

```js
const providers = await flyover.getLiquidityProviders()
 flyover.useLiquidityProvider(providers.at(0))
```

### Request a Quote
Now, you can interact with the SDK and perform basic queries, for example, request a quote.

```js
    const quotes = await flyover.getQuotes({ /* QuoteRequest data... */ })
    const acceptedQuote = await flyover.acceptQuote(quotes.at(0))
```

### Get Quotes
Quotes act as a contract between a user and a liquidity provider. The `getQuote` operation creates a quote that defines the terms of the service that the LP will provide to a given user, each quote is unique so if the same request is done multiple times it will result in different quotes. The `PeginQuoteRequest` is used to compute a specific  quote.

**Example Request:**

```js
flyover.useLiquidityProvider(provider)
await flyover.getQuotes(quoteRequest)
```

> This sets the provider for the Flyover instance using the `useLiquidityProvider` method. This method also sets the provider whose LPS will be used to get/accept quotes.

### Accept a quote

This accepts a specific peg-in quote. Meaning that the user is expressing commitment to pay for that quote according to the terms negotiated with the LP through the quote specification. Here, the user is provided with the address that they need to transfer his BTC to.

```js
flyover.useProvider(provider)
const quotes = await flyover.getQuotes(quoteRequest)
await flyover.acceptQuote(quotes[0])
```

## Peg out Operations

This is the process of converting rBTC to BTC. See [Mainnet Guide](/concepts/rbtc/networks/#mainnet-conversion).

### Select a Liquidity Provider
In the same way we need to select an LP to perform PegIn operations, we need to select one to perform PegOut operations. It’s important to remark that if you already selected an LP to perform a PegIn you don’t need to select it again for a PegOut.

```js
 const providers = await flyover.getLiquidityProviders()
 flyover.useLiquidityProvider(providers.at(0))
```

### Get Peg out Quote
This operation gets the available peg-out quotes for the given parameters. Instead of a QuoteRequest, this method requires a `PegOutQuoteRequest`.

```js
flyover.useProvider(provider)
await flyover.getPegoutQuotes(quoteRequest)
```

### Accept Peg out Quote
This method accepts a specific peg out quote and returns a promise with an `AcceptedPegoutQuote`, an accepted quote with confirmation data. Instead of a deposit address, the acceptPegoutQuote method returns the address of the liquidity bridge contract where the user needs to execute the “depositPegout” function (this can be done with the SDK as well).

```js
flyover.useProvider(provider)
const quotes = await flyover.getPegoutQuotes(quoteRequest)
const acceptedQuote = await flyover.acceptPegoutQuote(quotes[0])
const txHash = await flyover.depositPegout(quotes[0], acceptedQuote.signature, FlyoverUtils.getQuoteTotal(quotes[0]))
```

:::tip[Tip]

For peg outs, deposits (rBTC) can be made directly from the SDK, using a connected [wallet](/dev-tools/wallets/).
:::

## API Reference

The API reference provides comprehensive documentation of all Flyover SDK functions and functionalities with detailed explanations and code examples. See the Flyover SDK documentation.

:::danger[Troubleshooting]

Encountering difficulties with the SDK setup, LPS configuration, or specific Flyover issues? Join the [Rootstock Discord community](http://discord.gg/rootstock) for expert support and assistance. Our dedicated team is ready to help you resolve any problems you may encounter.

:::