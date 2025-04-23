---
sidebar_label: Vyper
sidebar_position: 106
title: Rootstock Vyper Starter Kit
description: The Rootstock Vyper Starter Kit guide demonstrates how to deploy smart contracts written in Vyper to the Rootstock testnet using Python and Web3.py. We'll create a simple Vyper contract and deploy it to the Rootstock network, set up the environment, and configure the network for Rootstock.
tags:
  - rsk
  - rootstock
  - developers
  - vyper
  - quickstart
  - python
  - Smart Contracts
---

Rootstock is a layer 2 solution that combines the security of Bitcoin's proof of work with Ethereum's smart contract capabilities. The platform is open-source, EVM-compatible, and secured by over 60% of Bitcoin’s hashing power, offering unique benefits for developers looking to build and deploy dApps on Bitcoin. Some of these benefits include:

- **Bitcoin Compatibility**: Deploy smart contracts while leveraging Bitcoin's network security
- **EVM Compatibility**: Use familiar Ethereum tools and practices while building on Bitcoin
- **Lower Fees**: Benefit from low transaction fees on Rootstock
- **Scalability**: Handle a higher volume of transactions without congestion

This guide demonstrates how to deploy smart contracts written in Vyper to the Rootstock testnet using Python and Web3.py. We'll create a simple Vyper contract and deploy it to the Rootstock network, set up the environment, and configure the network for Rootstock.

Whether you're an experienced Ethereum developer looking to deploy smart contracts on Bitcoin (Rootstock), or just starting your blockchain journey, this guide will help you get up and running with deploying Vyper Smart Contracts on the Rootstock network.

## Prerequisites

- [uv](https://docs.astral.sh/uv/)
  - To confirm installation, run `uv --version`, it should return a version number.
- [git](https://git-scm.com/)
  - To confirm installation, run `git --version`, it should return a version number.
  - Helpful shortcuts: <Tabs> <TabItem value="bash" label="Bash" default>
    echo "source $HOME/.bashrc >> $HOME/.bash_profile" </TabItem> <TabItem value="zsh" label="ZSH">
    echo "source $HOME/.zshenv >> $HOME/.zprofile" </TabItem> </Tabs>

## Install Python

<Tabs>
  <TabItem value="Windows" label="Windows" default>
    1. Visit the [Python downloads page](https://www.python.org/downloads/)
    2. Click on the "Download Python 3.12.x" button
    3. Run the downloaded installer
    4. Important: Check the box that says "Add Python 3.12 to PATH"
    5. Click "Install Now"
    6. Once installation is complete, open Command Prompt and verify the installation:
        ```bash
        python --version
        ```
  </TabItem>
  <TabItem value="MacOS" label="macOS">
    1. Visit [python.org](https://www.python.org/downloads/)
    2. Under Downloads, go to macOS and download the latest Python 3.12 release
    3. Click the link for the **Python 3.12.x macOS 64-bit universal2 installer**
    4. Open the installer file and agree to the license agreement
    5. Click **Continue**, then **Install**
    6. Once complete, open Terminal and verify the installation:
        ```bash
        python3 --version
        # or
        python --version
        ```
  </TabItem>
  <TabItem value="Linux" label="Linux">
    Most Linux distributions come with Python pre-installed. To verify, open Terminal and run:
    ```bash
    python3 --version
    ```

    If Python is not installed, you can install it using your distribution's package manager:
    
    For Ubuntu/Debian:
    ```bash
    sudo apt update
    sudo apt install python3
    ```
    
    For Fedora:
    ```bash
    sudo dnf install python3
    ```
    
    For Arch Linux:
    ```bash
    sudo pacman -S python
    ```

  </TabItem>
</Tabs>

## Install the Vyper Starter Kit

```bash
git clone https://github.com/rsksmart/rootstock-vyper.git
cd rootstock-vyper
```

### Syncing uv

```bash
uv sync
```

> `uv sync` is a fast package management command that downloads and installs your project's Python dependencies while creating a lockfile for reproducible installations.

### Pip/python

```bash
python -m venv ./venv
source ./venv/bin/activate
pip install -r requirements.txt
```

> The pip/python creates a virtual environment (python -m venv ./venv), activates it (source ./venv/bin/activate), and installs the project dependencies from requirements.txt (pip install -r requirements.txt).

## Starting a basic script

Both `uv run hello.py` and `python hello.py` will run the script and output "Hello from web3py-Vyper-RootStock!", with UV being preferred for faster, modern projects and pip for traditional Python setups.

```bash
uv run hello.py # for UV
# or
python hello.py # for pip/python
```

## Setting up the Python Environment

To set up our Python environment and install the necessary packages, we will do the following:

```bash
# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install required packages
pip install python-dotenv web3 vyper
```

## Configure Environment Variables

Create a `.env` file in the project root and specify your custom configuration:

```text
RPC_URL="https://rpc.testnet.rootstock.io/[YOUR-API-KEY]"
PRIVATE_KEY="your-private-key" 
MY_ADDRESS="your-wallet-address"
```

:::warning\[Warning]

THIS KEY IS ONLY FOR TESTING - TYPICALLY YOU SHOULD NEVER SHARE YOUR PRIVATE KEY.

:::

## Getting Test RBTC

Before deploying, you'll need some tRBTC:

1. Visit the [Rootstock faucet](https://faucet.rootstock.io/)
2. Enter your wallet address
3. Complete the captcha and request funds
4. Wait a few minutes for the transaction to be confirmed

## Writing the Smart Contract

Here's a simple Vyper contract (`favorites.vy`):

```python
# @version ^0.3.7

favorite_number: public(uint256)
owner: public(address)

@external
def __init__():
    self.owner = msg.sender
    self.favorite_number = 0

@external
def store(new_number: uint256):
    self.favorite_number = new_number
```

## Deployment Script

Here's a Python script to deploy the contract (`deploy_favorites_unsafe.py`):

```python
from web3 import Web3
from dotenv import load_dotenv
from vyper import compile_code
import os

load_dotenv()

RPC_URL = os.getenv("RPC_URL")

def main():
    print("Let's read in the Vyper code and deploy it to the blockchain!")
    w3 = Web3(Web3.HTTPProvider(RPC_URL))
    with open("favorites.vy", "r") as favorites_file:
        favorites_code = favorites_file.read()
        compliation_details = compile_code(
            favorites_code, output_formats=["bytecode", "abi"]
        )

    chain_id = 31  # Rootstock testnet chain ID

    print("Getting environment variables...")
    my_address = os.getenv("MY_ADDRESS")
    private_key = os.getenv("PRIVATE_KEY")

    # Check balance before deployment
    balance = w3.eth.get_balance(my_address)
    balance_in_rbtc = w3.from_wei(balance, "ether")
    print(f"Account balance: {balance_in_rbtc} RBTC")

    if balance == 0:
        print("Your account has no RBTC! Please get some testnet RBTC from the faucet:")
        print("1. Go to https://faucet.rsk.co/")
        print("2. Enter your address:", my_address)
        print("3. Complete the captcha and request funds")
        print("4. Wait a few minutes for the transaction to be confirmed")
        return

    # Create the contract in Python
    favorites_contract = w3.eth.contract(
        abi=compliation_details["abi"], bytecode=compliation_details["bytecode"]
    )

    # Submit the transaction that deploys the contract
    nonce = w3.eth.get_transaction_count(my_address)

    print("Building the transaction...")
    transaction = favorites_contract.constructor().build_transaction(
        {
            "chainId": chain_id,
            "from": my_address,
            "nonce": nonce,
            "gas": 3000000,  # Higher gas limit for Rootstock
            "gasPrice": w3.eth.gas_price * 2,  # Double the gas price to ensure transaction goes through
        }
    )

    print("Signing transaction...")
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=private_key)
    print("Deploying contract...")
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(f"Contract deployed! Address: {tx_receipt.contractAddress}")

if __name__ == "__main__":
    main()
```

:::tip[Considerations when deploying smart contracts on Rootstock]

1. **Chain ID**: Rootstock testnet uses chain ID: 31
2. **Gas Settings**:
  - Use a higher gas limit (e.g, 3,000,000) for Rootstock
  - The gas price is multiplied to ensure the transaction is successful. Read more about [Gas on Rootstock](/developers/blockchain-essentials/overview/#gas-differences).
3. **Transaction Type**:
  - Rootstock is optimized for legacy transactions, utilizing `gasPrice` rather than EIP-1559 parameters.
    :::

## Running the deployment script

To execute the deployment script, run the following command:

<Tabs>
  <TabItem value="Linux" label="Linux" default>
    ```bash
    python deploy_favorites_unsafe.py
    ```
  </TabItem>
  <TabItem value="Windows" label="Windows">
   ```bash
    python3 deploy_favorites_unsafe.py
    ```
  </TabItem>
</Tabs>

## Troubleshooting

:::danger[ModuleNotFoundError : No module named 'web3']

```bash
python3 deploy_favorites_unsafe.py
Traceback (most recent call last):
File "/{User}/rootstock-vyper/deploy_favorites_unsafe.py", line 1, in
from web3 import Web3
ModuleNotFoundError: No module named 'web3'
```

> Fix: The error occurs because the web3 package is not installed in your virtual environment. To fix it, you should run pip install web3 or pip install -r requirements.txt while your virtual environment is activated to install all required dependencies.

:::

:::info[Credit]
This project's boilerplate originates from the [Cyfrin Updraft @cyfrinupdraft](https://updraft.cyfrin.io/courses/intermediate-python-vyper-smart-contract-development) Python and Vyper Starter Kit, developed by [@EdwinLiavaa](https://github.com/EdwinLiavaa) during the [Rootstock Hacktivator](/resources/contribute/hacktivator/).
:::
