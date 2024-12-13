---
sidebar_position: 300
title: Build and Deploy a Governance Voting Dashboard on Rootstock
sidebar_label: Build and Deploy a Governance Voting Dashboard on Rootstock
tags: [Governance Voting Dashboard, rootstock, tutorials, rsk, ERC20, blockchain, defi]
description: "This project is a Governance Voting Dashboard built on the Rootstock blockchain. It allows users to create and vote for teams using governance tokens (ERC20 tokens)."
---

This project is a **Governance Voting Dashboard** built on the **Rootstock blockchain**. It allows users to create and vote for teams using governance tokens [ERC20 tokens](/concepts/glossary/#e). 

The voting is managed by a smart contract, making it decentralized and transparent. Each team has a unique name, a governance token, and a leader, and users can vote by transferring tokens to their preferred teams.

The dashboard is designed for token-based voting, where votes are reflected in a team's score. Higher scores indicate more community support for that team.

## Prerequisites

Before you begin your journey into deploying smart contracts on the Rootstock blockchain, ensure you have the following essential tools set up:

-  **Node.js**

You will need Node.js installed on your machine to run the project locally. [Download](https://nodejs.org/en/download/package-manager) the latest LTS version, which is recommended for most users.

- **Web3 Wallet (Metamask)**

A Web3 wallet is required for signing transactions and interacting with the Rootstock network. This wallet will enable you to manage your cryptocurrencies and deploy your smart contracts securely.

## Features

1. **Create Teams**  
   Users can establish teams by providing:  
   * A team name  
   * A meme token address (used for team identity)  
   * A team leader address  
2. **Vote for Teams**  
   Users cast votes for their preferred teams using governance tokens.  
3. **Token Balance Tracking**  
   The system monitors each team leader's balance of governance tokens.  
4. **Smart Contracts Integration**  
   The project integrates smart contracts to handle team creation, voting, and token transactions.  
5. **ERC20 Governance**  
   Votes are cast using ERC20 tokens, ensuring decentralized governance.

## Core Smart Contract: TeamsManager

The `TeamsManager` contract, written in Solidity, is the foundation of the voting system. It manages team creation, voting, and score tracking, and enforces administrative controls. 
  

:::info[Key functions:]

* **`vote(teamName, transferAmount)`**  
  Allows users to vote for a team by transferring governance tokens. teamName specifies the team to receive the vote, and transferAmount is the token amount to transfer.  

  ```
  function vote(string memory teamName, uint256 transferAmount) public nonReentrant { 
    require(bytes(_teams[teamName].teamName).length > 0, "Unknown team");
    require(keccak256(abi.encodePacked(_teamLeaders[msg.sender])) != keccak256(abi.encodePacked(teamName)), "Cannot vote for own team");

    _teams[teamName].score += transferAmount;

    bool success = _votingTokenContract.transferFrom(msg.sender, address(this), transferAmount);
    require(success, "Token transfer failed");
   }
  ```

* **`getTeamNames()`**  
  Returns a list of all teams registered in the contract.  
```
function getTeamNames() external view returns(string[] memory) {
    return _teamNames;
  }
 ```

* **`getTeamInfo(teamName)`**  
  Provides detailed information on a specified team.  
```
 function getTeamInfo(string memory teamName) public view returns(TeamInfo memory) {
    return _teams[teamName];
  }
```

* **`getScore(teamName)`**  
  Retrieves the current vote score for a team.  
```
 function getScore(string memory teamName) public view returns(uint256) {
    return _teams[teamName].score;
  }
  ```

* **`addTeam(teamName, memeTokenAddress, teamLeaderAddress)`**  
  Allows administrators to add a new team, specifying the team's name, meme token address, and leader address.  
```
function addTeam(string memory teamName, address memeTokenAddress, address teamLeaderAddress) public {
    require(bytes(_teams[teamName].teamName).length == 0, "Team already added");
    require(bytes(_teamLeaders[teamLeaderAddress]).length == 0, "Leader already assigned to a team");

    IERC20 memeTokenContract = IERC20(memeTokenAddress);
    string memory memeTokenName = memeTokenContract.name();
    string memory memeTokenUri = memeTokenContract.getUri();

    _teamNames.push(teamName);
    _teamLeaders[teamLeaderAddress] = teamName;
    _teams[teamName] = TeamInfo(teamName, memeTokenName, memeTokenUri, memeTokenAddress, teamLeaderAddress, 0);
  }
```

* **`setReadyToVote()`**  
  Marks the contract as ready for voting. Only administrators can call this function.  
  ```
  function setReadyToVote() public onlyAdmins {
    _readyToVote = true;
  }
  ```

* **`reset()`**  
  Resets the contract's voting state and clears team data. Only administrators can execute this.
  ```
    function reset() public onlyAdmins {
    for (uint256 i; i < _teamNames.length; i++) {
      _readyToVote = false;
      _teamLeaders[_teams[_teamNames[i]].teamLeaderAddress] = "";
      _teams[_teamNames[i]] = TeamInfo("", "", "", address(0), address(0), 0);
    }
    _teamNames = [""];
  }
  ```
:::



## **Getting Started**

<Steps>
  <Step title="Clone the Repository">
     Clone the project repository to your local machine:

```
git clone https://github.com/rsksmart/rootstock-dynamic.git
```
  </Step>
  <Step title="Install Dependencies">
    
Navigate to the project directory and install dependencies with:

```
npm install
```
  </Step>
  <Step title="Set Up Environment Variables">
   

Create a .env file in the project root directory and populate it with the required environment variables as listed above.

### Environment Variables

Set the following environment variables in your .env file to ensure the project functions correctly:

#### **1. NEXT_PUBLIC_TEAM_MANAGER_ADDRESS**

This is the address of the TeamsManager smart contract that will be deployed to the Rootstock network. It manages the voting and team data.

<figure>
<img src="/img/resources/tutorials/governance-dashaboard/NEXT_PUBLIC_TEAM_MANAGER_ADDRESS.png" alt="NEXT_PUBLIC_TEAM_MANAGER_ADDRESS"/>
  <figcaption>NEXT_PUBLIC_TEAM_MANAGER_ADDRESS (fig 1.)</figcaption>
</figure>

:::note

If you’re new to deploying contracts on Remix, check out this [tutorial](https://dev.rootstock.io/developers/quickstart/remix/) for more detailed steps.

:::

* **How to get it**:  
  * Deploy the TeamsManager.sol contract to the Rootstock network using RemixIDE, a popular tool for writing and deploying smart contracts.   
  * Once deployed, you’ll find the contract’s address in the Remix’s console. Copy this address.  
  * Paste this address into your .env file as shown below:

```
NEXT_PUBLIC_TEAM_MANAGER_ADDRESS=<Your_Team_Manager_Contract_Address>
```

#### **2. NEXT_PUBLIC_RPC_URL**

This is the RPC (Remote Procedure Call) URL that allows an application to interact with the Rootstock blockchain. An RPC URL is essentially a link to the blockchain network.

:::tip[Tip]

If you’re unsure how to navigate the Rootstock RPC Dashboard, refer to the [Getting Started with Rootstock RPC API](https://dev.rootstock.io/developers/rpc-api/rootstock/setup/).

:::

* **How to get it**:

    * Go to the [Rootstock RPC Dashboard](https://dashboard.rpc.rootstock.io/login) and create an account or log in.  
    * Once logged in, create a new project or access an existing one to generate a testnet RPC URL.  
    * Copy the URL and add it to your .env file like so:

```
NEXT_PUBLIC_RPC_URL=<Your_Rootstock_RPC_URL>
```

#### **3. NEXT_PUBLIC_EXPLORER**

This is the blockchain explorer URL, which lets you view transaction details on the Rootstock network.

* **How to get it**:  
  * For testnet (for testing purposes), use this URL: https://explorer.testnet.rootstock.io.  
  * For mainnet (for production), use this URL: https://explorer.rootstock.io.

**Example**:

```
NEXT_PUBLIC_EXPLORER=https://explorer.testnet.rootstock.io
```

 This variable allows your app to link to transaction history directly on the explorer, providing a user-friendly way to verify actions on the blockchain.

#### **4. NEXT_PUBLIC_PINATA_URL**

This is the URL to Pinata, an IPFS (InterPlanetary File System) provider, which will be used to store and retrieve metadata related to teams and votes.

<figure>
<img src="/img/resources/tutorials/governance-dashaboard/NEXT_PUBLIC_PINATA_URL.png" alt="NEXT_PUBLIC_PINATA_URL"/>
  <figcaption>NEXT_PUBLIC_PINATA_URL (fig 2.)</figcaption>
</figure>

* **How to get it**:  
  * Start by logging into your Pinata Cloud account and navigate to the dashboard [Pinata](https://www.pinata.cloud/).  
  * In the dashboard, click on the **"Files"** tab to access the file storage area.  
  * Click the **"Upload"** button and select a sample image file from your device to upload.  
  * After the upload is complete, locate the uploaded image in the file list. You’ll see a **URL** provided by Pinata that can be used to access your file.  

For example:

```
https://emerald-familiar-cobra-431.mypinata.cloud/ipfs/QmVsBy3vo9tmbjYmFNCiRwAvCBU7p9peEEgyR9awJg4Tyj
```

  * The base URL is the part of the file URL before the unique CID (Content Identifier). In this example, the base URL is:

```
https://emerald-familiar-cobra-431.mypinata.cloud/ipfs/
```

  * To display images or files from Pinata Cloud on your frontend, simply append the CID to the base URL.

**Example:**

```
NEXT_PUBLIC_PINATA_URL=<Your_Pinata_URL>
```
:::note

IPFS helps in securely storing data in a decentralized way, and Pinata simplifies accessing this data on IPFS in your dApp.

:::

#### **5. NEXT_PUBLIC_GOVERNANCE_TOKEN**

 This is the address of the ERC20 governance token that users will use to vote. ERC20 tokens are a standard token type on Ethereum-compatible networks.

* #### **How to get it:**

  *  If you already have a governance token contract, you can deploy it on the Rootstock network, similar to the TeamsManager contract.

  *  Otherwise, you can use an existing ERC20 token address if one has been provided for the governance purposes.

#### **Example:**

```
NEXT_PUBLIC_GOVERNANCE_TOKEN=<Your_Governance_Token_Address>
```

#### **Complete environment:**

```
NEXT_PUBLIC_TEAM_MANAGER_ADDRESS=<Your_Team_Manager_Contract_Address>
NEXT_PUBLIC_RPC_URL=<Your_Rootstock_RPC_URL>
NEXT_PUBLIC_EXPLORER=https://explorer.testnet.rootstock.io
NEXT_PUBLIC_PINATA_URL=<Your_Pinata_URL>
NEXT_PUBLIC_GOVERNANCE_TOKEN=<Your_Governance_Token_Address>
```
  </Step>

<Step title="Start the Development Server">
   Launch the development server with:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the voting dashboard.

<figure>
<img src="/img/resources/tutorials/governance-dashaboard/Development-Server.png" alt="development server "/>
  <figcaption>Development server  (fig 3.)</figcaption>
</figure>
  </Step>
  
</Steps>



## Interacting with the Frontend

<Steps>
<Step title="Connect Your Wallet">

  * Click the **Connect Wallet** button in the top-right corner.  
  * Choose your Web3 wallet `(e.g., MetaMask)` and connect it to the Rootstock network.  
  * Make sure your wallet is funded with some governance tokens for voting and RBTC tokens to cover transaction fees.

</Step>
<Step title="Explore the Teams">
 <figure>
  <img src="/img/resources/tutorials/governance-dashaboard/Explore-the-Teams.png" alt="Explore the Teams"/>
  <figcaption>Explore the Teams (fig 4.)</figcaption>
 </figure>

 * Explore the list of teams in the **Teams List** section.
 * For each team, you can view:  
   - **Logo**: Visual representation or meme associated with the team.  
   - **Team Name**: Helps identify each team uniquely.  
   - **Symbol**: Represents the token each team uses for voting.  
   - **Leader Address**: Shows the team leader’s wallet address.  
   - **Meme Token Address**: Address of the token associated with the team.  
   - **Score**: The number of votes the team has received.  
 * This information helps you decide which team to support with your vote.

</Step>
   <Step title="Vote for a Team">
    <figure>
<img src="/img/resources/tutorials/governance-dashaboard/Vote-Team.png" alt="Vote for a Team"/>
  <figcaption>Vote for a Team (fig 5.)</figcaption>
</figure>

 * To vote, find the team you want to support and click the **Vote** button in the **Option** column.  
 * You will see a pop up screen with a field to add the amount to vote and an Add vote button.  
 * Confirm the transaction in your wallet. You’ll need `governance tokens` to cast your vote and a small amount of `RBTC tokens` for transaction fees.  
 * Once confirmed, your vote will be registered, and the team’s score will update to reflect your support. 

  </Step>
  <Step title="Check the Scores">
    * After voting, you’ll see the **Score** column update with the new total votes.  
    * The scores reflect the level of community support each team has received.

  </Step>
   <Step title="Adding a Team (For Administrators)">
     <figure>
<img src="/img/resources/tutorials/governance-dashaboard/Add-Team.png" alt="Adding a Team"/>
  <figcaption>Adding a Team (fig 6.)</figcaption>
</figure>

 * If you have administrative privileges, you can add a new team by clicking the **Add Team** button.  
 * Enter the following details to create a new team:  
   * **Team Name**: A unique name for the team.  
   * **Meme Token Address**: Address of the meme token associated with the team.  
   * **Team Leader Address**: Wallet address of the team leader.  
 * Once added, the new team will appear in the Teams List, and users can start voting for it.

  </Step>
</Steps>



## Conclusion

Following this guide, you can build and deploy a fully functional Governance Voting Dashboard that supports decentralized decision-making on the Rootstock Network. 

This dApp enables users to create teams, manage proposals, and cast votes using governance tokens (ERC20). 

The dApp simplifies the voting process and enhances user engagement with an intuitive interface and smooth interactions.

Whether you're a developer looking to learn or a project leader aiming to implement decentralized governance, this guide equips you with all the tools and knowledge needed to succeed. Start building your dApp today and unlock the potential of transparent and efficient governance!

