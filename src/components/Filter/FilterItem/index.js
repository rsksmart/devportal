import React from "react";
import clsx from "clsx";
import TitleColor from "/src/components/TitleColor";
import Button from "/src/components/Button";

import styles from "./styles.module.scss";

export default function FilterItem({value, subtitle, title, description, color = "orange", className, linkHref, linkTitle, image, ...props}) {

  return <div className={clsx(`border position-relative d-flex flex-column align-items-start gap-16 gap-lg-24 rounded-20 px-16 py-24 p-lg-24`, className, styles.Card)} style={{'--rsk-card-main-color' : `var(--bs-${color})`}}>
    {image && (
      <img src={image} alt={title} className={'m-0 border-0 rounded-0'} />
    )}
    <div className="d-flex align-items-start gap-6">
      <TitleColor as={'h3'} size={'sm'} color={color} className={`m-0`}>
        {title}
      </TitleColor>
      {subtitle && (
        <span className={`badge text-uppercase bg-${color}`}>
          {subtitle}
        </span>
      )}
    </div>
    {description && (
      <div className={`markdown fw-medium`}>
        {description}
      </div>
    )}
    {linkHref && (
      <Button href={linkHref} stretched={true} className={clsx('mt-auto', !linkTitle && 'py-6 px-20')}>
        {linkTitle || (
          <svg width="16" height="16">
            <use xlinkHref="#icon-arrow-r"></use>
          </svg>
        )}
      </Button>
    )}
  </div>
}
