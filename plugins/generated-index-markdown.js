const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Docusaurus renders `link: type: generated-index` category pages from
 * `_category_.yml` alone. They have no markdown source, so the doc pipeline
 * exports no `.md` for them and agents requesting markdown get nothing.
 *
 * This derives the markdown from the rendered HTML rather than from the docs
 * tree, so the card order, titles and descriptions match what the page shows
 * and stay correct per locale.
 */

const ARTICLE_RE = /<article class="col">([\s\S]*?)<\/article>/g;

function slugify(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function decodeEntities(text) {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&[a-z]+;/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function findCategoryFiles(dir, found = []) {
  if (!fs.existsSync(dir)) return found;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    if (entry.name.startsWith('_') && entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findCategoryFiles(full, found);
    } else if (entry.name === '_category_.yml' || entry.name === '_category_.yaml') {
      found.push(full);
    }
  }
  return found;
}

/**
 * Route for a generated-index category. Docusaurus uses the explicit slug when
 * present and otherwise falls back to `/category/<slugified label>`.
 */
function categoryRoutes(docsDir) {
  const routes = [];
  for (const file of findCategoryFiles(docsDir)) {
    let parsed;
    try {
      parsed = yaml.load(fs.readFileSync(file, 'utf8'));
    } catch {
      continue;
    }
    if (!parsed || typeof parsed !== 'object') continue;
    const link = parsed.link;
    if (!link || link.type !== 'generated-index') continue;

    const slug = link.slug || `/category/${slugify(String(parsed.label || ''))}`;
    routes.push({
      route: `/${String(slug).replace(/^\/|\/$/g, '')}`,
      source: path.relative(docsDir, file),
    });
  }
  return routes;
}

function parseGeneratedIndex(html) {
  const headingMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!headingMatch) return null;
  const title = decodeEntities(headingMatch[1]);
  if (!title) return null;

  // The category description is the paragraph between the h1 and </header>.
  const headerTail = html.slice(headingMatch.index + headingMatch[0].length);
  const headerEnd = headerTail.indexOf('</header>');
  const descriptionMatch =
    headerEnd === -1 ? null : headerTail.slice(0, headerEnd).match(/<p[^>]*>([\s\S]*?)<\/p>/);
  const description = descriptionMatch ? decodeEntities(descriptionMatch[1]) : '';

  const cards = [];
  for (const [, block] of html.matchAll(ARTICLE_RE)) {
    const cardTitle = decodeEntities((block.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/) || [])[1] || '');
    const cardDescription = decodeEntities((block.match(/<p[^>]*>([\s\S]*?)<\/p>/) || [])[1] || '');
    const href = (block.match(/href="([^"]+)"/) || [])[1] || '';
    if (cardTitle || cardDescription) {
      cards.push({title: cardTitle, description: cardDescription, href});
    }
  }

  return {title, description, cards};
}

/** Matches the list shape the MDX serializer emits for card components. */
function renderMarkdown({title, description, cards}) {
  const lines = [`# ${title}`, ''];
  if (description) lines.push(description, '');
  for (const card of cards) {
    const parts = [];
    if (card.title) parts.push(`**${card.title}**${card.description ? ': ' : ''}`);
    if (card.description) parts.push(card.description);
    if (card.href) parts.push(`${parts.length ? ' ' : ''}[Read more](${card.href})`);
    lines.push(`- ${parts.join('')}`);
  }
  lines.push('');
  return lines.join('\n');
}

/**
 * Writes `<route>/index.md` beside the rendered HTML for every generated-index
 * category page. Existing markdown is never overwritten.
 */
function writeGeneratedIndexMarkdown({projectRoot, outDir}) {
  const docsDir = path.join(projectRoot, 'docs');
  const routes = categoryRoutes(docsDir);
  const written = [];
  const skipped = [];

  for (const {route, source} of routes) {
    const pageDir = path.join(outDir, route);
    const htmlPath = path.join(pageDir, 'index.html');
    if (!fs.existsSync(htmlPath)) {
      skipped.push(`${route}: no rendered HTML (from ${source})`);
      continue;
    }
    const directMd = path.join(outDir, `${route}.md`);
    const indexMd = path.join(pageDir, 'index.md');
    if (fs.existsSync(indexMd) || fs.existsSync(directMd)) {
      continue;
    }

    const parsed = parseGeneratedIndex(fs.readFileSync(htmlPath, 'utf8'));
    if (!parsed) {
      skipped.push(`${route}: could not parse rendered HTML`);
      continue;
    }

    fs.writeFileSync(indexMd, renderMarkdown(parsed), 'utf8');
    written.push({route, cards: parsed.cards.length});
  }

  return {written, skipped, total: routes.length};
}

module.exports = {writeGeneratedIndexMarkdown};
