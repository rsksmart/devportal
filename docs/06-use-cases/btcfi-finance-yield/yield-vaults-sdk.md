---
sidebar_position: 4
sidebar_label: Integrate USDRIF Vault
title: "Integrate USDRIF Vault on Rootstock"
description: "Use the Rootstock Vaults SDK and viem to read vault state, approve USDRIF, and deposit with slippage protection."
tags: [btcfi, yield, vault, sdk, usdrif, dev-tutorial]
---

The [Vaults SDK](https://github.com/rsksmart/vaults-sdk) is a TypeScript client for the **USDRIF yield vault** on Rootstock. You can deposit USDRIF, hold shares, and redeem or withdraw back to USDRIF using the Vault SDK. Refer to the [repository README](https://github.com/rsksmart/vaults-sdk) as the source of truth for installation steps, and contract addresses.

## About the SDK

You connect a **viem** `WalletClient` and optional `PublicClient` to the SDK. **Read** calls go through `sdk.vault` (vault metrics, strategies, user position, previews, allowance). **Write** calls go through `sdk.write` (approve USDRIF, deposit, withdraw, redeem, including slippage-protected variants).

You still pay transaction fees in **rBTC**. Deposits and withdrawals use **USDRIF** (and the protocol may surface **USDT0** balances where relevant). Do not assume **estimated APY** or strategy names are guarantees. They are on-chain views that can change with market conditions and allocator updates.

## Prerequisites

* Node.js and a package manager compatible with the README install path.
* A wallet funded with **rBTC** on [Rootstock Testnet](https://explorer.testnet.rootstock.io/) (chain ID `31`) for gas. Mainnet (chain ID `30`) support in the SDK is **coming soon** per the README.
* **USDRIF** in that wallet for testnet.
* An RPC URL you are allowed to use in production (the README examples use Rootstock RPC with an API key).

## Initialize the SDK

Pass **chain ID** `31` for testnet or `30` for mainnet when it is available. Optional overrides include `rpcUrl`, `vaultAddress`, `usdrifAddress`, and `usdt0Address` if you run against custom deployments.

```ts
import { VaultsSDK } from "@rsksmart/vaults-sdk"

// 31 = Rootstock Testnet, 30 = Mainnet (when supported)
const sdk = new VaultsSDK({ chainId: 31 })
```

:::info[Contract Addresses]

Testnet contract addresses and the latest options are listed in the [Vaults SDK README](https://github.com/rsksmart/vaults-sdk).
:::

## Read vault state

Call `getVaultInfo()` for aggregate metrics: total assets, total shares, estimated APY, price per share, buffer ratio, and buffer balance. Call `getStrategies()` for per-strategy allocation and APY. Use `getUserBalance(address)` for shares, USDRIF equivalent, wallet balances, and max withdraw or redeem amounts.

```ts
const vaultInfo = await sdk.vault.getVaultInfo()
console.log("Total assets:", vaultInfo.totalAssets.formatted, "USDRIF")
console.log("Estimated APY:", vaultInfo.estimatedApy.toFixed(2), "%")

const { strategies } = await sdk.vault.getStrategies()
```

## Deposit flow (allowance, then write)

Writes require a **viem** `WalletClient` on the correct chain. The README recommends **slippage-protected** deposit and withdraw helpers. A typical deposit checks allowance, approves if needed, waits for the approval receipt, then calls `depositWithSlippage`.

```ts
import { parseEther } from "viem"

// Configure walletClient and publicClient per your app (see README full example).
const depositAmount = parseEther("10")
const { isEnough } = await sdk.vault.getAllowance(userAddress, depositAmount)

// If !isEnough, call approveUSDRIF and wait for the receipt before depositing.
// const approveTx = await sdk.write.approveUSDRIF(walletClient, depositAmount)
// await publicClient.waitForTransactionReceipt({ hash: approveTx.hash })

// const depositTx = await sdk.write.depositWithSlippage(walletClient, depositAmount, 0.5)
// await publicClient.waitForTransactionReceipt({ hash: depositTx.hash })
```

The [README full example](https://github.com/rsksmart/vaults-sdk) wires `getAllowance`, `approveUSDRIF`, `depositWithSlippage`, and receipt waiting in one script. Use `previewDeposit`, `previewWithdraw`, and `previewRedeem` before you commit to amounts in UI copy.

## Withdraw and redeem

`withdraw`, `withdrawWithSlippage`, `redeem`, and the preview methods mirror the deposit pattern. Optional `receiver` and `owner` parameters follow the README. Always treat max withdraw and max redeem from `getUserBalance` as the upper bound for what the vault will allow for that user at that block.

## Next steps

* Copy the **Types** exports from the README when you type your integration layer.
* Re-read allocator and issuer documentation for **USDRIF** before you expose APY or TVL to end users.
* [Automation and AI on Rootstock](/use-cases/ai-automation/)
* [RIF economy and governance](/use-cases/integrate-rif-economy/)
* [Rootstock Explorer](/dev-tools/explorers/rootstock/)
