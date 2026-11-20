#!/usr/bin/env node
/**
 * Pulls agent_read events for a time window from Vercel runtime logs and keeps
 * only the clean event fields (see parseEventLine). Raw Vercel records, which
 * can carry request metadata, are read from the CLI's stdout in memory and are
 * never written to disk.
 *
 * Vercel Pro keeps runtime logs for 1 day, so .github/workflows/agent-reads-daily.yml
 * runs this every 12 hours on the previous 12-hour block. The daily and weekly
 * numbers come from running scripts/agent-reads-report.mjs over the saved event files.
 *
 * Requires the Vercel CLI (v64 or later) on PATH and VERCEL_TOKEN in the environment.
 *
 * Usage:
 *   node scripts/fetch-agent-reads.mjs --since <ISO> --until <ISO> --out <events.jsonl>
 *
 * Environment:
 *   VERCEL_TOKEN    required. Never printed.
 *   VERCEL_SCOPE    team slug, default iov-labs-mkt
 *   VERCEL_PROJECT  project name, default devportal-rootstock
 *   VERCEL_BIN      CLI binary, default vercel
 */

import {spawnSync} from 'child_process';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {parseEventLine} from './agent-reads-report.mjs';

const MAX_PAGES = 50;
const PAGE_LIMIT = '10000';

/**
 * Reads one page of `vercel logs --json` output. Returns the clean events,
 * the next-page cursor and how many log records were seen.
 * Each line is {"type":"log"|"request","data":{...}}; the last line is a
 * summary with pagination.hasMore and pagination.next.
 */
export function extractEvents(stdout) {
  const events = [];
  let next = null;
  let records = 0;
  for (const line of stdout.split('\n')) {
    if (!line.trim()) continue;
    let record;
    try {
      record = JSON.parse(line);
    } catch {
      continue;
    }
    if (record && record.pagination) {
      next = record.pagination.hasMore && typeof record.pagination.next === 'string'
        ? record.pagination.next
        : null;
      continue;
    }
    if (!record || record.type !== 'log' || !record.data) continue;
    records += 1;
    const message = record.data.message ?? record.data.msg;
    if (typeof message !== 'string') continue;
    // parseEventLine accepts a {message} wrapper and keeps only schema fields.
    const event = parseEventLine(JSON.stringify({message}));
    // Written back in the logger's shape so agent-reads-report.mjs reads it as-is.
    if (event) events.push({evt: 'agent_read', v: 1, ...event});
  }
  return {events, next, records};
}

function isoArg(value, name) {
  if (!value || Number.isNaN(Date.parse(value))) {
    throw new Error(`${name} must be an ISO 8601 timestamp`);
  }
  return new Date(value).toISOString();
}

function runCli(bin, args) {
  const result = spawnSync(bin, args, {encoding: 'utf8', maxBuffer: 512 * 1024 * 1024});
  if (result.error) throw new Error(`Could not run ${bin}: ${result.error.message}`);
  if (result.status !== 0) {
    const detail = (result.stderr || '').split('\n').slice(-5).join('\n');
    throw new Error(`${bin} logs exited with ${result.status}\n${detail}`);
  }
  return result.stdout;
}

function main(argv) {
  const args = new Map();
  for (let i = 0; i < argv.length; i += 2) args.set(argv[i], argv[i + 1]);
  const since = isoArg(args.get('--since'), '--since');
  const until = isoArg(args.get('--until'), '--until');
  const out = args.get('--out');
  if (!out || out.startsWith('--')) throw new Error('--out <events.jsonl> is required');
  const token = process.env.VERCEL_TOKEN;
  if (!token) throw new Error('VERCEL_TOKEN is not set');
  const bin = process.env.VERCEL_BIN || 'vercel';
  const scope = process.env.VERCEL_SCOPE || 'iov-labs-mkt';
  const project = process.env.VERCEL_PROJECT || 'devportal-rootstock';

  const common = ['logs', 'runtime', '--json', '--limit', PAGE_LIMIT, '--scope', scope, '--token', token];
  // A bare word in --query searches the log message.
  let pageArgs = [
    ...common,
    '--project', project,
    '--environment', 'production',
    '--query', 'agent_read',
    '--since', since,
    '--until', until,
  ];
  const events = [];
  let records = 0;
  let pages = 0;
  while (pageArgs && pages < MAX_PAGES) {
    const page = extractEvents(runCli(bin, pageArgs));
    events.push(...page.events);
    records += page.records;
    pages += 1;
    // --next keeps the project, filter and window; it cannot be combined with them.
    pageArgs = page.next ? [...common, '--next', page.next] : null;
  }
  if (pageArgs) {
    throw new Error(`Stopped after ${MAX_PAGES} pages; the window has more logs than expected.`);
  }
  fs.mkdirSync(path.dirname(path.resolve(out)), {recursive: true});
  fs.writeFileSync(out, events.map((event) => JSON.stringify(event)).join('\n') + (events.length ? '\n' : ''));
  console.log(
    `Agent reads ${since} to ${until}: ${events.length} events from ${records} log records in ${pages} page(s) -> ${out}`,
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  try {
    main(process.argv.slice(2));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
