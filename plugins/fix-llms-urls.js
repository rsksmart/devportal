'use strict';

/**
 * Post-build fix for llms.txt URLs when routeBasePath is '/' and docs folders
 * use numeric sort prefixes (e.g. 01-concepts → /concepts/).
 */

const fs = require('fs');
const path = require('path');

const URL_PATTERN = /https?:\/\/[^\s)\]]+/g;

/** Paths in llms.txt that differ from filesystem-derived URLs. */
const PATH_ALIASES = [
  ['/use-cases/shared-setup', '/use-cases/interoperability/shared-setup'],
];

const SITE_ORIGIN = 'https://dev.rootstock.io';

/** Hub and category pages in sitemap that the llms plugin may omit. */
const SUPPLEMENTARY_HUB_ENTRIES = [
  ['RIF Suite', '/concepts/rif-suite/', 'Open-source tools for building on Bitcoin.'],
  ['Blockchain Essentials', '/developers/blockchain-essentials/', 'Read transactions and deploy your first contract.'],
  ['New to Blockchain', '/developers/blockchain-essentials/new-to-blockchain/', 'Ledgers, keys, wallets, gas, and transactions.'],
  ['Rootstock Essentials', '/developers/blockchain-essentials/rootstock-essentials/', 'Architecture, contracts, and your first dApp.'],
  ['Integrate', '/developers/integrate/', 'Integrate dApps with Rootstock SDKs and protocols.'],
  ['RIF Relay Integration', '/developers/integrate/rif-relay/', 'Sponsored transactions with RIF Relay.'],
  ['RNS Integration', '/developers/integrate/rns/', 'Integrate RIF Name Service in your dApp.'],
  ['Libraries', '/developers/libraries/', 'SDKs and libraries for Rootstock development.'],
  ['RPC API', '/developers/rpc-api/', 'JSON-RPC providers and API guides.'],
  ['Smart Contracts', '/developers/smart-contracts/', 'Hardhat, Foundry, verification, and tooling.'],
  ['RSK CLI', '/developers/smart-contracts/rsk-cli/', 'CLI for wallets, deploy, and interaction.'],
  ['Thirdweb on Rootstock', '/developers/smart-contracts/thirdweb/', 'Build and deploy with Thirdweb on Rootstock.'],
  ['Runes on Rootstock', '/developers/use-cases/runes-rootstock/', 'Developer guides for Runes on Rootstock.'],
  ['Verify Smart Contracts', '/developers/verify-smart-contracts/', 'Verify contract source on Rootstock explorers.'],
  ['EAS Attestations', '/dev-tools/attestations/eas/', 'Ethereum Attestation Service on Rootstock.'],
  ['DeFi Developer Guide', '/resources/guides/defi-developer-guide/', 'Patterns and standards for DeFi on Rootstock.'],
  ['User Guides', '/resources/guides/', 'PowPeg, Atlas, Runes, and other user guides.'],
  ['PowPeg App Guide', '/resources/guides/powpeg-app/', 'BTC and rBTC transfers with the PowPeg App.'],
  ['Runes Airdrop Machine', '/resources/guides/runes-rootstock/airdrop-giveaway-machine/', 'Build a Runes airdrop machine on Rootstock.'],
  ['Deploy MockBridge Contract', '/resources/guides/runes-rootstock/deploy-mockbridge-contract/', 'Deploy a MockBridge contract for Runes.'],
  ['Node Setup', '/node-operators/setup/', 'Install and configure a Rootstock node.'],
  ['Node Configuration', '/node-operators/setup/configuration/', 'Configure a Rootstock node for your environment.'],
  ['Node Runner', '/node-operators/setup/node-runner/', 'Run a Rootstock node in production.'],
  ['JSON-RPC', '/node-operators/json-rpc/', 'JSON-RPC methods for Rootstock node operators.'],
  ['Merged Mining', '/node-operators/merged-mining/', 'Set up merge mining for Bitcoin and Rootstock.'],
  ['Node Maintenance', '/node-operators/maintenance/', 'Operate and maintain a Rootstock node.'],
  ['Shared Setup for Use Cases', '/use-cases/interoperability/shared-setup/', 'Common setup for Rootstock use case tutorials.'],
  ['USSD Rootstock DeFi', '/use-cases/onboarding-ux/ussd-rootstock-defi/', 'USSD-based DeFi onboarding on Rootstock.'],
  ['Developer Cheatsheet', '/cheatsheet/', 'One-page Rootstock developer quick reference.'],
];

/** Truncate per-entry descriptions to help keep llms.txt under Fern's 50,000-character preferred agent-ingest budget. */
const LLMS_DESCRIPTION_MAX_LENGTH = 40;

function stripNumberedPrefix(segment) {
  return segment.replace(/^\d+-/, '');
}

function hasPrivateSegment(pathname) {
  return pathname.split('/').some((segment) => segment.startsWith('_'));
}

function fixUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    if (hasPrivateSegment(url.pathname)) {
      return null;
    }
    for (const [from, to] of PATH_ALIASES) {
      if (url.pathname.includes(from)) {
        url.pathname = url.pathname.replace(from, to);
      }
    }
    const segments = url.pathname.split('/').filter(Boolean).map(stripNumberedPrefix);
    const trailingSlash = url.pathname.endsWith('/') ? '/' : '';
    url.pathname = segments.length ? `/${segments.join('/')}${trailingSlash}` : '/';
    return url.toString();
  } catch {
    return rawUrl;
  }
}

function normalizeLlmsUrl(rawUrl) {
  return fixUrl(rawUrl)?.replace(/\/$/, '') ?? null;
}

function llmsUrlsInContent(content) {
  const urls = new Set();
  for (const match of content.matchAll(URL_PATTERN)) {
    const normalized = normalizeLlmsUrl(match[0]);
    if (normalized) {
      urls.add(normalized);
    }
  }
  return urls;
}

function truncateDescription(description, maxLength = LLMS_DESCRIPTION_MAX_LENGTH) {
  const trimmed = description.trim();
  if (trimmed.length <= maxLength) {
    return trimmed;
  }
  return `${trimmed.slice(0, maxLength - 3).trimEnd()}...`;
}

function truncateLlmsDescriptions(content) {
  return content
    .split('\n')
    .map((line) => {
      if (!line.startsWith('- [')) {
        return line;
      }
      const match = line.match(/^- \[(.+?)\]\((https?:\/\/[^)]+)\): (.+)$/);
      if (!match) {
        return line;
      }
      const [, title, url, description] = match;
      return `- [${title}](${url}): ${truncateDescription(description)}`;
    })
    .join('\n');
}

function appendSupplementaryHubEntries(content) {
  const existing = llmsUrlsInContent(content);
  const additions = [];

  for (const [title, pathname, description] of SUPPLEMENTARY_HUB_ENTRIES) {
    const url = `${SITE_ORIGIN}${pathname}`.replace(/\/$/, '') || SITE_ORIGIN;
    const normalized = pathname === '/' ? SITE_ORIGIN : url;
    if (existing.has(normalized)) {
      continue;
    }
    additions.push(`- [${title}](${normalized}): ${truncateDescription(description)}`);
    existing.add(normalized);
  }

  if (additions.length === 0) {
    return content;
  }

  const sectionHeader = '## Hub and category pages';
  if (content.includes(sectionHeader)) {
    return `${content.trimEnd()}\n${additions.join('\n')}\n`;
  }

  return `${content.trimEnd()}\n\n${sectionHeader}\n\n${additions.join('\n')}\n`;
}

function fixLlmsFileContent(content, { truncateDescriptions = false, appendHubEntries = false } = {}) {
  const lines = content.split('\n').filter((line) => {
    if (!line.startsWith('- [')) {
      return true;
    }
    const urls = line.match(URL_PATTERN);
    if (!urls) {
      return true;
    }
    return urls.every((rawUrl) => fixUrl(rawUrl) !== null);
  });

  let updated = lines
    .join('\n')
    .replace(URL_PATTERN, (match) => fixUrl(match) ?? match);

  if (appendHubEntries) {
    updated = appendSupplementaryHubEntries(updated);
  }

  if (truncateDescriptions) {
    updated = truncateLlmsDescriptions(updated);
  }

  return updated;
}

function fixLlmsFilesInDir(dir) {
  let fixed = 0;
  for (const filename of ['llms.txt', 'llms-full.txt']) {
    const filePath = path.join(dir, filename);
    let original;
    try {
      original = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
      if (err.code === 'ENOENT') {
        continue;
      }
      throw err;
    }
    const updated = fixLlmsFileContent(original, {
      truncateDescriptions: filename === 'llms.txt',
      appendHubEntries: filename === 'llms.txt',
    });
    if (updated !== original) {
      const tempPath = `${filePath}.tmp`;
      fs.writeFileSync(tempPath, updated, 'utf8');
      fs.renameSync(tempPath, filePath);
      fixed += 1;
    }
  }
  return fixed;
}

module.exports = function fixLlmsUrlsPlugin() {
  return {
    name: 'fix-llms-urls',
    postBuild({ outDir }) {
      const total = fixLlmsFilesInDir(outDir);
      for (const entry of fs.readdirSync(outDir, {withFileTypes: true})) {
        if (entry.isDirectory() && ['es', 'ja', 'ko'].includes(entry.name)) {
          fixLlmsFilesInDir(path.join(outDir, entry.name));
        }
      }
      console.log(`[fix-llms-urls] Normalized URLs in ${total}+ llms file(s) under ${outDir}.`);
    },
  };
};

module.exports.fixLlmsFilesInDir = fixLlmsFilesInDir;
module.exports.SITE_ORIGIN = SITE_ORIGIN;
module.exports.SUPPLEMENTARY_HUB_ENTRIES = SUPPLEMENTARY_HUB_ENTRIES;
module.exports.llmsUrlsInContent = llmsUrlsInContent;
