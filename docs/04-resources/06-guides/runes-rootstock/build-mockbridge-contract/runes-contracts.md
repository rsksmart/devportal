---
sidebar_position: 3
title: Runes Mock Bridge Contract Explanation walk through
sidebar_label: Contract Explanation walk through
tags: [rsk, rootstock, resources, tutorials,  setup, Runes, dApps, smart contracts, Remix IDE, MetaMask]
description: "The Rootstock Runes Mock Bridge setup page shows you how to getting building your runes, by first cloning our project and testing it locally."
---

### **1\. Understanding the Contract Structure**

This contract defines a new token type, **RuneToken**, based on the **ERC-1155 standard**. It also uses the **Ownable** contract, which restricts certain functions to the contract's owner.

#### **Key Imports:**

```
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
```

* **ERC1155**: This is a token standard that supports both fungible and non-fungible tokens within the same contract.  
* **Ownable**: This contract standard restricts certain actions to only the contract's owner (the one who deployed it or someone assigned as the owner).  
* **Strings**: A utility library for working with string conversions.

### **Main Components of the Contract**

#### **Events:**

* `TokensFrozen`: Emits an event when tokens are frozen for a specific account.  
* `TokensUnfrozen`: Emits an event when tokens are unfrozen.

#### **Data Structures:**

* **Balance**: Holds the account and balance of a token.  
* **TokenInfo**: Contains details about a token, such as its URI ( **Uniform Resource Identifier**), name, symbol, maximum supply, current supply, default minting amount, and balance.

#### **Mappings:**

* `_tokenInfos`: Stores the information about each token, keyed by the token ID.  
* `_userTokens`: Tracks all tokens held by a user.  
* `_frozenTokens`: Keeps track of how many tokens are frozen for each user.

### 

### **2\. The Constructor**

```
constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {}
```

* **ERC1155 ("")**: This calls the ERC1155 constructor, but the URI is set as an empty string initially.  
* **Ownable (initialOwner)**: The `Ownable` contract is initialized with the `initialOwner` as the owner of the contract, allowing only this address to perform certain actions (e.g., minting).

### **3\. The `uri` Function**

```
function uri(uint256 tokenId) public view override returns (string memory) {
    return _tokenInfos[tokenId].uri;
}
```

This function returns the URI for a given token ID. The URI typically points to a metadata file that contains additional details about the token (e.g., images, descriptions).

### **4\. Minting Fungible Tokens**

```
function mintFungible(
    string memory tokenURI,
    string memory runeName,
    string memory symbol,
    uint256 maxSupply,
    uint256 initialSupply,
    uint256 defaultMintAmount,
    address receiver
) public onlyOwner {
    // Function logic here
}
```

This function allows the owner of the contract to mint fungible tokens.

#### **Steps Involved:**

1. **Check max supply**: Ensure that the initial supply is not greater than the maximum allowed supply.  
2. **Generate a token ID**: A unique token ID is created by hashing the `runeName` using `keccak256`.  
3. **Token ID uniqueness check**: Ensure that the token ID doesn't already exist.  
4. **Save Token Info**: Store details about the token in the `_tokenInfos` mapping.  
5. **Mint the token**: Mint the specified amount (`initialSupply`) to the `receiver` address.  
6. **Track ownership**: Add the minted token to the user's list of owned tokens using `_addUserToken`.

### **5\. Minting Non-Fungible Tokens (NFTs)**

```
function mintNonFungible(
    string memory tokenURI,
    string memory runeName,
    string memory symbol,
    address receiver
) public onlyOwner {
    // Function logic here
}
```

This function is similar to `mintFungible` but for minting non-fungible tokens. A non-fungible token is a unique token, meaning only one exists.

#### **Key Differences:**

* **Max Supply** is always `1` for non-fungible tokens.  
* **Current Supply** is also set to `1`.

### **6\. Minting More Tokens**

```
function mintMore(
    string memory runeName,
    address receiver
) external onlyOwner {
    // Function logic here
}
```

This function allows the contract owner to mint additional tokens of an existing fungible token, as long as the new supply doesn’t exceed the maximum supply.

#### **Key Steps:**

1. **Check token existence**: Ensure the token exists by checking its `maxSupply`.  
2. **Check supply limits**: Ensure the current supply plus the new minting amount doesn’t exceed the max supply.  
3. **Mint tokens**: Mint more tokens to the `receiver`.

### **7\. Token Freezing and Unfreezing**

#### **Freezing Tokens:**

```
function freezeTokens(string memory runeName, uint256 amount, address owner) external onlyOwner {
    // Function logic here
}
```

* Freezing tokens restricts the user from transferring them.  
* The function ensures that the account has sufficient tokens to freeze.  
* The frozen amount is added to `_frozenTokens`.

#### **Unfreezing Tokens:**

```
function unfreezeTokens(string memory runeName, uint256 amount, address owner) external onlyOwner {
    // Function logic here
}
```

* This function unfreezes the tokens, allowing the user to transfer them again.  
* The frozen amount is reduced from `_frozenTokens`.

### **8\. Token Information Queries**

#### **Get Token Information:**

```
function getTokenInfo(uint256 tokenId, address holder) public view returns (TokenInfo memory) {
    // Function logic here
}
```

* This function retrieves the details about a token (such as URI, name, symbol, max supply, etc.).  
* It can also include the token balance of a specific `holder` if the `holder` address is provided.


#### **Get Tokens Owned by a User:**

```
function getUserTokens(address user) public view returns (uint256[] memory) {
    return _userTokens[user];
}
```

* This function returns a list of all token IDs owned by a specific user.

### **9\. Token Transfer Functions with Freezing Consideration**

ERC1155 includes transfer functions (`safeTransferFrom` and `safeBatchTransferFrom`). These are overridden in this contract to take into account frozen tokens.

```
function safeTransferFrom(
    address from,
    address to,
    uint256 id,
    uint256 amount,
    bytes memory data
) public virtual override {
    require(balanceOf(from, id) >= amount + _frozenTokens[id][from], "Insufficient unlocked balance for transfer");
    super.safeTransferFrom(from, to, id, amount, data);
}
```

This ensures that users cannot transfer frozen tokens. The contract checks that the unlocked balance (total balance minus frozen balance) is sufficient before allowing transfers.

### **10\. Overriding `balanceOf` to Consider Frozen Tokens**

```
function balanceOf(address account, uint256 tokenId) public view override returns (uint256) {
    uint256 totalBalance = super.balanceOf(account, tokenId);
    uint256 frozenBalance = _frozenTokens[tokenId][account];
    return totalBalance - frozenBalance;
}
```

This function returns the number of **unfrozen** tokens owned by a user for a specific token ID.

:::info[Complete Codebase on GitHub]
[**Complete RSK-Runes**](https://github.com/rsksmart/rsk-runes/tree/main/contracts)
:::
