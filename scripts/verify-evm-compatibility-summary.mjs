#!/usr/bin/env node
/**
 * Verify committed EVM compatibility summary exists and matches requirements + cheatsheet.
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const summaryPath = path.join(projectRoot, 'data', 'evm-compatibility-summary.json');
const requirementsPath = path.join(
  projectRoot,
  'docs',
  '02-developers',
  '02-requirements',
  'index.md',
);
const cheatsheetPath = path.join(projectRoot, 'static', 'cheatsheet.md');

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!fs.existsSync(summaryPath)) {
  fail('Missing data/evm-compatibility-summary.json. Run: yarn sync:evm-compatibility');
}

const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
const required = ['explorerUrl', 'requirementsPath', 'recommended'];

for (const key of required) {
  if (!summary[key]) {
    fail(`evm-compatibility-summary.json missing field: ${key}`);
  }
}

const {recommended} = summary;
if (!recommended.solidityVersion || !recommended.evmVersion) {
  fail('evm-compatibility-summary.json has incomplete recommended settings.');
}

if (!fs.existsSync(requirementsPath)) {
  fail(`Missing requirements doc: ${path.relative(projectRoot, requirementsPath)}`);
}

const requirementsMd = fs.readFileSync(requirementsPath, 'utf8');
const solcNeedle = `solc ${recommended.solidityVersion}`;
if (!requirementsMd.includes(solcNeedle)) {
  fail(
    `Requirements doc does not mention "${solcNeedle}". Update docs/02-developers/02-requirements/index.md or re-sync the summary.`,
  );
}

const evmNeedle = `\`${recommended.evmVersion}\``;
if (!requirementsMd.includes(evmNeedle)) {
  fail(
    `Requirements doc does not mention EVM target ${evmNeedle}. Update docs/02-developers/02-requirements/index.md or re-sync the summary.`,
  );
}

if (!fs.existsSync(cheatsheetPath)) {
  fail(`Missing cheatsheet markdown: ${path.relative(projectRoot, cheatsheetPath)}`);
}

const cheatsheetMd = fs.readFileSync(cheatsheetPath, 'utf8');
const {solidityVersionDisplay, evmVersionDisplay} = recommended;

if (!cheatsheetMd.includes(`| Supported Version | ${solidityVersionDisplay} |`)) {
  fail(
    `Cheatsheet Supported Version does not match summary ("${solidityVersionDisplay}"). Run: yarn sync:evm-compatibility --update-cheatsheet`,
  );
}

if (!cheatsheetMd.includes(`| EVM Version | ${evmVersionDisplay} |`)) {
  fail(
    `Cheatsheet EVM Version does not match summary ("${evmVersionDisplay}"). Run: yarn sync:evm-compatibility --update-cheatsheet`,
  );
}

console.log(
  `✓ EVM compatibility summary: Solidity ${recommended.solidityVersionDisplay}, EVM ${recommended.evmVersionDisplay}`,
);
console.log('✓ Cross-checked against requirements doc and static/cheatsheet.md');
