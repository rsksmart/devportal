import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.scss';

const FilterComponent = ({ selectedProducts, handleProductChange, allProducts }) => {
  return (
    <div>
      <h4 className="title-s mb-14 text-uppercase">
        <Translate id="theme.changelog.filters">
          Filters
        </Translate>
      </h4>
      <div className="d-flex flex-column flex-md-row flex-lg-column gap-16">
        {allProducts.map((product, index) => (
          <label key={index} className="d-flex align-items-center gap-10 fs-14">
            <input
              type="checkbox"
              checked={selectedProducts.includes(product)}
              onChange={() => handleProductChange(product)}
            />
            {product}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
