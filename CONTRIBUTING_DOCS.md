# Contributing to Rootstock Documentation

![Rootstock Docs Home](/static/img/docs_home.png)

In this guide, I will outline steps to follow as a new user to our developer documentation so you can update the right content, add a new content to the right section, this will help reduce the reviewing phase with us. See [STYLE_GUIDE.MD](/STYLE-GUIDE.md) for rules and configurations.

## Main Navigation Items

The Rootstock documentation is categorized into five core areas. Use this map to determine where your content belongs:

* Concept: High-level architectural overviews. This is the "what" and "why" of the technology.
* Developers: Technical implementation details for those building on Rootstock. Includes APIs, SDKs, and integration tutorials.
* Node Operators: Infrastructure management. Covers setup, maintenance, security hardening, and troubleshooting for node runners.
* Resources: Supporting materials, including whitepapers, community links, and external educational content.
* Devtools: Specific utilities and development aids, with a focus on wallet integrations and testing frameworks.

## Content Placement and Categorization

### Concepts Section

This section will cover the theoretical aspects and foundational concepts relevant to the platform or technology. The content will include:

* **Core Principles**: Articles explaining the core principles and underlying philosophies of the technology or platform.
* **Architectural Overview**: In-depth discussions on system architecture, including components, data flow, and system interactions.
* **Key Terminologies**: Glossaries and explanations of key terms, jargon, and acronyms used in the field.
* **Security Concepts**: Detailed explanations of security principles, common threats, and best practices for securing applications.
* **Consensus Mechanisms**: Articles on various consensus mechanisms, their pros and cons, and how they are implemented.
* **Scalability and Performance**: Discussions on scalability strategies, performance optimization, and handling high-load scenarios.
* **Regulatory and Compliance**: Information on legal and regulatory considerations, compliance requirements, and industry standards.

### Developers Section

* **New pages or items:** A dedicated "Getting Started" section within the appropriate navigation item (e.g., Developers, Node Operators) can house one-page tutorials.
* **Guides:** These should primarily reside under the "Developers" section.
  * **Integrations guides:** These will be part of the "Developers" section, detailing how to integrate the product with other systems.
  * **User guides:** These belong under the "Concept" section as they explain how to use the product rather than integrate with it.


### Node Operators Section

This section will provide practical information for node operators, focusing on setup, maintenance, and troubleshooting. The content will include:

* Node Installation: Step-by-step guides on installing and configuring nodes on different operating systems.
* Network Participation: Instructions on how to join the network, participate in consensus, and maintain uptime.
* Security and Hardening: Best practices for securing nodes, including firewall configurations, intrusion detection, and regular updates.
* Monitoring and Alerts: Guides on setting up monitoring tools, configuring alerts, and ensuring node health.
* Performance Tuning: Tips and techniques for optimizing node performance, resource management, and handling peak loads.
* Backup and Recovery: Procedures for backing up node data, disaster recovery plans, and restoring nodes after failures.
* Community and Support: Information on community forums, support channels, and how to get help from the community or official support.

### Resources Section

This section will serve as a repository of useful resources, documentation, and tools for developers and node operators. The content will include:

* Official Documentation: Links to official documentation, including API references, technical whitepapers, and user manuals.
* Tutorials and Courses: Curated list of tutorials, online courses, and learning resources.
* Libraries and Frameworks: Information on popular libraries, frameworks, and SDKs relevant to the platform.
* Cheat Sheets and Quick References: Handy cheat sheets, quick reference guides, and FAQs for quick problem-solving.
* Community Resources: Links to community-generated content, blogs, forums, and discussion groups.
* Open Source Projects: Information on open-source projects, how to contribute, and where to find them.
* External Tools: Links to external tools and services that can aid in development, testing, and deployment.

### DevTools Section

This section will focus on development tools, with a particular emphasis on wallets and related tools. The content will include:

* Wallet Setup and Configuration: Guides on setting up and configuring various wallets for development and testing.
* Wallet Integration: Tutorials on integrating wallets into applications, handling transactions, and managing keys.
* Security Practices for Wallets: Best practices for securing wallets, including encryption, multi-signature setups, and secure key management.
* Wallet APIs and SDKs: Information on wallet APIs, SDKs, and how to use them effectively.
* Testing with Wallets: Instructions on testing transactions, simulating network conditions, and debugging wallet-related issues.
* Popular Wallets: Reviews and comparisons of popular wallets, their features, and use cases.
* Community Tools: Information on community-developed tools and plugins that enhance wallet functionality or ease of use.

### Codebase Overview

To contribute to our developer documentation, follow these [steps to clone](https://github.com/rsksmart/devportal) the repository and get started.

Then, navigate to the `/doc` folder.

We recommend using Visual Studio Code (VSCode) or any text editor capable of previewing Markdown changes, as our documentation is written in Markdown.

Within the `/doc` folder, you will find the following directories:

* `01-concepts`
* `02-developers`
* `03-node-operators`
* `04-resources`
* `05-dev-tools`

Add your content to the appropriate directory based on the topic it pertains to.

## AI Governance and Style Guide
Rootstock documentation must be technically precise and direct. While AI tools (like LLMs) can assist in drafting content, we do not accept raw AI-generated prose. All contributions must adhere to these Rootstock Style Guide standards to pass the review phase.

### Direct and Authoritative Language
* Avoid _significance puffery_. AI often adds words to make a feature sound more impressive than it is.
* Avoid: "Rootstock serves as a pivotal testament to Bitcoin's legacy."

  - Use: "Rootstock is a Bitcoin sidechain."

* The Rule: Use simple "is/are" statements. If a feature is powerful, the technical specs will prove it; you don't need to tell the reader it's a "game-changer."

### Structural Clarity & Punctuation
Technical documentation must be easy to parse and translate. AI habits like excessive punctuation break this flow.

* No Em Dashes (—): Replace em dashes with a period or a comma.
* No Semicolons (;): If two ideas are related, use two short sentences.
* Active Voice: Use "You configure the node" instead of "The node should be configured."

### Automated Linting (Vale)
We use Vale to enforce these rules. Before submitting a PR, run the linter locally to catch "AI-isms" (e.g., unleash the power, delve into, navigate complexities).

Command: `vale <your-file>.md`

> Requirement: All yellow "warning" flags related to AI style must be resolved before your content is reviewed.

### Human-in-the-Loop Requirement
Every piece of content must be humanized. This means:

* Vary your rhythm: Mix short, punchy instructions with longer explanations where necessary.

* Acknowledge uncertainty: If a specific configuration is experimental or has trade-offs, say so clearly. AI rarely admits to technical messiness.

## Important Notes

1. When adding content to the documentation, please adhere to our folder structure. Create a new folder for each piece of content, which will generate a new page. Ensure the folder names follow our numbering style for the left navigation as needed.

![Folder Numbering](/static/img/folder_numbering.png)

2. When adding content, please ensure you:
* Include a filter for each new page or piece of content. Each folder should have an `index.md` file that looks similar to this.

### Filter Component Structure:

```
<Filter
values={[
{label: 'From Ethereum', value: 'ethereum'},
]}>
<FilterItem
value="ethereum"
title="Port an Ethereum dApp to Rootstock"
subtitle="Ethereum"
color="orange"
linkHref="/resources/port-to-rootstock/ethereum-dapp/"
description="Porting an Ethereum decentralized application (dApp) to Rootstock presents an exciting opportunity to leverage the benefits of the Rootstock network, which is a smart contract platform secured by the Bitcoin network."
/>
</Filter>

```

### What is a Filter?

Filters allow users to narrow down content based on specific criteria (e.g., source chain or developer tool). Each new folder or directory should include a filter in its index.md.

![Filter Component](/static/img/filter_component.png)

### Property Reference

1. **Filter Tag**: `<Filter>`
   * This is the main component that wraps around the filter options.
2. **values**: This is an attribute of the `Filter` component that holds an array of objects. Each object represents a filter option.
3. **label**: This is the text that will be displayed to users. In this case, 'From Ethereum'.
4. **value**: This is the internal value that the filter will use to identify the option. In this case, 'ethereum'.

| Property | Requirements |
| :---- | ----- |
| label | The visible text shown to the user (e.g., 'From Ethereum'). |
| value | The internal unique identifier (lowercase, no spaces). |
| title | The primary headline for the car. |
| color | Visual accent (e.g., orange, blue, green). |
| linkHref | The relative path to the content. |
| description | A one-sentence summary of the page content. |

### How to Add a Filter

- Step 1: Understand the Context

The title of the article is "**Port a dApp from other Chains to Rootstock**". The label information is derived from this title.

- Step 2: Create a Filter Component

You need to create a `Filter` component that will hold your filter options. Each filter option will have a `label` and a `value`.

- Step 3: Define Filter Options**

For each option you want to add, you will create an object with `label` and `value` properties. Here’s how you can define a filter for 'From Ethereum':

`<Filter`

  `values={[`

    `{label: 'From Ethereum', value: 'ethereum'},`

  `]}>`

* **label**: This is what users will see. It's user-friendly and descriptive.
* **value**: This is a more technical identifier used internally by the application.

## Editing with Cursor AI
To maintain the Rootstock Style Guide Tone and Voice, we recommend using the Cursor editor. Our repository includes a `.cursorrules` file that automatically instructs the AI to follow our specific style, terminology, and structural guidelines.

### How to Use the Persona Rules
Once you have opened the devportal or docs-style-guide repository in Cursor, the AI is already "aware" of our standards. You can leverage this in two ways:

1. Inline Humanization (Cmd + K) Highlight a paragraph that feels too "robotic" or dense and press Cmd + K.

Prompt: Type humanize or apply persona.

Result: Cursor will refactor the text to remove em dashes, simplify sentence structure, and strip out marketing fluff like "unleash the power."

2. Chat-Based Drafting (Cmd + L) If you are starting a new page from scratch, open the Chat sidebar with Cmd + L.

Prompt: Draft a 'Getting Started' guide for [Feature] following our `.cursorrules`.

Result: The AI will generate a draft that already avoids "Significance Puffery" and uses the simple "is/are" copula favored by our team.

### Verifying with the Linter
After Cursor suggests a rewrite:

* Check for Yellow Underlines: These are Vale warnings. Cursor integrates these directly into the editor or the Pull request.
* Apply Quick Fixes: Hover over any highlighted AI-ism (e.g., "delve into") and click Quick Fix (Cmd + .). This will instantly swap the term for our preferred human alternative (e.g., "explain").
* Code Block Review: Ensure the AI followed Rule 016—technical comments must be on the line above the code, not inline at the end.

## Contribution Checklist
Before you push your changes to the devportal, ensure your submission meets these criteria:

- [ ] Replaced grandiose openers with direct subjects.
- [ ] Broken long, multi-comma sentences into two.
- [ ] Removed all em dashes (—) and semicolons (;).
- [ ] Used rBTC instead of "Smart Bitcoin."
- [ ] Maintained at least one sentence of text between stacked headers.

> Pro-Tip: If you are using Cursor, the Rootstock Robotics linter will highlight robotic phrasing in yellow. Simply use Cmd + . to apply the human-centric fix automatically.

> if you follow these guidelines, you'll help maintain the quality and organization of our documentation.
