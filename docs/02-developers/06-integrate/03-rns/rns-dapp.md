---
sidebar_label: Sample dApp Integration
sidebar_position: 400
title: Sample dApp RNS Integration 
description: RNS Integration Guide into Frontend
tags: [rns, integrate, integration guide, rif, frontend]
---
import Card from '/src/components/Card'

This guide helps you quickly set up your environment to use the RNS JavaScript SDK and test it with a simple sample dApp.

:::note
All the code snippets shown in this guide will be added inside your `App.jsx` file.
:::
### 1. Project Setup

Before you begin, ensure you have a React app set up. If not, create one with:

```bash
npx create-react-app rns-dapp
cd rns-dapp
```

Then install the required dependencies:

```bash
npm install web3 @rsksmart/rns
```

### 2. Import the Required Modules

Open your `App.jsx` file and import the following modules:

```js
import { useEffect, useState } from "react";
import Web3 from "web3";
import RNS from "@rsksmart/rns";
import { ChainId } from "@rsksmart/rns/types";
```

### 3. Initialize RNS

Next, set up the RNS SDK using the RNS Registry Contract Address and the [RSK Testnet RPC URL](https://public-node.testnet.rsk.co). 

To do add the following code inside `App.jsx`: 

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

### 4. Domain Lookup Functions

Still inside `App.jsx`, add the functions that handle different RNS operations.

#### a. Resolve a Rootstock Address

To looks up the RSK address linked to a given RNS domain:

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

#### b. Resolve a Bitcoin Address

To fetche the Bitcoin address if the domain has one:

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

#### c. Check Domain and Subdomain Availability

To check if a domain or subdomain is available before registering it:

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

#### d. Get content hash of a Domain

To get the content hash associated with a domain name:

```js
const handleGetContentHash = async () => {
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

### 5. User Interface

Finally, to reflect all these functions, add the following code inside `App.jsx`

```js
return (
  <div>
    <div>
      <h1>Rootstock Name Service (RNS)</h1>
     
      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter domain (e.g. testing.rsk)"
        style={styles.input}
      />

      <div>
        <button onClick={handleResolve} disabled={loading}>
          Resolve RSK Address
        </button>
        <button onClick={handleBTCResolve} disabled={loading}>
          Resolve BTC Address
        </button>
      </div>

      <button onClick={handleCheckAvailable} disabled={loading}>
        Check Domain Availability
      </button>

      <div>
        <input
          type="text"
          value={subdomain}
          onChange={(e) => setSubdomain(e.target.value)}
          placeholder="Subdomain (e.g. example)"
        />
        <button onClick={handleCheckSubdomain} disabled={loading}>
          Check Subdomain
        </button>
      </div>

      <button onClick={handleGetContentHash} disabled={loading}>
        Get Content hash
      </button>
      <div>{loading ? "Loading..." : result}</div>
    </div>
  </div>
);
```

#### a. Full code

    Here is the full code:

    ```jsx

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
    const handleGetContentHash = async () => {
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
    return (
      <div>
        <div>
          <h1>Rootstock Name Service (RNS)</h1>
        
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain (e.g. testing.rsk)"
            style={styles.input}
          />

          <div>
            <button onClick={handleResolve} disabled={loading}>
              Resolve RSK Address
            </button>
            <button onClick={handleBTCResolve} disabled={loading}>
              Resolve BTC Address
            </button>
          </div>

          <button onClick={handleCheckAvailable} disabled={loading}>
            Check Domain Availability
          </button>

          <div>
            <input
              type="text"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value)}
              placeholder="Subdomain (e.g. example)"
            />
            <button onClick={handleCheckSubdomain} disabled={loading}>
              Check Subdomain
            </button>
          </div>

          <button onClick={handleGetContentHash} disabled={loading}>
            Get Content hash
          </button>
          <div>{loading ? "Loading..." : result}</div>
        </div>
      </div>
    );
    ```

### 6. Start local developement server

To preview this application, open your terminal and run the following command: 

  ```bash
  npm run start
  ```

  This is how your UI should look:

  ![RNS dApp](/img/rns/rns-dapp.png)

  It should also function properly, as shown in the demo below:

  <video width="100%" height="400" controls>
    <source src="/video/rns-dapp-demo.mp4" type="video/mp4" />
  </video>

## Conclusion

In this guide, you've learnt how to integrate RNS JavaScript SDK into your react app. This guide also shows you how to use the available functions such as: 

  1. `rns.addr`
  2. `rns.available`
  3. `rns.subdomains.available`
  4. `rns.contenthash`


<Card
  index={1}
  title="RNS Smart Contract Integration"
  description="Learn how to integrate RNS contract into your smart contract"
  color="orange"
  icon="rocket"
  link={{ href: "/developers/integrate/rns/smart-contract", title: "Open docs" }}
/>
