import React from "react";
import clsx from "clsx";

export default function TitleColor ({as = "h3", color = "orange", size = "md", children, className, ...props}) {
  const Tag = ['h1', 'h2', 'h3', 'h4', 'p', 'div', 'span'].includes(as) && as;

  return <Tag
    className={clsx(`fp-title-color`, `fp-title-color-${size}`, className)}
  >
    <span className={`bg-${color}`}>
      {children}
    </span>
  </Tag>
}
