# Verify Smart Contracts Using Foundry Script on Rootstock

---
**Location**: `docs/02-developers/05-smart-contracts/05-foundry/verify-smart-contracts.md`
**Sidebar Position**: 106
**Tags**: [guides, developers, smart contracts, rsk, rootstock, foundry, verification, explorer]
---

## Overview

Smart contract verification on Rootstock using Foundry provides developers with a streamlined, automated approach to make deployed contracts transparent and trustworthy. This comprehensive guide covers both command-line verification and automated script-based verification using the Rootstock Explorer API, ensuring your contracts are properly verified for community trust and interaction.

## Prerequisites

Before proceeding with verification, ensure you have completed the foundational setup:

- **Foundry Installation & Configuration**: Follow the complete setup guide at [Configure Foundry for Rootstock](/developers/smart-contracts/foundry/configure-foundry-rootstock/)
- **Deployed Smart Contract**: Your contract must be successfully deployed on Rootstock. See [Deploy Smart Contracts](/developers/smart-contracts/foundry/deploy-smart-contracts/) for deployment instructions
- **Contract Source Code**: Access to the exact source code used for deployment
- **Constructor Arguments**: Documentation of all constructor parameters used during deployment
- **Environment Setup**: Properly configured `.env` file with necessary API keys and RPC URLs

> **Important**: This guide assumes familiarity with Foundry basics. For foundational knowledge, review the [Foundry Project Creation](/developers/smart-contracts/foundry/create-foundry-project/) and [Smart Contract Development](/developers/smart-contracts/foundry/smart-contracts/) guides.

## Environment Configuration

### Required Environment Variables

Create or update your `.env` file with the following variables:

```bash
# Network Configuration
RSK_TESTNET_RPC_URL=https://public-node.testnet.rsk.co
RSK_MAINNET_RPC_URL=https://public-node.rsk.co

# API Keys for Verification
ROOTSTOCK_EXPLORER_API_KEY=your_rootstock_explorer_api_key
BLOCKSCOUT_API_KEY=your_blockscout_api_key

# Security (Never commit these!)
PRIVATE_KEY=0x...
MNEMONIC="your twelve word mnemonic phrase here"

# Contract Deployment Addresses
CONTRACT_ADDRESS=0x...
CONSTRUCTOR_ARG_1=1000
CONSTRUCTOR_ARG_2="InitialTokenName"
CONSTRUCTOR_ARG_3=0x742d35Cc6634C0532925a3b8D85ac5b5c3b42F96
```

### Foundry Configuration

Ensure your `foundry.toml` includes proper verification settings:

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc_version = "0.8.24"
optimizer = true
optimizer_runs = 200
evm_version = "london"

[rpc_endpoints]
rskTestnet = "${RSK_TESTNET_RPC_URL}"
rskMainnet = "${RSK_MAINNET_RPC_URL}"

[etherscan]
rskTestnet = { key = "${ROOTSTOCK_EXPLORER_API_KEY}", url = "https://explorer.testnet.rootstock.io/api" }
rskMainnet = { key = "${ROOTSTOCK_EXPLORER_API_KEY}", url = "https://explorer.rootstock.io/api" }
```

## Method 1: Direct Command-Line Verification

### Basic Verification (No Constructor Arguments)

For contracts without constructor arguments:

```bash
# Rootstock Testnet
forge verify-contract \
  --chain-id 31 \
  --verifier-url https://explorer.testnet.rootstock.io/api \
  --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY \
  <CONTRACT_ADDRESS> \
  src/YourContract.sol:YourContract

# Rootstock Mainnet
forge verify-contract \
  --chain-id 30 \
  --verifier-url https://explorer.rootstock.io/api \
  --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY \
  <CONTRACT_ADDRESS> \
  src/YourContract.sol:YourContract
```

### Advanced Verification with Constructor Arguments

For contracts with constructor parameters, proper encoding is crucial:

#### Single Parameter Examples

```bash
# uint256 parameter
forge verify-contract \
  --chain-id 31 \
  --verifier-url https://explorer.testnet.rootstock.io/api \
  --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY \
  --constructor-args $(cast abi-encode "constructor(uint256)" 1000) \
  <CONTRACT_ADDRESS> \
  src/TokenContract.sol:TokenContract

# string parameter
forge verify-contract \
  --chain-id 31 \
  --verifier-url https://explorer.testnet.rootstock.io/api \
  --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY \
  --constructor-args $(cast abi-encode "constructor(string)" "MyToken") \
  <CONTRACT_ADDRESS> \
  src/TokenContract.sol:TokenContract

# address parameter
forge verify-contract \
  --chain-id 31 \
  --verifier-url https://explorer.testnet.rootstock.io/api \
  --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY \
  --constructor-args $(cast abi-encode "constructor(address)" "0x742d35Cc6634C0532925a3b8D85ac5b5c3b42F96") \
  <CONTRACT_ADDRESS> \
  src/TokenContract.sol:TokenContract
```

#### Multiple Parameters

```bash
# Multiple parameters of different types
forge verify-contract \
  --chain-id 31 \
  --verifier-url https://explorer.testnet.rootstock.io/api \
  --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY \
  --constructor-args $(cast abi-encode "constructor(uint256,string,address)" 1000 "MyToken" "0x742d35Cc6634C0532925a3b8D85ac5b5c3b42F96") \
  <CONTRACT_ADDRESS> \
  src/ComplexContract.sol:ComplexContract
```

#### Array and Struct Parameters

```bash
# Array parameter
cast abi-encode "constructor(uint256[])" "[1,2,3,4,5]"

# Struct parameter (encoded as tuple)
cast abi-encode "constructor((uint256,address,string))" "(1000,0x742d35Cc6634C0532925a3b8D85ac5b5c3b42F96,\"TokenName\")"
```

## Method 2: Automated Verification Scripts

### Basic Verification Script

Create `script/Verify.s.sol`:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

contract VerifyScript is Script {
    function run() external {
        // Environment variable validation
        require(vm.envExists("CONTRACT_ADDRESS"), "CONTRACT_ADDRESS not set");
        
        // Get contract details from environment
        address contractAddress = vm.envAddress("CONTRACT_ADDRESS");
        uint256 chainId = block.chainid;
        
        console.log("=== Contract Verification Details ===");
        console.log("Contract Address:", contractAddress);
        console.log("Chain ID:", chainId);
        
        // Determine explorer URL and network name
        string memory explorerUrl;
        string memory networkName;
        
        if (chainId == 31) {
            explorerUrl = "https://explorer.testnet.rootstock.io/api";
            networkName = "Rootstock Testnet";
        } else if (chainId == 30) {
            explorerUrl = "https://explorer.rootstock.io/api";
            networkName = "Rootstock Mainnet";
        } else {
            revert("Unsupported chain ID. Use 30 (Mainnet) or 31 (Testnet)");
        }
        
        console.log("Network:", networkName);
        console.log("Explorer URL:", explorerUrl);
        console.log("");
        
        // Generate verification command
        console.log("=== Verification Command ===");
        console.log("Copy and run the following command:");
        console.log("");
        
        // Check for constructor arguments
        if (vm.envExists("CONSTRUCTOR_ARG_1")) {
            _generateVerificationWithArgs(chainId, explorerUrl, contractAddress);
        } else {
            _generateBasicVerification(chainId, explorerUrl, contractAddress);
        }
    }
    
    function _generateBasicVerification(
        uint256 chainId,
        string memory explorerUrl,
        address contractAddress
    ) private view {
        console.log(
            string(abi.encodePacked(
                "forge verify-contract \\",
                "\n  --chain-id ", vm.toString(chainId), " \\",
                "\n  --verifier-url ", explorerUrl, " \\",
                "\n  --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY \\",
                "\n  ", vm.toString(contractAddress), " \\",
                "\n  src/YourContract.sol:YourContract"
            ))
        );
    }
    
    function _generateVerificationWithArgs(
        uint256 chainId,
        string memory explorerUrl,
        address contractAddress
    ) private view {
        uint256 arg1 = vm.envUint("CONSTRUCTOR_ARG_1");
        string memory arg2 = vm.envExists("CONSTRUCTOR_ARG_2") ? vm.envString("CONSTRUCTOR_ARG_2") : "";
        address arg3 = vm.envExists("CONSTRUCTOR_ARG_3") ? vm.envAddress("CONSTRUCTOR_ARG_3") : address(0);
        
        console.log("Constructor Arguments Found:");
        console.log("  Arg 1 (uint256):", arg1);
        if (bytes(arg2).length > 0) console.log("  Arg 2 (string):", arg2);
        if (arg3 != address(0)) console.log("  Arg 3 (address):", arg3);
        console.log("");
        
        // Generate appropriate cast command based on available arguments
        string memory castCommand;
        if (arg3 != address(0)) {
            castCommand = string(abi.encodePacked(
                "$(cast abi-encode \"constructor(uint256,string,address)\" ",
                vm.toString(arg1), " \"", arg2, "\" \"", vm.toString(arg3), "\")"
            ));
        } else if (bytes(arg2).length > 0) {
            castCommand = string(abi.encodePacked(
                "$(cast abi-encode \"constructor(uint256,string)\" ",
                vm.toString(arg1), " \"", arg2, "\")"
            ));
        } else {
            castCommand = string(abi.encodePacked(
                "$(cast abi-encode \"constructor(uint256)\" ",
                vm.toString(arg1), ")"
            ));
        }
        
        console.log(
            string(abi.encodePacked(
                "forge verify-contract \\",
                "\n  --chain-id ", vm.toString(chainId), " \\",
                "\n  --verifier-url ", explorerUrl, " \\",
                "\n  --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY \\",
                "\n  --constructor-args ", castCommand, " \\",
                "\n  ", vm.toString(contractAddress), " \\",
                "\n  src/YourContract.sol:YourContract"
            ))
        );
    }
}
```

### Execute the Verification Script

```bash
# Set required environment variables
export CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
export CONSTRUCTOR_ARG_1=1000
export CONSTRUCTOR_ARG_2="InitialTokenName"

# Run the verification script
forge script script/Verify.s.sol --rpc-url $RSK_TESTNET_RPC_URL
```

### Advanced Multi-Contract Verification Script

Create `script/BatchVerify.s.sol` for projects with multiple contracts:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

contract BatchVerifyScript is Script {
    struct ContractInfo {
        address contractAddress;
        string contractPath;
        string contractName;
        string constructorSignature;
        string constructorArgs;
    }
    
    function run() external {
        uint256 chainId = block.chainid;
        string memory explorerUrl = chainId == 31 
            ? "https://explorer.testnet.rootstock.io/api"
            : "https://explorer.rootstock.io/api";
        
        // Define contracts to verify
        ContractInfo[] memory contracts = new ContractInfo[](3);
        
        contracts[0] = ContractInfo({
            contractAddress: vm.envAddress("TOKEN_CONTRACT"),
            contractPath: "src/Token.sol",
            contractName: "Token",
            constructorSignature: "constructor(uint256,string)",
            constructorArgs: "1000 \"MyToken\""
        });
        
        contracts[1] = ContractInfo({
            contractAddress: vm.envAddress("VAULT_CONTRACT"),
            contractPath: "src/Vault.sol",
            contractName: "Vault",
            constructorSignature: "constructor(address)",
            constructorArgs: string(abi.encodePacked("\"", vm.toString(vm.envAddress("TOKEN_CONTRACT")), "\""))
        });
        
        contracts[2] = ContractInfo({
            contractAddress: vm.envAddress("FACTORY_CONTRACT"),
            contractPath: "src/Factory.sol",
            contractName: "Factory",
            constructorSignature: "",
            constructorArgs: ""
        });
        
        console.log("=== Batch Verification Commands ===");
        console.log("Chain ID:", chainId);
        console.log("Explorer URL:", explorerUrl);
        console.log("");
        
        for (uint i = 0; i < contracts.length; i++) {
            _generateVerificationCommand(contracts[i], chainId, explorerUrl);
            console.log("");
        }
    }
    
    function _generateVerificationCommand(
        ContractInfo memory contractInfo,
        uint256 chainId,
        string memory explorerUrl
    ) private view {
        console.log(string(abi.encodePacked("Contract: ", contractInfo.contractName)));
        console.log(string(abi.encodePacked("Address: ", vm.toString(contractInfo.contractAddress))));
        
        string memory baseCommand = string(abi.encodePacked(
            "forge verify-contract \\",
            "\n  --chain-id ", vm.toString(chainId), " \\",
            "\n  --verifier-url ", explorerUrl, " \\",
            "\n  --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY"
        ));
        
        if (bytes(contractInfo.constructorSignature).length > 0) {
            string memory constructorCmd = string(abi.encodePacked(
                " \\",
                "\n  --constructor-args $(cast abi-encode \"", 
                contractInfo.constructorSignature, 
                "\" ", 
                contractInfo.constructorArgs, 
                ")"
            ));
            baseCommand = string(abi.encodePacked(baseCommand, constructorCmd));
        }
        
        string memory finalCommand = string(abi.encodePacked(
            baseCommand,
            " \\",
            "\n  ", vm.toString(contractInfo.contractAddress), " \\",
            "\n  ", contractInfo.contractPath, ":", contractInfo.contractName
        ));
        
        console.log(finalCommand);
    }
}
```

## Error Handling & Troubleshooting

### Common Verification Issues

#### 1. Bytecode Mismatch

**Error**: "Bytecode does not match"

**Solutions**:
- Ensure identical compiler version and settings
- Verify optimizer settings match deployment configuration
- Check that source code is exactly as deployed
- Confirm all imports and dependencies are identical

```bash
# Check compiler version
forge --version

# Verify compilation matches deployment
forge build --force
```

#### 2. Constructor Argument Encoding

**Error**: "Constructor arguments verification failed"

**Solutions**:
- Double-check argument types and order
- Use proper encoding for complex types
- Verify argument values match deployment

```bash
# Debug constructor encoding
cast abi-encode "constructor(uint256,string)" 1000 "TestToken" --verbose
```

#### 3. Network Configuration Issues

**Error**: "Invalid chain ID" or "Network not supported"

**Solutions**:
- Verify correct chain ID (30 for mainnet, 31 for testnet)
- Check RPC URL configuration
- Confirm API key validity

#### 4. API Rate Limits

**Error**: "Rate limit exceeded"

**Solutions**:
- Implement delays between verification attempts
- Use different API keys for different environments
- Consider using Blockscout as alternative: [Verify with Foundry and Blockscout](/developers/smart-contracts/verify-smart-contracts/foundry-blockscout/)

### Verification Status Monitoring

Create a status checking script `script/CheckVerification.s.sol`:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

contract CheckVerificationScript is Script {
    function run() external {
        address contractAddress = vm.envAddress("CONTRACT_ADDRESS");
        uint256 chainId = block.chainid;
        
        string memory explorerUrl;
        if (chainId == 31) {
            explorerUrl = "https://explorer.testnet.rootstock.io/address/";
        } else if (chainId == 30) {
            explorerUrl = "https://explorer.rootstock.io/address/";
        }
        
        console.log("=== Verification Status Check ===");
        console.log("Contract Address:", contractAddress);
        console.log("Explorer URL:", string(abi.encodePacked(explorerUrl, vm.toString(contractAddress))));
        console.log("");
        console.log("Visit the URL above to check verification status");
        console.log("Look for 'Contract' tab to confirm source code is visible");
    }
}
```

## Integration with CI/CD

### GitHub Actions Workflow

Create `.github/workflows/verify-contracts.yml`:

```yaml
name: Deploy and Verify Contracts

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  FOUNDRY_PROFILE: ci

jobs:
  verify-contracts:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive

      - name: Install Foundry
        uses: foundry-rs/foundry-toolchain@v1
        with:
          version: nightly

      - name: Install dependencies
        run: forge install

      - name: Compile contracts
        run: forge build --sizes

      - name: Run tests
        run: forge test -vvv

      - name: Deploy to testnet
        if: github.ref == 'refs/heads/main'
        run: |
          forge script script/Deploy.s.sol \
            --rpc-url ${{ secrets.RSK_TESTNET_RPC_URL }} \
            --private-key ${{ secrets.PRIVATE_KEY }} \
            --broadcast \
            --verify \
            --etherscan-api-key ${{ secrets.ROOTSTOCK_EXPLORER_API_KEY }}

      - name: Generate verification commands
        if: github.ref == 'refs/heads/main'
        run: |
          forge script script/Verify.s.sol \
            --rpc-url ${{ secrets.RSK_TESTNET_RPC_URL }}
        env:
          CONTRACT_ADDRESS: ${{ env.DEPLOYED_CONTRACT_ADDRESS }}
```

## Best Practices for Production

### 1. Comprehensive Testing Before Verification

```bash
# Complete testing pipeline
forge test --gas-report
forge coverage
forge snapshot
```

### 2. Consistent Development Environment

- Lock compiler versions in `foundry.toml`
- Document all optimization settings
- Use identical configurations across environments

### 3. Automated Verification Pipeline

Integrate verification into deployment scripts:

```solidity
// script/DeployAndVerify.s.sol
contract DeployAndVerifyScript is Script {
    function run() external {
        vm.startBroadcast();
        
        // Deploy contract
        YourContract deployedContract = new YourContract(constructorArgs);
        
        vm.stopBroadcast();
        
        // Log deployment details
        console.log("Contract deployed at:", address(deployedContract));
        console.log("Transaction hash:", vm.getDeployedCode(address(deployedContract)));
        
        // Generate verification command
        console.log("\nVerification Command:");
        console.log("forge verify-contract --chain-id 31 --verifier-url https://explorer.testnet.rootstock.io/api --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY", address(deployedContract), "src/YourContract.sol:YourContract");
    }
}
```

### 4. Security Considerations

- Never commit private keys or API keys
- Use environment variables for sensitive data
- Implement proper access controls for verification scripts
- Regular API key rotation

## Additional Resources

- **Foundry Configuration**: [Configure Foundry for Rootstock](/developers/smart-contracts/foundry/configure-foundry-rootstock/)
- **Contract Deployment**: [Deploy Smart Contracts](/developers/smart-contracts/foundry/deploy-smart-contracts/)
- **Alternative Verification**: [Verify with Foundry and Blockscout](/developers/smart-contracts/verify-smart-contracts/foundry-blockscout/)
- **Hardhat Verification**: [Verify Smart Contract using Hardhat](/developers/smart-contracts/verify-smart-contracts/hardhat-verify-plugin/)
- **Foundry Official Documentation**: [Foundry Book](https://book.getfoundry.sh/)
- **Rootstock Testnet Explorer**: [https://explorer.testnet.rootstock.io/](https://explorer.testnet.rootstock.io/)
- **Rootstock Mainnet Explorer**: [https://explorer.rootstock.io/](https://explorer.rootstock.io/)

## Next Steps

After successfully verifying your smart contracts:

1. **Monitor Contract Performance**: Set up monitoring for verified contracts
2. **Implement Automated Testing**: Create continuous verification workflows
3. **Document Contract Interfaces**: Generate comprehensive API documentation
4. **Community Engagement**: Share verified contracts for community review and interaction
5. **Security Audits**: Consider professional security audits for production contracts

**Important**: Always test verification on Rootstock Testnet before attempting mainnet verification to avoid API key rate limits and ensure proper configuration.
