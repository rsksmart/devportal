import React from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

import {ThemeClassNames} from '@docusaurus/theme-common';
import EditMetaRow from '@theme/EditMetaRow';
import TagsListInline from '@theme/TagsListInline';
import ReadMoreLink from '@theme/BlogPostItem/Footer/ReadMoreLink';
export default function BlogPostItemFooter() {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {
    tags,
    title,
    editUrl,
    hasTruncateMarker,
    lastUpdatedBy,
    lastUpdatedAt,
    frontMatter
  } = metadata;

  const {url} = frontMatter;

  // A post is truncated if it's in the "list view" and it has a truncate marker
  const truncatedPost = !isBlogPostPage && hasTruncateMarker;
  const showReadMore = truncatedPost || url;
  const tagsExists = false;
  const renderFooter = tagsExists || showReadMore || editUrl;
  if (!renderFooter) {
    return null;
  }
  // BlogPost footer - details view
  if (isBlogPostPage) {
    const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
    return (
      <footer className="docusaurus-mt-lg">
        {tagsExists && (
          <div
            className={clsx(
              'row',
              'margin-top--sm',
              ThemeClassNames.blog.blogFooterEditMetaRow,
            )}>
            <div className="col">
              <TagsListInline tags={tags} />
            </div>
          </div>
        )}
        {canDisplayEditMetaRow && (
          <EditMetaRow
            className={clsx(
              'margin-top--sm',
              ThemeClassNames.blog.blogFooterEditMetaRow,
            )}
            editUrl={editUrl}
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </footer>
    );
  }
  // BlogPost footer - list view
  else {
    return (
      <footer className="row mt-24">
        {tagsExists && (
          <div className={clsx('col', {'col--9': showReadMore})}>
            <TagsListInline tags={tags} />
          </div>
        )}
        {showReadMore && (
          <div
            className={clsx('col', {
              'col--3': tagsExists,
            })}>
            <ReadMoreLink blogPostTitle={title} to={url || metadata.permalink} />
          </div>
        )}
      </footer>
    );
  }
}
