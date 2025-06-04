import React from 'react';

import {ErrorCauseBoundary, useThemeConfig} from "@docusaurus/theme-common";
import {splitNavbarItems} from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";

export default function LocaleDropdown() {

  const items = useThemeConfig().navbar.items;
  const [rightItems] = splitNavbarItems(items);
  return (
    <>
      {rightItems.map((item, i) => item.type === 'localeDropdown' && (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  )
}
