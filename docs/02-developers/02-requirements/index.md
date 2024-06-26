---
sidebar_label: Development Prerequisites
sidebar_position: 2
title: Prerequisites
tags: [rsk, rootstock, prerequisites, setup, requirements]
description: "Minimum hardware requirements for Rootstock."
---

These are the minimum requirements that must be met to run a Rootstock node or get started with deploying a smart contract:

## Command Line Tools

### POSIX Compliant Shell

- macOS/Linux
    - Standard terminal.
- Windows
    - Standard terminals like `cmd` or PowerShell may not support some commands. We recommended installing [Git for Windows](https://gitforwindows.org/) for Git Bash, which provides a more UNIX-like experience. Here's a [tutorial on Git Bash](https://www.atlassian.com/git/tutorials/git-bash).

## Installing Node.js and NPM

- Using [Node Version Manager (recommended)](https://nodejs.org/en/download/package-manager#nvm)
        - **Version:** 
            - 12 or later. 
        - For installation, use [NVM install script](https://github.com/nvm-sh/nvm#install--update-script).
- For Windows 
        -   1. Download the Node.js Installer from [Node.js Downloads](https://nodejs.org/en/download).
            2. Run the installer and follow the on-screen instructions.
            3. Open Command Prompt or PowerShell and check versions with `node -v` and `npm -v`. 
                - See [Posix Compliant Shell](#posix-compliant-shell).
- For MacOS 
        1. Install Homebrew (if not installed):
            ```shell
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)``` 
        2. Install Node.js and npm with `brew install node` 
        3. Check versions in Terminal with `node -v` and `npm -v`
- For Linux 
        1. Open a terminal.
        2. Update package manager with sudo apt update
        3. Install Node.js and npm with sudo apt install nodejs npm
        4. Check versions in the terminal with `node -v` and `npm -v`

## Installing Hardhat
```shell
    npm install --save-dev hardhat
```
