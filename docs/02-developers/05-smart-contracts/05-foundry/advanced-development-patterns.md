# Advanced Smart Contract Development and Deployment with Foundry on Rootstock

---
**Location**: `docs/02-developers/05-smart-contracts/05-foundry/advanced-smart-contracts.md`
**Sidebar Position**: 107
**Tags**: [guides, developers, smart contracts, rsk, rootstock, foundry, deployment, verification, advanced]
---

## Overview

This comprehensive guide covers advanced smart contract development patterns, deployment strategies, and verification workflows specifically for Rootstock using Foundry. Building upon the foundational concepts covered in the [Smart Contract Basics](/developers/smart-contracts/foundry/smart-contracts/) guide, this documentation provides production-ready examples and best practices for complex contract architectures.

## Prerequisites

Before proceeding with advanced smart contract development, ensure you have mastered the foundational concepts:

- **Foundry Fundamentals**: Complete understanding of [Foundry Project Creation](/developers/smart-contracts/foundry/create-foundry-project/) and [Foundry Configuration](/developers/smart-contracts/foundry/configure-foundry-rootstock/)
- **Basic Smart Contract Development**: Proficiency with concepts covered in [Smart Contract Development](/developers/smart-contracts/foundry/smart-contracts/)
- **Testing Knowledge**: Experience with [Testing Smart Contracts](/developers/smart-contracts/foundry/test-smart-contracts/)
- **Deployment Experience**: Successful completion of [Deploy Smart Contracts](/developers/smart-contracts/foundry/deploy-smart-contracts/)

> **Note**: This guide assumes intermediate to advanced Solidity knowledge. For basic Solidity concepts, refer to the [Solidity Documentation](https://docs.soliditylang.org/).

## Advanced Contract Architecture Patterns

### 1. Upgradeable Contract Pattern

Modern DeFi applications require upgradeability for bug fixes and feature additions. This example demonstrates OpenZeppelin's proxy pattern implementation:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title AdvancedTokenV1
 * @dev Upgradeable ERC20 token with advanced features
 * @notice This contract demonstrates production-ready patterns for Rootstock
 */
contract AdvancedTokenV1 is 
    Initializable, 
    ERC20Upgradeable, 
    OwnableUpgradeable, 
    UUPSUpgradeable 
{
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @dev Initializes the contract
     * @param _name Token name
     * @param _symbol Token symbol
     * @param _initialSupply Initial token supply
     * @param _owner Contract owner address
     */
    function initialize(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply,
        address _owner
    ) public initializer {
        __ERC20_init(_name, _symbol);
        __Ownable_init(_owner);
        __UUPSUpgradeable_init();
        
        _mint(_owner, _initialSupply * 10**decimals());
    }

    /**
     * @dev Mint new tokens (only owner)
     * @param to Recipient address
     * @param amount Amount to mint
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Required override for UUPS upgrades
     */
    function _authorizeUpgrade(address newImplementation) 
        internal 
        onlyOwner 
        override 
    {}

    /**
     * @dev Returns the version of the contract
     */
    function version() public pure returns (string memory) {
        return "1.0.0";
    }
}
```

### 2. Multi-Contract System with Factory Pattern

Complex DApps often require multiple interacting contracts. This pattern demonstrates a factory-vault system:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title VaultFactory
 * @dev Factory contract for creating and managing token vaults
 */
contract VaultFactory is AccessControl, ReentrancyGuard {
    using SafeERC20 for IERC20;

    bytes32 public constant VAULT_CREATOR_ROLE = keccak256("VAULT_CREATOR_ROLE");
    
    struct VaultInfo {
        address vaultAddress;
        address tokenAddress;
        address creator;
        uint256 createdAt;
        bool isActive;
    }
    
    mapping(address => VaultInfo) public vaults;
    mapping(address => address[]) public userVaults;
    address[] public allVaults;
    
    event VaultCreated(
        address indexed vaultAddress,
        address indexed tokenAddress,
        address indexed creator,
        uint256 timestamp
    );
    
    event VaultDeactivated(address indexed vaultAddress, uint256 timestamp);

    constructor(address _admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        _grantRole(VAULT_CREATOR_ROLE, _admin);
    }

    /**
     * @dev Creates a new vault for specified token
     * @param _tokenAddress Address of the ERC20 token
     * @param _rewardRate Daily reward rate (basis points)
     * @return vaultAddress Address of the created vault
     */
    function createVault(
        address _tokenAddress,
        uint256 _rewardRate
    ) external onlyRole(VAULT_CREATOR_ROLE) nonReentrant returns (address vaultAddress) {
        require(_tokenAddress != address(0), "Invalid token address");
        require(_rewardRate > 0 && _rewardRate <= 10000, "Invalid reward rate");
        
        // Deploy new vault
        StakingVault vault = new StakingVault(
            _tokenAddress,
            _rewardRate,
            msg.sender,
            address(this)
        );
        
        vaultAddress = address(vault);
        
        // Store vault information
        vaults[vaultAddress] = VaultInfo({
            vaultAddress: vaultAddress,
            tokenAddress: _tokenAddress,
            creator: msg.sender,
            createdAt: block.timestamp,
            isActive: true
        });
        
        userVaults[msg.sender].push(vaultAddress);
        allVaults.push(vaultAddress);
        
        emit VaultCreated(vaultAddress, _tokenAddress, msg.sender, block.timestamp);
        
        return vaultAddress;
    }

    /**
     * @dev Deactivates a vault
     * @param _vaultAddress Address of the vault to deactivate
     */
    function deactivateVault(address _vaultAddress) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        require(vaults[_vaultAddress].isActive, "Vault already inactive");
        vaults[_vaultAddress].isActive = false;
        
        emit VaultDeactivated(_vaultAddress, block.timestamp);
    }

    /**
     * @dev Returns all vaults created by a user
     * @param _user User address
     * @return Array of vault addresses
     */
    function getUserVaults(address _user) external view returns (address[] memory) {
        return userVaults[_user];
    }

    /**
     * @dev Returns total number of vaults
     */
    function getTotalVaults() external view returns (uint256) {
        return allVaults.length;
    }
}

/**
 * @title StakingVault
 * @dev Individual staking vault for token rewards
 */
contract StakingVault is ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable stakingToken;
    address public immutable factory;
    address public owner;
    
    uint256 public rewardRate; // Daily reward rate in basis points
    uint256 public totalStaked;
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;
    
    mapping(address => uint256) public userStaked;
    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;
    
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        
        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    constructor(
        address _stakingToken,
        uint256 _rewardRate,
        address _owner,
        address _factory
    ) {
        stakingToken = IERC20(_stakingToken);
        rewardRate = _rewardRate;
        owner = _owner;
        factory = _factory;
        lastUpdateTime = block.timestamp;
    }

    /**
     * @dev Calculates reward per token
     */
    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) {
            return rewardPerTokenStored;
        }
        
        return rewardPerTokenStored + 
            (((block.timestamp - lastUpdateTime) * rewardRate * 1e18) / 
            (86400 * 10000 * totalStaked));
    }

    /**
     * @dev Calculates earned rewards for an account
     */
    function earned(address account) public view returns (uint256) {
        return ((userStaked[account] * 
            (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18) + 
            rewards[account];
    }

    /**
     * @dev Stake tokens
     * @param amount Amount to stake
     */
    function stake(uint256 amount) 
        external 
        nonReentrant 
        updateReward(msg.sender) 
    {
        require(amount > 0, "Cannot stake 0");
        
        totalStaked += amount;
        userStaked[msg.sender] += amount;
        
        stakingToken.safeTransferFrom(msg.sender, address(this), amount);
        
        emit Staked(msg.sender, amount);
    }

    /**
     * @dev Withdraw staked tokens
     * @param amount Amount to withdraw
     */
    function withdraw(uint256 amount) 
        external 
        nonReentrant 
        updateReward(msg.sender) 
    {
        require(amount > 0, "Cannot withdraw 0");
        require(userStaked[msg.sender] >= amount, "Insufficient staked amount");
        
        totalStaked -= amount;
        userStaked[msg.sender] -= amount;
        
        stakingToken.safeTransfer(msg.sender, amount);
        
        emit Withdrawn(msg.sender, amount);
    }

    /**
     * @dev Claim earned rewards
     */
    function getReward() external nonReentrant updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            // In production, implement reward token distribution
            emit RewardPaid(msg.sender, reward);
        }
    }

    /**
     * @dev Emergency withdrawal (owner only)
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = stakingToken.balanceOf(address(this));
        stakingToken.safeTransfer(owner, balance);
    }
}
```

## Advanced Deployment Scripts

### 1. Comprehensive Deployment Script with Verification

Create `script/DeployAdvanced.s.sol`:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {AdvancedTokenV1} from "../src/AdvancedTokenV1.sol";
import {VaultFactory} from "../src/VaultFactory.sol";
import {StakingVault} from "../src/StakingVault.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

/**
 * @title Advanced Deployment Script
 * @dev Deploys complete DeFi system with upgradeable tokens and vault factory
 */
contract DeployAdvancedScript is Script {
    // Deployment configuration
    struct DeploymentConfig {
        string tokenName;
        string tokenSymbol;
        uint256 initialSupply;
        address owner;
        uint256 rewardRate;
    }
    
    // Deployment results
    struct DeploymentResult {
        address proxyToken;
        address implementationToken;
        address vaultFactory;
        address stakingVault;
        uint256 chainId;
        uint256 deploymentTimestamp;
    }
    
    DeploymentResult public deploymentResult;
    
    function run() external {
        // Load configuration from environment
        DeploymentConfig memory config = _loadConfiguration();
        
        // Validate configuration
        _validateConfiguration(config);
        
        console.log("=== Starting Advanced Deployment ===");
        console.log("Chain ID:", block.chainid);
        console.log("Deployer:", msg.sender);
        console.log("");
        
        vm.startBroadcast();
        
        // Deploy upgradeable token
        (address proxyToken, address implementationToken) = _deployUpgradeableToken(config);
        
        // Deploy vault factory
        address vaultFactory = _deployVaultFactory(config.owner);
        
        // Create a vault for the token
        address stakingVault = _createStakingVault(vaultFactory, proxyToken, config.rewardRate);
        
        vm.stopBroadcast();
        
        // Store deployment results
        deploymentResult = DeploymentResult({
            proxyToken: proxyToken,
            implementationToken: implementationToken,
            vaultFactory: vaultFactory,
            stakingVault: stakingVault,
            chainId: block.chainid,
            deploymentTimestamp: block.timestamp
        });
        
        // Generate verification commands
        _generateVerificationCommands();
        
        // Save deployment addresses
        _saveDeploymentAddresses();
        
        console.log("=== Deployment Complete ===");
    }
    
    function _loadConfiguration() internal view returns (DeploymentConfig memory) {
        return DeploymentConfig({
            tokenName: vm.envOr("TOKEN_NAME", string("Advanced Token")),
            tokenSymbol: vm.envOr("TOKEN_SYMBOL", string("ADV")),
            initialSupply: vm.envOr("INITIAL_SUPPLY", uint256(1000000)),
            owner: vm.envOr("OWNER_ADDRESS", msg.sender),
            rewardRate: vm.envOr("REWARD_RATE", uint256(500)) // 5% daily
        });
    }
    
    function _validateConfiguration(DeploymentConfig memory config) internal pure {
        require(bytes(config.tokenName).length > 0, "Token name required");
        require(bytes(config.tokenSymbol).length > 0, "Token symbol required");
        require(config.initialSupply > 0, "Initial supply must be positive");
        require(config.owner != address(0), "Owner address required");
        require(config.rewardRate > 0 && config.rewardRate <= 10000, "Invalid reward rate");
    }
    
    function _deployUpgradeableToken(DeploymentConfig memory config) 
        internal 
        returns (address proxy, address implementation) 
    {
        console.log("Deploying upgradeable token...");
        
        // Deploy implementation
        implementation = address(new AdvancedTokenV1());
        console.log("Token implementation:", implementation);
        
        // Prepare initializer data
        bytes memory initData = abi.encodeWithSelector(
            AdvancedTokenV1.initialize.selector,
            config.tokenName,
            config.tokenSymbol,
            config.initialSupply,
            config.owner
        );
        
        // Deploy proxy
        proxy = address(new ERC1967Proxy(implementation, initData));
        console.log("Token proxy:", proxy);
        console.log("Token name:", config.tokenName);
        console.log("Token symbol:", config.tokenSymbol);
        console.log("Initial supply:", config.initialSupply);
        console.log("");
        
        return (proxy, implementation);
    }
    
    function _deployVaultFactory(address owner) internal returns (address factory) {
        console.log("Deploying vault factory...");
        
        factory = address(new VaultFactory(owner));
        console.log("Vault factory:", factory);
        console.log("Factory owner:", owner);
        console.log("");
        
        return factory;
    }
    
    function _createStakingVault(
        address factory, 
        address token, 
        uint256 rewardRate
    ) internal returns (address vault) {
        console.log("Creating staking vault...");
        
        VaultFactory factoryContract = VaultFactory(factory);
        vault = factoryContract.createVault(token, rewardRate);
        
        console.log("Staking vault:", vault);
        console.log("Staking token:", token);
        console.log("Reward rate:", rewardRate, "basis points");
        console.log("");
        
        return vault;
    }
    
    function _generateVerificationCommands() internal view {
        console.log("=== Verification Commands ===");
        
        string memory baseCommand = string(abi.encodePacked(
            "forge verify-contract \\",
            "\n  --chain-id ", vm.toString(block.chainid), " \\",
            "\n  --verifier-url ", _getExplorerUrl(), " \\",
            "\n  --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY"
        ));
        
        // Token implementation verification
        console.log("1. Token Implementation:");
        console.log(string(abi.encodePacked(
            baseCommand, " \\",
            "\n  ", vm.toString(deploymentResult.implementationToken), " \\",
            "\n  src/AdvancedTokenV1.sol:AdvancedTokenV1"
        )));
        console.log("");
        
        // Vault factory verification
        console.log("2. Vault Factory:");
        console.log(string(abi.encodePacked(
            baseCommand,
            "\n  --constructor-args $(cast abi-encode \"constructor(address)\" \"", 
            vm.toString(vm.envOr("OWNER_ADDRESS", msg.sender)), "\") \\",
            "\n  ", vm.toString(deploymentResult.vaultFactory), " \\",
            "\n  src/VaultFactory.sol:VaultFactory"
        )));
        console.log("");
        
        // Note: Proxy and vault contracts require special handling
        console.log("Note: Proxy and StakingVault contracts require manual verification");
        console.log("Refer to the verification guide for proxy contract verification");
        console.log("");
    }
    
    function _getExplorerUrl() internal view returns (string memory) {
        if (block.chainid == 31) {
            return "https://explorer.testnet.rootstock.io/api";
        } else if (block.chainid == 30) {
            return "https://explorer.rootstock.io/api";
        } else {
            revert("Unsupported chain ID");
        }
    }
    
    function _saveDeploymentAddresses() internal {
        string memory deploymentData = string(abi.encodePacked(
            "# Deployment Addresses\n",
            "CHAIN_ID=", vm.toString(deploymentResult.chainId), "\n",
            "DEPLOYMENT_TIMESTAMP=", vm.toString(deploymentResult.deploymentTimestamp), "\n",
            "TOKEN_PROXY=", vm.toString(deploymentResult.proxyToken), "\n",
            "TOKEN_IMPLEMENTATION=", vm.toString(deploymentResult.implementationToken), "\n",
            "VAULT_FACTORY=", vm.toString(deploymentResult.vaultFactory), "\n",
            "STAKING_VAULT=", vm.toString(deploymentResult.stakingVault), "\n"
        ));
        
        vm.writeFile("deployment.env", deploymentData);
        console.log("Deployment addresses saved to deployment.env");
    }
}
```

### 2. Upgrade Deployment Script

Create `script/UpgradeToken.s.sol`:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {AdvancedTokenV1} from "../src/AdvancedTokenV1.sol";
import {AdvancedTokenV2} from "../src/AdvancedTokenV2.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title Token Upgrade Script
 * @dev Upgrades the token implementation while preserving state
 */
contract UpgradeTokenScript is Script {
    function run() external {
        address proxyAddress = vm.envAddress("TOKEN_PROXY");
        require(proxyAddress != address(0), "TOKEN_PROXY not set");
        
        console.log("=== Token Upgrade Process ===");
        console.log("Proxy address:", proxyAddress);
        console.log("Current deployer:", msg.sender);
        
        vm.startBroadcast();
        
        // Deploy new implementation
        AdvancedTokenV2 newImplementation = new AdvancedTokenV2();
        console.log("New implementation deployed:", address(newImplementation));
        
        // Upgrade proxy to new implementation
        AdvancedTokenV1 proxy = AdvancedTokenV1(proxyAddress);
        proxy.upgradeToAndCall(address(newImplementation), "");
        
        vm.stopBroadcast();
        
        console.log("Upgrade completed successfully");
        
        // Verification command for new implementation
        console.log("\nVerification command:");
        console.log(string(abi.encodePacked(
            "forge verify-contract --chain-id ", vm.toString(block.chainid),
            " --verifier-url ", _getExplorerUrl(),
            " --etherscan-api-key $ROOTSTOCK_EXPLORER_API_KEY ",
            vm.toString(address(newImplementation)),
            " src/AdvancedTokenV2.sol:AdvancedTokenV2"
        )));
    }
    
    function _getExplorerUrl() internal view returns (string memory) {
        return block.chainid == 31 
            ? "https://explorer.testnet.rootstock.io/api"
            : "https://explorer.rootstock.io/api";
    }
}
```

## Testing Advanced Contracts

### Comprehensive Test Suite

Create `test/AdvancedContracts.t.sol`:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {AdvancedTokenV1} from "../src/AdvancedTokenV1.sol";
import {VaultFactory} from "../src/VaultFactory.sol";
import {StakingVault} from "../src/StakingVault.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract AdvancedContractsTest is Test {
    AdvancedTokenV1 public token;
    VaultFactory public factory;
    StakingVault public vault;
    
    address public owner = address(0x1);
    address public user1 = address(0x2);
    address public user2 = address(0x3);
    
    uint256 public constant INITIAL_SUPPLY = 1000000e18;
    uint256 public constant REWARD_RATE = 500; // 5% daily
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event VaultCreated(address indexed vaultAddress, address indexed tokenAddress, address indexed creator, uint256 timestamp);
    
    function setUp() public {
        vm.startPrank(owner);
        
        // Deploy token implementation
        AdvancedTokenV1 implementation = new AdvancedTokenV1();
        
        // Deploy proxy
        bytes memory initData = abi.encodeWithSelector(
            AdvancedTokenV1.initialize.selector,
            "Test Token",
            "TEST",
            INITIAL_SUPPLY / 1e18,
            owner
        );
        ERC1967Proxy proxy = new ERC1967Proxy(address(implementation), initData);
        token = AdvancedTokenV1(address(proxy));
        
        // Deploy factory
        factory = new VaultFactory(owner);
        
        // Grant vault creator role to owner
        factory.grantRole(factory.VAULT_CREATOR_ROLE(), owner);
        
        vm.stopPrank();
    }
    
    function testTokenInitialization() public {
        assertEq(token.name(), "Test Token");
        assertEq(token.symbol(), "TEST");
        assertEq(token.totalSupply(), INITIAL_SUPPLY);
        assertEq(token.balanceOf(owner), INITIAL_SUPPLY);
        assertEq(token.owner(), owner);
    }
    
    function testVaultCreation() public {
        vm.prank(owner);
        address vaultAddress = factory.createVault(address(token), REWARD_RATE);
        
        vault = StakingVault(vaultAddress);
        
        assertEq(address(vault.stakingToken()), address(token));
        assertEq(vault.rewardRate(), REWARD_RATE);
        assertEq(vault.owner(), owner);
        
        // Check factory records
        (address storedVault, address storedToken, address creator, uint256 createdAt, bool isActive) = 
            factory.vaults(vaultAddress);
        
        assertEq(storedVault, vaultAddress);
        assertEq(storedToken, address(token));
        assertEq(creator, owner);
        assertGt(createdAt, 0);
        assertTrue(isActive);
    }
    
    function testStaking() public {
        // Create vault first
        vm.prank(owner);
        address vaultAddress = factory.createVault(address(token), REWARD_RATE);
        vault = StakingVault(vaultAddress);
        
        // Transfer tokens to user1
        uint256 stakeAmount = 1000e18;
        vm.prank(owner);
        token.transfer(user1, stakeAmount);
        
        // User1 stakes tokens
        vm.startPrank(user1);
        token.approve(address(vault), stakeAmount);
        vault.stake(stakeAmount);
        vm.stopPrank();
        
        assertEq(vault.userStaked(user1), stakeAmount);
        assertEq(vault.totalStaked(), stakeAmount);
        assertEq(token.balanceOf(address(vault)), stakeAmount);
    }
    
    function testRewardCalculation() public {
        // Create vault and stake
        vm.prank(owner);
        address vaultAddress = factory.createVault(address(token), REWARD_RATE);
        vault = StakingVault(vaultAddress);
        
        uint256 stakeAmount = 1000e18;
        vm.prank(owner);
        token.transfer(user1, stakeAmount);
        
        vm.startPrank(user1);
        token.approve(address(vault), stakeAmount);
        vault.stake(stakeAmount);
        vm.stopPrank();
        
        // Fast forward 1 day
        vm.warp(block.timestamp + 86400);
        
        uint256 expectedReward = (stakeAmount * REWARD_RATE) / 10000;
        uint256 actualReward = vault.earned(user1);
        
        // Allow for small rounding differences
        assertApproxEqAbs(actualReward, expectedReward, 1e15);
    }
    
    function testWithdrawal() public {
        // Setup staking
        vm.prank(owner);
        address vaultAddress = factory.createVault(address(token), REWARD_RATE);
        vault = StakingVault(vaultAddress);
        
        uint256 stakeAmount = 1000e18;
        vm.prank(owner);
        token.transfer(user1, stakeAmount);
        
        vm.startPrank(user1);
        token.approve(address(vault), stakeAmount);
        vault.stake(stakeAmount);
        
        // Withdraw half
        uint256 withdrawAmount = stakeAmount / 2;
        vault.withdraw(withdrawAmount);
        vm.stopPrank();
        
        assertEq(vault.userStaked(user1), stakeAmount - withdrawAmount);
        assertEq(vault.totalStaked(), stakeAmount - withdrawAmount);
        assertEq(token.balanceOf(user1), withdrawAmount);
    }
    
    function testUnauthorizedAccess() public {
        // Test vault creation by non-authorized user
        vm.prank(user1);
        vm.expectRevert();
        factory.createVault(address(token), REWARD_RATE);
        
        // Test token minting by non-owner
        vm.prank(user1);
        vm.expectRevert();
        token.mint(user1, 1000e18);
    }
    
    function testFactoryDeactivation() public {
        vm.prank(owner);
        address vaultAddress = factory.createVault(address(token), REWARD_RATE);
        
        vm.prank(owner);
        factory.deactivateVault(vaultAddress);
        
        (, , , , bool isActive) = factory.vaults(vaultAddress);
        assertFalse(isActive);
    }
    
    function testMultipleVaults() public {
        // Create multiple vaults
        address[] memory vaults = new address[](3);
        
        vm.startPrank(owner);
        for (uint i = 0; i < 3; i++) {
            vaults[i] = factory.createVault(address(token), REWARD_RATE + (i * 100));
        }
        vm.stopPrank();
        
        assertEq(factory.getTotalVaults(), 3);
        
        address[] memory userVaults = factory.getUserVaults(owner);
        assertEq(userVaults.length, 3);
        
        for (uint i = 0; i < 3; i++) {
            assertEq(userVaults[i], vaults[i]);
        }
    }
    
    function testFuzzStaking(uint256 amount) public {
        // Bound the amount to reasonable values
        amount = bound(amount, 1e18, INITIAL_SUPPLY / 2);
        
        vm.prank(owner);
        address vaultAddress = factory.createVault(address(token), REWARD_RATE);
        vault = StakingVault(vaultAddress);
        
        vm.prank(owner);
        token.transfer(user1, amount);
        
        vm.startPrank(user1);
        token.approve(address(vault), amount);
        vault.stake(amount);
        vm.stopPrank();
        
        assertEq(vault.userStaked(user1), amount);
        assertEq(vault.totalStaked(), amount);
    }
}
```

## Integration with Verification System

This advanced smart contract system integrates seamlessly with the verification workflow documented in [Verify Smart Contracts Using Foundry Script](/developers/smart-contracts/foundry/verify-smart-contracts/). Key integration points include:

### 1. Automated Verification Integration

The deployment scripts generate verification commands automatically, as demonstrated in the `_generateVerificationCommands()` function. This ensures that complex multi-contract systems are properly verified.

### 2. Constructor Argument Handling

The advanced contracts demonstrate proper constructor argument encoding for verification:
- Simple parameters (address, uint256)
- Complex parameters (initialization data for proxy contracts)
- Multiple parameter combinations

### 3. Proxy Contract Verification

Upgradeable contracts require special handling for verification. The proxy contract verification process is documented in the [verification guide](/developers/smart-contracts/foundry/verify-smart-contracts/) with specific examples for UUPS proxies.

## Production Deployment Checklist

Before deploying to Rootstock mainnet, complete this comprehensive checklist:

### 1. Security Audit
- [ ] Professional security audit completed
- [ ] All critical and high-severity issues resolved
- [ ] Access control mechanisms verified
- [ ] Reentrancy protection confirmed

### 2. Testing Coverage
- [ ] Unit tests coverage > 95%
- [ ] Integration tests for all contract interactions
- [ ] Fuzz testing for critical functions
- [ ] Gas optimization analysis completed

### 3. Documentation
- [ ] Contract interfaces documented
- [ ] Deployment process documented
- [ ] Upgrade procedures defined (for upgradeable contracts)
- [ ] Emergency procedures established

### 4. Configuration Validation
- [ ] Constructor parameters verified
- [ ] Access control roles properly assigned
- [ ] Network-specific configurations confirmed
- [ ] API keys and environment variables secured

### 5. Deployment Process
- [ ] Testnet deployment successful
- [ ] Contract verification completed
- [ ] Interaction testing performed
- [ ] Monitoring systems configured

### 6. Post-Deployment
- [ ] Contract ownership transferred (if applicable)
- [ ] Community notification completed
- [ ] Documentation published
- [ ] Monitoring alerts configured

## Additional Resources

### Smart Contract Development
- **OpenZeppelin Contracts**: [OpenZeppelin Documentation](https://docs.openzeppelin.com/contracts/)
- **Solidity Best Practices**: [Solidity Documentation](https://docs.soliditylang.org/en/latest/security-considerations.html)
- **Gas Optimization**: [Foundry Gas Optimization Guide](https://book.getfoundry.sh/tutorials/solidity-scripting)

### Testing and Security
- **Foundry Testing**: [Test Smart Contracts](/developers/smart-contracts/foundry/test-smart-contracts/)
- **Security Tools**: [Slither](https://github.com/crytic/slither), [Mythril](https://mythril.ai/)
- **Audit Resources**: [Smart Contract Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)

### Rootstock Specific
- **Deployment Guide**: [Deploy Smart Contracts](/developers/smart-contracts/foundry/deploy-smart-contracts/)
- **Verification Guide**: [Verify Smart Contracts Using Foundry Script](/developers/smart-contracts/foundry/verify-smart-contracts/)
- **Troubleshooting**: [Foundry Troubleshooting](/developers/smart-contracts/foundry/troubleshooting/)
- **Rootstock Explorer**: [Testnet](https://explorer.testnet.rootstock.io/) | [Mainnet](https://explorer.rootstock.io/)

## Next Steps

After mastering advanced smart contract development:

1. **Explore DeFi Protocols**: Study existing DeFi implementations on Rootstock
2. **Contribute to Ecosystem**: Consider contributing to open-source Rootstock tools
3. **Build Complex Applications**: Develop multi-contract systems with advanced features
4. **Optimize for Gas**: Implement gas optimization strategies specific to Rootstock
5. **Community Engagement**: Share your contracts and contribute to developer discussions

**Important**: Always prioritize security and proper testing in production environments. Consider professional audits for contracts handling significant value.
