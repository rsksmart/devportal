var jsSHA = require('jssha/sha256');
var base58 = require('./base58');

function numberToHex (number) {
    var hex = Math.round(number).toString(16);
    if(hex.length === 1) {
        hex = '0' + hex;
    }
    return hex;
}

function sha256(hexString) {
    var sha = new jsSHA('SHA-256', 'HEX');
    sha.update(hexString);
    return sha.getHash('HEX');
}

function toHex(arrayOfBytes) {
    var hex = '';
    for(var i = 0; i < arrayOfBytes.length; i++) {
        hex += numberToHex(arrayOfBytes[i]);
    }
    return hex;
}

function sha256Checksum(payload) {
    return sha256(sha256(payload)).substr(0, 8);
}

function decodeWifPrivateKey(wifPrivateKey) {
    let decodedPrivateKey = base58.decode(wifPrivateKey);
    let privateKey = decodedPrivateKey.slice(1, decodedPrivateKey.length - 5);
    
    return toHex(privateKey);
}

module.exports = {
    toHex,
    sha256Checksum,
    decodeWifPrivateKey
};
