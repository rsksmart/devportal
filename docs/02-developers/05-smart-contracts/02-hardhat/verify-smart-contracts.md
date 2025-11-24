---
sidebar_label: Verify Smart Contracts
sidebar_position: 106
title: Verify Smart Contracts
description: "Learn how to verify your Rootstock smart contract on Rootstock and Blockscout explorers."
tags:
  [guides, developers, smart contracts, rsk, rootstock, hardhat, dApps, ethers, verify]
---

In this section, we'll verify your token contract on the Rootstock and Blockscout explorers, so the users of you dApp can be able to see the actual code of your contract to analyze that it doesn't have malicious code, and they can also interact with it.

Once you have been working on your contract using Hardhat, you can execute the verification in both explorers simultaneously with a simple command.

## Step 1: Install hardhat-verify plugin

In case it isn't installed yet:

```shell
  npm install --save-dev @nomicfoundation/hardhat-verify
```


And add the following code to your `hardhat.config.ts` file:

```bash
require("@nomicfoundation/hardhat-verify");
```

Or, if you are using TypeScript, add this to your hardhat.config.ts:

```bash
import "@nomicfoundation/hardhat-verify";
```

## Sept 2: Update Hardhat config

You need to add the following Etherscan config to your `hardhat.config.ts` file:


```bash
require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-verify');
require('dotenv').config();

module.exports = {
  defaultNetwork: 'rskTestnet',
  networks: {
    rskMainnet: {
      url: "https://rpc.testnet.rootstock.io/{YOUR_APIKEY}",
      chainId: 30,
      gasPrice: 60000000,
      accounts: [PRIVATE_KEY],
    },
    rskTestnet: {
      url: "https://rpc.mainnet.rootstock.io/{YOUR_APIKEY}",
      chainId: 31,
      gasPrice: 60000000,
      accounts: [PRIVATE_KEY],
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.25',
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
  etherscan: {
    apiKey: {
      // Is not required by Blockscout or Rootstock explorers, 
      // but must be any non-empty string, si leave it as "rootstock".
      rskTestnet: 'rootstock',
      rskMainnet: 'rootstock',
    },
    customChains: [
      {
        network: 'rskTestnet',
        chainId: 31,
        urls: {
          apiURL: 'https://be.explorer.testnet.rootstock.io/api/v3/',
          browserURL: 'https://explorer.testnet.rootstock.io/',
        },
      },
      {
        network: 'rskMainnet',
        chainId: 30,
        urls: {
          apiURL: 'https://be.explorer.rootstock.io/api/v3/',
          browserURL: 'https://explorer.rootstock.io/',
        },
      },
    ],
  },
  blockscout: {
    enabled: true,
    customChains: [
      {
        network: 'rskTestnet',
        chainId: 31,
        urls: {
          apiURL: 'https://rootstock-testnet.blockscout.com/api/',
          browserURL: 'https://rootstock-testnet.blockscout.com/',
        },
      },
      {
        network: 'rskMainnet',
        chainId: 30,
        urls: {
          apiURL: 'https://rootstock.blockscout.com/api/',
          browserURL: 'https://rootstock.blockscout.com/',
        },
      },
    ],
  },
};
```

## Step 3: Verify yor smart contract

Now, run the verify task, passing the address of the contract, 
the network where it's deployed, and the constructor arguments that were used to deploy the contract:
```bash
npx hardhat verify --network rskTestnet DEPLOYED_CONTRACT_ADDRESS CONSTRUCTOR_ARGUMENTS
```
or 
```bash
npx hardhat verify --network rskMainnet DEPLOYED_CONTRACT_ADDRESS CONSTRUCTOR_ARGUMENTS
```

:::tip[Tip]

- Replace `DEPLOYED_CONTRACT_ADDRESS` with the contract address that you want to verify.

:::

**The response should look like this:**
```bash
npx hardhat verify --network rskTestnet 0x28eb8D29e4713E211D1dDab19dF3de16086BB8fa 1000
Successfully submitted source code for contract
contracts/MyToken.sol:MyToken at 0x28eb8D29e4713E211D1dDab19dF3de16086BB8fa
for verification on the block explorer. Waiting for verification result...

Successfully verified contract MyToken on the block explorer.
https://explorer.testnet.rootstock.io/address/0x28eb8D29e4713E211D1dDab19dF3de16086BB8fa#code

Successfully verified contract MyToken on the block explorer.
https://rootstock-testnet.blockscout.com/address/0x28eb8D29e4713E211D1dDab19dF3de16086BB8fa#code
```

With that, the contract has been successfully verified in both block explorers.

## Resources
- [Deploy, Interact and Verify Smart Contracts using Remix and Rootstock Explorer](/developers/quickstart/remix/)
- Visit [hardhat-verify](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#hardhat-verify)
- Visit [blockscout](https://docs.blockscout.com/for-users/verifying-a-smart-contract/hardhat-verification-plugin)
- [Hardhat Starter Kit for Rootstock](https://github.com/rsksmart/rootstock-hardhat-starterkit)
