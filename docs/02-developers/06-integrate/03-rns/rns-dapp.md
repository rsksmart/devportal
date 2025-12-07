---
sidebar_label: Sample dApp Integration
sidebar_position: 400
title: Sample dApp RNS Integration
description: RNS Integration Guide into Frontend
tags: [rns, integrate, integration guide, rif, frontend]
---

import Card from '/src/components/Card'

This guide walks you through building a React dApp that integrates with the **Rootstock Name Service (RNS)** using ethers.js. You'll create a functional application that allows users to resolve domain names to addresses, check domain availability, perform reverse lookups, and more etc.

By the end of this guide, you'll have a dApp that demonstrates core RNS operations and serves as a foundation for building more complex blockchain applications on Rootstock.

## Prerequisites

Before starting, ensure you have the following:

- [Node.js](https://nodejs.org/en/download) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) installed  
- A wallet preferably MetaMask configured for **Rootstock Mainnet** or **Testnet**  
- Basic understanding of Solidity and Web3.js or ethers.js
- [Rootstock Testnet Faucet](https://faucet.rootstock.io/)

:::note
All the code snippets shown in this guide will be added inside your `App.tsx` file.
:::

### 1. Project Setup

Before you begin, ensure you have a React app set up. If not, create one with:

```bash
npx create-react-app rns-dapp
cd rns-dapp
```

Then install the required dependencies:

```bash
npm install ethers @ethersproject/providers @ethersproject/contracts @ethersproject/constants @ethersproject/hash typescript
```

### 2. Import the Required Modules

Open your `App.tsx` file and import the following modules:

```js
import { useState, useCallback, useMemo } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { AddressZero } from "@ethersproject/constants";
import { namehash } from "@ethersproject/hash";
```

### 3. Initialize RNS

Next, set up RNS using the RNS Registry Contract Address and the [RSK Testnet RPC URL](https://public-node.testnet.rsk.co).

Add the following code inside `App.jsx`:

```js
// Rootstock Testnet RPC
const ROOTSTOCK_RPC_NODE = "https://public-node.testnet.rsk.co";

// RNS registry (testnet)
const RNS_REGISTRY_ADDRESS = "0x7d284aaac6e925aad802a53c0c69efe3764597b8";

// Bitcoin chain ID for multichain resolver
const BITCOIN_CHAIN_ID = 0;

// ABIs
const RNS_REGISTRY_ABI = [
  "function resolver(bytes32 node) view returns (address)",
  "function owner(bytes32 node) view returns (address)",
];

const RNS_ADDR_RESOLVER_ABI = [
  "function addr(bytes32 node) view returns (address)",
  "function addr(bytes32 node, uint coinType) view returns (bytes)",
];

const RNS_NAME_RESOLVER_ABI = [
  "function name(bytes32 node) view returns (string)",
];

const provider = new JsonRpcProvider(ROOTSTOCK_RPC_NODE);

const registry = new Contract(
  RNS_REGISTRY_ADDRESS,
  RNS_REGISTRY_ABI,
  provider
);
```

What this does:
- Connects to the Rootstock Testnet
- Initializes the RNS Registry contract
- Sets up the provider for contract interactions

### 4. Utility Functions

Add a utility function to strip the hex prefix from addresses:

```js
const stripHexPrefix = (hex: string): string => hex.slice(2);
```

### 5. Core RNS Functions

Add the core functions that handle different RNS operations.

#### a. Resolve a Rootstock Address

Looks up the RSK address linked to a given RNS domain:

```js
const resolveRnsName = async (name: string): Promise<string | null> => {
  try {
    const nameHash = namehash(name);
    const resolverAddress = await registry.resolver(nameHash);

    if (resolverAddress === AddressZero) {
      return null;
    }

    const addrResolverContract = new Contract(
      resolverAddress,
      RNS_ADDR_RESOLVER_ABI,
      provider
    );

    // Use the functions property to call overloaded functions
    const [address] = await addrResolverContract.functions["addr(bytes32)"](nameHash);

    if (!address || address === AddressZero) {
      return null;
    }

    return address.toLowerCase();
  } catch (e) {
    console.error("resolveRnsName error", e);
    return null;
  }
};
```

:::tip Important Note on Overloaded Functions
When working with overloaded contract functions in ethers.js, you must use the `functions` property with the full function signature (e.g., `functions["addr(bytes32)"]`). This is necessary because the RNS resolver contract has multiple `addr` functions with different parameters.
:::

#### b. Resolve a Bitcoin Address

Fetches the Bitcoin address if the domain has one:

```js
const resolveBitcoinAddress = async (name: string): Promise<string | null> => {
  try {
    const hash = namehash(name);
    const resolver = await registry.resolver(hash);

    if (resolver === AddressZero) return null;

    const resolverContract = new Contract(
      resolver,
      RNS_ADDR_RESOLVER_ABI,
      provider
    );

    const [btcBytes] = await resolverContract.functions[
      "addr(bytes32,uint256)"
    ](hash, BITCOIN_CHAIN_ID);

    if (!btcBytes || btcBytes === "0x") return null;

    return btcBytes;
  } catch (e) {
    console.error("resolveBitcoinAddress error", e);
    return null;
  }
};
```

#### c. Reverse Lookup (Address to Name)

Looks up the RNS name associated with an address:

```js
const lookupAddress = async (address: string): Promise<string | null> => {
  try {
    const reverseHash = namehash(
      `${stripHexPrefix(address)}.addr.reverse`
    );

    const resolver = await registry.resolver(reverseHash);

    if (resolver === AddressZero) return null;

    const resolverContract = new Contract(
      resolver,
      RNS_NAME_RESOLVER_ABI,
      provider
    );

    const name = await resolverContract.name(reverseHash);
    return name || null;
  } catch (e) {
    console.error("lookupAddress error", e);
    return null;
  }
};
```

#### d. Get Domain Owner

Retrieves the owner address of a domain:

```js
const getDomainOwner = async (domain: string): Promise<string | null> => {
  try {
    const hash = namehash(domain);
    const owner = await registry.owner(hash);

    if (!owner || owner === AddressZero) return null;

    return owner.toLowerCase();
  } catch (e) {
    console.error("owner error", e);
    return null;
  }
};
```

#### e. Check Domain Availability

Checks if a domain is available for registration:

```js
const checkDomainAvailability = async (domain: string): Promise<boolean> => {
  try {
    const hash = namehash(domain);
    const owner = await registry.owner(hash);
    return owner === AddressZero;
  } catch (e) {
    console.error("availability error", e);
    return false;
  }
};
```

#### f. Check Subdomain Availability

Checks if a subdomain is available:

```js
const checkSubdomainAvailability = async (
  domain: string,
  subdomain: string
): Promise<boolean> => {
  return checkDomainAvailability(`${subdomain}.${domain}`);
};
```

### 6. Custom RNS Hook

Create a custom hook to encapsulate all RNS functionality:

```js
const useRns = () => {
  const getAddressByRns = useCallback(async (name: string) => {
    return await resolveRnsName(name);
  }, []);

  const getBitcoinAddressByRns = useCallback(async (name: string) => {
    return await resolveBitcoinAddress(name);
  }, []);

  const getRnsName = useCallback(async (address: string) => {
    return await lookupAddress(address);
  }, []);

  const getOwner = useCallback(async (domain: string) => {
    return await getDomainOwner(domain);
  }, []);

  const checkAvailability = useCallback(async (domain: string) => {
    return await checkDomainAvailability(domain);
  }, []);

  const checkSubdomain = useCallback(
    async (domain: string, subdomain: string) => {
      return await checkSubdomainAvailability(domain, subdomain);
    },
    []
  );

  return useMemo(
    () => ({
      getAddressByRns,
      getBitcoinAddressByRns,
      getRnsName,
      getOwner,
      checkAvailability,
      checkSubdomain,
    }),
    [
      getAddressByRns,
      getBitcoinAddressByRns,
      getRnsName,
      getOwner,
      checkAvailability,
      checkSubdomain,
    ]
  );
};
```

### 7. Main Component

Create the main component with UI and event handlers inside the same `App.jsx`:

```js
export default function App() {
  const {
    getAddressByRns,
    getBitcoinAddressByRns,
    getRnsName,
    getOwner,
    checkAvailability,
    checkSubdomain,
  } = useRns();

  const [domain, setDomain] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [address, setAddress] = useState("");
  const [result, setResult] = useState("");
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(false);

  const wrap = async (fn: () => Promise<void>) => {
    setLoading(true);
    setResult("");
    setOwner("");
    try {
      await fn();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Rootstock Name Service Lookup</h1>

        <input
          style={styles.input}
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain like example.rsk"
        />

        <div style={styles.buttonGroup}>
          <button
            style={styles.button}
            disabled={loading}
            onClick={() =>
              wrap(async () => {
                const addr = await getAddressByRns(domain);
                setResult(addr || "No RSK address found");
              })
            }
          >
            Resolve RSK
          </button>

          <button
            style={styles.buttonAlt}
            disabled={loading}
            onClick={() =>
              wrap(async () => {
                const btc = await getBitcoinAddressByRns(domain);
                setResult(btc || "No Bitcoin address found");
              })
            }
          >
            Resolve BTC
          </button>
        </div>

        <button
          style={styles.buttonWide}
          disabled={loading}
          onClick={() =>
            wrap(async () => {
              const available = await checkAvailability(domain);
              setResult(
                available ? "✅ Domain is available" : "❌ Domain is taken"
              );
            })
          }
        >
          Check Availability
        </button>

        <div style={{ display: "flex", gap: "8px" }}>
          <input
            style={{ ...styles.input, flex: 1 }}
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
            placeholder="Enter subdomain"
          />
          <button
            style={styles.buttonAlt}
            disabled={loading}
            onClick={() =>
              wrap(async () => {
                const available = await checkSubdomain(domain, subdomain);
                setResult(
                  available ? "✅ Subdomain is available" : "❌ Subdomain is taken"
                );
              })
            }
          >
            Check Subdomain
          </button>
        </div>

        <button
          style={styles.buttonWide}
          disabled={loading}
          onClick={() =>
            wrap(async () => {
              const ownerAddr = await getOwner(domain);
              if (ownerAddr) {
                setOwner(ownerAddr);
                setResult("Owner found");
              } else {
                setResult("No owner found");
              }
            })
          }
        >
          Get Owner
        </button>

        {owner && (
          <div style={styles.ownerBox}>
            <strong>Owner:</strong> {owner}
          </div>
        )}

        <hr style={styles.divider} />

        <input
          style={styles.input}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Reverse lookup (address)"
        />

        <button
          style={styles.buttonWide}
          disabled={loading}
          onClick={() =>
            wrap(async () => {
              const name = await getRnsName(address);
              setResult(name || "No reverse entry found");
            })
          }
        >
          Reverse Lookup
        </button>

        <div style={styles.resultBox}>
          {loading ? "Loading..." : result}
        </div>
      </div>
    </div>
  );
}
```

### 8. Add Styles

Add the styling for your component(`App.jsx`):

```js
const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f6fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "10px",
    maxWidth: "520px",
    width: "100%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "22px",
  },
  input: {
    padding: "10px",
    width: "100%",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    boxSizing: "border-box",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  button: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#388e3c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  buttonAlt: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  buttonWide: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#5e35b1",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    marginTop: "10px",
    cursor: "pointer",
  },
  ownerBox: {
    padding: "10px",
    backgroundColor: "#e8f5e9",
    borderRadius: "6px",
    border: "1px solid #c8e6c9",
    margin: "10px",
    wordBreak: "break-all",
    fontSize: "14px",
  },
  divider: {
    margin: "20px 0",
    border: "none",
    borderTop: "1px solid #e0e0e0",
  },
  resultBox: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "6px",
    wordBreak: "break-all",
    fontSize: "14px",
  },
};
```

<details>
    <summary>Full `App.jsx` code</summary>
    ```jsx
    import { useState, useEffect } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { namehash } from "@ethersproject/hash";
import { AddressZero } from "@ethersproject/constants";

const RPC = "https://public-node.testnet.rsk.co";

// Testnet registry
const RNS_REGISTRY = "0x7d284aaac6e925aad802a53c0c69efe3764597b8";

// Core ABI
const REGISTRY_ABI = [
  "function owner(bytes32 node) view returns (address)",
  "function resolver(bytes32 node) view returns (address)",
];

const ADDR_RESOLVER_ABI = [
  "function addr(bytes32 node) view returns (address)",
  "function addr(bytes32 node, uint256 coinType) view returns (address)",
];

const NAME_RESOLVER_ABI = ["function name(bytes32 node) view returns (string)"];

const PUBLIC_RESOLVER_SUBDOMAIN_ABI = [
  "function available(string name, string label) view returns (bool)",
];

const stripHex = (hex: string) => (hex.startsWith("0x") ? hex.slice(2) : hex);

export default function RnsLookupApp() {
  const [provider, setProvider] = useState<any>(null);
  const [registry, setRegistry] = useState<any>(null);

  const [domain, setDomain] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [address, setAddress] = useState("");

  const [result, setResult] = useState("");
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const p = new JsonRpcProvider(RPC);
      const r = new Contract(RNS_REGISTRY, REGISTRY_ABI, p);
      setProvider(p);
      setRegistry(r);
    };
    load();
  }, []);

  const getResolver = async (node: string) => {
    const resolver = await registry.resolver(node);
    if (!resolver || resolver === AddressZero) return null;
    return new Contract(resolver, ADDR_RESOLVER_ABI, provider);
  };

  const resolveRSK = async () => {
    if (!registry) return;
    try {
      setLoading(true);
      const node = namehash(domain);
      const resolver = await getResolver(node);
      if (!resolver) {
        setResult("no resolver set");
        return;
      }
      const addr = await resolver.addr(node);
      setResult(addr || "no address for this name");
    } catch (err: any) {
      setResult(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resolveBTC = async () => {
    if (!registry) return;
    try {
      setLoading(true);
      const node = namehash(domain);
      const resolver = await getResolver(node);
      if (!resolver) {
        setResult("no resolver set");
        return;
      }
      const btc = await resolver.addr(node, 0); // coinType=0 for BTC
      setResult(btc || "no BTC address found");
    } catch (err: any) {
      setResult(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkAvailable = async () => {
    if (!registry) return;
    try {
      setLoading(true);
      const owner = await registry.owner(namehash(domain));
      setResult(
        owner === AddressZero ? "domain is available" : "domain is taken"
      );
    } catch (err: any) {
      setResult(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkSubdomain = async () => {
    try {
      setLoading(true);
      const labelResolver = new Contract(
        RNS_REGISTRY,
        PUBLIC_RESOLVER_SUBDOMAIN_ABI,
        provider
      );
      const available = await labelResolver.available(domain, subdomain);
      setResult(available ? "subdomain available" : "subdomain taken");
    } catch (err: any) {
      setResult(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reverseLookup = async () => {
    if (!registry) return;

    try {
      setLoading(true);
      const node = namehash(`${stripHex(address)}.addr.reverse`);
      const resolver = await registry.resolver(node);
      if (resolver === AddressZero) {
        setResult("no reverse record found");
        return;
      }

      const resolverContract = new Contract(
        resolver,
        NAME_RESOLVER_ABI,
        provider
      );
      const name = await resolverContract.name(node);
      setResult(name || "no reverse record found");
    } catch (err: any) {
      setResult(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getOwner = async () => {
    if (!registry) return;
    try {
      setLoading(true);
      const node = namehash(domain);
      const address = await registry.owner(node);
      setOwner(address);
      setResult("owner retrieved");
    } catch (err: any) {
      setResult(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Rootstock Name Service Lookup</h1>

        <input
          style={styles.input}
          type="text"
          placeholder="example.rsk"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />

        <div style={styles.buttonGroup}>
          <button style={styles.button} disabled={loading} onClick={resolveRSK}>
            Resolve RSK
          </button>
          <button
            style={styles.buttonAlt}
            disabled={loading}
            onClick={resolveBTC}
          >
            Resolve BTC
          </button>
        </div>

        <button
          style={styles.buttonWide}
          disabled={loading}
          onClick={checkAvailable}
        >
          Check Domain Availability
        </button>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <input
            style={{ ...styles.input, flex: 1 }}
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
            placeholder="subdomain label"
          />
          <button
            style={styles.buttonAlt}
            disabled={loading}
            onClick={checkSubdomain}
          >
            Check Subdomain
          </button>
        </div>

        <button style={styles.buttonWide} disabled={loading} onClick={getOwner}>
          Get Domain Owner
        </button>

        {owner && (
          <div style={styles.resultBox}>
            <strong>Owner:</strong> {owner}
          </div>
        )}

        <hr style={{ margin: "20px 0" }} />

        <input
          style={styles.input}
          type="text"
          placeholder="0x123..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          style={styles.buttonWide}
          disabled={loading}
          onClick={reverseLookup}
        >
          Reverse Lookup
        </button>

        <div style={styles.resultBox}>{loading ? "loading..." : result}</div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f6fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    maxWidth: 520,
    width: "100%",
    background: "#fff",
    padding: 25,
    borderRadius: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: "22px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  buttonGroup: {
    display: "flex",
    gap: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    background: "#388e3c",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  buttonAlt: {
    flex: 1,
    background: "#1976d2",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  buttonWide: {
    width: "100%",
    padding: "10px",
    marginTop: 10,
    background: "#5e35b1",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  resultBox: {
    marginTop: 15,
    padding: 10,
    background: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: 6,
    wordBreak: "break-all",
  },
};
```
</details>

### 9. Start Local Development Server

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

In this guide, you've learned how to integrate RNS into your React app using ethers.js. You now understand how to:

1. Set up RNS with ethers.js providers and contracts
2. Handle overloaded contract functions properly
3. Create reusable functions for RNS operations
4. Build a custom React hook for RNS functionality
5. Implement a complete UI for RNS lookups and checks

This pattern can be easily extended or modified for your specific use case.

## Resources

- [RNS Smart Contract Integration](./smart-contract)
- [RNS Javascript SDK](./js-sdk)
- [RNS Registry Testnet Contract Address](https://explorer.testnet.rootstock.io/address/0x7d284aaac6e925aad802a53c0c69efe3764597b8?tab=contract)
- [RNS Registry Mainnet Contract Address](https://explorer.rootstock.io/address/0xcb868aeabd31e2b66f74e9a55cf064abb31a4ad5?tab=contract)