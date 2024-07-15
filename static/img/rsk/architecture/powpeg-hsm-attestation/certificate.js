const is_nonempty_hex_string = function(s) {
    const re = /^([0-9A-Fa-f]{2})+$/g;
    return re.test(s);
}

const Certificate = function(certificateObj) {
    this.targets = [];
    this.elements = {};

    if (certificateObj.version !== this.VERSION) {
        throw "Invalid or unsupported certificate version " +
              `(current version is ${this.VERSION})`;
    }

    if (certificateObj.targets.constructor !== Array) {
        throw "Missing or invalid certificate targets";
    }
    this.targets = certificateObj.targets;

    if (certificateObj.elements == null) {
        throw "Missing certificate elements";
    }

    certificateObj.elements.forEach((element) => {
        this.elements[element.name] = new CertificateElement(element);
    });

    // Sanity: check each target has a path to the root authority
    this.targets.forEach((target) => {
        if (!Object.keys(this.elements).includes(target)) {
            throw `Target ${target} not in certificate elements`;
        }

        const visited = [];
        let current = this.elements[target];
        while (true) {
            if (visited.includes(current.name)) {
                throw `Target ${target} has not got a path to the root authority`;
            }

            if (current.signedBy == this.ROOT_ELEMENT) {
                break;
            }

            if (!Object.keys(this.elements).includes(current.signedBy)) {
                throw `Signer ${current.signedBy} not in certificate elements`;
            }

            visited.push(current.name);
            current = this.elements[current.signedBy];
        }
    });
}

Certificate.prototype.VERSION = 1; // Only supported version
Certificate.prototype.ROOT_ELEMENT = "root";

Certificate.prototype.getRootOfTrust = function() {
    const EC = new elliptic.ec("secp256k1");

    // Key taken from the Ledger Official Documentation
    // https://support.ledger.com/hc/en-us/articles/4404382029329?support=true

    return EC.keyFromPublic(
        "0490f5c9d15a0134bb019d2afd0bf297149738459706e7ac5be4abc350a1f818057224fc" +
        "e12ec9a65de18ec34d6e8c24db927835ea1692b14c32e9836a75dad609",
        "hex");
}

Certificate.prototype.validateAndGetValueFor = function(target) {
    if (!this.targets.includes(target)) {
        throw `Invalid certificate target ${target}`;
    }

    // Build the chain from the target to the root
    const chain = [];
    let current = this.elements[target];
    while (true) {
        if (current.signedBy == this.ROOT_ELEMENT) {
            break;
        }
        chain.push(current);
        current = this.elements[current.signedBy];
    }

    // Validate the chain from the root to the leaf
    // Throw on error, otherwise extract and return the
    // element value
    let currentPubkey = this.getRootOfTrust();
    while (true) {
        if (!current.isValid(currentPubkey)) {
            throw `Invalid signature for element ${current.name}`;
        }
        if (chain.length === 0) {
            return current.getValue();
        }
        currentPubkey = current.getValueAsPublicKey();
        current = chain.pop();
    }
}

const CertificateElement = function (elementObj) {
    if (!this.VALID_NAMES.includes(elementObj.name)) {
        throw "Missing or invalid name for HSM certificate element";
    }
    this.name = elementObj.name;

    if (elementObj.signed_by == null) {
        throw "Missing certifier for HSM certificate element";
    }
    this.signedBy = elementObj.signed_by;

    this.tweak = null;
    if (elementObj.tweak != null) {
        if (!is_nonempty_hex_string(elementObj.tweak)) {
            throw "Invalid signer tweak for HSM certificate element " + this.name;
        }
        this.tweak = elementObj.tweak;
    }

    if (!is_nonempty_hex_string(elementObj.message)) {
        throw "Missing or invalid message for HSM certificate element " + this.name;
    }
    this.message = elementObj.message;

    if (!is_nonempty_hex_string(elementObj.signature)) {
        throw "Missing or invalid signature for HSM certificate element " + this.name;
    }
    this.signature = elementObj.signature;
}

CertificateElement.prototype.VALID_NAMES = ["device", "attestation", "ui", "signer"];
CertificateElement.prototype.EXTRACTORS = {
    device: h => h.substring(h.length - 65*2), // Last 65 bytes are the public key
    attestation: h => h.substring(2), // All but the first byte are the public key
    ui: h => h,
    signer: h => h,
};

// certifierPubKey = EC.keyFromPublic("04...", "hex");
CertificateElement.prototype.isValid = function(certifierPubKey) {
    const EC = new elliptic.ec("secp256k1");
    
    let verifierPubKey = certifierPubKey;

    if (this.tweak != null) {
        certifierPubKeyBytes = CryptoJS.enc.Hex.parse(certifierPubKey.getPublic().encode("hex"))
        let tweak = CryptoJS.enc.Hex.parse(this.tweak);
        tweak = CryptoJS.HmacSHA256(certifierPubKeyBytes, tweak).toString();
        tweak = EC.keyFromPrivate(tweak, "hex");
        verifierPubKey = EC.keyFromPublic(certifierPubKey.getPublic().add(tweak.getPublic()));
    }

    return verifierPubKey.verify(
        CryptoJS.SHA256(CryptoJS.enc.Hex.parse(this.message)).toString(),
        this.signature);
}

CertificateElement.prototype.getValue = function() {
    return this.EXTRACTORS[this.name](this.message);
}

CertificateElement.prototype.getValueParts = function() {
    const value = this.getValue();
    const start = this.message.indexOf(value);
    const end = start + value.length;
    return [
        {    // Prefix
            isValue: false,
            raw: this.message.substring(0, start),
        }, { // Value
            isValue: true,
            raw: value,
        }, { // Suffix
            isValue: false,
            raw: this.message.substring(end),
        }

    ].filter(p => p.raw.length > 0);
}

CertificateElement.prototype.getValueAsPublicKey = function() {
    const EC = new elliptic.ec("secp256k1");
    return EC.keyFromPublic(this.getValue(), "hex");
}