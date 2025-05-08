---
sidebar_label: Rootstock 기본 개념
sidebar_position: 2
title: Rootstock 기본 개념
tags:
  - rsk
  - rootstock
  - 초급자
  - 개념
description: Rootstock은 최초이자 가장 오래 지속된 Bitcoin 사이드체인으로, Bitcoin 작업 증명(PoW)의 보안과 Ethereum의 스마트 컨트랙트 기능을 결합한 유일한 레이어 2 솔루션입니다.
---

## Rootstock이란 무엇인가요?

Rootstock은 최초이자 가장 오래 지속된 Bitcoin 사이드체인으로, Bitcoin 작업 증명(PoW)의 보안과 Ethereum의 스마트 컨트랙트 기능을 결합한 유일한 레이어 2 솔루션입니다. 이 플랫폼은 오픈 소스이며, EVM 호환이 가능하고, Bitcoin 해시 파워의 60% 이상으로 보안을 유지하며 완전한 무신뢰를 향해 계속해서 발전하는 활발한 dApp 생태계의 관문이 되고 있습니다.

[Rootstock 스택](/concepts/fundamentals/stack/)을 참고하세요.

## Rootstock은 Bitcoin과 어떤 관계인가요?

### Bitcoin과의 병합 채굴

첫 번째 접점은 채굴을 통해 이루어집니다.

Bitcoin 채굴자는
[병합 채굴](/node-operators/merged-mining/)이라고 알려진 작업을 통해
동일한 인프라스트럭처와 에너지 소모량으로 두 네트워크의 보안을 유지합니다.

채굴자는 다른 주소에서 Bitcoin을 전송하는 등
10분마다 Bitcoin 네트워크에서 블록을 생성하고
그 과정에서 새로운 비트코인을 생성합니다.

Rootstock에서는 스마트 컨트랙트의 실행을 보호하기 위해
30초마다 블록이 생성됩니다.
이 과정에서 민팅되는 새로운 코인은 없지만
병합 채굴에서 보상을 획득합니다.

> 민팅에 관한 더 자세한 내용은 [https://rootstock.io/mine-btc-with-rootstock/](https://rootstock.io/mine-btc-with-rootstock/)을 확인해 주세요.

### Bitcoin과 Powpeg

두 번째 접점은
브릿지라고도 알려져 있는
[Powpeg](/concepts/powpeg/)입니다.

이 구성 요소는 두 네트워크를 연결하여
비트코인의 Rootstock 전송을 허용하며,
개발자는 이를 통해 스마트 컨트랙트와 상호 작용할 수 있게 됩니다.
가스비는 동일한 Bitcoin, 스마트 Bitcoin(RBTC)으로 지불합니다.

이를 위해 사용자는 Bitcoin을 특별한 주소로 전송하며,
해당 Bitcoin은 Bitcoin 네트워크에서 잠금 처리됩니다.
다음으로, 사용자가 Rootstock 네트워크에서 사용할 수 있도록
Rootstock 네트워크의 동일한 주소에서
해당 Bitcoin의 잠금이 해제됩니다.
이것을 페그인(peg-in)이라고 합니다.

반대로 페그아웃(peg-out)은
Rootstock 네트워크의 특별한 주소로 Bitcoin을 전송하고
Bitcoin 네트워크에서 비트코인을 되돌려 받는 작업입니다.
