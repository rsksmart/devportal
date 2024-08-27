---
sidebar_label: Implantar contratos inteligentes
sidebar_position: 105
title: Implantar contratos inteligentes
description: Aprenda a desplegar su contrato inteligente Rootstock en su entorno local y en la red Rootstock.
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

En esta sección, desplegaremos su contrato de token en su entorno local y también desplegaremos e interactuaremos con el contrato en la red Rootstock.

## Paso 1: Configurar el archivo de implantación

Para configurar el archivo de despliegue:

- Navegue hasta el directorio `scripts` en el directorio raíz del repositorio de inicio rápido:

```shell
   cd guiones
```

- En el directorio de scripts, abra el archivo de despliegue `deploy.js`:

Para desplegar el contrato `myToken`, copie el script de despliegue que aparece a continuación y péguelo en su archivo de despliegue o consulte el archivo [`deploy.js`](https://raw.githubusercontent.com/rsksmart/rootstock-quick-start-guide/feat/complete/scripts/deploy.js) en GitHub.

```js
   async function main() {
   const [deployer] = await ethers.getSigners();

   console.log("Desplegando contratos con la cuenta:", deployer.address);

   const MyToken = await ethers.getContractFactory("MyToken");
   const myToken = await MyToken.deploy(1000);

   console.log("Dirección del token:", myToken.address);
   }

   main().catch((error) => {
   console.error(error);
      process.exitCode = 1;
});
```

## Paso 2: Ejecutar la red Hardhat localmente

> Nota: Necesitas tener suficientes RBTC en tu cuenta de despliegue para las tasas de gas. Consulte la sección [Financie su cuenta] (/developers/smart-contracts/hardhat/configure-hardhat-rootstock#step-3-fund-your-accounts).

Para ejecutar la red Hardhat localmente:

- Iniciar la red Hardhat
  - Hardhat viene con una red Ethereum integrada para el desarrollo. Ejecuta el siguiente comando en el directorio raíz de tu proyecto para iniciarlo.
    ```shell
    nodo casco npx
    ```
    Este comando iniciará una red blockchain local y mostrará una lista de cuentas y claves privadas disponibles:
    ![Nodo Rootstock en ejecución](/img/guides/quickstart/hardhat/run-node.png)
- Despliegue de su contrato en la red local
  - Despliega tu contrato en la red local Hardhat, en otro terminal o símbolo del sistema, ejecuta el siguiente comando en el directorio raíz:

    ```shell
    npx hardhat run --network hardhat scripts/deploy.js
    ```

    Esto debería dar un resultado similar al siguiente:

    ```shell
    npx hardhat run --network hardhat scripts/deploy.js

    Desplegando contratos con la cuenta: 0xf39Fd6e51aad88F6F4ce6aB88279cffFb92266
    Dirección del token: 0x5FbDB2315678afecb367f032d93F642f64180aa3
    ```

## Paso 3: Implemente su contrato en la red Rootstock

Siga estos pasos para implementar su contrato en la red Rootstock:

- Utilice el comando de ejecución de Hardhat para desplegar su contrato, dependiendo de la red deseada. Puede elegir desplegar en la Testnet o en la Mainnet de Rootstock.

Para desplegarlo en la red de pruebas del patrón raíz, ejecute:

```shell
   npx hardhat run --network rskTestnet scripts/deploy.js
```

Esto debería devolver lo siguiente:

```shell
% npx hardhat run --network rskTestnet scripts/deploy.js 
Desplegando contratos con la cuenta: 0xA210D04d707f6beBF914Cb1a57199Aebe7B40380
Dirección del token: 0xc6EcBe0F6643825FD1AAfc03BEC999014759a279
```

- Para desplegar en la red principal de Rootstock, ejecute:

```shell
   npx hardhat run --network rskMainnet scripts/deploy.js
```

### Configurar MetaMask

:::note[Install Metamask]

:::

## Paso 4: Conectar Remix a Rootstock Testnet (opcional)

1. Abrir Remix IDE

   - Vaya a [Remix IDE](https://remix.ethereum.org/) en su navegador.

2. Conecta MetaMask a Remix:

   - En Remix, vaya al plugin **Deploy & run transactions**.
   - En el desplegable **Entorno**, seleccione **Proveedor inyectado**.
   - Esto conectará con MetaMask. Asegúrate de que MetaMask está en la red `RSK Testnet` que configuraste anteriormente.

### Interactuar con el contrato desplegado en Remix

Para interactuar con su contrato desplegado en la red Rootstock:

- Cargar su contrato desplegado
  - Importa el archivo `myToken.sol` a remix y compila.

Importar archivo Solidity y compilar](/img/guides/quickstart/hardhat/compile-contract-remix.png)

- Una vez compilado, debería ver la marca de verificación y el archivo solidiity cargado en Remix.

Compilación exitosa](/img/guides/quickstart/hardhat/successful-compile-remix.png)

- Elija `Deploy and Run Transactions` y en `Environment`, elija "Injected Provider - Metamask".

Esto carga la cartera Metamask.

Despliegue y ejecución de transacciones](/img/guides/quickstart/hardhat/deploy-and-run-tx-remix.png)

Ahora haz clic en `Transacciones registradas` ¡interactúa con el Contrato Inteligente! Llama a sus funciones, envía transacciones y observa los resultados. Asegúrate de que tienes suficiente tRBTC en tu cartera MetaMask para las tasas de transacción.

- Supervisar las transacciones
  - Utilice Remix y MetaMask para supervisar las confirmaciones y los resultados de las transacciones.
  - También puede utilizar [Rootstock Testnet Explorer](https://explorer.testnet.rootstock.io/) para ver las transacciones y las interacciones contractuales.
