---
sidebar_position: 202
title: Overview of the Airdrop Template Repository
sidebar_label: Airdrop Machine Template Repository

tags: [rsk, rootstock, resources, tutorials, runes, nft, Ethereum, dApps, smart contracts, airdrop]
description: "The repository consists of multiple smart contracts that work around a core logic contract called AirdropManager.sol which manages the logic for the different airdrops inside.Each contract has a specific role, and they interact with one another to manage airdrops effectively."
---


This repository contains multiple smart contracts designed to facilitate and manage airdrops efficiently. At the center of the codebase is `AirdropManager.sol`, the core logic contract responsible for handling various airdrop functions. 

Each supporting contract is assigned a distinct role, working in together with `AirdropManager.sol` to coordinate and execute airdrop processes smoothly. The following sections provide a detailed breakdown of the codebase. 


<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">1. Administrable.sol</Accordion.Header>
    <Accordion.Body>
     
This contract serves as the base contract for managing administrator roles within the system.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Administrable {
    mapping(address => bool) _admins;

    constructor(address[] memory initialAdmins) {
        for (uint i; i < initialAdmins.length; i++) {
            _admins[initialAdmins[i]] = true;
        }
    }
}
```
* **License and Version**: The first two lines specify the license type and the Solidity compiler version (0.8.19) being used for this contract.  
* **Contract Declaration**: `contract Administrable` declares a new smart contract named `Administrable`.  
* **Mapping**: `mapping(address => bool) _admins;` creates a mapping (a kind of dictionary) where each address (an Ethereum account) is associated with a boolean value. This is used to track whether an address is an admin (true) or not (false).  
* **Constructor**: The constructor function is called when the contract is deployed. It takes an array of addresses (`initialAdmins`) and sets those addresses as admins in the `_admins` mapping.

```
  modifier onlyAdmins {
        require(_admins[msg.sender], "Address not allowed to call this method");
        _;
    }
```

* **Modifier**: The `onlyAdmins` modifier is a reusable piece of code that restricts certain functions to be called only by addresses that are marked as admins. The `require` statement checks if the calling address (`msg.sender`) is an admin. If not, it stops execution and returns the specified error message.

```
  function isAdmin(address _address) public view returns(bool) {
        return _admins[_address];
    }
```

* **isAdmin Function**: This public function checks if a specific address is an admin. It returns true or false based on the `_admins` mapping.

```
    function addAdmin(address _newAdmin) public onlyAdmins {
        _admins[_newAdmin] = true;
    }

    function removeAdmin(address _admin) public onlyAdmins {
        _admins[_admin] = false;
    }

```
 **Admin Management Functions**
  * `addAdmin`: Allows an existing admin to add a new admin. This function can only be called by an admin due to the `onlyAdmins` modifier.  
  * `removeAdmin`: Allows an admin to remove another admin by setting their status to false in the `_admins` mapping.
  

   </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">2. AirdropManager.sol</Accordion.Header>
    <Accordion.Body>
      This contract is responsible for managing different airdrop contracts and facilitating the claiming process.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Administrable.sol";

enum AirdropType {
    CUSTOM,
    MERKLE
}
```

* **Imports**: `import "./Administrable.sol";` imports the `Administrable` contract so that the `AirdropManager` can use its functionality.  
* **Enum Declaration**: The `AirdropType` enum defines two types of airdrops: `CUSTOM` and `MERKLE`. Enums are a way to define a variable that can hold a set of predefined values, which in this case represent different airdrop methods. Currently the Admin can handle 2 different kinds of airdrop: CUSTOM, which consists on a simple allow/not allow claim, and the MERKLE, which consist on a more elaborated merkle tree information validation, which requires to pass a ROOT Hash to the contract, so it can verify itself if the user requesting an amount of tokens has permission or not to do it.

```
struct AirdropInfo {
    string airdropName;
    address airdropAddress;
    uint256 totalAirdropAmount;
    uint256 airdropAmountLeft;
    uint256 claimAmount;
    uint256 expirationDate;
    AirdropType airdropType;
}

```


* **Struct Declaration**: `AirdropInfo` is a structure that holds information about an airdrop. It includes:  
  * `airdropName`: A string representing the name of the airdrop.  
  * `airdropAddress`: The contract address that manages the airdrop.  
  * `totalAirdropAmount`: The total amount of tokens allocated for the airdrop.  
  * `airdropAmountLeft`: The remaining tokens available for claiming.  
  * `claimAmount`: The amount of tokens a user can claim.  
  * `expirationDate`: The date when the airdrop ends.  
  * `airdropType`: The type of airdrop (CUSTOM or MERKLE).

```
interface IAirdrop1155 {
    function claim(address user, uint256 amount_, bytes32[] calldata proof_) external;
    function hasClaimed(address _address) external view returns(bool);
    function hasExpired() external view returns(bool);
    function allowAddress(address _address) external;
    function allowAddresses(address[] memory addresses) external;
    function disallowAddresses(address[] memory addresses) external;
    function disallowAddress(address _address) external;
    function isAllowed(address _address) external view returns(bool);
    function getExpirationDate() external view returns(uint256);
    function getClaimAmount() external view returns(uint256);
    function getTotalAirdropAmount() external view returns(uint256);
    function getAirdropAmountLeft() external view returns(uint256);
    function getBalance() external view returns(uint256);
    function getAirdropInfo() external view returns(AirdropInfo memory info);
    function setRoot(bytes32 _root) external;
}

```

* **Interface Declaration**: `interface IAirdrop1155` defines a set of functions that other contracts must implement if they want to be used as airdrop contracts. Interfaces are a way to define contracts that will be used in a polymorphic way, meaning different contracts can fulfill the same role but with different implementations. This is implemented for the contract to call functions in airdrop smart contracts.

```
contract AirdropManager is Administrable {
    address[] _airdrops;

    constructor (address[] memory initialAdmins) Administrable(initialAdmins) {}

```

* **Contract Inheritance**: `contract AirdropManager is Administrable` means that `AirdropManager` inherits from the `Administrable` contract. This allows it to use admin-related functions and modifiers.  
* **State Variable**: `address[] _airdrops;` is an array that stores the addresses of the airdrop contracts managed by this contract.  
* **Constructor**: The constructor initializes the contract with a list of initial admins by calling the `Administrable` constructor.

```
event AirdropAdded(address airdropAddress);
event AirdropRemoved(address airdropAddress);
```

* **Events**: `AirdropAdded` and `AirdropRemoved` are events that are emitted when an airdrop is added or removed. Events allow external applications (like front-end UIs) to listen for and respond to changes on the blockchain.

```
function claim(address airdropAddress, address user, uint256 amount, bytes32[] calldata proof) public {
    IAirdrop1155 airdrop = IAirdrop1155(airdropAddress);
    airdrop.claim(user, amount, proof);
}
```

* **Claim Function**: This public function allows a user to claim their airdrop tokens. It accepts the address of the airdrop contract, the user’s address, the amount they wish to claim, and a proof for Merkle claims. It uses the `claim` function defined in the `IAirdrop1155` interface.

```
function hasClaimed(address airdropAddress, address user) public view returns(bool) {
    IAirdrop1155 airdrop = IAirdrop1155(airdropAddress);
    return airdrop.hasClaimed(user);
}
```

* **hasClaimed Function**: This function checks if a user has already claimed their airdrop tokens by calling the corresponding function in the airdrop contract.

```
function hasExpired(address airdropAddress) public view returns(bool) {
    IAirdrop1155 airdrop = IAirdrop1155(airdropAddress);
    return airdrop.hasExpired();
}
```

* **hasExpired Function**: This checks if the airdrop has expired by calling the corresponding function in the airdrop contract.

```
function isAllowed(address airdropAddress, address user) public view returns(bool) {
    IAirdrop1155 airdrop = IAirdrop1155(airdropAddress);
    return airdrop.isAllowed(user);
}
```

* **isAllowed Function**: This checks if a user is allowed to claim tokens from the specified airdrop.

```
function getExpirationDate(address airdropAddress) public view returns(uint256) {
    IAirdrop1155 airdrop = IAirdrop1155(airdropAddress);
    return airdrop.getExpirationDate();
}
```

* **getExpirationDate Function**: Retrieves the expiration date of the airdrop.

```
function getClaimAmount(address airdropAddress) public view returns(uint256) {
    IAirdrop1155 airdrop = IAirdrop1155(airdropAddress);
    return airdrop.getClaimAmount();
}
```

* **getClaimAmount Function**: Returns the amount of tokens a user can claim.

```
function getAirdropInfo(address airdropAddress) public view returns(AirdropInfo memory) {
    IAirdrop1155 airdrop = IAirdrop1155(airdropAddress);
    return airdrop.getAirdropInfo();
}
```

* **getAirdropInfo Function**: Retrieves all relevant information about the airdrop by calling the corresponding function in the airdrop contract.

```
function getTotalAirdropAmount(address airdropAddress) public view returns(uint256) {
    IAirdrop1155 airdrop = IAirdrop1155(
```
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">3. CustomAirdrop1155.sol</Accordion.Header>
    <Accordion.Body>
    This contract would implement the logic specific to airdrops using the ERC-1155 standard (multi-token standard). It allows for the distribution of tokens as part of an airdrop.


```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
```

* **License and Version**: The first two lines specify the license type (MIT) and the Solidity version (0.8.19) for this contract.  
* **Imports**: The contract imports the `Ownable` contract from OpenZeppelin, which provides basic authorization control functions, simplifying the implementation of user permissions.


```
interface IERC1155 {
    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data) external;
    function balanceOf(address account, uint256 id) external view returns (uint256);
}
```

* **Interface**: `IERC1155` defines a standard interface for ERC-1155 token contracts. This interface declares two functions:  
  * `safeTransferFrom`: Transfers tokens from one address to another safely.  
  * `balanceOf`: Checks the balance of a specific token ID for a given address. 

```
enum AirdropType {
    CUSTOM,
    MERKLE
}

struct AirdropInfo {
    string airdropName;
    address airdropAddress;
    uint256 totalAirdropAmount;
    uint256 airdropAmountLeft;
    uint256 claimAmount;
    uint256 expirationDate;
    AirdropType airdropType;
}

```

* **Enum**: `AirdropType` is an enumeration that defines two types of airdrops: `CUSTOM` and `MERKLE`, allowing the contract to handle different airdrop strategies.  
* **Struct**: `AirdropInfo` is a structure that encapsulates essential details about the airdrop, such as:  
  * `airdropName`: The name of the airdrop.  
  * `airdropAddress`: The contract address managing the airdrop.  
  * `totalAirdropAmount`: The total tokens allocated for the airdrop.  
  * `airdropAmountLeft`: Tokens remaining for distribution.  
  * `claimAmount`: Tokens a user can claim at once.  
  * `expirationDate`: When the airdrop expires.  
  * `airdropType`: The type of airdrop.
 

```
contract CustomAirdrop1155 is Ownable {
```

* **Contract Definition**: `contract CustomAirdrop1155` declares a new smart contract named `CustomAirdrop1155`, inheriting from `Ownable`. This means it will have owner-related functionalities, such as restricting certain functions to the contract owner.


```
event Claim(address recipient, uint256 amount);
event AddressAllowed(address allowedAddress);
event AddressDisallowed(address disallowedAddress);

IERC1155 _tokenContract;
uint256 _totalAirdropAmount;
uint256 _airdropAmountLeft;
uint256 _claimAmount;
uint256 _expirationDate;
uint256 _tokenId;
string _airdropName;
AirdropType _airdropType;

mapping(address => bool) _allowedAddresses;
mapping(address => bool) _addressesThatAlreadyClaimed;
```

* **Events**: The contract defines three events:  
  * `Claim`: Emitted when a user successfully claims their tokens.  
  * `AddressAllowed`: Emitted when an address is granted permission to claim.  
  * `AddressDisallowed`: Emitted when an address is denied permission to claim.  
* **State Variables**:  
  * `_tokenContract`: An instance of the ERC-1155 token contract.  
  * `_totalAirdropAmount`: The total number of tokens allocated for the airdrop.  
  * `_airdropAmountLeft`: The number of tokens remaining to be claimed.  
  * `_claimAmount`: The amount of tokens each user can claim.  
  * `_expirationDate`: The date and time when the airdrop will expire.  
  * `_tokenId`: The specific ID of the token being airdropped.  
  * `_airdropName`: The name of the airdrop.  
  * `_airdropType`: The type of airdrop (CUSTOM or MERKLE).  
* **Mappings**:  
  * `_allowedAddresses`: Keeps track of which addresses are permitted to claim tokens.  
  * `_addressesThatAlreadyClaimed`: Tracks which addresses have already claimed their tokens.


```
constructor(
    string memory airdropName,
    address initialOwner,
    address tokenAddress,
    uint256 tokenId,
    uint256 totalAirdropAmount,
    uint256 claimAmount,
    uint256 expirationDate,
    AirdropType airdropType
) Ownable(initialOwner) {
    _tokenContract = IERC1155(tokenAddress);
    _airdropName = airdropName;
    _tokenId = tokenId;
    _totalAirdropAmount = totalAirdropAmount;
    _airdropAmountLeft = totalAirdropAmount;
    _claimAmount = claimAmount;
    _expirationDate = expirationDate;
    _airdropType = airdropType;
}


```

* **Constructor**: This function is executed when the contract is deployed. It initializes various parameters, including:  
  * `airdropName`: The name of the airdrop.  
  * `initialOwner`: The address of the initial owner (who can manage the airdrop).  
  * `tokenAddress`: The address of the ERC-1155 token contract.  
  * `tokenId`: The ID of the token to be distributed.  
  * `totalAirdropAmount`: The total amount of tokens for the airdrop.  
  * `claimAmount`: How many tokens each user can claim at once.  
  * `expirationDate`: When the airdrop will end.  
  * `airdropType`: The type of the airdrop.

The constructor also initializes the `_tokenContract` with the provided token address.

### 

```
function claim(address user, uint256 amount, bytes32[] calldata proof) public onlyOwner {
    require(isAllowed(user), "Address not allowed to claim this airdrop");
    require(!hasExpired(), "Airdrop already expired.");
    require(!hasClaimed(user), "Address already claimed this airdrop.");
    require(!hasBeenTotallyClaimed(), "Airdrop has been totally claimed already.");
    require(hasBalanceToClaim(), "Airdrop contract has insufficient token balance.");

    _tokenContract.safeTransferFrom(address(this), user, _tokenId, _claimAmount, '');
    _airdropAmountLeft -= _claimAmount;
    _addressesThatAlreadyClaimed[user] = true;

    emit Claim(user, _claimAmount);
}
```

* **Claim Function**: This function allows the contract owner to facilitate a token claim for a specified user. It checks several conditions using `require` statements:  
  * The user must be allowed to claim.  
  * The airdrop must not have expired.  
  * The user must not have already claimed.  
  * There must be enough tokens left for claiming.

If all checks pass, the function:

* Transfers the tokens from the airdrop contract to the user using `safeTransferFrom`.  
* Updates the remaining airdrop amount.  
* Marks the user as having claimed.

It then emits the `Claim` event to notify about the successful claim.

### 

These functions provide information without modifying the state.

```
function getAirdropInfo() public view returns(AirdropInfo memory) {
    return AirdropInfo(_airdropName, address(this), _totalAirdropAmount, _airdropAmountLeft, _claimAmount, _expirationDate, _airdropType);
}
```

* **getAirdropInfo Function**: Returns a structured view of the airdrop information using the `AirdropInfo` struct.

```
function hasBalanceToClaim() public view returns(bool) {
    return _tokenContract.balanceOf(address(this), _tokenId) >= _claimAmount;
}

function hasBeenTotallyClaimed() public view returns(bool) {
    return _airdropAmountLeft < _claimAmount;
}

function hasClaimed(address _address) public view returns(bool) {
    return _addressesThatAlreadyClaimed[_address];
}

function hasExpired() public view returns(bool) {
    return _expirationDate < block.timestamp;
}
```

* **Balance Checks**:  
  * `hasBalanceToClaim`: Checks if the airdrop contract has enough tokens left for a claim.  
  * `hasBeenTotallyClaimed`: Checks if the airdrop has been fully claimed.  
  * `hasClaimed`: Checks if a specific address has already claimed tokens.  
  * `hasExpired`: Checks if the airdrop has expired based on the current timestamp.

### 

These functions manage which addresses can claim tokens.

```
function allowAddress(address _address) public onlyOwner {
    _allowedAddresses[_address] = true;
    emit AddressAllowed(_address);
}

function allowAddresses(address[] memory addresses) public onlyOwner {
    for (uint i; i < addresses.length; i++) {
        _allowedAddresses[addresses[i]] = true;
        emit AddressAllowed(addresses[i]);
    }
}

function disallowAddresses(address[] memory addresses) public onlyOwner {
    for (uint i; i < addresses.length
```

    </Accordion.Body>
  </Accordion.Item>

   <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">4. CustomAirdrop1155ClaimMerkle.sol</Accordion.Header>
    <Accordion.Body>
This contract likely extends the functionality of `CustomAirdrop1155.sol` by implementing a Merkle tree structure for validating claims. It allows airdrop managers to verify claims against a list of eligible addresses efficiently.

### 

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import { MerkleProof } from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

```

* **License and Version**: The first two lines specify the license type (MIT) and the Solidity version (0.8.19) for this contract.  
* **Imports**: The contract imports:  
  * `Ownable` from OpenZeppelin, which provides basic authorization control functions.  
  * `MerkleProof`, which includes utilities for verifying Merkle proofs.

### 

```
interface IERC1155 {
    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data) external;
    function balanceOf(address account, uint256 id) external view returns (uint256);
}
```

* **Interface**: `IERC1155` defines the standard interface for ERC-1155 token contracts. This interface declares two functions:  
  * `safeTransferFrom`: Safely transfers tokens from one address to another.  
  * `balanceOf`: Retrieves the balance of a specific token ID for a given address.

### 

```
enum AirdropType {
    CUSTOM,
    MERKLE
}

struct AirdropInfo {
    string airdropName;
    address airdropAddress;
    uint256 totalAirdropAmount;
    uint256 airdropAmountLeft;
    uint256 claimAmount;
    uint256 expirationDate;
    AirdropType airdropType;
}

```

* **Enum**: `AirdropType` is an enumeration that defines two types of airdrops: `CUSTOM` and `MERKLE`. This helps distinguish between different airdrop mechanisms.  
* **Struct**: `AirdropInfo` holds information about an airdrop, including:  
  * `airdropName`: The name of the airdrop.  
  * `airdropAddress`: The address of the contract managing the airdrop.  
  * `totalAirdropAmount`: Total tokens allocated for the airdrop.  
  * `airdropAmountLeft`: Tokens remaining for distribution.  
  * `claimAmount`: Amount of tokens each user can claim.  
  * `expirationDate`: The expiration date of the airdrop.  
  * `airdropType`: The type of the airdrop.

### 

```
contract CustomAirdrop1155Merkle is Ownable {
```

* **Contract Definition**: This line declares a new smart contract named `CustomAirdrop1155Merkle`, inheriting from `Ownable`. This means it will have owner-related functionalities to manage permissions.

### 

```
event Claim(address recipient, uint256 amount);

IERC1155 _tokenContract;
uint256 _totalAirdropAmount;
uint256 _airdropAmountLeft;
uint256 _claimAmount;
uint256 _expirationDate;
uint256 _tokenId;
string _airdropName;
AirdropType _airdropType;

// (account,amount) Merkle Tree root
bytes32 public root;
error InvalidProof();
error UsedLeaf();

mapping(address => bool) _addressesThatAlreadyClaimed;
mapping(bytes32 => bool) public claimedLeaf;

```

* **Events**: The contract defines one event:  
  * `Claim`: Emitted when a user successfully claims their tokens.  
* **State Variables**:  
  * `_tokenContract`: An instance of the ERC-1155 token contract.  
  * `_totalAirdropAmount`: The total tokens allocated for the airdrop.  
  * `_airdropAmountLeft`: The remaining tokens available for claiming.  
  * `_claimAmount`: The amount of tokens each user can claim.  
  * `_expirationDate`: The expiration date of the airdrop.  
  * `_tokenId`: The ID of the token being airdropped.  
  * `_airdropName`: The name of the airdrop.  
  * `_airdropType`: The type of airdrop (CUSTOM or MERKLE).  
* **Merkle Tree Variables**:  
  * `root`: The Merkle root of the allowed claims.  
  * `InvalidProof`: A custom error thrown when the proof is invalid.  
  * `UsedLeaf`: A custom error thrown when a leaf has already been claimed.  
* **Mappings**:  
  * `_addressesThatAlreadyClaimed`: Keeps track of addresses that have claimed their tokens.  
  * `claimedLeaf`: Tracks which leaves (combinations of user addresses and amounts) have already been claimed.

### 

```
constructor(
    string memory airdropName,
    address initialOwner,
    address tokenAddress,
    uint256 tokenId,
    uint256 totalAirdropAmount,
    uint256 expirationDate,
    AirdropType airdropType
) Ownable(initialOwner) {
    _tokenContract = IERC1155(tokenAddress);
    _airdropName = airdropName;
    _tokenId = tokenId;
    _totalAirdropAmount = totalAirdropAmount;
    _airdropAmountLeft = totalAirdropAmount;
    _expirationDate = expirationDate;
    _airdropType = airdropType;
}

```

* **Constructor**: This function is executed when the contract is deployed. It initializes various parameters, including:  
  * `airdropName`: The name of the airdrop.  
  * `initialOwner`: The address of the initial owner (who can manage the airdrop).  
  * `tokenAddress`: The address of the ERC-1155 token contract.  
  * `tokenId`: The ID of the token to be distributed.  
  * `totalAirdropAmount`: The total amount of tokens for the airdrop.  
  * `expirationDate`: The expiration date of the airdrop.  
  * `airdropType`: The type of the airdrop.

The constructor also initializes the `_tokenContract` with the provided token address.

### 

```
function setRoot(bytes32 _root) public onlyOwner {
    root = _root;
}

```

* **setRoot Function**: This function allows the owner to set the Merkle root for the airdrop, which defines which users are eligible for claiming tokens.

### 

```
function claim(address user, uint256 amount, bytes32[] calldata proof) external onlyOwner {
    _claim(user, amount, proof);
}
```

* **Claim Function**: This function allows the contract owner to initiate a claim for a specified user. It calls the internal `_claim` function, which contains the actual logic for processing the claim.

### 

```
function _claim(address origin_, uint256 amount_, bytes32[] calldata proof_) internal {
    bytes32 leaf = _buildLeaf(origin_, amount_);

    if (!MerkleProof.verifyCalldata(proof_, root, leaf)) revert InvalidProof();
    if (claimedLeaf[leaf]) revert UsedLeaf();
    claimedLeaf[leaf] = true;
    require(!hasExpired(), "Airdrop already expired.");
    require(!hasBeenTotallyClaimed(), "Airdrop has been totally claimed already.");

    _tokenContract.safeTransferFrom(address(this), origin_, _tokenId, amount_, '');
    _airdropAmountLeft -= amount_;
    _addressesThatAlreadyClaimed[origin_] = true;

    emit Claim(origin_, amount_);
}

```

* **Internal `_claim` Function**: This function performs the actual claim processing. It:  
  * Builds a Merkle leaf using the user's address and the claim amount.  
  * Verifies the provided Merkle proof against the root. If the proof is invalid, it throws an error.  
  * Checks if the leaf has already been claimed. If so, it throws an error.  
  * Marks the leaf as claimed.  
  * Checks if the airdrop has expired or if all tokens have already been claimed.  
  * Transfers the specified amount of tokens to the user.  
  * Updates the amount of tokens left for the airdrop.  
  * Marks the user as having claimed their tokens.  
  * Emits the `Claim` event.

### 

```
function _buildLeaf(address origin_, uint256 amount_) internal pure returns (bytes32) {
    return keccak256(bytes.concat(keccak256(abi.encode(origin_, amount_))));
}
```

* **Internal `_buildLeaf` Function**: This function creates a leaf node for the Merkle tree by hashing the user's address and the claim amount together. The resulting hash (leaf) will be used for verification.

### 

These functions provide information about the airdrop without modifying the state.

```
function getAirdropInfo() public view returns(AirdropInfo memory) {
    return AirdropInfo(_airdropName, address(this), _totalAirdropAmount, _airdropAmountLeft, 0, _expirationDate, _airdropType);
}

function hasBeenTotallyClaimed() public view returns(bool) {
    return _airdropAmountLeft < 1;
}

function hasClaimed(address _address) public view returns(bool) {
    return _addressesThatAlreadyClaimed[_address];
}

function hasExpired() public view returns(bool) {
    return _
```
    </Accordion.Body>
  </Accordion.Item>

   <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">5. Erc1155.sol</Accordion.Header>
    <Accordion.Body>
This contract implements the ERC-1155 standard, providing the foundational structure for managing multiple tokens and enabling the transfer of various token types in a single contract.

### 

```
// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
```

* **License and Version**: The first line specifies the license type (MIT). The comment indicates compatibility with OpenZeppelin Contracts version 5.0.0.  
* **Solidity Version**: The `pragma` statement specifies that this contract uses Solidity version 0.8.19 or higher.  
* **Imports**: The contract imports two modules from OpenZeppelin:  
  * `ERC1155`: The base implementation of the ERC-1155 token standard, which allows for the creation of multiple token types in a single contract.  
  * `Ownable`: A contract that provides basic authorization control functions, allowing only the owner of the contract to execute certain functions.

### 

```
contract MyToken is ERC1155, Ownable {
```

* **Contract Definition**: This line declares a new smart contract named `MyToken`, which inherits from both `ERC1155` and `Ownable`. This means it will have the functionality of an ERC-1155 token as well as ownership control features.

### 

```
constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {}
```

* **Constructor**: This function is called when the contract is deployed. It initializes the contract with the following:  
  * `initialOwner`: The address of the initial owner of the contract.  
  * `ERC1155("")`: Calls the constructor of the ERC1155 contract with an empty URI string, which can be set later. The URI is usually used to provide metadata about the tokens.  
  * `Ownable(initialOwner)`: Calls the constructor of the Ownable contract to set the initial owner.

### 

```
function setURI(string memory newuri) public onlyOwner {
    _setURI(newuri);
}
```

* **setURI Function**: This public function allows the contract owner to set the URI for the tokens. It uses the `onlyOwner` modifier, ensuring that only the owner can change the URI.  
* **Internal Call**: `_setURI(newuri)` is a function inherited from the ERC1155 contract that updates the token URI.

### 

```
function mint(address account, uint256 id, uint256 amount, bytes memory data)
    public
    onlyOwner
{
    _mint(account, id, amount, data);
}
```

* **mint Function**: This public function allows the contract owner to mint new tokens.  
  * **Parameters**:  
    * `account`: The address that will receive the minted tokens.  
    * `id`: The ID of the token type to mint.  
    * `amount`: The number of tokens to mint.  
    * `data`: Additional data that can be sent along with the minting operation (can be empty).  
* **Internal Call**: `_mint(account, id, amount, data)` is a function inherited from the ERC1155 contract that performs the actual minting of tokens.

### 

```
function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
    public
    onlyOwner
{
    _mintBatch(to, ids, amounts, data);
}
```

* **mintBatch Function**: This public function allows the contract owner to mint multiple types of tokens in a single transaction.  
  * **Parameters**:  
    * `to`: The address that will receive the minted tokens.  
    * `ids`: An array of token IDs to mint.  
    * `amounts`: An array of amounts corresponding to each token ID.  
    * `data`: Additional data that can be sent along with the minting operation (can be empty).  

 **Internal Call**: `_mintBatch(to, ids, amounts, data)` is a function inherited from the ERC1155 contract that performs the batch minting of tokens.



   </Accordion.Body>
  </Accordion.Item>
</Accordion>


## Complete Codebase 
> [https://github.com/rsksmart/airdrop-template/tree/main/contracts](https://github.com/rsksmart/airdrop-template/tree/main/contracts)  
