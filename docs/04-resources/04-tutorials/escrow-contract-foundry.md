---
sidebar_position: 8
title: Deploying a Double Deposit Escrow Smart Contract with Foundry
sidebar_label: Deploy an Escrow Contract with Foundry
description: "A step-by-step guide to build and deploy an escrow contract on Rootstock testnet"
tags: [ Resources, rsk, rootstock, smart contracts, foundry ]
---

This article provides a step-by-step guide to create, compile, and deploy a double deposit Escrow Smart Contract on the
Rootstock testnet.

Along the way, you’ll gain experience working with contracts that involve **multiple wallets**,
and you’ll learn how to use **environment variables** to customize contract behavior—such as setting deposit and payment
amounts—without modifying the contract code directly.

:::info[Info]
If you’re new to Foundry or smart contract workflows, consider reviewing
our [Foundry quickstart](/docs/02-developers/04-quickstart/foundry.md)
or this Foundry [introductory guide](/docs/02-developers/05-smart-contracts/05-foundry/index.md) to smart contract
development first.
:::

## What is a Double Deposit Escrow Contract?

A double deposit escrow is a smart contract that holds funds from both buyer and seller until certain conditions are
met. Each party deposits a set amount, and once the buyer approves the transaction, the contract automatically releases
payment to the seller and returns any excess to the buyer, without needing a third party.

For example, in a freelance project, both client and freelancer deposit funds. When the work is approved, the contract
pays the freelancer and refunds the client’s remaining deposit.

## Prerequisites

To follow this guide, you will need the following:

- [Foundry](https://book.getfoundry.sh/) for writing, testing, and deploying smart contracts.
  Follow [our guide](/docs/02-developers/05-smart-contracts/05-foundry/create-foundry-project.md#installation) to
  install it.
- If you’re using Windows, install and use [Git Bash](https://gitforwindows.org/)
  or [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) as your terminal, since Foundry currently doesn’t
  support Powershell or Command Prompt.
- Basic knowledge of Solidity.
- Basic experience with command-line tools.

## 1. Create a Foundry Project

Open a terminal and navigate to the directory where you want to place your project.
Use [`forge init`](https://book.getfoundry.sh/reference/forge/forge-init.html) to create a new project:

```bash
forge init escrow
```

This command creates a new directory called "escrow" with foundry's default structure.
To confirm that the project has been created correctly check the project's file structure by running the following
commands:

```bash
$ cd escrow
$ tree . -d -L 1
.
├── lib
├── script
├── src
└── test

4 directories
```

> Consult the Foundry guide for more details on how
> to [create a new project](https://book.getfoundry.sh/projects/creating-a-new-project).

## 2. Create Wallets

Create two test wallets to simulate an escrow interaction:

- **Buyer Wallet**. For the party sending funds into the escrow.
- **Seller Wallet**. For the party receiving the funds once the conditions are met.

You can generate the two wallets using Foundry’s [`cast`](https://book.getfoundry.sh/reference/cast/) tool:

```bash
cast wallet new -n 2
```

You’ll receive output similar to the following:

```
Successfully created new keypair.
Address:     0xAbCDEF1234567890abcdef1234567890ABCDEF12
Private key: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
Successfully created new keypair.
Address:     0xAbCDEF1234567890abcdef1234567890ABCDEF12
Private key: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

Store both wallets’ information safely. You will need it to [configure your environment](#3-configure-your-environment).

### Add test RBTC to wallets

Before deploying or interacting with your contract, both wallets need a small amount of test RBTC.

1. Visit the [Rootstock faucet](https://faucet.rootstock.io/).
2. Paste your wallet address into the input field.
3. Click "GET TEST RBTC".

Each request gives you 0.0005 RBTC, which is enough to complete all the steps in this guide.

To confirm the funds were received, look up your wallet address in
the [Rootstock testnet explorer](https://explorer.testnet.rootstock.io/).

## 3. Configure your Environment

To configure your environment you will need:

- A key for the Rootstock RPC API testnet - Get one [here](https://dashboard.rpc.rootstock.io/register) if you haven’t
  already.
- The addresses and private keys of the wallets created in [step 2](#2-create-wallets)

In your terminal, navigate to the root directory of your escrow foundry project and create an `.env` file:

```bash
nano .env
```

Add the following to your `.env` file, replacing the placeholders with your own values:

```bash
ROOTSTOCK_RPC_URL=https://rpc.testnet.rootstock.io/{YOUR_API_KEY}
BUYER_ADDRESS={WALLET_1_ADDRESS}
BUYER_KEY={WALLET_1_PRIVATE_KEY}
SELLER_ADDRESS={WALLET_2_ADDRESS}
SELLER_KEY={WALLET_2_PRIVATE_KEY}
PAYMENT_AMOUNT=100000000000000
DEPOSIT_AMOUNT=150000000000000
```

:::info[Info]

- Your API key must be configured for the Rootstock testnet
- Private keys must include the `0x` prefix
- Payment and deposit amounts are in wei (1 RBTC = 1e18 wei). For example, 100000000000000 is 0.0001 RBTC.
  :::

Load your environment variables into the current terminal session:

```bash
source .env
```

Finally, confirm that the variables have been loaded by echoing any of the values, for example:

```bash
echo $DEPOSIT_AMOUNT
```

## 4. Write Escrow Smart Contract

Open the Escrow project in your IDE.
The command creates a sample contract named `Counter.sol` in the directory.
Rename this file to `Escrow.sol` and replace its contents with the code provided below.
The code includes inline comments that explain each part of the smart contract.

Rename that file to `Escrow.sol`, and replace its contents with the contract code below. This smart contract implements
an escrow system where **both buyer and seller deposit funds** to ensure fairness. Inline comments explain each section.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/// @title DoubleDepositEscrow
/// @notice A simple escrow contract where both buyer and seller deposit funds.
/// Funds are released only when the buyer explicitly approves the transaction.
contract DoubleDepositEscrow {
    // Buyer and seller addresses, both must be payable to receive funds
    address payable public buyer;
    address payable public seller;

    // The amount the buyer will pay to the seller
    uint public paymentAmount;

    // The deposit amount each party must send (must be greater than paymentAmount)
    uint public depositAmount;

    // Tracks if the buyer has deposited their share
    bool public buyerDeposited;

    // Tracks if the seller has deposited their share
    bool public sellerDeposited;

    // Tracks if the buyer has approved the transaction
    bool public isApproved;

    /// @notice Initializes the escrow contract with both parties and required amounts
    /// @param _buyer Address of the buyer
    /// @param _seller Address of the seller
    /// @param _paymentAmount Amount the buyer will pay to the seller
    /// @param _depositAmount Security deposit each party must send (must be > paymentAmount)
    constructor(address payable _buyer, address payable _seller, uint _paymentAmount, uint _depositAmount) {
        require(_depositAmount > _paymentAmount, "Deposit amount must be greater than payment amount");
        buyer = _buyer;
        seller = _seller;
        paymentAmount = _paymentAmount;
        depositAmount = _depositAmount;
        buyerDeposited = false;
        sellerDeposited = false;
        isApproved = false;
    }

    /// @notice Allows the buyer to deposit their funds
    function buyer_deposit() external payable {
        require(msg.sender == buyer, "Only buyer can deposit.");
        require(!buyerDeposited, "Buyer has already deposited.");
        require(msg.value == depositAmount, "Deposit amount should be equal to the deposit amount specified.");
        buyerDeposited = true;
    }

    /// @notice Allows the seller to deposit their funds
    function seller_deposit() external payable {
        require(msg.sender == seller, "Only seller can deposit.");
        require(!sellerDeposited, "Seller has already deposited.");
        require(msg.value == depositAmount, "Deposit amount should be equal to the deposit amount specified.");
        sellerDeposited = true;
    }

    /// @notice Buyer approves the transaction and releases funds
    function approve() external {
        require(msg.sender == buyer, "Only buyer can approve.");
        require(!isApproved, "Transaction has already been approved.");
        require(buyerDeposited, "Buyer has not yet deposited");
        require(sellerDeposited, "Seller has not yet deposited");

        isApproved = true;

        // Payout sequence:
        // 1. Transfer the agreed payment to the seller
        require(seller.send(paymentAmount), "Payment to seller failed.");

        // 2. Refund seller's full deposit
        require(seller.send(depositAmount), "Deposit refund to seller failed.");

        // 3. Refund buyer the remainder of their deposit
        require(buyer.send(depositAmount - paymentAmount), "Residual deposit refund to buyer failed.");
    }
}
```

## 5. Test the Smart Contract (Optional)

While not strictly required to follow this guide, writing tests is a best practice for verifying that your smart
contract behaves as expected.

When you ran `forge init`, a sample test file named `Counter.t.sol` was generated in the `test` directory.
Rename it to `Escrow.t.sol` and replace its contents with the following test suite:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "forge-std/Test.sol";
import "../src/Escrow.sol";

contract EscrowTest is Test {
    DoubleDepositEscrow escrow;

    address payable buyer = payable(address(0xB0B));
    address payable seller = payable(address(0xA11CE));
    uint256 paymentAmount = 0.01 ether;
    uint256 depositAmount = 0.015 ether;

    function setUp() public {
        // Give buyer and seller initial balances
        vm.deal(buyer, 1 ether);
        vm.deal(seller, 1 ether);

        // Deploy contract
        escrow = new DoubleDepositEscrow(buyer, seller, paymentAmount, depositAmount);
    }

    function testBuyerDeposit() public {
        vm.prank(buyer);
        escrow.buyer_deposit{value: depositAmount}();

        assertTrue(escrow.buyerDeposited(), "Buyer deposit not recorded");
    }

    function testSellerDeposit() public {
        vm.prank(seller);
        escrow.seller_deposit{value: depositAmount}();

        assertTrue(escrow.sellerDeposited(), "Seller deposit not recorded");
    }

    function testApproveFlow() public {
        // Buyer deposits
        vm.prank(buyer);
        escrow.buyer_deposit{value: depositAmount}();

        // Seller deposits
        vm.prank(seller);
        escrow.seller_deposit{value: depositAmount}();

        uint buyerStart = buyer.balance;
        uint sellerStart = seller.balance;

        // Approve transaction
        vm.prank(buyer);
        escrow.approve();

        // Seller receives payment + refund of deposit
        uint expectedSellerBalance = sellerStart + paymentAmount + depositAmount;
        // Buyer receives back remainder of their deposit
        uint expectedBuyerBalance = buyerStart + (depositAmount - paymentAmount);

        assertEq(seller.balance, expectedSellerBalance, "Incorrect seller balance after approve");
        assertEq(buyer.balance, expectedBuyerBalance, "Incorrect buyer balance after approve");
        assertTrue(escrow.isApproved(), "Approval state not set");
    }

    function testFailWrongBuyerDepositAmount() public {
        // Should revert due to incorrect amount
        vm.prank(buyer);
        escrow.buyer_deposit{value: 1 ether}();
    }

    function testFailSellerDepositBeforeBuyer() public {
        // Seller deposits before buyer
        vm.prank(seller);
        escrow.seller_deposit{value: depositAmount}();

        // Trying to approve now should fail
        vm.prank(buyer);
        escrow.approve(); // Should revert because buyer hasn't deposited yet
    }

    function testFailUnauthorizedApprove() public {
        // Deposit by both parties
        vm.prank(buyer);
        escrow.buyer_deposit{value: depositAmount}();
        vm.prank(seller);
        escrow.seller_deposit{value: depositAmount}();

        // Someone else tries to approve
        address attacker = address(0xBAD);
        vm.prank(attacker);
        escrow.approve(); // Should revert
    }
}
```

Use [`forge test`](https://book.getfoundry.sh/reference/forge/forge-test) to run the tests by running the command in the
root directory of your project:

```bash
forge test
```

You should get the following output:

```bash
Ran 6 tests for test/Escrow.t.sol:EscrowTest
[PASS] testApproveFlow() (gas: 93958)
[PASS] testBuyerDeposit() (gas: 48276)
[PASS] testSellerDeposit() (gas: 48452)
[PASS] test_RevertWhenApproveBeforeBuyerDeposit() (gas: 53158)
[PASS] test_RevertWhenNotBuyerApproves() (gas: 61629)
[PASS] test_RevertWhenWrongBuyerDepositAmount() (gas: 24793)
Suite result: ok. 6 passed; 0 failed; 0 skipped; finished in 2.76ms (813.79µs CPU time)

Ran 1 test suite in 9.57ms (2.76ms CPU time): 6 tests passed, 0 failed, 0 skipped (6 total tests)
```

## 6. Compile and Deploy to Rootstock Testnet

To deploy your Escrow contract to the Rootstock testnet, follow these steps:

1. [Create a deployment Script](#create-a-deployment-script)
2. [Compile your contract](#compile-your-contract)
3. [Deploy your compiled contract](#deploy-your-contract) using your deployment script

### Create a Deployment Script

Foundry’s `forge init` generates a sample script named `Counter.s.sol` in the `script` directory.

Rename this file to `Escrow.s.sol`, and replace its contents with the following:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "forge-std/Script.sol";
import "../src/Escrow.sol";
import "forge-std/console.sol";

contract DeployEscrow is Script {
    function run() external {
        // These would typically be passed via environment variables or CLI params
        address payable buyer = payable(vm.envAddress("BUYER_ADDRESS"));
        address payable seller = payable(vm.envAddress("SELLER_ADDRESS"));
        uint paymentAmount = vm.envUint("PAYMENT_AMOUNT");
        uint depositAmount = vm.envUint("DEPOSIT_AMOUNT");

        DoubleDepositEscrow escrow;

        vm.startBroadcast();

        escrow = new DoubleDepositEscrow(
            buyer,
            seller,
            paymentAmount,
            depositAmount
        );

        vm.stopBroadcast();

        console.log("Contract deployed at:", address(escrow));
    }
}
```

### Compile your Contract

Run the [`forge build`](https://book.getfoundry.sh/reference/forge/forge-build) command in the project's root directory
to
compile your contract:

```bash
forge build
```

This will compile your smart contract and create `out` directory. You should see output like:

```bash
[⠊] Compiling...
[⠒] Compiling 6 files with Solc 0.8.28
[⠢] Solc 0.8.28 finished in 5.81ms
Compiler run successful!
```

### Deploy your Contract

Use [`forge script`](ttps://book.getfoundry.sh/reference/forge/forge-script) command to deploy your Escrow contract.
You’ll need a private key with test RBTC. In this example, we use the buyer’s key:

```bash
forge script DeployEscrow \
  --rpc-url $ROOTSTOCK_RPC_URL \
  --private-key $BUYER_KEY \
  --broadcast \
  --legacy \
  --evm-version london
```

If successful, the contract’s address will be logged to the console, e.g.:

```bash
Contract deployed at: 0x...
```

You can view the deployed contract using the [Rootstock explorer](https://explorer.testnet.rootstock.io/)
by consulting the address logged to the console with the message `Contract deployed at: 0x...`.

:::info[Info]
Currently Foundry requires [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) transaction
receipts, but EIP-1559 is not supported on Rootstock. This leads to deserialization errors **in the terminal output
only**, your transactions will still be executed on-chain as expected as long as the '--legacy' '--evm-version
london' flags are used.

More details: [this Foundry issue](https://github.com/foundry-rs/foundry/issues/7640).
:::

## 7. Interact with the Escrow Contract

With your contract deployed and environment variables set,
you can now simulate a full escrow transaction using Foundry’s CLI tools.

### Seller Sends Deposit

Use [`cast send`](https://book.getfoundry.sh/reference/cast/cast-send) to call the `seller_deposit()` function and send
the seller’s deposit:

```bash
cast send <CONTRACT_ADDRESS> \
  "seller_deposit()" \
  --private-key $SELLER_KEY \
  --rpc-url $ROOTSTOCK_RPC_URL \
  --value $DEPOSIT_AMOUNT \
  --legacy
```

Confirm that the deposit has been received by checking the contract’s balance:

```bash
cast balance <CONTRACT_ADDRESS> --rpc-url $ROOTSTOCK_RPC_URL
```

### Buyer Sends Deposit

Now the buyer can send their deposit with:

```bash
cast send <CONTRACT_ADDRESS> \
  "buyer_deposit()" \
  --private-key $BUYER_KEY \
  --rpc-url $ROOTSTOCK_RPC_URL \
  --value $DEPOSIT_AMOUNT \
  --legacy
```

Again, verify the balance to confirm the deposit:

```bash
cast balance <CONTRACT_ADDRESS> --rpc-url $ROOTSTOCK_RPC_URL
```

### Approve Disbursement

Once both deposits are made, the buyer must approve the transaction. This triggers disbursement of funds according to
the contract logic:

```bash
cast send 0xd1B50E3B303a22b6F7a7e25Cf3BA4d6768D852ea \
  "approve()" \
  --private-key $BUYER_KEY \
  --rpc-url $ROOTSTOCK_RPC_URL \
  --legacy
```

Only the buyer's address (the one passed to the contract constructor) can successfully call this function. If another
address attempts this, the transaction will revert.

To confirm that the escrow process completed successfully
check the seller's and buyer's balance to confirm they received the payment and their deposit back:

```bash
cast balance $SELLER_ADDRESS --rpc-url $ROOTSTOCK_RPC_URL
cast balance $BUYER_ADDRESS --rpc-url $ROOTSTOCK_RPC_URL
```

## What's Next?

* A natural next step would be to develop a frontend interface for your smart contract. You follow our quickstart guides
  to Rootstock's [Dynamic](/docs/02-developers/04-quickstart/dynamic.md) starter kit to integrate your smart contract with a Next.js frontend interface with MetaMask wallet
  integration.
* Consider extending the contract to handle disputes or timeouts. For example, if the buyer doesn't approve within a set period,
  funds are returned or sent to a neutral party.
* Explore tools like [Hardhat](/docs/02-developers/05-smart-contracts/02-hardhat/index.md) for alternate development workflows.
* Deploy the contract to the Rootstock [mainnet](https://explorer.rootstock.io/) when you're ready for production. Be sure to audit thoroughly and
  consider using test coverage .

## Troubleshooting

* **No test RBTC in wallet**: Check your wallet on the Rootstock testnet explorer. If empty, request more test RBTC from
  the faucet.
* **Environment variables not recognized**: If you've restarted your terminal or opened a new tab, reload your
  environment variables with source .env.
* **EIP-1559 error messages**: Foundry's tooling may throw warnings related to EIP-1559 incompatibility on Rootstock.
  These don’t affect execution. Just make sure you're using the --legacy flag when broadcasting transactions.
