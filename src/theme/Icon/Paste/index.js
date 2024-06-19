import React from 'react';
import clsx from 'clsx';

export default function IconPaste({className, ...restProps}) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16"
         fill="currentColor"
         className={clsx(className)}
         aria-hidden="true"
         {...restProps}>
      <path d="M9 9H5v1h4V9ZM11 6.5H5v1h6v-1ZM7.5 11.5H5v1h2.5v-1Z"/>
      <path d="M12.5 2.5H11V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v.5H3.5a1 1 0 0 0-1 1V14a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V3.5a1 1 0 0 0-1-1ZM6 2h4v2H6V2Zm6.5 12h-9V3.5H5V5h6V3.5h1.5V14Z"/>
    </svg>
  )
}
