---
sidebar_label: Primeros pasos
sidebar_position: 100
title: Introducción a la API RPC
tags:
  - grifo
  - Portainjerto
  - red de pruebas
  - dirección
  - cartera
  - herramientas
description: Cree, interactúe y despliegue fácilmente contratos inteligentes compatibles con EVM utilizando un sólido conjunto de métodos JSON RPC disponibles a través de la API RPC.
---

La [RPC API](http://rpc.rootstock.io/) proporciona una interfaz web intuitiva y sin fisuras para que los desarrolladores interactúen con los [nodos Rootstock](/node-operators/setup/) a través de los métodos [JSON-RPC](/node-operators/json-rpc/methods/). Su objetivo es abordar los retos a los que se enfrentan los desarrolladores cuando intentan acceder a información crítica como registros, transacciones y balances a través de RPC, lo que puede afectar significativamente al desarrollo oportuno de dApps en la blockchain de Rootstock.

En esta guía aprenderás:

- Cómo crear una cuenta y [realizar su primera llamada a la API](#comienzo)
- Ver una lista de [métodos JSON-RPC](/node-operators/json-rpc/methods/) disponibles.

[Utilizar la API RPC](http://rpc.rootstock.io/)

## ¿A quién va dirigido?

- Desarrolladores de dApp que deseen interactuar con los nodos Rootstock

## Características

\*\*Fácil instalación

- Cree una clave API sin esfuerzo para iniciar el desarrollo.
- Realice la primera llamada a la API en cuestión de minutos.

\*\*Autenticación de clave API

- Proporciona autenticación segura para aplicaciones descentralizadas (dApps).
- Limita las solicitudes de API diaria o mensualmente.

## Primeros pasos

:::info[Note]
La [API RPC](https://rpc.rootstock.io/) está disponible en TESTNET y MAINNET.
:::

Visite la [Rootstock RPC API](https://rpc.rootstock.io/)

<div align="center">
    <img width="50%" src="/img/tools/rpc-api/01-rpc-api-landing.png" alt="RPC API Landing Page"/>
</div>

### Obtener una cuenta GRATUITA

Para crear una cuenta, pulse en _Inscribirse_.

<div align="center">
    <img width="50%" src="/img/tools/rpc-api/02-sign-up.png" alt="RPC API Sign Up"/>
</div>

### Obtener una clave API

Para obtener una clave API:

Acceda al panel de control y haga clic en _Nueva clave API_:

```mdx-code-block
<div align="center">
    <img width="50%" src="/img/tools/rpc-api/03-generate-new-api-key.png" alt="Generate an API key"/>
</div>
```

Elige un nombre para identificar tu `apikey`, y la Red (ya sea `Testnet` o `Mainnet`). También puedes añadir una descripción (opcional). Haz clic en **Crear**.

```mdx-code-block
<div align="center">
    <img width="50%" src="/img/tools/rpc-api/04-create-api-key.png" alt="Create API key"/>
</div>
```

### Realizar la primera llamada a la API

Haz clic en el `apikey` recién creado para obtener los detalles:

```mdx-code-block
<div align="center">
    <img width="50%" src="/img/tools/rpc-api/05-make-first-api-call.png" alt="Make First API Call" />
</div>
```

Puedes hacer tu primera llamada api usando uno de los ejemplos proporcionados, o simplemente añadiendo una url y `apikey` a tu aplicación.

```mdx-code-block
<div align="center">
    <img width="50%" src="/img/tools/rpc-api/06-connect-api.png" alt="Connect API"/>
</div>
```

#### Ejemplo de solicitud

```shell
curl --location --request POST 'https://rpc.testnet.rootstock.io/<your-apikey>' \
--header 'Content-Type: application/json' \
--data ' {
"jsonrpc": "2.0",
"method": "eth_blockNumber",
"params": [],
"id": 0
}'
```

**Respuesta:**

```text
{"jsonrpc":"2.0","id":0,"result":"0x4b7eca"}
```

> El límite diario es de 25.000 peticiones por usuario, y cada usuario puede tener hasta 4 claves API, lo que permite una fácil diferenciación para las distintas aplicaciones que el usuario quiera probar.

## Obtener asistencia

Únete al [Rootstock Discord](https://rootstock.io/discord) para obtener ayuda o dar tu opinión.

## Enlaces útiles

- Métodos [JSON RPC] admitidos (/node-operators/json-rpc/methods/)
- [Guía de inicio rápido con Hardhat](/developers/smart-contracts/hardhat/)
- [Grifo RBTC](https://faucet.rootstock.io/)
