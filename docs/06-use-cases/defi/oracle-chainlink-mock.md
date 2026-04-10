---
sidebar_label: Chainlink Oracle (Mock)
sidebar_position: 2
title: Integrate a Chainlink-Style Price Feed (Mock) on Rootstock (Testnet)
description: Build and test a mock Chainlink-style price feed consumer on Rootstock testnet, with safe read patterns and local testing.
tags: [rsk, rootstock, defi, oracles, chainlink, solidity, testnet]
---

# Integrate a Chainlink-Style Price Feed (Mock) on Rootstock (Testnet)

By the end of this tutorial, you will have:

- A `PriceConsumer` contract that reads from an `AggregatorV3Interface`
- A local test setup using a **mock** price feed (no real oracle dependency)
- A deployment flow you can run on **Rootstock testnet**

**Prerequisites**: Follow the [Shared Setup Guide](../_shared-setup.md) before starting.

For background concepts and security review, see [Rootstock DeFi 101](/resources/guides/defi-101/).

:::caution
**This guide uses a mock Chainlink price feed for educational purposes only. Chainlink Price Feeds and VRF are not officially supported on Rootstock mainnet at this time – only CCIP is confirmed. Do not deploy price feed or VRF consumers on mainnet without checking official Chainlink documentation.**
:::

## Official Chainlink references (verify support before production)

- [VRF supported networks](https://docs.chain.link/vrf/v2-5/supported-networks)
- [Price Feeds addresses](https://docs.chain.link/data-feeds/price-feeds/addresses)

## Part 1: Price Feeds (Mocked for local testing)

### Step 1: Understand the Aggregator Interface

Chainlink price feeds follow the `AggregatorV3Interface`. Let's look at its key functions:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface AggregatorV3Interface {
    // Returns the number of decimals the answer is represented in.
    function decimals() external view returns (uint8);

    // Returns a description of the feed (e.g., "BTC / USD").
    function description() external view returns (string memory);

    // Returns the version of the aggregator.
    function version() external view returns (uint256);

    // Returns the latest round data. This is the main function we'll use.
    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,        // Round identifier
            int256 answer,          // The price (with decimals)
            uint256 startedAt,      // Timestamp when the round started
            uint256 updatedAt,      // Timestamp when the round was last updated
            uint80 answeredInRound  // Round in which the answer was computed
        );
}
```

**Important:** The answer is an int256 (can be negative, but for price feeds it's positive). It includes decimals – for most feeds, it's 8 decimals (e.g., 3000000000 means $30,000.00000000). Always use decimals() to format it correctly.

### Step 2: Write a Simple Price Consumer Contract (educational mock consumer)

Now let's build a contract that fetches the latest price. We'll add safety checks to ensure the price is fresh and valid.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AggregatorV3Interface.sol";

contract PriceConsumer {
    AggregatorV3Interface internal priceFeed;

    /**
     * @param _priceFeed Address of the Chainlink price feed (e.g., BTC/USD on testnet)
     */
    constructor(address _priceFeed) {
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    /**
     * Returns the latest price with safety checks.
     * @return price The latest price as an integer with 8 decimals.
     */
    function getLatestPrice() public view returns (int256) {
        (
            uint80 roundId,
            int256 price,
            ,
            uint256 updatedAt,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();

        // 1. Check staleness: price should have been updated in the last hour.
        require(block.timestamp - updatedAt <= 1 hours, "Price is stale");

        // 2. Ensure the round is complete (answeredInRound >= roundId).
        require(answeredInRound >= roundId, "Round incomplete");

        // 3. Price should be positive.
        require(price > 0, "Invalid price");

        return price;
    }

    /**
     * Returns the number of decimals the price feed uses.
     */
    function getDecimals() public view returns (uint8) {
        return priceFeed.decimals();
    }

    /**
     * Returns a human-readable description of the feed.
     */
    function getDescription() public view returns (string memory) {
        return priceFeed.description();
    }
}
```

**Explanation of safety checks:**

Staleness: If the price hasn't been updated for too long (here, 1 hour), it might be outdated. In a real protocol, you might want a shorter threshold (e.g., 30 minutes) depending on the asset volatility.

Round completeness: answeredInRound should be at least roundId – this ensures the price comes from a completed round, not a pending one.

Positive price: Obvious but good practice.

### Step 3: Test Your Contract with Hardhat (Mock)

Since this guide is intentionally a **mock** implementation, we’ll test the consumer locally using a mock aggregator.

Create a mock aggregator in your test folder.

```solidity
// test/mocks/MockAggregator.sol
pragma solidity ^0.8.0;

import "../../contracts/AggregatorV3Interface.sol";

contract MockAggregator is AggregatorV3Interface {
    uint8 public decimals = 8;
    string public description = "BTC/USD mock";
    uint256 public version = 1;

    int256 private mockPrice = 30000 * 1e8; // $30,000 with 8 decimals

    function latestRoundData() external view override returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    ) {
        return (1, mockPrice, block.timestamp, block.timestamp, 1);
    }

    // Allow tests to update the mock price
    function setMockPrice(int256 _price) external {
        mockPrice = _price;
    }
}
```

**Now the test file:**

```javascript
// test/PriceConsumer.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PriceConsumer", function () {
  let priceConsumer;
  let mockAggregator;

  beforeEach(async function () {
    // Deploy mock aggregator
    const MockAggregator = await ethers.getContractFactory("MockAggregator");
    mockAggregator = await MockAggregator.deploy();
    await mockAggregator.deployed();

    // Deploy PriceConsumer with mock address
    const PriceConsumer = await ethers.getContractFactory("PriceConsumer");
    priceConsumer = await PriceConsumer.deploy(mockAggregator.address);
    await priceConsumer.deployed();
  });

  it("Should return the correct price", async function () {
    const price = await priceConsumer.getLatestPrice();
    expect(price).to.equal(30000 * 1e8);
  });

  it("Should revert if price is stale", async function () {
    // Simulate time passing (increase block timestamp)
    await ethers.provider.send("evm_increaseTime", [2 * 3600]); // 2 hours
    await ethers.provider.send("evm_mine", []); // mine a block

    await expect(priceConsumer.getLatestPrice()).to.be.revertedWith("Price is stale");
  });

  it("Should revert if price is negative", async function () {
    await mockAggregator.setMockPrice(-100);
    await expect(priceConsumer.getLatestPrice()).to.be.revertedWith("Invalid price");
  });
});
```

## Deploy on Rootstock Testnet

Once your contract is tested, you can deploy it to the testnet. Use the Hardhat script:

:::warning
The deployment example below uses a **real address** value in `feedAddress`. This guide’s core learning path is still a **mock-based** implementation. Do not deploy price feed or VRF consumers on Rootstock mainnet without official confirmation in Chainlink’s docs.
:::

```javascript
// scripts/deploy-price-consumer.js
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const feedAddress = "0x76474B42B0c268a268fC6F0D9B0B6f6c3b3C8f"; // BTC/USD testnet feed address

  const PriceConsumer = await ethers.getContractFactory("PriceConsumer");
  const priceConsumer = await PriceConsumer.deploy(feedAddress);
  await priceConsumer.deployed();

  console.log("PriceConsumer deployed to:", priceConsumer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### Run it with:

```bash
npx hardhat run scripts/deploy-price-consumer.js --network rsktestnet
```

## Additional Resources

- [VRF supported networks](https://docs.chain.link/vrf/v2-5/supported-networks)
- [Price Feeds addresses](https://docs.chain.link/data-feeds/price-feeds/addresses)

