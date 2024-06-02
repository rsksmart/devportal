import React from 'react';
import {useThemeConfig} from "@docusaurus/theme-common";

export default function FooterTagLine() {
  const {tagline} = useThemeConfig();

  return (tagline?.text1 || tagline?.text2) && (
    <div className="d-flex flex-column align-items-start gap-6 gap-md-8">
      {tagline?.text1 && (
        <span className="h1 m-0 fs-32 fs-md-52 bg-brand-5 text-black p-6 p-md-8 letter-spacing-6">{tagline?.text1}</span>
      )}
      {tagline?.text2 && (
        <span className="h1 m-0 fs-32 fs-md-52 bg-brand-1 text-black p-6 p-md-8 letter-spacing-6">{tagline?.text2}</span>
      )}
    </div>
  )
}
