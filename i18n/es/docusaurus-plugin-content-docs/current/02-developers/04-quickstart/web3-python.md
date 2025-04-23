---
sidebar_label: Web3.py
sidebar_position: 109
title: Despliegue e interacción con un contrato inteligente utilizando Web3.py
description: Despliegue e Interacción con un Contrato Inteligente Usando Web3.py.
tags:
  - inicios rápidos
  - rsk
  - portainjertos
  - ethereum
  - python
  - web3.py
  - desarrolladores
  - contratos inteligentes
---

[Web3.py](https://web3py.readthedocs.io/en/stable/) es una biblioteca Python que permite a los desarrolladores interactuar con blockchains basadas en Ethereum con Python. Rootstock dispone de una API similar a Ethereum que es totalmente compatible con las invocaciones JSON-RPC al estilo de Ethereum. Por lo tanto, los desarrolladores pueden aprovechar esta compatibilidad y utilizar la biblioteca `Web3.py` para interactuar con Rootstock de forma similar a como los desarrolladores interactúan con los contratos inteligentes en Ethereum.

En esta guía, usted aprenderá cómo utilizar la biblioteca Web3.py para implementar e interactuar con los contratos inteligentes en Rootstock.

:::tip[Interact con portainjertos utilizando óxido].
Consulte el tutorial sobre cómo [interactuar con Rootstock utilizando Rust](/resources/tutorials/rootstock-rust/)
:::

## Requisitos previos

- Una cuenta testnet con fondos del tRBTC.
  - [Obtener tRBTC](https://faucet.rootstock.io/).
- Una CLAVE API del [Servicio RPC de Rootstock](https://rpc.rootstock.io/).
- Poner en marcha el proyecto
- Un compilador Solidity instalado -> ver [instrucciones de instalación del compilador solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html)

Configure el proyecto e instale las dependencias:

```bash
# crear un directorio para el proyecto
mkdir web3-python-guide && cd web3-python-guide

# instalar python 3.10
brew install python@3.10

# configurar el entorno virtual de desarrollo
python3.10 -m venv env
source env/bin/activate

# instalar dependencias
pip install Web3 py-solc-x
```

Instrucciones de instalación del compilador Solidity para MacOs:

```bash
brew install solc-select
solc-select use 0.8.19 --always-install

solc --version
# Versión: 0.8.19+commit.7dd6d404.Darwin.appleclang
```

### Establecer secretos para el proyecto

Estaremos usando datos sensibles que no tienen que ser almacenados en el código, y en su lugar los almacenaremos en un archivo `.env`.

Para ello, primero vamos a instalar el paquete para leer los datos del archivo `.env`:

```python
pip install python-dotenv
```

A continuación, crearemos un archivo `.env` y añadiremos los secretos:

```bash
tocar .env
```

añada las siguientes variables al archivo:

Sustituya `YOUR_APIKEY` por la clave API de su panel de control.

```bash
# get this YOUR_APIKEY from the Rootstock RPC Service.
RPC_PROVIDER_APIKEY = '{YOUR_APIKEY}'

# this is the private key of the account from which you will deploy the contract
ACCOUNT_PRIVATE_KEY = '{YOUR_PRIVATE_KEY}'
```

## Despliegue de un contrato inteligente

### Escribir el contrato inteligente

El contrato que se compilará y desplegará en la siguiente sección es un contrato simple que almacena un mensaje, y permitirá establecer diferentes mensajes enviando una transacción.

Puede empezar creando un expediente para el contrato:

```bash
toque Greeter.sol
```

A continuación, añada el código Solidity al archivo:

```s
// SPDX-Licencia-Identificador: MIT

pragma solidity >0.5.0;

contract Greeter {
    string public greeting;

    constructor() public {
        greeting = 'Hola';
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    function greet() view public returns (string memory) {
        return greeting;
    }
}
```

La función constructora, que se ejecuta cuando se despliega el contrato, establece el valor inicial de la variable de cadena almacenada en la cadena en "Hola". La función setGreeting añade el `_greeting` proporcionado al saludo, pero es necesario enviar una transacción, que modifica los datos almacenados. Por último, la función `greet` recupera el valor almacenado.

### Compilar el contrato inteligente

Crearemos un script que utilice el compilador Solidity para generar el código de bytes y la interfaz (ABI) del contrato `Greeter.sol`. Para empezar, crearemos un archivo `compile.py` ejecutando:

```bash
toca compilar.py
```

A continuación, crearemos el script para este archivo y completaremos los siguientes pasos:
Importar el paquete `solcx`, que compilará el código fuente
Compilar el contrato `Greeter.sol` utilizando la función `solcx.compile_files`
Exportar la ABI y el bytecode del contrato.

Codifica y pega el código de abajo en `compile.py`;

```s
import solcx
solcx.install_solc('0.8.19')

# Compilar contrato
temp_file = solcx.compile_files(
    'Greeter.sol',
    output_values=['abi', 'bin'],
    solc_version='0.8.19'
)

# Exportar datos del contrato
abi = temp_file['Greeter.sol:Greeter']['abi']
bytecode = temp_file['Greeter.sol:Greeter']['bin']
```

Ahora puede ejecutar el script para compilar el contrato:

```python
python compilar.py
```

### Despliegue del contrato inteligente

Con el script para compilar el contrato `Greeter.sol` en su sitio, puedes usar los resultados para enviar una transacción firmada que lo despliegue. Para ello, puedes crear un archivo para el script de despliegue llamado `deploy.py`:

```bash
tocar deploy.py
```

A continuación, creará el script para este archivo y completará los siguientes pasos:

1. Añadir importaciones, incluyendo `Web3.py` y el ABI y bytecode del contrato `Greeter.sol`.
2. Configurar el proveedor Web3

Para configurar el Proveedor Web3, tenemos que leer las variables de entorno que hemos añadido previamente al archivo .env.

```text
# Añade el proveedor Web3
RPC_PROVIDER_APIKEY = os.getenv('RPC_PROVIDER_APIKEY')
RPC_PROVIDER_URL = 'https://rpc.testnet.rootstock.io/' + RPC_PROVIDER_APIKEY
web3 = Web3(Web3.HTTPProvider(RPC_PROVIDER_URL))
```

3. Defina la `cuenta_de`. La clave privada es necesaria para firmar la transacción. Nota: Esto es sólo para propósitos de ejemplo. Nunca almacene sus claves privadas en su código

```text
# Establece la cuenta por defecto
PRIVATE_KEY = os.getenv('ACCOUNT_PRIVATE_KEY')
account_from = {
    'private_key': PRIVATE_KEY,
    'address': web3.eth.account.from_key(PRIVATE_KEY).address
}
```

4. Crear una instancia de contrato utilizando la función `web3.eth.contract` y pasando la ABI y el bytecode del contrato.
5. Establece la [estrategia de precio del gas](https://web3py.readthedocs.io/en/stable/gas_price.html#gas-price) usando la función `web3.eth.set_gas_price_strategy`, que nos permitirá obtener el precio del gas del proveedor RPC. Esto es importante porque, de lo contrario, la biblioteca Web3 intentará utilizar los métodos RPC `eth_maxPriorityFeePerGas` y `eth_feeHistory`, que sólo son compatibles con los nodos Ethereum posteriores a Londres.
6. Construye un constructor de transacción utilizando la instancia del contrato. Entonces usarás la función `build_transaction` para pasar la información de la transacción incluyendo la dirección `from` y el `nonce` para el remitente. Para obtener el `nonce` puedes usar la función \`web3.eth.get_transaction_count
7. Firmar la transacción utilizando la función `web3.eth.account.sign_transaction` y pasar en el constructor transacción y la `private_key` del remitente.
8. Utilizando la transacción firmada, puede enviarla utilizando la función `web3.eth.send_raw_transaction` y esperar la recepción de la transacción utilizando la función `web3.eth.wait_for_transaction_receipt`.

Codifica y pega el código de abajo en `deploy.py`;

```bash
from compile import abi, bytecode
from web3 import Web3
from web3.gas_strategies.rpc import rpc_gas_price_strategy
from dotenv import load_dotenv
import os

load_dotenv()

# Añade el proveedor Web3
RPC_PROVIDER_APIKEY = os.getenv('RPC_PROVIDER_APIKEY')
RPC_PROVIDER_URL = 'https://rpc.testnet.rootstock.io/' + RPC_PROVIDER_APIKEY
web3 = Web3(Web3.HTTPProvider(RPC_PROVIDER_URL))


# Establecer la cuenta por defecto
PRIVATE_KEY = os.getenv('ACCOUNT_PRIVATE_KEY')
account_from = {
    'private_key': PRIVATE_KEY,
    'address': web3.eth.account.from_key(PRIVATE_KEY).address
}

print("Attempting to deploy from account: ", account_from['address'])

# Create contract instance
Greeter = web3.eth.contract(abi=abi, bytecode=bytecode)

# Set the gas price strategy
web3.eth.set_gas_price_strategy(rpc_gas_price_strategy)

# Construir la transacción
construct_txn = Greeter.constructor().build_transaction({
    'from': account_from['address'],
    'nonce': web3.eth.get_transaction_count(account_from['address']),
    'gasPrice': web3.eth.generate_gas_price()
})

# Firmar la transacción que despliega el contrato
signed_txn = web3.eth.account.sign_transaction(construct_txn, account_from['private_key'])

# Enviar la transacción que despliega el contrato
txn_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)

# Esperar a que se realice la transacción y obtener el recibo de la transacción
txn_receipt = web3.eth.wait_for_transaction_receipt(txn_hash)
print(f "Transacción realizada correctamente con hash: { txn_receipt.transactionHash.hex() }")
print(f "Contrato desplegado en la dirección: { txn_receipt.contractAddress }")
```

Ahora puede ejecutar el script y obtener el resultado.

```python
python deploy.py

>> Intentando desplegar desde cuenta:  0x3b32a6463Bd0837fBF428bbC2A4c8B4c022e5077
>> Transacción exitosa con hash: 0x98a256c106bdb65e4de6a267e94000acdfe0d6f23c3dc1444f14dccf00713a69
>> Contrato desplegado en la dirección: 0xba39f329255d55a0276c695111b2edc9250C2341
```

Nota: Guarde la dirección del contrato, ya que la utilizaremos más adelante en la guía.

## Interactuar con un contrato inteligente

### Lectura de datos contractuales (métodos de llamada)

Los métodos de llamada son el tipo de interacción que no modifica el almacenamiento del contrato (variables de cambio), lo que significa que no es necesario enviar ninguna transacción. Simplemente leen varias variables de almacenamiento del contrato desplegado.

Para empezar, puedes crear un archivo y llamarlo `getMessage.py`:

```text
tocar getMessage.py
```

A continuación, puede seguir los siguientes pasos para crear el script:

1. Añade importaciones, incluyendo `Web3.py` y la ABI del contrato `Greeter.sol`.
2. Configure el proveedor Web3 y sustituya YOUR_APIKEY
3. De fine the `contract_address` of the deployed contract
4. Crear una instancia de contrato utilizando la función `web3.eth.contract` y pasando el ABI y la dirección del contrato desplegado.
5. Utilizando la instancia del contrato, puede llamar a la función \`greet

Codifica y pega el código de abajo en `getMessage.py`;

```bash
from compile import abi
from web3 import Web3
from dotenv import load_dotenv
import os

load_dotenv()

# Añade el proveedor Web3
RPC_PROVIDER_APIKEY = os.getenv('RPC_PROVIDER_APIKEY')
RPC_PROVIDER_URL = 'https://rpc.testnet.rootstock.io/' + RPC_PROVIDER_APIKEY
web3 = Web3(Web3.HTTPProvider(RPC_PROVIDER_URL))


# Crear variable de dirección (utiliza la dirección del contrato que acabas de desplegar)
contract_address = '0xba39f329255d55a0276c695111b2edc9250C2341'

print(f "Haciendo una llamada al contrato en la dirección: { contract_address }")

# Crear instancia de contrato
Greeter = web3.eth.contract(address=dirección_contrato, abi=abi)

# Llamar al contrato
call_result = Greeter.functions.greet().call()
print(f "Contrato devuelto: { call_result }")
```

Si tiene éxito, la respuesta se mostrará en el terminal:

```python
python getMessage.py

>> Realizando una llamada a contrato en la dirección: 0xba39f329255d55a0276c695111b2edc9250C2341
>> Contrato devuelto: Hola
```

### Escribir datos en el contrato (métodos de escritura)

Los métodos de escritura son el tipo de interacción que modifica el almacenamiento del contrato (variables de cambio), lo que significa que es necesario firmar y enviar una transacción. En esta sección, crearás el script para cambiar el texto almacenado en el contrato Greeter.

Para empezar, puedes crear un archivo para el script y llamarlo `setMessage.py`:

```bash
tocar setMessage.py
```

Abre el archivo `setMessage.py` y sigue los siguientes pasos para crear el script:

1. Añade importaciones, incluyendo Web3.py y la ABI del contrato Incrementer.sol
2. Configurar el proveedor Web3
3. Define la variable `account_from`, incluyendo la `private_key`, y la `contract_address` del contrato desplegado. La clave privada es necesaria para firmar la transacción. Nota: Esto es sólo a modo de ejemplo. Nunca almacene sus claves privadas en su código
4. Crear una instancia de contrato utilizando la función `web3.eth.contract` y pasando el ABI y la dirección del contrato desplegado.
5. Establece la estrategia del precio del gas usando la función `web3.eth.set_gas_price_strategy`, que nos permitirá obtener el precio del gas del proveedor RPC. Esto es importante porque, de lo contrario, la biblioteca Web3 intentará utilizar los métodos RPC `eth_maxPriorityFeePerGas` y `eth_feeHistory`, que sólo son compatibles con los nodos Ethereum posteriores a Londres.
6. Construye la transacción `setGreeting` usando la instancia del contrato y pasando el nuevo mensaje. Luego usarás la función `build_transaction` para pasar la información de la transacción incluyendo la dirección `from` y el `nonce` del remitente. Para obtener el `nonce` puedes usar la función \`web3.eth.get_transaction_count
7. Firma la transacción usando la función `web3.eth.account.sign_transaction` y pasa la transacción `setGreeting` y la `private_key` del remitente.
8. Utilizando la transacción firmada, puedes enviarla utilizando la función `web3.eth.send_raw_transaction` y esperar la recepción de la transacción utilizando la función `web3.eth.wait_for_transaction_receipt`.

Codifica y pega el código de abajo en `setMessage.py`;

```bash
from compile import abi
from web3 import Web3
from web3.gas_strategies.rpc import rpc_gas_price_strategy
from dotenv import load_dotenv
import os

load_dotenv()

# Añade el proveedor Web3
RPC_PROVIDER_APIKEY = os.getenv('RPC_PROVIDER_APIKEY')
RPC_PROVIDER_URL = 'https://rpc.testnet.rootstock.io/' + RPC_PROVIDER_APIKEY
web3 = Web3(Web3.HTTPProvider(RPC_PROVIDER_URL))


# Establecer la cuenta por defecto
PRIVATE_KEY = os.getenv('ACCOUNT_PRIVATE_KEY')
account_from = {
    'private_key': PRIVATE_KEY,
    'address': web3.eth.account.from_key(PRIVATE_KEY).address
}

# Crear variable de dirección
contract_address = '0xba39f329255d55a0276c695111b2edc9250C2341'

# Crear instancia de contrato
Greeter = web3.eth.contract(address=contract_address, abi=abi)

# Establecer la estrategia de precio del gas
web3.eth.set_gas_price_strategy(rpc_gas_price_strategy)

# Crear la transacción
txn = Greeter.functions.setGreeting('¡Hola, mundo!').build_transaction({
    'from': account_from['address'],
    'nonce': web3.eth.get_transaction_count(account_from['address']),
    'gasPrice': web3.eth.generate_gas_price()
})

# Firmar la transacción
signed_txn = web3.eth.account.sign_transaction(txn, account_from['private_key'])

# Enviar la transacción
txn_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
txn_receipt = web3.eth.wait_for_transaction_receipt(txn_hash)

print(f "Transacción correcta con hash: { txn_receipt.transactionHash.hex() }")
```

Si tiene éxito, el hash de la transacción se mostrará en el terminal.

```python
python setMessage.py

>> Transacción exitosa con hash: 0x95ba4e13269aba8e51c3037270c0ee90f4872c36e076fc94e51226c1597f6d86
```

Ahora puedes ejecutar el script `getMessage.py` para obtener el nuevo valor almacenado en el contrato.

```python
python getMessage.py

>> Realizando una llamada a contrato en la dirección: 0xba39f329255d55a0276c695111b2edc9250C2341
>> Contrato devuelto: ¡Hola, Mundo!
```

## Envío de transacciones

Aquí entenderá cómo comprobar el saldo de una cuenta y cómo enviar `tRBTC` de una cuenta a otra.

### Consultar el saldo de una cuenta

Aquí crearás un script que comprueba el saldo de una cuenta.
En primer lugar, comience por crear un archivo para el script.

```python
tocar balances.py
```

A continuación, creará el script para este archivo y completará los siguientes pasos:

1. Configurar el proveedor Web3
2. Definir las variables `dirección_de` y \`dirección_a
3. Obtener el saldo de las cuentas utilizando la función `web3.eth.get_balance` y formatear los 3. resultados utilizando la función `web3.from_wei`.

Codifica y pega el código de abajo en `balances.py`;

```bash
from web3 import Web3
from dotenv import load_dotenv
import os

load_dotenv()


# Añade el proveedor Web3
RPC_PROVIDER_APIKEY = os.getenv('RPC_PROVIDER_APIKEY')
RPC_PROVIDER_URL = 'https://rpc.testnet.rootstock.io/' + RPC_PROVIDER_APIKEY
web3 = Web3(Web3.HTTPProvider(RPC_PROVIDER_URL))


# Crear variables de dirección
address_from = '0x3b32a6463Bd0837fBF428bbC2A4c8B4c022e5077'
address_to = '0xcff73226883c1cE8b3bcCc28E45c3c92C843485c'

# Obtener el saldo del remitente
balance_from = web3.from_wei(web3.eth.get_balance(address_from), 'ether')
print(f "Saldo de la dirección del remitente {address_from}: { balance_from } TRBTC")

# Obtener el saldo del receptor
balance_to = web3.from_wei(web3.eth.get_balance(address_to), 'ether')
print(f "Saldo de la dirección del receptor {address_to}: { balance_to } TRBTC")
```

Ejecuta el script:

```python
python balances.py

# >> Saldo de la dirección del remitente 0x3b32a6463Bd0837fB428bbC2A4c8B4c022e5077: 0.192538506119378425 TRBTC
# >> Saldo de la dirección del destinatario 0xcff73226883c1cE8b3bcCc28E45c3c92C843485c: 0.407838671951567233 TRBTC
```

### Enviar TRBTC

Aquí crearás un script para enviar tRBTC de una cuenta a otra.
Primero, empieza por crear un archivo para el script.

```bash
tocar transaction.py
```

A continuación, creará el script para este archivo y completará los siguientes pasos:

1. Añadir importaciones, incluyendo `Web3.py` y el `rpc_gas_price_strategy`, que se utilizará en los siguientes pasos para obtener el precio del gas utilizado para la transacción.
2. Configurar el proveedor Web3
3. Defina las variables `account_from`, incluida la `private_key`, y `address_to`. La clave privada es necesaria para firmar la transacción. Nota: Esto es sólo para propósitos de ejemplo. Nunca almacene sus claves privadas en su código
4. Utilice la API de precios del gas `Web3.py` para establecer una estrategia de precios del gas. Para este ejemplo, utilizarás la estrategia importada `rpc_gas_price_strategy`. Esto es importante porque, de lo contrario, la biblioteca Web3 intentará utilizar los métodos RPC `eth_maxPriorityFeePerGas` y `eth_feeHistory`, que sólo son compatibles con los nodos Ethereum posteriores a Londres.
5. Crea y firma la transacción usando la función `web3.eth.account.sign_transaction`. Introduce el `nonce`, `gas`, `gasPrice`, `to`, y el valor de la transacción junto con la `private_key` del remitente. Para obtener el `nonce` puedes utilizar la función `web3.eth.get_transaction_count` y pasar la dirección del remitente. Para predeterminar el `gasPrice` utilizarás la función `web3.eth.generate_gas_price`. Para el valor, puedes formatear la cantidad a enviar de un formato fácilmente legible a Wei utilizando la función `web3.to_wei`.
6. Utilizando la transacción firmada, puedes enviarla utilizando la función `web3.eth.send_raw_transaction` y esperar la recepción de la transacción utilizando la función `web3.eth.wait_for_transaction_receipt`.

Codifica y pega el código de abajo en `transaction.py`;

```bash
from web3 import Web3
from web3.gas_strategies.rpc import rpc_gas_price_strategy
from dotenv import load_dotenv
import os

load_dotenv()

# Añade el proveedor Web3
RPC_PROVIDER_APIKEY = os.getenv('RPC_PROVIDER_APIKEY')
RPC_PROVIDER_URL = 'https://rpc.testnet.rootstock.io/' + RPC_PROVIDER_APIKEY
web3 = Web3(Web3.HTTPProvider(RPC_PROVIDER_URL))



# Establecer la cuenta por defecto
PRIVATE_KEY = os.getenv('ACCOUNT_PRIVATE_KEY')
account_from = {
    'private_key': PRIVATE_KEY,
    'address': web3.eth.account.from_key(PRIVATE_KEY).address
}
address_to = '0xcff73226883c1cE8b3bcCc28E45c3c92C843485c'

print(f "Attempting to send transaction from { account_from['address'] } to { address_to }")

# Set the gas price strategy
web3.eth.set_gas_price_strategy(rpc_gas_price_strategy)

# Construye la transacción
txn = {
    'to': address_to,
    'value': web3.to_wei(0.0001, 'ether'),
    'gas': 21000,
    'gasPrice': web3.eth.generate_gas_price(),
    'nonce': web3.eth.get_transaction_count(account_from['address'])
}

# Firmar la transacción
signed_txn = web3.eth.account.sign_transaction(txn, account_from['private_key'])

# Enviar la transacción
txn_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)

# Esperar a que la transacción se extraiga y obtener el recibo de la transacción
txn_receipt = web3.eth.wait_for_transaction_receipt(txn_hash)
print(f "Transacción correcta con hash: { txn_receipt.transactionHash.hex() }")
```

Ejecuta el script:

```python
python transaction.py

Intentando enviar transacción de 0x112621448Eb148173d5b00edB14B1f576c58CEE a 0xcff73226883c1cE8b3bcCc28E45c3c92C843485c
Transacción exitosa con hash: 0x79ab8be672b0218d31f81876c34321ee7b08e6a4ec8bfff5249f70c443cbce00
```

## Resumen

En esta guía, hemos aprendido a utilizar la biblioteca Web3.py para implementar, interactuar con un contrato inteligente y enviar transacciones en Rootstock.

## Solución de problemas

````mdx-code-block
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">1. Error message: eth_sendTransaction method does not exist</Accordion.Header>
    <Accordion.Body>
        - When deploying a smart contract, or when trying to interact with it, you may receive the “method not found” message:
        ```bash
            web3.exceptions.MethodUnavailable: {'code': -32601, 'message': 'The method eth_sendTransaction does not exist/is not available. See available methods at https://dev.rootstock.io/developers/rpc-api/methods'}
        ```
        - Note: The cause of the error on the deployment is that the Web3.py module is set to use the private keys of the RPC provider (Hosted Keys), which is a legacy way to use accounts, and is not supported by modern RPC providers, as they do not store private keys.
        - Methods like `web3.eth.send_transaction` do not work with RPC providers, because they rely on a node state and all modern nodes are stateless, which underneath make JSON-RPC calls to methods like  `eth_accounts` and `eth_sendTransaction`. You must always use local private keys when working with nodes hosted by someone else.
        - If unfamiliar, note that you can [export your private keys from Metamask](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) and other wallets. Remember to never share your private keys, and do not put it on your code or repository.
        - In order to successfully deploy the contract, the developer needs to set up Web3.py to use his Local Private Keys, and to build and pre-sign the transaction before sending it, so the module uses `eth_sendRawTransaction` instead.
        - To allow Web3.py to use the local keys, we have to use the Signing middleware to add the Private Key to the signing keychain.
        ```bash
            import os
            from eth_account import Account
            from eth_account.signers.local import LocalAccount
            from web3 import Web3, EthereumTesterProvider
            from web3.middleware import construct_sign_and_send_raw_middleware

            w3 = Web3(EthereumTesterProvider())

            private_key = os.environ.get("PRIVATE_KEY")
            assert private_key is not None, "You must set PRIVATE_KEY environment variable"
            assert private_key.startswith("0x"), "Private key must start with 0x hex prefix"

            account: LocalAccount = Account.from_key(private_key)
            w3.middleware_onion.add(construct_sign_and_send_raw_middleware(account))

            print(f"Your hot wallet address is {account.address}")
        ```
        - Now you can use web3.eth.send_transaction(), Contract.functions.xxx.transact() functions with your local private key through middleware and you no longer get the error "ValueError: The method eth_sendTransaction does not exist/is not available.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">2. Error message: eth_feeHistory or eth_maxPriorityFeePerGas method does not exist</Accordion.Header>
    <Accordion.Body>
          - Web3.js will try to use these methods because the Ethereum London fork introduced `maxFeePerGas` and `maxPriorityFeePerGas` transaction parameters that can be used instead of `gasPrice`, which Rootstock uses. For that reason, we have to define Web3’s behavior for populating the gas price. This is done using a “Gas Price Strategy” - a method which takes the Web3 object and a transaction dictionary and returns a gas price (denominated in wei).
          - A gas price strategy is implemented as a python method with the following signature, and by setting the gas price strategy by calling [set_gas_price_strategy()](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.set_gas_price_strategy).
                - Setting a specific gas price:
          ```bash
            from web3 import Web3, HTTPProvider

            # specify Gas Price in wei
            GAS_PRICE = 60000000

            def gas_price_strategy(web3, transaction_params=None):
                return GAS_PRICE

            # set the gas price strategy
            w3.eth.set_gas_price_strategy(gas_price_strategy)
            ```
            - Using `eth_gasPrice` method:
            - Makes a call to the [JSON-RPC eth_gasPrice method](https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_gasprice) which returns the gas price configured by the connected Ethereum node.
            ```bash
                from web3.gas_strategies.rpc import rpc_gas_price_strategy
                from web3 import Web3, HTTPProvider

                RPC_PROVIDER = 'https://rpc.testnet.rootstock.io/{API_KEY}'

                w3 = Web3(HTTPProvider(RPC_PROVIDER))
                w3.eth.set_gas_price_strategy(rpc_gas_price_strategy)

                gasPrice = w3.eth.generate_gas_price()

                print('gasPrice: ', gasPrice)
        ```
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
````

#### Recursos

- [Web3.py: Estrategia de precios del gas](https://web3py.readthedocs.io/en/stable/gas_price.html#gas-price)
- [Infura: eth_accounts](https://docs.infura.io/api/networks/ethereum/json-rpc-methods/eth_accounts)
- [Infura: eth_sendTransaction](https://docs.infura.io/api/networks/ethereum/json-rpc-methods/eth_sendtransaction)
- [Web3.py: Trabajo con claves privadas locales](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#working-with-local-private-keys)
- [Web3.py: Ejemplo de despliegue de contratos](https://web3py.readthedocs.io/en/stable/web3.contract.html)
- [Web3.py: Firmar una transacción contractual](https://web3py.readthedocs.io/en/stable/providers.html)
- [Web3.py: Configuración de un proveedor RPC](https://web3py.readthedocs.io/en/stable/providers.html)
