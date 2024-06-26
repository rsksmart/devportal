---
sidebar_label: Create a Hardhat Project
sidebar_position: 101
title: Create a Hardhat Project
description: "Learn how to set up your environment for development using Hardhat"
tags: [getting-started, guide, smart contracts, rsk, rootstock, hardhat, blockchain]
---

In this section, you will learn how to create a hardhat project and verify hardhat installation. 

## Clone the Project Repository

To get started, clone the [rootstock-quick-start-guide](https://github.com/rsksmart/rootstock-quick-start-guide.git) repository:

```shell
git clone https://github.com/rsksmart/rootstock-quick-start-guide.git
```

## Install Dependencies

Run the following command in the project root.

```shell
  npm install
```

> The quick start repo already comes pre-installed with hardhat. The `master` branch has the intial setup and barebones project and the `feat/complete` branch has the complete state of the hardhat project. You can view the diff in the initial and complete state branches of the repo at any point in time while going through this material. To run the full project, checkout into feat/complete branch, install the dependencies and run the command: `npx http-server`.

### Verify Hardhat Installation

Here, we will verify the installation of hardhat in your project.

[](#top "collapsible")
- To verify hardhat installation:
  - The [quickstart](https://github.com/rsksmart/rootstock-quick-start-guide) repository comes with Hardhat pre-installed. To check if Hardhat is installed, execute `npx hardhat` in the `rootstock-quick-start-guide` directory.
  - `npx hardhat` not only verifies installation but also allows you to initiate a new Hardhat project if it doesn't exist. For a new project, you'll be prompted to choose from several options. To create a blank project, select **Create an empty hardhat.config.js**, or pick one of the other options to begin with a pre-set template.

Once setup is complete, you can verify Hardhat is installed correctly by running `npx hardhat` again. It should display a help message with available tasks, indicating that Hardhat is installed and ready to use.