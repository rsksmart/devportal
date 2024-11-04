---
sidebar_position: 4
sidebar_label: Account Abstraction
title: Account Abstraction on Rootstock
description: "Create smarter accounts that give users a seamless web3 experience" 
tags: [hardhat, quick start, developer tools, rsk, rootstock, ethereum, dApps, smart contracts]
---

Account abstraction refers to the different ways to create and manage accounts, other than using a Secret Recovery Phrase and a wallet. 

It enables the creation of new types of accounts called “contract-type accounts” or simply “accounts”. These accounts can hold both code and ether, and they can execute transactions and smart contract functions. This means that contracts can directly control and manipulate funds, eliminating the need for a separate EOA to initiate transactions.

Simply put;
Regular accounts hold your crypto and need your private key for transactions. Account abstraction lets you create smarter accounts like mini-apps that hold your crypto and can send transactions without needing your key every time.

Some benefits include:
- Enhanced efficiency: By allowing contracts to directly control funds, account abstraction reduces the number of transactions and storage operations required. This leads to improved efficiency and reduces gas costs.
- Improved privacy: Account abstraction enables the creation of more sophisticated smart contracts that can handle transactions privately within the contract itself. It eliminates the need for external transactions, enhancing privacy for users.
- Flexible fee payment models: With account abstraction, contracts can pay transaction fees on behalf of users. This allows for more flexible fee payment models, such as subscriptions or microtransactions, where users don’t need to have ether to execute transactions.
- Customized transaction semantics: Account abstraction opens up possibilities for customizing transaction semantics. Contracts can define their own rules and conditions for executing transactions, enabling more complex and dynamic interactions.

The Rootstock network is innovating in the account abstraction space, here are solutions that can be used for building your dApps with account abstraction capabilities on Rootstock.

<br></br>

<CardsGrid>
  <CardsGridItem
    title="Etherspot Prime SDK"
    subtitle="account abstraction"
    color="green"
    description="Etherspot is an Account Abstraction infrastructure designed to help developers create an unparalleled user experience for their blockchain protocols on Ethereum and EVM-compatible chains."
    linkHref="/dev-tools/account-abstraction/etherspot/"
    linkTitle="Build with Etherspot"
  />
  <!-- <CardsGridItem
    title="Gelato"
    subtitle="account abstraction, mainnet"
    color="green"
    description="Smart Contract-Enabled Accounts on Rootstock."
    linkHref="https://gelato.network/"
    linkTitle="Build with Gelato"
  /> -->
</CardsGrid>


