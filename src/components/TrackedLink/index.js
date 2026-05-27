import React from 'react';
import Link from '/src/components/Link';
import { pushDataLayer } from '/src/_utils/analytics';

export default function TrackedLink({ href, event, componentId, componentLabel, children, ...props }) {
  return (
    <Link
      href={href}
      onClick={() => pushDataLayer(event || 'linkClick', {
        componentId,
        componentLabel: componentLabel || (typeof children === 'string' ? children : ''),
      })}
      {...props}
    >
      {children}
    </Link>
  );
}
