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

function ensureDir(dir) {
  fs.mkdirSync(dir, {recursive: true});
}

function copyFileEnsuringDir(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function walkMarkdownFiles(dir, callback, relativeBase = dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkMarkdownFiles(fullPath, callback, relativeBase);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      callback(fullPath, path.relative(relativeBase, fullPath));
    }
  }
}

/**
 * Mirror markdown from numbered doc folders (01-concepts, etc.) onto clean public
 * routes (concepts, etc.). Numbered paths are kept for backward compatibility.
 */
function copyMarkdownToCleanPaths(outDir) {
  let copied = 0;

  const processRoot = (rootDir) => {
    for (const [numbered, clean] of Object.entries(NUMBERED_TO_CLEAN)) {
      const srcRoot = path.join(rootDir, numbered);
      const cleanRoot = path.join(rootDir, clean);
      if (!fs.existsSync(srcRoot)) {
        continue;
      }

      walkMarkdownFiles(srcRoot, (srcPath, relPath) => {
        const normalized = relPath.split(path.sep).join('/');
        copyFileEnsuringDir(srcPath, path.join(cleanRoot, normalized));
        copied += 1;

        // Doc slug files (e.g. glossary.md) also get index.md for trailingSlash routes.
        if (!normalized.endsWith('/index.md') && !normalized.includes('/')) {
          const slug = path.basename(normalized, '.md');
          copyFileEnsuringDir(srcPath, path.join(cleanRoot, slug, 'index.md'));
          copied += 1;
        } else if (normalized.endsWith('.md') && !normalized.endsWith('/index.md')) {
          const parts = normalized.split('/');
          const slug = parts.pop().replace(/\.md$/, '');
          const parent = parts.join('/');
          copyFileEnsuringDir(
            srcPath,
            path.join(cleanRoot, parent, slug, 'index.md'),
          );
          copied += 1;
        }
      });
    }
  };

  processRoot(outDir);
  for (const locale of LOCALE_DIRS) {
    processRoot(path.join(outDir, locale));
  }

  return copied;
}

module.exports = {copyMarkdownToCleanPaths, NUMBERED_TO_CLEAN};
