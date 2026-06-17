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
const { copyMarkdownToCleanPaths } = require('../plugins/copy-markdown-clean-paths.js');

let fixed = fixLlmsFilesInDir(BUILD_DIR);
for (const locale of ['es', 'ja', 'ko']) {
  fixed += fixLlmsFilesInDir(path.join(BUILD_DIR, locale));
}

const mdUpdated = injectLlmsDirectivesInBuild(BUILD_DIR);
const mdCopied = copyMarkdownToCleanPaths(BUILD_DIR);

console.log(`[fix-llms-urls] Normalized llms URLs under ${BUILD_DIR} (${fixed} file(s) updated).`);
console.log(`[llms-txt-markdown-directive] Injected llms.txt blockquote into ${mdUpdated} markdown file(s).`);
console.log(`[copy-markdown-clean-paths] Mirrored ${mdCopied} markdown file(s) onto clean public routes.`);
