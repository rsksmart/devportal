---
sidebar_position: 2
sidebar_label: Oracle Integration
title: 'Interacting with Oracles on Rootstock'
description: 'Fetch reliable off-chain data using oracles on Rootstock – price feeds, randomness, and more. A beginner-friendly guide with step-by-step examples.'
tags: [rsk, rootstock, defi, oracles, chainlink, solidity]
---

:::tip[Why Oracles?]
DeFi protocols need real-world data like asset prices, exchange rates, or random numbers. But blockchains are isolated – they can't access external data directly. Oracles bridge this gap by bringing verified off-chain information onto the blockchain. Rootstock supports multiple decentralized oracle solutions, including **Chainlink** and **Tellor**. This guide focuses on Chainlink Price Feeds and VRF.
:::

# Oracle Integration on Rootstock

Oracles are the bridge between blockchain and external data. On Rootstock, you can use decentralized oracle networks to get tamper-proof price feeds, randomness, and other off-chain information. This guide will walk you through integrating oracles into your smart contracts, with clear, step-by-step examples.

## What You'll Learn

- What oracles are and why they matter in DeFi.
- How to fetch real-time asset prices using Chainlink Price Feeds.
- How to generate verifiable randomness with Chainlink VRF.
- Best practices to keep your oracle data secure and reliable.

## Supported Oracles on Rootstock

Rootstock is EVM-compatible, so most Ethereum oracle solutions work out of the box. Here are the most popular ones:

- **[Chainlink](https://chain.link/)** – The industry standard. Provides decentralized price feeds, randomness (VRF), and more. Chainlink is officially integrated with Rootstock – you can find the latest price feed addresses in the [Chainlink documentation](https://docs.chain.link/docs/rootstock-addresses/).
- **[Tellor](https://tellor.io/)** – A decentralized oracle where reporters stake tokens to submit data. Useful for custom data feeds.
- **[API3](https://api3.org/)** – First-party oracles that provide data directly from APIs using dAPIs.

In this guide, we'll focus on **Chainlink** because it's the most widely adopted and easiest to get started with.

---

## Part 1: Getting Price Feeds with Chainlink

Price feeds are the most common oracle use case. Your DeFi protocol might need to know the current price of BTC/USD, ETH/USD, or any other asset to calculate collateral ratios, liquidate positions, or set swap rates.

### Step 1: Find the Price Feed Address

Chainlink has deployed price feed contracts on Rootstock mainnet and testnet. You need the correct address for the pair you want.

| Network | Chain ID | Example: BTC/USD Feed Address |
|---------|----------|-------------------------------|
| Rootstock Mainnet | 30 | [`0x...` (check official docs)](https://docs.chain.link/docs/rootstock-addresses/) |
| Rootstock Testnet | 31 | [`0x...` (check official docs)](https://docs.chain.link/docs/rootstock-addresses/) |

**Where to find the latest addresses:**  
Visit the [Chainlink Rootstock Addresses](https://docs.chain.link/docs/rootstock-addresses/) page. It lists all available feeds for both mainnet and testnet. For this guide, we'll use a placeholder `0x...` – replace it with the actual address when you deploy.

### Step 2: Understand the Aggregator Interface

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

### Step 3: Write a Simple Price Consumer Contract

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

### Step 4: Test Your Contract with Hardhat

We'll write a test that deploys the contract on a local Hardhat network and fetches the price. Since we don't have a live Chainlink feed on the local network, we'll either use a mock or fork the Rootstock testnet.

#### Option A: Use a Mock (Recommended for Beginners)

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
#### Option B: Fork Rootstock Testnet (More Realistic)

In hardhat.config.js, add a forking configuration:

```javascript
module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: "https://public-node.testnet.rsk.co",
      }
    }
  }
};
```
Then in your test, you can use the actual Chainlink feed address:

```javascript
it("Should fetch real price from testnet fork", async function () {
  // Replace with actual testnet feed address (BTC/USD)
  const feedAddress = "0x..."; // Get from Chainlink docs
  const PriceConsumer = await ethers.getContractFactory("PriceConsumer");
  const priceConsumer = await PriceConsumer.deploy(feedAddress);
  await priceConsumer.deployed();

  const price = await priceConsumer.getLatestPrice();
  expect(price).to.be.gt(0);
});
```

This approach is closer to reality but requires a stable testnet RPC.

### Step 5: Deploy on Rootstock Testnet

Once your contract is tested, you can deploy it to the testnet. Use the Hardhat script:

```javascript
// scripts/deploy-price-consumer.js
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const feedAddress = "0x..."; // Replace with actual BTC/USD testnet feed address

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

#### Part 2: Using Randomness (Chainlink VRF)

Many DeFi applications need randomness – for example, to select a winner in a lottery, assign a random NFT trait, or shuffle a deck. On-chain randomness is tricky because all blockchain data is deterministic. Chainlink VRF (Verifiable Random Function) provides provably fair randomness.

## How Chainlink VRF Works
Your contract requests randomness from Chainlink.

Chainlink's oracle generates a random number off-chain and submits it along with a cryptographic proof.

Your contract verifies the proof and receives the random number.

The entire process is trustless – anyone can verify the proof.

### Step 1: Set Up a VRF Subscription

Chainlink VRF v2 uses a subscription model. You need to:

Create a subscription on the Chainlink VRF v2 app (select Rootstock testnet).

Fund your subscription with LINK tokens (you can get testnet LINK from the Rootstock faucet or Chainlink faucet).

Add your consumer contract address to the subscription.

For detailed steps, see the Chainlink VRF Documentation.

### Step 2: Write a VRF Consumer Contract

Below is a minimal example that requests one random number and stores it.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

contract RandomNumberConsumer is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface COORDINATOR;

    // Your subscription ID.
    uint64 s_subscriptionId;

    // The gas lane to use (key hash). Different gas lanes have different gas prices.
    bytes32 keyHash = 0x...; // Replace with appropriate keyHash for Rootstock testnet

    // Depends on the number of requested values that you want sent to the fulfillRandomWords() function.
    uint32 callbackGasLimit = 100000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    // Number of random values to request.
    uint32 numWords = 1;

    uint256[] public s_randomWords;
    uint256 public s_requestId;

    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    constructor(uint64 subscriptionId, address vrfCoordinator) VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
    }

    // Assumes the subscription is funded sufficiently.
    function requestRandomWords() external {
        // Will revert if subscription is not set and funded.
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        s_randomWords = randomWords;
        emit RequestFulfilled(requestId, randomWords);
    }

    // Helper to view the latest random number.
    function getRandomNumber() public view returns (uint256) {
        require(s_randomWords.length > 0, "No random number available");
        return s_randomWords[0];
    }
}
```
**Important:**

You must replace keyHash with the correct value for Rootstock testnet. Find it in the Chainlink VRF Docs.

The vrfCoordinator address for Rootstock testnet is also in the docs.

### Step 3: Test VRF with a Local Mock

Testing VRF on a local network is challenging because you need the oracle to respond. A common approach is to use a mock coordinator. However, for simplicity, you can test the request flow and then rely on testnet for end-to-end testing.

## Security Considerations for Oracles

Using oracles securely is critical. Here are best practices with code examples:

### 1. Always Check Staleness

As shown in the price feed example, ensure the data is recent. The acceptable staleness depends on your use case – for volatile assets, you might want a shorter threshold.

```solidity
require(block.timestamp - updatedAt <= 30 minutes, "Feed is stale");
```
### 2. Use Multiple Sources (Medianizer)

Relying on a single oracle can be dangerous if it gets hacked or goes offline. Consider aggregating multiple independent feeds.

```solidity
function getMedianPrice() external view returns (uint256) {
    uint256 price1 = getPriceFromChainlink();
    uint256 price2 = getPriceFromTellor();
    uint256 price3 = getPriceFromAPI3();
    uint256[] memory prices = new uint256[](3);
    prices[0] = price1;
    prices[1] = price2;
    prices[2] = price3;
    return median(prices);
}

function median(uint256[] memory values) internal pure returns (uint256) {
    // Sort and return middle value (simplified)
    // In production, use a proper sorting algorithm.
}
```

### 3. Handle Round Incompleteness

Always verify that answeredInRound >= roundId. This ensures you're not using a price from an incomplete round.

### 4. Use Circuit Breakers

If the price deviates too much from the previous price, pause the protocol or require manual intervention.

```solidity
uint256 public lastPrice;
uint256 public constant MAX_DEVIATION = 10; // 10%

function checkPrice() external {
    uint256 currentPrice = uint256(getLatestPrice());
    if (currentPrice > lastPrice * (100 + MAX_DEVIATION) / 100 ||
        currentPrice < lastPrice * (100 - MAX_DEVIATION) / 100) {
        // Emit alert or pause
    }
    lastPrice = currentPrice;
}
```
### 5. Be Aware of Flash Loan Attacks

Even with oracles, flash loans can temporarily manipulate spot prices. If your protocol uses a spot price from a low-liquidity DEX, an attacker could manipulate it. Consider using time-weighted average prices (TWAP) from oracles like Chainlink (which already aggregates) or from DEXs themselves.

## Conclusion

You've learned how to integrate Chainlink Price Feeds and VRF into your Rootstock smart contracts. Oracles are a powerful tool that unlock countless DeFi possibilities. Remember:

Always verify the freshness and validity of oracle data.

Use multiple sources for critical values.

Test thoroughly, including edge cases like stale data.

Next, explore the AMM Basics guide to build your first decentralized exchange on Rootstock!

## Additional Resources

- [Chainlink Rootstock Documentation](https://docs.chain.link/ccip/directory/mainnet/chain/rootstock-mainnet)

- [Chainlink VRF Documentation](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number)

- [Tellor Documentation](https://docs.tellor.io/tellor/)

- [API3 Documentation](https://docs.api3.org/)