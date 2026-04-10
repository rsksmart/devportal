---
title: Rootstock DeFi 101
sidebar_position: 5
description: A DeFi 101 catalog of token standards and security patterns to review before deploying to production on Rootstock.
tags: [rsk, rootstock, defi, solidity, security, tokens]
---

This document is a DeFi 101 catalog – it lists common token standards, vulnerabilities, and best practices to review before deploying to production.

If you want step‑by‑step practical tutorials that run on Rootstock testnet:

- AMM tutorial: [Constant‑Product AMM on Rootstock testnet](../../06-use-cases/defi/amm-constant-product.md)
- Oracle tutorial: [Chainlink oracle (mock) on Rootstock testnet](../../06-use-cases/defi/oracle-chainlink-mock.md)
- Shared setup: [Shared Setup Guide (Rootstock testnet)](../../06-use-cases/_shared-setup.md)

---

::::tip[Token Standards]
Tokens are the lifeblood of DeFi. Rootstock is fully EVM-compatible, so all Ethereum token standards work seamlessly. This section covers ERC-20, ERC-721, and important extensions like ERC-20 Permit, ERC-4626, and RBTC wrapping.
::::

## Token Standards & Best Practices

## 1. ERC-20 Tokens

The ERC-20 standard is the foundation of fungible tokens on Ethereum-compatible blockchains like Rootstock. It defines a common interface that wallets, exchanges, and DeFi protocols can rely on.

### Basic ERC-20 Implementation

OpenZeppelin provides battle-tested, audited implementations. Always use these instead of writing your own from scratch.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() ERC20("MyToken", "MTK") {
        // Mint initial supply to the contract deployer
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Optional: allow owner to mint more tokens
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

### Key points:

- decimals() defaults to 18; you can override if needed.

- _mint is internal; you control minting logic through public functions.

- Ownable restricts minting to the owner; you can use AccessControl for more granular permissions.

### Important Extensions
OpenZeppelin provides several extensions that add functionality while maintaining security.

#### ERC20Permit (EIP-2612)
Allows users to approve token spending with a signature, enabling gasless transactions. This is essential for meta-transactions and improving user experience.

How it works: Users sign a message off-chain containing approval details (spender, amount, deadline, nonce). Anyone can submit that signature to the permit function, which sets the allowance without requiring the token holder to pay gas.

```solidity
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MyTokenPermit is ERC20, ERC20Permit {
    constructor() ERC20("MyToken", "MTK") ERC20Permit("MyToken") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
```

##### Usage example (frontend):

```javascript
// User signs a permit message
const domain = {
  name: "MyToken",
  version: "1",
  chainId: 31, // Rootstock Testnet
  verifyingContract: token.address,
};
const types = {
  Permit: [
    { name: "owner", type: "address" },
    { name: "spender", type: "address" },
    { name: "value", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
  ],
};
const message = {
  owner: user.address,
  spender: dapp.address,
  value: ethers.utils.parseEther("100"),
  nonce: await token.nonces(user.address),
  deadline: Math.floor(Date.now() / 1000) + 3600,
};
const signature = await user._signTypedData(domain, types, message);

// Someone else (or a relayer) submits the permit
await token.permit(
  message.owner,
  message.spender,
  message.value,
  message.deadline,
  signature.v,
  signature.r,
  signature.s
);
```

#### ERC20Snapshot
Creates snapshots of token balances at different points in time. Useful for governance (voting based on past balances) or dividend distribution.

```solidity
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";

contract MyTokenSnapshot is ERC20, ERC20Snapshot, Ownable {
    constructor() ERC20("MyToken", "MTK") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function snapshot() public onlyOwner returns (uint256) {
        return _snapshot();
    }

    // Override required functions
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}
```

#### ERC20Burnable
Allows token holders to burn their own tokens, reducing total supply.

```solidity
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract MyTokenBurnable is ERC20, ERC20Burnable {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
```

#### ERC20Capped

Enforces a maximum supply. Useful for creating capped tokens (like a capped sale).

```solidity
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract MyTokenCapped is ERC20, ERC20Capped, Ownable {
    constructor(uint256 cap) ERC20("MyToken", "MTK") ERC20Capped(cap * 10 ** decimals()) {
        _mint(msg.sender, 500000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

### Security Considerations for ERC-20

Reentrancy: While transfer and transferFrom are not typically vulnerable to reentrancy, if you call external contracts during a transfer (e.g., hooks), use ReentrancyGuard.

Approval Front-Running: The approve function can be front-run. Use increaseAllowance/decreaseAllowance instead, or use permit to avoid this.

Decimals: Always use decimals() when displaying token amounts; never assume 18.

Return Values: Some old tokens don't return a boolean. OpenZeppelin's SafeERC20 wrapper handles this.

```solidity
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract MyContract {
    using SafeERC20 for IERC20;

    function safeTransfer(IERC20 token, address to, uint256 amount) external {
        token.safeTransfer(to, amount);
    }
}
```

## 2. Wrapping RBTC (rBTC)

Rootstock's native currency is RBTC, which is an ERC-20 compatible token? Actually, RBTC is the native coin, similar to ETH on Ethereum. It is not an ERC-20 token; it has no contract address. To use RBTC in DeFi protocols that expect ERC-20, you need wRBTC (Wrapped RBTC) – an ERC-20 token backed 1:1 by RBTC.

The official wrapped RBTC contract is deployed on Rootstock. You can interact with it to wrap and unwrap.

#### WRBTC Interface

```solidity
interface IWRBTC {
    // Deposit RBTC to get wRBTC
    function deposit() external payable;

    // Withdraw RBTC by burning wRBTC
    function withdraw(uint256 amount) external;

    // ERC-20 functions
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function totalSupply() external view returns (uint256);
}
```

#### Wrapping RBTC (Deposit)

```solidity
// Assume we have the WRBTC contract address
IWRBTC wRBTC = IWRBTC(0x...);

function wrapRBTC() external payable {
    require(msg.value > 0, "Send RBTC to wrap");
    wRBTC.deposit{value: msg.value}();
    // Now the caller has wRBTC in their wallet
}
```

#### Unwrapping RBTC (Withdraw)

```solidity
function unwrapRBTC(uint256 amount) external {
    // Ensure the contract has enough wRBTC (or use transferFrom to pull from user)
    wRBTC.transferFrom(msg.sender, address(this), amount);
    wRBTC.withdraw(amount);
    payable(msg.sender).transfer(amount);
}
```

Important: When unwrapping, the withdraw function burns the wRBTC and sends RBTC to the caller (or to the contract, depending on implementation). Always check the specific WRBTC contract behavior.

#### WRBTC Addresses
Rootstock Mainnet: 0x... (Check the official docs for latest address)

Rootstock Testnet: 0x...

## 3. ERC-4626: Tokenized Vaults
ERC-4626 standardizes the interface for yield-bearing vaults. A vault takes an underlying asset (e.g., USDT, wRBTC) and issues shares that represent a proportional claim on the assets. The vault may generate yield through lending, staking, or other strategies.

#### Why ERC-4626?
Before ERC-4626, every yield-bearing token had its own interface, making integration difficult. ERC-4626 provides a unified way to deposit, withdraw, and query share prices, enabling composability.

### Key Functions
asset() – The address of the underlying token.

totalAssets() – Total amount of underlying assets managed.

convertToShares(uint256 assets) – How many shares you get for assets.

convertToAssets(uint256 shares) – How many assets you get for shares.

maxDeposit(address) – Maximum deposit allowed for an address.

previewDeposit(uint256 assets) – Simulates deposit.

deposit(uint256 assets, address receiver) – Deposits assets, mints shares to receiver.

maxMint(address) – Maximum shares mintable.

previewMint(uint256 shares) – Simulates minting shares.

mint(uint256 shares, address receiver) – Mints exactly shares by depositing required assets.

maxWithdraw(address owner) – Maximum assets withdrawable.

previewWithdraw(uint256 assets) – Simulates withdrawal.

withdraw(uint256 assets, address receiver, address owner) – Withdraws assets to receiver, burning shares from owner.

maxRedeem(address owner) – Maximum shares redeemable.

previewRedeem(uint256 shares) – Simulates redemption.

redeem(uint256 shares, address receiver, address owner) – Redeems shares for assets.

### Simple Vault Example
Here's a minimal vault that simply holds assets and does not generate yield (like a wrapped token). In practice, you'd implement a strategy to generate yield.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleVault is ERC4626, Ownable {
    constructor(IERC20 asset)
        ERC20("Vault Share", "vToken")
        ERC4626(asset)
    {}

    // Optional: Override to implement a yield strategy
    function totalAssets() public view override returns (uint256) {
        // In a real vault, this might include assets plus accrued yield
        return super.totalAssets();
    }

    // Example: allow owner to invest assets in a lending protocol
    function invest() external onlyOwner {
        // ...
    }
}
```

### Testing ERC-4626

#### Test Example:

```javascript
const { expect } = require("chai");

describe("SimpleVault", function () {
    it("Should deposit and withdraw correctly", async function () {
        const [owner] = await ethers.getSigners();
        const Asset = await ethers.getContractFactory("ERC20Mock");
        const asset = await Asset.deploy("Asset", "AST", 18);
        await asset.mint(owner.address, 1000);

        const Vault = await ethers.getContractFactory("SimpleVault");
        const vault = await Vault.deploy(asset.address);

        await asset.approve(vault.address, 500);
        const shares = await vault.callStatic.deposit(500, owner.address);
        await vault.deposit(500, owner.address);

        expect(await vault.balanceOf(owner.address)).to.equal(shares);
        expect(await vault.totalAssets()).to.equal(500);

        await vault.withdraw(200, owner.address, owner.address);
        expect(await asset.balanceOf(owner.address)).to.equal(700); // 1000 - 500 + 200
    });
});
```

## 4. ERC-721 NFTs for DeFi

- Non-fungible tokens (NFTs) are increasingly used in DeFi to represent unique positions or assets. For example:

- Uniswap V3 uses ERC-721 to represent concentrated liquidity positions.

- Lending protocols may represent loan positions as NFTs.

- Real-world assets (RWAs) can be tokenized as NFTs.

### Basic ERC-721 Implementation

OpenZeppelin provides a secure base.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor() ERC721("MyNFT", "MNFT") {}

    function mint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    // Optional: add metadata URI
    function _baseURI() internal pure override returns (string memory) {
        return "https://api.example.com/nft/";
    }
}
```

### ERC-721 Extensions for DeFi
ERC721Enumerable – Allows enumeration of tokens by owner and total supply (useful for frontends).

ERC721URIStorage – Allows per-token metadata (for dynamic NFTs).

ERC721Burnable – Allows token holders to burn their NFTs.

### Representing DeFi Positions with NFTs

When you create an NFT that represents a position, you typically store position data (like amounts, ranges, etc.) in the contract and associate it with the token ID.

```solidity
contract PositionNFT is ERC721 {
    struct Position {
        uint256 amount;
        uint256 timestamp;
        address asset;
    }

    mapping(uint256 => Position) public positions;

    function mint(address to, uint256 amount, address asset) external returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        positions[tokenId] = Position(amount, block.timestamp, asset);
        return tokenId;
    }

    function getPosition(uint256 tokenId) external view returns (Position memory) {
        require(_exists(tokenId), "Token does not exist");
        return positions[tokenId];
    }
}
```

## 5. Best Practices for Token Development

### 5.1 Use OpenZeppelin Contracts
OpenZeppelin is the industry standard. Their contracts are audited, widely used, and regularly updated. Never write your own token logic from scratch.

### 5.2 Reentrancy Protection

While ERC-20 transfers don't usually call external contracts, if you add hooks (like in ERC-777) or if your token interacts with other protocols during mint/burn, use ReentrancyGuard.

```solidity
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MyToken is ERC20, ReentrancyGuard {
    function burn(uint256 amount) external nonReentrant {
        _burn(msg.sender, amount);
    }
}
```

### 5.3 Handle Decimals Correctly

Always use decimals() when displaying amounts. When performing calculations, assume the token's decimal precision.

```solidity
uint8 public constant TOKEN_DECIMALS = 18;
uint256 public constant TOKEN_MULTIPLIER = 10 ** TOKEN_DECIMALS;
```

### 5.4 Be Mindful of Transfer Hooks

Some tokens (e.g., ERC-777) have hooks that call into the sender/receiver contracts during transfers. This can lead to reentrancy or unexpected behavior. Prefer ERC-20 unless you need specific hook functionality. If you must interact with such tokens, ensure your contract is protected.

### 5.5 Gas Optimization

Use unchecked blocks for loops where overflow is impossible.

Pack state variables to save storage (use uint128 where appropriate).

Use calldata instead of memory for read-only function parameters.

Avoid unnecessary storage reads/writes.

```solidity
// Gas-optimized loop
for (uint256 i = 0; i < users.length; ) {
    address user = users[i];
    // ... process
    unchecked {
        i++;
    }
}
```

### 5.6 Testing Tokens Thoroughly

Test all functions, edge cases, and security properties.

Unit tests for mint, burn, transfer, approve.

Fuzz testing with random amounts and addresses.

Reentrancy tests if you have hooks.

Integer overflow/underflow (Solidity 0.8+ protects, but test with large values).

### Example using Hardhat:

```javascript
describe("MyToken", function () {
    it("Should mint and transfer correctly", async function () {
        const [owner, addr1] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("MyToken");
        const token = await Token.deploy();
        await token.mint(addr1.address, 1000);
        expect(await token.balanceOf(addr1.address)).to.equal(1000);
    });

    it("Should not allow non-owner to mint", async function () {
        const [owner, addr1] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("MyToken");
        const token = await Token.deploy();
        await expect(
            token.connect(addr1).mint(addr1.address, 1000)
        ).to.be.revertedWith("Ownable: caller is not the owner");
    });
});
```

## 5.7 Use SafeERC20 for External Interactions

When your contract interacts with arbitrary ERC-20 tokens, use SafeERC20 to handle non-standard implementations.

```solidity
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Vault {
    using SafeERC20 for IERC20;

    function deposit(IERC20 token, uint256 amount) external {
        token.safeTransferFrom(msg.sender, address(this), amount);
    }
}
```

## 6. Rootstock-Specific Considerations

### RBTC vs. wRBTC

RBTC is the native currency, used for gas and as a store of value. It's not an ERC-20.

wRBTC is an ERC-20 wrapper. Most DeFi protocols require wRBTC for interactions like liquidity pools, lending, etc.

When building a protocol that accepts RBTC directly, you may need to wrap it internally or provide a conversion function.

### Gas Costs
Rootstock uses a different gas model than Ethereum. While EVM-compatible, gas costs may differ. Always test on testnet and optimize where possible. Monitor gas consumption of token operations.

### Deploying Tokens on Rootstock
The process is identical to Ethereum: compile your contract, configure Hardhat for Rootstock network, and deploy.

```javascript
// hardhat.config.js
module.exports = {
  networks: {
    rsktestnet: {
      url: "https://public-node.testnet.rsk.co",
      chainId: 31,
      accounts: [process.env.PRIVATE_KEY],
    },
    rskmainnet: {
      url: "https://public-node.rsk.co",
      chainId: 30,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
```

## 7. Conclusion

Understanding and correctly implementing token standards is fundamental to building secure and composable DeFi applications on Rootstock. Always leverage audited libraries like OpenZeppelin, follow best practices, and test thoroughly. With these patterns, you can create tokens that integrate seamlessly into the broader Rootstock ecosystem.

---

:::danger[Security First]
DeFi protocols handle valuable assets. A single vulnerability can lead to catastrophic losses. Always follow these patterns and get professional audits.
:::

## Security Patterns for DeFi dApps

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

```solidity
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SecureContract is ReentrancyGuard {
    mapping(address => uint256) public balances;

    function withdraw(uint256 amount) external nonReentrant {
        require(balances[msg.sender] >= amount);
        balances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }
}
```

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

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

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
}
```

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

```solidity
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyContract is Ownable {
    function mint(address to, uint256 amount) public onlyOwner {
        // only owner can mint
    }
}
```

**Limitations**:

Only one owner (or one account).

If the owner's private key is compromised, the contract is compromised.

Cannot grant granular permissions (e.g., some users can mint, others can pause).

### Role-Based Access Control (AccessControl)
OpenZeppelin's AccessControl provides a flexible, multi-role system based on the standard from Ethereum (EIP-5982). You define roles as bytes32 constants and grant them to addresses.

```solidity
import "@openzeppelin/contracts/access/AccessControl.sol";

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
}
```

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

## SafeMath for Older Versions

If you're working with an older Solidity version (`<0.8`), you must use a library like OpenZeppelin's SafeMath to prevent overflows.

```solidity
import "@openzeppelin/contracts/math/SafeMath.sol";

contract MyContract {
    using SafeMath for uint256;

    function safeAdd(uint256 a, uint256 b) public pure returns (uint256) {
        return a.add(b); // Reverts on overflow
    }
}
```

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

## Basic Example:

```solidity
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

contract RandomNumberConsumer is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface COORDINATOR;
    uint64 s_subscriptionId;
    bytes32 keyHash = 0x...; // gas lane key hash
    uint32 callbackGasLimit = 100000;
    uint16 requestConfirmations = 3;
    uint32 numWords = 1;

    uint256 public s_randomWord;

    constructor(uint64 subscriptionId, address vrfCoordinator) VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
    }

    function requestRandomWord() external returns (uint256 requestId) {
        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        s_randomWord = randomWords[0];
    }
}
```

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

```solidity
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyContractV1 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    function initialize() public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
```
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

```solidity
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

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
}
```
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

```solidity
import "@openzeppelin/contracts/security/Pausable.sol";

contract MyProtocol is Pausable {
    function swap() external whenNotPaused {
        // ...
    }

    function pause() external onlyOwner {
        _pause();
    }
}
```

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

