---
sidebar_label: Hacktivator
sidebar_position: 2
title: 🌱 Hacktivator de Rootstock 💻
description: El Hacktivator de Rootstock les permite a los desarrolladores integrarse a Rootstock mediante la contribución de código o la creación de contenido educativo. Usted puede contribuir al desarrollo de la plataforma a su propio ritmo, y cada contribución elegible será recompensada según su impacto y valor.
tags:
  - rootstock
  - rsk
  - código
  - recursos
  - contenido
  - hacktivator
  - escritura
  - recompensas
---

¡Bienvenido al Hacktivator de Rootstock! Diseñado para desarrolladores que desean contribuir al ecosistema de Rootstock y recibir recompensas por sus valiosas contribuciones.

<Button size="lg" href="https://forms.gle/aF9pFMfRyoygfzJWA">Envíe su trabajo</Button>

## 🌟 ¿Qué es?

El Hacktivator de Rootstock les permite a los desarrolladores integrarse a Rootstock mediante la contribución de código o la creación de contenido educativo. Usted puede contribuir al desarrollo de la plataforma a su propio ritmo, y cada contribución elegible será recompensada según su impacto y valor.

## ✔️ Criterios generales de contribución

- **Calidad:** Las contribuciones deben ser valiosas para el ecosistema de Rootstock, ya sea al mejorar la funcionalidad, optimizar la usabilidad o educar a desarrolladores y miembros de la comunidad.
- **Originalidad:** Todo el trabajo debe ser original y creado por usted. Las traducciones o adaptaciones deben mantenerse fieles al material original.
- **Relevancia:** Las contribuciones deben beneficiar directamente a la comunidad de desarrolladores y al ecosistema de Rootstock.
- **Precisión:** El código, los tutoriales y cualquier otro contenido técnico deben ser precisos y técnicamente correctos.

## 🎁 Recompensas por categoría

Las contribuciones elegibles serán recompensadas según lo establecido en los términos y condiciones del hacktivator, y en función del valor e impacto que aporten a la comunidad de desarrolladores de Rootstock, de acuerdo con las especificaciones que se detallan a continuación para cada categoría.

### Categoría 1: Contribuciones de código 🛠️

Se invita a los desarrolladores a aprovechar los proyectos de referencia para hacer contribuciones significativas al ecosistema de Rootstock. Vea las opciones a continuación:

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

#### 👉 Criterios para las contribuciones de código

Para una visión general completa del sistema de evaluación y recompensa para las contribuciones de código, que incluye criterios detallados sobre complejidad, impacto del proyecto, pruebas y documentación, consulte los [Criterios de evaluación para contribuciones de código](https://docs.google.com/document/d/1vWYWdWxSXUcTxNS_OlRikfEwmPSXgw3iDsQ-UAqheMw/edit) y los [términos y condiciones del hacktivator](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing). Estos criterios describen cómo se evaluarán y recompensarán las contribuciones, que van desde correcciones simples hasta características avanzadas o integraciones externas, asegurando un enfoque equilibrado y justo para valorar la participación e impacto de los desarrolladores. Este documento cubre todo, desde la optimización del rendimiento hasta la integración de API externas, con recompensas ajustadas según el valor y la complejidad de cada contribución.

#### 👉 Recompensas por contribuciones de código

Cada contribución de código verificada y aprobada que se convierta en una Contribución Calificada (según se define en los términos y condiciones de Hacktivator mencionados anteriormente) tendrá derecho a recibir las siguientes recompensas, conforme al mecanismo estipulado:

- **Level 1 —> 50 - 150 USD**
  - **Basic Contribution (Low Complexity):** Minor documentation or style fixes (e.g., correcting typos, adding a missing comment explaining a function’s purpose).
- **Level 2 —> 150 - 300 USD**
  - Small Improvements (Medium-Low Complexity): Refactors or optimizations that don’t change functionality but improve code efficiency or readability.
- **Level 3 —> 300 - 700 USD**
  - **New Feature or Significant Improvement (Medium-High Complexity):** Implementing a simple new feature or enhancing existing functionality.
- **Level 4 —> 700 - 1000 USD**
  - **Complex or Innovative Contribution (High Complexity):** Large-scale features or critical changes requiring coordination across multiple components (e.g., API integration or system architecture changes).

> El rango de recompensas proporcionado para cada opción se utilizará en función del nivel de contribución al proyecto para calificar. Es decir, si el Contribuidor cumple solo con lo mínimo requerido para calificar, se le asignarán las recompensas mínimas para cada opción. Sin embargo, cuanto más aporte el Contribuidor a su contribución y opción elegidas, mayores serán las recompensas que podrá recibir (hasta el límite máximo establecido para cada opción).

### Categoría 2: Contenidos educativos 📝

Usted puede contribuir a la plataforma Rootstock creando uno de los siguientes tipos de contenido:

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

Sus contribuciones pueden cubrir cualquiera de los siguientes temas de Rootstock:

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

#### 👉 Criterios y guías de contenido educativo:

- Los blogs, tutoriales (escritos o en video) y la documentación técnica deben ser contenidos originales creados después del lanzamiento de Hacktivator el 11 de noviembre **(no publicados previamente en otro lugar)**, deben ser rigurosos y proporcionar información práctica. Comparta su contenido mediante Google Drive proporcionando la URL en el formulario de envío (enlace a continuación).
- El contenido educativo debe estar dirigido a desarrolladores que quieran construir sobre Rootstock o comprender su integración con Bitcoin.
- El contenido debe ayudar a otros desarrolladores a navegar y trabajar con Rootstock, implementar contratos inteligentes, utilizar herramientas, kits de desarrollo de software y bibliotecas compatibles, e integrar protocolos en Rootstock.
- Las contribuciones para la documentación técnica de Rootstock deben enviarse como una solicitud de incorporación de cambios (Pull Request, PR) directamente en el [repositorio de DevPortal](https://github.com/rsksmart/devportal/pulls), y el enlace de la PR debe ser enviado a través del [formulario de Google](https://forms.gle/aF9pFMfRyoygfzJWA). Asegúrese de utilizar la etiqueta **“hacktivator”** en la PR y de describir adecuadamente su PR utilizando la plantilla.
- After approval, the contributor must publish their educational content on the [Rootstock Community blog](https://rootstock.hashnode.dev/) to qualify for rewards. They will be invited as a collaborator to do so, and the contribution will only be eligible for rewards once successfully published.

:::note Más información sobre las pautas

For a comprehensive overview of the guidelines, evaluation, and reward system for content contributions, including detailed criteria for depth, completeness, technical accuracy, educational value, and innovation, please refer to the [Educational Content Evaluation Criteria & Guidelines](https://docs.google.com/document/d/1vA3QK8ZNv5Fgegb0Jv2f03IVIREePDi4lrFE1vsfK7c/edit) and the [terms and conditions of the Hacktivator](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing). These criteria outline how contributions, ranging from technical documentation, written or video guides or tutorials will be assessed and rewarded, ensuring a balanced and fair approach to valuing content quality and impact. This document covers everything from word count appropriateness and inclusion of code examples to technical correctness and relevance to the Rootstock ecosystem, with rewards adjusted based on the value and complexity of each contribution.

👉 Pautas a la hora de publicar:

- Siga la [Guía de estilo de Rootstock](https://github.com/rsksmart/devportal/blob/main/STYLE-GUIDE.md)
- Vea [Contribuir a la documentación de Rootstock](https://github.com/rsksmart/devportal/blob/main/CONTRIBUTING_DOCS.md) y [Pautas para los colaboradores de Rootstock](https://github.com/rsksmart/devportal/blob/main/CONTRIBUTING.md)

:::

#### 👉 Recompensas de contenido educativo:

Each verified and approved code contribution that becomes a Qualified Contribution (as defined in the Hacktivator's terms and conditions) will be entitled to receive the following rewards, under the established process:

- **Contribución de publicación en el blog:** 50 - 250 USD
- **Contribución de escritura de guías o tutoriales:** 250 - 500 USD
- **Contribución de contenido técnico:** 500 - 700 USD
- **Contribución de guías o tutoriales en video:** 700 - 1000 USD

El rango de recompensas proporcionado para cada opción se utilizará en función del nivel de contribución al proyecto a calificar. Es decir, si el Contribuidor cumple solo con lo mínimo requerido para calificar, se le asignarán las recompensas mínimas para cada opción. Sin embargo, cuanto más aporte el Contribuidor a su contribución y opción elegidas, mayores serán las recompensas que podrá recibir (hasta el límite máximo establecido para cada opción).

## 📤 Proceso de envío

Es muy fácil enviar sus contribuciones. Solo siga estos pasos:

1. Complete su trabajo: Ya sea código o contenido educativo, asegúrese de que esté completamente terminado y cumpla con los criterios de contribución.
2. Envíe su contribución a través del formulario de Google: Use este [enlace al formulario](https://forms.gle/aF9pFMfRyoygfzJWA) para enviarla. Se le pedirá que proporcione:

- Su nombre o seudónimo
- País
- Dirección de correo electrónico
- La dirección de su billetera
- El tipo de contribución y los detalles relevantes
- Una breve descripción de su trabajo.
- Un enlace a su propuesta (por ejemplo: PR, GitHub para código, o enlaces a blogs o tutoriales escritos o en video).

3. Revisión: Su propuesta será revisada por expertos. Es posible que se le pida realizar modificaciones o que proporcione más información.

Esta es su oportunidad de dejar una huella significativa en Rootstock a la vez que gana recompensas. ¿Está listo para contribuir? ¡Envíe su trabajo y forme parte de la comunidad de desarrolladores de Rootstock! 🌍

<Button size="lg" href="https://forms.gle/aF9pFMfRyoygfzJWA">Envíe su trabajo</Button>

:::success T&C

Al participar en Hacktivator, usted reconoce que ha leído, comprendido y acepta cumplir con todos los aspectos del programa y sus [términos y condiciones](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing). Si no está de acuerdo con alguna parte o con todos los términos del programa o sus términos y condiciones, absténgase de unirse o enviar contribuciones, ya que su participación será interpretada como una aceptación total de estos términos.

:::


