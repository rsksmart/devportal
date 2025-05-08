---
sidebar_label: ウォレット
sidebar_position: 2
title: Rootstockと互換性のあるウォレット
tags:
  - rootstock
  - ツール
  - rsk
  - ウォレット
description: 互換性のあるウォレットでRootstockに接続する方法を学びます
---

以下のウォレットは、[RBTC](/concepts/rbtc/)および[RIF](/concepts/rif-suite/token)のトークンに対応しています。

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

## 互換性のマトリックス

下記のマトリックスでは、ウォレットごとの異なる機能を確認できます。

| ウォレット                                                         | Rootstockチェックサム | Rootstock dPath | カスタマイズ可能なdPath | プラットフォーム           | Available Networks                                                           |
| ------------------------------------------------------------- | --------------- | --------------- | -------------- | ------------------ | ---------------------------------------------------------------------------- |
| [Beexo](https://beexo.com)                                    | ✔               | ✔               | ✔              | デスクトップ、モバイル        | Mainnet                                                                      |
| [Edge](https://edge.app/)                                     | ✔               | ✔               | ❌              | デスクトップ、モバイル        | Mainnet, Testnet                                                             |
| [Ledger](https://www.ledger.com/)                             | ✔               | ✔               | ❌              |                    |                                                                              |
| [MyEtherWallet](https://www.myetherwallet.com/)               | ✔               | ✔               | ✔              | デスクトップ、Android、iOS | Mainnet, Testnet                                                             |
| [Trezor](https://trezor.io/trezor-suite)                      | ✔               | ✔               | ❌              |                    |                                                                              |
| [Metamask](/dev-tools/wallets/metamask)                       | ❌               | ❌               | ❌              | ブラウザー、モバイル         | Rootstock (RBTC)                                          |
| [Portis](https://www.portis.io/)                              | ✔               | ✔               | ✔              | デスクトップ             | Mainnet                                                                      |
| [Rabby Wallet](https://rabby.io)                              | -               | -               | -              | Chrome、デスクトップ、モバイル |                                                                              |
| [Enkrypt](https://www.enkrypt.com/networks/rootstock-wallet/) | ✔               | ✔               | -              | Chrome             | Mainnet, Testnet                                                             |
| [MyCrypto](https://mycrypto.com/)                             | -               | -               | -              | デスクトップ             | Rootstock (RBTC)                                          |
| [TaHo](https://taho.xyz)                                      | ✔               | ✔               | -              | Chrome             | Rootstock (RBTC), Mainnet                                 |
| [Frontier](https://www.frontier.xyz/browser-extension)        | -               | -               | -              | デスクトップ、モバイル、Chrome | Rootstock (RBTC)                                          |
| [Bitget](https://web3.bitget.com/en/)                         | -               | ❌               | -              | Chrome、モバイル        | RBTC                                                                         |
| [SafePal](https://www.safepal.com/en/extension)               | ✔               | ✔               | -              | Chrome、モバイル        | Rootstock (RBTC), Mainnet                                 |
| [Wallby](https://wallby.app/)                                 | ✔               | ✔               | -              | モバイル               | Rootstock (RBTC)、Bitcoin                                  |
| [MathWallet](https://blog.mathwallet.org/?p=1625)             | ✔               | ✔               | -              | Chrome、デスクトップ、モバイル | Mainnet                                                                      |
| [Block Wallet](https://blockwallet.io/)                       | ✔               | ✔               | -              | Chrome             | Mainnet                                                                      |
| [MtPelerin Bridge](https://www.mtpelerin.com/bridge-wallet)   | ✔               | ✔               | -              | デスクトップ、モバイル        | Rootstock (Mainnet), Bitcoin (Testnet) |
| [Exodus](https://www.exodus.com/)                             | ✔               | ✔               | -              | Chrome、デスクトップ、モバイル | Mainnet                                                                      |
| [SubWallet](https://www.subwallet.app/)                       | ✔               | ✔               | -              | Chrome             | Mainnet, Testnet                                                             |
| [WigWam](https://wigwam.app/)                                 | ✔               | ✔               | -              | Chrome             | Mainnet, Testnet                                                             |
| [AirGap](https://airgap.it/)                                  | ✔               | ✔               | -              | ❌                  | Mainnet                                                                      |
| [Zerion](https://zerion.io/)                                  | ✔               | ✔               | -              | Chrome             | Mainnet, Testnet                                                             |
| [Rainbow Wallet](https://rainbow.me/en/)                      | ✔               | ✔               | -              | Chrome             | Mainnet, Testnet                                                             |





