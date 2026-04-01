---
sidebar_position: 3
sidebar_label: Agentic Commerce with x402 Payment Standard
title:  A Developer's Guide to Agentic Commerce using x402 Payment Standard
description: "Utilize the x402 standard to enable autonomous fund deposits and automated settlements for AI agents on Rootstock." 
tags: [ai, x402, payments, agents, rbtc, usdc, commerce]
---

Agentic commerce refers to software agents that autonomously discover, negotiate, and pay for services. The x402 standard repurposes the dormant "HTTP 402 Payment Required" status code into a functional protocol for machine-to-machine transactions. This tutorial explains how to implement x402 on Rootstock to enable AI agents to pay for resources like API access or data feeds using stablecoins.

## The x402 Standard Architecture
The x402 protocol operates directly over the HTTP request-response cycle. It eliminates the need for manual API key management or subscription setups.

* Client (The Agent): It makes a standard HTTP request to a protected resource.

* Resource Server: It responds with an HTTP 402 status code and a PAYMENT-REQUIRED header containing price, network, and recipient details.

* Facilitator: This service verifies on-chain signatures and handles the final settlement to the blockchain.

* Blockchain (Rootstock): It acts as the immutable settlement layer for the transaction.

## Prerequisites
You must have the following tools configured before implementing agentic payments.

* Node.js environment with the @coinbase/x402-sdk installed.

* A Rootstock wallet with USDC or USDRIF for payment.

* The `@rskSmart/w3layer` for Rootstock network interaction.

## Implementing the Payment Handshake
The agent must handle the 402 response by signing a payment authorization. You use the SDK to construct this payload without exposing private keys directly to the server.

### Step 1: Handling the 402 Response
The agent attempts to access a resource and catches the payment requirement.

```ts
// Initial request to a protected endpoint
const response = await fetch("https://api.rootstock-service.com/data");

if (response.status === 402) {
  // Extract payment details from the headers
  const paymentDetails = response.headers.get("PAYMENT-REQUIRED");
  
  // Construct a signed payment authorization
  const paymentSignature = await x402.signPayment(paymentDetails, signer);
}
```

### Step 2: Retrying with Payment
The agent re-sends the request, including the signature in the `PAYMENT-SIGNATURE` header.

```ts
// Retry the request with the proof of payment
const paidResponse = await fetch("https://api.rootstock-service.com/data", {
  headers: {
    "PAYMENT-SIGNATURE": paymentSignature
  }
});

// Access the granted resource
const data = await paidResponse.json();
```

## Automated Settlements
Settlement occurs when the facilitator verifies the on-chain transfer. On Rootstock, this process leverages the EVM-compatible RVM to finalize the transfer of stablecoins in seconds.

### Settlement Verification
The server forwards the payload to a facilitator, which validates the signature against the blockchain state.

* Simulation: The facilitator simulates the transfer to ensure the agent has sufficient funds.

* Broadcast: The facilitator submits the transaction to the Rootstock network.

* Confirmation: Once the transaction is mined, the facilitator notifies the resource server to deliver the content.

## Next Steps
Now that your agent can pay for services, you should build the infrastructure to accept them: