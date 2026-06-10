import React from 'react';
import { pushDataLayer } from '/src/_utils/analytics';

function openChat() {
  pushDataLayer('aiChatbotOpen', { componentId: 'flowise-chatbot-button' });
  document
    .querySelector('flowise-chatbot')
    ?.shadowRoot
    ?.querySelector('button')
    ?.click();
}

export default function FlowiseButton() {
  return (
    <button
      className="link-base"
      onClick={openChat}
      aria-label="Open AI Assistant"
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        color: 'inherit',
      }}
    >
      <svg width={24} height={24} aria-hidden="true">
        <use xlinkHref="#icon-chat" />
      </svg>
    </button>
  );
}
