---
sidebar_label: Gas Costs
sidebar_position: 950
title: RIF Relay - Gas Costs >> transformed/gas-costs.md
echo description: RIF Relay Gas Costs. >> transformed/gas-costs.md
echo tags: [rif, envelope, relay, integrate] >> transformed/gas-costs.md
echo --- >> transformed/gas-costs.md
echo  >> transformed/gas-costs.md
cat temp_gas-costs.md >> transformed/gas-costs.md
# Clean up temporary file
rm temp_gas-costs.md
cp transformed/gas-costs.md devportal/docs/02-developers/06-integrate/01-rif-relay/gas-costs.md

# Process architecture section
TEMP_FILE=temp_architecture.md
TRANSFORMED_FILE=transformed/architecture.md
# Remove the unwanted first lines from section (title)
tail -n +1 docs/architecture.md > temp_gas-costs.md
echo --- > transformed/gas-costs.md
echo sidebar_label: Architecture >> transformed/gas-costs.md
echo sidebar_position: 980 >> transformed/gas-costs.md
echo title: RIF Relay - Architecture
description: 'RIF Relay Architeture.'
tags: [rif, envelope, relay, integrate]
---

# RIF Relay - Gas Costs

The overhead gas cost is the extra amount of gas required to process the relay call requested by the user. Let's call **X** the gas consumed by the destination contract method call, and **Y** the total gas consumed by the relay call, then the relay call cost (i.e. overhead gas cost) is: **Z = Y - X**.

## SmartWallet templates

RIF Relay V0.1 only has one SmartWallet [template](https://github.com/rsksmart/rif-relay/blob/master/contracts/smartwallet/SmartWallet.sol), which can be used as-is, or be injected with extra logic during the SmartWallet instance creation.

V0.2 introduces a cheaper template ([SmartWallet](https://github.com/rsksmart/rif-relay/blob/master/contracts/smartwallet/SmartWallet.sol)), to be used when there's no need for extra custom-logic in the smart wallets. The behaviour is the same as the CustomSmartWallet [template](https://github.com/rsksmart/rif-relay/blob/master/contracts/smartwallet/SmartWallet.sol) of V0.2, but without this capability.

### Gas cost from the deployment of each template. 

| RIF Version | SW Template       | Avg. overhead gas |
|-------------|-------------------|-------------------|
| 0.1         | SmartWallet       | 172400            |
| 0.2         | CustomSmartWallet | 98070             |
| 0.2         | SmartWallet       | 97695             |
| 1           | CustomSmartWallet | TBD               |
| 1           | SmartWallet       | TBD               |


:::tip[Note]
The instance of CustomSmartWallet used didn't point to any extra custom logic.
:::