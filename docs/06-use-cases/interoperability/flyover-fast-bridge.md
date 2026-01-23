---
sidebar_position: 3
sidebar_label: Flyover Fast Bridge
title: Implementing Fast Bridging with the Flyover SDK
description: "Reduce bridge wait times to under 20 minutes by integrating the Flyover liquidity protocol." 
tags: [interoperability, flyover, bridge, liquidity, sdk]
---

# Flyover Fast Bridge Integration

The Flyover protocol significantly reduces the wait times associated with the native PowPeg. By utilizing a network of Liquidity Providers (LPs) who "front" the assets, users can complete a peg-in or peg-out in roughly 2 Bitcoin blocks (~20 minutes), compared to the standard 100 blocks.



## Prerequisites

* **Flyover SDK:** `npm install @rsksmart/flyover-sdk`
* **Liquidity Provider (LP):** You must select an active LP from the Rootstock directory.
* **rBTC Balance:** For peg-outs, the user must have sufficient rBTC to cover the amount and LP fees.

## Getting Started

### 1. Initialize the SDK
Connect the SDK to the Rootstock network and initialize the provider list.

```javascript
import { Flyover } from '@rsksmart/flyover-sdk';

const flyover = new Flyover({
  network: 'Mainnet',
  rpcUrl: '[https://public-node.rsk.co](https://public-node.rsk.co)'
});
```

### 2. Requesting a Quote
Before bridging, the user must accept a "Quote" from an LP that defines the fee and the expected transfer time.

```js
// Fetch available LPs and request a peg-in quote
const providers = await flyover.getLiquidityProviders();
flyover.useLiquidityProvider(providers[0]);

const quoteRequest = {
  amountToBridge: parseUnits("0.01", 8),
  rskDestinationAddress: "0x..."
};

const quotes = await flyover.getQuotes(quoteRequest);
const acceptedQuote = await flyover.acceptQuote(quotes[0]);
```

### 3. Completing the Transfer
Once a quote is accepted, the SDK provides the Bitcoin deposit address. As soon as the LP detects the Bitcoin transaction (usually after 1-2 blocks), they release the rBTC on Rootstock.

## Troubleshooting
- Quote Expiration: Quotes are time-sensitive. If the Bitcoin transaction is not broadcast within the LP's specified window, the quote may expire, and funds will be processed via the slower native PowPeg.

- Low LP Liquidity: If no quotes are returned, the LPs may have reached their maximum capacity. Check back later or use the native Union/PowPeg bridge.

## Related Use Cases or Resources
- Flyover SDK Github

- Rootstock Explorer (Bridge Tracker)

- Smart Wallet Integration