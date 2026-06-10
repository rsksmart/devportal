import React, { useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';

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
      welcomeMessage: 'Hi! How can I help you with Rootstock development today?',
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
  `;
}

function isDarkMode() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
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

      row.dataset.fbRating = rating;
      row.querySelectorAll(THUMB_SEL).forEach((b) => { b.disabled = true; });
    }, 0);
  }, true);
}

function applyTheme() {
  const el = document.querySelector('flowise-chatbot');
  if (!el?.shadowRoot) return;

  setupFeedbackPatch(el.shadowRoot);

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

  // Update the floating button — flowise sets its bg as an inline style
  const btn = el.shadowRoot.querySelector('button');
  if (btn) btn.style.setProperty('background-color', t.brand);
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

      // Wait for the flowise-chatbot shadow DOM to be ready
      bodyObserver = new MutationObserver(applyTheme);
      bodyObserver.observe(document.body, { childList: true, subtree: true });

      // Watch data-theme changes on <html> to reapply on mode switch
      themeObserver = new MutationObserver(applyTheme);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });

      applyTheme();
    });

    return () => {
      bodyObserver?.disconnect();
      themeObserver?.disconnect();
      Chatbot?.destroy();
    };
  }, []);

  return null;
}

export default function FlowiseChatbot() {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const { flowiseApiHost, flowiseChatflowId } = customFields.keys;

  if (!flowiseApiHost || !flowiseChatflowId) return null;

  return (
    <BrowserOnly>
      {() => (
        <FlowiseChatbotInner apiHost={flowiseApiHost} chatflowId={flowiseChatflowId} />
      )}
    </BrowserOnly>
  );
}
