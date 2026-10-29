---
sidebar_label: JSON RPC
sidebar_position: 1
title: JSON-RPC
description: "JSON-RPC methods, transport protocols, personal module, limits, and management APIs for Rootstock nodes."
tags: [rsk, rskj, node, rpc, rpc api, node operators, rootstock]
---

Rootstock nodes expose a JSON-RPC interface for reading chain data, submitting transactions, and operating the node. Start with the method list, then the transport, personal, limits, and management guides.

<Filter
values={[
{label: 'Methods', value: 'methods'},
{label: 'Transport', value: 'transport'},
{label: 'Operations', value: 'ops'},
]}>
<FilterItem
value="methods"
title="RPC Methods"
subtitle="json-rpc"
color="orange"
linkHref="/node-operators/json-rpc/methods/"
linkTitle="Read"
description="JSON-RPC methods supported by Rootstock nodes."
/>
<FilterItem
value="transport"
title="Transport Protocols"
subtitle="json-rpc"
color="orange"
linkHref="/node-operators/json-rpc/transport-protocols/"
linkTitle="Read"
description="HTTP, WebSocket, and other transports."
/>
<FilterItem
value="ops"
title="Personal Module"
subtitle="json-rpc"
color="orange"
linkHref="/node-operators/json-rpc/personal-module-methods/"
linkTitle="Read"
description="Account management methods on the personal module."
/>
<FilterItem
value="ops"
title="Configuration Limits"
subtitle="json-rpc"
color="orange"
linkHref="/node-operators/json-rpc/configuration-limits/"
linkTitle="Read"
description="Limits for the JSON-RPC interface."
/>
<FilterItem
value="ops"
title="Management API Methods"
subtitle="json-rpc"
color="orange"
linkHref="/node-operators/json-rpc/management-api-methods/"
linkTitle="Read"
description="Node management JSON-RPC methods."
/>
</Filter>
