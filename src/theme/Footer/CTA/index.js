import React from 'react';
import styles from './styles.module.scss';
import clsx from "clsx";
import {ThemeClassNames} from "@docusaurus/theme-common";

export default function FooterCTA() {
  const cta = {
    url: 'https://dev.rootstock.io/resources/contribute/writing-contests/',
    target : '_blank',
    title: 'Applications to the Wave IV of Grants are open! Apply now for a share of $2.5m in funding to build your next project on Rootstock',
  }

  return (
    <div className="bg-purple text-black p-14 text-center">
      <a href={cta.url} target={cta?.target || '_self'} className={clsx(
        styles.footerCtaLink,
        `fw-700`,
      )}>
        {cta.title}
      </a>
    </div>
  );
}
