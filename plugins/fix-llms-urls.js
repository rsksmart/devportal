'use strict';

/**
 * Post-build fix for llms.txt URLs when routeBasePath is '/' and docs folders
 * use numeric sort prefixes (e.g. 01-concepts → /concepts/).
 */

const fs = require('fs');
const path = require('path');

const URL_PATTERN = /https?:\/\/[^\s)\]]+/g;

function stripNumberedPrefix(segment) {
  return segment.replace(/^\d+-/, '');
}

function fixUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const segments = url.pathname.split('/').filter(Boolean).map(stripNumberedPrefix);
    const trailingSlash = url.pathname.endsWith('/') ? '/' : '';
    url.pathname = segments.length ? `/${segments.join('/')}${trailingSlash}` : '/';
    return url.toString();
  } catch {
    return rawUrl;
  }
}

function fixLlmsFileContent(content) {
  return content.replace(URL_PATTERN, (match) => fixUrl(match));
}

function fixLlmsFilesInDir(dir) {
  let fixed = 0;
  for (const filename of ['llms.txt', 'llms-full.txt']) {
    const filePath = path.join(dir, filename);
    if (!fs.existsSync(filePath)) {
      continue;
    }
    const original = fs.readFileSync(filePath, 'utf8');
    const updated = fixLlmsFileContent(original);
    if (updated !== original) {
      fs.writeFileSync(filePath, updated, 'utf8');
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
      for (const entry of fs.readdirSync(outDir, { withFileTypes: true })) {
        if (entry.isDirectory() && ['es', 'ja', 'ko'].includes(entry.name)) {
          fixLlmsFilesInDir(path.join(outDir, entry.name));
        }
      }
      console.log(`[fix-llms-urls] Normalized URLs in ${total}+ llms file(s) under ${outDir}.`);
    },
  };
};

module.exports.fixLlmsFilesInDir = fixLlmsFilesInDir;
