---
sidebar_label: Test Smart Contract
sidebar_position: 104
title: Testing Smart Contracts using Foundry
description: "Learn how to test your Rootstock smart contract using Foundry"
tags: [guides, developers, smart contracts, rsk, rootstock, foundry, dApps, ethers]
---

In this section, you'll set up a smart contract test and test it using `forge`.

### Step 1: Test Script
You will see a directory called `test` in the root of your project. This is where you can view/write your tests. The demo `counter.sol` comes with a test script `counter.t.sol`, which contains:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Counter} from "../src/Counter.sol";

contract CounterTest is Test {
  Counter public counter;

  function setUp() public {
    counter = new Counter();
    counter.setNumber(0);
  }

  function test_Increment() public {
    counter.increment();
    assertEq(counter.number(), 1);
  }

  function testFuzz_SetNumber(uint256 x) public {
    counter.setNumber(x);
    assertEq(counter.number(), x);
  }
}
```

### Step 2: Run the Test
To run the test, execute the following command in the root of your project:

```shell
forge test
```

This will run the test script and display the results in the terminal.
```shell
forge test
[⠊] Compiling...
[⠊] Compiling 33 files with Solc 0.8.24
[⠒] Solc 0.8.24 finished in 947.64ms
Compiler run successful!
Ran 2 tests for test/Counter.t.sol:CounterTest
[PASS] testFuzz_SetNumber(uint256) (runs: 256, μ: 30899, ~: 31288)
[PASS] test_Increment() (gas: 31303)
Suite result: ok. 2 passed; 0 failed; 0 skipped; finished in 11.85ms (6.49ms CPU time)

Ran 2 test suites in 137.32ms (19.93ms CPU time): 6 tests passed, 0 failed, 0 skipped (6 total tests)
```
:::note[Additional tests]
If you need additional tests, or want to go deep on this step, visit the [Foundry Tests Documentation](https://book.getfoundry.sh/forge/tests).. 
:::