import React from 'react';
import clsx from 'clsx';

export default function IconCommunity({className, ...restProps}) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16"
         fill="currentColor"
         className={clsx(className)}
         aria-hidden="true"
         {...restProps}>
      <path
        d="M13 7h-1v1h1a1.5 1.5 0 0 1 1.5 1.5v2h1v-2A2.5 2.5 0 0 0 13 7ZM12 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0-1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM11.5 15h-1v-1A1.5 1.5 0 0 0 9 12.5H7A1.5 1.5 0 0 0 5.5 14v1h-1v-1A2.5 2.5 0 0 1 7 11.5h2a2.5 2.5 0 0 1 2.5 2.5v1ZM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0-1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM4 7H3A2.5 2.5 0 0 0 .5 9.5v2h1v-2A1.5 1.5 0 0 1 3 8h1V7ZM4 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0-1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"/>
    </svg>
  )
}
