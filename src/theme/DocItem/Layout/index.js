import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames, useWindowSize} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';

import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import Unlisted from '@theme/Unlisted';
import styles from './styles.module.css';

import DocItemAside from "../Aside";
import EditMetaRow from "@theme/EditMetaRow";
import ReadingTime from "../ReadingTime";
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
  const {
    metadata: {unlisted},
  } = useDoc();

  return (
    <div className="row gx-0">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        {unlisted && <Unlisted />}
        <DocVersionBanner />
        <div className={clsx(styles.docItemContainer, `px-lg-24`)}>
          <article>
            <div className="d-flex gap-24 justify-content-between align-items-start mb-24">
              <DocBreadcrumbs />
              <ReadingTime />
            </div>
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
          <EditMetaRow />
        </div>
      </div>
      <div className="col col--3">
			  <DocItemAside />
      </div>
    </div>
  );
}
