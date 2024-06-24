import React from "react";
import clsx from "clsx";
import TitleColor from "../TitleColor";
import Link from "@docusaurus/core/lib/client/exports/Link";
import styles from "./styles.module.scss";

export default function Card({title, description, list, color = "orange", children, className, ...props}) {

  return <div className={clsx(`border d-flex flex-column rounded-20 px-16 py-24 p-lg-32 h-100`, className, styles.Card)} style={{'--rsk-card-main-color' : `var(--bs-${color})`}}>
    <TitleColor as={'h3'} size={'sm'} color={color} className={`mb-16`}>
      {title}
    </TitleColor>
    <div className={`markdown fw-medium`}>
      {description}
    </div>
    {list && (
      <ul className={`mb-0 mt-auto pt-20`}>
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
}
