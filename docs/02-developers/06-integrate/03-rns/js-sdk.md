---
sidebar_label: RNS Javascript SDK
sidebar_position: 300
title: RIF Name Service (RNS) Javascript SDK
description: RNS Javascript SDK
tags: [rns, integrate, integration guide, rif, sdk]
---

The `@rsksmart/rns` package helps you **interact with the Rootstock Name Service (RNS)**. It lets you:

- Check if domains are available
- Resolve domains to addresses
- Set addresses or content hashes
- Manage reverse resolution
- Validate domain names

## Installation

To install package by using the command:

```bash
npm install @rsksmart/rns
```

### The Core Methods

#### 1. `addr(domain, chainId)`

This method gets the blockchain address linked to an RNS domain.

  ```js
  const address = await rns.addr("myname.rsk", 30); // 30 = RSK Mainnet chainId
  console.log(address);
  ```

#### 2. `available(domain)`

This method checks if a domain is free (not yet registered).

```js
const isFree = await rns.available("coolname.rsk");
console.log(isFree ? "Available!" : "Already registered.");
```

#### 3. `contenthash(domain)`

This methods get the **content hash** associated with a domain — often used for decentralized websites (like IPFS or Swarm). For example, You host your dApp on IPFS and want users to access it through `mydapp.rsk`.
This method tells browsers or gateways where to find your site.

```js
const content = await rns.contenthash("mydapp.rsk");
console.log("IPFS content hash:", content);
```

#### 4. `reverse(address)`

This method performs **reverse resolution**, finding the RNS domain that belongs to an address.

```js
const name = await rns.reverse("0x1234abcd...");
console.log("Domain linked to this address:", name);
```

#### 5. `subdomains.available(domain, subdomain)`

This method check ia specific subdomain under an existing RNS domain is available (that is, not yet registered under that parent domain).

```js
rns.subdomains.available("testing.rsk", "example").then(console.log);
```

:::note
The following methods(6-9) change RNS records. A connect wallet function must be provided with permission to modify the records.
:::

#### 6. `setAddr(domain, addr, chainId, options)`

This method sets or updates the blockchain address that a domain points to. For example, you change your wallet address and want your RNS domain (`myname.rsk`) to point to the new address.

```js
await rns.setAddr("myname.rsk", "0xABCD...7890", 30, { from: userAddress });
```

#### 7. `setContenthash(domain, content, options)`

This method associates an IPFS or Swarm hash with your domain. For example, you publish a new version of your DApp on IPFS and update the record so users see the latest version at `mydapp.rsk`.

```js
await rns.setContenthash("mydapp.rsk", "ipfs://Qm123abc...", { from: userAddress });
```

#### 8. `setResolver(domain, resolver, options)`

This method defines which **resolver contract** handles lookups for a domain. for example, you deploy a custom resolver contract for advanced name logic (for example, multi-coin support) and point your domain to it.


```js
await rns.setResolver("myname.rsk", "0xResolverContractAddress", { from: owner });
```

#### 9. `setReverse(name, options)`

This method is used to links your address to a human-readable domain (reverse mapping). For exampl, when others view your wallet address, they’ll see `myname.rsk` instead of `0xabc...`.

```js
await rns.setReverse("myname.rsk", { from: userAddress });
```

#### 10. `utils`

A helper object that contains validation and wallet checks.

| Method                  | Description                        | Example                                  |
| ----------------------- | ---------------------------------- | ---------------------------------------- |
| `hasAccounts()`         | Checks if wallet is connected      | `await rns.utils.hasAccounts()`          |
| `hasMethod()`           | Checks if a contract method exists | `rns.utils.hasMethod(contract, "addr")`  |
| `isValidLabel(label)`   | Validates a subdomain label        | `rns.utils.isValidLabel("wallet")`       |
| `isValidDomain(domain)` | Validates domain structure         | `rns.utils.isValidDomain("example.rsk")` |
| `isValidTld(tld)`       | Validates top-level domain         | `rns.utils.isValidTld("rsk")`            |

#### 11. `currentNetworkId`

This method return the network chain ID currently connected to.

```js
const netId = await rns.currentNetworkId();
console.log("Connected to:", netId);
```
