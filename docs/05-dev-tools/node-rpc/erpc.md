---
sidebar_position: 6
title: eRPC
sidebar_label: eRPC
tags: [rsk, rootstock, resources, tutorials, setup, eRPC, dApps, RPC, failover, proxy]
description: eRPC is an open-source, self-hosted RPC proxy that fails over between Rootstock RPC providers and caches responses.
---

[eRPC](https://github.com/erpc/erpc) is an open-source, self-hosted RPC proxy. It is not a node provider: it sits in front of the providers in this section, retries a failed request on the next upstream, and caches responses.

### Why use eRPC?
- **Failover:** If one provider fails or rate-limits, the request goes to the next one.
- **Caching:** Repeated reads for finalized blocks are served from cache.
- **One endpoint:** Your app uses one URL for all providers.

## Getting Started

<Steps>
  <Step title="Create erpc.yaml">
  List the public Rootstock node and any provider endpoints you have:
  ```yaml
  projects:
    - id: main
      upstreams:
        - endpoint: https://public-node.rsk.co
        - endpoint: https://rootstock-mainnet.g.alchemy.com/v2/YOUR_API_KEY
  ```
  </Step>
  <Step title="Run eRPC">
  ```bash
  docker run -v $(pwd)/erpc.yaml:/erpc.yaml -p 4000:4000 ghcr.io/erpc/erpc:latest
  ```
  </Step>
  <Step title="Send a request">
  ```bash
  curl -X POST http://localhost:4000/main/evm/30 \
    -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
  ```
  </Step>
</Steps>

See the [eRPC documentation](https://docs.erpc.cloud/) for retry, rate-limit and cache settings.
