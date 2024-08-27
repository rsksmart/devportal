---
sidebar_label: Interactuar con el Front-end
sidebar_position: 106
title: Interactuar con el Front-end
description: Aprenda a integrar su contrato inteligente Rootstock con aplicaciones front-end.
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

La creación de una interfaz web fácil de usar para los contratos inteligentes en la red Rootstock puede mejorar la interacción del usuario. Aquí nos centraremos en el uso de `ethers.js`, una popular biblioteca de Ethereum, para conectar tus contratos inteligentes a un front-end web.

## Configuración del proyecto

1. Crea una nueva carpeta llamada `frontend` y navega hasta el directorio:

```shell
  mkdir frontend
  cd frontend
```

> Nota: Si usas el repo de inicio rápido en `master`, ya hay una carpeta frontend. Puedes `cd` en el directorio del frontend.

2. En el directorio frontend, inicializa un proyecto Node.js:

```shell
  npm init -y
```

3. Instala Ethers.js:

```shell
  npm install --save éteres
```

## Crear archivo HTML

- Actualizar archivo HTML
  - En el directorio del frontend, abra el archivo `index.html`:
    - Copie el siguiente fragmento de código y péguelo en su archivo html:
      ```html
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Aplicación Web3 con Ethers.js</title>
      </head>

      <body>
      </body>

      </html>
      ```
- Éteres de importación
  - Para importar la librería Ethers para interactuar con el monedero a la red, copie el fragmento de código siguiente y péguelo en la sección `<head>` de su archivo html:
    ```html
      <script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"></script>
    ```
- Crear elementos HTML dentro del cuerpo
  1. Crear un botón para activar la función de conexión del monedero.
  2. Crear un botón para activar la función para obtener saldo.
  3. Crea un elemento div para mostrar la respuesta de la dirección conectada.
  4. Crea un elemento div para mostrar la respuesta del saldo de la cartera.
     ```html
     <body>
       <div>
         <h1>Conectarse a la red Rootstock</h1>
         <button id="connectButton">Conectar Cartera</button>
         <button id="getBalanceButton" disabled>Obtener saldo MTK</button>
         <div id="walletAddress"></div>
         <div id="walletBalance"></div>
       </div>
     </body>
     ```
- Importar archivo javascript
  - Por último, para importar la biblioteca javascript que crearemos en un paso posterior, copie el fragmento de código siguiente y péguelo en la sección `<body>` de su archivo html::
    ```html
      <script src="app.js"></script>
    ```

Tu archivo `index.html` debería parecerse ahora al [archivo `index.html`](https://raw.githubusercontent.com/rsksmart/rootstock-quick-start-guide/feat/complete/frontend/index.html) en GitHub.

## Crear funciones JavaScript

- Crear función javascript básica
  1. En el directorio del frontend, abre el archivo `app.js`.
  2. Copie el archivo de artefactos `MyToken.json` generado al construir los contratos en `/artifacts/contracts/MyToken.sol/MyToken.json`.
  3. Copia el archivo `networks.json`. [Puede obtener el archivo en este enlace](https://github.com/jesus-iov/rootstock-quick-start-guide/blob/5cf8c1d2e50d967be9cfc653a045ca614c3c32aa/frontend/networks.json).
  4. Crea la función para esperar a que se cargue el DOM, instancia los elementos HTML (botones y divs), y declara algunas variables:
     ```js
     document.addEventListener('DOMContentLoaded', function () {
       // Instanciación de elementos HTML
       const connectButton = document.getElementById('connectButton');
       const getBalanceButton = document.getElementById('getBalanceButton');
       const walletAddressDiv = document.getElementById('walletAddress');
       const walletBalanceDiv = document.getElementById('walletBalance');
       // Instanciación de variables
       let provider, account, myTokenContract;
       let contractABI = [];
       let networks = {};
       const contractAddress = 'Sustituir por la dirección de su contrato'; // Por ejemplo, 0xa6fb392538BaC56e03a900BFDE22e76C05fb5122
     });
     ```
- Añade una función que obtenga la ABI y la almacene en una variable
  ```js
  async function fetchExternalFiles() {
    // Coloca MyToken.json generado en artefactos después de compilar los contratos
    let response = await fetch('MyToken.json');
    const data = await response.json();
    contractABI = data.abi;
    // Coloca networks.json para establecer la red automáticamente con la función checkNetwork()
    // Puedes establecerla manualmente en su lugar siguiendo esta guía https://dev.rootstock.io/resources/tutorials/rootstock-metamask/
    response = await fetch('networks.json');
    networks = await response.json();
  }
  ```
- Añadir una función que comprueba la cartera está conectado a la red Rootstock
  ```js
  async function checkNetwork() {
    try {
      // Asegúrate de que Metamask está instalado
      if (!window.ethereum){
        alert('¡Por favor, instala Metamask!');
        return;
      }
      // Cambiar de red
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networks.rskTestnet.chainId }],
      });
    } catch (error) {
      // Este código de error indica que la cadena no se ha añadido a Metamask
      if (error.code === 4902) {
        // Trying to add new chain to Metamask
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [networks.rskTestnet],
        });
      } else {
        // Rethrow all other errors
        throw error;
      }
    }
  }
  ```
- Llama a la función fetchABI que carga la ABI y conecta el monedero a la red.
  ```js
  ¡// Obtener los datos necesarios y configurar los eventos
  fetchExternalFiles().then(() => {
    // Evento del botón de conexión
    connectButton.addEventListener('click', async function () {
      // Comprobar que la red está configurada correctamente
      await checkNetwork();
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Obtener la cuenta de Metamask
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          account = accounts[0];
          // Actualizar el frente con la dirección de la cuenta
          walletAddressDiv.innerHTML = `Connected account: ${account}`;
          // Obtener el proveedor de red
          provider = new ethers.providers.Web3Provider(window.ethereum);
          // Obtener el firmante para la interacción en red
          signer = provider.getSigner();
          // Activa el botón getBalanceButton
          connectButton.disabled = true;
          getBalanceButton.disabled = false;
        } catch (error) {
          console.error("Error connecting to MetaMask", error);
          walletAddressDiv.innerHTML = `Error: ${error.message}`;
        }
      } else {
        walletAddressDiv.innerHTML = `¡Por favor, instale MetaMask! `;
      }
    });
  ```
- Añade una función que responda al evento de clic en el botón de obtener saldo.
  ```js
  // Obtener el evento del botón de saldo
  getBalanceButton.addEventListener('click', async function () {
    // Verificar que contractAddress es una dirección válida
    if (!ethers.utils.isAddress(contractAddress)){
      alert('Por favor, verifique que contractAddress está establecido');
      return;
    }
    // Instanciar el contrato
    myTokenContract = new ethers.Contract(contractAddress, contractABI, signer);
    // Comprobar si el contrato se ha instanciado correctamente
    if (myTokenContract) {
      // Obtener el saldo del usuario
      const balance = await myTokenContract.balanceOf(account);
      // Mostrar el saldo del usuario
      walletBalanceDiv.innerHTML = `MyToken Balance: ${balance} MTK`;
    }
  });
  ```
- Ver el código completo
  - [Enlace GitHub](https://raw.githubusercontent.com/rsksmart/rootstock-quick-start-guide/feat/complete/frontend/app.js)
    ```js
    document.addEventListener('DOMContentLoaded', function () {
      // Instanciación de elementos HTML
      const connectButton = document.getElementById('connectButton');
      const getBalanceButton = document.getElementById('getBalanceButton');
      const walletAddressDiv = document.getElementById('walletAddress');
      const walletBalanceDiv = document.getElementById('walletBalance');
      // Instanciación de variables
      let provider, account, myTokenContract;
      let contractABI = [];
      let networks = {};
      const contractAddress = 'Sustituir con la dirección de su contract\'; // Ej. 0xa6fb392538BaC56e03a900BFDE22e76C05fb5122

      /**
    * Cargar datos de archivos JSON externos
    */
      async function fetchExternalFiles() {
        // Colocar MyToken.json generado en artefactos tras compilar los contratos
        let response = await fetch('MyToken.json');
        const data = await response.json();
        contractABI = data.abi;
        // Coloca networks.json para establecer la red automáticamente con la función checkNetwork()
        // Puedes establecerla manualmente siguiendo esta guía https://dev.rootstock.io/resources/tutorials/rootstock-metamask/
        response = await fetch('networks.json');
        networks = await response.json();
      }

      /**
    * Comprueba y establece la red automáticamente en caso de que no se haya hecho ya
    */
      async function checkNetwork() {
        try {
          // Asegúrate de que Metamask está instalado
          if (!window.ethereum){
            alert('¡Por favor, instala Metamask!');
            return;
          }
          // Cambiar de red
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: networks.rskTestnet.chainId }],
          });
        } catch (error) {
          // Este código de error indica que la cadena no se ha añadido a Metamask
          if (error.code === 4902) {
            // Trying to add new chain to Metamask
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [networks.rskTestnet],
            });
          } else {
            // Rethrow all other errors
            throw error;
          }
        }
      }

      ¡// Obtener los datos necesarios y configurar los eventos
      fetchExternalFiles().then(() => {
        // Evento del botón de conexión
        connectButton.addEventListener('click', async function () {
          // Comprobar que la red está configurada correctamente
          await checkNetwork();
          if (typeof window.ethereum !== 'undefined') {
            try {
              // Obtener la cuenta de Metamask
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              account = accounts[0];
              // Actualizar el frente con la dirección de la cuenta
              walletAddressDiv.innerHTML = `Connected account: ${account}`;
              // Obtener el proveedor de red
              provider = new ethers.providers.Web3Provider(window.ethereum);
              // Obtener el firmante para la interacción en red
              signer = provider.getSigner();
              // Activa el botón getBalanceButton
              connectButton.disabled = true;
              getBalanceButton.disabled = false;
            } catch (error) {
              console.error("Error connecting to MetaMask", error);
              walletAddressDiv.innerHTML = `Error: ${error.message}`;
            }
          } else {
            walletAddressDiv.innerHTML = `¡Por favor, instale MetaMask! `;
          }
        });

        // Obtener el evento del botón de saldo
        getBalanceButton.addEventListener('click', async function () {
          // Verificar que contractAddress es una dirección válida
          if (!ethers.utils.isAddress(contractAddress)){
            alert('Por favor, verifique que contractAddress está establecido');
            return;
          }
          // Instanciar el contrato
          myTokenContract = new ethers.Contract(contractAddress, contractABI, signer);
          // Comprobar si el contrato se ha instanciado correctamente
          if (myTokenContract) {
            // Obtener el saldo del usuario
            const balance = await myTokenContract.balanceOf(account);
            // Mostrar el saldo del usuario
            walletBalanceDiv.innerHTML = `MyToken Balance: ${balance} MTK`;
          }
        });
      });
    });
    ```

### Ejecutar el frontend

Para ejecutar el frontend, ejecute un servidor web local para probar el archivo HTML utilizando el siguiente comando:

```shell
npx servidor http
```

Navegue hasta la URL `http://127.0.0.1:8080` para probar el código en el navegador y deberías obtener un resultado similar a la imagen de abajo:
Contrato Inteligente Frontend](/img/guides/quickstart/hardhat/frontend.png)

:::tip\[Tip]

- Asegúrese de que la red local hardhat se está ejecutando. Ejecute `npx hardhat node` en el directorio raíz para iniciar la red local. Consulte la sección [Solución de problemas y errores comunes](/developers/smart-contracts/hardhat/troubleshooting/) para solucionar errores comunes.
- Puedes ver y ejecutar el proyecto completo desde la rama [`feat/complete` branch](https://github.com/rsksmart/rootstock-quick-start-guide/tree/feat/complete). Para ello, haz git checkout en la rama `feat/complete`, ejecuta `cd frontend`, ejecuta `npm install`, y luego ejecuta `npx http-server` para ver e interactuar con el contrato inteligente desde el frontend.
  :::

## Recursos

Estas herramientas están específicamente diseñadas para el desarrollo de Web3, y pueden simplificar la integración de la funcionalidad de blockchain en las interfaces web. He aquí algunas herramientas y bibliotecas recomendadas que son populares en el espacio Web3, junto con breves descripciones:

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">1. RainbowKit</Accordion.Header>
    <Accordion.Body>
      - RainbowKit](https://www.rainbowkit.com/) es una librería React que ofrece una solución completa de conexión de monederos. Proporciona una interfaz de conexión de billetera hermosa y fácil de usar que admite múltiples billeteras y redes.
      - **Por qué usarlo:**
        Es ideal para proyectos en los que desea una experiencia de conexión de billetera fluida y fácil de usar. Es fácil de integrar y administrar, especialmente en aplicaciones basadas en React.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">2. Web3Modal</Accordion.Header>
    <Accordion.Body>
      - [Web3Modal](https://web3modal.com/) es una biblioteca JavaScript que proporciona un modal de conexión de billetera simple y unificado para aplicaciones Web3. Es compatible con varios proveedores de billetera y se puede usar con diferentes bibliotecas Web3.
      - **Por qué usarlo:** Si necesitas comenzar a usar React o quieres una solución de conexión de billetera agnóstica al framework, Web3Modal es una excelente opción. Es personalizable y funciona bien tanto con web3.js como con ethers.js.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">3. Wagmi</Accordion.Header>
    <Accordion.Body>
      - Wagmi](https://wagmi.sh/) es un conjunto de React Hooks para Ethereum que simplifica las interacciones con ethers.js. Proporciona ganchos para conexión de billetera, interacción de contrato, saldos y más.
      - **Por qué usarlo:** Para los desarrolladores de React que prefieren un enfoque basado en ganchos, Wagmi ofrece una manera elegante de integrar la funcionalidad de Ethereum. Hace que la gestión de las interacciones de estado y blockchain sea más intuitiva.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">4. Moralis</Accordion.Header>
    <Accordion.Body>
      - Moralis](https://moralis.io/) es una plataforma backend totalmente gestionada para aplicaciones Web3 y blockchain. Ofrece un conjunto de herramientas para autenticación, bases de datos en tiempo real, funciones en la nube y sincronización de datos blockchain.
      - **Por qué usarlo:** Puede ser un ahorro de tiempo para construir una aplicación más completa con soporte backend. Maneja gran parte de la complejidad del backend y te permite centrarte en el desarrollo del front-end.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">5. Foundry</Accordion.Header>
    <Accordion.Body>
        - Foundry](https://book.getfoundry.sh) es una cadena de herramientas de desarrollo de contratos inteligentes y un entorno de desarrollo fácil de usar utilizado para escribir y probar contratos inteligentes avanzados en Solidity.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```
