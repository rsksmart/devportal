import React from 'react';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import TOC from '@theme/TOC';
import Translate from '@docusaurus/Translate';
import RemixLaunchButton from '/src/components/RemixLaunchButton';
import RemixLaunchMenu from '/src/components/RemixLaunchMenu';

export default function DocItemTOCDesktop() {
  const {toc, frontMatter} = useDoc();
  // Surface Remix launch controls above "On this page" so readers don't have to
  // scroll to the end of the guide. A page can set either:
  //   remix: <deep-link>            -> single "Try in Remix IDE" button
  //   remix_contracts: [{label, remix}, ...] -> a dropdown of contracts
  const remixDeepLink = frontMatter.remix;
  const remixContracts = frontMatter.remix_contracts;
  return <div>
	  {Array.isArray(remixContracts) && remixContracts.length > 0 ? (
		  <div className="mb-24">
			  <RemixLaunchMenu
				  contracts={remixContracts}
				  label={frontMatter.remix_label || 'Try in Remix IDE'}
			  />
		  </div>
	  ) : remixDeepLink && (
		  <div className="mb-24">
			  <RemixLaunchButton
				  deepLink={remixDeepLink}
				  label={frontMatter.remix_label || 'Try in Remix IDE'}
				  className="btn btn-primary btn-sm w-100"
			  />
		  </div>
	  )}
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
