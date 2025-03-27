---
sidebar_position: 4
sidebar_label: Verify Smart Contracts on Rootstock CLI
title: Verify Smart Contracts on Rootstock CLI  
description: "The Rootstock CLI (rsk-cli) tool enables users to manage wallets, check balances, send transactions, verify smart contracts and interact with smart contracts on the Rootstock blockchain - a Bitcoin sidechain designed for smart contracts. It supports both mainnet and testnet environments." 
tags: [Rootstock CLI, developer tools, guides, rsk, rootstock, dApps, smart contracts, solidity, dev-environments]
---

To verify a smart contract on the Rootstock CLI, the `rsk-cli` verify command allows developers to submit their contract source code and other information to the Rootstock Explorer API. 

The `rsk-cli` verify command enables the verification of a smart contract on Rootstock's mainnet or testnet by providing the contract code, address, and other metadata through a JSON file. 

Verification on Rootstock's blockchain allows users to confirm that the compiled bytecode on the blockchain matches the source code.

<Tabs>
  <TabItem value="contribute" label="Mainnet" default>
    ```
      rsk-cli verify --json <path_to_json> --address <address> --name <contract_name> --decodedArgs <arg1> <arg2> ...
    ```
  </TabItem>
  <TabItem value="contest" label="Testnet">
    
    ```
    rsk-cli verify --testnet --json <path_to_json> --address <address> --name <contract_name> --decodedArgs <arg1> <arg2> ...
    ```
  </TabItem>
 
</Tabs>

:::info[]

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h4">Verify Smart Contract Parameters</Accordion.Header>
    <Accordion.Body>
     
   1. `--json \<path\_to\_json\>`
   * This specifies the path to the JSON file that contains all necessary information for verifying the contract. The JSON file should typically contain:  
     * Source code of the contract.  
     * Compiler version and settings.  
     * ABI (Application Binary Interface) data for interacting with the contract.  
     * Metadata for libraries if the contract has dependencies.  

   - **Example:** If your JSON file is named `fb7b3667b850d874bffe750e005d2477.json` and it is usually in the `build-info` folder under the `artifacts folder`, you would use `--json .artifacts/build-info/fb7b3667b850d874bffe750e005d2477.json`.
  

   ```text
   ├── artifacts
   │   └── build-info
   │       └── fb7b3667b850d874bffe750e00...
   ├── contracts
   │   └── ContactInfo.sol
   ├── cache
   ├── files
   ├── ignition
   ├── node_modules
   ├── test
   ├── typechain-types
   ├── .gitignore
   ├── hardhat.config.ts
   ├── package-lock.json
   ├── package.json
   ├── README.md
   ├── rootstock-wallet.json
   └── tsconfig.json
   ```

   2. `--address \<address\>`  
      * This is the address of the deployed contract on Rootstock's blockchain (either on mainnet or testnet).  
      * The address helps the Rootstock Explorer locate the specific instance of the contract you want to verify.  
    - **Example:** `--address 0x1234567890abcdef1234567890abcdef12345678`.  
   3. `--name \<contract\_name\>`  
      * This is the name of the smart contract as defined in the source code.  
      * This helps the verification system know which contract from the JSON file corresponds to the one deployed at the given address.  
    - **Example:** If the contract is named ContactInfo, use `--name ContactInfo`.  
   4. `--decodedArgs \<arg1\> \<arg2\> ...` *(Optional)*  
      * decodedArgs is used when the contract’s constructor requires arguments for deployment.  
      * These arguments must match the constructor parameters in the source code and are provided in a decoded format.  
   - **Example:** If the constructor takes an address and a number, you might provide `--decodedArgs 0xabcdef1234567890abcdef1234567890abcdef12 1000`.  
   5. `--testnet` *(Optional)*  
      * This flag specifies that the contract verification should be performed on Rootstock’s testnet instead of mainnet.  
      * Testnet is used for testing purposes, so developers often use it to verify contracts in a non-production environment before deploying them on the mainnet.  
   - **Example:** If verifying on testnet, use `--testnet`.

    </Accordion.Body>
  </Accordion.Item>
  
</Accordion>
:::

To verify the same contract on the testnet:

```bash
rsk-cli verify --testnet --json artifacts/build-info/fb7b3667b850d874bffe750e005d2477.json --address 0x4edd891c2e988e6145fe3e418c652ee33ebab9ae --name ContactInfo    
```

With constructor arguments:

```bash
rsk-cli verify --testnet --json ./contract.json --address 0x1234567890abcdef1234567890abcdef12345678 --name MyToken --decodedArgs 0xabcdef1234567890abcdef1234567890abcdef12 1000
```

The response below was obtained from the command without a constructor.

```bash                                  
🔧 Initializing verification on testnet...
📄 Reading JSON Standard Input from artifacts/build-info/fb7b3667b850d874bffe750e005d2477.json...
🔎 Verifying contract ContactInfo deployed at 0x4edd891c2e988e6145fe3e418c652ee33ebab9ae..
✔ 🎉 Contract verification request sent!
✔ 📜 Contract verified successfully!
🔗 View on Explorer: https://explorer.testnet.rootstock.io/address/0x4edd891c2e988e6145fe3e418c652ee33ebab9ae
```
