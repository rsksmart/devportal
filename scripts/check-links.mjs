#!/usr/bin/env node

/**
 * Broken Links Checker for Rootstock DevPortal
 * Uses Docusaurus built-in link checker by running build with strict link checking
 *
 * Usage:
 *   yarn check-links              # Check all locales (internal links only)
 *   yarn check-links:en           # Check English only
 *   yarn check-links:es           # Check Spanish locale
 *   yarn check-links:ja           # Check Japanese locale
 *   yarn check-links:ko           # Check Korean locale
 *   yarn check-links:external     # Check external links (local only)
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { LinkChecker } from 'linkinator';

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
    external: false,
  };

  for (const arg of args) {
    if (arg.startsWith('--locale=')) {
      options.locale = arg.split('=')[1];
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--external' || arg === '-e') {
      options.external = true;
    }
  }

  return options;
}

function showHelp() {
  console.log(`
Broken Links Checker for Rootstock DevPortal

Usage:
  yarn check-links              Check all locales (internal links only)
  yarn check-links:en           Check English only
  yarn check-links:es           Check Spanish only
  yarn check-links:ja           Check Japanese only
  yarn check-links:ko           Check Korean only
  yarn check-links:external     Check external links (local only, requires built site)

Options:
  --locale=<locale>    Check specific locale (${LOCALES.join(', ')})
  --external, -e       Check external links only (requires 'yarn build' first)
  --help, -h           Show this help message

How it works:
  Internal links: Runs 'docusaurus build' and parses the output for
  broken links and anchors warnings.

  External links: Uses linkinator to crawl the built site and check
  all external URLs. Requires running 'yarn build' first.
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

// Start a simple HTTP server for the build directory
async function startServer(buildDir, port = 3001) {
  const http = await import('http');
  const fs = await import('fs');
  const fsPath = await import('path');
  const url = await import('url');

  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let filePath = fsPath.join(buildDir, url.parse(req.url).pathname);

      // Default to index.html for directories
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = fsPath.join(filePath, 'index.html');
      }

      // Try adding .html extension
      if (!fs.existsSync(filePath) && !filePath.endsWith('.html')) {
        const htmlPath = filePath + '.html';
        if (fs.existsSync(htmlPath)) {
          filePath = htmlPath;
        }
      }

      if (fs.existsSync(filePath)) {
        const ext = fsPath.extname(filePath).toLowerCase();
        const mimeTypes = {
          '.html': 'text/html',
          '.js': 'application/javascript',
          '.css': 'text/css',
          '.json': 'application/json',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.gif': 'image/gif',
          '.svg': 'image/svg+xml',
          '.ico': 'image/x-icon',
        };
        const contentType = mimeTypes[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(port, () => {
      resolve(server);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // Try next port
        resolve(startServer(buildDir, port + 1));
      } else {
        reject(err);
      }
    });
  });
}

// Check external links using linkinator
async function checkExternalLinks() {
  const buildDir = path.join(ROOT_DIR, 'build');

  // Check if build directory exists
  const fs = await import('fs');
  if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found. Please run "yarn build" first.');
    process.exit(1);
  }

  console.log('🌐 External Links Checker');
  console.log('   Checking external links in built site...');
  console.log('   Starting local server...');

  // Start local server
  let server;
  let serverPort = 3001;
  try {
    server = await startServer(buildDir, serverPort);
    serverPort = server.address().port;
    console.log(`   Server running on http://localhost:${serverPort}`);
  } catch (error) {
    console.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }

  console.log('   Crawling site for external links...');
  console.log('   This may take several minutes...\n');

  const checker = new LinkChecker();
  const brokenLinks = [];
  const unreachableLinks = [];
  const redirectLinks = [];
  const allExternalLinks = new Map(); // Map of URL -> Set of parent pages
  let checkedCount = 0;
  let externalCount = 0;

  const brokenUrlsReported = new Set(); // Track already reported broken URLs
  const unreachableUrlsReported = new Set(); // Track already reported unreachable URLs
  const redirectUrlsReported = new Set(); // Track already reported redirect URLs

  // Catch timeout/abort from internal streams so the script exits cleanly instead of crashing
  const timeoutHandler = (err) => {
    if (err?.message && /timeout|aborted|TimeoutError/i.test(err.message)) {
      console.warn('\n   ⚠️  External link check hit a timeout; exiting with partial results.');
    } else {
      console.error('\n❌ Uncaught error during link check:', err?.message || err);
    }
    server.close();
    process.exit(1);
  };
  process.on('uncaughtException', timeoutHandler);

  checker.on('link', (result) => {
    checkedCount++;

    // Only track external links (http/https that are not localhost)
    const isExternal = (result.url.startsWith('http://') || result.url.startsWith('https://')) &&
                       !result.url.includes('localhost') &&
                       !result.url.includes('127.0.0.1') &&
                       !result.url.includes('0.0.0.0');

    if (isExternal) {
      externalCount++;

      // Track all external links and their source pages
      if (!allExternalLinks.has(result.url)) {
        allExternalLinks.set(result.url, new Set());
      }
      if (result.parent) {
        // Clean up parent path for readability
        const cleanParent = result.parent.replace(/^http:\/\/localhost:\d+/, '');
        allExternalLinks.get(result.url).add(cleanParent || '/');
      }

      // Check for redirects (3xx status codes)
      const isRedirect = result.status >= 300 && result.status < 400;

      // Broken with real error status (4xx or 5xx); ignore 401/403/429 (geo, bot-block, rate-limit)
      const isReallyBroken = result.state === 'BROKEN' &&
                             result.status &&
                             result.status >= 400 &&
                             result.status !== 401 &&
                             result.status !== 403 &&
                             result.status !== 429;

      // Known broken redirect targets: we link to canonical URL (e.g. drpc.org) but server redirects to www and that returns 404
      const brokenRedirectTargetSkip = [/^https:\/\/www\.drpc\.org\/?$/];
      const skipAsBroken = brokenRedirectTargetSkip.some(re => re.test(result.url));

      // Unreachable - marked as broken but no status (timeout, connection error, bot-blocked)
      const isUnreachable = result.state === 'BROKEN' && !result.status;

      if (isReallyBroken && !skipAsBroken) {
        const cleanParent = result.parent ? result.parent.replace(/^http:\/\/localhost:\d+/, '') : '';

        // Only add if not already in broken links (deduplicate by URL)
        if (!brokenLinks.some(bl => bl.url === result.url)) {
          brokenLinks.push({
            url: result.url,
            status: result.status,
            parent: cleanParent || '/',
          });
        }

        // Only log each broken URL once
        if (!brokenUrlsReported.has(result.url)) {
          brokenUrlsReported.add(result.url);
          console.log(`   ❌ ${result.url} (${result.status})`);
        }
      } else if (isUnreachable) {
        // Track unreachable links separately (timeouts, connection errors, bot-blocked)
        if (!unreachableLinks.some(ul => ul.url === result.url)) {
          unreachableLinks.push({
            url: result.url,
            status: 'unreachable',
          });
        }

        // Only log each unreachable URL once
        if (!unreachableUrlsReported.has(result.url)) {
          unreachableUrlsReported.add(result.url);
          console.log(`   ⚠️  ${result.url} (unreachable)`);
        }
      } else if (isRedirect) {
        // Track redirects separately
        if (!redirectLinks.some(rl => rl.url === result.url)) {
          redirectLinks.push({
            url: result.url,
            status: result.status,
          });
        }

        // Only log each redirect URL once
        if (!redirectUrlsReported.has(result.url)) {
          redirectUrlsReported.add(result.url);
          console.log(`   ↪️  ${result.url} (${result.status} redirect)`);
        }
      }
    }

    if (checkedCount % 100 === 0) {
      console.log(`   ✓ Checked ${checkedCount} links (${externalCount} external)...`);
    }
  });

  // Get site URL from docusaurus config to skip internal links pointing to production
  const siteUrl = docusaurusConfig.url?.replace(/\/$/, '') || 'https://dev.rootstock.io';
  const siteUrlPattern = new RegExp(siteUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  try {
    await checker.check({
      path: `http://localhost:${serverPort}`,
      recurse: true,
      linksToSkip: [
        // Skip links to own site (from docusaurus.config.js url)
        siteUrlPattern,
        // Skip services links
        /public-node\.(testnet\.)?rsk\.co/,
        // Skip Rootstock RPC endpoints (testnet/mainnet; JSON-RPC, not HTTP page)
        /^https?:\/\/rpc\.(testnet\.)?rootstock\.io(?:\/|$)/,
        // Skip common false positives
        /example\.com/,
        /placeholder/,
        /your-domain/,
        // Skip tracking/analytics
        /googletagmanager\.com/,
        // Skip social media that often block bots
        /twitter\.com/,
        /x\.com/,
        /linkedin\.com/,
        /facebook\.com/,
        /instagram\.com/,
        // Skip The Graph gateway APIs (auth/rate-limit when crawled)
        /^https?:\/\/network\.thegraph\.com\b/,
        // Skip mailto and tel links
        /^mailto:/,
        /^tel:/,
        /^javascript:/,
      ],
      timeout: 30000,
      concurrency: 4,
      retry: true,
      retryErrors: true,
      retryErrorsCount: 2,
      retryErrorsJitter: 1000,
    });
  } catch (error) {
    console.error(`\n❌ Error during link checking: ${error.message}`);
  } finally {
    process.off('uncaughtException', timeoutHandler);
  }

  // Stop the server
  server.close();

  // Display results
  console.log('\n' + '='.repeat(60));
  console.log('📊 EXTERNAL LINKS REPORT');
  console.log('='.repeat(60));

  // Show broken links with all source files
  if (brokenLinks.length === 0) {
    console.log('\n   ✅ No broken external links found');
  } else {
    console.log(`\n   ❌ Broken External Links (${brokenLinks.length}):\n`);
    for (const link of brokenLinks) {
      console.log(`   • URL: ${link.url}`);
      console.log(`     Status: ${link.status}`);
      // Get all pages where this broken link was found
      const pages = allExternalLinks.get(link.url);
      if (pages && pages.size > 0) {
        console.log(`     Found in ${pages.size} page(s):`);
        for (const page of pages) {
          console.log(`       - ${page}`);
        }
      }
      console.log('');
    }
  }

  // Show redirect links with all source files
  if (redirectLinks.length > 0) {
    console.log(`\n   ↪️  Redirect Links (${redirectLinks.length}):\n`);
    for (const link of redirectLinks) {
      console.log(`   • URL: ${link.url}`);
      console.log(`     Status: ${link.status} (redirect)`);
      // Get all pages where this redirect link was found
      const pages = allExternalLinks.get(link.url);
      if (pages && pages.size > 0) {
        console.log(`     Found in ${pages.size} page(s):`);
        for (const page of pages) {
          console.log(`       - ${page}`);
        }
      }
      console.log('');
    }
  }

  console.log('='.repeat(60));
  console.log('📈 SUMMARY');
  console.log(`   Total links checked: ${checkedCount}`);
  console.log(`   External links found: ${externalCount}`);
  console.log(`   Unique external URLs: ${allExternalLinks.size}`);
  console.log(`   Broken external links: ${brokenLinks.length}`);
  console.log(`   Unreachable links: ${unreachableLinks.length}`);
  console.log(`   Redirect links: ${redirectLinks.length}`);
  console.log(`   Status: ${brokenLinks.length > 0 ? '❌ FAILED' : '✅ PASSED'}`);
  console.log('='.repeat(60) + '\n');

  return brokenLinks.length > 0;
}

// Main function
async function main() {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    process.exit(0);
  }

  // External links check mode
  if (options.external) {
    const hasErrors = await checkExternalLinks();
    process.exit(hasErrors ? 1 : 0);
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
