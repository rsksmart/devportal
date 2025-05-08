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
  <CarouselItem image="/img/rsk/wallets/block-wallet.png" href="https://blockwallet.io/" />
  <CarouselItem image="/img/rsk/wallets/taho.png" href="https://taho.xyz" />
  <CarouselItem image="/img/rsk/wallets/testtwo.png" href="https://rabby.io" />
  <CarouselItem image="/img/rsk/wallets/subwallet.svg" href="https://www.subwallet.app/" />
  <CarouselItem image="/img/rsk/wallets/WigwamGreen.svg" href="https://wigwam.app/" />
  <CarouselItem image="/img/rsk/wallets/zerion.svg" href="https://zerion.io/" />
  <CarouselItem image="/img/rsk/wallets/rainbow-wallet-main.png" href="https://rainbow.me/en/" />
</Carousel>
```

## 호환성 행렬

다음 행렬에서 지갑별로 다른 기능을 확인할 수 있습니다.

| 지갑                                                            | Rootstock 체크섬 | Rootstock dPath | 커스텀 dPath | 플랫폼                | Available Networks                                                           |
| ------------------------------------------------------------- | ------------- | --------------- | --------- | ------------------ | ---------------------------------------------------------------------------- |
| [Beexo](https://beexo.com)                                    | ✔             | ✔               | ✔         | 데스크톱, 모바일          | Mainnet                                                                      |
| [Edge](https://edge.app/)                                     | ✔             | ✔               | ❌         | 데스크톱, 모바일          | Mainnet, Testnet                                                             |
| [Ledger](https://www.ledger.com/)                             | ✔             | ✔               | ❌         |                    |                                                                              |
| [MyEtherWallet](https://www.myetherwallet.com/)               | ✔             | ✔               | ✔         | 데스크톱, Android, iOS | Mainnet, Testnet                                                             |
| [Trezor](https://trezor.io/trezor-suite)                      | ✔             | ✔               | ❌         |                    |                                                                              |
| [Metamask](/dev-tools/wallets/metamask)                       | ❌             | ❌               | ❌         | 브라우저, 모바일          | Rootstock(RBTC)                                           |
| [Portis](https://www.portis.io/)                              | ✔             | ✔               | ✔         | 데스크톱               | Mainnet                                                                      |
| [Rabby Wallet](https://rabby.io)                              | -             | -               | -         | Chrome, 데스크톱, 모바일  |                                                                              |
| [Enkrypt](https://www.enkrypt.com/networks/rootstock-wallet/) | ✔             | ✔               | -         | Chrome             | Mainnet, Testnet                                                             |
| [MyCrypto](https://mycrypto.com/)                             | -             | -               | -         | 데스크톱               | Rootstock(RBTC)                                           |
| [TaHo](https://taho.xyz)                                      | ✔             | ✔               | -         | Chrome             | Rootstock (RBTC), Mainnet                                 |
| [Frontier](https://www.frontier.xyz/browser-extension)        | -             | -               | -         | 데스크톱, 모바일, Chrome  | Rootstock(RBTC)                                           |
| [Bitget](https://web3.bitget.com/en/)                         | -             | ❌               | -         | Chrome, 모바일        | RBTC                                                                         |
| [SafePal](https://www.safepal.com/en/extension)               | ✔             | ✔               | -         | Chrome, 모바일        | Rootstock (RBTC), Mainnet                                 |
| [Wallby](https://wallby.app/)                                 | ✔             | ✔               | -         | 모바일                | Rootstock(RBTC), Bitcoin                                  |
| [MathWallet](https://blog.mathwallet.org/?p=1625)             | ✔             | ✔               | -         | Chrome, 데스크톱, 모바일  | Mainnet                                                                      |
| [Block Wallet](https://blockwallet.io/)                       | ✔             | ✔               | -         | Chrome             | Mainnet                                                                      |
| [MtPelerin 브릿지](https://www.mtpelerin.com/bridge-wallet)      | ✔             | ✔               | -         | 데스크톱, 모바일          | Rootstock (Mainnet), Bitcoin (Testnet) |
| [Exodus](https://www.exodus.com/)                             | ✔             | ✔               | -         | Chrome, 데스크톱, 모바일  | Mainnet                                                                      |
| [SubWallet](https://www.subwallet.app/)                       | ✔             | ✔               | -         | Chrome             | Mainnet, Testnet                                                             |
| [WigWam](https://wigwam.app/)                                 | ✔             | ✔               | -         | Chrome             | Mainnet, Testnet                                                             |
| [AirGap](https://airgap.it/)                                  | ✔             | ✔               | -         | ❌                  | Mainnet                                                                      |
| [Zerion](https://zerion.io/)                                  | ✔             | ✔               | -         | Chrome             | Mainnet, Testnet                                                             |
| [Rainbow Wallet](https://rainbow.me/en/)                      | ✔             | ✔               | -         | Chrome             | Mainnet, Testnet                                                             |





