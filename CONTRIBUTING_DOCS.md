# Contributing to Rootstock Documentation

![Rootstock Docs Home](/static/img/docs_home.png)

In this guide, I will outline steps to follow as a new user to our developer documentation so you can update the right content, add a new content to the right section, this will help reduce the reviewing phase with us.

### **Main Navigation Items**

* **Concept:** This section will provide a high-level overview of your product, its purpose, and target audience. It's essentially the "what" of your product.
* **Developers:** This section is primarily for those building on top of your product. It will include technical documentation, APIs, SDKs, and other developer-focused resources.
* **Node Operators:** This section caters to those managing the infrastructure of your product. It will cover setup, maintenance, troubleshooting, and other operational aspects.
* **Resources:** This section will house additional materials like tutorials, case studies, whitepapers, and other supporting documents.
* **Devtools:** This section will provide tools and utilities to aid developers in their work.
* **Use Cases:** This section provides detailed step by step guides on developer outcomes, answering key questions and developer painpoints.

### **Content Placement and Categorization**

#### **Concepts Section**

This section will cover the theoretical aspects and foundational concepts relevant to the platform or technology. The content will include:

* **Core Principles**: Articles explaining the core principles and underlying philosophies of the technology or platform.
* **Architectural Overview**: In-depth discussions on system architecture, including components, data flow, and system interactions.
* **Key Terminologies**: Glossaries and explanations of key terms, jargon, and acronyms used in the field.
* **Security Concepts**: Detailed explanations of security principles, common threats, and best practices for securing applications.
* **Consensus Mechanisms**: Articles on various consensus mechanisms, their pros and cons, and how they are implemented.
* **Scalability and Performance**: Discussions on scalability strategies, performance optimization, and handling high-load scenarios.
* **Regulatory and Compliance**: Information on legal and regulatory considerations, compliance requirements, and industry standards.

#### **Developers Section**

* **New pages or items:** A dedicated "Getting Started" section within the appropriate navigation item (e.g., Developers, Node Operators) can house one-page tutorials.
* **Guides:** These should primarily reside under the "Developers" section.
  * **Integrations guides:** These will be part of the "Developers" section, detailing how to integrate the product with other systems.
  * **User guides:** These belong under the "Concept" section as they explain how to use the product rather than integrate with it.


#### **Node Operators Section**

This section will provide practical information for node operators, focusing on setup, maintenance, and troubleshooting. The content will include:

* Node Installation: Step-by-step guides on installing and configuring nodes on different operating systems.
* Network Participation: Instructions on how to join the network, participate in consensus, and maintain uptime.
* Security and Hardening: Best practices for securing nodes, including firewall configurations, intrusion detection, and regular updates.
* Monitoring and Alerts: Guides on setting up monitoring tools, configuring alerts, and ensuring node health.
* Performance Tuning: Tips and techniques for optimizing node performance, resource management, and handling peak loads.
* Backup and Recovery: Procedures for backing up node data, disaster recovery plans, and restoring nodes after failures.
* Community and Support: Information on community forums, support channels, and how to get help from the community or official support.

#### **Resources Section**

This section will serve as a repository of useful resources, documentation, and tools for developers and node operators. The content will include:

* Official Documentation: Links to official documentation, including API references, technical whitepapers, and user manuals.
* Tutorials and Courses: Curated list of tutorials, online courses, and learning resources.
* Libraries and Frameworks: Information on popular libraries, frameworks, and SDKs relevant to the platform.
* Cheat Sheets and Quick References: Handy cheat sheets, quick reference guides, and FAQs for quick problem-solving.
* Community Resources: Links to community-generated content, blogs, forums, and discussion groups.
* Open Source Projects: Information on open-source projects, how to contribute, and where to find them.
* External Tools: Links to external tools and services that can aid in development, testing, and deployment.

#### **DevTools Section**

This section will focus on development tools, with a particular emphasis on wallets and related tools. The content will include:

* Wallet Setup and Configuration: Guides on setting up and configuring various wallets for development and testing.
* Wallet Integration: Tutorials on integrating wallets into applications, handling transactions, and managing keys.
* Security Practices for Wallets: Best practices for securing wallets, including encryption, multi-signature setups, and secure key management.
* Wallet APIs and SDKs: Information on wallet APIs, SDKs, and how to use them effectively.
* Testing with Wallets: Instructions on testing transactions, simulating network conditions, and debugging wallet-related issues.
* Popular Wallets: Reviews and comparisons of popular wallets, their features, and use cases.
* Community Tools: Information on community-developed tools and plugins that enhance wallet functionality or ease of use.

#### **Codebase Overview**

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

### **Important Notes**

1. When adding content to the documentation, please adhere to our folder structure. Create a new folder for each piece of content, which will generate a new page. Ensure the folder names follow our numbering style for the left navigation as needed.

![Folder Numbering](/static/img/folder_numbering.png)

2. When adding content, please ensure you:
* Include a filter for each new page or piece of content. Each folder should have an `index.md` file that looks similar to this.

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

#### **What is a Filter?**

A filter in this context is a tool used to narrow down content based on specific criteria. For example, if you have multiple articles on our documentation, a filter can help users find content related to a specific topic, such as Ethereum and also make it easy to find

![Filter Component](/static/img/filter_component.png)

#### **Components of the Filter**

1. **Filter Tag**: `<Filter>`
   * This is the main component that wraps around the filter options.
2. **values**: This is an attribute of the `Filter` component that holds an array of objects. Each object represents a filter option.
3. **label**: This is the text that will be displayed to users. In this case, 'From Ethereum'.
4. **value**: This is the internal value that the filter will use to identify the option. In this case, 'ethereum'.

| FilterItem Property | Description |
| :---- | ----- |
| value | The unique identifier for the filter item. |
| title | The main title or name of the filter item. |
| subtitle | A secondary title or category for the filter item. |
| color | The color associated with the filter item, often used for visual representation. |
| linkHref | The hyperlink reference URL that the filter item points to. |
| description | A detailed description of what the filter item entails or represents. |

#### **How to Add a Filter**

##### **Step 1: Understand the Context**

The title of the article is "**Port a dApp from other Chains to Rootstock**". The label information is derived from this title.

##### **Step 2: Create a Filter Component**

You need to create a `Filter` component that will hold your filter options. Each filter option will have a `label` and a `value`.

##### **Step 3: Define Filter Options**

For each option you want to add, you will create an object with `label` and `value` properties. Here’s how you can define a filter for 'From Ethereum':

`<Filter`

  `values={[`

    `{label: 'From Ethereum', value: 'ethereum'},`

  `]}>`

* **label**: This is what users will see. It's user-friendly and descriptive.
* **value**: This is a more technical identifier used internally by the application.

> if you follow these guidelines, you'll help maintain the quality and organization of our documentation.
