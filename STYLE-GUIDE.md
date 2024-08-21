# Rootstock Style Guide

## **Frontmatter**
Rootstock documentation pages utilize frontmatter, a customizable set of properties and components that controls the page behavior (e.g., title, description, cards, filtering, etc.). 

**Example:**

\---

sidebar\_label: Rootstock Fundamentals

sidebar\_position: 2

title: Rootstock Fundamentals

tags: \[rsk, rootstock, beginner, concepts\]

description: Rootstock is the first and longest-lasting Bitcoin sidechain. It is the only layer 2 solution that combines the security of Bitcoin's proof of work with Ethereum's smart contract capabilities.

render\_features: 'powpeg-hsm-attestation-frame'

\---

> The provided frontmatter snippet demonstrates how to define several properties that control how the page is presented within the documentation website:

- **sidebar\_label:** This property sets the text displayed for the page in the navigation sidebar. Here, it's set to "Rootstock Fundamentals".

- **sidebar\_position:** This property determines the order of the page within the sidebar. In this case, the value 2 indicates a position below any entries with a lower number (and above those with a higher number).

- **title:** This property sets the main title displayed for the page content. Here, it matches the sidebar label, "Rootstock Fundamentals".

- **tags:** This property assigns keywords or tags to the page for categorization and searchability. Here, the page is tagged with "rsk", "rootstock", "beginner", and "concepts".

- **description:** This property briefly describes the page's content, used for page previews or search results, this helps with SEO. Ensure your meta description is concise and compelling; providing a brief summary of your page's content is crucial for SEO. Keep the description within 150-160 characters, align it with user search intent, and naturally include relevant keywords to enhance readability.

## **Front Matter Tags**

**Note:** Tags are essential for improving our documentation search system. They help users find relevant information more easily. Don’t forget to include them in the front matter.

**Maximum Tags:** Limit tags in the front matter of your .md files to a maximum of five.

**Relevance:** Ensure tags are relevant to your content. They should help users find information quickly. Example, if you are writing an article about “How to deploy a smart contract on Rootstock using Rust” make sure to add “rust” as a tag.

**Mandatory Tags:** We have a set of mandatory tags for each section. See the table below for a list.

| Section | Mandatory Tags |
| ----- | ----- |
| **Concepts** | **Concepts,  rsk, rootstock** |
| **Developers** | **Developers,  rsk, rootstock** |
| **Node Operators** | **node operators,  rsk, rootstock** |
| **Resources** | **Resources,  rsk, rootstock** |
| **Dev Tools** | **dev tools, rsk, rootstock** |

**Example:**

```javascript
---
title: My Documentation Title
tags: concepts, rsk, rootstock
---
```

## **Versioning Docs**

* Stay Updated: Regularly check for updates to our documentation to ensure you have the latest version.  
* Updating Docs: Follow these steps to update a [Docasaurus version](https://docusaurus.io/docs/versioning).

## **Accessibility Widget Features**

The Rootstock Documentation was built with accessibility in mind. It uses a robust accessibility tool called [Accessibe](https://accessibe.com/). This allows users with disabilities to customize their experience for easier navigation and information access.

To use the accessibility features, visit the [Rootstock Docs](https://dev.rootstock.io) and click on the icon**.** at the bottom left of the screen. You can then set up your preferred accessibility features.

<video controls src="static/img/accessibe.mp4" title="Accessibe"></video>

## **When to Use Each Component**
This section provides guidance on using various Docasaurus components effectively:

1. **Codeblock:**
This is used to display code snippets for developers or to illustrate specific syntax.

   * Example: 

```javascript
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("World")); // Output: Hello, World!
```

2. **Tabs:**  
   * Use case: Organize related content with different functionalities or viewpoints.  
   * Example:

```javascript
<Tabs>
  <TabItem value="contribute" label="Contribute to Rootstock" default>
    ...
  </TabItem>
  <TabItem value="contest" label="Contest Themes">
    ...
  </TabItem>
  <TabItem value="requirements" label="Requirements">
    ...
  </TabItem>
</Tabs>
```

3. **Gallery Slider:**  
   * Use case: Showcase a series of images or content that benefit from a swiping or sliding interface.  
   * Example: A documentation page for a product might use a gallery slider to display product screenshots.  
4. **Table:**  
   * Use case: Present structured data with clear rows and columns for easy comparison or reference.  
   * Example: A table comparing different features of various plans for a service and listing technical specifications of products, features, or functionalities.  
5. **Headers:**  
   * Use case: Organize your content and create a hierarchy for scannability. Use H1 for the main title, H2 for subheadings, and so on.  
   * Example:

```javascript
# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6
```

6. **List:**  
   * Use case: Present items in a specific sequence (ordered list) or without order (unordered list).  
   * Example: Ordered list for installation steps, unordered list for a set of features.  
7. **Blockquotes:**  
   * Use case: Highlight quoted text, differentiating it from your own writing.  
   * Example: Highlighting a user testimonial or an excerpt from another source.  
8. **Quotes:**  
   * Use case: Include short in-line quotations within your text.  
   * Example: “As the saying goes, ‘A picture is worth a thousand words’.”  
9. **Images:**  
   * Use case: Enhance understanding and visual appeal. Ensure images are relevant and of high quality.  
   * Example: An image can illustrate a product concept or demonstrate a user interface element.  
10. **Videos:**  
    * Use case: Demonstrate functionalities, complex explanations, or walkthroughs.  
    * Example: A video tutorial for setting up a software program.  
11. **Admonitions:**  
    * Use case: Highlight important notes, warnings, or tips to grab user attention.  
    * Example: A warning admonition about potential security risks or a note about browser compatibility.  
12. **Accordion:**  
    * Use case: Present collapsible sections of content, useful for long lists or frequently asked questions.  
    * Example: An FAQ section where each question expands to reveal the answer upon clicking.  
13. **Cards:**  
    * Use case: Display concise pieces of information in an organized and visually appealing way.  
    * Examples:  
      * Cards with filters: Filterable product cards based on category or price range.  
      * Cards with no links: Informational cards without requiring user clicks.  
      * Cards with no images: Cards displaying textual information only.  
      * Cards with images: Cards with an image and accompanying descriptive text.

14. **Numbering**
- To make the numbering work, ensure you don't add anything on the same line as the number, even if it's a text.
- **A good example**   
**\[\]**  
**a bad example**  
**\[\]**

## **README**  
Rootstock's full technology stack is developed on the foundation of bitcoin. 

This includes everything from Rootstock smart contracts to the Rootstock Infrastructure Framework. The stack aims to establish a more equitable and inclusive financial system. 

Rootstock is the first open-source smart contract platform powered by the Bitcoin network. It aims to enhance the Bitcoin ecosystem by facilitating smart contracts, near-instant payments, and greater scalability.

- Visit the [Rootstock Open Source Repos](https://github.com/rsksmart)
- [Rootstock Developer Portal Documentation](https://github.com/rsksmart/devportal)

**Key Features:**

* **Smart Contracts on Bitcoin:** Rootstock Smart Contracts enable developers to build secure and scalable DeFi, NFT, and Web3 applications on the Bitcoin network.  
* **Enhanced Security:** Rootstock inherits Bitcoin's battle-tested security, providing a robust foundation for your decentralized projects.  
* **Interoperability:** Rootstock bridges the gap between Bitcoin and Ethereum, fostering innovation across ecosystems. 

## **Clone the Repository:**

```
git clone https://github.com/rsksmart/devportal.git
```

## **Connect with other Developers**
Join the vibrant Rootstock community to connect with developers, engage in discussions, and stay updated on the latest advancements: 

- **Discord: [https://discord.com/invite/rootstock](https://discord.com/invite/rootstock)**  