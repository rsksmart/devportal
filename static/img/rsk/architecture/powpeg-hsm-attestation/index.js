const PUBLIC_NODE_URL = "https://public-node.rsk.co";

async function getBridgeMember() {
    // Take the first part of the file name of the page being viewed
    // (e.g., if the path was "/some/folder/avery.unusual.file.name.html", this
    // would yield "avery")
    const member = location.pathname.split("/").reverse()[0].split(".")[0];
    return $.getJSON(`data/${member}.json`);
}

async function resolveBridgeMember({ attestationPath, publicKeysPath, parametersPath, ...rest }) { 
    const result = {
        ...rest,
        attestation: await $.getJSON(attestationPath),
        publicKeys: await $.getJSON(publicKeysPath),
        parameters: await $.getJSON(parametersPath),
    };
    result.certificate = new Certificate(result.attestation);
    result.signerMessage = new AttestationMessage(result.certificate.validateAndGetValueFor("signer"));
    result.uiMessage = new AttestationMessage(result.certificate.validateAndGetValueFor("ui"));
    result.publicKeysHash = hashPublicKeys(result.publicKeys);
    result.operatingPublicKeys = getOperatingPublicKeys(result.publicKeys);
    return result;
}

const doClone = (cls) => $(`.${cls}`).clone().show().removeClass(cls);

async function runAutoVerificationFor(index, type, expected) {
    hideVerificationDetailsContainers();
    const DELAY = 1000;
    const wait = async (ms) => new Promise(r => setTimeout(r, ms));
    const code = $(".bm-auto-verify-bm-pubkey code");
    code.empty();
    $(".bm-auto-verify-bm-pubkey").show();

    code.append(`Verifying <em>${type.toUpperCase()}</em> public key with the RSK Bridge...<br/>`);
    await wait(DELAY);
    code.append(`Calling <em>'getFederatorPublicKeyOfType(${index}, "${type}")'</em> on the RSK Bridge (address <em>${Bridge.getAddress()}</em>) using <em>Web3</em> on RSK's public node (<em>${PUBLIC_NODE_URL}</em>)...<br/>`);
    await wait(DELAY);
    const result = await Bridge.getFederatorPublicKeyOfType(PUBLIC_NODE_URL, index, type);
    code.append(`RSK Bridge returned <em>${result}</em>. `);
    if (result === `0x${expected}`) {
        code.append(`Public key <em class="ok">MATCH :-)</em>`);
    } else {
        code.append(`Public key <em class="error">MISMATCH!</em> (expected <em>0x${expected}</em>)`);
    }
    return true;
}

function showVerificationDetailsFor(index, type, expected) {
    hideVerificationDetailsContainers();
    const inactiveText = "Hover on the highlighted parts of the statement for a more detailed explanation on each of them.";
    $(".bm-verify-bm-pubkey-detail").text(inactiveText);
    $(".bm-verify-bm-pubkey-name").text(type.toUpperCase());
    const curlContainer = $(".bm-verify-bm-pubkey-curl");
    curlContainer.empty();
    Bridge.getGetFederatorPublicKeyOfTypeCurlCommand(PUBLIC_NODE_URL, index, type).forEach(part => {
        const child = $("<span>").text(part.raw);
        if (part.name != null) {
            child.addClass("bm-code-block-highlight");
            child.on("mouseenter", () => {
                child.addClass("bm-code-block-highlight-active");
                $(".bm-verify-bm-pubkey-detail").text(part.name);
            });
            child.on("mouseleave", () => {
                child.removeClass("bm-code-block-highlight-active");
                $(".bm-verify-bm-pubkey-detail").text(inactiveText);
            })
        }
        curlContainer.append(child);
    });
    $(".bm-verify-bm-pubkey-step2").hide();
    $(".bm-verify-bm-pubkey-result").val("");
    $(".bm-verify-bm-pubkey-error").hide();
    $(".bm-verify-bm-pubkey").show();
    $(".bm-verify-bm-pubkey-step2").data("expected-pubkey", expected);
    return true;
}

function finishVerification() {
    const inactiveText = "Hover on the highlighted parts of the result for a more detailed explanation on each of them.";
    $(".bm-verify-bm-pubkey-step2-detail").text(inactiveText);
    const pasted = $(".bm-verify-bm-pubkey-result").val().trim();
    const verification = Bridge.processGetFederatorPublicKeyOfTypeResult(pasted);
    if (verification.success) {
        $(".bm-verify-bm-pubkey").hide();
        const resultContainer = $(".bm-verify-bm-pubkey-step2-result");
        resultContainer.empty();
        verification.result.parts.forEach(part => {
            const child = $("<span>").text(part.raw);
            if (part.name != null) {
                child.addClass("bm-code-block-highlight");
                child.on("mouseenter", () => {
                    child.addClass("bm-code-block-highlight-active");
                    $(".bm-verify-bm-pubkey-step2-detail").text(part.name);
                });
                child.on("mouseleave", () => {
                    child.removeClass("bm-code-block-highlight-active");
                    $(".bm-verify-bm-pubkey-step2-detail").text(inactiveText);
                })
            }
            resultContainer.append(child);
        });
        const match = $(".bm-verify-bm-pubkey-step2").data("expected-pubkey") === verification.result.pubKey;
        $(".bm-verify-bm-pubkey-step2-match").hide();
        $(".bm-verify-bm-pubkey-step2-nomatch").hide();
        $(`.bm-verify-bm-pubkey-step2-${match ? 'match' : 'nomatch'}`).show();
        $(".bm-verify-bm-pubkey-step2").show();
    } else {
        $(".bm-verify-bm-pubkey-error").text(verification.error);
        $(".bm-verify-bm-pubkey-error").show();
    }
}

function hideVerificationDetailsContainers() {
    $(".bm-auto-verify-bm-pubkey").hide();
    $(".bm-verify-bm-pubkey-step2").hide();
    $(".bm-verify-bm-pubkey").hide();
}

function hideVerificationDetails() {
    hideVerificationDetailsContainers();
    history.back();
}

$(async function() {
    try {
        const bridgeMember = await resolveBridgeMember(await getBridgeMember());
        let elem, child;
        
        // Member name and powHSM version
        $(".bm-name").text(bridgeMember.name);
        $(".bm-powhsm-version").text(bridgeMember.parameters.tag);
        $(".bm-powhsm-version-link").attr("href", getTagLink(bridgeMember.parameters.tag));

        // Operating public keys
        bridgeMember.operatingPublicKeys.forEach(pubKey => {
            elem = doClone("bm-op-pubkey");
            elem.attr("title", pubKey.title);
            $(".bm-op-pubkey-name", elem).text(pubKey.name);
            $(".bm-op-pubkey-value", elem).text(`0x${pubKey.value}`);
            $(".bm-op-pubkey-value", elem).data("txt-uncompressed", `0x${pubKey.value}`);
            $(".bm-op-pubkey-value", elem).data("txt-compressed", `0x${pubKey.valueCompressed}`);
            $(".bm-op-pubkey-verify-auto-link", elem).on("click", 
                () => runAutoVerificationFor(bridgeMember.bridgeIndex, pubKey.name.toLowerCase(), pubKey.valueCompressed));
            $(".bm-op-pubkey-verify-link", elem).on("click", 
                () => showVerificationDetailsFor(bridgeMember.bridgeIndex, pubKey.name.toLowerCase(), pubKey.valueCompressed));
            $(".bm-op-pubkey-container").append(elem);
        });

        // Signer details
        $(".bm-signer-hash").text(`0x${bridgeMember.certificate.elements.signer.tweak}`);
        $(".bm-signer-checkpoint").text(bridgeMember.parameters.checkpoint);
        $(".bm-signer-difficulty").text(bridgeMember.parameters.difficulty);
        $(".bm-signer-network").text(bridgeMember.parameters.network);

        // Building link
        $(".bm-build-link").attr("href", `${getTagTreeLink(bridgeMember.parameters.tag)}/ledger/build/README.md#ledger-app-building`);
        // Concepts link
        $(".bm-concepts-link").attr("href", `${getTagTreeLink(bridgeMember.parameters.tag)}/README.md#concepts-overview`);

        // UI details
        $(".bm-ui-hash").text(`0x${bridgeMember.certificate.elements.ui.tweak}`);
        const postv3 = parseInt(bridgeMember.parameters.tag.split(".")[0], 10) > 2;
        if (postv3) {
            $(".bm-ui-auth-signer-hash").text(`0x${bridgeMember.parameters.signer}`);
            $(".bm-ui-auth-signer-iteration").text(bridgeMember.parameters.iteration);
            $(".bm-ui-auth-authorizers").text(bridgeMember.parameters.authorizers);
            $(".bm-ui-auth-authorizers-link").attr(
                "href", 
                `https://github.com/rsksmart/rsk-powhsm/blob/${bridgeMember.parameters.tag}/ledger/src/ui/src/signer_authorization_signers/${bridgeMember.parameters.authorizers}.h`);
            $(".bm-ui-postv3").show();
        } else {
            $(".bm-ui-prev3").show();
        }

        // Public keys and hash
        Object.keys(bridgeMember.publicKeys).sort().forEach(pubKeyPath => {
            const pubKeyValue = bridgeMember.publicKeys[pubKeyPath];
            elem = doClone("bm-pubkey");
            const pkname = getPublicKeyNameFromPath(pubKeyPath);
            $(".bm-pubkey-name", elem).text(pkname);
            $(".bm-pubkey-value", elem).text(`0x${pubKeyValue}`);
            $(".bm-pubkey-container").append(elem);
            const operating = bridgeMember.operatingPublicKeys.find(opk => opk.name == pkname);
            if (operating) {
                elem.addClass("bm-pubkey-operating");
                elem.attr("title", operating.title);
            }
        });
        elem = doClone("bm-pubkey");
        elem.addClass("signer-pubkeys-hash");
        $(".bm-pubkey-name", elem).text("SHA-256");
        $(".bm-pubkey-value", elem).text(`0x${bridgeMember.publicKeysHash}`);
        $(".bm-pubkey-container").append(elem);

        // Signer attestation
        elem = doClone("bm-att");

        bridgeMember.signerMessage.parts.forEach((part, index) => {
            child = $("<span>")
                .addClass(`bm-att-msg-part-${index}`)
                .addClass("bm-att-msg-part")
                .data("att-msg-part-id", `signer-${index}`)
                .text(part.raw);
            $(".bm-att-msg", elem).append(child);

            child = doClone("bm-att-part")
                .addClass(`bm-att-part-detail--signer-${index}`)
                .addClass(`bm-att-part-text-${index}`);
            $(".bm-att-part-text", child).text(`${part.name}: ${part.value}`);
            $(".bm-att-container", elem).append(child);
        });
        child = doClone("bm-att-key-part-title").text("Attestation key tweak (signer hash)");
        $(".bm-att-container", elem).append(child);
        child = doClone("bm-att-key-part-value");
        $(".bm-att-key-part-value-text", child).text(`0x${bridgeMember.certificate.elements.signer.tweak}`);
        $(".bm-att-container", elem).append(child);
        child = doClone("bm-att-key-part-title").text("Attestation key signature");
        $(".bm-att-container", elem).append(child);
        child = doClone("bm-att-key-part-value");
        $(".bm-att-key-part-value-text", child).text(`0x${bridgeMember.certificate.elements.signer.signature}`);
        $(".bm-att-container", elem).append(child);

        $(".bm-signer-att-container").append(elem);

        // UI attestation
        elem = doClone("bm-att");

        bridgeMember.uiMessage.parts.forEach((part, index) => {
            child = $("<span>")
                .addClass(`bm-att-msg-part-${index}`)
                .addClass("bm-att-msg-part")
                .data("att-msg-part-id", `ui-${index}`)
                .text(part.raw);
            $(".bm-att-msg", elem).append(child);

            child = doClone("bm-att-part")
                .addClass(`bm-att-part-detail--ui-${index}`)
                .addClass(`bm-att-part-text-${index}`);
            $(".bm-att-part-text", child).text(`${part.name}: ${part.value}`);
            if (part.special === "rsk-block") {
                $(".bm-att-part-link", child).text("[See in Block Explorer]");
                $(".bm-att-part-link", child).attr("href", `https://explorer.rsk.co/block/${part.value}`);
                $(".bm-att-part-link", child).show();
            }
            $(".bm-att-container", elem).append(child);
        });
        child = doClone("bm-att-key-part-title").text("Attestation key tweak (UI hash)");
        $(".bm-att-container", elem).append(child);
        child = doClone("bm-att-key-part-value");
        $(".bm-att-key-part-value-text", child).text(`0x${bridgeMember.certificate.elements.ui.tweak}`);
        $(".bm-att-container", elem).append(child);
        child = doClone("bm-att-key-part-title").text("Attestation key signature");
        $(".bm-att-container", elem).append(child);
        child = doClone("bm-att-key-part-value");
        $(".bm-att-key-part-value-text", child).text(`0x${bridgeMember.certificate.elements.ui.signature}`);
        $(".bm-att-container", elem).append(child);

        $(".bm-ui-att-container").append(elem);

        // Attestation public key
        elem = doClone("bm-chain-element");
        $(".bm-chain-element-title", elem).text("Attestation public key");
        $(".bm-chain-element-pubkey", elem)
            .text(`0x${bridgeMember.certificate.elements.attestation.getValue()}`)
            .addClass("bm-att-part-detail--att-pubkey");
        $(".bm-chain-element-signature-title", elem).text("Device key signature");
        $(".bm-chain-element-signature", elem).text(`0x${bridgeMember.certificate.elements.attestation.signature}`);
        bridgeMember.certificate.elements.attestation.getValueParts().forEach(part => {
            child = $("<span>")
                .text(part.raw);
            if (!part.isValue) {
                child.addClass("att-prefix");
            } else {
                child.addClass("bm-att-msg-part").data("att-msg-part-id", "att-pubkey");
            }
            $(".bm-chain-element-message", elem).append(child);
        });
        $(".bm-chain-elements-container").append(elem);

        // Device public key
        elem = doClone("bm-chain-element");
        $(".bm-chain-element-title", elem).text("Device public key");
        $(".bm-chain-element-pubkey", elem)
            .text(`0x${bridgeMember.certificate.elements.device.getValue()}`)
            .addClass("bm-att-part-detail--device-pubkey");
        $(".bm-chain-element-signature-title", elem).text("Ledger signature");
        $(".bm-chain-element-signature", elem).text(`0x${bridgeMember.certificate.elements.device.signature}`);
        bridgeMember.certificate.elements.device.getValueParts().forEach(part => {
            child = $("<span>").text(part.raw);
            if (!part.isValue) {
                child.addClass("att-prefix");
            }  else {
                child.addClass("bm-att-msg-part").data("att-msg-part-id", "device-pubkey");
            }
            $(".bm-chain-element-message", elem).append(child);
        });
        $(".bm-chain-elements-container").append(elem);

        // Root of trust public key
        $(".bm-root-of-trust").text(bridgeMember.certificate.getRootOfTrust().getPublic().encode("hex"));

        // View compressed/uncompressed button behavior
        const bCompress = $(".act-pubkeys-compress");
        bCompress.data("uncompressed", true);
        bCompress.on("click", function(e) {
            const uc = bCompress.data("uncompressed");
            bCompress.toggleClass("active");
            let toDisplay = uc ? "txt-compressed" : "txt-uncompressed";
            $(".bm-op-pubkey-value").each((_, e) => $(e).text($(e).data(toDisplay)));
            bCompress.data("uncompressed", !uc);
        });

        // Attestation message parts visual behavior
        $(".bm-att-msg-part").on("mouseenter", function(e) {
            const t = $(e.target);
            t.addClass("bm-att-msg-part-active");
            $(`.bm-att-part-detail--${t.data("att-msg-part-id")}`).addClass("bm-att-part-text-active");
        });
        $(".bm-att-msg-part").on("mouseleave", function(e) {
            const t = $(e.target);
            t.removeClass("bm-att-msg-part-active");
            $(`.bm-att-part-detail--${t.data("att-msg-part-id")}`).removeClass("bm-att-part-text-active");
        });

        // Public key verification behavior
        $(".bm-verify-bm-pubkey-hide").click(hideVerificationDetails);
        $(".bm-verify-bm-pubkey-verify").click(finishVerification);

        // Show main container
        $(".container").show();
    } catch (e) {
        console.error("Error while trying to fetch bridge member info");
        console.error(e);
        $(".error-container").show();
    }
});