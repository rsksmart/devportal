---
sidebar_label: RNS Javascript SDK
sidebar_position: 300
title: RIF Name Service (RNS) Javascript SDK
description: RNS Javascript SDK for domain registration, management, and resolution
tags: [rns, integrate, integration guide, rif, sdk]
---

The `@rsksmart/rns-sdk` package helps you **interact with the Rootstock Name Service (RNS)**. It lets you:

- Register .rsk domains
- Check domain and subdomain availability
- Query and set domain ownership
- Resolve domains to addresses
- Manage subdomains
- Work with partner registrars

## Installation

Install the package using npm:

```bash
npm install @rsksmart/rns-sdk ethers
```

## Contract Addresses

You will need these addresses to initialize the SDK:

| Contract | RSK Mainnet | RSK Testnet |
|----------|-------------|-------------|
| RNS Registry | `0xcb868aeabd31e2b66f74e9a55cf064abb31a4ad5` | `0x7d284aaac6e925aad802a53c0c69efe3764597b8` |
| RIF Token | `0x2acc95758f8b5f583470ba265eb685a8f45fc9d5` | `0x19f64674d8a5b4e652319f5e239efd3bc969a1fe` |
| RSK Owner | `0x45d3e4fb311982a06ba52359d44cb4f5980e0ef1` | `0xca0a477e19bac7e0e172ccfd2e3c28a7200bdb71` |
| FIFS Addr Registrar | `0xd9c79ced86ecf49f5e4a973594634c83197c35ab` | `0x90734bd6bf96250a7b262e2bc34284b0d47c1e8d` |
| Partner Registrar | - | `0x8104d97f6d82a7d3afbf45f72118fad51f190c42` |

## SDK Classes

The SDK provides five main classes:

| Class | Purpose |
|-------|---------|
| `RNS` | Domain management (owner, resolver, subdomains) |
| `AddrResolver` | Address resolution |
| `RSKRegistrar` | Standard .rsk domain registration |
| `PartnerRegistrar` | Partner-based domain registration |
| `PartnerConfiguration` | Partner contract configuration |

---

## 1. RNS Class

The `RNS` class handles domain management operations.

### Constructor

```js
import { Signer } from 'ethers'
import { RNS } from '@rsksmart/rns-sdk'

let signer: Signer
const rns = new RNS(registryAddress, signer)
```

### Methods

#### 1. `getOwner(domain)`

Gets the controller/owner of a domain.

```js
const owner = await rns.getOwner('mydomain.rsk')
console.log('Owner:', owner)
```

#### 2. `setOwner(domain, newController)`

Transfers domain ownership to a new controller.

```js
const domain = 'mydomain.rsk'
const newController = '0xb774...d771'

const tx = await rns.setOwner(domain, newController)
await tx.wait()
console.log('Ownership transferred!')
```

#### 3. `resolver(domain)`

Gets the resolver contract address for a domain.

```js
const resolverAddress = await rns.resolver('mydomain.rsk')
console.log('Resolver:', resolverAddress)
```

#### 4. `setResolver(domain, resolverAddress)`

Sets a new resolver contract for the domain.

```js
const domain = 'mydomain.rsk'
const resolverAddr = '0xb774...d771'

const tx = await rns.setResolver(domain, resolverAddr)
await tx.wait()
console.log('Resolver updated!')
```

#### 5. `getSubdomainAvailability(domain, label)`

Checks if a subdomain is available under a parent domain.

```js
const isAvailable = await rns.getSubdomainAvailability('mydomain.rsk', 'blog')
console.log(isAvailable ? 'Subdomain available!' : 'Subdomain taken')
```

#### 6. `setSubdomainOwner(domain, label, ownerAddress)`

Creates a subdomain and assigns ownership.

```js
const domain = 'mydomain.rsk'
const subdomainLabel = 'blog'
const ownerAddress = '0x8c0f...1264'

const tx = await rns.setSubdomainOwner(domain, subdomainLabel, ownerAddress)
await tx.wait()
console.log('Subdomain created: blog.mydomain.rsk')
```

:::note
You must own the parent domain to create subdomains.
:::

---

## 2. AddrResolver Class

The `AddrResolver` class handles address resolution for domains.

### Constructor

```js
import { Signer } from 'ethers'
import { AddrResolver } from '@rsksmart/rns-sdk'

let signer: Signer
const addrResolver = new AddrResolver(registryAddress, signer)
```

### Methods

#### 1. `addr(domain)`

Resolves a domain to its linked address.

```js
const address = await addrResolver.addr('mydomain.rsk')
console.log('Address:', address)
```

#### 2. `setAddr(domain, address)`

Sets or updates the address a domain points to.

```js
const domain = 'mydomain.rsk'
const newAddress = '0xABCD...7890'

const tx = await addrResolver.setAddr(domain, newAddress)
await tx.wait()
console.log('Address updated!')
```

:::note
You must own the domain to set its address.
:::

---

## 3. RSKRegistrar Class

The `RSKRegistrar` class handles standard `.rsk` domain registration using RIF tokens.

### Constructor

```js
import { Signer } from 'ethers'
import { RSKRegistrar } from '@rsksmart/rns-sdk'

let signer: Signer
const rskRegistrar = new RSKRegistrar(
  rskOwnerAddress,
  fifsAddrRegistrarAddress,
  rifTokenAddress,
  signer
)
```

### Methods

#### 1. `available(label)`

Checks if a domain label is available for registration.

```js
const label = 'mynewdomain'
const isAvailable = await rskRegistrar.available(label)
console.log(isAvailable ? 'Available!' : 'Already registered')
```

:::note
Pass only the label without `.rsk` suffix.
:::

#### 2.  `price(label, duration)`

Gets the registration price in RIF tokens.

```js
import { BigNumber } from 'ethers'

const label = 'mynewdomain'
const duration = BigNumber.from('1') // 1 year

const price = await rskRegistrar.price(label, duration)
console.log('Price:', ethers.utils.formatEther(price), 'RIF')
```

#### 3. `commitToRegister(label, ownerAddress)`

Step 1 of registration: Makes a commitment to register a domain.

```js
const label = 'mynewdomain'
const ownerAddress = '0x1234...5678'

const { makeCommitmentTransaction, secret, canReveal } = 
  await rskRegistrar.commitToRegister(label, ownerAddress)

await makeCommitmentTransaction.wait()
console.log('Commitment made! Wait ~1 minute before registering.')

// Save the secret - you'll need it for step 2
```

**Returns:**

| Property | Description |
|----------|-------------|
| `makeCommitmentTransaction` | The commitment transaction object |
| `secret` | Secret needed for registration (save this!) |
| `canReveal()` | Function to check if ready to register |

#### 4. `register(label, owner, secret, duration, price)`

Step 2 of registration: Completes the domain registration.

```js
// Wait for commitment to be ready (at least 1 minute)
const isReady = await canReveal()
if (!isReady) {
  console.log('Please wait, commitment not ready yet')
  return
}

const registerTx = await rskRegistrar.register(
  label,
  ownerAddress,
  secret,        // from commitToRegister()
  duration,
  price
)

await registerTx.wait()
console.log('Domain registered successfully!')
```

### Complete Registration Example

```js
import { BigNumber, ethers } from 'ethers'
import { RSKRegistrar } from '@rsksmart/rns-sdk'

async function registerDomain(label, ownerAddress, signer) {
  const rskRegistrar = new RSKRegistrar(
    rskOwnerAddress,
    fifsAddrRegistrarAddress,
    rifTokenAddress,
    signer
  )

  // Check availability
  const available = await rskRegistrar.available(label)
  if (!available) {
    throw new Error('Domain not available')
  }

  // Get price
  const duration = BigNumber.from('1')
  const price = await rskRegistrar.price(label, duration)
  console.log('Price:', ethers.utils.formatEther(price), 'RIF')

  // Step 1: Commit
  const { makeCommitmentTransaction, secret, canReveal } = 
    await rskRegistrar.commitToRegister(label, ownerAddress)
  await makeCommitmentTransaction.wait()
  console.log('Commitment made!')

  // Wait for commitment to mature (poll canReveal)
  while (!(await canReveal())) {
    console.log('Waiting for commitment...')
    await new Promise(r => setTimeout(r, 10000)) // Wait 10 seconds
  }

  // Step 2: Register
  const registerTx = await rskRegistrar.register(
    label,
    ownerAddress,
    secret,
    duration,
    price
  )
  await registerTx.wait()
  
  console.log(`Successfully registered ${label}.rsk!`)
}
```

---

## 4. PartnerRegistrar Class

The `PartnerRegistrar` class provides partner-based registration with **one-click registration** support.

### Constructor

```js
import { Signer } from 'ethers'
import { PartnerRegistrar } from '@rsksmart/rns-sdk'

let signer: Signer

// Option 1: Use network presets (recommended)
const partnerRegistrar = new PartnerRegistrar(signer, 'testnet')

// Option 2: Custom addresses (for localhost or custom setup)
const partnerRegistrar = new PartnerRegistrar(signer, 'localhost', {
  rskOwnerAddress: '0x...',
  rifTokenAddress: '0x...',
  partnerRegistrarAddress: '0x...',
  partnerRenewerAddress: '0x...',
  partnerAddress: '0x...'
})
```

**Network Options:**

| Value | Description |
|-------|-------------|
| `'mainnet'` | RSK Mainnet (uses default addresses) |
| `'testnet'` | RSK Testnet (uses default addresses) |
| `'localhost'` | Local network (requires custom addresses) |

### Methods

#### 1. `available(label)`

Checks if a domain is available.

```js
const available = await partnerRegistrar.available('mynewdomain')
console.log(available ? 'Available!' : 'Taken')
```

#### 2. `price(label, duration)`

Gets the price with partner pricing applied.

```js
import { BigNumber } from 'ethers'

const duration = BigNumber.from('1')
const price = await partnerRegistrar.price('mynewdomain', duration)
console.log('Partner price:', ethers.utils.formatEther(price), 'RIF')
```

#### 3. `commitAndRegister(label, owner, duration, price)`

**One-click registration** - handles both commit and register in one call.

```js
import { BigNumber } from 'ethers'

const label = 'mynewdomain'
const ownerAddress = '0x1234...5678'
const duration = BigNumber.from('1')
const price = await partnerRegistrar.price(label, duration)

const { commitHash, commitSecret, registerTxHash } = 
  await partnerRegistrar.commitAndRegister(label, ownerAddress, duration, price)

console.log('Domain registered!')
console.log('Commit hash:', commitHash)
console.log('Register TX:', registerTxHash)
```

#### 4. `transfer(label, toAddress)`

Transfers domain ownership to another address.

```js
const label = 'mydomain'
const toAddress = '0xABCD...7890'

const txHash = await partnerRegistrar.transfer(label, toAddress)
console.log('Domain transferred! TX:', txHash)
```

#### 5. `renew(label, duration, price)`

Renews a domain registration.

```js
import { BigNumber } from 'ethers'

const label = 'mydomain'
const duration = BigNumber.from('1')
const price = await partnerRegistrar.price(label, duration)

const txHash = await partnerRegistrar.renew(label, duration, price)
console.log('Domain renewed! TX:', txHash)
```

---

## 5. PartnerConfiguration Class

The `PartnerConfiguration` class queries partner contract settings.

### Constructor

```js
import { Signer } from 'ethers'
import { PartnerConfiguration } from '@rsksmart/rns-sdk'

let signer: Signer
const partnerConfig = new PartnerConfiguration(partnerConfigurationAddress, signer)
```

### Methods

#### 1. `getMinLength()`

Gets the minimum allowed domain label length.

```js
const minLength = await partnerConfig.getMinLength()
console.log('Min length:', minLength.toString())
```

#### 2. `getMaxLength()`

Gets the maximum allowed domain label length.

```js
const maxLength = await partnerConfig.getMaxLength()
console.log('Max length:', maxLength.toString())
```

#### 3. `getMinDuration()`

Gets the minimum registration duration (in years).

```js
const minDuration = await partnerConfig.getMinDuration()
console.log('Min duration:', minDuration.toString(), 'years')
```

#### `getMaxDuration()`

Gets the maximum registration duration (in years).

```js
const maxDuration = await partnerConfig.getMaxDuration()
console.log('Max duration:', maxDuration.toString(), 'years')
```

#### 4.  `getMinCommitmentAge()`

Gets the minimum time (in seconds) before a commitment can be revealed.

```js
const minAge = await partnerConfig.getMinCommitmentAge()
console.log('Min commitment age:', minAge.toString(), 'seconds')
```

#### 5. `getFeePercentage()`

Gets the partner fee percentage.

```js
const fee = await partnerConfig.getFeePercentage()
console.log('Fee percentage:', fee.toString(), '%')
```

#### 6. `getDiscount()`

Gets the partner discount percentage.

```js
const discount = await partnerConfig.getDiscount()
console.log('Discount:', discount.toString(), '%')
```

#### 7. `getPrice(label, duration)`

Gets the price for a domain with partner pricing.

```js
import { BigNumber } from 'ethers'

const price = await partnerConfig.getPrice('mydomain', BigNumber.from('1'))
console.log('Price:', ethers.utils.formatEther(price), 'RIF')
```

#### 8. `validateName(label, duration)`

Validates if a name meets partner requirements. Throws an error if invalid.

```js
import { BigNumber } from 'ethers'

try {
  await partnerConfig.validateName('mydomain', BigNumber.from('1'))
  console.log('Name is valid!')
} catch (error) {
  console.log('Invalid name:', error.message)
}
```

---

## Name Validation

The SDK automatically validates and normalizes domain names:

**Validation Rules:**
- Names can only contain letters (a-z), digits (0-9), and hyphens (-)
- Names must start and end with a letter or digit

**Normalization:**
- All letters are converted to lowercase
- Punycode-encoded internationalized domain names (IDNs) are expanded to Unicode

---

## Troubleshooting

### Browser Environment

The SDK requires `Buffer` to be globally available. Add this to your webpack config:

```js
const webpack = require('webpack')

module.exports = {
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
}
```

Or add this to your app's entry point:

```js
window.Buffer = window.Buffer || require('buffer/').Buffer
```

### React Native

Use the `rn-nodeify` package:

```bash
rn-nodeify --install buffer --hack --yarn && patch-package
```

---

## Additional Resources

- **RNS Resolver Library**: For advanced resolution features (reverse lookup, multi-chain), see [`@rsksmart/rns-resolver.js`](https://github.com/rsksmart/rns-resolver.js)
- **GitHub Repository**: [rsksmart/rns-sdk](https://github.com/rsksmart/rns-sdk)
- **RNS Registry Testnet**: [Explorer](https://explorer.testnet.rootstock.io/address/0x7d284aaac6e925aad802a53c0c69efe3764597b8)
- **RNS Registry Mainnet**: [Explorer](https://explorer.rootstock.io/address/0xcb868aeabd31e2b66f74e9a55cf064abb31a4ad5)
