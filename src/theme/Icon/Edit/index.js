import React from 'react';
import clsx from 'clsx';

export default function IconEdit({className, ...restProps}) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16"
         fill="currentColor"
         className={clsx(className)}
         aria-hidden="true"
         {...restProps}>
      <path d="M15 13H1v1h14v-1ZM12.7 4.5c.4-.4.4-1 0-1.4l-1.8-1.8c-.4-.4-1-.4-1.4 0L2 8.8V12h3.2l7.5-7.5ZM10.2 2 12 3.8l-1.5 1.5-1.8-1.8L10.2 2ZM3 11V9.2l5-5L9.8 6l-5 5H3Z"/>
    </svg>
  )
}
