---
sidebar_label: MetaMask
sidebar_position: 3
title: Rootstock을 위한 MetaMask 지갑 구성
tags:
  - metamask
  - rootstock
  - 도구
  - rsk
  - 지갑
  - 가이드
description: Rootstock과 MetaMask 지갑을 연결하는 방법을 알아보세요
---

이 가이드에서는 MetaMask를 다운로드하고 설치하고 커스텀 네트워크를 설정하는 방법을 학습합니다.

:::note[Download [MetaMask 다운로드 및 설치]

[metamask-landing.rifos.org](https://metamask-landing.rifos.org/) 도구를 방문해 Metamask를 다운로드/설치하고, Rootstock 커스텀 네트워크를 추가하거나 아래 동영상에 나오는 단계를 따르세요.
:::

<div class="video-container">
  <iframe width="949" height="534" src="https://youtube.com/embed/VyPewQoWhn0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## MetaMask 연결하기

1. MetaMask 확장 프로그램을 엽니다.
2. 네트워크 선택기(오른쪽 상단 모서리)에서 Custom RPC를 선택합니다.

  <div styles="text-align: center">
    <img class="metamask-screenshot" src="/img/tools/metamask/metamask.png" />
  </div>

3. 다음 값을 입력해 Rootstock 메인넷이나 테스트넷을 연결합니다.

<table class="table">
  <thead>
    <tr>
      <th scope="col">필드</th>
      <th scope="col">Rootstock 메인넷</th>
      <th scope="col">Rootstock 테스트넷</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>네트워크 이름</td>
      <td>Rootstock 메인넷</td>
      <td>Rootstock 테스트넷</td>
    </tr>
    <tr>
      <td>RPC URL</td>
      <td>https://rpc.mainnet.rootstock.io/{YOUR_APIKEY}</td>
      <td>https://rpc.testnet.rootstock.io/{YOUR_APIKEY}</td>
    </tr>
    <tr>
      <td>ChainID</td>
      <td>30</td>
      <td>31</td>
    </tr>
    <tr>
      <td>기호</td>
      <td>RBTC</td>
      <td>tRBTC</td>
    </tr>
    <tr>
      <td>블록 익스플로러 URL</td>
      <td><a href="https://explorer.rootstock.io/" target="_blank">https://explorer.rootstock.io/</a></td>
      <td><a href="https://explorer.testnet.rootstock.io/" target="_blank">https://explorer.testnet.rootstock.io/</a></td>
    </tr>
  </tbody>
</table>

:::tip[Get [RPC API 키 획득하기]

[RPC API 문서](/developers/rpc-api/)를 방문해 가입하고 API 키를 획득하세요.
:::

이제 MetaMask를 Rootstock과 함께 사용할 수 있습니다!

## 다음 단계

Rootstock 테스트넷을 테스트해 보세요.

- [테스트넷 RBTC 획득하기](https://faucet.rootstock.io)
- [테스트넷 RIF 토큰 획득하기](https://faucet.rifos.org)

위의 커스텀 네트워크 구성에
사용된 값에 대해 자세히 알고 싶다면
[Rootstock의 계정 기반 주소](/concepts/account-based-addresses/)를 확인해 보세요.

### 제한 사항

MetaMask는 [Rootstock의 계정 기반 주소](/concepts/account-based-addresses/)에 규정된
기술 사양을 완전히 준수하고 있지 않습니다.
이에 대해 차선으로 사용할 수 있는 해결책이 있으며,
이를 사용하면 대부분의 사용자가 Rootstock에서 MetaMask를 성공적으로 사용할 수 있습니다.

MetaMask는 **파생 경로**로 Ethereum 값을 사용하며,
현재는 해당 값을 구성할 수 없습니다.
이는 MetaMask와 다른 지갑에서 같은 시드 문구를 사용하는 경우
서로 상이한 주소들을 얻게 됨을 의미합니다.
이에 대한 **차선 해결책**은 이 기능을 지원하는 다른 지갑을 이용할 때
커스텀 파생 경로를 사용하는 것입니다.

MetaMask는 현재 EIP-1191 **체크섬**을 지원하지 않습니다.
이는 사용자가 MetaMask에서 복사한 주소를 사용하는 경우
체크섬 검증 오류가 발생할 수 있음을 의미합니다.
이에 대한 **차선 해결책**은 주소를 복사한 다음 소문자로 바꾸는 것입니다.

:::warning\[Disclaimer]

- 일부 MetaMask 화면 내에서는 통화가 'ETH'로 잘못 표시될 수 있습니다.
  Rootstock 네트워크에서는 암호화폐로 'RBTC'를 사용합니다.
- 이 튜토리얼은 [Rootstock RPC API](/developers/rpc-api/)를 사용합니다.
  RPC URL을 변경하여 다른 노드를 연결하거나 [공개 노드](/node-operators/public-nodes/)를 사용할 수 있습니다.
- 브라우저 기반 dApp이 작동하려면 노드에서 반드시 CORS를 활성화해야 합니다.
  - CORS 설정에 관한 자세한 내용은 [구성 파일 참조](/node-operators/setup/configuration/)를 검토해 주세요.

## 유용한 자료

- [프로그래밍 방식으로 Rootstock과 MetaMask 연결하기](/resources/tutorials/rootstock-metamask/)
