import React from "react";
import clsx from "clsx";
import styles from './styles.module.scss';

export default function CardsGrid({children, className, ...props}) {
  const childItems = (Array.isArray(children) ? children : [children]).filter(
    Boolean,
  );

  return <div className={clsx(styles.CardsGrid, className)} {...props}>
    {childItems.map((tabItem, i) =>
      <React.Fragment key={i}>
        {tabItem}
      </React.Fragment>
    )}
  </div>
}
