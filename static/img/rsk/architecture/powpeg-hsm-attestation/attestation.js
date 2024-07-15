const hexToAsciiString = function(hexstr) {
    let result = '';
    let remaining = hexstr;
    while (remaining.length) {
        result += String.fromCharCode(parseInt(remaining.substr(0,2), 16));
        remaining = remaining.substr(2);
    }
    return result;
}

const compressPublicKey = function(uncompressedPublicKeyHex) {
    const EC = new elliptic.ec("secp256k1");
    return EC
        .keyFromPublic(uncompressedPublicKeyHex, "hex")
        .getPublic()
        .encodeCompressed("hex");
}

const hashPublicKeys = function(publicKeys) {
    const hash = CryptoJS.algo.SHA256.create();
    Object.keys(publicKeys).sort().forEach(path => {
        hash.update(CryptoJS.enc.Hex.parse(publicKeys[path]));
    });
    return hash.finalize().toString();
}

const getOperatingPublicKeys = function(publicKeys) {
    return [
        {
            name: 'BTC',
            value: publicKeys["m/44'/0'/0'/0/0"],
            title: 'This is the key this member uses to sign pegout transactions on the Bitcoin network',
        }, {
            name: 'RSK',
            value: publicKeys["m/44'/137'/0'/0/0"],
            title: 'This is the key this member uses to sign Bridge contract transactions on the RSK network',
        }, {
            name: 'MST',
            value: publicKeys["m/44'/137'/1'/0/0"],
            title: 'This key is currently reserved, serving as master key for future use cases',
        },
    ].map(({value, ...rest}) => ({
        ...rest, 
        value, 
        valueCompressed: compressPublicKey(value)
    }));
}

const getPublicKeyNameFromPath = function(path) {
    return ({
        "m/44'/0'/0'/0/0": "BTC",
        "m/44'/137'/0'/0/0": "RSK",
        "m/44'/137'/1'/0/0": "MST",
        "m/44'/137'/0'/0/1": "MST(*)",
        "m/44'/1'/0'/0/0": "tBTC",
        "m/44'/1'/1'/0/0": "tRSK",
        "m/44'/1'/0'/0/1": "tRSK(*)",
        "m/44'/1'/2'/0/0": "tMST",
        "m/44'/1'/0'/0/2": "tMST(*)",
    })[path];
}

const getTagLink = function(tag) {
    return `https://github.com/rsksmart/rsk-powhsm/releases/tag/${tag}`;
}

const getTagTreeLink = function(tag) {
    return `https://github.com/rsksmart/rsk-powhsm/blob/${tag}`;
}

const AttestationMessage = function(msg) {
    this.msg = msg;

    const parserPrefix = Object.keys(this.parsers).find(prefix =>
        hexToAsciiString(this.msg.substr(0,prefix.length*2)).startsWith(prefix));
    if (parserPrefix == null) {
        throw `Invalid attestation message prefix in ${msg}`;
    }
    this.parsers[parserPrefix](this);
}

AttestationMessage.parseSigner2130 = function(target) {
    const prefixLength = "HSM:SIGNER:X.X".length;
    let msg = target.msg;
    let raw;
    target.parts = [];
    // Prefix
    raw = msg.substr(0, prefixLength*2);
    msg = msg.substr(prefixLength*2);
    target.parts.push({
        name: 'Prefix',
        value: `${hexToAsciiString(raw)} (0x${raw})`,
        raw,
    });
    // Public keys hash
    raw = msg.substr(0, 32*2);
    target.parts.push({
        name: 'Public keys SHA-256', 
        value: `0x${raw}`,
        raw,
    });
}

AttestationMessage.parseUI21 = function(target) {
    const prefixLength = "HSM:UI:X.X".length;
    let msg = target.msg;
    let raw;
    target.parts = [];
    // Prefix
    raw = msg.substr(0, prefixLength*2);
    msg = msg.substr(prefixLength*2);
    target.parts.push({
        name: 'Prefix',
        value: `${hexToAsciiString(raw)} (0x${raw})`, 
        raw
    });
    // RSK block hash
    raw = msg.substr(0, 32*2);
    msg = msg.substr(32*2);
    target.parts.push({
            name: 'RSK block hash (timestamp)',
            value: `0x${raw}`, 
            raw,
            special: 'rsk-block',
    });
    // BTC public key
    raw = msg.substr(0, 33*2);
    msg = msg.substr(33*2);
    target.parts.push({
        name: 'BTC public key (in compressed form)',
        value: `0x${raw}`, 
        raw,
    });
    // CA public key
    raw = msg.substr(0, 33*2);
    target.parts.push({
        name: 'Device custom CA (used for signer upgrades)',
        value: `0x${raw}`, 
        raw,
    });
}

AttestationMessage.parseUI30 = function(target) {
    const prefixLength = "HSM:UI:X.X".length;
    let msg = target.msg;
    let raw;
    target.parts = [];
    // Prefix
    raw = msg.substr(0, prefixLength*2);
    msg = msg.substr(prefixLength*2);
    target.parts.push({
        name: 'Prefix',
        value: `${hexToAsciiString(raw)} (0x${raw})`, 
        raw
    });
    // RSK block hash
    raw = msg.substr(0, 32*2);
    msg = msg.substr(32*2);
    target.parts.push({
            name: 'RSK block hash (used as not-before timestamp)',
            value: `0x${raw}`, 
            raw,
            special: 'rsk-block',
    });
    // BTC public key
    raw = msg.substr(0, 33*2);
    msg = msg.substr(33*2);
    target.parts.push({
        name: 'BTC public key (in compressed form)',
        value: `0x${raw}`, 
        raw,
    });
    // Authorized signer hash
    raw = msg.substr(0, 32*2);
    msg = msg.substr(32*2);
    target.parts.push({
        name: 'Authorized signer hash',
        value: `0x${raw}`, 
        raw,
    });
    // Authorized signer iteration
    raw = msg.substr(0, 2*2);
    target.parts.push({
        name: 'Authorized signer iteration',
        value: parseInt(raw, 16).toString(), 
        raw,
    });
}

AttestationMessage.prototype.parsers = {
    "HSM:SIGNER:2.1": AttestationMessage.parseSigner2130,
    "HSM:UI:2.1": AttestationMessage.parseUI21,
    "HSM:SIGNER:3.0": AttestationMessage.parseSigner2130,
    "HSM:UI:3.0": AttestationMessage.parseUI30,
};
