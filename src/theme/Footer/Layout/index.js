import React from 'react';
import clsx from 'clsx';
import FooterCTA from "../CTA";
export default function FooterLayout({style, links, logo, copyright}) {

  return (
    <>
      <FooterCTA />
      <footer
        className={clsx('footer', {
          'footer--dark': style === 'dark',
        })}>
        <div className="container">
          {links}
          {(logo || copyright) && (
            <div className="footer__bottom text--center">
              {logo && <div className="margin-bottom--sm">{logo}</div>}
              {copyright}
            </div>
          )}
        </div>
      </footer>
    </>

  );
}
