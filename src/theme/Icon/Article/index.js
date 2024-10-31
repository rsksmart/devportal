import React from 'react';
import clsx from 'clsx';

export default function IconArticle ({ className, ...restProps }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24"
         fill="currentColor"
         className={clsx(className)}
         aria-hidden="true"
         {...restProps}>
        <path d="m19.27 6.97-5.24-5.25a.68.68 0 0 0-.53-.22H6c-.83 0-1.5.67-1.5 1.5v18c0 .82.67 1.5 1.5 1.5h12c.82 0 1.5-.68 1.5-1.5V7.5a.68.68 0 0 0-.23-.53ZM13.5 3.3l4.2 4.2h-4.2V3.3ZM18 21H6V3h6v4.5c0 .82.68 1.5 1.5 1.5H18v12Z"/>
        <path d="M16.5 16.5h-9V18h9v-1.5ZM16.5 12h-9v1.5h9V12Z"/>
    </svg>
  )
}
