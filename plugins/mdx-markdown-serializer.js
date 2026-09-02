'use strict';

/**
 * Regenerates the .md exports so interactive components become real markdown.
 *
 * docusaurus-markdown-source-plugin deletes every JSX element it does not
 * explicitly convert, which drops Accordion, Steps, Filter and CardsGrid
 * content from the agent-facing markdown. This re-reads each doc source,
 * serializes those components through an MDX AST, and overwrites the export.
 *
 * Docusaurus runs postBuild hooks concurrently, so this cannot be a plugin hook
 * without racing the package's own writes. scripts/fix-llms-urls.mjs calls it
 * after `docusaurus build` returns, before the build markdown is mirrored onto
 * clean public routes.
 */

const fs = require('fs');
const path = require('path');

const DEFAULT_LOCALE = 'en';
const I18N_DOCS_RELATIVE = 'docusaurus-plugin-content-docs/current';

/**
 * Elements with nothing worth reading. Everything not named here and not given
 * an explicit conversion below is unwrapped, so unknown components lose their
 * tag but keep their content.
 */
const DROP = new Set([
  'DocCardList', 'Head', 'FAQStructuredData', 'br', 'hr', 'source', 'track',
  'style', 'script', 'col', 'colgroup',
]);

/** Reads a plain string attribute, ignoring expression-valued props. */
function hasMarkdownIgnore(node) {
  return (node.attributes || []).some(
    (a) => a.type === 'mdxJsxAttribute' && a.name === 'data-markdown-ignore',
  );
}

function attr(node, name) {
  const found = (node.attributes || []).find(
    (a) => a.type === 'mdxJsxAttribute' && a.name === name,
  );
  if (!found) return null;
  return typeof found.value === 'string' ? found.value : null;
}

/** Flattens a subtree to its visible text. */
function textOf(node) {
  let out = '';
  const walk = (n) => {
    if (!n) return;
    if (n.type === 'text' || n.type === 'inlineCode' || n.type === 'code') {
      out += n.value;
    }
    (n.children || []).forEach(walk);
  };
  walk(node);
  return out.replace(/\s+/g, ' ').trim();
}

/** Finds the first descendant JSX element with the given name, flow or inline. */
function findElement(nodes, name) {
  for (const node of nodes || []) {
    if (
      (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
      node.name === name
    ) {
      return node;
    }
    const nested = findElement(node.children, name);
    if (nested) return nested;
  }
  return null;
}

function heading(depth, value) {
  return {type: 'heading', depth, children: [{type: 'text', value}]};
}

/**
 * Collects `export const name = \`...\`` declarations. Several guides hold their
 * Solidity samples in template literals and render them through
 * `<CodeBlock>{name}</CodeBlock>`, so the code is not inline in the document.
 */
function collectTemplateConstants(tree) {
  const constants = new Map();
  for (const node of tree.children || []) {
    if (node.type !== 'mdxjsEsm') continue;
    for (const statement of node.data?.estree?.body || []) {
      const declaration =
        statement.type === 'ExportNamedDeclaration'
          ? statement.declaration
          : statement;
      if (!declaration || declaration.type !== 'VariableDeclaration') continue;
      for (const declarator of declaration.declarations || []) {
        if (
          declarator.id?.type === 'Identifier' &&
          declarator.init?.type === 'TemplateLiteral' &&
          declarator.init.quasis.length === 1
        ) {
          constants.set(declarator.id.name, declarator.init.quasis[0].value.cooked);
        }
      }
    }
  }
  return constants;
}

/** Returns the identifier name for an expression node like `{myTokenSource}`. */
function expressionIdentifier(node) {
  const first = (node.data?.estree?.body || [])[0];
  if (
    first?.type === 'ExpressionStatement' &&
    first.expression?.type === 'Identifier'
  ) {
    return first.expression.name;
  }
  return null;
}

/** Builds one bullet describing a card, which may carry all its text in props. */
function cardListItem(node) {
  const title = attr(node, 'title');
  const description = attr(node, 'description') || '';
  const href = attr(node, 'linkHref') || attr(node, 'link') || attr(node, 'href');
  if (!title && !description && !href) return null;

  const children = [];
  if (title) {
    children.push({type: 'strong', children: [{type: 'text', value: title}]});
    if (description) children.push({type: 'text', value: ': '});
  }
  if (description) children.push({type: 'text', value: description});
  if (href) {
    if (children.length) children.push({type: 'text', value: ' '});
    children.push({
      type: 'link',
      url: href,
      children: [
        {type: 'text', value: attr(node, 'linkTitle') || (children.length ? 'Read more' : href)},
      ],
    });
  }

  return {
    type: 'listItem',
    spread: false,
    checked: null,
    children: [{type: 'paragraph', children}],
  };
}

/**
 * Rewrites a list of mdast nodes, replacing JSX elements with markdown
 * equivalents. Returns an array because one node can expand into several.
 */
function transform(nodes, constants = new Map()) {
  const out = [];

  for (const node of nodes || []) {
    // Frontmatter, ESM imports and {/* comments */} carry nothing for readers.
    if (
      node.type === 'yaml' ||
      node.type === 'toml' ||
      node.type === 'mdxjsEsm' ||
      node.type === 'mdxFlowExpression' ||
      node.type === 'mdxTextExpression'
    ) {
      continue;
    }

    const isJsx =
      node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement';

    if (!isJsx) {
      if (node.type === 'html' && /\bdata-markdown-ignore\b/i.test(String(node.value))) {
        continue;
      }
      if (node.children) node.children = transform(node.children, constants);
      out.push(node);
      continue;
    }

    const name = node.name || '';

    if (name === 'MarkdownIgnore' || hasMarkdownIgnore(node)) {
      continue;
    }

    if (DROP.has(name)) continue;

    // A collapsed panel: promote its header to a heading, then inline the body.
    if (name === 'Accordion.Item') {
      const header = findElement(node.children, 'Accordion.Header');
      const body = findElement(node.children, 'Accordion.Body');
      if (header) out.push(heading(3, textOf(header)));
      out.push(...transform(body ? body.children : node.children, constants));
      continue;
    }

    // Headers and bodies are consumed by Accordion.Item above. Reaching one
    // directly means the markup is unusual, so keep the content.
    if (name === 'Accordion.Header') {
      out.push(heading(3, textOf(node)));
      continue;
    }

    if (name === 'Step') {
      const title = attr(node, 'title');
      if (title) out.push(heading(3, title));
      out.push(...transform(node.children, constants));
      continue;
    }

    if (name === 'TabItem') {
      const label = attr(node, 'label') || attr(node, 'value');
      if (label) {
        out.push({
          type: 'paragraph',
          children: [
            {type: 'strong', children: [{type: 'text', value: `${label}:`}]},
          ],
        });
      }
      out.push(...transform(node.children, constants));
      continue;
    }

    // Card grids: one bullet per card so the catalogue survives as text.
    if (name === 'Filter' || name === 'CardsGrid') {
      const items = [];
      const rest = [];
      for (const child of node.children || []) {
        if (child.name === 'FilterItem' || child.name === 'CardsGridItem') {
          const item = cardListItem(child);
          if (item) items.push(item);
        } else {
          rest.push(child);
        }
      }
      if (items.length) {
        out.push({type: 'list', ordered: false, spread: false, children: items});
      }
      out.push(...transform(rest, constants));
      continue;
    }

    // Cards outside a grid, including pages whose whole body is one <Card />.
    if (
      name === 'FilterItem' ||
      name === 'CardsGridItem' ||
      name === 'Card' ||
      name === 'CarouselItem'
    ) {
      const item = cardListItem(node);
      if (item) {
        out.push({type: 'list', ordered: false, spread: false, children: [item]});
      }
      out.push(...transform(node.children, constants));
      continue;
    }

    // Restores fenced code for samples held in template-literal constants.
    if (name === 'CodeBlock') {
      const parts = [];
      for (const child of node.children || []) {
        if (
          child.type === 'mdxFlowExpression' ||
          child.type === 'mdxTextExpression'
        ) {
          const identifier = expressionIdentifier(child);
          if (identifier && constants.has(identifier)) {
            parts.push(constants.get(identifier));
          }
        }
      }
      if (parts.length) {
        out.push({
          type: 'code',
          lang: attr(node, 'language') || null,
          meta: null,
          value: parts.join('\n').trim(),
        });
        continue;
      }
      out.push(...transform(node.children, constants));
      continue;
    }

    if (name === 'img') {
      const src = attr(node, 'src');
      if (src) {
        out.push({
          type: 'paragraph',
          children: [
            {type: 'image', url: src, alt: attr(node, 'alt') || '', title: null},
          ],
        });
      }
      continue;
    }

    if (name === 'Video' || name === 'iframe' || name === 'video') {
      const src = attr(node, 'src') || attr(node, 'url') || attr(node, 'videoId');
      if (src) {
        const url = /^https?:|^\//.test(src)
          ? src
          : `https://www.youtube.com/watch?v=${src}`;
        out.push({
          type: 'paragraph',
          children: [
            {type: 'text', value: 'Video: '},
            {type: 'link', url, children: [{type: 'text', value: url}]},
          ],
        });
      }
      continue;
    }

    if (name === 'a') {
      const href = attr(node, 'href');
      const children = transform(node.children, constants);
      if (href) {
        out.push({type: 'link', url: href, children: inlineOnly(children)});
        continue;
      }
      out.push(...children);
      continue;
    }

    // Layout wrappers and anything unrecognised: keep the content, drop the tag.
    out.push(...transform(node.children, constants));
  }

  return out;
}

/** Link children must be inline, so lift text out of any block wrappers. */
function inlineOnly(nodes) {
  const out = [];
  for (const node of nodes) {
    if (node.type === 'paragraph' || node.type === 'heading') {
      out.push(...inlineOnly(node.children || []));
    } else {
      out.push(node);
    }
  }
  return out.length ? out : [{type: 'text', value: ''}];
}

/**
 * Replaces ```mdx-code-block fences with their contents so the JSX inside
 * becomes part of the document rather than an opaque code block. Matching is
 * done by backtick-run length so shorter fences nested inside are preserved.
 */
function unwrapMdxCodeBlocks(source) {
  const lines = source.split('\n');
  const out = [];
  let fence = null;
  let buffer = [];

  const flush = () => {
    if (!buffer.length) return;
    const indents = buffer
      .filter((line) => line.trim().length > 0)
      .map((line) => line.match(/^[ \t]*/)[0].length);
    const strip = indents.length ? Math.min(...indents) : 0;
    out.push(...buffer.map((line) => line.slice(strip)));
    buffer = [];
  };

  for (const line of lines) {
    if (fence === null) {
      const open = line.match(/^[ \t]*(`{3,})mdx-code-block[ \t]*$/);
      if (open) {
        fence = open[1].length;
        continue;
      }
      out.push(line);
      continue;
    }

    const close = line.match(/^[ \t]*(`{3,})[ \t]*$/);
    if (close && close[1].length >= fence) {
      flush();
      fence = null;
      continue;
    }
    buffer.push(line);
  }

  // An unterminated fence still has content worth keeping.
  flush();
  return out.join('\n');
}

/**
 * Applies a text edit everywhere except inside fenced blocks and code spans,
 * so literal examples are never rewritten.
 */
function outsideCode(text, edit) {
  const blocks = [];
  const spans = [];

  let result = text.replace(
    /^([ \t]*)(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\2[^\n]*$/gm,
    (match) => {
      blocks.push(match);
      return `\u0000B${blocks.length - 1}\u0000`;
    },
  );

  result = result.replace(/(`+)(?:[^`]|(?!\1)`)*\1/g, (match) => {
    spans.push(match);
    return `\u0000S${spans.length - 1}\u0000`;
  });

  result = edit(result);

  result = result.replace(/\u0000S(\d+)\u0000/g, (_m, i) => spans[Number(i)]);
  result = result.replace(/\u0000B(\d+)\u0000/g, (_m, i) => blocks[Number(i)]);
  return result;
}

/**
 * Removes the two Docusaurus markdown extensions that are not valid MDX and
 * would otherwise abort the parse: HTML comments, and the `{#custom-id}`
 * heading suffix that Docusaurus consumes as an anchor rather than rendering.
 */
function stripMdxHazards(source) {
  return outsideCode(source, (text) =>
    stripHtmlComments(text).replace(/^(#{1,6}[ \t].*?)[ \t]*\{#[^}\n]*\}[ \t]*$/gm, '$1'),
  );
}

/**
 * Removes HTML comments, repeating until stable. Removing a nested comment in
 * one pass can leave the outer `<!--` behind, which then aborts the MDX parse.
 */
function stripHtmlComments(text) {
  let out = text;
  let previous;
  do {
    previous = out;
    out = out.replace(/<!--[\s\S]*?-->/g, '');
  } while (out !== previous);
  return out;
}

/**
 * remark-stringify escapes punctuation that was plain in the source, turning
 * "~20 mins" into "\~20 mins". Agents compare literal text, so strip the
 * added backslashes while leaving code blocks and code spans untouched.
 */
function unescapePunctuation(markdown) {
  return outsideCode(markdown, (text) =>
    text.replace(/\\([-!"#$%&'()*+,./:;<=>?@[\]^_`{|}~\\])/g, '$1'),
  );
}

/**
 * Collects doc sources, skipping the `_`-prefixed drafts. Docusaurus excludes
 * those from the site, so publishing their markdown would expose unreleased
 * pages that have no HTML counterpart.
 */
function findMarkdownFiles(dir, fileList = [], baseDir = dir) {
  if (!fs.existsSync(dir)) return fileList;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    if (entry.name.startsWith('_')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findMarkdownFiles(full, fileList, baseDir);
    } else if (entry.name.endsWith('.md')) {
      fileList.push(path.relative(baseDir, full));
    }
  }
  return fileList;
}

async function createProcessor() {
  const [
    {unified},
    {default: remarkParse},
    {default: remarkFrontmatter},
    {default: remarkGfm},
    {default: remarkMdx},
    {default: remarkStringify},
  ] = await Promise.all([
    import('unified'),
    import('remark-parse'),
    import('remark-frontmatter'),
    import('remark-gfm'),
    import('remark-mdx'),
    import('remark-stringify'),
  ]);

  return unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(remarkGfm)
    .use(remarkMdx)
    .use(remarkStringify, {
      bullet: '-',
      fences: true,
      rule: '-',
      listItemIndent: 'one',
      resourceLink: false,
    });
}

/**
 * Rewrites the .md exports under one locale's build directory. Pages without a
 * translation fall back to the English source, matching how Docusaurus itself
 * resolves untranslated docs.
 */
async function serializeMarkdownInBuild({projectRoot, outDir, locale = DEFAULT_LOCALE}) {
  if (!fs.existsSync(outDir)) {
    return {written: 0, translated: 0, skipped: []};
  }

  const defaultDir = path.join(projectRoot, 'docs');
  const localizedDir = path.join(projectRoot, 'i18n', locale, I18N_DOCS_RELATIVE);
  const overrideDir =
    locale !== DEFAULT_LOCALE && fs.existsSync(localizedDir) ? localizedDir : null;

  const processor = await createProcessor();
  const files = findMarkdownFiles(defaultDir);
  let written = 0;
  let translated = 0;
  const skipped = [];

  for (const relPath of files) {
    const override = overrideDir ? path.join(overrideDir, relPath) : null;
    const useOverride = override ? fs.existsSync(override) : false;
    try {
      const source = await fs.promises.readFile(
        useOverride ? override : path.join(defaultDir, relPath),
        'utf8',
      );
      const tree = processor.parse(stripMdxHazards(unwrapMdxCodeBlocks(source)));
      tree.children = transform(tree.children, collectTemplateConstants(tree));
      const markdown = unescapePunctuation(processor.stringify(tree));

      const destPath = path.join(outDir, relPath);
      await fs.promises.mkdir(path.dirname(destPath), {recursive: true});
      await fs.promises.writeFile(destPath, markdown.trimStart(), 'utf8');
      written++;
      if (useOverride) translated++;
    } catch (error) {
      // Leave the upstream plugin's output in place for this file.
      skipped.push(`${relPath}: ${error.message}`);
    }
  }

  return {written, translated, skipped};
}

module.exports = {serializeMarkdownInBuild};
