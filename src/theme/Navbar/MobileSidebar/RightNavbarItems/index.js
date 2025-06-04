import React from 'react';

import {ErrorCauseBoundary, useThemeConfig} from "@docusaurus/theme-common";
import {splitNavbarItems} from "@docusaurus/theme-common/internal";
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';

export default function RightNavbarItems() {
  const items = useThemeConfig().navbar.items;
  const [rightItems] = splitNavbarItems(items);

  return rightItems?.length && (
    <div className={`d-flex gap-24 align-items-center`}>
      {rightItems.map((item, i) => (
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
          <Link className={`link-base`} to={item.href} target={!isInternalUrl(item.href) ? "_blank" : 'null'} rel={!isInternalUrl(item.href) ? `noopener noreferrer` : null} aria-label={item.label}>
            {item.icon ? (
              <svg width={24} height={24}>
                <use xlinkHref={`#icon-${item.icon}-solid`} />
              </svg>
            ) : item.label}
          </Link>
        </ErrorCauseBoundary>
      ))}
    </div>
  );
}
