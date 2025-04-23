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

  console.log("Deploying contracts with the account:", deployer.address);

  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(1000);

  console.log("Token address:", myToken.address);
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
Deploying contracts with the account: 0xA210D04d707f6beBF914Cb1a57199Aebe7B40380
Token address: 0xc6EcBe0F6643825FD1AAfc03BEC999014759a279
```

- Para desplegar en la red principal de Rootstock, ejecute:

```shell
   npx hardhat run --network rskMainnet scripts/deploy.js
```

### Configurar MetaMask

:::note[Install Metamask]

:::

## Step 4: Interact with your deployed contract

To interact with your deployed contract, you can create an interaction script using JavaScript/TypeScript and the [Ethers.js](https://docs.ethers.org/v5/) library.

- Create a `interact.js` file in the `scripts` directory:

```
   touch scripts/interact.js
```

- Paste the following code in the `interact.js` file:

```js
const hre = require("hardhat");

async function main() {
  try {
    // Get the ContractFactory of your MyToken contract
    const MyToken = await hre.ethers.getContractFactory("MyToken");

    // Connect to the deployed contract
    const contractAddress = "0x543ba9FC0ade6f222BD8C7Bf50a0CD9923Faf569"; // Replace with your deployed contract address
    const contract = await MyToken.attach(contractAddress);

    // Retrieve the balance of an account
    const account = "0x28eb8D29e4713E211D1dDab19dF3de16086BB8fa";
    const balance = await contract.balanceOf(account);

    // Retrieve the symbol of the token
    const symbol = await contract.symbol();

    console.log(
      `Balance of ${account} account: ${balance.toString()} ${symbol}`
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
```

- And run the interaction script. This is how you can do it on testnet:

```
   npx hardhat run scripts/interact.js --network rskTestnet
```

- And this is how you can do it on mainnet:

```
   npx hardhat run scripts/interact.js --network rskMainnet
```

- The expected output by running the interaction script is:

```
   Balance of 0x28eb8D29e4713E211D1dDab19dF3de16086BB8fa account: 1000 MTK
```
