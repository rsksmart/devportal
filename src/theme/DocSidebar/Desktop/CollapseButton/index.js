import React from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.scss';
export default function CollapseButton({onClick}) {
  return (
    <button
      type="button"
      title={translate({
        id: 'theme.docs.sidebar.collapseButtonTitle',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      aria-label={translate({
        id: 'theme.docs.sidebar.collapseButtonAriaLabel',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      className={clsx(
        styles.collapseSidebarButton,
      )}
      onClick={onClick}>
      <svg className={styles.collapseSidebarButtonIcon} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M17.7 17.7a1 1 0 0 0 0-1.4L13.42 12l4.3-4.3a1 1 0 0 0-1.42-1.4L10.6 12l5.7 5.7a1 1 0 0 0 1.42 0ZM8 6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1Z" fill="currentColor"/>
      </svg>
    </button>
  );
}
