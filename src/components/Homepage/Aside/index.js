import React from 'react';

import {ShareButtons} from "/src/components/ShareButtons";
import { ToTopButton } from '/src/components/ToTopButton'

import styles from './styles.module.scss';
import clsx from "clsx";
import {FeedbackForm} from "/src/components/FeedbackForm";
import MoreActions from "@theme/DocItem/MoreActions";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Translate from '@docusaurus/Translate';

export default function Aside({editUrl}){
  const {siteConfig} = useDocusaurusContext();
  let homePageEditUrl = siteConfig?.customFields?.homePage?.editUrl ? `${siteConfig?.customFields?.homePage.editUrl}/src/pages/index.js` : null;

  //TODO fix for usign outside DocProvider and other pages
  if (editUrl === null) {
    homePageEditUrl = null;
  }
  return <div className={clsx(styles.docItemAside, `h-100 pt-40 pt-lg-0 ps-lg-24`)}>
    <div className={clsx(styles.docItemAsideInner, `d-flex flex-column gap-24 gap-lg-48 justify-content-between`)}>
      <MoreActions editUrl={homePageEditUrl}/>
      <div className="d-flex d-lg-block flex-column flex-md-row align-items-md-end gap-24">
        <FeedbackForm/>

        <div className="order-md-first d-lg-none">
          <h4 className={`title-s mb-16`}>
            <Translate
              id="theme.DocItem.Header.shareLabel">
              Share
            </Translate>
          </h4>
          <ShareButtons className={`align-items-center d-flex gap-24`}/>
        </div>

      </div>
      <div className={`flex-grow-1 position-relative d-none d-lg-flex flex-column`}>
        <div className={clsx(styles.docItemAsideBottom, 'position-sticky mt-auto')}>
          <ShareButtons/>
          <ToTopButton className="mt-24"/>
        </div>
      </div>
    </div>
  </div>
}
