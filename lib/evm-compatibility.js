/**
 * Shared EVM compatibility helpers for cheatsheet and verification scripts.
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUMMARY_PATH = path.join(__dirname, '..', 'data', 'evm-compatibility-summary.json');

export function formatEvmVersion(evmVersion) {
  if (!evmVersion) {
    return '';
  }
  return evmVersion.charAt(0).toUpperCase() + evmVersion.slice(1);
}

export function loadEvmCompatibilitySummary() {
  return JSON.parse(fs.readFileSync(SUMMARY_PATH, 'utf8'));
}

export function getRecommendedCompilerSettings(summary = loadEvmCompatibilitySummary()) {
  const {recommended, explorerUrl, requirementsPath} = summary;
  return {
    solidityVersion: recommended.solidityVersion,
    solidityVersionDisplay: recommended.solidityVersionDisplay,
    evmVersion: recommended.evmVersion,
    evmVersionDisplay: recommended.evmVersionDisplay,
    explorerUrl,
    requirementsPath,
  };
}
