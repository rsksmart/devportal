---
sidebar_label: Rootstock Hacktivator
sidebar_position: 2
title: 💻 Rootstock Hacktivator
description: "Rootstock Hacktivator allows developers to evolve to Rootstock by contributing code, creating educational content or organizing community events. You get to support the platform at your own pace, and every eligible contribution will be rewarded based on its impact and value."
tags: [rootstock, rsk, code, resources, content, hacktivator, writing, rewards]
---

Welcome to the Rootstock Hacktivator! Designed for developers who want to contribute to the Rootstock ecosystem and receive rewards for their valuable contributions.

<Button size="lg" href="https://forms.gle/k7vgaowUSaVKSmnC9">Submit Your Work</Button>

## 🌟 What is it?

Rootstock Hacktivator allows developers to contribute to the Rootstock ecosystem by submitting code, creating educational content, or advocating within developer communities. You can support the platform at your own pace and choose from the following contribution categories:
- Code Contributions
- Educational Content Contributions
- Community Events

Developers are free to select the paths that best match their skills and interests, with every eligible contribution rewarded based on its quality, impact, and relevance to Rootstock’s developer ecosystem.

## ✔️ General Contribution Criteria
* **Quality:** Contributions must be valuable to the Rootstock ecosystem, whether improving functionality, enhancing usability, or educating developers and community members.
* **Originality:** All work should be original and created by you. Translations or adaptations should remain true to the source material.
* **Relevance:** Contributions must directly benefit Rootstock’s developer community and ecosystem.
* **Accuracy:** Code, tutorials, and other technical content must be precise and technically correct.
* **Minimum Value Requirement:** Submissions consisting of only a single line of code or minimal input that does not add meaningful value will not be accepted.


## 🎁 Rewards Per Category

Eligible contributions will be rewarded according to the hacktivator's terms and conditions, based on the value and impact they bring to the Rootstock developer community, following the specifications for each category.

### 1️⃣ Category: Code Contributions

Code contributions allow developers to improve Rootstock’s developer tools and ecosystem by building features, improving libraries, or expanding project functionality. Developers can leverage the following reference projects to deliver meaningful contributions to the Rootstock ecosystem.

### 📌 Reference Projects

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h5">CLI (Developer Tooling)</Accordion.Header>
    <Accordion.Body>
      The [Rootstock CLI](https://github.com/rsksmart/rsk-cli) is a command-line interface designed to simplify the process of building on the Rootstock platform, catering to both seasoned web3 developers and those transitioning from web2. In its initial iteration, the CLI offers essential features that streamline development by making it easier to interact with the network. Whether you're creating wallets, checking balances, sending transactions, or deploying contracts, the Rootstock CLI simplifies these tasks, allowing you to focus more on building your applications and less on managing infrastructure. For more details, see the [CLI Repo](https://github.com/rsksmart/rsk-cli) and the [NPM Package](https://www.npmjs.com/package/@rsksmart/rsk-cli).

      **Contribution Ideas:**
        * [Thirdweb SDK](https://thirdweb.com/) Integration in the CLI: Support for deploying `ERC20`, `ERC721` collections and integrating IPFS storage provided by Thirdweb.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h5">Starter Kits and Tutorials</Accordion.Header>
    <Accordion.Body>
      To empower broader participation from the community, we propose the development of comprehensive starter kits and step-by-step tutorials. These resources would lower the entry barrier for newcomers by providing the essential tools, guidance, and context needed to begin contributing meaningfully. Whether it's code samples, configuration templates, or integration examples, these kits aim to streamline the onboarding process and reduce friction for developers eager to get involved.

      **Contribution Ideas:**
        * **Envio - Rootstock Starter Kit**: Practical example for making recurring payments on Rootstock.
        * Video Tutorial:
            * Runestock: Step-by-step guide on how to use the Runes app
            * Tutorial on how to verify contracts in the new Rootstock explorer
        * **The Graph + Rootstock Starter Kit + Tutorial**: Subgraph configuration to query on-chain data:
          * ERC20 token balance query.
          * Transaction history of an address.
          * Smart contract activity tracking. 
          * dApp usage statistics.
          * Visualization of liquidity pools and their movements.
        * Starter Kit + tutorial for USDC operations between Rootstock and other layers using LayerZero: Example of interoperability between Rootstock and other chains.
          * USDC cross-chain transfers.
          * Recurring payments between different layers.
          * Automatic swaps between Rootstock and other networks.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h5">RAS (Rootstock Attestation Service)</Accordion.Header>
    <Accordion.Body>
         Integrating the Ethereum Attestation Service (EAS)  into the Rootstock ecosystem opens the door to a wide range of trustless, verifiable use cases.  This initiative focuses on enabling developers to issue, store, and verify attestations on Rootstock, expanding the platform’s potential for identity, validation, and reputation systems.  Through tutorials and starter kits, contributors will gain hands-on experience creating schemas, managing attestations, and applying them in real-world scenarios.

      **Contribution Ideas:**
        * RAS - Rootstock Starter Kit: Basic configuration to create and manage attestations in Rootstock.
        * RAS Tutorial: How to create and query schemas and attestations on the new RAS tab in the Rootstock Explorer
        * Attestation system for documents in IPFS: Validation of documents uploaded to IPFS using RAS.
        * Wallet balance attestations: Create verifiable attestations of on-chain balances.
        * Decentralized reputation system: Use RAS to build reputation profiles based on verifiable attestations.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h5">Multi-Language SDK Expansion</Accordion.Header>
    <Accordion.Body>
      This section introduces support for additional programming languages, enhancing accessibility and usability for developers across various backgrounds. Built on the EVM-compatible Rootstock blockchain, the SDKs offer powerful libraries and services in languages like **Rust**, **Python** and **Go**. Each language-specific SDK provides essential tools and utilities for token management, transaction handling, eligibility checks, and more, catering to diverse needs. These multi-language expansions are designed to broaden developer engagement and simplify integrations across multiple environments, solidifying the SDKs as versatile, cross-platform resources.

      **Contribution Ideas:**

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
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h5">Visualizing RNS Token Holdings with The Graph and Alchemy</Accordion.Header>
    <Accordion.Body>
      This proposal aims to create from scratch a decentralized application that enables users to query RNS (Rootstock Name Service) addresses and visualize associated token balances and assets.  By integrating The Graph for efficient indexing and Alchemy for accessing token data, the Dapp will offer a seamless and transparent view of on-chain holdings tied to human-readable RNS names.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header as="h5">Voting Scoreboard</Accordion.Header>
    <Accordion.Body>
         The [Voting Scoreboard](https://github.com/rsksmart/rootstock-scoreboard) is a tool that demonstrates how ERC-20 tokens can be used for voting, complete with a leaderboard to track community engagement and top participants. While it's not a full production tool but rather a reference project, it's ideal for developers or project creators looking to easily integrate voting mechanisms into their ecosystems and monitor engagement, making it perfect for promotional campaigns or gauging interest in a project through on-chain participation. For more details, see the [Voting Scoreboard Repo](https://github.com/rsksmart/rootstock-scoreboard).
      **Contribution Ideas**:
        * **ERC-20 Token Voting**: Set up ERC-20 tokens for voting, allowing users to vote on proposals or choices within a project.
        * **Leaderboard Display**: Track voter participation making it easy to highlight the most engaged community members.
        * **On-Chain Identity Integration**: Incorporate RNS domains or other on-chain identities for personalized leaderboards.
        * **Graphical Representations**: Add charts or graphs to visualize leaders' positions over time.
        * **Positional Changes**: Display how participants' rankings shift daily or weekly, providing transparency in voting dynamics.
        * **Countdown Timer**: Include a countdown feature to indicate when the voting period ends, creating a sense of urgency for participants.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="6">
    <Accordion.Header as="h5">RUNES & MEME Giveaway Engine: A Tool for Token Airdrops</Accordion.Header>
    <Accordion.Body>
      The Giveaway Engine is a demo project that offers developers a blueprint for setting up airdrops and token giveaways on the Rootstock network. While it's not a production-ready tool, it serves as a technical reference for distributing tokens like RUNES (once bridged to Rootstock as ERC-20 or ERC-1155 tokens) or any general ERC-20 / ERC-1155 tokens. This engine provides an example path for engaging communities and building excitement around projects through token distribution. For more details, see the [Airdrop Template](https://github.com/rsksmart/airdrop-template) and the [Airdrop UI](https://github.com/rsksmart/airdrop-ui).
    **Contribution Ideas**:
      * **Set Up a Token Airdrop**: Implement airdrops of ERC-20 tokens or RUNES.
      * **Staking-Based Eligibility**: Add rules to reward users who have staked tokens in another protocol, encouraging broader ecosystem participation.
      * **On-Chain Activity**: Create rules to distribute tokens based on on-chain actions like interacting with a contract or voting on a proposal.
      * **Holdings-Based Eligibility**: Reward users based on the number of tokens they hold, incentivizing loyalty and long-term engagement.
      * **RNS Domain Criteria**: Airdrop tokens to users who own specific RNS domains, adding a unique layer to community interaction.
      * **Add New Different Rewards System**: Introduce a new reward system such as a random or tiered reward system
      * **Time-Limited Airdrops and Expirations**: Implement time-sensitive giveaways where unclaimed rewards are redistributed, creating urgency and encouraging immediate engagement.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="7">
    <Accordion.Header as="h5">Meme Token Launchpad</Accordion.Header>
    <Accordion.Body>
      The [Meme Token Launchpad](https://github.com/rsksmart/meme-token-launch) is an easy-to-use tool that simplifies the process of creating and launching your own ERC-1155/ERC-20 tokens. It caters to both experienced developers and newcomers by allowing users to define token parameters like name and ticker, and even store images via IPFS. Integrated with Etherspot for gasless deployment, it makes token creation more accessible by eliminating the complexities and costs associated with fees. For more details, see the [Meme Token Repo](https://github.com/rsksmart/meme-token-launch).

    **Contribution Ideas**:
      * **Additional Minting Parameters**: Implement extra minting options.
      * **Burn Mechanisms**: Define and implement token burn mechanisms to increase scarcity or reward holders.
      * **Pump Fun Platform**: Build a platform to showcase and hype newly launched tokens, creating an engaging environment for degens and creators.
      * **Token Vesting and Timelock**: Allow users to set vesting schedules or timelocks for tokens, which is useful for founders, early investors, or community rewards.
      * **Governance Integration**:  Include options to create governance tokens or add voting modules, enabling users to set up DAOs or community-driven projects directly
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

### 📌 Code Contributions Criteria

Submissions that consist of only a single line of code or minor edits that do not provide real functionality or improvement will not be accepted.

  * For a comprehensive overview of the **evaluation** and **reward** system for code contributions, including detailed criteria for complexity, project impact, tests, and documentation, please refer to [Evaluation Criteria for Code Contributions](https://docs.google.com/document/d/1vWYWdWxSXUcTxNS_OlRikfEwmPSXgw3iDsQ-UAqheMw/edit?tab=t.0#heading=h.x3c1jx5xd0ko) and the [terms and conditions of the hacktivator](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?tab=t.0). These criteria outline how contributions, ranging from simple fixes to advanced features or external integrations, will be assessed and rewarded, ensuring a balanced and fair approach to valuing developer participation and impact. This document covers everything from optimizing performance to integrating external APIs, with rewards adjusted based on the value and complexity of each contribution.

### 📌 Code Contributions Rewards

Each verified and approved code contribution that becomes a Qualified Contribution (as defined in the program's terms and conditions) will be entitled to receive the following rewards, under the established process:

:::success[Success]

* **Level 1: 50 - 150 USD**
  * Basic Contribution (Low Complexity): Minor documentation or style fixes (e.g., correcting typos, adding a missing comment explaining a function’s purpose).
* **Level 2: 160 - 300 USD**
  * Small Improvements (Medium-Low Complexity): Refactors or optimizations that don’t change functionality but improve code efficiency or readability.
* **Level 3: 310 - 700 USD**
  * New Feature or Significant Improvement (Medium-High Complexity): Implementing a simple new feature or enhancing existing functionality.
* **Level 4: 710 - 1000 USD**
  * Complex or Innovative Contribution (High Complexity): Large-scale features or critical changes requiring coordination across multiple components (e.g., API integration or system architecture changes).

_**The reward range provided for each option will be used based on the level of contribution to the project to qualify. That is, if the Contributor meets only the minimum required to qualify, they will be assigned the minimum rewards for each option. However, the more the Contributor adds to their contribution and chosen option, the greater the rewards they may receive (up to the maximum cap established for each option).**_
:::

## 2️⃣ Category: Educational Content Contributions 

Educational content contributions enable developers to educate the Rootstock community through technical guides, tutorials, and documentation. They must be developer-focused and aimed at providing real value to the Rootstock developer community.

### 📌 Formats

1. **Written Guides or Tutorials**
    * Develop step-by-step guides that showcase a working dApp, technical concept, or feature that can be implemented by Rootstock developers. Each guide must be supported by a GitHub repository containing a README with a clear explanation and setup instructions.
2. **Technical Documentation on Rootstock Docs**
    * Produce in-depth technical documentation that explains Rootstock’s technology stack, protocols, and architecture for a highly technical audience.
3. **Video Guides or Tutorials**
    * Record and share visual tutorials that walk developers through practical tasks or explain technical concepts related to Rootstock development. Each video must be accompanied by a GitHub repository containing a README with a clear explanation and setup instructions.


:::info[Improvements]
❗To improve the feedback loop and reduce the need for major video editions:
- It is recommended to submit a written outline and get approval before recording the video
- You don’t need a full script — just summarize the key topics and structure you plan to follow.
- Mention in the description that this is a video outline for preapproval.
- Pre-approval does not guarantee the final video will be approved, but it ensures smoother feedback.
:::


### 📌 Themes

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h4">**Smart Contract Development Tutorials**</Accordion.Header>
    <Accordion.Body>
      Writing, testing and deploying smart contracts on the Rootstock network.

        **Contribution Ideas**:
          * Step-by-step guides on creating various types of smart contracts (e.g., tokens, DeFi, wallets, swaps, RWAs, NFTs, Runes, Ordinals, indexing, interoperability).
          * Explaining Rootstock's unique features and how they can be utilized in smart contract development.
          * Debugging and troubleshooting common issues in smart contract development.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h4">**Integration with Rootstock and Ecosystem Solutions**</Accordion.Header>
    <Accordion.Body>
      Demonstrating how to use and integrate tools with Rootstock-compatible tools and libraries.

      **Contribution Ideas**:
        * Implementing and demonstrating how Rootstock operates as a sidechain through a working integration or data flow example.
        * Step-by-step guides on integrating wallets, SDKs, or APIs with Rootstock applications, including setup instructions and GitHub code.
        * Tutorials on using ecosystem dApps by demonstrating integration steps or extending their functionality with Rootstock components.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h4">**Use Case Specific Guides - Real-World Examples**</Accordion.Header>
    <Accordion.Body>
      Step-by-step guides demonstrating working dApps or prototypes that reflect real-world use cases on Rootstock. Each guide must include a GitHub repo with implementation details.

      **Contribution Ideas**:
        * Building cross-platform or no-code dApps (e.g., mobile app development using Flutter).
        * Showcasing real-world applications on Rootstock.
        * Building cross-chain applications, data indexing, etc., using partner tools and integrations.
        * Porting dApps to Rootstock from other ecosystems.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h4">**Tools and Libraries**</Accordion.Header>
    <Accordion.Body>
      Documentation and guides explaining various tools and libraries that can be used for Rootstock development.

      **Contribution Ideas**:
        * Tutorials on using popular development environments (e.g., Remix, Hardhat, Slither, Viem).
        * Explaining the use of testing frameworks and libraries for smart contract testing.
        * Demonstrating how to use debugging tools to identify and fix issues in Rootstock applications.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h4">**Advanced Topics and Best Practices**</Accordion.Header>
    <Accordion.Body>
      
      Step-by-step guides exploring advanced Rootstock features or best practices, supported by a working implementation. Each submission must include a GitHub repo demonstrating the concept.

      **Contribution Ideas**:
        * Implementing scalable contract patterns or mechanisms to demonstrate how Rootstock can support advanced scalability strategies.
        * Applying security best practices in smart contract development, using real examples and code walkthroughs.
        * Building working implementations using DeFi, Runes, Ordinals, or BITVMX on Rootstock, with practical code and setup documentation.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

## 2️⃣ Category: Educational Criteria and Guidelines 

* Only **written guides** or **tutorials** will be accepted. These must showcase a working dApp, technical concept, or feature that can be implemented by Rootstock developers.
* Each submission must include a **GitHub repository** containing a README section with a clear explanation and setup instructions.
* Submissions must be original, technically accurate, and not previously published elsewhere.
* Once approved, you will be invited as a collaborator to publish your educational content on the [Rootstock Community blog](https://rootstock.hashnode.dev/). Contributions become eligible for rewards only after successful publication.
* If you are contributing technical documentation to the [Rootstock DevPortal](https://github.com/rsksmart/devportal/pulls), it must be submitted directly as a Pull Request (PR) on the repository. Include the PR link in your submission form, ensure the “hacktivator” label is applied, and follow the provided template. Submissions consisting of only a single line of code or minor edits that do not offer real functionality or improvement will not be accepted.

:::tip[❗More info about the guidelines]

For a comprehensive overview of the guidelines, evaluation, and reward system for content contributions, including detailed criteria for depth, completeness, technical accuracy, educational value, and innovation, please refer to the [Educational Content Evaluation Criteria & Guidelines](https://docs.google.com/document/d/1vA3QK8ZNv5Fgegb0Jv2f03IVIREePDi4lrFE1vsfK7c/edit) and [terms and conditions of the Hacktivator](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing). These criteria outline how contributions, ranging from technical documentation, written or video guides or tutorials will be assessed and rewarded, ensuring a balanced and fair approach to valuing content quality and impact. This document covers everything from word count appropriateness and inclusion of code examples to technical correctness and relevance to the Rootstock ecosystem, with rewards adjusted based on the value and complexity of each contribution.

👉 Guidelines when publishing:
* Follow the [Rootstock Style Guide](https://github.com/rsksmart/devportal/blob/main/STYLE-GUIDE.md)
* See [Contributing to Rootstock Documentation](https://github.com/rsksmart/devportal/blob/main/CONTRIBUTING_DOCS.md) and [Rootstock Contributor Guidelines](https://github.com/rsksmart/devportal/blob/main/CONTRIBUTING.md)
:::


### 📌 Educational Content Rewards
Each verified and approved code contribution that becomes a Qualified Contribution (as defined in the program's terms and conditions) will be entitled to receive the following rewards, under the established process:

:::success[Success]
  * **Written Guides or Tutorials Contribution**: 50 - 200 USD
  * **Technical Content Contribution**: 150 - 400 USD 
  * **Video Guides or Tutorials Contribution**: 150 - 500 USD

_**The reward range provided for each option will be used based on the level of contribution to the project to qualify. That is, if the Contributor meets only the minimum required to qualify, they will be assigned the minimum rewards for each option. However, the more the Contributor adds to their contribution and chosen option, the greater the rewards they may receive (up to the maximum cap established for each option).**_

:::

## 3️⃣ Category: Community Events

Community Events contributions focus on creating direct engagement with the developer community to promote Rootstock through high-impact events. There are two types of developer-focused events you can contribute to:
  * Online Events
  * In-Person (IRL) Events

For both categories, you can either:
  * Organize a developer event from scratch, or
  * Represent Rootstock at an external event organized by a third party (e.g. community events, partner meetups, conferences)

### 📌 Online Events

Online events are virtual gatherings designed to educate and engage developers around Rootstock’s technology and ecosystem.

You can contribute by:

* Organizing your own online event, such as:
  * Webinars focused on Rootstock development topics (e.g. using Rootstock SDKs, deploying smart contracts)
  * Interactive office hours or live Q&A sessions for developers building on Rootstock
  * Technical workshops or live coding sessions hosted under the Rootstock brand

* Representing Rootstock at external online developer events, such as:
  * Speaking at a partner’s developer webinar
  * Participating in online hackathons as a Rootstock mentor
  * Co-hosting educational sessions with other blockchain or developer communities

All online events must be **technical in nature** and targeted at developers interested in learning how to build on Rootstock or integrate its tools.

### 📌 IRL Events (In-Person) 

IRL events are physical gatherings where developers represent Rootstock by educating developers in person.

You can contribute by:

* Organizing your own in-person developer event, such as:

  * Hands-on workshops (e.g. building dApps on Rootstock)
  * Developer meetups focused on the Rootstock ecosystem and tooling
  * Academic outreach events at universities or bootcamps

* Representing Rootstock at external IRL events, such as:

  * Delivering technical talks or workshops at developer conferences
  * Mentoring at third-party hackathons where Rootstock is being used
  * Speaking at tech meetups or university events targeting developers


All IRL events must be strictly **developer-focused** and deliver **clear technical value**, helping attendees better understand Rootstock’s tools, ecosystem, and integration opportunities.

### 📌 Criteria & Guidelines

 :::tip[📌 Criteria & Guidelines]
* Events (online or IRL) must be strictly developer-focused and designed to educate, inspire, or support developers in building on or integrating Rootstock.
* Events should deliver clear technical value related to Rootstock tools, services, or ecosystem components.
* All events (online or IRL) must be pre-approved by Rootstock.
* All events (online or IRL) must be recorded, and the recording must be sent to Rootstock for review together with the post-event report.
* A post-event report is required, including metrics such as:
  * Recording link
  * Number of attendees
  * Developer engagement (e.g. questions, feedback, code examples)
  * Qualitative insights (e.g. testimonials or follow-ups)
:::


:::note[⚠️ Pre-Approval Process for Events]

Before committing to an event, contributors must request pre-approval via the submission form. This process ensures alignment on key event details, such as event type, audience profile, format, and clear success metrics (e.g., minimum expected number of participants, engagement goals).

Important: Pre-approval is required to proceed but does not automatically guarantee rewards. Final approval and reward disbursement will only occur if the agreed objectives are fully met. For example, if the pre-approved goal was 50 attendees and only 20 participants attend, the contribution would not qualify for rewards. Ensure expectations are realistic and achievable when submitting for pre-approval.

**⚠️ Flat-Fee Reward Model**:
We do not cover event expenses. Instead, approved events receive a flat reward based on the event type and quality. Pre-approval is required to ensure clarity on expectations and avoid misunderstandings.

⚠️ Geographic Focus for IRL Events:
To start, we’re prioritizing IRL events in the following cities:
  * New York City, United States — North America
  * Buenos Aires, Argentina — Latin America
  * Lisbon, Portugal — Europe
  * London, United Kingdom — Europe
  * Lagos, Nigeria — Africa
  * Bengaluru, Mumbai & New Delhi, India — Asia-Pacific
  * Seoul, South Korea — Asia-Pacific

More locations are on the way, so if your city isn’t listed yet, stay tuned!

❗More info about the guidelines
For a comprehensive overview of the guidelines, evaluation, and reward system for Community Events contributions, including detailed criteria for depth, completeness, technical accuracy, educational value, and innovation, please refer to [Community Events Contributions – Evaluation Criteria & Guidelines](https://docs.google.com/document/d/1j1ut89KaJXlVQTPJ2qRUGLrZX2BQRS6OJXp91monPBg/edit?tab=t.0) and [Rootstock Hacktivator Program – T&Cs](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?tab=t.0). These criteria outline how contributions, ranging from online or IRL developer events, will be assessed and rewarded, ensuring a balanced and fair approach to valuing their impact and effectiveness. This document covers everything from event structure and target developer audience to pre-approval requirements, engagement metrics, and technical

:::


### 📌 Rewards

**Online Events**:
  * **$200–$400** per approved online event (e.g., Rootstock webinars, technical office hours, online collaborations).
  * **Bonus**: Additional rewards may apply for events with high developer engagement, attendance beyond agreed expectations, or involve key partners (e.g., universities, developer hubs).

**IRL Events**:
  * **$500–$1500** per approved IRL event (e.g., developer workshops, meetups, academic outreach, hackathon mentorship, or conference sessions).
  * **Bonus**: Additional rewards may apply for events that exceed targets or involve key partners (e.g., universities, developer hubs).

## 📤 Submission Process

Submitting your contributions is easy! Just follow these steps:

1. Complete Your Work: Whether it’s code, educational content or community events, make sure it’s polished and meets the contribution criteria.
2. Submit Through Google Form: Use this [form link](https://forms.gle/k7vgaowUSaVKSmnC9) to submit your contribution. You’ll be asked to provide:
    * Your name or pseudonym
    * Country
    * Email address
    * Your wallet address
    * The type of contribution and relevant details
    * A brief description of your work.
    * A link to your submission (Google Drive link for videos, written content, or event proposals; GitHub link or PR for code or technical documentation).
3. Review: Your submission will be reviewed by experts. You may be asked to make revisions or provide more information.

This program is your chance to make a meaningful impact on Rootstock while earning rewards. Ready to contribute? Submit your work and be a part of the Rootstock developer community! 🌍

<Button size="lg" href="https://forms.gle/k7vgaowUSaVKSmnC9">Submit Your Work</Button>

<br></br>

:::warning[T&C]
By participating in this program, you acknowledge that you have read, understood, and agreed to abide by all aspects of the program and its [terms and conditions](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?tab=t.0). If you do not agree with any part or all of the program and/or its terms and conditions, please refrain from joining or submitting contributions, as your participation will be construed as your full acceptance of these terms.
:::


