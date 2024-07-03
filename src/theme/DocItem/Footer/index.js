import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
import TagsListInline from '@theme/TagsListInline';
import TagsListCollapsible from '@theme/TagsListCollapsible';

export default function DocItemFooter() {
  const {metadata} = useDoc();
  const {editUrl, lastUpdatedAt, lastUpdatedBy, tags} = metadata;
  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;
  if (!canDisplayFooter) {
    return null;
  }
  return canDisplayTagsRow && (
    <footer
      className={clsx(ThemeClassNames.docs.docFooter, 'mt-64')}>
      {canDisplayTagsRow && (
        <div
          className={clsx(
            ThemeClassNames.docs.docFooterTagsRow,
          )}>
          <TagsListInline tags={tags} />
          <TagsListCollapsible tags={tags} />
        </div>
      )}
    </footer>
  );
}
