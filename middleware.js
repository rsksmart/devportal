/**
 * Vercel Edge Middleware: serve markdown when clients send Accept: text/markdown.
 * Static index.html is served before vercel.json header rewrites on Docusaurus builds,
 * so negotiation must run here (before the filesystem).
 */

import {
  resolveMarkdownPath,
  wantsMarkdownAccept,
} from './lib/markdown-negotiation-paths.js';

function hasFileExtension(pathname) {
  const last = pathname.split('/').filter(Boolean).pop() ?? '';
  return /\.[a-zA-Z0-9]+$/.test(last);
}

export default async function middleware(request) {
  if (!wantsMarkdownAccept(request.headers.get('accept'))) {
    return;
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return;
  }

  const url = new URL(request.url);
  const {pathname} = url;

  if (hasFileExtension(pathname)) {
    return;
  }

  const markdownPath = resolveMarkdownPath(pathname);
  if (!markdownPath) {
    return;
  }

  const markdownUrl = new URL(markdownPath, url.origin);
  const mdResponse = await fetch(markdownUrl.toString(), {
    method: request.method,
    headers: {accept: 'text/markdown'},
  });

  if (!mdResponse.ok) {
    return;
  }

  const headers = new Headers(mdResponse.headers);
  headers.set('Content-Type', 'text/markdown; charset=utf-8');
  headers.set('Vary', 'Accept');

  return new Response(mdResponse.body, {
    status: mdResponse.status,
    headers,
  });
}

// Vercel requires config.matcher to be a string literal array (no imports or variables).
// Keep in sync with MIDDLEWARE_MATCHERS in lib/markdown-negotiation-paths.js.
export const config = {
  matcher: [
    '/',
    '/concepts/:path*',
    '/developers/:path*',
    '/node-operators/:path*',
    '/resources/:path*',
    '/dev-tools/:path*',
    '/use-cases/:path*',
    '/es/concepts/:path*',
    '/es/developers/:path*',
    '/es/node-operators/:path*',
    '/es/resources/:path*',
    '/es/dev-tools/:path*',
    '/es/use-cases/:path*',
    '/ja/concepts/:path*',
    '/ja/developers/:path*',
    '/ja/node-operators/:path*',
    '/ja/resources/:path*',
    '/ja/dev-tools/:path*',
    '/ja/use-cases/:path*',
    '/ko/concepts/:path*',
    '/ko/developers/:path*',
    '/ko/node-operators/:path*',
    '/ko/resources/:path*',
    '/ko/dev-tools/:path*',
    '/ko/use-cases/:path*',
  ],
};
