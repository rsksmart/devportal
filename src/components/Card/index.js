import React from "react";
import clsx from "clsx";
import TitleColor from "../TitleColor";
import Link from "@docusaurus/core/lib/client/exports/Link";
import styles from "./styles.module.scss";
import Button from "../Button";

export default function Card({index, title, description, list, color = "orange", children, className, link, ...props}) {

  return <div className={clsx(`border position-relative d-flex flex-column rounded-20 px-16 py-24 p-lg-32 h-100`, className, styles.Card)} style={{'--rsk-card-main-color' : `var(--bs-${color})`}}>
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
                <Link href={item.href} target={item.target}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {link?.href && (
        <Button href={link.href} stretched={true} className={`align-self-lg-end`}>
          {link.title}
        </Button>
      )}
    </div>

  </div>
}
