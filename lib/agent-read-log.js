/**
 * Agent-read logging for the DevPortal actions PoC (Phase 0).
 *
 * Counts reads by AI tools: every request for a machine-readable entry point
 * (.md exports, llms.txt, negotiated markdown, the AI policy) and any request
 * from a known AI user agent. Each read becomes one JSON line in the Vercel
 * runtime log. scripts/agent-reads-report.mjs turns an export of those lines
 * into daily aggregates for Devportal Health.
 *
 * Privacy (skills ADR-006): no IP address, query string, cookie or full user
 * agent is recorded. Only the vendor family, the kind of fetch, the path,
 * the format, the locale and the UTC day.
 *
 * User agents can be spoofed, so every count built from this is an estimate.
 * Set AGENT_READ_LOG=off in the Vercel project to stop logging without a
 * code change.
 */

/**
 * Documented AI crawler and fetcher names, most specific first.
 * kind "user": fetched because a person asked an assistant.
 * kind "search": builds an assistant's search index.
 * kind "training": collects data for model training.
 * Re-check each vendor's published list before relying on the split.
 */
export const AGENT_PATTERNS = [
  {token: 'ChatGPT-User', family: 'openai', kind: 'user'},
  {token: 'OAI-SearchBot', family: 'openai', kind: 'search'},
  {token: 'GPTBot', family: 'openai', kind: 'training'},
  {token: 'Claude-User', family: 'anthropic', kind: 'user'},
  {token: 'Claude-SearchBot', family: 'anthropic', kind: 'search'},
  {token: 'ClaudeBot', family: 'anthropic', kind: 'training'},
  {token: 'anthropic-ai', family: 'anthropic', kind: 'training'},
  {token: 'Perplexity-User', family: 'perplexity', kind: 'user'},
  {token: 'PerplexityBot', family: 'perplexity', kind: 'search'},
  {token: 'MistralAI-User', family: 'mistral', kind: 'user'},
  {token: 'DuckAssistBot', family: 'duckduckgo', kind: 'user'},
  {token: 'meta-externalfetcher', family: 'meta', kind: 'user'},
  {token: 'meta-externalagent', family: 'meta', kind: 'training'},
  {token: 'Amazonbot', family: 'amazon', kind: 'search'},
  {token: 'CCBot', family: 'commoncrawl', kind: 'training'},
  {token: 'Bytespider', family: 'bytedance', kind: 'training'},
];

/** Generic HTTP clients that coding agents and scripts often use. */
export const TOOL_CLIENTS = [
  'curl/',
  'Wget/',
  'python-requests',
  'python-httpx',
  'aiohttp',
  'node-fetch',
  'axios/',
  'undici',
  'Go-http-client',
  'Bun/',
  'Deno/',
];

/** Clients whose whole user agent is one bare word, such as Node's built-in fetch. */
const EXACT_TOOL_CLIENTS = new Set(['node', 'bun', 'deno']);

/**
 * Header the middleware sets on its own same-origin fetch of a .md file during
 * content negotiation, so that inner request is not counted as a second read.
 */
export const INTERNAL_FETCH_HEADER = 'x-docs-internal-fetch';

export const KINDS = ['user', 'search', 'training', 'tool', 'unclassified'];
export const FORMATS = ['md', 'negotiated', 'entry', 'html'];

const ENTRY_FILES = new Set([
  '/llms.txt',
  '/llms-full.txt',
  '/ai-policy.txt',
  '/.well-known/ai-policy.txt',
]);

const LOCALE_PREFIX = /^\/(es|ja|ko)\//;
const MAX_PATH_LENGTH = 200;

/** Returns {family, kind} for a known AI agent or tool client, else null. */
export function classifyUserAgent(userAgent) {
  if (!userAgent) {
    return null;
  }
  const lower = userAgent.toLowerCase().trim();
  if (EXACT_TOOL_CLIENTS.has(lower)) {
    return {family: 'tool-client', kind: 'tool'};
  }
  for (const pattern of AGENT_PATTERNS) {
    if (lower.includes(pattern.token.toLowerCase())) {
      return {family: pattern.family, kind: pattern.kind};
    }
  }
  for (const client of TOOL_CLIENTS) {
    if (lower.includes(client.toLowerCase())) {
      return {family: 'tool-client', kind: 'tool'};
    }
  }
  return null;
}

/** Which kind of resource was read. */
export function readFormat(pathname, acceptHeader) {
  if (ENTRY_FILES.has(pathname)) {
    return 'entry';
  }
  if (pathname.endsWith('.md')) {
    return 'md';
  }
  if (/text\/markdown/i.test(acceptHeader ?? '')) {
    return 'negotiated';
  }
  return 'html';
}

/**
 * Builds the log event for a request, or null when there is nothing to count.
 * Not counted: a human (unknown user agent) reading an HTML page, any method
 * other than GET (HEAD only checks that a page exists), and the middleware's
 * own inner fetch during content negotiation.
 */
export function buildAgentReadEvent(request, now = new Date()) {
  if (request.method !== 'GET') {
    return null;
  }
  if (
    request.headers.get(INTERNAL_FETCH_HEADER) ||
    request.headers.get('x-middleware-subrequest')
  ) {
    return null;
  }
  const {pathname} = new URL(request.url);
  const agent = classifyUserAgent(request.headers.get('user-agent'));
  const format = readFormat(pathname, request.headers.get('accept'));
  if (!agent && format === 'html') {
    return null;
  }
  const localeMatch = LOCALE_PREFIX.exec(pathname);
  return {
    evt: 'agent_read',
    v: 1,
    day: now.toISOString().slice(0, 10),
    path: pathname.slice(0, MAX_PATH_LENGTH),
    format,
    locale: localeMatch ? localeMatch[1] : 'en',
    family: agent ? agent.family : 'unknown',
    kind: agent ? agent.kind : 'unclassified',
  };
}

function loggingDisabled() {
  const env = globalThis.process?.env ?? {};
  return String(env.AGENT_READ_LOG ?? '').toLowerCase() === 'off';
}

/** Writes one log line for an agent read. Never throws into the page view. */
export function logAgentRead(request) {
  try {
    if (loggingDisabled()) {
      return;
    }
    const event = buildAgentReadEvent(request);
    if (event) {
      console.log(JSON.stringify(event));
    }
  } catch {
    // Logging must never break serving a page.
  }
}
