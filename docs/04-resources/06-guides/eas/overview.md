---
sidebar_position: 1
title: How to Run EAS DevTool Locally
sidebar_label: How to Run EAS DevTool Locally
tags: [rsk, rootstock, guides, EAS, Attestation, Ethereum]
description: "This guide explores the challenges of attestation, why EAS is a great choice for developers, and provides a step-by-step tutorial on using the EAS Devtool and Indexing Service on Rootstock."
---

Attestations are fundamental in blockchain technology, allowing entities to establish credibility and trust. However, traditional attestation methods face numerous challenges, including fragmentation, difficulty in managing schemas, and lack of intuitive tools for end-users. 

The **Ethereum Attestation Service (EAS)** aims to solve these issues by providing a streamlined protocol for creating and managing attestations on Rootstock. The EAS Devtool enhances usability, making it easier for developers to interact with attestations.

This guide explores the challenges of attestation, why EAS is a great choice for developers, and provides a step-by-step tutorial on using the EAS Devtool and Indexing Service on Rootstock.

## What is EAS 

[Ethereum Attestation Service (EAS)](https://attest.org/) is a system that allows individuals and organizations to create verifiable claims or proofs about specific events, actions, or data, either on-chain (on the blockchain) or off-chain (outside the blockchain but linked to it). 

These claims can be about anything, like proving someone's identity, verifying ownership, or confirming that an agreement has been fulfilled.

Making these claims or proofs publicly verifiable and tamper-proof helps build trust without relying on centralized entities. The attestations created through EAS can be used in decentralized applications (dApps), identity systems, or smart contracts to ensure certain facts are validated and transparent.

:::info[Info]

[EAS](https://attest.org/) is an open-source platform, meaning anyone can use it or contribute to its development. It operates as a public good for the Ethereum ecosystem. 

:::

## Challenges in Attestation

* **Trust and Credibility:** 

The fundamental challenge of attestation lies in establishing and maintaining trust. While blockchain technologies provide transparency, the credibility of an attestation depends on the reputation and reliability of the attestation source, the verification mechanism behind the attestation, and the potential for manipulation or false attestations.


* **Privacy and Data Protection:** 

Attestations often involve sensitive personal or organizational information, creating critical privacy concerns such as balancing transparency with individual privacy rights, preventing unauthorized access to attestation data, implementing zero-knowledge proof technologies to validate information without exposing raw data, and ensuring compliance with evolving data protection regulations across different jurisdictions.


* **Scalability and Performance:**

As blockchain networks grow, attestation systems face significant technical challenges, including managing high volumes of attestations without compromising network performance, minimizing transaction costs and computational overhead, ensuring fast verification processes, and designing efficient storage and retrieval mechanisms for large-scale attestation networks.

 

## Why Choose the EAS Tool on Rootstock?

* **Centralized Management**

EAS Devtool provides a unified platform to manage, view, and attest schemas, eliminating fragmentation. Developers can easily access all attestations for a project in one dashboard, reducing operational overhead.

* **User-Friendly Interface**

With tools like the EAS React SDK, developers and end-users can interact with attestations through an intuitive interface. A React-based dApp can integrate the EAS React SDK for seamless schema creation, allowing users to attest directly without technical knowledge.

* **Enhanced Efficiency**

The EAS Indexing Service enables fast and reliable data fetching using GraphQL, optimizing performance for high-volume use cases. An NFT marketplace can use the Indexing Service to verify authenticity attestations instantly.



## Prerequisites

Before you begin, ensure you have the following set up:

1. **Docker**: Installed on your system with a basic understanding of how to use it. Docker is essential for running services like the EAS Indexing Service in a containerized environment.  
2. **Node.js**: Installed on your system. Ensure you have Node.js (version 14.x or later) to run the EAS React Tool and related scripts.  
3. **Rootstock RPC API Key**: Obtain a valid API key for Rootstock RPC to connect to the blockchain network. This is crucial for interacting with the EAS contracts deployed on Rootstock.

## Setting Up the EAS Indexing Service

The Indexing Service acts as the backbone of the EAS ecosystem, providing the data infrastructure required for the React Tool to function effectively. Without the Indexing Service, the React Tool cannot fetch, manage, or display attestation data.

Let’s explore why this step is essential and understand what each component does.

### What is the EAS Indexing Service?

The EAS Indexing Service is responsible for:

1. **Indexing Blockchain Data**: It monitors the blockchain and indexes all the attestation-related events. This ensures that attestation data is organized and accessible in real time.  
2. **Providing a Queryable API**: The service exposes a GraphQL API that allows the EAS React Tool to fetch attestation data efficiently.  
3. **Handling Large Data Volumes**: It processes and stores data in a database (e.g., PostgreSQL), enabling rapid data retrieval even for applications with significant usage.
 

:::warning[Warning]

Before you start using the **EAS React Tool** (Devtool), it's crucial to set up and run the **EAS Indexing Service**. 

The EAS Indexing Service enables efficient data fetching for attestations. Here’s how to set it up:

:::

<Steps>
  <Step title="Clone the Repository">
    ```shell
      git clone https://github.com/rsksmart/eas-indexing-service.git
      cd eas-indexing-service
    ```
  </Step>

<Step title="Configure Environment Variables">
    
Create a `.env` file in the root directory with the following content:

```text
  DATABASE_URL=postgresql://user:password@localhost:5432/eas-sepolia
  INFURA_API_KEY=
  INFURA_IPFS_USER=
  INFURA_IPFS_PASS=
  ALCHEMY_ARBITRUM_API_KEY=
  ALCHEMY_SEPOLIA_API_KEY=
  ALCHEMY_OPTIMISM_GOERLI_API_KEY=
  ROOTSTOCK_TESTNET_API_KEY=
  BATCH_SIZE= # How many blocks to fetch at once (some providers have limits)

  # Rootstock Tesnet
  CHAIN_ID=31
```


:::info[Explanation of Each Variable:]

1. `DATABASE_URL`:  
   * Specifies the connection details for your PostgreSQL database.  
   * Example format: `postgresql://\<username\>:\<password\>@\<host\>:\<port\>/\<database-name\>`  
   * In this example:  
     * **Username**: user  
     * **Password**: password  
     * **Host**: localhost  
     * **Port**: 5432  
     * **Database Name**: eas-sepolia  
2. `INFURA_API_KEY`:  
   * API key for Infura, a blockchain infrastructure provider.  
   * Used for accessing Ethereum and IPFS (InterPlanetary File System) services.  
   * **Note:** Follow this guide to obtain your [API keys](https://docs.metamask.io/services/get-started/infura/#:~:text=View%20your%20API%20key%E2%80%8B&text=Infura%20automatically%20generates%20the%20My,can%20view%20your%20API%20key.).  
3. `INFURA_IPFS_USER and INFURA_IPFS_PASS`:  
   * Authentication credentials for accessing Infura’s IPFS gateway.  
   **Note**: Replace these values with your credentials to ensure secure access.  
4. `ALCHEMY_*_API_KEY`:  
   * API keys for Alchemy, another blockchain infrastructure provider.  
   * These keys allow you to interact with various Ethereum testnets (`Arbitrum, Sepolia, Optimism Goerli`).  
   * **Note:**  Follow this guide to obtain your [API keys](https://www.alchemy.com/support/how-to-create-a-new-alchemy-api-key).  
5. `ROOTSTOCK_TESTNET_API_KEY`:  
   * API key for connecting to the Rootstock Testnet.  
   * This enables interactions with the Rootstock blockchain for testing and indexing.  
   * **Note:** Follow this guide to obtain your [API keys](https://dev.rootstock.io/developers/rpc-api/rootstock/setup/).  
6. `BATCH_SIZE`:  
   * Defines the number of blocks fetched in a single request when syncing data from the blockchain.  
   * Adjust this value based on your service provider's rate limits or API constraints.  
7. `CHAIN\_ID`:  
   * Identifies the blockchain network.  
   * In this case:  
     * `31` corresponds to the Rootstock Testnet.

:::
</Step>
  
<Step title="Install Dependencies">
    The `yarn install` command is used to download and set up all the necessary packages and dependencies required for the EAS Indexing Service to function properly. 

These dependencies are listed in the project's package.json file and are essential for the service's operation.

  ```shell
  yarn install
  ```
  </Step>
   <Step title="Set Up Prisma">
    
Prisma is used to define the database schema and generate client-side code that interacts with the database.

The generated Prisma client is essential for the Indexing Service to communicate with the database. Without it:

* The Indexing Service won't be able to store or retrieve indexed attestation data.  
* You may encounter runtime errors when the service tries to perform database operations.

```text
  SKIP_PRISMA_VERSION_CHECK=true npx prisma generate
```

:::info[Breakdown of the Command]

1. `SKIP_PRISMA_VERSION_CHECK=true`:  
   * This environment variable is set to bypass Prisma's version compatibility check.  
   * **Why?**: The project uses the `typegraphql-prisma package`, which sometimes lags in supporting the latest Prisma versions. Without skipping the version check, you might encounter warnings or errors if there is a version mismatch between Prisma and its dependencies.  
2. `npx prisma generate`:  
   * This command generates the Prisma client based on the schema defined in the `prisma/schema.prisma` file.  
   * **What does it do?**  
     * Parses the database schema described in the `schema.prisma` file.  
     * Generates the client code for database interactions.  
     * The generated client provides methods for querying and modifying the database, enabling seamless integration with the EAS Indexing Service.

:::

:::warning[Warning]

Start Docker Before Running `docker-compose`

Before executing the `docker-compose up -d` command, ensure Docker is running on your system. You can do this by:

1. **Using the Command Line**:  
   * Start Docker manually by running the appropriate command for your operating system:  
     * **Windows/Linux/macOS**:

If Docker is installed as a service, you may need to start it using:

```shell
  sudo systemctl start docker
```

Or simply run Docker Desktop.

2. **Using Docker Desktop**:  
   * Open the Docker Desktop application if installed.  
   * Ensure that it is running and ready. The status should show that Docker is operational, and the engine is active.

<figure>
<img src="/img/guides/EAS/engine-running.png" alt="Docker Engine Running"/>
  <figcaption>Docker Engine Running"  (fig 1.)</figcaption>
</figure>

You can find this at the bottom left of your screen
:::
  </Step>
   <Step title="Start Docker Services">
    The `docker-compose up -d` command is used to start the Docker services required by the EAS Indexing Service. This step launches and runs all the containerized components defined in the `docker-compose.yml` file, setting up the necessary environment for the indexing service to function.

```
docker-compose up -d
```
:::info[Breakdown of the Command]

1. `docker-compose`:  
   * This is a command-line tool for managing multi-container Docker applications.  
   * It uses the `docker-compose.yml` file to define and manage the services, networks, and volumes required by your application.  
2. `up`:  
   * This subcommand builds (if necessary) and starts all the containers specified in the `docker-compose.yml` file.  
   * It ensures all services, such as the database (`PostgreSQL`) and any related dependencies, are running.  
3. `-d`:  
   * This flag runs the services in detached mode, meaning they will continue running in the background.  
   * This allows you to close the terminal session or continue working on other tasks without stopping the containers.
:::

Expected output:

```shell
 ✔ Network eas-indexing-service_default  Created                                                                                                 0.0s 
 ✔ Container eas-postgres                Started                                                                                                 0.5s 
 ✔ Container eas_indexer_container       Started    
```

If you modify project files, rebuild Docker containers:

```shell
docker-compose build
docker-compose up -d
```

Expected output:

If everything is set up correctly, you should see a similar output when you check the logs of your `eas_indexer_container`

<figure>
<img src="/img/guides/EAS/eas-indexer-contianer.png" alt="EAS Indexer Container Running Successfully"/>
  <figcaption>EAS Indexer Container Running Successfully  (fig 2.)</figcaption>
</figure>

  </Step>
</Steps>


## Setting Up the EAS Devtool

The EAS React Tool is a user-facing platform that leverages the data provided by the Indexing Service to:

1. **Display Attestations**: It visualizes schemas and attestation data in an intuitive interface.  
2. **Allow User Interaction**: Users can create schemas and make attestations through this tool.  
3. **Streamline Workflow**: Developers can interact with attestation data without manually querying the blockchain or API.

<Steps>
  <Step title="Clone the Repository">
    ```
git clone https://github.com/rsksmart/EAS-devtool.git
cd EAS-devtool
```
</Step>

<Step title="Install Dependencies">
    The `yarn install/npm install` command is used to download and set up all the necessary packages and dependencies required for the EAS Devtool to function properly. 

These dependencies are listed in the project's `package.json` file and are essential for the service's operation.

```shell
  npm install
  # or
  yarn install
```
</Step>
  
<Step title="Run the Devtool">
    ```shell
      npm run dev
      # or
      yarn dev
    ```

This launches the EAS Devtool, allowing you to manage and view attestations in a centralized platform.

Expected output:

<figure>
<img src="/img/guides/EAS/EAS-devtool-dash.png" alt="EAS Dashboard on DevTool"/>
  <figcaption>EAS Dashboard on DevTool  (fig 3.)</figcaption>
</figure>

</Step>
</Steps>


:::info[Info]

Once you've set up and run the `EAS DevTool` locally, you can proceed to explore its **[dashboard](/resources/guides/eas/user-guide/)** and functionality in detail. The following guide will walk you through navigating the `EAS Dashboard`, connecting your `wallet`, and managing `schemas` and `attestations`.

:::