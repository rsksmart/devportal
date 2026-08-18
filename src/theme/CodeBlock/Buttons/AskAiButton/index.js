import React, { useCallback, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useCodeBlockContext } from '@docusaurus/theme-common/internal';
import Button from '@theme/CodeBlock/Buttons/Button';
import IconSuccess from '@theme/Icon/Success';
import { pushDataLayer } from '/src/_utils/analytics';
import { openChatWithPrompt, buildPrompt, findNearestHeading } from './askFlowise';
import styles from './styles.module.css';

function title() {
  return translate({
    id: 'theme.CodeBlock.askAi',
    message: 'Ask Rootstock AI',
    description: 'The Ask AI button label on code blocks',
  });
}

function ariaLabel() {
  return translate({
    id: 'theme.CodeBlock.askAiButtonAriaLabel',
    message: 'Ask the Rootstock AI Assistant about this code',
    description: 'The ARIA label for the Ask AI code block button',
  });
}

function AskAiIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false">
      <path d="M12 2l1.85 5.15L19 9l-5.15 1.85L12 16l-1.85-5.15L5 9l5.15-1.85L12 2z" />
      <path
        d="M18.5 14l.95 2.55L22 17.5l-2.55.95L18.5 21l-.95-2.55L15 17.5l2.55-.95L18.5 14z"
        opacity="0.65"
      />
    </svg>
  );
}

export default function AskAiButton({ className }) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const { flowiseApiHost, flowiseChatflowId, flowiseChatbotEnabled } = customFields.keys;
  const {
    metadata: { code, language },
  } = useCodeBlockContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const feedbackTimeout = useRef(undefined);

  const onClick = useCallback(
    async (e) => {
      const blockEl = e.currentTarget.closest('.theme-code-block');
      const heading = findNearestHeading(blockEl);
      const prompt = buildPrompt({ code, language, heading });

      pushDataLayer('aiChatbotAskFromCode', {
        componentId: 'code-block-ask-ai',
        language: language || 'text',
      });

      // Open the chat and prefill the question — the user reviews it and sends.
      // Only flash the confirmation once it actually landed in the widget, so
      // the check mark never lies if the chatbot isn't ready yet.
      const ok = await openChatWithPrompt(prompt);
      if (!ok) return;

      setIsLoaded(true);
      window.clearTimeout(feedbackTimeout.current);
      feedbackTimeout.current = window.setTimeout(() => setIsLoaded(false), 1500);
    },
    [code, language],
  );

  useEffect(() => () => window.clearTimeout(feedbackTimeout.current), []);

  // No point showing the button when the Flowise widget isn't configured
  // (mirrors the guard in src/theme/Navbar/FlowiseChatbot/index.js).
  if (!flowiseChatbotEnabled || !flowiseApiHost || !flowiseChatflowId) return null;

  return (
    <Button
      aria-label={ariaLabel()}
      title={title()}
      className={clsx(
        className,
        styles.askAiButton,
        isLoaded && styles.askAiButtonSent,
      )}
      onClick={onClick}>
      <span className={styles.askAiButtonIcons} aria-hidden="true">
        <AskAiIcon className={styles.askAiButtonIcon} />
        <IconSuccess className={styles.askAiButtonSuccessIcon} />
      </span>
    </Button>
  );
}
