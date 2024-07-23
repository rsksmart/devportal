import React, {useEffect, useState} from "react";
import clsx from "clsx";
import styles from './styles.module.scss';

import Translate from '@docusaurus/Translate';

export default function Filter ({values, children, className, ...props}) {
  const [selectedValue, setSelectedValue] = useState('all');
  const childItems = (Array.isArray(children) ? children : [children]).filter(
    Boolean,
  );

  const [items, setitems] = useState(childItems);

  useEffect(() => {
    setitems(childItems.filter(item => {
      const itemValues = item.props.value ? item.props.value.replace(/ /g, '').split(',') : [];
      return selectedValue === 'all' || itemValues.includes(selectedValue)
    }))
  }, [selectedValue]);

  return <div
    className={clsx(``, className)}
    {...props}
  >
    <ul
      role="tablist"
      aria-orientation="horizontal"
      className={clsx(
        'list-unstyled d-flex gap-8 flex-wrap m-0 mb-24 p-0',
        className,
      )}>
      <li className={'m-0'}>
        <button
          onClick={() => setSelectedValue('all')}
          className={clsx(`btn btn-outline`, selectedValue === 'all' && 'active')}>
          <Translate
            id="theme.common.all">
            All
          </Translate>
        </button>
      </li>
      {values.map(({value, label}) => (
        <li className={`m-0`} key={value}>
          <button
            onClick={() => setSelectedValue(value)}
            className={clsx(`btn btn-outline`, selectedValue === value && 'active')}>
            {label ?? value}
          </button>
        </li>
      ))}
    </ul>
      <div className={clsx(styles.FilterGrid)}>
        {items.map((tabItem, i) =>
          <React.Fragment key={i}>
            {tabItem}
          </React.Fragment>
        )}
      </div>
  </div>
}
