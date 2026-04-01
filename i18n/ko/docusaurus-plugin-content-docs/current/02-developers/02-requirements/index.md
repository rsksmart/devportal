---
sidebar_label: Rootstock 개발을 위한 사전 준비 사항
sidebar_position: 2
title: Rootstock 개발을 위한 사전 준비 사항
tags:
  - RSK
  - Rootstock
  - 사전 준비 사항
  - 설정
  - 요구 사항
description: Rootstock 실행을 위한 최소 하드웨어 사양
---

이 가이드는 개발자가 스마트 컨트랙트를 Rootstock 네트워크에 정상적으로 배포하는 데 필요한 Solidity 버전과 필수 설정 사항을 안내합니다.

:::tip Hackathons 해커톤 & 워크숍

- Rootstock 해커톤이나 워크숍에 참가하시나요?

- [해커톤 자료](/resources/hackathon/)  섹션에서 자세한 정보를 확인하세요.

- **자료**
 - 개발 도구 및 리소스 전체 목록은 [개발자 도구](/dev-tools/)  섹션에서 확인할 수 있습니다.

:::

````mdx-code-block
<Steps>
 <Step title="Software Requirements:">



원활한 개발 환경을 위해 필요한 소프트웨어를 설정하세요:

- **Solidity 버전:**
  - 지원되는 컴파일러 버전: **`solc 0.8.25`**.
  - 배포 오류를 방지하려면 호환되는 버전을 사용하세요.

- **노드 RPC 액세스:**
  - RPC API를 사용하여 Rootstock과 상호 작용하세요.
  - [API 키 받기](/developers/rpc-api/rootstock/setup/)후 애플리케이션에서 설정하세요.

- **Hardhat:**
  - 스마트 컨트랙트 개발 및 테스트 과정을 간소화하려면 Hardhat을 설치하세요:
    ```bash
    npm install --save-dev hardhat
    ```

    :::tip 추천 설정

    더 편리한 개발 환경을 위해 단축 명령어를 전역으로 설치하세요.
    - `hh` 자동 완성 기능을 설치하여 `hh` 단축 명령어를 전역으로 사용할 수 있습니다.
    ```bash
    npm i -g hardhat-shorthand
    ```

    - [Hardhat Starter Kit](/developers/quickstart/hardhat)를 사용하세요.

    - Rootstock에서 [Hardhat](/developers/smart-contracts/hardhat)과 [Foundry](/developers/smart-contracts/foundry/)를 사용해 스마트 컨트랙트를 작성, 상호작용, 배포 및 테스트하는 방법을 배워보세요.

     :::

- **Foundry (선택 사항)**
  - Hardhat의 대안으로 Foundry를 설치하여 스마트 컨트랙트 빌드, 배포, 테스트를 수행할 수 있습니다:
    ```bash
    curl -L https://foundry.paradigm.xyz | bash
    ```
  - `foundryup` 명령어를 실행하면 `forge`, `cast`, `chisel`, `anvil` 같은 도구들이 설치됩니다.
</Step>

<Step title="Wallet Configuration:">

Rootstock 네트워크에 연결할 수 있도록 지갑을 설정하세요:

- **MetaMask 연동:**
  - MetaMask를 Rootstock 메인넷 또는 테스트넷에 연결할 수 있도록 필요한 값을 설정하세요.
  - 자세한 설정 방법은 [MetaMask 지갑 설정 가이드](/dev-tools/wallets/metamask/)/developers/rpc-api/rootstock/setup/)를 참고하세요.

- **파생 경로:**
  - BIP-44 표준을 지원하는 지갑에서는 다음 경로를 사용하세요:
    - **메인넷(Mainnet):** `m/44'/137'/0'/0/N`
    - **테스트넷(Testnet):** `m/44'/37310'/0'/0/N`

:::info 정보[정보]
더 자세한 정보는 [계정 기반 주소(Account based addresses)](/concepts/account-based-addresses/)섹션이나 [주소 소유권 검증하기](/developers/smart-contracts/verify-address-ownership/) 섹션을 참고하세요.
:::

</Step>

<Step title="Contract Addresses">

개발 과정에서 자주 쓰이는 주요 스마트 컨트랙트 주소를 확인하세요:
- **[Rootstock 컨트랙트 전체 주소 목록](/developers/smart-contracts/contract-addresses/)을 확인하세요**.

</Step>

<Step title="Development Environments:">

다음 개발 환경 중 하나를 선택하여 스마트 컨트랙트를 빌드하고 배포하세요:

- **Hardhat:**
  - 스마트 컨트랙트 개발과 테스트를 효율적으로 관리할 수 있는 인기 프레임워크입니다.
  - [Hardhat Starter Kit](/developers/quickstart/hardhat/)을 활용하면 프로젝트를 쉽게 시작할 수 있습니다.

- **Foundry:**
  - Hardhat보다 가볍고 빠른 대안입니다.
  - `foundryup`을 사용하여 설치하고 관리할 수 있습니다.


:::note 참고[개발 환경]

Rootstock에서 [Hardhat](/developers/smart-contracts/hardhat)과 [Foundry](/developers/smart-contracts/foundry/)을 사용해 스마트 컨트랙트를 작성, 상호작용, 배포 및 테스트하는 방법을 배워보세요.

💡 *Hardhat과 Foundry를 둘 다 사용할 필요는 없습니다. 본인의 워크플로우에 적합한 환경을 선택하세요.*

:::
</Step>

<Step title="Command Line Tools">

CLI 도구를 활용하면 생산성을 높일 수 있습니다:

> POSIX 호환 쉘


<Tabs>
  <TabItem value="windows" label="Windows">
    `cmd` 나 PowerShell 같은 표준 터미널에서는 일부 명령어를 지원하지 않을 수 있습니다. [Git for Windows](https://gitforwindows.org)를 설치하여 Git Bash를 사용할 것을 권장합니다. Git Bash를 사용하면 UNIX와 유사한 환경을 경험할 수 있습니다.

    다음 [Git Bash 튜토리얼](https://www.atlassian.com/git/tutorials/git-bash)을 참고하세요.
  </TabItem>
  <TabItem value="macos" label="MacOS">
    표준 터미널.
  </TabItem>
  <TabItem value="Linux" label="Linux">
    표준 터미널.
  </TabItem>
</Tabs>


### Node.js 및 NPM 설치하기 {#installing-nodejs-and-npm}


<Tabs>
  <TabItem value="nvm" label="NVM" default>
    - Node v18 이상.
        - 설치하려면 [NVM 설치 스크립트](https://github.com/nvm-sh/nvm#install--update-script)를 사용합니다.
  </TabItem>
  <TabItem value="windows" label="Windows">
    1. [Node.js 다운로드 페이지](https://nodejs.org/en/download)에서 Node.js 인스톨러를 다운로드합니다.
    2. 2. 설치 프로그램을 실행하고 화면의 지시를 따릅니다.
    3. 명령 프롬프트 또는 PowerShell을 열고 `node -v` 및 `npm -v`로 버전을 확인합니다.
        - Posix 호환 셸을 참조하세요.
  </TabItem>
  <TabItem value="macos" label="MacOS">
    1. 홈브루를 설치합니다(설치되어 있지 않은 경우):
        ```bash
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)
        ```
    2. brew install node`로 Node.js와 npm을 설치합니다
    3. 터미널에서 `node -v` 및 `npm -v`로 버전을 확인합니다.
  </TabItem>
  <TabItem value="linux" label="Linux">
      1. 터미널을 엽니다.
      2. sudo apt update로 패키지 관리자를 업데이트합니다
      3. sudo apt install nodejs npm
      4. 터미널에서 `node -v` 및 `npm -v`로 버전 확인
  </TabItem>
</Tabs>

  </Step>
</Steps>
````
