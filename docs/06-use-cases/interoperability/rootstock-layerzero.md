---
sidebar_label: Cross Chain Token Transfers
sidebar_position: 100
title: Build Omnichain Fungible Token (OFTs) on Rootstock with Layerzero
tags: [rsk, rootstock, layerzero, omnichain, cross chain, oft, defi on bitcoin, defi]
description: "This tutorial demonstrates implementing cross-chain token transfers using OFT (Omnichain Fungible Token) between Rootstock Testnet and Ethereum Sepolia Testnet via LayerZero's OFT V2 protocol."
---

Rootstock now integrates with LayerZero, a cross-chain messaging protocol. This integration enables the seamless movement of Bitcoin-backed assets from Rootstock to other blockchains, allowing developers to build [omnichain applications (OApps)](https://docs.layerzero.network/v2/developers/evm/oapp/overview) that interact across multiple chains as if they were one. Users can now move their Bitcoin across different DeFi ecosystems without complicated bridges, high fees, or slow transactions.

This tutorial demonstrates how to implement cross-chain token transfers using OFT (Omnichain Fungible Token) between Rootstock Testnet and Ethereum Sepolia Testnet via LayerZero's OFT V2 protocol.

## What you'll learn
- Set up Hardhat for cross-chain deployments
- Deploy an OFT contract for token transfers between chains
- Configure LayerZero endpoints for cross-chain communication
- Execute transfers between Rootstock and Ethereum Sepolia testnets using the crosschain transfer feature.


## Prerequisites
To complete this tutorial, you'll need:
- Node.js: v18.18.0+ 
- RPC Providers ([Rootstock](/developers/rpc-api/rootstock/), [Alchemy](/developers/rpc-api/alchemy/)) 
- Etherscan API Key
    - Sign up to get an [API Key](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics). 
    This will be used for verifying the contracts.
- Metamask: [Install](/dev-tools/wallets/metamask/) and connect to Ethereum Sepolia and Rootstock Testnet
- Test Funds: [Sepolia ETH](https://www.alchemy.com/faucets/ethereum-sepolia) and [Rootstock rBTC](/dev-tools/additional-tools/#faucets)

> Important: Ensure you have sufficient test tokens on both networks.

## Benefits of building cross-chain dApps on Rootstock 

- Simplified Cross-Chain Asset Transfers: Eliminate the need for cumbersome and often risky bridging mechanisms. rBTC and RIF can flow freely between Rootstock and other supported chains.
- Enhanced Capital Efficiency: Lower transaction costs and faster confirmation times, driven by LayerZero and Stargate, optimize capital utilization and improve the user experience.
- Expanded DeFi Accessibility: Unlock Bitcoin's liquidity and security for use across a wide range of DeFi protocols on major chains like Ethereum, Base, Arbitrum, and beyond.
- Unified Liquidity: Aggregate liquidity across multiple chains, creating deeper pools and improving trading efficiency.
- Atomic Transactions: Facilitate secure and reliable cross-chain transactions with LayerZero's guaranteed message delivery.
- Programmable Cross-Chain Logic: Construct complex, multi-chain workflows and applications with LayerZero's flexible messaging framework.

## Use cases for building cross-chain dApps on Rootstock

The integration with Layerzero opens up a vast array of innovative use cases, extending beyond simple asset transfers. 

Developers can now build sophisticated applications that leverage Bitcoin's security and Rootstock's EVM compatibility across multiple chains:

- Decentralized Exchanges (DEXs) with Cross-Chain Liquidity Pools: Build DEXs that aggregate liquidity from various chains, enabling seamless trading of rBTC and other assets.
- Cross-Chain Lending and Borrowing Protocols: Allow users to lend and borrow rBTC and other assets across different chains, maximizing capital utilization.
- Omnichain Governance Systems: Enable decentralized governance models that span multiple chains, allowing token holders to participate in decision-making regardless of their preferred blockchain.
- Cross-Chain Yield Aggregators: Develop yield optimization platforms that automatically allocate rBTC and other assets to the most profitable opportunities across multiple chains.
- NFT Marketplaces with Cross-Chain Interoperability: Create NFT marketplaces that allow users to buy, sell, and transfer NFTs across different chains, leveraging Bitcoin's security.

## Getting started

Clone and cd into the Layerzero Starter Kit project, and run `npm install`.

```shell
git clone https://github.com/rsksmart/rsk-layerzero-xERC20.git
cd rsk-layerzero-xERC20
```

### Set up environment variables

Rename the `.env.example` file to `.env` and update the environment variables with your own values.

```text
MNEMONIC=
 EVM_PRIVATE_KEY=
 RPC_URL_SEPOLIA=
 RPC_URL_ROOTSTOCK_TESTNET=
 ETHERSCAN_API_KEY=
```

> Choose either Mnemonic or the Private Key as your preferred value and set only one. Note to ensure the wallet has ETH and test rBTC. See the prerequisites section.
> By default, the examples support both mnemonic-based and private key-based authentication.
> Setup RPC url’s for Sepolia and Rootstock using [Alchemy](https://www.alchemy.com/chain-connect/endpoints/rpc-sepolia-sepolia) and the [Rootstock RPC API](/developers/rpc-api/).
>  To verify the contracts from the Sepolia explorer, use the [Etherscan API key](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics).
> Note: Do not share these variables with third parties as you risk losing your real assets.

### Configure chains

To configure the kit to deploy to your preferred chains, go to `hardhat.config.ts` file and replace the code below in the networks section.

> Note: For better performance and reliability, use a custom RPC endpoint as suggested in the prerequisites section.

```text
networks: {
    'sepolia-testnet': {
        eid: EndpointId.SEPOLIA_V2_TESTNET,
        url: process.env.RPC_URL_SEPOLIA || 'https://ethereum-sepolia-rpc.publicnode.com',
        accounts,
    },
    'rootstock-testnet': {
        eid: EndpointId.ROOTSTOCK_V2_TESTNET,
        url: process.env.RPC_URL_ROOTSTOCK_TESTNET || 'https://public-node.testnet.rsk.co',
        accounts,
    }
}
```

### Deploying contracts

After adding your `PRIVATE_KEY` to the `.env` file and adding networks in your hardhat.config.ts, run the command to deploy your LayerZero contracts:

```
npx hardhat lz:deploy
```

We will specify the target chains for our OFT deployment. This action will generate a `/deployments` folder containing the necessary deployment assets.

![Set defaults](/img/developers/use-cases/layerzero/1-set-defaults-l0.png)


Use the default networks provided. To select other options, see the instructions above.

![Set defaults](/img/developers/use-cases/layerzero/2-set-defaults-l0.png)

2. Use the default script provided. Press Enter to proceed. 

![Select Scripts](/img/developers/use-cases/layerzero/3-select-script-l0.png)

During this step, the deployer and the token contract address will be requested. Enter y to confirm.

![Token Address](/img/developers/use-cases/layerzero/4-token-address-l0.png)

:::tip[Tip]

Save the deployer address and contract address, as this will be used later in this tutorial to verify the contracts.

:::

## Verifying Contracts

You can verify your contracts by running the following command:

```shell
npx hardhat verify --network <network> <endpoint-address> <deployer address> <contract address> <constructor-arguments>
```

:::info[Info]

Replace `<endpoint-address>` with the LayerZero contract address for the respective network and `<owner-address>` with your deployer address saved earlier. 


:::


For example, to verify the `MyOFT` contract on Rootstock Testnet, you would run:

```shell
npx hardhat verify --network rootstock-testnet 0x5659E38A754C96D20fA4F08Acd9A6Cb5982149C6 "MyOFT" "MOFT" 0x6C7Ab2202C98C4227C5c46f1417D81144DA716Ff 0x5659E38A754C96D20fA4F08Acd9A6Cb5982149C6
```

**Response:**
    
```text
Successfully submitted source code for contract
contracts/MyOFT.sol:MyOFT at 0xa3725eAC59776F075dC5bb02D2997a7feb326595
for verification on the block explorer. Waiting for verification result...

Successfully verified contract MyOFT on Sourcify.
https://repo.sourcify.dev/contracts/full_match/11155111/0xa3725eAC59776F075dC5bb02D2997a7feb326595/
```

    
## Configuring the Omni-chain App (OApp)
    
LayerZero configures and validates communication between smart contracts across different blockchains. This is done by defining a connection pathway that sets the required send and receive libraries, message verification settings ([DVNs and Executors](https://docs.layerzero.network/v2/developers/evm/developer-overview)), and execution parameters (like gas and value limits). These configurations ensure that the contracts can securely and reliably send and receive messages, allowing for seamless cross-chain interoperability.


### Initialize your OApp configurations by running

```shell
npx hardhat lz:oapp:config:init --contract-name MyOFT --oapp-config layerzero.config.ts
```
    
Once the command is executed, you will be prompted to select the chain set up in your `layerzero.config.ts` file. 

Each section contains a config, containing multiple configuration structs for changing how your OApp sends and receives messages, specifically for the chain your OApp is sending from:


### Wiring the OApp

Before initiating token transfers between chains, it's crucial to configure your LayerZero contracts for each unique pathway. Note that LayerZero contracts require distinct configurations for each direction. For example, transferring from Rootstock Testnet to Sepolia involves different settings than transferring from Sepolia to Rootstock Testnet.
    
For a comprehensive list of available configuration commands, refer to the [LayerZero Configuring Contracts](https://docs.layerzero.network/v2/developers/evm/create-lz-oapp/configuring-pathways) documentation.

```shell
npx hardhat lz:oapp:wire --oapp-config layerzero.config.ts
```

This command sets up the necessary connections between your deployed contracts on different chains.

**Response:**

```text
info:    [OApp] ✓ Checked OApp delegates
info:    [OApp] ✓ Checked OApp configuration
info:    There are 10 transactions required to configure the OApp
```
    
**Review the contract**:
    
```
 Endpoint            ROOTSTOCK_V2_TESTNET                                                                                                                                                        │
│ OmniAddress         0x5659E38A754C96D20fA4F08Acd9A6Cb5982149C6                                                                                                                                  │
│ OmniContract        -                                                                                                                                                                           │
│ Function Name       -                                                                                                                                                                           │
│ Function Arguments  -                                                                                                                                                                           │
│ Description         Setting peer for eid 40161 (SEPOLIA_V2_TESTNET) to address 0x000000000000000000000000a3725eac59776f075dc5bb02d2997a7feb326595                                               │
│ Data                0x3400288b0000000000000000000000000000000000000000000000000000000000009ce1000000000000000000000000a3725eac59776f075dc5bb02d2997a7feb326595                                  │
│ Value               -                                                                                                                                                                           │
│ Gas Limit           -                                                                                                                                                                           │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Endpoint            SEPOLIA_V2_TESTNET                                                                                                                                                          │
│ OmniAddress         0xa3725eAC59776F075dC5bb02D2997a7feb326595                                                                                                                                  │
│ OmniContract        -                                                                                                                                                                           │
│ Function Name       -                                                                                                                                                                           │
│ Function Arguments  -                                                                                                                                                                           │
│ Description         Setting peer for eid 40350 (ROOTSTOCK_V2_TESTNET) to address 0x0000000000000000000000005659e38a754c96d20fa4f08acd9a6cb5982149c6                                             │
...
``` 

Once completed, the contracts are now connected, this allows the transfer of tokens from one chain to another.

### Functions

1. `Mint`: A task was created by extending the Hardhat configuration to enable developers to mint Omnichain Fungible Tokens (OFTs) directly from the command line.

```solidity
 /// @notice Mint new tokens. Only the owner can call this.
    function mint(address _to, uint256 _amount) public virtual onlyOwner {
        _mint(_to, _amount);
    }
```
    
This command mints a specific `--amount` of OFT tokens by interacting with a deployed contract (`--contract`) on the configured `--network`. The transaction is signed using the `--private-key`, which authenticates the caller as an authorized caller (Deployer in this case).

```shell
npx hardhat lz:oft:mint \
  --contract 0xYourContractAddress \
  --network rootstock-testnet \
  --amount 10 \
  --private-key $PRIVATE_KEY
```
    
Response:

```text
Network: rootstock-testnet
Wallet address: 0xA0365b08A56c75701415610Bf49B30DbfA285ac4
Recipient: 0xA0365b08A56c75701415610Bf49B30DbfA285ac4
Minting 10 tokens to 0xA0365b08A56c75701415610Bf49B30DbfA285ac4
Transaction hash: 0xf07041ec4af76d0a0f02ab54320595602f6ff3d78db4dc45438c7a434fd9cb32
Transaction confirmed in block 6406847
Successfully minted 10 tokens to 0xA0365b08A56c75701415610Bf49B30DbfA285ac4 
```


2. `Send`: The `lz:oft:send` command is a custom Hardhat task that makes it easy to send tokens across blockchains using LayerZero’s Omnichain Fungible Token (OFT) standard.
    
> It’s not a built-in Hardhat feature; it's added when a project is scaffolded using LayerZero’s development tools. Under the hood, this task interacts with a deployed OFT smart contract to transfer tokens from one blockchain (like Ethereum Sepolia) to another (like Rootstock).

```shell
npx hardhat lz:oft:send \
--contract 0x5659E38A754C96D20fA4F08Acd9A6Cb5982149C6 \
--recipient 0xA0365b08A56c75701415610Bf49B30DbfA285ac4 \
--source rootstock-testnet \
--destination sepolia-testnet \
--amount 1 \
--privatekey $PRIVATE_KEY
```
    
Where;
- `--contract`: Deployed contract address on Rootstock Testnet
- `--recipient`: Deployer address on Rootstock Testnet and Sepolia Testnet.
- `--source`: Source network
- `--destination`: Destination network to send
- `--amount`: Amount to send
- `--privatekey`: Wallet private key
    
**Response**:

```text
Source Network: rootstock-testnet (EID: 40350)
Destination Network: sepolia-testnet (EID: 40161)
Contract: 0x5659E38A754C96D20fA4F08Acd9A6Cb5982149C6
Recipient: 0xA0365b08A56c75701415610Bf49B30DbfA285ac4
Sender address: 0xA0365b08A56c75701415610Bf49B30DbfA285ac4
Amount to send: 1 tokens
Estimating fees...
Estimated fee: 0.000002132285111065 native tokens
Using fee with buffer: 0.00000426457022213 native tokens
Current gas price: 0.035000001 gwei

Sending 1 token(s) from rootstock-testnet to sepolia-testnet...
Transaction hash: 0xe77899b28a43345fae8006ee5ee86210fedc890076cc934302f36b7db7d99345
Waiting for transaction confirmation...
Transaction confirmed in block 6406912

Tokens sent successfully! View on LayerZero Scan: https://layerzeroscan.com/tx/0xe77899b28a43345fae8006ee5ee86210fedc890076cc934302f36b7db7d99345
```

Once the contract is executed, it returns the link to [view on Layerzero scan](https://layerzeroscan.com/tx/0xe77899b28a43345fae8006ee5ee86210fedc890076cc934302f36b7db7d99345), there you can find the transaction details. Note: Transactions on mainnet might take longer times because of the dedicated resources)

To monitor your cross-chain transactions:

- [LayerZero Scan](https://layerzeroscan.com/) - Official LayerZero explorer
- [Rootstock Explorer](https://explorer.testnet.rootstock.io/) - For Rootstock testnet transactions
- [Sepolia Etherscan](https://sepolia.etherscan.io/) - For Ethereum Sepolia transactions

## Troubleshooting
    
Encountered issues?
- Ensure you have sufficient test tokens on both networks
- Verify your RPC endpoints are working correctly
- Check that your contracts are properly configured for cross-chain messaging
- Examine transaction logs for specific error messages
    
## Resources
- [LayerZero Documentation](https://docs.layerzero.network/)
- [OFT Standard Specification](https://docs.layerzero.network/contracts/oft)
- [Rootstock Documentation](https://dev.rootstock.io/)
- [Deployed Endpoints, Message Libraries, and Executors](https://docs.layerzero.network/v2/deployments/deployed-contracts)
- [Move USDRIF to USDC on OKU](/resources/tutorials/oku-rootstock/)