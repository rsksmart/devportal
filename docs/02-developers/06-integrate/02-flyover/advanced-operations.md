---
sidebar_label: Advanced Operations
sidebar_position: 120
title: Flyover SDK - Advanced Operations
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg]
description: The Flyover SDK streamlines integration between client applications and the Flyover Protocol. This easy-to-use JavaScript/TypeScript toolkit provides configuration options for Liquidity Providers (LPs) and custom network setups for connecting to Rootstock.
---

## Custom network setups

To configure custom networks, see the Configuration section.

## Captcha token handling 

The `tokenResolver` asynchronously fetches a token from the state managed by a store. 

```js
const tokenResolver = function () {
  return import('./store/store').then(
    (mod) => mod.store.getState().flyover.captchaToken,
  );
};
```
:::info[Info]

A Liquidity Provider can choose to enable captcha in the service to ensure only human-generated quotes.

:::

> * The function above uses the dynamic import statement to import the module located at `./store/store`. Once the module is imported, it accesses the store object from it using mod.store. Then, it retrieves the `flyover.captchaToken` from the state using `store.getState().flyover.captchaToken`. The import statement returns a promise, and the .then block is used to specify what should happen after the import is successful. In this case, it returns the captchaToken.
> * The same principle applies to any approach taken by the developer to manage the state of its application. Flyover SDK only expects a string resulting from the promise, regardless of the origin. It’s important to mention that the type of captcha expected by the Flyover SDK is a [Invisible reCAPTCHA v2](https://developers.google.com/recaptcha/docs/invisible). The site key to use the captcha is included in the LiquidityProvider object retrieved by getLiquidityProviders() function.

## Assigning Resolver in the Flyover Instance

Add the `captchaTokenResolver: tokenResolver` in the Flyover instance. 

```js
const flyover = new Flyover({
  network: 'Mainnet',
  captchaTokenResolver: tokenResolver,
  allowInsecureConnections: true,
});
```
> This will  assign the `tokenResolver` function as the captcha token resolver for the Flyover instance. This means that when the Flyover instance needs a captcha token, it will use the logic defined in `tokenResolver` to obtain it asynchronously.

## FlyoverUtils

Flyover SDK exports an object with a collection of util functions that the client application might use during the integration with the SDK. You can see the list of the utility functions and also when importing the FlyoverUtils object from the SDK package every function has a JsDoc explaining its usage.

:::danger[Troubleshooting]

Encountering difficulties with the SDK setup, LPS configuration, or specific Flyover issues? Join the [Rootstock Discord community](http://discord.gg/rootstock) for expert support and assistance. Our dedicated team is ready to help you resolve any problems you may encounter.

:::