---
sidebar_position: 300
sidebar_label: Verificar la propiedad de la dirección
title: Verificar la propiedad de la dirección con Metamask Wallet
description: Confirme que posee una dirección Rootstock utilizando el Gestor de identidades RIF
tags:
  - metamáscara
  - dirección
  - cuenta
  - contratos inteligentes
---

Supongamos que necesita recibir una transferencia de RBTC,
o tokens en la red Rootstock,
por primera vez.
Para ello, debe crear un monedero y conectarlo a la red Rootstock.

Sin embargo, puede que no esté seguro de si realmente "controla" las direcciones del monedero.
Es comprensible, porque es la primera vez que lo utilizas.
Esa preocupación también tiene una base técnica -
necesitas **estar seguro** de que eres **capaz de firmar** transacciones en esta dirección,
antes de pedir a otros que te envíen criptodivisas o tokens a esta dirección.

Aquí demostraremos exactamente cómo hacerlo,
y estar seguro de que realmente "controlas" una dirección en particular.
Todo lo que necesitas es Chrome (navegador web) y MetaMask (extensión del navegador).
Usted no necesita ningún saldo RBTC para hacerlo.

## Primeros pasos

:::tip[Install MetaMask]

Puede utilizar la herramienta [metamask-landing.rifos.org](https://metamask-landing.rifos.org/) para descargar/instalar Metamask y añadir la red personalizada Rootstock o seguir los pasos indicados en [metamask.io](https://metamask.io/).

:::

En Chrome, visita [metamask.io](https://metamask.io/),
y sigue las instrucciones para instalar esta extensión en tu navegador.
Si estás haciendo esto por primera vez,
necesitarás generar una _frase semilla_,
y es extremadamente importante que la registres en algún sitio.

### Habilitar sólo una extensión de navegador Web3

Si tiene más de una extensión de navegador Web3 instalada,
por ejemplo, si tiene MetaMask, Liquality o Nifty,
tenga en cuenta que pueden entrar en conflicto entre sí.

Pega `chrome://extensions/` en tu barra de direcciones,
para ver todas las extensiones del navegador que tienes instaladas.
Comprueba que sólo tienes MetaMask instalada, **o**
si tienes otras extensiones del navegador Web3,
debes desactivar todas las demás haciendo clic en los botones de alternancia.

![](/img/developers/verify-address-ownership/rif-identity-metamask-disable-other-web3-extensions.png)

:::info\[Optional]

Para una mejor experiencia de usuario, puede que también desee

- Haga clic en el icono de extensiones (forma de rompecabezas), y en el desplegable,
- Haz clic en el icono de la chincheta junto a MetaMask para asegurarte de que siempre esté visible.

:::

![](/img/developers/verify-address-ownership/rif-identity-metamask-pin-extension-dropdown.png)

### Desbloquear MetaMask

Tras instalar la extensión o iniciar tu navegador,
MetaMask debería mostrar una ventana emergente pidiéndote que desbloquees la cuenta.
Introduce tu contraseña de MetaMask.
(Ten en cuenta que ésta _no_ es la misma que tu frase semilla).

Si no aparece, puede introducir manualmente
`chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#unlock`
en su barra de direcciones para navegar hasta allí en "vista expandida",
en lugar de dentro de una ventana emergente.

![](/img/developers/verify-address-ownership/rif-identity-metamask-unlock.png)

### Añadir red personalizada para Rootstock

MetaMask sólo contiene configuraciones de red para conectarse a Ethereum por defecto.
Para conectarse a Rootstock necesitará añadir configuraciones de red de Rootstock.

Tiene la opción de añadir manualmente
[Rootstock Mainnet network configuration to MetaMask](/dev-tools/wallets/metamask/).

Alternativamente, puede hacerlo automáticamente,
visitando [identidad.rifos.org](https://identity.rifos.org/),
y cuando intente conectarse usando MetaMask,
se le presentará lo siguiente:

![](/img/developers/verify-address-ownership/rif-identity-metamask-auto-network-1.png)

Haz clic en "RSK Mainnet". MetaMask mostrará esta ventana emergente:

![](/img/developers/verify-address-ownership/rif-identity-metamask-auto-network-2.png)

Haga clic en "Aprobar". Esto rellenará automáticamente la configuración de red para usted.

![](/img/developers/verify-address-ownership/rif-identity-metamask-auto-network-3.png)

A continuación, haga clic en "Cambiar de red" para conectarse a la red principal del Rootstock.

## Verificación de su cuenta Rootstock

En este punto, deberías tener todo configurado:
Tienes un monedero instalado,
ese monedero está conectado a la RSK Mainnet,
y tienes direcciones dentro de ese monedero.

Ya puedes comprobar que puedes utilizar tu monedero para firmar mensajes.

### Ver el historial de transacciones

En MetaMask, puedes consultar el historial de transacciones de una dirección concreta
seleccionando la pestaña "Actividad" en la pantalla principal.

> "Vista ampliada": \`chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#\`\`

![](/img/developers/verify-address-ownership/rif-identity-metamask-transaction-history.png)

Si su ficha de actividad está vacía, como la de arriba,
significa que hay cero transacciones en esta dirección.
Copiemos la dirección haciendo clic en ella.
Se encuentra cerca de la parte superior, empieza por `0x`,
y debería estar bajo una etiqueta similar a "Cuenta 1".

### Visitar el explorador de bloques

Comprobemos la dirección que acaba de copiar
en el explorador de bloques de Rootstock.

Visite `explorer.rsk.co/dirección/${YOUR_ADDRESS}`.
Sustituya `${YOUR_ADDRESS}` por la dirección copiada anteriormente de MetaMask.
Por ejemplo, si has copiado `0xdfc0e6361fd1846a223e2d7834a5ebd441a16dd4`,
la URL será `https://explorer.rsk.co/address/0xdfc0e6361fd1846a223e2d7834a5ebd441a16dd4`.

![](/img/developers/verify-address-ownership/rif-identity-metamask-block-explorer-address-not-found.png)

Es posible que aparezca el mensaje "No encontrado".
Esto no significa necesariamente que la cuenta no exista.
Significa que simplemente no hay transacciones en la cadena de bloques en esta dirección.

### Visite el Gestor de identidades RIF

Hasta ahora, no muy bien, ¿verdad?
... Nada de lo que hemos visto hasta ahora le asegura
que efectivamente controla esta dirección.

Aquí es donde entra en juego el Gestor de Identidades de RIF.
Esta DApp permite verificar si controlamos esta dirección.
Lo hará firmando un mensaje que **no** es una transacción de blockchain.

Visite [identity.rifos.org](https://identity.rifos.org/).

![](/img/developers/verify-address-ownership/rif-identity-metamask-visit.png)

Haga clic en "Conectar su cartera".

![](/img/developers/verify-address-ownership/rif-identity-metamask-connect-wallet.png)

Seleccione "Metamáscara".

> Ten en cuenta que si tienes varias extensiones de navegador Web3 instaladas,
> deshabilítalas todas excepto una.
> Si no, esto confunde a la mayoría de las DApps incluyendo RIF Identity Manager,
> y puede que no veas MetaMask aquí como resultado.
> Consulta la sección "antes de empezar" para más detalles.

### Permiso de conexión al sitio MetaMask

Aparecerá una ventana emergente de MetaMask,
, que básicamente le pregunta si confía en el Gestor de identidades de RIF.

![](/img/developers/verify-address-ownership/rif-identity-metamask-connect-site-permission.png)

Haga clic en "Siguiente".
Esto permite MetaMask para interactuar con RIF Identity Manager

MetaMask mostrará entonces otra ventana emergente,
preguntándote si quieres permitir que el Gestor de identidades de RIF
vea las direcciones de tus cuentas.

![](/img/developers/verify-address-ownership/rif-identity-metamask-view-addresses-permission.png)

Haz clic en "Conectar".
Esto permite a MetaMask ver las direcciones de tus cuentas.

### Autenticación de identidad RIF

Al conceder estos permisos,
el Administrador de Identidades DApp
le presenta otra ventana emergente MetaMask.

![](/img/developers/verify-address-ownership/rif-identity-metamask-sign-authentication-text-message.png)

Esta vez, te pide que firmes un mensaje de texto,
que debería tener un aspecto similar al siguiente:

```text
¿Está seguro de que desea iniciar sesión en la Bóveda de Datos RIF?
URL: https://data-vault.identity.rifos.org
Código de verificación: ${SOME_RANDOM_VALUE}
```

Haga clic en "Firmar".
Cuando hagas esto, ¡sucederá la **parte crucial**!

- MetaMask utiliza la **clave privada** correspondiente a la dirección
  para firmar ese mensaje.
- El mensaje firmado se transmite al backend del Gestor de identidades RIF,
  , que realiza una verificación de firma digital,
  que utiliza para confirmar si efectivamente ha sido firmado por esta dirección concreta.
- Dado que se trata de un mensaje de texto sin formato,
  y no implica añadir una transacción a la blockchain,
  no es necesario pagar tasas de gas,
  y, por tanto, su saldo de RBTC puede ser cero.

Esto es perfecto para las cuentas recién generadas.

### Comprobar el salpicadero

Una vez que haya firmado el mensaje y se haya verificado,
verá el panel de control del Gestor de identidades de RIF.

![](/img/developers/verify-address-ownership/rif-identity-metamask-dashboard.png)

Comprueba que el campo "Persona Address" que aparece aquí **coincide**
con la dirección de tu cuenta en MetaMask.

![](/img/developers/verify-address-ownership/rif-identity-metamask-dashboard-persona-address.png)

Eso es todo: ahora puede estar seguro de que controla esta dirección en la red principal de Rootstock.

## Recursos

- [Verificar contratos inteligentes con SolidityScan](https://blog.rootstock.io/noticia/rootstock-guide-to-verifying-smart-contracts-with-solidityscan/)
- [Herramientas de desarrollo](/dev-tools/)
- [Verificación de contratos inteligentes mediante el complemento de verificación Hardhat para Rootstock](/developers/smart-contracts/verify-smart-contracts/)
