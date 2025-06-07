---
sidebar_label:  Interacting with Rootstock using Viem
sidebar_position: 2
title:  Interacting with Rootstock using Viem
description: 'Viem offers a minimalist TypeScript alternative to Ethers.js and Web3.js to interact with deployed contracts when building dApps on the frontend. This guide will teach developers how to use Viem when building for Rootstock.'
tags: [rsk, rootstock, tutorials, resources, frontend, smart contracts, dapps, viem]
---


[Viem](https://viem.sh/) offers a minimalist, lightweight, and more efficient Typescript interface alternative to [Ethers.js](https://docs.ethers.org/v5/) and [Web3.js](https://web3js.readthedocs.io/en/v1.10.0/) for interacting with Ethereum nodes. It maintains a bundle size of 35KB compared to Ethers and Web3.js, which are over 300KB and 600KB, respectively. Smaller bundle size implies faster page loads and better performance on mobile. Viem also offers more granular control over APIs in contrast to Ethers.js, which abstracts APIs for more functionalities. 

This tutorial will teach you how to use Viem to interact with your contracts on Rootstock.


## Installation and Setup

In this guide, you will learn how to interact with an existing lending contract on the Rootstock Explorer, [rLending RBTC](https://explorer.testnet.rootstock.io/address/0xc19f0882bf318c9f8767c7d520018888e878417b). The full code of the working demo is available on [GitHub](https://github.com/entuziaz/rsk-viem-demo).

You can use the following command to install the Viem npm package:

```bash
npm install viem
```

For more installation options, you can check out the official [installation guide](https://viem.sh/docs/installation).

## Using the Public Client

You need to set up your [Client](https://viem.sh/docs/clients/intro#clients) in Viem, which would have been your [Provider](https://docs.ethers.org/v5/api/providers/provider/) in a typical Ethers.js project. A Client allows you to access Viem actions for interacting with the blockchain. One type of Client is the [Public Client](https://viem.sh/docs/clients/public) which provides access to public actions like the `getBlockNumber` and `getBalance`. The following snippet indicates how you would use the Public Client in an existing project.

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

You would get a response like the following in `bigint` data type:

```bash
67627655645n
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

In the above code snippet, a transaction was simulated with the smart contract Abi which you have to provide in your project. Then, a real transaction is allowed to happen after a successful simulation. We used another type of client in the snippet, the Wallet Client. The Wallet Client allows you to use wallet actions like signing a message or sending a transaction.

The simulated transaction looks like the following:

```json
{
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "borrowAmount",
          "type": "uint256"
        }
      ],
      "name": "borrow",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "address": "0xc19F0882bf318C9f8767C7d520018888E878417b",
  "args": [
    "100000000000000000"
  ],
  "functionName": "borrow",
  "account": {
    "address": "0xfcdF314daed7E8c39E8591870e20A8c25D138a5C",
    "type": "json-rpc"
  }
}
```

Then, the returned transaction hash is in the following form:

```bash
0x61c7f5cc54dd2c9cfa10c10eb50f212c40ba62d78e63c683b9e9d0db20d9630b
```


## Resources:
- [Full working demo code](https://github.com/entuziaz/rsk-viem-demo) 
- [Viem documentation](https://viem.sh/docs/getting-started)
