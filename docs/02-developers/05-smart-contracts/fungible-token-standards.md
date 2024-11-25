---
sidebar_position: 900
sidebar_label: Fungible Token Standards
title: Ethereum Fungible Tokens Standard ERC1363, ERC223, ERC677 
description: 'What is ERC20, and are there others like it? How do they work on Rootstock?'
tags: [rsk, rootstock, smart contracts, dApps, tokens, fungible-tokens]
---

## ERCs vs EIPs vs RSKIPs

[Ethereum Requests for Comment (ERCs)](https://docs.ethhub.io/built-on-ethereum/erc-token-standards/what-are-erc-tokens/),
and [Ethereum Improvement Proposals (EIPs)](https://eips.ethereum.org/erc)
refer to the same thing - they were originally called ERCs,
and then subsequently renamed to EIPs.
These are all focused on improvements to Ethereum.

[Rootstock Improvement Proposals (RSKIPs)](https://github.com/rsksmart/RSKIPs) use a similar process to improve Rootstock.

A small subset of EIPs, albeit an extremely popular subset, 
are tokens standards, which have to do with smart contracts,
and do not have much to do with the Ethereum nodes.
Instead, they focus on the Solidity smart contract implementations
with the intent to standardise the ways in which tokens get implemented.

## Ethereum Token Standards work on Rootstock

Since the Rootstock Virtual Machine (RSKVM) is compatible with
the Ethereum Virtual Machine (EVM) at the op-code level,
smart contracts that are compiled to target the EVM
can be executed in exactly the same way on the RSKVM.

> Note: Some differences exist, most notably to do with how gas
> costs are calculated, both in terms of the schedule per op-code,
> as well as the calculation methodology.
> At the time of writing, like-for-like smart contract function invocations
> cost 2% to 2.5% on Rootstock compared to Ethereum.

Owing to this level of compatibility,
the same smart contracts standards that work on Ethereum
also work on Rootstock - there is no need to create "mirror RSKIPs"
that are the equivalent of EIPs for token standards,
since they will be virtually identical.

## Fungible Tokens

```text
address -> amount
```

At their core, fungible tokens are smart contracts which store
a mapping of addresses to amounts.
This is used to represent an understanding that each particular address
is the owner of a particular amount of tokens.

```text
transfer(...)
```

These smart contracts will also have a `transfer` function,
that allows them to transfer the tokens held in one address to another address.

Of course, there is a lot more to fungible tokens than the above,
the above is merely a rudimentary illustration.

## ERC20

The ERC20, or EIP20, token standard is the most well-known
among all fungible tokens standards.
In fact, it was so popular, that at some point 3 in 4 smart contracts on the Ethereum blockchain implemented this standard.
To this day, it remains a dominant force,
and in fact the term "ERC20" is almost synonymous with the term "fungible token".

The above is also true on the Rootstock network,
virtually all fungible tokens implement this particular token standard.

Its continued relevance stems from the fact that whenever
a new fungible token standard comes out,
the most critical factor to enable adoption is to be "ERC20 compatible".
This means that new fungible tokens standards implement
the interface specified by the ERC20 token standard,
and then add their own additional functions on top of it.

## ERC677

The ERC677 token standard is also a fungible token standard,
and it extends the ERC20 token standard.

```text
transferAndCall(...)
```

The key addition is the `transferAndCall`  function,
which allows the user to combine
a `transfer` function invocation on the fungible token smart contract
with another function invocation of their choice on a different smart contract.
This allows the user to accomplish both operations in a single transaction
submitted to the blockchain network.

On the Rootstock network, the LINK token from Chainlink,
and the RIF token from Rootstock, both implement this standard.

## More standards

There are many other smart contract standards
used to build fungible tokens, including ERC223, ERC777, and ERC1363.
These all happen to be backwards compatible with ERC20 standard,
however have not seen much by way of widespread adoption yet.