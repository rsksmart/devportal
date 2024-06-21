import React, {useState, useEffect} from "react";
import Link from '@docusaurus/Link';
import clsx from "clsx";

export default function Button ({variant, href, className, size, target, title, icon, children, ...props}) {
  const btnClassName = clsx(`btn`, className, size && `btn-${size}`);
  const Icon = () => {
    return icon && (
      <svg width={16} height={16}>
        <use xlinkHref={`#icon-${icon}`}/>
      </svg>
    )
  }
  return href ? (
    <Link
      href={href}
      className={btnClassName}
      target={target || `_self`}
      rel={target === `_blank` ? `noopener noreferrer` : null}
      title={title || null}
      onClick={props.onClick}
    >
      <Icon />
      {children}
    </Link>
  ) : (
    <button
      type={`button`}
      className={btnClassName}
      title={title || null}
      onClick={props.onClick}
    >
      <Icon />
      {children}
    </button>
  )
}
