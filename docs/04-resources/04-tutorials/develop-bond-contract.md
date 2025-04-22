---
sidebar_position: 8
title: Develop a bond contract
sidebar_label: Develop a bond contract with Foundry and rootstock-foundry-starterkit
description: "Tutorial to assist developers in getting started with the rootstock-foundry-starterkit."
tags: [knowledge-base, thirdweb, foundry, DAO, rootstock, solidity, starterkit, bonds]
---

## Introduction

This article is a tutorial to assist developers in getting started with the `rootstock-foundry-starterkit`. The `rootstock-foundry-starterkit` provides the foundation for projects using Foundry SDK to develop smart contracts in Solidity and deploy them on Rootstock platform. To illustrate, we will use a bond contract use case. By the end of this tutorial, you will have developed and deployed your first smart contract on Rootstock testnet.

## Background

As more governments and corporations recognize and adopt Bitcoin as a store of value and medium of exchange, we will likely begin to see financial instruments in TradFi denominated in BTC as a way to leverage accumulated reserves. One such instrument is the **bond**.

**Bonds** are debt securities issued by governments and corporations to investors. The issuer acknowledges a debt (IOU) to the investor, to be repaid with interest at a future date. They are financial instruments primarily used by governments to raise funds and invest, and are typically denominated in the issuing country's currency or in the world reserve currency (currently the US dollar).

_In this context, the Rootstock platform stands out as the best alternative for implementing use cases of bond contracts denominated in BTC, as it brings the full power of the EVM closer to the Bitcoin Network._

In this tutorial, we will develop a proof of concept (PoC) for bond contract use cases. Rootstock is fully compatible with the EVM, so we will write the contract in Solidity and use the Foundry SDK. Finally, the `rootstock-foundry-starterkit` will provides a preconfigured setup for compiling and deploying the contract on Rootstock platform.

## Prerequisite

[To execute this part of the tutorial, you must have the Foundry SDK installed](https://github.com/foundry-rs/foundry).

Foundry includes four tools, and we will use two of them: (1) `forge` to compile and deploy the contract; and (2) `cast` to interact with the deployed contract.

## Overview of the task

In this tutorial, we will conceive, design, implement (code), deploy, and finally test our bond contract. We will write our code based on the `rootstock-foundry-starterkit`. Throughout the entire tutorial, we will directly modify only the following files from the base project:

1. `rootstock-foundry-starterkit/src/Erc20Token.sol`: contract source code.
2. . `rootstock-foundry-starterkit/test/Erc20Token.t.sol`: unit tests for the contract.
3. `rootstock-foundry-starterkit/script/Deploy.s.sol`: deployment script to the Rootstock testnet.
4. `rootstock-foundry-starterkit/.env.example`: development environment variables.

The `rootstock-foundry-starterkit` base project includes a contract code that follows the ERC-20 standard, using the interface provided by OpenZeppelin library. The contract imports and inherits the ERC-20 interface provided by the library and makes no modifications.

Regarding our bond contract, we will proceed as follows. First, we will not change the behavior of the functions that make up ERC-20 (e.g., `balanceOf`, `transfer`, `transferFrom`, `totalSupply`, etc.). That is, we will retain them as imported from OpenZeppelin. Second, we will add the necessary functionality for the bond use case by adding state variables and additional functions. This will result in an ERC-20-compliant bond contract.

We suggest you expand the following pane and perform an inspectional reading of the entire contract's code that we will develop. This will give you the initial context needed to understand the step-by-step we will perform throughout the tutorial:

<details>
  <summary>src/Bond.sol</summary>
  <div class="wrap-code">
```sol showLineNumbers
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Bond is ERC20 {

  // Bond terms
  address public immutable issuer;

  uint256 public immutable faceValue;
  uint256 public immutable couponRate;
  uint256 public immutable couponFrequency;
  uint256 public immutable minBuyAmount;
  uint256 public immutable issuanceCap;

  uint256 public immutable subscriptionStart;
  uint256 public immutable subscriptionPeriod;
  uint256 public immutable subscriptionClose;
  uint256 public immutable tenor;
  uint256 public immutable maturityDate;

  struct BondTerms {
    address issuer;
    uint256 faceValue;
    uint256 couponRate;
    uint256 couponFrequency;
    uint256 minBuyAmount;
    uint256 issuanceCap;
    uint256 subscriptionStart;
    uint256 subscriptionPeriod;
    uint256 subscriptionClose;
    uint256 tenor;
    uint256 maturityDate;
  }

  constructor(uint256 _faceValue,
              uint256 _couponRate,
              uint256 _couponFrequency,
              uint256 _minBuyAmount,
              uint256 _issuanceCap,
              uint256 _subscriptionPeriod,
              uint256 _tenor
  ) ERC20("Government Bond", "BOND") {

    issuer = msg.sender;

    faceValue =          _faceValue;
    couponRate =         _couponRate;
    couponFrequency =    _couponFrequency;
    minBuyAmount =       _minBuyAmount;
    issuanceCap =        _issuanceCap;
    subscriptionPeriod = _subscriptionPeriod;
    tenor =              _tenor;

    subscriptionStart = block.timestamp;
    subscriptionClose = subscriptionStart + _subscriptionPeriod * 1 days;
    maturityDate = subscriptionStart + _tenor * 365 days;
  }

  // Used by investors to buy token
  // Investors must send X RBTC to buy tokens
  // Tokens are issued (minted) on demand
  function buyBond() external payable {
    // Does X RBTC meet the minimum buy amount?
    require(msg.value >= minBuyAmount, "below minimum");

    // Is the buy window open?
    require(block.timestamp <= subscriptionClose, "subscription closed");

    // How many tokens does the sent amount buy?
    uint256 amountBonds = (msg.value * 10**decimals()) / faceValue;
    require(amountBonds > 0, "amount zero");

    // Are we still within the token issuance limit?
    require(totalSupply() + amountBonds <= issuanceCap, "cap exceeded");

    // Mint tokens and send directly to investor's address
    _mint(msg.sender, amountBonds);
  }

  // Used only by the issuer to withdraw RBTC
  function withdrawProceeds() external {
    // Checks if it is the issuer
    require(msg.sender == issuer, "not issuer");

    // Checks if there are funds available to withdraw
    uint256 amount = address(this).balance;
    require(amount > 0, "no RBTC to withdraw");

    // Checks if the recipient (issuer) accepts withdrawal
    (bool sent, ) = issuer.call{value: amount}("");
    require(sent, "withdraw failed");
  }

  // Used by issuer (government) to deposit RBTC in future to repay investors
  function fundRedemption() external payable { }

  // Used by investors in the future to receive their capital gains in RBTC
  function redeemBond() external {
    // Are the bonds already eligible for redemption?
    // This statement was commented for testing purposes only:
    // require(block.timestamp >= maturityDate, "not matured");

    // How many bonds does the caller have to redeem?
    uint256 amountBonds = balanceOf(msg.sender);
    require(amountBonds > 0, "no bonds");

    // Calculate the principal to be returned to the investor
    uint256 principalWei = (amountBonds * faceValue) / 10**decimals();
    uint256 interestWei = ((principalWei * ((100 + couponRate) ** (couponFrequency * tenor))) / (100 ** (couponFrequency * tenor))) - principalWei;

    // This provides the resulted capital gains:
    // This statement was commented for testing purposes only:
    // uint256 redemptionAmount = principalWei + interestWei;

    // This statement was added for testing purposes only
    // It shall be commented out/replaced by the above one:
    uint256 redemptionAmount = principalWei;

    // Check if the contract has funds to honor the issuer's debt
    require(address(this).balance >= redemptionAmount, "insufficient RBTC");

    // Burn the tokens corresponding to the redeemed bonds
    _burn(msg.sender, amountBonds);

    // Send the principal to the investor
    (bool sent, ) = msg.sender.call{value: redemptionAmount}("");
    require(sent, "RBTC transfer failed");
  }

  // Used to read the bond terms
  function getBondTerms() external view returns (BondTerms memory) {
    return BondTerms({
      issuer:             issuer,
      faceValue:          faceValue,
      couponRate:         couponRate,
      couponFrequency:    couponFrequency,
      minBuyAmount:       minBuyAmount,
      issuanceCap:        issuanceCap,
      subscriptionStart:  subscriptionStart,
      subscriptionPeriod: subscriptionPeriod,
      subscriptionClose:  subscriptionClose,
      tenor:              tenor,
      maturityDate:       maturityDate
    });
  }
}
```
  </div>
</details>

## Sequence of steps

We will represent the process of developing our contract through a hands-on walkthrough divided into this sequence of steps:

1. Set up the development environment.
2. Write the contract body.
3. Model the use case.
4. Write the bond terms.
5. Write the constructor.
6. Write the `buyBond` function.
7. Write the `withdrawProceeds` function.
8. Write the `fundRedemption` function.
9. Write the `redeemBond` function.
10. Write the `getBondTerms` function.
11. Review the contract code.
12. Deploy the contract.
13. Test the contract.

## Task execution

Now, it's time to get your hands dirty. In this section, we will describe the steps in detail.

### Step 1: Set up the development environment

1. Open a terminal.
2. Change the working directory to where you want to develop the project.
3. Download `rootstock-foundry-starterkit`:

```bash
git clone https://github.com/rsksmart/rootstock-foundry-starterkit.git
```

4. Change the working directory to the root of the project:

```bash
cd rootstock-foundry-starterkit
```

5. Use `forge` to install all project dependencies:

<div class="wrap-code">
```bash
forge install openzeppelin-contracts-05=OpenZeppelin/openzeppelin-contracts@v2.5.0 openzeppelin-contracts-06=OpenZeppelin/openzeppelin-contracts@v3.4.0 openzeppelin-contracts-08=OpenZeppelin/openzeppelin-contracts@v4.8.3 --no-commit
```
</div>

6. Open the project with the code editor of your choice.

### Step 2: write the contract body

In the project directory tree, you will see the four files we will be modifying:
- `src/Erc20Token.sol`
- `test/Erc20Token.t.sol`
- `script/Deploy.s.sol`
- `.env.example`

Navigate to `src/Erc20Token.sol`. You will see that it imports the ERC-20 interface from the OpenZeppelin library, declares an ERC-20 contract, and defines in the constructor the minting of an initial token supply.
1. First, rename the file `src/Erc20Token.sol` to `src/Bond.sol`.
2. Then, let's adapt the contract body to our use case:

```sol title="src/Bond.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Bond is ERC20 {
  constructor() ERC20("Government Bond", "BOND") {
    // TO DO
  }
}
```

We removed the minting of the initial supply from the constructor because we have not yet defined how much and when new tokens should be minted.

### Step 3: model the use case

To model our use case, we will take as a reference U.S. government treasury bonds sold in retail in fixed-price batches on the TreasuryDirect platform. The **issuer** (the government) decides to issue a new batch of bonds to raise funds and invest. This issuance is done in a lot. _It is this specific bond lot that our contract will model. Each bond will correspond to a unit of a fungible ERC-20 token._

Each bond will have a **face value** of X RBTC. That is, to acquire them in the primary market (i.e., directly from the issuer at the time of the initial offering), a fixed price of X RBTC per token unit must be paid.

The lot will have an **issuance cap** of X bonds, meaning the maximum number of bonds that can be issued. This will be the contract's maximum token supply. Investors will be required to make a **minimum purchase** of X bonds in the primary market.

Each bond’s return is defined by its **coupon**. The **coupon rate** is the interest rate, and the **coupon frequency** refers to how often it is applied. A common example is a 6.5% interest rate applied twice a year. Lastly, the **tenor** is the period the investor must wait to receive returns. A common example is a 10-year tenor. That is, the invested capital will yield according to the coupon rate and frequency using compound interest over 10 years. Upon completion of this period, the bond reaches **maturity** and can be redeemed — meaning the investor returns the bond and receives the invested capital plus accrued compound interest.

A bond lot is typically offered during a timeframe called the **subscription period**. A common example is a 3-day period. For instance, the government may announce the issuance of a lot of X bonds, each with a face value of X RBTC, a coupon rate of X%, a coupon frequency of X times per year, and a tenor of X years. The subscription period would begin on date X and end on date X. If all bonds are sold, the government will have successfully raised X RBTC.

Our contract must implement both the **primary bond market** — the issuance and sale of bonds by the government to investors — and the **secondary market** — the trading of bonds among investors. The standard ERC-20 functions implemented by OpenZeppelin already satisfy the behavior expected for the secondary market. _Therefore, we will not modify any behavior inherited from the OpenZeppelin interface._

_For the primary market, we will need to implement the following functionalities, which are not part of the ERC-20 standard:_
- Sale of bonds in RBTC.
- Withdrawal by the government of the RBTC raised from bond sales.
- Government funding for the future repayment of debt in RBTC.
- Redemption of bonds for RBTC.

_To that end, we will write the following new functions in our contract:_
- `buyBond()`: investors will use this function to buy bonds (i.e., tokens), by paying in RBTC, the native token on Rootstock.
- `withdrawProceeds()`: the issuer (government) will use this function to withdraw all RBTC raised from bond sales.
- `fundRedemption()`: the issuer will use this function to deposit RBTC that will later be used to repay investors.
- `redeemBond()`: investors will use this function in the future to return their tokens and receive their RBTC returns (initial investment plus compound interest).

### Step 4: write the bond terms

**Bond terms** are the conditions defined in the bond contract — that is, the set of parameters that define the bond as a financial instrument. The bond terms in our contract will be:

- **Issuer**: the account that deployed the contract on the Rootstock platform.
- **Face value**: the value of each token (bond) in RBTC, which is also the cost to purchase it directly from the issuer.
- **Coupon rate**: the interest rate applied to the invested capital.
- **Coupon frequency**: how many times per year the interest is applied.
- **Minimum buy amount**: the minimum token purchase amount in RBTC.
- **Issuance cap**: the maximum number of tokens that can be issued.
- **Subscription start**: the start date of the token offering.
- **Subscription period**: the number of days during which the issuance and sale of tokens will take place.
- **Subscription close**: the end date of the token offering.

Let's declare state variables in our contract to represent these bond terms:

```sol title="src/Bond.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Bond is ERC20 {

  // Bond terms
  address public immutable issuer;
  uint256 public immutable faceValue;
  uint256 public immutable couponRate;
  uint256 public immutable couponFrequency;
  uint256 public immutable minBuyAmount;
  uint256 public immutable issuanceCap;
  uint256 public immutable subscriptionStart;
  uint256 public immutable subscriptionPeriod;
  uint256 public immutable subscriptionClose;
  uint256 public immutable tenor;
  uint256 public immutable maturityDate;

  constructor() ERC20("Government Bond", "BOND") {
    // TO DO
  }
}
```

Note that all state variables are marked as `immutable`, since the bond terms should not change once they are set.

### Step 5: write the constructor

The issuer is the **account** that deploys the contract. Therefore, they must define the bond terms at the time of deployment on Rootstock. These values must be passed as arguments in the transaction that deploys the contract. Let's write a constructor that initializes the state variables and sets the bond terms:

```sol title="src/Bond.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Bond is ERC20 {

  ...

  constructor(uint256 _faceValue,
              uint256 _couponRate,
              uint256 _couponFrequency,
              uint256 _minBuyAmount,
              uint256 _issuanceCap,
              uint256 _subscriptionPeriod,
              uint256 _tenor
  ) ERC20("Government Bond", "BOND") {

    issuer = msg.sender;

    faceValue =          _faceValue;
    couponRate =         _couponRate;
    couponFrequency =    _couponFrequency;
    minBuyAmount =       _minBuyAmount;
    issuanceCap =        _issuanceCap;
    subscriptionPeriod = _subscriptionPeriod;
    tenor =              _tenor;

    subscriptionStart = block.timestamp;
    subscriptionClose = subscriptionStart + _subscriptionPeriod * 1 days;
    maturityDate = subscriptionStart + _tenor * 365 days;
  }
}
```

Note that the constructor receives only what is strictly necessary. Besides that, (1) `issuer` is set as the address that deployed the contract. (2) `subscriptionStart` is set to the timestamp at the moment of deployment. (3) Regarding dates, the issuer provides only `_tenor` and `_subscriptionPeriod` as parameters. All other dates are calculated based on these values and `subscriptionStart`. Finally, all dates are integers that represent Unix epoch standard timestamps.

### Step 6: write the `buyBond` function

Let's write the business logic for the `buyBond` function:

```sol title="src/Bond.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Bond is ERC20 {

  ...

  // Used by investors to buy token
  // Investors must send X RBTC to buy tokens
  // Tokens are issued (minted) on demand
  function buyBond() external payable {
    // Does X RBTC meet the minimum buy amount?
    require(msg.value >= minBuyAmount, "below minimum");

    // Is the buy window open?
    require(block.timestamp <= subscriptionClose, "subscription closed");

    // How many tokens does the sent amount buy?
    uint256 amountBonds = (msg.value * 10**decimals()) / faceValue;
    require(amountBonds > 0, "amount zero");

    // Are we still within the token issuance limit?
    require(totalSupply() + amountBonds <= issuanceCap, "cap exceeded");

    // Mint tokens and send directly to investor's address
    _mint(msg.sender, amountBonds);
  }
}
```

Note that no tokens are issued during the contract’s initialization. Instead, token issuance occurs on demand, each time an investor buys tokens using the `buyBond` function. _As a result, the issuer never holds tokens in their own balance at any point during the contract’s lifecycle._ Finally, note that the function does not return change. The amount X RBTC sent is the exact amount used to buy tokens, and it can be any fractional value above the minimum.

### Step 7: write the `withdrawProceeds` function

Let's write the business logic for the `withdrawProceeds` function:

```sol title="src/Bond.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Bond is ERC20 {

  ...

  // Used only by the issuer to withdraw RBTC
  function withdrawProceeds() external {
    // Checks if it is the issuer
    require(msg.sender == issuer, "not issuer");

    // Checks if there are funds available to withdraw
    uint256 amount = address(this).balance;
    require(amount > 0, "no RBTC to withdraw");

    // Checks if the recipient (issuer) accepts withdrawal
    (bool sent, ) = issuer.call{value: amount}("");
    require(sent, "withdraw failed");
  }
}
```

Note that if the issuer is an EOA, it will always accept receiving funds. However, the issuer may also be another contract.

### Step 8: write the `fundRedemption` function

The business logic of `fundRedemption` should be kept as simple as possible. It allows the issuer to deposit RBTC at any time for future repayments to investors. The function only needs to accept deposits and perform no other actions:

```sol title="src/Bond.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Bond is ERC20 {

  ...

  // Used by issuer (government) to deposit RBTC in future to repay investors
  function fundRedemption() external payable { }
}
```

Note that anyone can call the function and deposit RBTC into the contract. Undoubtedly, the issuer wouldn't mind if other actors helped repay their debt. Moreover, this could be part of a broader scheme involving other contracts, such as in public debt refinancing scenarios, similar to how governments interact with the IMF.

### Step 9: write the `redeemBond` function

`redeemBond` implements the **compound interest formula** (also known as the future value formula) to calculate the amount the investor is entitled to redeem:

```sol title="src/Bond.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Bond is ERC20 {

  ...

  // Used by investors in the future to receive their capital gains in RBTC
  function redeemBond() external {
    // Are the bonds already eligible for redemption?
    // This statement was commented for testing purposes only:
    // require(block.timestamp >= maturityDate, "not matured");

    // How many bonds does the caller have to redeem?
    uint256 amountBonds = balanceOf(msg.sender);
    require(amountBonds > 0, "no bonds");

    // Calculate the principal to be returned to the investor
    uint256 principalWei = (amountBonds * faceValue) / 10**decimals();
    uint256 interestWei = ((principalWei * ((100 + couponRate) ** (couponFrequency * tenor))) / (100 ** (couponFrequency * tenor))) - principalWei;

    // This provides the resulted capital gains:
    // This statement was commented for testing purposes only:
    // uint256 redemptionAmount = principalWei + interestWei;

    // This statement was added for testing purposes only
    // It shall be commented out/replaced by the above one:
    uint256 redemptionAmount = principalWei;

    // Check if the contract has funds to honor the issuer's debt
    require(address(this).balance >= redemptionAmount, "insufficient RBTC");

    // Burn the tokens corresponding to the redeemed bonds
    _burn(msg.sender, amountBonds);

    // Send the principal to the investor
    (bool sent, ) = msg.sender.call{value: redemptionAmount}("");
    require(sent, "RBTC transfer failed");
  }
}
```

Note that we commented out two key statements in the business logic of the function and added a new one. We did this to enable the full testing flow of the contract's lifecycle on the testnet.

### Step 10: write the `getBondTerms` function

The four functions we implemented in the previous sections cover all the core functionalities of our contract. To conclude, let's write an additional read-only function to make it easier to query the bond terms of the contract:

```sol title="src/Bond.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Bond is ERC20 {

  ...

  struct BondTerms {
    address issuer;
    uint256 faceValue;
    uint256 couponRate;
    uint256 couponFrequency;
    uint256 minBuyAmount;
    uint256 issuanceCap;
    uint256 subscriptionStart;
    uint256 subscriptionPeriod;
    uint256 subscriptionClose;
    uint256 tenor;
    uint256 maturityDate;
  }

  ...

  // Used to read the bond terms
  function getBondTerms() external view returns (BondTerms memory) {
    return BondTerms({
      issuer:             issuer,
      faceValue:          faceValue,
      couponRate:         couponRate,
      couponFrequency:    couponFrequency,
      minBuyAmount:       minBuyAmount,
      issuanceCap:        issuanceCap,
      subscriptionStart:  subscriptionStart,
      subscriptionPeriod: subscriptionPeriod,
      subscriptionClose:  subscriptionClose,
      tenor:              tenor,
      maturityDate:       maturityDate
    });
  }
}
```

Note that we created a struct to simplify reading the bond terms of the contract. This allows the query to be performed even without knowing the contract’s ABI.

### Step 11: review the contract code

With this, we have completed the code for our contract. Let's review the complete code of the contract we just wrote before moving on to the deployment phase:

<details>
  <summary>src/Bond.sol</summary>
  <div class="wrap-code">
```sol showLineNumbers
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Bond is ERC20 {

  // Bond terms
  address public immutable issuer;

  uint256 public immutable faceValue;
  uint256 public immutable couponRate;
  uint256 public immutable couponFrequency;
  uint256 public immutable minBuyAmount;
  uint256 public immutable issuanceCap;

  uint256 public immutable subscriptionStart;
  uint256 public immutable subscriptionPeriod;
  uint256 public immutable subscriptionClose;
  uint256 public immutable tenor;
  uint256 public immutable maturityDate;

  struct BondTerms {
    address issuer;
    uint256 faceValue;
    uint256 couponRate;
    uint256 couponFrequency;
    uint256 minBuyAmount;
    uint256 issuanceCap;
    uint256 subscriptionStart;
    uint256 subscriptionPeriod;
    uint256 subscriptionClose;
    uint256 tenor;
    uint256 maturityDate;
  }

  constructor(uint256 _faceValue,
              uint256 _couponRate,
              uint256 _couponFrequency,
              uint256 _minBuyAmount,
              uint256 _issuanceCap,
              uint256 _subscriptionPeriod,
              uint256 _tenor
  ) ERC20("Government Bond", "BOND") {

    issuer = msg.sender;

    faceValue =          _faceValue;
    couponRate =         _couponRate;
    couponFrequency =    _couponFrequency;
    minBuyAmount =       _minBuyAmount;
    issuanceCap =        _issuanceCap;
    subscriptionPeriod = _subscriptionPeriod;
    tenor =              _tenor;

    subscriptionStart = block.timestamp;
    subscriptionClose = subscriptionStart + _subscriptionPeriod * 1 days;
    maturityDate = subscriptionStart + _tenor * 365 days;
  }

  // Used by investors to buy token
  // Investors must send X RBTC to buy tokens
  // Tokens are issued (minted) on demand
  function buyBond() external payable {
    // Does X RBTC meet the minimum buy amount?
    require(msg.value >= minBuyAmount, "below minimum");

    // Is the buy window open?
    require(block.timestamp <= subscriptionClose, "subscription closed");

    // How many tokens does the sent amount buy?
    uint256 amountBonds = (msg.value * 10**decimals()) / faceValue;
    require(amountBonds > 0, "amount zero");

    // Are we still within the token issuance limit?
    require(totalSupply() + amountBonds <= issuanceCap, "cap exceeded");

    // Mint tokens and send directly to investor's address
    _mint(msg.sender, amountBonds);
  }

  // Used only by the issuer to withdraw RBTC
  function withdrawProceeds() external {
    // Checks if it is the issuer
    require(msg.sender == issuer, "not issuer");

    // Checks if there are funds available to withdraw
    uint256 amount = address(this).balance;
    require(amount > 0, "no RBTC to withdraw");

    // Checks if the recipient (issuer) accepts withdrawal
    (bool sent, ) = issuer.call{value: amount}("");
    require(sent, "withdraw failed");
  }

  // Used by issuer (government) to deposit RBTC in future to repay investors
  function fundRedemption() external payable { }

  // Used by investors in the future to receive their capital gains in RBTC
  function redeemBond() external {
    // Are the bonds already eligible for redemption?
    // This statement was commented for testing purposes only:
    // require(block.timestamp >= maturityDate, "not matured");

    // How many bonds does the caller have to redeem?
    uint256 amountBonds = balanceOf(msg.sender);
    require(amountBonds > 0, "no bonds");

    // Calculate the principal to be returned to the investor
    uint256 principalWei = (amountBonds * faceValue) / 10**decimals();
    uint256 interestWei = ((principalWei * ((100 + couponRate) ** (couponFrequency * tenor))) / (100 ** (couponFrequency * tenor))) - principalWei;

    // This provides the resulted capital gains:
    // This statement was commented for testing purposes only:
    // uint256 redemptionAmount = principalWei + interestWei;

    // This statement was added for testing purposes only
    // It shall be commented out/replaced by the above one:
    uint256 redemptionAmount = principalWei;

    // Check if the contract has funds to honor the issuer's debt
    require(address(this).balance >= redemptionAmount, "insufficient RBTC");

    // Burn the tokens corresponding to the redeemed bonds
    _burn(msg.sender, amountBonds);

    // Send the principal to the investor
    (bool sent, ) = msg.sender.call{value: redemptionAmount}("");
    require(sent, "RBTC transfer failed");
  }

  // Used to read the bond terms
  function getBondTerms() external view returns (BondTerms memory) {
    return BondTerms({
      issuer:             issuer,
      faceValue:          faceValue,
      couponRate:         couponRate,
      couponFrequency:    couponFrequency,
      minBuyAmount:       minBuyAmount,
      issuanceCap:        issuanceCap,
      subscriptionStart:  subscriptionStart,
      subscriptionPeriod: subscriptionPeriod,
      subscriptionClose:  subscriptionClose,
      tenor:              tenor,
      maturityDate:       maturityDate
    });
  }
}
```
  </div>
</details>

### Step 12: deploy the contract

Before deploying, unit tests for the contract should be run. The `rootstock-foundry-starterkit` provides the means for this. **However**, unit tests are outside the scope of this tutorial. For didactic purposes, we will perform a flow test of the contract lifecycle deployed on Rootstock testnet.

1. The `rootstock-foundry-starterkit` is configured to run unit tests before deployment. Therefore, rename the `test` subdirectory to `draft`.

To deploy and later test our contract on testnet, we need 4 accounts with some amount of tRBTC on Rootstock testnet.

2. Open a terminal.
3. Use `cast` to generate 4 wallets:

```bash
cast wallet new -n 4
```

4. Transcribe the generated private keys (`SK` as secret key) and addresses to the `.env.example` file. For example:

```bash title=".env.example"
# Users:
ADDRESS_ISSUER=0x1C37D7E24C0aC2CB3635fC2531F18EdE1aA36CB0
SK_ISSUER=0xccd3d582c87b177c8f22780e81aa135cc11405f2d9b5c4730db5cabbec308030

ADDRESS_ALICE=0xE0390cDfC26E01B760F0D64Cc744B455decA9436
SK_ALICE=0x63d89bd6e244df0245e9004696d20b44519135d93c817b3b343c68ed4d53c38e

ADDRESS_BOB=0xc20a559b32EFFf133dbC40dB17AeE6E2BC06aAb4
SK_BOB=0x8bb5d47257c99d64a5d22b6615ca248fd5047959e365d70e65ba0b6872e12ece

ADDRESS_CHARLIE=0xF0072646C3273f07A2572343643BfE47A30E55f0
SK_CHARLIE=0x83af18be3652735de4fc2f9ca8560ad1f650936479636ad693b1f8f03e2e3d54
```

We will use 4 accounts in our tests. One will be for the issuer of the bonds, that is, the account that will deploy the contract. The other three will act as investors: Alice, Bob, and Charlie. We still need to fund each of the 4 accounts. For that, we’ll use the Rootstock testnet faucet.

5. Use your web browser to access the Rootstock testnet faucet at [https://faucet.rootstock.io](https://faucet.rootstock.io) and fund each of the 4 accounts.

6. Rename the `.env.example` file to `.env`.
7. Use the following command to load all variables from `.env` into your shell:
```
set -a && source .env
```

Whenever you change the contents of `.env`, remember to run `source .env` again.

8. Return to the terminal and use `cast` to confirm that all accounts have received 0.0005 tRBTC from the faucet. For example:
```bash
cast balance $ADDRESS_ISSUER --rpc-url https://public-node.testnet.rsk.co --ether
```

9. Repeat the balance check for the other 3 addresses.

Now, we need to define the bond parameters required to initialize the contract on chain. We will use the following values, which are quite common for government bonds:

- Face value: 0.01 RBTC; in other words, 1 bond costs 0.01 BTC.
- Coupon rate: 6.5%
- Coupon frequency: once a year
- Minimum buy amount: 0.0001 RBTC
- Issuance cap: 10K bonds
- Subscription period: 3 days; the token issuance offer will last 3 days.
- Tenor: 10 years; bonds will be redeemed 10 years later.

_Note that with these values, if the issuer manages to sell all 10K bonds, they will raise 100 BTC in capital, which is quite realistic for a batch of government bonds._

10. Transcribe these values to the `.env.example` file as well. For example:

```bash title=".env"
# Users:
ADDRESS_ISSUER=0x1C37D7E24C0aC2CB3635fC2531F18EdE1aA36CB0
SK_ISSUER=0xccd3d582c87b177c8f22780e81aa135cc11405f2d9b5c4730db5cabbec308030

ADDRESS_ALICE=0xE0390cDfC26E01B760F0D64Cc744B455decA9436
SK_ALICE=0x63d89bd6e244df0245e9004696d20b44519135d93c817b3b343c68ed4d53c38e

ADDRESS_BOB=0xc20a559b32EFFf133dbC40dB17AeE6E2BC06aAb4
SK_BOB=0x8bb5d47257c99d64a5d22b6615ca248fd5047959e365d70e65ba0b6872e12ece

ADDRESS_CHARLIE=0xF0072646C3273f07A2572343643BfE47A30E55f0
SK_CHARLIE=0x83af18be3652735de4fc2f9ca8560ad1f650936479636ad693b1f8f03e2e3d54

# Bond parameters:
FACE_VALUE=10000000000000000       # 0.01 RBTC in wei
COUPON_RATE=65                     # 6.5 %
COUPON_FREQUENCY=1                 # annual
MIN_BUY_AMOUNT=100000000000000     # 0.0001 RBTC in wei
ISSUANCE_CAP=10000e18              # 10000 bonds ~ 100 BTC
SUBSCRIPTION_PERIOD=3              # 3 days
TENOR=10                           # 10 years
```

Note that it was necessary to convert all RBTC values to wei. Our contract performs all calculations in wei, following EVM programming best practices.

11. Update the `.env` variables in the shell:

```bash
source .env
```

12. Write the deploy script using the `.env` variables:
```sol title="script/Deploy.s.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Bond.sol";

contract DeployBond is Script {
  function setUp() public {}

  function run() public {
    uint256 deployerSk = vm.envUint("SK_ISSUER");
    vm.startBroadcast(deployerSk);

    uint256 faceValue         = vm.envUint("FACE_VALUE");
    uint256 couponRate        = vm.envUint("COUPON_RATE");
    uint256 couponFrequency   = vm.envUint("COUPON_FREQUENCY");
    uint256 minBuyAmount      = vm.envUint("MIN_BUY_AMOUNT");
    uint256 issuanceCap       = vm.envUint("ISSUANCE_CAP");
    uint256 subscriptionDays  = vm.envUint("SUBSCRIPTION_PERIOD");
    uint256 tenorYears        = vm.envUint("TENOR");

    Bond bond = new Bond(
      faceValue,
      couponRate,
      couponFrequency,
      minBuyAmount,
      issuanceCap,
      subscriptionDays,
      tenorYears
    );

    console2.log("Bond deployed at:", address(bond));
    vm.stopBroadcast();
  }
}
```

13. Use `forge` to compile the contract:
```bash
forge build
```

14. Deploy the contract on Rootstock testnet:

<div class="wrap-code">
```bash
forge script script/Deploy.s.sol --rpc-url https://public-node.testnet.rsk.co --broadcast --legacy --evm-version london
```
</div>

15. Write down the address of your deployed contract in `.env`:

```bash title=".env"
# Users:
ADDRESS_ISSUER=0x1C37D7E24C0aC2CB3635fC2531F18EdE1aA36CB0
SK_ISSUER=0xccd3d582c87b177c8f22780e81aa135cc11405f2d9b5c4730db5cabbec308030

ADDRESS_ALICE=0xE0390cDfC26E01B760F0D64Cc744B455decA9436
SK_ALICE=0x63d89bd6e244df0245e9004696d20b44519135d93c817b3b343c68ed4d53c38e

ADDRESS_BOB=0xc20a559b32EFFf133dbC40dB17AeE6E2BC06aAb4
SK_BOB=0x8bb5d47257c99d64a5d22b6615ca248fd5047959e365d70e65ba0b6872e12ece

ADDRESS_CHARLIE=0xF0072646C3273f07A2572343643BfE47A30E55f0
SK_CHARLIE=0x83af18be3652735de4fc2f9ca8560ad1f650936479636ad693b1f8f03e2e3d54

# Bond parameters:
FACE_VALUE=10000000000000000       # 0.01 RBTC in wei
COUPON_RATE=65                     # 6.5 %
COUPON_FREQUENCY=1                 # annual
MIN_BUY_AMOUNT=100000000000000     # 0.0001 RBTC in wei
ISSUANCE_CAP=10000e18              # 10000 bonds ~ 100 BTC
SUBSCRIPTION_PERIOD=3              # 3 days
TENOR=10                           # 10 years

CONTRACT=0x22d8f4Ced720447ADCf74A4684eB285084948c0E
```

16. Update the `.env` variables in the shell:

```bash
source .env
```

### Step 13: test the contract

Let's start testing the contract logic flow. We'll use `cast` to perform reads and writes on the contract and track balance changes for the 4 accounts.

1. First, we'll use the `getBondTerms()` function to query the contract's bond terms:

<div class="wrap-code">
```bash
cast call $CONTRACT \
  "getBondTerms()((address,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256))" \
  --rpc-url https://public-node.testnet.rsk.co --json
```
</div>

2. We can concatenate some bash commands to make the output human-readable:
<div class="wrap-code">
```bash
cast call $CONTRACT \
  "getBondTerms()((address,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256))" \
  --rpc-url https://public-node.testnet.rsk.co \
  --json \
| jq -r '.[0]' \
| sed 's/[() ]//g' \
| gawk -F, '
  function weiToEth(w) { return w / 1e18 }                  # wei → ETH
  function epochToStr(t){ return strftime("%Y-%m-%d %H:%M:%S", t) }

  BEGIN { print "{" }
  {
    printf "  \"Issuer\": \"%s\",\n",            $1
    printf "  \"Face value\": \"%.6f RBTC\",\n",  weiToEth($2)
    printf "  \"Coupon rate\": \"%.1f%%\",\n",   $3/10        # 65 → 6.5 %
    printf "  \"Coupon frequency\": \"%s\",\n",  $4
    printf "  \"Minimum buy amount\": \"%.6f RBTC\",\n", weiToEth($5)
    printf "  \"Issuance cap\": \"%.0f bonds\",\n", $6/ 1e18
    printf "  \"Subscription start\": \"%s\",\n", epochToStr($7)
    printf "  \"Subscription period\": \"%s days\",\n", $8
    printf "  \"Subscription close\": \"%s\",\n", epochToStr($9)
    printf "  \"Tenor\": \"%s years\",\n",       $10
    printf "  \"Maturity date\": \"%s\"\n",      epochToStr($11)
  }
  END { print "}" }
'
```
</div>

Then we can read, for example:
```bash
{
  "Issuer": "0x1C37D7E24C0aC2CB3635fC2531F18EdE1aA36CB0",
  "Face value": "0.010000 RBTC",
  "Coupon rate": "6.5%",
  "Coupon frequency": "1",
  "Minimum buy amount": "0.000100 RBTC",
  "Issuance cap": "10000 bonds",
  "Subscription start": "2025-04-21 22:12:22",
  "Subscription period": "3 days",
  "Subscription close": "2025-04-24 22:12:22",
  "Tenor": "10 years",
  "Maturity date": "2035-04-19 22:12:22"
}
```

3. Check Alice's balance:
```bash
cast balance $ADDRESS_ALICE --rpc-url https://public-node.testnet.rsk.co --ether
```

4. Use Alice's wallet to call `buyBond` and purchase bonds:
```bash
cast send $CONTRACT \
  "buyBond()" \
  --private-key $SK_ALICE \
  --rpc-url https://public-node.testnet.rsk.co \
  --value 0.0003ether \
  --legacy
```

5. Check contract's balance after Alice's purchase:
```bash
cast balance $CONTRACT --rpc-url https://public-node.testnet.rsk.co --ether
```

6. Check the contract's total token supply:
```bash
cast call $CONTRACT \
  "totalSupply()(uint256)" \
  --rpc-url https://public-node.testnet.rsk.co | awk '{print $1}' | cast from-wei
```

7. Bob buys bonds:
```bash
cast send $CONTRACT \
  "buyBond()" \
  --private-key $SK_BOB \
  --rpc-url https://public-node.testnet.rsk.co \
  --value 0.0004ether \
  --legacy
```

8. Confirm that Bob received the purchased tokens:
```bash
cast call $CONTRACT \
  "balanceOf(address)(uint256)" $ADDRESS_BOB \
  --rpc-url https://public-node.testnet.rsk.co \
| cut -d ' ' -f 1 \
| cast from-wei
```

9. Charlie buys bonds:
```bash
cast send $CONTRACT \
  "buyBond()" \
  --private-key $SK_CHARLIE \
  --rpc-url https://public-node.testnet.rsk.co \
  --value 0.0001ether \
  --legacy
```

10. Track the increase in total token supply:
```bash
cast call $CONTRACT \
  "totalSupply()(uint256)" \
  --rpc-url https://public-node.testnet.rsk.co | awk '{print $1}' | cast from-wei
```

11. Issuer withdraws the total capital raised in RBTC from the token sale:
```
cast send $CONTRACT \
  "withdrawProceeds()" \
  --private-key $SK_ISSUER \
  --rpc-url https://public-node.testnet.rsk.co \
  --legacy
```

12. Check contract's balance after withdrawal:
```bash
cast balance $CONTRACT --rpc-url https://public-node.testnet.rsk.co --ether
```

13. Check issuer's balance after withdrawal:
```bash
cast balance $ADDRESS_ISSUER --rpc-url https://public-node.testnet.rsk.co --ether
```

14. The government (issuer) now deposits funds to repay bondholders with interest:
```bash
cast send $CONTRACT \
  "fundRedemption()" \
  --value 0.001ether \
  --private-key $SK_ISSUER \
  --rpc-url https://public-node.testnet.rsk.co \
  --legacy
```

15. Check contract's balance after deposit:
```bash
cast balance $CONTRACT --rpc-url https://public-node.testnet.rsk.co --ether
```

16. Assuming the bonds have reached maturity, Alice redeems them:
```bash
cast send $CONTRACT \
  "redeemBond()" \
  --private-key $SK_ALICE \
  --rpc-url https://public-node.testnet.rsk.co \
  --legacy
```

17. Check Alice's RBTC balance after redemption:
```bash
cast balance $ADDRESS_ALICE --rpc-url https://public-node.testnet.rsk.co --ether
```

18. Check Alice's token balance after redemption:
```bash
cast call $CONTRACT \
  "balanceOf(address)(uint256)" $ADDRESS_ALICE \
  --rpc-url https://public-node.testnet.rsk.co \
| cut -d ' ' -f 1 \
| cast from-wei
```

Alice's token balance should be zero because her tokens were burned during redemption. The total token supply should have also decreased.

19. Track the decrease in total token supply:
```bash
cast call $CONTRACT \
  "totalSupply()(uint256)" \
  --rpc-url https://public-node.testnet.rsk.co | awk '{print $1}' | cast from-wei
```

### Task completed

At this point, you have developed and deployed your first smart contract on the Rootstock testnet using the Foundry SDK and the `rootstock-foundry-starterkit`. The only step not covered in this tutorial is unit testing the contract.

## Key takeaways

In this tutorial, we used the ERC-20 standard as the base for our contract, provided as a template in the `rootstock-foundry-starterkit`. However, for the bond use case, there are more suitable contract standards that implement functionalities required for bond issuance by governments and corporations. Furthermore, the choice of bonds was merely illustrative, showcasing the potential of Rootstock in bringing the EVM to the Bitcoin world.

It’s important to note that Rootstock is an EVM-compatible platform. As a result, developing smart contracts for Rootstock is no different than for Ethereum, and you can use any Ethereum-compatible SDKs, such as Ganache, Truffle, and others. Finally, one common point of confusion is the number of decimals. Bitcoin uses 8 decimal places, while Ethereum uses 18. To maintain full EVM compatibility, RBTC also uses 18 decimal places, with its smallest unit being the wei.
