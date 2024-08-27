---
sidebar_label: Configurar
sidebar_position: 300
title: Requisitos de instalación del relé RIF
tags:
  - rif
  - sobre
  - relé
  - usuario
  - guía
description: Requisitos para instalar el relé RIF
---

Para configurar el sistema RIF Relay funcionando localmente se necesitan algunas herramientas. Todas estas herramientas son de código abierto y tienen su propia página de soporte. La funcionalidad de RIF Relay no depende de estas tecnologías y podría actualizarse o sustituirse, si fuera necesario.

## Requisitos de hardware

```
- **Un ordenador con arquitectura x86_64 o Apple Silicon Mac:** Se requiere un Mac o PC con arquitectura Intel x64 o chip Apple M1 (o modelos posteriores).
```

## Requisitos de software

````
- macOS, Windows o Linux:** Para macOS, necesitarás una versión reciente compatible con Apple Silicon (arquitectura ARM) y la traducción Rosetta 2 para ejecutar aplicaciones x86_64.
Del mismo modo, para Windows o Linux, funcionará cualquier distribución reciente que se adapte a tus preferencias o requisitos.
- **Rosetta 2:** Esta capa de traducción permite ejecutar aplicaciones x86_64 en Apple Silicon. Es crucial para ejecutar software que aún no está optimizado para la arquitectura ARM.
- **Homebrew:** Se trata de un gestor de paquetes para macOS que se utiliza para instalar diversos programas, incluida la versión x86_64 de Java. Dependiendo de los requisitos del software, es posible que necesites las versiones ARM y x86_64 de Homebrew.
- **Chocolatey:** Se trata de un equivalente de Homebrew para Windows que permite instalar diversos programas, incluido Java JDK.
- **Java Development Kit (JDK):** Una versión de Java JDK compatible con ARM (como OpenJDK para ARM).
- **x86_64 JDK:** Para la compatibilidad con bibliotecas o aplicaciones específicas aún no disponibles para ARM, también se necesita una versión x86_64 de Java. Esto se puede instalar usando Homebrew bajo Rosetta 2.
- Docker:** Necesitas tener `docker` y `docker-compose` instalados localmente. Si no los tienes instalados, te recomendamos que sigas las directrices de la [documentación oficial de Docker](https://docs.docker.com/get-docker/) para su instalación y actualización.
- Node & NPM:** Utilizamos la versión `v18` de Node. Se recomienda gestionar las versiones de Node con [`nvm`](https://github.com/nvm-sh/nvm). Después de instalar nvm, ejecute estos comandos para instalar y cambiar a la versión 18 de Node:
    ```bash
    nvm install 18
    nvm use 18
    ```
    Para usar Node sin `nvm`, siga las instrucciones de instalación en la [web oficial] de Node(https://nodejs.org/en/). Tras la instalación, verifíquela ejecutando `node -v` en su línea de comandos, que mostrará la versión de Node instalada. Este paso asegura que Node está correctamente instalado en tu sistema.
- **Ethers:** La interacción con la blockchain se realiza utilizando [Ethers v5](https://docs.ethers.org/v5/).
````

## Primeros pasos con el relé RIF

Para obtener una guía detallada paso a paso sobre cómo empezar a utilizar RIF Relay, consulte [Sample dApp](/developers/integrate/rif-relay/sample-dapp/).

## Requisitos para el despliegue del contrato de relevo RIF

### Casco

- Utilizamos la versión `Hardhat` `v2.10.2` para las interacciones de blockchain. Para más detalles sobre cómo instalar Hardhat, siga las instrucciones del [sitio web de Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started#installation). Utilice el prefijo `npx` para los comandos de Hardhat para garantizar el uso de la versión específica del proyecto. Verifique la instalación con `npx hardhat version`. Para la configuración, consulte `hardhat.config.ts`. Instrucciones detalladas de uso y configuración están disponibles en [Documentación de Hardhat](https://hardhat.org/docs).

### Uso de Docker

- Los componentes de RIF Relay pueden desplegarse usando Docker o localmente usando [Hardhat](#hardhat). En el repositorio se puede encontrar una guía para [RIF Relay Server](https://github.com/rsksmart/rif-relay-server#execute-as-a-docker-container).
