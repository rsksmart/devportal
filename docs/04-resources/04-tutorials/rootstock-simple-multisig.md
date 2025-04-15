---
sidebar_position: 8
title: Build a Simple MultiSig Contract on Rootstock with Foundry
sidebar_label: Build a Simple MultiSig on Rootstock
description: "A developer's guide to building a basic MultiSig smart contract for Rootstock using Foundry."
tags: [knowledge-base, rootstock, smart contracts, foundry]
---


This is a step-by-step guide demonstrating how to build and deploy a simple multisignature wallet smart contract to Rootstock using the Foundry toolchain.

## What is a Multisignature Wallet?
A multisignature wallet, usually referred to as MultiSig is a smart contract vault with several registered owner accounts, that holds assets and only transfers them when a required number of owners confirm the transfer. In this guide you'll be building a simple MultiSig with 3 owners, and 2/3 confirmations required to transfer assets, and deploying it to the Rootstock testnet.

## 1. Knowledge Prerequisites

You will be able to follow this guide comfortably, if you have basic familiarity with the following:
- EVM-compatible blockchains and Solidity smart contracts
- Command line (CLI) tools

## 2. Install Foundry

First, install Foundryup - the Foundry toolchain installer. Run the following command and follow the instructions:

```bash
curl -L https://foundry.paradigm.xyz | bash
```
:::note[Windows Users]
If you’re using Windows, you’ll need to install and use [Git BASH](https://gitforwindows.org/) or [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) as your terminal, since Foundryup currently doesn’t support Powershell or Command Prompt (Cmd).
:::

Then run `foundryup` to install precompiled binaries: `forge`, `cast`, `anvil`, and `chisel`.

> Visit the [Foundry installation guides](https://book.getfoundry.sh/getting-started/installation) for more information.

## 3. Create a Foundry Project

To start a new project with Foundry, use [forge init](https://book.getfoundry.sh/reference/forge/forge-init.html).

```bash
forge init multisig
```
This creates a new directory named multisig with the necessary project structure.

## 4. Create Wallets

Generate three wallets to serve as owners of your multisig contract - run the [cast wallet](https://book.getfoundry.sh/reference/cast/cast-wallet) command three times:

```bash
cast wallet new
```

Example output:
```bash
Successfully created new keypair.
Address:     0xd8B4AdfDe4cEc573dF4132a17E23CDDd35d24770
Private key: 0x031e2059090830ffb44e87cae53c530d5288a37fb5d47777e1c1dfb8fc5640c9
```

Save each address and private key securely.

Next, visit the [Rootstock faucet](https://faucet.rootstock.io/), and request test tokens for each address. You will get 0.0005 test RBTC per wallet.

Verify the balances in the [Rootstock explorer](https://explorer.testnet.rootstock.io/).

## 5. Configure Environment

First, obtain your personal Rootstock RPC URL. Go to the [RPC API DASHBOARD](https://rpc.rootstock.io/), create an account there and get your testnet RPC URL, which consists of the base URL and your API key.

Once you have it, create an `.env` file in the root of the foundry project and specify the RPC URL and the wallet private keys there . 

```bash
ROOTSTOCK_RPC_URL=https://rpc.testnet.rootstock.io/{YOUR_APIKEY}
PRIVATE_KEY_1=0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
PRIVATE_KEY_2=0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
PRIVATE_KEY_3=0xcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
```
:::info[Info]
Private keys have to be formatted correctly - starting with `0x`. Some wallets may omit this prefix, so be sure to add it if needed.
:::

Finally, load your environment variables:

```bash
source .env
```

## 6. Add Smart Contract Code

Let’s take a look at the default Foundry project structure:

```bash
$ cd multisig
$ tree . -d -L 1
.
├── lib
├── script
├── src
└── test

4 directories
```

Foundry includes a demo smart contract Counter.sol, its test file Counter.t.sol, and a deploy script Counter.s.sol in:

- `script/Counter.s.sol`
- `src/Counter.sol`
- `test/Counter.t.sol`

You’ll replace all three with your own MultiSig smart contract and related scripts.

First, replace `src/Counter.sol` with `src/MultiSig.sol` and paste in the following MultiSig contract code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract MultiSig {
    address[3] public owners;
    uint public transactionCount;
    uint public required;

    struct Transaction {
        address payable destination;
        uint value;
        bool executed;
        bytes data;
    }

    mapping(uint => Transaction) public transactions;
    mapping(uint => mapping(address => bool)) public confirmations;

    receive() payable external {
        
    }
    
    constructor(address[3] memory _owners, uint _confirmations) payable {
        require(_owners.length > 0);
        require(_confirmations > 0);
        require(_confirmations <= _owners.length);
        owners = _owners;
        required = _confirmations;
    }

    function executeTransaction(uint transactionId) public {
        require(isConfirmed(transactionId));
        Transaction storage _tx = transactions[transactionId];
        (bool success, ) = _tx.destination.call{ value: _tx.value }(_tx.data);
        require(success);
        _tx.executed = true;
    }

    function isConfirmed(uint transactionId) public view returns(bool) {
        return getConfirmationsCount(transactionId) >= required;
    }

    function getConfirmationsCount(uint transactionId) public view returns(uint) {
        uint count;
        for(uint i = 0; i < owners.length; i++) {
            if(confirmations[transactionId][owners[i]]) {
                count++;
            }
        }
        return count;
    }

    function isOwner(address addr) private view returns(bool) {
        for(uint i = 0; i < owners.length; i++) {
            if(owners[i] == addr) {
                return true;
            }
        }
        return false;
    }

    function submitTransaction(address payable dest, uint value,bytes calldata data) external {
        uint id = addTransaction(dest, value,data);
        confirmTransaction(id);
    }

    function confirmTransaction(uint transactionId) public {
        require(isOwner(msg.sender));
        confirmations[transactionId][msg.sender] = true;
        if(isConfirmed(transactionId)) {
            executeTransaction(transactionId);
        }
    }

    function addTransaction(address payable destination, uint value,bytes calldata data) public returns(uint) {
        transactions[transactionCount] = Transaction(destination, value, false,data);
        transactionCount += 1;
        return transactionCount - 1;
    }

}
```

### How the MultiSig Works
- Accepts funds via the `receive()` function.

- `submitTransaction()` – an owner proposes a transaction (destination, value, optional data) and auto-confirms it.

- `confirmTransaction()` – other owners confirm the transaction by ID.

- `executeTransaction()` – called automatically once enough confirmations are collected; sends the funds and/or calls the target contract.

- Owners and required confirmations are set at deployment.

- Contract tracks confirmations per transaction and only allows execution after threshold is met.

### Limitations

- Unconfirmed transactions cannot be cancelled and never expire.
- There is no convenient way to query pending transactions.
- There is no way to transfer or revoke ownership.

These are all features expected of a production-grade MultiSig, but are intentionally omitted here for simplicity.

## 7. Add Test and Deployment Scripts

### Test Script
A test script is not mandatory but is considered a good practice. Though this guide does not focus on test coverage at all, below is a basic test you can use.

Replace `test/Counter.t.sol` with `test/MultiSig.t.sol`and insert the following test code:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/MultiSig.sol";

contract MultiSigTest is Test {
    MultiSig public multisig;

    address owner1 = address(0x1);
    address owner2 = address(0x2);
    address owner3 = address(0x3);

    function setUp() public {
        // Declare the owners array and assign the addresses
        address[3] memory owners;
        owners[0] = owner1;
        owners[1] = owner2;
        owners[2] = owner3;

        // Deploy the MultiSig contract with 2 required confirmations
        multisig = new MultiSig(owners, 2);
    }

    function testMultiSigDeployment() public view {
        // Assert that the multisig address is not the zero address
        assertTrue(address(multisig) != address(0), "MultiSig contract is not deployed correctly");

        // Add further tests based on the MultiSig contract functionality
    }

}
```
> If you do not want to use the test script, just delete `test/Counter.t.sol`.

### Deployment Script
Deploy script, on the other hand, is required to proceed with the next steps of the guide.

Replace `script/Counter.t.sol` with `script/MultiSig.t.sol` and paste the following deployment code, replacing the addresses in the owners array with your three wallet addresses:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {MultiSig} from "../src/MultiSig.sol";

contract DeployMultiSig is Script {
    function run() external {
        // Declare the owners array
        address[3] memory owners;  // Declaring an array of size 3
        owners[0] = 0x1111111111111111111111111111111111111111;
        owners[1] = 0x2222222222222222222222222222222222222222;
        owners[2] = 0x3333333333333333333333333333333333333333;

        uint requiredConfirmations = 2;

        vm.startBroadcast();

        MultiSig wallet = new MultiSig{value: 0.0001 ether}(owners, requiredConfirmations);

        vm.stopBroadcast();

        console.log("Deploying MultiSig at:", address(wallet));
    }
}
```

> Note: This script is configured to send a small amount of the deploying account's test RBTC (specified in `value`) to the multisig during deployment. You can adjust the value as needed.


## 8. Compile and (Optionally) Test the Contract
To build the contract, run the [forge build](https://book.getfoundry.sh/reference/forge/forge-build) command in the project's root directory:

```bash
forge build
```

This will compile your smart contract and create `out` directory with the deliverables:

```bash
[⠊] Compiling...
[⠒] Compiling 22 files with Solc 0.8.28
[⠑] Solc 0.8.28 finished in 519.23ms
Compiler run successful!
```

(Optional) To run the test script, run the following command in the project's root directory:

```shell
forge test
```

This will run the test script and display the results in the terminal:
```shell
[⠊] Compiling...
No files changed, compilation skipped

Ran 1 test for test/MultiSig.t.sol:MultiSigTest
[PASS] testMultiSigDeployment() (gas: 5823)
Suite result: ok. 1 passed; 0 failed; 0 skipped; finished in 5.25ms (736.80µs CPU time)

Ran 1 test suite in 8.61ms (5.25ms CPU time): 1 tests passed, 0 failed, 0 skipped (1 total tests)
```

## Deploy the MultiSig to Rootstock Testnet

Use the [forge script](https://book.getfoundry.sh/reference/forge/forge-script) command to deploy the MultiSig. Any owner private key can be used for deployment — just ensure it has enough RBTC for gas and initial funding (see [step 7](#deployment-script) above).

```bash
forge script DeployMultiSig --rpc-url $ROOTSTOCK_RPC_URL --private-key $PRIVATE_KEY_1 --broadcast --legacy --evm-version london
```
:::info[Info]
Currently Foundry requires [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) transaction receipts, but EIP-1559 is not supported on Rootstock. This causes deserialization errors to show up in terminal for any transactions, however on-chain execution still works as expected as long as the '--legacy' '--evm-version london' flags are used in the command.

Use the [Rootstock explorer](https://explorer.testnet.rootstock.io/) to verify transactions and contract addresses.

More details in [this Foundry issue](https://github.com/foundry-rs/foundry/issues/7640).
:::

The deploy script will display the deployed MultiSig address, assuming you use the one provided above.


## Interact with the MultiSig

Use the following command to check the Multisig balance:

```
cast balance <multisig_address> --rpc-url $ROOTSTOCK_RPC_URL
```

This gives the balance in wei, the smallest unit of ETH, and by extension, RBTC.

To try out the MultiSig in action, submit and confirm a transaction.

The [cast send](https://book.getfoundry.sh/reference/cast/cast-send) commands below take some funds from the MultiSig balance with the approval of Owner 1 and Owner 2 and send them to Owner 3.

This submits the transaction and auto-confirms it by Owner 1.
```
cast send <multisig_address> "submitTransaction(address,uint256,bytes)" <owner3_address> <amount_in_wei> 0x --rpc-url $ROOTSTOCK_RPC_URL --private-key $PRIVATE_KEY_1 --legacy
```
This confirms the transaction by Owner 2.
```
cast send <multisig_address> "confirmTransaction(uint256)" 0 --rpc-url $ROOTSTOCK_RPC_URL --private-key $PRIVATE_KEY_2 --legacy
```
> Note 1: You have to use two different owner keys because this Multisig requires two confirmations from two different owners.
> Note 2: The `0` in the second command is the transaction ID within the multisig. If you have more than one pending transaction, adjust as needed.

Once executed, verify the transactions and the successful asset transfer in the [Rootstock explorer](https://explorer.testnet.rootstock.io/).


## Troubleshooting

- As stated above, there is a known conflict between Foundry requiring [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) transaction receipts, and Rootstock not supporting EIP-1559. Transaction execution is not affected by this conflict. Refer to [this Foundry issue](https://github.com/foundry-rs/foundry/issues/7640) for more information.
- The [Foundry Book Troubleshooting section](https://book.getfoundry.sh/forge/deploying?highlight=troubleshooting#troubleshooting) is a good start for most other Foundry errors.
- If you are having issues with environment variables like `$ROOTSTOCK_RPC_URL` and `$PRIVATE_KEY_1` being recognized, run `source .env` in the project root again.



