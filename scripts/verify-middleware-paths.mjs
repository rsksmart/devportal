#!/usr/bin/env node
/**
 * Unit checks for markdown content-negotiation path resolution.
 * Usage: node scripts/verify-middleware-paths.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  MIDDLEWARE_MATCHERS,
  resolveMarkdownPath,
  wantsMarkdownAccept,
} from '../lib/markdown-negotiation-paths.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const middlewareSource = fs.readFileSync(
  path.join(__dirname, '..', 'middleware.js'),
  'utf8',
);

function extractMiddlewareMatchers(source) {
  const blockMatch = source.match(/matcher:\s*\[([\s\S]*?)\n\s*\],/);
  if (!blockMatch) {
    return null;
  }

  return [...blockMatch[1].matchAll(/'([^']+)'|"([^"]+)"/g)].map(
    (match) => match[1] ?? match[2],
  );
}

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

const inlineMatchers = extractMiddlewareMatchers(middlewareSource);
if (!inlineMatchers) {
  failed = true;
  console.error('✗ middleware.js must declare config.matcher as a string literal array');
} else if (inlineMatchers.length !== MIDDLEWARE_MATCHERS.length) {
  failed = true;
  console.error(
    `✗ middleware.js matcher count ${inlineMatchers.length}, expected ${MIDDLEWARE_MATCHERS.length}`,
  );
} else {
  for (let i = 0; i < MIDDLEWARE_MATCHERS.length; i += 1) {
    if (inlineMatchers[i] !== MIDDLEWARE_MATCHERS[i]) {
      failed = true;
      console.error(`✗ middleware.js matcher[${i}] mismatch`);
      console.error(`  expected: ${JSON.stringify(MIDDLEWARE_MATCHERS[i])}`);
      console.error(`  actual:   ${JSON.stringify(inlineMatchers[i])}`);
    }
  }
}

if (/matcher:\s*MIDDLEWARE_MATCHERS/.test(middlewareSource)) {
  failed = true;
  console.error('✗ middleware.js config.matcher must be a literal array, not an identifier');
}

if (/\(\?:/.test(middlewareSource)) {
  failed = true;
  console.error('✗ middleware.js matcher must use path-to-regexp syntax, not regex (?:...)');
}

if (/\$\{/.test(middlewareSource)) {
  failed = true;
  console.error('✗ middleware.js matcher must not use template expressions');
}

if (failed) {
  console.error('\nMiddleware path verification failed.');
  process.exit(1);
}

console.log(`✓ ${cases.length} path resolution checks passed`);
console.log(`✓ ${inlineMatchers.length} middleware matcher paths in sync`);
