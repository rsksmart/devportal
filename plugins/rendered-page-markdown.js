const fs = require('fs');
const path = require('path');
const {decodeEntities} = require('./html-text');

/**
 * Derives markdown for standalone React pages, which have no doc source for the
 * markdown pipeline to export. Hand-written stubs for these pages drift from the
 * rendered page; reading the built HTML keeps the two in step by construction.
 */

/** Elements whose text is markup or scripting rather than page content. */
const SKIP_ELEMENTS = new Set(['script', 'style', 'svg', 'noscript', 'template', 'button']);

/** Elements that force a new markdown block. */
const BLOCK_ELEMENTS = new Set([
  'address', 'article', 'aside', 'blockquote', 'br', 'div', 'dd', 'dl', 'dt',
  'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4',
  'h5', 'h6', 'header', 'hr', 'li', 'main', 'nav', 'ol', 'p', 'pre', 'section',
  'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul',
]);

const HEADING_ELEMENTS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

/**
 * Destinations worth carrying into markdown. Fragment-only links say nothing
 * once the surrounding page is gone, and the allowlist keeps `javascript:` and
 * `data:` URLs out of the export.
 */
const LINKABLE_HREF = /^(?:https?:\/\/|mailto:|\/|\.{1,2}\/)/i;

const TOKEN_RE = /<!--[\s\S]*?-->|<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>|[^<]+/g;

/**
 * Renders an inline link. The label escapes backslashes alongside the brackets,
 * since escaping brackets alone lets an existing backslash consume the escape.
 * The URL percent-encodes the characters that would end the link early.
 */
function inlineLink(label, href) {
  const safeLabel = label.replace(/[\\[\]]/g, (char) => `\\${char}`);
  const safeHref = href.replace(
    /[\s<>()]/g,
    (char) => `%${char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')}`,
  );
  return `[${safeLabel}](${safeHref})`;
}

/**
 * Converts a rendered page's `<main>` region into markdown blocks.
 *
 * Text nodes inside a block are concatenated without added whitespace so the
 * resulting segments match how HTML-to-text extraction sees the same markup.
 */
function htmlMainToMarkdown(html) {
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!mainMatch) return null;

  const blocks = [];
  let current = '';
  let prefix = '';
  let skipDepth = 0;
  let skipTag = null;
  // The llms.txt directive is injected into markdown separately.
  let ignoreDepth = 0;
  let ignoreTag = null;
  let anchorHref = null;
  let anchorStart = 0;

  const flush = () => {
    const text = current.replace(/\s+/g, ' ').trim();
    if (text) blocks.push(`${prefix}${text}`);
    current = '';
    prefix = '';
    // A link cannot span two blocks, so drop any anchor still open.
    anchorHref = null;
  };

  for (const [token, rawTag] of mainMatch[1].matchAll(TOKEN_RE)) {
    if (!rawTag) {
      if (!token.startsWith('<!--') && skipDepth === 0 && ignoreDepth === 0) {
        current += decodeEntities(token);
      }
      continue;
    }

    const tag = rawTag.toLowerCase();
    const isClosing = token.startsWith('</');

    if (skipDepth > 0) {
      if (tag !== skipTag) continue;
      skipDepth += isClosing ? -1 : 1;
      if (skipDepth === 0) skipTag = null;
      continue;
    }
    if (ignoreDepth > 0) {
      if (tag !== ignoreTag) continue;
      ignoreDepth += isClosing ? -1 : 1;
      if (ignoreDepth === 0) ignoreTag = null;
      continue;
    }

    if (!isClosing && SKIP_ELEMENTS.has(tag)) {
      flush();
      if (!token.endsWith('/>')) {
        skipDepth = 1;
        skipTag = tag;
      }
      continue;
    }
    if (
      !isClosing &&
      (/\bdata-markdown-ignore\b/i.test(token) || /class="[^"]*llmsTxtDirective/i.test(token))
    ) {
      flush();
      if (!token.endsWith('/>')) {
        ignoreDepth = 1;
        ignoreTag = tag;
      }
      continue;
    }

    if (tag === 'a') {
      if (!isClosing) {
        const href = decodeEntities((token.match(/\shref="([^"]*)"/i) || [])[1] || '');
        anchorHref = LINKABLE_HREF.test(href) ? href : null;
        anchorStart = current.length;
      } else if (anchorHref) {
        const label = current.slice(anchorStart).replace(/\s+/g, ' ').trim();
        if (label) {
          current = `${current.slice(0, anchorStart)}${inlineLink(label, anchorHref)}`;
        }
        anchorHref = null;
      }
      continue;
    }

    if (BLOCK_ELEMENTS.has(tag)) {
      flush();
      if (!isClosing) {
        if (HEADING_ELEMENTS.has(tag)) {
          prefix = `${'#'.repeat(Number(tag[1]))} `;
        } else if (tag === 'li') {
          prefix = '- ';
        }
      }
    }
  }
  flush();

  return blocks.length ? `${blocks.join('\n\n')}\n` : null;
}

/**
 * Writes markdown derived from the rendered HTML for the given routes,
 * overwriting whatever the build produced for them.
 */
function writeRenderedPageMarkdown({outDir, routes}) {
  const written = [];
  const skipped = [];

  for (const route of routes) {
    const clean = route.replace(/^\/|\/$/g, '');
    const htmlPath = path.join(outDir, clean, 'index.html');
    if (!fs.existsSync(htmlPath)) {
      skipped.push(`${route}: no rendered HTML`);
      continue;
    }

    const markdown = htmlMainToMarkdown(fs.readFileSync(htmlPath, 'utf8'));
    if (!markdown) {
      skipped.push(`${route}: no <main> content`);
      continue;
    }

    // Match the location the build already publishes for this route.
    const flatMd = path.join(outDir, `${clean}.md`);
    const target =
      clean !== '' && fs.existsSync(flatMd) ? flatMd : path.join(outDir, clean, 'index.md');
    fs.mkdirSync(path.dirname(target), {recursive: true});
    fs.writeFileSync(target, markdown, 'utf8');
    written.push(path.relative(outDir, target));
  }

  return {written, skipped};
}

module.exports = {writeRenderedPageMarkdown, htmlMainToMarkdown};
