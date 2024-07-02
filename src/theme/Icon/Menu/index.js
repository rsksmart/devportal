import React from 'react';
export default function IconMenu({
  width = 24,
  height = 24,
  className,
  ...restProps
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...restProps}>
      <path fill="currentColor" d="M2 8h20v2H2zM2 14h20v2H2z"/>
    </svg>
  );
}
