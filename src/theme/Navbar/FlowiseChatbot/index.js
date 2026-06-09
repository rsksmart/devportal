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
  `;
}

function isDarkMode() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

function applyTheme() {
  const el = document.querySelector('flowise-chatbot');
  if (!el?.shadowRoot) return;

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
