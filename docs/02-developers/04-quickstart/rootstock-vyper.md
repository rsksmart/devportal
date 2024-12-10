---
sidebar_label: "Vyper Smart Contract on Rootstock"
sidebar_position: 100
title: "Deploying a Vyper Smart Contract to Rootstock Testnet using Python"
description: "This guide walks through the process of deploying a smart contract to the Rootstock testnet using Python and Web3.py. We'll be deploying a simple Vyper contract that demonstrates how to interact with the Rootstock network."
tags: [rsk, rootstock, developers, vyper, quickstart, python, Smart Contracts]
---

Rootstock is a layer 2 solution that combines the security of Bitcoin's proof of work with Ethereum's smart contract capabilities. The platform is open-source, EVM-compatible, and secured by over 60% of Bitcoin’s hashing power, offering unique advantages for developers.

This guide demonstrates how to deploy smart contracts written in Vyper to the Rootstock testnet using Python and Web3.py.

- **Bitcoin Compatibility**: Deploy smart contracts while leveraging Bitcoin's security and network effects
- **EVM Compatibility**: Use familiar Ethereum tools and practices while building on Bitcoin
- **Lower Fees**: Benefit from low transaction fees on Rootstock
- **Scalability**: Handle a higher volume of transactions without congestion

We'll walk through creating a simple Vyper contract and deploying it to the Rootstock testnet, covering everything from environment setup to handling Rootstock-specific network configurations.

Whether you're an experienced Ethereum developer looking to expand to Bitcoin-based smart contracts, or just starting your blockchain journey, this guide will help you get up and running with Vyper Contracts on Rootstock.

## Prerequisites

- [uv](https://docs.astral.sh/uv/)
  - To confirm installation, run `uv --version`, it should return a version number.
- [git](https://git-scm.com/)
  - To confirm installation, run `git --version`, it should return a version number.
  - Helpful shortcut:

```bash
# For bash
echo "source $HOME/.bashrc >> $HOME/.bash_profile"

# For zsh
echo "source $HOME/.zshenv >> $HOME/.zprofile"
```

## Installing Python

### Installing Python on Windows

1. Visit the [Python downloads page](https://www.python.org/downloads/)
2. Click on the "Download Python 3.12.x" button
3. Run the downloaded installer
4. Important: Check the box that says "Add Python 3.12 to PATH"
5. Click "Install Now"
6. Once installation is complete, open Command Prompt and verify the installation:
```bash
python --version
```

### Installing Python on Mac

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

### Installing Python on Linux

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

## Installation

```bash
git clone https://github.com/EdwinLiavaa/Web3py-Vyper-RootStock.git
cd Web3py-Vyper-RootStock
```

### Syncing uv

uv sync is a fast package management command that downloads and installs your project's Python dependencies while creating a lockfile for reproducible installations.

```bash
uv sync
```

### pip/python

The pip/python section creates a virtual environment (python -m venv ./venv), activates it (source ./venv/bin/activate), and installs the project dependencies from requirements.txt (pip install -r requirements.txt).

```bash
python -m venv ./venv
source ./venv/bin/activate
pip install -r requirements.txt
```

## Quickstart

Both uv run hello.py and python hello.py will run the script and output "Hello from web3py-Vyper-RootStock!", with UV being preferred for faster, modern projects and pip for traditional Python setups.

```bash
uv run hello.py # for UV
# or
python hello.py # for pip/python
```

## Setup Environment

To set up our Python environment and install the necessary packages, we will do the following:

```bash
# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install required packages
pip install python-dotenv web3 vyper
```

## Configuration

Create a `.env` file in the project root and specify your custom configuration:

```env
RPC_URL="https://rpc.testnet.rootstock.io/[YOUR-API-KEY]"
PRIVATE_KEY="your-private-key"  # Never commit your real private key!
MY_ADDRESS="your-wallet-address"
```
THIS IS ONLY FOR TESTING - TYPICALLY YOU SHOULD NEVER SHARE YOUR PRIVATE KEY.

## Get Testnet RBTC

Before deploying, you'll need some testnet RBTC:

1. Go to the Rootstock faucet: https://faucet.rootstock.io/
2. Enter your wallet address
3. Complete the captcha and request funds
4. Wait a few minutes for the transaction to be confirmed

## The Smart Contract

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

    chain_id = 31  # RSK testnet chain ID

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
            "gas": 3000000,  # Higher gas limit for RSK
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

## Notable Info when Deploying on Rootstock

1. **Chain ID**: RSK testnet uses chain ID 31
2. **Gas Settings**:
   - Use a higher gas limit (3,000,000) for Rootstock
   - We double the gas price to ensure the transaction goes through
3. **Transaction Type**:
   - Rootstock is optimized for legacy transactions, utilizing `gasPrice` rather than EIP-1559 parameters.

## Running the Deployment

Execute the deployment script:

For Linux Users:

```bash
python deploy_favorites_unsafe.py
```

For Windows Users:

```bash
python3 deploy_favorites_unsafe.py
```

## Useful Links

The boilerplate used in this project was adopted from the Cyfrin Updraft Python and Viper Starter Kit:
- [Cyfrin Updraft @cyfrinupdraft](https://updraft.cyfrin.io/courses/intermediate-python-vyper-smart-contract-development)
