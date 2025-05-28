import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames, useWindowSize} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';

import DocItemContent from '@theme/DocItem/Content';

import ContentVisibility from '@theme/ContentVisibility';

import styles from './styles.module.css';

import DocItemAside from "@theme/DocItem/Aside";
import EditMetaRow from "@theme/EditMetaRow";

import DocItemHeaderDesktop from "@theme/DocItem/Header/Desktop";
import DocItemHeaderMobile from "@theme/DocItem/Header/Mobile";

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const {frontMatter, toc} = useDoc();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;
  const mobile = canRender ? <DocItemTOCMobile /> : undefined;

  return {
    hidden,
    mobile
  };
}
export default function DocItemLayout({children}) {
  const docTOC = useDocTOC();
  const { metadata } = useDoc();

  return (
    <div className="row gx-0">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />

        <DocVersionBanner />
        <div className={clsx(styles.docItemContainer, `ps-md-24 px-lg-24`)}>
          <article>
            <DocItemHeaderDesktop />
            <DocItemHeaderMobile />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
          <EditMetaRow />
        </div>
      </div>
      <div className="col col--3 d-none d-lg-block">
			  <DocItemAside />
      </div>
    </div>
  );
}
