import React from "react";
import clsx from "clsx";

import styles from "./styles.module.scss";

export default function Step({children, title, index, ...props}) {

  return <div className={clsx(styles.Step)}>
    <div className={clsx(styles.StepHeader, 'd-flex gap-8 align-items-center flex-wrap py-4')}>
      <h4 className="m-0 fs-14 fw-medium lh-base">{title}</h4>
    </div>
    <div className={`border-start ps-14 ms-20 py-10 markdown`}>
      {children}
    </div>
  </div>
}
