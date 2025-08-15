---
sidebar_label: Deploy an NFT Marketplace Contract
sidebar_position: 102
title: Deploy an NFT Marketplace Contract on Rootstock with Thirdweb
description: 'How to deploy an NFT marketplace contract with Thirdweb'
tags: [rsk, thirdweb, developers, developer tools, rootstock, sdk, dApps, smart contracts]
---

There's been massive growth in tokenization, from digital art and collectibles to real-world assets and utility tokens. This shift lets creators, brands, and developers build new value and ownership models on the blockchain.

[Thirdweb’s NFT marketplace](https://portal.thirdweb.com/) provides a flexible and customizable platform, enabling users to create, trade, and interact with NFTs and other tokenized assets on Rootstock. 

Whether you're just setting up a simple digital shop or trying to build dApps, using Thirdweb gives you a solid starting point to build and deploy dApps on Rootstock.

In this two-part guide, you will learn how to: 

- Build and deploy an NFT marketplace contract with Thirdweb on the Rootstock Testnet 
- [Set up the smart contract which is the foundation for the marketplace](/developers/smart-contracts/thirdweb/deploy-marketplace-contracts)
- Install the [direct listing extension using the Thirdweb SDK](#install-the-direct-listing-extension-using-thirdweb-sdk)
- [Develop the frontend for Your NFT Marketplace](/developers/smart-contracts/thirdweb/nft-marketplace-frontend) 

## Prerequisites

Ensure to have the following:
- Node.js installed (v18 or later)
- A wallet like MetaMask set up for the Rootstock testnet ([Thirdweb’s social login](https://portal.thirdweb.com/connect/wallet/sign-in-methods/configure) could be also used).
- Testnet rBTC (Get it from the [Rootstock faucet](https://faucet.rootstock.io/))
- [Thirdweb credentials](https://thirdweb.com/login)


## Setup

1. Clone the project template - It comes with a Next.js 14 app and [Thirdweb SDK v5](https://portal.thirdweb.com/changelog/connect-sdk-v5-official-release), already set up with everything you need to get started.

```sh
git clone https://github.com/rsksmart/rsk-thirdweb-marketplace.git
cd rsk-thirdweb-marketplace
bun install
```

2. Navigate to the project folder and install the dependencies. It is recommended to use `bun i`. Note: You can also use `yarn` or `pnpm` package managers. Rename the file `.env.example` to `.env.local` using `mv .env.example .env.local` and follow the guide below to replace the needed variables.

```sh
NEXT_PUBLIC_CLIENT_ID=<CLIENT_ID_FROM_THIRD_WEB>
NEXT_PUBLIC_MARKETPLACE_CONTRACT=<CONTRACT_ADDRESS>
PRIVATE_KEY=<YOUR_PRIVATE_KEY>
```

To get the client ID, navigate to [Thirdweb's dashboard](https://thirdweb.com/login), log in using your preferred method and create a new project. 

![Thirdweb - Create Project](/img/developers/smart-contracts/thirdweb/01-create-project.png)

For this guide, click checkbox to choose all domains (`*`). Note: If pushing  to production, set your project as the official domain in settings.

![Thirdweb - Web Access](/img/developers/smart-contracts/thirdweb/02-web-access.png)

A warning pop up would appear because all domains are allowed,  that’s expected for now, click proceed.

![Thirdweb - Warning Popup Marketplace Guide](/img/developers/smart-contracts/thirdweb/03-warning-marketplace-guide.png)

Copy the client ID,  replace in the `.env` file. You’ll also receive a secret key - this won’t be needed for this guide.

3. Start development server:

```sh
bun run dev
```

4. Access the application: Open http://localhost:3000 in your browser.

## Getting Started

The NFT Marketplace consists of two main processes:

- Buy an NFT: Users can buy NFTs connecting their wallets. Once the users sign the buy transaction and pay for the NFT and gas costs, they own the NFT.
- Sell an NFT: Users can list their NFTs and establish the price they want for them individually. To list an NFT, they must specified the address of the ERC1155 NFT representation on the Rootstock (RSK) network, the token ID and the price.

### Deploying the Marketplace contract

This marketplace smart contract serves as the backbone of your NFT marketplace, allowing users to list, buy, and manage NFTs directly on-chain. In this section, we will deploy the marketplace contract. Once deployed, we can use the deployed contract address to complete the configurations for the environment variables in `.env.local`.

![Thirdweb - Contracts Overview](/img/developers/smart-contracts/thirdweb/04-contracts-overview.png)

On [Thirdweb’s dashboard](https://thirdweb.com/login), within the new project created, navigate to the Contracts section on the left panel and click on "Discover Contracts" or the "Deploy Contracts" to get started to view the contracts.

![Thirdweb - Explore Contracts](/img/developers/smart-contracts/thirdweb/05-explore-contracts.png)

In the [prebuilt contracts explorer](https://thirdweb.com/explore), select [Marketplace V3](https://thirdweb.com/thirdweb.eth/MarketplaceV3) and navigate to the contract page to continue the setup. Click **Deploy Now**.

![Thirdweb - Marketplacev3 Contracts](/img/developers/smart-contracts/thirdweb/06-marketplace-v3-contract.png)

Choose version `6.0.0` of the contract in the dropdown, a plain version of Marketplace V3 without built in extensions. Keeping us within Rootstock's 6.8 million gas limit. It works just like the latest version, and we will add extensions like Direct Listings later using the SDK.

![Thirdweb - Marketplacev3 Contract Metadata](/img/developers/smart-contracts/thirdweb/07-marketplace-v3-metadata.png)

We’ll set up a basic contract with a name, symbol, image, and description.

![Thirdweb - Metadata Setup](/img/developers/smart-contracts/thirdweb/08-metadata-setup.png)

Ensure to select your project and choose Rootstock Testnet as the chain, click deploy, and confirm all the transactions in your wallet.

![Thirdweb - Deploy status](/img/developers/smart-contracts/thirdweb/09-deploy-status.png)

Once the contract is deployed, click to view the contract and copy the address from the Thirdweb’s dashboard. Copy the contract address at the top of the page and add it to the `.env.local` file. Also replace the private key you have used to login into Thirdweb’s app or the one provided in the social login at (`wallet > manage wallet > Export private key`).

#### Install the Direct Listing Extension using Thirdweb SDK

The direct listing feature allows users to list their NFTs for a set period of time, and it comes with a few extra options you can tweak later. For now, we’ll install the extension on the marketplace contract.

You can find the script for this in the cloned repository: `./addDirectListing.ts`.

```sh
import {
  defineChain,
  getContract,
  sendTransaction
} from "thirdweb";
import { installPublishedExtension } from "thirdweb/extensions/dynamic-contracts";
import { privateKeyToAccount } from "thirdweb/wallets";
import client from "./lib/client";


const privateKey = process.env.PRIVATE_KEY;
const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT;

if (!privateKey || !marketplaceAddress) {
  throw new Error("Check your .env");
}

const account = privateKeyToAccount({
  client,
  privateKey,
});


const rootstockTestnet = defineChain(31); // Rootstock Testnet (Chain ID 31)

const marketContract = getContract({
  client,
  chain: rootstockTestnet,
  address: marketplaceAddress.toLowerCase(),
});

// Create the transaction
const transaction = installPublishedExtension({
  account,
  contract: marketContract,
  extensionName: "DirectListingsLogic",
});

// Send the transaction
sendTransaction({ transaction, account }).then((tx) => {
  console.log(tx);
});
```

We’ll use Bun to run the Typescript file:

Copy and paste the code below in the terminal on the Rootstock marketplace project:

```sh
bun run ./addDirectListing.ts
```

:::tip[Tip]

Once installed, you won’t need to deploy it again, this means you can safely remove your private key from the environment variables if it was only used for this one time setup.

:::

If everything’s set up correctly, you’ll get a transaction hash in the console once the extension is successfully installed on your marketplace contract or on Thirdweb dashboard Latest Events

![Thirdweb - Extension Added](/img/developers/smart-contracts/thirdweb/10-extension-added.png)

## Troubleshooting

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">MetaMask - RPC Error: JsonRpcEngine: Response has no error or result for request</Accordion.Header>
    <Accordion.Body>
      ```
      MetaMask - RPC Error: JsonRpcEngine: Response has no error or result for request:
        {
        "id": 8871128006200483,
        "jsonrpc": "2.0",
        "method": "eth_sendRawTransaction",
        "params": [
            "0xf9842b378401b580a08367c280944e59b44847b379578588920ca78fbf26c0b4956c80b983c5bb1731d56b3a25eff906f1aad67c00c4ba9c43dd33731f263b7d50ce37f20b6960e06040523480156200001157600080fd5b506040516200694538038062006945833981016040819052620000349162000914565b60208101518151805160009015620000815762000051826200019a565b6200007e8260405160200162000068919062000b88565b60408051601f1981840
      ```

      **Possible Fix:**
        - Ensure to choose the correct version (`6.0.0`) specified for this guide before deploying the contract.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

## What’s Next?

That’s it for setting up the foundation! In [Part 2](/developers/smart-contracts/thirdweb/nft-marketplace-frontend), we’ll explore in depth how to create listings and customize settings like price, currency, and duration. We’ll also learn how to connect the frontend using Thirdweb’s SDK and React hooks. With your contracts in place and direct listings installed, you’re now one step closer to launching your own NFT marketplace on Rootstock.

## Resources
- [Thirdweb Marketplace V3: Thirdweb Documentation](https://thirdweb.com/thirdweb.eth/MarketplaceV3)
- [Thirdweb TS SDK: Thirdweb Github](https://github.com/thirdweb-dev/js/tree/main#readme)
- [Rootstock NFT Marketplace Starter Kit](https://github.com/rsksmart/rsk-thirdweb-marketplace)