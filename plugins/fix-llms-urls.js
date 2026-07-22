'use strict';

/**
 * Post-build fix for llms.txt URLs when routeBasePath is '/' and docs folders
 * use numeric sort prefixes (e.g. 01-concepts → /concepts/).
 */

const fs = require('fs');
const path = require('path');

const URL_PATTERN = /https?:\/\/[^\s)\]]+/g;

/** Paths in llms.txt that differ from filesystem-derived URLs. */
const PATH_ALIASES = [
  ['/use-cases/shared-setup', '/use-cases/interoperability/shared-setup'],
];

function stripNumberedPrefix(segment) {
  return segment.replace(/^\d+-/, '');
}

function hasPrivateSegment(pathname) {
  return pathname.split('/').some((segment) => segment.startsWith('_'));
}

function fixUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    if (hasPrivateSegment(url.pathname)) {
      return null;
    }
    for (const [from, to] of PATH_ALIASES) {
      if (url.pathname.includes(from)) {
        url.pathname = url.pathname.replace(from, to);
      }
    }
    const segments = url.pathname.split('/').filter(Boolean).map(stripNumberedPrefix);
    const trailingSlash = url.pathname.endsWith('/') ? '/' : '';
    url.pathname = segments.length ? `/${segments.join('/')}${trailingSlash}` : '/';
    return url.toString();
  } catch {
    return rawUrl;
  }
}

function fixLlmsFileContent(content) {
  const lines = content.split('\n').filter((line) => {
    if (!line.startsWith('- [')) {
      return true;
    }
    const urls = line.match(URL_PATTERN);
    if (!urls) {
      return true;
    }
    return urls.every((rawUrl) => fixUrl(rawUrl) !== null);
  });

  return lines
    .join('\n')
    .replace(URL_PATTERN, (match) => fixUrl(match) ?? match);
}

function fixLlmsFilesInDir(dir) {
  let fixed = 0;
  for (const filename of ['llms.txt', 'llms-full.txt']) {
    const filePath = path.join(dir, filename);
    let original;
    try {
      original = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
      if (err.code === 'ENOENT') {
        continue;
      }
      throw err;
    }
    const updated = fixLlmsFileContent(original);
    if (updated !== original) {
      const tempPath = `${filePath}.tmp`;
      fs.writeFileSync(tempPath, updated, 'utf8');
      fs.renameSync(tempPath, filePath);
      fixed += 1;
    }
  }
  return fixed;
}

module.exports = function fixLlmsUrlsPlugin() {
  return {
    name: 'fix-llms-urls',
    postBuild({ outDir }) {
      const total = fixLlmsFilesInDir(outDir);
      for (const entry of fs.readdirSync(outDir, {withFileTypes: true})) {
        if (entry.isDirectory() && ['es', 'ja', 'ko'].includes(entry.name)) {
          fixLlmsFilesInDir(path.join(outDir, entry.name));
        }
      }
      console.log(`[fix-llms-urls] Normalized URLs in ${total}+ llms file(s) under ${outDir}.`);
    },
  };
};

module.exports.fixLlmsFilesInDir = fixLlmsFilesInDir;
