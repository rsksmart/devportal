#!/usr/bin/env node
/**
 * Normalizes numbered doc path prefixes in llms.txt and llms-full.txt (e.g. /01-concepts/ → /concepts/).
 * Runs after `docusaurus build` so URLs are correct even when async plugin hooks finish out of order.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.join(__dirname, '..', 'build');
const require = createRequire(import.meta.url);
const { fixLlmsFilesInDir } = require('../plugins/fix-llms-urls.js');
const { injectLlmsDirectivesInBuild } = require('../plugins/llms-txt-markdown-directive.js');

let fixed = fixLlmsFilesInDir(BUILD_DIR);
for (const locale of ['es', 'ja', 'ko']) {
  fixed += fixLlmsFilesInDir(path.join(BUILD_DIR, locale));
}

const mdUpdated = injectLlmsDirectivesInBuild(BUILD_DIR);

console.log(`[fix-llms-urls] Normalized llms URLs under ${BUILD_DIR} (${fixed} file(s) updated).`);
console.log(`[llms-txt-markdown-directive] Injected llms.txt blockquote into ${mdUpdated} markdown file(s).`);
