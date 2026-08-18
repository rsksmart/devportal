---
sidebar_position: 7
title: マージドマイニングとは？
sidebar_label: マージドマイニング
tags:
  - rsk
  - rootstock
  - 概念
  - マージドマイニング
description: RootstockとBitcoinのマージドマイニングの仕組みとその利点について説明します。
---

[マージドマイニング](https://rootstock.io/mine-btc-with-rootstock/)とは、RootstockのブロックチェーンがBitcoinのブロックチェーンと同時にマイニングされるプロセスを指します。これは、両チェーンが同じプルーフ・オブ・ワーク（PoW）アルゴリズムのダブルSHA-256を使用しているため可能となります。

<Button href="/node-operators/merged-mining/getting-started/">始める</Button>

## 仕組みについて

Bitcoinのマイニングプールは、マイナーに提供するすべてのマイニングジョブにRootstockブロックへの参照を含めます。マイナーが解決策を見つけるたびに、それは両ネットワーク（BitcoinとRootstock）の難易度と比較され、可能性のある以下の3つの結果が提示されます。

- 解決策がBitcoinネットワークの難易度を満たす場合、ブロックが組み立てられ、ネットワークに送信されます。Rootstockのマージドマイニング参照は含まれますが、Bitcoinネットワークからは無視されます。Rootstockのネットワーク難易度はBitcoinより低いため、この解決策はRootstockでも有効であり、ネットワークに送信することができます。
- 解決策がBitcoinネットワークの難易度を満たさないものの、Rootstockネットワークの難易度は満たす場合、結果としてその解決策はRootstockネットワークに送信されますが、Bitcoinネットワークには送信されません。
- 解決策がプールの難易度を満たすだけで、BitcoinやRootstockのネットワーク難易度よりも何倍も低い場合、どちらのネットワークにも送信されません。

ネットワークに送信された解決策により、ノードはSPV証明を構築できます。証明が有効であれば、それをネットワークに送信されるブロックの一部として含みます。

<div class="video-container">
  <iframe width="949" height="534" src="https://youtube.com/embed/l3DkV2tkjU0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## 利点について

マイナーは、マイニングしたRootstockブロックから高い割合の取引手数料を受け取ります。このマイニングプロセスは、Bitcoinのマイニングで使用されるのと同じハッシュパワーで行われ、追加のコストや影響はありません。

## 現在のRootstockネットワークのハッシュパワーについて

Rootstockネットワークのハッシュパワーについては、[Rootstockの統計ページ](https://stats.rootstock.io)でご確認いただけます。

## マイニングソフトウェアプールの実装に関する詳細

[実装の始め方に関するガイド](/node-operators/merged-mining/getting-started/)をご覧ください。
