---
sidebar_label: Cross-Chain RBTC Lending Starter Kit
sidebar_position: 3
title: Build a Cross-Chain Lending dApp using rBTC & USDT0 on Rootstock  
description: 'A minimal rBTC-collateralized lending starter kit for Rootstock. Includes mock oracle integration, USDT0 ERC-20 support, and guidance for extending the system with LayerZero and Umbrella/RedStone price feeds.'
tags: [rsk, rootstock, rbtc, usdt0, lending, cross-chain, layerzero, umbrella, redstone, smart contracts, tutorials]
---

:::info[Info]

This is the **comprehensive tutorial** for the rBTC-USDT0 cross‑chain lending starter kit.

:::

## Introduction

This guide walks you through building, deploying, and using a minimal over‑collateralized lending protocol on Rootstock. Whether you're an Ethereum developer exploring Bitcoin‑backed DeFi or new to Rootstock, this hands‑on tutorial covers everything: from cloning the code to interacting with the deployed contracts via a UI.

No prior knowledge of LayerZero or cross‑chain protocols is required. We'll explain every architectural decision and code pattern, with a particular focus on the teleport‑style messaging model that powers collateral transfer, the oracle routing pattern that separates price feeds from lending logic, and the Loan‑to‑Value (LTV) solvency checks that protect the protocol.

By the end of this tutorial you will have:

* Deployed a complete lending protocol on Rootstock testnet
* Understood how cross–chain messaging works via LayerZero
* Learned the oracle router pattern for decoupled price feeds
* Tested the system end–to–end with the React/Vite frontend
* Built a mental model for extending the starter kit toward production

A screenshot of the finished UI (the target end‑state for this guide) is shown below:

![Screenshot of the demo dApp](https://github.com/user-attachments/assets/6a27ce27-d680-437a-82c2-1b8538e16569)

*Figure 1: Demo dApp UI after a successful borrow (rBTC 0.00025 collateral, 1 USDT0 debt, $65k rBTC price).*

Below is an architecture illustration showing the high-level system flow:

![Project architecture illustration](https://github.com/user-attachments/assets/1e288f88-29d2-4ad3-926b-5bb5b5ba3203)

*Figure 2: Cross-chain lending architecture from source chain deposit to destination chain borrowing on Rootstock.*

## Why build on Rootstock?

Rootstock (RSK) is an L2 solution secured by Bitcoin's mining power. Key benefits for developers:

* **Bitcoin compatibility:** smart contracts can rely on rBTC and the Bitcoin security model.
* **EVM compatibility:** use the same Solidity, Hardhat, ethers.js, Metamask, etc.
* **Low fees & high throughput:** test cheaply and scale without congestion.
* **Open source tooling:** the entire stack is public and free to use.

This starter kit demonstrates a cross‑chain over‑collateralized lending flow that leverages Rootstock's features while remaining easy to understand.  

## Core architecture

The protocol is intentionally minimal. It consists of three logical layers:

1. **Cross‑chain messaging:** `LZSender` and `LZReceiver` using LayerZero to teleport collateral signals.
2. **Lending logic:** `LendingPool` manages rBTC collateral and USDT0 debt with LTV checks.
3. **Oracle routing:** `OracleRouter` delegates price requests to adapters (e.g., `UmbrellaOracleAdapter` or `FixedPriceOracle`).
  

### Key contract responsibilities  

* **`LZSender` / `LZBorrowSender` / `LZRepaySender`:** source‑chain entry points. They accept rBTC, encode the user address + amount, and call `endpoint.send(...)` with one of three message types (deposit, borrow, repay). Look at `contracts/crosschain/LZSender.sol` for the encoding logic; messages are simply `(uint8 msgType, address user, uint256 amount)`.
* **`LZReceiver`:** destination chain validator. It enforces replay protection, verifies `trustedRemote` addresses, and dispatches the payload to the pool. The three message types are handled in `lzReceive`, which conditionally calls `depositRBTC`, `borrowUSDT0For` or `repayUSDT0For`. See the implementation below:
  

```solidity
// excerpt from LZReceiver.lzReceive
(uint8 msgType, address user, uint256 amount) =
abi.decode(_payload, (uint8, address, uint256));

if (msgType == MSG_DEPOSIT) {
   lendingPool.depositRBTC{value: amount}(user);

} else if (msgType == MSG_BORROW) {
   lendingPool.borrowUSDT0For(user, amount);

} else if (msgType == MSG_REPAY) {
   lendingPool.repayUSDT0For(user, amount);

} else {
   revert("INVALID_MSG");
}
``` 

* **`LendingPool`:** the core accounting engine. It stores two mappings (`collateralRBTC` and `debtUSDT0`) keyed by user address and exposes public methods for deposit, withdraw, borrow and repay. The `onlyDepositor` modifier restricts cross‑chain deposit/borrow/repay calls to the `crossChainDepositor` address (set to the `LZReceiver`). Solvency is calculated in `_isSolvent`, which fetches the rBTC price from the oracle router and applies the configured `ltvBps`.


```solidity
function _isSolvent(uint256 collateralWei, uint256 debtAmount) internal view returns (bool) {
   uint256 rbtcPrice;
   try oracle.getPrice(address(0)) returns (uint256 price) {
      rbtcPrice = price;
   } catch {
      rbtcPrice = 65_000e18; // testnet fallback
   }
   uint256 collateralUsd = (collateralWei * rbtcPrice) / 1e18;
   uint256 debtUsd = (debtAmount * 1e18) / USDT0_SCALE;
   uint256 maxDebtUsd = (collateralUsd * ltvBps) / 10_000;
   return debtUsd <= maxDebtUsd;
}
```

* **`OracleRouter`:** simple ownership‑controlled mapping of asset→oracle. The router delegations allow you to swap out price feeds without touching the pool.  

```solidity
function getPrice(address asset) external view returns (uint256) {
   IPriceOracle oracle = oracles[asset];
   require(address(oracle) != address(0), "NO_ORACLE");
   return oracle.getPrice(asset);
}

```

* **Adapters:** `UmbrellaOracleAdapter` implements the `IPriceOracle` interface and wraps the Umbrella on‑chain reader. It normalizes decimals and enforces `MAX_DELAY`. A `FixedPriceOracle` simply returns a hard‑coded value and is used for testnet demonstrations.

These contracts, together with a handful of mocks (`MockLZEndpoint`, `MockUSDT0`, etc.), make up the entire logic of the starter kit. Supporting contracts include mocks for testing and a simple React frontend that consumes the deployed contracts. A high‑level diagram is shown as follows:

![Figure 3: High-level Illustration of Contract Interaction](https://github.com/user-attachments/assets/c4fba95d-0f8f-4dc8-b11c-1baa38ba3476)

*Figure 3: High-level illustration of contract interaction*


## Prerequisites

Install the following tools before you begin. Versions shown are examples; newer versions are usually fine.

* **Git:** `git --version` should print ≥ 2.20
* **Node.js:** v18 or later (`node -v`)
* **npm or yarn:** package manager
* **Hardhat:** installed locally (no global install needed)
* **MetaMask:** or similar Web3 wallet, configured with Rootstock testnet

  
## Cloning and initial setup

Start by cloning the repository and moving into it:


```bash
git clone https://github.com/entuziaz/rbtc-usdt0-crosschain-starter-kit.git
cd rbtc-usdt0-crosschain-starter-kit
```

  

The project root contains a Hardhat config, scripts, contracts, tests, and a `frontend/` subdirectory for the React UI.
  

## Environment configuration

Create a `.env` file in the project root. This file is ignored by git and will store sensitive data such as keys and RPC URLs.

```text
# .env
PRIVATE_KEY=0xYOUR_TESTNET_PRIVATE_KEY # account that will deploy contracts
ROOTSTOCK_RPC_URL=https://rpc.testnet.rootstock.io/<RPC_API_KEY>
LZ_ENDPOINT=0xB6318... # LayerZero testnet endpoint for Rootstock
USE_FIXED_ORACLE=true # force deterministic pricing on testnet
USE_MOCK_USDT0=true # deploy a mock USDT0 token
LTV_BPS=7000 # 70% Loan-to-Value ratio (in basis points)
```
You can get your Rootstock RPC API URL by following the official guide on [Getting Started with the Rootstock RPC API](https://dev.rootstock.io/developers/rpc-api/rootstock/setup/).

:::warning[Warning]

Never commit this file. In production you would use a secrets manager or hardware wallet.

:::

The Hardhat config (`hardhat.config.cjs`) reads the above variables to define the `rsktest` network, deployer account and other behaviour. You can inspect it if you want to customise gas settings or add more networks.

## Installing dependencies

Install JS packages in both root and frontend directories:

```bash
npm install # root for contracts & deploy scripts
cd frontend && npm install # frontend UI dependencies
cd .. # back to project root
```

This populates `node_modules/` and ensures Hardhat and ethers are available.

  
## Compiling contracts and generating ABIs

Contracts are written in Solidity (`contracts/` subfolders). To compile them:

```bash
npx hardhat compile
```

Compilation output (bytecode, ABI, metadata) appears in `artifacts/` and `cache/`. The frontend imports ABIs directly from `artifacts/`; therefore, you must compile before starting the UI or it will fail to locate ABIs.

> You can re‑compile anytime, and the React app will hot‑reload the updated ABI if running.

## Running the test suite

A comprehensive test suite lives in `test/` and uses Mocha/Chai. Run all tests with:

```bash
npx hardhat test
```

Key test files:

* **`lending/LendingPool.test.js`:** sanity checks for collateral, debt, borrow, repay, withdrawal and solvency math.
* **`integration/LendingPoolWithRouter.test.js`:** ensures the OracleRouter wiring returns the correct price.
* **`crosschain/LZReceiver.test.js`:** verifies message validation, replay protection, and receiver behaviour.
* **`crosschain/CrossChainBorrow.test.js`:** end‑to‑end cross‑chain borrow flow using mocked LayerZero endpoints.

The mocks directory contains `MockLZEndpoint.sol`, `MockOracle.sol`, `MockUSDT0.sol` etc., which simulate external systems so tests can run quickly offline. Example invocation of a single file:


```bash
npx hardhat test test/crosschain/CrossChainBorrow.test.js
```

All tests should pass. If they fail, delete `artifacts/` and `cache/` and try again. Sometimes stale compiled artifacts cause mismatch errors.

## Deployment walkthrough

### Deploy script

`scripts/deploy.js` deploys the protocol contracts in order:

1. `OracleRouter` and either `FixedPriceOracle` or `UmbrellaOracleAdapter` depending on `USE_FIXED_ORACLE`
2. `MockUSDT0` (if `USE_MOCK_USDT0` is true) and mints an initial supply
3. `LendingPool` and deploys `LZReceiver` with an unlinked pool address
4. Links the receiver to the pool via `receiver.setLendingPool(lendingPool.address)`
5. Optionally seeds the pool with USDT0 for testing

All addresses printed by the script are needed for the frontend.
  
```bash
npx hardhat run scripts/deploy.js --network rsktest
```

A sample output looks like:

```
Deploying with: 0x...

OracleRouter: 0x...
Fixed Oracle: 0x...
RBTC oracle registered

Mock USDT0: 0x...
Minted 1,000,000 USDT0 to deployer

LZReceiver: 0x...
LendingPool: 0x...
Receiver linked to LendingPool

Seeded pool with 500,000 USDT0
Deployment complete ✅
```
> Addresses will vary; keep them for the frontend or explorer verification.

#### Verifying on Explorer

Optionally verify contracts on the Rootstock testnet explorer:

```bash
npx hardhat verify --network rsktest <ADDRESS> "<constructor args>"
```

### Manual setup of environment variables for frontend

After deployment, create a `.env` file inside `frontend/` with the contract addresses:
  

```text
VITE_ORACLE_ROUTER="0x..."
VITE_LENDING_POOL="0x..."
VITE_USDT0="0x..." # only if using mock USDT0
```

This file is read by Vite during build.

## Using the frontend dApp

The React app illustrates a full deposit/borrow/repay cycle. Navigate to the app directory on the terminal with the following command:

```bash
cd frontend
```

Then, run the client with the following command:

```bash
npm run dev # launches at http://localhost:3000
```

1. Open the URL in your browser.

2. Connect MetaMask (make sure the network is set to Rootstock Testnet).  

3. If you deployed a mock, it will automatically request ERC20 approvals when interacting.

4. You can read the current rBTC price (fixed or umbrella-based).

5. Use the "deposit" button (or developer "devDepositRBTC" if testnet faucet is empty).

6. Borrow USDT0, repay, and withdraw. The UI shows your collateral and debt balances.

> The UI is intentionally minimal and educational; it demonstrates contract calls without production‑level polish. The screenshot at the top of this guide shows a typical state after the user has deposited a small amount of rBTC, borrowed 1 USDT0, and the fixed price oracle reports $65 000 per rBTC. The message banner and buttons correspond directly to functions in `App.jsx`.

### Frontend wiring details

`frontend/src/contracts.js` creates ethers contract instances using the deployed addresses and ABI files:

```js

import { ethers } from "ethers";
import LendingPoolAbi from "../artifacts/contracts/core/LendingPool.sol/LendingPool.json";

export function getContracts(provider, addresses) {
   return {
      lendingPool: new ethers.Contract(addresses.lendingPool, LendingPoolAbi.abi, provider.getSigner()),
   /* ... other contracts ... */
   };
}
``` 

ABIs are imported directly from the Hardhat `artifacts/` directory, which is why a successful compile is required before `npm run dev`. The `.env` file in the frontend simply exports the addresses consumed by this module.

Proper MetaMask configuration is essential. Make sure an Rootstock testnet network entry exists and the current account holds at least 0.001 rBTC. Use the Rootstock faucet to top up if necessary.

### Frontend folder structure

```
frontend/
├─ index.html
├─ vite.config.js
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   └─ contracts.js
```

Notice that `contracts.js` exports the frontend-friendly contract objects using the ABIs from `artifacts/`.

## Protocol mechanics

### Borrowing logic

Once the `LendingPool` has credited collateral (via either an on‑chain deposit or cross‑chain message), a user can borrow USDT0:

```solidity
// called on Rootstock
pool.borrowUSDT0(500 * 1e6); // 500 USDT0 (6 decimals)
```

The pool checks solvency using the current rBTC price. If the position would become under‑collateralized, the call reverts.

### Repayment logic

To repay, the user must approve the pool (for USDT0) then call:

```solidity
usdt0.approve(address(pool), 100 * 1e6);
pool.repayUSDT0(100 * 1e6);
```  

The contract reduces the stored debt amount accordingly.

### Collateral withdrawal

Users may withdraw rBTC as long as the resulting position remains solvent:

```solidity
pool.withdrawRBTC(0.01 ether);
```

Internally this triggers the same `_isSolvent` check with the reduced collateral amount.

### Solvency math

Solvency is maintained using a fixed LTV expressed in basis points (BPS). The internal check is:

```text
debtUSD ≤ collateralUSD × (LTV / 10,000)
```

Where collateralUSD = collateralRBTC × RBTC_USD_price and debtUSD = debtUSDT0 × $1 (invariant). The `LendingPool` implements the logic in `_isSolvent` which is used during borrow and withdrawal operations.

### One‑time receiver wiring

`LZReceiver` is deployed without a pool address. After deployment the owner must link it:

```solidity
receiver.setLendingPool(lendingPool.address);
```

This two‑step process prevents misconfiguration during deployment.

## Oracle setup and pricing model

The protocol distinguishes between **market assets** (rBTC) and **accounting units** (USDT0). Only market assets require external price feeds.

### Price sources

| Asset | Price Source | Notes |

|-------|--------------|-------|

| rBTC | UmbrellaOracleAdapter or FixedPriceOracle | fixed oracle is used on testnet for deterministic behaviour |

| USDT0 | Protocol invariant (1 USD) | no oracle required |

The `OracleRouter` maintains a mapping from asset address to an adapter contract. This allows the owner to upgrade or change price sources without touching the lending logic.

#### Registering an oracle

In deployment (or manually), register an oracle:

```javascript
await oracleRouter.setOracle(rbtcAddress, adapter.address);
```

Adapters must be bound to a single asset upon construction and perform decimal normalization.

### Testnet vs mainnet mode

The repository supports two deployment modes controlled by the `USE_FIXED_ORACLE` environment variable.

* **Testnet mode (default)**: deploys `FixedPriceOracle` with a constant price (e.g., $1000 per rBTC). This ensures the end‑to‑end lending flow works even when Umbrella feeds are unavailable.
* **Mainnet mode**: deploys `UmbrellaOracleAdapter` wired to the on‑chain Umbrella price reader. Use this when targeting Rootstock mainnet.

Setting `USE_FIXED_ORACLE=true` in your `.env` (or command line) triggers the fixed oracle path.

  
  

## Cross-chain flow explained

### User action

On the source chain (any EVM), the user invokes `LZSender.sendRBTC()` attaching rBTC value. The sender contract:

* Locks the rBTC (e.g., via `receive()` or `payable` function)
* Constructs a payload containing the recipient address and amount
* Calls the LayerZero endpoint's `send()` method with the payload and native value


### Receiver validation

On Rootstock, the `LZReceiver` contract implements `lzReceive()` (called by LayerZero). It performs:

* **Replay protection**: computes a hash of `(srcChainId, srcAddress, nonce)` and ensures it hasn't been processed
* **Authenticity**: checks that `srcAddress` matches the configured `trustedRemote` for `srcChainId`
* **Execution**: forwards the rBTC value and the `onBehalfOf` address to `lendingPool.depositRBTC{value: amount}(onBehalfOf)`

### Deposit and borrow

`LendingPool.depositRBTC()` increases the user's collateral balance and emits an event. After deposit, the user can call `borrowUSDT0()` directly on Rootstock.

> ⚠️ The system operates on **signaling** rather than bridging. The rBTC is already on Rootstock; you are only sending a message to credit the collateral.

### Timing risk

Because the collateral value is validated on the **destination chain** using the current price, rapid price swings between the send and receive events can cause the borrow to fail. This is a deliberate safety feature.


## Known limitations

Before extending or publishing this code, be aware of the starter kit's intentional constraints: 

* **Testnet oracle availability:** Umbrella price feeds are often unavailable on Rootstock testnet; the fixed oracle is used instead. On testnet `getPrice()` may revert, and the UI switches to a default value. This is why the deployment script exposes `USE_FIXED_ORACLE`.
* **Mocked messaging:** the `MockLZEndpoint` in tests does not represent a real bridge. Cross‑chain behaviour is simulated; your production system must deploy real LayerZero endpoints and manage assets accordingly.
* **No liquidations:** there is no mechanism to seize collateral. Under‑collateralized positions simply block further borrowing or withdrawals.
* **No interest or governance:** debt does not accrue interest, and there is no on‑chain administration beyond the owner of the router and receiver.
* **Faucet restrictions:** Rootstock testnet faucet limits to ≈0.001 rBTC/day, so the `devDepositRBTC()` helper and small borrow amounts exist to work around this.

These limitations are deliberate for educational clarity; the tutorial explains how to remove each one when moving toward production.

## Security considerations

The README's security section is reproduced here with extra context:

* **Role isolation**: only `LZReceiver` may call `depositRBTC` thanks to the `onlyDepositor` modifier. Do **not** set this to an EOA.
* **Oracle staleness**: adapters enforce `MAX_DELAY` to avoid using outdated prices. Adjust this to match your feed's heartbeat.
* **Bridge trust**: the protocol assumes real liquidity backing the teleport messages. In practice, ensure the `LendingPool` holds enough USDT0 to cover all deposits before going public.
* **No liquidations**: this starter kit has no mechanism for taking collateral when positions become unsafe. For production you must implement a `liquidate()` function.
* **No interest rates**: borrowed amounts do not accrue interest. Add your own rate model if needed.
* **Owner privileges**: the owner (or multisig) of `OracleRouter` can change oracles. Protect this key vigorously.

> 🔐 **Important**: this code is **not audited**. Treat it as educational scaffolding; do not deploy it with real funds without extensive review and modifications.
  

## Troubleshooting and tips

* **Tests failing after ABI changes:** delete `artifacts/` and `cache/` then recompile (`npx hardhat compile`).
* **Deployment errors:** confirm that your `.env` private key has rBTC on testnet (`npx hardhat account` shows balances). The public faucet limits 0.001 rBTC/day.
* **Frontend shows `contract not deployed`:** double‑check addresses in `frontend/.env` and recompile if necessary.
* **LayerZero trusted remote mismatches:** you must set the trusted remote pairs on both sender and receiver after deployment; mismatches cause message reverts.
* **Oracle price reverts on testnet:** Umbrella feeds are often unavailable on testnet. Use fixed oracle mode or deploy your own data feed.


## FAQ & next steps

**Q: Can I add interest or liquidations?**

A: Yes. The pool has hooks (`onCollateralChanged`, `onDebtChanged`) that you can extend. Add a `liquidate()` method that allows third parties to close under‑collateralized accounts.

**Q: How do I support another source chain?**

A: Deploy `LZSender` on your chosen chain with the appropriate LZ endpoint. Configure the `receiver.setTrustedRemote` mapping on Rootstock with the sender's address and chain ID.

**Q: What is USDT0?**

A: USDT0 is a protocol‑defined accounting unit equal to one U.S. dollar. It is not an ERC‑20 token; the `LendingPool` simply tracks numerical balances. MockUSDT0 is provided for tests and the frontend.

**Q: Can I move to Rootstock mainnet?**

A: Yes. Update `ROOTSTOCK_RPC_URL` to a mainnet node, change `USE_FIXED_ORACLE` to `false`, and ensure you have real rBTC. Mainnet Umbrella feeds will be available for live pricing.

**Next steps & roadmap**

1. **Liquidations:** implement and test a liquidation mechanism.

2. **Interest rate model:** add utilisation‑based rates for borrowed USDT0.

3. **Multi‑asset support:** enable multiple collateral tokens using the same router pattern.

4. **Stargate/OFT integration:** explore LayerZero's Omnichain Fungible Token standard for asset bridging.


:::info[Credit]

1. This tutorial and [starter kit](https://github.com/entuziaz/rbtc-usdt0-crosschain-starter-kit) were originally created by [@entuziaz](https://github.com/entuziaz) during the Rootstock Hacktivator program. 
2. This project extends the RBTC/USDT0 Simple Lending [Boilerplate](https://github.com/rsksmart/rbtc-usdt0-lending-boilerplate)
3. This documentation was inspired by the [Rootstock Vyper Starter Kit](https://github.com/rsksmart/devportal/pull/196) from the Rootstock Hacktivator.

:::