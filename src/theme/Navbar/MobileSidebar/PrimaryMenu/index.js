import React from 'react';
import {ErrorCauseBoundary, useThemeConfig} from '@docusaurus/theme-common';
import {splitNavbarItems, useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import styles from './styles.module.scss';
import clsx from "clsx";

// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();

  const navBarItems = useThemeConfig().navbar.items;
  const [leftItems] = splitNavbarItems(navBarItems);
  console.log(leftItems);
  return (
    <ul className={clsx(styles.mobilePrimaryMenuWrap, 'list-unstyled d-flex flex-wrap gap-8 mb-24 pb-16')}>
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
          <li>
            <NavbarItem
              onClick={() => mobileSidebar.toggle()}
              {...item} />
          </li>
        </ErrorCauseBoundary>
      ))}
    </ul>
  );
}
