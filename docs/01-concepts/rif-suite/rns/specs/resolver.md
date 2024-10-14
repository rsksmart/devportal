---
sidebar_label: Resolver Specs
sidebar_position: 400
title: "Resolver Specs"
tags: [rif, rns, rif-name-service, Resolver Specs]
description: "Resolvers may implement any subset of the record types specified here. Where a record types specification requires a resolver to provide multiple functions."
---

Resolvers may implement any subset of the record types specified here. Where a record types specification requires a resolver to provide multiple functions, the resolver MUST implement either all or none of them.

Resolvers MUST specify a fallback function that throws.

Resolvers must implement ERC-165 interface detection standard. supportsInterface method must return if the interfaceID queried is simply equal to the signature hash of the function that resolves the desired resource record.

Currently standardized resolver interfaces are specified below.

> Check out [definitive resolver](/rif/rns/architecture/definitive-resolver) for implementation details.


### Contract address

Provides the contract address for the specified domain.

```solidity
function addr(bytes32 node) returns (address);
```

- `node`: the namehash of the domain to query for.
- Returns the contract address of the specified domain. A zero address is returned if the node has no address specified.

When updated emits

```solidity
event AddrChanged(bytes32 indexed node, address a);
```

Interface ID: `0x3b3b57de`

Specification: [EIP-137](https://eips.ethereum.org/EIPS/eip-137#resolver-specification)

Resolution protocol:

1. Query the resolver address to the registry.
2. Query `addr` to the resolver contract.
3. Check for non zero-address response.

> No modifications to the adoption of this protocol.

### Multicoin address

Add multiple `addr` fields for resolvers, which permit resolution of addresses across multiple blockchains.

```solidity
function addr(bytes32 node, uint coinType) external view returns(bytes memory);
```

- `node`: The name hash of the domain to query for.
- `coinType`: The cryptocurrency coin type index from [SLIP44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md).
- Returns the cryptocurency address in its native binary format. A zero-length string is returned if the specified coin ID does not exist on the specified node.

> Detailed descriptions of the binary encodings for several popular chains are provided in the [Address Encoding section](https://eips.ethereum.org/EIPS/eip-2304#address-encoding) of EIP-2304.

When updated emits

```solidity
event AddressChanged(bytes32 indexed node, uint coinType, bytes newAddress);
```

Specification: [EIP-2304](https://eips.ethereum.org/EIPS/eip-2304)

Interface ID: `0xf1cb7e06`

Deprecates: [RNSIP-03](https://github.com/rnsdomains/RNSIPs/blob/master/IPs/RNSIP03.md)

Resolution protocol:

1. Query the resolver address to the registry.
2. Query `addr` to the resolver contract with the specified coin type.
3. Check for non zero-length string response.

Resolvers implementing this interface may utilise a fallback strategy regarding backward compatibility.

1. Query the resolver address to the registry.
2. Query `addr` to the resolver contract with the specified coin type.
3. If zero-length string is returned, query `chainAddr` to the resolver contract.
4. Check for non zero-length string response.

### Contenthash

System of mapping names to network and content addresses.

```solidity
function contenthash(bytes32 node) external view returns (bytes memory);
```

- `node`: the namehash of the domain to query for.
- Returns a machine-readable multicodec representation of the content address. The format is specified as follows: `<protoCode uvarint><value []byte>`.

> `protoCode`s and their meanings are specified in the [multiformats/multicodec](https://github.com/multiformats/multicodec) repository.

When updated emits:

```solidity
event ContenthashChanged(bytes32 indexed node, bytes hash);
```

Interface ID: `0xbc1c58d1`

Specification: [EIP-1577](https://eips.ethereum.org/EIPS/eip-1577)

Deprecates: `content` and [`multihash`](https://eips.ethereum.org/EIPS/eip-1577) fields.

Resolution protocol:

1. Query the resolver address to the registry.
2. Query `contenthash` to the resolver contract.
3. Check for non zero-length string response.

Resolvers implementing this interface may utilise a fallback strategy regarding backward compatibility.

1. Query the resolver address to the registry.
2. Query `contenthash` to the resolver contract.
3. If zero-length string is returned, query `multihash` to the resolver contract.
4. If zero-length string is returned, query `content` to the resolver contract.
5. Check for non zero-length string response.


### Contract ABI

Easy lookup of contract interfaces by callers

```solidity
function ABI(bytes32 node, uint256 contentType) constant returns (uint256, bytes memory);
```

- `node`: the namehash of the domain to query for.
- `contentType`: a bitwise OR of the ABI formats accepted by the caller.
- Returns the content type of the return value and the ABI data. `(0, "")` is returned if the domain has no ABI specified, or does not support any of the requested formats.

> The currently recognised encodings are described in [ABI encodings section](https://eips.ethereum.org/EIPS/eip-205#abi-encodings) EIP-205.

When updated emits:

```solidity
event ABIChanged(bytes32 indexed node, uint256 indexed contentType);
```

> Notice that the updated content is not emitted. It requires an extra query to get the resource record when logged, but saves gas setting it.

Interface ID: `0x2203ab56`

Specification: [EIP-205](https://eips.ethereum.org/EIPS/eip-205)

Resolution protocol:

1. Query the resolver address to the registry.
2. Query `ABI` to the resolver contract with a bitwise OR of the ABI formats accepted by the caller.
3. Check for a response that is not  `(0, "")`.

### SECP256k1 public keys

Permits the lookup of SECP256k1 public keys.

```solidity
function pubkey(bytes32 node) constant returns (bytes32 x, bytes32 y);
```

- `node`: the namehash of the domain to query for.
- Returns the coordinates of an uncompressed SECP256k1 curve point comprising the public key. A `(0, 0)` value is returned if the domain has no pubkey specified.

When updated emits:

```solidity
event PubkeyChanged(bytes32 indexed node, bytes32 x, bytes32 y);
```

Interface ID: `0xc8690233`

Specification: [EIP-619](https://github.com/ethereum/EIPs/pull/619)

Resolution protocol:

1. Query the resolver address to the registry.
2. Query `pubkey` to the resolver contract.
3. Check for non `(0, 0)` response.

### Text records

Permits the lookup of arbitrary key-value text data.

```solidity
function text(bytes32 node, string key) constant returns (string text);
```

- `node`: the namehash of the domain to query for.
- `key`: the text data key to query.
- Returns the associated text data. If the key is not present, the zero-length string is returned.

> For supported keys refer to the [initial recommended keys section of EIP-634](https://eips.ethereum.org/EIPS/eip-634#initial-recommended-keys).

When updated emits:

```solidity
event TextChanged(bytes32 indexed node, string indexed indexedKey, string key);
```

Interface ID: `0x59d1d43c`

Specification: [EIP-634](https://eips.ethereum.org/EIPS/eip-634)


Resolution protocol:

1. Query the resolver address to the registry.
2. Query `text` to the resolver contract with the specified key.
3. Check for non zero-length string response.

### Interface discovery

Defines a method of associating contract interfaces with domains and addresses, and of discovering those interfaces.

```solidity
function interfaceImplementer(bytes32 node, bytes4 interfaceID) external view returns (address);
```

- `node`: the namehash of the domain to query for.
- `interfaceID`: The EIP 165 interface ID to query for.
- Returns the address of a contract that implements the specified interface for the given domain. A zero-address value is returned if there is no interface matching that interface ID for that node.

When updated emits:

```solidity
event InterfaceChanged(bytes32 indexed node, bytes4 indexed interfaceID, address implementer);
```

Interface ID: `0xb8f2bbb4`

Specifitcation: [EIP-1844](https://eips.ethereum.org/EIPS/eip-1844)

Resolution protocol:


1. Query the resolver address to the registry.
2. Query `interfaceImplementer` to the resolver contract with the specified interface ID.
4. Check for non zero-address response.

Resolvers implementing this interface may utilise a fallback strategy. This strategy has nothing to do with backward compatibility.

1. Query the resolver address to the registry.
2. Query `interfaceImplementer` to the resolver contract with the specified interface ID.
3. If zero-address string is returned, query `addr` to the resolver contract and query `supportsInterface` to the given contract address.
4. Check for non zero-address response.
