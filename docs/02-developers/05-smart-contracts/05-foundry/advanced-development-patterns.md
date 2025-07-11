---
sidebar_label: Foundry Verification 
sidebar_position: 3
title: Verify Smart Contract using Foundry with Blockscout and Rootstock Explorer
description: "Learn how to verify smart contracts using Foundry with both Blockscout and Rootstock Explorer on Rootstock"
tags: [guides, developers, smart contracts, rsk, rootstock, foundry, verification, blockscout, explorer]
---

This guide demonstrates how to verify smart contracts on Rootstock using Foundry with both Blockscout and Rootstock Explorer, giving developers flexibility in choosing their preferred block explorer for contract verification.

## Overview

Contract verification is essential for transparency and trust in decentralized applications. Foundry provides seamless integration with multiple block explorers on Rootstock, including:

- **Blockscout** - Open-source explorer with robust verification features
- **Rootstock Explorer** - Official Rootstock network explorer

## Prerequisites

Before verifying your contracts, ensure you have:

- A deployed smart contract on Rootstock (Testnet or Mainnet)
- Foundry installed and configured
- Contract source code and constructor arguments (if applicable)
- Optional: API keys for enhanced verification features

## Method 1: Verification with Blockscout

Blockscout provides an open-source block explorer solution with excellent contract verification support.

### Basic Blockscout Verification

You need the contract address and the contract name (as defined in your Solidity file). Run the following command:

**For Rootstock Testnet:**

```bash
forge verify-contract \
  --chain-id 31 \
  --verifier blockscout \
  --verifier-url https://rootstock-testnet.blockscout.com/api \
  "0xYourContractAddress" \
  src/YourContract.sol:YourContract
```

**For Rootstock Mainnet:**

```bash
forge verify-contract \
  --chain-id 30 \
  --verifier blockscout \
  --verifier-url https://rootstock.blockscout.com/api \
  "0xYourContractAddress" \
  src/YourContract.sol:YourContract
```

### Example Verification Output

The response should look like this:

```bash
Submitting verification for [src/YourContract.sol:YourContract] 0xYourContractAddress.
Submitted contract for verification:
      Response: `OK`
      GUID: `b390a97b95e4878626a6dbe5ef836ca1d1a0463a6806239d`
      URL: https://rootstock-testnet.blockscout.com/address/0xYourContractAddress
Contract verification status:
Response: `OK`
Details: `Pending in queue`
Contract verification status:
Response: `OK`
Details: `Pass - Verified`
Contract successfully verified
All contracts were verified!
```

### Blockscout Verification with Constructor Arguments

For contracts with constructor parameters:

```bash
forge verify-contract \
  --chain-id 31 \
  --verifier blockscout \
  --verifier-url https://rootstock-testnet.blockscout.com/api \
  --constructor-args $(cast abi-encode "constructor(uint256,string)" 1000 "MyToken") \
  "0xYourContractAddress" \
  src/YourContract.sol:YourContract
```

## Method 2: Verification with Rootstock Explorer

The official Rootstock Explorer provides native verification support with additional features and integration.

### Basic Rootstock Explorer Verification

**For Rootstock Testnet:**

```bash
forge verify-contract \
  --chain-id 31 \
  --verifier-url https://explorer.testnet.rootstock.io/api \
  --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY \
  "0xYourContractAddress" \
  src/YourContract.sol:YourContract
```

**For Rootstock Mainnet:**

```bash
forge verify-contract \
  --chain-id 30 \
  --verifier-url https://explorer.rootstock.io/api \
  --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY \
  "0xYourContractAddress" \
  src/YourContract.sol:YourContract
```

### Rootstock Explorer Verification with Constructor Arguments

```bash
forge verify-contract \
  --chain-id 31 \
  --verifier-url https://explorer.testnet.rootstock.io/api \
  --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY \
  --constructor-args $(cast abi-encode "constructor(uint256,string)" 1000 "MyToken") \
  "0xYourContractAddress" \
  src/YourContract.sol:YourContract
```

## Method 3: Automated Verification Script

Create a versatile verification script that works with both explorers:

```solidity
// script/UniversalVerify.s.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

contract UniversalVerifyScript is Script {
    enum Explorer { Blockscout, RootstockExplorer }
    
    function run() external {
        uint256 chainId = block.chainid;
        address contractAddress = vm.envAddress("CONTRACT_ADDRESS");
        Explorer explorer = Explorer(vm.envUint("EXPLORER_TYPE")); // 0 for Blockscout, 1 for Rootstock Explorer
        
        console.log("Verifying contract on chain ID:", chainId);
        console.log("Contract address:", contractAddress);
        
        if (explorer == Explorer.Blockscout) {
            _generateBlockscoutCommand(chainId, contractAddress);
        } else {
            _generateRootstockExplorerCommand(chainId, contractAddress);
        }
    }
    
    function _generateBlockscoutCommand(uint256 chainId, address contractAddress) internal view {
        string memory explorerUrl = chainId == 31 ? 
            "https://rootstock-testnet.blockscout.com/api" : 
            "https://rootstock.blockscout.com/api";
            
        console.log("=== Blockscout Verification ===");
        console.log("Command:");
        console.log(
            string(abi.encodePacked(
                "forge verify-contract --chain-id ", 
                vm.toString(chainId),
                " --verifier blockscout --verifier-url ", 
                explorerUrl,
                " ",
                vm.toString(contractAddress),
                " src/YourContract.sol:YourContract"
            ))
        );
    }
    
    function _generateRootstockExplorerCommand(uint256 chainId, address contractAddress) internal view {
        string memory explorerUrl = chainId == 31 ? 
            "https://explorer.testnet.rootstock.io/api" : 
            "https://explorer.rootstock.io/api";
            
        console.log("=== Rootstock Explorer Verification ===");
        console.log("Command:");
        console.log(
            string(abi.encodePacked(
                "forge verify-contract --chain-id ", 
                vm.toString(chainId),
                " --verifier-url ", 
                explorerUrl,
                " --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY ",
                vm.toString(contractAddress),
                " src/YourContract.sol:YourContract"
            ))
        );
    }
}
```

### Using the Universal Verification Script

```bash
# For Blockscout verification
export CONTRACT_ADDRESS=0xYourContractAddress
export EXPLORER_TYPE=0
forge script script/UniversalVerify.s.sol --rpc-url $RSK_TESTNET_RPC_URL

# For Rootstock Explorer verification
export EXPLORER_TYPE=1
forge script script/UniversalVerify.s.sol --rpc-url $RSK_TESTNET_RPC_URL
```

## Comparison: Blockscout vs Rootstock Explorer

| Feature | Blockscout | Rootstock Explorer |
|---------|------------|-------------------|
| **API Key Required** | No | Optional but recommended |
| **Verification Speed** | Fast | Fast |
| **Constructor Arg Support** | Yes | Yes |
| **Proxy Contract Support** | Yes | Yes |
| **Multi-file Contract Support** | Yes | Yes |
| **Source Code Display** | Excellent | Excellent |
| **Transaction History** | Complete | Complete |
| **Rate Limiting** | Minimal | Moderate |
| **Official Support** | Community | Rootstock Team |

## Advanced Verification Scenarios

### Verifying Proxy Contracts

For proxy implementations, verify both the proxy and implementation contracts:

```bash
# Verify the implementation contract first
forge verify-contract \
  --chain-id 31 \
  --verifier blockscout \
  --verifier-url https://rootstock-testnet.blockscout.com/api \
  "0xImplementationAddress" \
  src/Implementation.sol:Implementation

# Then verify the proxy contract
forge verify-contract \
  --chain-id 31 \
  --verifier blockscout \
  --verifier-url https://rootstock-testnet.blockscout.com/api \
  --constructor-args $(cast abi-encode "constructor(address,bytes)" "0xImplementationAddress" "0x") \
  "0xProxyAddress" \
  src/Proxy.sol:Proxy
```

### Verifying Contracts with External Libraries

For contracts using external libraries, ensure all dependencies are properly linked:

```bash
# Deploy library first (if not already deployed)
forge script script/DeployLibrary.s.sol --rpc-url $RSK_TESTNET_RPC_URL --broadcast

# Verify library
forge verify-contract \
  --chain-id 31 \
  --verifier blockscout \
  --verifier-url https://rootstock-testnet.blockscout.com/api \
  "0xLibraryAddress" \
  src/MyLibrary.sol:MyLibrary

# Verify main contract with library links
forge verify-contract \
  --chain-id 31 \
  --verifier blockscout \
  --verifier-url https://rootstock-testnet.blockscout.com/api \
  --libraries src/MyLibrary.sol:MyLibrary:0xLibraryAddress \
  "0xMainContractAddress" \
  src/MainContract.sol:MainContract
```

## Troubleshooting Common Issues

### Issue 1: Compilation Version Mismatch

**Error:** `Bytecode does not match the expected one`

**Solution:**
```bash
# Check your foundry.toml for compiler version
cat foundry.toml

# Ensure it matches your contract pragma
grep "pragma solidity" src/YourContract.sol

# Rebuild with specific version if needed
forge build --use 0.8.19
```

### Issue 2: Constructor Arguments Encoding

**Error:** `Invalid constructor arguments`

**Solution:**
```bash
# Check constructor signature
forge inspect YourContract constructor

# Test argument encoding
cast abi-encode "constructor(uint256,string,address)" 1000 "TestToken" "0x1234567890123456789012345678901234567890"

# Verify encoding
cast abi-decode "constructor(uint256,string,address)" 0x000...
```

### Issue 3: Multiple File Dependencies

**Error:** `Source code compilation failed`

**Solution:**
```bash
# Ensure all imports are resolvable
forge build --verbose

# Check for missing remappings
cat remappings.txt

# Verify all dependencies are included
tree src/
```

### Issue 4: Network Connectivity Issues

**Error:** `Failed to submit verification request`

**Solutions:**
- Check internet connectivity
- Verify explorer URL accessibility
- Try alternative RPC endpoints
- Check for rate limiting

```bash
# Test explorer connectivity
curl -I https://rootstock-testnet.blockscout.com/api

# Test with different RPC
export RSK_TESTNET_RPC_URL=https://public-node.testnet.rsk.co
```

## Best Practices

### 1. Pre-verification Checklist

Before submitting for verification:

```bash
# Clean build
forge clean && forge build

# Check for warnings
forge build --verbose 2>&1 | grep -i warning

# Verify contract size limits
forge build --sizes

# Test deployment locally
forge script script/Deploy.s.sol --fork-url $RSK_TESTNET_RPC_URL
```

### 2. Verification Automation

Create a comprehensive verification workflow:

```bash
#!/bin/bash
# verify.sh - Automated verification script

set -e

CONTRACT_ADDRESS=$1
CONTRACT_NAME=$2
EXPLORER_TYPE=${3:-"blockscout"} # default to blockscout

if [ -z "$CONTRACT_ADDRESS" ] || [ -z "$CONTRACT_NAME" ]; then
    echo "Usage: ./verify.sh <contract_address> <contract_name> [explorer_type]"
    exit 1
fi

echo "Verifying $CONTRACT_NAME at $CONTRACT_ADDRESS using $EXPLORER_TYPE"

if [ "$EXPLORER_TYPE" = "blockscout" ]; then
    forge verify-contract \
        --chain-id 31 \
        --verifier blockscout \
        --verifier-url https://rootstock-testnet.blockscout.com/api \
        "$CONTRACT_ADDRESS" \
        "src/$CONTRACT_NAME.sol:$CONTRACT_NAME"
else
    forge verify-contract \
        --chain-id 31 \
        --verifier-url https://explorer.testnet.rootstock.io/api \
        --etherscan-api-key "$ROOTSTOCK_EXPLORER_API_KEY" \
        "$CONTRACT_ADDRESS" \
        "src/$CONTRACT_NAME.sol:$CONTRACT_NAME"
fi

echo "Verification submitted successfully!"
```

### 3. Environment Management

Use environment-specific configuration:

```toml
# foundry.toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc_version = "0.8.19"
optimizer = true
optimizer_runs = 200

[profile.testnet]
chain_id = 31
eth_rpc_url = "${RSK_TESTNET_RPC_URL}"

[profile.mainnet]
chain_id = 30
eth_rpc_url = "${RSK_MAINNET_RPC_URL}"
```

## Verification Status Monitoring

### Check Verification Status

After submitting verification, monitor the status:

**Blockscout:**
- Visit: https://rootstock-testnet.blockscout.com/address/[CONTRACT_ADDRESS]
- Look for the "Contract" tab
- Check verification status and source code display

**Rootstock Explorer:**
- Visit: https://explorer.testnet.rootstock.io/address/[CONTRACT_ADDRESS]
- Navigate to the "Contract" section
- Verify source code is visible and properly formatted

### Automated Status Checking

Create a script to monitor verification status:

```bash
#!/bin/bash
# check_verification.sh

CONTRACT_ADDRESS=$1
EXPLORER_TYPE=${2:-"blockscout"}

if [ "$EXPLORER_TYPE" = "blockscout" ]; then
    URL="https://rootstock-testnet.blockscout.com/api/v2/smart-contracts/$CONTRACT_ADDRESS"
else
    URL="https://explorer.testnet.rootstock.io/api/contracts/$CONTRACT_ADDRESS/source"
fi

echo "Checking verification status for $CONTRACT_ADDRESS"
curl -s "$URL" | jq '.verified_at // .source_code // "Not verified yet"'
```

## Integration with Development Workflow

### GitHub Actions Integration

```yaml
name: Deploy and Verify Contracts
on:
  push:
    branches: [main]
    paths: ['contracts/**', 'script/**']

jobs:
  deploy-and-verify:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        explorer: [blockscout, rootstock]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Foundry
        uses: foundry-rs/foundry-toolchain@v1
        
      - name: Build contracts
        run: forge build --sizes
        
      - name: Run tests
        run: forge test -vvv
        
      - name: Deploy contracts
        run: |
          forge script script/Deploy.s.sol \
            --rpc-url ${{ secrets.RSK_TESTNET_RPC_URL }} \
            --private-key ${{ secrets.PRIVATE_KEY }} \
            --broadcast
            
      - name: Verify with Blockscout
        if: matrix.explorer == 'blockscout'
        run: |
          forge verify-contract \
            --chain-id 31 \
            --verifier blockscout \
            --verifier-url https://rootstock-testnet.blockscout.com/api \
            ${{ env.CONTRACT_ADDRESS }} \
            src/MyContract.sol:MyContract
            
      - name: Verify with Rootstock Explorer
        if: matrix.explorer == 'rootstock'
        run: |
          forge verify-contract \
            --chain-id 31 \
            --verifier-url https://explorer.testnet.rootstock.io/api \
            --etherscan-api-key ${{ secrets.ROOTSTOCK_EXPLORER_API_KEY }} \
            ${{ env.CONTRACT_ADDRESS }} \
            src/MyContract.sol:MyContract
```

## Resources

- [Foundry Book - Contract Verification](https://book.getfoundry.sh/reference/forge/forge-verify-contract)
- [Deploy Smart Contracts with Foundry](/developers/smart-contracts/foundry/deploy-smart-contracts/)
- [Rootstock Testnet Blockscout](https://rootstock-testnet.blockscout.com/)
- [Rootstock Mainnet Blockscout](https://rootstock.blockscout.com/)
- [Rootstock Testnet Explorer](https://explorer.testnet.rootstock.io/)
- [Rootstock Mainnet Explorer](https://explorer.rootstock.io/)
- [Verify a Smart Contract using the Hardhat Verification Plugin](/developers/smart-contracts/verify-smart-contracts/hardhat-verify-plugin/)

## Next Steps

After successful verification:

1. **Test contract interactions** through the explorer interfaces
2. **Set up monitoring** for your verified contracts
3. **Document verification procedures** for your team
4. **Consider proxy pattern verification** for upgradeable contracts
5. **Implement automated verification** in your CI/CD pipeline

:::info[Credit]

This enhanced guide provides comprehensive coverage of smart contract verification on Rootstock using Foundry with multiple explorer options. This documentation was created to address GitHub issue #308 and provides developers with flexible verification options for the Rootstock ecosystem.

:::
