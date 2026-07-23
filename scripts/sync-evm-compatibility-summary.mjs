#!/usr/bin/env node
/**
 * Sync EVM compatibility summary for cheatsheet and docs.
 *
 * Source: rskj-evm-compatibility repo (local copy or EVM_COMPAT_SOURCE env).
 * Default local path: roadmap/rskj-evm-compatibility-main (not committed).
 *
 * Usage:
 *   node scripts/sync-evm-compatibility-summary.mjs
 *   node scripts/sync-evm-compatibility-summary.mjs --update-cheatsheet
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const SOURCE_DIR =
  process.env.EVM_COMPAT_SOURCE ??
  path.join(projectRoot, 'roadmap', 'rskj-evm-compatibility-main');

const SUMMARY_PATH = path.join(projectRoot, 'data', 'evm-compatibility-summary.json');
const CHEATSHEET_MD_PATH = path.join(projectRoot, 'static', 'cheatsheet.md');

/** Align with docs/02-developers/02-requirements/index.md supported compiler. */
const TARGET_SOLIDITY = process.env.TARGET_SOLIDITY ?? '0.8.34';

const EXPLORER_URL = 'https://rskj-evm-compatibility.rsk.co/';
const SOURCE_REPO_URL = 'https://github.com/rsksmart/rskj-evm-compatibility';
const REQUIREMENTS_PATH = '/developers/requirements/';

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(SOURCE_DIR, relativePath), 'utf8'));
}

function formatEvmVersion(evmVersion) {
  if (!evmVersion) {
    return '';
  }
  return evmVersion.charAt(0).toUpperCase() + evmVersion.slice(1);
}

function pickLatestRskjVersion(releases) {
  return [...releases].sort((a, b) => b.version.localeCompare(a.version, undefined, {numeric: true}))[0]
    .version;
}

function buildSummary() {
  const metadata = readJson('data/metadata.json');
  const rskjReleases = readJson('data/rskj/releases.json');
  const solidityReleases = readJson('data/solidity/releases.json');
  const matrix = readJson('data/matrix/compatibility.json');
  const behavioral = readJson('data/behavioral-differences.json');

  const latestRskj = pickLatestRskjVersion(rskjReleases.releases);
  const matrixEntry = matrix.entries.find(
    (entry) => entry.solidityVersion === TARGET_SOLIDITY && entry.rskjVersion === latestRskj,
  );

  if (!matrixEntry) {
    throw new Error(
      `No matrix entry for Solidity ${TARGET_SOLIDITY} and RSKj ${latestRskj}. Regenerate the matrix in rskj-evm-compatibility.`,
    );
  }

  const solidityRelease = solidityReleases.releases.find((r) => r.version === TARGET_SOLIDITY);
  const evmVersion = matrixEntry.recommendation?.evmVersion ?? solidityRelease?.defaultEvmVersion;
  const maxSolidity = solidityReleases.releases
    .map((r) => r.version)
    .sort((a, b) => b.localeCompare(a, undefined, {numeric: true}))[0];

  return {
    schemaVersion: '1.0.0',
    sourceRepoUrl: SOURCE_REPO_URL,
    explorerUrl: EXPLORER_URL,
    requirementsPath: REQUIREMENTS_PATH,
    catalogVersion: metadata.catalogVersion,
    catalogUpdatedAt: metadata.updatedAt,
    syncedAt: new Date().toISOString(),
    recommended: {
      solidityVersion: TARGET_SOLIDITY,
      solidityVersionDisplay: `up to ${maxSolidity}`,
      evmVersion,
      evmVersionDisplay: formatEvmVersion(evmVersion),
      rskjVersion: latestRskj,
      networkUpgrade: matrixEntry.networkUpgrade,
      compatible: matrixEntry.recommendation?.compatible ?? true,
      warnings: matrixEntry.recommendation?.warnings ?? [],
    },
    behavioralDifferencesCount: Array.isArray(behavioral.differences)
      ? behavioral.differences.length
      : Array.isArray(behavioral)
        ? behavioral.length
        : 0,
  };
}

function updateCheatsheetMarkdown(summary) {
  if (!fs.existsSync(CHEATSHEET_MD_PATH)) {
    return;
  }

  let md = fs.readFileSync(CHEATSHEET_MD_PATH, 'utf8');
  const {recommended} = summary;
  const solidity = recommended.solidityVersionDisplay;
  const evm = recommended.evmVersionDisplay;

  md = md.replace(
    /\| Supported Version \| up to [^\|]+ \|/,
    `| Supported Version | ${solidity} |`,
  );
  md = md.replace(/\| EVM Version \| [^\|]+ \|/, `| EVM Version | ${evm} |`);
  md = md.replace(
    /\| Solidity \| up to [^\|]+ \| up to [^\|]+ \|/,
    `| Solidity | ${solidity} | ${solidity} |`,
  );
  md = md.replace(/\| EVM \| [^\|]+ \| [^\|]+ \|/, `| EVM | ${evm} | ${evm} |`);

  if (!md.includes('EVM Compatibility Explorer')) {
    md = md.replace(
      '### 1.4 Solidity Compiler\n',
      `### 1.4 Solidity Compiler\n\nFull opcode and compiler matrix: [EVM Compatibility Explorer](${EXPLORER_URL}) · [Requirements](https://dev.rootstock.io${REQUIREMENTS_PATH})\n`,
    );
  }

  fs.writeFileSync(CHEATSHEET_MD_PATH, md);
}

function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(
      `EVM compatibility source not found at ${SOURCE_DIR}.\nSet EVM_COMPAT_SOURCE or copy rskj-evm-compatibility into roadmap/rskj-evm-compatibility-main.`,
    );
    process.exit(1);
  }

  const summary = buildSummary();
  fs.mkdirSync(path.dirname(SUMMARY_PATH), {recursive: true});
  fs.writeFileSync(SUMMARY_PATH, `${JSON.stringify(summary, null, 2)}\n`);

  console.log(`Wrote ${path.relative(projectRoot, SUMMARY_PATH)}`);
  console.log(
    `  Solidity: ${summary.recommended.solidityVersionDisplay}, EVM: ${summary.recommended.evmVersionDisplay}, RSKj: ${summary.recommended.rskjVersion}`,
  );

  if (process.argv.includes('--update-cheatsheet')) {
    updateCheatsheetMarkdown(summary);
    console.log(`Updated ${path.relative(projectRoot, CHEATSHEET_MD_PATH)}`);
  }
}

main();
