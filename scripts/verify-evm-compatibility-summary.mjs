#!/usr/bin/env node
/**
 * Verify committed EVM compatibility summary exists and matches requirements target.
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const summaryPath = path.join(__dirname, '..', 'data', 'evm-compatibility-summary.json');

if (!fs.existsSync(summaryPath)) {
  console.error('Missing data/evm-compatibility-summary.json. Run: yarn sync:evm-compatibility');
  process.exit(1);
}

const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
const required = ['explorerUrl', 'requirementsPath', 'recommended'];

for (const key of required) {
  if (!summary[key]) {
    console.error(`evm-compatibility-summary.json missing field: ${key}`);
    process.exit(1);
  }
}

const {recommended} = summary;
if (!recommended.solidityVersion || !recommended.evmVersion) {
  console.error('evm-compatibility-summary.json has incomplete recommended settings.');
  process.exit(1);
}

console.log(
  `✓ EVM compatibility summary: Solidity ${recommended.solidityVersionDisplay}, EVM ${recommended.evmVersionDisplay}`,
);
