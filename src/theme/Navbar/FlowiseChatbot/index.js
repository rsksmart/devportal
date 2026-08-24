import React, { useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';
import { pushDataLayer } from '/src/_utils/analytics';
import { getToggle, isChatOpen, TOGGLE_SELECTOR } from '/src/_utils/flowiseChat';

// Portal design system tokens (from src/scss/abstracts/_variables.scss)
const LIGHT = {
  bg:          '#FAFAF5', // $bw
  bubbleBg:    '#F0F0F0', // $gray-100
  inputBg:     '#F0F0F0', // $gray-100
  text:        '#000000', // $black
  placeholder: '#737373', // $gray-550
  border:      '#D6D6D6', // $gray-200
  brand:       '#E68300', // $orange-light
  modalBg:     '#FAFAF5',
  divider:     '#D6D6D6', // $gray-200
};
const DARK = {
  bg:          '#000000', // $black
  bubbleBg:    '#1A1A1A', // $gray-900
  inputBg:     '#1A1A1A', // $gray-900
  text:        '#ffffff', // $white
  placeholder: '#8C8C8C', // $gray-450
  border:      '#3D3D3D', // $gray-800
  brand:       '#FF9100', // $orange
  modalBg:     '#0D0D0D', // $gray-950
  divider:     '#3D3D3D', // $gray-800
};

function buildTheme(isDark) {
  const t = isDark ? DARK : LIGHT;
  return {
    button: {
      backgroundColor: t.brand,
      right: 20,
      bottom: 20,
      size: 48,
      iconColor: 'white',
    },
    tooltip: { showTooltip: false },
    chatWindow: {
      title: 'Rootstock AI Assistant',
      welcomeMessage: "Hi, I'm Rootstock AI Assistant, your Rootstock guide. Try one of these to get started, or ask me anything.",
      starterPrompts: [
        "Deploy my first smart contract",
        "Add Rootstock to my wallet",
        "How does the USDRIF Vault work?",
        "Find a starter kit for my stack",
        "I'm evaluating Rootstock for my company"
      ],
      fontSize: 14,
      backgroundColor: t.bg,
      botMessage: {
        backgroundColor: t.bubbleBg,
        textColor: t.text,
        showAvatar: false,
      },
      userMessage: {
        backgroundColor: t.brand,
        textColor: '#ffffff',
        showAvatar: false,
      },
      textInput: {
        placeholder: 'Ask me anything...',
        backgroundColor: t.inputBg,
        textColor: t.text,
        sendButtonColor: t.brand,
      },
      footer: { showFooter: false },
    },
  };
}

// Generates shadow DOM CSS for the given mode.
// Targets elements flowise-embed hardcodes (bg-transparent + Tailwind reset
// `textarea { color: inherit }` → white text on transparent bg in dark mode).
function buildShadowCSS(isDark) {
  const t = isDark ? DARK : LIGHT;
  return `
    /* Chat window container */
    .chatbot-container {
      background-color: ${t.bg} !important;
      color: ${t.text} !important;
      font-family: 'Rootstock Sans', Arial, sans-serif !important;
    }

    /* Bot message bubbles — hardcoded bg in CSS + inline style from SolidJS reactive effect */
    .chatbot-host-bubble {
      background-color: ${t.bubbleBg} !important;
      color: ${t.text} !important;
    }

    /* User message bubbles */
    .chatbot-guest-bubble {
      background-color: ${t.brand} !important;
      color: #ffffff !important;
    }

    /* Chat header */
    .chatbot-header {
      background-color: ${t.bg} !important;
      color: ${t.text} !important;
      border-bottom: 1px solid ${t.border} !important;
    }

    /* Footer placeholder span — rendered even when showFooter:false; bg is frozen at init time */
    .w-full.text-center {
      background-color: ${t.bg} !important;
    }

    /* Input area */
    .chatbot-input,
    .feedback-input {
      background-color: ${t.inputBg} !important;
      color: ${t.text} !important;
      border-color: ${t.border} !important;
    }

    /* Source document chips — bg is blend(botBubbleBg, white, 60%) frozen at init time */
    .source-chip {
      background-color: ${t.bubbleBg} !important;
      color: ${t.text} !important;
      border-color: ${t.border} !important;
    }

    ${isDark ? `
    /* Feedback modal container (.bg-white is hardcoded in the template) */
    .bg-white {
      background-color: ${DARK.modalBg} !important;
      color: ${DARK.text} !important;
    }
    /* Close button and SVG icon inside the modal */
    .text-black { color: ${DARK.text} !important; }
    /* Modal header/footer dividers */
    .border-blueGray-200 { border-color: ${DARK.divider} !important; }
    ` : ''}

    /* Brand loading shimmer */
    .usermessagewaiting-dark,
    .usermessagewaiting-light {
      background-image: linear-gradient(
        to right, ${DARK.brand} 0%, ${LIGHT.brand} 50%, ${DARK.brand} 100%
      ) !important;
    }

    /* Replicate flowise's own "already rated" state (what a page reload shows).
       flowise never updates its in-memory rating during a session, so we apply it
       via CSS keyed off a data-fb-rating marker we set on the action row:
       hide the opposite thumb, keep the chosen one disabled + recolored. */
    [data-fb-rating] button[title="Thumbs Up"],
    [data-fb-rating] button[title="Thumbs Down"] {
      pointer-events: none !important;
      cursor: not-allowed !important;
    }
    [data-fb-rating="up"] button[title="Thumbs Down"],
    [data-fb-rating="down"] button[title="Thumbs Up"] {
      display: none !important;
    }
    [data-fb-rating="up"] button[title="Thumbs Up"] svg,
    [data-fb-rating="up"] button[title="Thumbs Up"] svg * {
      stroke: #006400 !important; /* matches flowise THUMBS_UP color */
    }
    [data-fb-rating="down"] button[title="Thumbs Down"] svg,
    [data-fb-rating="down"] button[title="Thumbs Down"] svg * {
      stroke: #8B0000 !important; /* matches flowise THUMBS_DOWN color */
    }

    /* ── Code blocks: dark panel in BOTH themes + readable text ──
       flowise renders bare <pre><code> with no background and forces white text
       via an inner --bot-markdown-code-color:#FFFFFF, so on the light-mode bubble
       the code was invisible. We give it a dark code panel (like the DevPortal's
       own code blocks) and override the text color with !important, which beats
       flowise's var-based rule regardless of the inner var value. */
    .bot-markdown-content pre {
      position: relative;
      background-color: #1e1e1e !important;
      padding: 12px 42px 12px 14px !important;
      border-radius: 8px !important;
      overflow-x: auto !important;
    }
    .bot-markdown-content pre,
    .bot-markdown-content pre code {
      color: #e8e8e8 !important;
    }
    .bot-markdown-content pre .rsk-code-copy {
      position: absolute;
      top: 8px;
      right: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      border: 1px solid rgba(255, 255, 255, .22);
      border-radius: 6px;
      background-color: rgba(255, 255, 255, .08);
      color: #e8e8e8;
      cursor: pointer;
      opacity: 0;
      transition: opacity .12s ease, background-color .12s ease, color .12s ease, border-color .12s ease;
    }
    .bot-markdown-content pre:hover .rsk-code-copy,
    .bot-markdown-content pre .rsk-code-copy:focus-visible { opacity: 1; }
    .bot-markdown-content pre .rsk-code-copy:hover { background-color: rgba(255, 255, 255, .16); }
    @media (hover: none) {
      .bot-markdown-content pre .rsk-code-copy { opacity: .7; }
    }
    .rsk-code-copy svg { width: 15px; height: 15px; display: block; }
    .rsk-code-copy .rsk-check-ico { display: none; }
    .rsk-code-copy[data-copied] {
      color: #ff9100;
      border-color: #ff9100;
      opacity: 1;
    }
    .rsk-code-copy[data-copied] .rsk-copy-ico { display: none; }
    .rsk-code-copy[data-copied] .rsk-check-ico { display: inline-flex; }

    /* ── Inline code: readable + click-to-copy affordance (chain IDs, RPC URLs, addresses) ── */
    .bot-markdown-content code:not(pre code) {
      position: relative;
      cursor: pointer;
      color: ${isDark ? '#ff9d33' : '#b45309'} !important;
      background-color: ${isDark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.05)'} !important;
      border-radius: 4px;
      padding: 1px 5px;
      transition: background-color .12s ease;
    }
    .bot-markdown-content code:not(pre code):hover {
      background-color: ${isDark ? 'rgba(255,255,255,.14)' : 'rgba(0,0,0,.09)'} !important;
    }
    .bot-markdown-content code:not(pre code)[data-copied]::after {
      content: 'Copied';
      position: absolute;
      bottom: calc(100% + 4px);
      left: 50%;
      transform: translateX(-50%);
      background-color: ${t.brand};
      color: #fff;
      font-size: 11px;
      line-height: 1;
      padding: 3px 6px;
      border-radius: 4px;
      white-space: nowrap;
      pointer-events: none;
      z-index: 10;
    }
  `;
}

function isDarkMode() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

// Tracks when the user opens the chat via the floating bubble button.
//
// The listener is in the CAPTURE phase so it runs BEFORE flowise's own handler
// (SolidJS delegates click on the top-level document, i.e. the bubble phase).
// That's what makes the isChatOpen() check below read the pre-click state, so
// we can tell an open from a close — the toggle does both.
function setupFloatingButtonPatch(shadowRoot) {
  if (shadowRoot._floatingPatched) return;
  shadowRoot._floatingPatched = true;

  shadowRoot.addEventListener('click', (e) => {
    if (!e.target?.closest(TOGGLE_SELECTOR)) return;
    // The click is about to CLOSE the window, not open it.
    if (isChatOpen(shadowRoot)) return;

    pushDataLayer('aiChatbotOpen', { componentId: 'flowise-chatbot-floating-button' });
  }, true);
}

// Patches feedback (thumbs up/down) buttons to disable after a rating is given.
//
// Root cause (flowise-embed 3.1.6): a message's rating is read via
//   c() = messageRatings?.[id] ?? message.rating ?? ""
// but the live click handler never updates messageRatings (prop not wired) nor
// mutates message.rating in memory — it only writes to localStorage. So c() stays
// "" for the whole session, the `if ("" === c())` guard keeps passing, and the
// thumbs stay active → the same response can be rated/submitted repeatedly.
// (On reload it works because message.rating is restored from localStorage.)
//
// flowise renders the thumbs as <button title="Thumbs Up|Thumbs Down">. We mark
// the action row with data-fb-rating="up"|"down" so injected CSS can reproduce the
// rated look (hide the opposite thumb, recolor + disable the chosen one), and also
// toggle the native `disabled` attribute as a non-CSS safeguard.
function setupFeedbackPatch(shadowRoot) {
  if (shadowRoot._feedbackPatched) return;
  shadowRoot._feedbackPatched = true;

  const UP = 'button[title="Thumbs Up"]';
  const DOWN = 'button[title="Thumbs Down"]';
  const THUMB_SEL = `${UP}, ${DOWN}`;

  // Clicking a thumb always creates the feedback record (flowise POSTs and writes
  // localStorage on click, not on comment submit — so a reload shows it rated even
  // without a comment). Reproduce that rated state immediately. Defer to the next
  // tick so flowise's own click handler fires the POST first; disabling the button
  // synchronously here could suppress its handler and the rating would never send.
  shadowRoot.addEventListener('click', (e) => {
    const btn = e.target?.closest(THUMB_SEL);
    if (!btn) return;

    const rating = btn.getAttribute('title') === 'Thumbs Up' ? 'up' : 'down';

    setTimeout(() => {
      // Climb to the nearest ancestor that holds both thumbs (the action row),
      // so the marker covers both buttons regardless of how SolidJS wraps each one.
      let row = btn.parentElement;
      while (row && row !== shadowRoot && row.querySelectorAll(THUMB_SEL).length < 2) {
        row = row.parentElement;
      }
      if (!row || row === shadowRoot) row = btn.parentElement;
      if (!row) return;

      pushDataLayer('aiChatbotFeedback', { componentId: 'flowise-chatbot-feedback', rating });
      row.dataset.fbRating = rating;
      row.querySelectorAll(THUMB_SEL).forEach((b) => { b.disabled = true; });
    }, 0);
  }, true);
}

// SVG icons for the code-block copy button (stroke = currentColor).
const COPY_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
const CHECK_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';

// Copy helper: Clipboard API with a legacy execCommand fallback (non-secure ctx).
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      return true;
    } catch (_) {
      return false;
    }
  }
}

// Transient "copied" state — injected CSS reacts to the data-copied attribute.
function flashCopied(el, ms) {
  el.dataset.copied = '1';
  window.clearTimeout(el._copyTimer);
  el._copyTimer = window.setTimeout(() => {
    delete el.dataset.copied;
  }, ms);
}

// Adds a copy button to every bot code block that doesn't already have one.
// Idempotent AND self-healing: keyed on the presence of OUR button (not a marker
// on <pre>), so if a SolidJS re-render wipes the button, the next observer tick
// re-injects it. flowise's own JSON display blocks (.ndd-json) are left alone.
function injectCopyButtons(root) {
  root.querySelectorAll('.bot-markdown-content pre').forEach((pre) => {
    if (pre.classList.contains('ndd-json')) return;
    if (pre.querySelector(':scope > button[data-rsk-copy-btn]')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'rsk-code-copy';
    btn.setAttribute('data-rsk-copy-btn', '');
    btn.setAttribute('aria-label', 'Copy code');
    btn.setAttribute('title', 'Copy code');
    btn.innerHTML =
      `<span class="rsk-copy-ico" aria-hidden="true">${COPY_SVG}</span>` +
      `<span class="rsk-check-ico" aria-hidden="true">${CHECK_SVG}</span>`;
    pre.appendChild(btn);
  });
}

// Enables copy-to-clipboard inside bot messages:
//   • a copy button on every code block (flowise renders bare <pre><code>)
//   • click-to-copy on inline code (chain IDs, RPC URLs, addresses in backticks)
// Shadow-DOM mutations don't bubble to the document.body observer, so this mounts
// its own observer on the shadow root to (re)inject buttons as messages stream in.
// The click handler is delegated on the shadow root (survives re-renders); the
// visual state is a transient data-copied attribute driven by injected CSS.
function setupCopyPatch(shadowRoot) {
  if (shadowRoot._copyPatched) return;
  shadowRoot._copyPatched = true;

  shadowRoot.addEventListener('click', async (e) => {
    // Code-block copy button (the click may land on the inner <svg>).
    const copyBtn = e.target?.closest('button[data-rsk-copy-btn]');
    if (copyBtn) {
      const code = copyBtn.closest('pre')?.querySelector('code');
      const text = (code?.textContent ?? '').replace(/\n$/, '');
      if (!text) return;
      if (await copyText(text)) {
        const langClass = [...(code?.classList || [])].find((c) => c.startsWith('lang-'));
        pushDataLayer('aiChatbotCodeCopy', {
          componentId: 'flowise-chatbot-code-copy',
          language: langClass ? langClass.slice(5) : 'text',
        });
        flashCopied(copyBtn, 1500);
      }
      return;
    }

    // Inline code → copy its value (skip code inside <pre>; that's the block above).
    const inline = e.target?.closest('code');
    if (inline && !inline.closest('pre') && inline.closest('.bot-markdown-content')) {
      const text = inline.textContent ?? '';
      if (!text.trim()) return;
      if (await copyText(text)) {
        pushDataLayer('aiChatbotValueCopy', { componentId: 'flowise-chatbot-value-copy' });
        flashCopied(inline, 1200);
      }
    }
  });

  // Batch streaming mutations; re-inject buttons as new code blocks appear.
  let scheduled = null;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = window.setTimeout(() => {
      scheduled = null;
      injectCopyButtons(shadowRoot);
    }, 60);
  });
  observer.observe(shadowRoot, { childList: true, subtree: true });
  shadowRoot._copyObserver = observer;

  injectCopyButtons(shadowRoot);
}

// Shields the chat input from single-key shortcuts that belong to the page
// around it. The Vercel Toolbar injected into preview deployments ate the "c" of
// "rootstock" — its Comment shortcut is the bare key "C" — and opened its popup.
//
// Its handler (vercel.live/_next-live/feedback/feedback.js) boils down to:
//   window.addEventListener('keydown', (e) => {
//     const d = e.target;
//     if (e.key && (hasModifier || !d.closest('input,textarea,[contenteditable]')))
//       { runShortcut(); e.preventDefault(); }
//   }, true);
//
// Our input lives in a shadow root, so by the time a listener outside the widget
// sees the event its target has been RETARGETED to the <flowise-chatbot> host,
// and closest() cannot pierce a shadow boundary → the guard concludes that no
// field is focused. (Vercel hit the same wall with their own shadow root and
// special-cased only their own element, VERCEL-LIVE-FEEDBACK, by reading
// shadowRoot.activeElement.)
//
// Listening from inside the widget cannot fix this: their listener sits on
// `window` in the CAPTURE phase — the first stop on the event's path — so it has
// already called preventDefault() before anything in our shadow tree runs.
// Satisfying the guard does work: `[contenteditable]` matches on attribute
// PRESENCE, so contenteditable="false" on the host makes closest() match, and
// "false" is exactly the value that changes nothing about the widget (it is the
// default editability state — the inner textarea stays editable). Modifier
// combos still reach the page, since the guard lets those through anyway.
//
// Takes the host element, not the shadow root: the attribute has to sit on the
// node that events are retargeted to.
function setupKeyShieldPatch(el) {
  el.setAttribute('contenteditable', 'false');
}

// Applies the theme and installs the shadow-DOM patches. Returns false while the
// widget hasn't mounted yet, which is the signal the caller waits on.
function applyTheme() {
  const el = document.querySelector('flowise-chatbot');
  if (!el?.shadowRoot) return false;

  setupFloatingButtonPatch(el.shadowRoot);
  setupFeedbackPatch(el.shadowRoot);
  setupCopyPatch(el.shadowRoot);
  setupKeyShieldPatch(el);

  const dark = isDarkMode();
  const t = dark ? DARK : LIGHT;

  // Update CSS variables on the shadow host so any var()-based rules pick up the change
  el.style.setProperty('--chatbot-container-font-family', "'Rootstock Sans', Arial, sans-serif");
  el.style.setProperty('--chatbot-container-bg-color', t.bg);
  el.style.setProperty('--chatbot-host-bubble-bg-color', t.bubbleBg);
  el.style.setProperty('--chatbot-host-bubble-color', t.text);
  el.style.setProperty('--chatbot-guest-bubble-bg-color', t.brand);
  el.style.setProperty('--chatbot-guest-bubble-color', '#ffffff');
  el.style.setProperty('--chatbot-input-bg-color', t.inputBg);
  el.style.setProperty('--chatbot-input-color', t.text);
  el.style.setProperty('--chatbot-input-placeholder-color', t.placeholder);
  el.style.setProperty('--chatbot-header-bg-color', t.bg);
  el.style.setProperty('--chatbot-header-color', t.text);

  // Update (or create) the injected style tag — !important overrides inline styles
  // set by SolidJS reactive effects inside the shadow DOM
  let style = el.shadowRoot.querySelector('#flowise-fix');
  if (!style) {
    style = document.createElement('style');
    style.id = 'flowise-fix';
    el.shadowRoot.appendChild(style);
  }
  style.textContent = buildShadowCSS(dark);

  // Update the floating button — flowise sets its bg as an inline style.
  // Select it by part attribute: once the chat window is mounted it keeps its own
  // buttons in the DOM, so "first button" could style the wrong control.
  const btn = getToggle(el.shadowRoot);
  if (btn) btn.style.setProperty('background-color', t.brand);

  return true;
}

function FlowiseChatbotInner({ apiHost, chatflowId }) {
  const { colorMode } = useColorMode();

  useEffect(() => {
    let Chatbot = null;
    let bodyObserver = null;
    let themeObserver = null;

    import('flowise-embed/dist/web.js').then(({ default: mod }) => {
      Chatbot = mod;
      Chatbot.init({
        chatflowid: chatflowId,
        apiHost,
        theme: buildTheme(colorMode === 'dark'),
      });

      // Watch data-theme changes on <html> to reapply on mode switch
      themeObserver = new MutationObserver(applyTheme);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });

      // Wait for the flowise-chatbot shadow DOM to be ready. This observes the
      // whole body subtree, so it disconnects the moment the widget mounts —
      // otherwise it would re-run applyTheme on every DOM mutation in the app
      // for the lifetime of the page. Nothing is lost by stopping: theme changes
      // come from themeObserver, and shadow-DOM re-renders are handled by the
      // shadow-root observer in setupCopyPatch (shadow mutations never reach a
      // document.body observer anyway).
      if (!applyTheme()) {
        bodyObserver = new MutationObserver(() => {
          if (!applyTheme()) return;
          bodyObserver.disconnect();
          bodyObserver = null;
        });
        bodyObserver.observe(document.body, { childList: true, subtree: true });
      }
    });

    return () => {
      bodyObserver?.disconnect();
      themeObserver?.disconnect();
      document.querySelector('flowise-chatbot')?.shadowRoot?._copyObserver?.disconnect();
      Chatbot?.destroy();
    };
  }, []);

  return null;
}

export default function FlowiseChatbot() {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const { flowiseApiHost, flowiseChatflowId, flowiseChatbotEnabled } = customFields.keys;

  if (!flowiseChatbotEnabled || !flowiseApiHost || !flowiseChatflowId) return null;

  return (
    <BrowserOnly>
      {() => (
        <FlowiseChatbotInner apiHost={flowiseApiHost} chatflowId={flowiseChatflowId} />
      )}
    </BrowserOnly>
  );
}
