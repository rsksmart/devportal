const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const {decodeEntities, stripTags} = require('./html-text');

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

/**
 * Tags come off before entities are decoded, so an escaped `&lt;script&gt;`
 * stays literal text in the export instead of becoming a tag and being removed.
 */
function toText(html) {
  return decodeEntities(stripTags(html)).replace(/\s+/g, ' ').trim();
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
  const skipped = [];

  for (const file of findCategoryFiles(docsDir)) {
    const source = path.relative(docsDir, file);
    let parsed;
    try {
      parsed = yaml.load(fs.readFileSync(file, 'utf8'));
    } catch (err) {
      skipped.push(`${source}: ${err.message}`);
      continue;
    }
    if (!parsed || typeof parsed !== 'object') continue;
    const link = parsed.link;
    if (!link || link.type !== 'generated-index') continue;

    const slug = link.slug || `/category/${slugify(String(parsed.label || ''))}`;
    const route = `/${String(slug).replace(/^\/|\/$/g, '')}`;

    // The slug reaches path.join below, so a traversal segment would let a
    // category write outside the build directory.
    if (route.split('/').includes('..')) {
      skipped.push(`${source}: slug escapes the build directory (${slug})`);
      continue;
    }

    routes.push({route, source});
  }

  return {routes, skipped};
}

function parseGeneratedIndex(html) {
  const headingMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!headingMatch) return null;
  const title = toText(headingMatch[1]);
  if (!title) return null;

  // The category description is the paragraph between the h1 and </header>.
  const headerTail = html.slice(headingMatch.index + headingMatch[0].length);
  const headerEnd = headerTail.indexOf('</header>');
  const descriptionMatch =
    headerEnd === -1 ? null : headerTail.slice(0, headerEnd).match(/<p[^>]*>([\s\S]*?)<\/p>/);
  const description = descriptionMatch ? toText(descriptionMatch[1]) : '';

  const cards = [];
  for (const [, block] of html.matchAll(ARTICLE_RE)) {
    const cardTitle = toText((block.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/) || [])[1] || '');
    const cardDescription = toText((block.match(/<p[^>]*>([\s\S]*?)<\/p>/) || [])[1] || '');
    const href = decodeEntities((block.match(/href="([^"]+)"/) || [])[1] || '');
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
  const {routes, skipped} = categoryRoutes(docsDir);
  const written = [];

  for (const {route, source} of routes) {
    const pageDir = path.join(outDir, route);
    const htmlPath = path.join(pageDir, 'index.html');

    try {
      const html = fs.readFileSync(htmlPath, 'utf8');

      // A page with a real markdown source already exported its own flat file.
      if (fs.existsSync(path.join(outDir, `${route}.md`))) {
        continue;
      }

      const parsed = parseGeneratedIndex(html);
      if (!parsed) {
        skipped.push(`${route}: could not parse rendered HTML`);
        continue;
      }

      // Writing exclusively never clobbers markdown another step already wrote,
      // and avoids the gap an existence check leaves before the write.
      fs.writeFileSync(path.join(pageDir, 'index.md'), renderMarkdown(parsed), {
        encoding: 'utf8',
        flag: 'wx',
      });
      written.push({route, cards: parsed.cards.length});
    } catch (err) {
      // The site itself has already built by this point, so filesystem trouble
      // on one category page is reported rather than allowed to fail the
      // deploy. Errors without a code are programmer mistakes and still surface.
      if (!err.code) throw err;
      if (err.code === 'EEXIST') continue;
      skipped.push(
        err.code === 'ENOENT'
          ? `${route}: no rendered HTML (from ${source})`
          : `${route}: ${err.message}`,
      );
    }
  }

  return {written, skipped, total: routes.length};
}

module.exports = {writeGeneratedIndexMarkdown};
