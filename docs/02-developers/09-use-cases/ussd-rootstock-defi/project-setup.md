---
sidebar_label: Project Setup & Contract Deployment
sidebar_position: 3
title: Project Setup & Smart Contract Deployment
tags: [rsk, rootstock, developers, solidity, hardhat]
description: Scaffold the USSD-RSK project using Hardhat 3, write the InclusiveDeFi smart contract, configure the RSK Testnet network, and deploy using Hardhat Ignition.
---

# Project Setup & Smart Contract Deployment

This page covers everything from scaffolding the project to deploying the `InclusiveDeFi` contract on RSK Testnet. By the end of this page, you will have a live contract address on Chain ID 31 that the relay server can interact with.
:::note
`InclusiveDefi` Is just a name of contract, developers can change it as per need.
:::

## Prerequisites

Before starting, ensure you have the following:

- Node.js v18 or later
- `npm` or `pnpm`
- A funded RSK Testnet wallet — get tRBTC from the [RSK Testnet Faucet](https://faucet.rootstock.io)
- Basic familiarity with Solidity and Hardhat

## Scaffolding the Project

This project uses **Hardhat 3 Beta** with the `mocha` + `ethers` toolbox. You do not need to create the folder structure manually Hardhat's initializer generates it for you.

Run the following in your terminal to scaffold a new Hardhat 3 project:

```bash
mkdir ussd-rsk && cd ussd-rsk
npx hardhat@next init
```

When prompted, select the **TypeScript + mocha + ethers** template. Hardhat will generate the base project structure:

```
ussd-rsk/
├── contracts/           ← Place your Solidity contracts here
├── ignition/
│   └── modules/         ← Hardhat Ignition deployment modules
├── test/                ← Mocha test files
├── hardhat.config.ts    ← Network and compiler configuration
├── tsconfig.json
└── package.json
```

After scaffolding, install dependencies:

```bash
npm install
```

Then add the additional runtime dependencies needed for the relay server:

```bash
npm install express dotenv
npm install --save-dev @types/express tsx
```

Your final `package.json` should look like this:

```json
{
  "name": "ussd-rsk",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start-bridge": "tsx index.ts"
  },
  "dependencies": {
    "dotenv": "^17.3.1",
    "express": "^5.2.1"
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox-mocha-ethers": "^3.0.2",
    "@types/express": "^5.0.6",
    "@types/node": "^22.19.11",
    "ethers": "^6.16.0",
    "hardhat": "^3.1.9",
    "tsx": "^4.21.0",
    "typescript": "~5.8.0"
  }
}
```

## Environment Variables

Create a `.env` file in the project root. This file holds the relayer wallet private key and the RSK RPC endpoint.

```bash
PRIVATE_KEY=your_relayer_wallet_private_key_here
RSK_TESTNET_RPC=https://public-node.testnet.rsk.co
```

:::warning
The private key in `.env` controls the relayer wallet that signs all user transactions. Never commit this file to version control. Treat it as a production secret even during development.
:::

Add `.env` to your `.gitignore` immediately:

```
# .gitignore
node_modules/
dist/
artifacts/
cache/
.env
```

## Hardhat Configuration

Replace the contents of `hardhat.config.ts` with the following. This adds the RSK Testnet as a named HTTP network alongside the default local simulated networks:

```typescript
import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import { configVariable, defineConfig } from "hardhat/config";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [hardhatToolboxMochaEthersPlugin],

  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
    },
  },

  networks: {
    // Local simulated networks for testing
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },

    // RSK Testnet — Chain ID 31
    rskTestnet: {
      type: "http",
      chainType: "l1",
      url: "https://public-node.testnet.rsk.co",
      chainId: 31,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
});
```

:::note
RSK is fully EVM-compatible, so `chainType: "l1"` is correct. No custom chain type is needed. The public node at `https://public-node.testnet.rsk.co` is rate-limited but sufficient for development and deployment. For production throughput, provision a dedicated RPC endpoint.
:::

## The Smart Contract

Create `contracts/InclusiveDeFi.sol`. This contract is the on-chain core of the system it maintains internal balance and loan state for all users who interact through the relay.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract InclusiveDeFi {
    mapping(address => uint256) public balances;
    mapping(address => uint256) public loans;

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event LoanIssued(address indexed user, uint256 amount);

    // P2P Transfer — moves balance between two internal accounts
    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    // Micro-Loan — issues 0.01 tRBTC, one active loan per address
    function applyForLoan() public {
        require(loans[msg.sender] == 0, "Existing loan active");
        uint256 loanAmount = 0.01 ether;
        loans[msg.sender] = loanAmount;
        balances[msg.sender] += loanAmount;
        emit LoanIssued(msg.sender, loanAmount);
    }

    // Read — returns internal balance for any address
    function getBalance(address user) public view returns (uint256) {
        return balances[user];
    }

    // Deposit tRBTC into the contract (used for seeding and testing)
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
}
```

### Contract Design Notes

The contract uses **internal accounting** it does not implement ERC-20 or hold externally transferred tokens. All balances tracked in `balances[]` are denominated in wei (tRBTC) and represent funds that have been deposited via `deposit()` or credited via `applyForLoan()`.

The `transfer()` function moves value between two entries in the `balances` mapping. It does not send native tRBTC it updates internal records. This is intentional: it allows the relayer to call `transfer()` on behalf of any user without needing the user to hold tRBTC for gas.

:::note
`applyForLoan()` credits the loan amount to `balances[msg.sender]` without requiring collateral. This is acceptable for a demo. A production system must implement a repayment flow and either collateral requirements or a credit-scoring oracle before enabling this feature.
:::

## Ignition Deployment Module

Create `ignition/modules/InclusiveDeFi.ts`. This is the Hardhat Ignition module that describes how the contract should be deployed.

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const InclusiveDeFiModule = buildModule("InclusiveDeFiModule", (m) => {
  const inclusiveDeFi = m.contract("InclusiveDeFi");
  return { inclusiveDeFi };
});

export default InclusiveDeFiModule;
```

## Deploying to RSK Testnet

Run the following command to deploy

```bash
npx hardhat ignition deploy --network rskTestnet ignition/modules/InclusiveDeFi.ts
```

On success, Hardhat Ignition outputs the deployed contract address and writes deployment artifacts to `ignition/deployments/chain-31/`

```
Deployed Addresses
InclusiveDeFiModule#InclusiveDeFi: 0xYourDeployedContractAddress
```

The `deployed_addresses.json` file under `ignition/deployments/chain-31/` will also record this address for future reference.

:::note
Copy this contract address. You will need to paste it into `CONTRACT_ADDRESS` in `index.ts` before starting the relay server.
:::

## Verifying the Deployment

Open the [RSK Testnet Explorer](https://explorer.testnet.rootstock.io) and search for your deployed contract address. You should see the deployment transaction, the contract bytecode, and the contract ABI.

You can also verify that the deployment transaction was mined by inspecting `ignition/deployments/chain-31/journal.jsonl`. A successful entry ends with:

```json
{
  "futureId": "InclusiveDeFiModule#InclusiveDeFi",
  "result": {
    "address": "0xYourDeployedContractAddress",
    "type": "SUCCESS"
  },
  "type": "DEPLOYMENT_EXECUTION_STATE_COMPLETE"
}
```

## Next Steps

With your contract deployed on RSK Testnet, proceed to [Relay Server & Gateway Integration](../relay-server) to build the USSD bridge that connects feature phone users to this contract.