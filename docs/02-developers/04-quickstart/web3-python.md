---
sidebar_label: Web3.py
sidebar_position: 107
title:  Deploy and Interact with a Smart Contract using Web3.py
description: 'Deploy and Interact with a Smart Contract Using Web3.py.'
tags: [quick starts, rsk, rootstock, ethereum, python, web3.py, developers, smart contracts]
---

[Web3.py](https://web3py.readthedocs.io/en/stable/) is a Python library that allows developers to interact with Ethereum-based blockchains with Python. Rootstock has an Ethereum-like API available that is fully compatible with Ethereum-style JSON-RPC invocations. Therefore, developers can leverage this compatibility and use the `Web3.py` library to interact with Rootstock similar to how developers interact with smart contracts on Ethereum.

In this guide, you'll learn how to use the Web3.py library to deploy and interact with smart contracts on Rootstock.

:::tip[Interact with Rootstock using Rust]
See tutorial on how to [interact with Rootstock using Rust](/resources/tutorials/rootstock-rust/)
:::

## Prerequisites

- A testnet account with tRBTC funds. 
    - [Get tRBTC](https://faucet.rootstock.io/).
- An API KEY from the [Rootstock RPC Service](https://rpc.rootstock.io/).
- Set up the project
- A Solidity Compiler installed -> see [solidity compiler installation instructions](https://docs.soliditylang.org/en/latest/installing-solidity.html)

Set up the project and install dependencies:

```bash
# create a directory for the project
mkdir web3-python-guide && cd web3-python-guide

# install python 3.10
brew install python@3.10

# set up the development virtual environment
python3.10 -m venv env
source env/bin/activate

# install dependencies
pip install Web3 py-solc-x
```

Solidity compiler installation instructions for MacOs:

```bash
brew install solc-select
solc-select use 0.8.19 --always-install

solc --version
# Version: 0.8.19+commit.7dd6d404.Darwin.appleclang
```

### Set Up Secrets for the Project

We will be using sensitive data that doesn’t have to be stored in the code, and instead we will store them in a `.env` file.

For that, first lets install the package to read data from the `.env` file:

```python
pip install python-dotenv
```

Then, we will create a `.env` file and add the secrets:

```bash
touch .env
```

add the following variables to the file:

Replace `YOUR_APIKEY` with the API key from your dashboard.

```bash
# get this YOUR_APIKEY from the Rootstock RPC Service. 
RPC_PROVIDER_APIKEY = '{YOUR_APIKEY}'

# this is the private key of the account from which you will deploy the contract
ACCOUNT_PRIVATE_KEY = '{YOUR_PRIVATE_KEY}'
```


## Deploy a smart contract

### Write the smart contract

The contract to be compiled and deployed in the next section is a simple contract that stores a message, and will allow for setting different messages by sending a transaction. 

You can get started by creating a file for the contract:

```bash
touch Greeter.sol
```

Next, add the Solidity code to the file:

```s
// SPDX-License-Identifier: MIT

pragma solidity >0.5.0;

contract Greeter {
    string public greeting;

    constructor() public {
        greeting = 'Hello';
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    function greet() view public returns (string memory) {
        return greeting;
    }
}
```

The constructor function, which runs when the contract is deployed, sets the initial value of the string variable stored on-chain to “Hello”. The setGreeting function adds the `_greeting` provided to the greeting, but a transaction needs to be sent, which modifies the stored data. Lastly, the `greet` function retrieves the stored value.


### Compile the smart contract

We will create a script that uses the Solidity compiler to output the bytecode and interface (ABI) for the `Greeter.sol` contract. To get started, we will create a `compile.py` file by running:

```bash
touch compile.py
```

Next, we will create the script for this file and complete the following steps:
Import the `solcx` package, which will compile the source code
Compile the `Greeter.sol` contract using the `solcx.compile_files` function
Export the contract's ABI and bytecode

Code and paste the code below into `compile.py`;

```s
import solcx
solcx.install_solc('0.8.19')

# Compile contract
temp_file = solcx.compile_files(
    'Greeter.sol',
    output_values=['abi', 'bin'],
    solc_version='0.8.19'
)

# Export contract data
abi = temp_file['Greeter.sol:Greeter']['abi']
bytecode = temp_file['Greeter.sol:Greeter']['bin']
```

You can now run the script to compile the contract:

```python
python compile.py
```


### Deploy the smart contract

With the script for compiling the `Greeter.sol` contract in place, you can then use the results to send a signed transaction that deploys it. To do so, you can create a file for the deployment script called `deploy.py`:

```bash
touch deploy.py
```

Next, you will create the script for this file and complete the following steps:

1. Add imports, including `Web3.py` and the ABI and bytecode of the `Greeter.sol` contract
2. Set up the Web3 provider

In order to set up the Web3 Provider, we have to read the environment variables that we previously added to the .env file.

```text
# Add the Web3 Provider
RPC_PROVIDER_APIKEY = os.getenv('RPC_PROVIDER_APIKEY')
RPC_PROVIDER_URL = 'https://rpc.testnet.rootstock.io/' + RPC_PROVIDER_APIKEY
web3 = Web3(Web3.HTTPProvider(RPC_PROVIDER_URL))
```

3. Define the `account_from`. The private key is required to sign the transaction. Note: This is for example purposes only. Never store your private keys in your code

```text
# Set the default account
PRIVATE_KEY = os.getenv('ACCOUNT_PRIVATE_KEY')
account_from = {
    'private_key': PRIVATE_KEY,
    'address': web3.eth.account.from_key(PRIVATE_KEY).address
}
```

4. Create a contract instance using the `web3.eth.contract` function and passing in the ABI and bytecode of the contract
5. Set the [gas price strategy](https://web3py.readthedocs.io/en/stable/gas_price.html#gas-price) using the `web3.eth.set_gas_price_strategy` function, which will allow us to fetch the gasPrice from the RPC Provider. This is important because otherwise the Web3 library will attempt to use `eth_maxPriorityFeePerGas` and `eth_feeHistory` RPC methods, which are only supported by post-London Ethereum nodes. 
6. Build a constructor transaction using the contract instance. You will then use the `build_transaction` function to pass in the transaction information including the `from` address and the `nonce` for the sender. To get the `nonce` you can use the `web3.eth.get_transaction_count` function
7. Sign the transaction using the `web3.eth.account.sign_transaction` function and pass in the constructor transaction and the `private_key` of the sender
8. Using the signed transaction, you can then send it using the `web3.eth.send_raw_transaction` function and wait for the transaction receipt by using the `web3.eth.wait_for_transaction_receipt` function

Code and paste the code below into `deploy.py`;

```bash
from compile import abi, bytecode
from web3 import Web3
from web3.gas_strategies.rpc import rpc_gas_price_strategy
from dotenv import load_dotenv
import os

load_dotenv()

# Add the Web3 Provider
RPC_PROVIDER_APIKEY = os.getenv('RPC_PROVIDER_APIKEY')
RPC_PROVIDER_URL = 'https://rpc.testnet.rootstock.io/' + RPC_PROVIDER_APIKEY
web3 = Web3(Web3.HTTPProvider(RPC_PROVIDER_URL))


# Set the default account
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

# Build the transaction
construct_txn = Greeter.constructor().build_transaction({
    'from': account_from['address'],
    'nonce': web3.eth.get_transaction_count(account_from['address']),
    'gasPrice': web3.eth.generate_gas_price()
})

# Sign the transaction that deploys the contract
signed_txn = web3.eth.account.sign_transaction(construct_txn, account_from['private_key'])

# Send the transaction that deploys the contract
txn_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)

# Wait for the transaction to be mined, and get the transaction receipt
txn_receipt = web3.eth.wait_for_transaction_receipt(txn_hash)
print(f"Transaction successful with hash: { txn_receipt.transactionHash.hex() }")
print(f"Contract deployed at address: { txn_receipt.contractAddress }")
```

Now you can run the script and get the result.

```python
python deploy.py

>> Attempting to deploy from account:  0x3b32a6463Bd0837fBF428bbC2A4c8B4c022e5077
>> Transaction successful with hash: 0x98a256c106bdb65e4de6a267e94000acdfe0d6f23c3dc1444f14dccf00713a69
>> Contract deployed at address: 0xba39f329255d55a0276c695111b2edc9250C2341
```

Note: Save the contract address, as we will use it later in the guide.

## Interact with a smart contract

### Read Contract Data (Call Methods)

Call methods are the type of interaction that don't modify the contract's storage (change variables), meaning no transaction needs to be sent. They simply read various storage variables of the deployed contract.

To get started, you can create a file and name it `getMessage.py`:

```text
touch getMessage.py
```

Then you can take the following steps to create the script:

1. Add imports, including `Web3.py` and the ABI of the `Greeter.sol` contract
2. Set up the Web3 provider and replace YOUR_APIKEY
3. De fine the `contract_address` of the deployed contract
4. Create a contract instance using the `web3.eth.contract` function and passing in the ABI and address of the deployed contract
5. Using the contract instance, you can then call the `greet` function

Code and paste the code below into `getMessage.py`;

```bash
from compile import abi
from web3 import Web3
from dotenv import load_dotenv
import os

load_dotenv()

# Add the Web3 Provider
RPC_PROVIDER_APIKEY = os.getenv('RPC_PROVIDER_APIKEY')
RPC_PROVIDER_URL = 'https://rpc.testnet.rootstock.io/' + RPC_PROVIDER_APIKEY
web3 = Web3(Web3.HTTPProvider(RPC_PROVIDER_URL))


# Create address variable (use the address of the contract you just deployed)
contract_address = '0xba39f329255d55a0276c695111b2edc9250C2341'

print(f"Making a call to contract at address: { contract_address }")

# Create contract instance
Greeter = web3.eth.contract(address=contract_address, abi=abi)

# Call the contract
call_result = Greeter.functions.greet().call()
print(f"Contract returned: { call_result }")
```

If successful, the response will be displayed in the terminal:

```python
python getMessage.py

>> Making a call to contract at address: 0xba39f329255d55a0276c695111b2edc9250C2341
>> Contract returned: Hello
```

### Write data to the contract (Write Methods)

Write methods are the type of interaction that modify the contract's storage (change variables), meaning a transaction needs to be signed and sent. In this section, you'll create the script to change the text stored in the Greeter contract. 

To get started, you can create a file for the script and name it `setMessage.py`:

```bash
touch setMessage.py
```

Open the `setMessage.py` file and take the following steps to create the script:

1. Add imports, including Web3.py and the ABI of the Incrementer.sol contract
2. Set up the Web3 provider
3. Define the `account_from` variable, including the `private_key`, and the `contract_address` of the deployed contract. The private key is required to sign the transaction. Note: This is for example purposes only. Never store your private keys in your code
4. Create a contract instance using the `web3.eth.contract` function and passing in the ABI and address of the deployed contract
5. Set the gas price strategy using the `web3.eth.set_gas_price_strategy` function, which will allow us to fetch the gasPrice from the RPC Provider. This is important because otherwise the Web3 library will attempt to use `eth_maxPriorityFeePerGas` and `eth_feeHistory` RPC methods, which are only supported by post-London Ethereum nodes. 
6. Build the `setGreeting` transaction using the contract instance and passing in the new message. You'll then use the `build_transaction` function to pass in the transaction information including the `from` address and the `nonce` for the sender. To get the `nonce` you can use the `web3.eth.get_transaction_count` function
7. Sign the transaction using the `web3.eth.account.sign_transaction` function and pass in the `setGreeting` transaction and the `private_key` of the sender
8. Using the signed transaction, you can then send it using the `web3.eth.send_raw_transaction` function and wait for the transaction receipt by using the `web3.eth.wait_for_transaction_receipt` function

Code and paste the code below into `setMessage.py`;

```bash
from compile import abi
from web3 import Web3
from web3.gas_strategies.rpc import rpc_gas_price_strategy
from dotenv import load_dotenv
import os

load_dotenv()

# Add the Web3 Provider
RPC_PROVIDER_APIKEY = os.getenv('RPC_PROVIDER_APIKEY')
RPC_PROVIDER_URL = 'https://rpc.testnet.rootstock.io/' + RPC_PROVIDER_APIKEY
web3 = Web3(Web3.HTTPProvider(RPC_PROVIDER_URL))


# Set the default account
PRIVATE_KEY = os.getenv('ACCOUNT_PRIVATE_KEY')
account_from = {
    'private_key': PRIVATE_KEY,
    'address': web3.eth.account.from_key(PRIVATE_KEY).address
}

# Create address variable
contract_address = '0xba39f329255d55a0276c695111b2edc9250C2341'

# Create contract instance
Greeter = web3.eth.contract(address=contract_address, abi=abi)

# Set the gas price strategy
web3.eth.set_gas_price_strategy(rpc_gas_price_strategy)

# Build the transaction
txn = Greeter.functions.setGreeting('Hello, World!').build_transaction({
    'from': account_from['address'],
    'nonce': web3.eth.get_transaction_count(account_from['address']),
    'gasPrice': web3.eth.generate_gas_price()
})

# Sign the transaction
signed_txn = web3.eth.account.sign_transaction(txn, account_from['private_key'])

# Send the transaction
txn_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
txn_receipt = web3.eth.wait_for_transaction_receipt(txn_hash)

print(f"Transaction successful with hash: { txn_receipt.transactionHash.hex() }")
```

If successful, the transaction hash will be displayed in the terminal. 

```python
python setMessage.py

>> Transaction successful with hash: 0x95ba4e13269aba8e51c3037270c0ee90f4872c36e076fc94e51226c1597f6d86
```

You can now run the `getMessage.py` script to get the new value stored at the contract.

```python
python getMessage.py

>> Making a call to contract at address: 0xba39f329255d55a0276c695111b2edc9250C2341
>> Contract returned: Hello, World!
```

## Sending transactions

Here you will understand how to check the balance of an account, and how to send `tRBTC` from one account to another.

### Check the balance of an account
Here you will create a script that checks the balance of an account.
First, start by creating a file for the script.

```python
touch balances.py
```

Next, you will create the script for this file and complete the following steps:

1. Set up the Web3 provider
2. Define the `address_from` and `address_to` variables
3. Get the balance for the accounts using the `web3.eth.get_balance` function and format the 3. results using the `web3.from_wei`

Code and paste the code below into `balances.py`;

```bash
from web3 import Web3
from dotenv import load_dotenv
import os

load_dotenv()


# Add the Web3 Provider
RPC_PROVIDER_APIKEY = os.getenv('RPC_PROVIDER_APIKEY')
RPC_PROVIDER_URL = 'https://rpc.testnet.rootstock.io/' + RPC_PROVIDER_APIKEY
web3 = Web3(Web3.HTTPProvider(RPC_PROVIDER_URL))


# Create address variables
address_from = '0x3b32a6463Bd0837fBF428bbC2A4c8B4c022e5077'
address_to = '0xcff73226883c1cE8b3bcCc28E45c3c92C843485c'

# Get the balance of the sender
balance_from = web3.from_wei(web3.eth.get_balance(address_from), 'ether')
print(f"Balance of sender address {address_from}: { balance_from } TRBTC")

# Get the balance of the receiver
balance_to = web3.from_wei(web3.eth.get_balance(address_to), 'ether')
print(f"Balance of receiver address {address_to}: { balance_to } TRBTC")
```

Run the script:

```python
python balances.py

# >> Balance of sender address 0x3b32a6463Bd0837fBF428bbC2A4c8B4c022e5077: 0.192538506119378425 TRBTC
# >> Balance of receiver address 0xcff73226883c1cE8b3bcCc28E45c3c92C843485c: 0.407838671951567233 TRBTC
```

### Send TRBTC

Here you will create a script to send tRBTC from one account to another.
First, start by creating a file for the script.

```bash
touch transaction.py
```

Next, you will create the script for this file and complete the following steps:

1. Add imports, including `Web3.py` and the `rpc_gas_price_strategy`, which will be used in the following steps to get the gas price used for the transaction
2. Set up the Web3 provider
3. Define the `account_from`, including the `private_key`, and the `address_to` variables. The private key is required to sign the transaction. Note: This is for example purposes only. Never store your private keys in your code
4. Use the `Web3.py` Gas Price API to set a gas price strategy. For this example, you'll use the imported `rpc_gas_price_strategy`. This is important because otherwise the Web3 library will attempt to use `eth_maxPriorityFeePerGas` and `eth_feeHistory` RPC methods, which are only supported by post-London Ethereum nodes.
5. Create and sign the transaction using the `web3.eth.account.sign_transaction` function. Pass in the `nonce`, `gas`, `gasPrice`, `to`, and value for the transaction along with the sender's `private_key`. To get the `nonce` you can use the `web3.eth.get_transaction_count` function and pass in the sender's address. To predetermine the `gasPrice` you'll use the `web3.eth.generate_gas_price` function. For the value, you can format the amount to send from an easily readable format to Wei using the `web3.to_wei` function
6. Using the signed transaction, you can then send it using the `web3.eth.send_raw_transaction` function and wait for the transaction receipt by using the `web3.eth.wait_for_transaction_receipt` function

Code and paste the code below into `transaction.py`;

```bash
from web3 import Web3
from web3.gas_strategies.rpc import rpc_gas_price_strategy
from dotenv import load_dotenv
import os

load_dotenv()

# Add the Web3 Provider
RPC_PROVIDER_APIKEY = os.getenv('RPC_PROVIDER_APIKEY')
RPC_PROVIDER_URL = 'https://rpc.testnet.rootstock.io/' + RPC_PROVIDER_APIKEY
web3 = Web3(Web3.HTTPProvider(RPC_PROVIDER_URL))



# Set the default account
PRIVATE_KEY = os.getenv('ACCOUNT_PRIVATE_KEY')
account_from = {
    'private_key': PRIVATE_KEY,
    'address': web3.eth.account.from_key(PRIVATE_KEY).address
}
address_to = '0xcff73226883c1cE8b3bcCc28E45c3c92C843485c'

print(f"Attempting to send transaction from { account_from['address'] } to { address_to }")

# Set the gas price strategy
web3.eth.set_gas_price_strategy(rpc_gas_price_strategy)

# Build the transaction
txn = {
    'to': address_to,
    'value': web3.to_wei(0.0001, 'ether'),
    'gas': 21000,
    'gasPrice': web3.eth.generate_gas_price(),
    'nonce': web3.eth.get_transaction_count(account_from['address'])
}

# Sign the transaction
signed_txn = web3.eth.account.sign_transaction(txn, account_from['private_key'])

# Send the transaction
txn_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)

# Wait for the transaction to be mined, and get the transaction receipt
txn_receipt = web3.eth.wait_for_transaction_receipt(txn_hash)
print(f"Transaction successful with hash: { txn_receipt.transactionHash.hex() }")
```

Run the script:

```python
python transaction.py

Attempting to send transaction from 0x112621448Eb148173d5b00edB14B1f576c58cCEE to 0xcff73226883c1cE8b3bcCc28E45c3c92C843485c
Transaction successful with hash: 0x79ab8be672b0218d31f81876c34321ee7b08e6a4ec8bfff5249f70c443cbce00
```

## Summary

In this guide, we learnt how to use the Web3.py library to deploy, interact with a smart contract and send transactions on Rootstock. 

## Troubleshooting

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

#### Resources
- [Web3.py: Gas Price Strategy](https://web3py.readthedocs.io/en/stable/gas_price.html#gas-price)
- [Infura: eth_accounts](https://docs.infura.io/api/networks/ethereum/json-rpc-methods/eth_accounts)
- [Infura: eth_sendTransaction](https://docs.infura.io/api/networks/ethereum/json-rpc-methods/eth_sendtransaction)
- [Web3.py: Working with Local Private Keys](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#working-with-local-private-keys)
- [Web3.py: Contract Deployment Example](https://web3py.readthedocs.io/en/stable/web3.contract.html)
- [Web3.py: Sign a Contract Transaction](https://web3py.readthedocs.io/en/stable/providers.html)
- [Web3.py: Setting up an RPC Provider](https://web3py.readthedocs.io/en/stable/providers.html)