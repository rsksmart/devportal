---
sidebar_label: Sample dApp Integration
sidebar_position: 400
title: Sample dApp RNS Integration 
description: RNS Integration Guide into Frontend
tags: [rns, integrate, integration guide, rif, frontend]
---
import Card from '/src/components/Card'

This guide helps to quickly get started with setting up your environment to use RNS Javascript SDK and also how to use the sample dApp to test how RNS SDK works.

## 1. Project Setup

Before we begin, ensure you have a React app set up. If not, create one with:

```bash
npx create-react-app rns-dApp
cd rns-dApp
```

Then install the required dependencies:

```bash
npm install web3 @rsksmart/rns
```

## 2. Import the Required Modules

Open your main component file and import the following:

```js
import { useEffect, useState } from "react";
import Web3 from "web3";
import RNS from "@rsksmart/rns";
import { ChainId } from "@rsksmart/rns/types";
```

## 3. Initialize RNS

Iniatialize the RNS using the [RNS Registry Contract Address](https://github.com/rnsdomains/rns-registry) and the testnet node RPC URL (`https://public-node.testnet.rsk.co`)

setting up all the states need for domain lookups, availability checks, and ownership info.

```js
useEffect(() => {
  const init = async () => {
    try {
      const web3 = new Web3("https://public-node.testnet.rsk.co");

      const rnsInstance = new RNS(web3, {
        networkId: 31, // Testnet (use 30 for Mainnet)
        contractAddresses: {
          registry: "0x7d284aaac6e925aad802a53c0c69efe3764597b8", //RNS Registry Contract Address
        },
      });

      await rnsInstance.compose();
      setRns(rnsInstance);
      console.log("RNS initialized successfully");
    } catch (err) {
      console.error("RNS initialization failed:", err);
      setResult("Failed to initialize RNS: " + err.message);
    }
  };

  init();
}, []);
```

What this does:

- Connects to the RSK Testnet.

- Initializes the RNS SDK.

- Loads the internal contracts needed for lookups.

## 4. Domain Lookup Functions

Now, let’s add some functions to handle different RNS operations.

### a. Resolve an RSK Address

Looks up the RSK address linked to a given RNS domain.

```js
const handleResolve = async () => {
  if (!rns) return;
  try {
    setLoading(true);
    const addr = await rns.addr(domain);
    setResult(addr || "No RSK address found for this domain");
  } catch (err) {
    setResult("Error: " + err.message);
  } finally {
    setLoading(false);
  }
};
```

### b. Resolve a Bitcoin Address

If the RNS domain also has a Bitcoin address, this will fetch it.

```js
const handleBTCResolve = async () => {
  if (!rns) return;
  try {
    setLoading(true);
    const btcAddr = await rns.addr(domain, ChainId.BITCOIN);
    setResult(btcAddr || "No Bitcoin address found for this domain");
  } catch (err) {
    setResult("Error: " + err.message);
  } finally {
    setLoading(false);
  }
};
```

## 5. Check Domain and Subdomain Availability

You can check if a domain or subdomain is available before registering it.

```js
// check domain avaliablity
const handleCheckAvailable = async () => {
  if (!rns) return;
  try {
    setLoading(true);
    const available = await rns.available(domain);
    setResult(
      available ? "Domain is available" : "Domain is already registered"
    );
  } catch (err) {
    setResult("Error: " + err.message);
  } finally {
    setLoading(false);
  }
};

//check subdomain availability
const handleCheckSubdomain = async () => {
  if (!rns) return;
  try {
    setLoading(true);
    const available = await rns.subdomains.available(domain, subdomain);
    setResult(
      available ? "Subdomain is available" : "Subdomain is taken"
    );
  } catch (err) {
    setResult("Error: " + err.message);
  } finally {
    setLoading(false);
  }
};
```

## 6. Reverse Lookup (Get Domain from Address)

You can also do the reverse—find the RNS name linked to an RSK address.

```js
const handleReverse = async () => {
  if (!rns) return;
  try {
    setLoading(true);
    const name = await rns.reverse(address);
    setResult(name || "No reverse record found for this address");
  } catch (err) {
    setResult("Error: " + err.message);
  } finally {
    setLoading(false);
  }
};
```

## 7. Get the Owner of a Domain

This fetches the wallet address that owns a particular RNS domain.

```js
const handleGetOwner = async () => {
  if (!rns) return;
  try {
    setLoading(true);
    await rns.compose();
    const registry = rns.contracts.registry;
    const namehash = await rns.contenthash(domain);
    const domainOwner = await registry.methods.owner(namehash).call();
    setOwner(domainOwner || "No owner found");
    setResult("Owner address retrieved successfully");
  } catch (err) {
    setResult("Error getting owner: " + err.message);
  } finally {
    setLoading(false);
  }
};
```

## 8. User Interface

Here’s the JSX that creates a simple UI for all the functions you’ve added.
It includes input fields, buttons, and result displays.

```js
return (
  <div style={styles.container}>
    <div style={styles.card}>
      <h1 style={styles.heading}>Rootstock Name Service (RNS)</h1>
     
      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter domain (e.g. testing.rsk)"
        style={styles.input}
      />

      <div style={styles.buttonGroup}>
        <button onClick={handleResolve} style={styles.button} disabled={loading}>
          Resolve RSK Address
        </button>
        <button onClick={handleBTCResolve} style={styles.buttonAlt} disabled={loading}>
          Resolve BTC Address
        </button>
      </div>

      <button onClick={handleCheckAvailable} style={styles.buttonWide} disabled={loading}>
        Check Domain Availability
      </button>

      <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
        <input
          type="text"
          value={subdomain}
          onChange={(e) => setSubdomain(e.target.value)}
          placeholder="Subdomain (e.g. example)"
          style={{ ...styles.input, flex: 1 }}
        />
        <button onClick={handleCheckSubdomain} style={styles.buttonAlt} disabled={loading}>
          Check Subdomain
        </button>
      </div>

      <button onClick={handleGetOwner} style={styles.buttonWide} disabled={loading}>
        Get Domain Owner
      </button>

      {owner && (
        <div style={styles.resultBox}>
          <strong>Owner:</strong> {owner}
        </div>
      )}

      <hr style={{ margin: "20px 0" }} />

      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address for reverse lookup"
        style={styles.input}
      />
      <button onClick={handleReverse} style={styles.buttonWide} disabled={loading}>
        Reverse Lookup
      </button>

      <div style={styles.resultBox}>{loading ? "Loading..." : result}</div>
    </div>
  </div>
);
```

<Card
  index={1}
  title="RNS Javascript SDK"
  description="You can check out other methods here"
  color="orange"
  icon="rocket"
  link={{ href: "/developers/integrate/rns/js/", title: "Open docs" }}
/>
