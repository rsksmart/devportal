const Bridge = {};

Bridge.getAddress = () => "0x0000000000000000000000000000000001000006";

Bridge.getFederatorPublicKeyOfType = async function(nodeUrl, index, type) {
    const client = new Web3(nodeUrl);
    const bridge = new client.eth.Contract(this.reducedAbi, this.getAddress());
    return bridge.methods.getFederatorPublicKeyOfType(index, type).call();
};

Bridge.getGetFederatorPublicKeyOfTypeCurlCommand = function(nodeUrl, index, type) {
    return [{
        raw: `curl `
    }, {
        name: `RSK's public node URL (you can replace this with your own node's URL)`,
        raw: nodeUrl
    }, {
        raw: ` -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_call","params": [{`
    }, {
        name: `Bridge contract address: ${Bridge.getAddress()}`,
        raw: `"to":"${Bridge.getAddress()}"`
    }, {
        raw: `, `
    }, {
        raw: `"data": "0x`
    }].concat(this.encodeGetFederatorPublicKeyOfTypeCall(index, type)).concat([{
        raw: `"}, "latest"],"id":1}'`
    }]);
};

Bridge.encodeGetFederatorPublicKeyOfTypeCall = function(index, type) {
    const w3 = new Web3();

    const functionSpec = {
        name: 'getFederatorPublicKeyOfType',
        type: 'function',
        inputs: [{
            type: 'int256',
            name: 'index'
        },{
            type: 'string',
            name: 'type'
        }]
    };

    const functionSelector = `${functionSpec.name}(${functionSpec.inputs[0].type},${functionSpec.inputs[1].type})`;

    const raw = w3.eth.abi
        .encodeFunctionCall(functionSpec, [index, type])
        .substring(2); // Ignore '0x' prefix

    const result = [{
        name: `Function selector: ${functionSelector}`,
        raw: raw.substring(0, 4*2),
    }, {
        name: `Federator member index: ${index}`,
        raw: raw.substring(4*2, 4*2 + 32*2),
    }, {
        raw: raw.substring(4*2 + 32*2, 4*2 + 32*2 + 32*2), // Public key type payload offset
    }, {
        name: `Public key type length: ${type.length}`,
        raw: raw.substring(4*2 + 32*2 + 32*2, 4*2 + 32*2 + 32*2 + 32*2),
    }, {
        name: `Public key type: ${type}`,
        raw: raw.substring(4*2 + 32*2 + 32*2 + 32*2, 4*2 + 32*2 + 32*2 + 32*2 + type.length*2),
    }, {
        raw: raw.substring(4*2 + 32*2 + 32*2 + 32*2 + type.length*2),
    }];

    // Sanity check: make sure total length coincides with raw value
    if (raw.length != result.reduce((r, p) => r + p.raw, "").length)
        throw `Inconsistent bridge 'getFederatorPublicKeyOfType' call encoding detected`;

    return result;
};

Bridge.processGetFederatorPublicKeyOfTypeResult = function(raw) {
    const w3 = new Web3();

    try {
        const obj = JSON.parse(raw);

        if (obj.result == null || !w3.utils.isHexStrict(obj.result)) {
            throw `Invalid result`;
        }

        return {
            success: true,
            result: this.decodeGetFederatorPublicKeyOfTypeReturnValue(obj.result.substring(2)),
        };
    } catch (e) {
        return {
            success: false,
            error: `${e.toString()}. Please try again.`,
        }
    }
};

Bridge.decodeGetFederatorPublicKeyOfTypeReturnValue = function(raw) {
    if (raw.length != 128*2) {
        throw `Result too short`;
    }

    const publicKeyLength = parseInt(raw.substring(32*2, 32*2 + 32*2), 16);
    if (![33,65].includes(publicKeyLength)) {
        throw `Invalid public key length`;
    }
    const pubKeyType = publicKeyLength === 33 ? 'compressed' : 'uncompressed';

    const parts = [{
        raw: raw.substring(0, 32*2),
    }, {
        name: `Public key length: ${publicKeyLength} bytes -- ${pubKeyType}`,
        raw: raw.substring(32*2, 32*2 + 32*2),
    }, {
        name: `Public key (${pubKeyType}): 0x${raw.substring(32*2 + 32*2, 32*2 + 32*2 + publicKeyLength*2)}`,
        raw: raw.substring(32*2 + 32*2, 32*2 + 32*2 + publicKeyLength*2),
    }, {
        raw: raw.substring(32*2 + 32*2 + publicKeyLength*2),
    }];

    // Sanity check: make sure total length coincides with raw value
    if (raw.length != parts.reduce((r, p) => r + p.raw, "").length)
        throw `Inconsistent encoding detected`;

    return {
        pubKey: parts[2].raw,
        parts,
    };
};

Bridge.reducedAbi = [{
    name: "getFederatorPublicKeyOfType",
    type: "function",
    constant: true,
    inputs: [{
        name: "index",
        type: "int256"
    }, {
        name: "type",
        type: "string"
    }],
    outputs: [{
        name: "",
        type: "bytes"
    }]
}];
