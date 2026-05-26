import React from 'react';
import clsx from 'clsx';

export default function IconFaucet({className, ...restProps}) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16"
         fill="currentColor"
         className={clsx(className)}
         aria-hidden="true"
         {...restProps}>
      <path d="M8 1.5C6.8 3.2 4 6.2 4 9a4 4 0 0 0 8 0c0-2.8-2.8-5.8-4-7.5Z"/>
      <path d="M8 11.5a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 1 0v2a.5.5 0 0 1-.5.5Z" opacity=".6"/>
    </svg>
  )
}
