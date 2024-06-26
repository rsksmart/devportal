---
title: Configuration of Limits for JSON-RPC Interface
sidebar_label: Configuration Limits
sidebar_position: 400
tags: [rsk, rskj, node, rpc, rootstock]
description: "The JSON-RPC methods supported by Rootstock nodes."
---

Below are the configuration limits for the following JSON-RPC methods:

> Note: These limits are available from [Fingerroot v5.1.0](https://github.com/rsksmart/rskj/releases/).

## JSON-RPC method eth_getLogs limits

The added configuration in the RSKj client's configuration files allows the control of two limits related to the `eth_getLogs` JSON-RPC call, which is used to retrieve event logs from smart contracts on the Rootstock blockchain.

### Maximum blocks to query

The `maxBlocksToQuery` refers to the maximum number of blocks to query.

This parameter determines the maximum number of blocks the RSKj client will query on the blockchain when executing an `eth_getLogs` call. By default, this value is disabled, meaning that if no value is specified,  the RSKj client will query event logs from all blocks specified in the parameters of the eth_getLogs call. If a limit is defined and the eth_getLogs call exceeds this limit, the query execution will be terminated, and an error code will be returned.

### Maximum Logs to Return

The `maxLogsToReturn` refers to the maximum number of logs to return.

This parameter determines the maximum number of event logs that the RSKj client will return in response to an `eth_getLogs` call. By default, this value is disabled (i.e, set to 0), indicating that the RSKj client will return all event logs that match the search criteria. If the limit is defined and the call exceeds this limit, the query execution will be terminated returning an error code.

> Note: Disabling the limit (`maxLogsToReturn = 0`) could lead to the inclusion of a large number of logs in the response. However, enabling the limit helps protect the node's resources and prevents malicious usages.


## JSON-RPC Interface Limit

The RSKj client now introduces a new configuration option to limit the maximum size of responses returned by the JSON-RPC interface.

### Maximum JSON-RPC response size 

The `maxResponseSize` refers to the maximum JSON-RPC response size.

This parameter allows you to set a limit on the maximum size of responses returned by the JSON-RPC interface. The response size is measured in bytes. By default, this value is disabled with `maxResponseSize = 0`, meaning that there is no limit imposed on the size of JSON-RPC responses.

> Note: When `maxResponseSize` is enabled and set to a specific value, the JSON-RPC interface will truncate or reject responses that exceed the specified size limit.

## Configuration Usage

By adding these configurations to the RSKj client's configuration files, you can manage the limits according to your specific needs and requirements. With the added functionality of limiting the JSON-RPC response size, you can control the amount of data returned by the interface to avoid excessive resource consumption.

It is recommended to set reasonable values for these limits, considering the network's load and the available resources for the RSKj client.

> Note: The configuration may vary based on the version of the RSKj client you are using and how it integrates with other components of your system. Always refer to the official RSKj documentation and relevant specifications for more precise details about the configuration.