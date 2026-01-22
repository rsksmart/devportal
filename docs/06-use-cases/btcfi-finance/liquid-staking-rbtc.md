---
sidebar_position: 4
sidebar_label: Liquid Staking (LST)
title: Integrating Liquid Staking (st-rBTC) into your dApp
description: "Learn how to allow users to earn Bitcoin yield while keeping their assets liquid." 
tags: [btcfi, lst, staking, yield]
---

Liquid Staking Tokens (LSTs) allow users to participate in the security and yield of the Rootstock network without locking their capital. By integrating `st-rBTC`, your users can earn rewards while still being able to use their tokens in other DeFi protocols.


## Prerequisites

* **Viem or Ethers.js:** Integrated into your frontend project.
* **Web3 Provider:** A connected user wallet (MetaMask, WalletConnect, etc.).
* **Token Address:** The `st-rBTC` contract address for the relevant network.

## Getting Started

### 1. Fetching the Staking Rate
To show users how much yield they have earned, you must query the exchange rate from the staking contract.

```javascript
import { createPublicClient, http, parseAbi } from 'viem';
import { rootstockTestnet } from 'viem/chains';

const client = createPublicClient({ chain: rootstockTestnet, transport: http() });

async function getExchangeRate() {
  const data = await client.readContract({
    address: 'ST_RBTC_ADDRESS',
    abi: parseAbi(['function getPooledRbtcByShares(uint256) view returns (uint256)']),
    functionName: 'getPooledRbtcByShares',
    args: [BigInt(1e18)] // Calculate value of 1 share
  });
  console.log(`Current Rate: ${data} rBTC per share`);
}
```

### 2. Executing a Stake
When a user stakes rBTC, they receive st-rBTC in return.

```js
const tx = await signer.sendTransaction({
  to: 'ST_RBTC_CONTRACT_ADDRESS',
  value: parseEther('0.01'), // Amount of rBTC to stake
});
```

## Troubleshooting
- Unstaking Latency: Direct unstaking via the protocol may involve a cool-down period. For instant exits, integrate an AMM like Oku to allow users to swap st-rBTC back to rBTC.

- Oracle Lag: When displaying the dollar value of staked assets, ensure your oracle (e.g., Chainlink) supports the specific LST price feed.

## Related Use Cases or Resources

- Build BTCFi dApps Overview

- Swapping Assets on Oku

- Recursive Yield Strategies