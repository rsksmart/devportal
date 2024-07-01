import React from "react";
import clsx from "clsx";
import styles from './styles.module.scss';

export default function Quote ({caption, children, className, ...props}) {

  return <blockquote
    className={clsx(`p-16 p-md-40 rounded-16 border`, styles.Qoute, className)}
    {...props}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`mb-24 d-block`}>
      <path
        d="M5.7 18 8 14c-1.1 0-2.04-.4-2.83-1.18A3.85 3.85 0 0 1 4 10c0-1.1.4-2.04 1.17-2.83A3.85 3.85 0 0 1 8 6c1.1 0 2.04.4 2.82 1.17A3.85 3.85 0 0 1 12 10a3.9 3.9 0 0 1-.55 2L8 18H5.7Zm9 0 2.3-4c-1.1 0-2.04-.4-2.82-1.18A3.85 3.85 0 0 1 13 10c0-1.1.4-2.04 1.18-2.83A3.85 3.85 0 0 1 17 6c1.1 0 2.04.4 2.82 1.17A3.85 3.85 0 0 1 21 10a3.9 3.9 0 0 1-.55 2L17 18h-2.3Z"
        fill="currentColor"/>
    </svg>
    {children}
    {caption && <footer className="mt-24">– {caption}</footer>}
  </blockquote>
}
