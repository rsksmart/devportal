import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Tag from '@theme/Tag';
import {Collapsible, useCollapsible, useWindowSize} from "@docusaurus/theme-common";

import CollapseButton from '@theme/TagsListCollapsible/CollapseButton';

export default function TagsListCollapsible({tags}) {
  const windowSize = useWindowSize();
  // Mobile tags not visible on hydration: can avoid SSR rendering
  const shouldRenderTagsMobile = windowSize === 'mobile';
  const title = (
      <Translate
        id="theme.tags.tagsListLabel"
        description="The label alongside a tag list">
        Tags:
      </Translate>
    )

  const {collapsed, toggleCollapsed} = useCollapsible({
    initialState: true,
  });

  return (shouldRenderTagsMobile && tags?.length > 0) && (
    <>
      <CollapseButton className={`h2 mb-0`} title={title} collapsed={collapsed} onClick={toggleCollapsed}/>
      <Collapsible
        lazy
        collapsed={collapsed}>
        <div className="pt-24 d-flex flex-column gap-24">
          <ul className={clsx('list-unstyled d-flex flex-wrap gap-12 m-0')}>
            {tags.map((tag) => (
              <li key={tag.permalink}>
                <Tag {...tag} />
              </li>
            ))}
          </ul>
        </div>
      </Collapsible>
    </>
  );
}
