---
title: Conversión de BTC a RBTC y viceversa
sidebar_label: Redes
tags:
  - rsk
  - portainjertos
  - rbtc
  - conversión
  - peg
  - 2 vías
  - clavija
  - peg-out
  - federación
description: Conversión de BTC a RBTC (peg-in) y de RBTC a BTC (peg-out) en Mainnet y Testnet.
sidebar_position: 303
---

## Conversión de Mainnet

En esta sección repasaremos los pasos necesarios para convertir BTC a RBTC y viceversa en las redes Bitcoin y Rootstock (RSK).

:::tip[Tip]
La cantidad mínima de Bitcoin a convertir es de **0,005 BTC** para Mainnet.
:::

### Conversor de BTC a RBTC

Instrucciones sobre cómo hacer un peg-in en Mainnet.

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">1. Obtener una dirección BTC con saldo</Accordion.Header>
    <Accordion.Body>
      - Cualquier monedero Bitcoin que soporte clave privada heredada (`p2pkh`) funciona para este paso. En esta sección, utilizaremos el monedero BTC de Electrum para conectarnos a BTC Mainnet.
        1. 1. Descargue el monedero desde [Electrum Website](https://electrum.org/)
        2. Instale Electrum https://electrum.org/ 2. Instale Electrum
        Inicie Electrum
        4. Una vez iniciado Electrum, cree o importe un monedero
        5. 5. Vaya a la tercera pestaña "Recibir". Verá una dirección de Bitcoin Testnet como la siguiente:
        <div align="left"><img width="70%" src="/img/legacy-private-key.png" alt="Create a Legacy (`p2pkh`) walletn"/></div>
      > Nota: Utilice un monedero Bitcoin antiguo (no Segwit) con una clave pública que empiece por `m` o `n`, y una clave privada con el prefijo `p2pkh`.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">2. Enviar Bitcoin a la dirección de la Federación Rootstock</Accordion.Header>
    <Accordion.Body>
      Enviar Bitcoin a la dirección de la federación Rootstock
      - La dirección de la federación Rootstock se obtiene realizando una llamada a un contrato inteligente en la red principal de Rootstock. Para realizar la llamada, debe tener instalado [MyCrypto](https://app.mycrypto.com/interact-with-contracts):
        1. 1. Seleccione la red Rootstock (RSK).
        2. Navegue a **MyCrypto** -> **Contratos**.
        3. Seleccione **Contratos existentes** y elija **Puente** en el menú desplegable.
        4. Haga clic en **getFederationAddress** para ejecutar la llamada.
          Debería parecerse a la captura de pantalla siguiente:
        <div align="left"><img width="70%" src="/img/mycrypto-federation-updated-10-07-2024.png" alt="Get Rootstock Federation address from MyCrypto"/></div>
      Una vez que tenga la dirección de la Federación Rootstock, puede enviarle Bitcoin desde su dirección Bitcoin.
      > Nota: Debe enviar una cantidad mínima de 0,005 BTC.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">3. Esperar confirmaciones de BTC</Accordion.Header>
    <Accordion.Body>
      - Para asegurarnos de que la transacción se realiza correctamente, debemos esperar 100 confirmaciones de la red BTC.
      > 100 bloques \* 10 minutos/bloque = 1000 minutos = 16,667 horas. Es decir, tardaremos aproximadamente 17 horas.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">4. Obtener dirección RBTC con clave privada BTC</Accordion.Header>
    <Accordion.Body>
      - Puede obtener la dirección RBTC correspondiente a partir de su clave privada de BTC utilizando las [Rootstock Utils](https://github.com/rsksmart/utils). Si no desea compilar la utilidad, puede descargar la [última versión](https://github.com/rsksmart/utils/releases/latest).
      > Nota: cuando introduzca la clave privada de Bitcoin no incluya _p2pkh:_ delante.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">5. Comprobar el saldo de RBTC</Accordion.Header>
    <Accordion.Body>
      Puede comprobar el saldo de la dirección RBTC en Metamask, MyCrypto o cualquier [monedero compatible con Rootstock](https://blog.rootstock.io/noticia/rootstock-wallets/).
      > Nota: Debe esperar un mínimo de 100 confirmaciones + un mínimo de 5 minutos para comprobar su saldo de RBTC.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

### Conversion RBTC a BTC

Instrucciones sobre cómo hacer un peg-out de Mainnet.

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">1. Obtener dirección BTC con clave privada RBTC</Accordion.Header>
    <Accordion.Body>
      Puedes obtener la dirección BTC correspondiente a tu clave privada RBTC utilizando la utilidad [Rootstock](https://github.com/rsksmart/utils). Si no desea compilar la utilidad, puede descargar la [última versión](https://github.com/rsksmart/utils/releases/latest).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">2. Enviar RBTC a Rootstock Bridge Contract</Accordion.Header>
      <Accordion.Body>
        - Dirección del Contrato Puente Rootstock: `0x0000000000000000000000000000000001000006`
        - Nota: La cantidad mínima a enviar debe ser de al menos 0,004 RBTC para Mainnet, el envío de cualquier cantidad por debajo de esto, fallará y los fondos serán reembolsados. El Límite de Gas de la transacción debe establecerse manualmente en 100.000 gas; de lo contrario, la transacción fallará. El Precio del Gas puede fijarse en 0,06 gwei (o el precio del gas sugerido por el monedero).
          ![Personalizar Gas en Metamask antes de enviar transacción en Rootstock](/img/metamask-gas-limit.png)
      </Accordion.Body>
    </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">3. Comprobar el saldo de la dirección BTC</Accordion.Header>
    <Accordion.Body>
      - Puede utilizar el monedero Electrum descargado anteriormente o desde cualquier explorador de Bitcoin para comprobar el saldo.
        > Nota: El proceso de liberación en la red Bitcoin tarda 4000 confirmaciones de bloque de Rootstock y al menos 10 minutos más.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

## Conversión de Testnet

En esta sección repasaremos los pasos para convertir t-BTC a tRBTC, y viceversa en las Testnets de Bitcoin y Rootstock.

:::tip[Tip]
La cantidad mínima de Bitcoin a convertir es **0.005 tBTC** para Testnet.
:::

### Conversion de tBTC a tRBTC

Instrucciones para realizar un enclavamiento Testnet.

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">1. Conectar un monedero a Bitcoin Testnet</Accordion.Header>
    <Accordion.Body>
      Recomendamos utilizar el monedero Electrum BTC para conectarse a Bitcoin Testnet.
      - Descargue el monedero de
        [Sitio web de Electrum](https://bitzuma.com/posts/a-beginners-guide-to-the-electrum-bitcoin-wallet/)
      - Instale Electrum
      - Inicie Electrum en modo Testnet
        - Por ejemplo en MacOS:
          `/Applications/Electrum.app/Contents/MacOS/Electrum --testnet`
      - Una vez iniciado Electrum, cree o importe un monedero
      - Vaya a la tercera pestaña, "Recibir".
        Verá una dirección Bitcoin Testnet como la siguiente.
      ![Crear un monedero heredado (`p2pkh`)](/img/legacy-private-key.png)
      - Nota: El monedero Bitcoin tiene que ser heredado (no Segwit) cuya clave pública empiece por `m` o `n`, y la clave privada empiece por `p2pkh:`
      ![Obtener una dirección Bitcoin Testnet en el monedero Electrum](/img/electrum-wallet.png)
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">2. Obtener Bitcoin de prueba de Testnet Faucet</Accordion.Header>
    <Accordion.Body>
      Hay varias opciones para obtener Bitcoin en Testnet. Nosotros utilizamos [https://testnet-faucet.mempool.co/](https://testnet-faucet.mempool.co/).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">3. Enviar Bitcoin a la dirección de la Federación Rootstock</Accordion.Header>
    <Accordion.Body>
      - La dirección de la Federación Rootstock se obtiene haciendo una llamada de Contrato Inteligente en Testnet Rootstock.
      - Para realizar la llamada, necesitará tener
      [MyCrypto](https://app.mycrypto.com/interact-with-contracts)
      instalado, seleccionar Rootstock Testnet en _"More Networks"_, y Navegar a _"MyCrypto -> Contracts -> Select Existing Contracts -> "Bridge" -> "getFederationAddress"_ para ejecutar la llamada.
      - Debe parecerse a la siguiente captura de pantalla.
      ![Obtener dirección de la Federación Rootstock desde MyCrypto](/img/mycrypto-federation-updated-10-07-2024.png)
      Una vez que tenga la dirección de la Federación Rootstock,
      puede enviarle Bitcoin desde su dirección Bitcoin.
      - Nota: Necesita enviar una cantidad mínima de 0.01 tBTC para la conversión.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">4. Obtener dirección tRBTC con clave privada tBTC</Accordion.Header>
    <Accordion.Body>
      - Puede obtener una dirección tRBTC correspondiente a partir de su clave privada tBTC utilizando [github.com/rsksmart/utils](https://github.com/rsksmart/utils). Si no desea compilar la utilidad, puede descargar la [última versión](https://github.com/rsksmart/utils/releases/latest).
      - Nota: Cuando introduzcas la clave privada de Bitcoin no incluyas `_p2pkh:_` delante.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">5. Comprobar el saldo de tRBTC en Testnet</Accordion.Header>
    <Accordion.Body>
      - Puede comprobar el saldo de la dirección tRBTC anterior en Metamask, MyCrypto o cualquier monedero Rootstock compatible con Testnet.
      - Tiene que esperar un mínimo de 10 confirmaciones + un mínimo de 5 minutos para comprobar su saldo de RBTC.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

### Conversion de tRBTC a tBTC

Instrucciones sobre cómo hacer una clavija Testnet.

:::info[Note]
El proceso de liberación en la red Bitcoin tarda 10 confirmaciones de bloque Rootstock y al menos 10 minutos más.
:::

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">1. Obtener la dirección tBTC con la clave privada tRBTC</Accordion.Header>
    <Accordion.Body>
      - Puedes obtener una dirección tBTC correspondiente a partir de tu clave privada tRBTC utilizando [github.com/rsksmart/utils](https://github.com/rsksmart/utils). Si no desea compilar la utilidad, puede descargar la [última versión](https://github.com/rsksmart/utils/releases/latest).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">2. Enviar tRBTC a Rootstock Bridge Contract</Accordion.Header>
    <Accordion.Body>
      - Dirección del Contrato Puente Rootstock: `0x0000000000000000000000000000000001000006`
      - **Nota importante**: La cantidad mínima a enviar debe ser **al menos** 0.004 tRBTC para Testnet, valores por debajo de eso serán rechazados y reembolsados al remitente.
      - El límite de gas de la transacción debe establecerse manualmente en 100.000 gas; de lo contrario, la transacción fallará.
      - El precio del gas puede fijarse en 0,06 gwei.
        ![Personalizar Gas en Metamask antes de enviar transacción en Rootstock](/img/metamask-gas-limit.png)
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">3. Comprobar el saldo de la dirección tBTC en Bitcoin Testnet</Accordion.Header>
    <Accordion.Body>
      Puede utilizar el monedero Electrum descargado anteriormente o desde
      cualquier explorador de Bitcoin para comprobar el saldo.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```
