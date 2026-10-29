/**
 * Shared helpers for driving flowise-embed 3.1.6's Shadow DOM.
 *
 * The widget exposes no public API beyond init/initFull/destroy/clearChat —
 * there is no open() and no send() — so every entry point (the navbar
 * "Ask Rootstock" button, the code-block "Ask Rootstock AI" button, and the
 * theming logic) has to reach into its shadow root. Keeping the selectors and
 * state checks here means that coupling — and the two gotchas below — live in
 * one place instead of being re-derived (and re-broken) per call site.
 */

// flowise tags both of these with a `part` attribute, which makes them stable
// selectors instead of positional guesses:
//   <button part="button">  → the floating bubble toggle
//   <div part="bot">        → the chat window
//
// GOTCHA 1: "the first <button> in the shadow root" is NOT the toggle once the
// chat window exists — the window brings its own buttons (send, reset, thumbs),
// so a positional lookup can style or click the wrong control, or toggle the
// chat closed when the intent was to open it.
export const TOGGLE_SELECTOR = '[part="button"]';
export const WINDOW_SELECTOR = '[part="bot"]';

/** The widget's shadow root, or null if it hasn't mounted (or is disabled). */
export function getShadowRoot() {
  return document.querySelector('flowise-chatbot')?.shadowRoot ?? null;
}

/** The floating bubble toggle. */
export function getToggle(root) {
  return (
    root.querySelector(TOGGLE_SELECTOR) ||
    // Fallback if a future version drops the part attribute: the toggle is the
    // only button that lives OUTSIDE the chat window.
    Array.from(root.querySelectorAll('button')).find(
      (b) => !b.closest(WINDOW_SELECTOR),
    ) ||
    null
  );
}

// GOTCHA 2: flowise keeps the chat window MOUNTED after it has been opened once
// and merely hides it with `transform: scale(0)`. So the presence of the window
// (or of its <textarea>) is NOT an "open" signal — relying on that caused a
// "sends but the window never opens" bug, where text went into the hidden
// input. Measure the rendered size instead.
export function isChatOpen(root) {
  const win = root.querySelector(WINDOW_SELECTOR);
  if (!win) return false;
  const r = win.getBoundingClientRect();
  return r.width > 50 && r.height > 50;
}

/** Poll until `getter` returns a truthy value or the timeout elapses. */
export function waitFor(getter, timeout = 4000, interval = 60) {
  return new Promise((resolve) => {
    const start = performance.now();
    const tick = () => {
      let val = null;
      try {
        val = getter();
      } catch (_) {
        /* shadow DOM not ready yet */
      }
      if (val) return resolve(val);
      if (performance.now() - start >= timeout) return resolve(null);
      window.setTimeout(tick, interval);
    };
    tick();
  });
}

/**
 * Makes the chat window visible, and never closes it: the toggle flips state,
 * so clicking it while the window is already open would close it.
 *
 * Waits for the toggle to exist first, since flowise-embed loads asynchronously
 * (querying once and giving up caused an intermittent "doesn't open" bug).
 *
 * Returns `{ ok, opened }`. `opened` is false when the window was already open,
 * which lets callers report an "open" event only when one actually happened.
 */
export async function ensureChatOpen(root) {
  if (isChatOpen(root)) return { ok: true, opened: false };

  const toggle = await waitFor(() => getToggle(root));
  if (!toggle) return { ok: false, opened: false };

  toggle.click();
  const ok = Boolean(await waitFor(() => (isChatOpen(root) ? true : null)));
  return { ok, opened: ok };
}
