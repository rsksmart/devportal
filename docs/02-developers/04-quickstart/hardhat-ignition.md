---
sidebar_label: Hardhat Ignition
sidebar_position: 104
title: Rootstock Hardhat Ignition Starter Kit
description: 'This guide is designed to help you deploy smart contracts on the Rootstock blockchain, with a focus on using Hardhat Ignition. 
While standard Hardhat guides cover general Rootstock development, this guide specifically showcases how Hardhat Ignition can make deployment more efficient by enabling programmatic and declarative approaches tailored for Rootstock.'
tags: [rsk, rootstock, hardhat Ignition, starter kit, mainnet, testnet, developers, hardhat, quick starts, dApps, smart contracts]
---

This guide provides a step-by-step approach to deploying smart contracts on the Rootstock using Hardhat Ignition.

While standard [Hardhat guides](/developers/smart-contracts/hardhat/) cover general Rootstock development, this guide specifically showcases how Hardhat Ignition can make deployment more efficient by enabling programmatic and declarative approaches tailored for Rootstock. 

Hardhat Ignition streamlines smart contract deployment by enabling programmatic definition, testing, and execution of deployment plans. This declarative approach significantly improves efficiency and manageability, making the deployment process smoother and more predictable.

With Ignition, you can easily manage complex deployment workflows, handle dependencies between contracts, and ensure smooth deployment processes.

Don’t worry if you’re new to this—every step will be explained in simple terms, making it accessible even if you’re just starting out. 

## **What You'll Learn**

* Set up a project to deploy smart contracts on Rootstock.  
* Understand the project structure.  
* Deploy a contract to the Rootstock Testnet using Hardhat Ignition.

## **What You Need Before Starting**

1. **Node.js**

   * This is a tool developers use to run JavaScript code.  
   * [Download Node.js here](https://nodejs.org/). Install the **LTS version** (the one marked as “Recommended for Most Users”).  
2. **npm** or **Yarn**

   * These are tools that help manage project dependencies (software libraries your project needs to work).  
   * If you installed Node.js, you already have npm installed. You can check by typing this in your terminal:

```
npm -v
```

3. **Hardhat**

   * A tool that helps developers create and test Ethereum-like projects (Rootstock is Ethereum-compatible).  
4. **Hardhat Ignition**

   * A plugin that makes deploying smart contracts easier.  
5. **Rootstock RPC API endpoint**

   * This is like an access point that connects your computer to the Rootstock blockchain. You can use the Testnet (for testing) or Mainnet (for real transactions).

:::warning[Before running these command]

- If you find the `deployments` and `artifacts` folder inside the ignition directory, delete it.

:::

## Getting Started

<Steps>
  <Step title="Clone the Repository"> 

 Open your terminal (Command Prompt, PowerShell, or any terminal you like) And type this command.

```
git clone https://github.com/rsksmart/rootstock-hardhat-ignition-starterkit.git
cd rootstock-hardhat-ignition-starterkit
```

Open this folder in an IDE like [Visual Studio Code](https://code.visualstudio.com/).

#### Install Dependencies

In your terminal, run this command:

```
npm install
```

This will download and set up everything the project needs.

  </Step>
  <Step title="Understand the Project Structure">
    Once you’ve set up everything, your project files will look like this:

```
.
├── contracts          # Your smart contracts live here.
├── ignition          
│   └── modules        # Deployment scripts for your contracts.
├── test               # Files to test your smart contracts.
├── package.json       # Lists project dependencies (like a grocery list for software).
├── hardhat.config.ts  # Configuration for Hardhat.
├── README.md          # A file explaining your project.
└── tsconfig.json      # Configuration for TypeScript.
```
### **Modules Folder**

The **Modules** folder contains essential scripts used for the deployment of smart contracts. Specifically, it includes two main files: `Box.ts` and `Lock.ts`.

1. #### Box.ts – Box Module

This script sets up and exports a module that handles the deployment of the Box contract.

```
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// Create and configure the BoxModule using Hardhat's Ignition library
const BoxModule = buildModule("BoxModule", (m) => {
  // Deploy the Box contract with no initial parameters
  const box = m.contract("Box", []);

  // Return an object containing the deployed contract
  return { box };
});

// Export the module for use in deployment
export default BoxModule;
```

:::info[A breakdown of each part of the Box module:]

- `buildModule`: A function from `@nomicfoundation/hardhat-ignition/modules` used to create and configure modules for contract deployment.  
- `m.contract`: Deploys a contract with the given name and constructor parameters.


:::



2. #### Lock.ts – Lock Module

This script handles the deployment of the Lock contract with specific parameters for the unlock time and the locked amount.

```
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// Define constants for unlock time and locked amount
const JAN_1ST_2030 = 1893456000; // Unix timestamp for January 1, 2030
const ONE_GWEI: bigint = 1_000_000_000n; // Value of 1 Gwei in Wei

// Create and configure the LockModule using Hardhat's Ignition library
const LockModule = buildModule("LockModule", (m) => {
  // Retrieve deployment parameters with default values
  const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

  // Deploy the Lock contract with the specified unlock time and initial value
  const lock = m.contract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  // Return an object containing the deployed contract
  return { lock };
 });

 // Export the module for use in deployment
 export default LockModule;
```

:::info[A breakdown of each part of the Lock Module:]

 - `m.getParameter`: This retrieves a deployment parameter, allowing for a default value to be specified if none is provided.  
 
  **Constants**:  
  * `JAN_1ST_2030`: The Unix timestamp for the unlock time.  
  * `ONE_GWEI`: The value of 1 Gwei, expressed in Wei.

:::



  </Step>
  <Step title="Set Up Environment Variables">
    1. Create a file named .env in the root folder of your project.

2. Add the following lines to the file:

```
RSK_MAINNET_RPC_URL=<your-mainnet-rpc-url>
RSK_TESTNET_RPC_URL=<your-testnet-rpc-url>
PRIVATE_KEY=<your-deployer-account-private-key>
```

:::info[What These Mean]

   * `RSK_MAINNET_RPC_URL`: This connects you to the Rootstock Mainnet (real transactions).  
   * `RSK_TESTNET_RPC_URL`: This connects you to the Rootstock Testnet (fake money for testing).  
   * `PRIVATE_KEY`: This is like your account password but in a very secure format.  
 
 **How to Get These**:

   * Visit the [Rootstock RPC API](https://dev.rootstock.io/developers/rpc-api/rootstock/) to get the **Mainnet** or **Testnet** URLs.  
   * Get your account’s private key from your wallet (e.g., **Metamask**).  
   * For Testnet tokens, go to the [Rootstock Faucet](https://faucet.rsk.co/).

:::
 
  </Step>
   <Step title="Compile and Test Your Smart Contracts"> 
   - Run this command to compile the Contract:

```
npx hardhat compile
```

This checks for errors and prepares your contract for deployment.

 
- Run this command to check if the contracts behave as expected:

```
npx hardhat test
```

3. If everything is okay, you’ll see green checkmarks or messages saying the tests passed.

```text
Generating typings for: 2 artifacts in dir: typechain-types for target: ethers-v6
Successfully generated 8 typings!
Compiled 2 Solidity files successfully (evm target: paris).


  Box
    Deployment
      ✔ Should initialize with a value of 0 (1214ms)
    Store and Retrieve
      ✔ Should store the value and retrieve it correctly
      ✔ Should emit a ValueChanged event on storing a value

  Lock
    Deployment
      ✔ Should set the right unlockTime
      ✔ Should set the right owner
      ✔ Should receive and store the funds to lock
      ✔ Should fail if the unlockTime is not in the future
    Withdrawals
      Validations
        ✔ Should revert with the right error if called too soon
        ✔ Should revert with the right error if called from another account
        ✔ Shouldn't fail if the unlockTime has arrived and the owner calls it
      Events
        ✔ Should emit an event on withdrawals
      Transfers
        ✔ Should transfer the funds to the owner


  12 passing (1s)

```
 </Step>
   <Step title="Deploy the Smart Contract">
    The following command is used to deploy a smart contract to the Rootstock Testnet:

```
npx hardhat ignition deploy --network rskTestnet ignition/modules/Box.ts
```

:::info[A breakdown of each part of the command:]


1. `npx` 
   * This is a tool that runs Node.js commands without needing to install them globally on your computer.  
   * When you type npx hardhat, it uses Hardhat directly from the project without requiring additional setup.

2. `hardhat` 
   * This is the main tool for Ethereum-compatible blockchain development. It compiles, tests, and deploys smart contracts.

3. `ignition deploy`  
   * `ignition`: A plugin for Hardhat designed to simplify and organize smart contract deployment.  
   * `deploy`: Tells Ignition to deploy the specified smart contract(s).

4. `--network rskTestnet` 
   * `--network`: Specifies which blockchain network you want to deploy to.  
   * `rskTestnet`: This points to the Rootstock **Testnet** (a testing version of Rootstock). It is defined in the `hardhat.config.ts` file of your project.  
     * If you wanted to deploy to the **Mainnet** instead, you would replace `rskTestnet` with `rskMainnet` (and ensure your `.env` file has the **Mainnet** RPC URL and sufficient funds).

5. `ignition/modules/Box.ts`  
   * This is the path to the **deployment script** for the contract.  
   * In this case:  
     * The `ignition/modules` folder contains scripts for deploying different contracts.  
     * The `Box.ts` script deploys a specific smart contract named `Box`. 
   * Deployment scripts often include additional instructions, like initializing the contract, managing dependencies, or passing parameters.

:::


### **Results of Running This Command** 

1. **Reads Configuration**

   * Hardhat uses the hardhat.config.ts file to determine the details of the network (rskTestnet) and other settings.  
2. **Loads Deployment Script**

   * Ignition loads the Box.ts file to determine which contract to deploy and how to deploy it.  
3. **Connects to the Blockchain**

   * The network configuration (defined in the .env file and hardhat.config.ts) is used to connect to the Rootstock Testnet via its RPC URL.  
4. **Deploys the Contract**

   * Hardhat compiles the contract, sends it to the blockchain, and waits for confirmation that it was successfully deployed.  
5. **Saves Deployment Data**

   * Ignition stores the deployed contract's information (like the address) in a deployments folder so you can refer to it later.

:::success[Expected Output]

If everything goes well, you will see:

1. **Confirmation Prompt**

   * The system might ask, *"Do you want to deploy this contract to the rskTestnet?"*  
   * Type yes and hit Enter.

```
? Confirm deploy to network rskTestnet (31)? › (y/N)
```

2. **Deployment Progress**

   * Ignition shows which contract modules are being deployed.  
3. **Success Message**

   * If successful, you’ll see something like this:

```
✔ Confirm deploy to network rskTestnet (31)? … yes
Hardhat Ignition 🚀

Deploying [ BoxModule ]

Batch #1
  Executed BoxModule#Box

[ BoxModule ] successfully deployed 🚀

Deployed Addresses

BoxModule#Box - 0x4949D33d795dF56283EEB3cE7744038Ab229712f
```

The output includes the deployed contract's address, which you can use to interact with it or verify it on the blockchain explorer.


:::



  </Step>
   <Step title="Verify the Deployment">
    1. Copy the contract address from the output (e.g., `0x4949D33d795dF56283EEB3cE7744038Ab229712f`).  
2. Go to the [Rootstock Testnet Explorer](https://explorer.testnet.rsk.co/).  
3. Paste the address into the search bar and check that your contract has been deployed.


<figure>
<img src="/img/developers/quickstart/hardhat-ignition/rootstock-explorer.png" alt="Rootstock Testnet Explorer"/>
  <figcaption>Rootstock Testnet Explorer (fig 1.)</figcaption>
</figure>


  </Step>
</Steps>

:::warning[Troubleshooting]

1. **Reconciliation failed:** If you encounter this error, delete the ignition folder and artifacts folder, because they may have stored your previous deployment 

**Error**
- `First`.
```
[ BoxModule ] reconciliation failed ⛔

The module contains changes to executed futures:

BoxModule#Box:
 - From account has been changed from 0xb4eb1352ac339766727df550a24d21f90935e78c to 0xb0f22816750851d18ad9bd54c32c5e09d1940f7d

Consider modifying your module to remove the inconsistencies with deployed futures.
```
- `Second`.
```
IgnitionError: IGN401: Error while executing BoxModule#Box: all the transactions of its network interaction 1 were dropped. Please try rerunning Hardhat Ignition.
```
 2. **Gas Fees**: If deployment fails, ensure your wallet has enough funds. Use the faucet for test tokens.  
 3. **Incorrect URLs**: Double-check your .env file for the correct RPC URLs.  
 4. **Compile Errors**: Review your smart contract code for mistakes.

:::