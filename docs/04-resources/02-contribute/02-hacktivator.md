---
sidebar_label: Rootstock Hacktivator
sidebar_position: 2
title: Rootstock Hacktivator
description: "Rootstock Hacktivator is the open-source contribution marketplace where developers can propose ideas, claim existing ones, and earn rewards for contributions that strengthen the Rootstock ecosystem."
tags: [rootstock, rsk, code, resources, content, hacktivator, writing, rewards]
---

Rootstock Hacktivator is the open-source contribution [marketplace](https://hacktivator-marketplace.rootstock.io/) where developers can propose ideas, claim existing ones, and earn rewards for contributions that strengthen the Rootstock ecosystem.

<Button size="lg" href="https://hacktivator-marketplace.rootstock.io/">Join Hacktivator</Button>

<br></br>

## Developers can choose between two paths

### Path I: Submit New Ideas
Have an idea that could benefit the Rootstock ecosystem? Submit it to the marketplace for the community to build it.

**New ideas can be:**
* Code / Tool
* Technical Documentation (for the [Rootstock Developer Portal](https://dev.rootstock.io/))
* Written Tutorial (for the [Rootstock Community Blog](https://rootstock.hashnode.dev/))
* Video Tutorial (for the [From Devs to Devs](https://www.youtube.com/playlist?list=PLSyELPaIli1nH06-3cbAEMajk-UuHlnDq) playlist on YouTube)


**When submitting an idea, you’ll need to provide:**

<Steps>
  <Step title="Type of Contribution">
      * Code / Tool
      * Technical Documentation
      * Written Tutorial
      * Video Tutorial
  </Step>
  <Step title="Idea Title">
    Short and descriptive (e.g., “Rootstock Gas Fee Calculator” or “Intro to Smart Contracts Workshop”).
  </Step>
  <Step title="Idea Description">
    Clearly describe your idea. What problem does it solve or what opportunity does it create? Why is it useful for the Rootstock ecosystem? (max 200 words).
  </Step>
  <Step title="Detailed Scope / Guidance">
    * Provide clear instructions so someone else could pick up and build the idea. Examples:
      * Code: features required, key functions, dependencies, expected behavior.
      * Documentation: sections to cover, depth, examples to include.
      * Tutorials: target audience, structure/outline, examples, formats (blog, video, workshop).  
  </Step>
  <Step title="Skills Needed">
    What skills would someone need? (e.g., Solidity, React, writing, video editing).
  </Step>
  <Step title="Supporting Material">
    Links to GitHub repos, draft outlines, reference materials, or similar work.
  </Step>
</Steps>

## Inspiration for Submitting Your Ideas

### Code Contributions

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h5">Rootstock CLI</Accordion.Header>
    <Accordion.Body>
      The [Rootstock CLI](https://github.com/rsksmart/rsk-cli) is a command-line interface designed to simplify the process of building on the Rootstock platform, catering to both seasoned web3 developers and those transitioning from web2. In its initial iteration, the CLI offers essential features that streamline development by making it easier to interact with the network. Whether you're creating wallets, checking balances, sending transactions, or deploying contracts, the Rootstock CLI simplifies these tasks, allowing you to focus more on building your applications and less on managing infrastructure. For more details, see the [CLI Repo](https://github.com/rsksmart/rsk-cli) and the [NPM Package](https://www.npmjs.com/package/@rsksmart/rsk-cli).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h5">Starter Kits and Tutorial</Accordion.Header>
    <Accordion.Body>
      To empower broader participation from the community, we propose the development of [comprehensive starter kits](https://dev.rootstock.io/dev-tools/#filters=demos) and step-by-step tutorials. These resources would lower the entry barrier for newcomers by providing the essential tools, guidance, and context needed to begin contributing meaningfully. Whether it's code samples, configuration templates, or integration examples, these kits aim to streamline the onboarding process and reduce friction for developers eager to get involved.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h5">RAS (Rootstock Attestation Service)</Accordion.Header>
    <Accordion.Body>
      Integrating the Ethereum Attestation Service (EAS) into the Rootstock ecosystem opens the door to a wide range of trustless, verifiable use cases. This initiative focuses on enabling developers to issue, store, and verify attestations on Rootstock, expanding the platform’s potential for identity, validation, and reputation systems. Through tutorials and starter kits, contributors will gain hands-on experience creating schemas, managing attestations, and applying them in real-world scenarios.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h5">Multi-Language SDK Expansion</Accordion.Header>
    <Accordion.Body>
      This section introduces support for additional programming languages, enhancing accessibility and usability for developers across various backgrounds. Built on the EVM-compatible Rootstock blockchain, the SDKs offer powerful libraries and services in languages like Rust, Python and Go. Each language-specific SDK provides essential tools and utilities for token management, transaction handling, eligibility checks, and more, catering to diverse needs. These multi-language expansions are designed to broaden developer engagement and simplify integrations across multiple environments, solidifying the SDKs as versatile, cross-platform resources.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h5">Visualizing RNS Token Holdings with The Graph and Alchemy</Accordion.Header>
    <Accordion.Body>
      This proposal aims to create from scratch a decentralized application that enables users to query RNS (Rootstock Name Service) addresses and visualize associated token balances and assets. By integrating The Graph for efficient indexing and Alchemy for accessing token data, the Dapp will offer a seamless and transparent view of on-chain holdings tied to human-readable RNS names.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header as="h5">Voting Scoreboard</Accordion.Header>
    <Accordion.Body>
      The [Voting Scoreboard](https://github.com/rsksmart/rootstock-scoreboard) is a tool that demonstrates how ERC-20 tokens can be used for voting, complete with a leaderboard to track community engagement and top participants. While it's not a full production tool but rather a reference project, it's ideal for developers or project creators looking to easily integrate voting mechanisms into their ecosystems and monitor engagement, making it perfect for promotional campaigns or gauging interest in a project through on-chain participation. For more details, see the [Voting Scoreboard Repo](https://github.com/rsksmart/rootstock-scoreboard).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="6">
  <Accordion.Header as="h5">RUNES & MEME Giveaway Engine: A Tool for Token Airdrops</Accordion.Header>
    <Accordion.Body>
      The Giveaway Engine is a demo project that offers developers a blueprint for setting up airdrops and token giveaways on the Rootstock network. While it's not a production-ready tool, it serves as a technical reference for distributing tokens like RUNES (once bridged to Rootstock as ERC-20 or ERC-1155 tokens) or any general ERC-20 / ERC-1155 tokens. This engine provides an example path for engaging communities and building excitement around projects through token distribution. For more details, see the [Airdrop Template](https://github.com/rsksmart/airdrop-template) and the [Airdrop UI](https://github.com/rsksmart/airdrop-ui).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="7">
    <Accordion.Header as="h5">Meme Token Launchpad</Accordion.Header>
    <Accordion.Body>
      The [Meme Token Launchpad](https://github.com/rsksmart/meme-token-launch) is an easy-to-use tool that simplifies the process of creating and launching your own ERC-1155/ERC-20 tokens. It caters to both experienced developers and newcomers by allowing users to define token parameters like name and ticker, and even store images via IPFS. Integrated with Etherspot for gasless deployment, it makes token creation more accessible by eliminating the complexities and costs associated with fees. For more details, see the [Meme Token Repo](https://github.com/rsksmart/meme-token-launch).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="8">
    <Accordion.Header as="h5">Rootstock MCP Server</Accordion.Header>
    <Accordion.Body>
      The [Rootstock MCP Server](/developers/quickstart/mcp/) is a Model Context Protocol (MCP) server that provides advanced tools for interacting with the Rootstock blockchain. This project enables AI clients to seamlessly connect and execute blockchain operations. For more details, see the [MCP Server Repo](https://github.com/rsksmart/rsk-mcp-server) or use the [NPM Package](https://www.npmjs.com/package/@rsksmart/rsk-mcp-server) for remote configuration of the AI client.
    </Accordion.Body>
  </Accordion.Item>
    <Accordion.Item eventKey="9">
    <Accordion.Header as="h5">Rootstock Scaffold</Accordion.Header>
    <Accordion.Body>
      Integrating the ETH Scaffold into the Rootstock ecosystem opens the door to a wide range of dApps and use cases. The [Rootstock Scaffold](https://github.com/rsksmart/rsk-scaffold) is a dev toolkit designed to facilitate easy dApp development. This project enables you to create, debug and deploy your smart contracts and build user interfaces that interact with those contracts. For more details, see the [Replit Starter Kit](https://replit.com/@rootstockDevX/Rootstock-Scaffold?v=1#README.md).
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

### Educational Content Contribution

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h5">Written guides or tutorials</Accordion.Header>
    <Accordion.Body>
      Step-by-step instructions that implement a working dApp, feature, or technical concept on Rootstock — with a GitHub repo and README explaining setup.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h5">Technical documentation</Accordion.Header>
    <Accordion.Body>
      In-depth resources that extend Rootstock Docs with highly technical explanations of stack, protocols, or architecture.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h5">Video tutorials</Accordion.Header>
    <Accordion.Body>
      Walkthroughs of building or deploying on Rootstock, paired with a GitHub repo and README containing supporting code and instructions.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>


### Path II: Claim Existing Ideas

Want to build, but don’t have an idea of your own?
* Browse the pool of already published ideas on the marketplace.
* Claim the idea that matches your skills, and submit your work.
* If approved, you earn a reward within the established ranges, determined based on the quality, complexity, and impact of your contribution.


### Contribution Criteria & Guidelines  

To be accepted, contributions must meet the following standards.

#### General Criteria
* Quality – Technically sound, well-executed.
* Originality – Must be your own work, not copied.
* Relevance – Should directly benefit the Rootstock developer or user ecosystem.
* Accuracy – Must be correct, precise, and clearly presented.

#### Code Contribution Criteria and Guidelines
* Must include clear documentation and usage instructions.
* Should include tests to validate correctness.
* Must consider maintainability, reusability, and long-term impact.
* Should follow Rootstock development best practices.

:::info[❗More info about the guidelines]

For a comprehensive overview of the evaluation and reward system for code contributions, including detailed criteria for complexity, project impact, tests, and documentation, please refer to the [Evaluation Criteria for Code Contributions](https://docs.google.com/document/d/1vA3QK8ZNv5Fgegb0Jv2f03IVIREePDi4lrFE1vsfK7c/edit) and [terms and conditions of the Hacktivator](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing).  These criteria outline how contributions, ranging from simple fixes to advanced features or external integrations, will be assessed and rewarded, ensuring a balanced and fair approach to valuing developer participation and impact. This document covers everything from optimizing performance to integrating external APIs, with rewards adjusted based on the value and complexity of each contribution.

:::

### Educational Content Criteria and Guidelines
* Written guides or tutorials must **showcase a working dApp, technical concept, or feature.**
* Each submission must include a **GitHub repository** with a **README** section explaining setup and usage.
* Submissions must be **original, technically accurate, and not previously published elsewhere.**
* Once approved, you will be invited as a **collaborator to publish on the Rootstock Community Blog**. Rewards are only distributed after successful publication.
* Technical documentation must be submitted directly as a **PR** on the DevPortal repository. Include the PR link in your submission form, apply the **“hacktivator” label**, and follow the provided template.


:::info[❗More info about the guidelines]

👉 Guidelines when publishing:
* Follow the [Rootstock Style Guide](https://github.com/rsksmart/devportal/blob/main/STYLE-GUIDE.md)
* See [Contributing to Rootstock Documentation](https://github.com/rsksmart/devportal/blob/main/CONTRIBUTING_DOCS.md) and [Rootstock Contributor Guidelines](https://github.com/rsksmart/devportal/blob/main/CONTRIBUTING.md)


For a comprehensive overview of the evaluation and reward system for code contributions, including detailed criteria for complexity, project impact, tests, and documentation, please refer to the [Evaluation Criteria for Code Contributions](https://docs.google.com/document/d/1vA3QK8ZNv5Fgegb0Jv2f03IVIREePDi4lrFE1vsfK7c/edit) and [terms and conditions of the Hacktivator](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing).  These criteria outline how contributions, ranging from simple fixes to advanced features or external integrations, will be assessed and rewarded, ensuring a balanced and fair approach to valuing developer participation and impact. This document covers everything from optimizing performance to integrating external APIs, with rewards adjusted based on the value and complexity of each contribution.

:::

## Rewards

Rewards are distributed, according to the hacktivator's [terms and conditions](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?tab=t.0), based on how you choose to contribute:

* Submit Ideas (Path I): Earn a flat reward of $15 for each approved idea.
* Claim Ideas (Path II): Rewards are determined within the established ranges for each type of contribution and assigned after review and approval.

### Code Contributions

* **Level 1: $50 – $150**
Basic Contribution (Low Complexity): Minor documentation or style fixes (e.g., correcting typos, adding a missing comment explaining a function’s purpose).

* **Level 2: $160 – $300**
Small Improvements (Medium–Low Complexity): Refactors or optimizations that don’t change functionality but improve code efficiency or readability.

* **Level 3: $310 – $700**
New Feature or Significant Improvement (Medium–High Complexity): Implementing a simple new feature or enhancing existing functionality.

* **Level 4: $710 – $1,000**
Complex or Innovative Contribution (High Complexity): Large-scale features or critical changes requiring coordination across multiple components (e.g., API integration or system architecture changes).

### Educational Content

* Written Guides or Tutorials: $50 – $200
* Technical Content: $150 – $400
* Video Guides or Tutorials: $150 – $500


:::tip[Reward Range]

The reward range provided for each option will be used based on the level of contribution to the project to qualify. That is, if the Contributor meets only the minimum required to qualify, they will be assigned the minimum rewards for each option. However, the more the Contributor adds to their contribution and chosen option, the greater the rewards they may receive (up to the maximum cap established for each option).

:::

## How to Participate

Everything happens directly on the [Hacktivator Marketplace](https://hacktivator-marketplace.rootstock.io/):

1. Register and create a private profile
2. Choose a path → Submit a new idea or claim an existing one.
3. Review → The Rootstock team reviews your submission against the criteria. You may be asked to make revisions or provide more information.
4. Rewards → If approved, rewards will be distributed on the 15th of the following month. 

\> All communication, submissions, and feedback are centralized on the marketplace.


Rootstock Hacktivator is your opportunity to make a meaningful impact on the Rootstock ecosystem while earning rewards. Ready to contribute?

<Button size="lg" href="https://hacktivator-marketplace.rootstock.io/">Join Hacktivator now</Button>