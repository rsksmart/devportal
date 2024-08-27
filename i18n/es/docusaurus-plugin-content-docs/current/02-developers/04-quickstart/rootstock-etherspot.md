---
sidebar_label: Abstracción de cuentas
sidebar_position: 500
title: Abstracción de cuenta usando Etherspot Prime SDK
description: En esta guía, aprenderás a utilizar el SDK de Etherspot Prime para desplegar una dApp de Abstracción de Cuenta en la red Rootstock. Siguiendo estos pasos, permitirás a tus usuarios interactuar con tu dApp sin gestionar claves privadas directamente.
tags:
  - rsk
  - portainjertos
  - desarrolladores
  - inicios rápidos
  - etherspot
  - dApps
  - abstracción de cuentas
---

En esta guía, aprenderás a utilizar el SDK de Etherspot Prime para desplegar una dApp de Abstracción de Cuenta en la red Rootstock.
Siguiendo estos pasos, permitirás a tus usuarios interactuar con tu dApp sin gestionar claves privadas directamente.

## Requisitos previos

- Asegúrese de que git está instalado
- Conocimientos básicos de React y JavaScript
- Node.js y npm (o yarn) instalados en su máquina
- Un editor de código de su elección (por ejemplo, Visual Studio Code)
- Familiaridad con el [Wagmi starter kit](https://github.com/rsksmart/rsk-wagmi-starter-kit/tree/aa-sdk)

:::info[Info]
_Esta guía asume que ya tienes un [Wagmi starter kit](https://github.com/rsksmart/rsk-wagmi-starter-kit/tree/aa-sdk) configurado._
:::

## Comprender la abstracción de cuentas

La abstracción consiste en ocultar datos innecesarios sobre un "objeto" para simplificar el sistema y mejorar la eficiencia. Aplicada a la tecnología blockchain de Ethereum, la abstracción de cuentas pretende crear un único tipo de cuenta que incluya solo los aspectos relevantes.

Existen dos tipos principales de cuentas de Ethereum: Cuentas de Usuario (EOA) y Contratos. Las cuentas de usuario están diseñadas para particulares y se controlan mediante claves privadas. Estas cuentas, también conocidas como cuentas de propiedad externa (EOA), pueden mantener un saldo en Ether y realizar transacciones con otras EOA utilizando Ether y otros tokens respaldados por el ERC.

Por otro lado, los Contratos están controlados por código y pueden realizar diversas funciones, como interactuar con cuentas externas e iniciar actividades como el intercambio de tokens o la creación de nuevos contratos.

Con la abstracción de cuentas, una sola cuenta puede contener tanto código como Ether, lo que le permite ejecutar transacciones y funciones de contratos inteligentes. Esto elimina la necesidad de un EOA separado para gestionar las transacciones, permitiendo que los contratos manejen los fondos directamente.

Etherspot Prime, un SDK de código abierto, simplifica la implementación de la Abstracción de Cuenta para desarrolladores de dApps. Usando un monedero inteligente Etherspot, los usuarios pueden disfrutar de una experiencia web2 a través de logins sociales o transacciones por lotes.

## Primeros pasos

Para explorar Account Abstraction con Etherspot, sigue estos pasos:

### Utilizar una rama diferente:

1. Clona el repositorio del kit de inicio de Wagmi:

```sh
git clone https://github.com/wagmi-dev/wagmi-starter-kit.git
```

2. Navegue hasta el directorio del proyecto:

```javascript
cd wagmi-starter-kit
```

3. En lugar de utilizar la rama principal, cambie a la rama que contiene las funcionalidades de Abstracción de Cuentas:

```javascript
git checkout aa-sdk  
```

4. Ejecuta el proyecto:
   Ahora que has clonado el repositorio e instalado las dependencias, es el momento de ejecutar el proyecto. Ejecuta el siguiente comando:

```javascript
desarrollo del hilo
```

Esto iniciará su dApp Rootstock Wagmi localmente, permitiéndole desarrollar y probar sus contratos inteligentes. Puede acceder al servidor Vite en `http://localhost:5173.`

## Interactuar con la abstracción Cuenta

<img src="/img/resources/rootstock-metamask/accountabstraction.png"  width="800" height="600"/>

1. **Generar una cuenta aleatoria:**

- Haga clic en el botón "Generar" para crear una cuenta aleatoria.

2. **Generar una dirección de pago:**

- Pulse el botón "Generar" para obtener una dirección de pago.

3. **Comprobar saldo de cuenta:**

- Al hacer clic en Obtener saldo se mostrará el saldo de la dirección de pago.

4. **Estimar y enviar una transacción:**

- Esta sección tiene dos campos:
  - **Dirección del destinatario:** En este campo se especifica la dirección Ethereum del destinatario. Es la dirección a la que desea enviar la transacción. Piense en ella como el destino de sus fondos. Asegúrese de introducir aquí una dirección Ethereum válida.

  - **Valor (en Eth):** En este campo, usted indica la cantidad de Ether (ETH) que desea enviar en la transacción. Introduzca el valor que desea transferir. Por ejemplo, si desea enviar 0,5 ETH, introduzca "0,5" en este campo.

  - Pulse el botón "Estimar y enviar" para iniciar la transacción.

## Comprender el código base

Este código define un componente React llamado Demo, que proporciona una interfaz de usuario para interactuar con las funcionalidades de blockchain a través del SDK de Etherspot.

El componente permite a los usuarios generar una cuenta de propiedad externa (EOA) aleatoria, generar un monedero Etherspot, comprobar el saldo del monedero Etherspot, y estimar y enviar transacciones utilizando el Arka Paymaster.

El componente gestiona varios estados e interacciones, lo que facilita la gestión de carteras y la realización de transacciones de blockchain sin tener que tratar directamente con claves privadas.

1. **generateRandomEOA**

- Esta función genera una cuenta de propiedad externa (EOA) aleatoria.

- **Función:**

Esto genera de forma asíncrona una clave privada y deriva una dirección de cuenta a partir de ella, estableciendo las variables de estado de la dirección del monedero EOA y la clave privada.

2. **getBalance**

- Esta función obtiene el saldo del monedero Etherspot actual.

- **Función:**
  Esto utiliza de forma asíncrona el SDK para recuperar el saldo nativo de la cuenta y actualiza la variable de estado de saldo.

3. **generateEtherspotWallet**

- Esta función genera una dirección contrafactual para el monedero Etherspot.

- **Función:**
  Esto interactúa de forma asíncrona con el SDK para generar una dirección de cartera Etherspot y obtiene su saldo.

4. \*\*Estimación y transferencia.

- Esta función calcula el coste de la transacción y envía un valor especificado a un destinatario utilizando el Arka Paymaster.

- **Función:**
  Valida la dirección del destinatario y las entradas de valor.
  Utiliza el SDK para configurar la transacción, estimar el coste del gas, enviar la transacción, y espera el recibo de la transacción.

5. **useEffect Hook**

- Este hook inicializa el SDK Prime cuando se establece la clave privada EOA.

\*\*Parámetros

**eoaPrivateKey:** La clave privada de la cuenta de propiedad externa (EOA).

- **Función:**

**useEffect:**
Configura la instancia de Prime SDK con la eoaPrivateKey.
Configura el SDK con el proveedor de bundler especificado.

## Recursos

- [Kit de iniciación a la abstracción de cuentas del patrón](https://github.com/wagmi-dev/wagmi-starter-kit.git)
- [Uso de ejemplos del SDK de Prime](https://etherspot.fyi/prime-sdk/examples/intro)
- [Etherspot Prime SDK Repo](https://github.com/etherspot/etherspot-prime-sdk/)
