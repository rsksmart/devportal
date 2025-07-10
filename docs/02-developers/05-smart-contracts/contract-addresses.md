---
sidebar_position: 700
title: Rootstock Contract Addresses
sidebar_label: Contract Addresses
tags: [rsk, rootstock, developers, quick starts, smart contracts, contract addresses]
description: "All Contract Addresses on Rootstock."
---

Here, you can find a list of [contracts addresses](#contract-addresses) and [cross-chain OFT addresses](#cross-chain-oft-contract-addresses) on Rootstock. 
For info on derivation paths, see [Account based addresses](/concepts/account-based-addresses/) or how to [verify address ownership](/developers/smart-contracts/verify-address-ownership/).

:::note[Note]
- [Rootstock Mainnet OFT Quickstart](https://docs.layerzero.network/v2/deployments/evm-chains/rootstock-mainnet-oft-quickstart)
- [Rootstock Testnet OFT Quickstart](https://docs.layerzero.network/v2/deployments/evm-chains/rootstock-testnet-oft-quickstart)		
- [Rootstock Contract Metadata](https://github.com/rsksmart/rsk-contract-metadata)
- [Rootstock Testnet Contract Metadata](https://github.com/rsksmart/rsk-testnet-contract-metadata) 
- [Rootstock - DefiLlama](https://defillama.com/chain/Rootstock)			
:::

## Contract Addresses

| Symbol |  Name | Token Standard  | Network | Contract Address (Mainnet) | Contract Address (Testnet) |
|---|---|---|---| ---| ---|
|  [RIF](/concepts/rif-suite/token) |  RIF Token |  ERC677 | Rootstock | [0x2acc95...](https://explorer.rootstock.io/address/0x2acc95758f8b5f583470ba265eb685a8f45fc9d5) | [0x19f646...](https://explorer.testnet.rootstock.io/address/0x19f64674d8a5b4e652319f5e239efd3bc969a1fe)
|  DOC |  [Dollar on Chain](https://moneyonchain.com/doc-bitcoin-stablecoin/) |  ERC20 | Rootstock | [0xe70069...](https://explorer.rootstock.io/address/0xe700691da7b9851f2f35f8b8182c69c53ccad9db) |
|  USDRIF |  [RIF US Dollar](https://rifonchain.com/) | ERC20, ERC165, ERC1967 | Rootstock | [0x3a15461...](https://explorer.rootstock.io/address/0x3a15461d8ae0f0fb5fa2629e9da7d66a794a6e37) | [0x8dbf3...](https://explorer.testnet.rootstock.io/address/0x8dbf326e12a9fF37ED6DDF75adA548C2640A6482)
|  RIFP |  [RIFPro](https://rif.moneyonchain.com/metrics) |  ERC20 | Rootstock | [0xf4d27c5...](https://explorer.rootstock.io/address/0xf4d27c56595ed59b66cc7f03cff5193e4bd74a61) |
|  BPro |  [BitPro](https://moneyonchain.com/bpro-income-for-bitcoin-holders/) |  ERC20 | Rootstock | [0x440cd83...](https://explorer.rootstock.io/address/0x440cd83c160de5c96ddb20246815ea44c7abbca8) |
|  BTCX |  [BTCX](https://moneyonchain.com/btcx-leveraged-bitcoin/) |  | Rootstock | [0xf773b5...](https://explorer.rootstock.io/address/0xf773b590af754d597770937fa8ea7abdf2668370) |
|  RIFX |  [RIFX](https://rif.moneyonchain.com/metrics) |  | Rootstock | [0xcff3fca...](https://explorer.rootstock.io/address/0xcff3fcaec2352c672c38d77cb1a064b7d50ce7e1) |
|  WRBTC |  Wrapped RBTC | ERC20  | Rootstock | [0x542FDA3...](https://rootstock.blockscout.com/token/0x542FDA317318eBf1d3DeAF76E0B632741a7e677d) |
|  stRIF |  Staked RIF in RootstockCollective DAO | ERC20  | Rootstock | [0x5db91e2...](https://rootstock.blockscout.com/token/0x5db91e24BD32059584bbDb831A901f1199f3d459?tab=contract) | [0xe703971](https://explorer.testnet.rootstock.io/address/0xe7039717c51c44652fb47be1794884a82634f08f) |
|  USDT0 |  USDT0 | ERC20  | Rootstock | [0x779dED0...](https://explorer.rootstock.io/address/0x779ded0c9e1022225f8e0630b35a9b54be713736) | [0x5A2256D](https://explorer.testnet.rootstock.io/token/0x5a2256dd0dfbc8ce121d923ac7d6e7a3fc7f9922) |



## Cross Chain (OFT) Contract Addresses

:::info[About OFT Standard]

The Omnichain Fungible Token (OFT) Standard allows fungible tokens to be transferred across multiple blockchains without asset wrapping or middlechains. See [LayerZero V2 OFT Quickstart](https://docs.layerzero.network/v2/developers/evm/oft/quickstart). 

- Mint and transfer a lightweight [Omnichain Fungible Token (OFT) between Rootstock Testnet](https://docs.layerzero.network/v2/deployments/evm-chains/rootstock-testnet-oft-quickstart) and other supported chains.	

- Mint and transfer a lightweight [Omnichain Fungible Token (OFT) between Rootstock Mainnet](https://docs.layerzero.network/v2/deployments/evm-chains/rootstock-mainnet-oft-quickstart) and other supported chains.

:::

| Token Name and Symbol | Explorer URL                                                                            | OFT Contract Address        |
| :--------- | :----------------------------------------------------------------------------------------------------- | :--------------------------------------------- |
| RBTC       | [Ethereum](https://etherscan.io/address/0x1e44f98cC78d505A61F63b26D13b116CF51dbB87)                  | `0x1e44f98cC78d505A61F63b26D13b116CF51dbB87` |
| RBTC       | [Arbitrum One](https://arbiscan.io/address/0x441Fcb23dFe8289cf572126FEDCf450974ADc891)                   | `0x441Fcb23dFe8289cf572126FEDCf450974ADc891` |
| RBTC       | [Base](https://basescan.org/address/0x441Fcb23dFe8289cf572126FEDCf450974ADc891)                      | `0x441Fcb23dFe8289cf572126FEDCf450974ADc891` |
| RBTC       | [Solana](https://solscan.io/token/8yev7nLen2PFN2uYGhzsUbu243wMa9z4ZrCwuXs6DEQw)                       | `8yev7nLen2PFN2uYGhzsUbu243wMa9z4ZrCwuXs6DEQw`|
| RIF        | [Ethereum](https://etherscan.io/address/0x01b603be3D545F096015741e6503440282BF45fb)                    | `0x01b603be3D545F096015741e6503440282BF45fb` |
| RIF        | [Arbitrum One](https://arbiscan.io/address/0xe5e851b01DD3Eda24FDe709a407dB44555B6d1E0)                 | `0xe5e851b01DD3Eda24FDe709a407dB44555B6d1E0` |
| RIF        | [Base](https://basescan.org/address/0xe5e851b01DD3Eda24FDe709a407dB44555B6d1E0)                       | `0xe5e851b01DD3Eda24FDe709a407dB44555B6d1E0` |
| RIF        | [Solana](https://solscan.io/token/AAeENcfHbTExuTvs4q7r9Bjax98Dg6BGX3aMph4bTLdK)                       | `AAeENcfHbTExuTvs4q7r9Bjax98Dg6BGX3aMph4bTLdK`|
| USDT0       | [Rootstock](https://explorer.rootstock.io/address/0x1a594d5d5d1c426281c1064b07f23f57b2716b61)        | `0x1a594d5d5d1c426281C1064B07f23F57B2716B61`|