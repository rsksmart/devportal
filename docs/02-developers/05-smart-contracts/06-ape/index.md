---
section_position: 200 
sidebar_label: Getting Started with Ape
title: Getting Started with Apeworx
description: 'How to compile, deploy, and intereact with smart contracts with Ape on Rootstock'
tags: [rsk, ape, apeworx, developers, developer tools, rootstock, testing, dApps, smart contracts]
---

In this guide, we will learn about [Ape Framework](https://apeworx.io/framework/) and its benefits for smart contract development, how to setup your environment, create a Ape project and execute a deployment script.

[Ape Framework](https://apeworx.io/framework/) is an easy-to-use Web3 development tool. Users can compile, test, and interact with smart contracts all in one command line session. With their [modular plugin system](https://github.com/ApeWorX/ape?tab=readme-ov-file#plugin-system), Ape supports multiple contract languages and chains.

## Prerequisites

To get started with Ape, ensure the following tools are installed:
- Linux or macOS
- Python 3.9 up to 3.12
- Windows: Install Windows Subsystem Linux [(WSL](https://learn.microsoft.com/en-us/windows/wsl/install))
- Check your python version in a terminal with python3 --version.

## Create a Ape project

To start a new project with Ape, you have to install Ape and then create a new one:

1. Create a directory for your project
    ```bash
    mkdir ape && cd ape
    ```

2. In case you don't have [pipx](https://github.com/pypa/pipx) instelled, intall it
    ```bash
    python3 -m pip install --user pipx
    python3 -m pipx ensurepath
    ```

3. Install Ape using pipx
    ```bash
    pipx install eth-ape
    ```

4. Create an empty project
    ```bash
    ape init
    ```
5. Enter a name for your project
    ```bash
    ape init
    Please enter project name: ape-rootstock-demo
    
    SUCCESS: ape-rootstock-demo is written in ape-config.yaml

    ls
    ape-config.yaml	contracts	scripts		tests
    ```

A common project structure looks like this:

```
project                             # The root project directory
├── contracts/                      # Project source files, such as '.sol' or '.vy' files
│   └── smart_contract_example.sol  # Sample of a smart contract
├── tests/                          # Project tests, ran using the 'ape test' command
│   └── test_sample.py              # Sample of a test to run against your sample contract
├── scripts/                        # Project scripts, such as deploy scripts, ran using the 'ape run   <`name>' command
│   └── deploy.py                   # Sample script to automate a deployment of an ape project
└── ape-config.yaml                 # The ape project configuration file
```

> Notice that you can configure you ape project using the ape-config.yaml file. See the [configuration guide](https://docs.apeworx.io/ape/stable/userguides/config.html) for a more detailed explanation of settings you can adjust.

## Create an Account

You will need to create an account and send funds to it before you can deploy smart contract or intereact with previously deployed contracts from your Ape project. You can run the following command, wich will generate an account.

```bash
ape accounts generate <ALIAS>
```

You'll then be prompted to add random input to enhence the security and add a password to encrypt your account.

```
ape accounts generate dev
Enhance the security of your account by adding additional random input:
Show mnemonic? [Y/n]: n
Create Passphrase to encrypt account:
Repeat for confirmation:
SUCCESS: A new account '0x260C915483943bf65596c298D2b46b8D67fF2FE5' with HDPath m/44'/60'/0'/0/0 has been added with the id 'dev'
```

> If you do not want to see your mnemonic you can select n. Alternatively, you can use the `--hide-mnemonic` option to skip the prompt.

> Don't forget to add funds to your account.

> If you want to import an existing account check [Importing Existing Accounts](https://docs.apeworx.io/ape/stable/userguides/accounts.html#importing-existing-accounts) documentation.

## Write your first contract

As an example, You can use the following Box contract to store and retrieve a value.

Fist crate a file named `Box.sol`inside the contracts directory:

```bash
touch contracts/Box.sol
```

Open the file and add the following contract to it:

```
// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.1;

contract Box {
    uint256 private value;

    event ValueChanged(uint256 newValue);

    function store(uint256 newValue) public {
        value = newValue;
        emit ValueChanged(newValue);
    }

    function retrieve() public view returns (uint256) {
        return value;
    }
}
```

## Compile the contract

Before compiling the Solidity, you must install the Solidity compiler plugin. Running the following command will install the latest version of the plugin:

```bash
ape plugins install solidity
```

To use a specific version of Solidity or a specific EVM version, you can modify your `ape-config.yaml` file as follows:

```
solidity:
  version: INSERT_VERSION
  evm_version: INSERT_VERSION
```
> For more information about Solidity plugin, check [ape-solidity](https://github.com/ApeWorX/ape-solidity/blob/main/README.md)

After you do the installation, you can compile the contract using the following command:
```bash
ape compile
```
```
ape compile
INFO: Compiling using Solidity compiler '0.8.25+commit.b61c2a91'.
Input:
        contracts/Box.sol
SUCCESS: 'local project' compiled.
```

After compilation, you can find the bytecode and ABI for your contracts in the .build directory.

## Deploy contract on the Rootstock

To deploy the box contract on Rootstock mainnet or testnet install [ape-rootstock](https://pypi.org/project/ape-rootstock/) plugin. This will allow you to connect to Rootstock networks.

```bash
ape plugins install ape-rootstock
```

Then, create a deployment script named `deploy.py` inside of the `scripts`directory

```bash
touch scripts/deploy.py
```

Next, you'll need to write the deployment script. You'll need to load the account you will use to deploy the contract and access it by its name using the project manager.

```python
from ape import project, accounts


def main():
    # Load your account by its name
    account = accounts.load("dev")
    # Deploy the contract using your account
    return account.deploy(project.Box)
```

Now you're ready to deploy the Box contract! Follow the next steps:

1. Run the deployment script using the ape run deploy command
    ```bash
    ape run deploy --network rootstock:testnet
    ```

    > For mainnet deployment use `--network rootstock:mainnet`

2. Review the transaction details and enter y to sign the transaction
3. Enter your passphrase for your account
4. Enter y to leave your account unlocked or n to lock it

After you follow the prompts and submit the transaction, the transaction hash, total fees paid, and contract address will be displayed in the terminal.

```
ape run deploy --network rootstock:testnet
INFO: Connecting to a 'rskj' node.
StaticFeeTransaction:
  chainId: 31
  from: 0x260C915483943bf65596c298D2b46b8D67fF2FE5
  gas: 101643
  nonce: 0
  value: 0
  data: 0x307836...303333
  gasPrice: 65164000

Sign:  [y/N]: y
Enter passphrase to unlock 'dev' []: 
Leave 'dev' unlocked? [y/N]: y
INFO: Submitted 0xf837d08ac7bab308b9ae3276e15b1dfd69a0888725a779363cfe2939c6b5be5f
Confirmations (1/1): 100%|███████████████████████████████████████████████████████████████████████████| 1/1 [00:30<00:00, 30.63s/it]
INFO: Confirmed 0xf837d08ac7bab308b9ae3276e15b1dfd69a0888725a779363cfe2939c6b5be5f (total fees paid = 6623464452000)
INFO: Confirmed 0xf837d08ac7bab308b9ae3276e15b1dfd69a0888725a779363cfe2939c6b5be5f (total fees paid = 6623464452000)
SUCCESS: Contract 'Box' deployed to: 0x3F64cFe812c342069e510CBF581A30BEfd5897F8
```

**Congratulations! Your contract is now active. Please ensure you save the address to facilitate interaction with it in the following section.**

### Using The Ape Console

To interact with your newly deployed contract, you can launch the Ape console by running:

```bash
ape console --network:rootstock:testnet
```
Next, you have to create a contract instance using the contract's address:
```bash
box = Contract("INSERT_CONTRACT_ADDRESS")
```

```
ape console --network rootstock:testnet   
INFO: Connecting to a 'rskj' node.

In [1]: dev = accounts.load("dev")
In [2]: box = Contract("0x3F64cFe812c342069e510CBF581A30BEfd5897F8")
```

Now, you can interact with your contract instance! For example, you can set the variable to be stored in the Box contract using the following commands:

- Call the store method by passing in a value to store and the account you want to use to send the transaction:
```
box.store(2, sender=dev)
```
- Review the transaction details and type "y" to sign the transaction.
- If your account is currently locked, enter your passphrase to unlock it. Otherwise, Ape will use the cached key from your account.
- If you unlocked your account in the previous step, you'll be asked whether you'd like to keep it unlocked. Enter "y" to keep it unlocked or "n" to lock it.

After completing these steps and submitting the transaction, the transaction hash and total fees will be shown in the terminal.

```
In [3]: box.store(2, sender=dev)
StaticFeeTransaction:
  chainId: 31
  to: 0x3F64cFe812c342069e510CBF581A30BEfd5897F8
  from: 0x260C915483943bf65596c298D2b46b8D67fF2FE5
  gas: 42490
  nonce: 1
  value: 0
  data: 0x307836...303032
  gasPrice: 65164000

Sign:  [y/N]: y
Enter passphrase to unlock 'dev' []: 
Leave 'dev' unlocked? [y/N]: y
INFO: Submitted 0x9224a7958c89272c3d41147b2e96df33d205ad5632c07fe40016be012721cf00
Confirmations (1/1): 100%|███████████████████████████████████████████████████████████████████████████| 1/1 [00:15<00:00, 15.38s/it]
INFO: Confirmed 0x9224a7958c89272c3d41147b2e96df33d205ad5632c07fe40016be012721cf00 (total fees paid = 2768818360000)
INFO: Confirmed 0x9224a7958c89272c3d41147b2e96df33d205ad5632c07fe40016be012721cf00 (total fees paid = 2768818360000)
Out[3]: <Receipt 0x9224a7958c89272c3d41147b2e96df33d205ad5632c07fe40016be012721cf00>
```

You can retrive the stored value by calling the retrieve method:
```bash
box.retrieve()
```
```
In [5]: box.retrieve()
Out[5]: 2
```
**Well done! You have successfully deployed and interacted with a contract on the Rootstock network using Ape!**

> See the [Ape Documenetation](https://docs.apeworx.io/).