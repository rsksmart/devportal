import React from 'react';
import {
  PageMetadata,
  useCurrentSidebarCategory,
} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocCardList from '@theme/DocCardList';
import DocPaginator from '@theme/DocPaginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import Heading from '@theme/Heading';
import Aside from "/src/components/Homepage/Aside";

import TitleColor from "/src/components/TitleColor";

import styles from './styles.module.css';
import clsx from "clsx";
function DocCategoryGeneratedIndexPageMetadata({categoryGeneratedIndex}) {
  return (
    <PageMetadata
      title={categoryGeneratedIndex.title}
      description={categoryGeneratedIndex.description}
      keywords={categoryGeneratedIndex.keywords}
      // TODO `require` this?
      image={useBaseUrl(categoryGeneratedIndex.image)}
    />
  );
}
function DocCategoryGeneratedIndexPageContent({categoryGeneratedIndex}) {
  const category = useCurrentSidebarCategory();
  return (
    <div className={`row`}>
      <div className="col-12 col-lg-9">
        <div className={clsx('ps-md-24')}>
          <div className="mb-24">
            <DocVersionBanner/>
            <DocBreadcrumbs/>
            <DocVersionBadge/>
          </div>
          <header className={`mb-24`}>
            <Heading as="h1" className={`h1 mb-26`}>
              {categoryGeneratedIndex.title}
            </Heading>
            {categoryGeneratedIndex.description && (
              <p>{categoryGeneratedIndex.description}</p>
            )}
          </header>
          <DocCardList items={category.items} />
          <footer>
            <DocPaginator
              previous={categoryGeneratedIndex.navigation.previous}
              next={categoryGeneratedIndex.navigation.next}
            />
          </footer>
        </div>
      </div>
      <div className="col-3 d-none d-lg-block">
        <Aside editUrl={null}/>
      </div>
    </div>
  );
}

export default function DocCategoryGeneratedIndexPage(props) {
  return (
    <>
      <DocCategoryGeneratedIndexPageMetadata {...props} />
      <DocCategoryGeneratedIndexPageContent {...props} />
    </>
  );
}
