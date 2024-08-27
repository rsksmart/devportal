---
sidebar_position: 2
title: Port an Ethereum dApp to Rootstock
sidebar_label: Port an Ethereum dApp to Rootstock
tags: [rsk, rootstock, resources, tutorials, port to rootstock, Ethereum, dApps, smart contracts]
description: "Porting an Ethereum decentralized application (dApp) to Rootstock (RSK) presents an exciting opportunity to leverage the benefits of the Rootstock network, a Bitcoin L2 compatible with Ethereum. This guide will walk you through porting an Ethereum dApp to the Rootstock network using the Hardhat Ignition deployment tool and leveraging the compatibility between Solidity (used for Rootstock) and Ethereum."
---

Porting an Ethereum decentralized application (dApp) to Rootstock presents an exciting opportunity to leverage the benefits of the Rootstock network, which is a smart contract platform secured by the Bitcoin network.

Rootstock combines Ethereum's flexibility with Bitcoin's security and scalability, offering a compelling environment for dApp development.

With Rootstock, you can bridge the gap between Ethereum and Bitcoin, bringing your existing Ethereum dApps to the Rootstock platform.

This guide will walk you through porting your Ethereum dApp to the Rootstock network using the Hardhat Ignition deployment tool and leveraging the compatibility between Solidity (used for Rootstock) and Ethereum.

## Advantages of Porting Your dApp to Rootstock

**1. Faster Transaction Speeds**

Rootstock performs transactions by [merge-mining with Bitcoin](/concepts/merged-mining/). This means that Rootstock transactions benefit from the security of the Bitcoin network while achieving faster confirmation times compared to Ethereum.

**2. Lower Gas Fees**

Rootstock’s gas fees are typically lower than Ethereum, averaging around `$0.052`. This cost-effectiveness can be especially appealing for dApps that require frequent interactions with the blockchain.

**3. Leveraging Bitcoin Security**

Rootstock is a layer 2 on Bitcoin, which means it inherits the security of the Bitcoin network. This security model provides confidence to builders and users.

## Similarities Between Ethereum and Rootstock

**1. Solidity as the Programming Language**

Both Ethereum and Rootstock use Solidity as their primary smart contract programming language. If you’re already familiar with Solidity, transitioning to Rootstock should be relatively straightforward.

**2. EVM Compatibility**

Rootstock is compatible with the Ethereum Virtual Machine (EVM). This compatibility allows developers to reuse existing Ethereum smart contracts on Rootstock with minimal modifications.

## Key Differences Between Ethereum and Rootstock

**1.Consensus Mechanisms**

Ethereum currently uses a Proof of Stake (PoS) consensus mechanism, while Rootstock employs a hybrid PoW/PoS (Proof of Stake) consensus. Rootstock’s PoS component enhances scalability and energy efficiency.

**2. Token Standards**

While Ethereum introduced popular token standards like ERC20 (fungible tokens) and ERC721 (non-fungible tokens), Rootstock has its own token standard called RRC20. Understanding the differences between these standards is crucial when porting tokens.

**3. Network Fees**

As mentioned earlier, Rootstock generally offers lower gas fees. Developers can take advantage of this cost savings when deploying and interacting with smart contracts.

## Getting Started

### Prerequisites

Before you begin, ensure that you have the following:
- Node.js:
  - Make sure you have Node.js installed. If not, you can follow the installation instructions for Windows or MacOS.
- Hardhat:
  - Install Hardhat globally using npm: `npm i -g hardhat`
- A basic knowledge of smart contracts and Solidity

### Steps to Set Up a Hardhat Project for Rootstock
1. **Create a New Project**: Create a folder for your project and navigate into it:
    ```sh
    mkdir rsk-hardhat-example
    cd rsk-hardhat-example
    ```

2. **Initialize Hardhat**: Initialize your Hardhat project by running this command:
    ```sh
    npx hardhat init
    ```
3. **Select project framework:** Choose **Create a TypeScript project** when prompted as shown below. Then press enter.

    ```
    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

    👷 Welcome to Hardhat v2.22.5 👷‍

    ? What do you want to do? …
    ❯ Create a TypeScript project
    ```

4. **Select the project root** (press enter)
    ```sh
    ✔ What do you want to do? · Create a TypeScript project
    ? Hardhat project root: › /path/to/your/project/rsk-hardhat-example
    ```

5. **Add a .gitignore File**: If you need a .gitignore file (which is recommended), create one in your project root. You can skip this step if you don’t want to use Git.
    ```sh
    ? Do you want to add a .gitignore? (Y/n) › y
    ```

6. **Install dependencies with npm**:
    ```sh
    ? Do you want to install this sample project's dependencies with npm (hardhat @nomicfoundation/hardhat-toolbox)? (Y/n) › y
    ```

7. **Configure Rootstock Networks**: By now, your hardhat project should have four main artifacts besides the basic Node configuration:
    - `contracts/`
    - `ignition/modules/`
    - `test/`
    - `hardhat.config.js`

  > This guide uses Hardhat version 2.22.5. For this version, the default tool for managing deployments is [Hardhat Ignition](https://hardhat.org/ignition/docs/getting-started).

8. **Install Hardhat Ignition and TypeScript**

```sh
  npm install --save-dev @nomicfoundation/hardhat-ignition-ethers typescript
  ```

  At this point, your `hardhat.config.ts` should look like this:
  ```typescript
    import { HardhatUserConfig } from "hardhat/config";
    import "@nomicfoundation/hardhat-toolbox";
    import "@nomicfoundation/hardhat-ignition-ethers";

    const config: HardhatUserConfig = {
      solidity: "0.8.24",
  };

export default config;
```

### Configure Rootstock Networks

To configure the Rootstock networks, you'll need an RPC URL for both mainnet and testnet and a Private Key of the account that will deploy the contracts.

To get the RPCs, go to the [RPC API dashboard from Rootstock Labs](https://dashboard.rpc.rootstock.io/dashboard) create an account if you don't have one, and get an API key for Rootstock testnet or Rootstock mainnet.


````mdx-code-block
<Tabs>
  <TabItem value="contribute" label="Mainnet RPC URL should look similar to this:" default>
    ```
https://rpc.mainnet.rootstock.io/<API-KEY>
```
  </TabItem>
  <TabItem value="contest" label="Testnet RPC URL should look similar to this:">
 ```
https://rpc.testnet.rootstock.io/<API-KEY>
```
  </TabItem>

</Tabs>
````

The next step is to retrieve your private key. If you don't know how to get the private key to your wallet, here's a [tutorial](https://support.metamask.io/managing-my-wallet/secret-recovery-phrase-and-private-keys/how-to-export-an-accounts-private-key/) on [Metamask](https://metamask.io/).

Also, if you haven't added Rootstock mainnet or testnet to your Metamask Wallet, you can do it by clicking the Add Rootstock or Add Rootstock Testnet buttons in the footer of [mainnet explorer](https://rootstock.blockscout.com/) or [testnet explorer](https://rootstock-testnet.blockscout.com/).

#### Store the RPC URLs and the Private Key
To securely store the RPC URLs, you can use a `.env` file or the Hardhat configuration variables. For this example, you'll use the second option.

To store this, type in the terminal in the project's root folder:
```sh
npx hardhat vars set TESTNET_RPC_URL
```
And enter the value after pressing enter.

:::note

Make sure your TESTNET_RPC_URL value is in this format: `https://rpc.testnet.rootstock.io/API-KEY`

For example, `https://rpc.testnet.rootstock.io/eOQAoxAI7Bt6zZ6blwOdMjQQIzKwSW-W` (Where `eOQAoxAI7Bt6zZ6blwOdMjQQIzKwSW-W` is your API-KEY)

:::

```sh
npx hardhat vars set TESTNET_RPC_URL
✔ Enter value: · ****************************************************************
```

Now repeat this step for your MAINNET_RPC_URL.

You’ll see output similar to this:
```
The configuration variable has been stored in /Users/wisdomnwokocha/Library/Preferences/hardhat-nodejs/vars.json
```

For the Private key:
When requested to enter your private key, press enter it.
```sh
npx hardhat vars set PRIVATE_KEY
✔ Enter value: · ****************************************************************
```

You’ll see output similar to this:
```
The configuration variable has been stored in /Users/wisdomnwokocha/Library/Preferences/hardhat-nodejs/vars.json
```

Now, update your `hardhat.config.ts` file to include Rootstock network configurations. Here’s an example of how it should look:
```typescript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.24", // Set your desired Solidity version

  networks: {
    // Mainnet configuration
    mainnet: {
      url: "https://rpc.mainnet.rootstock.io/<API-KEY>",
      accounts: [process.env.PRIVATE_KEY],
    },

    // Testnet configuration
    testnet: {
      url: "https://rpc.testnet.rootstock.io/<API-KEY>",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

export default config;
```
Replace `<API-KEY>` with your actual API keys obtained from the Rootstock Labs dashboard. Also, store your private key securely (e.g., in a `.env` file).

### Copy Ethereum Contract Code and Tests

Copy this Ethereum contract and its tests to your Rootstock Hardhat project. Place it inside the `contracts` folder so the route would be `contracts/SimpleStorage.sol`.

#### `SimpleStorage.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SimpleStorage {
    uint256 public favoriteNumber;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }
}
```

Copy this test code and create a new file named `SimpleStorage.ts` inside the `test` folder. The route will be `test/SimpleStorage.ts`.

#### Update SimpleStorage.ts

```typescript
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("SimpleStorage", function () {
  async function deploySimpleStorageFixture() {
    const [owner] = await hre.ethers.getSigners();

    const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();

    return { simpleStorage, owner };
  }

  describe("Deployment", function () {
    it("Should deploy and initialize favoriteNumber to 0", async function () {
      const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);

      expect(await simpleStorage.favoriteNumber()).to.equal(0);
    });
  });

  describe("Store", function () {
    it("Should store the value 42 and retrieve it", async function () {
      const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);

      const storeTx = await simpleStorage.store(42);
      await storeTx.wait();

      expect(await simpleStorage.favoriteNumber()).to.equal(42);
    });

    it("Should store a different value and retrieve it", async function () {
      const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);

      const storeTx = await simpleStorage.store(123);
      await storeTx.wait();

      expect(await simpleStorage.favoriteNumber()).to.equal(123);
    });
  });
});
```

### Compile Your Contract

To compile your contract, run this command in your terminal:

```bash
npx hardhat compile
```

After compilation, you’ll see output similar to this:

```
Generating typings for: 1 artifacts in dir: typechain-types for target: ethers-v6
Successfully generated 6 typings!
Compiled 1 Solidity file successfully (evm target: paris).
```

### Test Your Contract

To test your contract functionality, run this command in your terminal:

```bash
npx hardhat test
```

The test results will show whether your contract behaves as expected. You should see something like this:

```s
SimpleStorage
    Deployment
      ✔ Should deploy and initialize favoriteNumber to 0
    Store
      ✔ Should store the value 42 and retrieve it
      ✔ Should store a different value and retrieve it

  3 passing (286ms)
```

### Deploying Your Contract on Rootstock Testnet

**1. Ensure Sufficient Balance**

Before deploying, ensure you have enough testnet tokens (RBTC) in your wallet. If not, obtain some from the [Rootstock faucet](https://faucet.rootstock.io/).

**2. Create the Deployment Script**

Create a file named `SimpleStorage.ts` inside the `ignition/modules` folder. Paste the following TypeScript code into that file:

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SimpleStorageModule = buildModule("SimpleStorageModule", (m) => {
  const simpleStorage = m.contract("SimpleStorage");

  return { simpleStorage };
});

export default SimpleStorageModule;
```

**3. Deploy the Contract**

In your terminal, run the deployment command:

```bash
npx hardhat ignition deploy ignition/modules/SimpleStorage.ts --network rskTestnet
```

This TypeScript script uses Hardhat Ignition to deploy the `SimpleStorage` contract in a declarative way.

**4. Confirmation and Deployment**

- Confirm the deployment to the Rootstock testnet by typing “yes.”
- Hardhat Ignition will resume the existing deployment (if any) and execute the deployment process.
- You’ll see a success message indicating that the contract was deployed.

```bash
✔ Confirm deploy to network rskTestnet (31)? … yes
Hardhat Ignition 🚀

Resuming existing deployment from ./ignition/deployments/chain-31

Deploying [ SimpleStorageModule ]

Batch #1
  Executed SimpleStorageModule#SimpleStorage

[ SimpleStorageModule ] successfully deployed 🚀

Deployed Addresses

SimpleStorageModule#SimpleStorage - 0x3570c42943697702bA582B1ae3093A15D8bc2115
```

:::info[Info]

If you get an error like `IgnitionError: IGN401`, try running the command again.

:::


> If you want to deploy your contract on mainnet, change `rskTestnet` to `rskMainnet` in the last command and make sure you have RBTC available in your wallet.

#### Verify Deployment

Visit [Rootstock Testnet Explorer](https://explorer.testnet.rootstock.io/). Paste your contract address (`0x3570c42943697702bA582B1ae3093A15D8bc2115`) into the search bar to verify successful deployment.

> If you deployed your contract on [Mainnet Explorer](https://explorer.rootstock.io/).
