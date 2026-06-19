---
sidebar_position: 7
sidebar_label: Integrate Symbiosis
title: Cross-Chain Swaps on Rootstock with Symbiosis Finance
tags: [interoperability, bridges, symbiosis, sdk, api, cross-chain, rbtc, btc]
description: "Integrate Symbiosis Finance into your Rootstock dApp to enable cross-chain swaps between Rootstock and 30+ EVM and non-EVM networks (including native Bitcoin) using the Symbiosis JS SDK or REST API."
---

[Symbiosis Finance](https://symbiosis.finance/) is a cross-chain AMM DEX that aggregates liquidity from L1s, L2s, EVM, and non-EVM networks. Rootstock is natively integrated, which means any token tradable on a DEX in any supported network can be swapped into rBTC, rUSDT, or any Rootstock token, and vice versa, in a single user action. Symbiosis also supports BTC ↔ Rootstock routes through its BTC Fee Collector deployed on Rootstock.

This guide covers two integration paths:

1. **Symbiosis REST API** - language-agnostic, recommended for production
2. **Symbiosis JS SDK** (`symbiosis-js-sdk`) - direct access to protocol primitives from a TypeScript/Node app

## Prerequisites

- Use Node.js 18+ version.
- A wallet provider (ethers v5/v6, viem, or Wagmi)
- Familiarity with EVM token approvals of ERC20 tokens
- (Optional) A `clientId` / `partnerId` string to attribute swaps to your integration. No registration required to start; contact Symbiosis to enable partner-fee collection.

:::info[Rootstock network parameters]
| Parameter | Value |
|---|---|
| Chain ID (Mainnet) | `30` |
| Native gas token | `rBTC` |
| Rootstock public RPC | `https://public-node.rsk.co` |
| Symbiosis BTC Fee Collector (Rootstock) | [`0xbba322c98601b707cffb98092010e0b95d538bb7`](https://explorer.rootstock.io/address/0xbba322c98601b707cffb98092010e0b95d538bb7) |
:::

:::warning[Mainnet production checklist]
Before going live, verify all of the following. Skipping any of these steps puts user funds at risk.

1. **Approvals:** Always approve users' ERC-20 tokens to the `metaRouterGateway` contract for the source chain — never the `metaRouter` directly. Read addresses from [the SDK Mainnet config](https://github.com/symbiosis-finance/js-sdk/blob/main/src/crosschain/config/mainnet.ts).
2. **Calldata:** Do not modify, cache, or reuse calldata returned by the SDK or API. Regenerate it (every ~30 seconds) before each transaction.
3. **Contract addresses:** Verify Symbiosis contract addresses against the SDK config at deploy time.
4. **Post-deploy sanity:** Perform at least one real cross-chain operation after deployment and after each upgrade.
:::

## Concepts in 60 Seconds

A Symbiosis cross-chain swap is made of up to three legs:

- **(A) Source-chain on-chain swap**, optional, when the source token is not the transit token used to leave the chain (typically USDC, USDT, WETH, or WBTC).
- **(B) Host-chain swap**, always performed on the Symbiosis host chain between synthetic sTokens (e.g. `sUSDC` → `sUSDC`).
- **(C) Destination-chain on-chain swap**, optional, when the destination token is not the transit token.

The user signs one transaction on the source chain. Symbiosis Relayers and (where deployed) the Solver service finalize legs (B) and (C) automatically. The slippage tolerance the user picks is distributed across these legs, the host leg always reserves at most 0.2%. Refer to [Slippage Tolerance Distribution](https://docs.symbiosis.finance/developer-tools/symbiosis-api/slippage-tolerance-distribution-in-cross-chain-swaps) for the exact formula.

## Integration 1: The Symbiosis REST API

The REST API wraps the SDK and is backward-compatible across SDK upgrades. This is the recommended path for production. The base URL for Mainnet is:

```
https://api.symbiosis.finance/crosschain
```

Interactive endpoint reference: [Swagger docs](https://api.symbiosis.finance/crosschain/docs/).

### Step 1: List Supported Chains

Use `/v1/chains` to confirm Rootstock (Chain ID `30`) is in the supported set and to discover any new networks Symbiosis adds.

```bash
curl https://api.symbiosis.finance/crosschain/v1/chains
```

### Step 2: Fetch a Quote (`/v2/quote`)

`/v2/quote` returns the best route and calldata for any-to-any swaps except `BTC → Any`. The example below quotes 25 USDC on Arbitrum to native rBTC on Rootstock.

```ts
// lib/symbiosis-quote.ts
const SYMBIOSIS_API = "https://api.symbiosis.finance/crosschain";


export async function quoteUsdcArbitrumToRbtc(userAddress: `0x${string}`) {
  const body = {
    tokenAmountIn: {
      chainId: 42161, // Arbitrum One
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", // native USDC
      amount: "25000000",                                    // 25 USDC, 6 decimals
      decimals: 6,
      symbol: "USDC",
    },
    from: userAddress,
    to: userAddress,
    revertableAddress: userAddress, // address allowed to revert a stuck swap
    slippage: 100,                  // 1% in basis points (range: 20 - 1000)
    // partnerId: "my-rootstock-dapp", // optional: associate the swap with your integration
  };

  const res = await fetch(`${SYMBIOSIS_API}/v2/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`Quote failed: ${res.status} ${await res.text()}`);

  // The response contains the full transactionRequest plus fee/route/priceImpact metadata
  return res.json();
}
```

A typical response looks like this (trimmed):

```json
{
  "tx": {
    "chainId": 42161,
    "to": "0xMetaRouterContractOnArbitrum",
    "data": "0x...",
    "value": "0"
  },
  "fee": { "amount": "412345", "symbol": "USDC", "chainId": 42161 },
  "route": [
    { "chainId": 42161, "symbol": "USDC" },
    { "chainId": 30,    "symbol": "RBTC" }
  ],
  "approveTo": "0xMetaRouterGatewayOnArbitrum",
  "priceImpact": "0.0021",
  "amountOut": "0.00023145",
  "estimatedTime": 180
}
```

The two fields you must use:

- `approveTo` — the **`metaRouterGateway`** address. Approve the user's ERC-20 to **this** address, not to `tx.to`.
- `tx` — sign and broadcast exactly as returned. Do not mutate the `data` field.

### Step 3: Approve, Sign, and Send

```ts
// lib/symbiosis-execute.ts
import { quoteUsdcArbitrumToRbtc } from "./symbiosis-quote";

const ERC20_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
];

export async function executeSwap(signer: ethers.Signer) {
  const userAddress = (await signer.getAddress()) as `0x${string}`;
  const quote = await quoteUsdcArbitrumToRbtc(userAddress);

  // 1. Approve USDC to the metaRouterGateway returned by the quote
  const usdc = new ethers.Contract(
    quote.tokenAmountIn.address,
    ERC20_ABI,
    signer,
  );
  const allowance = await usdc.allowance(userAddress, quote.approveTo);
  if (allowance < BigInt(quote.tokenAmountIn.amount)) {
    const approveTx = await usdc.approve(quote.approveTo, quote.tokenAmountIn.amount);
    await approveTx.wait();
  }

  // 2. Broadcast the swap. Use the calldata exactly as returned - do not modify it.
  const tx = await signer.sendTransaction({
    to: quote.tx.to,
    data: quote.tx.data,
    value: quote.tx.value ?? "0",
  });
  return tx.wait();
}
```

### Step 4: Track Swap Status

Cross-chain settlement happens asynchronously. Poll `/v2/tx/{chainId}/{txHash}` with the source-chain `chainId` and the hash of the transaction you just submitted.

```ts
export async function waitForSymbiosisSwap(sourceChainId: number, txHash: string) {
  while (true) {
    const res = await fetch(
      `${SYMBIOSIS_API}/v2/tx/${sourceChainId}/${txHash}`,
    );
    const status = await res.json();
    // status.status is one of: "pending", "success", "stucked", "reverted"
    if (status.status === "success") return status;
    if (status.status === "stucked" || status.status === "reverted") {
      throw new Error(`Swap ${status.status}: ${status.error ?? "see explorer"}`);
    }
    await new Promise((r) => setTimeout(r, 5000));
  }
}
```

### Bitcoin → Rootstock (the BTC route)

`BTC → Any` is the one route that does not use `/v2/quote` as the final step. The flow is:

1. Call `/v2/quote` to price the route and validate it.
2. Call `/v2/swap` to receive a fresh quote **plus** a one-time BTC deposit address.
3. Have the user send native BTC to that address. Symbiosis Relayers detect the deposit and finalize the cross-chain leg automatically.

```ts
// Bitcoin -> RBTC on Rootstock
const SYMBIOSIS_API = "https://api.symbiosis.finance/crosschain";
const swap = await fetch(`${SYMBIOSIS_API}/v2/swap`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    tokenAmountIn: {
      chainId: 3652501241,   // Symbiosis BTC chain identifier
      address: "0x0000000000000000000000000000000000000000",
      amount: "100000",      // 0.001 BTC, 8 decimals
      decimals: 8,
     // symbol: "BTC",
    },
    tokenOut: {
      chainId: 30,           // Rootstock
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      symbol: "RBTC",
    },
    from: userBtcAddress,
    to: userRskAddress,
    revertableAddress: userRskAddress,
    slippage: 200, // 2%
  }),
}).then((r) => r.json());

console.log("Send BTC to:", swap.btcDepositAddress);
console.log("Expected RBTC out:", swap.amountOut);
```

The user sends BTC from any wallet (no signing required from the dApp). Use `/v2/tx/{chainId}/{btcDepositAddress}` to poll for completion.

### Useful Auxiliary Endpoints

| Endpoint | Purpose |
|---|---|
| `GET /health-check` | Periodic API health probe |
| `GET /v1/chains` | List of supported chains and metadata |
| `GET /v1/swap-limits` | Min/max swap amounts per route |
| `GET /v1/swap-durations` | Historical median completion time |
| `GET /v2/tokens` | Symbiosis-tracked token list (does not limit what you can swap) |

## Integration 2: The `symbiosis-js-sdk`

The SDK is the right pick when you need to inspect routes programmatically, build custom UI on top of the protocol, or run automated flows from a Node service. It depends on `ethers` v5.

### Install

```bash
npm install symbiosis-js-sdk ethers
```

### Initialize and Quote a Cross-Chain Swap

The example below quotes **USDT on BNB Chain → rBTC on Rootstock** and signs the returned `transactionRequest` with ethers.

```ts
// lib/symbiosis-sdk.ts
import { Symbiosis, Token, TokenAmount } from "symbiosis-js-sdk";

// "mainnet" + a unique client identifier for analytics & support
const symbiosis = new Symbiosis("mainnet", "my-rootstock-dapp");

const ROOTSTOCK_CHAIN_ID = 30;
const BSC_CHAIN_ID = 56;

// Source: USDT on BNB Chain
const usdtBnb = new Token({
  chainId: BSC_CHAIN_ID,
  address: "0x55d398326f99059fF775485246999027B3197955",
  decimals: 18,
  symbol: "USDT",
  name: "Tether USD",
});

// Destination: native RBTC on Rootstock (isNative + zero address)
const rbtc = new Token({
  chainId: ROOTSTOCK_CHAIN_ID,
  address: "0x0000000000000000000000000000000000000000",
  decimals: 18,
  symbol: "RBTC",
  name: "Rootstock Smart Bitcoin",
  isNative: true,
});

export async function quoteBnbUsdtToRbtc(wallet: ethers.Wallet) {
  // Swap 50 USDT (18 decimals on BSC)
  const amountIn = new TokenAmount(usdtBnb, ethers.utils.parseUnits("50", 18).toString());

  // bestPoolSwapping picks the optimal Octopool / transit token automatically
  const swapping = symbiosis.bestPoolSwapping();

  const { transactionRequest, fee, route, priceImpact, tokenAmountOut, approveTo } =
    await swapping.exactIn({
      tokenAmountIn: amountIn,
      tokenOut: rbtc,
      from: wallet.address,
      to: wallet.address,
      revertableAddress: wallet.address,
      slippage: 150,                                  // 1.5% (basis points)
      deadline: Math.floor(Date.now() / 1000) + 1800, // 30 minutes
    });

  console.log("Route:        ", route.map((t: Token) => `${t.symbol}@${t.chainId}`).join(" -> "));
  console.log("Fee:          ", fee.toSignificant(6), fee.token.symbol);
  console.log("Price impact: ", priceImpact.toSignificant(4), "%");
  console.log("Expected out: ", tokenAmountOut.toSignificant(8), tokenAmountOut.token.symbol);

  return { transactionRequest, approveTo, amountIn };
}
```

### Approve, Send, and Wait for Settlement

```ts
// lib/symbiosis-execute-sdk.ts
import { ethers } from "ethers";
import { quoteBnbUsdtToRbtc } from "./symbiosis-sdk";

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
];

export async function bridgeUsdtToRbtc(privateKey: string, bnbRpcUrl: string) {
  const provider = new ethers.providers.JsonRpcProvider(bnbRpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  const { transactionRequest, approveTo, amountIn } = await quoteBnbUsdtToRbtc(wallet);

  // 1. Approve the metaRouterGateway (approveTo) - NEVER approve metaRouter directly.
  const usdt = new ethers.Contract(amountIn.token.address, ERC20_ABI, wallet);
  const allowance: ethers.BigNumber = await usdt.allowance(wallet.address, approveTo);
  if (allowance.lt(amountIn.raw.toString())) {
    const approveTx = await usdt.approve(approveTo, amountIn.raw.toString());
    await approveTx.wait();
  }

  // 2. Broadcast the swap transaction as returned by the SDK.
  const tx = await wallet.sendTransaction(transactionRequest);
  const receipt = await tx.wait();

  // 3. Wait for the destination-chain confirmation. The SDK polls Relayer events
  //    and returns the destination log once the swap settles on Rootstock.
  const swapping = new Symbiosis("mainnet", "my-rootstock-dapp").bestPoolSwapping();
  const log = await swapping.waitForComplete(receipt);
  console.log("Destination tx on Rootstock:", log.transactionHash);

  // 4. Detect "transit-token-out" - the user received the transit stablecoin instead
  //    of the requested token because the destination leg exceeded slippage.
  const transitSent = await new Symbiosis("mainnet", "my-rootstock-dapp").findTransitTokenSent(
    ROOTSTOCK_CHAIN_ID,
    log.transactionHash,
  );
  if (transitSent) {
    console.warn("User received the transit token instead of RBTC:", transitSent.token.symbol);
  }

  return log;
}
```

:::tip[Transit-token outcome]
If the destination on-chain swap (leg C) cannot satisfy the user's slippage, Symbiosis hands the user the transit stablecoin instead of the requested token. Always surface this case in your UI — `findTransitTokenSent` is the canonical check. Read more: [Mitigating Transit Token Outcomes](https://docs.symbiosis.finance/miscellaneous/mitigating-transit-token-outcomes-in-cross-chain-swaps).
:::

### Reverting a Stuck Swap

If the host-chain swap fails (typically host-leg slippage exceeded under volatile conditions), the user can revert the swap and reclaim the source-chain tokens.

```ts
import { Symbiosis } from "symbiosis-js-sdk";
import { ethers } from "ethers";

export async function revertStuckSwap(wallet: ethers.Wallet) {
  const symbiosis = new Symbiosis("mainnet", "my-rootstock-dapp");

  // Find pending requests authored by the user's revertableAddress.
  const pending = await symbiosis.getPendingRequests(wallet.address);
  if (pending.length === 0) return;

  for (const request of pending) {
    const revert = symbiosis.newRevertPending(request);
    const { transactionRequest } = await revert.revert();

    const tx = await wallet.sendTransaction(transactionRequest);
    await tx.wait();

    const log = await revert.waitForComplete();
    console.log("Funds returned in tx:", log.transactionHash);
  }
}
```

### Rootstock → Bitcoin via the SDK

Outgoing BTC routes use the same `bestPoolSwapping().exactIn(...)` entry point. Define the destination token with the Symbiosis BTC chain identifier:

```ts
const btc = new Token({
  chainId: 3652501241,                                  // Symbiosis BTC chain ID
  address: "0x0000000000000000000000000000000000000000",
  decimals: 8,
  symbol: "BTC",
  isNative: true,
});

// Recipient `to` must be a valid Bitcoin address (bech32/P2SH/P2PKH), not an EVM address.
const result = await symbiosis.bestPoolSwapping().exactIn({
  tokenAmountIn: new TokenAmount(rbtc, ethers.utils.parseUnits("0.005", 18).toString()),
  tokenOut: btc,
  from: wallet.address,           // Rootstock address sending RBTC
  to: "bc1qexample...",           // Bitcoin destination address
  revertableAddress: wallet.address,
  slippage: 300,
  deadline: Math.floor(Date.now() / 1000) + 1800,
});
```

Outgoing-BTC routes settle through Symbiosis' BTC fee collector on Rootstock and bridge to native BTC via ThorChain or Chainflip (whichever produces a better route at execution time). See [Symbiosis as Interchain Communication Protocol](https://docs.symbiosis.finance/main-concepts/symbiosis-as-interchain-communication-protocol) for the routing diagram.

## Additional Patterns

### React + Wagmi Quote Hook

A reusable React hook for fetching Symbiosis quotes from a Wagmi-based dApp. Pulls the connected account from `useAccount`, debounces the input, and exposes loading and error state to the component.

```tsx
// hooks/useSymbiosisQuote.tsx
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface QuoteInput {
  fromChainId: number;
  toChainId: number;
  fromToken: string;
  toToken: string;
  amount: string;
}

export function useSymbiosisQuote(input: QuoteInput) {
  const { address } = useAccount();
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;
    setLoading(true);

    const body = {
      tokenAmountIn: {
        chainId: input.fromChainId,
        address: input.fromToken,
        amount: input.amount,
        decimals: 6,
      },
      tokenOut: {
        chainId: input.toChainId,
        address: input.toToken,
        decimals: 18,
      },
      from: address,
      to: address,
      revertableAddress: address,
      slippage: 1.5,
    };

    fetch("https://api.symbiosis.finance/crosschain/v2/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((r) => r.json())
      .then(setQuote)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [input, address]);

  return { quote, loading, error };
```

Drop the hook into a component:

```tsx
function SwapPanel() {
  const { quote, loading } = useSymbiosisQuote({
    fromChainId: 42161,
    toChainId: 30,
    fromToken: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    toToken: "0x0000000000000000000000000000000000000000",
    amount: "25",
  });

  if (loading) return <p>Loading route...</p>;
  return <pre>{JSON.stringify(quote, null, 2)}</pre>
}
```

### viem-based Swap Execution

If your stack uses viem instead of ethers, use `walletClient.sendTransaction` with the raw calldata returned by the API. The example below executes the quote returned from `useSymbiosisQuote`.

```ts
// lib/symbiosis-viem.ts
import { createWalletClient, custom, parseUnits } from "viem";
import { arbitrum } from "viem/chains";

const ERC20_APPROVE_ABI = [{
  name: "approve",
  type: "function",
  stateMutability: "nonpayable",
  inputs: [
    { name: "spender", type: "address" },
    { name: "amount", type: "uint256" },
  ],
  outputs: [{ name: "", type: "bool" }],
}];

export async function sendSymbiosisSwap(quote: any) {
  const walletClient = createWalletClient({
    chain: arbitrum,
    transport: custom(window.ethereum),
  });
  const [account] = await walletClient.getAddresses();

  // Approve the metaRouter so it can pull the user's USDC during the swap.
  const approveHash = await walletClient.writeContract({
    account,
    address: quote.tokenAmountIn.address,
    abi: ERC20_APPROVE_ABI,
    functionName: "approve",
    args: [quote.tx.to, parseUnits(quote.tokenAmountIn.amount, 6)],
  });

  // Cache the quote so we don't have to refetch on retry.
  localStorage.setItem("lastSymbiosisQuote", JSON.stringify(quote));

  const swapHash = await walletClient.sendTransaction({
    account,
    to: quote.tx.to,
    data: quote.tx.data,
    value: BigInt(quote.tx.value || 0),
  });

  return { approveHash, swapHash };
}
```

### Python REST Client

A minimal Python client for quoting and submitting a swap with `requests` + `web3.py`. Convenient for cron jobs or settlement scripts.

```python
# symbiosis_client.py
import os
import time
import requests
from web3 import Web3

SYMBIOSIS_API = "https://api.symbiosis.finance/crosschain"
ROOTSTOCK_CHAIN_ID = 30
ARBITRUM_RPC = os.environ["ARBITRUM_RPC"]
PRIVATE_KEY = os.environ["PRIVATE_KEY"]

w3 = Web3(Web3.HTTPProvider(ARBITRUM_RPC))
account = w3.eth.account.from_key(PRIVATE_KEY)

def quote_usdc_to_rbtc(amount_usdc: float) -> dict:
    body = {
        "tokenAmountIn": {
            "chainId": 42161,
            "address": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
            "amount": str(int(amount_usdc * 10**6)),
            "decimals": 6,
            "symbol": "USDC",
        },
        "tokenOut": {
            "chainId": ROOTSTOCK_CHAIN_ID,
            "address": "0x0",
            "decimals": 18,
            "symbol": "RBTC",
        },
        "from": account.address,
        "to": account.address,
        "revertableAddress": account.address,
        "slipage": 200,
    }
    res = requests.post(f"{SYMBIOSIS_API}/v2/quote", json=body)
    return res.json()


def execute(quote: dict) -> str:
    tx = {
        "from": account.address,
        "to": quote["tx"]["to"],
        "data": quote["tx"]["data"],
        "value": int(quote["tx"]["value"]),
        "gas": 500000,
        "gasPrice": w3.eth.gas_price,
    }
    signed = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    return w3.eth.send_raw_transaction(signed.rawTransaction).hex()


if __name__ == "__main__":
    q = quote_usdc_to_rbtc(25.0)
    tx_hash = execute(q)
    print("Swap tx:", tx_hash)

    while True:
        status = requests.get(f"{SYMBIOSIS_API}/v2/tx/42161/{tx_hash}").json()
        if status["status"] == "success":
            break
        time.sleep(5000)
```

### Cross-Chain Swap with Destination Calldata

Symbiosis can forward arbitrary calldata to a contract on Rootstock after the bridge settles, similar to LI.FI's Composer. Use this to deposit bridged USDC straight into a yield vault without a second user signature.

```ts
// lib/symbiosis-zap.ts
import { encodeFunctionData, parseAbi } from "viem";

const VAULT_ABI = parseAbi([
  "function depositFor(address user, uint256 amount) external returns (uint256 shares)",
]);

// Deployed RootstockYieldVault address
const VAULT_ADDRESS = "0xYourRootstockYieldVaultAddress";

export async function quoteZapIntoVault(
  user: `0x${string}`,
  amountUsdc: bigint,
) {
  const callData = encodeFunctionData({
    abi: VAULT_ABI,
    functionName: "depositFor",
    args: [user, amountUsdc],
  });

  const body = {
    tokenAmountIn: {
      chainId: 42161,
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      amount: amountUsdc.toString(),
      decimals: 6,
    },
    tokenOut: {
      chainId: 30,
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
    },
    from: user,
    to: user,
    revertableAddress: user,
    slippage: 200,
    // Destination call applied AFTER the cross-chain swap settles on Rootstock.
    destinationCall: {
      targetAddress: VAULT_ADDRESS,
      calldata: callData,
      // Forward 100% of the bridged amount to the vault.
      forwardAmountBps: 1000,
    },
  };

  const res = await fetch("https://api.symbiosis.finance/crosschain/v2/quote", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return res.json();
}
```

### Batch Quoting Many Source Tokens at Once

Useful when you want to display the best entry point for each of a user's holdings on Arbitrum, side-by-side. Quote each token in parallel, sort by `amountOut`, and surface the top three.

```ts
// lib/best-source-token.ts
type Candidate = { symbol: string; address: string; balance: bigint };

export async function pickBestSourceForRbtc(
  user: `0x${string}`,
  holdings: Candidate[],
) {
  const quotes = holdings.map((c) => fetchQuote(user, c));
  const settled = await Promise.allSettled(quotes);

  return settled
    .filter((q) => q.status === "fulfilled")
    .map((q) => q.value)
    .sort((a, b) => Number(a.amountOut) - Number(b.amountOut))
    .slice(0, 3);
}

async function fetchQuote(user: `0x${string}`, c: Candidate) {
  const res = fetch("https://api.symbiosis.finance/crosschain/v2/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tokenAmountIn: {
        chainId: 42161,
        address: c.address,
        amount: c.balance.toString(),
        decimals: 18,
        symbol: c.symbol,
      },
      tokenOut: {
        chainId: 30,
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        symbol: "RBTC",
      },
      from: user,
      to: user,
      revertableAddress: user,
      slippage: 150,
    }),
  });
  return res.json();
}
```

### Polling With Exponential Backoff

`/v2/tx/{chainId}/{txHash}` is cheap to call but you should still cap your poll frequency. The helper below backs off exponentially up to 60 seconds and gives up after 20 minutes.

```ts
export async function pollUntilSettled(
  sourceChainId: number,
  txHash: string,
): Promise<any> {
  const start = Date.now();
  let delay = 2_000;

  for (;;) {
    const res = await fetch(
      `https://api.symbiosis.finance/crosschain/v2/tx/${sourceChainId}/${txHash}`,
    );
    const status = await res.json();

    if (status.status === "success") return status;
    if (status.status === "reverted") throw new Error("Swap reverted");

    if (Date.now() - start > 1200) {
      throw new Error("Polling timed out after 20 minutes");
    }

    await new Promise((r) => setTimeout(r, delay));
    delay = Math.min(delay * 2, 60_000);
  }
}
```

### SDK: Convert rBTC to USDT on BNB Chain

A common Rootstock-outbound flow: convert rBTC held on Rootstock into USDT on BNB Chain to pay off-ramp invoices. Uses the SDK with an explicit deadline guard.

```ts
import { Symbiosis, Token, TokenAmount } from "symbiosis-js-sdk";
import { ethers } from "ethers";

const symbiosis = new Symbiosis("mainnet", "my-rootstock-dapp");

const rbtc = new Token({
  chainId: 30,
  address: "0x0000000000000000000000000000000000000000",
  decimals: 8,
  symbol: "RBTC",
  isNative: true,
});

const usdtBnb = new Token({
  chainId: 56,
  address: "0x55d398326f99059fF775485246999027B3197955",
  decimals: 18,
  symbol: "USDT",
});

export async function rbtcToUsdtBnb(wallet: ethers.Wallet, rbtcAmount: string) {
  const amountIn = new TokenAmount(rbtc, ethers.utils.parseUnits(rbtcAmount, 8).toString());

  const swapping = symbiosis.bestPoolSwapping();
  const { transactionRequest, approveTo, tokenAmountOut } = await swapping.exactIn({
    tokenAmountIn: amountIn,
    tokenOut: usdtBnb,
    from: wallet.address,
    to: wallet.address,
    revertableAddress: wallet.address,
    slippage: 250,
    deadline: Math.floor(Date.now() / 1000) + 1800,
  });

  // RBTC is native - no approval needed. Approve only if the source token is ERC-20.
  if (approveTo) {
    const token = new ethers.Contract(
      amountIn.token.address,
      ["function approve(address,uint256) returns (bool)"],
      wallet,
    );
    await token.approve(approveTo, amountIn.raw.toString());
  }

  const tx = await wallet.sendTransaction(transactionRequest);
  await tx.wait();
  console.log("Expected USDT out:", tokenAmountOut.toSignificant(6));
  return tx.hash;
}
```

### Token Allowance Check Utility

Before triggering a quote, verify the user has both the balance and the existing allowance to skip an unnecessary approve transaction.

```ts
import { ethers } from "ethers";

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address,address) view returns (uint256)",
];

export async function hasReadyAllowance(
  provider: ethers.providers.Provider,
  token: string,
  owner: string,
  spender: string,
  amount: bigint,
): boolean {
  const contract = new ethers.Contract(token, ERC20_ABI, provider);
  const [balance, allowance] = await Promise.all([
    contract.balanceOf(owner),
    contract.allowance(owner, spender),
  ]);

  if (balance < amount) throw new Error("Insufficient balance");
  return allowance > amount;
}
```

### Quote Refresh Loop for Long-Lived UIs

If a user lingers on the review screen, the calldata you fetched from `/v2/quote` will go stale. Refresh the quote on a 30-second interval and stop when the user clicks Swap.

```ts
// hooks/useFreshQuote.ts
import { useEffect, useRef, useState } from "react";

export function useFreshQuote(quoteBody: object, paused: boolean) {
  const [quote, setQuote] = useState<any>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    async function fetchOnce() {
      const res = await fetch("https://api.symbiosis.finance/crosschain/v2/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quoteBody),
      });
      setQuote(await res.json());
    }

    fetchOnce();
    if (!paused) {
      intervalRef.current = setInterval(fetchOnce, 30000);
    }
    return () => clearInterval(intervalRef);
  }, [quoteBody, paused]);

  return quote;
}
```

## Partner Fees (Optional)

If you want to monetize swaps through your integration, contact the Symbiosis team to configure a partner-fee model (percentage, fixed, or hybrid). Once registered, include your `partnerAddress` in the API/SDK request:

```ts
// REST: add to the JSON body sent to /v2/quote or /v2/swap
{
  "partnerAddress": "0xYourFeeRecipient",
  // ...other fields
}

// SDK: pass via the partnerAddress / partnerId option on exactIn(...)
await swapping.exactIn({
  // ...standard fields
  partnerAddress: "0xYourFeeRecipient",
});
```

Fees accumulate in the relevant collector contract:

- **Non-BTC routes:** General Fee Collector on the Symbiosis host chain, accumulated in sTokens.
- **BTC routes** (including Rootstock ↔ Bitcoin): the BTC Fee Collector on Rootstock — [`0xbba322c98601b707cffb98092010e0b95d538bb7`](https://explorer.rootstock.io/address/0xbba322c98601b707cffb98092010e0b95d538bb7), accumulated in syBTC.

Claim through the [Partner Dashboard](https://explorer.symbiosis.finance/partners) or by calling `collectedFees()` / `claimFee()` on the collector contract directly. Full guide: [Partner Fee Collectors](https://docs.symbiosis.finance/developer-tools/symbiosis-api/partner-fee-collectors).

## Slippage Reference

Slippage is expressed in basis points across both the SDK and API (`100` = 1.00%, max `1000`). Symbiosis splits the total across the legs of the swap as follows:

| Legs used | Allocation (Y = user-specified) |
|---|---|
| Host only (sToken → sToken) | B: 0.2% (the rest is ignored) |
| Source + Host | If `Y/2 > 0.2%`: A = Y − 0.2%, B = 0.2%. Else A = B = Y/2 |
| Host + Destination | If `Y/2 > 0.2%`: C = Y − 0.2%, B = 0.2%. Else B = C = Y/2 |
| Source + Host + Destination | If `Y/3 > 0.2%`: A = C = (Y − 0.2%)/2, B = 0.2%. Else A = B = C = Y/3 |

The host leg always reserves at most 0.2%, because slippage there indicates an Octopool imbalance that the protocol must protect. Volatile destination tokens generally need 2–3% (`slippage: 200`–`300`).

## Troubleshooting

**`approveTo` differs from `tx.to`** — This is expected. Approve the user's ERC-20 to `approveTo` (the `metaRouterGateway`). Sending the swap call goes to `tx.to` (the `metaRouter`). Approving the `metaRouter` directly will result in a failed swap.

**"Calldata expired" / swap reverts at execution**, The quote was held too long. Regenerate the quote every ~30 seconds (the SDK does this internally as part of `exactIn`; for the REST API, refetch before each send).

**User received the transit stablecoin, not the target token**, Destination-leg slippage was exceeded. Increase `slippage` (e.g. `200` → `300`) for volatile pairs, and surface `findTransitTokenSent` (SDK) or check the `transitTokenSent` field on `/v2/tx/...` (API) in your UI.

**`waitForComplete` never resolves**, Most often a host-leg failure. Call `symbiosis.getPendingRequests(address)` and use `newRevertPending(request).revert()` to refund the user.

**Rootstock RPC rate limits during status polling**, Use a dedicated endpoint. The public Rootstock RPC is sufficient for low-volume tests; production traffic should use [a Rootstock RPC provider](/dev-tools/node-rpc/) such as Alchemy, dRPC, GetBlock, or NowNodes.

## Reference

| Resource | URL |
|---|---|
| Symbiosis web app | [app.symbiosis.finance/swap](https://app.symbiosis.finance/swap) |
| Symbiosis Explorer | [Rootstock Explorer.symbiosis.finance](https://explorer.symbiosis.finance/transactions) |
| API base URL (Mainnet) | `https://api.symbiosis.finance/crosschain` |
| Swagger reference | [api.symbiosis.finance/crosschain/docs](https://api.symbiosis.finance/crosschain/docs/) |
| JS SDK package | [`symbiosis-js-sdk`](https://www.npmjs.com/package/symbiosis-js-sdk) |
| JS SDK source | [github.com/symbiosis-finance/js-sdk](https://github.com/symbiosis-finance/js-sdk) |
| Mainnet contract config | [`src/crosschain/config/mainnet.ts`](https://github.com/symbiosis-finance/js-sdk/blob/main/src/crosschain/config/mainnet.ts) |
| Partner dashboard | [Rootstock Explorer.symbiosis.finance/partners](https://explorer.symbiosis.finance/partners) |
| Developer docs | [docs.symbiosis.finance/developer-tools/symbiosis-developer-tools](https://docs.symbiosis.finance/developer-tools/symbiosis-developer-tools) |

## Next Steps

- Quote a sample route from your target source chain to Rootstock via the [Swagger API Rootstock Explorer](https://api.symbiosis.finance/crosschain/docs/) before writing any code.
- Read [Symbiosis: Cross-Chain Swaps](https://docs.symbiosis.finance/main-concepts/symbiosis-cross-chain-swaps) for the full routing model, including the Depository/Solver flow that minimizes transit-token outcomes.
- For a UI launchpad, use the [Symbiosis WebApp deep link](https://app.symbiosis.finance/swap?chainOut=Rootstock&tokenOut=RBTC) (`?chainOut=Rootstock&tokenOut=RBTC`) to pre-select Rootstock as the destination.
- Compare with other interoperability paths into Rootstock: [LI.FI](/use-cases/interoperability/integrate-lifi/), [LayerZero](/use-cases/interoperability/rootstock-layerzero/).
