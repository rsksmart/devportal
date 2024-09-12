---
title: Components
---

# Components

## Heading 
Use this to organize your content and create a hierarchy for scannability. Use `Heading one` for the main title, `Heading two` for subheadings, and so on.

- **Code**
```
# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6

```

**Result**
# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6

## Lists
Use this to present items in a specific sequence (ordered list) or without order (unordered list). 


#### Unordered list
- **Code**
```
- The first level of the hierarchy is for *purpose*.
  This is always `44'`, as per the BIP44 specification.
- The second level of the hierarchy is for the *registered coin type*.
  - For Rootstock Mainnet, this should be `137'`, as per the
    [SLIP-44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md "Registered coin types for BIP-0044")
    specification.
  - For Rootstock Testnet, this should be `37310'`, as per the
    [RSKIP-57](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP57.md "Derivation Path for Hierarchical Deterministic Wallets")
    specification.
- The final level of the hierarchy is for *index*: Addresses are numbered from index 0 in sequentially increasing manner. This number is used as child index in [BIP32 derivation](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#specification-key-derivation "Hierarchical Deterministic Wallets - Key Derivation"). Public derivation is used at this level.

```
 **Result:**
- The first level of the hierarchy is for *purpose*.
  This is always `44'`, as per the BIP44 specification.
- The second level of the hierarchy is for the *registered coin type*.
  - For Rootstock Mainnet, this should be `137'`, as per the
    [SLIP-44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md "Registered coin types for BIP-0044")
    specification.
  - For Rootstock Testnet, this should be `37310'`, as per the
    [RSKIP-57](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP57.md "Derivation Path for Hierarchical Deterministic Wallets")
    specification.
- The final level of the hierarchy is for *index*: Addresses are numbered from index 0 in sequentially increasing manner. This number is used as child index in [BIP32 derivation](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#specification-key-derivation "Hierarchical Deterministic Wallets - Key Derivation"). Public derivation is used at this level.

#### Ordered List
- **Code**
```
1. The PowPeg Application is now available on [Testnet](https://powpeg.testnet.rootstock.io/) and [Mainnet](https://powpeg.rootstock.io/).
2. For general information about the design and architecture, how to perform a peg-in transaction using Ledger and Trezor, Frequently asked questions and advanced operations you can perform on the PowPeg app, please refer to the [PowPeg app user guide](/concepts/powpeg/).
3. Get information on the signatories and attestion in the [Powpeg HSM Firmware Attestation](/concepts/powpeg/hsm-firmware-attestation) section.
```
 **Result:**
1. The PowPeg Application is now available on [Testnet](https://powpeg.testnet.rootstock.io/) and [Mainnet](https://powpeg.rootstock.io/).
2. For general information about the design and architecture, how to perform a peg-in transaction using Ledger and Trezor, Frequently asked questions and advanced operations you can perform on the PowPeg app, please refer to the [PowPeg app user guide](/concepts/powpeg/).
3. Get information on the signatories and attestion in the [Powpeg HSM Firmware Attestation](/concepts/powpeg/hsm-firmware-attestation) section.

## Blockquote
Use this to highlight quoted text, differentiating it from your own writing.

- **Code:**
Highlighting a user testimonial or an excerpt from another source.
```
> If you're new to Web3 and Smart Contract Development, begin by exploring the [Rootstock network](/developers/blockchain-essentials/overview/). Then progress step by step to the quick start Guide with Hardhat for a comprehensive understanding of the network and getting started with writing, testing, and deploying smart contracts on Rootstock.
```
**Result:**
> If you're new to Web3 and Smart Contract Development, begin by exploring the [Rootstock network](/developers/blockchain-essentials/overview/). Then progress step by step to the quick start Guide with Hardhat for a comprehensive understanding of the network and getting started with writing, testing, and deploying smart contracts on Rootstock.

## Quote

- **Code**

```jsx
<Quote caption="Alex Min, Head of Marketing">
  ...
</Quote>
````

**Result**

<Quote caption="Alex Min, Head of Marketing">
  When we first integrated Rootstock, we had about 1,000 WAUs using the wallet. Less than eight months later, we have 12,000 WAUs. That’s 11x growth in 8 months, an average of nearly 140% growth month over month, with most users coming from the Rootstock community.
</Quote>

## Images
Use this to enhance understanding and visual appeal. Ensure images are relevant and of high quality, sizes should be width 800 and height 600.

You can add images in two ways on our doc.

**Markdown image**

- **Codes**
```
![Rootstock Technology Stack - High Level](/img/concepts/rootstock-tech-stack.svg)

```
**Result**

![Rootstock Technology Stack - High Level](/img/concepts/rootstock-tech-stack.svg)


**HTML image (max height limit 400px)**

- **Codes**
```
<img src="/img/resources/rootstock-metamask/rootstock-hardhat-starter-kit.png"  width="800" height="600"/>
```
**Result**

<img src="/img/metamask-gas-limit.png"  width="800" height="600"/>


## Gallery/Slider
Use this to showcase a series of images or content that benefit from a swiping or sliding interface.

- **Codes**
```jsx
<Carousel width="370" height="260" images={['/img/concepts/rootstock-tech-stack.svg', ... , '/img/metamask-gas-limit.png']} />
```
**Result**
<Carousel width="370" height="260" images={['/img/concepts/rootstock-tech-stack.svg', '/img/legacy-private-key.png', '/img/metamask-gas-limit.png', '/img/add-ganache-1.png', '/img/add-ganache-2.png']} />


## Video
Use this to demonstrate functionalities, complex explanations, or walkthroughs.

- YouTube video no thumbnail

  - **Code**
  ```
  <Video url="https://www.youtube-nocookie.com/embed/eW9UF2aJQgs?cc_load_policy=1" />
  ```
  - **Result**

  <Video url="https://www.youtube-nocookie.com/embed/eW9UF2aJQgs?cc_load_policy=1" />

- MP4 video no thumbnail

  - **Code**

  ```
  <Video url="/video/video.mp4" />
  ```
  - **Result**
  
  <Video url="/video/video.mp4" />

- MP4 video with custom thumbnail

  - **Code**
  ```
  <Video url="/video/video.mp4" thumbnail="/img/video-thumbnail.jpg" />
  ```
  - **Result**
<Video url="/video/video.mp4" thumbnail="/img/video-thumbnail.jpg" />


<Video url="https://www.youtube-nocookie.com/embed/eW9UF2aJQgs?cc_load_policy=1" thumbnail="/img/thumbnails/video-thumbnail.jpg" />

#### Code

```jsx
<Video url="https://www.youtube-nocookie.com/embed/eW9UF2aJQgs" thumbnail="/img/thumbnails/video-thumbnail.jpg" />
```


## Admonitions
Admonitions are a great way to emphasize important information in your documentation.
Here are some common types of admonitions and their use cases on our doc:

1. **Tips:**
   - Use case: To share helpful tips, tricks, or best practices.
   - Example: "Tip: Optimize your code by using memoization for frequently computed values."

2. **Notes:**
   - Use case: To inform users about something important or provide additional context.
   - Example: "Note: This feature requires an active internet connection."

3. **Warnings:**
   - Use case: To warn against potential issues, risks, or pitfalls.
   - Example: "Warning: Modifying system files without proper backup can lead to data loss."

4. **Success:**
   - Use case: To indicate successful completion of an action or process.
   - Example: "Success: Your payment has been processed."

5. **Error:**
   - Use case: To highlight errors, issues, or failures.
   - Example: "Error: Invalid username or password. Please try again."

6. **Info:**
   - Use case: To provide general information or context.
   - Example: "Info: This feature is available in the latest version of the app."


> There is no option to change color.

- **Code**

```markdown
:::note

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::tip[Tip]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::info[Info]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::warning[Warning]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::danger[Error]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::success[Success]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::
```

- **Result**

:::note[Your Title **with** some _Markdown_ `syntax`!]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

[The Smart Bitcoin (RBTC)](#) is the native currency in Rootstock and it is used to pay for the gas required for the execution of transactions. It is pegged 1:1 with Bitcoin, which means in Rootstock there are exactly 21M RBTC. A Powpeg allows the transfer of bitcoins from the Bitcoin blockchain to the Rootstock blockchain and vice-versa
make test

:::

:::tip[Tip]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::info[Info]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::warning[Warning]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::danger[Error]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::success[Success]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::



## Tables
Use this to present structured data with clear rows and columns for easy comparison or reference.

- Code
```
| Product                                                      | Description                                                                                    |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Flyover | Flyover is a fast and secure way for users to transfer BTC in and out of the Rootstock Ecosystem where it can be used to interact with a range of applications to send, save and spend money. |
| RNS | RNS (RIF Name Service) replaces complicated cryptocurrency addresses with easy-to-remember nicknames, simplifying digital asset transactions. It also facilitates the integration of a Self Sovereign Identity protocol into your products, which enhances user security and flexibility. .|
| Wallet | Bring Bitcoin DeFi to your users with RIF Wallet, an open source Bitcoin wallet with smart contract capabilities. Open-source, fully programmable and customizable.|
| [Relay](/developers/integrate/rif-relay/) | RIF Relay simplifies gas fee payments by allowing users to pay transaction fees with any ERC20 token. This enables end users to transact entirely using one asset, removing complexity and improving onboarding.|


```

- **Result**

| Product                                                      | Description                                                                                    |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Flyover | Flyover is a fast and secure way for users to transfer BTC in and out of the Rootstock Ecosystem where it can be used to interact with a range of applications to send, save and spend money. |
| RNS | RNS (RIF Name Service) replaces complicated cryptocurrency addresses with easy-to-remember nicknames, simplifying digital asset transactions. It also facilitates the integration of a Self Sovereign Identity protocol into your products, which enhances user security and flexibility.|
| Wallet | Bring Bitcoin DeFi to your users with RIF Wallet, an open source Bitcoin wallet with smart contract capabilities. Open-source, fully programmable and customizable.|
| [Relay](/developers/integrate/rif-relay/) | RIF Relay simplifies gas fee payments by allowing users to pay transaction fees with any ERC20 token. This enables end users to transact entirely using one asset, removing complexity and improving onboarding.|


## Accordion
Use this to present collapsible sections of content, useful for long lists or frequently asked questions.

- **Code**

```jsx
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">What is Rootstock?</Accordion.Header>
    <Accordion.Body>
      ...
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">What is a smart contract?</Accordion.Header>
    <Accordion.Body>
      ...
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">Is the Rootstock network compatible with the Ethereum network?</Accordion.Header>
    <Accordion.Body>
      ...
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

- **Result**

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">What is Rootstock?</Accordion.Header>
    <Accordion.Body>
      LRootstock is the first and longest-lasting Bitcoin sidechain. It is the only layer 2 solution that combines the security of Bitcoin's proof of work with Ethereum's smart contract capabilities. The platform is open-source, EVM-compatible, and secured by over 60% of Bitcoin’s hashing power, making it the gateway to a vibrant ecosystem of dApps that continues to evolve to become fully trustless.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">What is a smart contract?</Accordion.Header>
    <Accordion.Body>
      Smart contracts are digital agreements stored on a blockchain network such as Rootstock and executed automatically without intermediaries. A smart contract allows digital assets to be controlled, exchanged, and transferred. Smart contracts have numerous use cases, such as lending, voting, decentralized payments and exchanges, asset tokenization, etc.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">Is the Rootstock network compatible with the Ethereum network?</Accordion.Header>
    <Accordion.Body>
    - Rootstock is [compatible with the Ethereum blockchain](https://medium.com/iovlabs-innovation-stories/similarities-and-differences-between-rsk-and-ethereum-e480655eff37) at the following layers:
      - EVM compatibility
      - Interprocess connectivity in JSON-RPC
      - Smart contract programming in Solidity
      - JavaScript interface with web3.js
    - The Rootstock virtual machine (RVM) is highly compatible with the Ethereum Virtual Machine (EVM). Approximately annually, the Ethereum community performs a hard fork to add new functionalities to the blockchain. When these new functionalities align with Rootstock's vision, the community performs a corresponding hard fork to maintain compatibility with the EVM.
    - Additionally, the RVM offers improved features over EVM, such as bridging with Bitcoin and querying the Bitcoin blockchain.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

## Tabs
Use this to present structured data with clear rows and columns for easy comparison or reference.

- **Code**

```jsx
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

- **Result**

<Tabs>
  <TabItem value="contribute" label="Contribute to Rootstock" default>
    Are you passionate about web3, bitcoin and the Blockchain? Do you have a passion for Open Source and Web3? Do you enjoy writing, coding, bounty hunting, solving real-world problems, and eager to contribute to the future of Bitcoin and Decentralized Finance? Join the Rootstock Discord Community and start making contributions!
  </TabItem>
  <TabItem value="contest" label="Contest Themes">
    The contest welcomes submissions under the following themes:

    * Thought Leadership: Explore various topics about Bitcoin, both new and old, such as Runes, what Satoshi’s writings mean to you, ordinals, layer 2 solutions, sidechains, how Bitcoin changed finance forever, and/or quality analysis about its price prediction or impact on inflation.
    * Dev Stack and Tooling: Delve into the development stack and tooling related to building on Bitcoin, including SDKs, APIs, smart contract development frameworks, etc. Developers and makers should showcase the technical capabilities for building with Bitcoin.
    * Tutorials and Guides: Provide step-by-step tutorials and guides on how to build applications, smart contracts, or implement specific features. Bonus points for building with Rootstock. These tutorials and guides will serve as practical guides for developers and enthusiasts looking to start building on Bitcoin.
  </TabItem>
  <TabItem value="requirements" label="Requirements">
    > RSKj allows you to run a Rootstock node, crucial for local development and testing. It supports connections to Regtest (local), Testnet (testing), and Mainnet (production). Visit the [official RSKj GitHub repository](https://github.com/rsksmart/rskj) to download the latest stable release.
  </TabItem>
</Tabs>


## Cards
Use this to display concise pieces of information in an organized and visually appealing way.

- **Card with image**
Cards with an image and accompanying descriptive text.

  - Code

```jsx
<Card
  image="/img/electrum-wallet.png"
  title="Card title first line"
  description="..."
  link="/developers/"
/>
```
**Result**
<Card
image="/img/electrum-wallet.png"
title="Card title first line" description="Mauris maecenas et amet arcu urna interdum aliquet vulputate sed. Quam sit sit tincidunt vitae." link="/developers/" />


- **Card no image**
Cards displaying textual information only.
  - **Code**

  ```jsx
  <Card
  title="Card title first line"
  description="..."
  link="/developers/"
  />
  ```

**Result**
<Card
title="Card title first line" description="Mauris maecenas et amet arcu urna interdum aliquet vulputate sed. Quam sit sit tincidunt vitae." link="/developers/" />

 


<br/>
- **Card no link**
Informational cards without requiring user clicks.
  - Code

```jsx
<Card
  image="/img/electrum-wallet.png"
  title="Card title first line"
  description="..."
/>
```
<Card
image="/img/electrum-wallet.png"
title="Card title first line" description="Mauris maecenas et amet arcu urna interdum aliquet vulputate sed. Quam sit sit tincidunt vitae." />


## Cards with filter
- **Code**

```jsx
<Filter
  values={[
    {label: 'Apps', value: 'apps'},
    {label: 'Exchanges', value: 'exchanges'},
    {label: 'Wallets', value: 'wallets'}
  ]}>
  <FilterItem
    image="/img/deffiant-icon.svg"
    value="apps"
    title="Defiant"
    subtitle="app"
    color="green"
    description="Get ... in minutes"
  />
  ...
  <FilterItem
    image="/img/deffiant-icon.svg"
    value="wallets, apps"
    title="Defiant"
    subtitle="wallet"
    color="cyan"
    linkHref="/developers/"
    linkTitle="Learn more"
    description="Get ... in minutes"
  />
</Filter>
```

**Result**
<Filter
values={[
{label: 'Apps', value: 'apps'},
{label: 'Exchanges', value: 'exchanges'},
{label: 'Wallets', value: 'wallets'}
]}>
<FilterItem
image="/img/deffiant-icon.svg"
value="apps"
title="Defiant"
subtitle="app"
color="green"
description="Get an API key & make your first API call in minutes"
/>
<FilterItem
image="/img/deffiant-icon.svg"
value="apps"
title="Defiant"
subtitle="app"
color="green"
description="Get an API key & make your first API call in minutes"
/>
<FilterItem
image="/img/deffiant-icon.svg"
value="exchanges"
title="Defiant"
subtitle="exchanges"
description="Get an API key & make your first API call in minutes"
/>
<FilterItem
image="/img/deffiant-icon.svg"
value="wallets"
title="Defiant"
subtitle="wallet"
color="pink"
linkHref="/developers/"
linkTitle="Learn more"
description="Get an API key & make your first API call in minutes"
/>
<FilterItem
image="/img/deffiant-icon.svg"
value="wallets"
title="Defiant"
subtitle="wallet"
color="pink"
linkHref="/developers/"
linkTitle="Learn more"
description="Get an API key & make your first API call in minutes"
/>
<FilterItem
image="/img/deffiant-icon.svg"
value="wallets, apps"
title="Defiant"
subtitle="wallet"
color="cyan"
linkHref="/developers/"
linkTitle="Learn more"
description="Get an API key & make your first API call in minutes. Get an API key & make your first API call in minutes"
/>
</Filter>


