---
sidebar_position: 7
title: 병합 채굴(Merged Mining)이란 무엇인가요?
sidebar_label: 병합 채굴
tags:
  - rsk
  - rootstock
  - 개념
  - 병합 채굴
description: Rootstock과 비트코인 병합 채굴이 이루어지는 방식과 그 장점에 관한 설명입니다.
---

[병합 채굴](https://rootstock.io/mine-btc-with-rootstock/)은 Rootstock 블록과 비트코인 블록을 동시에 생성하는 채굴 방식입니다. 두 체인 모두 동일한 작업 증명(PoW) 알고리즘인 더블 SHA-256을 사용하기 때문에 이러한 프로세스를 수행할 수 있습니다.

<Button href="/node-operators/merged-mining/getting-started/">시작하기</Button>

## 작동 방식

비트코인 채굴 풀은 채굴자에게 전달하는 모든 채굴 작업에 Rootstock 블록에 대한 참조 정보를 포함합니다.
채굴자가 해시 문제의 솔루션을 찾을 때마다 해당 해시 값은 비트코인과 Rootstock 두 네트워크의 난이도와 비교되어, 다음 세 가지 중 하나의 결과가 발생합니다:

- 솔루션이 비트코인 네트워크 난이도를 충족하면, 블록이 조립되어 네트워크로 전송됩니다. 이 블록에는 Rootstock의 병합 채굴 참조 정보도 포함되지만, 비트코인 네트워크에서는 이를 무시합니다. Rootstock의 네트워크 난이도는 비트코인보다 낮기 때문에 해당 솔루션은 Rootstock에서도 유효하며 네트워크에 제출될 수 있습니다.
- 솔루션이 비트코인 네트워크 난이도를 충족하지 못하지만 Rootstock 네트워크 난이도는 충족할 경우, 솔루션은 Rootstock 네트워크에만 제출됩니다.
- 솔루션이 풀(pool) 난이도만 충족할 경우, 풀 난이도는 비트코인이나 Rootstock 네트워크 난이도보다 몇 배나 낮기 때문에 어떤 네트워크에도 제출되지 않습니다.

솔루션이 네트워크에 제출되면 노드에서 SPV 증명을 구축할 수 있습니다. 증명이 유효하면, 해당 증명은 블록의 일부로 편입되어 네트워크에 전송됩니다.

<div class="video-container">
  <iframe width="949" height="534" src="https://youtube.com/embed/l3DkV2tkjU0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## 어떤 장점이 있나요?

채굴자는 자신이 채굴하는 Rootstock 블록에서 높은 비율의 트랜잭션 수수료를 획득합니다. 이 채굴 과정은 비트코인 채굴과 동일한 해시 파워로 이루어지므로, 추가로 비용이나 부담이 없습니다.

## 현재 Rootstock 네트워크의 해시 파워는 어느 정도인가요?

Rootstock 네트워크의 해시 파워는 [Rootstock 통계 웹사이트](https://stats.rootstock.io)에서 확인할 수 있습니다.

## 채굴 소프트웨어 풀을 위한 구현 세부 사항

[구현 시작 가이드](/node-operators/merged-mining/getting-started/)를 확인해 보세요.
