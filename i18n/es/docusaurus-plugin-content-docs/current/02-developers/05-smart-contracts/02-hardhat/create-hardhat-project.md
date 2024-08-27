---
sidebar_label: Crear un proyecto de casco
sidebar_position: 101
title: Crear un proyecto de casco
description: Aprenda a configurar su entorno de desarrollo con Hardhat
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

En esta sección, aprenderá a crear un proyecto hardhat y a verificar la instalación de hardhat.

## Clonar el repositorio de proyectos

Para empezar, clone el repositorio [rootstock-quick-start-guide](https://github.com/rsksmart/rootstock-quick-start-guide.git):

```shell
git clone https://github.com/rsksmart/rootstock-quick-start-guide.git
```

## Instalar dependencias

Ejecute el siguiente comando en la raíz del proyecto.

```shell
  npm instalar
```

> El repositorio de inicio rápido ya viene preinstalado con hardhat. La rama `master` tiene la configuración inicial y el proyecto barebones y la rama `feat/complete` tiene el estado completo del proyecto hardhat. Puedes ver el diff en las ramas de estado inicial y completo del repositorio en cualquier momento mientras revisas este material. Para ejecutar el proyecto completo, haz checkout en la rama feat/complete, instala las dependencias y ejecuta el comando: `npx http-server`.

### Verificar la instalación del casco

Aquí verificaremos la instalación del casco en su proyecto.

- Para verificar la instalación del casco:
  - El repositorio [quickstart](https://github.com/rsksmart/rootstock-quick-start-guide) viene con Hardhat preinstalado. Para comprobar si Hardhat está instalado, ejecute `npx hardhat` en el directorio `rootstock-quick-start-guide`.
  - `npx hardhat` no sólo verifica la instalación, sino que también le permite iniciar un nuevo proyecto Hardhat si no existe. Para un nuevo proyecto, se le pedirá que elija entre varias opciones. Para crear un proyecto en blanco, selecciona **Create an empty hardhat.config.js**, o elige una de las otras opciones para comenzar con una plantilla preestablecida.

Una vez finalizada la instalación, puede comprobar que Hardhat se ha instalado correctamente ejecutando de nuevo `npx hardhat`. Debería aparecer un mensaje de ayuda con las tareas disponibles, indicando que Hardhat está instalado y listo para usar.
