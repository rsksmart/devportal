import React from 'react';
import {useBlogPost} from "@docusaurus/theme-common/internal";
import Link from '/src/components/Link';
import styles from './styles.module.scss'
import clsx from "clsx";

export default function BlogPostItemThumbnail({className}) {
  const {metadata} = useBlogPost();
  const {frontMatter, permalink, title} = metadata;
  const {image, url} = frontMatter;

  return image && <Link href={url || permalink} className={clsx(styles.ThumbWrap, 'rounded-10 overflow-hidden border d-block mt-24')}>
    <img src={image} alt={title || ''} className={`d-block w-100`}/>
  </Link>;
}
