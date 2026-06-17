---
sidebar_label: Quick Starts
sidebar_position: 4
title: Quick Starts
tags: [rsk, rootstock, beginner, quick starts, developers, advanced, port to rootstock, tutorials]
description: "Quick starts and starter kits to deploy on Rootstock, secured by over 85% of Bitcoin's hash power through merge mining."
---

````mdx-code-block
<Filter
values={[
{label: 'Beginner', value: 'beginner'},
{label: 'Advanced', value: 'advanced'},
{label: 'Hardhat', value: 'hardhat'},
{label: 'CLI', value: 'cli'},
{label: 'Wagmi', value: 'wagmi'},
{label: 'Reown', value: 'reown'},
{label: 'On-chain data', value: 'data'},
{label: 'RPC API', value: 'rpc'},
{label: 'Port to Rootstock', value: 'port-dapps'},
{label: 'Governance', value: 'governance'}
]}>
<FilterItem
    value="beginner, Advanced"
    title="Rootstock - Thirdweb Starter Kit"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/smart-contracts/thirdweb/"
    linkTitle="Use the Kit"
    description="The Rootstock - Thirdweb starter kit aims to facilitate the integration of a marketplace contract using the thirdweb SDK v5 on Rootstock."
  />
<FilterItem
    value="beginner, Advanced"
    title="Rootstock Scaffold Starter Kit"
    subtitle="Demos"
    color="orange"
    linkHref="https://github.com/rsksmart/rsk-scaffold"
    linkTitle="Use the Scaffold"
    description="Rootstock scaffold enables developers to create, debug and deploy smart contracts and build user interfaces that interact with those contracts."
  />
<FilterItem
    value="beginner, Advanced"
    title="Deploy and Interact with Rootstock using the MCP Server"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/mcp/"
    linkTitle="Use the Kit"
    description="Connect AI clients to Rootstock through the MCP Server. Secured by over 85% of Bitcoin's hash power."
  />
<FilterItem
    value="beginner, Advanced"
    title="Deploy Vyper Smart Contracts on Rootstock"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/rootstock-vyper/"
    linkTitle="Use the Kit"
    description="Deploy Vyper smart contracts to Rootstock testnet with Python and Web3.py."
  />
  <FilterItem
    value="beginner, Advanced"
    title="Onboard Users with Privy on Rootstock"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/privy/"
    linkTitle="Use the Kit"
    description="Onboard users with social logins and self-custodial wallets on Rootstock using Privy."
  />
  <FilterItem
    value="dynamic, wagmi, advanced"
    title="Integrate Dynamic Wallets with Wagmi on Rootstock"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/dynamic/"
    linkTitle="Use the Kit"
    description="Integrate Dynamic embedded wallets and Wagmi hooks in a Next.js dApp on Rootstock."
  />
  <FilterItem
    value="beginner, web3auth, advanced"
    title="Build Passwordless dApps with Web3Auth on Rootstock"
    subtitle="web3auth"
    color="orange"
    linkHref="/developers/quickstart/web3auth/"
    linkTitle="Get Started"
    description="Build and deploy passwordless dApps on Rootstock with Web3Auth and Wagmi."
  />
<FilterItem
    value="wagmi, beginner"
    title="Build a dApp with Wagmi on Rootstock"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/wagmi/"
    linkTitle="Use the Kit"
    description="Build a React dApp on Rootstock with Wagmi and Shadcn."
  />
<FilterItem
    value="reown, beginner"
    title="Build a dApp with Reown and Wagmi on Rootstock"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/reown/"
    linkTitle="Use the Kit"
    description="Build a React dApp on Rootstock with Reown, Wagmi, and Shadcn."
  />
<FilterItem
    value="hardhat, beginner"
    title="Deploy Smart Contracts with Hardhat on Rootstock"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/hardhat/"
    linkTitle="Use the Kit"
    description="Deploy and test ERC smart contracts on Rootstock with Hardhat."
  />
<FilterItem
    value="hardhat, beginner"
    title="Deploy Smart Contracts with Hardhat Ignition on Rootstock"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/hardhat-ignition/"
    linkTitle="Use the Kit"
    description="Deploy smart contracts on Rootstock with Hardhat Ignition."
  />
<FilterItem
    value="foundry, sc, beginner"
    title="Deploy Smart Contracts with Foundry on Rootstock"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/foundry/"
    linkTitle="Use the Kit"
    description="Deploy and test smart contracts on Rootstock with Foundry."
  />
<FilterItem
    value="wagmi, sc, advanced"
    title="Deploy Account Abstraction dApps with Etherspot on Rootstock"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/rootstock-etherspot/"
    linkTitle="Use the Kit"
    description="Deploy an Account Abstraction dApp on Rootstock with the Etherspot Prime SDK."
  />
<FilterItem
    value="governance, wagmi, advanced"
    title="Build with the Collective DAO Starter Kit on Rootstock"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/collective/"
    linkTitle="Use the Kit"
    description="Run the Collective sample dApp with staking, proposals, and voting on Rootstock."
  />
<FilterItem
    value="advanced"
    title="dApp Automation with Cucumber"
    subtitle="quickstart"
    color="orange"
    linkHref="/resources/tutorials/dapp-automation-cucumber/"
    linkTitle="Automate dApps"
    description="Learn how to automate dApps using Cucumber Agile Automation Framework."
  />
<FilterItem
    value="advanced"
    title="RIF Relay Starter Kit"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/integrate/rif-relay/sample-dapp/"
    linkTitle="Use Kit"
    description="Starter kit to develop on RIF Relay."
  />
<FilterItem
    value="data, advanced"
    title="Get Started with The Graph"
    subtitle="quickstart"
    color="orange"
    linkHref="/dev-tools/data/thegraph/"
    linkTitle="Get Started"
    description="Easily query on-chain data through a decentralized network of indexers"
  />
<FilterItem
    value="beginner"
    title="Deploy Smart Contracts with Web3.py on Rootstock"
    subtitle="Web3.py"
    color="orange"
    linkHref="/developers/quickstart/web3-python/"
    linkTitle="Get Started"
    description="Deploy and interact with smart contracts on Rootstock using Web3.py."
  />
  <FilterItem
    value="beginner, advanced, port-dapps"
    title="Port an Ethereum dApp to Rootstock"
    subtitle="Port dApps"
    color="orange"
    linkHref="/resources/port-to-rootstock/ethereum-dapp"
    linkTitle="Get Started"
    description="Learn how to port an Ethereum dApp to Rootstock."
  />
  <FilterItem
    value="beginner, advanced"
    title="Compile and Deploy Smart Contracts with Ape on Rootstock"
    subtitle="Ape"
    color="orange"
    linkHref="/developers/quickstart/ape/"
    linkTitle="Use Ape"
    description="Compile, deploy, and interact with smart contracts on Rootstock using the Ape Framework."
  />
  <FilterItem
    value="beginner, rpc"
    title="Get Started with Rootstock RPC API"
    subtitle="RPC API"
    color="orange"
    linkHref="/developers/rpc-api/rootstock/setup/"
    linkTitle="Use the RPC API"
    description="The Rootstock RPC Service provides a seamless and intuitive web interface for developers to interact with Rootstock nodes via JSON-RPC methods."
  />
    <FilterItem
    value="beginner, rpc"
    title="Get Started with Alchemy"
    subtitle="RPC API"
    color="orange"
    linkHref="/developers/rpc-api/alchemy/"
    linkTitle="Use the RPC API"
    description="A step-to-step guide for developers to interact with Rootstock network with the Alchemy RPC Provider Service."
  />
  <FilterItem
    value="cli"
    title="Rootstock CLI"
    subtitle="rsk-cli"
    color="orange"
    linkHref="https://github.com/rsksmart/rsk-cli"
    linkTitle="Use the CLI"
    description="The Rootstock CLI (rsk-cli) tool enables users to manage wallets, check balances, send transactions, verify smart contracts and interact with smart contracts on the Rootstock blockchain - a Bitcoin sidechain designed for smart contracts. It supports both mainnet and testnet environments."
  />
  <FilterItem
    value="cli"
    title="Rootstock GO CLI"
    subtitle="rsk-cli"
    color="orange"
    linkHref="https://github.com/rsksmart/rsk-go-cli"
    linkTitle="Use the CLI"
    description="The Rootstock Go CLI (rsk-cli) tool for interacting with Rootstock blockchain."
  />
</Filter>
````
