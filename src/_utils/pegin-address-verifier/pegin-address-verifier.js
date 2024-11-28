const p2pkhP2sh = require('./crypto/p2pkh-p2sha');
const segwit = require('./crypto/segwit-addr');
const { ADDRESS_TYPES, ADDRESS_TYPES_CODES } = require('./crypto/constants');

const RSKT_PREFIX_HEX = '52534b54'; // 'RSKT' prefix encoded in hex. Check https://github.com/rsksmart/RSKIPs/blob/2c994cc108885ccc5a116e4aee8c073b5eca5682/IPs/RSKIP170.md#specification for more details
const RSKT_PROTOCOL_VERSION = '01';

const isValidAddress = (address, networkType) => {
    return p2pkhP2sh.isValid(address, networkType) || 
    segwit.isValidAddress(address, networkType);
};

const getAddressInformation = (address) => {
    return p2pkhP2sh.getAddressInfo(address) || 
    segwit.getAddressInfo(address);
};

const canPegIn = (addressInfo) => {
    return addressInfo && 
        addressInfo.type == ADDRESS_TYPES.P2PKH || 
        addressInfo.type == ADDRESS_TYPES.P2SH;
};

/**
 * Creates the pegin v1 data for the given {rskDestinationAddress} and optionally the {btcRefundAddress}.
 * @param {string} rskDestinationAddress 
 * @param {string?} btcRefundAddress 
 * @returns {string} The pegin v1 data.
 */
const createPeginV1TxData = (rskDestinationAddress, btcRefundAddress) => {

    if(!rskDestinationAddress) {
        throw new Error('RSK destination address is required');
    }

    let data = `${RSKT_PREFIX_HEX}${RSKT_PROTOCOL_VERSION}`;
    
    if (rskDestinationAddress.startsWith('0x')) {
        rskDestinationAddress = rskDestinationAddress.substring(2);
    }

    data += rskDestinationAddress;

    if (btcRefundAddress) {
        const refundAddressInfo = getAddressInformation(btcRefundAddress);
        if (refundAddressInfo) {
            switch (refundAddressInfo.type) {
                case 'p2pkh':
                    data += ADDRESS_TYPES_CODES.p2pkh + refundAddressInfo.scriptPubKey;
                    break;
                case 'p2sh':
                    data += ADDRESS_TYPES_CODES.p2sh + refundAddressInfo.scriptHash;
                    break;
                default:
                    throw new Error(`Unsupported btc refund address type: ${refundAddressInfo.type}`);
            }
        } else {
            throw new Error(`Could not get address information for ${btcRefundAddress}`);
        }
    }
    
    return data.toLocaleLowerCase();
};

module.exports = {
    isValidAddress,
    getAddressInformation,
    canPegIn,
    createPeginV1TxData,
};
