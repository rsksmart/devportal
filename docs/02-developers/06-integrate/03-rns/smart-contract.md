---
sidebar_label: RNS Smart Contract 
sidebar_position: 300
title: RIF Name Service (RNS) Smart Contract Integration
description: RNS Smart Contract Integration
tags: [rns, integrate, integration guide, rif, sdk]
---

This guide covers interacting with the RNS smart contract directly using ethers.js instead of using the [JS SDK](/developers/integrate/rns/js-sdk). This involves interacting with the Registry and Resolver contracts to resolve domains, check ownership, and manage records on-chain.

## Installation

To install ethers.js:

```bash
npm install ethers
```

:::note
For operations that modify RNS records (like setting addresses or resolvers), you need a connected wallet with write permissions. Read operations only need a provider.
:::

## Setup

### Create a Provider

First, connect to the Rootstock network:

```javascript
import { ethers } from 'ethers';

// Mainnet
const provider = new ethers.JsonRpcProvider('https://public-node.rsk.co');

// Testnet  
const provider = new ethers.JsonRpcProvider('https://public-node.testnet.rsk.co');
```

### Initialize Contracts

Set up the Registry and Resolver contracts:

```javascript
const REGISTRY_ADDRESS = '0xcb868aeabd31e2b66f74e9a55cf064abb31a4ad5';

const REGISTRY_ABI = [
  'function resolver(bytes32 node) external view returns (address)',
  'function owner(bytes32 node) external view returns (address)',
];

const RESOLVER_ABI = [
  'function addr(bytes32 node) external view returns (address)',
  'function addr(bytes32 node, uint coinType) external view returns (bytes)',
  'function name(bytes32 node) external view returns (string memory)',
];

const registry = new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, provider);
```

## Resolving a Domain

The `addr()` method gets the blockchain address linked to an RNS domain. Similar to the SDK's `addr()` method, but you interact directly with the contract.

```javascript
async function resolveDomain(domainName) {
  const node = ethers.namehash(domainName);
  
  // Get resolver address from registry
  const resolverAddress = await registry.resolver(node);

  if (resolverAddress === ethers.ZeroAddress) {
    throw new Error('Domain does not exist');
  }

  // Create resolver contract instance
  const resolver = new ethers.Contract(resolverAddress, RESOLVER_ABI, provider);

  // Get address (coinType 60 for RSK)
  const address = await resolver.addr(node);

  return address;
}

// Usage
const address = await resolveDomain('myname.rsk');
console.log(address);
```

## Resolving Coin Types

You can resolve addresses for different blockchains by specifying the coin type. For example, resolve a Bitcoin address or Rootstock address from the same domain.

```javascript
async function resolveCoinAddress(domainName, coinType) {
  const node = ethers.namehash(domainName);
  const resolverAddress = await registry.resolver(node);

  if (resolverAddress === ethers.ZeroAddress) {
    throw new Error('No resolver');
  }

  const resolver = new ethers.Contract(resolverAddress, RESOLVER_ABI, provider);
  const address = await resolver.addr(node, coinType);

  return address;
}

// Resolve Bitcoin address
const btc = await resolveCoinAddress('myname.rsk', 0);

// Resolve RSK address
const rsk = await resolveCoinAddress('myname.rsk', 60);
```

Common coin types:
- `0` - Bitcoin
- `60` - Ethereum/RSK

## Reverse Resolution

The `reverse()` method finds the RNS domain that belongs to an address. This is useful when you want to display a domain name instead of a raw address.

```javascript
async function reverseResolveDomain(address) {
  const normalizedAddress = ethers.getAddress(address);
  const reverseNode = ethers.namehash(
    `${normalizedAddress.slice(2).toLowerCase()}.addr.reverse`
  );

  const resolverAddress = await registry.resolver(reverseNode);

  if (resolverAddress === ethers.ZeroAddress) {
    return null;
  }

  const resolver = new ethers.Contract(resolverAddress, RESOLVER_ABI, provider);
  const domainName = await resolver.name(reverseNode);

  return domainName;
}

// Usage
const domain = await reverseResolveDomain('0x1234...5678');
console.log(domain);
```

## Check Domain Owner

Get the owner of a domain:

```javascript
async function getDomainOwner(domainName) {
  const node = ethers.namehash(domainName);
  const owner = await registry.owner(node);

  return owner === ethers.ZeroAddress ? null : owner;
}

const owner = await getDomainOwner('myname.rsk');
console.log(owner);
```

## Check Availability

The `available()` method checks if a domain is free (not yet registered).

```javascript
async function isDomainAvailable(domainName) {
  const node = ethers.namehash(domainName);
  const owner = await registry.owner(node);

  return owner === ethers.ZeroAddress;
}

const available = await isDomainAvailable('coolname.rsk');
console.log(available ? "Available!" : "Already registered.");
```

## Setting Records

To update domain records like the address it points to, you need a connected wallet (signer) with ownership or resolver permissions.

```javascript
async function setDomainAddress(domainName, newAddress, signer) {
  const node = ethers.namehash(domainName);
  const resolverAddress = await registry.resolver(node);

  if (resolverAddress === ethers.ZeroAddress) {
    throw new Error('No resolver set');
  }

  const resolver = new ethers.Contract(
    resolverAddress,
    ['function setAddr(bytes32 node, address addr) external'],
    signer
  );

  const tx = await resolver.setAddr(node, newAddress);
  await tx.wait();

  return tx.hash;
}
```

This is similar to the SDK's `setAddr()` method, but you have direct control over the transaction.

## Setting a Resolver

Define which resolver contract handles lookups for a domain:

```javascript
async function setResolver(domainName, resolverAddress, signer) {
  const node = ethers.namehash(domainName);
  
  const registryWithSigner = registry.connect(signer);
  
  const tx = await registryWithSigner.setResolver(node, resolverAddress);
  await tx.wait();

  return tx.hash;
}
```

## Setting Reverse Resolution

Link your address to a domain so others see your domain instead of your raw address:

```javascript
async function setReverseDomain(domainName, signer) {
  const reverseRegistrarAddress = '0x2573871c4a4d8e801eaa1c5a9a6c4f1a8c0a8b0d';
  
  const reverseRegistrarABI = [
    'function setName(string memory name) external'
  ];

  const reverseRegistrar = new ethers.Contract(
    reverseRegistrarAddress,
    reverseRegistrarABI,
    signer
  );

  const tx = await reverseRegistrar.setName(domainName);
  await tx.wait();

  return tx.hash;
}
```

## Resources

- [RNS Javascript SDK](./js-sdk)
- [RNS Overview](/developers/integrate/rns/)
- [RNS Contract](https://explorer.rootstock.io/address/0xcb868aeabd31e2b66f74e9a55cf064abb31a4ad5?tab=contract)
- [Ethers.js Documentation](https://docs.ethers.org/)
