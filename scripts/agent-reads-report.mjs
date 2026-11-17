#!/usr/bin/env node
/**
 * Builds daily agent-read aggregates from a Vercel log export.
 *
 * Input: JSON lines. Each line is either an agent_read event written by
 * lib/agent-read-log.js, or a Vercel log entry whose "message" field holds one
 * (log drains and `vercel logs --json` both produce this shape).
 * Output: artifacts/agent-reads.json, shaped like the other Devportal Health
 * artifacts (reliability.json, agent-score.json) so the backoffice can import it.
 *
 * Only known fields and values are kept, so a malformed or hostile log line
 * cannot add data. Counts are estimates: user agents can be spoofed.
 *
 * Paths are re-checked with publicPath(), so a log line written before that
 * filter existed cannot put arbitrary client input into the report.
 * With --build-dir, reads of paths that do not exist in that build (scanner
 * probes, typos, removed pages) are dropped and counted separately, and
 * topPaths is filled in. Without it, topPaths stays empty because unverified
 * paths are not published. The build directory must be a complete docs build
 * (index.html, index.md, llms.txt and sitemap.xml at its root), so a missing,
 * empty or partial folder, including a yarn check-links build without the
 * Markdown exports, cannot be mistaken for zero traffic. A flag without a value
 * is an error rather than falling back to a default.
 *
 * Usage:
 *   node scripts/agent-reads-report.mjs --in vercel-logs.jsonl [--out artifacts/agent-reads.json] [--build-dir build]
 *   cat vercel-logs.jsonl | node scripts/agent-reads-report.mjs --in -
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {FAMILIES, FORMATS, KINDS, OTHER_PATH, publicPath} from '../lib/agent-read-log.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_OUT = path.join(__dirname, '..', 'artifacts', 'agent-reads.json');
const TOP_PATHS = 10;
const DAY = /^\d{4}-\d{2}-\d{2}$/;
const LOCALES = new Set(['en', 'es', 'ja', 'ko']);

/** Returns a clean event or null. Rejects anything outside the schema. */
export function parseEventLine(line) {
  let record;
  try {
    record = JSON.parse(line);
  } catch {
    return null;
  }
  if (record && record.evt !== 'agent_read' && typeof record.message === 'string') {
    const start = record.message.indexOf('{');
    if (start === -1) return null;
    try {
      record = JSON.parse(record.message.slice(start));
    } catch {
      return null;
    }
  }
  if (!record || record.evt !== 'agent_read' || record.v !== 1) return null;
  const {day, path: pagePath, format, locale, family, kind} = record;
  if (
    typeof day !== 'string' ||
    !DAY.test(day) ||
    typeof pagePath !== 'string' ||
    !pagePath.startsWith('/') ||
    pagePath.length > 200 ||
    !FORMATS.includes(format) ||
    !KINDS.includes(kind) ||
    !LOCALES.has(locale) ||
    !FAMILIES.includes(family)
  ) {
    return null;
  }
  return {day, path: publicPath(pagePath), format, locale, family, kind};
}

/** True when the requested path maps to a file in the build output. */
export function pathExistsInBuild(buildDir, pagePath) {
  if (pagePath === OTHER_PATH) return false;
  let clean;
  try {
    clean = decodeURIComponent(pagePath).split('/').filter(Boolean);
  } catch {
    // Malformed percent escape: treat as an unknown path.
    return false;
  }
  if (clean.some((segment) => segment === '..')) return false;
  const base = path.join(buildDir, ...clean);
  const candidates = /\.[a-z0-9]+$/i.test(pagePath)
    ? [base]
    : [path.join(base, 'index.html'), `${base}.html`, path.join(base, 'index.md')];
  return candidates.some((candidate) => fs.existsSync(candidate));
}

/** Counts by key. Maps are null-prototype objects, so no key can hit an inherited property. */
function counter() {
  return Object.create(null);
}

function bump(map, key) {
  map[key] = (map[key] ?? 0) + 1;
}

/** Aggregates clean events into the artifact shape. */
export function aggregate(
  events,
  generatedAt = new Date().toISOString(),
  droppedUnknownPaths = 0,
  pathsVerified = false,
) {
  const byDay = new Map();
  const totals = {reads: 0, byKind: counter(), byFamily: counter(), byFormat: counter()};
  for (const event of events) {
    if (!byDay.has(event.day)) {
      byDay.set(event.day, {
        date: event.day,
        reads: 0,
        byKind: counter(),
        byFamily: counter(),
        byFormat: counter(),
        byLocale: counter(),
        paths: counter(),
      });
    }
    const day = byDay.get(event.day);
    day.reads += 1;
    bump(day.byKind, event.kind);
    bump(day.byFamily, event.family);
    bump(day.byFormat, event.format);
    bump(day.byLocale, event.locale);
    bump(day.paths, event.path);
    totals.reads += 1;
    bump(totals.byKind, event.kind);
    bump(totals.byFamily, event.family);
    bump(totals.byFormat, event.format);
  }
  const days = [...byDay.values()]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(({paths, ...rest}) => ({
      ...rest,
      topPaths: pathsVerified
        ? Object.entries(paths)
            .filter(([pagePath]) => pagePath !== OTHER_PATH)
            .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
            .slice(0, TOP_PATHS)
            .map(([pagePath, reads]) => ({path: pagePath, reads}))
        : [],
    }));
  return {
    schema: 'agent-reads/v1',
    generatedAt,
    estimate: true,
    note:
      'Counts are estimates. User agents can be spoofed. "user" means a person asked an assistant; "training" and "search" are crawlers; "tool" is a generic HTTP client; "unclassified" is an unknown agent reading a machine-readable file.',
    window: {from: days[0]?.date ?? null, to: days.at(-1)?.date ?? null},
    totals,
    droppedUnknownPaths,
    pathsVerified,
    days,
  };
}

/**
 * Files every complete docs build has at its root. index.md is written only by
 * the post-build step of yarn build (scripts/fix-llms-urls.mjs), so a
 * yarn check-links build, which skips that step and has no Markdown exports,
 * is rejected instead of silently dropping every .md read.
 */
export const BUILD_MARKERS = ['index.html', 'index.md', 'llms.txt', 'sitemap.xml'];

/** True when dir is a complete docs build, not a missing, empty or partial folder. */
export function isDocsBuild(dir) {
  try {
    if (!fs.statSync(dir).isDirectory()) return false;
  } catch {
    return false;
  }
  return BUILD_MARKERS.every((file) => fs.existsSync(path.join(dir, file)));
}

const OPTIONS = new Set(['--in', '--out', '--build-dir']);

/** Parses --flag value pairs. Throws on an unknown flag, a missing value or a repeat. */
export function parseArgs(argv) {
  const args = new Map();
  for (let i = 0; i < argv.length; i += 2) {
    const flag = argv[i];
    const value = argv[i + 1];
    if (!OPTIONS.has(flag)) throw new Error(`Unknown option ${flag}`);
    if (value === undefined || value === '' || (value.startsWith('--') && OPTIONS.has(value))) {
      throw new Error(`${flag} needs a value`);
    }
    if (args.has(flag)) throw new Error(`${flag} given twice`);
    args.set(flag, value);
  }
  return args;
}

function readInput(source) {
  return source === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(source, 'utf8');
}

function main(argv) {
  const usage = 'Usage: node scripts/agent-reads-report.mjs --in <log.jsonl|-> [--out <file>] [--build-dir <dir>]';
  let args;
  try {
    args = parseArgs(argv);
  } catch (err) {
    console.error(`${err.message}\n${usage}`);
    process.exit(2);
  }
  const input = args.get('--in');
  if (!input) {
    console.error(usage);
    process.exit(2);
  }
  const buildDir = args.get('--build-dir');
  if (buildDir !== undefined && !isDocsBuild(buildDir)) {
    console.error(
      `--build-dir ${buildDir} is not a complete docs build (needs ${BUILD_MARKERS.join(', ')}). Run yarn build (not yarn check-links) first.`,
    );
    process.exit(2);
  }
  const out = args.get('--out') ?? DEFAULT_OUT;
  const lines = readInput(input).split('\n').filter(Boolean);
  const parsed = lines.map(parseEventLine).filter(Boolean);
  const events = buildDir
    ? parsed.filter((event) => pathExistsInBuild(buildDir, event.path))
    : parsed;
  const report = aggregate(
    events,
    new Date().toISOString(),
    parsed.length - events.length,
    Boolean(buildDir),
  );
  fs.mkdirSync(path.dirname(out), {recursive: true});
  fs.writeFileSync(out, `${JSON.stringify(report, null, 2)}\n`);
  console.log(
    `Agent reads: ${events.length} events from ${lines.length} lines (${parsed.length - events.length} unknown paths dropped), ${report.days.length} day(s) -> ${path.relative(process.cwd(), out)}`,
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main(process.argv.slice(2));
}
