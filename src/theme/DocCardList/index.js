import React from 'react';
import clsx from 'clsx';
import {useLocation} from '@docusaurus/router';
import {
  useCurrentSidebarCategory,
  filterDocCardListItems,
} from '@docusaurus/theme-common';
import DocCard from '@theme/DocCard';

/**
 * useCurrentSidebarCategory() throws when the current page is not a category
 * index (e.g. a section has only index.md and every other doc is _-prefixed and
 * excluded). Swallow that case so overview pages still render.
 */
class DocCardListCategoryBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hideList: false};
  }

  static getDerivedStateFromError(error) {
    const message = String(error?.message || '');
    if (message.includes('not associated with a category')) {
      return {hideList: true};
    }
    return null;
  }

  render() {
    if (this.state.hideList) {
      return null;
    }
    return this.props.children;
  }
}

function DocCardListForCurrentSidebarCategory({className}) {
  const category = useCurrentSidebarCategory();
  return <DocCardList items={category.items} className={className} />;
}

export default function DocCardList(props) {
  const {items, className} = props;
  const location = useLocation();

  if (!items) {
    return (
      <DocCardListCategoryBoundary key={location.pathname}>
        <DocCardListForCurrentSidebarCategory className={className} />
      </DocCardListCategoryBoundary>
    );
  }

  const filteredItems = filterDocCardListItems(items);
  return (
    <section className={clsx('row row-cols-1 row-cols-md-2 g-24')}>
      {filteredItems.map((item, index) => (
        <article key={index} className="col">
          <DocCard item={item} />
        </article>
      ))}
    </section>
  );
}
