---
sidebar_label: RIF Relay Deployment
sidebar_position: 500
title: RIF Relay Deployment
description: RIF Relay deployment process.
tags: [rif, envelope, relay, integration guide]
---


## Set Up RIF Relay Contracts and Server

### Deploy Contracts

Start by deploying on-chain components. All tools needed are in the [RIF Relay Contract repository](https://github.com/rsksmart/rif-relay-contracts)

#### Regtest

1. Clone the Repository:
  ```bash
    git clone https://github.com/rsksmart/rif-relay-contracts
  ```
2. Navigate to the directory and install dependencies:
  ```bash
    cd rif-relay-contracts
    npm install
  ```
3. Deploy the contract:
  ```bash
    npx hardhat deploy --network regtest
  ```

> This uses the Regtest configuration from `hardhat.config.ts`.

After deployment, you'll see a summary of the deployed contracts. This summary includes the on-chain components essential for RIF Relay, and additional contracts for testing and validation purposes.
    ```text
      ┌───────────────────────────────────────┬──────────────────────────────────────────────┐
      │             (index)                   │                    Values                    │
      ├───────────────────────────────────────┼──────────────────────────────────────────────┤
      │            Penalizer                  │ '0x77045E71a7A2c50903d88e564cD72fab11e82051' │
      │            RelayHub                   │ '0xDA7Ce79725418F4F6E13Bf5F520C89Cec5f6A974' │
      │           SmartWallet                 │ '0x83C5541A6c8D2dBAD642f385d8d06Ca9B6C731ee' │
      │       SmartWalletFactory              │ '0xE0825f57Dd05Ef62FF731c27222A86E104CC4Cad' │
      │         DeployVerifier                │ '0x73ec81da0C72DD112e06c09A6ec03B5544d26F05' │
      │          RelayVerifier                │ '0x03F23ae1917722d5A27a2Ea0Bcc98725a2a2a49a' │
      │        CustomSmartWallet              │ '0x1eD614cd3443EFd9c70F04b6d777aed947A4b0c4' │
      │    CustomSmartWalletFactory           │ '0x5159345aaB821172e795d56274D0f5FDFdC6aBD9' │
      │ CustomSmartWalletDeployVerifier       │ '0x7557fcE0BbFAe81a9508FF469D481f2c72a8B5f3' │
      │ CustomSmartWalletRelayVerifier        │ '0x0e19674ebc2c2B6Df3e7a1417c49b50235c61924' │
      │      NativeHolderSmartWallet          │ '0x4aC9422c7720eF71Cb219B006aB363Ab54BB4183' │
      │    NativeHolderSmartWalletFactory     │ '0xBaDb31cAf5B95edd785446B76219b60fB1f07233' │
      │ NativeHolderSmartWalletDeployVerifier │ '0xAe59e767768c6c25d64619Ee1c498Fd7D83e3c24' │
      │ NativeHolderSmartWalletRelayVerifier  │ '0x5897E84216220663F306676458Afc7bf2A6A3C52' │
      │            UtilToken                  │ '0x1Af2844A588759D0DE58abD568ADD96BB8B3B6D8' │
      │         VersionRegistry               │ '0x8901a2Bbf639bFD21A97004BA4D7aE2BD00B8DA8' │
      └───────────────────────────────────────┴──────────────────────────────────────────────┘
      ```
The deployment summary shows two sets of Smart Wallets, each paired with its verifiers. This is because the verifier is used for both deployment and transaction validation. For testing purposes, the focus will be on using these Smart Wallet Contracts.

#### Testnet
1. Ensure your account is funded. You can get funds from the [tRBTC Faucet](https://faucet.rootstock.io/). Additional faucet options include; [Thirdweb](https://thirdweb.com/rootstock-testnet) and [Blast](https://blastapi.io/faucets/rootstock-testnet) Faucets.
2. Deploy on Testnet:
    ```bash
      npx hardhat deploy --network testnet
    ```
> Remember to configure Testnet in `hardhat.config.ts`. Existing RIF Relay contracts deployed on Testnet can be found in the [contracts section](/developers/integrate/rif-relay/contracts).

#### Mainnet

1. Ensure your account is funded.
2. Deploy on Mainnet:
    ```bash
      npx hardhat deploy --network mainnet
    ```
> Ensure Mainnet is set up in `hardhat.config.ts`. Existing RIF Relay contracts deployed on Mainnet can be found in the [contracts section](/developers/integrate/rif-relay/contracts).

### Revenue Sharing

Revenue Sharing is an optional feature in RIF Relay that can be implemented using collector contracts. You can deploy multiple Collector contracts, but they are not included in the default Relay contract deployment. For detailed information on Collector contracts, refer to the [architecture documentation](/developers/integrate/rif-relay/architecture#collector).

Before deploying a Collector contract ensure the following:
1. Ensure the chosen token for the Collector contract is the same as the one used for transaction fees. 
    > **Note:** You cannot retrieve any other tokens other than the one set during Collector deployment.
2. Select an appropriate owner for the Collector contract. This owner doesn't have to be the deployer but must have the authority to execute the withdraw function, or else the revenue funds will be locked in the contract.
3. Set up partners and their share percentages, ensuring the total adds up to 100%. Incorrectly sent tokens to an inaccessible address without a private key from the beneficiary will be lost. For an example of a structurally valid revenue shares definition see [sample configuration](https://github.com/rsksmart/rif-relay-contracts/blob/master/deploy-collector.input.sample.json).


#### Regtest

To deploy the Collector contract, we'll use the [RIF Relay Contract](https://github.com/rsksmart/).

1. Create a configuration file named `deploy-collector.input.json` with the required structure:
      ```json
          {
            "collectorOwner": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
            "partners": [
                {
                  "beneficiary": "0x7986b3DF570230288501EEa3D890bd66948C9B79",
                  "share": 20
                },
                {
                  "beneficiary": "0x0a3aA774752ec2042c46548456c094A76C7F3a79",
                  "share": 35
                },
                {
                  "beneficiary": "0xCF7CDBbB5F7BA79d3ffe74A0bBA13FC0295F6036",
                  "share": 13
                },
                {
                  "beneficiary": "0x39B12C05E8503356E3a7DF0B7B33efA4c054C409",
                  "share": 32
                }
            ],
            "tokenAddresses": ["0x1Af2844A588759D0DE58abD568ADD96BB8B3B6D8"],
            "remainderAddress": "0xc354D97642FAa06781b76Ffb6786f72cd7746C97"
          }
        ```

> **Note:** The `collectorOwner`, `beneficiaries`, and `remainderAddress` are the first five accounts provided by the node in Regtest.

2. Deploy the contract:
    ```bash
      npx hardhat collector:deploy --network regtest
    ```

The collector is ready and can start receiving fees.

#### Testnet

Using the configuration file you created in the regtest section, run this command to deploy the contract: 
  ```js
    npx hardhat collector:deploy --network testnet
  ```
#### Mainnet

Using the configuration file you created in the regtest section, run this command to deploy the contract: 
```js
  npx hardhat collector:deploy --network mainnet
```

### Allow Tokens

RIF Relay only accepts whitelisted tokens, primarily to ensure only tokens of value to the operator are accepted. To whitelist a token:
Execute the `acceptToken(address token)` function on the Relay Verifiers contracts, which include:
- `SmartWalletDeployVerifier`
- `SmartWalletRelayVerifier`

:::info[Note]
This action must be performed by the contracts' owner, typically the account that conducted the deployment.
:::
  
#### Regtest

In the RIF Relay Contracts, execute this command:

```js
  npx hardhat allow-tokens --network regtest --token-list <TOKEN_ADDRESSES>
```

> `<TOKEN_ADDRESSES>` is a comma-separated list of the token addresses to be allowed on the available verifiers. The `allowTokens` uses the first account (referred to as account[0]) as the owner of the contracts. This is important because only the account owner can allow tokens.

#### Testnet

In the RIF Relay Contracts, execute the command:
  
  ```js
    npx hardhat allow-tokens --network testnet --token-list <TOKEN_ADDRESSES>
  ```

> `<TOKEN_ADDRESSES>` is a comma-separated list of the token addresses to be allowed on the available verifiers. The `allowTokens` script will use the Testnet network configured in the `hardhat.config.ts`, this network will be required to use the account that deployed the contracts.
> You can also modify the allowed tokens for specific verifiers only by using the `--verifier-list` option as follows:
  
```js
  npx hardhat allow-tokens --network testnet --token-list <TOKEN_ADDRESSES> --verifier-list <VERIFIER_ADRESSES>
```

> The `<TOKEN_ADDRESSES>`, `<VERIFIER_ADDRESSES>` is a comma-seperated list of verifier addresses to allow the tokens for.

#### Mainnet

In the RIF Relay Contracts, execute the command:

```js
  npx hardhat allow-tokens --network mainnet --token-list <TOKEN_ADDRESSES>
```

> `<TOKEN_ADDRESSES>` is a comma-separated list of the token addresses to be allowed on the available verifiers. The `allowTokens` script will use the Mainnet network configured in `hardhat.config.ts`, this network will be required to use the account that did the deployment of the contracts.
> You can also modify the allowed tokens for specific verifiers only by using the `--verifier-list` option as follows:

```js
  npx hardhat allow-tokens --network testnet --token-list <TOKEN_ADDRESSES> --verifier-list <VERIFIER_ADRESSES>
```
> The `<TOKEN_ADDRESSES>`, `<VERIFIER_ADDRESSES>` is a comma-seperated list of verifier addresses to allow the tokens for.

:::info[Note]
The network name; regtest, testnet, or mainnet, is an optional parameter that is taken from the hardhat.config.ts file. The network name you specify must be the same as the one used to deploy the contract.
:::

### Run the RIF Relay Server

After setting up on-chain components, the next step is to set up off-chain components, using the [RIF Relay Server](https://github.com/rsksmart/rif-relay-server). 
Configuration of the Relay Server is streamlined using the [node-config](https://www.npmjs.com/package/config) package. For detailed advantages of this package, visit their [wiki](https://github.com/node-config/node-config/wiki).

<b>The TL;DR:</b> In the `config` directory, create a file named `local.json`.
For visual insights into how the Relay Server functions, refer to the diagrams available [here](/developers/integrate/rif-relay/architecture/).
    
#### Regtest
    
Here's a configuration example for setting up the RSKj node locally with the contracts deployed in Regtest:

```json
{
    "app": {
      "url": "http://127.0.0.1",
      "port": 8090,
      "devMode": true,
      "logLevel": 1,
      "workdir": "./enveloping/environment/",
  },
    "blockchain": {
      "rskNodeUrl": "http://127.0.0.1:4444",
    },
    "contracts": {
      "relayHubAddress": "0xDA7Ce79725418F4F6E13Bf5F520C89Cec5f6A974",
      "relayVerifierAddress": "0x03F23ae1917722d5A27a2Ea0Bcc98725a2a2a49a",
      "deployVerifierAddress": "0x73ec81da0C72DD112e06c09A6ec03B5544d26F05"
    }
}
  ```
> **Note:** Relay and Deploy verifiers use the contracts from the Smart Wallet section in the summary.

The meaning of each key can be found in [RIF Relay Server Configuration](https://github.com/rsksmart/rif-relay-server#server-configuration)

To start the server, run the following command:

```js
  npm run start
```

> By default, the server uses the `default.json5` file in the config directory. Depending on the profile in `NODE_ENV`, the values in the `default.json5` file is overriden.

At this point the server should be running and ready to start processing transactions, however, you still need to register the off-chain components in the Relay Hub.

To enable the server for transaction processing, you must register the off-chain components in the Relay Hub. This step requires the server to be active. To register the components, in a different terminal window, execute the following command:

```js
  npm run register
```

The register process performs the following actions:
- Stakes the Relay Manager
- Adds the Relay Worker
- Registers the Relay Server

The server is now ready to start processing transactions and a `ready` message is diplayed on the console. For more details on configuration and registration parameters, refer to the [RIF Relay Server documentation](https://github.com/rsksmart/rif-relay-server#overrides).

#### Testnet

Here's an example configuration file using the off-chain components deployed on the Rootstock Testnet (https://rpc.testnet.rootstock.io/{YOUR_APIKEY}). 

> **Important:** Due to specific modules enabled in the RSKj nodes, the RIF Relay Server cannot connect to the public nodes.            
        
```json
  {
    "app": {
    "url": "https://backend.dev.relay.rifcomputing.net",
    "port": 8090,
    "devMode": true,
    "logLevel": 1,
    "feePercentage": "0",
    "workdir": "/srv/app/environment"
    },
    "blockchain": {
      "rskNodeUrl": "http://172.17.0.1:4444"
    },
    "contracts": {
      "relayHubAddress": "0xAd525463961399793f8716b0D85133ff7503a7C2",
      "relayVerifierAddress": "0xB86c972Ff212838C4c396199B27a0DBe45560df8",
      "deployVerifierAddress": "0xc67f193Bb1D64F13FD49E2da6586a2F417e56b16"
    }
  }
```

> The [contracts](/developers/integrate/rif-relay/contracts/) used in this setup are the primary contracts available on the Rootstock network. These primary contracts, however, do not include support for the `CustomSmartWallet`.            

For details of each configuration key used in setting up the RIF Relay Server, refer to the [RIF Relay Server Configuration](https://github.com/rsksmart/rif-relay-server#server-configuration) documentation.

To start the server, execute the following command:

```js
  npm run start
```
> By default, the server uses the `default.json5` file in the config directory. Depending on the profile in `NODE_ENV`, the values in the `default.json5` file is overriden. Therefore you need to setup the `NODE_ENV` environment to `testnet`.

At this point, the server should be running and ready to start processing transactions; however, you still need to register the off-chain components in the Relay Hub. For the registration process, the Relay Manager and Worker must have funds.           

To get the addresses, this requires the server to be active. In a different terminal window, execute the following command:

```bash
  curl http://<SERVER_URL>/chain-info
```

```json
{
  "relayWorkerAddress": "0xabf898bd73b746298462915ca91623f5630f2462",
  "relayManagerAddress": "0xa71d65cbe28689e9358407f87e0b4481161c7e57",
  "relayHubAddress": "0xe90592939fE8bb6017A8a533264a5894B41aF7d5",
  "feesReceiver": "0x52D107bB12d83EbCBFb4A6Ad0ec866Bb69FdB5Db",
  "minGasPrice": "6000000000",
  "chainId": "31",
  "networkId": "31",
  "ready": false,
  "version": "2.0.1"
}
```

1. Send an arbitrary amount of tRBTC, 0.001 tRBTC for example, to the Worker and Manager.
2. Now execute the register command.

```js
  npm run register
```
        
Here's an example of the `register.json5`

```json
  {
    "register": {
    "stake": "REGISTER_STAKE",
    "funds": "REGISTER_FUNDS",
    "mnemonic": "REGISTER_MNEMONIC",
    "privateKey": "REGISTER_PRIVATE_KEY",
    "hub": "REGISTER_HUB_ADDRESS",
    "gasPrice": "REGISTER_GAS_PRICE",
    "relayUrl": "REGISTER_RELAY_URL",
    "unstakeDelay": "REGISTER_UNSTAKE_DELAY"
    }
  }
```

The register process performs the following actions:
- Stakes the Relay Manager
- Adds the Relay Worker
- Registers the Relay Server

The server is now ready to start processing transactions and a ready message is diplayed on the console. For more details on configuration and registration parameters, refer to the [RIF Relay Server documentation](https://github.com/rsksmart/rif-relay-server#overrides).         

#### Mainnet
- To run RIF Relay Server on the Rootstock Mainnet, the procedure is the same as the one on Testnet, the only difference is the configuration. Configure it to use contracts deployed on Mainnet and an RSKj node connected to Mainnet.
