/**
 * Path resolution for Accept: text/markdown content negotiation.
 * Shared by Vercel middleware and CI verification.
 */

export const DOC_SECTIONS =
  'concepts|developers|node-operators|resources|dev-tools|use-cases';
export const LOCALES = 'es|ja|ko';

const DOC_SECTION_LIST = DOC_SECTIONS.split('|');
const LOCALE_LIST = LOCALES.split('|');

/**
 * Vercel middleware matcher paths (path-to-regexp syntax, not regex alternation).
 * Duplicated as string literals in middleware.js config.matcher (Vercel static analysis).
 */
export const MIDDLEWARE_MATCHERS = [
  '/',
  ...DOC_SECTION_LIST.map((section) => `/${section}/:path*`),
  ...LOCALE_LIST.flatMap((locale) =>
    DOC_SECTION_LIST.map((section) => `/${locale}/${section}/:path*`),
  ),
];

const DOC_ROUTE = new RegExp(
  `^/(?:(${LOCALES})/)?(${DOC_SECTIONS})(?:/(.*))?$`,
);

function hasUnsafePathSegments(pathname) {
  return (
    pathname.includes('..') ||
    pathname.includes('\\') ||
    pathname.includes('%2e') ||
    pathname.includes('%2E')
  );
}

/**
 * Resolve a public HTML pathname to a same-origin markdown file path.
 * Returns null when the path is invalid or outside allowed doc routes.
 */
export function resolveMarkdownPath(pathname) {
  if (!pathname || hasUnsafePathSegments(pathname)) {
    return null;
  }

  const cleanPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  if (cleanPath === '' || cleanPath === '/') {
    return '/index.md';
  }

  const match = cleanPath.match(DOC_ROUTE);
  if (!match) {
    return null;
  }

  const [, locale, section, rest] = match;
  const prefix = locale
    ? `/${locale}/${section}/`
    : `/${section}/`;

  const subsegments = rest
    ? rest.split('/').filter(Boolean)
    : [];

  if (subsegments.some((segment) => segment.startsWith('_'))) {
    return null;
  }

  const markdownPath =
    subsegments.length === 0
      ? `${prefix}index.md`
      : `${prefix}${subsegments.join('/')}/index.md`;

  const resolved = new URL(markdownPath, 'https://negotiation.invalid').pathname;

  if (!resolved.startsWith(prefix) && resolved !== '/index.md') {
    return null;
  }

  return resolved;
}

export function wantsMarkdownAccept(acceptHeader) {
  const accept = acceptHeader ?? '';
  return /text\/markdown/i.test(accept);
}
