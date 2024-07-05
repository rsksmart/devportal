import React from 'react';
import {useWindowSize} from '@docusaurus/theme-common';
import DocSidebarDesktop from '@theme/DocSidebar/Desktop';
import DocSidebarMobile from '@theme/DocSidebar/Mobile';
export default function DocSidebar(props) {
  const windowSize = useWindowSize();
  // Mobile sidebar not visible on hydration: can avoid SSR rendering
  const shouldRenderSidebarMobile = windowSize === 'mobile';
  return (
    <>
      <DocSidebarDesktop {...props} />
      {shouldRenderSidebarMobile && <DocSidebarMobile {...props} />}
    </>
  );
}
