---
sidebar_label: Inicio rápido
sidebar_position: 4
title: Inicio rápido
tags:
  - rsk
  - portainjertos
  - principiante
  - inicio rápido
  - desarrolladores
  - avanzado
  - puerto a Rootstock
  - tutoriales
description: Inicios rápidos, demostraciones y kits de inicio para desarrollar en Rootstock.
---

```mdx-code-block
<Filter
values={[
  {label: 'Principiante', value: 'beginner'},
  {label: 'Avanzado', value: 'advanced'},
  {label: 'Hardhat', value: 'hardhat'},
  {label: 'Remix', value: 'remix'},
  {label: 'Wagmi', value: 'wagmi'},
  {label: 'Reown', value: 'reown'},
  {label: 'Datos on-chain', value: 'data'},
  {label: 'API RPC', value: 'rpc'},
  {label: 'Migrar a Rootstock', value: 'port-dapps'}
]}>
<FilterItem
    value="principiante, avanzado"
    title="Kit de inicio de Vyper"
    subtitle="inicio rápido"
    color="orange"
    linkHref="/developers/quickstart/rootstock-vyper/"
    linkTitle="Utilizar el kit"
    description="El kit de inicio de Vyper de Rootstock demuestra cómo desplegar contratos inteligentes escritos en Vyper en la red Rootstock."
  />
  <FilterItem
    value="beginner, Advanced"
    title="Kit de inicio Privy"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/privy/"
    linkTitle="Use the Kit"
    description="El Kit de inicio Privy de Rootstock permite a los desarrolladores incorporar usuarios con inicios de sesión sociales y monederos de autocustodia a la vez que se preserva el control, privacidad y flexibilidad para dApps al construir sobre Rootstock."
  />
  <FilterItem
    value="dynamic, wagmi, advanced"
    title="Kit de inicio dinámico"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/dynamic/"
    linkTitle="Use the Kit"
    description="El Kit de inicio dinámico utiliza la biblioteca Wagmi para una integración más rápida de las funciones Web3 en una aplicación Next.js."
  />
  <FilterItem
    value="beginner, web3auth, advanced"
    title="Web3Auth Starter Kit"
    subtitle="web3auth"
    color="orange"
    linkHref="/developers/quickstart/web3auth/"
    linkTitle="Get Started"
    description="Una guía paso a paso para desarrolladores para construir y desplegar dApps sin contraseña en Rootstock usando Web3Auth y Wagmi."
  />
<FilterItem
    value="wagmi, beginner"
    title="Kit de inicio de Wagmi"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/wagmi/"
    linkTitle="Use the Kit"
    description="Este kit de inicio proporciona una base para crear aplicaciones descentralizadas (dApps) en la blockchain de Rootstock utilizando las bibliotecas React, Wagmi y Shadcn."
  />
<FilterItem
    value="reown, beginner"
    title="Kit de inicio de Reown"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/reown/"
    linkTitle="Use the Kit"
    description="Este kit de inicio proporciona una base para crear aplicaciones descentralizadas (dApps) en la blockchain Rootstock utilizando React, Reown, Wagmi y bibliotecas Shadcn."
  />
<FilterItem
    value="hardhat, beginner"
    title="Hardhat Starter Kit"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/hardhat/"
    linkTitle="Use the Kit"
    description="Ejemplos de contratos inteligentes, pruebas, implementaciones y tareas para estándares ERC comunes (ERC20, ERC721, ERC1155)."
  />
<FilterItem
    value="hardhat, principiante"
    title="Kit de inicio de Hardhat Ignition"
    subtitle="inicio rápido"
    color="orange"
    linkHref="/developers/quickstart/hardhat-ignition/"
    linkTitle="Utilice el kit"
    description="Esta guía está diseñada para ayudarle a implementar contratos inteligentes en la blockchain Rootstock, centrándose en el uso de Hardhat Ignition."
  />
<FilterItem
    value="foundry, sc, beginner"
    title="Foundry Starter Kit"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/foundry/"
    linkTitle="Use the Kit"
    description="Ejemplos de contratos inteligentes, pruebas, despliegues y tareas para estándares ERC comunes (ERC20, ERC721, ERC1155)."
  />
<FilterItem
    value="wagmi, sc, advanced"
    value="wagmi, advanced"
    title="Kit de Abstracción de Cuentas"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/quickstart/rootstock-etherspot/"
    linkTitle="Utiliza el Kit"
    description="Kit de Inicio de Abstracción de Cuentas utilizando Etherspot."
  />
<FilterItem
    value="advanced"
    title="Automatización de dApps con Cucumber"
    subtitle="quickstart"
    color="orange"
    linkHref="/resources/tutorials/dapp-automation-cucumber/"
    linkTitle="Automatiza dApps"
    description="Aprende a automatizar dApps usando Cucumber Agile Automation Framework."
  />
<FilterItem
    value="advanced"
    title="RIF Relay Starter Kit"
    subtitle="quickstart"
    color="orange"
    linkHref="/developers/integrate/rif-relay/sample-dapp/"
    linkTitle="Use Kit"
    description="Kit de inicio para desarrollar en RIF Relay."
  />
<FilterItem
    value="data, advanced"
    title="Get Started with The Graph"
    subtitle="quickstart"
    color="orange"
    linkHref="/dev-tools/data/thegraph/"
    linkTitle="Get Started"
    description="Consulta fácil de datos en cadena a través de una red descentralizada de indexadores"
  />
<FilterItem
    value="beginner"
    title="Get Started with Web3.py"
    subtitle="Web3.py"
    color="orange"
    linkHref="/developers/quickstart/web3-python/"
    linkTitle="Empiece"
    description="Empiece a desplegar e interactuar con contratos inteligentes en Rootstock utilizando Web3.py."
  />
  <FilterItem
    value="beginner, advanced, port-dapps"
    title="Portar una dApp de Ethereum a Rootstock"
    subtitle="Portar dApps"
    color="orange"
    linkHref="/resources/port-to-rootstock/ethereum-dapp"
    linkTitle="Empiece"
    description="Aprenda a portar una dApp de Ethereum a Rootstock."
  />
  <FilterItem
    value="beginner, remix"
    title="Despliega, interactúa y verifica contratos inteligentes usando Remix y Rootstock Explorer"
    subtitle="Remix"
    color="orange"
    linkHref="/developers/quickstart/remix/"
    linkTitle="Usa Remix"
    description="En esta guía, utilizaremos el IDE Remix para escribir, compilar, desplegar, interactuar y verificar un contrato inteligente en el Rootstock Explorer."
  />
  <FilterItem
    value="principiante, avanzado"
    title="Primeros pasos con Apeworx"
    subtitle="Ape"
    color="orange"
    linkHref="/developers/quickstart/ape/"
    linkTitle="Utiliza Ape"
    description="Aprende a compilar, desplegar e interactuar con contratos inteligentes con Ape en Rootstock"
  />
  <FilterItem
    value="beginner, rpc"
    title="Primeros pasos con la API RPC de Rootstock"
    subtitle="API RPC"
    color="orange"
    linkHref="/developers/rpc-api/rootstock/setup/"
    linkTitle="Utilice la API RPC"
    description="El servicio RPC de Rootstock proporciona una interfaz web intuitiva y sin fisuras para que los desarrolladores interactúen con los nodos Rootstock a través de métodos JSON-RPC."
  />
    <FilterItem
    value="beginner, rpc"
    title="Primeros pasos con Alchemy"
    subtitle="API RPC"
    color="orange"
    linkHref="/developers/rpc-api/alchemy/"
    linkTitle="Utilice la API RPC"
    description="Una guía paso a paso para que los desarrolladores interactúen con la red Rootstock con el servicio de proveedor RPC Alchemy."
  />
</Filter>
```
