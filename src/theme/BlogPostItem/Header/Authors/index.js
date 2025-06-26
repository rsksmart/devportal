import React from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

import BlogPostItemHeaderAuthor from '@theme/BlogPostItem/Header/Author';
import styles from './styles.module.css';
// Component responsible for the authors layout
export default function BlogPostItemHeaderAuthors({className}) {
  const {
    metadata: {authors},
    assets,
  } = useBlogPost();
  const authorsCount = authors.length;
  if (authorsCount < 2) {
    return null;
  }
  const imageOnly = authors.every(({name}) => !name);
  return (
    <div
      className={clsx(
        'mb-24 mt-n12',
        imageOnly ? styles.imageOnlyAuthorRow : 'row',
        className,
      )}>
      {authors.map((author, idx) => (
        <div
          className={clsx(
            !imageOnly && 'col-12 col-md-6',
            imageOnly ? styles.imageOnlyAuthorCol : styles.authorCol,
          )}
          key={idx}>
          <BlogPostItemHeaderAuthor
            author={{
              ...author,
              // Handle author images using relative paths
              imageURL: assets.authorsImageUrls[idx] ?? author.imageURL,
            }}
          />
        </div>
      ))}
    </div>
  );
}
