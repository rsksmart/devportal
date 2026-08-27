const fs = require('fs');
const path = require('path');

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

const TOKEN_RE = /<!--[\s\S]*?-->|<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>|[^<]+/g;

function decodeEntities(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&[a-z]+;/gi, '');
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

  const flush = () => {
    const text = current.replace(/\s+/g, ' ').trim();
    if (text) blocks.push(`${prefix}${text}`);
    current = '';
    prefix = '';
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
