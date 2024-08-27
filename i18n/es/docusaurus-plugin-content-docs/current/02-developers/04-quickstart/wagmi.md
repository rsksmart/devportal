---
sidebar_label: Uso de Wagmi y React Hooks
sidebar_position: 300
title: Portainjertos Wagmi Starter dApp
description: El Rootstock Wagmi Starter Kit proporciona una base sólida para el desarrollo de aplicaciones descentralizadas (dApps) en la blockchain Rootstock. Agiliza el desarrollo aprovechando las bibliotecas React, Wagmi y Shadcn.
tags:
  - rsk
  - portainjertos
  - desarrolladores
  - wagmi
  - inicio rápido
  - dApps
  - Contratos inteligentes
---

El kit de inicio Rootstock Wagmi proporciona una base para la creación de aplicaciones descentralizadas (dApps) en la blockchain Rootstock.
Aprovecha la seguridad de Bitcoin y la flexibilidad de Ethereum.

El kit utiliza [Wagmi](https://wagmi.sh/), una biblioteca React Hooks, para simplificar los contratos inteligentes y las interacciones de la red blockchain y y [Shadcn libraries](https://ui.shadcn.com/).

> Este kit de inicio está diseñado para ayudar a los desarrolladores a iniciar su viaje de desarrollo de dApp en Rootstock.

## Requisitos previos

- **Node.js y Git:** Asegúrese de tener Node.js y Git instalados en su sistema.
  - Consulte la sección [Prerrequisitos](/developers/requirements/#installing-nodejs-and-npm) para saber cómo descargar Node.js usando NVM.
- **Yarn:** Instala Yarn, un gestor de paquetes para proyectos Node.js. Puedes hacerlo ejecutando el siguiente comando en tu terminal:
  ```bash
  npm install -g yarn
  ```
- \*\*Conocimientos básicos
  - [React](https://react.dev/) (biblioteca JavaScript para crear interfaces de usuario)
  - [Solidity](https://soliditylang.org/) (un lenguaje de programación para contratos inteligentes Ethereum).

:::tip[Rootstock Curso para desarrolladores de Blockchain].

Aprenda a escribir, probar, asegurar, desplegar y verificar contratos inteligentes en la red blockchain de Rootstock. Inscríbase en el [Rootstock Blockchain Developer Course](/resources/courses/).
:::

## Configurar

### 1. Clonar el repositorio

En primer lugar, tendrá que clonar el repositorio Rootstock Wagmi Starter Kit. Abre tu terminal y ejecuta los siguientes comandos:

```bash
git clone https://github.com/rsksmart/rsk-wagmi-starter-kit
cd rsk-wagmi-starter-kit
```

### 2. Obtener ID de proyecto

Cada dApp que depende de WalletConnect ahora necesita obtener un projectId de [WalletConnect Cloud](https://cloud.walletconnect.com/). Esto es gratis y solo lleva unos minutos.

Para conseguir la llave:

1. Vaya a [Walletconnect](https://cloud.walletconnect.com/sign-up) y regístrese.
2. Cree un nuevo proyecto haciendo clic en **Crear proyecto**.
3. Añade un Nombre y un Enlace a tu proyecto, selecciona un producto (AppKit o WalletKit), selecciona **WalletKit**.
4. Ahora verás el ID del proyecto, cópialo.

### 3) Configuración del entorno

Para configurar tu entorno, sigue estos pasos:

1. Crea un archivo `.env` y añade variables de entorno.
   ```text
   VITE_WC_PROJECT_ID=Su projectid de la nube Walletconnect
   ```

### 4) Instalar dependencias

Antes de ejecutar el proyecto, asegúrate de tener instaladas las dependencias necesarias. Recomendamos utilizar el gestor de paquetes yarn debido a posibles conflictos con los paquetes npm. Ejecute el siguiente comando para instalar las dependencias:

```bash
hilo
```

### 5. Ejecutar el proyecto

Ahora que has clonado el repositorio e instalado las dependencias, es el momento de ejecutar el proyecto. Ejecute el siguiente comando:

```bash
desarrollo del hilo
```

Esto iniciará la dApp Rootstock Wagmi Starter localmente, permitiéndole desarrollar y probar sus contratos inteligentes. Puedes acceder al servidor Vite en [http://localhost:5173](http://localhost:5173).

## Resultado

<img src="/img/developers/quickstart/wagmi-starterkit.png"  width="800" height="600"/>

:::info\[Info]

Después de ejecutar con éxito su proyecto utilizando el comando anterior, haga lo siguiente:

- Haga clic en el botón "Conectar cartera" para conectarse. Una vez conectado, podrás:
- \*\*Conmuta fácilmente entre Mainnet y Testnet.
- **Ver y copiar su dirección:** Acceda a la dirección de su monedero.
- **Consulta tu saldo de tRBTC:** Consulta tu saldo de tRBTC.
- **Desconectar:** Salir del proyecto.

:::

## Proyecto de prueba

Para probar el proyecto Wagmi, sigue estos sencillos pasos:

1. **Conecte su cartera:** Haga clic en el botón "Conectar cartera".
2. **Navegue hasta la sección Wagmi:** Desplácese hacia abajo y encuentre la tarjeta etiquetada como "Interacción contractual con el kit de inicio Wagmi". Haga clic en ella.
3. **Explore las pestañas:** En la sección Wagmi, verá tres pestañas: ERC-20, ERC-721 y ERC-1155. Haz clic en cualquiera de estas pestañas para explorar más a fondo.

<img src="/img/developers/quickstart/wagmi-starterkit-tabs.png"  width="800" height="600"/>

Proporcionar una sección en el documento acerca de cómo los contratos se llaman en el código, la estructura de carpetas para facilitar la búsqueda de códigos y las principales características de Wagmi y Rainbowkit utilizados en la base de código.

## Entender el código base

### Estructura de carpetas

```
Público
Src
.env
.env.ejemplo
```

La carpeta `src` está organizada para agilizar el proceso de desarrollo y facilitar la localización de código o recursos específicos. Aquí tienes un desglose detallado:

#### Estructura de la carpeta \`.src

- **Activos:** Contiene las ABI (Application Binary Interfaces) para ERC20, ERC721 y ERC1155.
- \*\*Componentes
  - **AccountAbstraction:** Contiene código relacionado con la abstracción de cuentas.
  - **Inicio:** Contiene componentes específicos de la página de inicio.
  - **Iconos:** Contiene varios componentes de iconos.
  - **Tokens:** Incluye componentes para diferentes tipos de tokens.
  - \*\*Interfaz de usuario: Componentes generales de interfaz de usuario utilizados en la aplicación.
  - **Pie de página.tsx:** Componente del pie de página.
  - \*\*Componente de la barra de navegación.
- **Config:**
  - **provider.tsx:** Configuración para proveedores.
  - **rainbowkitConfig.ts:** Configuración para RainbowKit.
  - **wagmiProviderConfig.ts:** Configuración para proveedores WAGMI.
- **Lib:** Contiene varias carpetas de utilidades para facilitar la organización:
  - **Constantes:** Constantes de aplicación.
  - **Funciones:** Funciones generales utilizadas en toda la aplicación.
  - **Tipos:** Definiciones de tipos.
  - **Utilidades:** Funciones de utilidad.
- **Páginas:**
  - **index.ts:** Punto de entrada principal.
  - **Etherspot.tsx:** Componente de página para Etherspot.
  - **Home.tsx:** Componente de la página de inicio.
  - **Wagmi.tsx:** Componente de página relacionado con Wagmi.

### Código para las fichas ERC20, ERC721 y ERC1155

El código responsable de las pestañas correspondientes a ERC20, ERC721 y ERC1155 se encuentra en la carpeta de componentes:

- **ERC20:** Ubicado en el directorio `components/tokens/ERC20`.
- **ERC721:** Ubicado en el directorio `components/tokens/ERC721`.
- **ERC1155:** Ubicado en el directorio `components/tokens/ERC1155`.

Este enfoque estructurado garantiza la agrupación lógica del código y los activos, lo que facilita la navegación y el mantenimiento.

#### Comprender el código de ficha ERC20

El código interactúa con un contrato inteligente para acuñar tokens tRSK. Aquí tienes un desglose detallado de cómo se consigue:

1. \*\*Referencia del contrato inteligente

- **Dirección:** La dirección del contrato inteligente se especifica mediante la constante `ERC20_ADDRESS`.
- **ABI:** La ABI (Application Binary Interface) del contrato, que define las funciones del contrato y sus parámetros, es proporcionada por la constante `abi`.

2. **Lectura de datos contractuales:**

```javascript
const { data, isLoading, isError, refetch } = useReadContract({
    abi,
    address: ERC20_ADDRESS,
    functionName: "balanceOf",
    args: [address],
});
```

3. **Escribir en el contrato:**
   El hook `useWriteContract` de la librería wagmi se utiliza para interactuar con las funciones de escritura del contrato (funciones que modifican el estado).

4. **Acuñación de fichas:**
   La función `mintTokens` llama a `writeContractAsync` para acuñar fichas tRSK.

- Argumentos:
  - abi: Define las funciones del contrato y sus parámetros.
  - Dirección: La dirección del contrato ERC-20 desplegado.
  - functionName: El nombre de la función a llamar, que en este caso es "menta".
  - args: Un array que contiene la dirección del monedero del usuario y la cantidad a acuñar (100 en este caso).

```javascript
const mintTokens = async () => {
  setLoading(true);
  try {
      const txHash = await writeContractAsync({
          abi,
          address: ERC20_ADDRESS,
          functionName: "mint",
          args: [address, 100],
      });
      await waitForTransactionReceipt(rainbowkitConfig, {
          confirmations: 1,
          hash: txHash,
      });
      setLoading(false);
      toast({
          title: "Fichas tRSK acuñadas con éxito",
          description: "Actualiza la página para ver los cambios",
      });
      refetch();
  } catch (e) {
      toast({
          title: "Error",
          description: "Failed tot tokens tRSK",
          variant: "destructive",
      });
      setLoading(false);
      console.error(e);
  }
};

```

Esto envía una transacción a la cadena de bloques para ejecutar la función "acuñar" en el contrato inteligente, acuñando así tokens tRSK y depositándolos en la cartera del usuario.

## Comprender el código de ficha ERC721

Este código define un componente React llamado `ERC721Tab`, que proporciona una interfaz de usuario para interactuar con un contrato inteligente ERC-721.

Las funciones clave dentro de este componente:

1. UsarReadContract\`:
   Este hook se utiliza para leer datos del contrato ERC-721. Obtiene el saldo de NFT de la dirección del usuario conectado.

- \*\*Parámetros:
  - `abi`: La ABI (Application Binary Interface) del contrato ERC-721.
  - Dirección La dirección del contrato ERC-721.
  - `functionName`: El nombre de la función a llamar en el contrato (balanceOf).
  - `args`: Los argumentos a pasar a la función del contrato ([dirección]).

2. usarWriteContract\`:
   Este hook se utiliza para escribir datos en el contrato ERC-721, concretamente para acuñar un nuevo NFT.

**Función**:

- WriteContractAsync`: Escribe de forma asíncrona en el contrato llamando a la función `safeMint\` del contrato ERC-721.

3. mintNFT\`:
   Se trata de una función asíncrona que gestiona el proceso de acuñación de un nuevo NFT.

- \*\*Pasos:
  - Establece el estado de carga en true.
  - Intenta llamar a la función `safeMint` en el contrato ERC-721 utilizando `writeContractAsync`.
  - Espera a que se confirme la transacción mediante `waitForTransactionReceipt`.
  - Muestra un mensaje de brindis de éxito si la acuñación se realiza correctamente.
  - Obtiene el saldo NFT del usuario llamando a `refetch`.
  - Captura cualquier error, lo registra y muestra un mensaje de brindis por el error.
  - Establece el estado de carga en false.

4. Refetch
   Esta función forma parte del hook `useReadContract` y se utiliza para refrescar el saldo de NFTs después de una operación de acuñación exitosa.

5. `toast`:
   Esta función se utiliza para mostrar notificaciones tostadas para mensajes de éxito o error.

El resto del componente contiene JSX para representar los elementos de la interfaz de usuario, incluido un botón para acuñar el NFT, una pantalla de saldo y un enlace para ver los NFT acuñados en un explorador de bloques.

## Comprender el código de ficha ERC1155

El código proporcionado es un componente React que interactúa con un contrato inteligente utilizando el estándar ERC-1155. Permite a los usuarios acuñar tokens y comprobar sus saldos.

Las funciones clave dentro de este componente:

1. `ERC1155Tab` Componente:

**Variables de Estado**:

- `loading`: Booleano para gestionar el estado de carga durante el minado de tokens.
- Valor Número para almacenar el tipo de token seleccionado para la acuñación.
- Dirección La dirección del monedero del usuario obtenida del hook `useAccount`.

2. Ganchos `useReadContract`:
   Estos ganchos se utilizan para leer datos del contrato inteligente.

- `useReadContract` para comprobar el saldo de fichas de tipo A (con ID 1).
- `useReadContract` para comprobar el saldo de fichas de tipo B (con ID 2).

3. Función `mintTokens`:
   Función asíncrona que gestiona la acuñación de fichas.

- \*\*Pasos:
  - Llama a `writeContractAsync` para interactuar con el contrato inteligente y acuñar tokens.
  - Espera el recibo de la transacción utilizando `waitForTransactionReceipt`.
  - Muestra brindis de éxito o error en función del resultado.
  - Restablece los datos de la balanza después de la acuñación.

## Únete a la Comunidad

Crear dApps puede ser un reto, pero no estás solo.
Únete a la comunidad [Rootstock Discord](http://discord.gg/rootstock) para obtener ayuda, hacer preguntas y colaborar.
