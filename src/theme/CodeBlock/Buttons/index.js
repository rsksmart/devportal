/**
 * Swizzled from @docusaurus/theme-classic to add an "Ask Rootstock AI"
 * button alongside the default word-wrap and copy buttons. Everything else
 * is kept identical to the upstream component.
 */
import React from 'react';
import clsx from 'clsx';
import BrowserOnly from '@docusaurus/BrowserOnly';
import CopyButton from '@theme/CodeBlock/Buttons/CopyButton';
import WordWrapButton from '@theme/CodeBlock/Buttons/WordWrapButton';
import AskAiButton from './AskAiButton';
import styles from './styles.module.css';

// Code block buttons are not server-rendered on purpose
// Adding them to the initial HTML is useless and expensive (due to JSX SVG)
// They are hidden by default and require React to become interactive
export default function CodeBlockButtons({ className }) {
  return (
    <BrowserOnly>
      {() => (
        <div className={clsx(className, styles.buttonGroup)}>
          <WordWrapButton />
          <AskAiButton />
          <CopyButton />
        </div>
      )}
    </BrowserOnly>
  );
}
