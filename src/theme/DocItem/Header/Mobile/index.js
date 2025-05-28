import React from 'react';
import clsx from 'clsx';
import {Collapsible, ThemeClassNames, useCollapsible, useWindowSize} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Translate from '@docusaurus/Translate';

import styles from './styles.module.scss';
import DocBreadcrumbs from "@theme/DocBreadcrumbs";
import CollapseButton from "@theme/DocItem/Header/Mobile/CollapseButton";

import {FeedbackForm} from "/src/components/FeedbackForm";
import {ShareButtons} from "/src/components/ShareButtons";

import MoreActions from "@theme/DocItem/MoreActions";

export default function DocItemHeaderMobile() {
  const windowSize = useWindowSize();
  // Mobile sidebar not visible on hydration: can avoid SSR rendering
  const shouldRenderOnMobile = windowSize === 'mobile';
  const {frontMatter, metadata} = useDoc();
  const title = frontMatter?.sidebar_label || metadata.title;
  const {collapsed, toggleCollapsed} = useCollapsible({
    initialState: true,
  });
  return shouldRenderOnMobile && (
    <div className={clsx(styles.DocItemMetaMobileWrap)}>
      <CollapseButton className={`subtitle-1`} title={title} collapsed={collapsed} onClick={toggleCollapsed}/>
      <Collapsible
        lazy
        collapsed={collapsed}>
        <div className="pb-24 d-flex flex-column gap-24">
          <DocBreadcrumbs/>
          <MoreActions/>
          <div className="d-flex flex-column flex-md-row align-items-md-end gap-24">
            <FeedbackForm/>

            <div className="order-md-first">
              <h4 className={`title-s mb-16`}>
                <Translate
                  id="theme.DocItem.Header.shareLabel">
                  Share
                </Translate>
              </h4>
              <ShareButtons className={`align-items-center d-flex gap-24`}/>
            </div>
          </div>
        </div>
      </Collapsible>
    </div>
  );
}
