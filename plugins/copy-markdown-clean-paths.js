'use strict';

const fs = require('fs');
const path = require('path');

/** Maps numbered docs folders in build output to public route segments. */
const NUMBERED_TO_CLEAN = {
  '01-concepts': 'concepts',
  '02-developers': 'developers',
  '03-node-operators': 'node-operators',
  '04-resources': 'resources',
  '05-dev-tools': 'dev-tools',
  '06-use-cases': 'use-cases',
};

const LOCALE_DIRS = ['es', 'ja', 'ko'];
const DOC_EXTENSIONS = ['.md', '.mdx'];

function ensureDir(dir) {
  fs.mkdirSync(dir, {recursive: true});
}

function copyFileEnsuringDir(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function writeFileEnsuringDir(dest, content) {
  ensureDir(path.dirname(dest));
  fs.writeFileSync(dest, content, 'utf8');
}

function isDocFile(filename) {
  return DOC_EXTENSIONS.some((ext) => filename.endsWith(ext));
}

function walkDocFiles(dir, callback, relativeBase = dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDocFiles(fullPath, callback, relativeBase);
    } else if (entry.isFile() && isDocFile(entry.name)) {
      callback(fullPath, path.relative(relativeBase, fullPath));
    }
  }
}

function stripNumberedPrefix(segment) {
  return segment.replace(/^\d+-/, '');
}

/** Strip numeric sort prefixes from each path segment (e.g. 04-quickstart → quickstart). */
function toCleanRelativePath(relPath) {
  return relPath
    .split(path.sep)
    .map(stripNumberedPrefix)
    .join(path.sep);
}

/** Map .mdx / .md source paths to public .md routes. */
function toMarkdownRelativePath(relPath) {
  const normalized = toCleanRelativePath(relPath).split(path.sep).join('/');
  if (normalized.endsWith('.mdx')) {
    return `${normalized.slice(0, -4)}.md`;
  }
  return normalized;
}

/**
 * Reduce MDX source to agent-readable markdown.
 * docusaurus-markdown-source-plugin skips .mdx files.
 */
function sanitizeMdxForMarkdown(content) {
  let body = content;

  if (body.startsWith('---')) {
    const end = body.indexOf('---', 3);
    if (end !== -1) {
      body = body.slice(end + 3).trimStart();
    }
  }

  body = body.replace(/^import\s+.+$/gm, '');
  body = body.replace(
    /<TrackedLink[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/TrackedLink>/g,
    '[$2]($1)',
  );
  body = body.replace(/^<[A-Z][A-Za-z0-9]*[^>]*\/>.*$/gm, '');
  body = body.replace(/^<[A-Z][A-Za-z0-9]*[^>]*><\/[A-Z][A-Za-z0-9]*>.*$/gm, '');
  body = body.replace(/\n{3,}/g, '\n\n');

  return `${body.trim()}\n`;
}

function mirrorDocToCleanRoutes(srcPath, relPath, cleanRoot, copied, {sanitize = false} = {}) {
  const cleanRelative = toMarkdownRelativePath(relPath);
  const destPath = path.join(cleanRoot, cleanRelative);

  if (sanitize) {
    const content = sanitizeMdxForMarkdown(fs.readFileSync(srcPath, 'utf8'));
    writeFileEnsuringDir(destPath, content);
  } else {
    copyFileEnsuringDir(srcPath, destPath);
  }
  copied.count += 1;

  if (!cleanRelative.endsWith('/index.md') && !cleanRelative.includes('/')) {
    const slug = path.basename(cleanRelative, '.md');
    const indexDest = path.join(cleanRoot, slug, 'index.md');
    if (sanitize) {
      writeFileEnsuringDir(indexDest, fs.readFileSync(destPath, 'utf8'));
    } else {
      copyFileEnsuringDir(srcPath, indexDest);
    }
    copied.count += 1;
  } else if (cleanRelative.endsWith('.md') && !cleanRelative.endsWith('/index.md')) {
    const parts = cleanRelative.split('/');
    const slug = parts.pop().replace(/\.md$/, '');
    const parent = parts.join('/');
    const indexDest = path.join(cleanRoot, parent, slug, 'index.md');
    if (sanitize) {
      writeFileEnsuringDir(indexDest, fs.readFileSync(destPath, 'utf8'));
    } else {
      copyFileEnsuringDir(srcPath, indexDest);
    }
    copied.count += 1;
  }
}

/**
 * Mirror markdown from numbered doc folders (01-concepts, etc.) onto clean public
 * routes (concepts, etc.). Nested folder prefixes (04-quickstart) are stripped to
 * match Docusaurus slugs (quickstart).
 */
function copyMarkdownToCleanPaths(outDir) {
  const copied = {count: 0};

  const processBuildRoot = (rootDir) => {
    for (const [numbered, clean] of Object.entries(NUMBERED_TO_CLEAN)) {
      const srcRoot = path.join(rootDir, numbered);
      const cleanRoot = path.join(rootDir, clean);
      if (!fs.existsSync(srcRoot)) {
        continue;
      }

      walkDocFiles(srcRoot, (srcPath, relPath) => {
        if (relPath.endsWith('.mdx')) {
          return;
        }
        mirrorDocToCleanRoutes(srcPath, relPath, cleanRoot, copied);
      });
    }
  };

  processBuildRoot(outDir);
  for (const locale of LOCALE_DIRS) {
    processBuildRoot(path.join(outDir, locale));
  }

  return copied.count;
}

/**
 * Export .mdx doc sources omitted by docusaurus-markdown-source-plugin.
 */
function copyMdxSourcesToCleanPaths(projectRoot, outDir) {
  const docsRoot = path.join(projectRoot, 'docs');
  const copied = {count: 0};

  for (const [numbered, clean] of Object.entries(NUMBERED_TO_CLEAN)) {
    const srcRoot = path.join(docsRoot, numbered);
    const cleanRoot = path.join(outDir, clean);
    if (!fs.existsSync(srcRoot)) {
      continue;
    }

    walkDocFiles(srcRoot, (srcPath, relPath) => {
      if (!relPath.endsWith('.mdx')) {
        return;
      }
      mirrorDocToCleanRoutes(srcPath, relPath, cleanRoot, copied, {sanitize: true});
    });
  }

  return copied.count;
}

module.exports = {
  copyMarkdownToCleanPaths,
  copyMdxSourcesToCleanPaths,
  NUMBERED_TO_CLEAN,
  stripNumberedPrefix,
  toCleanRelativePath,
  toMarkdownRelativePath,
  sanitizeMdxForMarkdown,
};
