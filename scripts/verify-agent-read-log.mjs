#!/usr/bin/env node
/**
 * Unit checks for agent-read logging and the daily report.
 * Usage: node scripts/verify-agent-read-log.mjs
 */

import {spawnSync} from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import {fileURLToPath} from 'url';
import {
  INTERNAL_FETCH_HEADER,
  OTHER_PATH,
  buildAgentReadEvent,
  classifyUserAgent,
  publicPath,
} from '../lib/agent-read-log.js';
import {MIDDLEWARE_MATCHERS} from '../lib/markdown-negotiation-paths.js';
import {PUBLIC_ROUTES} from '../lib/public-routes.js';
import {aggregate, parseEventLine, pathExistsInBuild} from './agent-reads-report.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let failed = false;
let passed = 0;

function check(name, actual, expected) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    failed = true;
    console.error(`✗ ${name}\n  expected: ${e}\n  actual:   ${a}`);
  } else {
    passed += 1;
  }
}

function request(url, {ua = '', accept = 'text/html', method = 'GET', extra = {}} = {}) {
  return {
    url,
    method,
    headers: new Headers({'user-agent': ua, accept, ...extra}),
  };
}

const NOW = new Date('2026-11-17T10:00:00Z');
const BASE = 'https://dev.rootstock.io';

// Classification
check('ChatGPT-User is a user fetch',
  classifyUserAgent('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot'),
  {family: 'openai', kind: 'user'});
check('GPTBot is training',
  classifyUserAgent('Mozilla/5.0; compatible; GPTBot/1.2; +https://openai.com/gptbot'),
  {family: 'openai', kind: 'training'});
check('Claude-User is a user fetch', classifyUserAgent('Claude-User/1.0'), {family: 'anthropic', kind: 'user'});
check('ClaudeBot is training', classifyUserAgent('ClaudeBot/1.0; +claudebot@anthropic.com'), {family: 'anthropic', kind: 'training'});
check('Claude-SearchBot is search', classifyUserAgent('Claude-SearchBot/1.0'), {family: 'anthropic', kind: 'search'});
check('PerplexityBot is search', classifyUserAgent('PerplexityBot/1.0'), {family: 'perplexity', kind: 'search'});
check('Perplexity-User is a user fetch', classifyUserAgent('Perplexity-User/1.0'), {family: 'perplexity', kind: 'user'});
check('curl is a tool client', classifyUserAgent('curl/8.7.1'), {family: 'tool-client', kind: 'tool'});
check('a browser is not an agent',
  classifyUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 Safari/605.1.15'),
  null);
check('a missing user agent is not an agent', classifyUserAgent(''), null);
check("Node's built-in fetch is a tool client", classifyUserAgent('node'), {family: 'tool-client', kind: 'tool'});
check('Bun is a tool client', classifyUserAgent('Bun/1.1.30'), {family: 'tool-client', kind: 'tool'});
check('a word containing "node" in a browser UA is not a tool', classifyUserAgent('Mozilla/5.0 nodeweb Safari'), null);

// Events
check('human HTML view is not logged',
  buildAgentReadEvent(request(`${BASE}/developers/quickstart/`, {ua: 'Mozilla/5.0 Safari/605.1.15'}), {now: NOW}),
  null);
check('agent HTML view is logged without the query string',
  buildAgentReadEvent(request(`${BASE}/developers/quickstart/?utm_source=chatgpt.com`, {ua: 'ChatGPT-User/1.0'}), {now: NOW}),
  {evt: 'agent_read', v: 1, day: '2026-11-17', path: '/developers/quickstart/', format: 'html', locale: 'en', family: 'openai', kind: 'user'});
check('unknown client reading llms.txt is unclassified',
  buildAgentReadEvent(request(`${BASE}/llms.txt`, {ua: 'SomeAgent/0.1'}), {now: NOW}),
  {evt: 'agent_read', v: 1, day: '2026-11-17', path: '/llms.txt', format: 'entry', locale: 'en', family: 'unknown', kind: 'unclassified'});
check('negotiated markdown on a localized page',
  buildAgentReadEvent(request(`${BASE}/es/concepts/glossary/`, {ua: 'Claude-User/1.0', accept: 'text/markdown'}), {negotiated: true, now: NOW}),
  {evt: 'agent_read', v: 1, day: '2026-11-17', path: '/es/concepts/glossary/', format: 'negotiated', locale: 'es', family: 'anthropic', kind: 'user'});
check('direct .md export by a tool client',
  buildAgentReadEvent(request(`${BASE}/developers/quickstart/index.md`, {ua: 'python-requests/2.32'}), {now: NOW}),
  {evt: 'agent_read', v: 1, day: '2026-11-17', path: '/developers/quickstart/index.md', format: 'md', locale: 'en', family: 'tool-client', kind: 'tool'});
check('HEAD is not a read',
  buildAgentReadEvent(request(`${BASE}/llms.txt`, {ua: 'GPTBot/1.2', method: 'HEAD'}), {now: NOW}),
  null);
check("the middleware's own markdown fetch is not counted twice",
  buildAgentReadEvent(request(`${BASE}/developers/quickstart/index.md`, {accept: 'text/markdown', extra: {[INTERNAL_FETCH_HEADER]: '1'}}), {now: NOW}),
  null);
check('asking for Markdown without getting it is not "negotiated"',
  buildAgentReadEvent(request(`${BASE}/developers/quickstart/index.html`, {ua: 'Claude-User/1.0', accept: 'text/markdown'}), {now: NOW})?.format,
  'html');
check('unknown client that asked for Markdown but got HTML is not logged',
  buildAgentReadEvent(request(`${BASE}/developers/quickstart/`, {ua: 'SomeAgent/0.1', accept: 'text/markdown'}), {now: NOW}),
  null);
check('localized llms.txt is an entry point',
  buildAgentReadEvent(request(`${BASE}/ja/llms-full.txt`, {ua: 'SomeAgent/0.1'}), {now: NOW})?.format,
  'entry');
check('home page Markdown export is counted',
  buildAgentReadEvent(request(`${BASE}/index.md`, {ua: 'SomeAgent/0.1'}), {now: NOW})?.format,
  'md');

// Paths are client input: only public route shapes reach the log
check('an email in the path is not logged',
  buildAgentReadEvent(request(`${BASE}/developers/alice@example.com/index.md`, {ua: 'curl/8.7.1'}), {now: NOW})?.path,
  OTHER_PATH);
check('a percent-encoded email is not logged', publicPath('/developers/alice%40example.com/'), OTHER_PATH);
check('a name shaped like a slug is not logged', publicPath('/developers/john-smith/'), OTHER_PATH);
check('a percent-encoded spelling of a real route is not logged', publicPath('/developers/%71uickstart/'), OTHER_PATH);
check('an unknown root is not logged', publicPath('/wp-admin/setup.php'), OTHER_PATH);
check('an over-long path is not logged', publicPath(`/developers/${'a'.repeat(250)}`), OTHER_PATH);
check('a listed docs route is kept', publicPath('/developers/quickstart/'), '/developers/quickstart/');
check('a listed route without the trailing slash is kept', publicPath('/developers/quickstart'), '/developers/quickstart');
check('a listed route as a Markdown export is kept', publicPath('/developers/quickstart/index.md'), '/developers/quickstart/index.md');
check('a localized docs route is kept', publicPath('/ko/concepts/glossary/index.md'), '/ko/concepts/glossary/index.md');
check('the cheatsheet is kept', publicPath('/cheatsheet.md'), '/cheatsheet.md');
check('a section root written as index/index.md is kept', publicPath('/developers/index/index.md'), '/developers/index/index.md');
check('the route list is not empty', PUBLIC_ROUTES.size > 100, true);

check('POST is never logged',
  buildAgentReadEvent(request(`${BASE}/llms.txt`, {ua: 'GPTBot/1.2', method: 'POST'}), {now: NOW}),
  null);

// Report parsing rejects anything outside the schema
const good = JSON.stringify({evt: 'agent_read', v: 1, day: '2026-11-17', path: '/llms.txt', format: 'entry', locale: 'en', family: 'openai', kind: 'user'});
check('raw event line parses', parseEventLine(good)?.kind, 'user');
check('Vercel log wrapper parses', parseEventLine(JSON.stringify({timestamp: 1, message: good}))?.path, '/llms.txt');
check('extra fields are dropped',
  Object.keys(parseEventLine(JSON.stringify({...JSON.parse(good), ip: '1.2.3.4', ua: 'x'}))),
  ['day', 'path', 'format', 'locale', 'family', 'kind']);
check('unknown kind is rejected', parseEventLine(good.replace('"user"', '"admin"')), null);
check('non-JSON line is rejected', parseEventLine('GET /llms.txt 200'), null);
check('a day that is not a string is rejected',
  parseEventLine(JSON.stringify({...JSON.parse(good), day: ['2026-11-17']})),
  null);
check('a raw path in an old log line is re-filtered',
  parseEventLine(JSON.stringify({...JSON.parse(good), path: '/developers/alice@example.com/'}))?.path,
  OTHER_PATH);

// Aggregation
const events = [
  {day: '2026-11-17', path: '/llms.txt', format: 'entry', locale: 'en', family: 'openai', kind: 'user'},
  {day: '2026-11-17', path: '/llms.txt', format: 'entry', locale: 'en', family: 'anthropic', kind: 'training'},
  {day: '2026-11-16', path: '/developers/quickstart/index.md', format: 'md', locale: 'en', family: 'tool-client', kind: 'tool'},
];
const report = aggregate(events, '2026-11-17T12:00:00Z', 0, true);
check('report window', report.window, {from: '2026-11-16', to: '2026-11-17'});
check('report totals', report.totals.reads, 3);
check('report kinds', report.totals.byKind, {user: 1, training: 1, tool: 1});
check('report top path', report.days[1].topPaths, [{path: '/llms.txt', reads: 2}]);
check('report is labelled an estimate', report.estimate, true);
check('without a build check, no paths are published',
  aggregate(events, '2026-11-17T12:00:00Z').days[1].topPaths,
  []);
check('the other-path bucket is never published',
  aggregate([{...events[0], path: OTHER_PATH}], '2026-11-17T12:00:00Z', 0, true).days[0].topPaths,
  []);

// Unknown paths are dropped when a build directory is given
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-reads-'));
fs.mkdirSync(path.join(tmp, 'developers', 'quickstart'), {recursive: true});
fs.writeFileSync(path.join(tmp, 'developers', 'quickstart', 'index.html'), '');
fs.writeFileSync(path.join(tmp, 'llms.txt'), '');
check('existing page route is kept', pathExistsInBuild(tmp, '/developers/quickstart/'), true);
check('existing entry file is kept', pathExistsInBuild(tmp, '/llms.txt'), true);
check('probe for a missing page is dropped', pathExistsInBuild(tmp, '/wp-admin/'), false);
check('traversal is rejected', pathExistsInBuild(tmp, '/developers/%2e%2e/%2e%2e/etc/passwd'), false);
check('a malformed percent escape is an unknown path', pathExistsInBuild(tmp, '/developers/%ZZ/index.md'), false);

// A missing build directory stops the report instead of writing zero reads
const logFile = path.join(tmp, 'log.jsonl');
const outFile = path.join(tmp, 'out.json');
fs.writeFileSync(logFile, `${good}\n`);
const run = spawnSync(process.execPath, [
  path.join(__dirname, 'agent-reads-report.mjs'),
  '--in', logFile, '--out', outFile, '--build-dir', path.join(tmp, 'missing-build'),
], {encoding: 'utf8'});
check('missing build directory exits with an error', run.status, 2);
check('missing build directory writes no report', fs.existsSync(outFile), false);
fs.rmSync(tmp, {recursive: true, force: true});

// The middleware wires the kill switch and the internal-fetch header
const middlewareSource = fs.readFileSync(path.join(__dirname, '..', 'middleware.js'), 'utf8');
check('middleware logs on every exit with the negotiation outcome',
  /finally \{[^]*?logAgentRead\(request, \{negotiated: response !== undefined\}\)/.test(middlewareSource),
  true);
check('localized llms files reach the middleware',
  ['/es/llms.txt', '/ja/llms-full.txt', '/index.md', '/cheatsheet.md'].every((route) => MIDDLEWARE_MATCHERS.includes(route)),
  true);
check('middleware marks its own markdown fetch', middlewareSource.includes('[INTERNAL_FETCH_HEADER]'), true);

if (failed) {
  console.error('\nAgent-read logging verification failed.');
  process.exit(1);
}
console.log(`✓ ${passed} agent-read logging checks passed`);
