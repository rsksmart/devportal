import React from 'react';

import {useDoc} from '@docusaurus/theme-common/internal';

import DocItemTOCDesktop from "@theme/DocItem/TOC/Desktop";
import {useWindowSize} from "@docusaurus/theme-common";

import {FeedbackForm} from "/src/components/FeedbackForm";
import {ShareButtons} from "/src/components/ShareButtons";

import MoreActions from "@theme/DocItem/MoreActions";

import clsx from "clsx";
import styles from './styles.module.scss';
import { ToTopButton } from '../../../components/ToTopButton'

const DocTOCDesktop = () => {
	const {frontMatter, toc} = useDoc();
	const windowSize = useWindowSize();
	const hidden = frontMatter.hide_table_of_contents;
	const canRender = !hidden && toc.length > 0;
	return 		canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
		<DocItemTOCDesktop/>
	) : undefined;
}
export default function DocItemAside() {

	return <div className={clsx(styles.docItemAside, `h-100 pt-40 pt-lg-0 ps-lg-24`)}>
		<div className={clsx(styles.docItemAsideInner, `d-flex flex-column gap-48 justify-content-between`)}>
			{DocTOCDesktop()}
      <MoreActions />
      <FeedbackForm />
			<div className={`flex-grow-1 position-relative d-flex flex-column`}>
				<div className={clsx(styles.docItemAsideBottom, 'position-sticky mt-auto')}>
					<ShareButtons />
          <ToTopButton className="mt-24"/>
				</div>
			</div>
 		</div>
	</div>
}
