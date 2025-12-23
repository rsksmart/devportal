---
title: "Beginner Developer: Smart Contract Fundamentals"
description: "Learn about how smart contracts work on Rootstock."
tags: [guides, developers, blockchain, rsk, rootstock]
---

## Smart Contract Fundamentals on Rootstock

Smart contracts on Rootstock behave similarly to Ethereum because Rootstock is EVM-compatible. This module gives you the foundational concepts you must understand before writing or deploying your first contract.

### 1. What Are Smart Contracts?
Smart contracts are programs stored on the blockchain that run exactly as written.

**Key traits on Rootstock:**
- Immutable once deployed
- Executed by the EVM
- Triggered by transactions or messages
- Store and manage state
- Written primarily in Solidity

### 2. The EVM & Rootstock Compatibility
Rootstock uses the Ethereum Virtual Machine (EVM), meaning:
- Solidity code compiles the same way
- Same opcodes
- Same bytecode
- Same transaction structure
- Same ABI encoding

What differs is the network layer (mining, consensus, gas costs), not the programming model.

### 3. Solidity File Structure
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

### 4. State Variables
State variables live on-chain. They cost gas. They persist.

```solidity
uint256 public supply;
address public owner;
mapping(address => uint256) public balances;
```

### 5. Functions: External, Public, Internal, Private
Function visibility matters.

```solidity
function update() external {}
function read() public view returns(uint256) {}
function _calc() internal {}
function helper() private {}
```

### 6. Events
Events are your logging system. They don't store data on-chain; they emit logs users and dApps can track.

```solidity
event Transfer(address indexed from, address indexed to, uint256 amount);
```

### 7. Modifiers
Reusable access control logic.

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}
```

### 8. Constructor
Runs one time at deployment.

```solidity
constructor() {
    owner = msg.sender;
}
```

### 9. Error Handling
Use explicit errors for better gas efficiency and debugging.

```solidity
error NotOwner();

function withdraw() external {
    if (msg.sender != owner) revert NotOwner();
}
```

### 10. Contract Structure Best Practices
Follow this pattern for clean, maintainable contracts:
1. Imports
2. Errors
3. Events
4. State Variables
5. Modifiers
6. Constructor
7. Core Functions
8. Internal Logic

---