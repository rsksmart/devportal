---
sidebar_position: 4
sidebar_label: Account Abstraction
title: Account Abstraction on Rootstock
description: "Create smarter accounts that give users a seamless web3 experience" 
tags: [hardhat, quick start, developer tools, rsk, rootstock, ethereum, dApps, smart contracts]
---

To use Ethereum, users create digital identities called externally owned accounts (EOAs). These accounts are secured by a secret or private key. To perform actions on the Ethereum network, users must pay a fee in ETH. This requirement limits the ways in which users can interact with the blockchain.

This limitation includes:

**Transactions:** 
  * Ethereum can only process a limited number of transactions per second, leading to congestion during peak times. This congestion can result in significantly slower transaction confirmation times.   

**Gas Fees:**
* High Transaction Fees (Gas Fees): As demand for the network increases, gas fees can become prohibitively expensive, making it costly for users to interact with the blockchain.
* Gas fee must be paid in ETH

**Security:**
* Users are responsible for securely storing their private keys, note that, if a private key is lost or compromised, funds CANNOT be recovered.

**User Experience:** 
  * Many Ethereum-based applications have user interfaces that are not as intuitive as traditional web applications

Smart contract wallets provide a more advanced approach to managing Ethereum accounts. It enables users to program custom security protocols and user interfaces into their wallets, these contracts offer enhanced security and a better user experience. Account abstraction, a key feature of smart contract wallets, allows smart contracts to initiate transactions independently, freeing users from the complexities of managing separate EOAs and ETH balances. 

Account abstraction refers to the different ways to create and manage accounts, other than using a Secret Recovery Phrase and a wallet. It enables the creation of new types of accounts called “contract-type accounts” or simply “accounts”. These accounts can hold both code and ether, and they can execute transactions and smart contract functions. This means that contracts can directly control and manipulate funds, eliminating the need for a separate Externally Owned Accounts (EOA) to initiate transactions.

Simply put;
Regular accounts hold your crypto and need your private key for transactions. Account abstraction lets you create smarter accounts/wallets like mini-apps that hold your crypto and can send transactions without needing your key every time.

## What is a Smart Wallet?

Smart wallets are wallets controlled by smart contracts following the ERC-4337 specification. Ethereum has two types of accounts:

* Externally Owned Accounts (EOAs)

* Contract Accounts (Smart Contracts)

A Contract Account is managed by a Smart Contract rather than an EOA and relies on code instead of private keys to secure and recover wallet information.

Some benefits include:
- Enhanced efficiency: By allowing contracts to directly control funds, account abstraction reduces the number of transactions and storage operations required. This leads to improved efficiency and reduces gas costs.
- Improved privacy: Account abstraction enables the creation of more sophisticated smart contracts that can handle transactions privately within the contract itself. It eliminates the need for external transactions, enhancing privacy for users.
- Flexible fee payment models: With account abstraction, contracts can pay transaction fees on behalf of users. This allows for more flexible fee payment models, such as subscriptions or microtransactions, where users don’t need to have ether to execute transactions.
- Customized transaction semantics: Account abstraction opens up possibilities for customizing transaction semantics. Contracts can define their own rules and conditions for executing transactions, enabling more complex and dynamic interactions.

The Rootstock network is innovating in the account abstraction space, here are solutions that can be used for building your dApps with account abstraction capabilities on Rootstock.

## Account Abstraction Solutions on Rootstock 

<CardsGrid>
  <CardsGridItem
    title="Etherspot Prime SDK"
    subtitle="account abstraction"
    color="green"
    description="Etherspot is an Account Abstraction infrastructure designed to help developers create an unparalleled user experience for their blockchain protocols on Ethereum and EVM-compatible chains. It is supported on Mainnet and Testnet."
    linkHref="/dev-tools/account-abstraction/etherspot/"
    linkTitle="Build with Etherspot"
  />
  <CardsGridItem
    title="Reown"
    subtitle="account abstraction"
    color="green"
    description="Reown (prev. known as WalletConnect) provides developers with the tools to build user experiences that make digital ownership effortless, intuitive, and secure."
    linkHref="/dev-tools/account-abstraction/reown/"
    linkTitle="Build with Reown"
  />
</CardsGrid>


