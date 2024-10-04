---
sidebar_label: Spec
sidebar_position: 400
title: "Specification"
tags: [rif, rns, spec]
description: "The domain name space is a tree structure. Each node and leaf on the tree corresponds to a resource set (which may be empty)."
---

The domain name space is a tree structure. Each node and leaf on the tree corresponds to a resource set (which may be empty). 

The domain system makes no distinctions between the uses of the interior nodes and leaves, and this memo uses the term "node" to refer to both.

The domain name of a node is the list of the labels on the path from the node to the root of the tree. By convention, the labels that compose a domain name are printed or read left to right, from the most specific (lowest, farthest from the root) to the least specific (highest, closest to the root).

When a user needs to type a domain name, the length of each label is omitted and the labels are separated by dots `(.)`. 

Since a complete domain name ends with the root label, this leads to a printed form which ends in a dot, that is omitted. For example, a valid domain name is `wallet.alice.rsk`.

## Valid names
For simplicity, a valid RNS domain is defined as follows:

- TLD is one of the predefined TLDs, which currently may only be `rsk`
- The first label is compulsory
- Any second and subsequent labels are optional
- All labels must be alphanumeric and lower case
- All labels and the TLD are delimited by `.`

The reference implementation for RNS domain validation can be found in [RNS SDK](https://www.npmjs.com/package/@rsksmart/rns-sdk)

- AVAILABLE_TLDS in src/constants.ts
- isValidDomain and isValidLabel in src/utils.ts


Example #1: uno2tres.rsk is valid:

✔️ TLD is rsk
✔️ First label is uno2tres; which is present and lowercase alphanumeric
✔️ Second and subsequent labels are not present

Example #2: rss.website.alice.rsk is valid:

- ✔️ TLD is rsk
- ✔️ First label is alice; which is present and lowercase alphanumeric
- ✔️ Second label is website; which is present and lowercase alphanumeric
- ✔️ Third label is rss; which is present and lowercase alphanumeric

Example #3: my_illegal_domain.com is invalid:

- ❌ TLD is com
- ❌ First label is my_illegal_domain; which is present, however contains non-alphanumeric characters
- ✔️ Second and subsequent labels are not present

## Name mapping convention
Each domain name has a node identifier in the RNS Registry, that is obtained via `namehash` functions, that is as follows:

```python
def namehash(name):
  if name == '':
    return '\0' * 32
  else:
    label, _, remainder = name.partition('.')
    return sha3(namehash(remainder) + sha3(label))
```

Given a `node`, a `subnode` can be identified by using its label: `sha3(namehash(node) + sha3(label))`

