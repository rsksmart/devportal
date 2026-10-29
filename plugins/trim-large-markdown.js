const fs = require('fs');
const path = require('path');

/**
 * Agent exports for a few RPC catalog pages exceed the 50K soft limit because
 * every method includes full curl examples. Humans still read the HTML page;
 * agents only need the method index.
 */

const MAX_AGENT_MARKDOWN = 49_000;

/** Relative build paths (numbered source tree and clean public routes). */
const NODE_RPC_METHODS = new Set([
  '03-node-operators/03-json-rpc/01-methods.md',
  'node-operators/json-rpc/methods.md',
  'node-operators/json-rpc/methods/index.md',
]);

const DEV_RPC_METHODS = new Set([
  '02-developers/07-rpc-api/02-rootstock/02-methods.md',
  'developers/rpc-api/rootstock/methods.md',
  'developers/rpc-api/rootstock/methods/index.md',
]);

function trimNodeOperatorMethods(markdown) {
  const marker = /^### JSON RPC method details/m;
  const match = marker.exec(markdown);
  if (!match) return markdown;

  const kept = markdown.slice(0, match.index).trimEnd();
  const footer =
    '\n\nParameter lists, examples, and return shapes for each method stay on the HTML page. Follow the anchor links in the table above.\n';
  return `${kept}${footer}`;
}

/** Keeps the intro and a bullet list of `##` method headings. */
function trimDeveloperRpcMethods(markdown) {
  const lines = markdown.split('\n');
  const intro = [];
  const methods = [];
  let inIntro = true;

  for (const line of lines) {
    if (/^## /.test(line)) {
      inIntro = false;
      methods.push(line.replace(/^## /, '').trim());
      continue;
    }
    if (inIntro) intro.push(line);
  }

  if (!methods.length) return markdown;

  const body = [
    intro.join('\n').trimEnd(),
    '',
    '## Methods',
    '',
    ...methods.map((name) => `- ${name}`),
    '',
    'Full curl examples and response schemas for each method stay on the HTML page.',
    '',
  ].join('\n');

  return body;
}

function trimMarkdown(relPath, markdown) {
  const normalized = relPath.split(path.sep).join('/');

  if (NODE_RPC_METHODS.has(normalized)) {
    return trimNodeOperatorMethods(markdown);
  }
  if (DEV_RPC_METHODS.has(normalized)) {
    return trimDeveloperRpcMethods(markdown);
  }
  return markdown;
}

function walkMarkdownFiles(dir, found = []) {
  if (!fs.existsSync(dir)) return found;
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMarkdownFiles(full, found);
    else if (entry.name.endsWith('.md')) found.push(full);
  }
  return found;
}

/**
 * Trims known oversized agent exports under one locale build directory.
 */
function trimLargeMarkdownInBuild(outDir) {
  let trimmed = 0;

  for (const filePath of walkMarkdownFiles(outDir)) {
    const rel = path.relative(outDir, filePath).split(path.sep).join('/');
    const original = fs.readFileSync(filePath, 'utf8');
    const updated = trimMarkdown(rel, original);
    if (updated === original) continue;

    if (updated.length > MAX_AGENT_MARKDOWN) continue;

    fs.writeFileSync(filePath, updated, 'utf8');
    trimmed++;
  }

  return trimmed;
}

module.exports = {trimLargeMarkdownInBuild, trimMarkdown};
