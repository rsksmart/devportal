---
sidebar_label: Depuración y resolución de problemas
sidebar_position: 106
title: Errores comunes y consejos
description: Conozca algunos de los posibles problemas que puede encontrarse y consejos para resolverlos.
tags:
  - guías
  - desarrolladores
  - contratos inteligentes
  - rsk
  - portainjertos
  - casco
  - dApps
  - éteres
---

Esta sección ofrece ayuda sobre algunos posibles problemas con los que te puedes encontrar y consejos para resolverlos.

## Errores

- Error HH8: Hay uno o más errores en su archivo de configuración
  ```shell
    % npx hardhat compile
    Error HH8: Hay uno o más errores en su archivo de configuración:

    * Invalid account: #0 for network: rskMainnet - Expected string, received undefined
    * Cuenta inválida: #0 for network: rskTestnet - Expected string, received undefined

    Para aprender más sobre la configuración de Hardhat, por favor vaya a https://hardhat.org/config/

    Para más información vaya a https://hardhat.org/HH8 o ejecute Hardhat con --show-stack-traces
  ```
  > - FIX 1: Asegúrese de que los valores de las variables de entorno coinciden con el archivo de configuración de red hardhat `hardhat.config.js`. Para bash, ejecute `source .env` en el directorio raíz para dotenv para habilitar las variables de entorno.
- Error: Nada que compilar
  ```shell
  % npx hardhat compile
  Nada que compilar
  ```
  > - FIX 2: Borre la carpeta de artefactos y ejecute el comando `npx hardhat compile` para generar nuevos artefactos.
- Error:  "GET /MiToken.json" Error (404): "No encontrado"
  - Compruebe que los contratos se han compilado correctamente y que se ha generado la carpeta de artefactos.
  - Comprueba que se han seguido secuencialmente todos los pasos de [interactuar con frontend](/desarrolladores/contratos-inteligentes/hardhat/interactuar-con-frontend/).
- Error: HH601: El script scripts/deploy.js no existe.
  - Asegúrese de que está ejecutando el comando `npx hardhat run --network hardhat scripts/deploy.js` desde el directorio raíz.
