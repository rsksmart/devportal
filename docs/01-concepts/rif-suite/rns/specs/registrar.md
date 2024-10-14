---
sidebar_label: Registrar Specs
sidebar_position: 400
title: "Registry Specs"
tags: [rif, rns, rif-name-service, Registrar Specs]
description: "The registry contract provides a simple mapping between a domain and its resolver. "
---

### FIFSRegistrarBase.sol Contract Specification

The `FIFSRegistrarBase` contract implements a First-In-First-Served (FIFS) registration mechanism for domain names within the RNS system. The contract follows a structured process to ensure secure and fair registration of domain names. Below is a detailed breakdown of the registration process and key functions:

#### Registration Steps

1. **Calculate Commitment Hash (Off-chain)**
   - The first step in registering a domain name is to calculate a commitment hash off-chain using the `makeCommitment` function. This hash ensures that the registration process remains secure by preventing front-running attacks.
   - **Function: `makeCommitment`**
     - **Parameters**:
       - `label`: The keccak256 hash of the domain name to be registered.
       - `nameOwner`: The address of the owner of the domain name.
       - `secret`: A secret value to protect the name registration.
     - **Returns**: The commitment hash (`bytes32`).
     - **Usage Note**: This function should be used off-chain and not on-chain when committing.

   ```solidity
   function makeCommitment(bytes32 label, address nameOwner, bytes32 secret) public pure returns (bytes32) {
       return keccak256(abi.encodePacked(label, nameOwner, secret));
   }
   ```

2. **Commit the Calculated Hash**
   - Once the commitment hash is calculated, it must be submitted to the contract to initiate the registration process.
   - **Function: `commit`**
     - **Parameters**:
       - `commitment`: The valid commitment hash obtained from `makeCommitment`.
     - **Usage Note**: The commitment must be unique, and the function ensures that no duplicate commitments are made.

   ```solidity
   function commit(bytes32 commitment) external {
       require(commitmentRevealTime[commitment] < 1, "Existent commitment");
       commitmentRevealTime[commitment] = now.add(minCommitmentAge);
   }
   ```

3. **Wait for the Commitment to Mature**
   - After committing, there is a mandatory waiting period (`minCommitmentAge`) to ensure the commitment is valid and secure. During this time, the commitment cannot be revealed or used to register the domain.
   - **Function: `canReveal`**
     - **Parameters**:
       - `commitment`: The commitment hash to be queried.
     - **Returns**: `true` if the commitment can be revealed, `false` otherwise.

   ```solidity
   function canReveal(bytes32 commitment) public view returns (bool) {
       uint revealTime = commitmentRevealTime[commitment];
       return 0 < revealTime && revealTime <= now;
   }
   ```

4. **Execute Registration**
   - Once the commitment is ready to be revealed, the actual registration of the domain can be performed. The `FIFSRegistrarBase` contract supports multiple ways to execute this registration, such as using ERC-20 or ERC-677 tokens.
   - **Function: `register`**
     - **Parameters**:
       - `name`: The domain name to register.
       - `nameOwner`: The owner of the domain.
       - `secret`: The secret used in the commitment process.
       - `duration`: The registration duration in years.
     - **Usage Note**: The registration cost is calculated based on the domain name and is transferred using RIF tokens.

   ```solidity
   function register(string calldata name, address nameOwner, bytes32 secret, uint duration) external {
       uint cost = executeRegistration(name, nameOwner, secret, duration);
       require(rif.transferFrom(msg.sender, pool, cost), "Token transfer failed");
   }
   ```

   - **Function: `tokenFallback`**
     - **Parameters**:
       - `from`: The address sending the tokens.
       - `value`: The amount of tokens sent.
       - `data`: Additional data for the registration process.
     - **Returns**: `true` if the transaction is successful.

   ```solidity
   function tokenFallback(address from, uint value, bytes calldata data) external returns (bool) {
       require(msg.sender == address(rif), "Only RIF token");
       require(data.length > 88, "Invalid data");
   }
   ```