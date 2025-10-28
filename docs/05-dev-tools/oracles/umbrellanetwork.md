---
sidebar_position: 2
sidebar_label: Umbrella Network
title: Umbrella Network
description: "Umbrella Network provides decentralized and scalable oracles designed for high-performance blockchain applications." 
tags: [Umbrella Network, developer tools, rsk, rootstock, ethereum, dApps, smart contracts, testnet, Oracles]
---

Umbrella Network provides decentralized and scalable oracles designed for high-performance blockchain applications. 

The platform combines a decentralized architecture with seamless integration options to deliver reliable data feeds. It is compatible with 12 major blockchains, including Rootstock, Ethereum, BNB Chain, ensuring extensive support for various blockchain projects.

## Requirements
[foundry](https://dev.rootstock.io/dev-tools/dev-environments/foundry/)


## Umbrella Network Architecture
Umbrella Network is made up of validator nodes that fetch off-chain data and prove that the data is valid and unchanged.<br></br>
Nodes stake a certain amount of UMB token to act as collateral in case of a malicious actor.<br></br>
Many independent validator nodes pull high quality data from defined APIs and submit it offchain to Umbrella's layer-2 network.<br></br>
Several validator nodes are then elected as leaders, which means they are in charge of agreeing on the final value (consensus) of the data to be submitted to the various supported blockchains.<br></br>
Once consensus has been reached, a cryptographic proof is added to the data to prevent tampering.<br></br>
The data is then broadcast to supported networks and updated in the appropriate smart contracts.<br></br>
Usually, data from high quality sources has minimal to no deviation. A big difference in one oracle's value from the rest of the values indicates a faulty or malicious validator which then gets their stake slashed.<br></br>


## Read data from Umbrella Network smart contracts using Foundry
There are several smart contracts involved when reading data from Umbrella Network, which we will briefly describe and use:
- Umbrella Registry
- UmbrellaFeeds
- Reader contracts

To read data directly, only the first two are used.<br></br>
In some cases, however, you might want to use another contract as a proxy to read the same data, for which you need to deploy another contract to do that (reader contract).


The actual data is found in the `Umbrella Feeds` smart contract. However, you must first get the address from the `Umbrella Registry` contract.

:::info[Info]
It is recommended to run the commands below on mainnet because
- We are only reading from the contracts, no gas will be used unless you are deploying your own [reader contract](#reader-contracts).
- Most price feeds are not available on testnet.
:::


### Umbrella Registry
This is a smart contract that contains the addresses of other related smart contracts.
We can interact with it using `cast`.<br></br>

Get the registry contract address for your chosen blockchain [here](https://umbrella-network.github.io/technical-documentation/umbrella-network/docs/umb-token-contracts.html#contract-registry)<br></br>
Open your terminal and run the following command with the appropriate inputs:
```bash
cast interface --chain <CHAIN_ID> <CONTRACT_ADDRESS>
```

This generates an interface file from the contract's ABI, allowing us to look through the available functions and parameters available like below.

```solidity
mash@debby:~/Desktop/oracle$ cast interface --chain 30 0x4A28406ECE8fFd7A91789738a5ac15DAc44bFa1b
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface Registry {
    error ArraysDataDoNotMatch();
    error NameNotRegistered();

    event LogRegistered(address indexed destination, bytes32 name);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    function atomicUpdate(address _newContract) external;
    function getAddress(bytes32 _bytes) external view returns (address);
    function getAddressByString(string memory _name) external view returns (address);
    function importAddresses(bytes32[] memory _names, address[] memory _destinations) external;
    function importContracts(address[] memory _destinations) external;
    function owner() external view returns (address);
    function registry(bytes32) external view returns (address);
    function renounceOwnership() external;
    function requireAndGetAddress(bytes32 name) external view returns (address);
    function stringToBytes32(string memory _string) external pure returns (bytes32 result);
    function transferOwnership(address newOwner) external;
}
```

The `getAddress` function is used to get the address of a specific contract based on the associated key.
In this case, the key to be used is `"UmbrellaFeeds"`.<br></br>
Call this function with `cast`.<br></br>
You will also need the appropriate Rootstock RPC url. Feel free to use testnet or mainnet, reading from the contract does not cost gas.

```bash
cast call <REGISTRY_CONTRACT_ADDRESS> "getAddress(bytes32)(address)" $(cast --format-bytes32-string "UmbrellaFeeds") --rpc-url <RPC_URL>
```

The output is the address of the `UmbrellaFeeds` smart contract in the next section.
```bash
mash@debby:~$ cast call 0x4A28406ECE8fFd7A91789738a5ac15DAc44bFa1b "getAddress(bytes32)(address)" $(cast --format-bytes32-string "UmbrellaFeeds") --rpc-url https://public-node.rsk.co

0xDc823570a5673E4D386242249EAfA086c436AB9c
```


### UmbrellaFeeds
This contract contains the actual data to be used in the dApp such as the price of RIF to USD.<br></br>
Check [here](https://umbrella-network.github.io/technical-documentation/umbrella-network/docs/price-feeds.html#mainnets) for the list of available price feeds on Rootstock.<br></br>
Pick a random one from the list. For this example I will pick `USDRIF-rUSDT`.<br></br>
Get the interface of the contract with `cast` and look at the functions available.
```bash
cast interface --chain <CHAIN_ID> <CONTRACT_ADDRESS>
```

```solidity
mash@debby:~$ cast interface --chain 30 0xDc823570a5673E4D386242249EAfA086c436AB9c
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

library IUmbrellaFeeds {
    struct PriceData {
        uint8 data;
        uint24 heartbeat;
        uint32 timestamp;
        uint128 price;
    }

    struct Signature {
        uint8 v;
        bytes32 r;
        bytes32 s;
    }
}

interface UmbrellaFeeds {
    error ArraysDataDoNotMatch();
    error ContractInUse();
    error ContractNotInitialised();
    error ECDSAInvalidSignatureS();
    error ECDSAInvalidSignatureV();
    error FeedNotExist();
    error InvalidRequiredSignatures();
    error InvalidSigner();
    error NotEnoughSignatures();
    error OldData();
    error SignaturesOutOfOrder();

    function DECIMALS() external view returns (uint8);
    function DEPLOYED_AT() external view returns (uint256);
    function ETH_PREFIX() external view returns (bytes memory);
    function NAME() external view returns (string memory);
    function REGISTRY() external view returns (address);
    function REQUIRED_SIGNATURES() external view returns (uint16);
    function STAKING_BANK() external view returns (address);
    function destroy(string memory _name) external;
    function getChainId() external view returns (uint256 id);
    function getManyPriceData(bytes32[] memory _keys) external view returns (IUmbrellaFeeds.PriceData[] memory data);
    function getManyPriceDataRaw(bytes32[] memory _keys) external view returns (IUmbrellaFeeds.PriceData[] memory data);
    function getName() external pure returns (bytes32);
    function getPrice(bytes32 _key) external view returns (uint128 price);
    function getPriceData(bytes32 _key) external view returns (IUmbrellaFeeds.PriceData memory data);
    function getPriceDataByName(string memory _name) external view returns (IUmbrellaFeeds.PriceData memory data);
    function getPriceTimestamp(bytes32 _key) external view returns (uint128 price, uint32 timestamp);
    function getPriceTimestampHeartbeat(bytes32 _key)
        external
        view
        returns (uint128 price, uint32 timestamp, uint24 heartbeat);
    function hashData(bytes32[] memory _priceKeys, IUmbrellaFeeds.PriceData[] memory _priceDatas)
        external
        view
        returns (bytes32);
    function prices(bytes32 _key) external view returns (IUmbrellaFeeds.PriceData memory data);
    function recoverSigner(bytes32 _hash, uint8 _v, bytes32 _r, bytes32 _s) external pure returns (address);
    function update(
        bytes32[] memory _priceKeys,
        IUmbrellaFeeds.PriceData[] memory _priceDatas,
        IUmbrellaFeeds.Signature[] memory _signatures
    ) external;
    function verifySignatures(bytes32 _hash, IUmbrellaFeeds.Signature[] memory _signatures) external view;
}
```

Note the struct `PriceData` above. That is the format of the expected value.
```solidity
struct PriceData {
   uint8 data;
   uint24 heartbeat;
   uint32 timestamp;
   uint128 price;
}
```


Now we can use the `getPriceDataByName` method to get the desired currency pair on the terminal with `cast`.
```bash
cast call <CONTRACT_ADDRESS> "getPriceDataByName(string) returns (uint8,uint24,uint32,uint128)" "USDRIF-rUSDT" --rpc-url <ROOTSTOCK_RPC_URL>
```

Extract the price from the output (the fourth variable in the struct).

```bash
mash@debby:~$ cast call 0xDc823570a5673E4D386242249EAfA086c436AB9c "getPriceDataByName(string) returns (uint8,uint24,uint32,uint128)" "USDRIF-rUSDT" --rpc-url https://public-node.rsk.co

0
86400 [8.64e4]
1756676285 [1.756e9]
98785892 [9.878e7] //price
```

Finally, read the number of decimals from the contract with this function `function DECIMALS() external view returns (uint8);`
```bash
cast call <CONTRACT_ADDRESS> "DECIMALS() returns (uint8)" --rpc-url <ROOTSTOCK_RPC_URL>
```

```bash
mash@debby:~$ cast call 0xDc823570a5673E4D386242249EAfA086c436AB9c "DECIMALS() returns (uint8)" --rpc-url https://public-node.rsk.co

8
```

The pair `USDRIF-rUSDT` therefore has the value `98785892/10^8` = `0.98785892` (0.98785892 USDRIF for every rUSDT)


### Reader Contracts
A reader contract is a smart contract designed to read from another contract, usually abstracting away a few steps such as converting the data to a more suitable format.


Go to the [registry contract's](#umbrella-registry) `getAddress` function and pass in `"UmbrellaFeedsReaderFactory"` as the parameter.

```bash
cast call <REGISTRY_CONTRACT_ADDRESS> "getAddress(bytes32)(address)" $(cast --format-bytes32-string "UmbrellaFeedsReaderFactory") --rpc-url <ROOTSTOCK_RPC_URL>
```

The output is the address of the `ReaderFactory` contract. 

```bash
mash@debby:~$ cast call 0x4A28406ECE8fFd7A91789738a5ac15DAc44bFa1b "getAddress(bytes32)(address)" $(cast --format-bytes32-string "UmbrellaFeedsReaderFactory") --rpc-url https://public-node.rsk.co

0xD12EbD0892BC812218688Dcd90DD6FE160aE092A
```

Get the interface of the factory contract to look at the available functions
```bash
cast interface --chain <ROOTSTOCK_CHAIN_ID> <READER_FACTORY_CONTRACT_ADDRESS>
```

```solidity
mash@debby:~$ cast interface --chain 30 0xD12EbD0892BC812218688Dcd90DD6FE160aE092A

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface UmbrellaFeedsReaderFactory {
    error EmptyAddress();

    event NewUmbrellaFeedsReader(address indexed umbrellaFeedsReader, string feedName);

    function REGISTRY() external view returns (address);
    function deploy(string memory _feedName) external returns (address reader);
    function deployed(string memory _feedName) external view returns (address);
    function getName() external pure returns (bytes32);
    function hash(string memory _feedName) external pure returns (bytes32);
    function readers(bytes32) external view returns (address);
}
```

The `deploy` function creates a new reader contract associated with a specific price pair.<br></br>
`deployed` gives the address of an already deployed reader contract for the provided currency pair.

```bash
cast call <READER_FACTORY_CONTRACT_ADDRESS> "deployed(string) returns (address)" <CURRENCY_PAIR> --rpc-url <ROOTSTOCK_RPC_URL>
```

A zero address indicates no reader contract is present for RIF-rUSDT. In this case, you can deploy your own reader using instructions on the Umbrella docs [here](https://umbrella-network.github.io/technical-documentation/umbrella-network/docs/integration-details.html#via-reader).

```bash
mash@debby:~$ cast call 0xD12EbD0892BC812218688Dcd90DD6FE160aE092A "deployed(string) returns (address)" "RIF-rUSDT" --rpc-url https://public-node.rsk.co

0x0000000000000000000000000000000000000000
```

Any other valid address as the output is the contract we need.
```bash
mash@debby:~$ cast call 0xD12EbD0892BC812218688Dcd90DD6FE160aE092A "deployed(string) returns (address)" "SOV-WRBTC" --rpc-url https://public-node.rsk.co

0xD19C320012060fbF9A91E86456941D965bB51C90
```
<br></br>
Check the interface of the reader contract
```solidity
mash@debby:~$ cast interface --chain 30 0xD19C320012060fbF9A91E86456941D965bB51C90
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

library IUmbrellaFeeds {
    struct PriceData {
        uint8 data;
        uint24 heartbeat;
        uint32 timestamp;
        uint128 price;
    }
}

interface UmbrellaFeedsReader {
    error EmptyAddress();
    error FeedNotExist();

    function KEY() external view returns (bytes32);
    function REGISTRY() external view returns (address);
    function UMBRELLA_FEEDS() external view returns (address);
    function decimals() external view returns (uint8);
    function description() external view returns (string memory);
    function getPriceData() external view returns (IUmbrellaFeeds.PriceData memory priceData);
    function getPriceDataRaw() external view returns (IUmbrellaFeeds.PriceData memory priceData);
    function latestRoundData() external view returns (uint80, int256 answer, uint256, uint256 updatedAt, uint80);
}
```

Use `decimals()` to get the number of decimals to go with the output
```bash
cast call <READER_ADDRESS> "decimals() returns (uint8)" --rpc-url <ROOTSTOCK_RPC_URL>
```

```bash
mash@debby:~$ cast call 0xD19C320012060fbF9A91E86456941D965bB51C90 "decimals() returns (uint8)" --rpc-url https://public-node.rsk.co

8
```

Use `getPriceData()` to get the resulting price struct
```bash
cast call <READER_CONTRACT_ADDRESS> "getPriceData() returns (uint8,uint24,uint32,uint128)" --rpc-url <ROOTSTOCK_RPC_URL>

```

```bash
mash@debby:~$ cast call 0xD19C320012060fbF9A91E86456941D965bB51C90 "getPriceData() returns (uint8,uint24,uint32,uint128)" --rpc-url https://public-node.rsk.co

0
86400 [8.64e4]
1756916582 [1.756e9]
891641407696 [8.916e11] //price
```


## Read from a React frontend with viem
Create a react app with the following command
```bash
yarn create vite
```

```bash
mash@debby:~/Desktop$ yarn create vite

yarn create v1.22.22
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Installed "create-vite@8.0.2" with binaries:
      - create-vite
      - cva
[##] 2/2│
◇  Project name:
│  umb-demo
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  TypeScript
│
◇  Use rolldown-vite (Experimental)?:
│  No
│
◇  Install with yarn and start now?
│  Yes
│
◇  Scaffolding project in /home/mash/Desktop/umb-demo...
│
◇  Installing dependencies with yarn...
yarn install v1.22.22
info No lockfile found.
[1/4] Resolving packages...
[2/4] Fetching packages...
info There appears to be trouble with your network connection. Retrying...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
Done in 294.56s.
│
◇  Starting dev server...
yarn run v1.22.22
$ vite

  VITE v7.1.12  ready in 193 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Enter the newly created folder, go to `src/App.tsx` and delete most of the starter content

```typescript
function App() {

  return (
    <>
      <h1>Umbrella Network Price Feeds</h1>
    </>
  )
}

export default App
```

Install `viem`, this will be used to interact with the smart contracts from the frontend.
```bash
yarn add viem
```

Check the currency pairs available on Rootstock [here](https://umbrella-network.github.io/technical-documentation/umbrella-network/docs/price-feeds.html#mainnets).
These will be passed as options to the component of the app used to switch between available currencies.<br></br>

Get the ABIs of the smart contracts which we will interact with (Registry contract, UmbrellaFeeds contract) on a supported block explorer of your choice such as [Blockscout](https://dev.rootstock.io/dev-tools/explorers/blockscout/).<br></br>
A minimal ABI has been provided for the example.

```typescript
import { createPublicClient, http } from 'viem'
import { rootstock } from 'viem/chains'

const ROOTSTOCK_RPC_URL = 'https://public-node.rsk.co'
const RSK_MAINNET_REGISTRY = '0x4A28406ECE8fFd7A91789738a5ac15DAc44bFa1b'

const REGISTRY_ABI = [
  {
    inputs: [{ name: '_name', type: 'bytes32' }],
    name: 'getAddress',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
]

const UMBRELLA_FEEDS_ABI = [
  {
    inputs: [{ name: '_name', type: 'string' }],
    name: 'getPriceDataByName',
    outputs: [
      {
        components: [
          { name: 'data', type: 'uint8' },
          { name: 'heartbeat', type: 'uint24' },
          { name: 'timestamp', type: 'uint32' },
          { name: 'price', type: 'uint128' },
        ],
        name: 'data',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const PRICE_FEEDS = [
  {
    name: 'WRBTC-rUSDT',
    decimals: 8,
    deviation: '0.5%',
    heartbeat: '1 day',
  },
  {
    name: 'BITP-WRBTC',
    decimals: 8,
    deviation: '0.5%',
    heartbeat: '1 day',
  },
  {
    name: 'SOV-WRBTC',
    decimals: 18,
    deviation: '0.5%',
    heartbeat: '1 day',
  },
  {
    name: 'RIF-rUSDT',
    decimals: 8,
    deviation: '0.5%',
    heartbeat: '1 day',
  },
  {
    name: 'USDRIF-rUSDT',
    decimals: 8,
    deviation: '0.5%',
    heartbeat: '1 day',
  },
  {
    name: 'DOC-rUSDT',
    decimals: 8,
    deviation: '0.5%',
    heartbeat: '1 day',
  },
  {
    name: 'rUSDT-DOC',
    decimals: 8,
    deviation: '0.5%',
    heartbeat: '1 day',
  },
  {
    name: 'RIFPro-USD',
    decimals: 8,
    deviation: '0.5%',
    heartbeat: '1 day',
  },
]

const client = createPublicClient({
  chain: rootstock,
  transport: http(ROOTSTOCK_RPC_URL),
})

function App() {

  return (
    <>
      <h1>Umbrella Network Price Feeds</h1>
    </>
  )
}

export default App
```

Use the various functions provided by viem to interact with the contracts.<br></br>
Create the dropdown select for the currency pairs and a button to fetch the specific pair.<br></br>
Below is the complete component with some utility functions that you can paste and run.<br></br>

```typescript
import { createPublicClient, http, pad, stringToHex } from 'viem'
import { rootstock } from 'viem/chains'
import { useState } from 'react'

const ROOTSTOCK_RPC_URL = 'https://public-node.rsk.co'
const RSK_MAINNET_REGISTRY = '0x4A28406ECE8fFd7A91789738a5ac15DAc44bFa1b'

const REGISTRY_ABI = [
  {
    inputs: [{ name: '_name', type: 'bytes32' }],
    name: 'getAddress',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
]

const UMBRELLA_FEEDS_ABI = [
  {
    inputs: [{ name: '_name', type: 'string' }],
    name: 'getPriceDataByName',
    outputs: [
      {
        components: [
          { name: 'data', type: 'uint8' },
          { name: 'heartbeat', type: 'uint24' },
          { name: 'timestamp', type: 'uint32' },
          { name: 'price', type: 'uint128' },
        ],
        name: 'data',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const PRICE_FEEDS = [
  {
    name: 'WRBTC-rUSDT',
    decimals: 8,
    deviation: '0.5%',
    heartbeat: '1 day',
  },
  {
    name: 'BITP-WRBTC',
    decimals: 8,
    deviation: '0.5%',
    heartbeat: '1 day',
  },
  {
    name: 'SOV-WRBTC',
    decimals: 18,
    deviation: '0.5%',
    heartbeat: '1 day',
  },
  {
    name: 'RIF-rUSDT',
    decimals: 8,
    deviation: '0.5%',
    heartbeat: '1 day',
  },
  {
    name: 'USDRIF-rUSDT',
    decimals: 8,
    deviation: '0.5%',
    heartbeat: '1 day',
  },
  {
    name: 'DOC-rUSDT',
    decimals: 8,
    deviation: '0.5%',
    heartbeat: '1 day',
  },
  {
    name: 'rUSDT-DOC',
    decimals: 8,
    deviation: '0.5%',
    heartbeat: '1 day',
  },
  {
    name: 'RIFPro-USD',
    decimals: 8,
    deviation: '0.5%',
    heartbeat: '1 day',
  },
]

const client = createPublicClient({
  chain: rootstock,
  transport: http(ROOTSTOCK_RPC_URL),
})

const formatPrice = (price: bigint): string => {
  const decimals = 8
  const divisor = BigInt(10 ** decimals)
  const whole = price / divisor
  const remainder = price % divisor
  const decimal = remainder.toString().padStart(decimals, '0')
  return `${whole}.${decimal}`
}

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleString()
}

const formatHeartbeat = (heartbeat: number): string => {
  const hours = Math.floor(heartbeat / 3600)
  if (hours >= 24) {
    const days = Math.floor(hours / 24)
    return `${days} day${days > 1 ? 's' : ''}`
  }
  return `${hours} hour${hours > 1 ? 's' : ''}`
}

function App() {
  const [selectedFeed, setSelectedFeed] = useState(PRICE_FEEDS[0])
  const [priceData, setPriceData] = useState<{
    price: string
    timestamp: string
    heartbeat: string
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPriceData = async () => {    
    setLoading(true)
    setError(null)

    try {
      const umbrellaFeedsAddress = (await client.readContract({
        address: RSK_MAINNET_REGISTRY as `0x${string}`,
        abi: REGISTRY_ABI,
        functionName: 'getAddress',
        args: [pad(stringToHex('UmbrellaFeeds'), { size: 32, dir: 'right' })],
      })) as `0x${string}`

      const result = (await client.readContract({
        address: umbrellaFeedsAddress,
        abi: UMBRELLA_FEEDS_ABI,
        functionName: 'getPriceDataByName',
        args: [selectedFeed.name],
      })) as readonly [number, number, number, bigint]      

      const {_, heartbeat, timestamp, price} = result as any

      setPriceData({
        price: formatPrice(price),
        timestamp: formatTimestamp(timestamp),
        heartbeat: formatHeartbeat(heartbeat),
      })
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch price data'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <section>
        <header>
          <h1>Umbrella Network Price Feeds</h1>
          <p>Rootstock Mainnet</p>
        </header>

        <article>
          <fieldset>
            <legend>Select Price Feed</legend>
            <select
              id="feed-select"
              value={selectedFeed.name}
              onChange={(e) => {
                const feed = PRICE_FEEDS.find((f) => f.name === e.target.value)
                if (feed) {
                  setSelectedFeed(feed)
                  setPriceData(null)
                  setError(null)
                }
              }}
            >
              {PRICE_FEEDS.map((feed) => (
                <option key={feed.name} value={feed.name}>
                  {feed.name}
                </option>
              ))}
            </select>
          </fieldset>

          <section>
            <dl>
              <dt>Display Decimals:</dt>
              <dd>{selectedFeed.decimals}</dd>
              <dt>Deviation Threshold:</dt>
              <dd>{selectedFeed.deviation}</dd>
              <dt>Expected Heartbeat:</dt>
              <dd>{selectedFeed.heartbeat}</dd>
            </dl>
          </section>

          <button
            onClick={fetchPriceData}
            disabled={loading}
          >
            {loading ? (
              <>
                <span>⟳</span>
                Fetching...
              </>
            ) : (
              'Fetch Price Data'
            )}
          </button>
        </article>

        {error && (
          <aside>
            <p><strong>Error:</strong> {error}</p>
          </aside>
        )}

        {priceData && !error && (
          <article>
            <header>
              <h2>Current Price</h2>
              <p><strong>{priceData.price}</strong></p>
            </header>

            <section>
              <dl>
                <dt>Last Updated</dt>
                <dd>{priceData.timestamp}</dd>
              </dl>
            </section>
          </article>
        )}
      </section>
    </main>
  )
}

export default App
```

<div align="center"><img width="100%" src="/img/tools/oracles/umbrella/demo_dapp.png" alt="Demo dApp with Umbrella Network"/></div>


## **Developer Resources**
- [Smart Contract Addresses](https://umbrella-network.github.io/technical-documentation/umbrella-network/docs/umb-token-contracts.html#contract-registry)
- [Integration Guides](https://umbrella-network.github.io/technical-documentation/umbrella-network/docs/getting-started-1.html)
- [API Reference](https://umbrella-network.readme.io/reference/get_projects)

For more information and advanced features, visit the <Shield title="Umbrella Network documentation" tooltip="This is the official Umbrella Network documentation" href="https://umbrella-network.readme.io/" color="orange" />