import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';

import {findSidebarItemIndex} from '/src/_utils/hooks.js';
import {useDocsSidebar} from "@docusaurus/theme-common/internal";

export default function PaginatorNavLink(props) {
  const {permalink, title, subLabel, isNext, isBlog} = props;
  const sidebar = isBlog ? null : useDocsSidebar();

  return (
    <Link
      className={clsx(
        styles.paginatorLink,
        'd-flex rounded-16 p-20 align-items-center h-100',
        isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev',
      )}
      to={permalink}>
      <div className="d-flex justify-content-between align-items-center gap-20 w-100">
        {isNext ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`order-last flex-shrink-0`}>
            <path d="m12.45 5.27 7.2 5.83c.25.19.35.42.35.65a.8.8 0 0 1-.35.65l-7.2 5.83c-.45.34-1.2.38-1.65 0-.5-.35-.55-.92-.05-1.3l6.4-5.18-6.4-5.17c-.5-.39-.45-.96.05-1.3.45-.39 1.2-.35 1.65 0Z" fill="currentColor"/>
            <path d="m6.05 5.27 7.2 5.83c.25.19.35.42.35.65a.8.8 0 0 1-.35.65l-7.2 5.83c-.45.34-1.2.38-1.65 0-.5-.35-.55-.92-.05-1.3l6.4-5.18-6.4-5.17c-.5-.39-.45-.96.05-1.3.45-.39 1.2-.35 1.65 0Z" fill="currentColor"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`flex-shrink-0`}>
            <path d="m11.55 5.27-7.2 5.83a.8.8 0 0 0-.35.65c0 .23.1.46.35.65l7.2 5.83c.45.34 1.2.38 1.65 0 .5-.35.55-.92.05-1.3l-6.4-5.18 6.4-5.17c.5-.39.45-.96-.05-1.3-.45-.39-1.2-.35-1.65 0Z" fill="currentColor"/>
            <path d="m17.95 5.27-7.2 5.83a.8.8 0 0 0-.35.65c0 .23.1.46.35.65l7.2 5.83c.45.34 1.2.38 1.65 0 .5-.35.55-.92.05-1.3l-6.4-5.18 6.4-5.17c.5-.39.45-.96-.05-1.3-.45-.39-1.2-.35-1.65 0Z" fill="currentColor"/>
          </svg>
        )}

        <div className={`d-flex gap-2 flex-column ${isNext ? 'text-start' : 'text-end'}`}>
          {subLabel && <div className={clsx(styles.paginatorLinkSubLabel, `caption`)}>{subLabel}</div>}
          <div className="d-flex gap-6 align-items-start">
            <div className={`badge bg-primary mt-3`}>{findSidebarItemIndex(sidebar?.items, {type:'link', href: permalink, label: title })}</div>
            <div className="subtitle-3">{title}</div>
          </div>

        </div>
      </div>
    </Link>
  );
}
