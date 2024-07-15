import React from 'react';

import FooterSocials from "@theme/Footer/Socials";
import FooterTagLine from "@theme/Footer/TagLine";
import AccessibeWidget from "/src/components/AccessibeWidget";
export default function FooterLayout({style, links, logo, copyright}) {

  return (
    <>
      <footer
        className={`footer py-40`}>
        <div className="container">
          <div className="row mb-24 mb-md-32">
            <div className="col-12 col-md-6 mb-24 mb-md-0">
              <FooterTagLine />
            </div>
            <div className="col-12 col-md-6 col-xl-4 offset-xl-2">
              {links}
            </div>
          </div>
          <div className="mb-40">
            <FooterSocials />
          </div>
          {copyright && (
            <div className="fs-14 opacity-50">
              {copyright}
            </div>
          )}
        </div>
      </footer>
      <AccessibeWidget />
    </>

  );
}
