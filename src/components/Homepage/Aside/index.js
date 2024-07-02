import React from 'react';

import {ShareButtons} from "/src/components/ShareButtons";

import styles from './styles.module.scss';
import clsx from "clsx";
import {FeedbackForm} from "/src/components/FeedbackForm";
import MoreActions from "@theme/DocItem/MoreActions";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Aside() {
  const {siteConfig} = useDocusaurusContext();
  const {editUrl} = siteConfig?.customFields?.homePage || {};

	return <div className={clsx(styles.docItemAside, `h-100 pt-40 pt-lg-0 ps-lg-24`)}>
		<div className={clsx(styles.docItemAsideInner, `d-flex flex-column gap-48 justify-content-between`)}>
      <MoreActions editUrl={`${editUrl}/src/pages/index.js`} />
      <FeedbackForm />
			<div className={`flex-grow-1 position-relative d-flex flex-column`}>
				<div className={clsx(styles.docItemAsideBottom, 'position-sticky mt-auto')}>
					<ShareButtons />
				</div>
			</div>
 		</div>
	</div>
}
