---
sidebar_position: 3
title: Añadiendo Rootstock a Metamask Programáticamente
sidebar_label: Añadir Rootstock a Metamask Programmatically
tags:
  - rsk
  - rootstock
  - metamásica
  - tutoriales
  - recursos
  - carteras
description: Aprenda cómo agregar e iniciar un interruptor de red en Metamask desde un sitio web.
---

![rootstock_metamask_banner](/img/resources/rootstock-metamask/rootstock-metamask-banner.jpeg)

[Rootstock](https://rootstock.io/) es un blockchain con capacidades de contrato inteligentes, es posible construir aplicaciones descentralizadas (dApps) con él. La mayoría de dApps son aplicaciones web a las que usted accede con un navegador de Internet regular, como Chrome. Sin embargo, las interacciones de blockchain requieren algún software adicional, que viene en forma de extensiones del navegador. Estas extensiones del navegador insertan un objeto de proveedor web3, con las partes Javascript de la aplicación web utilizadas para interactuar con el blockchain, formando parte integral de una arquitectura dApp.

_Ten en cuenta que estas extensiones de navegador almacenan tus claves privadas, y úsalas para firmar transacciones. Así que manténgalas seguras._

En este tutorial aprenderemos cómo agregar e iniciar un interruptor de red en Metamask desde un sitio web. Posteriormente, crearemos una aplicación frontend para comprobar si nuestra configuración funciona conectando nuestro sitio web frontend a metamask.

Ten en cuenta que esta funcionalidad es importante ya que alerta a los usuarios cuando están en una red diferente a la que necesita tu dApp. Les permitirá _cambiar automáticamente_ a la red correcta cuando conecten su cartera o cuando interactúen con un contrato inteligente.

El estrés aquí está en la capacidad de _cambiar automáticamente_. Típicamente cambiar a una red por primera vez está muy involucrado para el usuario final, implicando leer la documentación, y actualizar manualmente las opciones de configuración en Metamask. Esto omite la necesidad de todo eso, y permite una mejor experiencia de usuario.

## Requisitos

Para seguir este tutorial necesitarás lo siguiente:

- Cartera de Metamask

> Si no tienes una cartera de Metamask instalada, sigue las instrucciones de [Cómo descargar, instalar y configurar una cartera de Metamask](https://youtu.be/VlyqXD1TjJk).

**Cómo descargar, instalar y configurar una cartera de Metamask**

<div class="video-container">
  <iframe width="949" height="534" src="https://youtube.com/embed/VlyqXD1TjJk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Comenzando

En esta sección, haremos lo siguiente:

- Clona el [estado inicial del repo](https://github.com/rsksmart/demo-code-snippets/tree/switch-metamask-to-rsk-init-state/switch-network-to-rsk)
- [Lista de archivos de configuración](#list-configuration-files)
- [Configurar red](#configure-networks)
- [Configurar index.js](#configure-indexjs)
- Prueba nuestra [aplicación frontend](#frontend)
- Ver [errores comunes](#common-errors)

### Clonar el estado inicial del repositorio

Para empezar, clona el repositorio [demo-code-snippets](https://github.com/rsksmart/demo-code-snippets) y navega al directorio [switch-network-to-rsk](https://github.com/rsksmart/demo-code-snippets/tree/switch-metamask-to-rsk-init-state/switch-network-to-rsk).

### Lista de archivos de configuración

Echemos un vistazo al contenido de la carpeta/directorio `switch-network-to-rsk`.

![Archivos de configuración](/img/resources/rootstock-metamask/list-config-files.png)

El archivo `index.html` contiene un archivo HTML de ejemplo para probar nuestra aplicación. Incluye un botón **Connect to Testnet** y un botón **Connect to Mainnet**, y veremos todos estos en acción al final de este tutorial.

El archivo `index.js` importa los parámetros de red de `networks.js` y define las funciones `connectProviderTo()` y `switchToNetwork()`.

El archivo `networks.js` contiene toda la configuración de las diferentes redes de Rootstock que se añadirán a Metamask.

### Configurar redes

Aquí configuraremos las redes para [Mainnet](/concepts/rbtc/networks#mainnet-conversion) y [Testnet](/concepts/rbtc/networks#testnet-conversion).

Abra la [networks.js](https://github.com/rsksmart/demo-code-snippets/blob/5cc5124fe5bddc85f09a82e49eba7591003543f0/switch-network-to-rsk/networks. s) o copie el código de abajo, luego pegue en el archivo `network.js`. Para más información sobre los diferentes tipos de redes en Rootstock, vea [Instalación de MetaMask (/dev-tools/wallets/metamask/).

```js
export const rskTestnet = {
  chainName: 'Rootstock Testnet',
  chainId: '0x1f',
  rpcUrls: ['https://rpc. estnet.rootstock.io/{YOUR_APIKEY}'],
  blockExplorerUrls: ['https://explorer.testnet.rootstock. o/'],
  nativeCurrency: {
    symbol: 'tRBTC',
    decimals: 18,
  },
};

export const rskMainnet = {
  chainName: 'Rootstock Mainnet',
  chainId: '0x1e',
  rpcUrls: ['https://rpc. estnet.rootstock.io/{YOUR_APIKEY}'],
  blockExplorerUrls: ['https://explorer.rootstock.io/'],
  nativeCurrency: {
    symbol: 'RBTC',
    decimals: 18,
  },
};
```

> See how to [Get an API Key from the RPC API](/developers/rpc-api/rootstock/setup/)

Ver configuración completa en [GitHub](https://github.com/rsksmart/demo-code-snippets/blob/5cc5124fe5bddc85f09a82e49eba7591003543f0/switch-network-to-rsk/networks.js).

### Configurar index.js

En esta sección, configuraremos el 'index'. s\\` archivo que contiene todas las funcionalidades de nuestro DApp, importaremos algunos archivos necesarios, Compruebe si la metamasa está instalada, vea cómo agregar y cambiar de red programáticamente desde dentro de un contrato inteligente.

> Ten en cuenta que `index.js` tiene dos archivos, el primer archivo es una [versión redactada](https://github.com/rsksmart/demo-code-snippets/blob/2d22a1708ddd272130edf05893d8770c38973bd2/switch-network-to-rsk/index-redacted. s) del código que contiene un estado inicial del código y el segundo archivo contiene la [versión completa](https://github. om/rsksmart/demo-code-snippets/blob/5cc5124fe5bddc85f09a82e49eba7591003543f0/switch-network-to-rsk/index.js) que contiene el estado completo del código para `index.js`.

**Paso 1: Importar archivos necesarios**

Aquí importaremos las redes configuradas en la [sección anterior](#configure-networks) en el archivo `networks.js` en `index.js`.

```
importar { rskTestnet, rskMainnet } desde './networks.js';
```

**Paso 2: Comprobar si Metamask está instalado**

**estado inicial**

```javascript
async function connectProviderTo(network) {
  try {
    // TODO: implement request accounts

    await switchToNetwork(network);
    showPage(red. hainName, dirección);
  } catch (error) {
    showError(error.message);
  }
}
```

**Caminata de código**

> La función `connectProviderTo()` inicia la conexión a cada una de las redes Rootstock en Metamask, utiliza la `window. thereum` API to check if Metamask is installed then throws an error - **Please install Metamask**, if false, a popup appears trigggered by `window.ethereum. método equest`, esto solicita que el usuario proporcione una dirección de Ethereum a ser identificada. Una vez que el usuario acepta la solicitud, devuelve una dirección y cartera de Ethereum está conectada. Ver [https://docs.metamask.io/guide/rpc-api.html#restricted-methods](https://docs.metamask.io/guide/rpc-api.html#restricted-methods)

Antes de añadir una red, necesitamos estar seguros de que Metamask ha sido instalado, para hacerlo, añadir el siguiente código al `bloque de intento`:

```javascript
prueba {
    // asegúrate de que Metamask esté instalado
    if (!window. thereum) throw new Error('Por favor instale Metamask! );
    // conectar wallet
    const [address] = await window. thereum.request({
      method: 'eth_requestAccounts',
    });
}
```

Copia y pega el código completo abajo o ve el código en [GitHub](https://github.com/rsksmart/demo-code-snippets/blob/5cc5124fe5bddc85f09a82e49eba7591003543f0/switch-network-to-rsk/index.js#L3);

```javascript
async function connectProviderTo(network) {
  try {
    // make sure Metamask is installed
    if (! �, . thereum) throw new Error('Por favor instale Metamask! );
    // conectar el monedero
    const [address] = await window. thereum.request({
      method: 'eth_requestAccounts',
    });
    espera switchToNetwork(red);
    showPage(red. hainName, dirección);
  } catch (error) {
    showError(error.message);
  }
}
```

**Paso 3: Agregar y cambiar una red**

**estado inicial**

```javascript
async function switchToNetwork(network) {
  // TODO: implementar cambio de red

  // Asegúrese de que cambiamos
  const chainId = await window. thereum.request({ method: 'eth_chainId' });
  if (chainId !== red. hainId)
    arrojar un nuevo Error(`Could not connect to ${network.chainName}`);
}
```

**Caminata de código**

> La función `switchToNetwork()` añade una nueva red a Metamask y posteriormente cambia a esa red. Esta función espera un argumento de red, y espera una dirección rootstock que utiliza el método `wallet_switchEthereumChain` y el `chainID`. Luego arroja un error si el indicador de conmutación fue rechazado o el chainID pasado no fue encontrado e intenta agregar la nueva cadena a Metamask.

Para añadir una red programáticamente en Metamask, necesitamos llamar al método `wallet_addEthereumChain`, expuesto por `window. y pasar los parámetros de red configurados en la sección [Configurar redes](#configure-networks)]. Para ello, añade un `try block`dentro de la función`switchToNetwork()\\`.

```javascript
  try {
    // tratando de cambiar a una red ya añadida a la ventana de espera de Metamask
    . ahí. método equest({
      : 'wallet_switchEthereumChain',
      parámetros: [{ chainId: network.chainId }],
});
```

Vea el siguiente código completo o vea el enlace al código en [GitHub](https://github.com/rsksmart/demo-code-snippets/blob/5cc5124fe5bddc85f09a82e49eba7591003543f0/switch-network-to-rsk/index.js#L20);

```javascript
async function switchToNetwork(network) {
  try {
    // trying to switch to a network already added to Metamask
    await window. ahí. equest({
      : 'wallet_switchEthereumChain',
      parámetros: [{ chainId: network.chainId }],
    });
    // captando error específico 4902
  } catch (error) {
    // este código de error indica que la cadena no ha sido añadida a Metamask
    if (error. ode === 4902) {
      // intentando añadir una nueva cadena a Metamask
      await window. ahí. equest({
        method: 'wallet_addEthereumChain',
        parámetros: [network],
      });
    } else {
      // arrojar todos los demás errores
      error de lanzamiento;
    }
  }
  // asegúrese de que cambiamos
  const chainId = await window. thereum.request({ method: 'eth_chainId' });
  if (chainId !== red. hainId)
    throw new Error(`Could not connect to ${network.chainName}`);
}
```

**Mostrar éxito si el cambio de red se ha realizado correctamente**

**estado inicial**

```javascript
async function showPage(chainName, address) {
  // TODO: Implement showPage functionality;
}
```

La función `showPage()` muestra que el cambio a otra red es exitoso y debería mostrar
un estado conectado, la red y una dirección de monedero. Esto se hace mediante la manipulación de DOM para agregar un estado conectado, el nombre de cadena y una dirección.

Agregue el siguiente código dentro de la función `async`, o vea el código en [GitHub](https://github.com/rsksmart/demo-code-snippets/blob/5cc5124fe5bddc85f09a82e49eba7591003543f0/switch-network-to-rsk/index.js#L47);

```javascript
async function showPage(chainName, address) {
  document.getElementById('connect-prompt').classList.add('hidden');
  document.getElementById('connected').classList.remove('hidden');
  document.getElementById('chain-name').innerHTML = chainName;
  document.getElementById('wallet-address').innerHTML = address;
}
```

**Lanza un error si hubo un problema**

**estado inicial**

```javascript
function showError(message = '') {
  // TODO Implement showError;
}
```

La función `showError()` es llamada en el caso de que algo salió mal. Esta función está diseñada para lanzar un error que contiene un mensaje si algo salió mal. Debería verse así:

![user-rejected-request-error](/img/resources/rootstock-metamask/user-rejected-request.png)

Vea la sección [errores comunes](#common-errors) para más explicación.

Agregue el siguiente código en la función `showError()` o vea el código en [GitHub](https://github.com/rsksmart/demo-code-snippets/blob/5cc5124fe5bddc85f09a82e49eba7591003543f0/switch-network-to-rsk/index.js#L54);

```javascript
function showError(message = '') {
  document.getElementById('error'). nnerHTML = mensaje;
  if (! essage) return;
  // ocultar mensaje de error en 3 segundos
  setTimeout(() => showError(''), 3000);
}
```

**Habilita los listeners de eventos de clic a botones**

Para añadir un detector de eventos a los botones de conexión creados en `índice. tml`, usa el DOM para obtener los botones `connect-testnet` y `connect-mainnet`, luego agregue un detector de eventos "clic" que utiliza la función `connectProviderTo()` para manejar la conexión a `rskTestnet` o `rskMainnet` respectivamente.

Vea el siguiente código, o vea el enlace en [GitHub](https://github.com/rsksmart/demo-code-snippets/blob/5cc5124fe5bddc85f09a82e49eba7591003543f0/switch-network-to-rsk/index.js#L61);

```javascript
// añadir listeners de eventos de clic en los botones de Connect
documento
  .getElementById('connect-testnet')
  . ddEventListener('click', () => connectProviderTo(rskTestnet));
documento
  .getElementById('connect-mainnet')
  .addEventListener('click', () => connectProviderTo(rskMainnet));
```

### Completar pasarela de código

Puedes encontrar el código completo para `index.js` a continuación, o en el [repositorio de GitHub](https://github.com/rsksmart/demo-code-snippets/blob/5cc5124fe5bddc85f09a82e49eba7591003543f0/switch-network-to-rsk/index.js).

```javascript
importar { rskTestnet, rskMainnet } desde './redes. s';

async function connectProviderTo(network) {
  try {
    // Asegúrese de que Metamask esté instalado
    if (! �, . thereum) throw new Error('Por favor instale Metamask! );
    // conectar el monedero
    const [address] = await window. thereum.request({
      method: 'eth_requestAccounts',
    });
    espera switchToNetwork(network);
    showPage(red. hainName, dirección);
  } catch (error) {
    showError(error. essage);
  }
}

// ver detalles en la documentación de Metamaska:
// https://docs.metamask. o/guía/rpc-api. tml#wallet-addethereumchain
async function switchToNetwork(network) {
  try {
    // tratando de cambiar a una red ya añadida a Metamask
    await window. ahí. equest({
      method: 'wallet_switchEthereumChain',
      parámetros: [{ chainId: network.chainId }],
    });
    // capturando el error específico 4902
  } catch (error) {
    // este código de error indica que la cadena no ha sido añadida a Metamask
    if (error. ode === 4902) {
      // intentando añadir una nueva cadena a Metamask
      await window. ahí. equest({
        method: 'wallet_addEthereumChain',
        parámetros: [network],
      });
    } else {
      // arrojar todos los demás errores
      throw error;
    }
  }
  // asegúrese de que cambiamos
  const chainId = await window. ahí. equest({ method: 'eth_chainId' });
  if (chainId !== red. hainId)
    throw new Error(`Could not connect to ${network.chainName}`);
}

async function showPage(chainName, address) {
  documento. etElementById('connect-prompt').classList.add('hidden');
  document.getElementById('connected').classList.remove('oculto');
  documento. etElementById('chain-name').innerHTML = chainName;
  document.getElementById('wallet-address').innerHTML = address;
}

function showError(message = '') {
  document.getElementById('error'). nnerHTML = mensaje;
  if (! essage) return;
  // ocultar mensaje de error en 3 segundos
  setTimeout(() => showError(''), 3000);
}

// añade listeners de eventos a los botones Connect
documento
  . etElementById('connect-testnet')
  .addEventListener('click', () => connectProviderTo(rskTestnet));
document
  .getElementById('connect-mainnet')
  .addEventListener('click', () => connectProviderTo(rskMainnet));
```

## Frontend

Ahora vamos a probar nuestra aplicación, siga los pasos siguientes para revisar la aplicación en su navegador.

(1) Abra la [switch-network-to-rsk](https://github.com/rsksmart/demo-code-snippets/tree/master/switch-network-to-rsk) carpeta en VSCode y dentro de la carpeta abra `index.html`

![index.html](/img/resources/rootstock-metamask/frontend-index.png)

(2) Ejecuta `index.html` con el [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extensión VSCode
pulsando el botón `Go Live`

![vscode-go-live-button](/img/resources/rootstock-metamask/vscode-go-live-button.png)

En la esquina inferior derecha de la ventana de VSCode. VSCode abrirá la página web desde `index. tml` en una nueva ventana del navegador.
El navegador debería abrir una página
en `127.0.0.1` o `localhost`.

![connect-mainnet-testnet-live-page](/img/resources/rootstock-metamask/connect-mainnet-testnet.png)

(3) En la página web, haga clic en el botón `Connect to Testnet` o `Connect to Mainnet` para añadir y cambiar a la red correspondiente

![connect-to-testnet](/img/resources/rootstock-metamask/connect-testnet.png)

(4) El navegador abre una ventana para pedir una contraseña de Metamask, introduce tu contraseña de Metamask y pulsa `Unlock`

![metamask-window](/img/resources/rootstock-metamask/metamask-unlock-password.png)

(5) Metamask muestra una pregunta: `¿Permitir que este sitio añada una red?`

![metamask-prompt](/img/resources/rootstock-metamask/metamask-add-network.png)

Inside the prompt you should see the details
of the network configuration being added
to Metamask.
This gives the user the option to verify
if the network configuration options are legitimate by comparing against
the official documentation.

> - Ver configuraciones para Rootstock [Mainnet y Testnet](/dev-tools/wallets/metamask/).

(6) Presiona `Aprobar`

![metamask-approve](/img/resources/rootstock-metamask/metamask-approve-network-details.png)

(7) La metamásica muestra posteriormente otra indicación: `¿Permitir a este sitio cambiar la red?`. Pulse `Cambiar red`

![metamask-switch](/img/resources/rootstock-metamask/metamask-switch-network.png)

(8) ¡Metamask ha añadido la nueva red Rootstock y ha cambiado a ella!

![metamask-successful-switch](/img/resources/rootstock-metamask/metamask-connected-to-rootstock.png)

## Errores comunes

Puede encontrar los siguientes errores al probar la aplicación:

- Error: No se puede destruir la propiedad del valor intermedio ya que no está definida
  > ![show-error-image](/img/resources/rootstock-metamask/cannot-destructure-property-error.png)
  >
  > - Problema: Esto puede ocurrir si el usuario ya está conectado a Rootstock Mainnet o Rootstock Testnet.
  > - Posible solución: Si encuentras este error, asegúrese de que ha iniciado sesión en Metamask o compruebe que ya no está conectado a Rootstock Mainnet o Rootstock Testnet.
- Error: El usuario ha rechazado la solicitud
  > ![user-rejected-request-error](/img/resources/rootstock-metamask/user-rejected-request.png)
  >
  > - Problema: Esto ocurre cuando el usuario cierra inesperadamente Metamask o presiona "rechazar" en lugar de "aprobar" en los diálogos.
  > - Posible corrección: Confirme la solicitud si toda la información es correcta. Su dApp debe tener código para manejar el escenario cuando el usuario decide no pasar añadiendo la nueva configuración de red.

## Ajustar

¡¡Felicidades!!

Has aprendido a crear un dApp
que puede programar;

- Añadir una nueva configuración de red Rootstock y,
- Cambiar a una red Rootstock.