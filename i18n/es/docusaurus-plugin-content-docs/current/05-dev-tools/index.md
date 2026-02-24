---
sidebar_position: 1
title: Herramientas e infraestructura para desarrolladores
sidebar_label: Todas las herramientas
tags:
  - rsk
  - rootstock
  - herramientas
  - herramientas de desarrollador
description: Explore una selección de herramientas y lenguajes de desarrollo de contratos inteligentes. Desde la familiar Solidez hasta Entornos de Rust o Desarrolladores como Hardhat, encontrará todo lo que necesita para interactuar e implementar sus contratos inteligentes en Rootstock.
---

```mdx-code-block
<Filter
values={[
{label: 'Bridges', value: 'bridge'},
{label: 'Kits de inicio', value: 'demos'},
{label: 'Exchanges', value: 'exchange'},
{label: 'Wallets', value: 'wallet'},
{label: 'Explorer', value: 'explorer'},
{label: 'Plataformas e infra', value: 'platform-infra'},
{label: 'Cross Chain', value: 'cc'},
{label: 'Datos', value: 'data'},
{label: 'SDKs', value: 'sdk'},
{label: 'Faucets', value: 'faucet'},
{label: 'Gas', value: 'gas'},
{label: 'Entornos de desarrollo', value: 'dev-environment'},
{label: 'Abstracción de cuenta', value: 'aa'},
{label: 'Calidad del código', value: 'code-quality'},
{label: 'JSON-RPC', value: 'rpc'},
{label: 'Librerías', value: 'library'},
{label: 'No Code', value: 'no-code'},
{label: 'Herramientas RIF', value: 'rifp'},
{label: 'Contratos inteligentes', value: 'sc'},
{label: 'Mining', value: 'mine'},
{label: 'Oráculos', value: 'oracles'},
]}>
<FilterItem
value="bridge, exchange"
title="Aplicación PowPeg"
subtitle="bridges"
color="orange"
linkHref="/resources/guides/powpeg-app/"
target="_blank"
linkTitle="Documentación"
description="Conecte Bitcoin y Rootstock usando la app 2 Way Peg."
/>
<FilterItem
value="bridge, cc"
title="Token Bridge"
subtitle="bridges"
color="orange"
linkHref="/resources/guides/tokenbridge/"
target="_blank"
linkTitle="Documentación"
description="Utilice el Token Bridge para mover de forma segura tokens ERC20 de Ethereum a Rootstock y viceversa."
/>
<FilterItem
value="dev-environment, sc, platform-infra"
title="Foundry"
subtitle="Entornos de Desarrollo"
color="orange"
linkHref="https://dev.rootstock.io/dev-tools/foundry/"
linkTitle="Implemente contratos inteligentes"
description="Foundry es una cadena de herramientas de desarrollo de contratos inteligentes, y un entorno de desarrollo fácil de usar para escribir y probar contratos inteligentes en Solidity."
/>
<FilterItem
value="dev-environment, sc"
title="Hardhat"
subtitle="Entornos de Desarrollo"
color="orange"
linkHref="/dev-tools/dev-environments/hardhat/"
linkTitle="Implemente contratos inteligentes"
description="Hardhat es un entorno de desarrollo de Ethereum para desarrolladores. Se usa principalmente en el desarrollo de contratos inteligentes para las cadenas compatibles con Rootstock y la Máquina virtual de Ethereum."
/>
<FilterItem
value="explorer, sc"
title="Explorer de Blockscout "
subtitle="Explorers"
color="orange"
linkHref="/dev-tools/explorers/blockscout/"
linkTitle="Utilice el Explorer"
description="Blockscout es una herramienta de código abierto para explorar transacciones en cualquier cadena de la máquina virtual de Ethereum, incluyendo Rootstock."
/>
<FilterItem
value="explorer, sc"
title="Explorer de Rootstock"
subtitle="Explorers"
color="orange"
linkHref="https://explorer.rootstock.io/"
linkTitle="Utilice el Explorer"
description="Explore transacciones, bloques, direcciones, tokens, estadísticas e interactúe con contratos inteligentes en el Explorer de Rootstock."
/>
<FilterItem
value="rpc"
title="API RPC"
subtitle="json rpc"
color="orange"
linkHref="/developers/rpc-api/rootstock/"
linkTitle="Haga su primera llamada de API"
description="La API RPC de Rootstock facilita una interfaz web fluida e intuitiva para que los desarrolladores interactúen con los nodos Rootstock mediante métodos JSON-RPC."
/>
<FilterItem
value="rpc"
title="Alchemy"
subtitle="json rpc"
color="orange"
linkHref="/developers/rpc-api/alchemy/"
linkTitle="Haga su primera llamada de API"
description="Potentes API, kits de desarrollo de software y herramientas para crear y escalar su aplicación web3 con facilidad."
/>
<FilterItem
value="rpc, smart contracts"
title="GetBlock"
subtitle="json rpc"
color="orange"
linkHref="https://getblock.io/nodes/rsk/"
linkTitle="Haga su primera llamada de API"
description="GetBlock proporciona conexión instantánea a nodos blockchain, incluyendo Rootstock, Bitcoin (BTC) y Ethereum (ETH), entre otros."
/>
<FilterItem
value="rpc, smart contracts"
title="NOWNodes"
subtitle="json rpc"
color="orange"
linkHref="https://nownodes.io/nodes/rsk"
linkTitle="Haga su primera llamada de API"
description="NOWNodes es una solución empresarial de blockchain como servicio que permite a los usuarios acceder a nodos completos y a los exploradores de Blockbook a través de una API."
/>
<FilterItem
value="wallet, sc"
title="MetaMask"
subtitle="wallets"
color="orange"
linkHref="/dev-tools/wallets/metamask/"
linkTitle="Utilice MetaMask"
description="Aprenda a crear y agregar tokens de Rootstock a MetaMask."
/>
<FilterItem
value="wallet, sc"
title="Rootstock Wallets"
subtitle="wallets"
color="orange"
linkHref="/dev-tools/wallets/"
linkTitle="Utilice Wallets"
description="Vea todas las wallets de Rootstock."
/>
<FilterItem
value="bridge, exchange"
title="Fast BTC de Sovryn"
subtitle="bridges"
color="orange"
linkHref="https://wiki.sovryn.com/en/sovryn-dapp/bridge"
linkTitle="Obtenga RBTC"
description="Sovryn es un sistema basado en contratos inteligentes sin custodia ni permisos tanto para prestar como para tomar préstamos de Bitcoin, así como para realizar operaciones con margen."
/>
<FilterItem
value="bridge, exchange"
title="Plataformas de intercambio de RBTC"
subtitle="Exchanges"
color="orange"
linkHref="https://rootstock.io/rbtc/"
linkTitle="Obtenga RBTC"
description="Plataformas de intercambio y bridges para conseguir RBTC."
/>
<FilterItem
value="bridge, exchange, rifp"
title="Plataformas de intercambio de RIF "
subtitle="Exchanges"
color="orange"
linkHref="https://rif.technology/rif-token/"
linkTitle="Obtenga tokens RIF"
description="Plataformas de intercambio y bridges para obtener tokens RIF."
/>
<FilterItem
value="exchange"
title="RIF on Chain"
subtitle="Exchanges"
color="orange"
linkHref="https://dapp.rifonchain.com/ipfs/QmWpKDzJ9fUECiiYkGHxqEXKh3CRUEzfvTxYoQonxFBK61/"
linkTitle="Cómo empezar"
description="Obtenga dólares digitales respaldados por criptomonedas para ahorrar, gastar y enviar. Acceda a RIF, USDRIF, MOC, RIF Pro y más."
/>
<FilterItem
value="bridge, exchange, rifp"
title="Flyover"
subtitle="bridges"
color="orange"
linkHref="/developers/integrate/flyover/"
linkTitle="Obtenga RBTC"
description="El protocolo Flyover realiza peg-ins y peg-outs rápidos entre las redes Bitcoin y Rootstock."
/>
<FilterItem
value="data"
title="The Graph"
subtitle="Datos y Analítica"
color="orange"
linkHref="/dev-tools/data/thegraph/"
linkTitle="Acceda a datos de la cadena"
description="Obtenga datos históricos sobre contratos inteligentes al crear dApps."
/>
<FilterItem
value="data"
title="Covalent"
subtitle="Datos y Analítica"
color="orange"
linkHref="https://www.covalenthq.com/docs/networks/rootstock/?utm_source=rootstock&utm_medium=partner-docs"
linkTitle="Acceda a datos de la cadena"
description="Covalent es una solución alojada de datos de blockchain que proporciona acceso a datos históricos y actuales en la cadena para más de 100 blockchains compatibles, incluido Rootstock."
/>
<FilterItem
value="data"
title="DefiLlama"
subtitle="Datos y Analítica"
color="orange"
linkHref="https://defillama.com/chain/Rootstock"
linkTitle="Acceda a datos de la cadena"
description="DefiLlama es el mayor agregador de Valor total bloqueado (TVL) en el espacio DeFi. Evalúa el TVL teniendo en cuenta el valor de los tokens bloqueados en los contratos de un protocolo o plataforma."
/>
<FilterItem
value="data"
title="Tenderly"
subtitle="Datos y Analítica"
color="orange"
linkHref="https://tenderly.co/"
linkTitle="Acceda a datos de la cadena"
description="Tenderly ayuda a los desarrolladores a crear, monitorear y mejorar los contratos inteligentes, proporcionando un conjunto de herramientas para aumentar la productividad, ahorrar tiempo y garantizar una funcionalidad eficiente de los contratos inteligentes."
/>
<FilterItem
value="platform-infra, sc, sdk"
title="Thirdweb"
subtitle="Plataformas"
color="orange"
linkHref="https://thirdweb.com/"
linkTitle="Utilice Thirdweb"
description="Thirdweb es una herramienta de desarrollo web3 full-stack, una plataforma de infraestructura de nivel de producción para que los desarrolladores construyan sobre Rootstock."
/>
<FilterItem
value="platform-infra, sc"
title="useDApp"
subtitle="Plataformas"
color="orange"
linkHref="https://usedapp.io/"
linkTitle="Construya con useDApp"
description="Construya una dApp en Rootstock usando la librería React de useDApp."
/>
<FilterItem
value="no-code, platform-infra, sc"
title="Forward Protocol"
subtitle="no-code"
color="orange"
linkHref="https://forwardprotocol.io/"
linkTitle="Construya una dApp sin código"
description="Cree una dApp en Rootstock utilizando las herramientas sin código de Forward Protocol."
/>
<FilterItem
value="library, sdk, rifp, abs"
title="RIF Relay"
subtitle="sdks"
color="orange"
linkHref="/developers/integrate/rif-relay/"
linkTitle="Integre RIF Relay"
description="RIF Relay es un sistema seguro de transacciones patrocinadas que permite a los usuarios pagar las tarifas de transacción usando tokens ERC-20."
/>
<FilterItem
value="dev-environment, sc"
title="Remix"
subtitle="Entornos de Desarrollo"
color="orange"
linkHref="https://remix.ethereum.org/"
linkTitle="Implemente contratos inteligentes"
description="Compile, implemente e interactúe con contratos inteligentes usando Remix."
/>
<FilterItem
value="library, sdk, wallet, rifp"
title="RIF Wallet"
subtitle="sdks"
color="orange"
linkHref="/developers/libraries/rif-wallet-libs/"
linkTitle="Integre RIF Wallet"
description="RIF Wallet es una billetera DeFi totalmente programable y extensible que permite a los desarrolladores y a las empresas crear experiencias Web3 intuitivas y seguras para sus usuarios finales."
/>
<FilterItem
value="data"
title="Estadísticas de Rootstock"
subtitle="Datos y Analítica"
color="orange"
linkHref="https://stats.rootstock.io/"
linkTitle="Vea las estadísticas"
description="Estadísticas de Rootstock."
/>
<FilterItem
value="faucet"
title="Faucet de Rootstock"
subtitle="faucets"
color="orange"
linkHref="https://faucet.rootstock.io/"
linkTitle="Obtenga tRBTC"
description="Obtenga tRBTC en el Faucet de Rootstock Testnet."
/>
<FilterItem
value="faucet, rifp"
title="Faucet de RIF Testnet"
subtitle="faucets"
color="orange"
linkHref="https://faucet.rifos.org/"
linkTitle="Obtenga tRIF"
description="Obtenga tRIF en el faucet RIF Testnet"
/>
<FilterItem
value="library, sc"
title="Ethers.js"
subtitle="library"
color="orange"
linkHref="https://web3js.readthedocs.io/en/v1.10.0/"
linkTitle="Utilice la librería Ethers.js"
description="Una librería para interactuar con la máquina virtual de Rootstock."
/>
<FilterItem
value="library, sc"
title="Web3.js"
subtitle="Librería (library de código)"
color="orange"
linkHref="https://docs.ethers.org/v5/"
linkTitle="Utilice la librería Web3.js"
description="Una librería para interactuar con la máquina virtual de Rootstock."
/>
<FilterItem
value="library, sdk, rifp"
title="RNS"
subtitle="name service"
color="orange"
linkHref="https://rns.rifos.org/"
linkTitle="Registre un nombre de dominio"
description="RNS proporciona una arquitectura que permite la identificación de direcciones de blockchain mediante nombres legibles por humanos."
/>
<FilterItem
value="code-quality, testing, sc"
title="SolidityScan"
subtitle="Calidad del Código"
color="orange"
linkHref="https://solidityscan.com/"
linkTitle="Proteja sus contratos inteligentes"
description="Proteja sus contratos inteligentes en Rootstock y reciba informes detallados con resultados precisos de la auditoría de seguridad."
/>
<FilterItem
value="code-quality, testing, sc"
title="Slither"
subtitle="Calidad del Código"
color="orange"
linkHref="https://github.com/crytic/slither"
linkTitle="Analice los contratos inteligente"
description="Slither, construido con Solidity y Vyper, es un marco de análisis estático escrito en Python3 que permite a los desarrolladores encontrar vulnerabilidades, mejorar su comprensión del código y crear rápidamente prototipos de análisis personalizados."
/>
<FilterItem
value="code-quality, testing, sc"
title="Sourcify"
subtitle="Calidad del Código"
color="orange"
linkHref="https://sourcify.dev"
linkTitle="Verifique sus contratos inteligentes"
description="Verifique contratos inteligentes en Rootstock. Sourcify permite interacciones de contratos inteligentes transparentes y legibles por humanos a través de la verificación automatizada de contratos Solidity y metadatos de contratos."
/>
<FilterItem
value="sc, rollups, aa, platform-infra"
title="Gelato"
subtitle="infra"
color="orange"
linkHref="https://gelato.network"
linkTitle="Implemente Rollups"
description="Implemente rollups L2 de nivel de producción y totalmente gestionados en Rootstock, integrados de forma nativa con herramientas como oracles, puentes, indexadores de datos y abstracción de cuentas."
/>
<FilterItem
value="mine, platform-infra"
title="Antpool"
subtitle="mining"
color="orange"
linkHref="https://www.antpool.com/home"
linkTitle="Comience a minar"
description="Comience a minar con Antpool."
/>
<FilterItem
value="platform-infra"
title="Vottun"
subtitle="infra"
color="orange"
linkHref="https://vottun.com"
linkTitle="Cómo empezar"
description="La arquitectura interoperable multiblockchain de Vottun está diseñada para facilitar el desarrollo de aplicaciones Web3 sin necesidad de comprender en profundidad la tecnología blockchain subyacente."
/>
<FilterItem
value="bridge, sc"
title="Wormhole"
subtitle="Cross-chain Bridges"
color="orange"
linkHref="https://docs.wormhole.com/wormhole"
linkTitle="Empiece a construir"
description="Construya e implemente una dApp multicadena en Rootstock."
/>
<FilterItem
value="data, sc"
title="Envio"
subtitle="data"
color="orange"
linkHref="https://envio.dev/"
linkTitle="Acceda a datos de la cadena"
description="Obtenga datos en la cadena al crear dApps en Rootstock."
/>
<FilterItem
value="mine"
title="F2Pool"
subtitle="mining"
color="orange"
linkHref="https://www.f2pool.com/"
linkTitle="Empieza a minar"
description="Pool de minería en Rootstock."
/>
<FilterItem
value="mine"
title="ViaBTC"
subtitle="mining"
color="orange"
linkHref="https://www.viabtc.com/"
linkTitle="Empieza a minar"
description="Pool de minería en Rootstock."
/>
<FilterItem
value="mine"
title="Luxor"
subtitle="mining"
color="orange"
linkHref="https://luxor.tech/mining"
linkTitle="Empieza a minar"
description="Pool de minería en Rootstock."
/>
<FilterItem
value="mine"
title="BraiinsPool"
subtitle="mining"
color="orange"
linkHref="https://braiins.com/pool"
linkTitle="Empieza a minar"
description="Pool de minería en Rootstock."
/>
<FilterItem
value="bridge"
title="Chainport"
subtitle="Cross-Chain Bridge"
color="orange"
linkHref="https://www.chainport.io/"
linkTitle="Cómo empezar"
description="Cross-chain bridge integrado con Rootstock."
/>
<FilterItem
value="data"
title="Tres Finance"
subtitle="Contabilidad"
color="orange"
linkHref="https://tres.finance/"
linkTitle="Cómo empezar"
description="Contabilidad, auditoría e informes Web3 en Rootstock."
/>
<FilterItem
value="demos, sc"
title="Kit de inicio de Wagmi"
subtitle="Demos"
color="orange"
linkHref="https://github.com/rsksmart/rsk-wagmi-starter-kit"
linkTitle="Utilice el kit"
description="Este kit de inicio ofrece una base para crear aplicaciones descentralizadas (dApps) en la blockchain de Rootstock utilizando las bibliotecas React, Wagmi y Shadcn."
/>
<FilterItem
value="demos, sc"
title="Kit de inicio de Hardhat"
subtitle="Demos"
color="orange"
linkHref="https://github.com/rsksmart/rootstock-hardhat-starterkit"
linkTitle="Utilice el kit"
description="Inicio en Hardhat de Rootstock."
/>
<FilterItem
value="demos, sdk, sc, aa"
title="Kit de abstracción de cuentas"
subtitle="Demos"
color="orange"
linkHref="https://github.com/rsksmart/rsk-wagmi-starter-kit/tree/aa-sdk"
linkTitle="Utilice el kit"
description="dApp de inicio de abstracción de cuentas utilizando Etherspot."
/>
<FilterItem
value="sdk, sc, aa, platform-infra"
title="Etherspot"
subtitle="Abstracción de Cuentas"
color="orange"
linkHref="https://etherspot.io/"
linkTitle="Utilice Etherspot"
description="Desarrollo de abstracción de cuentas en Rootstock."
/>
<FilterItem
value="demos, sc"
title="Automatización de dApp"
subtitle="Demos"
color="orange"
linkHref="/resources/tutorials/dapp-automation-cucumber/"
linkTitle="Automatice las dApps"
description="Aprenda a automatizar una dApp usando Cucumber y Playwright."
/>
<FilterItem
value="sc, oracles, data"
title="Redstone Finance"
subtitle="Oráculo"
color="orange"
linkHref="https://redstone.finance/"
linkTitle="Acceda a datos de la cadena"
description="Acceda a los datos de la cadena para sus contratos inteligentes en Rootstock."
/>
<FilterItem
value="cc, data"
title="Router Protocol"
subtitle="Cross Chain Bridges"
color="orange"
linkHref="https://routerprotocol.com/"
linkTitle="Construya dApps de cadena cruzada"
description="Router Protocol es una blockchain de capa 1 que permite la abstracción de cadenas."
/>
</Filter>
```
