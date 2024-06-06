import React from 'react';
import clsx from 'clsx';
import {useDocsSidebar} from '@docusaurus/theme-common/internal';
import styles from './styles.module.css';
export default function DocRootLayoutMain({hiddenSidebarContainer, children}) {
  const sidebar = useDocsSidebar();
  return (
    <main
      className={clsx(
        styles.docMainContainer,
        (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced,
      )}>
      <div
        className={clsx(
          'px-0 w-100',
          styles.docItemWrapper,
          hiddenSidebarContainer && styles.docItemWrapperEnhanced,
        )}>
        {children}
      </div>
    </main>
  );
}
