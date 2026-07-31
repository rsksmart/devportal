/**
 * Runs after `docusaurus gen-api-docs rskj`. Shortens the sidebar labels and
 * page titles to the method name (operationId) instead of the long summary,
 * and adds the "JSON-RPC protocol" page to the sidebar.
 * Run: node scripts/fix-sidebar-labels.js
 */
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const ROOT = path.join(__dirname, "..");
const SPEC = path.join(ROOT, "open-api", "rootstock-openapi.yaml");
const SIDEBAR = path.join(ROOT, "docs", "rskj", "sidebar.ts");

const spec = yaml.load(fs.readFileSync(SPEC, "utf8"));

const kebab = (s) =>
  s
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();

const map = {};
for (const ops of Object.values(spec.paths ?? {})) {
  const op = ops.post ?? {};
  if (op.operationId) map[kebab(op.operationId)] = op.operationId;
}

let src = fs.readFileSync(SIDEBAR, "utf8");
let replaced = 0;
src = src.replace(
  /(id: "rskj\/([a-z0-9-]+)",\s*\n\s*label: )"(?:[^"\\]|\\.)*"/g,
  (m, pre, slug) => {
    if (map[slug]) {
      replaced++;
      return `${pre}${JSON.stringify(map[slug])}`;
    }
    return m;
  }
);
if (!src.includes('"json-rpc-protocol"')) {
  src = src.replace(
    /(\{\s*type: "doc",\s*id: "rskj\/rskj-json-rpc",\s*\},)/,
    `$1\n    {\n      type: "doc",\n      id: "json-rpc-protocol",\n      label: "JSON-RPC protocol",\n    },`
  );
}

fs.writeFileSync(SIDEBAR, src);
console.log(`sidebar labels -> operationId: ${replaced} replaced`);

// The frontmatter sidebar_label/title in each *.api.mdx wins over sidebar.ts,
// so update those too.
const DOCS = path.join(ROOT, "docs", "rskj");
let fmFixed = 0;
for (const f of fs.readdirSync(DOCS)) {
  if (!f.endsWith(".api.mdx")) continue;
  const slug = f.replace(/\.api\.mdx$/, "");
  const opId = map[slug];
  if (!opId) continue;
  let doc = fs.readFileSync(path.join(DOCS, f), "utf8");
  const before = doc;
  doc = doc.replace(/^sidebar_label: .*$/m, `sidebar_label: ${JSON.stringify(opId)}`);
  doc = doc.replace(/^title: .*$/m, `title: ${JSON.stringify(opId)}`);
  if (doc !== before) {
    fs.writeFileSync(path.join(DOCS, f), doc);
    fmFixed++;
  }
}
console.log(`frontmatter sidebar_label/title -> operationId: ${fmFixed} files`);
