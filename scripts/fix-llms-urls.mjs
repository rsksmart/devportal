#!/usr/bin/env node
/**
 * Normalizes numbered doc path prefixes in llms.txt and llms-full.txt (e.g. /01-concepts/ → /concepts/).
 * Runs after `docusaurus build` so URLs are correct even when async plugin hooks finish out of order.
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.join(__dirname, '..', 'build');
const require = createRequire(import.meta.url);
const { fixLlmsFilesInDir } = require('../plugins/fix-llms-urls.js');
const { injectLlmsDirectivesInBuild } = require('../plugins/llms-txt-markdown-directive.js');
const {
  copyMarkdownToCleanPaths,
  copyMdxSourcesToCleanPaths,
} = require('../plugins/copy-markdown-clean-paths.js');
const { trimLargeMarkdownInBuild } = require('../plugins/trim-large-markdown.js');
const { serializeMarkdownInBuild } = require('../plugins/mdx-markdown-serializer.js');
const { writeGeneratedIndexMarkdown } = require('../plugins/generated-index-markdown.js');
const { writeRenderedPageMarkdown } = require('../plugins/rendered-page-markdown.js');

/** Standalone React pages whose markdown has no doc source to export from. */
const RENDERED_ONLY_ROUTES = ['/'];

const LOCALES = ['es', 'ja', 'ko'];

const PROJECT_ROOT = path.join(__dirname, '..');

function writeHomepageMarkdown(outDir) {
  const homepageMd = `> For the complete documentation index, see [llms.txt](/llms.txt).

# Rootstock Developers Portal

Developer documentation for building on Rootstock, a Bitcoin sidechain secured by merge mining.

## Start here

- [Concepts](/concepts/)
- [Developers](/developers/)
- [Dev Tools](/dev-tools/)
- [Use Cases](/use-cases/)
- [Resources](/resources/)
- [Node Operators](/node-operators/)
- [For AI and Agents](/resources/ai-and-agents/)
`;
  fs.writeFileSync(path.join(outDir, 'index.md'), homepageMd, 'utf8');
}

const SITE_ORIGIN = 'https://dev.rootstock.io';

/** Escapes a literal for use in a RegExp, so the dots in the origin stay dots. */
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Resolves the published markdown URL for a page path, or null when the page
 * has no markdown export. Mirrors the candidate order agents use: `page.md`
 * first, then `page/index.md`.
 */
function markdownUrlFor(urlPath, buildDir) {
  const clean = urlPath.replace(/\/$/, '');
  if (/\.[a-z0-9]+$/i.test(clean)) {
    return null;
  }
  if (clean === '') {
    return fs.existsSync(path.join(buildDir, 'index.md')) ? '/index.md' : null;
  }
  if (fs.existsSync(path.join(buildDir, `${clean}.md`))) {
    return `${clean}.md`;
  }
  if (fs.existsSync(path.join(buildDir, clean, 'index.md'))) {
    return `${clean}/index.md`;
  }
  return null;
}

/**
 * Points llms.txt links at the markdown exports so agents get markdown without
 * a second request. Only rewrites a link when the markdown file exists in the
 * build, otherwise the link would 404 and break link resolution.
 *
 * Locale llms.txt files reference the same default-locale URLs, so every path
 * resolves against the default-locale build root.
 */
function pointLlmsLinksAtMarkdown(llmsDir, buildDir) {
  const filePath = path.join(llmsDir, 'llms.txt');

  let rewritten = 0;
  let left = 0;
  let original;
  try {
    original = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      return {rewritten: 0, left: 0};
    }
    throw err;
  }

  const updated = original.replace(
    new RegExp(`${escapeRegExp(SITE_ORIGIN)}([^\\s)\\]]*)`, 'g'),
    (match, urlPath) => {
      if (/\.mdx?$/i.test(urlPath)) {
        return match;
      }
      const markdownPath = markdownUrlFor(urlPath, buildDir);
      if (!markdownPath) {
        left++;
        return match;
      }
      rewritten++;
      return `${SITE_ORIGIN}${markdownPath}`;
    },
  );

  if (updated !== original) {
    fs.writeFileSync(filePath, updated, 'utf8');
  }
  return {rewritten, left};
}

/**
 * Removes markdown for `_`-prefixed drafts. The markdown source package copies
 * every doc regardless of the underscore convention, which would publish
 * unreleased pages at routes that have no HTML counterpart.
 */
function pruneDraftMarkdown(buildDir) {
  let removed = 0;

  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.md')) {
        const segments = path.relative(buildDir, fullPath).split(path.sep);
        if (segments.some((segment) => segment.startsWith('_'))) {
          fs.rmSync(fullPath);
          removed++;
        }
      }
    }
  };

  walk(buildDir);
  return removed;
}

// Fallback for the homepage, replaced below by markdown derived from the
// rendered page whenever that HTML is available.
writeHomepageMarkdown(BUILD_DIR);

for (const locale of ['en', ...LOCALES]) {
  const outDir = locale === 'en' ? BUILD_DIR : path.join(BUILD_DIR, locale);
  const {written, skipped} = writeRenderedPageMarkdown({
    outDir,
    routes: RENDERED_ONLY_ROUTES,
  });
  console.log(
    `[rendered-page-markdown] Derived ${written.length} page(s) from rendered HTML for locale ${locale}.`,
  );
  for (const entry of skipped) {
    console.warn(`[rendered-page-markdown] Skipped ${entry}`);
  }
}

// Must precede the clean-route mirroring so agents get the serialized markdown.
for (const locale of ['en', ...LOCALES]) {
  const outDir = locale === 'en' ? BUILD_DIR : path.join(BUILD_DIR, locale);
  const { written, translated, skipped } = await serializeMarkdownInBuild({
    projectRoot: PROJECT_ROOT,
    outDir,
    locale,
  });
  const fromTranslations = locale === 'en' ? '' : ` (${translated} from translated sources)`;
  console.log(
    `[mdx-markdown-serializer] Serialized ${written} markdown file(s) for locale ${locale}${fromTranslations}.`,
  );
  for (const entry of skipped) {
    console.warn(`[mdx-markdown-serializer] Kept upstream output for ${entry}`);
  }
}

// Generated-index category pages have no markdown source, so their markdown is
// derived from the rendered HTML. Runs before the directive injection below.
for (const locale of ['en', ...LOCALES]) {
  const outDir = locale === 'en' ? BUILD_DIR : path.join(BUILD_DIR, locale);
  const { written, skipped, total } = writeGeneratedIndexMarkdown({
    projectRoot: PROJECT_ROOT,
    outDir,
  });
  console.log(
    `[generated-index-markdown] Wrote ${written.length} of ${total} category page(s) for locale ${locale}.`,
  );
  for (const entry of skipped) {
    console.warn(`[generated-index-markdown] Skipped ${entry}`);
  }
}

const draftsRemoved = pruneDraftMarkdown(BUILD_DIR);

let fixed = fixLlmsFilesInDir(BUILD_DIR);
for (const locale of LOCALES) {
  fixed += fixLlmsFilesInDir(path.join(BUILD_DIR, locale));
}

const mdCopied = copyMarkdownToCleanPaths(BUILD_DIR);
const mdxCopied = copyMdxSourcesToCleanPaths(PROJECT_ROOT, BUILD_DIR);

let mdTrimmed = 0;
for (const locale of ['en', ...LOCALES]) {
  const outDir = locale === 'en' ? BUILD_DIR : path.join(BUILD_DIR, locale);
  mdTrimmed += trimLargeMarkdownInBuild(outDir);
}

// Must follow the clean-route mirroring above: until that runs, doc markdown
// only exists under its numbered source path, so the existence check would
// reject nearly every link.
let linksRewritten = 0;
let linksLeftAsHtml = 0;
for (const dir of [BUILD_DIR, ...LOCALES.map((locale) => path.join(BUILD_DIR, locale))]) {
  const {rewritten, left} = pointLlmsLinksAtMarkdown(dir, BUILD_DIR);
  linksRewritten += rewritten;
  linksLeftAsHtml += left;
}

const mdUpdated = injectLlmsDirectivesInBuild(BUILD_DIR);

console.log(`[fix-llms-urls] Wrote homepage index.md for content negotiation.`);
console.log(`[fix-llms-urls] Pruned ${draftsRemoved} draft markdown file(s) from the build.`);
console.log(`[fix-llms-urls] Normalized llms URLs under ${BUILD_DIR} (${fixed} file(s) updated).`);
console.log(
  `[fix-llms-urls] Pointed ${linksRewritten} llms.txt link(s) at markdown; ${linksLeftAsHtml} left as HTML (no export).`,
);
console.log(`[llms-txt-markdown-directive] Injected llms.txt blockquote into ${mdUpdated} markdown file(s).`);
console.log(`[copy-markdown-clean-paths] Mirrored ${mdCopied} markdown file(s) onto clean public routes.`);
console.log(`[copy-markdown-clean-paths] Exported ${mdxCopied} MDX source file(s) to clean public routes.`);
console.log(`[trim-large-markdown] Trimmed ${mdTrimmed} oversized agent export(s).`);
