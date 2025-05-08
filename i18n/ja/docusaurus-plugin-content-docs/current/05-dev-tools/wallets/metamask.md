---
sidebar_label: MetaMask
sidebar_position: 3
title: Rootstock用にMetaMaskウォレットを設定する
tags:
  - metamask
  - rootstock
  - ツール
  - rsk
  - ウォレット
  - ガイド
description: MetaMaskウォレットでRootstockに接続する方法を学びます
---

このガイドでは、MetaMaskのダウンロードとインストール、およびカスタムネットワークの設定方法について説明します。

:::note[Download MetaMaskをダウンロードしてインストール]

[metamask-landing.rifos.org](https://metamask-landing.rifos.org/) のツールにアクセスし、Metamaskをダウンロードしてインストールし、Rootstockのカスタムネットワークを追加するか、以下の動画の手順に従ってください。
:::

<div class="video-container">
  <iframe width="949" height="534" src="https://youtube.com/embed/VyPewQoWhn0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## MetaMaskで接続する

1. MetaMaskの拡張機能を開く。
2. ネットワークセレクター（右上隅）で［カスタムRPC］を選択する。

  <div styles="text-align: center">
    <img class="metamask-screenshot" src="/img/tools/metamask/metamask.png" />
  </div>

3. Rootstockのメインネットまたはテストネットに接続するために、これらの値を入力してください

<table class="table">
  <thead>
    <tr>
      <th scope="col">項目</th>
      <th scope="col">Rootstockメインネット</th>
      <th scope="col">Rootstockテストネット</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ネットワーク名</td>
      <td>Rootstockメインネット</td>
      <td>Rootstockテストネット</td>
    </tr>
    <tr>
      <td>RPC URL</td>
      <td>https://rpc.mainnet.rootstock.io/{YOUR_APIKEY}</td>
      <td>https://rpc.testnet.rootstock.io/{YOUR_APIKEY}</td>
    </tr>
    <tr>
      <td>チェーンID</td>
      <td>30</td>
      <td>31</td>
    </tr>
    <tr>
      <td>記号</td>
      <td>RBTC</td>
      <td>tRBTC</td>
    </tr>
    <tr>
      <td>ブロックエクスプローラーのURL</td>
      <td><a href="https://explorer.rootstock.io/" target="_blank">https://explorer.rootstock.io/</a></td>
      <td><a href="https://explorer.testnet.rootstock.io/" target="_blank">https://explorer.testnet.rootstock.io/</a></td>
    </tr>
  </tbody>
</table>

:::tip[Get RPC APIキーを取得]

[RPC APIドキュメント](/developers/rpc-api/)にアクセスしてサインアップし、APIキーを取得してください。
:::

これにより、RootstockでMetaMaskが使えるようになります！

## 次のステップ

Rootstockのテストネットを試してください。

- [テスト用のRBTCを取得する](https://faucet.rootstock.io)
- [テスト用のRIFトークンを取得する](https://faucet.rifos.org)

上記のカスタムネットワーク設定で使用される値について詳しく知りたい場合は、[Rootstockのアカウントベースのアドレス](/concepts/account-based-addresses/)をご確認ください。

### 制限事項

MetaMaskは、[Rootstockのアカウントベースのアドレス](/concepts/account-based-addresses/)の技術仕様にまだ完全には準拠していません。ただし、ほとんどのユーザーがRootstock上でMetaMaskを正常に使用できるようにする回避策がある点をご承知おきください。

MetaMaskは**導出パス**にEthereumの値を使用しており、現時点ではその設定を変更することはできません。これは、MetaMaskと他のウォレットで同じシードフレーズを使用すると、異なるアドレスセットが取得されることを意味します。これに対する**回避策**としては、この機能をサポートしている他のウォレットを使用する際に、カスタム導出パスを使用する方法があります。

MetaMaskは現在、EIP-1191**チェックサム**に対応していません。これにより、MetaMaskからコピーしたアドレスを使用すると、チェックサムの検証エラーが発生する可能性があります。これに対する**回避策**としては、アドレスをコピーした後に小文字に変換する方法があります。

:::warning\[Disclaimer]

- MetaMaskの一部の画面では、通貨が誤って「ETH」と表示される場合があります。Rootstockネットワークでは、暗号通貨として「RBTC」を使用しています。
- このチュートリアルでは、[Rootstock RPC API](/developers/rpc-api/)を使用しています。RPC URLを変更することで、他のノードに接続したり、[公開ノード](/node-operators/public-nodes/)を利用したりできます。
- ブラウザベースのdAppsが動作するためには、ノードがCORSを有効にする必要があります。
  - CORSの設定については、[設定ファイルのリファレンス](/node-operators/setup/configuration/)をご覧ください。
    :::

## 役に立つリソース

- [プログラムでRootstockをMetaMaskに接続する](/resources/tutorials/rootstock-metamask/)
