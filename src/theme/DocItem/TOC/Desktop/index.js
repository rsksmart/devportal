import React from 'react';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
import TOC from '@theme/TOC';
import Translate from '@docusaurus/Translate';

export default function DocItemTOCDesktop() {
  const {toc, frontMatter} = useDoc();
  return <div>
	  <h4 className={`title-s mb-30 text-uppercase`}>
		  <Translate
			  id="theme.TOCCollapsible.toggleButtonLabel"
			  description="The label used by the button on the collapsible TOC component">
			  On this page
		  </Translate>
	  </h4>
	  <TOC
		  toc={toc}
		  minHeadingLevel={frontMatter.toc_min_heading_level}
		  maxHeadingLevel={frontMatter.toc_max_heading_level}
		  className={ThemeClassNames.docs.docTocDesktop}
	  />
  </div>
}
