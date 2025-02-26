import React from "react";
import LinkDoc from '@docusaurus/Link';

export default function Link ({href, className, target, title, children, ...props}) {
  // will start with exactly one slash, and that anything else is external.
  const isInternal = /^\/(?!\/)/.test(href);
  return (
    <LinkDoc
      href={href}
      className={className}
      target={target || (!isInternal ? `_blank` : `_self`)}
      rel={(!isInternal || target === `_blank`) ? `noopener noreferrer` : null}
      title={title || null}
      onClick={props.onClick}
      {...props}
    >
      {children}
    </LinkDoc>
  )
}
