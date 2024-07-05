import React from 'react';
import clsx from 'clsx';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import MDXContent from '@theme/MDXContent';
import TOC from '@theme/TOC';
import Unlisted from '@theme/Unlisted';
import EditMetaRow from '@theme/EditMetaRow';
import styles from './styles.module.css';

import Aside from "../../components/Homepage/Aside";
export default function MDXPage(props) {
  const {content: MDXPageContent} = props;
  const {
    metadata: {
      title,
      editUrl,
      description,
      frontMatter,
      unlisted,
      lastUpdatedBy,
      lastUpdatedAt,
    },
    assets,
  } = MDXPageContent;
  const {
    keywords,
    wrapperClassName,
    hide_table_of_contents: hideTableOfContents,
  } = frontMatter;
  const image = assets.image ?? frontMatter.image;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
  return (
    <HtmlClassNameProvider
      className={clsx(
        wrapperClassName ?? ThemeClassNames.wrapper.mdxPages,
        ThemeClassNames.page.mdxPage,
      )}>
      <Layout>
        <PageMetadata
          title={title}
          description={description}
          keywords={keywords}
          image={image}
        />
        <main>
          <div className="row">
            <div className="col-12 col-lg-9 col-xl-10">
              {unlisted && <Unlisted/>}
              <article className={`markdown`}>
                <MDXContent>
                  <MDXPageContent/>
                </MDXContent>
              </article>
              {canDisplayEditMetaRow && (
                <EditMetaRow
                  className={clsx(
                    'margin-top--sm',
                    ThemeClassNames.pages.pageFooterEditMetaRow,
                  )}
                  editUrl={editUrl}
                  lastUpdatedAt={lastUpdatedAt}
                  lastUpdatedBy={lastUpdatedBy}
                />
              )}
            </div>
              <div className="col-12 col-lg-3 col-xl-2">
                <Aside />
                {/*{!hideTableOfContents && MDXPageContent.toc.length > 0 && (*/}
                {/*    <TOC*/}
                {/*      toc={MDXPageContent.toc}*/}
                {/*      minHeadingLevel={frontMatter.toc_min_heading_level}*/}
                {/*      maxHeadingLevel={frontMatter.toc_max_heading_level}*/}
                {/*    />*/}
                {/*)}*/}
              </div>
          </div>
        </main>
      </Layout>
    </HtmlClassNameProvider>
  );
}
