import React from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import Button from "../Button";

export default function CardSimple({title, description, className, link, image, ...props}) {

  return <div {...props} className={clsx(`border position-relative d-flex flex-column flex-md-row gap-20 gap-md-24 rounded-20 px-16 py-24 p-lg-32 h-100`, className, styles.Card)}>
    {image && (
      <div className={`w-100 w-md-40 ms-md-24 ms-lg-64 flex-shrink-0 order-md-1`}>
        <img src={image} alt={title} className={`m-0 d-block w-100 rounded-8 border-0`}/>
      </div>
    )}

    <div className="flex-grow-1">
      {title && (
        <h3 className={`h2 m-0 mb-12 mb-md-18`}>
          {title}
        </h3>
      )}
      {description && (
        <div className={`markdown fs-16`}>
          {description}
        </div>
      )}
      {link && (
        <Button href={link} stretched={true} className={`mt-24 py-6 px-20`} ariaLabel={title}>
          <svg width="16" height="16">
            <use xlinkHref="#icon-arrow-r"></use>
          </svg>
        </Button>
      )}
    </div>
  </div>
}
