---
sidebar_label: Using Alchemy RPC Service
sidebar_position: 700
title: Rootstock - Alchemy RPC Service
description: 'Short guide to interact with the Rootstock network using Alchemy RPC service.'
tags: [rsk, rootstock, tutorials, developers, alchemy, quick starts, dApps, smart contracts, rpc]
---

This guide provides a step-to-step for developers to interact with Rootstock network by using [Alchemy RPC provider service](https://www.alchemy.com/). 

It aims to address the challenges faced by developers when trying to access critical information like logs, transactions, and balances through RPC, which can significantly impact the timely development of dApps on the Rootstock blockchain.

In this guide you will learn:
- How to create an Alchemy project to make your first API call.
- View some options to interact with the node RPC with the Alchemy sdk and tools.


## Prerequisites

Before you start using the Alchemy RPC API to interact with the Rootstock network, make sure you have the following:

- Basic understanding of smart contracts and how to interact with them on the Rootstock blockchain.
- Familiarity with Ethereum-based dApp development can be helpful.
- Development Environment: Ensure you have a development environment set up for interacting with blockchain nodes. 
- Basic Programming Knowledge: Knowledge of JavaScript, Python, or other supported languages to make API calls. And familiarity with making HTTP requests and handling JSON responses.

## Who is it for?
- dApp Developers looking to interact with the Rootstock nodes.

## Features
### Easy Setup:
- Create an API key effortlessly to initiate development.
- Make the First API call in minutes.

### API Key Authentication:
- Provides secure authentication for decentralized applications (dApps).
- Limits API requests on a daily or monthly basis.

## Getting Started

To access the Alchemy dashboard, visit the Alchemy Dashboard Portal.  If you don't already have an account, you can sign up for free.  Otherwise, simply log in to get started.

### Step 1: Create new app
After logging in, you'll be directed to the main dashboard.  From there, you have different options for interacting with Alchemy tools.

![Alchemy - Create New App](/img/developers/quickstart/1-alchemy.png)

Click the option `Create new app`, where you'll be prompted to provide the ***app's name***, ***description***, and specify its intended ***use case***.

- **Name:** This is your app's unique identifier.  Choose a meaningful and descriptive name to help you easily recognize the app in your dashboard.  This name will appear throughout the platform and may be used in API references.
- **Description (Optional):** Provide additional information about the app's purpose or functionality.  While this field is optional, it's a good practice to include a brief description to help you or your team members understand the app's role or features, especially when managing multiple apps.
- **Use Case:** Specify how you plan to use the app.  Alchemy provides options such as ***Defi***, ***Analytics***, ***Gaming***, ***Wallet***, among others.  Choosing the correct use case helps configure the app properly for its intended environment, ensuring it performs optimally for development, testing, or live deployment.

![Alchemy - App Props](/img/developers/quickstart/2-alchemy.png)

### Step 2: Choose chains
After clicking `Next`, you'll be prompted to select the network for your dApp.  In the Search field, type ***Rootstock***, then click on the Rootstock node.  Once selected, click the `Next` button to proceed.

![Alchemy - Choose Chain](/img/developers/quickstart/3-alchemy.png)

### Step 3: Activate Services
The next screen will display the services available for the Rootstock network, including NODE API.  Click on Create app to complete the setup.

![Alchemy - Activate Services](/img/developers/quickstart/4-alchemy.png)

 Your app information will now be visible, similar to the example shown.

![Alchemy - App information](/img/developers/quickstart/5-alchemy.png)

#### Set up Tab:
In the `Setup` tab you will see different options for using the rpc node, depending on the ***method***, ***language*** and ***SDK*** you need to use for it.

By default, the dashboard shows an example for the `get latest block` call on `Javascript` and `viem`.

```javascript
import { createPublicClient, http } from "viem";
import { rootstock } from "viem/chains";

const client = createPublicClient({
  chain: rootstock,
  transport: http("https://rootstock-mainnet.g.alchemy.com/v2/<API_KEY>"),
});

const block = await client.getBlock({
  blockNumber: 123456n,
});

console.log(block);
```

Anyways, you will have different language options available for the rpc call, included CLI (command line interface).

#### Language Options:
- **CLI (Command Line Interface):** No SDK options are available for selection with this choice.
- **JavaScript:** You can choose from ***viem***, ***ethers.js***, or ***fetch*** as your SDK options.
- **TypeScript:** Only the viem SDK option is available for selection.
Python: You can select web3.py as the SDK option.

You can test the CLI option easily in your console by pasting the following code:

```bash
curl -X POST https://rootstock-mainnet.g.alchemy.com/v2/<API_KEY>\
-H "Content-Type: application/json" \
-d '{
  "jsonrpc": "2.0",
  "method": "eth_getBlockByNumber",
  "params": ["latest", false],
  "id": 1
}'
```
And the response should be something like
```json
{"jsonrpc":"2.0","id":1,"result":{"number":"0x67a9c4","hash":"0xe3d0d2b47eb0a06f04cea614355a6ba10935c62596e188e3d27dcafb7ddc746f","parentHash":"0x140a94c77bc08077133d874405252b4463bcbfe500cc7a9e48f4626cdfd91104","sha3Uncles":"0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347","logsBloom":"0x00000000000000000000101000000000000080000040000000000000000000000020400000010000000000000000001000002000000000000008800000000000000000000000000000000000000008000000000000000001000000000000000000000000000000000040000000000000000000000000000000000000020000000001000000000081000000000004000000000000000000000000000020000000000000000200100020000000000000000180000000000080001000020000000000000001000000000000000000008000000030000000000000200000100000000000000000000000002004000880000000000400000000000000200010000200" …
```

#### Metrics Tab
In this tab, you can see the analytics for your app, with the success rates and total requests.

![Alchemy - Metrics Tab](/img/developers/quickstart/6-alchemy.png)

#### Networks Tab
In this tab, you will find the Rootstock card, where you can copy the RPC url you will use in your dApp (mainnet or testnet).

![Alchemy - Networks Tab](/img/developers/quickstart/7-alchemy.png)

#### Settings Tab
In this tab you find different configuration options of your app, like advanced config, allow list, JWT keys, or delete your app from the Alchemy dashboard. 