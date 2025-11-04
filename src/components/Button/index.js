import React from "react";
import Link from '/src/components/Link';
import clsx from "clsx";

export default function Button ({variant, href, className, size, target, title, icon, stretched, align, children, ...props}) {
  let btnClassName = clsx(`btn`, className, size && `btn-${size}`, stretched && `stretched-link position-static`, align === 'left' && `d-flex w-fit`, align === 'center' && `d-flex w-fit mx-auto`, align === 'right' && `d-flex w-fit ms-auto`)
  // will start with exactly one slash, and that anything else is external.
  if (variant === 'code') {
    align = align || 'right';
    btnClassName = clsx(`btn btn-outline btn-sm btn-muted mb-n8 mt-12`, className, size && `btn-${size}`, stretched && `stretched-link position-static`, align === 'left' && `d-flex w-fit`, align === 'center' && `d-flex w-fit mx-auto`, align === 'right' && `d-flex w-fit ms-auto`)
    target = '_blank'
  }
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
      target={target}
      title={title || null}
      onClick={props.onClick}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
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
