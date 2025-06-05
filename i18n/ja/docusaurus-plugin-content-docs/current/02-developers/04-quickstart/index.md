---
sidebar_label: クイックスタート
sidebar_position: 4
title: クイックスタート
tags:
  - rsk
  - rootstock
  - 初心者
  - クイックスタート
  - 開発者
  - 高度
  - rootstockへの移植
  - チュートリアル
description: Rootstockでの開発をサポートするクイックスタート、デモ、およびスターターキットをご紹介します。
---

```mdx-code-block
<Filter
values={[
{label: '初心者', value: 'beginner'},
{label: '上級者', value: 'advanced'},
{label: 'Hardhat', value: 'hardhat'},
{label: 'Remix', value: 'remix'},
{label: 'Wagmi', value: 'wagmi'},
{label: 'Reown', value: 'reown'},
{label: 'オンチェーンデータ', value: 'data'},
{label: 'RPC API', value: 'rpc'},
{label: 'Rootstock へのポート', value: 'port-dapps'}
]}>
<FilterItem
    value="beginner, Advanced"
    title="Vyper スターターキット"
    subtitle="クイックスタート"
    color="orange"
    linkHref="/developers/quickstart/rootstock-vyper/"
    linkTitle="キットを使う"
    description="Rootstock Vyper スターターキットは、Vyper で記述されたスマートコントラクトを Rootstock ネットワークにデプロイする方法を示します。"
  />
  <FilterItem
    value="beginner, Advanced"
    title="Privy スターターキット"
    subtitle="クイックスタート"
    color="orange"
    linkHref="/developers/quickstart/privy/"
    linkTitle="キットを使う"
    description="Rootstock Privy スターターキットは、開発者がソーシャルログインや自己管理ウォレットを使って、dApp構築時にコントロール、プライバシー、柔軟性を維持しつつユーザーをオンボーディングできるようにします。"
  />
  <FilterItem
    value="dynamic, wagmi, advanced"
    title="Dynamic スターターキット"
    subtitle="クイックスタート"
    color="orange"
    linkHref="/developers/quickstart/dynamic/"
    linkTitle="キットを使う"
    description="Dynamic スターターキットは、Wagmiライブラリを使用して、Next.jsアプリケーションにWeb3機能を高速統合します。"
  />
  <FilterItem
    value="beginner, web3auth, advanced"
    title="Web3Auth スターターキット"
    subtitle="web3auth"
    color="orange"
    linkHref="/developers/quickstart/web3auth/"
    linkTitle="今すぐ始める"
    description="A step-to-step guide for developers to build and deploy passwordless dApps on Rootstock using Web3Auth and Wagmi."
  />
<FilterItem
    value="wagmi, beginner"
    title="Wagmi スターターキット"
    subtitle="クイックスタート"
    color="orange"
    linkHref="/developers/quickstart/wagmi/"
    linkTitle="キットを使う"
    description="このスターターキットは、React、Wagmi、Shadcnライブラリを使ってRootstockブロックチェーン上で分散型アプリケーション(dApps)を構築する基盤を提供します。"
  />
<FilterItem
    value="reown, beginner"
    title="Reown スターターキット"
    subtitle="クイックスタート"
    color="orange"
    linkHref="/developers/quickstart/reown/"
    linkTitle="キットを使う"
    description="このスターターキットは、React、Reown、Wagmi、Shadcnライブラリを使ってRootstockブロックチェーン上でdAppsを構築する基盤を提供します。"
  />
<FilterItem
    value="hardhat, beginner"
    title="Hardhat スターターキット"
    subtitle="クイックスタート"
    color="orange"
    linkHref="/developers/quickstart/hardhat/"
    linkTitle="キットを使う"
    description="一般的なERC標準（ERC20、ERC721、ERC1155）のスマートコントラクト例、テスト、デプロイ、タスク。"
  />
<FilterItem
    value="hardhat, beginner"
    title="Hardhat Ignition スターターキット"
    subtitle="クイックスタート"
    color="orange"
    linkHref="/developers/quickstart/hardhat-ignition/"
    linkTitle="キットを使う"
    description="このガイドは、Hardhat Ignitionを使ってRootstockブロックチェーン上にスマートコントラクトをデプロイする方法に焦点を当てています。"
  />
<FilterItem
    value="foundry, sc, beginner"
    title="Foundry スターターキット"
    subtitle="クイックスタート"
    color="orange"
    linkHref="/developers/quickstart/foundry/"
    linkTitle="キットを使う"
    description="一般的なERC標準（ERC20、ERC721、ERC1155）のスマートコントラクト例、テスト、デプロイ、タスク。"
  />
<FilterItem
    value="wagmi, sc, advanced"
    value="wagmi, advanced"
    title="アカウントアブストラクションキット"
    subtitle="クイックスタート"
    color="orange"
    linkHref="/developers/quickstart/rootstock-etherspot/"
    linkTitle="キットを使う"
    description="Etherspotを使用したアカウントアブストラクション スターターキット。"
  />
<FilterItem
    value="advanced"
    title="CucumberでのdApp自動化"
    subtitle="クイックスタート"
    color="orange"
    linkHref="/resources/tutorials/dapp-automation-cucumber/"
    linkTitle="dAppsを自動化"
    description="Cucumberアジャイルオートメーションフレームワークを使ってdAppsを自動化する方法を学びます。"
  />
<FilterItem
    value="advanced"
    title="RIF Relay スターターキット"
    subtitle="クイックスタート"
    color="orange"
    linkHref="/developers/integrate/rif-relay/sample-dapp/"
    linkTitle="キットを使う"
    description="RIF Relay上で開発するためのスターターキット。"
  />
<FilterItem
    value="data, advanced"
    title="The Graph を使った入門"
    subtitle="クイックスタート"
    color="orange"
    linkHref="/dev-tools/data/thegraph/"
    linkTitle="今すぐ始める"
    description="インデクサーの分散ネットワークを通じてオンチェーンデータを簡単にクエリします。"
  />
<FilterItem
    value="beginner"
    title="Web3.py入門"
    subtitle="Web3.py"
    color="orange"
    linkHref="/developers/quickstart/web3-python/"
    linkTitle="今すぐ始める"
    description="Web3.pyを使って、Rootstock上のスマートコントラクトをデプロイ・操作する方法を学びます。"
  />
  <FilterItem
    value="beginner, advanced, port-dapps"
    title="Ethereum dAppをRootstockにポートする"
    subtitle="dAppsをポート"
    color="orange"
    linkHref="/resources/port-to-rootstock/ethereum-dapp"
    linkTitle="今すぐ始める"
    description="EthereumのdAppをRootstockにポートする方法を学びます。"
  />
  <FilterItem
    value="beginner, remix"
    title="RemixとRootstock Explorerでスマートコントラクトをデプロイ、操作、検証する"
    subtitle="Remix"
    color="orange"
    linkHref="/developers/quickstart/remix/"
    linkTitle="Remixを使う"
    description="このガイドでは、Remix IDEを使って、Rootstock Explorer上でスマートコントラクトの作成、コンパイル、デプロイ、操作、検証を行います。"
  />
  <FilterItem
    value="beginner, advanced"
    title="Apeworx入門"
    subtitle="Ape"
    color="orange"
    linkHref="/developers/quickstart/ape/"
    linkTitle="Apeを使う"
    description="Apeを使って、Rootstock上のスマートコントラクトをコンパイル、デプロイ、操作する方法を学びます。"
  />
  <FilterItem
    value="beginner, rpc"
    title="Rootstock RPC API入門"
    subtitle="RPC API"
    color="orange"
    linkHref="/developers/rpc-api/rootstock/setup/"
    linkTitle="RPC APIを使う"
    description="Rootstock RPCサービスは、開発者がJSON-RPCメソッドを使ってRootstockノードとやり取りするためのシームレスで直感的なWebインターフェースを提供します。"
  />
    <FilterItem
    value="beginner, rpc"
    title="Alchemy入門"
    subtitle="RPC API"
    color="orange"
    linkHref="/developers/rpc-api/alchemy/"
    linkTitle="RPC APIを使う"
    description="Alchemy RPCプロバイダーサービスを使ってRootstockネットワークとやり取りするためのステップガイドです。"
  />
</Filter>
```
