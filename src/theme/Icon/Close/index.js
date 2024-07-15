import React from 'react';
export default function IconClose({
  width = 24,
  height = 24,
  color = 'currentColor',
  strokeWidth = 1.2,
  className,
  ...restProps
}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={width} height={height} {...restProps}>
      <path fillRule="evenodd" clipRule="evenodd" d="m19.3 20.7-16-16 1.4-1.4 16 16-1.4 1.4Z" fill={color}/>
      <path fillRule="evenodd" clipRule="evenodd" d="m3.3 19.3 16-16 1.4 1.4-16 16-1.4-1.4Z" fill={color}/>
    </svg>
  );
}
