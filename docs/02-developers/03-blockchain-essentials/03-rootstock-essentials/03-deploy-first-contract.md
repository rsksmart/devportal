---
title: "Deploy Your First Contract"
sidebar_label: "Deploy Your First Contract"
sidebar_position: 3
description: "Write, compile, deploy, and interact with your first smart contract on Rootstock Testnet."
tags: [guides, developers, blockchain, rsk, rootstock, deploy, hardhat]
---

import CodeBlock from '@theme/CodeBlock';

In this module, you will write, compile, deploy, and interact with your first smart contract on the Rootstock Testnet.

:::tip[Starter Kits]

Get started with ready-made templates and starter guides for easy development and deployment on Rootstock. View our [quick starts](/developers/quickstart).

:::

## Step 1 - Write the Contract

Create: `contracts/HelloRootstock.sol` 

export const helloRootstockSource = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract HelloRootstock {
    string public message;

    constructor(string memory _message) {
        message = _message;
    }

    function updateMessage(string memory _newMessage) public {
        message = _newMessage;
    }
}`;

<CodeBlock language="solidity">{helloRootstockSource}</CodeBlock>

:::info[Try this contract in Remix]
Want to deploy and interact with `HelloRootstock` without any local setup? Use the button below to open it directly in the Remix IDE. You'll need MetaMask with [Rootstock Testnet configured](/dev-tools/wallets/metamask/) — see the full [Remix + Rootstock guide](/developers/quickstart/remix/) for the exact steps.

{/* Remix deep-link for HelloRootstock: https://remix.ethereum.org/?#code=Ly8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVApwcmFnbWEgc29saWRpdHkgXjAuOC4yMDsKCmNvbnRyYWN0IEhlbGxvUm9vdHN0b2NrIHsKICAgIHN0cmluZyBwdWJsaWMgbWVzc2FnZTsKCiAgICBjb25zdHJ1Y3RvcihzdHJpbmcgbWVtb3J5IF9tZXNzYWdlKSB7CiAgICAgICAgbWVzc2FnZSA9IF9tZXNzYWdlOwogICAgfQoKICAgIGZ1bmN0aW9uIHVwZGF0ZU1lc3NhZ2Uoc3RyaW5nIG1lbW9yeSBfbmV3TWVzc2FnZSkgcHVibGljIHsKICAgICAgICBtZXNzYWdlID0gX25ld01lc3NhZ2U7CiAgICB9Cn0%3D */}

<RemixLaunchButton code={helloRootstockSource} />
:::

## Step 2 — Configure Hardhat

Edit: `hardhat.config.js`

```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    rootstock_testnet: {
      url: "https://public-node.testnet.rsk.co",
      chainId: 31,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

Add your private key to `.env`:

```ini
PRIVATE_KEY=your_private_key_here
```

## Step 3 — Create Deployment Script

Create: `scripts/deploy.js`

```javascript
async function main() {
  const Contract = await ethers.getContractFactory("HelloRootstock");
  const contract = await Contract.deploy("Hello from Rootstock!");

  await contract.waitForDeployment();
  console.log("Contract deployed at:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

## Step 4 — Compile and Deploy

Compile:

```bash
npx hardhat compile
```

Deploy:

```bash
npx hardhat run scripts/deploy.js --network rootstock_testnet
```

Expected output:

```
Compiled successfully
Contract deployed at: 0x1234...abcd
```

Check contract on the [Rootstock Testnet Explorer](https://explorer.testnet.rootstock.io).

## Step 5 — Interact With the Contract

Use Hardhat console:

```bash
npx hardhat console --network rootstock_testnet
```

In console:

```javascript
const c = await ethers.getContractAt(
  "HelloRootstock",
  "0xYourContractAddress"
);

await c.message(); // read
await c.updateMessage("Updated!"); // write
```

## Summary

You now know how to:

- Write a smart contract
- Configure Hardhat for Rootstock
- Deploy to Testnet
- Interact via terminal

**Next:** [Build Your First dApp](/developers/blockchain-essentials/rootstock-essentials/build-first-dapp/)
