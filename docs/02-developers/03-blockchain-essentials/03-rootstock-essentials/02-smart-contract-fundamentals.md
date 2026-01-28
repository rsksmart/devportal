---
title: "Smart Contract Fundamentals"
sidebar_label: "Smart Contract Fundamentals"
sidebar_position: 2
description: "Learn the foundational concepts of smart contracts on Rootstock."
tags: [guides, developers, blockchain, rsk, rootstock, solidity, smart-contracts]
---

# Smart Contract Fundamentals

Smart contracts on Rootstock behave similarly to Ethereum because Rootstock is EVM-compatible. This module gives you the foundational concepts you must understand before writing or deploying your first contract.

## What Are Smart Contracts?

Smart contracts are programs stored on the blockchain that run exactly as written.

**Key traits on Rootstock:**
- Immutable once deployed
- Executed by the EVM
- Triggered by transactions or messages
- Store and manage state
- Written primarily in Solidity

## The EVM & Rootstock Compatibility

Rootstock uses the Ethereum Virtual Machine (EVM), meaning:
- Solidity code compiles the same way
- Same opcodes
- Same bytecode
- Same transaction structure
- Same ABI encoding

What differs is the network layer (mining, consensus, gas costs), not the programming model.

## Solidity File Structure

Every `.sol` file follows the same high-level structure:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Example {
    uint256 public value;

    function setValue(uint256 _v) external {
        value = _v;
    }
}
```

## State Variables

State variables live on-chain. They cost gas. They persist.

```solidity
uint256 public supply;
address public owner;
mapping(address => uint256) public balances;
```

## Functions: External, Public, Internal, Private

Function visibility matters.

```solidity
function update() external {}
function read() public view returns(uint256) {}
function _calc() internal {}
function helper() private {}
```

## Events

Events are your logging system. They don't store data on-chain; they emit logs users and dApps can track.

```solidity
event Transfer(address indexed from, address indexed to, uint256 amount);
```

## Modifiers

Reusable access control logic.

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}
```

## Constructor

Runs one time at deployment.

```solidity
constructor() {
    owner = msg.sender;
}
```

## Error Handling

Use explicit errors for better gas efficiency and debugging.

```solidity
error NotOwner();

function withdraw() external {
    if (msg.sender != owner) revert NotOwner();
}
```

## Contract Structure Best Practices

Follow this pattern for clean, maintainable contracts:
1. Imports
2. Errors
3. Events
4. State Variables
5. Modifiers
6. Constructor
7. Core Functions
8. Internal Logic

**Next:** [Deploy Your First Contract](/developers/blockchain-essentials/rootstock-essentials/deploy-first-contract/)
