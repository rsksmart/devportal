---
section_position: 100
sidebar_label: Ape
title: Getting Started with Ape
description: 'How to compile, deploy, and intereact with smart contracts with Ape on Rootstock'
tags: [rsk, ape, apeworx, developers, developer tools, tRBTC, rootstock, testing, dApps, smart contracts]
---

The [Ape Framework](https://apeworx.io/framework/) is an easy-to-use Web3 development tool. Developers can compile, test, and interact with smart contracts all in one command line session. With its [modular plugin system](https://github.com/ApeWorX/ape?tab=readme-ov-file#plugin-system), Ape supports multiple contract languages and chains including Rootstock.

In this guide, we will learn about the [Ape Framework](https://apeworx.io/framework/) and its benefits for smart contract development, how to setup your development environment, create a Ape project and execute a deployment script for Rootstock.

## Prerequisites
To get started with Ape, ensure the following tools are installed:
- Linux or macOS
- Python 3.9 up to 3.12
- Windows: Install Windows Subsystem Linux [(WSL](https://learn.microsoft.com/en-us/windows/wsl/install)
- Check the python version in a terminal with python3 --version.

## Create a Ape project
To start a new project with Ape, install Ape and then create a new one:

1. Create a directory for the project
    ```bash
    mkdir ape && cd ape
    ```

2. Install pipx

> Only neccessary if you don't have [pipx](https://github.com/pypa/pipx) installed:
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

:::tip[Tip]

You can configure the ape project using the `ape-config.yaml` file. See the [configuration guide](https://docs.apeworx.io/ape/stable/userguides/config.html) for a more detailed explanation of the settings to adjust.

:::

## Create an Account

We will create an account and send funds to it before we can deploy a smart contract or interact with previously deployed contracts from the Ape project. Run the following command to generate an account.

```bash
ape accounts generate <ALIAS>
```

> Use `dev` to replace ALIAS.

You will be prompted to add random input to enhance the security and add a password to encrypt the account.

```bash
ape accounts generate dev
Enhance the security of your account by adding additional random input:
Show mnemonic? [Y/n]: n
Create Passphrase to encrypt account:
Repeat for confirmation:
SUCCESS: A new account '0x260C915483943bf65596c298D2b46b8D67fF2FE5' with HDPath m/44'/60'/0'/0/0 has been added with the id 'dev'
```

:::tip[Tip]
If you do not want to see your mnemonic, select `n`. Alternatively, use the `--hide-mnemonic` option to skip the prompt.
:::

:::warning[Warning]

Don't forget to add funds to the account generated. To get tRBTC, use the [Rootstock Faucet](https://faucet.rootstock.io/). Additional faucet options include; [Thirdweb](https://thirdweb.com/rootstock-testnet) and [Blast](https://blastapi.io/faucets/rootstock-testnet) Faucets.

To import an existing account check [Importing Existing Accounts](https://docs.apeworx.io/ape/stable/userguides/accounts.html#importing-existing-accounts) documentation.

:::

## Write your first contract

As an example, You can use the following Box contract to store and retrieve a value.

Fist create a file named `Box.sol`inside the contracts directory:

```bash
touch contracts/Box.sol
```

Open the file and add the following contract to it:

```solidity
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

Before compiling the Solidity, ensure to install the Solidity compiler plugin. Running the following command will install the latest version of the plugin:

```bash
ape plugins install solidity
```

To use a specific version of Solidity or a specific EVM version, modify the `ape-config.yaml` file as follows:

```text
solidity:
  version: INSERT_VERSION
  evm_version: INSERT_VERSION
```

> For more information about the Solidity plugin, check [ape-solidity](https://github.com/ApeWorX/ape-solidity/blob/main/README.md)

After installation, compile the contract using the following command:

```bash
ape compile
```

Result:

```bash
ape compile
INFO: Compiling using Solidity compiler '0.8.25+commit.b61c2a91'.
Input:
        contracts/Box.sol
SUCCESS: 'local project' compiled.
```

After compilation, you can find the bytecode and ABI for your contracts in the `.build` directory.

## Deploy contract on Rootstock

To deploy the box contract on Rootstock mainnet or testnet, install [ape-rootstock](https://pypi.org/project/ape-rootstock/) plugin. This will allow for connection to Rootstock networks.

```bash
ape plugins install ape-rootstock
```

Result:

```text
Install the 'rootstock' plugin? [y/N]: y
INFO: Installing 'rootstock' plugin ...
SUCCESS: Plugin 'rootstock' has been installed.
```

Then, create a deployment script named `deploy.py` inside of the `scripts`directory

```bash
touch scripts/deploy.py
```

Next, we'll need to write the deployment script. We will need to load the account needed to be used to deploy the contract and access it by its name using the project manager.

Add the following into `deploy.py` file:

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

    > For mainnet deployment, use `--network rootstock:mainnet`

2. Review the transaction details and enter y to sign the transaction
3. Enter the passphrase for your account
4. Enter y to exit your account unlocked or n to lock it

After following the prompts and submitting the transaction, the transaction hash, total fees paid, and contract address will be displayed in the terminal.

```python
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

:::tip[Tip]

If you get the error: `ERROR: (VirtualMachineError) (-32010) the sender account doesn't exist`

Ensure to have [tRBTC](https://faucet.rootstock.io/) in the address generated in [create an account](#create-an-account).
:::

### Using The Ape Console

To interact with the newly deployed contract, launch the Ape console by running:

```bash
ape console --network rootstock:testnet
```
Next, we have to create a contract instance using the contract's address:
```bash
box = Contract("INSERT_CONTRACT_ADDRESS")
```

**Enter the values below in the shell:**

```python
ape console --network rootstock:testnet   
INFO: Connecting to a 'rskj' node.

In [1]: dev = accounts.load("dev")
In [2]: box = Contract("0xA183c4DB0Fe974244F506069B09953119667505c")
```

Now, you can interact with the contract instance! For example, set the variable to be stored in the Box contract using the following commands:

- Call the store method by passing in a value to store, and the account to send the transaction:

```text
box.store(2, sender=dev)
```
- Press enter, and review the transaction details and type "y" to sign the transaction.
- If your account is currently locked, enter the passphrase to unlock it. Otherwise, Ape will use the cached key from your account.
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

Enter the values in the shell:

```bash
In [5]: box.retrieve()
Out[5]: 2
```
**Well done! We have successfully deployed and interacted with a contract on the Rootstock network using Ape!**

## Resources
- See the [Ape Documenetation](https://docs.apeworx.io/).