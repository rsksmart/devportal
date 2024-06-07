import React, {useMemo} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {
  useTOCHighlight,
  useFilteredAndTreeifiedTOC,
} from '@docusaurus/theme-common/internal';
import TOCItemTree from '@theme/TOCItems/Tree';
import styles from './styles.module.scss';
import clsx from "clsx";

export default function TOCItems({
  toc,
  className = '',
  linkClassName = '',
  linkActiveClassName = undefined,
  minHeadingLevel: minHeadingLevelOption,
  maxHeadingLevel: maxHeadingLevelOption,
  ...props
}) {
  const themeConfig = useThemeConfig();
  const minHeadingLevel =
    minHeadingLevelOption ?? themeConfig.tableOfContents.minHeadingLevel;
  const maxHeadingLevel =
    maxHeadingLevelOption ?? themeConfig.tableOfContents.maxHeadingLevel;
  const tocTree = useFilteredAndTreeifiedTOC({
    toc,
    minHeadingLevel,
    maxHeadingLevel,
  });
  const tocHighlightConfig = useMemo(() => {
    if (linkClassName && linkActiveClassName) {
      return {
        linkClassName,
        linkActiveClassName,
        minHeadingLevel,
        maxHeadingLevel,
      };
    }
    return undefined;
  }, [linkClassName, linkActiveClassName, minHeadingLevel, maxHeadingLevel]);
  useTOCHighlight(tocHighlightConfig);
  return (
    <TOCItemTree
      toc={tocTree}
      className={clsx(className, styles.tableOfContentsTree)}
      linkClassName={linkClassName}
      {...props}
    />
  );
}
