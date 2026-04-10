---
sidebar_position: 3
sidebar_label: Para
title: Getting Started with Para
slug: /use-cases/onboarding-ux/para
description: Para is a modern wallet infrastructure for fintech and crypto applications. It provides a comprehensive wallet and authentication suite for crypto developers and apps on Rootstock.
tags: [onboarding, para, wallet, rootstock, account-abstraction, dapps]
---

[Para Wallet](https://www.getpara.com/) is a modern, non-custodial wallet infrastructure for fintech and crypto. It offers a wallet and authentication suite for web3 apps. Users can access and transact without seed phrases or browser extensions while keeping control of their assets.

This walkthrough shows how to use Para on Rootstock with the Para SDK.

## Prerequisites

Before integrating Para with Rootstock, ensure you have:

- A Para API key from the [Para Developer Portal](https://developer.getpara.com/)
- A Rootstock RPC API account
- Node.js 18+ and a Next.js development environment
- Basic familiarity with React and TypeScript

## Installation

```bash
npm install @getpara/react-sdk
```

**Note:** Use `@getpara/react-sdk` version **2.2.0** or newer.

## Setup Para Provider

Create a `ParaSDKProvider` that communicates with Rootstock. Import `ParaSDKProvider` and related types from `@getpara/react-sdk` per the [Para React SDK docs](https://docs.getpara.com/).

```tsx
import { rootstockTestnet } from "viem/chains";

const ROOTSTOCK_TESTNET = {
  name: "Rootstock Testnet",
  evmChainId: "31" as const,
  nativeTokenSymbol: "tRBTC",
  logoUrl:
    "https://raw.githubusercontent.com/rsksmart/rsk-contract-metadata/refs/heads/master/images/rootstock-orange.png",
  rpcUrl: "https://rpc.testnet.rootstock.io/<your-apikey>",
  explorer: {
    name: "Rootstock Testnet Explorer",
    url: "https://explorer.testnet.rootstock.io",
    txUrlFormat:
      "https://explorer.testnet.rootstock.io/tx/{HASH}",
  },
  isTestnet: true,
};

export function ParaProvider({ children }: { children: React.ReactNode }) {
  return (
    <ParaSDKProvider
      paraClientConfig={{
        apiKey: API_KEY,
        env: ENVIRONMENT,
      }}
      externalWalletConfig={{
        wallets: ["METAMASK", "WALLETCONNECT"],
        includeWalletVerification: true,
        evmConnector: {
          config: {
            chains: [rootstockTestnet],
          },
        },
        walletConnect: {
          projectId:
            process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
        },
      }}
      config={{
        appName: "Para Modal + EVM Wallets Example",
      }}
      paraModalConfig={{
        balances: {
          displayType: "AGGREGATED",
          requestType: "MAINNET_AND_TESTNET",
          additionalAssets: [
            {
              name: "tRBTC",
              symbol: "tRBTC",
              logoUrl:
                "https://raw.githubusercontent.com/rsksmart/rsk-contract-metadata/refs/heads/master/images/rootstock-orange.png",
              implementations: [
                {
                  network: ROOTSTOCK_TESTNET,
                },
              ],
            },
            {
              name: "tRIF Token",
              symbol: "tRIF",
              logoUrl:
                "https://raw.githubusercontent.com/rsksmart/rsk-contract-metadata/refs/heads/master/images/rif.png",
              price: {
                value: 1,
                currency: "USD",
              },
              implementations: [
                {
                  network: ROOTSTOCK_TESTNET,
                  contractAddress:
                    "0x19f64674d8a5b4e652319f5e239efd3bc969a1fe",
                },
              ],
            },
          ],
        },
        disableEmailLogin: false,
        disablePhoneLogin: false,
        authLayout: ["AUTH:FULL", "EXTERNAL:FULL"],
        oAuthMethods: ["GOOGLE"],
        onRampTestMode: true,
        theme: {
          foregroundColor: "#222222",
          backgroundColor: "#FFFFFF",
          accentColor: "#888888",
          darkForegroundColor: "#EEEEEE",
          darkBackgroundColor: "#111111",
          darkAccentColor: "#AAAAAA",
          mode: "light",
          borderRadius: "none",
          font: "Inter",
        },
        logo: "/para.svg",
        recoverySecretStepEnabled: true,
        twoFactorAuthEnabled: false,
      }}
    >
      {children}
    </ParaSDKProvider>
  );
}
```

## Key features

This integration lets you use Para Wallet on Rootstock and surface custom tokens in the modal.

## Complete example

See the working sample in the [Para and Rootstock examples hub](https://github.com/rsksmart/examples-hub).

## Resources

- [Para Docs](https://docs.getpara.com/v2/introduction/welcome)
- [Rootstock walkthrough (Para)](https://docs.getpara.com/v2/walkthroughs/rootstock)
- [Para Developer Portal](https://developer.getpara.com/)
