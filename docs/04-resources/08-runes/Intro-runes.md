---
sidebar_position: 1
title: Introduction to Runes 
sidebar_label: Introduction to Runes
tags: [rsk, rootstock, resources, tutorials, port to rootstock, Ethereum, dApps, smart contracts]
description: "The Rootstock Runes Mock Bridge opens up exciting opportunities for developers to build Runes-focused applications within the Rootstock ecosystem. This bridge introduces three core solutions:
1. Mock Bridge,
2. Marketplace,
3. Giveaway Engine"
---

The Rootstock Runes Mock Bridge opens up exciting opportunities for developers to build Runes-focused applications within the Rootstock ecosystem. This bridge introduces three core solutions:

| **Component**         | **Description**                                                             |
|-----------------------|-----------------------------------------------------------------------------|
| **Mock Bridge**       | Facilitates transferring Runes between different blockchain networks.       |
| **Marketplace**       | A platform for trading and exchanging Runes tokens.                        |
| **Giveaway Engine**   | A system for distributing tokens in a structured or promotional manner.    |


These tools allow developers to create diverse Runes-based applications, further expanding the Rootstock ecosystem and promoting innovation.

In this guide, you will explore the exciting possibilities the Rootstock Runes Mock Bridge presents for developing Runes-focused applications within the Rootstock ecosystem. 

You will gain an understanding of Bitcoin Runes, including how they operate on the Bitcoin blockchain using the Unspent Transaction Output (UTXO) model and the OP\_RETURN opcode.

**Expect to learn:**

| **Component**        | **Description**                                                                                              |
|----------------------|--------------------------------------------------------------------------------------------------------------|
| Core Components      | Insight into the Mock Bridge and how they facilitate Runes token interactions.                             |
| Technical Concepts    | A clear explanation of the UTXO model and OP_RETURN.                                                       |
| Practical Examples    | Step-by-step examples demonstrating how to send Runes, accompanied by visual diagrams to aid understanding. |


By the end of this article, you will be able to build and deploy the Runes Mock Bridge and connect it to a frontend, equipping you with the foundational knowledge and technical skills necessary to start building innovative applications using Bitcoin Runes within the Rootstock ecosystem.

### **Who Is This Guide For?**

This guide is aimed at developers interested in working with Bitcoin Runes, particularly within the Rootstock ecosystem. You’ll need some basic knowledge of blockchain technology, Bitcoin, and Ethereum, but we’ll also provide step-by-step instructions for setting up your environment.

### **Understanding Bitcoin Runes**

**What Are Runes?**  
Bitcoin Runes is a protocol for creating fungible tokens directly on the blockchain. Developed by Casey Rodarmor, the mind behind Ordinals, Runes offers a more efficient way to issue tokens. 

Unlike [BRC-20 and SRC-20 tokens](https://academy.binance.com/en/glossary/src-20-tokens), Runes operate independently and are not dependent on the Ordinals protocol but operate on Bitcoin. Built on [Bitcoin’s Unspent Transaction Output (UTXO) model](https://www.kraken.com/learn/what-is-bitcoin-unspent-transaction-output-utxo), Runes is fully on-chain, offering a simpler and more efficient token system.

This UTXO-based structure gives Runes an edge over other token models, like those on Ethereum, by ensuring that all data remains on the blockchain without needing external input.

## **How Runes Work**

Bitcoin Runes is a protocol for creating and managing tokens on the Bitcoin blockchain. It leverages two key features: Bitcoin's UTXO (Unspent Transaction Output) model and the OP\_RETURN opcode.

### **Understanding UTXO and How Runes Use It**

Bitcoin's UTXO model tracks Bitcoin's movement by breaking each transaction into outputs, called UTXOs. When you spend Bitcoin, you're using these UTXOs as inputs for your transaction. 

Think of a UTXO like a digital coin in your wallet—each UTXO can represent a specific amount of Bitcoin, and when you spend it, the remaining "change" becomes a new UTXO.  

In the case of Bitcoin Runes, each UTXO can hold not just Bitcoin, but also different tokens or Runes. For example, let's say you have 2 Bitcoin Runes and want to transfer 1 Rune to a friend. 

Your UTXO will be split into one that transfers 1 Rune to your friend and another that keeps 1 Rune for you. The UTXO model helps track these tokens across the network, making it easy to know how many Runes each address owns.

### **OP\_RETURN: Attaching Information to Transactions**

Bitcoin transactions typically transfer currency from one address to another. However, the OP\_RETURN opcode allows for more than just currency transfer—it lets users attach extra information (up to 80 bytes) to a transaction. 

This added data is important because it’s how Runes store essential details like:

* The token's name (e.g., "Rune of Power")  
* The token’s ID (a unique identifier)  
* Commands for specific actions (like transferring or minting tokens)

This extra information is written into the blockchain in a part of the transaction called a "Runestone." When a Bitcoin transaction containing a Rune occurs, the data stored in the OP\_RETURN field tells the network what kind of Rune is involved and what should happen to it (e.g., transfer 1 Rune from John to Kate).

### **Example: Sending Runes on Bitcoin**

Let’s break this down with an example:

1. **John owns 3 Runes** stored in a Bitcoin UTXO.  
2. He wants to send 2 Runes to Kate.  
3. John creates a Bitcoin transaction that uses his UTXO as input and attaches the Rune transaction data to it.  
4. The transaction includes an **OP\_RETURN field**, where the information about transferring 2 Runes (this is the Runestone) is recorded.  
5. When the transaction is processed, the Bitcoin network updates the UTXO to show that John now has 1 Rune and Kate has 2\. 

### **Simplified Diagram:**

A diagram can help visualize this process.
<img src="/img/resources/runes/how-runes-works.png"/>

This simplified flow shows how UTXOs and OP\_RETURN work together to track Rune transactions.

### **Why Use Bitcoin Runes?**

By using these features of Bitcoin, Runes allow token creation and management without needing a separate blockchain. This makes them secure (since they rely on Bitcoin’s strong security) and simple, as they use the same underlying transaction system that Bitcoin already uses.

In short, Bitcoin Runes work by:

1. Tracking tokens using Bitcoin's UTXO model.  
2. Storing token data and actions using the OP\_RETURN field in Bitcoin transactions.

This system lets users create, transfer, and manage tokens on the Bitcoin network in a straightforward way.

