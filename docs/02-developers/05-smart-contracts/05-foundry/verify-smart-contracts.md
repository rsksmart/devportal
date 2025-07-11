---
sidebar_label: Verify Smart Contract
sidebar_position: 106
title: Verify Smart Contracts Using Foundry Script on Rootstock
description: "Learn how to verify smart contracts on Rootstock using Foundry scripts and the Rootstock Explorer"
tags: [guides, developers, smart contracts, rsk, rootstock, foundry, verification, explorer]
---

Smart contract verification on Rootstock using Foundry provides developers with a streamlined approach to make their deployed contracts transparent and trustworthy. This guide covers both command-line verification and automated script-based verification using the Rootstock Explorer API.

## Overview

Contract verification involves uploading and matching the contract's source code with the bytecode deployed on the blockchain. Once verified, users can read the contract's source code, understand its functionality, and interact with it more confidently through block explorers.

## Prerequisites

Before starting the verification process, ensure you have:

- **Deployed smart contract** on Rootstock Testnet or Mainnet
- **Contract source code** and constructor arguments (if any)
- **Foundry installed** and configured for Rootstock
- **Rootstock Explorer API access** (optional but recommended)

## Method 1: Using forge verify-contract Command

### Environment Configuration

First, set up your environment variables in a `.env` file:

```bash
# .env file setup
ROOTSTOCK_EXPLORER_API_KEY=your_api_key_here
RSK_TESTNET_RPC_URL=https://public-node.testnet.rsk.co
RSK_MAINNET_RPC_URL=https://public-node.rsk.co
PRIVATE_KEY=your_private_key_here
```

:::warning[API Key Security]
Never commit your private keys or API keys to version control. Always use environment variables or secure key management systems.
:::

### Basic Verification Commands

**For Rootstock Testnet:**

```bash
forge verify-contract \
  --chain-id 31 \
  --verifier-url https://explorer.testnet.rootstock.io/api \
  --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY \
  <CONTRACT_ADDRESS> \
  src/YourContract.sol:YourContract
```

**For Rootstock Mainnet:**

```bash
forge verify-contract \
  --chain-id 30 \
  --verifier-url https://explorer.rootstock.io/api \
  --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY \
  <CONTRACT_ADDRESS> \
  src/YourContract.sol:YourContract
```

### Verification with Constructor Arguments

If your contract has constructor arguments, you need to encode them properly:

```bash
# For a contract with constructor arguments
forge verify-contract \
  --chain-id 31 \
  --verifier-url https://explorer.testnet.rootstock.io/api \
  --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY \
  --constructor-args $(cast abi-encode "constructor(uint256,string,address)" 1000 "MyToken" "0x1234567890123456789012345678901234567890") \
  <CONTRACT_ADDRESS> \
  src/YourContract.sol:YourContract
```

### Example: Verifying a Simple Counter Contract

Let's verify a simple counter contract deployed on Rootstock Testnet:

```bash
# Assuming your contract is at address 0x1234567890123456789012345678901234567890
forge verify-contract \
  --chain-id 31 \
  --verifier-url https://explorer.testnet.rootstock.io/api \
  --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY \
  0x1234567890123456789012345678901234567890 \
  src/Counter.sol:Counter
```

## Method 2: Automated Verification Script

For more complex verification workflows, create a dedicated Foundry script that automates the verification process.

### Create Verification Script

Create a new file `script/Verify.s.sol`:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

contract VerifyScript is Script {
    function run() external {
        // Read deployment configuration
        uint256 chainId = block.chainid;
        address contractAddress = vm.envAddress("CONTRACT_ADDRESS");
        
        console.log("Verifying contract on chain ID:", chainId);
        console.log("Contract address:", contractAddress);
        
        // Determine the correct explorer URL based on chain ID
        string memory explorerUrl;
        if (chainId == 31) {
            explorerUrl = "https://explorer.testnet.rootstock.io/api";
            console.log("Using Rootstock Testnet Explorer");
        } else if (chainId == 30) {
            explorerUrl = "https://explorer.rootstock.io/api";
            console.log("Using Rootstock Mainnet Explorer");
        } else {
            revert("Unsupported chain ID");
        }
        
        // If contract has constructor arguments, encode them here
        // Example for a contract with uint256 constructor argument
        uint256 constructorArg = vm.envUint("CONSTRUCTOR_ARG");
        
        console.log("Constructor argument:", constructorArg);
        console.log("Run the following command to verify:");
        console.log(
            string(abi.encodePacked(
                "forge verify-contract --chain-id ", 
                vm.toString(chainId),
                " --verifier-url ", 
                explorerUrl,
                " --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY",
                " --constructor-args $(cast abi-encode \"constructor(uint256)\" ",
                vm.toString(constructorArg),
                ") ",
                vm.toString(contractAddress),
                " src/YourContract.sol:YourContract"
            ))
        );
    }
}
```

### Run the Verification Script

Execute the script to get the verification command:

```bash
# Set environment variables
export CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
export CONSTRUCTOR_ARG=1000

# Run the verification script
forge script script/Verify.s.sol --rpc-url $RSK_TESTNET_RPC_URL
```

### Advanced Verification Script with Multiple Contracts

For projects with multiple contracts, create a batch verification script:

```solidity
// script/BatchVerify.s.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

contract BatchVerifyScript is Script {
    struct ContractInfo {
        address contractAddress;
        string contractPath;
        string contractName;
        bytes constructorArgs;
    }
    
    function run() external {
        uint256 chainId = block.chainid;
        string memory explorerUrl = chainId == 31 ? 
            "https://explorer.testnet.rootstock.io/api" : 
            "https://explorer.rootstock.io/api";
        
        // Define contracts to verify
        ContractInfo[] memory contracts = new ContractInfo[](3);
        
        contracts[0] = ContractInfo({
            contractAddress: vm.envAddress("TOKEN_CONTRACT_ADDRESS"),
            contractPath: "src/Token.sol:Token",
            contractName: "Token",
            constructorArgs: abi.encode(1000000, "MyToken", "MTK")
        });
        
        contracts[1] = ContractInfo({
            contractAddress: vm.envAddress("STAKING_CONTRACT_ADDRESS"),
            contractPath: "src/Staking.sol:Staking",
            contractName: "Staking",
            constructorArgs: abi.encode(vm.envAddress("TOKEN_CONTRACT_ADDRESS"))
        });
        
        contracts[2] = ContractInfo({
            contractAddress: vm.envAddress("GOVERNANCE_CONTRACT_ADDRESS"),
            contractPath: "src/Governance.sol:Governance",
            contractName: "Governance",
            constructorArgs: abi.encode(vm.envAddress("TOKEN_CONTRACT_ADDRESS"), vm.envAddress("STAKING_CONTRACT_ADDRESS"))
        });
        
        // Generate verification commands for all contracts
        for (uint256 i = 0; i < contracts.length; i++) {
            console.log("\n=== Verifying", contracts[i].contractName, "===");
            console.log("Address:", contracts[i].contractAddress);
            console.log("Command:");
            console.log(
                string(abi.encodePacked(
                    "forge verify-contract --chain-id ", 
                    vm.toString(chainId),
                    " --verifier-url ", 
                    explorerUrl,
                    " --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY",
                    " --constructor-args 0x", 
                    _bytesToHex(contracts[i].constructorArgs),
                    " ",
                    vm.toString(contracts[i].contractAddress),
                    " ",
                    contracts[i].contractPath
                ))
            );
        }
    }
    
    function _bytesToHex(bytes memory data) internal pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(2 + data.length * 2);
        str[0] = "0";
        str[1] = "x";
        for (uint256 i = 0; i < data.length; i++) {
            str[2 + i * 2] = alphabet[uint256(uint8(data[i] >> 4))];
            str[3 + i * 2] = alphabet[uint256(uint8(data[i] & 0x0f))];
        }
        return string(str);
    }
}
```

## Error Handling & Troubleshooting

### Common Verification Issues

#### 1. Mismatched Bytecode

**Error Message:**
```
Error: Contract verification failed: Bytecode does not match
```

**Solutions:**
- Ensure you're using the exact same compiler version and settings
- Check that all imported libraries and dependencies are identical
- Verify that constructor arguments are correctly encoded
- Confirm you're verifying the correct contract file and name

#### 2. Incorrect Constructor Arguments

**Error Message:**
```
Error: Invalid constructor arguments
```

**Solutions:**
```bash
# Check constructor signature in your contract
grep -A 5 "constructor" src/YourContract.sol

# Encode arguments properly
cast abi-encode "constructor(uint256,string,address)" 1000 "MyToken" "0x1234567890123456789012345678901234567890"

# Verify encoding with cast
cast abi-decode "constructor(uint256,string,address)" 0x00000000000000000000000000000000000000000000000000000000000003e8...
```

#### 3. Network Configuration Issues

**Error Message:**
```
Error: Failed to connect to verification service
```

**Solutions:**
- Verify the correct chain ID and RPC URL
- Check internet connectivity
- Ensure the explorer API is accessible
- Try using alternative RPC endpoints

#### 4. API Key Problems

**Error Message:**
```
Error: API key required or invalid
```

**Solutions:**
- Obtain a valid API key from the Rootstock Explorer
- Ensure the API key is properly set in environment variables
- Check API key permissions and rate limits

### Verification Status Check

After initiating verification, you can check the status through:

**Rootstock Testnet Explorer:**
- Navigate to: https://explorer.testnet.rootstock.io/
- Search for your contract address
- Check the "Contract" tab for verification status

**Rootstock Mainnet Explorer:**
- Navigate to: https://explorer.rootstock.io/
- Search for your contract address
- Check the "Contract" tab for verification status

### Advanced Troubleshooting

#### Verify Locally First

Before submitting for verification, ensure your contract compiles correctly:

```bash
# Clean and rebuild
forge clean
forge build

# Check for compilation warnings
forge build --verbose

# Verify contract size
forge build --sizes
```

#### Check Bytecode Match

Compare local and deployed bytecode:

```bash
# Get deployed bytecode
cast code <CONTRACT_ADDRESS> --rpc-url $RSK_TESTNET_RPC_URL

# Compare with local compilation
forge inspect YourContract bytecode
```

## Best Practices

### 1. Consistent Development Environment

- Use the same Solidity compiler version across all environments
- Lock dependency versions in your `foundry.toml`
- Document compiler settings and optimization parameters

### 2. Automated Verification Pipeline

Create a deployment script that includes verification:

```solidity
// script/DeployAndVerify.s.sol
contract DeployAndVerifyScript is Script {
    function run() external {
        vm.startBroadcast();
        
        // Deploy contract
        YourContract contract = new YourContract(constructorArgs);
        
        vm.stopBroadcast();
        
        // Log deployment info
        console.log("Contract deployed at:", address(contract));
        console.log("Verification command:");
        console.log("forge verify-contract --chain-id 31 --verifier-url https://explorer.testnet.rootstock.io/api --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY", address(contract), "src/YourContract.sol:YourContract");
    }
}
```

### 3. Documentation and Logging

- Keep detailed logs of deployment and verification commands
- Document constructor arguments and their meanings
- Maintain a verification checklist for complex projects

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Deploy and Verify
on:
  push:
    branches: [main]

jobs:
  deploy-and-verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Foundry
        uses: foundry-rs/foundry-toolchain@v1
        
      - name: Build contracts
        run: forge build
        
      - name: Deploy to testnet
        run: |
          forge script script/Deploy.s.sol --rpc-url ${{ secrets.RSK_TESTNET_RPC_URL }} --private-key ${{ secrets.PRIVATE_KEY }} --broadcast
          
      - name: Verify contracts
        run: |
          forge verify-contract --chain-id 31 --verifier-url https://explorer.testnet.rootstock.io/api --etherscan-api-key ${{ secrets.ROOTSTOCK_EXPLORER_API_KEY }} $CONTRACT_ADDRESS src/YourContract.sol:YourContract
```

## Resources

- [Deploy Smart Contracts](/developers/smart-contracts/foundry/deploy-smart-contracts/)
- [Foundry Configuration Guide](/developers/smart-contracts/foundry/configure-foundry-rootstock/)
- [Rootstock Testnet Explorer](https://explorer.testnet.rootstock.io/)
- [Rootstock Mainnet Explorer](https://explorer.rootstock.io/)
- [Foundry Documentation](https://book.getfoundry.sh/)
- [Verify Smart Contract using Foundry and Blockscout](/developers/smart-contracts/verify-smart-contracts/foundry-blockscout/)

## Next Steps

After successfully verifying your smart contracts, consider:

1. **Setting up monitoring** for your verified contracts
2. **Implementing automated testing** for verification workflows
3. **Creating documentation** for your verified contract interfaces
4. **Exploring advanced verification features** like proxy contract verification

:::info[Credit]
This guide provides comprehensive coverage of smart contract verification on Rootstock using Foundry. For additional support or questions, join the [Rootstock Discord community](http://discord.gg/rootstock).
:::
