let base58 = require('./base58')
let { Buffer } = require('buffer')
let { toHex, sha256Checksum } = require('./utils')
let { ADDRESS_TYPES, NETWORKS, HASH_FIELD_NAMES } = require('./constants')

var DEFAULT_NETWORK_TYPE = 'prod'

const ADDRESS_TYPE_INFO = {}
ADDRESS_TYPE_INFO['00'] = {
  network: NETWORKS.MAINNET,
  type: ADDRESS_TYPES.P2PKH
}
ADDRESS_TYPE_INFO['05'] = {
  network: NETWORKS.MAINNET,
  type: ADDRESS_TYPES.P2SH
}
ADDRESS_TYPE_INFO['6f'] = {
  network: NETWORKS.TESTNET,
  type: ADDRESS_TYPES.P2PKH
}
ADDRESS_TYPE_INFO['c4'] = {
  network: NETWORKS.TESTNET,
  type: ADDRESS_TYPES.P2SH
}

function getDecoded (address) {
  try {
    return base58.decode(address)
  } catch (e) {
    // if decoding fails, assume invalid address
    return null
  }
}

function getAddressType (address) {
  var expectedLength = 25
  var decoded = getDecoded(address)

  if (decoded) {
    var length = decoded.length

    if (length !== expectedLength) {
      return null
    }

    var checksum = toHex(decoded.slice(length - 4, length)),
      body = toHex(decoded.slice(0, length - 4)),
      goodChecksum = sha256Checksum(body)

    return checksum === goodChecksum ? toHex(decoded.slice(0, expectedLength - 24)) : null
  }

  return null
}

function isValidP2PKHandP2SHAddress (address, networkType) {
  networkType = networkType || DEFAULT_NETWORK_TYPE

  var addressType = getAddressType(address)

  if (addressType && ADDRESS_TYPE_INFO[addressType]) {
    if (networkType === NETWORKS.MAINNET || networkType === NETWORKS.TESTNET) {
      return ADDRESS_TYPE_INFO[addressType].network == networkType
    } else {
      return true
    }
  }

  return false
}

function getAddressInfo (address) {
  const addressType = getAddressType(address)
  const addressInfo = ADDRESS_TYPE_INFO[addressType]
  if (!addressInfo) {
    return null
  }

  let decodedAddress = Buffer.from(getDecoded(address))
  let hash = decodedAddress.slice(1, 21).toString('hex')
  let fieldName = HASH_FIELD_NAMES[addressInfo.type]
  addressInfo[fieldName] = hash

  return addressInfo
}

module.exports = {
  isValid: isValidP2PKHandP2SHAddress,
  getAddressInfo: getAddressInfo
}
