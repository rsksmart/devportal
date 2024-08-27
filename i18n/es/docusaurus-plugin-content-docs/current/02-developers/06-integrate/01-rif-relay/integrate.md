---
sidebar_label: Integraciones
sidebar_position: 200
title: Integración de relés RIF
tags:
  - rif
  - sobre
  - relé
  - guía de integración
description: Integración de RIF Relay en una dApp
---

Esta guía repasa los métodos expuestos de RIF Relay que las dApps y wallets pueden consumir para proporcionar relaying como servicio, con el propósito de permitir a los usuarios pagar tarifas de transacción con tokens en un sistema particular.

## Introducción

Existen múltiples formas de integrar RIF Relay en un sistema. Se detallan a continuación.

Además, es importante tener en cuenta que no _todos_ los componentes del relé RIF son necesarios para una integración satisfactoria, como se explica en la siguiente sección.

## Requisitos

### Contratos inteligentes de relevo RIF

Es necesario desplegarlos y conocer sus direcciones. Para saber cómo hacerlo, consulte la página [Despliegue de contratos](/developers/integrate/rif-relay/deployment/) de esta guía.

### Servidor de retransmisión RIF

El Servidor de Retransmisión RIF es el componente fuera de la cadena encargado de recibir transacciones y enviarlas a los componentes dentro de la cadena, principalmente el Centro de Retransmisión RIF. El RIF Relay Hub gestiona la información sobre los RIF Relay Workers y los RIF Relay Managers, pero también se comunica con el resto de componentes de la cadena: los contratos Smart Wallets, Factory y Verifier.

El RIF Relay Manager posee cuentas de RIF Relay Worker con fondos en moneda nativa. Para retransmitir una transacción, un Worker la firma y la envía al RIF Relay Hub pagando el gas consumido. En el caso de un flujo feliz, las transacciones se retransmitirán en última instancia a través del RIF Relay Hub, utilizando la biblioteca EIP-712.

Para obtener más información al respecto, consulte la [Página de arquitectura](/developers/integrate/rif-relay/).

Los usuarios pueden interactuar con el servidor de retransmisión RIF directa o indirectamente. En este último caso, un usuario puede comunicarse con un servidor de retransmisión RIF a través de un cliente de retransmisión RIF. Un cliente de retransmisión RIF conoce las direcciones de diferentes servidores de retransmisión RIF y puede enviar solicitudes en cadena a cualquiera de ellos. A continuación, el cliente de retransmisión RIF envía la transacción que desea patrocinar al servidor de retransmisión RIF mediante una solicitud HTTP.

En cualquier caso, necesitarás tener el servidor instalado y funcionando. Para ello, consulta las siguientes guías:

1. [Requisitos de instalación del relé RIF](/developers/integrate/rif-relay/installation-requirements/)
2. [RIF Relay Deployment](/developers/integrate/rif-relay/deployment/)

### Cliente de retransmisión RIF

La clase `RelayClient`, de la biblioteca RIF Relay Client, ayuda a crear una solicitud de retransmisión, buscar un servidor disponible y enviar la solicitud a través del protocolo http.

Para crear un `RelayClient` debemos seguir los siguientes pasos:

1. Establece la configuración.
2. Proveedor de set (éteres).
3. Crear instancia.

```typescript
import {
  RelayClient,
  setEnvelopingConfig,
  setProvider,
} from '@rsksmart/rif-relay-client';

  setEnvelopingConfig({
    chainId: <CHAIN_ID>, 
    preferredRelays: <SERVER_URL_ARRAY>,
    relayHubAddress: <RELAY_HUB_ADDRESS>,
    deployVerifierAddress: <DEPLOY_VERIFIER_ADDRESS>,
    relayVerifierAddress: <RELAY_VERIFIER_ADDRESS>,
    smartWalletFactoryAddress: <SMART_WALLET_FACTORY_ADDRESS>
  });

  setProvider(ethersProvider);
  
  const relayClient = new RelayClient();
```

Dónde están las variables:

- **ID_RED**: Identifica una red con la que interactuar.
- **MATRIZ_URL_DEL_SERVIDOR**: Una matriz de cadenas de URL de servidor de retransmisión con las que el RelayClient puede interactuar.
- \*\*DIRECCIÓN DEL CONCENTRADOR DE RETRANSMISIÓN: La dirección del contrato del concentrador de retransmisión.
- \*\*DIRECCIÓN DEL VERIFICADOR DE DESPLIEGUE: La dirección del contrato del verificador de despliegue.
- **DIRECCIÓN_DEL_VERIFICADOR_DE_RELÉ**: La dirección del contrato del verificador de retransmisión.
- **DIRECCIÓN_FÁBRICA_CARTERA_INTELIGENTE**: La dirección del contrato de fábrica del monedero inteligente.

Después de establecer la configuración y el proveedor de éteres, podemos empezar a crear instancias desde el `Relay Client`.

#### Gestor de cuentas

El gestor `Account Manager` es un componente singleton de la biblioteca RIF Relay Client que ayuda a firmar transacciones de retransmisión.  Este componente puede firmar las transacciones con una cuenta interna previamente añadida o utilizando un proveedor de monederos como [metamask](https://metamask.io/). El `Administrador de cuentas` buscará primero las cuentas añadidas manualmente y, si no encuentra ninguna, intentará utilizar el proveedor que se [configuró previamente](#rif-relay-client).

El `Administrador de cuentas` acepta [Carteras Ethers V5](https://docs.ethers.org/v5/api/signer/#Wallet) como cuentas internas.

Para interactuar con el `Administrador de Cuentas` debemos seguir los siguientes pasos:

1. Obtener una instancia.
2. Añade una nueva cuenta.

```typescript
    import {
      AccountManager,
    } from '@rsksmart/rif-relay-client';

    const accountManager = AccountManager.getInstance();

    accountManager.addAccount(<INTERNAL_ACCOUNT_OBJECT>);
```

Dónde están las variables:

- **OBJETO_CUENTA_INTERNA**: [Cartera Ethers V5](https://docs.ethers.org/v5/api/signer/#Wallet) objeto.

### Transacción de retransmisión

Para retransmitir transacciones necesitamos un monedero inteligente ya desplegado, el proceso de despliegue y definición de un monedero inteligente se puede encontrar [Monedero Inteligente](/developers/integrate/rif-relay/smart-wallets).

Los pasos que debemos seguir son:

1. Despliega el monedero inteligente.
2. Cree la transacción que queremos retransmitir.
3. Retransmita la transacción.

```typescript
    const relayTransactionOpts: UserDefinedEnvelopingRequest = {
      request: {
        from: <EOA>,
        data: <DATA_TO_EXECUTE>,
        to: <DESTINATION_ADDRESS>,
        tokenContract: <TOKEN_ADDRESS>,
        tokenAmount: <AMOUNT_OF_TOKENS_IN_WEI>,
      },
      relayData: {
        callForwarder: <SMART_WALLET_ADDRESS>,
      },
    };

    const transaction: Transacción = await relayClient.relayTransaction(
      relayTransactionOpts
);
```

Dónde están las variables:

- **EOA**: Cuenta de propiedad externa, el propietario del monedero inteligente.
- **DATOS_A_EJECUTAR**: La función codificada que queremos retransmitir.
- **DIRECCIÓN_DESTINO**: La dirección del contrato destino que queremos ejecutar.
- **DIRECCIÓN_TOKEN**: La dirección del contrato token que queremos utilizar para pagar la tasa.
- **CANTIDAD_DE_TOKENS_EN_WEI**: La cantidad que queremos pagar por la tasa en wei.
- **DIRECCIÓN_CARTERA_INTELIGENTE**: La dirección del monedero inteligente que va a ejecutar la transacción retransmitida.

### Verificadores de relés

Para obtener las direcciones de los verificadores necesitamos ejecutar el comando:

```
curl http://<SERVER_URL>/verifiers
```

> El comando debe ejecutarse en un terminal diferente, ya que necesita que el servidor esté en ejecución para realizar la solicitud.

```json
  {
    "trustedVerifiers": [
        "0x03f23ae1917722d5a27a2ea0bcc98725a2a2a49a",
        "0x73ec81da0c72dd112e06c09a6ec03b5544d26f05"
    ]
  }
```

### Solicitud de construcción

Para retransmitir transacciones, el Servidor de Retransmisión expone un gestor de envíos HTTP a la siguiente ruta `http://<SERVER_URL>/relay`. El Cliente de Retransmisión proporciona una abstracción para construir y enviar cada transacción a los servidores disponibles; aunque el cliente puede simplificar la interacción con el servidor, siempre es posible enviar peticiones HTTP al servidor sin utilizar el Cliente de Retransmisión.

Cada transacción que se envíe debe tener la siguiente estructura:

```json
    {
      "relayRequest": "<DEPLOY_REQUEST|RELAY_REQUEST>",
      "metadata": "<METADATA>"
    }
```

A continuación describiremos cada campo que se requiere en la solicitud.

#### Solicitud de relé

```json
  {
    "request": {
      "relayHub": "0xDA7Ce79725418F4F6E13Bf5F520C89Cec5f6A974",
      "to": "0x1Af2844A588759D0DE58abD568ADD96BB8B3B6D8",
      "data": "0xa9059cbb00000000000000000000000000000000c60b724c0865e294d64c94fed89c1e90bce0a7fe0000000000000000000000000000000000000000000000000000000000008ac7230489e80000",
      "from": "0x553f430066ea56bd4fa9190218af17bad23dcdb1",
      "value": "0",
      "nonce": "1",
      "tokenAmount": "2803630780191436371",
      "tokenGas": "31643",
      "tokenContract": "0x726ECC75d5D51356AA4d0a5B648790cC345985ED",
      "gas": "31515",
      "validUntilTime": 1676747217,
    },
    "relayData": {
      "gasPrice": "60000000",
      "callVerifier": "0x03F23ae1917722d5A27a2Ea0Bcc98725a2a2a49a",
      "callForwarder": "0x1C8bb3b6809b92F2e38e305FD6bDE9687Bb4ba54",
      "feesReceiver": "0x9C34f2225987b0725A4201F1C6EC1adB35562126"
    }
  }
```

Donde está cada clave de `request`:

- **RelayHub**: La dirección del hub de retransmisión que se utilizará para validar la persona que llama desde la transacción.
- **a**: La dirección del contrato destino que queremos ejecutar.
- **datos**: La función codificada que queremos retransmitir.
- **de**: Cuenta de titularidad externa, el propietario del monedero inteligente.
- **Valor**: El valor de la moneda nativa que se quiere transferir desde smart wallet durante la ejecución.
- **nonce**: Smart Wallet [nonce](https://github.com/rsksmart/rif-relay-contracts/blob/d1b1ee1c429786f967205f32ed015b3f9a1edaaf/contracts/smartwallet/SmartWallet.sol#L18) para evitar ataques de repetición.
- **importe del token**: La cantidad de token que queremos pagar por la cuota en wei.
- **tokenGas**: El límite de gas para la transacción de pago de tokens.
- **ContratoToken**: La dirección del contrato token que queremos utilizar para pagar la tasa.
- **gas**: El límite de gas para la ejecución de la operación de retransmisión.
- **validUntilTime**: Tiempo de expiración de la transacción en segundos.

Donde está cada clave de `relayData`:

- **PrecioGas**: El precio del gas que se utilizará para retransmitir la transacción.
- **Llamada al verificador**: La dirección del verificador del relé para validar la corrección de la transacción.
- **callForwarder**: La dirección del monedero inteligente que va a ejecutar la transacción.
- **Recibidor**: La dirección del trabajador o contrato cobrador que va a recibir las comisiones.

#### Solicitud de despliegue

```json
  {
    "request": {
      "relayHub": "0xDA7Ce79725418F4F6E13Bf5F520C89Cec5f6A974",
      "to": "0x000000000000000000000000000000000000000000000000",
      "data": "0x",
      "from": "0x553f430066EA56BD4fa9190218AF17bAD23dCdb1",
      "value": "0",
      "nonce": "0",
      "tokenAmount": "0",
      "tokenGas": "0",
      "tokenContract": "0x1Af2844A588759D0DE58abD568ADD96BB8B3B6D8",
      "recoverer": "0x0000000000000000000000000000000000000000000000000000",
      "index": "1",
      "validUntilTime": 1676747036,
    },
    "relayData": {
      "gasPrice": "60000000",
      "callVerifier": "0x73ec81da0C72DD112e06c09A6ec03B5544d26F05",
      "callForwarder": "0xE0825f57Dd05Ef62FF731c27222A86E104CC4Cad",
      "feesReceiver": "0x9C34f2225987b0725A4201F1C6EC1adB35562126"
    }
  }
```

Donde está cada clave de `request`:

- **RelayHub**: La dirección del hub de retransmisión que se utilizará para validar la persona que llama desde la transacción.
- **a**: La dirección del contrato destino que queremos ejecutar (`0x000000000000000000000000000000000000000000000000` para el despliegue de Cartera Inteligente).
- **Datos**: La función codificada que queremos retransmitir (`0x` para el despliegue de Smart Wallet).
- **de**: Cuenta de titularidad externa, el propietario del monedero inteligente.
- **Valor**: El valor de la moneda nativa que se quiere transferir desde smart wallet durante la ejecución.
- **nonces**: SmartWalletFactory mantiene un registro de los [nonces](https://github.com/rsksmart/rif-relay-contracts/blob/d1b1ee1c429786f967205f32ed015b3f9a1edaaf/contracts/factory/SmartWalletFactory.sol#L95) utilizados por cada propietario de cartera inteligente, para evitar ataques de repetición. Se puede recuperar con [`IWalletFactory.nonce(from)`](https://github.com/rsksmart/rif-relay-contracts/blob/d1b1ee1c429786f967205f32ed015b3f9a1edaaf/contracts/interfaces/IWalletFactory.sol#L8)
- **importe de la ficha**: El importe que queremos pagar por la cuota en wei.
- **tokenGas**: El límite de gas para la transacción de pago de tokens.
- **ContratoToken**: La dirección del contrato token que queremos utilizar para pagar la tasa.
- **Recuperador**: La dirección del recuperador, para recuperar fondos del monedero inteligente. Esta funcionalidad está pendiente de implementar.
- **Índice**: El índice del monedero inteligente que queremos desplegar.
- **validUntilTime**: Tiempo de expiración de la transacción en segundos.

Donde está cada clave de `relayData`:

- **PrecioGas**: El precio del gas que se utilizará para retransmitir la transacción.
- **Llamada al verificador**: La dirección del verificador de despliegue para validar la corrección de la transacción.
- **callForwarder**: La dirección de fábrica del monedero inteligente que va a realizar el despliegue.
- **receptorDeCuotas**: La dirección del contrato de trabajador o cobrador que va a recibir las comisiones.

#### Metadatos

```json
  {
    "relayHubAddress": "0xDA7Ce79725418F4F6E13Bf5F520C89Cec5f6A974",
    "signature": "0xa9f579cf964c03ac194f577b5fca5271ba13e2965c...",
    "relayMaxNonce": 4
}
```

Dónde está cada llave:

- **Dirección del centro de retransmisión**: El hub de retransmisión que utilizará el servidor para retransmitir la transacción.
- **Firma**: La transacción de retransmisión firmada por el propietario. Después de firmar la transacción, no se puede cambiar, ya que hay una validación en la cadena que forma parte de la EIP712.
- **RelayMaxNonce**: Relay worker nonce más un gap extra.

### Función personalizada de reposición de trabajadores

Cada transacción retransmitida es firmada por una cuenta de trabajador de retransmisión. Las cuentas de los trabajadores están controladas por el Gestor de Retransmisiones. Cuando un trabajador de retransmisión firma y retransmite una transacción, el coste de esa transacción se paga utilizando los fondos de la cuenta de ese trabajador. Si la transacción no está subvencionada, el trabajador es compensado con fichas.

Las cuentas de los trabajadores deben tener siempre un saldo mínimo para pagar la gasolina de la transacción. Estos saldos pueden gestionarse implementando una estrategia de reposición. El Gestor de Retransmisiones puede utilizar la estrategia para recargar la cuenta de un trabajador de retransmisión cuando el saldo sea demasiado bajo.

Proporcionamos una implementación por defecto para una estrategia de reabastecimiento. Los integradores de soluciones de RIF Relay pueden implementar su propia estrategia de reposición.

Para aplicar y utilizar su propia estrategia de reposición:

1. En la carpeta `src` del proyecto RIF Relay Server, abre `ReplenishFunction.ts` con un editor de texto.
2. En la función `replenishStrategy` escribe tu nueva estrategia de reposición.
3. Reconstruir el proyecto `npm run build`
4. Cambie el archivo JSON de configuración para establecer `customReplenish` en true.
