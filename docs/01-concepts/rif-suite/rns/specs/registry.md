---
sidebar_label: Registry Specs
sidebar_position: 400
title: "Registry Specs"
tags: [rif, rns, rif-name-service, Registry Specs]
description: "The registry contract provides a simple mapping between a domain and its resolver. "
---

The registry contract provides a simple mapping between a domain and its resolver. 

This contract manages all aspects of domain ownership, including transferring ownership and creating subdomains.

Each entry in the registry points to a resolver, which handles the resolution between the name domain and the desired resource.

The RNS Registry contract provides both data access and modification capabilities through the following functions:


## Access Functions

- Ownership
  ```
  function owner(bytes32 node) constant returns (address);
  ```

  Retrieves the owner (registrar) of the specified node.

- Resolution
  ```
  function resolver(bytes32 node) constant returns (address);
  ```

  Returns the resolver for the specified node.

- Caching
  ```
  function ttl(bytes32 node) constant returns (uint64);
  ```
  Retrieves the time-to-live (TTL) of the specified node. The TTL defines the maximum period during which the node's information can be cached.

## Modify Functions
The RNS Registry contract also allows for the modification of node data through the following functions:

- Ownership
  ```
  function setOwner(bytes32 node, address owner);
  ```

  Transfers ownership of a node to another registrar. This function may only be called by the current owner of node. A successful call to this function logs the `Transfer(bytes32 indexed, address)` event.

  ```
  function setSubnodeOwner(bytes32 node, bytes32 label, address owner);
  ```

  Creates a new node `label.node` and sets its owner to owner, or updates the node with a new owner if it already exists. This function may only be called by the current owner of node. A successful call to this function logs the  `NewOwner(bytes32 indexed, bytes32 indexed, address)` event.

- Resolution
  ```
  function setResolver(bytes32 node, address resolver);
  ```

  Sets the Resolver address for node, the contract that handles the desired resolutions. This function may only be called by the owner of node. A successful call to this function logs the `NewResolver(bytes32 indexed, address)` event.

- Caching
  ```
  function setTTL(bytes32 node, uint64 ttl);
  ```
  Sets the TTL for a node. A node's TTL applies to the 'owner' and 'resolver' records in the Registry, as well as to any information returned by the associated resolver.

