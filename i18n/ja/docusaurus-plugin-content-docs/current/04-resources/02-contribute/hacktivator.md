---
sidebar_label: Hacktivator
sidebar_position: 2
title: 🌱 Rootstock Hacktivator 💻
description: Rootstock Hacktivatorでは、開発者がコードを提供したり教育コンテンツを作成したりすることで、Rootstockを進化させることができます。自分のペースでプラットフォームをサポートでき、対象となる貢献にはその影響力と価値に応じて報酬が支払われます。
tags:
  - rootstock
  - rsk
  - コード
  - リソース
  - コンテンツ
  - hacktivator
  - ライティング
  - 報酬
---

Rootstock Hacktivatorへようこそ！このページは、Rootstockエコシステムに貢献し、その価値ある貢献に対して報酬を受け取りたい開発者のために作成されました。

<Button size="lg" href="https://forms.gle/aF9pFMfRyoygfzJWA">コンテンツを投稿する</Button>

## 🌟 Rootstock Hacktivatorとは？

Rootstock Hacktivatorでは、開発者がコードを提供したり教育コンテンツを作成したりすることで、Rootstockを進化させることができます。自分のペースでプラットフォームをサポートでき、対象となる貢献にはその影響力と価値に応じて報酬が支払われます。

## ✔️ 一般的な貢献基準

- **品質：** 貢献は、機能性の向上、ユーザビリティの強化、開発者やコミュニティメンバーの教育など、Rootstockエコシステムにとって価値のあるものでなければなりません。
- **独創性：** すべてのコンテンツはオリジナルで、自分で作成したものでなければなりません。翻訳やアダプテーションに関しては、元の素材に忠実である必要があります。
- **関連性：** Rootstockの開発者コミュニティとエコシステムに直接利益をもたらす貢献でなければなりません。
- **正確性：** コード、チュートリアル、その他の技術コンテンツは、正確で技術的に正しいものでなければなりません。

## 🎁 カテゴリー別報酬

対象となる貢献は、Hacktivatorの利用規約に従って、Rootstock開発者コミュニティに与える価値と影響に基づいて報酬が支払われます。各カテゴリーに対する条件は以下の通りです。

### カテゴリー1：コードの貢献 🛠️

開発者は参考プロジェクトを活用して、Rootstockエコシステムに有意義な貢献をすることが推奨されます。以下のオプションを参照してください。

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

#### 👉 コードの貢献基準

複雑性、プロジェクトへの影響、テスト、文書化に関する詳細な基準を含む、コードの貢献に対する評価と報酬システムの包括的な概要については、[コード貢献の評価基準](https://docs.google.com/document/d/1vWYWdWxSXUcTxNS_OlRikfEwmPSXgw3iDsQ-UAqheMw/edit)および[Hacktivatorの利用規約](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing)を参照してください。これらの基準では、単純な修正から高度な機能や外部統合に至るまで、貢献の評価方法と報酬の仕組みについて概説しており、開発者の参加とその影響を公平かつ適正に評価するアプローチを保証しています。また、このドキュメントでは、パフォーマンスの最適化から外部APIの統合まで、あらゆる内容が含まれており、報酬は各貢献の価値と複雑性に基づいて調整されます。

#### 👉 コードの貢献報酬

（上記のHacktivatorの利用規約で定められた）「適格な貢献」として検証・承認されたコンテンツの貢献はそれぞれ、確立されたプロセスに従って、以下の報酬を受け取る権利を有します。

- **Level 1 —> 50 - 150 USD**
  - **Basic Contribution (Low Complexity):** Minor documentation or style fixes (e.g., correcting typos, adding a missing comment explaining a function’s purpose).
- **Level 2 —> 150 - 300 USD**
  - Small Improvements (Medium-Low Complexity): Refactors or optimizations that don’t change functionality but improve code efficiency or readability.
- **Level 3 —> 300 - 700 USD**
  - **New Feature or Significant Improvement (Medium-High Complexity):** Implementing a simple new feature or enhancing existing functionality.
- **Level 4 —> 700 - 1000 USD**
  - **Complex or Innovative Contribution (High Complexity):** Large-scale features or critical changes requiring coordination across multiple components (e.g., API integration or system architecture changes).

> 各オプションで提供される報酬の範囲は、適格性を判断するプロジェクトへの貢献度に基づいて適用されます。つまり、貢献者が資格を得るために必要な最低要件のみを満たしている場合は、各オプションにおける最小限の報酬が割り当てられます。しかし、貢献者が貢献内容や選択したオプションに対してより多くの価値を提供した場合、それに応じて受け取る報酬も増加します（ただし、各オプションで設定された上限まで）。

### カテゴリー2：教育コンテンツ 📝

以下の種類のコンテンツを作成することで、Rootstockプラットフォームに貢献できます。

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

以下のRootstockのテーマを扱うことで、貢献できます。

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

#### 👉 教育コンテンツの基準とガイドライン：

- ブログ、（文書または動画による）チュートリアル、および技術文書は、Hacktivatorが開始された11月11日以降に作成されたオリジナルコンテンツである必要があります\*\*（この日付以前に他の場所で公開されていないこと）\*\*。また、その内容は正確であり、実用的な洞察を提供することが求められます。コンテンツは、投稿フォーム（下記リンク）にURLを記入し、Google Drive経由で共有してください。
- 教育コンテンツは、Rootstockでの構築を試みる開発者や、Bitcoinとの統合について理解したいと考えている開発者向けに作成する必要があります。
- コンテンツは、Rootstockの理解と活用、スマートコントラクトのデプロイ、互換性のあるツール、SDK、およびライブラリの使用、またはRootstock上でのプロトコル統合に関して、他の開発者に役立つ内容である必要があります。
- Rootstockの技術文書に対する貢献は、[DevPortalレポジトリ](https://github.com/rsksmart/devportal/pulls)上にプルリクエスト（PR）として直接投稿し、PRのリンクは[Googleフォーム](https://forms.gle/aF9pFMfRyoygfzJWA)経由で送信してください。PRには必ず\*\*「hacktivator」\*\*のラベルを付け、テンプレートを使ってPRの内容を適切に記述してください。
- After approval, the contributor must publish their educational content on the [Rootstock Community blog](https://rootstock.hashnode.dev/) to qualify for rewards. They will be invited as a collaborator to do so, and the contribution will only be eligible for rewards once successfully published.

:::note[More ガイドラインの詳細]

For a comprehensive overview of the guidelines, evaluation, and reward system for content contributions, including detailed criteria for depth, completeness, technical accuracy, educational value, and innovation, please refer to the [Educational Content Evaluation Criteria & Guidelines](https://docs.google.com/document/d/1vA3QK8ZNv5Fgegb0Jv2f03IVIREePDi4lrFE1vsfK7c/edit) and the [terms and conditions of the Hacktivator](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing). These criteria outline how contributions, ranging from technical documentation, written or video guides or tutorials will be assessed and rewarded, ensuring a balanced and fair approach to valuing content quality and impact. This document covers everything from word count appropriateness and inclusion of code examples to technical correctness and relevance to the Rootstock ecosystem, with rewards adjusted based on the value and complexity of each contribution.

👉 公開時のガイドライン：

- [Rootstockのスタイルガイド](https://github.com/rsksmart/devportal/blob/main/STYLE-GUIDE.md)に従ってください
- [Rootstockドキュメントへの貢献](https://github.com/rsksmart/devportal/blob/main/CONTRIBUTING_DOCS.md)、および[Rootstockの貢献者ガイドライン](https://github.com/rsksmart/devportal/blob/main/CONTRIBUTING.md)を見る

:::

#### 👉 教育コンテンツの報酬：

Each verified and approved code contribution that becomes a Qualified Contribution (as defined in the Hacktivator's terms and conditions) will be entitled to receive the following rewards, under the established process:

- **ブログ記事の貢献：** 50～250 USD
- **文書によるガイドまたはチュートリアルの貢献：** 250～500 USD
- **技術コンテンツの貢献：** 500～700 USD
- **動画によるガイドまたはチュートリアルの貢献：** 700～1000 USD

各オプションで提供される報酬の範囲は、適格性を判断するプロジェクトへの貢献度に基づいて適用されます。つまり、貢献者が資格を得るために必要な最低要件のみを満たしている場合は、各オプションにおける最小限の報酬が割り当てられます。しかし、貢献者が貢献内容や選択したオプションに対してより多くの価値を提供した場合、それに応じて受け取る報酬も増加します（ただし、各オプションで設定された上限まで）。

## 📤 投稿プロセス

投稿方法は簡単です！以下の手順に従ってください。

1. 作業を完成させる：コードでも教育コンテンツでも、内容が洗練されており貢献基準を満たしていることを確認してください。
2. Googleフォーム経由で投稿する：こちらの[フォームリンク](https://forms.gle/aF9pFMfRyoygfzJWA)を使用して投稿してください。フォームでは、以下の項目を入力するよう求められます。

- ご自身の名前またはペンネーム
- 国
- メールアドレス
- あなたのウォレットアドレス
- 貢献の種類と関連する内容
- 投稿するコンテンツに関する簡単な説明
- 投稿へのリンク（PR、コードのGitHub、文書または動画によるブログやチュートリアルへのリンクなど）

3. 審査：投稿された内容は専門家によって審査を受けます。なお、修正や追加情報の提供を求められる場合があります。

Rootstockに意味のある影響を与えながら、報酬を受け取るチャンスです。貢献する準備はできましたか？あなたの作業を投稿し、Rootstockの開発者コミュニティの一員になりましょう！🌍

<Button size="lg" href="https://forms.gle/aF9pFMfRyoygfzJWA">コンテンツを投稿する</Button>

<br></br>

:::success\[T\&C]

Hacktivatorに参加することで、あなたはプログラムおよびその[利用規約](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing)の内容をすべて読み、理解して、遵守することに同意したものとみなされます。プログラムおよび／または利用規約の一部またはすべてに同意できない場合、参加または貢献の投稿はお控えいただきますようお願いいたします。参加した時点で、これらの規約にすべて同意したものとみなされます。

:::


