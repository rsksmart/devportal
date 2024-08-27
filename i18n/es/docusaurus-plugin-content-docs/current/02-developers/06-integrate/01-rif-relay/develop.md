---
sidebar_label: Desarrollar
sidebar_position: 600
title: RIF Relé Desarrollar
tags:
  - rif
  - sobre
  - relé
  - usuario
  - guía
description: Proceso de despliegue del relé RIF
---

## Inicializar el proyecto

Para utilizar RIF Relay, siga estos pasos para construir el proyecto.

## Estructura del proyecto

El proyecto está dividido en varios módulos que interactúan entre sí.
Cada proyecto tiene su propia documentación en su repositorio.

1. [Contratos de relevo RIF](https://github.com/rsksmart/rif-relay-contracts)
2. [Cliente de retransmisión RIF](https://github.com/rsksmart/rif-relay-client)
3. [Servidor de retransmisión RIF](https://github.com/rsksmart/rif-relay-server)
4. [RIF Relay Sample dApp](https://github.com/rsksmart/rif-relay-sample-dapp)

## Comprometiendo cambios

Para contribuir al proyecto, crea una rama con el nombre de la nueva funcionalidad que estás implementando (por ejemplo, `gas-optimization`). Cuando envías un commit a git, se ejecuta un hook. El gancho ejecuta un linter y todas las pruebas.
