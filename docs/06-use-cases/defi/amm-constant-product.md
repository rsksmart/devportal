---
sidebar_label: Constant-Product AMM
sidebar_position: 1
title: Build a Constant-Product AMM on Rootstock (Testnet)
description: Build, test, and deploy a minimal constant-product AMM (x*y=k) on Rootstock testnet, then wire it to a simple frontend.
tags: [rsk, rootstock, defi, amm, uniswap, solidity, testnet]
---

# Build a Constant-Product AMM on Rootstock (Testnet)

By the end of this tutorial, you will have:

- A working `SimpleAMM` constant‑product AMM contract deployed on **Rootstock testnet**
- A Hardhat test suite that validates add/remove liquidity and swaps
- A basic example of how to wire the contract into a frontend

**Prerequisites**: Follow the [Shared Setup Guide](../_shared-setup.md) before starting.

For background concepts, token standards, and security review, see [Rootstock DeFi 101](/resources/guides/defi-101/).

::::warning[Educational only]
This tutorial is a minimal implementation for learning and experimentation. Before shipping to production, review [Rootstock DeFi 101](/resources/guides/defi-101/) and get professional audits.
::::

## Our SimpleAMM Contract

We'll build a contract that supports:
- Adding liquidity
- Removing liquidity
- Swapping token A for token B (and vice versa)
- Computing swap amounts

### 1. Contract Setup and State Variables

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleAMM {
    IERC20 public tokenA;
    IERC20 public tokenB;

    uint256 public reserveA;
    uint256 public reserveB;

    uint256 public totalLiquidity;
    mapping(address => uint256) public liquidity;

    // Events for tracking
    event LiquidityAdded(address indexed provider, uint256 amountA, uint256 amountB);
    event LiquidityRemoved(address indexed provider, uint256 amountA, uint256 amountB);
    event Swapped(address indexed swapper, address tokenIn, uint256 amountIn, address tokenOut, uint256 amountOut);

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }
    // ... functions will go here
}
```
### Explanation:

- tokenA and tokenB are the ERC-20 tokens the pool will trade.

- reserveA and reserveB track the current reserves in the pool.

- totalLiquidity is the total supply of LP tokens.

- liquidity maps each address to their LP token balance.

- Events help off-chain monitoring (e.g., for a frontend).

## 2. Adding Liquidity

Liquidity providers (LPs) deposit an equivalent value of both tokens. The number of LP tokens they receive depends on the current pool size.

```solidity
function addLiquidity(uint256 amountA, uint256 amountB) external {
    require(amountA > 0 && amountB > 0, "Amounts must be >0");

    // Transfer tokens from user to contract
    tokenA.transferFrom(msg.sender, address(this), amountA);
    tokenB.transferFrom(msg.sender, address(this), amountB);

    uint256 lpTokens;
    if (totalLiquidity == 0) {
        // First deposit: LP tokens = sqrt(amountA * amountB)
        lpTokens = sqrt(amountA * amountB);
    } else {
        // Subsequent deposits: proportional to existing reserves
        lpTokens = min(
            (amountA * totalLiquidity) / reserveA,
            (amountB * totalLiquidity) / reserveB
        );
    }
    require(lpTokens > 0, "Insufficient liquidity minted");

    liquidity[msg.sender] += lpTokens;
    totalLiquidity += lpTokens;

    reserveA += amountA;
    reserveB += amountB;

    emit LiquidityAdded(msg.sender, amountA, amountB);
}
```

### How it works:

The user must first approve the contract to spend their tokens (done off-chain).

For the first deposit, we set LP tokens to the geometric mean (sqrt(amountA * amountB)) to avoid rounding issues.

For later deposits, the LP tokens are calculated proportionally to the smaller contribution relative to existing reserves. This ensures fairness.

Reserves and totalLiquidity are updated.

The user receives LP tokens representing their share.

## 3. Removing Liquidity

LP holders can burn their LP tokens to withdraw their share of reserves.

```solidity
function removeLiquidity(uint256 lpTokens) external {
    require(lpTokens > 0 && liquidity[msg.sender] >= lpTokens, "Insufficient LP tokens");

    uint256 amountA = (lpTokens * reserveA) / totalLiquidity;
    uint256 amountB = (lpTokens * reserveB) / totalLiquidity;
    require(amountA > 0 && amountB > 0, "Insufficient tokens withdrawn");

    liquidity[msg.sender] -= lpTokens;
    totalLiquidity -= lpTokens;
    reserveA -= amountA;
    reserveB -= amountB;

    tokenA.transfer(msg.sender, amountA);
    tokenB.transfer(msg.sender, amountB);

    emit LiquidityRemoved(msg.sender, amountA, amountB);
}
```

#### Calculation:

The user's share = lpTokens / totalLiquidity.

Multiply that share by each reserve to get amounts to withdraw.

## 4. Swapping Tokens

The core of an AMM: users trade one token for the other. We'll implement two functions: swapAforB and swapBforA.

```solidity
function swapAforB(uint256 amountAIn, uint256 amountBOutMin) external {
    require(amountAIn > 0, "Amount in must be >0");
    uint256 amountBOut = getAmountOut(amountAIn, reserveA, reserveB);
    require(amountBOut >= amountBOutMin, "Slippage too high");
    require(amountBOut <= reserveB, "Insufficient liquidity");

    tokenA.transferFrom(msg.sender, address(this), amountAIn);
    tokenB.transfer(msg.sender, amountBOut);

    reserveA += amountAIn;
    reserveB -= amountBOut;

    emit Swapped(msg.sender, address(tokenA), amountAIn, address(tokenB), amountBOut);
}

function swapBforA(uint256 amountBIn, uint256 amountAOutMin) external {
    require(amountBIn > 0, "Amount in must be >0");
    uint256 amountAOut = getAmountOut(amountBIn, reserveB, reserveA);
    require(amountAOut >= amountAOutMin, "Slippage too high");
    require(amountAOut <= reserveA, "Insufficient liquidity");

    tokenB.transferFrom(msg.sender, address(this), amountBIn);
    tokenA.transfer(msg.sender, amountAOut);

    reserveB += amountBIn;
    reserveA -= amountAOut;

    emit Swapped(msg.sender, address(tokenB), amountBIn, address(tokenA), amountAOut);
}
```

### Key points:

getAmountOut computes the output amount based on the constant product formula with a 0.3% fee.

amountBOutMin protects the user from slippage – the transaction reverts if the actual output is less than this minimum.

Reserves are updated after the swap.

## 5. Computing Output Amount

The core formula for a swap (with fee) is:

```text
amountInWithFee = amountIn * 997
numerator = amountInWithFee * reserveOut
denominator = (reserveIn * 1000) + amountInWithFee
amountOut = numerator / denominator
```
This is derived from:

New reserveIn' = reserveIn + amountIn (but with fee, only 99.7% of amountIn actually enters the pool, the rest stays as fee).

The product (reserveIn + 0.997*amountIn) * (reserveOut - amountOut) = reserveIn * reserveOut.

```solidity
function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) public pure returns (uint256) {
    uint256 amountInWithFee = amountIn * 997; // 0.3% fee
    uint256 numerator = amountInWithFee * reserveOut;
    uint256 denominator = (reserveIn * 1000) + amountInWithFee;
    return numerator / denominator;
}
```

## 6. Utility Functions: sqrt and min

We need a square root function for initial LP token calculation, and a min function.

```solidity
function sqrt(uint256 y) internal pure returns (uint256 z) {
    if (y > 3) {
        z = y;
        uint256 x = y / 2 + 1;
        while (x < z) {
            z = x;
            x = (y / x + x) / 2;
        }
    } else if (y != 0) {
        z = 1;
    }
}

function min(uint256 a, uint256 b) internal pure returns (uint256) {
    return a < b ? a : b;
}
```

The sqrt function implements the Babylonian method (Newton's method) for integer square roots.

## Deploying and Testing with Hardhat

Now we'll write tests to ensure our AMM works correctly.

### Prerequisites

**Prerequisites**: Follow the [Shared Setup Guide](../_shared-setup.md) before starting.

### Test Setup

We'll use Hardhat with ethers and Chai for testing. First, create a test file `test/SimpleAMM.test.js`.

You'll also need a mock ERC20 token for testing. Create `contracts/ERC20Mock.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Mock is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals
    ) ERC20(name, symbol) {
        _setupDecimals(decimals);
    }
    
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
    
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
    
    uint8 private _decimals;
}
```

Now create the test file:

```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleAMM", function () {
  let tokenA, tokenB, amm, owner, user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // Deploy mock ERC-20 tokens
    const Token = await ethers.getContractFactory("ERC20Mock");
    tokenA = await Token.deploy("Token A", "TKA", 18);
    tokenB = await Token.deploy("Token B", "TKB", 18);
    await tokenA.deployed();
    await tokenB.deployed();

    // Deploy AMM
    const AMM = await ethers.getContractFactory("SimpleAMM");
    amm = await AMM.deploy(tokenA.address, tokenB.address);
    await amm.deployed();

    // Mint tokens to owner and approve AMM
    await tokenA.mint(owner.address, ethers.utils.parseEther("1000"));
    await tokenB.mint(owner.address, ethers.utils.parseEther("1000"));
    await tokenA.approve(amm.address, ethers.utils.parseEther("1000"));
    await tokenB.approve(amm.address, ethers.utils.parseEther("1000"));
  });

  // Tests go here
});
```

### Test: Adding Initial Liquidity

```javascript
it("Should add initial liquidity", async function () {
    await amm.addLiquidity(ethers.utils.parseEther("100"), ethers.utils.parseEther("100"));
    expect(await amm.reserveA()).to.equal(ethers.utils.parseEther("100"));
    expect(await amm.reserveB()).to.equal(ethers.utils.parseEther("100"));
    expect(await amm.totalLiquidity()).to.equal(ethers.utils.parseEther("100")); // sqrt(100e18 * 100e18) = 100e18
});
```

### Test: Swapping

```javascript
it("Should swap tokenA for tokenB", async function () {
    await amm.addLiquidity(ethers.utils.parseEther("100"), ethers.utils.parseEther("100"));

    const amountIn = ethers.utils.parseEther("10");
    const expectedOut = await amm.getAmountOut(amountIn, ethers.utils.parseEther("100"), ethers.utils.parseEther("100"));
    // expectedOut ≈ 9.07 (since 10*997 / (100*1000+9970) * 100 = 9970 / (100000+9970) * 100 = 9970/109970*100 ≈ 9.07)

    await amm.swapAforB(amountIn, expectedOut.sub(1)); // allow slight slippage

    const newReserveA = ethers.utils.parseEther("110");
    const newReserveB = ethers.utils.parseEther("90.9..."); // roughly 90.909...
    expect(await amm.reserveA()).to.be.closeTo(newReserveA, ethers.utils.parseEther("0.1"));
    expect(await amm.reserveB()).to.be.closeTo(newReserveB, ethers.utils.parseEther("0.1"));
});
```

The closeTo matcher handles small rounding differences.

### Test: Slippage Protection

```javascript
it("Should revert if slippage too high", async function () {
    await amm.addLiquidity(ethers.utils.parseEther("100"), ethers.utils.parseEther("100"));
    const amountIn = ethers.utils.parseEther("10");
    const expectedOut = await amm.getAmountOut(amountIn, ethers.utils.parseEther("100"), ethers.utils.parseEther("100"));
    // Set minimum out higher than expected
    await expect(amm.swapAforB(amountIn, expectedOut.add(1))).to.be.revertedWith("Slippage too high");
});

### Test: Removing Liquidity

```javascript
it("Should remove liquidity", async function () {
    await amm.addLiquidity(ethers.utils.parseEther("100"), ethers.utils.parseEther("100"));
    const lpTokens = await amm.liquidity(owner.address);
    await amm.removeLiquidity(lpTokens);
    expect(await amm.reserveA()).to.equal(0);
    expect(await amm.reserveB()).to.equal(0);
    expect(await tokenA.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("1000"));
    expect(await tokenB.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("1000"));
});
```

## Integrating with a React Frontend

To interact with the AMM from a web app, you'll need:

ethers.js or web3.js

AMM contract address and ABI

User's wallet (e.g., MetaMask)

### Getting the Contract ABI

First, compile your Solidity contract to generate the ABI:

```bash
npx hardhat compile
```

This will create the ABI in `artifacts/contracts/SimpleAMM.sol/SimpleAMM.json`. Copy this file to your frontend project and import it as shown below.

### Example: Swap Component

```jsx
import { ethers } from 'ethers';
import { useState } from 'react';
import AMM_ABI from './SimpleAMM.json'; // ABI from compilation

const Swap = ({ ammAddress }) => {
  const [amountIn, setAmountIn] = useState('');
  const [loading, setLoading] = useState(false);

  const swap = async () => {
    if (!window.ethereum) return alert('Install MetaMask');
    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const amm = new ethers.Contract(ammAddress, AMM_ABI, signer);

      // Approve tokenA spending (if not already approved)
      const tokenAAddress = await amm.tokenA();
      const tokenA = new ethers.Contract(tokenAAddress, ['function approve(address spender, uint256 amount)'], signer);
      const txApprove = await tokenA.approve(ammAddress, ethers.utils.parseEther(amountIn));
      await txApprove.wait();

      // Get expected output (optional)
      const reserveA = await amm.reserveA();
      const reserveB = await amm.reserveB();
      const expectedOut = await amm.getAmountOut(ethers.utils.parseEther(amountIn), reserveA, reserveB);
      const minOut = expectedOut.mul(95).div(100); // 5% slippage tolerance

      // Execute swap
      const txSwap = await amm.swapAforB(ethers.utils.parseEther(amountIn), minOut);
      await txSwap.wait();
      alert('Swap successful!');
    } catch (error) {
      console.error(error);
      alert('Swap failed');
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={amountIn}
        onChange={(e) => setAmountIn(e.target.value)}
        placeholder="Amount of Token A"
      />
      <button onClick={swap} disabled={loading}>
        {loading ? 'Swapping...' : 'Swap A for B'}
      </button>
    </div>
  );
};
```

### Getting the Contract Address

After deploying your contract, you'll get the contract address from the deployment output. Save this address and use it in your frontend component's `ammAddress` prop. You can also find it in the deployment transaction logs or by checking the block explorer for the network you deployed to.

### Security Considerations

When building an AMM for production, consider these additional safeguards:

Reentrancy: Although our functions don't make external calls that could re-enter, it's good practice to use OpenZeppelin's ReentrancyGuard on all external functions.

Integer Division: Solidity truncates division. Always multiply before dividing to preserve precision.

Slippage Protection: Always let users specify a minimum output amount.

Deadlines: Include a deadline parameter to prevent transactions from being executed too late (e.g., after a price change).

Flash Loan Attacks: Our simple AMM is vulnerable to price manipulation via flash loans. In production, use TWAP oracles or other mechanisms.

Rounding Errors: The sqrt function may have small rounding errors. For a real AMM, consider using a library like UniswapV2Library for precise calculations.

### Deploying to Rootstock

#### Then run:

```bash
npx hardhat run scripts/deploy.js --network rsktestnet
```

## Conclusion

You've built a simple AMM from scratch! You learned:

- How to add/remove liquidity.

- How to swap tokens with slippage protection.

- How to test and deploy the contract.

- How to integrate with a React frontend.

