---
sidebar_position: 304
sidebar_label: Token Bridge FAQs
title: "Token Bridge FAQs"
tags: [resources, tokenbridge, blockchain, bridges, tokens, ethereum, rootstock, rsk]
---

Find a list of frequently asked questions about the Token Bridge.

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">What is the Token Bridge?</Accordion.Header>
    <Accordion.Body>
       - The Token Bridge is an interoperability protocol which allows users to move their own Rootstock or Ethereum ERC20 Tokens between networks in a quick and cost-efficient manner.
        - The UI is available at:
            - Mainnet: [https://dapp.tokenbridge.rootstock.io/](https://dapp.tokenbridge.rootstock.io/)    
            - Testnet: [https://dapp.testnet.bridges.rootstock.io/](https://dapp.testnet.bridges.rootstock.io/)
            - ![Rootstock-Ethereum Token Bridge](/img/resources/tokenbridge/token-bridge-diagram.jpg)
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">What is a Side Token (mirror ERC20)?</Accordion.Header>
    <Accordion.Body>
      - Side Token is an ERC777 representation of a ERC20 compatible tokens which is on another network (could be  on Ethereum or Rootstock network). The Side Token displays the exact same properties as the standard ERC20 token and allows it to be used in all the same places as ERC20.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">What is the purpose of having a Side Token?</Accordion.Header>
    <Accordion.Body>
       - Side Tokens are minted to prove cross chain bridges can work in a safe and secure manner with 2 standalone blockchains. We believe this kind of interoperability technology offers a lot of possibilities for smart contract owners, as they may prefer to do certain operations in one chain, and others in another one. By connecting blockchains with these bridges you allow for a variety of new use cases that never existed before.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">Will the supply of the original token will increase as a result of Side Tokens?</Accordion.Header>
    <Accordion.Body>
      - No! It’s important to note that there will be no increase in the original tokens. The existing amount of circulating original tokens will stay the same and simply be distributed across 2 networks (Rootstock Network & Ethereum network) instead of 1.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">What is the difference between original tokens and Side Tokens?</Accordion.Header>
    <Accordion.Body>
      - The original token lives on the network that it was deployed for example Ethereum, while the Side Token is a representation of the original token on the other network, for example Rootstock.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">What is the Side Token Contract Address, Symbol, and # of Decimal Places in order to add it as a Custom Coin on MyEtherWallet?</Accordion.Header>
    <Accordion.Body>
      - The symbol of the Side Token is the original token symbol with an `r` prefix if it is created in Rootstock or an `e` prefix if it is created in Ethereum. For example, if we cross the `RIF` token from Rootstock to Ethereum, the Side Token symbol would be `eRIF`.
      - The number of decimal places will be 18. These are the ['addresses'](/resources/guides/tokenbridge/contractaddresses/) of the deployed contracts in the different networks.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="6">
    <Accordion.Header as="h3">How do I transform my original tokens to Side Tokens?</Accordion.Header>
    <Accordion.Body>
      - The Token Bridge will be a public dApp where users will be able to access by using Liquality Wallet or Metamask. You will be able to send your original tokens and receive an equivalent amount of Side Tokens on the other network. By toggling the network on Metamask, you’re also able to transfer the other way around, by sending Side Tokens and receive original tokens.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="7">
    <Accordion.Header as="h3">If I sell my Side Tokens, what happens to my original tokens?</Accordion.Header>
    <Accordion.Body>
      - Upon receiving your Side Tokens, you no longer own your original tokens. The moment you use the bridge to send them to the other network (Rootstock or Ethereum), they are locked up and stored in the contract address. Thus you effectively have no original tokens on the original network and now have Side Tokens on the other network.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="8">
    <Accordion.Header as="h3">Is there a limit on how many tokens can be bridged over?</Accordion.Header>
    <Accordion.Body>
      - Visit the [token crossing limit page](/resources/guides/tokenbridge/troubleshooting/) to view the min/max values.
    </Accordion.Body>
  </Accordion.Item>
   <Accordion.Item eventKey="9">
    <Accordion.Header as="h3">Can any token be bridged over?</Accordion.Header>
    <Accordion.Body>
      - Only whitelisted tokens can cross the bridge, this curated list is used to avoid malicious contracts and DDoS attacks. See the [list of supported tokens](/resources/guides/tokenbridge/troubleshooting/)
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="10">
    <Accordion.Header as="h3">What are the fees for converting original tokens to Side Tokens and vice-versa? Who will be paying these fees?</Accordion.Header>
    <Accordion.Body>
      - There is a 0.2% fee charge when crossing the tokens, this fee goes to the validators as payment for crossing the transactions.
    </Accordion.Body>
  </Accordion.Item>
   <Accordion.Item eventKey="11">
    <Accordion.Header as="h3">How many confirmations are required to convert the original tokens to Side tokens and vice-versa?</Accordion.Header>
    <Accordion.Body>
      - Confirmations depends on the amount being crossed. See the [Troubleshooting guide](/resources/guides/tokenbridge/troubleshooting/) for more information.
      - You can see these amounts defined in the [Token List](https://dapp.testnet.bridges.rootstock.io/list).
    </Accordion.Body>
  </Accordion.Item>
   <Accordion.Item eventKey="12">
    <Accordion.Header as="h3">How does the Token Bridge work?</Accordion.Header>
    <Accordion.Body>
      - The Token Bridge functionality is quite unique, yet simple to understand. The ratio of tokens during network transfer always remains 1:1 and behaves in the following manner:
        - When original tokens are moved to the other network
            - Original tokens are locked in the Token Bridge smart contract
            - Side Tokens are minted and assigned to the same address that originally called the bridge
        - When Side Tokens are moved back from the other network
            - Side Tokens are burned
        - Original tokens are unlocked in the Token Bridge smart contract, and transferred to the same address that originally called the bridge contract.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
    

