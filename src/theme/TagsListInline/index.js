import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Tag from '@theme/Tag';
export default function TagsListInline({tags}) {
  return (
    <div className={`d-none d-lg-block`}>
      <p className={'h2 mb-24'}>
        <Translate
          id="theme.tags.tagsListLabel"
          description="The label alongside a tag list">
          Tags:
        </Translate>
      </p>
      <ul className={clsx('list-unstyled d-flex flex-wrap gap-12 m-0')}>
        {tags.map((tag) => (
          <li key={tag.permalink}>
            <Tag {...tag} />
          </li>
        ))}
      </ul>
    </div>
  );
}
