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
    {label: 'Puentes', value: 'bridge'},
    {label: 'Kits de inicio', value: 'demos'},
    {label: 'Exchanges', value: 'exchange'},
    {label: 'Billeteras', value: 'wallet'},
    {label: 'Exploradores', value: 'explorer'},
    {label: 'Plataformas e Infraestructura', value: 'platform-infra'},
    {label: 'Cross Chain', value: 'cc'},
    {label: 'Datos', value: 'data'},
    {label: 'SDKs', value: 'sdk'},
    {label: 'Faucets', value: 'faucet'},
    {label: 'Gas', value: 'gas'},
    {label: 'Entornos de desarrollo', value: 'dev-environment'},
    {label: 'Abstracción de cuentas', value: 'aa'},
    {label: 'Calidad de código', value: 'code-quality'},
    {label: 'JSON-RPC', value: 'rpc'},
    {label: 'Librerías', value: 'library'},
    {label: 'Sin código', value: 'no-code'},
    {label: 'Herramientas RIF', value: 'rifp'},
    {label: 'Contratos inteligentes', value: 'sc'},
    {label: 'Minería', value: 'mine'},
    {label: 'Oráculos', value: 'oracles'},
    {label: 'Acreditaciones', value: 'attest'},
  ]}>
<FilterItem
    value="bridge, exchange"
    title="PowPeg App"
    subtitle="puentes"
    color="orange"
    linkHref="/resources/guides/powpeg-app/"
    target="_blank"
    linkTitle="Documentación"
    description="Establece puentes entre Bitcoin y Rootstock mediante la aplicación PowPeg."
  />
<FilterItem
    value="bridge, cc"
    title="Puente de tokens"
    subtitle="puentes"
    color="orange"
    linkHref="/resources/guides/tokenbridge/"
    target="_blank"
    linkTitle="Documentación"
    description="Utilice el puente de tokens para mover de forma segura tokens ERC20 de Ethereum a Rootstock y viceversa."
  />
<FilterItem
    value="dev-environment, sc, platform-infra"
    title="Foundry"
    subtitle="Entornos de desarrollo"
    color="orange"
    linkHref="https://dev.rootstock.io/dev-tools/foundry/"
    linkTitle="Despliegue de contratos inteligentes"
    description="Foundry es una cadena de herramientas de desarrollo de contratos inteligentes y un entorno de desarrollo fácil de usar para escribir y probar contratos inteligentes en Solidity."
  />
<FilterItem
    value="dev-environment, sc"
    title="Hardhat"
    subtitle="Entornos de desarrollo"
    color="orange"
    linkHref="/dev-tools/dev-environments/hardhat/"
    linkTitle="Despliegue de contratos inteligentes"
    description="Hardhat es un entorno de desarrollo de Ethereum para desarrolladores. Se utiliza principalmente en el desarrollo de contratos inteligentes para las cadenas compatibles con Rootstock y EVM."
  />
<FilterItem
    value="explorer, sc"
    title="Explorador Blockscout"
    subtitle="Exploradores"
    color="orange"
    linkHref="/dev-tools/explorers/blockscout/"
    linkTitle="Usar el explorador"
    description="Blockscout es una herramienta de código abierto para explorar transacciones en cualquier cadena EVM, incluida Rootstock."
  />
<FilterItem
    value="explorer, sc"
    title="Explorador de Rootstock"
    subtitle="Exploradores"
    color="orange"
    linkHref="/dev-tools/explorers/rootstock/"
    linkTitle="Use the Explorer"
    description="Explore transacciones, bloques, direcciones, tokens, estadísticas e interactúe con contratos inteligentes en el Explorador de Rootstock."
  />
<FilterItem
    value="explorer, sc"
    title="Rootstock Blockchair"
    subtitle="Exploradores"
    color="orange"
    linkHref="/dev-tools/explorers/blockchair/"
    linkTitle="Use the Explorer"
    description="El explorador de Blockchair es un motor de búsqueda y análisis de blockchain para Rootstock y más de 40 cadenas. Incorpora una multitud de diferentes blockchains en un solo motor de búsqueda."
  />
<FilterItem
    value="explorer, sc"
    title="3xpl"
    subtitle="Exploradores"
    color="orange"
    linkHref="/dev-tools/explorers/3xpl/"
    linkTitle="Utilice el explorador"
    description="3xpl (abreviatura de 3xplor3r) es un explorador universal y superrápido para Rootstock. Ofrece una interfaz de explorador de bloques fácil de entender para usuarios de criptografía principiantes, así como un montón de características profesionales para desarrolladores y analistas."
  />
<FilterItem
    value="rpc"
    title="API RPC"
    subtitle="json rpc"
    color="orange"
    linkHref="/developers/rpc-api/rootstock/"
    linkTitle="Realice la primera llamada a la API"
    description="La API RPC de Rootstock proporciona una interfaz web fluida e intuitiva para que los desarrolladores interactúen con los nodos de Rootstock a través de métodos JSON-RPC."
  />
<FilterItem
    value="rpc"
    title="Alchemy"
    subtitle="json rpc"
    color="orange"
    linkHref="/developers/rpc-api/alchemy/"
    linkTitle="Realice la primera llamada a la API"
    description="Potentes API, SDK y herramientas para crear y ampliar su aplicación web3 con facilidad."
  />
<FilterItem
    value="rpc, smart contracts"
    title="GetBlock"
    subtitle="json rpc"
    color="orange"
    linkHref="/dev-tools/node-rpc/getblock/"
    linkTitle="Realiza la primera llamada a la API"
    description="GetBlock proporciona conexión instantánea a nodos blockchain, incluyendo Rootstock, Bitcoin (BTC), Ethereum (ETH), entre otros."
  />
<FilterItem
    value="rpc, smart contracts"
    title="NOWNodes"
    subtitle="json rpc"
    color="orange"
    linkHref="/dev-tools/node-rpc/nownodes/"
    linkTitle="Make First API Call"
    description="NOWNodes es una solución empresarial de blockchain como servicio que permite a los usuarios acceder a Nodos completos y Exploradores de blockchain a través de una API."
  />
<FilterItem
    value="rpc, smart contracts"
    title="dRPC"
    subtitle="json rpc"
    color="orange"
    linkHref="/dev-tools/node-rpc/drpc/"
    linkTitle="Realiza la primera llamada a la API"
    description="dRPC proporciona acceso a una red distribuida de proveedores de nodos."
  />
<FilterItem
    value="rpc"
    title="Blast API"
    subtitle="json rpc"
    color="orange"
    linkHref="/dev-tools/node-rpc/blast-api/"
    linkTitle="Make First API Call"
    description="Blast API es una infraestructura en la nube optimizada para Blockchain para servicios RPC rentables y de baja latencia."
  />
<FilterItem
    value="wallet, sc"
    title="MetaMask"
    subtitle="carteras"
    color="orange"
    linkHref="/dev-tools/wallets/metamask/"
    linkTitle="Use MetaMask"
    description="Aprenda a crear y añadir tokens Rootstock a MetaMask."
  />
<FilterItem
    value="wallet, sc"
    title="Carteras Rootstock"
    subtitle="carteras"
    color="orange"
    linkHref="/dev-tools/wallets/"
    linkTitle="Usar carteras"
    description="Ver todas las carteras Rootstock."
  />
<FilterItem
    value="bridge, exchange"
    title="Sovryn Fast BTC"
    subtitle="puentes"
    color="orange"
    linkHref="https://wiki.sovryn.com/en/sovryn-dapp/bridge"
    linkTitle="Obtener RBTC"
    description="Sovryn es un sistema basado en contratos inteligentes sin custodia ni permisos para préstamos, préstamos y comercio de márgenes de Bitcoin."
  />
<FilterItem
    value="bridge, exchange"
    title="Intercambios RBTC"
    subtitle="Intercambios"
    color="orange"
    linkHref="https://rootstock.io/rbtc/"
    linkTitle="Consigue RBTC"
    description="Intercambios y puentes para conseguir RBTC."
  />
<FilterItem
    value="bridge, exchange, rifp"
    title="Intercambios RIF"
    subtitle="Intercambios"
    color="orange"
    linkHref="https://rif.technology/rif-token/"
    linkTitle="Obtener tokens RIF"
    description="Intercambios y puentes para obtener el token RIF."
  />
<FilterItem
    value="exchange"
    title="RIF on Chain"
    subtitle="Exchanges"
    color="orange"
    linkHref="https://dapp.rifonchain.com/ipfs/QmWpKDzJ9fUECiiYkGHxqEXKh3CRUEzfvTxYoQonxFBK61/"
    linkTitle="Get Started"
    description="Accede a criptodólares digitales colaterizados para ahorrar, gastar y enviar. Consigue RIF, USDRIF, MOC, RIF Pro, etc."
  />
   <FilterItem
    value="sdk"
    title="RSK CLI"
    subtitle="desarrollo de contratos inteligentes"
    color="orange"
    linkHref="/developers/smart-contracts/rsk-cli/"
    linkTitle="Primeros pasos con RSK CLI"
    description="La herramienta rsk-cli o sdk permite a los usuarios gestionar carteras, comprobar saldos, enviar transacciones, verificar contratos inteligentes e interactuar con contratos inteligentes en la blockchain de Rootstock, una cadena lateral de Bitcoin diseñada para contratos inteligentes. Es compatible tanto con entornos mainnet como testnet."
  />
<FilterItem
    value="bridge, exchange, rifp"
    title="RBTC Flyover"
    subtitle="bridges"
    color="orange"
    linkHref="/developers/integrate/flyover/"
    linkTitle="Get RBTC"
    description="El protocolo Flyover realiza rápidos peg-ins y peg-outs entre las redes Bitcoin y Rootstock."
  />
<FilterItem
    value="data"
    title="The Graph"
    subtitle="data & analytics"
    color="orange"
    linkHref="/dev-tools/data/thegraph/"
    linkTitle="Access on-chain data"
    description="Obtenga datos históricos sobre contratos inteligentes al crear dApps."
  />
<FilterItem
    value="data"
    title="Covalent"
    subtitle="data & analytics"
    color="orange"
    linkHref="https://www.covalenthq.com/docs/networks/rootstock/?utm_source=rootstock&utm_medium=partner-docs"
    linkTitle="Access on-chain data"
    description="Covalent es una solución alojada de datos de blockchain que proporciona acceso a datos históricos y actuales de más de 100 blockchains compatibles, incluido Rootstock."
  />
<FilterItem
    value="data"
    title="DefiLlama"
    subtitle="data & analytics"
    color="orange"
    linkHref="https://defillama.com/chain/Rootstock"
    linkTitle="Access on-chain data"
    description="DefiLlama es el mayor agregador de valor total bloqueado (TVL) en el espacio DeFi. Evalúa el TVL teniendo en cuenta el valor de los tokens bloqueados dentro de los contratos de un protocolo o plataforma."
  />
<FilterItem
    value="data"
    title="Tenderly"
    subtitle="data & analytics"
    color="orange"
    linkHref="https://tenderly.co/"
    linkTitle="Access on-chain data"
    description="Tenderly ayuda a los desarrolladores a construir, supervisar y mejorar los contratos inteligentes proporcionando un conjunto de herramientas para aumentar la productividad, ahorrar tiempo y garantizar una funcionalidad eficiente de los contratos inteligentes."
  />
<FilterItem
    value="platform-infra, sc, sdk"
    title="Thirdweb"
    subtitle="plataformas"
    color="orange"
    linkHref="https://thirdweb.com/"
    linkTitle="Usar Thirdweb"
    description="Thirdweb es una plataforma de infraestructura de grado de producción y herramientas de desarrollo web3 Full-stack para que los desarrolladores construyan sobre Rootstockk."
  />

<FilterItem
    value="platform-infra, sc"
    title="useDApp"
    subtitle="plataformas"
    color="orange"
    linkHref="https://usedapp.io/"
    linkTitle="Construye con useDApp"
    description="Construye una dApp en Rootstock utilizando la librería useDApp React."
  />
<FilterItem
    value="no-code, platform-infra, sc"
    title="Forward Protocol"
    subtitle="no-code"
    color="orange"
    linkHref="https://forwardprotocol.io/"
    linkTitle="Construye una dApp sin código"
    description="Construye una dApp en Rootstock utilizando las herramientas sin código de Forward Protocol."
  />
<FilterItem
    value="no-code, platform-infra, sc"
    title="CryptoDO"
    subtitle="no-code"
    color="orange"
    linkHref="https://www.cryptodo.app/"
    linkTitle="Construye una dApp multicadena sin código"
    description="CryptoDo es un constructor de soluciones web3 multicadena sin código para empresas."
  />
<FilterItem
    value="library, sdk, rifp, abs"
    title="RIF Relay"
    subtitle="sdks"
    color="orange"
    linkHref="/developers/integrate/rif-relay/"
    linkTitle="Integrar RIF Relay"
    description="RIF Relay es un sistema seguro de transacciones patrocinadas que permite a los usuarios pagar tasas de transacción utilizando tokens ERC-20."
  />
<FilterItem
    value="dev-environment, sc"
    title="Remix"
    subtitle="Entornos de desarrollo"
    color="orange"
    linkHref="https://remix.ethereum.org/"
    linkTitle="Implementar contratos inteligentes"
    description="Compilar, interactuar e implementar contratos inteligentes con Remix."
  />
<FilterItem
    value="library, sdk, wallet, rifp"
    title="RIF Wallet"
    subtitle="sdks"
    color="orange"
    linkHref="/developers/libraries/rif-wallet-libs/"
    linkTitle="Integrar RIF Wallet"
    description="RIF wallet es un monedero DeFi totalmente programable y extensible que permite a desarrolladores y empresas construir experiencias Web3 intuitivas y seguras para sus usuarios finales."
  />
<FilterItem
    value="gas"
    title="Blocknative Gas Price API"
    subtitle="gas"
    color="orange"
    linkHref="/dev-tools/gas/blocknative/"
    linkTitle="API del precio del gas"
    description="Estimación precisa del precio del gas en el siguiente bloque."
  />
<FilterItem
    value="data"
    title="Estadísticas del portainjertos"
    subtitle="datos y análisis"
    color="orange"
    linkHref="https://stats.rootstock.io/"
    linkTitle="Ver estadísticas"
    description="Estadísticas del portainjertos."
  />
<FilterItem
    value="faucet"
    title="Grifo Rootstock"
    subtitle="grifos"
    color="orange"
    linkHref="https://faucet.rootstock.io/"
    linkTitle="Obtener tRBTC"
    description="Obtener tRBTC en el grifo Rootstock Testnet."
  />
<FilterItem
    value="faucet, rifp"
    title="Grifo RIF Testnet"
    subtitle="grifos"
    color="orange"
    linkHref="https://faucet.rifos.org/"
    linkTitle="Obtener tRIF"
    description="Obtener tRIF en el grifo RIF Testnet"
  />
<FilterItem
    value="faucet"
    title="Grifo de chorro"
    subtitle="grifos"
    color="orange"
    linkHref="https://blastapi.io/faucets/rootstock-testnet"
    linkTitle="Consigue tRBTC"
    description="Este grifo ofrece una forma cómoda de conseguir tokens RBTC de prueba gratuitos para desarrollo y pruebas. Tiene una asignación de tokens diaria máxima más alta de `0,1` tRBTC."
  />
<FilterItem
    value="faucet"
    title="Thirdweb Faucet"
    subtitle="faucets"
    color="orange"
    linkHref="https://thirdweb.com/rootstock-testnet"
    linkTitle="Get tRBTC"
    description="Este faucet ofrece una forma cómoda de conseguir tokens RBTC de prueba gratuitos para desarrollo y pruebas. Su asignación máxima diaria de tokens es de `0,01` tRBTC."
  />
<FilterItem
    value="library, sc"
    title="Ethers.js"
    subtitle="library"
    color="orange"
    linkHref="https://web3js.readthedocs.io/en/v1.10.0/"
    linkTitle="Use Ethers.js Library"
    description="Una librería para interactuar con la máquina virtual Rootstock."
  />
<FilterItem
    value="library, sc"
    title="Web3.js"
    subtitle="biblioteca"
    color="orange"
    linkHref="https://docs.ethers.org/v5/"
    linkTitle="Utilizar biblioteca Web3.js"
    description="Una biblioteca para interactuar con la máquina virtual del patrón raíz."
  />
<FilterItem
    value="library, sdk, rifp"
    title="RNS"
    subtitle="servicio de nombres"
    color="orange"
    linkHref="https://rns.rifos.org/"
    linkTitle="Registrar un nombre de dominio"
    description="RNS proporciona una arquitectura que permite la identificación de direcciones blockchain mediante nombres legibles por humanos."
  />
<FilterItem
    value="code-quality, testing, sc"
    title="SolidityScan"
    subtitle="calidad del código"
    color="orange"
    linkHref="https://solidityscan.com/"
    linkTitle="Proteger contratos inteligentes"
    description="Proteja sus contratos inteligentes en Rootstock y obtenga resultados precisos de auditorías de seguridad e informes detallados."
  />
<FilterItem
    value="code-quality, testing, sc"
    title="Slither"
    subtitle="calidad del código"
    color="orange"
    linkHref="https://github.com/crytic/slither"
    linkTitle="Analizar contratos inteligentes"
    description="Slither, desarrollado con el marco de análisis estático Solidity & Vyper escrito en Python3, permite a los desarrolladores encontrar vulnerabilidades, mejorar la comprensión del código y crear rápidamente prototipos de análisis personalizados."
  />
<FilterItem
    value="code-quality, testing, sc"
    title="Sourcify"
    subtitle="calidad del código"
    color="orange"
    linkHref="https://sourcify.dev"
    linkTitle="Verificar contratos inteligentes"
    description="Verificar contratos inteligentes en Rootstock, Sourcify permite interacciones de contratos inteligentes transparentes y legibles por humanos mediante la verificación automatizada de contratos Solidity, metadatos de contratos."
  />
<FilterItem
    value="sc, rollups, aa, platform-infra"
    title="Gelato"
    subtitle="infra"
    color="orange"
    linkHref="https://gelato.network"
    linkTitle="Despliegue de rollups"
    description="Despliegue de rollups L2 de nivel de producción y con todos los servicios en Rootstock, integrados de forma nativa con herramientas como oráculos, puentes, indexadores de datos y abstracción de cuentas."
  />
<FilterItem
    value="mine, platform-infra"
    title="Antpool"
    subtitle="minar"
    color="orange"
    linkHref="https://www.antpool.com/home"
    linkTitle="Empezar a minar"
    description="Empezar a minar con Antpool."
  />
<FilterItem
    value="platform-infra"
    title="Vottun"
    subtitle="infra"
    color="orange"
    linkHref="https://vottun.com"
    linkTitle="Empezar"
    description="La arquitectura interoperable multi-blockchain de Vottun está construida para facilitar el desarrollo de aplicaciones Web3 sin necesidad de entender gran parte de la tecnología blockchain subyacente."
  />
<FilterItem
    value="platform-infra"
    title="WakeUp Labs"
    subtitle="infra"
    color="orange"
    linkHref="https://platform.wakeuplabs.io"
    linkTitle="Get Started"
    description="WakeUp Labs es un estudio de desarrollo de software que ayuda a Blockchains compatibles con EVM, DAOs y organizaciones tradicionales a superar retos técnicos y acelerar el desarrollo de productos."
  />
<FilterItem
    value="bridge, sc"
    title="Wormhole"
    subtitle="Cross-chain Bridges"
    color="orange"
    linkHref="https://docs.wormhole.com/wormhole"
    linkTitle="Start Building"
    description="Construye y despliega una dApp multicadena en Rootstock."
  />
<FilterItem
    value="data, sc"
    title="Envio"
    subtitle="data"
    color="orange"
    linkHref="https://envio.dev/"
    linkTitle="Access on-chain data"
    description="Obtener datos de la cadena al crear dApps en Rootstock."
  />
<FilterItem
    value="mine"
    title="F2Pool"
    subtitle="mining"
    color="orange"
    linkHref="https://www.f2pool.com/"
    linkTitle="Start Mining"
    description="Pool de minería en Rootstock."
  />
<FilterItem
    value="mine"
    title="ViaBTC"
    subtitle="mining"
    color="orange"
    linkHref="https://www.viabtc.com/"
    linkTitle="Start Mining"
    description="Pool de minería en Rootstock."
  />
<FilterItem
    value="mine"
    title="Luxor"
    subtitle="minería"
    color="orange"
    linkHref="https://luxor.tech/mining"
    linkTitle="Iniciar minería"
    description="Pool de minería en el patrón."
  />
<FilterItem
    value="mine"
    title="BraiinsPool"
    subtitle="minería"
    color="orange"
    linkHref="https://braiins.com/pool"
    linkTitle="Iniciar minería"
    description="Pool de minería en Rootstock."
  />
<FilterItem
    value="bridge"
    title="Chainport"
    subtitle="Puente entre cadenas"
    color="orange"
    linkHref="https://www.chainport.io/"
    linkTitle="Comenzar"
    description="Puente entre cadenas integrado con Rootstock."
  />
<FilterItem
    value="data"
    title="Tres Finance"
    subtitle="Accounting"
    color="orange"
    linkHref="https://tres.finance/"
    linkTitle="Get Started"
    description="Contabilidad, auditoría e informes Web3 en Rootstock."
  />
<FilterItem
    value="demos, sc"
    title="Kit de inicio de Wagmi"
    subtitle="Demos"
    color="orange"
    linkHref="/developers/quickstart/wagmi/"
    linkTitle="Utiliza el kit"
    description="Este kit de inicio proporciona una base para crear aplicaciones descentralizadas (dApps) en la blockchain Rootstock utilizando las bibliotecas React, Wagmi y Shadcn."
  />
<FilterItem
    value="demos, sc"
    title="Kit de inicio Reown-Wagmi"
    subtitle="Demos"
    color="orange"
    linkHref="/developers/quickstart/reown/"
    linkTitle="Use the Kit"
    description="Este kit de inicio proporciona una base para crear aplicaciones descentralizadas (dApps) en la blockchain Rootstock utilizando las bibliotecas React, Reown, Wagmi y Shadcn."
  />
<FilterItem
    value="demos, sc"
    title="Privy Starter Kit"
    subtitle="Demos"
    color="orange"
    linkHref="/developers/quickstart/privy/"
    linkTitle="Use the Kit"
    description="El Privy Starter Kit de Rootstock permite a los desarrolladores incorporar usuarios con inicios de sesión sociales y monederos de autocustodia a la vez que se preserva el control, privacidad y flexibilidad para dApps al construir sobre Rootstock."
  />
<FilterItem
    value="demos, sc"
    title="Kit de inicio Hardhat"
    subtitle="Demos"
    color="orange"
    linkHref="/developers/quickstart/hardhat/"
    linkTitle="Use the Kit"
    description="Kit de inicio Hardhat de Rootstock."
  />
<FilterItem
    value="demos, sc"
    title="Web3Auth Starter Kit"
    subtitle="Demos"
    color="orange"
    linkHref="/developers/quickstart/web3auth/"
    linkTitle="Use the Kit"
    description="Cree dApps sin contraseña en Rootstock utilizando el Kit de inicio Web3Auth de Rootstock."
  />
<FilterItem
    value="demos, sc"
    title="Kit de inicio dinámico"
    subtitle="Demos"
    color="orange"
    linkHref="/developers/quickstart/dynamic/"
    linkTitle="Use the Kit"
    description="Kit de inicio dinámico de Rootstock."
  />
<FilterItem
    value="demos, sc"
    title="Kit de inicio de ignición de cascos"
    subtitle="Demos"
    color="orange"
    linkHref="/developers/quickstart/hardhat-ignition/"
    linkTitle="Use the Kit"
    description="Kit de inicio de ignición de cascos Rootstock."
  />
<FilterItem
    value="demos, sdk, sc, aa"
    title="Kit de Abstracción de Cuenta"
    subtitle="Demos"
    color="orange"
    linkHref="/developers/quickstart/rootstock-etherspot/"
    linkTitle="Usa el Kit"
    description="DApp de Arranque de Abstracción de Cuenta usando Etherspot."
  />
<FilterItem
    value="sdk, sc, aa, platform-infra"
    title="Etherspot"
    subtitle="Account Abstraction"
    color="orange"
    linkHref="https://etherspot.io/"
    linkTitle="Usa Etherspot"
    description="Desarrollo de Account Abstraction en Rootstock."
  />
<FilterItem
    value="demos, sc"
    title="Automatización de dApps"
    subtitle="Demos"
    color="orange"
    linkHref="/resources/tutorials/dapp-automation-cucumber/"
    linkTitle="Automatizar dApps"
    description="Aprende a automatizar dApps usando Cucumber y Playwright."
  />
<FilterItem
    value="sc, oracles, data"
    title="Umbrella Network"
    subtitle="Oracles"
    color="orange"
    linkHref="https://umb.network/"
    linkTitle="Access On-chain Data"
    description="Accede a datos On-Chain para tus contratos inteligentes en Rootstock."
  />
<FilterItem
    value="sc, oracles, data"
    title="Redstone Finance"
    subtitle="Oracles"
    color="orange"
    linkHref="https://redstone.finance/"
    linkTitle="Acceder a datos en cadena"
    description="Acceder a datos en cadena para sus contratos inteligentes en Rootstock."
  />
  <FilterItem
    value="cc, data"
    title="Router Protocol"
    subtitle="Cross Chain Bridges"
    color="orange"
    linkHref="https://routerprotocol.com/"
    linkTitle="Build Cross Chain dApps"
    description="Router Protocol es una abstracción de cadena de habilitación de blockchain de capa 1."
  />
  <FilterItem
    value="cc, data"
    title="Layerzero"
    subtitle="Cross Chain Bridges"
    color="orange"
    linkHref="/developers/use-cases/rootstock-layerzero/"
    linkTitle="Build Cross Chain dApps"
    description="LayerZero, un protocolo de mensajería entre cadenas que permite el movimiento fluido de activos respaldados por Bitcoin desde Rootstock a otras blockchains, permitiendo a los desarrolladores crear aplicaciones omnichain (OApps) que interactúan a través de múltiples cadenas como si fueran una sola."
  />
  <FilterItem
    value="attest"
    title="Servicio de atestación de Rootstock (RAS)"
    subtitle="Attestations"
    color="orange"
    linkHref="/dev-tools/attestations/ras/"
    linkTitle="Attest Now"
    description="El Servicio de atestación de Rootstock (RAS) es un sistema que permite a individuos y organizaciones crear afirmaciones o pruebas verificables sobre eventos específicos, acciones o datos, ya sea en la cadena (en la cadena de bloques) o fuera de ella (fuera de la cadena de bloques pero vinculada a ella). Aprenda a utilizarlo en Rootstock."
  />
</Filter>
```
