import React from 'react';
import clsx from 'clsx';

export default function IconChangelog({className, ...restProps}) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16"
         fill="currentColor"
         className={clsx(className)}
         aria-hidden="true"
         {...restProps}>
      <path
        d="M14.25 16a1.74 1.74 0 0 1-1.24-.51l-2.06-2.07a3.25 3.25 0 0 1-3.68-4.47l.3-.67 2.08 2.07a.51.51 0 0 0 .7 0 .5.5 0 0 0 0-.7L8.28 7.57l.67-.3a3.25 3.25 0 0 1 4.47 3.68L15.5 13A1.75 1.75 0 0 1 14.25 16Zm-3.02-3.7 2.49 2.48a.77.77 0 0 0 1.06 0 .75.75 0 0 0 0-1.06l-2.48-2.49.09-.29A2.25 2.25 0 0 0 10.12 8l.94.94a1.5 1.5 0 0 1 0 2.12 1.54 1.54 0 0 1-2.12 0L8 10.12v.13a2.25 2.25 0 0 0 2.94 2.14l.3-.1Z"/>
      <path d="M12.5 2.5H11V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v.5H3.5a1 1 0 0 0-1 1V14a1 1 0 0 0 1 1H7v-1H3.5V3.5H5V5h6V3.5h1.5V6h1V3.5a1 1 0 0 0-1-1ZM10 4H6V2h4v2Z"/>
    </svg>
  )
}
