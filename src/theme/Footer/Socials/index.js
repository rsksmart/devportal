import React from 'react';
import styles from './styles.module.scss';
import {useThemeConfig} from "@docusaurus/theme-common";

export default function FooterSocials() {
  const {socials} = useThemeConfig();

  return socials && (
    <div className={`d-flex align-items-center gap-32 ${styles.footerSocials}`}>
      {Object.entries(socials).map(([id, url]) => (
        <a key={id} aria-label={id} href={url} target="_blank" rel="noopener noreferrer">
          <svg width="32" height="32">
            <use xlinkHref={`#icon-${id}-solid`}></use>
          </svg>
        </a>
      ))}
    </div>
  )
}
