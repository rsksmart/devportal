---
sidebar_label: Hacktivator
sidebar_position: 2
title: 🌱 Rootstock Hacktivator 💻
description: "Rootstock Hacktivator allows developers to evolve to Rootstock by contributing code or creating educational content. You get to support the platform at your own pace, and every eligible contribution will be rewarded based on its impact and value."
tags: [rootstock, rsk, code, resources, content, hacktivator, writing, rewards]
---

Welcome to the Rootstock Hacktivator! Designed for developers who want to contribute to the Rootstock ecosystem and receive rewards for their valuable contributions.

<Button size="lg" href="https://forms.gle/aF9pFMfRyoygfzJWA">Submit Your Work</Button>

## 🌟 What is it?

Rootstock Hacktivator allows developers to evolve to Rootstock by contributing code or creating educational content. You get to support the platform at your own pace, and every eligible contribution will be rewarded based on its impact and value.

## ✔️ General Contribution Criteria
* **Quality:** Contributions must be valuable to the Rootstock ecosystem, whether improving functionality, enhancing usability, or educating developers and community members.
* **Originality:** All work should be original and created by you. Translations or adaptations should remain true to the source material.
* **Relevance:** Contributions must directly benefit Rootstock’s developer community and ecosystem.
* **Accuracy:** Code, tutorials, and other technical content must be precise and technically correct.

## 🎁 Rewards Per Category

Eligible contributions will be rewarded as set out in the hacktivator's terms and conditions, and based on the value and impact they bring to the Rootstock developer community, following the specifications below for each category.

### Category 1: Code Contributions 🛠️

Developers are encouraged to leverage reference projects to make meaningful contributions to the Rootstock ecosystem. See the options below:

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">1. CLI (Developer Tooling)</Accordion.Header>
    <Accordion.Body>
      The [Rootstock CLI](https://github.com/rsksmart/rsk-cli) is a command-line interface designed to simplify the process of building on the Rootstock platform, catering to both seasoned web3 developers and those transitioning from web2. In its initial iteration, the CLI offers essential features that streamline development by making it easier to interact with the network. Whether you're creating wallets, checking balances, sending transactions, or deploying contracts, the Rootstock CLI simplifies these tasks, allowing you to focus more on building your applications and less on managing infrastructure. For more details, see the [CLI Repo](https://github.com/rsksmart/rsk-cli) and the [NPM Package](https://www.npmjs.com/package/@rsksmart/rsk-cli).

      **Contribution Ideas:**

        * Check Balances: Implement features to easily check balances for any address on Rootstock.

        * Transfer Any Token:  Enable to transfer any token on the Rootstock network, ensuring compatibility with major token standards (e.g., ERC-20, ERC-721) for a seamless user experience

        * Send Transactions: Simplify sending transactions with built-in commands.

        * Transactions history:  Show the transactions history from the current wallet

        * Address Book: Add an address book feature for frequently used addresses, with easy labeling and optional encryption for secure storage.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">2. Voting Scoreboard</Accordion.Header>
    <Accordion.Body>
      The [Voting Scoreboard](https://github.com/rsksmart/rootstock-scoreboard) is a tool that demonstrates how ERC-20 tokens can be used for voting, complete with a leaderboard to track community engagement and top participants. While it's not a full production tool but rather a reference project, it's ideal for developers or project creators looking to easily integrate voting mechanisms into their ecosystems and monitor engagement, making it perfect for promotional campaigns or gauging interest in a project through on-chain participation. For more details, see the [Voting Scoreboard Repo](https://github.com/rsksmart/rootstock-scoreboard).

      **Contribution Ideas:**

        * ERC-20 Token Voting: Set up ERC-20 tokens for voting, allowing users to vote on proposals or choices within a project.

        * Leaderboard Display: Track voter participation making it easy to highlight the most engaged community members.

        * On-Chain Identity Integration: Incorporate RNS domains or other on-chain identities for personalized leaderboards.

        * Graphical Representations: Add charts or graphs to visualize leaders' positions over time.

        * Positional Changes: Display how participants' rankings shift daily or weekly, providing transparency in voting dynamics.

        * Countdown Timer: Include a countdown feature to indicate when the voting period ends, creating a sense of urgency for participants.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">3. RUNES & MEME Giveaway Engine: A Tool for Token Airdrops</Accordion.Header>
    <Accordion.Body>
      The Giveaway Engine is a demo project that offers developers a blueprint for setting up airdrops and token giveaways on the Rootstock network. While it's not a production-ready tool, it serves as a technical reference for distributing tokens like RUNES (once bridged to Rootstock as ERC-20 or ERC-1155 tokens) or any general ERC-20 / ERC-1155 tokens. This engine provides an example path for engaging communities and building excitement around projects through token distribution. For more details, see the [Airdrop Template](https://github.com/rsksmart/airdrop-template) and the [Airdrop UI](https://github.com/rsksmart/airdrop-ui).

      **Contribution Ideas:**

        * Set Up a Token Airdrop: Implement airdrops of ERC-20 tokens or RUNES.

        * Staking-Based Eligibility: Add rules to reward users who have staked tokens in another protocol, encouraging broader ecosystem participation.

        * On-Chain Activity: Create rules to distribute tokens based on on-chain actions like interacting with a contract or voting on a proposal.

        * Holdings-Based Eligibility: Reward users based on the number of tokens they hold, incentivizing loyalty and long-term engagement.

        * RNS Domain Criteria: Airdrop tokens to users who own specific RNS domains, adding a unique layer to community interaction.

        * Add New Different Rewards System: Introduce a new reward system such as a random or tiered reward system

        * Time-Limited Airdrops and Expirations: Implement time-sensitive giveaways where unclaimed rewards are redistributed, creating urgency and encouraging immediate engagement.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">4. Meme Token Launchpad</Accordion.Header>
    <Accordion.Body>
      The [Meme Token Launchpad](https://github.com/rsksmart/meme-token-launch) is an easy-to-use tool that simplifies the process of creating and launching your own ERC-1155/ERC-20 tokens. It caters to both experienced developers and newcomers by allowing users to define token parameters like name and ticker, and even store images via IPFS. Integrated with Etherspot for gasless deployment, it makes token creation more accessible by eliminating the complexities and costs associated with fees. For more details, see the [Meme Token Repo](https://github.com/rsksmart/meme-token-launch).

      **Contribution Ideas:**

        * Additional Minting Parameters: Implement extra minting options.

        * Burn Mechanisms: Define and implement token burn mechanisms to increase scarcity or reward holders.

        * Pump Fun Platform: Build a platform to showcase and hype newly launched tokens, creating an engaging environment for degens and creators.

        * Token Vesting and Timelock: Allow users to set vesting schedules or timelocks for tokens, which is useful for founders, early investors, or community rewards.

        * Governance Integration:  Include options to create governance tokens or add voting modules, enabling users to set up DAOs or community-driven projects directly.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">5. Multi-Language SDK Expansion</Accordion.Header>
    <Accordion.Body>
      This section introduces support for additional programming languages, enhancing accessibility and usability for developers across various backgrounds. Built on the EVM-compatible Rootstock blockchain, the SDKs offer powerful libraries and services in languages like **Rust**, **Python** and **Go**. Each language-specific SDK provides essential tools and utilities for token management, transaction handling, eligibility checks, and more, catering to diverse needs. These multi-language expansions are designed to broaden developer engagement and simplify integrations across multiple environments, solidifying the SDKs as versatile, cross-platform resources.

      <b/>
      **Contribution Ideas: Rust**

        * Transaction Processing Library:  Build a library in Rust to handle token transfers, deploy contracts, and execute transactions for ERC-20 and ERC-1155 standards, leveraging Rust's speed and security.

        * Crypto Wallet Library:  Develop a lightweight wallet in Rust, with support for private key management, signing, and ECDSA cryptography, designed for integration with desktop and server applications.

      <b/>

      **Contribution Ideas: Python**

        * Airdrop Eligibility Analyzer:  Create a Python library that checks eligibility criteria (e.g., RNS domains owned, on-chain activity) for airdrops, connecting easily to databases or analytics pipelines.

        * Data Visualization for Token Metrics:  Develop a tool using Python’s data libraries (like Pandas and Matplotlib) to visualize token distribution, transfer patterns, and airdrop impacts.

        * Smart Contract Event Scraper:  Build a Python script to capture and parse smart contract events from the blockchain, storing relevant data for user interaction tracking or analytics.

      <b/>
      **Contribution Ideas: Go**

        * Backend for Airdrop and Giveaway Engine:  Use Go to build a high-performance backend that handles token distribution, logging, and eligibility checking for the Giveaway Engine.

        * Token Management Microservices:  Create microservices for token-related operations, such as minting, burning, and transferring, allowing applications to call specific functions as needed.

        * Network Listener for Events:  Implement an event listener in Go to monitor smart contracts for token-related events, ideal for notifications or automated actions.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

#### 👉 Code Contributions Criteria

For a comprehensive overview of the evaluation and reward system for code contributions, including detailed criteria for complexity, project impact, tests, and documentation, please refer to [Evaluation Criteria for Code Contributions](https://docs.google.com/document/d/1vWYWdWxSXUcTxNS_OlRikfEwmPSXgw3iDsQ-UAqheMw/edit) and the [terms and conditions of the hacktivator](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing). These criteria outline how contributions, ranging from simple fixes to advanced features or external integrations, will be assessed and rewarded, ensuring a balanced and fair approach to valuing developer participation and impact. This document covers everything from optimizing performance to integrating external APIs, with rewards adjusted based on the value and complexity of each contribution.

#### 👉 Code Contributions Rewards

Each verified and approved code contribution that becomes a Qualified Contribution (as defined in the Hacktivator's terms and conditions above) will be entitled to receive the following rewards, under the established process:

* **Level 1 —> 50 - 150 USD**
  * **Basic Contribution (Low Complexity):** Minor documentation or style fixes (e.g., correcting typos, adding a missing comment explaining a function’s purpose).
* **Level 2 —> 150 - 300 USD**
  * Small Improvements (Medium-Low Complexity): Refactors or optimizations that don’t change functionality but improve code efficiency or readability.
* **Level 3 —> 300 - 700 USD**
  * **New Feature or Significant Improvement (Medium-High Complexity):** Implementing a simple new feature or enhancing existing functionality.
* **Level 4 —> 700 - 1000 USD**
  * **Complex or Innovative Contribution (High Complexity):** Large-scale features or critical changes requiring coordination across multiple components (e.g., API integration or system architecture changes).

> The reward range provided for each option will be used based on the level of contribution to the project to qualify. That is, if the Contributor meets only the minimum required to qualify, they will be assigned the minimum rewards for each option. However, the more the Contributor adds to their contribution and chosen option, the greater the rewards they may receive (up to the maximum cap established for each option).


### Category 2: Educational Content 📝

You can contribute to the Rootstock platform by creating one of the following types of content:

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">1. Blog Posts</Accordion.Header>
    <Accordion.Body>
      * Definition: Engaging articles that share news, insights, opinions, or experiences related to developing dApps on Rootstock and the Rootstock ecosystem.
      * Purpose: To inform and engage the community, spark discussions, and provide thought leadership on relevant topics.
      * Audience: General readers, crypto enthusiasts, and community members interested in Rootstock developments.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">2. Written Guides or Tutorials</Accordion.Header>
    <Accordion.Body>
      * Definition: Step-by-step instructional documents that help readers learn how to perform specific tasks or understand concepts related to Rootstock.
      * Purpose: To educate users and developers on using Rootstock's features, tools, or building applications.
      * Audience: Developers, users, and anyone seeking practical guidance on Rootstock.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">3. Technical Documentation on Rootstock Docs</Accordion.Header>
    <Accordion.Body>
      * Definition: In-depth documentation and detailed explanations of Rootstock's underlying technology, protocols, and architecture intended for a technical audience.
      * Purpose: To provide comprehensive technical information, promote transparency, and assist developers in understanding complex aspects of Rootstock.
      * Audience: Developers, blockchain engineers, and technical enthusiasts interested in Rootstock's technical details.
    </Accordion.Body>
  </Accordion.Item>
    <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">4. Video Guides or Tutorials</Accordion.Header>
    <Accordion.Body>
      * Definition: Visual and auditory instructional materials that demonstrate how to perform tasks or explain concepts related to Rootstock in a video format.
      * Purpose: To offer a visual learning experience, making complex information more accessible through demonstrations and walkthroughs.
      * Audience: Users and developers who prefer visual content for learning and problem-solving.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

Your contributions can cover any of the following Rootstock themes:

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">1. Smart Contract Development Tutorials</Accordion.Header>
    <Accordion.Body>
      Writing, testing and deploying smart contracts on the Rootstock network.

      **Contribution Ideas:**
        * Step-by-step guides on creating various types of smart contracts (e.g., tokens, DeFi, wallets, swaps, RWAs, NFTs, Runes, Ordinals, indexing, interoperability).
        * Explaining Rootstock's unique features and how they can be utilized in smart contract development.
        * Debugging and troubleshooting common issues in smart contract development.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">2. Integration with Rootstock and Ecosystem Solutions</Accordion.Header>
    <Accordion.Body>
      Demonstrating how to use and integrate tools with Rootstock-compatible tools and libraries.
      
      **Contribution Ideas:**
        * Explaining the concept of a sidechain and how Rootstock utilizes it.
        * Step-by-step guides on integrating wallets, SDKs, or APIs with Rootstock applications.
        * Step-by-step guides on using ecosystem dApps - refer to the “Building DeFi on Bitcoin” series on the Rootstock blog.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">3. Use Case Specific Guides – Case Studies and Real-World Examples</Accordion.Header>
    <Accordion.Body>
      Sharing real-world examples of Rootstock applications and use cases.
      
      **Contribution Ideas:** 
        * Building cross-platform or no-code dApps (e.g., mobile app development using Flutter, etc).
        * Showcasing real-world applications on Rootstock.
        * Building cross-chain applications, data indexing, etc., using partner tools and integrations.
        * Porting dApps to Rootstock from other ecosystems
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">4.  Tools and Libraries</Accordion.Header>
    <Accordion.Body>
      Introducing and explaining various tools and libraries that can be used for Rootstock development.
      
      **Contribution Ideas:**
        * Tutorials on using popular development environments (e.g., Remix, Hardhat, Slither, Viem).
        * Explaining the use of testing frameworks and libraries for smart contract testing.
        * Demonstrating how to use debugging tools to identify and fix issues in Rootstock applications.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">5. Advanced Topics and Best Practices</Accordion.Header>
    <Accordion.Body>
      Expanding into more complex aspects of Rootstock development and sharing best practices.

      **Contribution Ideas:** 
        * Exploring complex concepts and how they enhance scalability on Rootstock.
        * Discussing security considerations in smart contract development and best practices to avoid vulnerabilities.
        * Exploring advanced topics like decentralized finance (DeFi), Runes, Ordinals, BITVMX, and their potential applications on Rootstock.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

#### 👉 Educational Content Criteria & Guidelines:

* Blogs, tutorials (written or video), and technical documentation should be original content created after the hacktivator launch on November 11th **(not previously published elsewhere)**, is accurate, and provides actionable insights. Please share your content via Google Drive by providing the URL on the submission form (link below).
* Educational content should be targeted towards developers looking to build on Rootstock or understand its integration with Bitcoin.
* Content must help other developers navigate and work with Rootstock, deploy smart contracts, use compatible tools, SDKs, and libraries, and or integrate protocols on Rootstock.
* Contributions for Rootstock Technical documentation should be submitted as a Pull Request (PR) directly on the [DevPortal Repo](https://github.com/rsksmart/devportal/pulls), and the PR link should be submitted via the [Google form](https://forms.gle/aF9pFMfRyoygfzJWA). Ensure to use the label **“hacktivator”** on the PR and properly describe your PR using the template.
* After approval, the contributor must publish their educational content on the [Rootstock Community blog](https://rootstock.hashnode.dev/) to qualify for rewards. They will be invited as a collaborator to do so, and the contribution will only be eligible for rewards once successfully published.

:::note[More info about the guidelines]

For a comprehensive overview of the guidelines, evaluation, and reward system for content contributions, including detailed criteria for depth, completeness, technical accuracy, educational value, and innovation, please refer to the [Educational Content Evaluation Criteria & Guidelines](https://docs.google.com/document/d/1vA3QK8ZNv5Fgegb0Jv2f03IVIREePDi4lrFE1vsfK7c/edit) and the [terms and conditions of the Hactivator](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing). These criteria outline how contributions, ranging from technical documentation, written or video guides or tutorials will be assessed and rewarded, ensuring a balanced and fair approach to valuing content quality and impact. This document covers everything from word count appropriateness and inclusion of code examples to technical correctness and relevance to the Rootstock ecosystem, with rewards adjusted based on the value and complexity of each contribution.

👉 Guidelines when publishing:
* Follow the [Rootstock Style Guide](https://github.com/rsksmart/devportal/blob/main/STYLE-GUIDE.md)
* See [Contributing to Rootstock Documentation](https://github.com/rsksmart/devportal/blob/main/CONTRIBUTING_DOCS.md) and [Rootstock Contributor Guidelines](https://github.com/rsksmart/devportal/blob/main/CONTRIBUTING.md)

:::

#### 👉 Educational Content Rewards:

Each verified and approved code contribution that becomes a Qualified Contribution (as defined in the Hactivator's terms and conditions) will be entitled to receive the following rewards, under the established process:
* **Blog Post Contribution:** 50 - 250 USD
* **Written Guides or Tutorials Contribution:** 250 - 500 USD
* **Technical Content Contribution:** 500 - 700 USD 
* **Video Guides or Tutorials Contribution:** 700 - 1000 USD

The reward range provided for each option will be used based on the level of contribution to the project to qualify. That is, if the Contributor meets only the minimum required to qualify, they will be assigned the minimum rewards for each option. However, the more the Contributor adds to their contribution and chosen option, the greater the rewards they may receive (up to the maximum cap established for each option).

## 📤 Submission Process

Submitting your contributions is easy! Just follow these steps:

1. Complete Your Work: Whether it’s code or educational content, make sure it’s polished and meets the contribution criteria.
2. Submit Through Google Form: Use this [form link](https://forms.gle/aF9pFMfRyoygfzJWA) to submit your contribution. You’ll be asked to provide:
  * Your name or pseudonym
  * Country
  * Email address
  * Your wallet address
  * The type of contribution and relevant details
  * A brief description of your work.
  * A link to your submission (e.g., PR, GitHub for code, or written/video blogs/tutorial links).
3. Review: Your submission will be reviewed by experts. You may be asked to make revisions or provide more information.

This is your chance to make a meaningful impact on Rootstock while earning rewards. Ready to contribute? Submit your work and be a part of the Rootstock developer community! 🌍

<Button size="lg" href="https://forms.gle/aF9pFMfRyoygfzJWA">Submit Your Work</Button>

<br></br>

:::success[T&C]

By participating in the hacktivator, you acknowledge that you have read, understood, and agree to abide by all aspects of the program and its [terms and conditions](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing). If you do not agree with any part or all of the program and/or its terms and conditions, please refrain from joining or submitting contributions, as your participation will be construed as your full acceptance of these terms.

:::


