import React from 'react';
import {ErrorCauseBoundary, useThemeConfig} from "@docusaurus/theme-common";
import NavbarItem from "@theme/NavbarItem";
import {splitNavbarItems} from "@docusaurus/theme-common/internal";

export default function MainNavDesktop() {
  const navBarItems = useThemeConfig().navbar.items;
  const [leftItems, rightItems] = splitNavbarItems(navBarItems);

  return (
    <>
      <div className="container pb-lg-60 pt-lg-28 pb-24 d-none d-md-block">
        <div className="d-flex gap-10 flex-wrap">
          {leftItems.map((item, i) => (
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
        </div>
      </div>
    </>
  );
}
