---
sidebar_label: Hacktivator
sidebar_position: 2
title: 🌱 Rootstock Hacktivator 💻
description: Rootdtock Hacktivator는 개발자가 코드에 기여하거나 교육 콘텐츠를 생성하여 Rootstock으로 발전할 수 있게 지원합니다. 자신의 속도에 맞춰 플랫폼을 지원할 수 있으며 적격한 모든 기여에는 그 영향과 가치에 따라 보상이 지급됩니다.
tags:
  - rootstock
  - rsk
  - 코드
  - 참고 자료
  - 콘텐츠
  - hacktivator
  - 글쓰기
  - 보상
---

Rootstock Hacktivator에 오신 것을 환영합니다! Rootstock Hacktivator는 Rootstock 생태계에 기여하는 개발자분들에게 보상을 드리고자 만들어졌습니다.

<Button size="lg" href="https://forms.gle/aF9pFMfRyoygfzJWA">작업 제출</Button>

## 🌟 이건 무엇인가요?

Rootdtock Hacktivator는 개발자가 코드에 기여하거나 교육 콘텐츠를 생성하여 Rootstock으로 발전할 수 있게 지원합니다. 자신의 속도에 맞춰 플랫폼을 지원할 수 있으며 적격한 모든 기여에는 그 영향과 가치에 따라 보상이 지급됩니다.

## ✔️ 일반적인 기여 기준

- **품질:** 기여는 기능 개선이든, 사용성 향상이든, 개발자와 커뮤니티 일원에 대한 교육이든, Rootstock 생태계에 가치 있어야 합니다.
- **독창성:** 모든 작업은 자신이 만든 창작품이어야 합니다. 번역이나 각색은 원본 자료에 충실해야 합니다.
- **관련성:** 기여는 Rootstock 개발자 커뮤니티와 생태계에 직접적으로 도움이 되어야 합니다.
- **정확성:** 코드, 튜토리얼 및 기타 기술 콘텐츠는 엄밀하고 기술적으로 정확해야 합니다.

## 🎁 카테고리별 보상

Hacktivator 약관에 규정된 내용과 Rootstock 개발자 커뮤니티에 제공하는 가치와 영향력에 따라 적격한 기여에는 각 카테고리별로 아래의 사양에 따라 보상이 지급됩니다.

### 카테고리 1: 코드 기여 🛠️

개발자는 참고 프로젝트를 활용하여 Rootstock 생태계에 의미 있는 기여를 하는 것이 좋습니다. 아래의 옵션을 참고하세요.

```mdx-code-block
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
```

#### 👉 코드 기여 기준

복잡도, 프로젝트 영향력, 테스트, 문서 등에 대한 자세한 기준을 포함해, 코드 기여에 대한 평가와 보상 시스템의 종합적인 개요를 확인하려면 [코드 기여 평가 기준](https://docs.google.com/document/d/1vWYWdWxSXUcTxNS_OlRikfEwmPSXgw3iDsQ-UAqheMw/edit) 및 [Hacktivator 약관](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing)을 참조해 주세요. 이러한 기준은 단순한 수정에서 고급 기능이나 외부 통합에 이르는 다양한 기여를 평가하고 보상을 지급하는 방법에 대해 설명하며, 공정하면서도 균형 잡힌 방식으로 개발자의 참여와 영향력이 평가될 수 있게 보장합니다. 이 문서에서는 성능 최적화에서 외부 API 통합까지 모든 내용을 다루며, 보상은 각 기여의 가치와 복잡도에 따라 조정됩니다.

#### 👉 코드 기여 보상

각 코드 기여가 상기 Hacktivator 약관에서 정의된 바와 같이 검증되고 승인되어 적격 기여가 되면 정해진 프로세스에 따라 다음과 같은 보상을 받을 권리가 있습니다.

- **Level 1 —> 50 - 150 USD**
  - **Basic Contribution (Low Complexity):** Minor documentation or style fixes (e.g., correcting typos, adding a missing comment explaining a function’s purpose).
- **Level 2 —> 150 - 300 USD**
  - Small Improvements (Medium-Low Complexity): Refactors or optimizations that don’t change functionality but improve code efficiency or readability.
- **Level 3 —> 300 - 700 USD**
  - **New Feature or Significant Improvement (Medium-High Complexity):** Implementing a simple new feature or enhancing existing functionality.
- **Level 4 —> 700 - 1000 USD**
  - **Complex or Innovative Contribution (High Complexity):** Large-scale features or critical changes requiring coordination across multiple components (e.g., API integration or system architecture changes).

> 각 옵션의 보상 범위는 프로젝트 기여 수준에 따라 자격 부여에 사용됩니다. 즉, 기여자가 자격 획득에 필요한 최소 요건만 충족하는 경우 각 옵션의 최소 보상만 할당됩니다. 기여자의 기여분과 선택된 옵션이 많아질수록 지급되는 보상이 늘어납니다(각 옵션에 설정된 최대 한도까지).

### 카테고리 2: 교육용 콘텐츠 📝

다음과 같은 유형의 콘텐츠 중 하나를 만들어 Rootstock 플랫폼에 기여할 수 있습니다.

```mdx-code-block
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
```

다음과 같은 Rootstock 주제를 사용자의 기여에서 다룰 수 있습니다.

```mdx-code-block
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
```

#### 👉 교육용 콘텐츠 기준 및 지침:

- 블로그, 튜토리얼(문서 또는 동영상), 기술 문서는 11월 11일 Hacktivator가 출시된 이후\*\*(이전에 다른 곳에서 공개된 것이어서는 안 됨)\*\* 작성된 창작 콘텐츠로서, 정확하고 실행 가능한 인사이트를 제공해야 합니다. 콘텐츠는 제출 양식(아래에 링크)에 URL을 제공하는 방식으로 Google Drive를 통해 공유해 주세요.
- 교육용 콘텐츠는 Rootstock에서 구축하고자 하거나 Bitcoin과의 통합에 관해 알고 있는 개발자를 대상으로 해야 합니다.
- 콘텐츠는 다른 개발자가 Rootstock을 탐색하여 이를 통해 작업하고, 스마트 컨트랙트를 배포하고, 호환되는 도구와 SDK, 라이브러리를 사용하고, Rootstock에서 프로토콜을 통합하는 데 도움이 되어야 합니다.
- Rootstock 기술 문서에 대한 기여는 풀 리퀘스트(PR)로 [개발자 포털 리포지토리](https://github.com/rsksmart/devportal/pulls)에 직접 제출해야 하며, PR 링크는 [Google 양식](https://forms.gle/aF9pFMfRyoygfzJWA)을 통해 제출해야 합니다. PR에는 **"hacktivator"** 라벨을 사용하고 템플릿을 사용해 PR을 적절히 설명해야 합니다.
- After approval, the contributor must publish their educational content on the [Rootstock Community blog](https://rootstock.hashnode.dev/) to qualify for rewards. They will be invited as a collaborator to do so, and the contribution will only be eligible for rewards once successfully published.

:::note[More [지침에 관한 추가 정보]

For a comprehensive overview of the guidelines, evaluation, and reward system for content contributions, including detailed criteria for depth, completeness, technical accuracy, educational value, and innovation, please refer to the [Educational Content Evaluation Criteria & Guidelines](https://docs.google.com/document/d/1vA3QK8ZNv5Fgegb0Jv2f03IVIREePDi4lrFE1vsfK7c/edit) and the [terms and conditions of the Hacktivator](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing). These criteria outline how contributions, ranging from technical documentation, written or video guides or tutorials will be assessed and rewarded, ensuring a balanced and fair approach to valuing content quality and impact. This document covers everything from word count appropriateness and inclusion of code examples to technical correctness and relevance to the Rootstock ecosystem, with rewards adjusted based on the value and complexity of each contribution.

👉 발행 시 지침:

- [Rootstock 스타일 가이드](https://github.com/rsksmart/devportal/blob/main/STYLE-GUIDE.md)를 준수하세요
- [Rootstock 문서에 기여하기](https://github.com/rsksmart/devportal/blob/main/CONTRIBUTING_DOCS.md) 및 [Rootstock 기여자 지침](https://github.com/rsksmart/devportal/blob/main/CONTRIBUTING.md)을 참조하세요

:::

#### 👉 교육용 콘텐츠 보상:

Each verified and approved code contribution that becomes a Qualified Contribution (as defined in the Hacktivator's terms and conditions) will be entitled to receive the following rewards, under the established process:

- **블로그 게시물 기여:** 50~250 USD
- **가이드 또는 튜토리얼 문서 작성 기여:** 250~500 USD
- **기술 콘텐츠 기여:** 500~700 USD
- **동영상 가이드 또는 튜토리얼 기여:** 700~1,000 USD

각 옵션의 보상 범위는 프로젝트 기여 수준에 따라 자격 부여에 사용됩니다. 즉, 기여자가 자격 획득에 필요한 최소 요건만 충족하는 경우 각 옵션의 최소 보상만 할당됩니다. 기여자의 기여분과 선택된 옵션이 많아질수록 지급되는 보상이 늘어납니다(각 옵션에 설정된 최대 한도까지).

## 📤 제출 절차

기여는 간단히 제출할 수 있습니다! 다음 단계를 따르기만 하면 됩니다.

1. 작업 완료: 코드, 교육용 콘텐츠가 세련되게 다듬어졌으며 기여 기준을 충족하는지 확인하세요.
2. Google 양식을 통해 제출: 이 [양식 링크](https://forms.gle/aF9pFMfRyoygfzJWA)를 사용하여 기여를 제출하세요. 제공해야 할 항목은 다음과 같습니다.

- 이름 또는 가명
- 국가
- 이메일 주소
- 지갑 주소
- 기여의 유형과 관련 상세 정보
- 작업에 대한 간략한 설명.
- 제출물 링크(예: PR, GitHub(코드의 경우), 문서/동영상 블로그/튜토리얼 링크).

3. 검토: 제출물은 전문가의 리뷰를 받게 됩니다. 수정이나 추가 정보 제공 요청을 받을 수 있습니다.

보상도 획득하고, Rootstock에 의미 있는 영향력도 발휘할 기회입니다. 기여할 준비가 되셨나요? 작업을 제출하고 Rootstock 개발자 커뮤니티의 일원이 되어보세요! 🌍

<Button size="lg" href="https://forms.gle/aF9pFMfRyoygfzJWA">작업 제출</Button>

<br></br>

:::success\[T\&C]

Hactivator에 참여함으로써 귀하는 프로그램의 모든 측면과 해당 [약관](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing)을 읽고 이해했으며, 이를 준수하는 데 동의한다고 인정하게 됩니다. 귀하의 참여는 이러한 약관에 대한 완전한 수락으로 간주되므로 프로그램 및/또는 그 약관의 일부 또는 전체에 동의하지 않는 경우, 기여에 참여하거나 제출하지 마십시오.

:::


