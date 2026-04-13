import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.scss';

const SortComponent = ({ sortCriteria, handleSortChange }) => {
  return (
    <div>
      <h4 className="title-s mb-12 text-uppercase">
        <Translate id="theme.changelog.sorting">
          Sorting
        </Translate>
      </h4>
      <select
        value={sortCriteria}
        onChange={handleSortChange}
        className="form-select w-100 w-md-auto w-lg-100"
      >
        <option value="newestFirst">Newest First</option>
        <option value="oldestFirst">Oldest First</option>
        <option value="nameAsc">Name A-Z</option>
        <option value="nameDesc">Name Z-A</option>
      </select>
    </div>
  );
};

export default SortComponent;
