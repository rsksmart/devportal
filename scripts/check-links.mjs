#!/usr/bin/env node

/**
 * Broken Links Checker for Rootstock DevPortal
 *
 * Internal: Docusaurus built-in link checking (`yarn check-links`, `yarn build` path)
 * External / full-site crawl: linkinator (`yarn check-links:external`)
 *
 * Devportal Health export:
 *   yarn check-links:external --report=artifacts/reliability.json
 *   yarn check-links:en --report=artifacts/reliability-internal.json
 *
 * The JSON shape matches backoffice-template docs/reliability.example.json
 * (type: reliability | linkinator).
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LinkChecker } from 'linkinator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

import docusaurusConfig from '../docusaurus.config.js';
const LOCALES = docusaurusConfig.i18n?.locales || ['en'];
const SITE_URL = (docusaurusConfig.url || 'https://dev.rootstock.io').replace(/\/$/, '');

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    locale: null,
    help: false,
    external: false,
    report: null,
  };

  for (const arg of args) {
    if (arg.startsWith('--locale=')) {
      options.locale = arg.split('=')[1];
    } else if (arg.startsWith('--report=')) {
      options.report = arg.slice('--report='.length);
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
  yarn check-links              Check all locales (internal / Docusaurus)
  yarn check-links:en           Check English only
  yarn check-links:external     Linkinator crawl (requires yarn build first)
  yarn check-links:reliability  Build + linkinator crawl + write Health JSON

Options:
  --locale=<locale>    Check specific locale (${LOCALES.join(', ')})
  --external, -e       Linkinator crawl of the built site
  --report=<path>      Write Devportal Health reliability JSON to <path>
  --help, -h           Show this help message

Health dashboard:
  Import the --report JSON via backoffice docs-health:import
  (see https://github.com/rsksmart/backoffice-template docs/IMPORT_SCHEMAS.md).
`);
}

function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

function ensureParentDir(filePath) {
  const dir = path.dirname(path.resolve(filePath));
  fs.mkdirSync(dir, { recursive: true });
}

/**
 * Write a payload compatible with Devportal Health reliability import.
 */
function writeReliabilityReport(filePath, payload) {
  ensureParentDir(filePath);
  const absolute = path.resolve(filePath);
  fs.writeFileSync(absolute, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`\n📝 Wrote Devportal Health reliability report: ${absolute}`);
  return absolute;
}

function buildReliabilityPayload({
  totalLinks,
  broken,
  source,
  components,
}) {
  const brokenLinks = broken.length;
  const total = Math.max(totalLinks, brokenLinks);
  const validLinks = Math.max(0, total - brokenLinks);
  const reliabilityPercent = total > 0 ? Math.round((validLinks / total) * 10000) / 100 : 100;

  return {
    type: 'reliability',
    snapshotDate: todayUtc(),
    totalLinks: total,
    validLinks,
    brokenLinks,
    reliabilityPercent,
    broken: broken.slice(0, 50).map(row => ({
      url: row.url,
      status: typeof row.status === 'number' ? row.status : undefined,
      statusText: typeof row.status === 'string' ? row.status : undefined,
      parent: row.parent,
    })),
    source,
    sourceUrl: SITE_URL,
    ...(components ? { components } : {}),
  };
}

// --- Internal (Docusaurus) -------------------------------------------------

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
        DOCUSAURUS_BROKEN_LINKS: 'warn',
        DOCUSAURUS_BROKEN_MARKDOWN_LINKS: 'warn',
        DOCUSAURUS_BROKEN_ANCHORS: 'warn',
      },
    });

    let fullOutput = '';
    const brokenLinks = [];
    const brokenAnchors = [];

    const filterPatterns = [
      /For locale=\w+, a maximum of \d+ plural forms are expected/,
      /Browserslist: browsers data/,
      /npx update-browserslist-db/,
      /Why you should do it regularly/,
      /Update available \d+\.\d+\.\d+ → \d+\.\d+\.\d+/,
      /To upgrade Docusaurus packages/,
      /`yarn upgrade @docusaurus/,
    ];

    const shouldFilterLine = (line) => filterPatterns.some(pattern => pattern.test(line));

    const processOutput = (data) => {
      const text = data.toString();
      fullOutput += text;

      const lines = text.split('\n');
      const filteredLines = lines.filter(line => !shouldFilterLine(line));
      if (filteredLines.length > 0) {
        const output = filteredLines.join('\n');
        if (output.trim()) {
          process.stdout.write(output);
          if (text.endsWith('\n') && !output.endsWith('\n')) {
            process.stdout.write('\n');
          }
        }
      }
    };

    build.stdout.on('data', processOutput);
    build.stderr.on('data', processOutput);

    build.on('close', (code) => {
      const lines = fullOutput.split('\n');
      let currentSource = null;
      let parsingAnchors = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.includes('Docusaurus found broken anchors')) {
          parsingAnchors = true;
        }
        if (line.includes('Docusaurus found broken links')) {
          parsingAnchors = false;
        }

        const sourceMatch = line.match(/Broken (?:link|anchor) on source page path = ([^:]+):/);
        if (sourceMatch) {
          currentSource = sourceMatch[1];
        }

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

        const mdxMatch = line.match(/Docs markdown link couldn't be resolved: \(([^)]+)\) in source file "([^"]+)"/);
        if (mdxMatch) {
          const source = mdxMatch[2].replace(ROOT_DIR + '/', '');
          const target = mdxMatch[1];
          const exists = brokenLinks.some(l => l.source === source && l.target === target);
          if (!exists) {
            brokenLinks.push({ source, target });
          }
        }

        const mdxFileMatch = line.match(/MDX compilation failed for file "([^"]+)"/);
        if (mdxFileMatch) {
          currentSource = mdxFileMatch[1].replace(ROOT_DIR + '/', '');
        }

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

      if (result.brokenLinks.length > 0) {
        totalBrokenLinks += result.brokenLinks.length;
        console.log(`\n   🔗 Broken Links (${result.brokenLinks.length}):`);
        for (const link of result.brokenLinks) {
          console.log(`   • Source: ${link.source}`);
          console.log(`     Target: ${link.target}`);
        }
      }

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

  return { hasErrors, totalBrokenLinks, totalBrokenAnchors };
}

/** Estimate markdown/MDX link volume for internal reliability denominator. */
function estimateMarkdownLinkCount() {
  const roots = [path.join(ROOT_DIR, 'docs'), path.join(ROOT_DIR, 'i18n')];
  const linkRe = /\[[^\]]*\]\(([^)]+)\)|<a\s+[^>]*href=["']([^"']+)["']/gi;
  let count = 0;

  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.git') continue;
        walk(full);
        continue;
      }
      if (!/\.(md|mdx)$/i.test(entry.name)) continue;
      const text = fs.readFileSync(full, 'utf8');
      let match;
      while ((match = linkRe.exec(text)) !== null) {
        const href = (match[1] || match[2] || '').trim();
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
        count += 1;
      }
    }
  };

  for (const root of roots) walk(root);
  return count;
}

function writeInternalReliabilityReport(reportPath, results) {
  const broken = [];
  for (const result of results) {
    for (const link of result.brokenLinks) {
      broken.push({
        url: link.target,
        status: 404,
        parent: link.source,
      });
    }
    for (const anchor of result.brokenAnchors) {
      broken.push({
        url: `${anchor.source}${anchor.target.startsWith('#') ? anchor.target : `#${anchor.target}`}`,
        status: 404,
        parent: anchor.source,
      });
    }
  }

  const estimatedTotal = estimateMarkdownLinkCount();
  const totalLinks = Math.max(estimatedTotal, broken.length);

  return writeReliabilityReport(
    reportPath,
    buildReliabilityPayload({
      totalLinks,
      broken,
      source: 'docusaurus-internal',
      components: {
        internal: {
          estimatedMarkdownLinks: estimatedTotal,
          brokenLinks: results.reduce((n, r) => n + r.brokenLinks.length, 0),
          brokenAnchors: results.reduce((n, r) => n + r.brokenAnchors.length, 0),
          locales: results.map(r => r.locale),
        },
      },
    })
  );
}

// --- Linkinator (built site crawl) ----------------------------------------

async function startServer(buildDir, port = 3001) {
  const http = await import('http');
  const fsPath = await import('path');
  const url = await import('url');

  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let filePath = fsPath.join(buildDir, url.parse(req.url).pathname);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = fsPath.join(filePath, 'index.html');
      }

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
        resolve(startServer(buildDir, port + 1));
      } else {
        reject(err);
      }
    });
  });
}

async function checkExternalLinks({ reportPath } = {}) {
  const buildDir = path.join(ROOT_DIR, 'build');

  if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found. Please run "yarn build" first.');
    process.exit(1);
  }

  console.log('🌐 Linkinator site crawl');
  console.log('   Checks external URLs + internal pages served from build/');
  console.log('   Starting local server...');

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

  console.log('   Crawling site...');
  console.log('   This may take several minutes...\n');

  const checker = new LinkChecker();
  const brokenExternal = [];
  const brokenInternal = [];
  const unreachableLinks = [];
  const redirectLinks = [];
  const allExternalLinks = new Map();
  const uniqueChecked = new Set();
  let checkedCount = 0;
  let externalCount = 0;
  let internalCount = 0;

  const brokenUrlsReported = new Set();
  const unreachableUrlsReported = new Set();
  const redirectUrlsReported = new Set();

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
    uniqueChecked.add(result.url);

    const isLocal =
      result.url.includes('localhost') ||
      result.url.includes('127.0.0.1') ||
      result.url.includes('0.0.0.0');

    const isHttp = result.url.startsWith('http://') || result.url.startsWith('https://');
    const cleanParent = result.parent
      ? result.parent.replace(/^http:\/\/localhost:\d+/, '') || '/'
      : '/';

    // Internal pages from the local build (full-site reliability)
    if (isLocal && isHttp) {
      internalCount++;
      const isInternalBroken =
        result.state === 'BROKEN' &&
        result.status &&
        result.status >= 400;

      if (isInternalBroken) {
        if (!brokenInternal.some(bl => bl.url === result.url)) {
          brokenInternal.push({
            url: result.url.replace(/^http:\/\/localhost:\d+/, '') || '/',
            status: result.status,
            parent: cleanParent,
          });
        }
        if (!brokenUrlsReported.has(result.url)) {
          brokenUrlsReported.add(result.url);
          console.log(`   ❌ [internal] ${result.url.replace(/^http:\/\/localhost:\d+/, '') || '/'} (${result.status})`);
        }
      }
      return;
    }

    const isExternal = isHttp && !isLocal;
    if (!isExternal) return;

    externalCount++;

    if (!allExternalLinks.has(result.url)) {
      allExternalLinks.set(result.url, new Set());
    }
    allExternalLinks.get(result.url).add(cleanParent);

    const isRedirect = result.status >= 300 && result.status < 400;
    const isReallyBroken =
      result.state === 'BROKEN' &&
      result.status &&
      result.status >= 400 &&
      result.status !== 401 &&
      result.status !== 403 &&
      result.status !== 429;

    const brokenRedirectTargetSkip = [/^https:\/\/www\.drpc\.org\/?$/];
    const skipAsBroken = brokenRedirectTargetSkip.some(re => re.test(result.url));
    const isUnreachable = result.state === 'BROKEN' && !result.status;

    if (isReallyBroken && !skipAsBroken) {
      if (!brokenExternal.some(bl => bl.url === result.url)) {
        brokenExternal.push({
          url: result.url,
          status: result.status,
          parent: cleanParent,
        });
      }
      if (!brokenUrlsReported.has(result.url)) {
        brokenUrlsReported.add(result.url);
        console.log(`   ❌ [external] ${result.url} (${result.status})`);
      }
    } else if (isUnreachable) {
      if (!unreachableLinks.some(ul => ul.url === result.url)) {
        unreachableLinks.push({
          url: result.url,
          status: 'unreachable',
        });
      }
      if (!unreachableUrlsReported.has(result.url)) {
        unreachableUrlsReported.add(result.url);
        console.log(`   ⚠️  ${result.url} (unreachable)`);
      }
    } else if (isRedirect) {
      if (!redirectLinks.some(rl => rl.url === result.url)) {
        redirectLinks.push({
          url: result.url,
          status: result.status,
        });
      }
      if (!redirectUrlsReported.has(result.url)) {
        redirectUrlsReported.add(result.url);
        console.log(`   ↪️  ${result.url} (${result.status} redirect)`);
      }
    }

    if (checkedCount % 100 === 0) {
      console.log(`   ✓ Checked ${checkedCount} links (${externalCount} external, ${internalCount} internal)...`);
    }
  });

  const siteUrlPattern = new RegExp(SITE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  try {
    await checker.check({
      path: `http://localhost:${serverPort}`,
      recurse: true,
      linksToSkip: [
        siteUrlPattern,
        /public-node\.(testnet\.)?rsk\.co/,
        /^https?:\/\/rpc\.(testnet\.)?rootstock\.io(?:\/|$)/,
        /example\.com/,
        /placeholder/,
        /your-domain/,
        /googletagmanager\.com/,
        /twitter\.com/,
        /x\.com/,
        /linkedin\.com/,
        /facebook\.com/,
        /instagram\.com/,
        /^https?:\/\/network\.thegraph\.com\b/,
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

  server.close();

  console.log('\n' + '='.repeat(60));
  console.log('📊 LINKINATOR FULL-SITE REPORT');
  console.log('='.repeat(60));

  if (brokenInternal.length === 0) {
    console.log('\n   ✅ No broken internal (build) links found');
  } else {
    console.log(`\n   ❌ Broken Internal Links (${brokenInternal.length}):\n`);
    for (const link of brokenInternal) {
      console.log(`   • URL: ${link.url}`);
      console.log(`     Status: ${link.status}`);
      console.log(`     Parent: ${link.parent}`);
      console.log('');
    }
  }

  if (brokenExternal.length === 0) {
    console.log('\n   ✅ No broken external links found');
  } else {
    console.log(`\n   ❌ Broken External Links (${brokenExternal.length}):\n`);
    for (const link of brokenExternal) {
      console.log(`   • URL: ${link.url}`);
      console.log(`     Status: ${link.status}`);
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

  if (redirectLinks.length > 0) {
    console.log(`\n   ↪️  Redirect Links (${redirectLinks.length}):\n`);
    for (const link of redirectLinks) {
      console.log(`   • URL: ${link.url}`);
      console.log(`     Status: ${link.status} (redirect)`);
      console.log('');
    }
  }

  const combinedBroken = [...brokenInternal, ...brokenExternal];
  const totalLinks = Math.max(uniqueChecked.size, checkedCount, combinedBroken.length);

  console.log('='.repeat(60));
  console.log('📈 SUMMARY');
  console.log(`   Total link events: ${checkedCount}`);
  console.log(`   Unique URLs: ${uniqueChecked.size}`);
  console.log(`   Internal links seen: ${internalCount}`);
  console.log(`   External links found: ${externalCount}`);
  console.log(`   Unique external URLs: ${allExternalLinks.size}`);
  console.log(`   Broken internal: ${brokenInternal.length}`);
  console.log(`   Broken external: ${brokenExternal.length}`);
  console.log(`   Unreachable (not counted as broken): ${unreachableLinks.length}`);
  console.log(`   Redirect links: ${redirectLinks.length}`);
  console.log(`   Status: ${combinedBroken.length > 0 ? '❌ FAILED' : '✅ PASSED'}`);
  console.log('='.repeat(60) + '\n');

  if (reportPath) {
    writeReliabilityReport(
      reportPath,
      buildReliabilityPayload({
        totalLinks,
        broken: combinedBroken,
        source: 'linkinator',
        components: {
          internal: {
            linksSeen: internalCount,
            brokenLinks: brokenInternal.length,
          },
          external: {
            linksFound: externalCount,
            uniqueUrls: allExternalLinks.size,
            brokenLinks: brokenExternal.length,
            unreachable: unreachableLinks.length,
            redirects: redirectLinks.length,
          },
        },
      })
    );
  }

  return combinedBroken.length > 0;
}

async function main() {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    process.exit(0);
  }

  if (options.external) {
    const hasErrors = await checkExternalLinks({ reportPath: options.report });
    process.exit(hasErrors ? 1 : 0);
  }

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

  const { hasErrors } = displayResults(results);

  if (options.report) {
    writeInternalReliabilityReport(options.report, results);
  }

  process.exit(hasErrors ? 1 : 0);
}

main();
