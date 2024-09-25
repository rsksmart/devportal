---
sidebar_label: The Graph
sidebar_position: 3
title: Get Started with The Graph
description: "Easily query on-chain data through a decentralized network of indexers"
tags: [TheGraph, indexers, data, subgraphs, dApps, smart contracts, developers, developer tools, get-started, how-to]
---

Getting historical data on smart contracts can be challenging when building dApps. [The Graph](https://thegraph.com/) provides an easy way to query smart contracts data through APIs known as [subgraphs](https://thegraph.com/docs/en/developing/developer-faqs/#1-what-is-a-subgraph). Its infrastructure relies on a decentralized network of indexers, enabling dApps to achieve true decentralization.

These subgraphs only take a few minutes to set up and get running.

To get started, follow these steps below:
1. Initialize a subgraph project
2. Deploy & Publish
3. Query from a dApp
   - Querying is a way to access
4. Publish

> Pricing: **All developers receive 100K free queries per month on the decentralized network**. After these free queries, you only pay based on usage at $4 for every 100K queries.

## Getting Started

### Initialize a subgraph project

To initialize a Subgraph project, we need to create a subgraph on [Subgraph Studio](https://thegraph.com/studio/)⁠.

Go to the Subgraph Studio and connect your wallet. Once wallet is connected, begin by clicking “Create a Subgraph”. 

:::info[Info]

Remember to choose a clear and descriptive name for the subgraph since it can’t be edited later. 

It is recommended to use a Title Case: “Subgraph Name Chain Name.”

:::

<center>
    <img src="https://lh7-us.googleusercontent.com/docsz/AD_4nXf8OTdwMxlKQGKzIF_kYR7NPKeh9TmWnZBYxb7ft_YbdOdx_VVtbp6PslN7N1KGUzNpIDCmaXppdrllM1cw_J4L8Na03BXOWzJTK1POCve0nkRjQYgWJ60QHAdtQ4Niy83SMM8m0F0f-N-AJj4PDqDPlA5M?key=fnI6SyFgXU9SZRNX5C5vPQ"  title="Create a Subgraph" width="50%"/>
</center>

On the subgraph’s page, all the CLI commands needed will be visible on the right side of the page:

<center>
    <img src="https://lh7-us.googleusercontent.com/docsz/AD_4nXe3YvCxiOH_LupSWe8zh9AmP-VrV4PlOq3f7Ix6hNlBUYcANUFuLuVIWR74OGiBs0nrugTyT0v3o6RPmTsgHONdv_ZJNWtcDWEkRntXPHlQGFcqmEBa-D6j4aoIPzUKYdOJMVUPu8O3fwjdZ4IaXXZoTzY?key=fnI6SyFgXU9SZRNX5C5vPQ"  title="CLI commands" width="50%"/>
</center>


### Install the Graph CLI⁠

Run the following command locally:

```bash
npm install -g @graphprotocol/graph-cli
```

> You must have at least v0.76.0 to deploy subgraphs on Rootstock mainnet.


### Initialize a Subgraph⁠

This can be copied directly from your subgraph page to include a specific subgraph slug:

```bash
graph init --studio <SUBGRAPH_SLUG>
```

You’ll be prompted to provide some info on your subgraph like this:

<center>
    <img src="https://lh7-us.googleusercontent.com/docsz/AD_4nXdTAUsUb5vbs3GtCrhKhuXM1xYoqqooYTxw6lfJfYtLJNP8GKVOhTPmjxlM1b6Qpx-pXNVOzRuc8BL12wZXqy4MIj8ja0tp15znfuJD_Mg84SSNj3JpQ4d31lNTxPYnpba4UOzZx8pmgOIsbI7vCz70v9gC?key=fnI6SyFgXU9SZRNX5C5vPQ"  title="CLI sample" width="50%"/>
</center>

Once contract is verified on the block explorer, the CLI will automatically obtain the ABI and set up the subgraph. The default settings will generate an entity for each event.

## 2. Deploy & Publish

### Deploy to Subgraph Studio⁠

Run the commands below:

```bash
$ graph codegen
$ graph build
```

To authenticate and deploy your subgraph, run the commands below. You can copy these commands directly from your subgraph’s page in Studio to include a specific deploy key and subgraph slug:

```bash
$ graph auth --studio <DEPLOY_KEY>
$ graph deploy --studio <SUBGRAPH_SLUG>
```

You will be asked to provide a version label (e.g., v0.0.1). You can use any format that works for you.

### Test Subgraph⁠

You can test your subgraph by making a sample query in the playground section. The Details tab will show you an API endpoint. You can use that endpoint to test from your dApp.

<center>
    <img src="https://lh7-us.googleusercontent.com/docsz/AD_4nXf3afwSins8_eO7BceGPN79VvwolDxmFNUnkPk0zAJCaUA-3-UAAjVvrMzwr7q9vNYWdrEUNgm2De2VfQpWauiT87RkFc-cVfoPSsQbYSgsmwhyY1-tpPdv2J1H4JAMq70nfWBhb8PszZBFjsbDAaJ5eto?key=fnI6SyFgXU9SZRNX5C5vPQ"  title="Playground" width="50%"/>
</center>

### Publish Subgraph to The Graph’s Decentralized Network

Once your subgraph is ready to be put into production, you can publish it to the decentralized network. On your subgraph’s page in Subgraph Studio, click on the Publish button:

<center>
    <img src="https://edgeandnode.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fa7d6afae-8784-4b15-a90e-ee8f6ee007ba%2F2f9c4526-123d-4164-8ea8-39959c8babbf%2FUntitled.png?table=block&id=37005371-76b4-4780-b044-040a570e3af6&spaceId=a7d6afae-8784-4b15-a90e-ee8f6ee007ba&width=1420&userId=&cache=v2"  title="publish button" width="50%"/>
</center>

Before you can query your subgraph, Indexers need to begin serving queries on it. In order to streamline this process, you can curate your own subgraph using [GRT](https://thegraph.com/docs/en/billing/#getting-grt).

> When publishing, you’ll see the option to curate your subgraph. As of May 2024, it is recommended that you curate your own subgraph with at least 3,000 GRT to ensure that it is indexed and available for querying as soon as possible.

<center>
    <img src="https://lh7-us.googleusercontent.com/docsz/AD_4nXerUr-IgWjwBZvp9Idvz5hTq8AFB0n_VlXCzyDtUxKaCTANT4gkk-2O77oW-a0ZWOh3hnqQsY7zcSaLeCQin9XU1NTX1RVYOLFX9MuVxBEqcMryqgnGQKx-MbDnOWKuMoLBhgyVWQereg3cdWtCPcTQKFU?key=fnI6SyFgXU9SZRNX5C5vPQ"  title="Publish screen" width="50%"/>
</center>

:::info[Info]

The Graph's smart contracts are all on Arbitrum One, even though your subgraph is indexing data from Rootstock or any other supported chain. 

:::

## 3. Query Subgraph

Congratulations! You can now query your subgraph on the decentralized network!

For any subgraph on the decentralized network, you can start querying it by passing a GraphQL query into the subgraph’s query URL which can be found at the top of its Explorer page.

Here’s an example from the [CryptoPunks Ethereum subgraph](https://thegraph.com/explorer/subgraphs/HdVdERFUe8h61vm2fDyycHgxjsde5PbB832NHgJfZNqK) by Messari:

<center>
    <img src="https://lh7-us.googleusercontent.com/docsz/AD_4nXebivsPOUjPHAa3UVtvxoYTFXaGBao9pQOAJvFK0S7Uv0scfL6TcTVjmNCzT4DgsIloAQyrPTCqHjFPtmjyrzoKkfSeV28FjS32F9-aJJm0ILAHey2gqMr7Seu4IqPz2d__QotsWG3OKv2dEghiD74eypzs?key=fnI6SyFgXU9SZRNX5C5vPQ"  title="Query URL" width="50%"/>
</center>


The query URL for this subgraph is:

* [https://gateway-arbitrum.network.thegraph.com/api/](https://gateway-arbitrum.network.thegraph.com/api/)

* **[api-key]:** `/subgraphs/id/HdVdERFUe8h61vm2fDyycHgxjsde5PbB832NHgJfZNqK`

Now, you need to fill in your own API Key to start sending GraphQL queries to this endpoint.

### Getting your own API Key

<center>
    <img src="https://lh7-us.googleusercontent.com/docsz/AD_4nXdz7H8hSRf2XqrU0jN3p3KbmuptHvQJbhRHOJh67nBfwh8RVnhTsCFDGA_JQUFizyMn7psQO0Vgk6Vy7cKYH47OyTq5PqycB0xxLyF4kSPsT7hYdMv2MEzAo433sJT6VlQbUAzgPnSxKI9a5Tn3ShSzaxI?key=fnI6SyFgXU9SZRNX5C5vPQ"  title="API keys" width="50%"/>
</center>

In the Subgraph Studio, the “API Keys” menu can be accessed from the top of the page. Here, you can create API Keys.

## Appendix

### Sample Query

This query below shows the most expensive CryptoPunks sold.

```graphql
{
  trades(orderBy: priceETH, orderDirection: desc) {
    priceETH
    tokenId
  }
}
```

Passing this into the query URL returns the result below:

```bash
{
  "data": {
    "trades": [
      {
        "priceETH": "124457.067524886018255505",
        "tokenId": "9998"
      },
      {
        "priceETH": "8000",
        "tokenId": "5822"
      },
//      ...
```

> 💡 Trivia: Looking at the top sales on [CryptoPunks website](https://cryptopunks.app/cryptopunks/topsales) it looks like the top sale is Punk **#5822**, not **#9998**. Why? Because they censor the flash-loan sale that happened.

### Sample code

Here's a sample code to use within your subgraph:

```jsx
const axios = require('axios');

const graphqlQuery = `{
  trades(orderBy: priceETH, orderDirection: desc) {
    priceETH
    tokenId
  }
}`;
const queryUrl = 'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/HdVdERFUe8h61vm2fDyycHgxjsde5PbB832NHgJfZNqK'

const graphQLRequest = {
  method: 'post',
  url: queryUrl,
  data: {
    query: graphqlQuery,
  },
};

// Send the GraphQL query
axios(graphQLRequest)
  .then((response) => {
    // Handle the response here
    const data = response.data.data
    console.log(data)

  })
  .catch((error) => {
    // Handle any errors
    console.error(error);
  });
```

## Additional resources

- To explore all the ways you can optimize & customize your subgraph for better performance, read more about [creating a subgraph](https://thegraph.com/docs/en/developing/creating-a-subgraph/).
- Learn more about [querying data from your subgraph](https://thegraph.com/docs/en/querying/querying-the-graph/).
- [Subgraph Studio](https://thegraph.com/studio/)
- [Getting GRT](https://thegraph.com/docs/en/billing/#getting-grt)