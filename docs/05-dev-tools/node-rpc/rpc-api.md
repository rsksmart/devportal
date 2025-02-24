---
sidebar_position: 5
title: RPC API
sidebar_label: RPC API
tags: [rsk, rootstock, resources, tutorials,  setup, dApps, protocol, RPC API]
description: "Remote Procedure Call (RPC) is a protocol that allows a program to execute procedures (functions) on a remote server as if they were local calls."
---  
 
Remote Procedure Call (RPC) is a protocol that allows a program to execute procedures (functions) on a remote server as if they were local calls. This eliminates the need for developers to handle low-level network communication.  

## How Rootstock RPC API Works  
Rootstock RPC API uses the JSON-RPC protocol, a lightweight, text-based standard for defining procedures and their parameters. This makes it easy to communicate with the API using JSON-formatted requests and receive structured responses.  

## Use Cases  
- Building integrations for your product or service.  
- Automating workflows with server-side commands.  
- Extending your application’s capabilities with remote functions.  

## **JSON-RPC Overview**  

### What is JSON-RPC?  
JSON-RPC is a remote procedure call protocol encoded in JSON. It’s simple, stateless, and transport-agnostic, making it perfect for APIs.  

### Supported Features  
- **Version:** JSON-RPC 2.0  
- **Methods:** Flexible method definitions for various tasks.  
- **Error Handling:** Clear error messages and structured codes.  

:::note[Info]

 To learn more about the Rootstock RPC API, including how to use it, features,  click the button below:
 
<Button href="/developers/rpc-api/rootstock/" align="left">Rootstock RPC API Guide</Button>

:::

### Key Data Structures  
- **Request:** 
```
{ "jsonrpc": "2.0", "method": "method_name", "params": {}, "id": 1 }
``` 
- **Response:** 
```
{ "jsonrpc": "2.0", "result": {}, "id": 1 }
```  
- **Error:** 
```
{ "jsonrpc": "2.0", "error": { "code": -32601, "message": "Method not found" }, "id": 1 }
```  



