import React from "react";
import clsx from "clsx";
import styles from './styles.module.scss';

export default function Steps({children, className, ...props}) {

  return <div className={clsx(styles.StepsWrap, className)} {...props}>
    {children}
  </div>
}
