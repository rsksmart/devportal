---
sidebar_label: RNS
sidebar_position: 400
title: "RIF RNS: RIF Name Service | Rootstock (RSK)"
tags: [rif, rns, rif-name-service, rsk]
description: "Information about the RIF token, where to obtain it, how to transfer it, and technical details on its token standard"
---

RNS provides an architecture which enables the identification of blockchain addresses by human-readable names.

<form class="form" id="frm-rns-search">
  <div class="form-group">
    <div class="input-group">
      <input type="text" id="txt-rns-name" class="form-control" placeholder="find your domain" />
      <div class="input-group-append">
        <span class="input-group-text">.rsk</span>
      </div>
      <div class="input-group-append">
        <button class="btn btn-rns-register">Register!</button>
      </div>
    </div>
  </div>
</form>

<div class="container the-stack">
  <div class="row rif_blue_text">
    <div class="col">
      <div class="rns-index-box">
        <a href="try-rns">Try the service</a>
        <br />
        <br />
        <p>Register a domain in the Testnet, for free.</p>
      </div>
    </div>
    <div class="col">
      <div class="rns-index-box">
        <a href="./integrate">Integrate with RNS</a>
        <br />
        <br />
        <p>Easy guides on how to integrate RNS in your solution.</p>
      </div>
    </div>
  </div>
  <div class="row rif_blue_text">
    <div class="col">
      <div class="rns-index-box">
        <a href="run-locally">Develop on top of RNS</a>
        <br />
        <br />
        <p>Deploy RNS suite in your local development environment</p>
      </div>
    </div>
    <div class="col">
      <div class="rns-index-box">
        <a href="libs">Use the libraries</a>
        <br />
        <br />
        <p>Use simple libraries to interact with RNS service.</p>
      </div>
    </div>
  </div>
</div>

## The stack

![image](/img/rif/rns/theStack.png)

## Motivation

By adding a name resolution service, also known as “alias”, the probability of errors is significantly reduced. In addition, centralizing the access to multiple resources associated with a human-readable name improves the blockchain platform user experience. As resource names may change over time, the system needs to be flexible to support frequent changes.

Currently over the World Wide Web, the Domain Name System (DNS) is responsible for mapping human-readable names to IP addresses. RNS is a decentralized and secure service that works over RSK's blockchain.

Here’s a refined version of your text, maintaining the same tone and voice:


## Design

RNS is a hierarchical namespace inspired by DNS, where the hierarchy roughly reflects organizational structure, with levels separated by the "." character.

The design of the RIF Name Service is shaped by specific goals:

- The primary objective is to establish a consistent namespace for referencing resources.
- Each piece of data associated with a name is tagged with a type, allowing queries to be limited to a specific type.
- To ensure the namespace is adaptable across different networks and applications, RNS supports the use of the same namespace with various protocol families or management systems. Data in RNS is tagged with both a class and a type, enabling the parallel use of different formats for data of type "address."
- There may be trade-offs between data acquisition costs, update speed, and cache accuracy. The domain owner, as the data source, should consider these trade-offs and decide what to store and how to cache it.

> [RNS specs](./specs)


## Elements of the RNS

RNS has four major components:

| **Component**    | **Description**                                                                                                                                                                                                                               | **Specs** |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| **RNS Registry**  | The RNS Registry is a specification for a tree-structured namespace and the data associated with the names. Conceptually, each node and leaf in the domain name space tree represents a set of information. Query operations attempt to extract specific types of information from a particular set. A query specifies the domain name of interest and the type of resource information desired. | [Specs](./specs/registry)  |
| **RNS Resolvers** | RNS Resolvers are contracts that provide information from a name in response to client requests. Resolvers must answer a query directly or use referrals to other resolvers. Typically, a resolver is a contract's public function that is directly accessible to user programs or other contracts. No specific protocol is required between the resolver and the user program. | [Specs](./specs/resolver)  |
| **RNS Registrar** | The RNS Registrar is a critical component within the RIF Name Service, managing the registration of `.rsk` domain names. This contract has the authority to register names in the RSK Owner contract, ensuring that new domain registrations are handled securely and efficiently. | [Specs](./specs/registrar)  |
| **Renewer**       | The Renewer is a contract designed to facilitate the renewal of names registered in the Node Owner. It is equipped with permissions to renew these names and provides flexibility in how the renewal is executed.                                                     

These fours components roughly correspond to the four layers or views of the domain system:
- From the user's point of view, the domain system is accessed through a simple resolution operation. The domain space consists of a single tree and the user can request information from any section of the tree.
- From the resolver's point of view, the domain system is composed of an unknown number of names. Each name has a corresponding resolver that provides information for a set of resolution types directly.
- From the registry's point of view, the domain system consists of a hierarchical tree where each leaf has an owner (contract or account) and an associated resolver that provides information of the name.
- From the **renewal's point of view**, the domain system ensures continued ownership through renewal processes, facilitating the payment of fees for name renewals via supported methods like ERC-20 or ERC-677.


## Guidelines on use

Before RNS can be used to hold naming information for some kind of object, two needs must be met:
- A convention for mapping between object names and domain names. This describes how information about an object is accessed. Find specs [here](specs#name-mapping-convention)
- Resource record types and data formats for describing the object. Find specs.

The guideline for finding a specific record for a name is as follows:
1. Calculate the name identifier with [`namehash` function](specs#name-mapping-convention).
2. Get the name's resolver address via [`resolver(bytes32)`](specs/registry#AcessFunctions).
3. Determine if resolver supports desired resource record via [ERC-165 interface detection](https://eips.ethereum.org/EIPS/eip-165).
4. Get the desired resource record. Find currently standardized [resolvers](./specs/resolver).

> Guidelines on integration

### Resource records

A domain name identifies a node. Each node has a set of resource information, which may be empty. The set of resource information associated with a particular name is composed of separate resource records (RRs). The order of RRs in a set is not significant. Resource records associated with a name are found in the domain's resolver
