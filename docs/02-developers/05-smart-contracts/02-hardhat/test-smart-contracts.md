---
sidebar_label: Test Smart Contracts
sidebar_position: 104
title: Test Smart Contracts
description: "Learn how to test your Rootstock smart contract"
tags: [getting-started, guide, smart contracts, rsk, rootstock, hardhat, blockchain]
---

In this section, you'll set up a smart contract test and test your contract using Mocha and Chai testing frameworks. See DApps Automation using [Cucumber and Playwright](/developers/quickstart/dapp-automation-cucumber/).

Follow these steps below to test the smart contract.

### Step 1: Install Dependencies

We'll install the Mocha and Chai testing dependencies.

Mocha is a JavaScript test framework running on Node.js. Chai is an assertion library for the browser and Node that can be paired with any JavaScript testing framework.

- Before writing tests for your token contract, ensure Mocha and Chai is installed. To install the required testing dependencies:

```shell
  npm install --save-dev mocha@10.2.0 chai@4.2.0 @nomiclabs/hardhat-ethers@2.2.3
```

### Step 2: Create Tests

1. Navigate to the `test` directory in the root directory of your project, this is recommended for storing all test files:

```shell
  cd test
```

2. In the test directory, open the `MyToken.test.js` file, we'll write tests for the token contract using Mocha and Chai:

Copy the code snippet below and paste it in your test file or see the [`MyToken.test.js`](https://raw.githubusercontent.com/rsksmart/rootstock-quick-start-guide/feat/complete/test/MyToken.test.js) file on GitHub.
        
```js
  const { expect } = require("chai");
  const { ethers } = require("hardhat");

  describe("MyToken", function () {
  it("Should deploy MyToken and assign the total supply to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(1000);
    await myToken.deployed();

    expect((await myToken.totalSupply()).toString()).to.equal('1000');
    expect((await myToken.balanceOf(owner.address)).toString()).to.equal('1000');
      });
  });
```

### Step 3: Run the Tests

To execute tests, run the following command in your project's root directory. This will run the written tests, confirming that the contract works as expected.

```shell
npx hardhat test
```

You should get a response like below:
![Test Success](/img/guides/quickstart/hardhat/test-success.png)

By following these steps, you'll have the necessary testing frameworks installed and be well prepared to write effective tests for your smart contract.

## Alternative Testing Approaches and Frameworks

In addition to Mocha and Chai, you can use several other frameworks and approaches in your Hardhat project. Each has its unique features and benefits.

- Jest - JavaScript Testing Framework
  - [Jest](https://jestjs.io/) is popular for its delightful syntax and focus on simplicity. It works well for testing both frontend and backend JavaScript applications.
- Waffle - Ethereum Smart Contract Testing Library
  - [Waffle](https://getwaffle.io/) is a library for writing and testing smart contracts. It is often used with ethers.js and is known for its fluent syntax.
- Cucumber DApps Automation
  - [DApp Automation with Cucumber](/developers/quickstart/dapp-automation-cucumber/)