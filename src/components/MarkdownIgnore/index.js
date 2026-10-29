import React from 'react';

/**
 * Wraps verbose human-only sections. The markdown export pipeline and afdocs
 * parity checks skip nodes marked with data-markdown-ignore.
 */
export default function MarkdownIgnore({children}) {
  return <div data-markdown-ignore="true">{children}</div>;
}
