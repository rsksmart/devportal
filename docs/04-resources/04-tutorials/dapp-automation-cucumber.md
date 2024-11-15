---
sidebar_lable: dApp Automation with Cucumber
sidebar_position: 4
title: dApp Automation with Cucumber & Playwright
description: 'Testing decentralized applications (dApps) is crucial for delivering a smooth user experience and ensuring the reliability of decentralized systems. Cucumber and Playwright form a dynamic duo in automated testing, blending behavior-driven development (BDD) and powerful browser automation capabilities.'
tags: [rsk, rootstock, tutorials, resources, tests, dapp-automation, smart contracts, dapps, cucumber, playwright]
---

Rootstock is a blockchain platform that extends the capabilities of the Bitcoin network by incorporating smart contract functionality. Built to be EVM (Ethereum Virtual Machine) compatible, Rootstock enables developers to deploy and execute smart contracts using the same programming languages and tools as Ethereum.

This guide aim to introduce you to an [agile automation framework](https://github.com/rsksmart/e2e_dapps_automation) designed exclusively for decentralized applications (dApps) automation and E2E testing. 

This solution seamlessly brings together Cucumber's user-friendly behavior-driven development, Playwright's precise browser automation, and the tailored dApp testing capabilities of Synpress. With Cucumber's Gherkin syntax, teams collaboratively define DApp behaviors. Playwright, customized for Chrome, adds finesse to browser automation. Synpress, in its Playwright version, effortlessly integrates with MetaMask (more software wallets to come) for thorough dApp testing. 
This way, developers enjoy expressive scenarios, targeted browser automation, and specialized dApp testing features.

## Prerequisites

- Install Nodejs and NPM 
    - See [Hackathon Dev Starter](/developers/requirements/)
- [Cucumber](#installing-and-configuring-cucumber)
- Code Editor 
    - [Visual Studio Code](https://code.visualstudio.com/)

## Getting Started

Clone the repo and `cd` into the directory: 
```shell
git clone https://github.com/rsksmart/e2e_dapps_automation/
cd e2e_dapps_automation
```

### Install dependencies

To install dependencies, run the command `npm i` in the terminal or run the `npm:install` script.

Create a `.env` file inside config folder, and add your MetaMask test wallet address for testing purposes (seed & password). See [how to create a metamask wallet](/developers/blockchain-essentials/browser#install-metamask) and [configure Metamask for rootstock](/developers/blockchain-essentials/browser).

See example: 

```text
secretWordsOrPrivateKey=test test test test test test test test test test test 
testpassword=Tester@1234
```

> To export a private key on Metamask, see [How to export an account private key](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key#:~:text=Click%20the%20three%20vertical%20dots,to%20display%20your%20private%20key.).
> - Please note that this is sensitive information, even if it is stored locally in the .env file. If shared anyhow, you could potentially lose all your funds. Ensure the provided wallet is for testing purposes only. 
> - Metamask version can be provided either in the .env file or in the `src/hooks/fixtures.js` file as follows:

```shell
const metamaskPath = await prepareMetamask(
    process.env.METAMASK_VERSION || "10.25.0"
);
```

> - You will find the Rootstock network already configured in the `config/config.js` file as seen in [DApp under Test](#dapp-configuration), you will only need to modify the `dAppURL` constant, which can point also to your localhost.

### Installing and configuring Cucumber 

[Cucumber](https://cucumber.io/) already comes as a built-in dependency in this automation framework, when installing the dependencies, just be certain to add the vscode extensions as well, which will let you handle cucumber features seamlessly.

- Cuke Step Definition Generator
    - Author: Muralidharan Rajendran
    - Description: This VSCode extension aids users by generating Cucumber Glue / Step Definition snippets for selected statements, streamlining work with Cucumber JS in VS Code.
    - [View Cuke Step Definition Generator on Marketplace](https://marketplace.visualstudio.com/items?itemName=muralidharan92.cuke-step-definition-generator).
- Cucumber Auto Complete (Gherkin) Full Support
    - Author: Alexander Krechik
    - Description: This extension provides comprehensive language support for Cucumber (Gherkin), including syntax highlighting, snippets, autocompletion, and format support across multiple programming languages such as JS, TS, Ruby, and Kotlin.
    - [View Cucumber (Gherkin) Full Support on Marketplace](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete).
- Add Extensions on VSCode
    ```text
    {
        "recommendations": [
            "muralidharan92.cuke-step-definition-generator",
            "alexkrechik.cucumberautocomplete"
        ]
    }
    ```


## DApp Configuration

To test your DApp on your preferred blockchain, go to `config/config.js` and modify the following parameters:

```shell
const dAppURL = 'https://wallet.testnet.rollup.rif.technology/';

// Custom network under test
const networkConfiguration = {
 networkName: 'Rootstock',
 rpcUrl: 'https://rpc.testnet.rootstock.io/{YOUR_APIKEY}',
 chainId: '31',
 symbol: 'RBTC',
 isTestnet: true
}
```

### Running Tests 

Since this is a boilerplate project, just a 'demo.feature' has been implemented. Feel free to build your test suite at `src/test/features/_dappLivingDocumentation/`.

Execute `test` or `npm test` script to run the tests using chromium.

## Writing E2E Tests using Cucumber

- A. Identifying test scenarios for dApps on Rootstock
    - Identifying scenarios to automate in a UI framework involves considering various factors related to your application, testing goals, and the nature of the scenarios. Here are some guidelines specific to UI automation:
        - **Frequently Executed and Stable Tests:**
        Prioritize automating scenarios that are executed frequently, especially as part of your regression testing suite. Stable features with consistent behavior are good candidates.
        - **Critical Path and Core Functionality:**
        Identify and automate scenarios that cover the critical paths and core functionality of your application. These are the key user journeys that are crucial for the application's success.
        - **Data-Driven Testing:**
        Automate scenarios that involve testing with different sets of data. This is especially useful for formulating data-driven tests to cover a wide range of inputs.
        - **Integration with External Systems:**
        Automate scenarios that involve the integration of your application with external systems or APIs. Verify that data is exchanged correctly and that integrations function as expected.
        - **User Onboarding and User Experience:**
        Automate scenarios related to user onboarding and overall user experience. Verify that new users can easily navigate through the application and perform key actions.
- B. Creating feature files for different use cases
    - Inside the `features` folder, create a new file with a `.feature` extension. For example, `sample.feature.`
    - Write your feature file using [Gherkin syntax](https://cucumber.io/docs/gherkin/). 
    - For example:
        ```
        Feature: Demo to test Cucumber + Playwright + Synpress
        Scenario: Validate metamask connects to Rootstock DApp
            Given I open the DApp website
            When I connect metamask
            Then I verify my wallet is successfully connected to the DApp
        ```
- Defining step definitions to interact with Rootstock dApps
    - An easy way to generate step definitions would be:
        - Select a step in the feature file
        - Right mouse click
        - `Generate Step Definition: Copy To Clipboard option`
        - ![Generate step definition](/img/guides/quickstart/dapp-testing/copy-to-clipboard.png)
    - Then go to the `stepDefinitions` folder, create a new file with a `.steps.js` extension. For example, `sample.steps.js` and paste the generated step. A code snippet like this will be displayed:
        ```shell
        Then(/^I verify my wallet is successfully connected to the dApp$/, () => {
            return true;
        });
        ```
    - Since we are using `"snippetInterface": "async-await"` in the cucumber configuration `cucumber.json`, you will need to change the previous snippet manually to:
        ```shell
        Then(/^I verify my wallet is successfully connected to the dApp$/, async function () {
            return true;
        });
        ```
    - Now, you just simply need to add your code into that step, for example calling some of your page’s methods, remember this is based on the [page object model pattern](https://playwright.dev/docs/pom). Here an example of an entire steps file:
        ```shell
        import { Given, When, Then } from '@cucumber/cucumber';
        import metamask from "@synthetixio/synpress/commands/metamask.js";
        import DemoPage from "../../pages/demo.page.js"

        Given(/^I open the dApp website$/, {timeout: 20 * 1000}, async function () {
        await DemoPage.navigateToDapp(global.BASE_URL);
        });

        When(/^I connect metamask$/, {timeout: 20 * 1000}, async function () {
        await DemoPage.connectWallet();
        await metamask.acceptAccess();
        });

        Then(/^I verify my wallet is successfully connected to the dApp$/, {timeout: 20 * 1000}, async function () {
        await expect(page.locator(".address")).toHaveText("0xf39...92266");
        });
        ```
    - Notice, inside those steps there are references to the DemoPage methods as well as metamask methods. This is how the DemoPage class looks like, just stores some web elements and lets you execute certain actions with them.
        ```shell
        class DemoPage {
        // Page elements
        get btnConnectWallet() {
            return page.locator('[id="btn-core-connect-wallet"]');
        }
        get btnConnectMetamask() {
            return page.locator('.wallet-button-styling .svelte-1vlog3j').first();
        }
        // Methods
        async navigateToDapp(url) {
            await page.goto(url);
        }
        async connectWallet(){
            await this.btnConnectWallet.click();
            await this.btnConnectMetamask.click();
        }
        }
        export default new DemoPage();
        ```

### Reporting 

- Generated reports will be located at `reports` folder
- Since Cucumber is the chosen runner, reports and other config options can be found at `e2e_dapps_automation/cucumber.json`

## Conclusion

Testing decentralized applications (dApps) is crucial for delivering a smooth user experience and ensuring the reliability of decentralized systems. Thorough testing of the frontend identifies and addresses usability issues, creating a user-friendly interface. [Cucumber](https://cucumber.io/) and [Playwright](https://playwright.dev/) form a dynamic duo in automated testing, blending behavior-driven development (BDD) and powerful browser automation capabilities. Cucumber, employing the human-readable Gherkin syntax, enables collaboration between technical and non-technical team members by describing application behavior in plain language.

## Useful Links
- For information on other testing tools, see [Quick Start: Testing Smart Contracts](/developers/smart-contracts/hardhat/test-smart-contracts/)
- [Cucumber](https://cucumber.io/)
- [Playwright](https://playwright.dev/)