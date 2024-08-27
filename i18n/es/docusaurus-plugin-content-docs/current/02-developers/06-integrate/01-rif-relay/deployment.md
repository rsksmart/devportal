---
sidebar_label: Despliegue del repetidor RIF
sidebar_position: 500
title: Despliegue del repetidor RIF
tags:
  - rif
  - sobre
  - relé
  - guía de integración
description: Proceso de despliegue del relé RIF
---

## Configurar los contratos de retransmisión RIF y el servidor

### Despliegue de contratos

Empiece por desplegar componentes en la cadena. Todas las herramientas necesarias se encuentran en el [repositorio de contratos de retransmisión RIF](https://github.com/rsksmart/rif-relay-contracts)

#### Regtest

1. Clonar el repositorio:

```bash
  git clone https://github.com/rsksmart/rif-relay-contracts
```

2. Navegue hasta el directorio e instale las dependencias:

```bash
  cd rif-relay-contracts
  npm install
```

3. Despliega el contrato:

```bash
  npx hardhat deploy --network regtest
```

> Esto utiliza la configuración Regtest de `hardhat.config.ts`.

Tras el despliegue, verá un resumen de los contratos desplegados. Este resumen incluye los componentes en cadena esenciales para RIF Relay, y contratos adicionales con fines de prueba y validación.````texto
      ┌───────────────────────────────────────┬──────────────────────────────────────────────┐
      │ (índice) │ Valores │
      ├───────────────────────────────────────┼──────────────────────────────────────────────┤
      │ Penalizador │ '0x77045E71a7A2c50903d88e564cD72fab11e82051' │
      │ RelayHub │ '0xDA7Ce79725418F4F6E13Bf5F520C89Cec5f6A974' │
      │ SmartWallet │ '0x83C5541A6c8D2dBAD642f385d8d06Ca9B6C731ee' │
      │       SmartWalletFactory │ '0xE0825f57Dd05Ef62FF731c27222A86E104CC4Cad' │
      │ DeployVerifier │ '0x73ec81da0C72DD112e06c09A6ec03B5544d26F05' │
      │ RelayVerifier │ '0x03F23ae1917722d5A27a2Ea0Bcc98725a2a2a49a' │
      │ CustomSmartWallet              │ '0x1eD614cd3443EFd9c70F04b6d777aed947A4b0c4' │
      │ CustomSmartWalletFactory │ '0x5159345aaB821172e795d56274D0f5FDFdC6aBD9' │
      │ CustomSmartWalletDeployVerifier │ '0x7557fcE0BbFAe81a9508FF469D481f2c72a8B5f3' │
      │ CustomSmartWalletRelayVerifier │ '0x0e19674ebc2c2B6Df3e7a1417c49b50235c61924' │
      │ NativeHolderSmartWallet │ '0x4aC9422c7720eF71Cb219B006aB363Ab54BB4183' │
      │    NativeHolderSmartWalletFactory │ '0xBaDb31cAf5B95edd785446B76219b60fB1f07233' │
      │ NativeHolderSmartWalletDeployVerifier │ '0xAe59e767768c6c25d64619Ee1c498Fd7D83e3c24' │
      │ NativeHolderSmartWalletRelayVerifier │ '0x5897E84216220663F306676458Afc7bf2A6A3C52' │
      │ UtilToken                  │ '0x1Af2844A588759D0DE58abD568ADD96BB8B3B6D8' │
      │ VersionRegistry │ '0x8901a2Bbf639bFD21A97004BA4D7aE2BD00B8DA8' │
      └───────────────────────────────────────┴──────────────────────────────────────────────┘
      ```
El resumen de despliegue muestra dos conjuntos de Carteras Inteligentes, cada uno emparejado con sus verificadores. Esto se debe a que el verificador se utiliza tanto para el despliegue como para la validación de transacciones. Para las pruebas, nos centraremos en el uso de estos Contratos de Cartera Inteligente.
````

#### Testnet

1. Asegúrate de que tu cuenta tiene fondos. Puede obtener fondos de [tRBTC Faucet](https://faucet.rootstock.io/).
2. Despliegue en Testnet:
   ```bash
     npx hardhat deploy --network testnet
   ```

> Recuerde configurar Testnet en `hardhat.config.ts`. Los contratos existentes de RIF Relay desplegados en Testnet se pueden encontrar en la sección [contracts](/developers/integrate/rif-relay/contracts).

#### Mainnet

1. Asegúrese de que su cuenta tiene fondos.
2. Despliegue en Mainnet:
   ```bash
     npx hardhat deploy --network mainnet
   ```

> Asegúrese de que Mainnet está configurado en `hardhat.config.ts`. Los contratos existentes de RIF Relay desplegados en Mainnet se pueden encontrar en la [sección de contratos](/developers/integrate/rif-relay/contracts).

### Reparto de ingresos

La distribución de ingresos es una función opcional de RIF Relay que puede implementarse mediante contratos de recopilador. Puede implementar varios contratos de recopilador, pero no se incluyen en la implementación predeterminada de contratos de Relay. Para obtener información detallada sobre los contratos de recopilador, consulte la [documentación de arquitectura](/developers/integrate/rif-relay/architecture#collector).

Antes de desplegar un contrato de recopilador, asegúrese de lo siguiente:

1. Asegúrese de que el token elegido para el contrato de recaudación es el mismo que el utilizado para las comisiones de transacción.
   > **Nota:** No puede recuperar otros tokens que no sean los establecidos durante la implementación del recopilador.
2. Seleccione un propietario adecuado para el contrato de recaudación. Este propietario no tiene por qué ser el implementador, pero debe tener autoridad para ejecutar la función de retirada, o de lo contrario los fondos de ingresos quedarán bloqueados en el contrato.
3. Configure los socios y sus porcentajes de participación, asegurándose de que el total sume 100%. Los tokens enviados incorrectamente a una dirección inaccesible sin una clave privada del beneficiario se perderán. Para ver un ejemplo de definición de participaciones en ingresos estructuralmente válida, consulte [configuración de ejemplo](https://github.com/rsksmart/rif-relay-contracts/blob/master/deploy-collector.input.sample.json).

#### Regtest

Para desplegar el contrato del colector, utilizaremos el [Contrato de retransmisión RIF](https://github.com/rsksmart/).

1. Cree un archivo de configuración llamado `deploy-collector.input.json` con la estructura requerida:
   ````json
       {
         "colectorPropietario": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
         "partners": [
             {
               "beneficiario": "0x7986b3DF570230288501EEa3D890bd66948C9B79",
               "cuota": 20
             },
             {
               "beneficiario": "0x0a3aA774752ec2042c46548456c094A76C7F3a79",
               "share": 35
             },
             {
               "beneficiario": "0xCF7CDBb5F7BA79d3ffe74A0bBA13FC0295F6036",
               "share": 13
             },
             {
               "beneficiario": "0x39B12C05E8503356E3a7DF0B7B33efA4c054C409",
               "share": 32
             }
         ],
         "tokenAddresses": ["0x1Af2844A588759D0DE58abD568ADD96BB8B3B6D8"],
         "remainderAddress": "0xc354D97642FAa06781b76Ffb6786f72cd7746C97"
       }
     ```

   ````

> **Nota:** Las cuentas `collectorOwner`, `beneficiaries` y `remainderAddress` son las cinco primeras cuentas proporcionadas por el nodo en Regtest.

2. Despliega el contrato:
   ```bash
     npx hardhat collector:deploy --network regtest
   ```

El cobrador está listo y puede empezar a recibir comisiones.

#### Testnet

Utilizando el archivo de configuración que creó en la sección regtest, ejecute este comando para desplegar el contrato:

```js
  npx hardhat collector:deploy --network testnet
```

#### Mainnet

Utilizando el archivo de configuración que creó en la sección regtest, ejecute este comando para desplegar el contrato:

```js
  npx hardhat collector:deploy --network mainnet
```

### Permitir fichas

RIF Relay sólo acepta tokens de la lista blanca, principalmente para garantizar que sólo se aceptan tokens de valor para el operador. Para incluir un token en la lista blanca
Ejecute la función `acceptToken(address token)` en los contratos de los verificadores de Relay, que incluyen:

- `SmartWalletDeployVerifier`
- `SmartWalletRelayVerifier`

:::info[Note]
Esta acción debe ser realizada por el propietario de los contratos, normalmente la cuenta que realizó el despliegue.
:::

#### Regtest

En los Contratos de Relé RIF, ejecute este comando:

```js
  npx hardhat allow-tokens --network regtest --token-list <TOKEN_ADDRESSES>
```

> `<TOKEN_ADDRESSES>` es una lista separada por comas de las direcciones de los tokens que se permitirán en los verificadores disponibles. El `allowTokens` utiliza la primera cuenta (referida como account[0]) como propietaria de los contratos. Esto es importante porque sólo el propietario de la cuenta puede permitir tokens.

#### Testnet

En los Contratos de relevo RIF, ejecute el comando:

```js
  npx hardhat allow-tokens --network testnet --token-list <TOKEN_ADDRESSES>
```

> \<TOKEN_ADDRESSES> es una lista separada por comas de las direcciones de tokens que se permitirán en los verificadores disponibles. El script `allowTokens` utilizará la red Testnet configurada en el `hardhat.config.ts`, esta red deberá utilizar la cuenta que desplegó los contratos.
> También puedes modificar los tokens permitidos para verificadores específicos usando la opción `--verifier-list` de la siguiente manera:

```js
  npx hardhat allow-tokens --network testnet --token-list <TOKEN_ADDRESSES> --verifier-list <VERIFIER_ADRESSES>
```

> El `<TOKEN_ADDRESSES>`, `<VERIFIER_ADDRESSES>` es una lista separada por comas de direcciones de verificadores para permitir los tokens.

#### Mainnet

En los Contratos de relevo RIF, ejecute el comando:

```js
  npx hardhat allow-tokens --network mainnet --token-list <TOKEN_ADDRESSES>
```

> \<TOKEN_ADDRESSES> es una lista separada por comas de las direcciones de tokens que se permitirán en los verificadores disponibles. El script `allowTokens` utilizará la red Mainnet configurada en `hardhat.config.ts`, esta red deberá utilizar la cuenta que realizó el despliegue de los contratos.
> También puedes modificar los tokens permitidos sólo para verificadores específicos usando la opción `--verifier-list` de la siguiente manera:

```js
  npx hardhat allow-tokens --network testnet --token-list <TOKEN_ADDRESSES> --verifier-list <VERIFIER_ADRESSES>
```

> El `<TOKEN_ADDRESSES>`, `<VERIFIER_ADDRESSES>` es una lista separada por comas de direcciones de verificadores para permitir los tokens.

:::info[Note]
El nombre de la red; regtest, testnet, o mainnet, es un parámetro opcional que se toma del archivo hardhat.config.ts. El nombre de red que especifiques debe ser el mismo que el utilizado para desplegar el contrato.
:::

### Ejecutar el servidor de retransmisión RIF

Tras configurar los componentes dentro de la cadena, el siguiente paso es configurar los componentes fuera de la cadena, utilizando el [RIF Relay Server](https://github.com/rsksmart/rif-relay-server).
La configuración del Servidor de Retransmisión se simplifica utilizando el paquete [node-config](https://www.npmjs.com/package/config). Para conocer las ventajas detalladas de este paquete, visita su [wiki](https://github.com/node-config/node-config/wiki).

<b>El TL;DR:</b> En el directorio `config`, cree un archivo llamado `local.json`.
Para obtener información visual sobre cómo funciona el Servidor de Retransmisión, consulte los diagramas disponibles [aquí](/developers/integrate/rif-relay/architecture/).

#### Regtest

A continuación se muestra un ejemplo de configuración para configurar el nodo RSKj localmente con los contratos desplegados en Regtest:

```json
{
    "app": {
      "url": "http://127.0.0.1",
      "port": 8090,
      "devMode": true,
      "logLevel": 1,
      "workdir": "./enveloping/environment/",
  },
    "blockchain": {
      "rskNodeUrl": "http://127.0.0.1:4444",
    },
    "contracts": {
      "relayHubAddress": "0xDA7Ce79725418F4F6E13Bf5F520C89Cec5f6A974",
      "relayVerifierAddress": "0x03F23ae1917722d5A27a2Ea0Bcc98725a2a2a49a",
      "deployVerifierAddress": "0x73ec81da0C72DD112e06c09A6ec03B5544d26F05"
    }
}
```

> **Nota:** Los verificadores de retransmisión y despliegue utilizan los contratos de la sección Cartera inteligente del resumen.

El significado de cada clave puede consultarse en [Configuración del servidor de retransmisión RIF](https://github.com/rsksmart/rif-relay-server#server-configuration)

Para iniciar el servidor, ejecute el siguiente comando:

```js
  npm run start
```

> Por defecto, el servidor utiliza el fichero `default.json5` del directorio config. Dependiendo del perfil en `NODE_ENV`, los valores en el archivo `default.json5` se anulan.

En este punto el servidor debería estar funcionando y listo para empezar a procesar transacciones, sin embargo, todavía necesitas registrar los componentes fuera de la cadena en el Relay Hub.

Para habilitar el servidor para el procesamiento de transacciones, debe registrar los componentes fuera de la cadena en el Centro de retransmisión. Este paso requiere que el servidor esté activo. Para registrar los componentes, en una ventana de terminal diferente, ejecute el siguiente comando:

```js
  npm ejecutar registro
```

El proceso de registro realiza las siguientes acciones:

- Estaca el gestor de relevo
- Añade el Relay Worker
- Registra el Servidor de Retransmisión

El servidor ya está listo para empezar a procesar transacciones y se muestra un mensaje de "listo" en la consola. Para más detalles sobre los parámetros de configuración y registro, consulte la [Documentación del servidor de retransmisión RIF](https://github.com/rsksmart/rif-relay-server#overrides).

#### Testnet

A continuación se muestra un archivo de configuración de ejemplo que utiliza los componentes fuera de cadena desplegados en la red de pruebas Rootstock (https://rpc.testnet.rootstock.io/{YOUR_APIKEY}).

> **Importante:** Debido a módulos específicos habilitados en los nodos RSKj, el Servidor de Retransmisión RIF no puede conectarse a los nodos públicos.

```json
  {
    "app": {
    "url": "https://backend.dev.relay.rifcomputing.net",
    "port": 8090,
    "devMode": true,
    "logLevel": 1,
    "feePercentage": "0",
    "workdir": "/srv/app/environment"
    },
    "blockchain": {
      "rskNodeUrl": "http://172.17.0.1:4444"
    },
    "contracts": {
      "relayHubAddress": "0xAd525463961399793f8716b0D85133ff7503a7C2",
      "relayVerifierAddress": "0xB86c972Ff212838C4c396199B27a0DBe45560df8",
      "deployVerifierAddress": "0xc67f193Bb1D64F13FD49E2da6586a2F417e56b16"
    }
  }
```

> Los [contratos](/developers/integrate/rif-relay/contracts/) utilizados en esta configuración son los contratos primarios disponibles en la red Rootstock. Estos contratos primarios, sin embargo, no incluyen soporte para la `CustomSmartWallet`.

Para obtener información detallada sobre cada clave de configuración utilizada para configurar el servidor de retransmisión RIF, consulte la documentación [Configuración del servidor de retransmisión RIF](https://github.com/rsksmart/rif-relay-server#server-configuration).

Para iniciar el servidor, ejecute el siguiente comando:

```js
  npm run start
```

> Por defecto, el servidor utiliza el fichero `default.json5` del directorio config. Dependiendo del perfil en `NODE_ENV`, los valores en el archivo `default.json5` son anulados. Por lo tanto, es necesario configurar el entorno `NODE_ENV` a `testnet`.

En este punto, el servidor debería estar funcionando y listo para empezar a procesar transacciones; sin embargo, aún necesitas registrar los componentes fuera de la cadena en el Relay Hub. Para el proceso de registro, el Relay Manager y el Worker deben tener fondos.

Para obtener las direcciones, es necesario que el servidor esté activo. En una ventana de terminal diferente, ejecute el siguiente comando:

```bash
  curl http://<SERVER_URL>/cadena-info
```

```json
{
  "relayWorkerAddress": "0xabf898bd73b746298462915ca91623f5630f2462",
  "relayManagerAddress": "0xa71d65cbe28689e9358407f87e0b4481161c7e57",
  "relayHubAddress": "0xe90592939fE8bb6017A8a533264a5894B41aF7d5",
  "feesReceiver": "0x52D107bB12d83EbCBFb4A6Ad0ec866Bb69FdB5Db",
  "minGasPrice": "6000000000",
  "chainId": "31",
  "networkId": "31",
  "ready": false,
  "version": "2.0.1"
}
```

1. Envía una cantidad arbitraria de tRBTC, 0,001 tRBTC por ejemplo, al Trabajador y al Gestor.
2. Ahora ejecuta el comando de registro.

```js
  npm ejecutar registro
```

He aquí un ejemplo de `register.json5`.

```json
  {
    "registro": {
    "stake": "REGISTER_STAKE",
    "funds": "REGISTER_FUNDS",
    "mnemonic": "REGISTER_MNEMONIC",
    "privateKey": "REGISTER_PRIVATE_KEY",
    "hub": "REGISTER_HUB_ADDRESS",
    "gasPrice": "REGISTER_GAS_PRICE",
    "relayUrl": "REGISTER_RELAY_URL",
    "unstakeDelay": "REGISTER_UNSTAKE_DELAY"
    }
  }
```

El proceso de registro realiza las siguientes acciones:

- Estaca el gestor de relevo
- Añade el Relay Worker
- Registra el Servidor de Retransmisión

El servidor ya está listo para empezar a procesar transacciones y se muestra un mensaje de listo en la consola. Para más detalles sobre la configuración y los parámetros de registro, consulte la [Documentación del servidor de retransmisión RIF](https://github.com/rsksmart/rif-relay-server#overrides).

#### Mainnet

- Para ejecutar el servidor de retransmisión de RIF en la red principal de Rootstock, el procedimiento es el mismo que en la red de prueba, la única diferencia es la configuración. Configúrelo para utilizar contratos desplegados en Mainnet y un nodo RSKj conectado a Mainnet.
