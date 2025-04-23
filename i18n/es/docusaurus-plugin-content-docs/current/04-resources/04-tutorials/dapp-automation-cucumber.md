---
sidebar_lable: dApp Automation con pepino
sidebar_position: 4
title: dApp Automation con pepino & Playwright
description: La prueba de aplicaciones descentralizadas (dApps) es crucial para proporcionar una experiencia de usuario fluida y asegurar la fiabilidad de los sistemas descentralizados. Cupeber y Playwright forman un dúo dinámico en pruebas automatizadas, desarrollo basado en el comportamiento (BDD) y potentes capacidades de automatización de navegadores.
tags:
  - rsk
  - rootstock
  - tutoriales
  - recursos
  - pruebas
  - automatización-dapp
  - contratos inteligentes
  - dapps
  - pepino
  - playwright
---

Rootstock es una plataforma blockchain que extiende las capacidades de la red Bitcoin incorporando la funcionalidad del contrato inteligente. Compatible con EVM (Ethereum Virtual Machine) Rootstock permite a los desarrolladores implementar y ejecutar contratos inteligentes usando los mismos lenguajes de programación y herramientas que Ethereum.

Esta guía pretende presentarte un [framework de automatización ágil](https://github.com/rsksmart/e2e_dapps_automation) diseñado exclusivamente para automatización de aplicaciones descentralizadas (dApps) y pruebas E2E.

This solution seamlessly brings together Cucumber's user-friendly behavior-driven development, Playwright's precise browser automation, and the tailored dApp testing capabilities of Synpress. With Cucumber's Gherkin syntax, teams collaboratively define DApp behaviors. Playwright, customized for Chrome, adds finesse to browser automation. Synpress, in its Playwright version, effortlessly integrates with MetaMask (more software wallets to come) for thorough dApp testing.
This way, developers enjoy expressive scenarios, targeted browser automation, and specialized dApp testing features.

## Prerrequisitos

- Instalar Nodejs y NPM
 - Ver [Hackathon Dev Starter](/Developopers/requirements/)
- [Cucumber](#instalando-y-configuring-cupeber)
- Editor de código
 - [Codigo Visual Studio](https://code.visualstudio.com/)

## Comenzando

Clona el repositorio y `cd` en el directorio:

```shell
git clon https://github.com/rsksmart/e2e_dapps_automation/
cd e2e_dapps_automation
```

### Instalar dependencias

Para instalar dependencias, ejecuta el comando `npm i` en la terminal o ejecuta el script `npm:install`.

Crea un archivo `.env` dentro de la carpeta de configuración y añade tu dirección de cartera de pruebas MetaMask para propósitos de prueba (semilla y contraseña). Vea [cómo crear un monedero de metamas](/Developopers/blockchain-essentials/browser#install-metamask) y [configure Metamask para rootstock](/Developopers/blockchain-essentials/browser).

Ver ejemplo:

```text
secretWordsOrPrivateKey=test test test test test test test test test test test test 
testpassword=Tester@1234
```

> Para exportar una clave privada en Metamask, vea [Cómo exportar una clave privada de la cuenta](https://support.metamask. o/hc/es/articles/360015289632-Cómo exportar-an-account-s-private-key#:~:text=Haz clic en%20el%20tres %20 tres%20de otros%20dverticales,para%20djuegan%20tu clave%20privada%20.).
>
> - Tenga en cuenta que se trata de información sensible, incluso si se almacena localmente en el archivo .env. Si se comparte de cualquier manera, podría potencialmente perder todos sus fondos. Asegúrese de que la cartera proporcionada es para propósitos de prueba solamente.
> - La versión de Metamask se puede proporcionar en el archivo .env o en el archivo `src/hooks/fixtures.js` de la siguiente manera:

```shell
const metamaskPath = await prepareMetamask(
    process.env.METAMASK_VERSION || "10.25.0"
);
```

> - Encontrará la red Rootstock ya configurada en el archivo `config/config. s` como se ve en [DApp bajo Test](#dapp-configuration), solo necesitarás modificar la constante `dAppURL`, que puede apuntar también a tu localhost.

### Instalando y configurando Cupeber

[Cucumber](https://cucumber. o/) ya viene como una dependencia integrada en este entorno de automatización, al instalar las dependencias, sólo asegúrese de añadir las extensiones vscode también, que le permitirán manejar las características de pepino sin problemas.

- Generador de Definición de Paso Cuke
 - Autor: Muralidharan Rajendran
 - Descripción: Esta extensión VSCode ayuda a los usuarios generando snippets de Cucumber Glue / Step Definition para las sentencias seleccionadas, streamlining work with Cucumber JS in VS Code.
 - [Ver Generador de Definición de Paso en Marketplace](https://marketplace.visualstudio.com/items?itemName=muralidharan92.cuke-step-definition-generator).
- Soporte completo de pepino autocompletado (Gherkin)
 - Autor: Alexander Krechik
 - Descripción: This extension provides comprehensive language support for Cucumber (Gherkin), including syntax highlighting, snippets, autocompletado y soporte de formato en múltiples lenguajes de programación como JS, TS, Ruby y Kotlin.
 - [Ver pepino (Gherkin) Soporte completo en Marketplace](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete).
- Añadir extensiones en VSCode
 ```text
 {
     "recommendations": [
         "muralidharan92.cuke-step-definition-generator",
         "alexkrechik.cucumberautocomplete"
     ]
 }
 ```

## Configuración DApp

Para probar tu DApp en tu blockchain preferido, ve a `config/config.js` y modifica los siguientes parámetros:

```shell
const dAppURL = 'https://wallet.testnet.rollup.rif.technology/';

// Red personalizada bajo prueba
const networkConfiguration = {
 networkName: 'Rootstock',
 rpcUrl: 'https://rpc. estnet.rootstock.io/{YOUR_APIKEY}',
 chainId: '31',
 symbol: 'RBTC',
 isTestnet: true
}
```

### Pruebas en ejecución

Ya que este es un proyecto de boilerplatz, sólo se ha implementado una 'demo.feature'. Siéntase libre de construir su suite de pruebas en `src/test/features/_dappLivingDocumentation/`.

Ejecuta el script `test` o `npm test` para ejecutar las pruebas usando chromium.

## Escribiendo pruebas E2E usando pepino

- A. Identificar escenarios de prueba para dApps en Rootstock
 - La identificación de escenarios para automatizar en un entorno de interfaz de usuario implica considerar diversos factores relacionados con su aplicación, objetivos de prueba y la naturaleza de los escenarios. Aquí hay algunas pautas específicas para la automatización de la interfaz:
  - **Pruebas Frecuentemente Ejecutadas y Estables:**
   Priorizar escenarios automatizados que se ejecutan con frecuencia, especialmente como parte de su suite de pruebas de regresión. Las características estables con comportamiento consistente son buenos candidatos.
  - **Ruta Crítica y Funcionalidad del núcleo:**
   Identifica y automatiza escenarios que cubren las rutas críticas y la funcionalidad central de tu aplicación. Estos son los viajes clave para el usuario que son cruciales para el éxito de la aplicación.
  - **Prueba de drenaje de datos:**
   Automatiza escenarios que implican pruebas con diferentes conjuntos de datos. Esto es especialmente útil para formular pruebas basadas en datos que cubran una amplia gama de entradas.
  - **Integración con sistemas externos:**
   Automatiza escenarios que implican la integración de tu aplicación con sistemas externos o APIs. Verificar que los datos se intercambian correctamente y que las integraciones funcionan como se esperaba.
  - **Experiencia del usuario y del usuario:**
   Automatiza escenarios relacionados con la incorporación del usuario y la experiencia general del usuario. Verificar que los nuevos usuarios puedan navegar fácilmente a través de la aplicación y realizar acciones clave.
- B. Crear archivos de características para diferentes casos de uso
 - Dentro de la carpeta `features`, crea un nuevo archivo con una extensión `.feature`. Por ejemplo, `sample.feature.`
 - Escribe tu archivo de características usando [sintaxis de Gherkin](https://cucumber.io/docs/gherkin/).
 - Por ejemplo:
  ```
  Característica: Demostrar para probar Cupeber + Playwright + Sincronizar
  Escenario: Validar la metamasa se conecta a Rootstock DApp
      Dado que abro el sitio web de DApp
      Cuando conecto la metamasa
      Luego verifiqué que mi cartera está correctamente conectada al DApp
  ```
- Definir definiciones de pasos para interactuar con Rootstock dApps
 - Una forma fácil de generar definiciones de pasos sería:
  - Seleccione un paso en el archivo de características
  - Clic derecho
  - \`Generar definición de paso: Copiar a la opción del portapapeles
  - ![Generar definición de paso](/img/guides/quickstart/dapp-testing/copy-to-clipboard.png)
 - Luego ve a la carpeta `stepDefinitions`, crea un nuevo archivo con una extensión `.steps.js`. Por ejemplo, `sample.steps.js` y pegar el paso generado. Se mostrará un fragmento de código como este:
  ```shell
  Then(/^I verify my wallet is successfully connected to the dApp$/, () => {
      return true;
  });
  ```
 - Puesto que estamos usando `"snippetInterface": "async-await"` en la configuración de pepino `cucumber.json`, necesitará cambiar el fragmento anterior manualmente a:
  ```shell
  Then(/^I verify my wallet is successfully connected to the dApp$/, async function () {
      return true;
  });
  ```
 - Ahora, simplemente necesitas añadir tu código en ese paso, por ejemplo llamando a algunos de los métodos de tu página, recuerda que esto se basa en el [patrón de modelo de objeto de página](https://playwright. ev/docs/pom). Aquí un ejemplo de un archivo de pasos completos:
  ```shell
  import { Given, When, Then } from '@cucumber/cucumber';
  import metamask from "@synthetixio/synpress/commands/metamask.js";
  import DemoPage from ". /../pages/demo.page.js"

  Given(/^I open the dApp website$/, {timeout: 20 * 1000}, async function () {
  await DemoPage.navigateToDapp(global. ASE_URL);
  });

  Cuándo(/^I connect metamask$/, {timeout: 20 * 1000}, async function () {
  await DemoPage.connectWallet();
  await metamask. cceptAccess();
  });

  Then(/^I verify my wallet is successfully connected to the dApp$/, {timeout: 20 * 1000}, async function () {
  await expect(page. ocator(".address")).toHaveText("0xf39...92266");
  });
  ```
 - Aviso, dentro de estos pasos hay referencias a los métodos DemoPage así como a los métodos de metamasa. Así es como se ve la clase DemoPage sólo almacena algunos elementos web y te permite ejecutar ciertas acciones con ellos.
  ```shell
  class DemoPage {
  // Elementos de página
  get btnConnectWallet() {
      página de devolución. ocator('[id="btn-core-connect-wallet"]');
  }
  get btnConnectMetamask() {
      return page.locator('.wallet-button-styling .svelte-1vlog3j'). irst();
  }
  // Métodos
  asíncronos navigateToDapp(url) {
      página de espera. oto(url);
  }
  async connectWallet(){
      esperan esto. tnConnectWallet.click();
      await this.btnConnectMetamask.click();
  }
  }
  export default new DemoPage();
  ```

### Informando

- Los informes generados se ubicarán en la carpeta `reports`
- Dado que Cucumber es el corredor elegido, los informes y otras opciones de configuración se pueden encontrar en `e2e_dapps_automation/cucumber.json`

## Conclusión

La prueba de aplicaciones descentralizadas (dApps) es crucial para proporcionar una experiencia de usuario fluida y asegurar la fiabilidad de los sistemas descentralizados. La prueba minuciosa del frontend identifica y aborda problemas de usabilidad, creando una interfaz amigable para el usuario. [Cucumber](https://cucumber.io/) y [Playwright](https://playwright. ev/) forman un dúo dinámico en pruebas automatizadas, desarrollo basado en la mezcla de comportamientos (BDD) y potentes capacidades de automatización del navegador. Cucumber, utilizando la sintaxis de Gherkin legible, permite la colaboración entre los miembros técnicos y no técnicos del equipo describiendo el comportamiento de la aplicación en lenguaje sencillo.

## Enlaces útiles

- Para obtener información sobre otras herramientas de prueba, consulte [Quick Start: Testing Smart Contracts](/Developopers/smart-contracts/hardhat/test-smart-contracts/)
- [Cucumber](https://cucumber.io/)
- [Playwright](https://playwright.dev/)