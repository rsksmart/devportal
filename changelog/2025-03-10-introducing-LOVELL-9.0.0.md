---
title: Introducing RSK Lovell Release 9.0.0
author: Rootstock
tags: [release, lovell]
url: https://blog.rootstock.io/noticia/introducing-LOVELL-9.0.0/
---

# ⚠️ Important Notice For All Users

Since consensus rules have changed, this release is **incompatible with previous versions**. If you are running earlier versions of the Rootstock client node and adhering to these changes, **you must update to this new version**.

- **Mainnet network upgrade** will happen at **block number 7,338,024**.
- **Testnet network upgrade** will happen at **block number 6,110,487**.

---

## ⚠️ Important Notice For Users Running a Docker Image

If you are already running an RSKj node using a **Docker image**, please follow the instructions at the bottom.

---

## 📢 Release Summary

**Lovell** introduces significant **security** and **robustness** enhancements to the **PowPeg**, ensuring a more **secure** and **reliable** composition change process. It also introduces **new opcodes**, further strengthening **compatibility** with the Ethereum Virtual Machine.

---

## 🚀 What's New in RSKj 8.0.0

The **consensus changes** included in this version are:

- **PowPeg Spendability Validation Protocol** ([RSKIP-419](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP419.md))
- **Express the amount value in wei for peg-out related events** ([RSKIP-427](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP427.md))
- **New pegout creation event including UTXO outpoint values** ([RSKIP-428](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP428.md))
- **Limit the maximum size of initcode and apply extra gas cost for every 32-byte chunk of initcode** ([RSKIP-438](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP438.md))
- **MCOPY instruction** ([RSKIP-445](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP445.md))
- **Transient storage opcodes** ([RSKIP-446](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP446.md))
- **Prevent address creation on failed CREATE/CREATE2 operations** ([RSKIP-453](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP453.md))
- **Support bitcoin blocks with chain work up to 32 unsigned bytes** ([RSKIP-454](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP454.md))
- **Mark rejected peg-ins as processed** ([RSKIP-459](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP459.md))
- **Ignore non-standard outputs when searching for the witness commitment hash** ([RSKIP-460](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP460.md))
- **Network Upgrade: Lovell** ([RSKIP-435](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP435.md))

🔗 **Full Changelog:** [GitHub Compare ARROWHEAD-6.5.1...LOVELL-7.0.0](https://github.com/rsksmart/rskj/compare/ARROWHEAD-6.5.1...LOVELL-7.0.0)

🎯 **Lovell 7.0.0 Milestone:** [GitHub Milestone 48](https://github.com/rsksmart/rskj/milestone/48)

---

## 🔐 Reproducible Build

SHA256 (see [Reproducible Build Guide](https://dev.rootstock.io/rsk/node/security-chain/) for further details):



You can check the full release in the [RSKj GitHub repository](https://github.com/rsksmart/rskj/releases/tag/LOVELL-9.0.0).
