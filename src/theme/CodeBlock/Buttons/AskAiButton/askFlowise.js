/**
 * Sends a code block to the Rootstock AI Assistant (flowise-embed).
 *
 * flowise-embed 3.1.6 exposes no public "send message" API (only init /
 * initFull / destroy / clearChat), so we drive its Shadow DOM directly. The
 * selectors and open-state handling are shared with the navbar button and the
 * theming logic — see /src/_utils/flowiseChat.js.
 *
 * The Rootstock assistant is a retrieval bot indexed over the devportal docs,
 * so we DON'T need to ship the whole code block: a head+tail excerpt plus a
 * locator (page path + nearest heading + language) is enough for it to pull
 * the full snippet from its knowledge base.
 */

import { ensureChatOpen, getShadowRoot, waitFor } from '/src/_utils/flowiseChat';

// Keep the visible message small. The bot recovers the full block via RAG.
const MAX_CODE_CHARS = 1500;

function rtrim(s) {
  return s.replace(/\s+$/, '');
}

// Truncate keeping the head AND tail — for code the signature/imports (top)
// and the closing (bottom) are the most identifiable parts, which gives both
// better retrieval and a better answer than a hard cut. The elided middle is
// filled back in by the bot's index.
function truncateCode(code) {
  const trimmed = rtrim(code);
  if (trimmed.length <= MAX_CODE_CHARS) {
    return { text: trimmed, truncated: false };
  }
  const headLen = Math.ceil(MAX_CODE_CHARS * 0.6);
  const tailLen = MAX_CODE_CHARS - headLen;
  const head = rtrim(trimmed.slice(0, headLen));
  const tail = trimmed.slice(-tailLen).replace(/^\s+/, '');
  return { text: `${head}\n\n… (truncated) …\n\n${tail}`, truncated: true };
}

// Nearest preceding heading, to tell the bot which section the block is in.
// Walks up the ancestor chain and, at each level, scans previous siblings for
// a heading (deepest match wins).
export function findNearestHeading(startEl) {
  const HEADING = 'h1, h2, h3, h4';
  let node = startEl;
  while (node && node !== document.body) {
    let sib = node.previousElementSibling;
    while (sib) {
      if (sib.matches && sib.matches(HEADING)) return cleanHeading(sib);
      const inner = sib.querySelectorAll && sib.querySelectorAll(HEADING);
      if (inner && inner.length) return cleanHeading(inner[inner.length - 1]);
      sib = sib.previousElementSibling;
    }
    node = node.parentElement;
  }
  return null;
}

function cleanHeading(h) {
  // Strip Docusaurus' hash-link artifacts (zero-width space / trailing #).
  return h.textContent.replace(/[​#]+$/g, '').trim();
}

export function buildPrompt({ code, language, heading }) {
  const lang = (language || '').toLowerCase();
  const { text, truncated } = truncateCode(code);

  const page = typeof window !== 'undefined' ? window.location.pathname : '';
  const locatorParts = [
    page && `page: ${page}`,
    heading && `section "${heading}"`,
  ].filter(Boolean);
  const locator = locatorParts.length ? ` (${locatorParts.join(', ')})` : '';

  const langLabel = lang ? `\`${lang}\` ` : '';
  const note = truncated
    ? '\n(Excerpt truncated — the full snippet is on this docs page.)'
    : '';

  return (
    `Explain this ${langLabel}code from the Rootstock docs${locator}:\n\n` +
    `\`\`\`${lang}\n${text}\n\`\`\`${note}`
  );
}

function setNativeValue(el, value) {
  const desc = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(el),
    'value',
  );
  if (desc && desc.set) desc.set.call(el, value);
  else el.value = value;
}

/**
 * Opens the chat window and prefills the input with `message`, then focuses it.
 * It deliberately does NOT submit — the user reviews the prefilled question and
 * presses send themselves. Returns true on success, false if the widget isn't
 * available.
 */
export async function openChatWithPrompt(message) {
  const root = getShadowRoot();
  if (!root) return false;

  if (!(await ensureChatOpen(root)).ok) return false;

  const textarea = await waitFor(() => root.querySelector('textarea'), 5000);
  if (!textarea) return false;

  // CRITICAL: flowise (SolidJS) binds the input handler via event delegation on
  // the top-level `document` (`textarea.$$input`), NOT on the element itself.
  // A synthetic event therefore has to be `composed: true` to escape the
  // widget's shadow root and reach that document-level listener — exactly what
  // real keystrokes do (native `input` events are composed). Without it the
  // input signal never updates and SolidJS wipes our text on the next render.
  // Set the value first so the handler reads our text off currentTarget.value.
  setNativeValue(textarea, message);
  textarea.dispatchEvent(
    new InputEvent('input', {
      bubbles: true,
      composed: true,
      inputType: 'insertText',
      data: message,
    }),
  );

  // Focus + caret at end so the user can edit and hit send.
  textarea.focus();
  const end = textarea.value.length;
  try {
    textarea.setSelectionRange(end, end);
  } catch (_) {
    /* setSelectionRange can throw on some input types; ignore */
  }
  return true;
}
