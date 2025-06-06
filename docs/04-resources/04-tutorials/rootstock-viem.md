---
sidebar_label:  Interacting with Rootstock using Viem
sidebar_position: 2
title:  Interacting with Rootstock using Viem
description: 'Viem offers a minimalist TypeScript alternative to Ethers.js and Web3.js to interact with deployed contracts when building dApps on the frontend. This guide will teach developers how to use Viem when building for Rootstock.'
tags: [rsk, rootstock, tutorials, resources, frontend, smart contracts, dapps, viem]
---


[Viem](https://viem.sh/) offers a minimalist, lightweight, and more efficient Typescript interface alternative to [Ethers.js](https://docs.ethers.org/v5/) and [Web3.js](https://web3js.readthedocs.io/en/v1.10.0/) for interacting with Ethereum nodes. It maintains a bundle size of 35KB compared to Ethers and Web3.js, which are over 300KB and 600KB, respectively. Viem also offers more granular control over APIs in contrast to Ethers.js, which abstracts APIs for more functionalities. 

This tutorial will teach you how to use Viem to interact with your contracts on Rootstock.


## Installation and Setup

In this guide, you will learn how to interact with an existing lending contract on the Rootstock Explorer, [rLending RBTC](https://explorer.testnet.rootstock.io/address/0xc19f0882bf318c9f8767c7d520018888e878417b).

Use the following command to install the Viem npm package:

```bash
npm install viem
```

For more installation options, you can check out the official [installation guide](https://viem.sh/docs/installation).

## Using the Public Client

You would need to set up your Client in Viem, which would have been your `Provider` in a typical Ethers.js project.

```ts
import { createPublicClient, http } from 'viem'
import { rootstockTestnet } from 'viem/chains';

const RPC_URL = process.env.RPC_URL;
 
const publicClient = createPublicClient({ 
  chain: rootstockTestnet, 
  transport: http(RPC_URL), 
}) 
```

**In the above code:** 
- You need to define a `Chain` and `Transport` for Rootstock-specific values. 
- Chain values for the Rootstock chain could be `rootstock` for the mainnet or `rootstockTestnet` for the Testnet
- It is recommended to set your `RPC_URL` as an environmental variable whose value can be obtained from the Rootstock [RPC API dashboard](https://dev.rootstock.io/developers/rpc-api/rootstock/setup/).

```
RPC_URL='https://rpc.testnet.rootstock.io/<API_KEY>'
CONTRACT_ADDRESS='0x...' // You can also add the contract address as an environment variable 
```

**NB:** If you are working on a Next.js project, environment variables must be prepended with `NEXT_PUBLIC_` as `NEXT_PUBLIC_RPC_URL` for the RPC URL variable.


To access a deployed contract with its ABI using the Viem's `getContract` method. 

```ts
import { profileContractAbi } from './contractABI';

const lendingContract = getContract({
	abi: profileContractAbi, 
	address: getAddress(CONTRACT_ADDRESS), 
	client: publicClient 
})
```

Then, read the borrow rate:

```ts
export async function fetchBorrowRatePerBlock(): Promise<bigint> {
	const result = await publicClient.readContract({
		address: getAddress(CONTRACT_ADDRESS),
		abi: profileContractAbi,
		functionName: 'borrowRatePerBlock',
	})
	return result as bigint;
}
```

To use some other read contract functions like `fetchTotalSupply` and `fetchTotalBorrows`:

```ts
export async function fetchTotalSupply(): Promise<bigint> {
	return await lendingContract.read.totalSupply() as bigint;
}

export async function fetchTotalBorrows(): Promise<bigint> {
	return await lendingContract.read.totalBorrows() as bigint;
}

export async function fetchSymbol(): Promise<string> {
	return await lendingContract.read.symbol() as string;
}
```

### Using the Wallet Client

You can also use the wallet client to access the user account and public address using the `createWalletClient`.

```ts
import { createWalletClient } from 'viem';

if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') {
  throw new Error('MetaMask not detected');
}

export const walletClient = createWalletClient({
	chain: rootstockTestnet,
	transport: custom(window.ethereum!)
})

const [walletAddresses] = await walletClient.getAddresses()
```

You have to explicitly make TypeScript aware that `window.ethereum` exists. It is not part of the standard `Window` library but is injected by browser wallets like MetaMask. Create a file called `global.d.ts` in the utils folder and add the following code to it.

```ts
interface Window {
  ethereum?: any
}
```

Then, you can use the `writeContract` method to make state-changing function calls like the `borrow` function to borrow tokens from the lending protocol:

```ts
export async function borrow(amount: bigint): Promise<`0x${string}`> {
	if (!walletClient) throw new Error("Wallet client not available.");
	const account = await getConnectedAccount();

	const txHash = await walletClient.writeContract({
		address: CONTRACT_ADDRESS,
		abi: profileContractAbi,
		functionName: 'borrow',
		args: [amount],
		account,
	});

	return txHash;
}
```

### Simulating Transactions

It helps to do a dry run of your state-changing functions first to catch errors and see if something fails before the real transaction. You can use the `simulateContract()` feature, which does not spend gas. Performing a simulation prevents sending a transaction that could cost more gas fees. It also helps you to detect and return human-readable revert reasons if provided in the smart contract via `require()` or `revert()`. The following code snippet shows how to simulate a transaction before performing the actual transaction.

```ts
// Simulate transaction
const { request } = await publicClient.simulateContract({
    address: getAddress(CONTRACT_ADDRESS),
    abi: profileContractAbi,
    functionName: 'borrow',
    args: [amount],
    account,
});

// Send real transaction only if simulation succeeded
const txHash = await walletClient.writeContract(request);

return txHash;
```

## Resources:
- [Full working demo code](https://github.com/entuziaz/rsk-viem-demo) 
- [Viem documentation](https://viem.sh/docs/getting-started)
