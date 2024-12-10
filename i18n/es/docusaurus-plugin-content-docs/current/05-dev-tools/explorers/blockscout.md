---
sidebar_position: 2
sidebar_label: Explorador de exploración de bloques
title: Comienza con el Explorador de Blockscout Rootstock
tags:
  - rsk
  - explorador
  - rootstock
  - Blockscout
  - contratos inteligentes
  - transacciones
  - herramientas
---

[Blockscout](https://rootstock.blockscout.com/) es una herramienta de código abierto robusta para explorar transacciones en cualquier blockchain de EVM, incluyendo Rootstock, la cadena side1 de Bitcoin. Con Blockscout, puede acceder a información profunda, verificar e interactuar con contratos inteligentes, crear y administrar su cuenta, ver estadísticas avanzadas y más.

<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-1.png" alt="Roostock blockscout page"/></div>

Para usar Blockscout con Rootstock, visita [Rootstock Block Explorer](https://rootstock.blockscout.com/), donde puedes ver los últimos bloques, transacciones, y direcciones en la red Rootstock.

### Buscar información específica

Puede buscar una transacción específica introduciendo la dirección de la billetera, número de bloque de transacción hash o token en la barra de búsqueda en el panel superior de la página de Rootstock Blockscout.

<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-search.png" alt="search section"/></div>

### Reseñas

Las cuadrículas que se muestran debajo de la barra de búsqueda muestran una visión general de varios componentes en la plataforma Rootstock. Puede ver los bloques totales en la red y las transacciones totales. Puede hacer clic en la cuadrícula correspondiente para ver la lista de bloques o transacciones. De la misma manera, las rejillas presentan otros detalles como el promedio de tiempo de bloque, número de direcciones de cartera, gas actual y BTC total bloqueado en el sistema de Rootstock de 2 vías.

<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-grids.png" alt="overview grids"/></div>

### Vista de gráfico

De forma predeterminada, el gráfico debajo de las cuadrículas muestra un gráfico de línea de las transacciones diarias. Puede cambiar para ver una gráfica de línea del precio y la tapa del mercado haciendo clic en los botones, respectivamente.

<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-charts.png" alt="chart view"/></div>

### Últimas transacciones/bloques

La siguiente sección de la página muestra una lista de los últimos bloques de la red en el lado izquierdo y una lista de las últimas transacciones en la derecha, como se muestra a continuación. Puede ver la lista completa de bloques o transacciones haciendo clic en "ver todos los bloques" o "ver todas las transacciones" al final de la lista.

<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-latests.png" alt="list of latest transactions/blocks"/></div>

### Explorando el blockchain

Aparte de la visión general en la página principal de Rooststock Blockscout, puede ver otros detalles en la cadena de bloques haciendo clic en "Blockchain" en el panel del menú izquierdo y seleccionando las opciones apropiadas. Esto incluye contratos inteligentes soportados en Rootstock, que puede ver seleccionando la opción de contratos verificados.

<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-explore.png" alt="blockchain menu"/></div>

### Tokens en Rootstock

Puede ver una lista de las fichas ERC y ERC-721 en la red Rootstock haciendo clic en las fichas del menú de la izquierda. Puede comprobar los detalles de cada ficha haciendo clic en el nombre de la ficha.

<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-tokens.png" alt="list of tokens"/></div>

### Gráficos y estadísticas

Seleccione la opción Cartas y estadísticas en el menú de la izquierda para ver varias estadísticas avanzadas y representaciones visuales de datos en la plataforma Rootstock. Estas incluyen estadísticas generales de la cadena de bloques, Cuentas, Transacciones, Bloques, Contractos, Gas, etc.

<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-tokens.png" alt="charts and blockchain stats"/></div>

### API de Blockscout

Blockscout le permite consultar programáticamente varios detalles de la red Rootstock a través de la API. Puede acceder a la API de Blockscout haciendo clic en el botón "API" en la parte inferior de la página, donde puede encontrar documentación y ejemplos de uso de la API para varios propósitos.

<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-api.png" alt="api documentation"/></div>

Aquí hay un ejemplo básico de cómo usar Blockscout con Rootstock en Python para obtener el último número de bloque:

```python
import requests

response = requests.get("https://rootstock.blockscout.com/api?module=block&action=eth_block_number")
latest_block = int(response.json()['result'], 16) # Convierte hexadecimal al entero
print(f"Último número de bloque Rootstock: {latest_block}")
```

Este script de Python utiliza la API de Blockscout para obtener el último número de bloque en el mainnet Rootstock.
**Response:**

```bash
Último número de Bloque Rootstock: 6019497
```

Debes tener Python y la librería `requests` instalados para ejecutar este script.

### Verificar y publicar contratos inteligentes en Rootstock

Puede verificar y publicar un contrato inteligente en la red Rootstock haciendo clic en **otro>>Verificar contrato** en el menú de la izquierda. Luego, usted proporciona la dirección del contrato y su método de verificación preferido de la lista de métodos de verificación del contrato soportado.

<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-verify.png" alt="contract verification form"/></div>

### Cuenta de Blockscout

Para crear una cuenta en Blockscout, haga clic en el icono de usuario al lado del botón "Connect Wallet" en la esquina superior derecha y inicie sesión / regístrese con su cuenta de correo electrónico o de GitHub. Después de crear o iniciar sesión en tu cuenta de Blockscout puede acceder a otras opciones de menú que le permiten añadir etiquetas personalizadas a direcciones o transacciones, crear una lista de seguimiento, crear ABI personalizada, o enviar solicitudes de etiquetas públicas al equipo Rootstock. También puede acceder a sus claves API de Blockscout.

<div align="center"><img width="100%" src="/img/tools/explorer/blockscout-account.png" alt="account menu"/></div>

## Para información adicional vea:

- [Documentación de Hardhat](https://docs.blockscout.com)
- [Github Repo](https://github.com/blockscout/blockscout)
