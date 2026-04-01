---
sidebar_label: 지갑
sidebar_position: 2
title: Rootstock 호환 지갑
tags:
  - rootstock
  - 도구
  - rsk
  - 지갑
description: Rootstock과 호환 지갑을 어떻게 연결하는지 알아보세요
---

[RBTC](/concepts/rbtc/) 및 [RIF](/concepts/rif-suite/token) 토큰을 지원하는 지갑은 다음과 같습니다.

```mdx-code-block
<Carousel width="370" height="260" >
  <CarouselItem image="/img/rsk/wallets/my-crypto.png" href="https://app.mycrypto.com/add-account" />
  <CarouselItem image="/img/rsk/wallets/metamask-logo.png" href="https://metamask.io/download" target="_blank" />
  <CarouselItem image="/img/rsk/wallets/edge-wallet-logo.png" href="https://edge.app/" />
  <CarouselItem image="/img/rsk/wallets/ledger-logo.png" href="https://www.ledger.com/" />
  <CarouselItem image="/img/rsk/wallets/trezor-wallet.png" href="https://trezor.io/trezor-suite" />
  <CarouselItem image="/img/rsk/wallets/dcent-wallet.png" href="https://www.dcentwallet.com/en" />
  <CarouselItem image="/img/rsk/wallets/math-wallet.png" href="https://blog.mathwallet.org/?p=1625" />
  <CarouselItem image="/img/rsk/wallets/Exodus_logo_white.png" href="https://www.exodus.com/" />
  <CarouselItem image="/img/rsk/wallets/mew.svg" href="https://www.myetherwallet.com/" />
  <CarouselItem image="/img/rsk/wallets/enkrypt-logo.png" href="https://www.enkrypt.com/networks/rootstock-wallet/" />
  <CarouselItem image="/img/rsk/wallets/taho.png" href="https://taho.xyz" />
  <CarouselItem image="/img/rsk/wallets/testtwo.png" href="https://rabby.io" />
  <CarouselItem image="/img/rsk/wallets/subwallet.svg" href="https://www.subwallet.app/" />
  <CarouselItem image="/img/rsk/wallets/WigwamGreen.svg" href="https://wigwam.app/" />
  <CarouselItem image="/img/rsk/wallets/zerion.svg" href="https://zerion.io/" />
  <CarouselItem image="/img/rsk/wallets/rainbow-wallet-main.png" href="https://rainbow.me/en/" />
</Carousel>
```

## 지갑별 Rootstock 지원 여부

다음 표에서 지갑별로 지원하는 기능을 확인할 수 있습니다.

| 지갑                                                            | Rootstock 체크섬 | Rootstock 파생 경로 | 사용자 정의 파생 경로 | 플랫폼                | 사용 가능한 네트워크                                                           |
| ------------------------------------------------------------- | ------------- | --------------- | ------------ | ------------------ | --------------------------------------------------------------------- |
| [Beexo](https://beexo.com)                                    | ✔             | ✔               | ✔            | 데스크톱, 모바일          | 메인넷                                                                   |
| [Edge](https://edge.app/)                                     | ✔             | ✔               | -            | 데스크톱, 모바일          | 메인넷, 테스트넷                                                             |
| [Ledger](https://www.ledger.com/)                             | ✔             | ✔               | -            |                    |                                                                       |
| [MyEtherWallet](https://www.myetherwallet.com/)               | ✔             | ✔               | ✔            | 데스크톱, Android, iOS | 메인넷, 테스트넷                                                             |
| [Trezor](https://trezor.io/trezor-suite)                      | ✔             | ✔               | -            |                    |                                                                       |
| [Metamask](/dev-tools/wallets/metamask)                       | -             | -               | -            | 브라우저, 모바일          | 메인넷, 테스트넷                                                             |
| [Portis](https://www.portis.io/)                              | ✔             | ✔               | ✔            | 데스크톱               | 메인넷                                                                   |
| [Rabby Wallet](https://rabby.io)                              | -             | -               | -            | Chrome, 데스크톱, 모바일  |                                                                       |
| [Enkrypt](https://www.enkrypt.com/networks/rootstock-wallet/) | ✔             | ✔               | -            | Chrome             | 메인넷, 테스트넷                                                             |
| [MyCrypto](https://mycrypto.com/)                             | -             | -               | -            | 데스크톱               | Rootstock(RBTC)                                    |
| [TaHo](https://taho.xyz)                                      | ✔             | ✔               | -            | Chrome             | Rootstock (RBTC), 메인넷                              |
| [Bitget](https://web3.bitget.com/en/)                         | -             | -               | -            | Chrome, 모바일        | RBTC                                                                  |
| [SafePal](https://www.safepal.com/en/extension)               | ✔             | ✔               | -            | Chrome, 모바일        | Rootstock (RBTC), 메인넷                              |
| [Wallby](https://wallby.app/)                                 | ✔             | ✔               | -            | 모바일                | Rootstock(RBTC), Bitcoin                           |
| [MathWallet](https://blog.mathwallet.org/?p=1625)             | ✔             | ✔               | -            | Chrome, 데스크톱, 모바일  | 메인넷                                                                   |
| [MtPelerin 브릿지](https://www.mtpelerin.com/bridge-wallet)      | ✔             | ✔               | -            | 데스크톱, 모바일          | Rootstock (메인넷), Bitcoin (테스트넷) |
| [Exodus](https://www.exodus.com/)                             | ✔             | ✔               | -            | Chrome, 데스크톱, 모바일  | 메인넷                                                                   |
| [SubWallet](https://www.subwallet.app/)                       | ✔             | ✔               | -            | Chrome             | 메인넷, 테스트넷                                                             |
| [WigWam](https://wigwam.app/)                                 | ✔             | ✔               | -            | Chrome             | 메인넷, 테스트넷                                                             |
| [AirGap](https://airgap.it/)                                  | ✔             | ✔               | -            | -                  | 메인넷                                                                   |
| [Zerion](https://zerion.io/)                                  | ✔             | ✔               | -            | Chrome             | 메인넷, 테스트넷                                                             |
| [Rainbow Wallet](https://rainbow.me/en/)                      | ✔             | ✔               | -            | Chrome             | 메인넷, 테스트넷                                                             |





