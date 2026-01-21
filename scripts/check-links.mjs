#!/usr/bin/env node

/**
 * Broken Links Checker for Rootstock DevPortal
 * Uses Docusaurus built-in link checker by running build with strict link checking
 *
 * Usage:
 *   yarn check-links              # Check all locales
 *   yarn check-links:en           # Check English only
 *   yarn check-links:es           # Check Spanish locale
 *   yarn check-links:ja           # Check Japanese locale
 *   yarn check-links:ko           # Check Korean locale
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

// Import locales directly from docusaurus config
import docusaurusConfig from '../docusaurus.config.js';
const LOCALES = docusaurusConfig.i18n?.locales || ['en'];

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    locale: null,
    help: false,
  };

  for (const arg of args) {
    if (arg.startsWith('--locale=')) {
      options.locale = arg.split('=')[1];
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    }
  }

  return options;
}

function showHelp() {
  console.log(`
Broken Links Checker for Rootstock DevPortal
Uses Docusaurus built-in link checker (internal links only)

Usage:
  yarn check-links              Check all locales
  yarn check-links:en           Check English only
  yarn check-links:es           Check Spanish only
  yarn check-links:ja           Check Japanese only
  yarn check-links:ko           Check Korean only

Options:
  --locale=<locale>    Check specific locale (${LOCALES.join(', ')})
  --help, -h           Show this help message

How it works:
  This script runs 'docusaurus build' and parses the output for
  broken links and anchors warnings. It reports all issues found.
`);
}

// Run docusaurus build with link checking for a specific locale
async function checkLocale(locale) {
  return new Promise((resolve) => {
    console.log(`\n🔍 Checking links for locale: ${locale.toUpperCase()}`);
    console.log('   Running docusaurus build with link checking...\n');

    const args = ['docusaurus', 'build'];
    if (locale !== '') {
      args.push('--locale', locale);
    }

    const build = spawn('yarn', args, {
      cwd: ROOT_DIR,
      stdio: 'pipe',
      env: {
        ...process.env,
        // Use 'warn' to get full list of broken links, then we'll fail based on results
        DOCUSAURUS_BROKEN_LINKS: 'warn',
        DOCUSAURUS_BROKEN_MARKDOWN_LINKS: 'warn',
        DOCUSAURUS_BROKEN_ANCHORS: 'warn',
      },
    });

    let fullOutput = '';
    const brokenLinks = [];
    const brokenAnchors = [];

    // Patterns to filter out from output (not related to broken links)
    const filterPatterns = [
      /For locale=\w+, a maximum of \d+ plural forms are expected/,
      /Browserslist: browsers data/,
      /npx update-browserslist-db/,
      /Why you should do it regularly/,
      /Update available \d+\.\d+\.\d+ → \d+\.\d+\.\d+/,
      /To upgrade Docusaurus packages/,
      /`yarn upgrade @docusaurus/,
    ];

    const shouldFilterLine = (line) => {
      return filterPatterns.some(pattern => pattern.test(line));
    };

    const processOutput = (data) => {
      const text = data.toString();
      fullOutput += text;

      // Filter output line by line
      const lines = text.split('\n');
      const filteredLines = lines.filter(line => !shouldFilterLine(line));
      if (filteredLines.length > 0) {
        // Join and write, preserving original line structure
        const output = filteredLines.join('\n');
        if (output.trim()) {
          process.stdout.write(output);
          // Add newline only if original text ended with one
          if (text.endsWith('\n') && !output.endsWith('\n')) {
            process.stdout.write('\n');
          }
        }
      }
    };

    build.stdout.on('data', processOutput);
    build.stderr.on('data', processOutput);

    build.on('close', (code) => {
      // Parse broken links and anchors from the full output
      const lines = fullOutput.split('\n');
      let currentSource = null;
      let parsingAnchors = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Detect if we're in the anchors section
        if (line.includes('Docusaurus found broken anchors')) {
          parsingAnchors = true;
        }
        if (line.includes('Docusaurus found broken links')) {
          parsingAnchors = false;
        }

        // Match "Broken link on source page path = /path/to/page:" or "Broken anchor on source page path = ..."
        const sourceMatch = line.match(/Broken (?:link|anchor) on source page path = ([^:]+):/);
        if (sourceMatch) {
          currentSource = sourceMatch[1];
        }

        // Match "-> linking to /broken/link" or "-> linking to #anchor"
        const targetMatch = line.match(/-> linking to (.+)/);
        if (targetMatch && currentSource) {
          const target = targetMatch[1].trim();
          if (parsingAnchors || target.startsWith('#')) {
            const exists = brokenAnchors.some(l => l.source === currentSource && l.target === target);
            if (!exists) {
              brokenAnchors.push({ source: currentSource, target });
            }
          } else {
            const exists = brokenLinks.some(l => l.source === currentSource && l.target === target);
            if (!exists) {
              brokenLinks.push({ source: currentSource, target });
            }
          }
        }

        // Match MDX format: "Docs markdown link couldn't be resolved: (link) in source file "path""
        const mdxMatch = line.match(/Docs markdown link couldn't be resolved: \(([^)]+)\) in source file "([^"]+)"/);
        if (mdxMatch) {
          const source = mdxMatch[2].replace(ROOT_DIR + '/', '');
          const target = mdxMatch[1];
          const exists = brokenLinks.some(l => l.source === source && l.target === target);
          if (!exists) {
            brokenLinks.push({ source, target });
          }
        }

        // Match "MDX compilation failed for file" with broken link info
        const mdxFileMatch = line.match(/MDX compilation failed for file "([^"]+)"/);
        if (mdxFileMatch) {
          currentSource = mdxFileMatch[1].replace(ROOT_DIR + '/', '');
        }

        // Match "Cause: Docs markdown link couldn't be resolved: (link)"
        const causeMatch = line.match(/Cause: Docs markdown link couldn't be resolved: \(([^)]+)\)/);
        if (causeMatch && currentSource) {
          const exists = brokenLinks.some(l => l.source === currentSource && l.target === causeMatch[1]);
          if (!exists) {
            brokenLinks.push({
              source: currentSource,
              target: causeMatch[1],
            });
          }
        }
      }

      const hasBrokenLinks = brokenLinks.length > 0 || brokenAnchors.length > 0;

      resolve({
        locale,
        success: code === 0 && !hasBrokenLinks,
        brokenLinks,
        brokenAnchors,
        fullOutput,
      });
    });

    build.on('error', (error) => {
      resolve({
        locale,
        success: false,
        brokenLinks: [],
        brokenAnchors: [],
        fullOutput: error.message,
      });
    });
  });
}

// Format and display results
function displayResults(results) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 BROKEN LINKS REPORT');
  console.log('='.repeat(60));

  let hasErrors = false;
  let totalBrokenLinks = 0;
  let totalBrokenAnchors = 0;

  for (const result of results) {
    console.log(`\n📁 Locale: ${result.locale.toUpperCase()}`);

    if (result.success) {
      console.log('   ✅ No broken links or anchors found');
    } else {
      hasErrors = true;

      // Display broken links
      if (result.brokenLinks.length > 0) {
        totalBrokenLinks += result.brokenLinks.length;
        console.log(`\n   🔗 Broken Links (${result.brokenLinks.length}):`);
        for (const link of result.brokenLinks) {
          console.log(`   • Source: ${link.source}`);
          console.log(`     Target: ${link.target}`);
        }
      }

      // Display broken anchors
      if (result.brokenAnchors.length > 0) {
        totalBrokenAnchors += result.brokenAnchors.length;
        console.log(`\n   ⚓ Broken Anchors (${result.brokenAnchors.length}):`);
        for (const anchor of result.brokenAnchors) {
          console.log(`   • Source: ${anchor.source}`);
          console.log(`     Target: ${anchor.target}`);
        }
      }

      if (result.brokenLinks.length === 0 && result.brokenAnchors.length === 0) {
        console.log('   ❌ Build failed (check output above for details)');
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📈 SUMMARY');
  console.log(`   Locales checked: ${results.length}`);
  console.log(`   Total broken links: ${totalBrokenLinks}`);
  console.log(`   Total broken anchors: ${totalBrokenAnchors}`);
  console.log(`   Status: ${hasErrors ? '❌ FAILED' : '✅ PASSED'}`);
  console.log('='.repeat(60) + '\n');

  return hasErrors;
}

// Main function
async function main() {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    process.exit(0);
  }

  // Validate locale if provided
  if (options.locale && !LOCALES.includes(options.locale)) {
    console.error(`❌ Invalid locale: ${options.locale}`);
    console.error(`   Valid locales: ${LOCALES.join(', ')}`);
    process.exit(1);
  }

  const localesToCheck = options.locale ? [options.locale] : LOCALES;

  console.log('🔗 Docusaurus Broken Links Checker');
  console.log('   Checking internal links using Docusaurus build...');

  const results = [];
  for (const locale of localesToCheck) {
    const result = await checkLocale(locale);
    results.push(result);
  }

  const hasErrors = displayResults(results);
  process.exit(hasErrors ? 1 : 0);
}

main();
