import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
export default function TOCCollapsibleCollapseButton({collapsed, title, ...props}) {
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        'clean-btn',
        styles.tocCollapsibleButton,
        !collapsed && styles.tocCollapsibleButtonExpanded,
        props.className,
      )}>
      <span>{title}</span>
    </button>
  );
}
