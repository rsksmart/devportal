---
sidebar_position: 320
sidebar_label: Para
title: Getting Started with Para
description: 'Para is a modern wallet infrastructure for fintech and crypto applications. It provides a comprehensive wallet and authentication suite for crypto developers and apps.'
tags: [rsk, para, developers, developer tools, wallet, rootstock, testing, dApps, smart contracts]
---

[Para Wallet](https://www.getpara.com/) is a modern, non-custodial wallet infrastructure for fintech and crypto, offering a comprehensive wallet and authentication suite for web3 apps. It enables secure access and transactions without seed phrases or browser extensions, while keeping users fully in control of their assets.

This walkthrough explores how to use Para in Rootstock using Para SDK.

## Prerequisites
- Before integrating Para with Rootstock, ensure you have:
- A Para API key from the [Para Developer Portal](https://developer.getpara.com/)
- Rootstock RPC API Account
- Node.js 18+ and Next.js development environment
- Basic familiarity with React and TypeScript

## Installation
```node
npm install @getpara/react-sdk
``` 
> **Important Note:** Please make sure to be at least @getpara/react-sdk version 2.2.0

## Setup Para Provider
Create a ParaSDKProvider that communicates with Rootstock.

```node
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

## Key Features
This integration provides a way to use Para Wallet with Rootstock adding custom tokens.
​
## Complete Example
See the full working example with [Para and Rootstock](https://github.com/rsksmart/examples-hub).


## Resources
- [Para Docs](https://docs.getpara.com/v2/introduction/welcome)
- [Rootstock Walkthrough](https://docs.getpara.com/v2/walkthroughs/rootstock)
- [Para Developer Portal](https://developer.getpara.com/)

