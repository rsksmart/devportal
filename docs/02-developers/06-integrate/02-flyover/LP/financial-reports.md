---
sidebar_label: Financial Reports
sidebar_position: 235
title: Liquidity Provider Financial Reports
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg, reports, api, financial]
description: Comprehensive financial reporting endpoints for liquidity providers to monitor operations, track profitability, and analyze capital allocation across pegin and pegout transactions.
---


## Overview

The Liquidity Provider Server provides financial reporting endpoints to monitor operations, track profitability, and analyze capital allocation. All reports are available through the Management UI (Reports section) or via API.

**Common Conventions:**
- All amounts are in wei (1 BTC/RBTC = 10^18 wei, 1 satoshi = 10^10 wei)
- Date parameters accept YYYY-MM-DD format (expands to full day) or ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)
- All endpoints require Management API authentication
- Amounts are returned as strings to preserve precision

---

## Dashboard Summary

**Endpoint:** `GET /reports/summaries`

**Parameters:**
- `startDate` (required): Start date for the report period
- `endDate` (required): End date for the report period

**Purpose:** Aggregate statistics for both pegin and pegout operations during a time period.

### Response Structure

```json
{
  "peginSummary": {
    "totalQuotesCount": 100,
    "acceptedQuotesCount": 85,
    "totalAcceptedQuotesAmount": "8500000000000000000",
    "paidQuotesCount": 75,
    "paidQuotesAmount": "7500000000000000000",
    "refundedQuotesCount": 70,
    "totalRefundedQuotesAmount": "7000000000000000000",
    "penalizationsCount": 5,
    "totalPenalizationsAmount": "500000000000000000"
  },
  "pegoutSummary": {
    "totalQuotesCount": 150,
    "acceptedQuotesCount": 120,
    "totalAcceptedQuotesAmount": "12000000000000000000",
    "paidQuotesCount": 110,
    "paidQuotesAmount": "11000000000000000000",
    "refundedQuotesCount": 100,
    "totalRefundedQuotesAmount": "10000000000000000000",
    "penalizationsCount": 10,
    "totalPenalizationsAmount": "1000000000000000000"
  }
}
```

### Metrics Definition

| Field | Description |
|-------|-------------|
| totalQuotesCount | All quotes created in period (all states) |
| acceptedQuotesCount | Quotes accepted by users (all retained quotes with deposit address assigned) |
| totalAcceptedQuotesAmount | Total value of accepted quotes (value + gasFee) |
| paidQuotesCount | Quotes where LP successfully paid users (completed delivery states) |
| paidQuotesAmount | Total value paid to users (value + gasFee) |
| refundedQuotesCount | Quotes where LP was successfully refunded (completed refund states) |
| totalRefundedQuotesAmount | Total value refunded to LP (value + gasFee + callFee) |
| penalizationsCount | Number of penalization events applied to LP |
| totalPenalizationsAmount | Total penalty amount deducted from LP |

**Note:** Date filtering is based on quote creation timestamp.

---

## Asset Overview

**Endpoint:** `GET /reports/assets`

**Parameters:** None

**Purpose:** Current snapshot of LP capital allocation across all locations and operational states.

### Response Structure

```json
{
  "btcAssetReport": {
    "total": "67500000000000000",
    "location": {
      "btcWallet": "50000000000000000",
      "federation": "5000000000000000",
      "rskWallet": "6500000000000000",
      "lbc": "6000000000000000"
    },
    "allocation": {
      "reservedForUsers": "4500000000000000",
      "waitingForRefund": "11500000000000000",
      "available": "45500000000000000"
    }
  },
  "rbtcAssetReport": {
    "total": "17000000000000000000",
    "location": {
      "rskWallet": "10000000000000000000",
      "lbc": "5000000000000000000",
      "federation": "2000000000000000000"
    },
    "allocation": {
      "reservedForUsers": "3000000000000000000",
      "waitingForRefund": "2000000000000000000",
      "available": "12000000000000000000"
    }
  }
}
```

### BTC Asset Breakdown

**Location** (where assets are):

| Field | Description |
|-------|-------------|
| btcWallet | BTC in Bitcoin wallet |
| federation | BTC in bridge rebalancing process |
| rskWallet | BTC represented as RBTC in RSK wallet (waiting for rebalancing threshold) |
| lbc | BTC represented as RBTC in LBC contract (sent to users, awaiting refund) |

**Allocation** (how assets are used):

| Field | Description |
|-------|-------------|
| reservedForUsers | BTC allocated to pending pegout quotes (waiting for user deposit or confirmations) |
| waitingForRefund | BTC waiting to be refunded to LP (various refund/rebalancing stages) |
| available | BTC available for new quotes (btcWallet - reservedForUsers) |

### RBTC Asset Breakdown

**Location** (where assets are):

| Field | Description |
|-------|-------------|
| rskWallet | RBTC in RSK wallet (excluding BTC waiting for rebalancing) |
| lbc | RBTC in LBC contract (available for pegin operations) |
| federation | RBTC in native bridge (waiting for registerPegin) |

**Allocation** (how assets are used):

| Field | Description |
|-------|-------------|
| reservedForUsers | RBTC allocated to pending pegin quotes (waiting for user deposit or confirmations) |
| waitingForRefund | RBTC waiting to be recovered via registerPegin |
| available | RBTC available for new quotes ((rskWallet - reservedForUsers) + lbc) |

**Consistency Rules:**
- Total BTC equals the sum of all BTC location amounts (btcWallet, federation, rskWallet, lbc)
- Total BTC equals the sum of all BTC allocation amounts (reservedForUsers, waitingForRefund, available)
- Total RBTC equals the sum of all RBTC location amounts (rskWallet, lbc, federation)
- Total RBTC equals the sum of all RBTC allocation amounts (reservedForUsers, waitingForRefund, available)

---

## Revenue Report

**Endpoint:** `GET /reports/revenue`

**Parameters:**
- `startDate` (required): Start date for the report period
- `endDate` (required): End date for the report period

**Purpose:** Financial analysis of LP earnings, costs, and penalties.

### Response Structure

```json
{
  "totalQuoteCallFees": "55000000000000000",
  "totalGasFeesCollected": "148000000000000000",
  "totalGasSpent": "132350000000000000",
  "totalPenalizations": "1300000000000000"
}
```

### Metrics Definition

| Field | Description |
|-------|-------------|
| totalQuoteCallFees | Call fees collected from completed quotes (sum of callFee for both pegin and pegout) |
| totalGasFeesCollected | Gas fees collected upfront from users (sum of gasFee from completed quotes) |
| totalGasSpent | Actual gas costs paid by LP (Pegin: CallForUser + RegisterPegin gas costs; Pegout: RefundPegout + BridgeRefund gas + SendPegout BTC fees) |
| totalPenalizations | Penalties applied to LP (sum of penalty amounts from penalization events) |

**Note:** Only completed quotes are included. Date filtering based on quote creation timestamp.

---

## Pegin Report

**Endpoint:** `GET /reports/pegin`

**Parameters:**
- `startDate` (required): Start date for the report period
- `endDate` (required): End date for the report period

**Purpose:** Statistical metrics for completed pegin operations.

### Response Structure

```json
{
  "numberOfQuotes": 15,
  "minimumQuoteValue": "5000000000000000",
  "maximumQuoteValue": "3000000000000000000",
  "averageQuoteValue": "1200000000000000000",
  "totalFeesCollected": "1800000000000000",
  "averageFeePerQuote": "1200000000000000"
}
```

### Metrics Definition

| Field | Description |
|-------|-------------|
| numberOfQuotes | Count of completed pegin quotes (returns 0 if no quotes in period) |
| minimumQuoteValue | Smallest quote value (returns "0" if no quotes) |
| maximumQuoteValue | Largest quote value (returns "0" if no quotes) |
| averageQuoteValue | Mean quote value calculated as total sum / count (returns "0" if no quotes) |
| totalFeesCollected | Sum of call fees, callFee only (excludes gas fees) |
| averageFeePerQuote | Mean call fee calculated as total fees / count (returns "0" if no quotes) |

**Note:** Only includes fully completed pegins where the entire process has finished successfully (user deposited BTC, LP delivered RBTC, and bridge registration completed).

---

## Pegout Report

**Endpoint:** `GET /reports/pegout`

**Parameters:**
- `startDate` (required): Start date for the report period
- `endDate` (required): End date for the report period

**Purpose:** Statistical metrics for finalized pegout operations.

### Response Structure

```json
{
  "numberOfQuotes": 20,
  "minimumQuoteValue": "3000000000000000",
  "maximumQuoteValue": "2000000000000000000",
  "averageQuoteValue": "800000000000000000",
  "totalFeesCollected": "2100000000000000",
  "averageFeePerQuote": "1000000000000000"
}
```

### Metrics Definition

| Field | Description |
|-------|-------------|
| numberOfQuotes | Count of finalized pegout quotes (returns 0 if no quotes in period) |
| minimumQuoteValue | Smallest quote value (returns "0" if no quotes) |
| maximumQuoteValue | Largest quote value (returns "0" if no quotes) |
| averageQuoteValue | Mean quote value calculated as total sum / count (returns "0" if no quotes) |
| totalFeesCollected | Sum of call fees, callFee only (excludes gas fees) |
| averageFeePerQuote | Mean call fee calculated as total fees / count (returns "0" if no quotes) |

**Note:** Only includes finalized pegouts where the LP has been refunded (post-refund states including waiting for rebalance, being rebalanced, or rebalance completed).


---

## Transaction History

**Endpoint:** `GET /reports/transactions`

**Parameters:**
- `type` (required): Transaction type - "pegin" or "pegout"
- `startDate` (required): Start date for the report period
- `endDate` (required): End date for the report period
- `page` (optional): Page number (default: 1)
- `perPage` (optional): Items per page (default: 10, max: 100)

**Purpose:** Paginated list of individual transactions with detailed information.

### Response Structure

```json
{
  "data": [
    {
      "quoteHash": "0x1234567890abcdef1234567890abcdef12345678",
      "amount": "1000000000000000000",
      "callFee": "50000000000000000",
      "gasFee": "10000000000000000",
      "status": "RegisterPegInSucceeded"
    },
    {
      "quoteHash": "0xabcdef1234567890abcdef1234567890abcdef12",
      "amount": "2000000000000000000",
      "callFee": "75000000000000000",
      "gasFee": "15000000000000000",
      "status": "WaitingForDeposit"
    }
  ],
  "pagination": {
    "total": 500,
    "perPage": 10,
    "totalPages": 50,
    "page": 1
  }
}
```

### Transaction Fields

| Field | Description |
|-------|-------------|
| quoteHash | Unique identifier for the transaction |
| amount | Value transferred to the user (excluding fees) |
| callFee | LP service fee |
| gasFee | Gas fee collected from user |
| status | Current quote state |

### Pagination Fields

| Field | Description |
|-------|-------------|
| total | Total accepted transactions matching filters |
| perPage | Number of items per page |
| totalPages | Total pages (Math.ceil(total / perPage)) |
| page | Current page number (1-indexed) |

**Note:** Only accepted quotes (retained quotes) are included. Quotes never accepted by the LP are excluded.

---

## Quote State Reference

### Pegin States

**Waiting States:**
- `PeginStateWaitingForDeposit` - Quote accepted, waiting for user BTC deposit
- `PeginStateWaitingForDepositConfirmations` - BTC deposit detected, waiting for confirmations

**Completed States:**
- `PeginStateCallForUserSucceeded` - LP delivered RBTC to user
- `PeginStateRegisterPegInSucceeded` - LP recovered funds via registerPegin
- `PeginStateRegisterPegInFailed` - RegisterPegin attempted but failed

**Failed/Expired States:**
- `PeginStateTimeForDepositElapsed` - User didn't deposit in time
- `PeginStateCallForUserFailed` - LP failed to deliver RBTC

### Pegout States

**Waiting States:**
- `PegoutStateWaitingForDeposit` - Quote accepted, waiting for user RBTC deposit
- `PegoutStateWaitingForDepositConfirmations` - RBTC deposit detected, waiting for confirmations

**Completed States:**
- `PegoutStateSendPegoutSucceeded` - LP sent BTC to user
- `PegoutStateRefundPegOutSucceeded` - LP recovered RBTC from LBC
- `PegoutStateBridgeTxSucceeded` - Bridge rebalance transaction completed
- `PegoutStateBtcReleased` - BTC released from bridge (final state)

**Failed States:**
- `PegoutStateTimeForDepositElapsed` - User didn't deposit in time
- `PegoutStateSendPegoutFailed` - LP failed to send BTC
- `PegoutStateRefundPegOutFailed` - Refund attempt failed
- `PegoutStateBridgeTxFailed` - Bridge transaction failed
