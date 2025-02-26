---
sidebar_label: Create a Foundry Project
sidebar_position: 101
title: Create a Foundry Project
description: "Learn how to set up your environment for development using Foundry"
tags: [guides, developers, smart contracts, rsk, rootstock, foundry, dApps]
---


In this guide, we will learn about Foundry and its benefits for smart contract development, how to setup your environment, create a Foundry project and execute a deployment script.

## Installation

To install, use Foundryup. Foundryup is the Foundry toolchain installer. You can find more information in the [Foundry README](https://github.com/foundry-rs/foundry/blob/master/foundryup/README.md).

```bash
curl -L https://foundry.paradigm.xyz | bash
```
:::note[Windows Users]
If you’re using Windows, you’ll need to install and use [Git BASH](https://gitforwindows.org/) or [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) as your terminal, since Foundryup currently doesn’t support Powershell or Command Prompt (Cmd).
:::

Running foundryup by itself will install the latest (nightly) precompiled binaries: `forge`, `cast`, `anvil`, and `chisel`.

> Visit the [installation guides](https://book.getfoundry.sh/getting-started/installation) for more information.

## Create a foundry project

To start a new project with Foundry, use [forge init](https://book.getfoundry.sh/reference/forge/forge-init.html).

```bash
forge init hello_foundry
```

> See more details on how to [create a new project](https://book.getfoundry.sh/projects/creating-a-new-project) using the Foundry guide.

