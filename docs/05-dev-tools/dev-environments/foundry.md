---
section_position: 2 
sidebar_label: Foundry
title: Foundry on Rootstock
description: 'How to write, test, and deploy smart contracts with Foundry'
tags: [foundry, quick start, developer tools, rsk, rootstock, ethereum, dApps, smart contracts]
---

[Foundry](https://book.getfoundry.sh) is a smart contract development toolchain, and user-friendly development environment for writing and testing smart contracts in Solidity. It manages dependencies, compiles, run tests, deploy contracts and allows for interaction with EVM-compatible chains using a command-line tool called [Forge](https://book.getfoundry.sh/forge/). 

## Why use Foundry?

Forge is ideal for advanced smart contract analysis, auditing, and for fast execution of smart contract tests. 

:::note[hardhat-foundry plugin]

Use the [hardhat-foundry plugin](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-foundry) to have your Foundry project work alongside Hardhat. 

:::

Here are some reason why you may prefer Foundry:

1. Local Networks: 
It provides a local blockchain environment using the [anvil tool](https://book.getfoundry.sh/reference/anvil/), allowing developers to deploy contracts, run tests, and debug code. It can also be used to fork other EVM compatible networks.
 
2. Advanced Testing: 
[Forge](https://book.getfoundry.sh/forge/advanced-testing) comes with a number of advanced testing methods including:
   - Fuzz testing
   - Invariant testing
   - Differential testing
   - Symbolic Execution
   - Mutation Testing

3. Advanced Debugging: 
[Forge](https://book.getfoundry.sh/forge/debugger) allows for advanced debugging using an interactive debugger. 

The debugger terminal is divided into four quadrants:

- Quadrant 1
   - The opcodes in the debugging session, with the current opcode highlighted. Additionally, the address of the current account, the program counter and the accumulated gas usage is also displayed.
- Quadrant 2
   - The current stack, as well as the size of the stack
- Quadrant 3
   - The source view.
- Quadrant 4
   - The current memory of the EVM.
 

### Resources

- [Getting Started with Foundry](/developers/smart-contracts/foundry/)
- [Getting Started with Hardhat](/developers/smart-contracts/hardhat/)
- [Foundry Project Layout](https://book.getfoundry.sh/projects/project-layout)
- [RPC Calls Using Cast](https://book.getfoundry.sh/cast/)
- [Foundry Configurations](https://book.getfoundry.sh/config/)
- [Solidity Scripting](https://book.getfoundry.sh/tutorials/solidity-scripting)
- [Deploy Smart Contracts To Deterministic Addresses](https://book.getfoundry.sh/tutorials/create2-tutorial)