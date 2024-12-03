import React from "react";
import clsx from "clsx";
import styles from './styles.module.scss';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '/src/components/Link'

export default function NewsLine () {
  const {siteConfig} = useDocusaurusContext();
  const news = siteConfig?.customFields?.news || [];

  return news?.length > 0 && <div
    className={clsx(`py-10 px-32 border-top border-bottom d-flex align-items-center justify-content-center gap-12 bg-black`, styles.NewsLine)}
  >
    <div class="d-flex align-items-center justify-content-center gap-12">
      {news.map((item, index) => (
        <Link key={index} href={item.url} className={clsx(`d-flex fs-14 gap-16 align-items-center link-base`)}>
          {item.title}
        </Link>
      ))}
    </div>
    <button className="btn-blank d-flex">
      <svg width="24" height="24">
        <use xlinkHref="#icon-close-circle"></use>
      </svg>
    </button>
  </div>
}
