import React from "react";
import clsx from "clsx";
import TitleColor from "../TitleColor";
import Link from "/src/components/Link";
import styles from "./styles.module.scss";
import Button from "../Button";

export default function Card({index, title, description, list, color = "orange", className, link, icon, ...props}) {

  return <div className={clsx(`border position-relative d-md-flex flex-md-column flex-lg-row gap-24 rounded-20 px-16 py-24 p-lg-32 h-100`, className, styles.Card)} style={{'--rsk-card-main-color' : `var(--bs-${color})`}}>
    <div className="d-flex flex-column flex-grow-1">

      {icon && (
        <svg width={44} height={44} className={`flex-shrink-0 d-lg-none mb-16`}>
          <use xlinkHref={`#icon-${icon}-solid`}/>
        </svg>
      )}
      <div className="d-flex align-items-start gap-6">
        <TitleColor as={'h3'} size={'sm'} color={color} className={`mb-16`}>
          {title}
        </TitleColor>
        {index && (
          <span className={`badge bg-${color}`}>
          {index}
        </span>
        )}
      </div>
      <div className={clsx("d-flex flex-column flex-md-row align-items-start justify-content-lg-between gap-16 gap-md-32 flex-grow-1", link?.href ? "align-items-md-end" : "align-items-md-stretch")}>
        <div className="d-flex flex-column gap-20">
          {description && (
            <div className={`markdown fw-medium`}>
              {description}
            </div>
          )}
          {list && (
            <ul className={`mb-0 mt-auto`}>
              {list.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} target={item.target} className={`fw-bold py-4`}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

    </div>
    {(link?.href || icon) && (
      <div className={`mt-16 mt-md-0 d-flex flex-column gap-24 align-items-start align-items-lg-center ms-lg-auto`}>
        {icon && (
          <svg width={84} height={84} className={`flex-shrink-0 d-none d-lg-block`}>
            <use xlinkHref={`#icon-${icon}-solid`}/>
          </svg>
        )}
        {link?.href && (
          <Button href={link.href} stretched={true} className={`mt-auto`}>
            {link.title}
          </Button>
        )}
      </div>
    )}
  </div>
}
