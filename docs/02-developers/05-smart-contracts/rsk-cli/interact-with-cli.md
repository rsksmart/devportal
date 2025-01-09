---
sidebar_position: 5
sidebar_label: Interact with Smart Contracts using the Rootstock CLI
title: Rootstock CLI | Interact with Verified Smart Contracts
description: "The contract command allows you to interact with a verified smart contract on the Rootstock blockchain. This command lists all available read-only functions within the contract, allowing you to call these functions to view data without altering the contract's state. " 
tags: [Rootstock CLI, developer tools, guides, rsk, rootstock, dApps, smart contracts, solidity, dev-environments]
---

The contract command allows you to interact with a verified smart contract on the Rootstock blockchain. 

This command lists all available read-only functions within the contract, allowing you to call these functions to view data without altering the contract's state. 

:::note[Parameters:]

* `--address`:  
  Specifies the address of the deployed contract on the blockchain. By providing the contract address, `rsk-cli` knows which specific contract instance you want to interact with. This address uniquely identifies the contract on the network.  
* `--testnet`:  
   Indicates that the command should be run on the RSK testnet instead of the mainnet. This parameter tells rsk-cli to execute the command on the testnet (the RSK network designated for testing purposes), which is useful for development and testing without using real funds or affecting production data.

:::

To use this command:
<Tabs>
  <TabItem value="contribute" label="Mainnet" default>
    ```shell
rsk-cli contract --address <address>
```
  </TabItem>
  <TabItem value="contest" label="Testnet">
   ```shell
rsk-cli contract --address <address> --testnet
```
  </TabItem>
 
</Tabs>

Replace `<address\>` with the contract's address deployed, which is the one shown in the response of the deployed smart contract

This command will then display a list of all accessible read functions, making it easy to retrieve information from the contract.

Example command 

```bash
rsk-cli contract --address 0x4edd891c2e988e6145fe3e418c652ee33ebab9ae --testnet
```

In this example:

* `0x4edd891c2e988e6145fe3e418c652ee33ebab9ae` is the address of the smart contract on the RSK testnet.  
* The `--testnet` flag ensures that the interaction occurs on the test network.

After running the command, you will see a response like this:

```text
🔧 Initializing interaction on testnet...
🔎 Checking if contract 0x4edd891c2e988e6145fe3e418c652ee33ebab9ae is verified...
? Select a read function to call: (Use arrow keys)
❯ getContactInfo
  name
  phone
```

1. **Select a function to interact with**: Use the arrow keys to navigate through the list of available read functions (e.g., getContactInfo, name, phone). Once you've highlighted the desired function, press **Enter** to select it. 

For example, if you select name, you'll see:

```text
? Select a read function to call: name
📜 You selected: name
```

2. View the response**: After selecting a function, rsk-cli will call the function on the contract and display the result.

```bash
✅ Function name called successfully!
✔ 🔧 Result: [Function output here]
🔗 View on Explorer: https://explorer.testnet.rootstock.io/address/0x4edd891c2e988e6145fe3e418c652ee33ebab9ae
```

3. Check on Explorer**: You can also view the contract and interaction details on the Rootstock testnet explorer by following the link provided.

<figure>
<img src="/img/guides/rsk-cli/explorer.png" alt="Rootstock testnet explorer"/>
  <figcaption>Rootstock testnet explorer (fig 1.)</figcaption>
</figure>


## Interact with RSK bridge contract

The bridge command allows you to interact with the RSK bridge contract on the Rootstock blockchain. This command provides access to both read and write functions, enabling you to manage and query bridge contract data.

:::note

- **Read Functions:** These are used to retrieve information from the RSK bridge contract.  

- **Write Functions:** These require user input and interaction to make changes or submit data to the contract. 

> Always be cautious when entering sensitive information, such as your wallet password.
:::


#### Accessing the Bridge Command

To start using the bridge command, open your terminal and use the following command:
<Tabs>
  <TabItem value="contribute" label="Mainnet" default>
  ```shell
rsk-cli bridge
```
  </TabItem>
  <TabItem value="contest" label="Testnet">
 ```shell
rsk-cli bridge --testnet
```
  </TabItem>
 
</Tabs>


- Once you select either the Mainnet or Testnet, you will see the following message:

```text
🔧 Initializing bridge for testnet...
```

- You will then be prompted to choose the type of function you want to call:

```text
? Select the type of function you want to call: (Use arrow keys)
❯ read
  write
```
<Tabs>
  <TabItem value="contribute" label="Selecting a Read Function" default>
   - Use the **arrow keys** to highlight your choice and press **Enter**.  
- If you select **read**, you will see a list of available read functions:

```text
? Select a read function to call:
❯ getBtcBlockchainBestChainHeight
  getStateForBtcReleaseClient
  getStateForDebugging
  getBtcBlockchainInitialBlockHeight
  getBtcBlockchainBlockHashAtDepth
  getBtcTxHashProcessedHeight
  isBtcTxHashAlreadyProcessed
```

- Use the **arrow keys** to choose the read function you want to use (e.g., `getBtcBlockchainBestChainHeight`) and press **Enter**.  
- Response after executing a read function:

```bash
✅ Function getBtcBlockchainBestChainHeight called successfully!
✔ 🔧 Result: 3500401
🔗 View on Explorer: https://explorer.testnet.rootstock.io/address/0x0000000000000000000000000000000001000006
```

The result shows the output of the function, along with a link to view details on the blockchain explorer.

</TabItem>

  <TabItem value="contest" label="Selecting a Write Function">
  If you select **write**, you will be presented with a list of write functions:

```bash
? Select a write function to call: (Use arrow keys)
❯ registerBtcTransaction
  registerBtcCoinbaseTransaction
  receiveHeader
```

Use the **arrow keys** to highlight your choice (e.g., registerBtcTransaction) and press **Enter**.

- Once a write function is selected, you will need to provide the required arguments:  
- Enter the appropriate value for the tx argument and press **Enter**.

```bash
? Enter the value for argument tx (bytes):
```

- Enter the height value and press **Enter**.

```bash
? Enter the value for argument height (int256): 334
```

- Enter the pmt () value and press **Enter**.

```bash
? Enter the value for argument pmt (bytes): 345
```

To confirm the write operation, you will be prompted to enter your wallet password:

```bash
? Enter your password to decrypt the wallet: *****
```

Type your password and press **Enter.**

:::note[Notes on Argument Formats]

* `(bytes)` values should be in hexadecimal format and typically represent transaction or header data.  
* `(int256)` values should be whole numbers, such as block heights or transaction numbers.  
* Ensure valid data: Make sure any data you input aligns with the specific function’s requirements and expected format to avoid errors.
:::
  </TabItem>
</Tabs>
