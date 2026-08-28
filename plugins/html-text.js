/**
 * Shared text extraction for the markdown generators that read rendered HTML.
 *
 * Both generators previously decoded entities with a chain of `replace` calls.
 * That chain decoded `&amp;` before the other rules, so the `&` it produced was
 * fed back into them and `&amp;lt;` collapsed to `<` instead of staying the
 * literal `&lt;` the page displays. It also deleted every named entity it did
 * not list, which silently dropped visible characters.
 */

const NAMED_ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  ndash: '\u2013',
  mdash: '\u2014',
  hellip: '\u2026',
  lsquo: '\u2018',
  rsquo: '\u2019',
  ldquo: '\u201c',
  rdquo: '\u201d',
  copy: '\u00a9',
  reg: '\u00ae',
  trade: '\u2122',
  deg: '\u00b0',
  times: '\u00d7',
  middot: '\u00b7',
  bull: '\u2022',
  laquo: '\u00ab',
  raquo: '\u00bb',
};

const ENTITY_RE = /&(#\d+|#[xX][0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]*);/g;

const MAX_CODE_POINT = 0x10ffff;

/**
 * Decodes HTML entities in a single pass, so no replacement can re-decode the
 * output of another. Entities outside the table are left as written rather than
 * dropped, because this feeds a markdown export where losing a character is
 * worse than leaving it encoded.
 */
function decodeEntities(text) {
  return text.replace(ENTITY_RE, (match, body) => {
    if (body[0] === '#') {
      const hex = body[1] === 'x' || body[1] === 'X';
      const code = hex ? parseInt(body.slice(2), 16) : Number(body.slice(1));
      if (!Number.isInteger(code) || code < 1 || code > MAX_CODE_POINT) {
        return match;
      }
      return String.fromCodePoint(code);
    }

    const named = NAMED_ENTITIES[body.toLowerCase()];
    return named === undefined ? match : named;
  });
}

/**
 * Removes HTML tags, repeating until the result stops changing. A single pass
 * can splice two fragments into a new tag, so `<scr<span>ipt>` would survive as
 * `<script>`.
 */
function stripTags(html) {
  let out = html;
  let previous;
  do {
    previous = out;
    out = out.replace(/<[^>]*>/g, '');
  } while (out !== previous);
  return out;
}

module.exports = {decodeEntities, stripTags};
