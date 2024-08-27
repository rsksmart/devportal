---
sidebar_label: RIF Relay Ejemplo de dApp
sidebar_position: 400
title: Cómo utilizar RIF Relay Sample dApp SDK
tags:
  - rif
  - sobre
  - relé
  - guía de integración
description: RIF Relay Sample dApp SDK Kit de inicio
---

## Primeros pasos

Esta guía ayuda a comenzar rápidamente con la configuración de su entorno para utilizar RIF Relay y también a utilizar la dApp de ejemplo para probar los servicios de relé.

### Paso 1: Ejecutar el nodo Portainjerto

Necesita configurar y ejecutar un nodo Rootstock, preferiblemente la última versión de RSKj releases. El nodo puede funcionar localmente o a través de Docker. En ambos casos, se utiliza un archivo [`node.conf`](https://github.com/rsksmart/rif-relay/blob/main/docker/node.conf).

Consulte la [Guía de instalación del nodo Rootstock](/node-operators/setup/installation/) para obtener una guía detallada sobre este paso.

### Paso 2: Añadir red a Metamask

Para interactuar con la red Rootstock, es necesario añadirla a Metamask. Dado que estamos utilizando el nodo en `--regtest mode`, siga la guía de Metatmask en [Cómo añadir una red personalizada RPC](https://support.metamask.io/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC) y añada la red Rootstock RegTest a Metamask con los siguientes datos:

```text
- Nombre de la red: RSK regtest
- Nueva URL RPC: http://127.0.0.1:4444
- ID de cadena: 33
- Símbolo de moneda: tRBTC
```

Para obtener más información sobre Metatmask y cómo añadirlo a Rootstock mediante programación, consulte [Metamask](/dev-tools/wallets/metamask/) y [Cómo añadir Metamask a Rootstock mediante programación](/resources/tutorials/rootstock-metamask/).

### Paso 3: Establecer contratos de relevo RIF

Para configurar el contrato de retransmisión RIF, clone el repositorio de contratos de retransmisión RIF: https://github.com/rsksmart/rif-relay-contracts, a continuación, siga la guía [Despliegue de retransmisión RIF](/developers/integrate/rif-relay/deployment/) para desplegar un contrato de retransmisión RIF, habilitar el reparto de ingresos y poner el token en la lista blanca permitiéndolo.

````mdx-code-block
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">Comprobar tokens permitidos</Accordion.Header>
    <Accordion.Body>
       ```bash
        npx hardhat allowed-tokens --network regtest
       ```
        Respuesta:
        ```bash
            rif-relay-contracts % npx hardhat allowed-tokens --network regtest
            deployVerifier [ '0x6f217dEd6c86A57f1211F464302e6fA544045B4f' ]
            relayVerifier [ '0x6f217dEd6c86A57f1211F464302e6fA544045B4f' ]
            customDeployVerifier [ '0x6f217dEd6c86A57f1211F464302e6fA544045B4f' ]
            customRelayVerifier [ '0x6f217dEd6c86A57f1211F464302e6fA544045B4f' ]
            nativeHolderDeployVerifier [ '0x6f217dEd6c86A57f1211F464302e6fA544045B4f' ]
            nativeHolderRelayVerifier [ '0x6f217dEd6c86A57f1211F464302e6fA544045B4f' ]
        ```
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">Acuñar ficha</Accordion.Header>
    <Accordion.Body>
        - Para acuñar nuevas unidades del `UtilToken` en la dirección del monedero de Metamask:
        - Vaya al monedero de Metamask y copie la dirección del monedero:
        - Ejecute el comando para acuñar el token, donde:

            - `--token-address` → esta es la dirección del `UtilToken`
            - `--amount` → cantidad a acuñar
            - `--receiver` → dirección del monedero
            ```bash
            npx hardhat mint \4 --token-address 0x6f217dEd6c86A57f1211F464302e6fA544045B4f \
            --amount 10000000000000000000 \
            --receiver <wallet-address> \
            --network regtest
            ``
        - Importa el token acuñado al monedero.
        - Para ver el token en la cartera, haga clic en "importar tokens" y, a continuación, pegue la dirección del token.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
````

### Paso 4: Configurar el servidor de retransmisión RIF

Clone el [Repositorio del servidor de retransmisión RIF](https://github.com/rsksmart/rif-relay-server) y, a continuación, consulte [Ejecutar el servidor de retransmisión RIF](/developers/integrate/rif-relay/deployment#run-the-rif-relay-server) para obtener una guía completa sobre la configuración del servidor de retransmisión RIF.

## RIF Relay Ejemplo de dApp

Esta dApp de ejemplo le muestra cómo enviar transacciones a la blockchain de Rootstock utilizando el [RIF Relay Sample dApp SDK](https://github.com/rsksmart/rif-relay-sample-dapp). Necesitarás conectar la dApp con MetaMask para firmar transacciones con la cuenta que gestiona tus Smart Wallets.

### Clonar repositorio SDK e instalar dependencias

```bash
    # clone repository
    git clone https://github.com/rsksmart/relaying-services-sdk-dapp
    cd relaying-services-sdk-dapp
    # install dependencies
    npm install --force
```

- Configurar variables de entorno

Crea un nuevo fichero llamado `.env` en el directorio superior, y añade las siguientes líneas en él (con las direcciones de los contratos generadas cuando desplegamos los contratos) en la sección **Set up RIF Relay Contracts** anterior:

```bash
    REACT_APP_CONTRACTS_RELAY_HUB=0x463F29B11503e198f6EbeC9903b4e5AaEddf6D29
    REACT_APP_CONTRACTS_DEPLOY_VERIFIER=0x14f6504A7ca4e574868cf8b49e85187d3Da9FA70
    REACT_APP_CONTRACTS_RELAY_VERIFIER=0xA66939ac57893C2E65425a5D66099Bc20C76D4CD
    REACT_APP_CONTRACTS_SMART_WALLET_FACTORY=0x79bbC6403708C6578B0896bF1d1a91D2BB2AAa1c
    REACT_APP_CONTRACTS_SMART_WALLET=0x987c1f13d417F7E04d852B44badc883E4E9782e1

    REACT_APP_RIF_RELAY_CHAIN_ID=33
    REACT_APP_RIF_RELAY_GAS_PRICE_FACTOR_PERCENT=0
    REACT_APP_RIF_RELAY_LOOKUP_WINDOW_BLOCKS=1e5
    REACT_APP_RIF_RELAY_PREFERRED_RELAYS=http://localhost:8090
<<<<<<< HEAD
    REACT_APP_BLOCK_EXPLORER=https://explorer.testnet.rootstock.io
=======
    REACT_APP_BLOCK_EXPLORER=https://explorer.testnet.rootstock.io/
>>>>>>> main
```

### Ejecutar la dApp

```bash
    # ejecuta la aplicación en el entorno regtest
    ENV_VALUE="regtest" npm run start
```

![Ejecutar la dApp](/img/rif-relay/starter-kit/run-the-dapp.png)

- Conectar el monedero metamask para firmar

Conectar monedero Metamask](/img/rif-relay/starter-kit/connect-metamask-wallet.png)

- Crear un nuevo monedero inteligente

Crear un nuevo monedero inteligente](/img/rif-relay/starter-kit/create-smart-wallet.png)

- Acuñar fichas en el monedero
  - Para comandos a token de menta, Ver paso 6 en la sección Configurar contratos de retransmisión RIF más arriba.
    Mint Tokens](/img/rif-relay/starter-kit/mint-tokens.png)
- Transferencia a diferentes direcciones, utilizando TKN para el pago de las tasas de transferencia, en lugar de RBTC
  ![Transferencia utilizando TKN](/img/rif-relay/starter-kit/transfer-using-tkn.png)
