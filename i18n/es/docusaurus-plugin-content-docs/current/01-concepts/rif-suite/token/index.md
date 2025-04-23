---
sidebar_label: Ficha RIF
sidebar_position: 400
title: "RIF Token: Bringing Utility to Bitcoin"
tags:
  - rif
  - ficha
  - erc677
description: Información sobre el RIF token, dónde obtenerlo, cómo transferirlo y detalles técnicos sobre su estándar de token
---

The RIF (Rootstock Infrastructure Framework) token makes it easier, faster and more rewarding to build on Bitcoin. It also enables governance on [RootstockCollective DAO](https://rootstockcollective.xyz/). By staking RIF, users can mint stRIF; the governance token of the RootstockCollective used for voting, proposal creation, and rewards allocation. For more information, read the [Rootstock Collective Whitepaper](https://wiki.rootstockcollective.xyz/).

## RIF (RIF Token en Mainnet)

<table class="table">
  <tbody>
    <tr>
      <td scope="row">Nombre de la ficha</td>
      <td><a href="https://coinmarketcap.com/currencies/rsk-infrastructure-framework/" target="_blank">RIF</a></td>
    </tr>
    <tr>
      <td scope="row">Suministro total</td>
      <td>1.000.000.000 RIF</td>
    </tr>
    <tr>
      <td scope="row">Dirección del contrato</td>
      <td><a href="https://explorer.rootstock.io/address/0x2acc95758f8b5f583470ba265eb685a8f45fc9d5" target="_blank">0x2acc95758f8b5f583470ba265eb685a8f45fc9d5</a></td>
    </tr>
    <tr>
      <td scope="row">Tipo de contrato</td>
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

## tRIF (Token RIF en Testnet)

<table class="table">
  <tbody>
    <tr>
      <td scope="row">Nombre de la ficha</td>
      <td>tRIF</td>
    </tr>
    <tr>
      <td scope="row">Suministro total</td>
      <td>1.000.000.000 tRIF</td>
    </tr>
    <tr>
      <td scope="row">Dirección de Contrato Testnet</td>
      <td><a href="https://explorer.testnet.rootstock.io/address/0x19f64674d8a5b4e652319f5e239efd3bc969a1fe" target="_blank">0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE</a></td>
    </tr>
    <tr>
      <td scope="row">Tipo de contrato</td>
      <td>ERC677</td>
    </tr>
    <tr>
      <td scope="row">How to Get</td>
      <td>
        <ul>
            <li><a href="https://faucet.rifos.org/" target="_blank">Grifo</a></li>
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

## Billeteras

Ver [monederos soportados](/dev-tools/wallets/).

## Información técnica

### Estándar de fichas ERC677

Una transacción de tokens [ERC20](https://github.com/ethereum/EIPs/issues/20)
entre una dirección normal/no contractual y un contrato son dos transacciones diferentes: Debes llamar a `approve` en el contrato de tokens y luego llamar a `transferFrom` en el otro contrato cuando quieras depositar tus tokens en él.

[ERC677](https://github.com/ethereum/EIPs/issues/677)
simplifica este requisito y permite utilizar la misma función de transferencia. Los tokens ERC677 pueden enviarse llamando a la función `transfer` en el contrato de tokens sin diferencia si el receptor es un contrato o una dirección de cartera, ya que hay una nueva forma de notificar la transferencia al contrato receptor.

Una transferencia de tokens ERC677 será igual que una transferencia ERC20. Por otro lado, si el receptor es un contrato, el contrato de tokens ERC677 intentará llamar a la función `tokenFallback` del contrato receptor. Si no hay ninguna función `tokenFallback` en el contrato receptor, la transacción fallará.

### Métodos de transferencia RIF

- Aprobar y transferir:
  ```js
  function aprobar(address _spender, uint256 _value) public returns (bool)
  function transfer(address _to, uint256 _value) public returns (bool)
  ```

- Transferir y llamar:

  ```js
  function transfer(address _to, uint256 _value, bytes data)
  ```

  **Parámetros**

  - `_to: address`: Dirección del contrato.
  - `_value: uint256`: Cantidad de RIF tokens a enviar.
  - `datos: bytes`: Firma de 4 bytes de la función a ejecutar, seguida de los parámetros de la función a ejecutar con codificados como matriz de bytes.
