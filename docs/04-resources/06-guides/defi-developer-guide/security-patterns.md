---
sidebar_position: 5
sidebar_label: Security Patterns
title: 'Security Patterns in DeFi dApps on Rootstock'
description: 'Essential security practices for DeFi: reentrancy, access control, upgradeability, and more.'
tags: [rsk, rootstock, defi, security, solidity, audits]
---

import CodeBlock from '@theme/CodeBlock';

DeFi protocols handle valuable assets. A single vulnerability can lead to catastrophic losses. Always follow these patterns and get professional audits before deploying to Mainnet.

## 1. Reentrancy Protection

Reentrancy is one of the most infamous vulnerabilities in smart contract development. It occurs when an external call is made to an untrusted contract before the calling contract has updated its own state, allowing the called contract to recursively call back into the original function and manipulate the contract’s state in unexpected ways.

 ### The Classic Reentrancy Attack (The DAO Hack)

Consider a simple withdrawal function:

```solidity
// VULNERABLE
function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount);
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
    balances[msg.sender] -= amount;
}
```

If msg.sender is a malicious contract, its receive() function can call withdraw() again before balances[msg.sender] is updated. This leads to draining the contract.

## Attack sequence:

Attacker calls withdraw(1 ether).

Contract sends 1 ether to attacker, triggering attacker's receive().

Attacker's receive() calls withdraw(1 ether) again.

Contract still has the attacker's old balance (not yet subtracted), so it sends another 1 ether.

This repeats until the contract is empty.

### The Solution: Checks-Effects-Interactions Pattern
Always follow this order:

Checks: Validate conditions (require statements).

Effects: Update the contract's state (e.g., subtract balance).

Interactions: Make external calls.

## Fixed version:

```solidity
function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount);
    balances[msg.sender] -= amount;               // EFFECTS first
    (bool success, ) = msg.sender.call{value: amount}(""); // INTERACTION last
    require(success, "Transfer failed");
}
```
Now, if the attacker tries to re-enter, their balance is already reduced, so the second withdraw will fail the require.

### Using OpenZeppelin's ReentrancyGuard

For extra safety, especially when you have multiple functions that could be re-entered, use ReentrancyGuard. It provides a nonReentrant modifier that prevents a function from being called while it is already executing.

export const secureContractSource = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts@5.6.1/utils/ReentrancyGuard.sol";

contract SecureContract is ReentrancyGuard {
    mapping(address => uint256) public balances;

    function withdraw(uint256 amount) external nonReentrant {
        require(balances[msg.sender] >= amount);
        balances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }
}`;

<CodeBlock language="solidity">{secureContractSource}</CodeBlock>

:::info[Try this contract in Remix]
Want to deploy and interact with `SecureContract` without any local setup? Use the button below to open it directly in the Remix IDE. You'll need MetaMask with [Rootstock Testnet configured](/dev-tools/wallets/metamask/) — see the full [Remix + Rootstock guide](/developers/quickstart/remix/) for the exact steps.

{/* Remix deep-link for SecureContract: https://remix.ethereum.org/?#code=Ly8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVApwcmFnbWEgc29saWRpdHkgXjAuOC4yMDsKCmltcG9ydCAiQG9wZW56ZXBwZWxpbi9jb250cmFjdHNANS42LjEvdXRpbHMvUmVlbnRyYW5jeUd1YXJkLnNvbCI7Cgpjb250cmFjdCBTZWN1cmVDb250cmFjdCBpcyBSZWVudHJhbmN5R3VhcmQgewogICAgbWFwcGluZyhhZGRyZXNzID0%2BIHVpbnQyNTYpIHB1YmxpYyBiYWxhbmNlczsKCiAgICBmdW5jdGlvbiB3aXRoZHJhdyh1aW50MjU2IGFtb3VudCkgZXh0ZXJuYWwgbm9uUmVlbnRyYW50IHsKICAgICAgICByZXF1aXJlKGJhbGFuY2VzW21zZy5zZW5kZXJdID49IGFtb3VudCk7CiAgICAgICAgYmFsYW5jZXNbbXNnLnNlbmRlcl0gLT0gYW1vdW50OwogICAgICAgIChib29sIHN1Y2Nlc3MsICkgPSBtc2cuc2VuZGVyLmNhbGx7dmFsdWU6IGFtb3VudH0oIiIpOwogICAgICAgIHJlcXVpcmUoc3VjY2VzcywgIlRyYW5zZmVyIGZhaWxlZCIpOwogICAgfQp9 */}

<RemixLaunchButton code={secureContractSource} />
:::

The modifier uses a uint256 status variable (0 = unlocked, 1 = locked) and reverts if locked. It is gas-efficient and prevents reentrancy across all nonReentrant functions.

### Advanced Considerations

#### Cross-Function Reentrancy
Reentrancy can also happen when two different functions share state and one calls the other. ReentrancyGuard prevents any nonReentrant function from being called while another is executing, covering cross-function cases.

#### Read-Only Reentrancy
Even view functions can be dangerous if they rely on transient state that changes during reentrancy. For example, a contract that calculates a user's balance based on some dynamic factor might return inconsistent values during a reentrant call. Always ensure that your state is consistent before external calls.

#### Dangers of transfer and send
Ethereum's transfer and send forward only 2300 gas, which is often enough to prevent reentrancy because the attacker's contract cannot perform complex logic. However, this is not a reliable security measure because:

Gas costs may change (e.g., with hard forks).

Some contracts (e.g., multi-sig) may require more gas.

It gives a false sense of security.

Best practice: Use call with reentrancy guards and proper effects-first ordering.

## Reentrancy via Token Hooks (ERC-777)
ERC-777 tokens have tokensReceived hooks that are called when tokens are sent. If you integrate such tokens, an attacker can re-enter your contract during the token transfer. Always use nonReentrant on functions that handle external tokens with hooks, and be aware that even safeTransfer from OpenZeppelin can trigger hooks.

## Testing for Reentrancy

### Test Setup

First, ensure you have the necessary testing dependencies:

```bash
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers chai
```

Write tests that simulate reentrant attacks. For example, using a malicious contract:

export const reentrancyTestContractsSource = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts@5.6.1/utils/ReentrancyGuard.sol";

contract Vulnerable {
    mapping(address => uint256) public balances;
    
    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }
    
    // VULNERABLE
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount);
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        balances[msg.sender] -= amount;
    }
}

contract Attacker {
    Vulnerable public victim;
    uint256 public attackCount;

    constructor(address _victim) {
        victim = Vulnerable(_victim);
    }

    receive() external payable {
        if (address(victim).balance >= 1 ether && attackCount < 5) {
            attackCount++;
            victim.withdraw(1 ether);
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        victim.deposit{value: 1 ether}(); // deposit first
        victim.withdraw(1 ether);
    }
}`;

<CodeBlock language="solidity">{reentrancyTestContractsSource}</CodeBlock>

:::info[Try this contract in Remix]
Want to deploy and interact with the `Vulnerable` and `Attacker` contracts without any local setup? Use the button below to open them directly in the Remix IDE. You'll need MetaMask with [Rootstock Testnet configured](/dev-tools/wallets/metamask/) — see the full [Remix + Rootstock guide](/developers/quickstart/remix/) for the exact steps.

{/* Remix deep-link for Vulnerable + Attacker: https://remix.ethereum.org/?#code=Ly8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVApwcmFnbWEgc29saWRpdHkgXjAuOC4yMDsKCmltcG9ydCAiQG9wZW56ZXBwZWxpbi9jb250cmFjdHNANS42LjEvdXRpbHMvUmVlbnRyYW5jeUd1YXJkLnNvbCI7Cgpjb250cmFjdCBWdWxuZXJhYmxlIHsKICAgIG1hcHBpbmcoYWRkcmVzcyA9PiB1aW50MjU2KSBwdWJsaWMgYmFsYW5jZXM7CiAgICAKICAgIGZ1bmN0aW9uIGRlcG9zaXQoKSBleHRlcm5hbCBwYXlhYmxlIHsKICAgICAgICBiYWxhbmNlc1ttc2cuc2VuZGVyXSArPSBtc2cudmFsdWU7CiAgICB9CiAgICAKICAgIC8vIFZVTE5FUkFCTEUKICAgIGZ1bmN0aW9uIHdpdGhkcmF3KHVpbnQyNTYgYW1vdW50KSBleHRlcm5hbCB7CiAgICAgICAgcmVxdWlyZShiYWxhbmNlc1ttc2cuc2VuZGVyXSA%2BPSBhbW91bnQpOwogICAgICAgIChib29sIHN1Y2Nlc3MsICkgPSBtc2cuc2VuZGVyLmNhbGx7dmFsdWU6IGFtb3VudH0oIiIpOwogICAgICAgIHJlcXVpcmUoc3VjY2VzcywgIlRyYW5zZmVyIGZhaWxlZCIpOwogICAgICAgIGJhbGFuY2VzW21zZy5zZW5kZXJdIC09IGFtb3VudDsKICAgIH0KfQoKY29udHJhY3QgQXR0YWNrZXIgewogICAgVnVsbmVyYWJsZSBwdWJsaWMgdmljdGltOwogICAgdWludDI1NiBwdWJsaWMgYXR0YWNrQ291bnQ7CgogICAgY29uc3RydWN0b3IoYWRkcmVzcyBfdmljdGltKSB7CiAgICAgICAgdmljdGltID0gVnVsbmVyYWJsZShfdmljdGltKTsKICAgIH0KCiAgICByZWNlaXZlKCkgZXh0ZXJuYWwgcGF5YWJsZSB7CiAgICAgICAgaWYgKGFkZHJlc3ModmljdGltKS5iYWxhbmNlID49IDEgZXRoZXIgJiYgYXR0YWNrQ291bnQgPCA1KSB7CiAgICAgICAgICAgIGF0dGFja0NvdW50Kys7CiAgICAgICAgICAgIHZpY3RpbS53aXRoZHJhdygxIGV0aGVyKTsKICAgICAgICB9CiAgICB9CgogICAgZnVuY3Rpb24gYXR0YWNrKCkgZXh0ZXJuYWwgcGF5YWJsZSB7CiAgICAgICAgcmVxdWlyZShtc2cudmFsdWUgPj0gMSBldGhlcik7CiAgICAgICAgdmljdGltLmRlcG9zaXR7dmFsdWU6IDEgZXRoZXJ9KCk7IC8vIGRlcG9zaXQgZmlyc3QKICAgICAgICB2aWN0aW0ud2l0aGRyYXcoMSBldGhlcik7CiAgICB9Cn0%3D */}

<RemixLaunchButton code={reentrancyTestContractsSource} />
:::

## Then in your test:

```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Reentrancy Protection", function () {
    let victim, attacker, owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        
        // Deploy vulnerable contract
        const Vulnerable = await ethers.getContractFactory("Vulnerable");
        victim = await Vulnerable.deploy();
        await victim.deployed();
        
        // Fund it
        await owner.sendTransaction({
            to: victim.address,
            value: ethers.utils.parseEther("10")
        });
    });

    it("should prevent reentrancy", async function () {
        const attacker = await (await ethers.getContractFactory("Attacker")).deploy(victim.address);
        await attacker.deployed();
        
        const initialBalance = await ethers.provider.getBalance(victim.address);
        
        await attacker.attack({ value: ethers.utils.parseEther("1") });
        
        const finalBalance = await ethers.provider.getBalance(victim.address);
        // Victim should not be drained due to reentrancy protection
        expect(finalBalance).to.be.gt(0);
    });
});
```

For fuzzing, tools like Echidna can generate sequences of calls to try to reenter.

## 2. Access Control

Access control ensures that only authorized users can execute sensitive functions, such as minting tokens, pausing the contract, or upgrading logic. Improper access control can lead to unauthorized minting, fund drainage, or contract destruction.

### Simple Ownership (Ownable)
OpenZeppelin's Ownable contract provides a basic access control mechanism with a single owner.

export const ownableContractSource = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts@5.6.1/access/Ownable.sol";

contract MyContract is Ownable {
    // OZ v5 Ownable requires the initial owner in the constructor
    constructor() Ownable(msg.sender) {}

    function mint(address to, uint256 amount) public onlyOwner {
        // only owner can mint
    }
}`;

<CodeBlock language="solidity">{ownableContractSource}</CodeBlock>

:::info[Try this contract in Remix]
Want to deploy and interact with `MyContract` without any local setup? Use the button below to open it directly in the Remix IDE. You'll need MetaMask with [Rootstock Testnet configured](/dev-tools/wallets/metamask/) — see the full [Remix + Rootstock guide](/developers/quickstart/remix/) for the exact steps.

{/* Remix deep-link for MyContract (Ownable): https://remix.ethereum.org/?#code=Ly8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVApwcmFnbWEgc29saWRpdHkgXjAuOC4yMDsKCmltcG9ydCAiQG9wZW56ZXBwZWxpbi9jb250cmFjdHNANS42LjEvYWNjZXNzL093bmFibGUuc29sIjsKCmNvbnRyYWN0IE15Q29udHJhY3QgaXMgT3duYWJsZSB7CiAgICAvLyBPWiB2NSBPd25hYmxlIHJlcXVpcmVzIHRoZSBpbml0aWFsIG93bmVyIGluIHRoZSBjb25zdHJ1Y3RvcgogICAgY29uc3RydWN0b3IoKSBPd25hYmxlKG1zZy5zZW5kZXIpIHt9CgogICAgZnVuY3Rpb24gbWludChhZGRyZXNzIHRvLCB1aW50MjU2IGFtb3VudCkgcHVibGljIG9ubHlPd25lciB7CiAgICAgICAgLy8gb25seSBvd25lciBjYW4gbWludAogICAgfQp9 */}

<RemixLaunchButton code={ownableContractSource} />
:::

**Limitations**:

Only one owner (or one account).

If the owner's private key is compromised, the contract is compromised.

Cannot grant granular permissions (e.g., some users can mint, others can pause).

### Role-Based Access Control (AccessControl)
OpenZeppelin's AccessControl provides a flexible, multi-role system based on the standard from Ethereum (EIP-5982). You define roles as bytes32 constants and grant them to addresses.

export const accessControlContractSource = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts@5.6.1/access/AccessControl.sol";

contract MyProtocol is AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); // admin can grant/revoke roles
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        // mint logic
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        // pause logic
    }
}`;

<CodeBlock language="solidity">{accessControlContractSource}</CodeBlock>

:::info[Try this contract in Remix]
Want to deploy and interact with `MyProtocol` without any local setup? Use the button below to open it directly in the Remix IDE. You'll need MetaMask with [Rootstock Testnet configured](/dev-tools/wallets/metamask/) — see the full [Remix + Rootstock guide](/developers/quickstart/remix/) for the exact steps.

{/* Remix deep-link for MyProtocol (AccessControl): https://remix.ethereum.org/?#code=Ly8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVApwcmFnbWEgc29saWRpdHkgXjAuOC4yMDsKCmltcG9ydCAiQG9wZW56ZXBwZWxpbi9jb250cmFjdHNANS42LjEvYWNjZXNzL0FjY2Vzc0NvbnRyb2wuc29sIjsKCmNvbnRyYWN0IE15UHJvdG9jb2wgaXMgQWNjZXNzQ29udHJvbCB7CiAgICBieXRlczMyIHB1YmxpYyBjb25zdGFudCBNSU5URVJfUk9MRSA9IGtlY2NhazI1NigiTUlOVEVSX1JPTEUiKTsKICAgIGJ5dGVzMzIgcHVibGljIGNvbnN0YW50IFBBVVNFUl9ST0xFID0ga2VjY2FrMjU2KCJQQVVTRVJfUk9MRSIpOwoKICAgIGNvbnN0cnVjdG9yKCkgewogICAgICAgIF9ncmFudFJvbGUoREVGQVVMVF9BRE1JTl9ST0xFLCBtc2cuc2VuZGVyKTsgLy8gYWRtaW4gY2FuIGdyYW50L3Jldm9rZSByb2xlcwogICAgICAgIF9ncmFudFJvbGUoTUlOVEVSX1JPTEUsIG1zZy5zZW5kZXIpOwogICAgICAgIF9ncmFudFJvbGUoUEFVU0VSX1JPTEUsIG1zZy5zZW5kZXIpOwogICAgfQoKICAgIGZ1bmN0aW9uIG1pbnQoYWRkcmVzcyB0bywgdWludDI1NiBhbW91bnQpIHB1YmxpYyBvbmx5Um9sZShNSU5URVJfUk9MRSkgewogICAgICAgIC8vIG1pbnQgbG9naWMKICAgIH0KCiAgICBmdW5jdGlvbiBwYXVzZSgpIHB1YmxpYyBvbmx5Um9sZShQQVVTRVJfUk9MRSkgewogICAgICAgIC8vIHBhdXNlIGxvZ2ljCiAgICB9Cn0%3D */}

<RemixLaunchButton code={accessControlContractSource} />
:::

## Key features:

- Role hierarchy: The DEFAULT_ADMIN_ROLE can grant and revoke any role, including itself.

- Granular permissions: Assign different roles to different addresses.

- Renouncing roles: Use renounceRole to remove a role from yourself.

- Inspect roles: hasRole, getRoleAdmin, grantRole, revokeRole.

###  Best Practices

#### Principle of Least Privilege
Only give the minimum necessary permissions to each address. For example, a bot that only mints tokens should not have the DEFAULT_ADMIN_ROLE.

## Use a Multi-Sig for Admin Roles
For production, the DEFAULT_ADMIN_ROLE should be held by a multi-signature wallet (e.g., Gnosis Safe) or a DAO to prevent a single point of failure.

```solidity
constructor(address multiSig) {
    _grantRole(DEFAULT_ADMIN_ROLE, multiSig);
}
```

# Timelocks for Sensitive Operations

Combine access control with a timelock (e.g., OpenZeppelin TimelockController) so that role changes or upgrades have a delay, giving users time to react.

## Emergency Pause
Consider having a dedicated EMERGENCY_PAUSE_ROLE that can pause the contract without delay, but only a few trusted parties hold it.

## Revoking vs. Renouncing
revokeRole(role, account) – removes role from account, callable by admin.

renounceRole(role, account) – the account removes the role from itself. Useful for voluntarily stepping down.

## Testing Access Control
Write tests that verify only authorized addresses can call restricted functions.

```javascript
describe("Access Control", function () {
    it("should allow minter to mint", async function () {
        await protocol.connect(minter).mint(user.address, 100);
        expect(await token.balanceOf(user.address)).to.equal(100);
    });

    it("should not allow non-minter to mint", async function () {
        await expect(
            protocol.connect(nonMinter).mint(user.address, 100)
        ).to.be.revertedWith(
            `AccessControl: account ${nonMinter.address.toLowerCase()} is missing role ${MINTER_ROLE}`
        );
    });
});
```

## Common Pitfalls

- **Not initializing roles:** Forgetting to grant roles in the constructor leads to no one having permissions.

- **Using msg.sender directly:** Always use the onlyRole modifier; don't hardcode addresses.

- **Role ID collision:** Use keccak256 on a descriptive string to avoid accidental collisions.

- **Renouncing DEFAULT_ADMIN_ROLE without a backup:** If you renounce the admin role, you lose the ability to grant any roles forever. Consider having a timelock or multi-sig as admin.

## 3. Integer Overflow/Underflow

Integer overflow and underflow occur when arithmetic operations exceed the maximum or minimum value that a data type can hold. In Solidity versions prior to 0.8, these would silently wrap around (e.g., uint8 max 255; 255 + 1 = 0), leading to critical vulnerabilities like token minting exploits or incorrect balance calculations.

## Solidity 0.8+ Built-in Checks

Starting from Solidity 0.8, the compiler automatically inserts overflow/underflow checks for all arithmetic operations. If an overflow occurs, the transaction reverts. This is a huge security improvement, but it comes with a gas cost.

## Example:

```solidity
uint8 x = 255;
x++; // This would revert because 255+1 overflows uint8.
```

## When to Use unchecked Blocks

In some cases, you may want to allow wrapping for gas optimization—for example, in loops or when you are absolutely certain overflow cannot happen. You can wrap code in an unchecked block to disable automatic checks.

```solidity
for (uint256 i = 0; i < 1000; ) {
    // ... loop body ...
    unchecked {
        i++; // No overflow check, saves gas
    }
}
```
Warning: Only use unchecked when you have mathematically proven that overflow cannot occur. Misuse can reintroduce vulnerabilities.

## SafeMath Is No Longer Needed

On older Solidity versions (`<0.8`) you needed a library like OpenZeppelin's SafeMath to prevent overflows. SafeMath was removed in OpenZeppelin Contracts v5, because Solidity 0.8+ reverts on overflow and underflow by default. Write plain arithmetic and the compiler inserts the checks for you.

export const safeMathContractSource = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract MyContract {
    function safeAdd(uint256 a, uint256 b) public pure returns (uint256) {
        // Solidity 0.8+ reverts automatically on overflow, no SafeMath required
        return a + b;
    }
}`;

<CodeBlock language="solidity">{safeMathContractSource}</CodeBlock>

:::info[Try this contract in Remix]
Want to deploy and interact with `MyContract` without any local setup? Use the button below to open it directly in the Remix IDE. You'll need MetaMask with [Rootstock Testnet configured](/dev-tools/wallets/metamask/) — see the full [Remix + Rootstock guide](/developers/quickstart/remix/) for the exact steps.

{/* Remix deep-link for MyContract (checked math): https://remix.ethereum.org/?#code=Ly8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVApwcmFnbWEgc29saWRpdHkgXjAuOC4yMDsKCmNvbnRyYWN0IE15Q29udHJhY3QgewogICAgZnVuY3Rpb24gc2FmZUFkZCh1aW50MjU2IGEsIHVpbnQyNTYgYikgcHVibGljIHB1cmUgcmV0dXJucyAodWludDI1NikgewogICAgICAgIC8vIFNvbGlkaXR5IDAuOCsgcmV2ZXJ0cyBhdXRvbWF0aWNhbGx5IG9uIG92ZXJmbG93LCBubyBTYWZlTWF0aCByZXF1aXJlZAogICAgICAgIHJldHVybiBhICsgYjsKICAgIH0KfQ%3D%3D */}

<RemixLaunchButton code={safeMathContractSource} />
:::

## 4. Secure Randomness

Generating unpredictable random numbers on a deterministic blockchain is challenging. Miners/validators can influence block data, and any on-chain "randomness" derived from block properties can be manipulated.

## Common (Insecure) Approaches

- **block.timestamp** – Can be influenced by miners within a few seconds.

- **blockhash** – Only available for the last 256 blocks, and miners can reorg.

- **block.difficulty** – Also miner-influenced.

- **keccak256(abi.encodePacked(block.timestamp, msg.sender))** – Still predictable.

## Secure Solutions

**Chainlink VRF (Verifiable Random Function)**

Chainlink VRF provides provably fair randomness using cryptographic proofs. You request randomness, and Chainlink's oracle returns it with a proof that can be verified on-chain.

Chainlink VRF is not currently deployed on Rootstock. The example below targets a VRF-supported testnet (Ethereum Sepolia). Check the [VRF supported networks](https://docs.chain.link/vrf/v2-5/supported-networks) for the coordinator and key hash on your chosen network, and consider a Rootstock-native randomness source for production on Rootstock.

## Basic Example:

export const vrfConsumerContractSource = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts@1.5.0/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts@1.5.0/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

contract RandomNumberConsumer is VRFConsumerBaseV2Plus {
    uint256 s_subscriptionId;
    // Ethereum Sepolia testnet 500 gwei gas lane. Chainlink VRF is not deployed on
    // Rootstock, so deploy this on a VRF-supported network. Look up the keyHash and
    // coordinator for your network at https://docs.chain.link/vrf/v2-5/supported-networks
    bytes32 keyHash = 0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae;
    uint32 callbackGasLimit = 100000;
    uint16 requestConfirmations = 3;
    uint32 numWords = 1;

    uint256 public s_randomWord;

    // VRFConsumerBaseV2Plus takes the VRF v2.5 coordinator address
    constructor(uint256 subscriptionId, address vrfCoordinator) VRFConsumerBaseV2Plus(vrfCoordinator) {
        s_subscriptionId = subscriptionId;
    }

    function requestRandomWord() external returns (uint256 requestId) {
        requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                // set nativePayment to true to pay for VRF requests with native tokens
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                )
            })
        );
    }

    function fulfillRandomWords(uint256 requestId, uint256[] calldata randomWords) internal override {
        s_randomWord = randomWords[0];
    }
}`;

<CodeBlock language="solidity">{vrfConsumerContractSource}</CodeBlock>

:::info[Try this contract in Remix]
Want to deploy and interact with `RandomNumberConsumer` without any local setup? Use the button below to open it directly in the Remix IDE. You'll need MetaMask with [Rootstock Testnet configured](/dev-tools/wallets/metamask/) — see the full [Remix + Rootstock guide](/developers/quickstart/remix/) for the exact steps.

{/* Remix deep-link for RandomNumberConsumer: https://remix.ethereum.org/?#code=Ly8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVApwcmFnbWEgc29saWRpdHkgXjAuOC4yMDsKCmltcG9ydCB7VlJGQ29uc3VtZXJCYXNlVjJQbHVzfSBmcm9tICJAY2hhaW5saW5rL2NvbnRyYWN0c0AxLjUuMC9zcmMvdjAuOC92cmYvZGV2L1ZSRkNvbnN1bWVyQmFzZVYyUGx1cy5zb2wiOwppbXBvcnQge1ZSRlYyUGx1c0NsaWVudH0gZnJvbSAiQGNoYWlubGluay9jb250cmFjdHNAMS41LjAvc3JjL3YwLjgvdnJmL2Rldi9saWJyYXJpZXMvVlJGVjJQbHVzQ2xpZW50LnNvbCI7Cgpjb250cmFjdCBSYW5kb21OdW1iZXJDb25zdW1lciBpcyBWUkZDb25zdW1lckJhc2VWMlBsdXMgewogICAgdWludDI1NiBzX3N1YnNjcmlwdGlvbklkOwogICAgLy8gRXRoZXJldW0gU2Vwb2xpYSB0ZXN0bmV0IDUwMCBnd2VpIGdhcyBsYW5lLiBDaGFpbmxpbmsgVlJGIGlzIG5vdCBkZXBsb3llZCBvbgogICAgLy8gUm9vdHN0b2NrLCBzbyBkZXBsb3kgdGhpcyBvbiBhIFZSRi1zdXBwb3J0ZWQgbmV0d29yay4gTG9vayB1cCB0aGUga2V5SGFzaCBhbmQKICAgIC8vIGNvb3JkaW5hdG9yIGZvciB5b3VyIG5ldHdvcmsgYXQgaHR0cHM6Ly9kb2NzLmNoYWluLmxpbmsvdnJmL3YyLTUvc3VwcG9ydGVkLW5ldHdvcmtzCiAgICBieXRlczMyIGtleUhhc2ggPSAweDc4N2Q3NGNhZWExMGIyYjM1Nzc5MGQ1YjUyNDdjMmY2M2QxZDkxNTcyYTk4NDZmNzgwNjA2ZTRkOTUzNjc3YWU7CiAgICB1aW50MzIgY2FsbGJhY2tHYXNMaW1pdCA9IDEwMDAwMDsKICAgIHVpbnQxNiByZXF1ZXN0Q29uZmlybWF0aW9ucyA9IDM7CiAgICB1aW50MzIgbnVtV29yZHMgPSAxOwoKICAgIHVpbnQyNTYgcHVibGljIHNfcmFuZG9tV29yZDsKCiAgICAvLyBWUkZDb25zdW1lckJhc2VWMlBsdXMgdGFrZXMgdGhlIFZSRiB2Mi41IGNvb3JkaW5hdG9yIGFkZHJlc3MKICAgIGNvbnN0cnVjdG9yKHVpbnQyNTYgc3Vic2NyaXB0aW9uSWQsIGFkZHJlc3MgdnJmQ29vcmRpbmF0b3IpIFZSRkNvbnN1bWVyQmFzZVYyUGx1cyh2cmZDb29yZGluYXRvcikgewogICAgICAgIHNfc3Vic2NyaXB0aW9uSWQgPSBzdWJzY3JpcHRpb25JZDsKICAgIH0KCiAgICBmdW5jdGlvbiByZXF1ZXN0UmFuZG9tV29yZCgpIGV4dGVybmFsIHJldHVybnMgKHVpbnQyNTYgcmVxdWVzdElkKSB7CiAgICAgICAgcmVxdWVzdElkID0gc192cmZDb29yZGluYXRvci5yZXF1ZXN0UmFuZG9tV29yZHMoCiAgICAgICAgICAgIFZSRlYyUGx1c0NsaWVudC5SYW5kb21Xb3Jkc1JlcXVlc3QoewogICAgICAgICAgICAgICAga2V5SGFzaDoga2V5SGFzaCwKICAgICAgICAgICAgICAgIHN1YklkOiBzX3N1YnNjcmlwdGlvbklkLAogICAgICAgICAgICAgICAgcmVxdWVzdENvbmZpcm1hdGlvbnM6IHJlcXVlc3RDb25maXJtYXRpb25zLAogICAgICAgICAgICAgICAgY2FsbGJhY2tHYXNMaW1pdDogY2FsbGJhY2tHYXNMaW1pdCwKICAgICAgICAgICAgICAgIG51bVdvcmRzOiBudW1Xb3JkcywKICAgICAgICAgICAgICAgIC8vIHNldCBuYXRpdmVQYXltZW50IHRvIHRydWUgdG8gcGF5IGZvciBWUkYgcmVxdWVzdHMgd2l0aCBuYXRpdmUgdG9rZW5zCiAgICAgICAgICAgICAgICBleHRyYUFyZ3M6IFZSRlYyUGx1c0NsaWVudC5fYXJnc1RvQnl0ZXMoCiAgICAgICAgICAgICAgICAgICAgVlJGVjJQbHVzQ2xpZW50LkV4dHJhQXJnc1YxKHtuYXRpdmVQYXltZW50OiBmYWxzZX0pCiAgICAgICAgICAgICAgICApCiAgICAgICAgICAgIH0pCiAgICAgICAgKTsKICAgIH0KCiAgICBmdW5jdGlvbiBmdWxmaWxsUmFuZG9tV29yZHModWludDI1NiByZXF1ZXN0SWQsIHVpbnQyNTZbXSBjYWxsZGF0YSByYW5kb21Xb3JkcykgaW50ZXJuYWwgb3ZlcnJpZGUgewogICAgICAgIHNfcmFuZG9tV29yZCA9IHJhbmRvbVdvcmRzWzBdOwogICAgfQp9 */}

<RemixLaunchButton code={vrfConsumerContractSource} />
:::

## Commit-Reveal Schemes
For simple applications (like a lottery), you can use a commit-reveal scheme where users commit a hashed secret and later reveal it. The final random number can be a combination of all revealed secrets (e.g., XOR or hash of concatenation). This prevents last-minute manipulation but requires multiple transactions.

## Best Practices
- Never trust block properties for randomness that affects asset distribution.

- Use Chainlink VRF for production DeFi applications requiring secure randomness.

- Consider the cost: VRF requests require subscription and LINK tokens.

- Test randomness logic thoroughly; ensure that your contract handles the asynchronous nature of VRF correctly.

## 5. Upgradeability Patterns

DeFi protocols often need upgrades. Use proxy patterns (UUPS or Transparent) from OpenZeppelin.

## Example: UUPS Proxy

export const uupsContractSource = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts-upgradeable@5.6.1/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable@5.6.1/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable@5.6.1/access/OwnableUpgradeable.sol";

contract MyContractV1 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    function initialize() public initializer {
        // OZ v5 OwnableUpgradeable takes the initial owner as an argument
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}`;

<CodeBlock language="solidity">{uupsContractSource}</CodeBlock>

:::info[Try this contract in Remix]
Want to deploy and interact with `MyContractV1` without any local setup? Use the button below to open it directly in the Remix IDE. You'll need MetaMask with [Rootstock Testnet configured](/dev-tools/wallets/metamask/) — see the full [Remix + Rootstock guide](/developers/quickstart/remix/) for the exact steps.

{/* Remix deep-link for MyContractV1 (UUPS): https://remix.ethereum.org/?#code=Ly8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVApwcmFnbWEgc29saWRpdHkgXjAuOC4yMDsKCmltcG9ydCAiQG9wZW56ZXBwZWxpbi9jb250cmFjdHMtdXBncmFkZWFibGVANS42LjEvcHJveHkvdXRpbHMvSW5pdGlhbGl6YWJsZS5zb2wiOwppbXBvcnQgIkBvcGVuemVwcGVsaW4vY29udHJhY3RzLXVwZ3JhZGVhYmxlQDUuNi4xL3Byb3h5L3V0aWxzL1VVUFNVcGdyYWRlYWJsZS5zb2wiOwppbXBvcnQgIkBvcGVuemVwcGVsaW4vY29udHJhY3RzLXVwZ3JhZGVhYmxlQDUuNi4xL2FjY2Vzcy9Pd25hYmxlVXBncmFkZWFibGUuc29sIjsKCmNvbnRyYWN0IE15Q29udHJhY3RWMSBpcyBJbml0aWFsaXphYmxlLCBVVVBTVXBncmFkZWFibGUsIE93bmFibGVVcGdyYWRlYWJsZSB7CiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkgcHVibGljIGluaXRpYWxpemVyIHsKICAgICAgICAvLyBPWiB2NSBPd25hYmxlVXBncmFkZWFibGUgdGFrZXMgdGhlIGluaXRpYWwgb3duZXIgYXMgYW4gYXJndW1lbnQKICAgICAgICBfX093bmFibGVfaW5pdChtc2cuc2VuZGVyKTsKICAgICAgICBfX1VVUFNVcGdyYWRlYWJsZV9pbml0KCk7CiAgICB9CgogICAgZnVuY3Rpb24gX2F1dGhvcml6ZVVwZ3JhZGUoYWRkcmVzcyBuZXdJbXBsZW1lbnRhdGlvbikgaW50ZXJuYWwgb3ZlcnJpZGUgb25seU93bmVyIHt9Cn0%3D */}

<RemixLaunchButton code={uupsContractSource} />
:::

### Upgrade script:

```javascript
const { ethers, upgrades } = require("hardhat");

async function main() {
  const MyContractV1 = await ethers.getContractFactory("MyContractV1");
  const proxy = await upgrades.deployProxy(MyContractV1, [], { kind: 'uups' });
  await proxy.deployed();
  console.log("Proxy deployed to:", proxy.address);
}
```

## 6. Price Oracle Manipulation

DeFi protocols heavily rely on price oracles to determine asset values for lending, swapping, liquidations, and more. Manipulating these prices can lead to catastrophic losses.

**Why Oracles Are Critical**

- Lending protocols use oracles to calculate collateral value and trigger liquidations.

- AMMs may use oracles to set swap rates (if not using constant product).

- Synthetic assets require accurate price feeds for minting and redemption.

- Options and futures need settlement prices.

## Common Oracle Attack Vectors

### Flash Loan Price Manipulation
An attacker borrows a large amount via flash loan, swaps on a low-liquidity DEX to skew the spot price, and then exploits a protocol that uses that spot price without checking its reliability.

### Stale Price Attacks
If an oracle hasn't been updated recently, an attacker might use an outdated price that doesn't reflect the current market.

### Front-Running / Sandwich Attacks
An attacker observes a pending transaction that will use an oracle, then trades before it to manipulate the price to their advantage.

## Secure Oracle Design Patterns

### 1. Use Decentralized Price Feeds (Chainlink)
Chainlink provides aggregated price data from multiple high-quality sources. But even with Chainlink, you must use it correctly.

**Safe Chainlink Integration:**

export const priceConsumerContractSource = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@chainlink/contracts@1.5.0/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract PriceConsumer {
    AggregatorV3Interface internal priceFeed;

    constructor(address feedAddress) {
        priceFeed = AggregatorV3Interface(feedAddress);
    }

    function getLatestPrice() public view returns (int256) {
        (
            uint80 roundID,
            int256 price,
            ,
            uint256 updatedAt,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();

        // 1. Check freshness
        require(block.timestamp - updatedAt <= 1 hours, "Price is stale");

        // 2. Ensure the round is complete
        require(answeredInRound >= roundID, "Round incomplete");

        // 3. Price should be positive
        require(price > 0, "Invalid price");

        return price;
    }
}`;

<CodeBlock language="solidity">{priceConsumerContractSource}</CodeBlock>

:::info[Try this contract in Remix]
Want to deploy and interact with `PriceConsumer` without any local setup? Use the button below to open it directly in the Remix IDE. You'll need MetaMask with [Rootstock Testnet configured](/dev-tools/wallets/metamask/) — see the full [Remix + Rootstock guide](/developers/quickstart/remix/) for the exact steps.

{/* Remix deep-link for PriceConsumer: https://remix.ethereum.org/?#code=Ly8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVApwcmFnbWEgc29saWRpdHkgXjAuOC4yMDsKCmltcG9ydCAiQGNoYWlubGluay9jb250cmFjdHNAMS41LjAvc3JjL3YwLjgvc2hhcmVkL2ludGVyZmFjZXMvQWdncmVnYXRvclYzSW50ZXJmYWNlLnNvbCI7Cgpjb250cmFjdCBQcmljZUNvbnN1bWVyIHsKICAgIEFnZ3JlZ2F0b3JWM0ludGVyZmFjZSBpbnRlcm5hbCBwcmljZUZlZWQ7CgogICAgY29uc3RydWN0b3IoYWRkcmVzcyBmZWVkQWRkcmVzcykgewogICAgICAgIHByaWNlRmVlZCA9IEFnZ3JlZ2F0b3JWM0ludGVyZmFjZShmZWVkQWRkcmVzcyk7CiAgICB9CgogICAgZnVuY3Rpb24gZ2V0TGF0ZXN0UHJpY2UoKSBwdWJsaWMgdmlldyByZXR1cm5zIChpbnQyNTYpIHsKICAgICAgICAoCiAgICAgICAgICAgIHVpbnQ4MCByb3VuZElELAogICAgICAgICAgICBpbnQyNTYgcHJpY2UsCiAgICAgICAgICAgICwKICAgICAgICAgICAgdWludDI1NiB1cGRhdGVkQXQsCiAgICAgICAgICAgIHVpbnQ4MCBhbnN3ZXJlZEluUm91bmQKICAgICAgICApID0gcHJpY2VGZWVkLmxhdGVzdFJvdW5kRGF0YSgpOwoKICAgICAgICAvLyAxLiBDaGVjayBmcmVzaG5lc3MKICAgICAgICByZXF1aXJlKGJsb2NrLnRpbWVzdGFtcCAtIHVwZGF0ZWRBdCA8PSAxIGhvdXJzLCAiUHJpY2UgaXMgc3RhbGUiKTsKCiAgICAgICAgLy8gMi4gRW5zdXJlIHRoZSByb3VuZCBpcyBjb21wbGV0ZQogICAgICAgIHJlcXVpcmUoYW5zd2VyZWRJblJvdW5kID49IHJvdW5kSUQsICJSb3VuZCBpbmNvbXBsZXRlIik7CgogICAgICAgIC8vIDMuIFByaWNlIHNob3VsZCBiZSBwb3NpdGl2ZQogICAgICAgIHJlcXVpcmUocHJpY2UgPiAwLCAiSW52YWxpZCBwcmljZSIpOwoKICAgICAgICByZXR1cm4gcHJpY2U7CiAgICB9Cn0%3D */}

<RemixLaunchButton code={priceConsumerContractSource} />
:::

## Additional checks:

Compare the price against a deviation threshold (e.g., not more than 10% from last price).

Use multiple oracles and take the median (see below).

## 2. Use Multiple Oracles (Medianizer)
Combine several independent price sources (e.g., Chainlink, MakerDAO, Uniswap TWAP) and take the median. This reduces reliance on any single source.

```solidity
function getMedianPrice() external view returns (uint256) {
    uint256[] memory prices = new uint256[](3);
    prices[0] = uint256(getChainlinkPrice());
    prices[1] = uint256(getMakerDAOPrice());
    prices[2] = getUniswapTWAP();
    return median(prices);
}
```

## 3. Use Time-Weighted Average Price (TWAP)
Instead of spot prices, use an average over a period (e.g., 30 minutes). This makes manipulation expensive because the attacker must sustain the manipulated price over multiple blocks.

## Uniswap V2 TWAP Example:

Uniswap V2 provides a price0CumulativeLast and price1CumulativeLast that accumulate the price over time. You can compute a TWAP by taking two snapshots.

```solidity
function getTWAP(address pair, uint32 window) external view returns (uint256) {
    IUniswapV2Pair uniswapPair = IUniswapV2Pair(pair);
    (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast) = uniswapPair.getReserves();
    uint256 price0CumulativeLast = uniswapPair.price0CumulativeLast();
    uint256 price1CumulativeLast = uniswapPair.price1CumulativeLast();

    // Simulate a fixed window; in practice, you'd store previous cumulative values.
    uint32 timeElapsed = block.timestamp - blockTimestampLast;
    require(timeElapsed >= window, "TWAP window not passed");

    uint256 price0Average = (price0CumulativeLast - previousPrice0Cumulative) / timeElapsed;
    return price0Average;
}
```

For production, you would store cumulative values in your contract at regular intervals.

## 4. Circuit Breakers and Deviation Checks
If the price from an oracle changes too much in a short time, consider pausing the protocol or requiring manual intervention.

```solidity
uint256 public lastPrice;
uint256 public constant MAX_DEVIATION = 5e17; // 50% (with 18 decimals)

function checkPrice() external {
    uint256 currentPrice = getPrice();
    if (currentPrice > lastPrice * (1e18 + MAX_DEVIATION) / 1e18 ||
        currentPrice < lastPrice * (1e18 - MAX_DEVIATION) / 1e18) {
        // Trigger circuit breaker or emit alert
    }
    lastPrice = currentPrice;
}
```

## Putting It All Together

A robust price oracle module might:

Fetch price from Chainlink with staleness check.

Fetch price from a Uniswap V3 TWAP (e.g., 30-minute average).

Compute the median.

If the median deviates too much from the previous median, pause the contract and notify admins.

# Testing for Oracle Manipulation

## Simulate flash loan attacks in a forked environment:

```javascript
it("should resist flash loan manipulation", async () => {
    // Fork mainnet at a specific block
    await network.provider.request({
        method: "hardhat_reset",
        params: [{
            forking: {
                jsonRpcUrl: "https://mainnet.infura.io/v3/your-key",
                blockNumber: 15000000
            }
        }]
    });

    // Impersonate a whale to get flash loan funds
    await impersonateAccount("0x...");
    const whale = await ethers.getSigner("0x...");

    // Execute a large swap to manipulate price
    const weth = await ethers.getContractAt("IERC20", WETH_ADDRESS);
    const amount = ethers.utils.parseEther("10000");
    await weth.connect(whale).transfer(attacker.address, amount);
    // ... perform swap on low-liquidity pool ...

    // Now call your protocol's price-dependent function
    // Assert that it did not use the manipulated price incorrectly
});
```

## Best Practices Summary

- Never rely on a single spot price for critical operations.

- Use decentralized oracles like Chainlink with freshness and completeness checks.

- Incorporate TWAPs for manipulation resistance.

- Have fallback oracles and circuit breakers.

- Monitor oracle updates and set alerts for anomalies.

- Understand the limitations of each oracle and design accordingly.

By following these patterns, you significantly reduce the risk of price manipulation attacks in your DeFi protocol.

## 7. Flash Loan Attacks

Flash loans allow users to borrow assets without collateral, as long as the loan is repaid within the same transaction. They are a powerful DeFi primitive but have been exploited in many attacks.

## How Flash Loans Work

- A user borrows a large amount from a flash loan provider (e.g., Aave, dYdX).

- The user performs arbitrary operations with the borrowed funds (e.g., swapping on a DEX).

- The user repays the loan plus a fee by the end of the transaction.

- If repayment fails, the whole transaction reverts.

## Common Attack Vectors

**Price Manipulation:** Attackers use flash loans to temporarily alter the price of an asset in a low-liquidity pool, then exploit another protocol that relies on that manipulated price (e.g., for liquidations, oracles).

**Arbitrage:** While not always malicious, arbitrage can be combined with other exploits.

**Reentrancy:** Flash loans can fund reentrancy attacks if the target contract has unprotected external calls.

## Example: bZx Attack (2020)

- Attacker borrowed 10,000 ETH via flash loan.

- Used ETH to buy a large amount of wBTC on one exchange, driving up the price.

- Used wBTC as collateral on bZx to borrow more ETH.

- Repaid flash loan, profiting from the price difference.

## Mitigation Strategies

- **Use Time-Weighted Average Prices (TWAP):** Instead of relying on spot prices, use oracles that return an average over time (e.g., Uniswap V2's consult). This makes manipulation expensive and harder.

- **Check Balance Invariants:** After external calls, verify that the contract's balances are consistent (e.g., total supply = reserves).

- **Reentrancy Guards:** Always use nonReentrant on functions that make external calls.

- **Limit Leverage:** Cap the amount that can be borrowed or swapped relative to liquidity.

- **Circuit Breakers:** Pause the contract if suspicious activity is detected.

## Testing for Flash Loan Attacks

Simulate flash loan attacks in your test environment (e.g., using mainnet forking) to see if your protocol can be exploited. Tools like Hardhat allow you to impersonate accounts and execute complex attack scenarios.

```javascript
// Example: Testing price manipulation resistance
it("should resist flash loan price manipulation", async () => {
  // Impersonate a whale with large funds
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: ["0x..."]
  });
  const whale = await ethers.getSigner("0x...");

  // Execute flash loan attack sequence
  // ... (borrow, swap, check if your contract's price changed)
  // Assert that your protocol's invariant held
});
```

## 8. Circuit Breakers

Implement pause functionality to stop the protocol in case of emergency.

export const pausableContractSource = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts@5.6.1/utils/Pausable.sol";
import "@openzeppelin/contracts@5.6.1/access/Ownable.sol";

contract MyProtocol is Pausable, Ownable {
    // OZ v5 Ownable requires the initial owner in the constructor
    constructor() Ownable(msg.sender) {}

    function swap() external whenNotPaused {
        // ...
    }

    function pause() external onlyOwner {
        _pause();
    }
}`;

<CodeBlock language="solidity">{pausableContractSource}</CodeBlock>

:::info[Try this contract in Remix]
Want to deploy and interact with `MyProtocol` without any local setup? Use the button below to open it directly in the Remix IDE. You'll need MetaMask with [Rootstock Testnet configured](/dev-tools/wallets/metamask/) — see the full [Remix + Rootstock guide](/developers/quickstart/remix/) for the exact steps.

{/* Remix deep-link for MyProtocol (Pausable): https://remix.ethereum.org/?#code=Ly8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVApwcmFnbWEgc29saWRpdHkgXjAuOC4yMDsKCmltcG9ydCAiQG9wZW56ZXBwZWxpbi9jb250cmFjdHNANS42LjEvdXRpbHMvUGF1c2FibGUuc29sIjsKaW1wb3J0ICJAb3BlbnplcHBlbGluL2NvbnRyYWN0c0A1LjYuMS9hY2Nlc3MvT3duYWJsZS5zb2wiOwoKY29udHJhY3QgTXlQcm90b2NvbCBpcyBQYXVzYWJsZSwgT3duYWJsZSB7CiAgICAvLyBPWiB2NSBPd25hYmxlIHJlcXVpcmVzIHRoZSBpbml0aWFsIG93bmVyIGluIHRoZSBjb25zdHJ1Y3RvcgogICAgY29uc3RydWN0b3IoKSBPd25hYmxlKG1zZy5zZW5kZXIpIHt9CgogICAgZnVuY3Rpb24gc3dhcCgpIGV4dGVybmFsIHdoZW5Ob3RQYXVzZWQgewogICAgICAgIC8vIC4uLgogICAgfQoKICAgIGZ1bmN0aW9uIHBhdXNlKCkgZXh0ZXJuYWwgb25seU93bmVyIHsKICAgICAgICBfcGF1c2UoKTsKICAgIH0KfQ%3D%3D */}

<RemixLaunchButton code={pausableContractSource} />
:::

## 9. Input Validation

Always validate user inputs, especially addresses and amounts. Use require statements.
Input validation ensures that all user-supplied data is safe and within expected bounds before processing. Poor validation can lead to logical errors, asset loss, or exploits.

### Key Validations

## Address Validation

Non-zero address: Prevent sending tokens to address(0), which would burn them.

```solidity
require(to != address(0), "Invalid address");
```
Contract existence: If you need to interact with a contract, check address.code.length > 0 (Solidity 0.8+).

Check for self-approval: If approving, ensure spender != address(0) and spender != msg.sender if needed.


## Amount Validation
Positive amounts: require(amount > 0, "Amount must be >0").

Upper bounds: If there's a max supply or per-user cap, enforce it.

Sufficient balance: require(balanceOf[msg.sender] >= amount, "Insufficient balance").

Allowance checks: For transferFrom, ensure allowance is enough.

## Array Validation
Length checks: If arrays must match (e.g., recipients and amounts), ensure recipients.length == amounts.length.

Limit array size: Prevent excessive gas consumption by capping array length.

```solidity
require(recipients.length <= maxBatchSize, "Batch too large");
```
Timestamp and Deadline Validation
For time-sensitive operations (e.g., auctions), ensure block.timestamp is within allowed window.

```solidity
require(block.timestamp <= deadline, "Transaction expired");
```
Custom Errors (Gas Efficiency)
Solidity 0.8.4 introduced custom errors, which are cheaper than string revert messages.

```solidity
error InvalidAddress();
error AmountTooLow(uint256 minAmount, uint256 provided);

function transfer(address to, uint256 amount) external {
    if (to == address(0)) revert InvalidAddress();
    if (amount < minTransfer) revert AmountTooLow(minTransfer, amount);
    // ...
}
```

## Best Practices
Validate early: Perform all checks at the beginning of the function to follow the "checks-effects-interactions" pattern.

Be explicit: Don't rely on implicit checks (e.g., transfer automatically checks balance, but always validate logical preconditions).

## Use modifiers for repeated checks:

```solidity
modifier onlyValidAddress(address _addr) {
    require(_addr != address(0), "Zero address");
    _;
}
```

Test invalid inputs: Write tests that deliberately send zero addresses, negative amounts, or oversized arrays to ensure your contract reverts correctly.

## 10. Events and Monitoring

Emit events for all state-changing operations. This helps with off-chain monitoring and debugging.

```solidity
event Swap(address indexed user, uint256 amountIn, uint256 amountOut);
```

## 11. Testing

Comprehensive testing is non-negotiable for DeFi protocols. You must test not only happy paths but also edge cases and attack scenarios.

## Types of Tests
Unit Tests
Test individual functions in isolation, ensuring they behave as expected under normal and exceptional conditions.

## Example (Hardhat + Mocha/Chai):

```javascript
describe("Token", function () {
  it("Should mint tokens correctly", async function () {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy();
    await token.mint(owner.address, 1000);
    expect(await token.balanceOf(owner.address)).to.equal(1000);
  });
});
```

## Integration Tests
Test how multiple contracts interact, especially with external dependencies (oracles, flash loan providers). Use mainnet forking to simulate real-world conditions.

## Forking Example:

```javascript
// hardhat.config.js
module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/your-project-id",
        blockNumber: 15000000
      }
    }
  }
};
```

## Fuzzing

Fuzzing generates random inputs to test invariants. Foundry's fuzzer or Echidna can run thousands of iterations to uncover edge cases.

## Foundry Fuzz Test Example:

```solidity
function testFuzz_AddLiquidity(uint256 amountA, uint256 amountB) public {
    vm.assume(amountA > 0 && amountA < 1e30);
    vm.assume(amountB > 0 && amountB < 1e30);
    amm.addLiquidity(amountA, amountB);
    // Check invariant: reserveA * reserveB == k
    assertApproxEq(amm.reserveA() * amm.reserveB(), k, 1e6);
}
```

## Formal Verification
Use tools like the Certora Prover or Scribble to mathematically prove that your contract adheres to certain properties (e.g., no reentrancy, total supply never exceeds cap). This is more advanced but valuable for high-value protocols.

## Static Analysis

Run tools like Slither or Mythril to detect common vulnerabilities automatically.

```bash
slither myContract.sol --print human-summary
```

## What to Test

Basic functionality: Mint, burn, transfer, swap, add/remove liquidity.

Edge cases: Zero amounts, maximum amounts, rounding errors.

Access control: Only owner/admin functions cannot be called by unauthorized users.

Reentrancy: Attempt to re-enter during external calls.

Arithmetic: Test overflow/underflow boundaries (using large numbers).

Oracle manipulation: Simulate price changes and ensure your protocol handles them safely.

Flash loan attacks: Replicate known attack vectors in a forked environment.

Gas usage: Monitor gas costs to avoid exceeding block limits.


