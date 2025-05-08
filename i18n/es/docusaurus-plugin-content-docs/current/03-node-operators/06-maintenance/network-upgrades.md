---
title: Network Upgrades
sidebar_label: Network Upgrades
sidebar_position: 100
tags:
  - rsk
  - rskj
  - node
  - contribute
  - upgrade
  - protocol
  - consensus
  - rskip
description: How to introduce consensus rules changes using network upgrades on an RSK node. What to consider. Adding a new rule. Running tests with new rules.
---

## What's a network upgrade ?

A network upgrade is a change or group of changes to the protocol consensus rules, which are activated at a defined block number.

## What to consider when introducing a consensus rule change in the code

Every consensus rule change needs to be associated with a specific RSKIP (RSK improvement proposal) in the [RSKIPs github repository.](https://github.com/rsksmart/RSKIPs)

Consensus rules changes are introduced as part of a group of changes called Network Upgrade. Network upgrades are released to the general public as part of a specific RSK node version (defined by a release code name and version number. e.g.: RSK Wasabi 1.0.0), and the consensus rule changes introduced are selected by the community.

## How to add a new consensus rule?

1. Set the release version (if not yet defined in the code). Define the new tag in `NetworkUpgrade` enum file.
    ```java
    public enum NetworkUpgrade {
        WASABI_100("wasabi100"),
    }
    ```

2. Set the network upgrade block activation height in `[main||testnet||regtest||devnet].conf` files

    ```conf
    # IE for main.conf

    blockchain.config {
        name = main
        hardforkActivationHeights = {
            wasabi100 = 1591000,
        }
    }
    ```

    > For local development you should ONLY need to edit `regtest.conf`.

    > `[main||testnet||devnet].conf` will only need to be edited before a NetworkUpgrade deploy, when the block activation height is already known.

3. Define the consensus rule RSKIP in `ConsensusRule` enum file.
    ```java
    public enum ConsensusRule {
        RSKIP106("rskip106"),
    }
    ```

4. Associate the previous RSKIP with a specific Network Upgrade version in `reference.conf` file.
    ```conf
    blockchain = {
        config = {
            consensusRules = {
                rskip106 = wasabi100,
            }
        }
    }
    ```

## Coding a consensus rule change for an RSK Network Upgrade

When implementing a network upgrade you'll need to check if that change is active:

```java
if (activations.isActive(ConsensusRule.RSKIP106) && address.equals(HD_WALLET_UTILS_ADDR_DW)) {
    return new HDWalletUtils(config.getActivationConfig(), HD_WALLET_UTILS_ADDR);
}
```

## Testing

To run tests with specific consensus rules changes, you'll need to combine previously described methods at `ActivationConfigTest.BASE_CONFIG`

```java
public class ActivationConfigTest {
    private static final Config BASE_CONFIG = ConfigFactory
        .parseString(String.join("\n",
            "hardforkActivationHeights: {",
            "    wasabi100: 0",
            "},",
            "consensusRules: {",
            "    rskip106: wasabi100,",
            "}"
    ));
}
```
