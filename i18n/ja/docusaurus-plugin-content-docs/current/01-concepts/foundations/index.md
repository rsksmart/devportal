---
sidebar_label: Overview
sidebar_position: 1
title: Rootstockの基礎
tags:
  - rsk
  - rootstock
  - 初心者
  - 概念
description: "Bitcoinの金融インフラ。貸付、決済、利回り、トレジャリー向けに、Bitcoinハッシュパワーの85%超で保護されたEVM互換のBitcoinサイドチェーン。"
---

## Rootstockとは？

RootstockはBitcoinの金融インフラです。オープンソースでEVM互換のBitcoinサイドチェーンであり、マージマイニングによりBitcoinハッシュパワーの85%超で保護されています。事業者、金融機関、ビルダーは、Ethereumツールを使って、Bitcoinで担保された貸付、決済、利回り、トレジャリー製品をローンチするために利用します。

[Rootstockスタック](/concepts/foundations/stack/)、[マージマイニング](/concepts/foundations/merged-mining/)、[Powpeg](/concepts/foundations/powpeg/)を参照してください。

## RootstockとBitcoinとの関係について

### Bitcoinとのマージドマイニング

最初の接点は、マイニングを通じてです。

Bitcoinのマイナーは、[マージドマイニング](/node-operators/merged-mining/)として知られる作業を行い、同じインフラとエネルギー消費で両方のネットワークを保護します。

また、マイナーはBitcoinネットワークで10分ごとにブロックを生成し、異なるアドレスからのビットコインの転送を含め、その過程で新しいビットコインを生成します。

Rootstockでは、30秒ごとにブロックが生成され、スマートコントラクトの実行を確保します。この過程で新しいコインは発行されませんが、マージドマイニングによる報酬を得ることができます。

> マイニングについて詳しく知りたい場合は、[https://rootstock.io/mine-btc-with-rootstock/](https://rootstock.io/mine-btc-with-rootstock/) にアクセスしてください。

### BitcoinとのPowpeg

二つ目の接点は、ブリッジとして知られる[Powpeg](/concepts/foundations/powpeg/)です。

このコンポーネントは両ネットワークを接続し、Rootstockにビットコインを転送できるようにします。これにより、開発者はスマートコントラクトとやり取りができるようになります。開発者は同じビットコイン、いわゆるスマートビットコインを使ってガス代を支払います。

そのためには、まずビットコインを特定のアドレスに送信し、Bitcoinネットワーク内でロックします。次に、Rootstockネットワークの同じアドレスで当該ビットコインがユーザーに解放され、同ネットワークで使用できるようになります。これを「ペグイン」と呼びます。

また、Rootstockネットワークの特定のアドレスにビットコインを送信し、Bitcoinネットワークで再びビットコインを受け取る「ペグアウト」と呼ばれる逆の操作も行うことができます。
