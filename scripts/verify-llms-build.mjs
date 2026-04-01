#!/usr/bin/env node
/**
 * Verification script for LLM and markdown build artifacts.
 * Run after `yarn build` to ensure llms.txt and llms-full.txt exist for all locales.
 *
 * Usage: node scripts/verify-llms-build.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.join(__dirname, '..', 'build');

const LOCALES = ['en', 'es', 'ja', 'ko'];

function pathForLocale(locale) {
  if (locale === 'en') {
    return BUILD_DIR;
  }
  return path.join(BUILD_DIR, locale);
}

const requiredFiles = ['llms.txt', 'llms-full.txt'];

let failed = false;

console.log('Verifying LLM and markdown build artifacts...\n');

for (const locale of LOCALES) {
  const base = pathForLocale(locale);
  const label = locale === 'en' ? 'default (en)' : locale;
  console.log(`Locale: ${label} (${base})`);

  for (const file of requiredFiles) {
    const filePath = path.join(base, file);
    const exists = fs.existsSync(filePath);
    const status = exists ? '✓' : '✗ MISSING';
    if (!exists) failed = true;
    console.log(`  ${status} ${file}`);
  }

  const mdCount = countMarkdownFiles(base);
  if (mdCount >= 0) {
    console.log(`  ✓ ${mdCount} .md files (markdown source)`);
  }
  console.log('');
}

if (failed) {
  console.error('Some required files are missing. Run `yarn build` and ensure docusaurus-plugin-llms is configured.');
  process.exit(1);
}

console.log('All required LLM artifacts found for all locales.\n');

function countMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return -1;
  let count = 0;
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        count += countMarkdownFiles(full);
      } else if (e.isFile() && e.name.endsWith('.md')) {
        count++;
      }
    }
    return count;
  } catch {
    return -1;
  }
}
