#!/usr/bin/env node
/**
 * Unit checks for markdown content-negotiation path resolution.
 * Usage: node scripts/verify-middleware-paths.mjs
 */

import {
  resolveMarkdownPath,
  wantsMarkdownAccept,
} from '../lib/markdown-negotiation-paths.js';

const cases = [
  {
    input: '/',
    expected: '/index.md',
  },
  {
    input: '/concepts/glossary/',
    expected: '/concepts/glossary/index.md',
  },
  {
    input: '/es/dev-tools/wallets/metamask',
    expected: '/es/dev-tools/wallets/metamask/index.md',
  },
  {
    input: '/concepts/../../../etc/passwd',
    expected: null,
  },
  {
    input: '/developers/../resources/foo/',
    expected: null,
  },
  {
    input: '/concepts/_draft/page/',
    expected: null,
  },
  {
    input: '/changelog/',
    expected: null,
  },
];

let failed = false;

for (const {input, expected} of cases) {
  const actual = resolveMarkdownPath(input);
  if (actual !== expected) {
    failed = true;
    console.error(`✗ resolveMarkdownPath(${JSON.stringify(input)})`);
    console.error(`  expected: ${JSON.stringify(expected)}`);
    console.error(`  actual:   ${JSON.stringify(actual)}`);
  }
}

if (!wantsMarkdownAccept('text/html, text/markdown;q=0.9')) {
  failed = true;
  console.error('✗ wantsMarkdownAccept should accept text/markdown');
}

if (wantsMarkdownAccept('text/html')) {
  failed = true;
  console.error('✗ wantsMarkdownAccept should reject html-only Accept');
}

if (failed) {
  console.error('\nMiddleware path verification failed.');
  process.exit(1);
}

console.log(`✓ ${cases.length} path resolution checks passed`);
