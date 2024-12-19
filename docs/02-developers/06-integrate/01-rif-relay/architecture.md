---
sidebar_label: Architecture
sidebar_position: 980
title: RIF Relay - Architecture
description: RIF Relay Architeture.
tags: [rif, envelope, relay, integrate]
---


The RIF Relay system is designed to achieve transaction sponsorship at a low cost. The cost of the relay service provided by the “sponsors” is agreed upon among the parties off-chain. The low cost of transactions on Rootstock (RSK) contributes to keeping overall service costs low as well.

The RIF Relay system is made up of various components, some of which are essential and others which are auxiliary.

An overview of this is as follows:

**On-chain**, the system cannot work without its Smart Contracts, which encompass Smart Wallets plus the Relay Hub and Verifiers.

**Off-chain**, at least one Relay Server is needed to interact with the contracts. Without a Relay Server, envelopes cannot be created and sent to the contracts.

Details for each of these components are expanded down below, as well as an introductory glossary.

### Glossary

| Term                  | Description                                                                                                                             |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sponsor               | A third party that pays the gas consumed by a sponsored transaction (see below) by submitting it to the blockchain. |
| Sponsored Transaction | A transaction sent by the requester (see below) through the Sponsor, this type of transaction aims to separate the gas payer from the sender of the transaction. |
| Requester             | It’s an EOA (see below). The requester sends a sponsored transaction to the Sponsor. They do not pay the gas with native cryptocurrency but with an accepted token by the Sponsor, if they don’t subsidize it.       |
| Recipient             | An abbreviation for recipient contract. It’s the destination of the requester’s transaction.|
| Envelope              | Using the “envelopes” analogy, it’s the transaction, (funded with native cryptocurrency as gas) sent by the Sponsor to the blockchain, that wraps the requester’s transaction payload (sponsored transaction). |
| RIF Relay            | The entire system which allows the relay of sponsored transactions. |
| DoS                   | A Denial of Service is an information-security threat whose goal is to become a service unavailable.    |
| DeFi                  | An acronym for Decentralized Finance, it’s a novel form for finance based in blockchain technology. |
| EOA                   | An Externally Owned Account (EOA) is an account managed with a key, which is capable of signing and sending transactions, and paying the cost for it.  |
| Fee                   | Token amount that is being charged for each relayed transaction.    |
| Revenue Sharing Model | A way to relay transactions so that fees are shared among multiple partners. |
| Fees Receiver | Is the designated Worker/Collector that will receive the fees |


## On-Chain components

### Relay Hub
The Relay Hub is the main component of the RIF Relay architecture. It acts as an interface with the Relay Server and the whole on-chain architecture. It forwards all the transactions to their respective contracts while checking the validity of the worker that is processing the transaction. 	

It also forms part of the Relay Workers registration process together with the Relay Managers. Furthermore, the Relay Hub keeps the stake amount for each Relay Manager to guarantee good behavior from their workers. 
The account staking for a specific Relay Manager for the first time becomes the owner of the stake, only this account can make subsequent stakes for this specific RelayManager.

When a Relay Manager unauthorized a Relay Hub, it means it is unstaking from it, which also means not being able to relay through that hub any more. Any balance held in the Relay Hub is sent to the original sender of the stake (the owner). 

Unstaking has a predefined delay (in blocks). This is intended to prevent the Relay Manager from unstaking before a slashing that was going to occur.

### Smart Wallet
It’s the “contract-based account” owned by the Requester’s EOA. Before executing any transaction using the smart wallet, the smart wallet contract needs to be deployed. 

Smart Wallet are contracts that verify forwarded data and subsequently invoke the recipient contract of the transaction. Creating smart wallets does not have any gas cost providing the advantage that can be deployed only when necessary. 

It is the component that calls the Recipient contract (i.e, the `msg.sender` address the Recipient will see). During the execution, the contract verifies the Relay Request and, if it’s valid, it calls the defined Recipient’s function, otherwise it reverts the invocation. The verification includes checking that the owner of the SmartWallet made the request, rejecting any request with an invalid signature, and preventing replay attacks using a nonce.

The `smart wallet` was designed to only interact with the RIF Relay system, therefore any native currency balance will be transferred back to the owner of `smart wallet` after each transaction. 

### Native Holder Smart Wallet

The `native holder smart wallet` is a `smart wallet` that was designed to have interactions outside the RIF Relay system. This means that it can hold native currency as it's name describes.

The behavior of the `native holder smart wallet` is the same as the `smart wallet` with the difference that the native currency will not be transferred back to the owner after each transaction and can dispose the usage of the native currency.

### Custom Smart Wallet

The `custom smart wallet` is a `smart wallet` that was designed to execute custom logic after each transaction. The custom logic is created at the moment of the contract deployment and can be executed on each transaction. 

### Relay Manager
An EOA that has a staked balance. Any penalization done against a Relay Worker impacts the Relay Manager’s stake. A Relay Worker can be managed by only one Relay Manager. A Relay Manager can have one or more Relay Workers. The responsibilities of the Relay Manager are: registering the Relay Server and adding Relay Workers, both in the Relay Hub.

### Stake Manager
The Stake Manager supports multiple Relay Hubs, the stakers are the Relay Managers and they can authorize/de-authorize specific Relay Hubs so they can penalize the managers if needed. The staked cryptocurrency is held in the StakeManager contract.

The account staking for a specific Relay Manager for the first time becomes the owner of the stake, only this account can make subsequent stakes for this specific RelayManager.

When a Relay Manager unauthorised a Relay Hub, it means it is unstaking from it, which also means not being able to relay through that hub any more. Any balance held in the Relay Hub is sent to the original sender of the stake (the owner). Also, the workers’ balances are transferred to the stake owner, and, if configured, the Relay Manager’s balance can also be transferred to the stake owner.

Unstaking has a predefined delay (in blocks). This is intended to prevent the Relay Manager from unstaking before a slashing that was going to occur.

### Relay Worker
An EOA that belongs to only one Relay Manager. Since the Relay Worker is the sender of the request, it is the one that pays for the gas fees for each transaction. It **may** also collect the fees in ERC20 that are charged for relaying the transactions.

### Relay & Deploy Verifier
Contracts that authorize a specific relay or deploy request (see the [Relay & Deploy Requests](#relay--deploy-requests) section).

Two example implementations are provided:
  - **Relay Verifier**: The Relay Verifier has a list of tokens that it accepts. When it receives a relay request, it checks the token’s acceptance and the payer’s balance for the token.
  - **Deploy Verifier**: An implementation used in the SmartWallet deployment process. It performs the same relay verifier checks but also makes sure that the SmartWallet to be deployed doesn’t already exist. It also checks that a Proxy Factory address is provided in the Relay Request.

### Collector

The Collector is an optional smart contract used for the Revenue Sharing feature. Normally, relay fees are paid to the worker account which relays the transaction.

Collector contracts are designed to hold revenue generated from relayed transactions so that in the future they can be later given out to partners according to the distribution of shares written in the contract. They are initialized with a specific token to hold, a set of partner addresses (each set with their own share of collected revenues) plus an owner which can modify the shares or execute the withdrawal and distribution of funds. Shares for each partner are expressed in integers representing a percentage and must add up to exactly 100. Any number of partners can be specified.

The owner of the contract can be any address, including but not limited to a multisig contract (see [Gnosis Safe Contracts](https://github.com/gnosis/safe-contracts)). Using a multisig address can be a good idea if ownership of the contract needs to be shared, so that decisions like distributing collected fees to partners or modifying revenue shares can be taken collectively. An ownership transfer function is also available.

Any number of Collector contracts can be deployed and used to share revenue, as long as their addresses are specified in relay requests. The withdrawal of funds from any Collector contract is completely independent of the RIF Relay flow and can be executed at any arbitrary point in time.

For steps on how to deploy a Collector contract (plus other technical details) please see [the Collector section](/developers/integrate/rif-relay/deployment) of the deployment process.

### Proxies

#### Template
It's the logic that would be executed on each transaction. In this specific scenario, it is the Smart Wallet contract. 

#### Proxy Factory
Factory of Proxies to the SmartWallet. The proxy factory is in charge of deploying the smart wallets contracts using the template, during the deployment it executes the initialization from each smart wallet. 

#### Proxy
The proxy is only implemented in the Custom Smart Wallet because it delegates every call to a SmartWallet logic address. This proxy is the one instantiated per SmartWallet, and it will receive the SmartWallet address as Master Copy (MC). So every call made to this proxy will end up executing the logic defined in the MC.

For the transaction execution (`execute()` call), MC logic will do the signature verification and payment. Then it will execute the request, and, if custom logic was defined, it will forward the flow to it before returning.

During the initialization of the Custom Smart Wallet a custom logic can be set (which would impact the proxy’s state of course), the initialization process and set of the custom logic can only be done during the deployment of the smart wallet. 


### GSNEip712Library
This is an auxiliary library that bridges the Relay Request into a call of a Smart Wallet or Proxy Factory (in such case, the Request is a Deploy Request).

Detailed documentation can be found [here](https://eips.ethereum.org/EIPS/eip-712).

## Off-chain components

### Relay Server 
The Relay Server receives sponsored transactions via HTTP.

The server has only one Relay Manager address and at least one Relay Worker, and points to just one Relay Hub.
When the Relay Server receives an HTTP Relay request, it creates an Envelope, wrapping the sponsored transaction, signs it using its Relay Worker account and then sends it to the Relay Hub contract.

The server is a service daemon, running as an HTTP service. It advertises itself (through the Relay Hub) and waits for client requests.

The Relay Server has mechanisms that try to avoid running out of balance in the workers. The Relay Manager keeps sending native cryptocurrency to the workers based on a specific minimum balance.

#### Start Flow

The start flow diagram represents the process that is followed by the Relay Server to start receiving requests, even that the server will be receiving requests doesn't mean that can handle it, since it needs balance to process each request. 
![Relay - Start Flow](/img/rif-relay/start.jpg)

1. Generates(private keys) the Workers and Manager accounts.
2. Initialise the instance for each contract that will be interacting with the server. 
  - The RelayHub contract is the key contract for the start flow since its the contract that have the events of interest.  
3. Initalise the Relay Server.
  -The Relay Server has all logic for the interaction between off-chain and on-chain components.  
4. Initialise the RegistationManager.
  - The Registration Manager starts querying for events related to the registration process(StakeAdded, WorkerAdded) to identify if can register the Server on the RelayHub.
5. The Relay Server start querying for changes on the blochain using the RelayHub.

#### Register Flow

The register flow diagram represents the process to provide the necessary stake/balance to the manager/workers for the Relay Server start processing requests and to register the server in the RelayHub.

![Relay - Register Flow](/img/rif-relay/register.jpg)

1. Gets the Relay Server data.
2. Validate if the server was already register in the RelayHub.
3. Initialise the instance for each contract that will be interacting with the server. 
  - The RelayHub contract is the key contract for the register flow since its the contract that have the events of interest.  
4. Query the stakeInfo for the manager and validates if already staked.
5. Funds the manager if necessary.

### Interval Handler

The interval handler diagram represents the process from the Relay Server to interact with the blockchain and process the transactions.

![Relay - Interval Handler Flow](/img/rif-relay/interval-handler.jpg)

1. Get the latest mined block by the blockachain.
2. Check if the Relay Server state needs to be refreshed based on the blocks minted.
3. Refresh the gas price.
4. Get the past events from the RelayHub.
5. Add the workers and register the Relay Server if meets the requirements.
6. Keep listening for transactions and new events.

### Relay & Deploy Requests
A relay request is the sponsored transaction, the structure used to relay a transaction. It is formed by Relay Data and Forward Request:

- **Relay Data**: All information required to relay the defined Forward Request.
- **Forward/Deploy Request**: It is formed by all the “common” transaction fields in addition to all the token-payment data.

When the Sponsor creates an Envelope (the actual blockchain transaction to submit), it will add this Relay Request (sponsored transaction) as part of the encoded data, along with the contract and method to call (RelayHub and relayCall respectively)

The **Relay request** is structure that wraps the transaction sent by an end-user. It includes data required for relaying the trasaction e.g. address of the payer, address of the original requester, token payment data.

The **Deploy request** structure that wraps the transaction sent to deploy a Smart wallet.

### Tools

### Relay Client
This is a typescript library to interact with the RIF Relay system. It provides APIs to find a relay, and to send transactions through it. It also exposes methods to interact with the blockchain.

It can work as an access point to the Relay system. It creates, signs, and sends the Sponsored transaction, which is signed by the requester and forwarded to the Relay Server via the HTTP protocol.

It is not _strictly_ needed since any dApp or user could relay transactions using merely a Relay Server and the smart contracts, although this is arguably harder to do manually.

### Relay Provider
It's the access point to the RIF Relay system. It wraps the `Relay Client` to provider Ethers.js compatibility. 

## Execution flow

### Relaying (Smart Wallet already deployed)

![Relay - Execution Flow](/img/rif-relay/execution.jpg)

1. A Requester creates a request.
2. A Requester sends the request to the Relay Client (through a Relay Provider).
3. The Relay Client wraps the request into a Relay Request and signs it.
4. The Relay Client sends the Relay Request to the Relay Server (via HTTP Client ↔ HTTP Server).
5. The Relay Server create a transaction including the Relay Request and signs it with a Relay Worker account.
6. The Relay Worker account is an EOA registered in the Relay Hub.
7. The Relay Server sends the transaction to the Relay Hub using the same worker account as the previous step, executing the `relayCall` function of the Relay Hub contract.
    - When the Relay Hub receives a transaction from a Relay Worker, it verifies with the Stake Manager that the Worker’s Relay Manager has indeed locked funds for staking. If not, the execution is reverted.
    - The Relay Worker account must have funds to pay for the consumed gas (RBTC).
        - This verification is done in the Relay Client and in the Relay Server as well, by calling the Relay Verifier. The verifier checks that it accepts the token used to pay and that the payer has a sufficient token balance. In addition, it verifies that the used smart wallet is the correct one. 
8. The RelayHub instructs the Smart Wallet to execute the Relay Request through the [GsnEip712Library](#gsneip712library) library.
9. The Smart Wallet checks the signature and the nonce of the Requester, reverting if it fails the checks.
10. Then, the Smart Wallet performs the token transfer between the Requester and the token recipient, using the data received within the Relay Request.
11. It invokes the recipient contract with the indicated method in the Forward Request.

### Sponsored Smart Wallet deployment

![Relay - Sponsored Smart Wallet](/img/rif-relay/relay.jpg)

The gas-less requester has a SmartWallet address where they receive tokens but don't use them. If the requester needs to call a contract, e.g., to send the tokens to another account, they must deploy a Smart Wallet first.

1. A Requester creates a deploy wallet request.
2. A Requester sends the request to the Relay Server through the Relay Client.
3. The Relay Client wraps the transaction sent by the Requester in a Deploy Request to create the Smart Wallet and signs it.
4. The Relay Client sends to the Relay Server a Deploy Request (via HTTP Client ↔ HTTP Server).
5. The Relay Server signs the transaction containing the Deploy Request, with the Relay Worker account.
6. The Relay Server sends the request to the Relay Hub using the Relay Worker account executing the `relayCall` function of the Relay Hub contract. 
  - Here's where the Relay Server will typically call the Deploy Verifier to ensure:
    - The Verifier accepts the offered tokens.
    - The Proxy Factory instance to use is known by the verifier.
    - The Proxy Factory contract isn’t creating an existing Smart Wallet.
    - The requester has enough tokens to pay.
7. The Relay Hub calls the Proxy Factory using the method `relayedUserSmartWalletCreation`.
8. The Proxy Factory performs the following checks:
    - Checks the sender's nonce.
    - Checks the Deploy Request signature.
9. The Proxy Factory creates the Smart Wallet using the `create2` opcode.
10. Then it calls the `initialize` function in the Smart Wallet contract.
    - The Smart Wallet, during its initialization, executes the token transfer.
    - Then it initializes the Smart Wallet state and sets the requester’s EOA as the owner of the Smart Wallet.
    - In the case there is a custom logic, its initialization is called as well.

## Deprecated

### Paymaster
V0.2 deprecated the Paymaster contracts in favor of the Verifiers (see [versions](/developers/integrate/rif-relay/versions/)).