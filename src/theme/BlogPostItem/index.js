import React from 'react';
import clsx from 'clsx';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import BlogPostItemThumbnail from "@theme/BlogPostItem/Thumbnail";

export default function BlogPostItem({children, className}) {

  return (
    <BlogPostItemContainer className={clsx(className, 'border p-16 p-md-24 p-xl-32 rounded-20')}>
      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
      <BlogPostItemThumbnail />
    </BlogPostItemContainer>
  );
}
