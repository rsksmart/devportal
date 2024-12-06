---
sidebar_label: RIF Token
sidebar_position: 400
title: "RIF Token: Bringing Utility to Bitcoin"
tags: [rif, token, erc677]
description: "Information about the RIF token, where to obtain it, how to transfer it, and technical details on its token standard"
---

The RIF (Rootstock Infrastructure Framework) token makes it easier, faster and more rewarding to build on Bitcoin. It also enables governance on [RootstockCollective DAO](https://rootstockcollective.xyz/). By staking RIF, users can mint stRIF; the governance token of the RootstockCollective used for voting, proposal creation, and rewards allocation. For more information, read the [Rootstock Collective Whitepaper](https://wiki.rootstockcollective.xyz/).

## RIF (RIF Token in Mainnet)

<table class="table">
  <tbody>
    <tr>
      <td scope="row">Token Name</td>
      <td><a href="https://coinmarketcap.com/currencies/rsk-infrastructure-framework/" target="_blank">RIF</a></td>
    </tr>
    <tr>
      <td scope="row">Total Supply</td>
      <td>1,000,000,000 RIF</td>
    </tr>
    <tr>
      <td scope="row">Contract Address</td>
      <td><a href="https://explorer.rootstock.io/address/0x2acc95758f8b5f583470ba265eb685a8f45fc9d5" target="_blank">0x2acc95758f8b5f583470ba265eb685a8f45fc9d5</a></td>
    </tr>
    <tr>
      <td scope="row">Contract Type</td>
      <td>ERC677</td>
    </tr>
    <tr>
      <td scope="row">How to Get</td>
      <td>
        <ul>
            <li><a href="https://rif.technology/rif-token/" target="_blank">Exchanges</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<Button href="https://rif.technology/rif-token/">Get RIF on Exchanges</Button>

## tRIF (RIF Token in Testnet)

<table class="table">
  <tbody>
    <tr>
      <td scope="row">Token Name</td>
      <td>tRIF</td>
    </tr>
    <tr>
      <td scope="row">Total Supply</td>
      <td>1,000,000,000 tRIF</td>
    </tr>
    <tr>
      <td scope="row">Contract Testnet Address</td>
      <td><a href="https://explorer.testnet.rootstock.io/address/0x19f64674d8a5b4e652319f5e239efd3bc969a1fe" target="_blank">0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE</a></td>
    </tr>
    <tr>
      <td scope="row">Contract Type</td>
      <td>ERC677</td>
    </tr>
    <tr>
      <td scope="row">How to Get</td>
      <td>
        <ul>
            <li><a href="https://faucet.rifos.org/" target="_blank">Faucet</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<Button href="https://faucet.rifos.org/">Get tRIF in Testnet</Button>

## stRIF (Staked RIF Token in the RootstockCollective DAO)

The stRIF tokens give you voting rights and participation in the RootstockCollective DAO's governance and decision-making process they are pegged 1:1 with RIF. To acquire stRIF tokens, you need to stake RIF tokens in the [governance system dApp](https://app.rootstockcollective.xyz). RIF tokens can be purchased through [various exchanges](https://wiki.rootstockcollective.xyz/Token-Resources-e3f89008a96e4dcab3037ff7861d9d8a), and once staked, an equivalent amount of stRIF is issued for governance participation.

<table class="table">
  <tbody>
    <tr>
      <td scope="row">Token Name</td>
      <td><a href="https://wiki.rootstockcollective.xyz/2c6e3b87b49f4c1e9225b713e1b49538?v=819168fca4964319896c19e8299a8ea0" target="_blank">stRIF</a></td>
    </tr>
    <tr>
      <td scope="row">Total Supply</td>
      <td>Varies and will increase and decrease as RIF is staked and unstaked.</td>
    </tr>
    <tr>
      <td scope="row">Contract Address</td>
      <td><a href="https://rootstock.blockscout.com/token/0x5db91e24BD32059584bbDb831A901f1199f3d459?tab=contract" target="_blank">0x5db91e24BD32059584bbDb831A901f1199f3d459</a></td>
    </tr>
    <tr>
      <td scope="row">Contract Types</td>
      <td>ERC20, ERC677, ERC1967Proxy</td>
    </tr>
    <tr>
      <td scope="row">How to Get</td>
      <td>
        <ul>
            <li><a href="http://app.rootstockcollective.xyz/" target="_blank">Stake your RIF on the RootstockCollective dApp to get stRIF</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Wallets

See [supported wallets](/dev-tools/wallets/).

## Technical information

### ERC677 token standard

An [ERC20](https://github.com/ethereum/EIPs/issues/20)
token transaction between a regular/non-contract address and contract are two different transactions: You should call `approve` on the token contract and then call `transferFrom` on the other contract when you want to deposit your tokens into it.

[ERC677](https://github.com/ethereum/EIPs/issues/677)
simplifies this requirement and allows using the same transfer function. ERC677 tokens can be sent by calling `transfer` function on the token contract with no difference if the receiver is a contract or a wallet address, since there is a new way to notify the receiving contract of the transfer.

An ERC677 token transfer will be the same as an ERC20 transfer. On the other hand, if the receiver is a contract, then the ERC677 token contract will try to call `tokenFallback` function on receiver contract. If there is no `tokenFallback` function on receiver contract, the transaction will fail.

### RIF transfer methods

- Approve and transfer:
    ```js
    function approve(address _spender, uint256 _value) public returns (bool)
    function transfer(address _to, uint256 _value) public returns (bool)
    ```

- Transfer and call:
    ```js
    function transfer(address _to, uint256 _value, bytes data)
    ```

    **Parameters**
    - `_to: address`: Contract address.
    - `_value: uint256`: Amount of RIF tokens to send.
    - `data: bytes`: 4-byte signature of the function to be executed, followed by the function parameters to be executed with encoded as a byte array.
