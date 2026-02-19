'use strict';

/**
 * Copies translated markdown from i18n/<locale>/docusaurus-plugin-content-docs/current/
 * into the locale build output so "View as Markdown" and "Copy page" serve translated content.
 * Runs after docusaurus-markdown-source-plugin so it overwrites the default (English) .md
 * files in non-default locale builds.
 */

const fs = require('fs');
const path = require('path');

const DEFAULT_LOCALE = 'en';
const I18N_DOCS_RELATIVE = 'docusaurus-plugin-content-docs/current';

function getLocalizedDocsDir(siteDir, locale) {
  return path.join(siteDir, 'i18n', locale, I18N_DOCS_RELATIVE);
}

function findMarkdownFiles(dir, fileList = [], baseDir = dir) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findMarkdownFiles(filePath, fileList, baseDir);
    } else if (file.endsWith('.md')) {
      const relativePath = path.relative(baseDir, filePath);
      fileList.push(relativePath);
    }
  });
  return fileList;
}

function cleanForDisplay(content) {
  content = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  content = content.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');
  content = content.replace(/^\s*\n/, '');
  return content;
}

module.exports = function markdownSourceI18nPlugin() {
  return {
    name: 'markdown-source-i18n',
    async postBuild(props) {
      const { siteDir, outDir, i18n } = props;
      const currentLocale = i18n?.currentLocale;

      if (!currentLocale || currentLocale === DEFAULT_LOCALE) {
        return;
      }

      const localizedDocsDir = getLocalizedDocsDir(siteDir, currentLocale);
      try {
        fs.accessSync(localizedDocsDir);
      } catch {
        return;
      }

      const mdFiles = findMarkdownFiles(localizedDocsDir);
      let copiedCount = 0;

      for (const mdFile of mdFiles) {
        const sourcePath = path.join(localizedDocsDir, mdFile);
        const destPath = path.join(outDir, mdFile);
        try {
          const content = await fs.promises.readFile(sourcePath, 'utf8');
          const cleaned = cleanForDisplay(content);
          await fs.promises.mkdir(path.dirname(destPath), { recursive: true });
          await fs.promises.writeFile(destPath, cleaned, 'utf8');
          copiedCount++;
        } catch (err) {
          console.warn(`[markdown-source-i18n] Skip ${mdFile}:`, err.message);
        }
      }

      if (copiedCount > 0) {
        console.log(`[markdown-source-i18n] Wrote ${copiedCount} translated markdown files for locale ${currentLocale}.`);
      }
    },
  };
};
