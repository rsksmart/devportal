import React from 'react';
import {translate} from '@docusaurus/Translate';
import IconArrow from '@theme/Icon/Arrow';
import styles from './styles.module.css';
export default function DocRootLayoutSidebarExpandButton({toggleSidebar}) {
  return (
    <div
      className={styles.expandButton}
      title={translate({
        id: 'theme.docs.sidebar.expandButtonTitle',
        message: 'Expand sidebar',
        description:
          'The ARIA label and title attribute for expand button of doc sidebar',
      })}
      aria-label={translate({
        id: 'theme.docs.sidebar.expandButtonAriaLabel',
        message: 'Expand sidebar',
        description:
          'The ARIA label and title attribute for expand button of doc sidebar',
      })}
      tabIndex={0}
      role="button"
      onKeyDown={toggleSidebar}
      onClick={toggleSidebar}>
      <svg className={styles.expandButtonIcon} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M17.7 17.7a1 1 0 0 0 0-1.4L13.42 12l4.3-4.3a1 1 0 0 0-1.42-1.4L10.6 12l5.7 5.7a1 1 0 0 0 1.42 0ZM8 6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1Z" fill="currentColor"/>
      </svg>
    </div>
  );
}
