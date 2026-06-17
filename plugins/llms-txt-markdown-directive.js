'use strict';

const fs = require('fs');
const path = require('path');

const DIRECTIVE_PREFIX = '> For the complete documentation index, see [llms.txt]';
const LOCALE_DIRS = ['es', 'ja', 'ko'];

function llmsPathForLocale(locale, defaultLocale = 'en') {
  if (!locale || locale === defaultLocale) {
    return '/llms.txt';
  }
  return `/${locale}/llms.txt`;
}

function buildDirectiveLine(llmsPath) {
  return `${DIRECTIVE_PREFIX}(${llmsPath}).\n\n`;
}

function findMarkdownFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findMarkdownFiles(filePath, fileList);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function upsertDirective(content, llmsPath) {
  const directiveLine = buildDirectiveLine(llmsPath);
  if (content.startsWith(DIRECTIVE_PREFIX)) {
    return content.replace(/^> For the complete documentation index, see \[llms\.txt\]\([^)]+\)\.\n\n/, directiveLine);
  }
  if (content.includes('[llms.txt]')) {
    return content;
  }
  return directiveLine + content;
}

function injectLlmsDirectiveInMarkdown(dir, llmsPath) {
  let updated = 0;

  for (const filePath of findMarkdownFiles(dir)) {
    const original = fs.readFileSync(filePath, 'utf8');
    const next = upsertDirective(original, llmsPath);
    if (next !== original) {
      fs.writeFileSync(filePath, next, 'utf8');
      updated += 1;
    }
  }

  return updated;
}

function injectLlmsDirectivesInBuild(outDir, defaultLocale = 'en') {
  let total = 0;
  const defaultLlmsPath = llmsPathForLocale(defaultLocale, defaultLocale);

  for (const entry of fs.readdirSync(outDir, {withFileTypes: true})) {
    if (!entry.isDirectory() || LOCALE_DIRS.includes(entry.name)) {
      continue;
    }
    total += injectLlmsDirectiveInMarkdown(path.join(outDir, entry.name), defaultLlmsPath);
  }

  for (const entry of fs.readdirSync(outDir, {withFileTypes: true})) {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      const filePath = path.join(outDir, entry.name);
      const original = fs.readFileSync(filePath, 'utf8');
      const next = upsertDirective(original, defaultLlmsPath);
      if (next !== original) {
        fs.writeFileSync(filePath, next, 'utf8');
        total += 1;
      }
    }
  }

  for (const locale of LOCALE_DIRS) {
    const localeDir = path.join(outDir, locale);
    if (fs.existsSync(localeDir)) {
      total += injectLlmsDirectiveInMarkdown(localeDir, llmsPathForLocale(locale, defaultLocale));
    }
  }

  return total;
}

module.exports = function llmsTxtMarkdownDirectivePlugin() {
  return {
    name: 'llms-txt-markdown-directive',
    postBuild({outDir, i18n}) {
      const defaultLocale = i18n?.defaultLocale || 'en';
      const currentLocale = i18n?.currentLocale || defaultLocale;
      const updated = injectLlmsDirectivesInBuild(outDir, defaultLocale);
      console.log(
        `[llms-txt-markdown-directive] Injected llms.txt blockquote into ${updated} markdown file(s) (${currentLocale} build pass).`,
      );
    },
  };
};

module.exports.injectLlmsDirectivesInBuild = injectLlmsDirectivesInBuild;
module.exports.llmsPathForLocale = llmsPathForLocale;
