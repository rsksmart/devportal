---
sidebar_label: Using Rootstock in Browser
title: 'Using Rootstock with a Browser Extension | Rootstock (RSK)'
description: 'Learn how to interact with Rootstock in your web browser, how to look at Rootstock transactions, develop and deploy your very first smart contract to the Rootstock network.'
tags: [quick-start, getting-started, guide, how-to, bitcoin, rsk, peer-to-peer, rsk, rootstock, merged-mining, blockchain, powpeg]
---
As Rootstock is a blockchain with smart contract capabilities, it is possible to build decentralised applications (dApps) with it.
Most dApps are web applications that you access with a regular Internet browser, such as Chrome.
However, the blockchain interactions require some additional software, which comes in the form of browser extensions.
These browser extensions insert a **web3 provider** object, with the Javascript parts of the web application used to interact with the blockchain, forming an integral part of dApp architecture.

> Note that these browser extensions store your private keys,
> and use them to sign transactions. So keep them secure.

There are currently two well known browser extensions that you can use to interact with the Rootstock blockchain: [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn), and [Liquality](https://chrome.google.com/webstore/detail/liquality-wallet/kpfopkelmapcoipemfendmdcghnegimn).
Since this is a quick start, we will not go through all of them - just MetaMask.

There are some hidden complexity that we've glossed over in the content above so
you can set up and get running as quickly as possible.
If you would like to delve deeper, here are some resources that we recommend.

<div class="features-list">
    <ul id="card-list" class="row">
        <li class="col-xl-6 col-md-6">
            <div class="feature-card">
                <div class="content">
                    <a href="/guides/quickstart/browser/install-metamask/">
                        <div class="content-container">
                            <div class="card-title">
                                <h2 class="zg-text-bg">Metamask</h2>
                                <span class="zg-label ml-1">01</span>
                            </div>
                            <p class="card-desc">Learn how to install Metamask</p>
                        </div>
                    </a>
                    <div class="btn-container">
                        <a href="/guides/quickstart/browser/install-metamask/"></a>
                        <a class="green" href="/guides/quickstart/browser/install-metamask/">Install Metamask</a>
                    </div>
                </div>
            </div>
        </li>
        <li class="col-xl-6 col-md-6">
            <div class="feature-card">
                <div class="content">
                    <a href="/guides/quickstart/browser/cryptography/#private-keys-and-public-keys">
                        <div class="content-container">
                            <div class="card-title">
                                <h2 class="zg-text-bg bg-yellow">Difference between a Private and Public Key</h2>
                                <span class="zg-label ml-1 bg-yellow">02</span>
                            </div>
                            <p class="card-desc">Learn the difference between a private and a public key</p>
                        </div>
                    </a>
                    <div class="btn-container">
                        <a href="/guides/quickstart/browser/cryptography/#private-keys-and-public-keys"></a>
                        <a class="green" href="/guides/quickstart/browser/cryptography/#private-keys-and-public-keys">Learn more</a>
                    </div>
                </div>
            </div>
        </li>
        <li class="col-xl-6 col-md-6">
            <div class="feature-card">
                <div class="content two-line-title-content">
                    <a href="/guides/quickstart/browser/cryptography/#seed-phrases">
                        <div class="content-container">
                            <div class="card-title">
                                <h2 class="zg-text-bg bg-purple">What are Seed Phrases?</h2>
                                <span class="zg-label ml-1 bg-purple">03</span>
                            </div>
                            <p class="card-desc">Learn how to create a seed phrase.</p>
                        </div>
                    </a>
                    <div class="btn-container">
                        <a href="/guides/quickstart/browser/cryptography/#seed-phrases"></a>
                        <a class="green" href="/guides/quickstart/browser/cryptography/#seed-phrases">View Seed Phrases</a>
                    </div>
                </div>
            </div>
        </li>
        <li class="col-xl-6 col-md-6">
            <div class="feature-card">
                <div class="content">
                    <a href="/guides/quickstart/browser/custom-network-and-token/#configure-custom-network-for-rsk-testnet">
                        <div class="content-container">
                            <div class="card-title">
                                <h2 class="zg-text-bg bg-pink">Configure Custom Networks</h2>
                                <span class="zg-label ml-1 bg-pink">04</span>
                            </div>
                            <p class="card-desc">Learn how to configure a custom network on Rootstock.</p>
                        </div>
                    </a>
                    <div class="btn-container">
                        <a href="/guides/quickstart/browser/custom-network-and-token/#configure-custom-network-for-rsk-testnet"></a>
                        <a class="green" href="/guides/quickstart/browser/custom-network-and-token/#configure-custom-network-for-rsk-testnet">Start Configuring Networks</a>
                    </div>
                </div>
            </div>
        </li>
        <li class="col-xl-6 col-md-6">
            <div class="feature-card">
                <div class="content">
                    <a href="/guides/quickstart/browser/custom-network-and-token/#configure-custom-token-for-trif">
                        <div class="content-container">
                            <div class="card-title">
                                <h2 class="zg-text-bg bg-green">Configure Custom Token</h2>
                                <span class="zg-label ml-1 bg-green">05</span>
                            </div>
                            <p class="card-desc">Learn how to configure a custom token for tRIF</p>
                        </div>
                    </a>
                    <div class="btn-container">
                        <a href="/guides/quickstart/browser/custom-network-and-token/#configure-custom-token-for-trif"></a>
                        <a class="green" href="/guides/quickstart/browser/custom-network-and-token/#configure-custom-token-for-trif">Start Deployment</a>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</div>

### Further Reading

- [How to configure Metamask](https://developers.rsk.co/wallet/use/metamask/)
- [Account based addresses on RSK](/rsk/architecture/account-based/) -
  includes information about derivation paths and checksums
- [About the RIF token](/rif/token/)
- [About the RBTC cryptocurrency](/rsk/rbtc/)
- [About gas](/rsk/rbtc/gas/)
- [About RIF Services](https://www.rifos.org/)
- [About BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
- [About EIP-20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)
- [Asymmetric Key Generation](https://en.wikipedia.org/wiki/Public-key_cryptography)
