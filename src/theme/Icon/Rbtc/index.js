import React from 'react';
import clsx from 'clsx';

export default function IconRbtc({className, ...restProps}) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16"
         fill="currentColor"
         className={clsx(className)}
         aria-hidden="true"
         {...restProps}>
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9.2 4.5H7.1c-1.1 0-2 .6-2 1.5s.9 1.5 2 1.5h1.4c1.1 0 2 .6 2 1.5s-.9 1.5-2 1.5H6.8"/>
      <path d="M8 3.5v1M8 11v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
