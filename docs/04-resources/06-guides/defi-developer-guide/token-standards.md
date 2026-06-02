---
sidebar_position: 4
sidebar_label: Token Standards
title: 'Token Standards & Best Practices on Rootstock'
description: 'Implement ERC-20, ERC-721, and Rootstock-specific token patterns with security and efficiency.'
tags: [rsk, rootstock, defi, erc20, erc721, solidity]
---

:::tip[Token Standards]
Tokens are the lifeblood of DeFi. Rootstock is fully EVM-compatible, so all Ethereum token standards work seamlessly. This section covers ERC-20, ERC-721, and important extensions like ERC-20 Permit, ERC-4626, and RBTC wrapping.
:::

# Token Standards & Best Practices

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