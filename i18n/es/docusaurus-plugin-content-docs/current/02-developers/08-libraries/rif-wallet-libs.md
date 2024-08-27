---
title: Bibliotecas monedero RIF
tags:
  - monedero rif
  - rif
  - portainjertos
  - cartera
  - bibliotecas
sidebar_label: Bibliotecas monedero RIF
sidebar_position: 200
description: RIF Wallet es un monedero de contratos inteligentes de código abierto que permite a las empresas crear y desplegar monederos en cadena totalmente personalizables.
---

Las Bibliotecas RIF Wallet contienen un conjunto de paquetes utilizados por RIF Wallet. Puede instalar las Bibliotecas RIF Wallet directamente desde dentro de la aplicación. Para obtener más información, visite [RIF Wallet Lib Repo](https://github.com/rsksmart/rif-wallet-libs?tab=readme-ov-file#packages).

## Paquetes

### Núcleo de la cartera RIF

El [RIF Wallet Core](https://www.npmjs.com/package/@rsksmart/rif-wallet-core) es la librería wallet que conecta la UI con el RIF Relay SDK. Esta clase acepta un Ethers Signer que maneja la mayoría de los métodos criptográficos, como crear una Cartera, firmar tx o mensaje, estimar gas, enviar transacciones y desplegar las carteras inteligentes.

La función `onRequest` es donde la UX maneja la transacción o interacción. Se envía una transacción a RIFWallet y se pasa al método onRequest. En este punto, la UX puede pedir al usuario que haga clic en "aceptar" o "negar". Esto significa que el monedero puede ser inyectado en WalletConnect, e injectedBrowser o utilizado a través de la UX y cuando llega una transacción, siempre pedirá al usuario que acepte o rechace la acción.

Consulte el [README](https://www.npmjs.com/package/@rsksmart/rif-wallet-core) para obtener más información.

### Cartera RIF Potenciador ABI

El paquete [ABI Enhancer](https://www.npmjs.com/package/@rsksmart/rif-wallet-abi-enhancer) intenta decodificar una transacción a un formato legible por humanos. Existen diferentes estrategias de descodificación:

- Transacción rBTC - donde los datos son 0x y la transacción es el envío de gas de una cuenta a otra.
- Transacción ERC20 (y variantes) - envío de un token de un usuario a otro. En este caso, el destinatario y el importe se encuentran en el campo de datos.
- Otra transacción - Una interacción de llamada de contrato. En este caso, consulta la lista pública disponible de tipos de métodos conocidos e intenta descodificarla. En este caso, los detalles de la transacción no se transforman.

Consulte más información en [README](https://www.npmjs.com/package/@rsksmart/rif-wallet-abi-enhancer).

### Sistema de gestión de claves

La biblioteca [RIF Wallet Key Management System](https://www.npmjs.com/package/@rsksmart/rif-wallet-kms).

### Biblioteca Bitcoin

RIF Wallet [Bitcoin Library](https://www.npmjs.com/package/@rsksmart/rif-wallet-bitcoin) es una librería para manejar la recepción y envío de bitcoin en React Native.
Ver Configuración básica y Cómo usar en el [RIF Wallet Bitcoin README](https://www.npmjs.com/package/@rsksmart/rif-wallet-bitcoin).

### SDK de cliente de retransmisión RIF

Este `rif-relay-light-sdk` es una [implementación ligera](https://www.npmjs.com/package/@rsksmart/rif-relay-light-sdk) del cliente RIF Relay SDK construido usando éteres y utilizado en RIF Wallet.

Consulte Configuración básica, cómo desplegar el monedero inteligente y cómo estimar y retransmitir una transacción en el [README](https://www.npmjs.com/package/@rsksmart/rif-relay-light-sdk).

### Ficha de cartera RIF

El paquete [RIF Wallet Token](https://www.npmjs.com/package/@rsksmart/rif-wallet-token) contiene clases simples para activos/tokens ERC20, ERC677 y rBTC. Incluye la ABI para ERC20 y ERC677.

### Cartera RIF EIP681

El [RIF Wallet EIP681](https://npmjs.com/package/@rsksmart/rif-wallet-eip681) es una implementación básica e incompleta de [EIP681, Formato URL para solicitudes de transacciones](https://npmjs.com/package/@rsksmart/rif-wallet-eip681).

Consulte el [README](https://npmjs.com/package/@rsksmart/rif-wallet-eip681) para obtener más información.

### Servicios de monedero RIF

Esta librería [RIF Wallet Services](https://www.npmjs.com/package/@rsksmart/rif-wallet-services) es responsable de mapear todos los endpoints disponibles y realizar la conexión socket en rif-wallet-services (backend).
