#!/usr/bin/env node
/**
 * Compare sitemap.xml URLs against llms.txt coverage.
 * Run after `yarn build` (and fix-llms-urls.mjs).
 *
 * Usage: node scripts/audit-llms-coverage.mjs [--min-coverage 95]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.join(__dirname, '..', 'build');
const require = createRequire(import.meta.url);
const { SITE_ORIGIN, llmsUrlsInContent } = require('../plugins/fix-llms-urls.js');

const DEFAULT_MIN_COVERAGE = 95;
const MAX_LLMS_BYTES = 51200;

const EXCLUDED_PATH_PREFIXES = [
  '/changelog',
  '/components',
  '/search',
  '/tags/',
];

const EXCLUDED_EXACT = new Set([
  `${SITE_ORIGIN}/changelog`,
  `${SITE_ORIGIN}/components`,
  `${SITE_ORIGIN}/search`,
]);

/**
 * Collapses a URL to the form used for coverage comparison. llms.txt links
 * point at the markdown exports, so `/index.md` and `.md` are stripped to match
 * the HTML URLs in the sitemap, the same normalization agent scorers apply.
 */
function normalizeUrl(url) {
  return (
    url
      .replace(/\/index\.mdx?$/i, '/')
      .replace(/\.mdx?$/i, '')
      .replace(/\/$/, '') || SITE_ORIGIN
  );
}

function shouldExclude(url) {
  const normalized = normalizeUrl(url);
  if (EXCLUDED_EXACT.has(normalized)) {
    return true;
  }
  try {
    const { pathname } = new URL(normalized);
    return EXCLUDED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  } catch {
    return true;
  }
}

function readSitemapUrls(filePath) {
  const xml = fs.readFileSync(filePath, 'utf8');
  return [...xml.matchAll(/<loc>(https:\/\/dev\.rootstock\.io[^<]+)<\/loc>/g)].map((match) =>
    normalizeUrl(match[1]),
  );
}

function parseArgs() {
  const args = process.argv.slice(2);
  const minCoverageIndex = args.indexOf('--min-coverage');
  const minCoverage =
    minCoverageIndex >= 0 ? Number(args[minCoverageIndex + 1]) : DEFAULT_MIN_COVERAGE;
  return { minCoverage };
}

function main() {
  const { minCoverage } = parseArgs();
  const llmsPath = path.join(BUILD_DIR, 'llms.txt');
  const sitemapPath = path.join(BUILD_DIR, 'sitemap.xml');

  if (!fs.existsSync(llmsPath) || !fs.existsSync(sitemapPath)) {
    console.error('Missing build/llms.txt or build/sitemap.xml. Run `yarn build` first.');
    process.exit(1);
  }

  const llmsContent = fs.readFileSync(llmsPath, 'utf8');
  const llmsUrls = new Set([...llmsUrlsInContent(llmsContent)].map(normalizeUrl));
  const sitemapUrls = readSitemapUrls(sitemapPath).filter((url) => !shouldExclude(url));
  const missing = sitemapUrls.filter((url) => !llmsUrls.has(url));
  const coverage = sitemapUrls.length
    ? ((sitemapUrls.length - missing.length) / sitemapUrls.length) * 100
    : 100;
  const llmsBytes = Buffer.byteLength(llmsContent, 'utf8');

  console.log('LLMS coverage audit\n');
  console.log(`  llms.txt size: ${llmsBytes} bytes (limit ${MAX_LLMS_BYTES})`);
  console.log(`  llms URLs: ${llmsUrls.size}`);
  console.log(`  sitemap URLs (audited): ${sitemapUrls.length}`);
  console.log(`  coverage: ${coverage.toFixed(1)}% (minimum ${minCoverage}%)`);

  if (missing.length > 0) {
    console.log(`\nMissing from llms.txt (${missing.length}):`);
    for (const url of missing) {
      console.log(`  - ${url}`);
    }
  }

  let failed = false;
  if (coverage < minCoverage) {
    failed = true;
    console.error(`\n✗ Coverage below ${minCoverage}%`);
  } else {
    console.log(`\n✓ Coverage meets ${minCoverage}% threshold`);
  }

  if (llmsBytes > MAX_LLMS_BYTES) {
    failed = true;
    console.error(`\n✗ llms.txt exceeds ${MAX_LLMS_BYTES} bytes`);
  } else {
    console.log(`✓ llms.txt within ${MAX_LLMS_BYTES} byte limit`);
  }

  process.exit(failed ? 1 : 0);
}

main();
