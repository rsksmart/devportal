import React from 'react';
import {useThemeConfig} from "@docusaurus/theme-common";
import TitleColor from "/src/components/TitleColor";
export default function FooterTagLine() {
  const {tagline} = useThemeConfig();

  return (tagline?.text1 || tagline?.text2) && (
    <div className="d-flex flex-column align-items-start gap-2 gap-md-2">
      {tagline?.text1 && (
        <TitleColor
          as={`span`}
          size={'md'}
          color={`pink`}
        >
          {tagline?.text1}
        </TitleColor>
      )}
      {tagline?.text2 && (
        <TitleColor
          as={`span`}
          size={'md'}
          color={`orange`}
        >
          {tagline?.text2}
        </TitleColor>
      )}
    </div>
  )
}
