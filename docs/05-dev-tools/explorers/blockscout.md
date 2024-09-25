---
sidebar_position: 4
sidebar_label: Blockscout Explorer
title: Get Started with Rootstock Blockscout Explorer
tags: [rsk, explorer, rootstock, Blockscout, smart contracts, transactions, tools]
---

[Blockscout](https://rootstock.blockscout.com/) is a robust open-source tool for exploring transactions on any EVM blockchain, including Rootstock, the leading Bitcoin sidechain1. With Blockscout, you can access in-depth information, verify and interact with smart contracts, create and manage your account, view advanced statistics, and more.

<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-1.png" alt="Roostock blockscout page"/></div>

To use Blockscout with Rootstock, visit the [Rootstock Block Explorer](https://rootstock.blockscout.com/), where you can see the latest blocks, transactions, and addresses on the Rootstock network.

### Search for specific information
You can look up a specific transaction by entering the wallet address, transaction hash block number, or token in the search bar at the top pane of the Rootstock Blockscout page.
<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-search.png" alt="search section"/></div>

### Overviews
The grids below the search bar show an overview of various components on the Rootstock platform. You can see the total blocks on the network and the total transactions. You can click the respective grid to view the block list or transactions. Likewise, the grids present other details like the average block time, number of wallet addresses, current gas, and total BTC locked in the Rootstock 2-way peg.
<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-grids.png" alt="overview grids"/></div>


### Chart view
By default, the chart below the grids shows a line graph of the Daily transactions. You can switch to see a line graph of RBTC price and market cap by clicking on the buttons, respectively.
<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-charts.png" alt="chart view"/></div>

### Latest transactions/blocks
The next section on the page shows a list of the latest blocks on the network on the left side and a list of the latest transactions on the right, as shown below. You can view the full list of blocks or transactions by clicking "view all blocks" or "view all transactions" at the end of the list.
<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-latests.png" alt="list of latest transactions/blocks"/></div>

### Exploring the blockchain
Aside from the overview on the Rooststock Blockscout main page, you can view other details on the Blockchain by clicking "Blockchain" on the left menu pane and selecting the appropriate options. This includes supported smart contracts on Rootstock, which you can view by selecting the verified contracts option.
<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-explore.png" alt="blockchain menu"/></div>

### Tokens on Rootstock
You can view a list of ERC-20 and ERC-721 tokens on the Rootstock network by clicking on the Tokens from the left menu. You can check the details of each token by clicking on the token name.
<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-tokens.png" alt="list of tokens"/></div>

### Charts and stats
Select the Charts & stats option on the left menu to view various advanced statistics and visual representations of data on the Rootstock platform. These include general blockchain stats, Accounts, Transactions, Blocks, Contracts, Gas, and so on.
<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-tokens.png" alt="charts and blockchain stats"/></div>

### Blockscout API
Blockscout allows you to programmatically query various details from the Rootstock network via the API. You can access the Blockscout API by clicking on the "API" button at the bottom of the page, where you can find documentation and examples of using the API for various purposes.

<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-api.png" alt="api documentation"/></div>

Here's a basic example of how to use Blockscout with Rootstock in Python to get the latest block number:
```python
import requests

response = requests.get("https://rootstock.blockscout.com/api?module=block&action=eth_block_number")
latest_block = int(response.json()['result'], 16)  # Converts hex to integer
print(f"Latest Rootstock Block Number: {latest_block}")
```
This Python script uses the Blockscout API to fetch the latest block number on the Rootstock mainnet. 
**Response:**
```bash
Latest Rootstock Block Number: 6019497
```
You must have Python and the `requests` library installed to run this script.

### Verify and publish smart contracts on Rootstock
You can verify and publish a smart contract on the Rootstock network by clicking **other>>Verify Contract** from the left menu. Then, you supply the contract address and your preferred verification method from the supported contract verification methods list.
<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-verify.png" alt="contract verification form"/></div>

### Blockscout account
To create an account on Blockscout, click on the user icon beside the "Connect Wallet" button at the top right corner and sign in/sign up with your email or GitHub account. After creating or signing in to your Blockscout account, you can access other menu options that allow you to add custom tags to addresses or transactions, create a watch list, create custom ABI, or submit public tags requests to the Rootstock team. You can also access your Blockscout API keys.
<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-account.png" alt="account menu"/></div>


## For additonal information see:
- [Hardhat Documentation](https://docs.blockscout.com)
- [Github Repo](https://github.com/blockscout/blockscout)