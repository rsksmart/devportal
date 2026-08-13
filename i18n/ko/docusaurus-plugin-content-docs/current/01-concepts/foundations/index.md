---
sidebar_label: Overview
sidebar_position: 1
title: Rootstock 기본 개념
tags:
  - rsk
  - rootstock
  - 초급자
  - 개념
description: "비트코인 금융 인프라: 대출, 결제, 수익, 재무를 위해 비트코인 해시 파워의 85% 이상으로 보호되는 EVM 호환 비트코인 사이드체인."
---

## Rootstock이란 무엇인가요?

Rootstock는 비트코인의 금융 인프라입니다. 오픈 소스이며 EVM 호환인 비트코인 사이드체인이고, 머지 마이닝을 통해 비트코인 해시 파워의 85% 이상으로 보호됩니다. 기업, 금융기관, 빌더는 이더리움 도구로 비트코인으로 담보된 대출, 결제, 수익, 재무 상품을 출시하기 위해 사용합니다.

[Rootstock 스택](/concepts/foundations/stack/), [병합 채굴](/concepts/foundations/merged-mining/), [Powpeg](/concepts/foundations/powpeg/)을 참고하세요.

## Rootstock은 비트코인과 어떻게 연결되어 있나요?

### 비트코인과의 병합 채굴

첫 번째 접점은 채굴을 통해 이루어집니다.

비트코인 채굴자는 [병합 채굴](/node-operators/merged-mining/)이라고 알려진 작업을 통해 동일한 인프라와 에너지로 두 네트워크의 보안을 유지합니다.

채굴자들은 비트코인 네트워크에서 약 10분마다 블록을 생성하며,
이 과정에서 서로 다른 주소 간의 비트코인 전송이 이루어지고,
동시에 새로운 비트코인을 만들어냅니다.

Rootstock에서는 스마트 컨트랙트의 실행을 보호하기 위해 30초마다 블록이 생성됩니다.
이 과정에서 새롭게 발행되는 코인은 없지만 병합 채굴을 통해 보상을 획득합니다.

> 채굴에 관한 더 자세한 내용은 [https://rootstock.io/mine-btc-with-rootstock/](https://rootstock.io/mine-btc-with-rootstock/)을 참고하세요.

### 비트코인과 Powpeg

두 번째 접점은 브릿지라고도 알려져 있는 [Powpeg](/concepts/foundations/powpeg/)입니다.

이 구성 요소는 비트코인을 Rootstock으로 전송할 수 있도록 두 네트워크를 연결해줍니다.
덕분에 개발자들은 Rootstock에서 스마트 컨트랙트와 상호작용할 수 있으며, 가스비는 동일한 비트코인, 즉 스마트 비트코인(RBTC)로 지불합니다.

이를 위해 비트코인을 특정 주소로 전송하면, 해당 비트코인은 비트코인 네트워크 상에 잠기게 됩니다.
그와 동시에 Rootstock 네트워크의 동일한 주소에서 같은 양의 스마트 비트코인(RBTC)이 사용자에게 풀리며, Rootstock0 네트워크에서 사용할 수 있게 됩니다.
이 과정을 페그인(Peg-in)이라고 합니다.

반대로, 페그아웃(Peg-out)이라고 불리는 작업을 통해 Rootstock 네트워크의 특정 주소로 스마트 비트코인(RBTC)을 보내면, 비트코인 네트워크에서 다시 비트코인을 돌려받을 수 있습니다.
