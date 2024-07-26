import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import styles from './styles.module.scss';
export default function BlogPostItemHeaderTitle({className}) {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {permalink, title, frontMatter} = metadata;
  const {url} = frontMatter;
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2';
  return (
    <TitleHeading className={clsx(styles.title, className, 'mb-16')}>
      {isBlogPostPage ? title : <Link to={url || permalink}>{title}</Link>}
    </TitleHeading>
  );
}
