const ADDRESS_TYPES = {
    P2PKH: 'p2pkh',
    P2SH: 'p2sh',
    BECH32: 'bech32'
};

const NETWORKS = {
    MAINNET: 'mainnet',
    TESTNET: 'testnet',
    REGTEST: 'regtest'
};

const HASH_FIELD_NAMES = {
    p2pkh: 'scriptPubKey',
    p2sh: 'scriptHash'
};

// Check https://github.com/rsksmart/RSKIPs/blob/2c994cc108885ccc5a116e4aee8c073b5eca5682/IPs/RSKIP170.md#specification for more details.
const ADDRESS_TYPES_CODES = {
    p2pkh: '01',
    p2sh: '02'
};

module.exports = {
    ADDRESS_TYPES,
    NETWORKS,
    HASH_FIELD_NAMES,
    ADDRESS_TYPES_CODES,
};
