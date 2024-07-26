import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import BlogListPageHeader from "@theme/BlogListPage/Header";
import Translate from '@docusaurus/Translate';
import styles from './styles.module.scss';

function BlogListPageMetadata(props) {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

const SortComponent = ({ sortCriteria, handleSortChange }) => {
  return (
    <div>
      <h4 className={`title-s mb-12 text-uppercase`}>
        <Translate
          id="theme.blog.sorting">
          sorting
        </Translate>
      </h4>
      <select value={sortCriteria} onChange={handleSortChange} className={`form-select w-100 w-md-auto w-lg-100`}>
        <option value="nameAsc">Name Ascending</option>
        <option value="nameDesc">Name Descending</option>
        <option value="olderFirst">Older First</option>
        <option value="newestFirst">Newest First</option>
      </select>
    </div>
  );
};

const FilterComponent = ({selectedTags, handleTagChange, allTags}) => {
  return allTags?.length > 0 && (
    <div>
      <h4 className={`title-s mb-14 text-uppercase`}>
        <Translate
          id="theme.blog.sorting">
          Filters
        </Translate>
      </h4>
      <div className="d-flex flex-column flex-md-row flex-lg-column gap-16">
        {allTags.map((tag, index) => (
          <label key={index} className={`d-flex align-items-center gap-10 fs-14`}>
            <input
              type="checkbox"
              checked={selectedTags.includes(tag.label)}
              onChange={() => handleTagChange(tag.label)}
            />
            {tag.label}
          </label>
        ))}
      </div>
    </div>
  );
};
function getAllTags(items) {
  const tagMap = new Map();

  items
    .map(item => item.content.metadata.tags)
    .flat()
    .forEach(tag => {
      tagMap.set(tag.label, tag);
    });

  return Array.from(tagMap.values());
}
function BlogListPageContent(props) {
  const {metadata, items} = props;

  const [sortCriteria, setSortCriteria] = useState('newestFirst');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortedAndFilteredItems, setSortedAndFilteredItems] = useState([...items]);
  const allTags = getAllTags(items);

  useEffect(() => {
    filterAndSortItems(sortCriteria, selectedTags);
  }, [sortCriteria, selectedTags]);

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const filterAndSortItems = (criteria, tags) => {
    let filteredItems = [...items];

    if (tags.length > 0) {
      filteredItems = filteredItems.filter((item) =>
        item.content.metadata.tags.some((tag) => tags.includes(tag.label))
      );
    }

    const sortedItems = filteredItems.sort((a, b) => {
      switch (criteria) {
        case 'nameAsc':
          return a.content.metadata.title.localeCompare(b.content.metadata.title);
        case 'nameDesc':
          return b.content.metadata.title.localeCompare(a.content.metadata.title);
        case 'olderFirst':
          return new Date(a.content.metadata.date) - new Date(b.content.metadata.date);
        case 'newestFirst':
          return new Date(b.content.metadata.date) - new Date(a.content.metadata.date);
        default:
          return 0;
      }
    });

    setSortedAndFilteredItems(sortedItems);
  };

  return (
    <BlogLayout>
      <div className="row gx-48">
        <div className={clsx(" col-12 col-lg-3")}>
          <div className={clsx(styles.blogSidebar, 'pe-lg-24 me-lg-n24 mb-24 pb-24 mb-lg-0 pb-lg-0 h-lg-100 position-relative')}>
            <div className="position-lg-sticky d-flex flex-column gap-24 gap-lg-44" style={{"top": "var(--rsk-navbar-height)"}}>
              <SortComponent sortCriteria={sortCriteria} handleSortChange={handleSortChange} />
              <FilterComponent
                selectedTags={selectedTags}
                handleTagChange={handleTagChange}
                allTags={allTags}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-9">
          <BlogListPageHeader data={metadata}/>
          <BlogPostItems items={sortedAndFilteredItems}/>
          <BlogListPaginator metadata={metadata} />
        </div>
      </div>
    </BlogLayout>
  );
}
export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
