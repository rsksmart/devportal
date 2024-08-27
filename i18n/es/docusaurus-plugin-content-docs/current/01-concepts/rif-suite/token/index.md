---
sidebar_label: Ficha RIF
sidebar_position: 400
title: "Token RIF: Potenciando las aplicaciones descentralizadas"
tags:
  - rif
  - ficha
  - erc677
description: Información sobre el token RIF, dónde obtenerlo, cómo transferirlo y detalles técnicos sobre su estándar de token
---

El token Rootstock Infrastructure Framework (RIF) permite a cualquier poseedor de tokens consumir los servicios compatibles con [RIF Tools](/concepts/rif-suite/).

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
      <td scope="row">Cómo conseguir</td>
      <td>
        <ul>
            <li><a href="#exchanges" target="_blank">Intercambios</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

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
      <td scope="row">Contrato Dirección Testnet</td>
      <td><a href="https://explorer.testnet.rootstock.io/address/0x19f64674d8a5b4e652319f5e239efd3bc969a1fe" target="_blank">0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE</a></td>
    </tr>
    <tr>
      <td scope="row">Tipo de contrato</td>
      <td>ERC677</td>
    </tr>
    <tr>
      <td scope="row">Cómo conseguir</td>
      <td>
        <ul>
            <li><a href="https://faucet.rifos.org/" target="_blank">Grifo</a></li>
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
  function aprobar(dirección _spender, uint256 _valor) public returns (bool)
  function transfer(dirección _a, uint256 _valor) public returns (bool)
  ```

- Transferir y llamar:

  ```js
  function transfer(dirección _a, uint256 _valor, bytes datos)
  ```

  **Parámetros**

  - `_to: address`: Dirección del contrato.
  - `_valor: uint256`: Cantidad de tokens RIF a enviar.
  - `datos: bytes`: Firma de 4 bytes de la función a ejecutar, seguida de los parámetros de la función a ejecutar con codificados como matriz de bytes.
