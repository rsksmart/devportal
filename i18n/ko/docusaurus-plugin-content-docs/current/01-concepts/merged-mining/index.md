---
sidebar_position: 7
title: 병합 채굴(Merged Mining)이란 무엇인가요?
sidebar_label: 병합 채굴
tags:
  - rsk
  - rootstock
  - 개념
  - 병합 채굴
description: Rootstock과 Bitcoin 병합 채굴이 이루어지는 방식과 그 장점에 관한 설명입니다.
---

[병합 채굴](https://rootstock.io/mine-btc-with-rootstock/)은 Rootstock 블록체인과 Bitcoin 블록체인을 동시에 채굴하는 프로세스입니다. 두 체인은 모두 동일한 작업 증명 시스템(PoW) 알고리즘, 이중 SHA-256을 사용하기 때문에 이러한 프로세스를 수행할 수 있습니다.

<Button href="/node-operators/merged-mining/getting-started/">시작하기</Button>

## 작동 방식

Bitcoin 채굴 풀은 채굴자에게 전달하는 모든 채굴 작업에 Rootstock의 블록을 포함합니다.
채굴자가 솔루션을 발견하면 그 때마다 두 네트워크(Bitcoin 및 Rootstock)의 네트워크 난이도를 비교하며, 다음과 같은 세 가지 결과가 산출될 수 있습니다.

- 솔루션이 Bitcoin 네트워크 난이도를 충족합니다. 따라서 블록이 조립되어 네트워크로 전송됩니다. Rootstock의 병합 채굴 참조는 Bitcoin 네트워크에 의해 포함되고 무시됩니다. Rootstock의 네트워크 난이도는 Bitcoin보다 낮으므로, 해당 솔루션은 Rootstock에서도 작동하며 네트워크에 제출될 수 있습니다.
- 솔루션이 Bitcoin 네트워크 난이도를 충족하지 못하지만 Rootstock 네트워크 난이도는 충족합니다. 그 결과 솔루션이 Rootstock 네트워크에는 제출되지만 Bitcoin 네트워크에는 제출되지 않습니다.
- 솔루션이 풀 난이도만 충족합니다. 풀 난이도는 Bitcoin이나 Rootstock 네트워크 난이도보다 몇 배나 낮으며, 어떤 네트워크에도 제출되지 않습니다.

솔루션이 네트워크에 제출되면 노드에서 SPV 증명을 구축할 수 있습니다. 증명이 유효하면 네트워크에 전송될 블록의 일부로 편입됩니다.

<div class="video-container">
  <iframe width="949" height="534" src="https://youtube.com/embed/l3DkV2tkjU0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## 무엇이 장점인가요?

채굴자는 자신이 채굴하는 Rootstock 블록에서 높은 비율의 트랜잭션 수수료를 획득합니다. 이 채굴 과정은 Bitcoin 채굴과 동일한 해시 파워로 이루어지므로, 추가로 비용이 발생하거나 영향을 받지 않습니다.

## 현재 Rootstock 네트워크의 해시 파워는 얼마인가요?

Rootstock 네트워크의 해시 파워는 [Rootstock 통계 웹사이트](https://stats.rootstock.io)에서 확인할 수 있습니다.

## 채굴 소프트웨어 풀 구현 상세 정보

[구현 시작 가이드](/node-operators/merged-mining/getting-started/)를 확인해 보세요.
