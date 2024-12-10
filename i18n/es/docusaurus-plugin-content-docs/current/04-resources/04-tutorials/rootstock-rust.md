---
sidebar_position: 2
title: Interactuar con Rootstock usando Rust
sidebar_label: Interactuar con Rootstock usando Rust
tags:
  - rsk
  - rootstock
  - polvo
  - tutoriales
  - recursos
  - contratos inteligentes
  - alloy
description: Rust se está utilizando extensivamente en el lado del backend de muchas aplicaciones defi, dApps, herramientas de desarrollador, índices y puentes. Esta guía ayudará a los desarrolladores a comenzar a usar Rust en blockchain Rootstock.
---

Rust es un lenguaje rápido y eficiente en memoria, que puede potenciar servicios críticos al rendimiento,
ejecutados en dispositivos embebidos e integrarse fácilmente con otros idiomas.

> Este tutorial ayuda a comenzar en Rootstock usando Rust realizando operaciones básicas como enviar transacciones y llamar a contratos usando la caja de Aleación, similar a los éteres.

## Introducción a la aleación

[Alloy](https://github.com/alloy-rs/alloy) conecta las aplicaciones a blockchains, sirve como punto de entrada para conectarse con blockchains compatibles con evm. Es una reescritura de [ethers-rs](https://github. biblioteca om/gakonst/ethers-rs) desde el principio, con nuevas características, alto rendimiento, etc. Un ejemplo es [Foundry](https://github. om/foundry-rs/foundry), una herramienta escrita en Rust que utiliza Alloy como dependencia para conectarse con blockchains.

Para más información, consulta [Alloy Examples](https://github.com/alloy-rs/examples) para ayudarte a empezar.

## Prerrequisitos

- Oxidado
  - Instala la última versión de [Rust](https://www.rust-lang.org/tools/install). Si ya tienes Rust instalado, asegúrate de usar la última versión o actualizar usando la toolchain `rustup`.

## Comenzando

### Crear un proyecto de Rust

Ejecuta el comando de abajo usando carga para crear un proyecto de inicio.

```bash
carga nueva rootstock-rs
```

> El siguiente paso es actualizar el archivo `cargo.toml` con las dependencias explicadas en la siguiente sección.

## Setup Alloy

Para instalar [Alloy](https://github.com/alloy-rs/alloy) ejecuta el siguiente comando en el directorio raíz del proyecto:

```bash
cd rootstock-rs
añadir aleación --git https://github.com/alloy-rs/alloy
```

Encuentra más sobre [Configuración de aleaciones usando meta crate](https://alloy.rs/getting-started/installation.html)

> Nota: Todas las dependencias requeridas se mencionan en el archivo `.toml` a continuación. Copia y pega en el archivo `cargo.toml`.

```bash
[package]
name = "rootstock-alloy"
versión = "0.1. "
edition = "2021"

[dependencies]
aleación = { git = "https://github.com/alloy-rs/alloy", versión = "0.1. ", default-features = true, features = ["providers", "rpc-client", "transport-http", "sol-types", "json", "contract", "rpc-types", "rpc-types-eth", "network", "signer-local"] }
eyre = "0. .12"
futures-util = "0.3.30"
tokio = { versión = "1", features = ["full"] }
```

> Se espera que los tipos y declaraciones de importación en las dependencias [Alloy](https://github.com/alloy-rs/alloy) cambien. Si te enfrentas a cualquier tipo de error relacionado mientras ejecutas los ejemplos dados en este tutorial, se recomienda revisar el [Alloy](https://github. repo om/alloy-rs/alloy) y [documentation](https://alloy.rs/).

## Conectar al nodo Rootstock

Para conectar al nodo Rootstock necesitaremos una configuración del proveedor. A [Provider](https://alloy-rs.github.io/alloy/alloy/alloy_provider/trait/trait.Provider. tml) es una abstracción de una conexión a la red Rootstock que proporciona una interfaz concisa y consistente a la funcionalidad estándar del nodo Ethereum.

Para ejecutar este programa, usa `cargo run` en la raíz del proyecto:

```bash
cd rootstock-rs
ejecución de carga
```

La respuesta debería verse así:

```bash
Has finalizado el perfil de `dev` [desoptimizado + debuginfo] en 29.28
    Ejecutando `target/debug/rootstock-alloy`
¡Hola, mundo!
```

A continuación, actualiza el archivo `rootstock-rs/src/main.rs` con el siguiente programa:

:::info\[Info]

Reemplaza `API_KEY` con tu clave API RPC. Para obtener una API_KEY, consulta [RPC Docs](/Developopers/rpc-api/setup/).

:::

```rs
usar aleación::providers::{ Provider, ProviderBuilder };
usar eyre::Result;

#[tokio::main]
async fn main() -> eyre::Result<()> {
    // Configura el transporte HTTP que consume el cliente RPC.
    let rpc_url = "https://rpc.testnet.rootstock.io/{YOUR_APIKEY}". arse()?;

    // Crea un proveedor con el transporte HTTP usando la caja `reqwest`.
    let provider = ProviderBuilder::new(). n_http(rpc_url);

    // Obtener id de cadena
    let chain_id = provider. et_chain_id().await?;

    println!("chain id: {chain_id}");

    // Obtener el último número de bloque.
    let latest_block = provider.get_block_number(). espera?;

    println!("Último número de bloque: {latest_block}");

    Ok(())
}
```

La respuesta debería verse así:

```bash
Perfil `dev` [desoptimizado + debuginfo] finalizado en 1.43s
    Ejecutando `target/debug/rootstock-alloy`
cadena id: 31
Último número de bloque: 5292505
```

## Obtener saldo RBTC / RIF

Después de configurar el proveedor, interactuar con el nodo Rootstock, obtener el balance de una dirección o llamar a un contrato. Ahora, copie y pegue el código a continuación.

Haremos lo siguiente:

- Codegen del archivo ABI para interactuar con el contrato.
- Cree un directorio abi en la raíz del proyecto y ponga el token RIF abi en el archivo rif.json.

Ejecutar los comandos de abajo en la carpeta raíz:

```bash
mkdir abi
touch rif.json
```

Reemplace `rootstock-rs/abi/rif.json file` con el RIF Abi a continuación:

```bash
[ { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]
```

Actualiza el archivo `rootstock-rs/src/main.rs` con este programa:

```rs
usa la aleación::providers::{Provider, ProviderBuilder};
usa alloy::sol;
usa la aleación::primitives::{ address, utils::format_units  };
 ¡ 
sol!
    #[allow(missing_docs)]
    #[sol(rpc)]
    RIF,
    "abi/rif. hijo"
);

#[tokio::main]
async fn main() -> eyre::Result<()> {
    // Configura el transporte HTTP que consume el cliente RPC.
    let rpc_url = "https://rpc. estnet.rootstock.io/{YOUR_APIKEY}".parse()?;

    // Crea un proveedor con el transporte HTTP usando la caja `reqwest`.
    let provider = ProviderBuilder::new(). n_http(rpc_url);

    // Dirección sin el prefijo 0x
    let alice = address! "8F1C0185bB6276638774B9E94985d69D3CDB444a");

    let rbtc = provider. et_balance(alice). espera?;

    let formatted_balance: String = format_units(rbtc, "ether")?;

    println! "Balance de alice: {formatted_balance} rbtc");

    // Utilizando la dirección del contrato rif testnet
    let contract = RIF::new("0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE". arse()?, proveedor);


    let RIF::balanceOfReturn { balance } = contract.balanceOf(alice). all().await?;

    println!("Rif balance: {:?}", balance);

    Ok(())
}
```

:::info\[Info]

Reemplaza `API_KEY` con tu clave API RPC. Para obtener una API_KEY, consulta [RPC Docs](/Developopers/rpc-api/setup/). También reemplace las direcciones del contrato RIF Testnet con su propia dirección, ya que se le pediría utilizar una clave privada más adelante.

:::

Nota: Ejecutar el comando de carga en la raíz del proyecto:

```bash
cd rootstock-rs
ejecución de carga
```

Deberías obtener la siguiente respuesta:

```bash
Perfil `dev` [desoptimizado + debuginfo] finalizado en 3.01s
    Ejecutando `target/debug/rootstock-alloy`
Balance de alice: 0.315632721175825996 rbtc
Saldo Rif : 183000000000000000000000000000000
```

## Enviar una transacción

El siguiente programa envía tRBTC de una cuenta a la otra usando `TransactionRequest` Builder.

Ejecutar este programa requerirá configurar la variable env `PRIVATE_KEY` y luego ejecutar el programa usando `cargo run` en la raíz.

```bash
cd rootstock-rs
PRIVATE_KEY=0x12... carga de ejecución
```

Reemplaza `PRIVATE_KEY` con tu clave privada en el comando anterior para ejecutar este programa.

Deberías ver la siguiente respuesta:

```bash
% carga corre
Perfil `dev` finalizado [desoptimizado + depuración] objetivo(s) en 0. 5s
    Ejecutando `target/debug/rootstock-alloy`
Balance de alice: 0.315632721175825996 rbtc
Balance Rif 183000000000000000000
```

A continuación, actualiza el archivo `rootstock-rs/src/main.rs` con este programa:

```rs
use alloy::{
    network::{EthereumWallet, TransactionBuilder},
    primitives::{address, U256},
    providers::{Provider, ProviderBuilder},
    rpc::types::TransactionRequest,
    signers::local::PrivateKeySigner,
};
use eyre::Result;
use std::env;

#[tokio::main]
async fn main() -> Result<()> {

    // Get private key
    let mut pk = String::new();

    match env::var("PRIVATE_KEY") {
        Ok(value) => {
            pk.push_str(value.as_str());
        },
        Err(_e) => {
            panic!("Private key not setup");
        },
    }
    
    // Set up the HTTP transport which is consumed by the RPC client.
    let rpc_url = "https://rpc.testnet.rootstock.io/{YOUR_APIKEY}".parse()?;

    let signer: PrivateKeySigner = pk.parse().unwrap();

    let wallet = EthereumWallet::from(signer);

    // Create a provider with the HTTP transport using the `reqwest` crate.
    let provider = ProviderBuilder::new()
    .wallet(wallet)
    .on_http(rpc_url);

    // Get chain id
    let chain_id = provider.get_chain_id().await?;

   // Create two users, Alice and Bob.
   // Address without 0x prefix
   let alice = address!("8F1C0185bB6276638774B9E94985d69D3CDB444a");
   let bob = address!("8F1C0185bB6276638774B9E94985d69D3CDB444a");

   let nonce = provider.get_transaction_count(alice).await?;

    // Build a transaction to send 100 wei from Alice to Bob.
    let tx = TransactionRequest::default()
        .with_from(alice)
        .with_to(bob)
        .with_chain_id(chain_id)
        .with_nonce(nonce)
        .with_value(U256::from(100))  // To see value in rbtc: 100 / 10 ** 18 RBTC
        .with_gas_price(65_164_000) // provider.estimate_gas(&tx).await? * 1.1 as u128 / 100)
        .with_gas_limit(21_000);    // Change this value if you face gas related issues

    // Send the transaction and wait for the receipt.
    let pending_tx = provider.send_transaction(tx).await?;

    println!("Pending transaction... {}", pending_tx.tx_hash());

    // Wait for the transaction to be included.
    
    let receipt = pending_tx.get_receipt().await?;

    println!(
        "Transaction included in block {}",
        receipt.block_number.expect("Failed to get block number")
    );

    // assert_eq!(receipt.from, alice);
    // assert_eq!(receipt.to, Some(bob));

    Ok(())
}
```

- ERROR: error de deserialización: falta campo efectiveGasPrice en la línea 1 columna 959
  - Se espera que se encuentre un error `effectiveGasPrice`.
    - Por favor ignora el error anterior. El equipo de RSKj está familiarizado con este error y la corrección sería parte de la nueva versión. Este error no bloquea el envío de una transacción. La transacción se minará correctamente.

## Transferir token ERC20

Este programa configura la cartera con el proveedor y envía RIF de una cuenta a la otra. Ejecuta este programa utilizando: `ejecución de carga`.

Actualiza el archivo `rootstock-rs/src/main.rs` con este programa:

```rs
use alloy::{
    network::{EthereumWallet},
    primitives::{address, U256},
    providers::{Provider, ProviderBuilder},
    signers::local::PrivateKeySigner,
};
use eyre::Result;
use std::env;
use alloy::sol;

// Codegen from ABI file to interact with the contract.
// Make a abi directory in the root of the project and put RIF token abi in rif.json file.
 
sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    RIF,
    "abi/rif.json"
);

// See the contents of rootstock-rs/abi/rif.json file below.
/*
[ { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]
*/

#[tokio::main]
async fn main() -> eyre::Result<()> {
    // Get private key
    let mut pk = String::new();

    match env::var("PRIVATE_KEY") {
        Ok(value) => {
            pk.push_str(value.as_str());
        }
        Err(_e) => {
            panic!("Private key not setup");
        }
    }

    // Set up the HTTP transport which is consumed by the RPC client.
    let rpc_url = "https://rpc.testnet.rootstock.io/{YOUR_APIKEY}".parse()?;

    let signer: PrivateKeySigner = pk.parse().unwrap();

    let wallet = EthereumWallet::from(signer);

    // Create a provider with the HTTP transport using the `reqwest` crate.
    let provider = ProviderBuilder::new()
        .wallet(wallet)
        .on_http(rpc_url);

    // Address without 0x prefix
    let alice = address!("8F1C0185bB6276638774B9E94985d69D3CDB444a");

    let nonce = provider.get_transaction_count(alice).await?;
    let chain_id = provider.get_chain_id().await?;

    let contract = RIF::new(
        "0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE".parse()?,
        provider,
    );

    let RIF::balanceOfReturn { balance } = contract.balanceOf(alice).call().await?;

    println!("Rif balance: {:?}", balance);

    // Transfer
    let amount = U256::from(100);
    let receipt = contract
        .transfer(alice, amount)
        .chain_id(chain_id)
        .nonce(nonce)
        .gas_price(65_164_000) // gas price: provider.estimate_gas(&tx).await? * 1.1 as u128 / 100)
        .gas(25_000)  // Change this value according to tx type if you face gas related issues
        .send()
        .await?
        .get_receipt()
        .await?;

    println!("Send transaction: {}", receipt.transaction_hash);

    Ok(())
}
```

Ejecuta el siguiente comando para transferir un token ERC20:

```bash
cd rootstock-rs
PRIVATE_KEY=0x12... carga de ejecución
```

> Nota para reemplazar `PRIVATE_KEY` con tu clave privada en el comando anterior para ejecutar este programa.

Para más detalles, consulta el [ejemplo de código completo](https://alloy.rs/examples/transactions/transfer_erc20.html)

Vea [foundry](https://github.com/foundry-rs/foundry) codebase para un uso más avanzado de Rust y Alloy para interactuar con blockchains compatibles con EVM incluyendo Rootstock.

## Recursos útiles

- [Sitio web de Aleación](https://www.paradigm.xyz/oss/alloy)
- Ver [documentación de referencia de Aleación](https://alloy.rs/index.html)
- Programar ejemplos usando Alloy [visita este repo](https://github.com/alloy-rs/examples)
- Aleación de GitHub [repo](https://github.com/alloy-rs)
