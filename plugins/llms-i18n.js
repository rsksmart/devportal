'use strict';

/**
 * Generates locale-specific llms.txt and llms-full.txt from translated docs
 * (i18n/<locale>/docusaurus-plugin-content-docs/current/) for non-default locales.
 * Runs after docusaurus-plugin-llms so it overwrites the default-locale content
 * in each locale's build output with that locale's translated content.
 */

const path = require('path');
const { collectDocFiles, generateStandardLLMFiles } = require('docusaurus-plugin-llms/lib/generator');

const DEFAULT_LOCALE = 'en';
const I18N_DOCS_RELATIVE = 'docusaurus-plugin-content-docs/current';

function getLocalizedDocsDir(siteDir, locale) {
  return path.join(siteDir, 'i18n', locale, I18N_DOCS_RELATIVE);
}

module.exports = function llmsI18nPlugin(_context, options = {}) {
  const baseOptions = {
    generateLLMsTxt: true,
    generateLLMsFullTxt: true,
    docsDir: 'docs',
    ignoreFiles: options.ignoreFiles || [],
    title: options.title,
    description: options.description,
    llmsTxtFilename: 'llms.txt',
    llmsFullTxtFilename: 'llms-full.txt',
    includeBlog: false,
    pathTransformation: options.pathTransformation,
    includeOrder: options.includeOrder || [],
    includeUnmatchedLast: options.includeUnmatchedLast !== false,
    customLLMFiles: [],
    excludeImports: options.excludeImports !== false,
    removeDuplicateHeadings: options.removeDuplicateHeadings !== false,
    generateMarkdownFiles: false,
    keepFrontMatter: options.keepFrontMatter || [],
    rootContent: options.rootContent,
    fullRootContent: options.fullRootContent,
  };

  return {
    name: 'llms-i18n',
    async postBuild(props) {
      const { siteDir, outDir, siteConfig, i18n } = props;
      const currentLocale = i18n?.currentLocale;

      if (!currentLocale || currentLocale === DEFAULT_LOCALE) {
        return;
      }

      const localizedDocsDir = getLocalizedDocsDir(siteDir, currentLocale);
      const fs = require('fs');
      try {
        fs.accessSync(localizedDocsDir);
      } catch {
        console.warn(`[llms-i18n] No localized docs at ${localizedDocsDir}. Skipping locale ${currentLocale}.`);
        return;
      }

      let normalizedBaseUrl = siteConfig.baseUrl || '/';
      if (normalizedBaseUrl !== '/' && normalizedBaseUrl.endsWith('/')) {
        normalizedBaseUrl = normalizedBaseUrl.slice(0, -1);
      }
      const siteUrl = siteConfig.url + normalizedBaseUrl;
      const docsDirRelative = path.relative(siteDir, localizedDocsDir);

      const pluginContext = {
        siteDir,
        outDir,
        siteUrl,
        docsDir: docsDirRelative,
        docTitle: options.title || siteConfig.title,
        docDescription: options.description || siteConfig.tagline || '',
        options: {
          ...baseOptions,
          docsDir: docsDirRelative,
        },
      };

      let enhancedContext = pluginContext;
      if (props.routes) {
        const routeMap = new Map();
        const processRoutes = (routes) => {
          (routes || []).forEach((route) => {
            if (route.path) routeMap.set(route.path, route.path);
            if (route.routes) processRoutes(route.routes);
          });
        };
        processRoutes(props.routes);
        enhancedContext = {
          ...pluginContext,
          routesPaths: props.routesPaths,
          routes: props.routes,
          routeMap,
        };
      }

      try {
        const allDocFiles = await collectDocFiles(enhancedContext);
        if (!Array.isArray(allDocFiles) || allDocFiles.length === 0) {
          console.warn(`[llms-i18n] No documents found for locale ${currentLocale}.`);
          return;
        }
        await generateStandardLLMFiles(enhancedContext, allDocFiles);
        console.log(`[llms-i18n] Generated llms.txt and llms-full.txt for locale ${currentLocale}.`);
      } catch (err) {
        console.error(`[llms-i18n] Error generating LLM files for locale ${currentLocale}:`, err.message);
      }
    },
  };
};
