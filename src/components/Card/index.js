import React from "react";
import clsx from "clsx";
import TitleColor from "../TitleColor";

export default function Card ({title, description, list, color = "orange", children, className, ...props}) {

  return <div className={clsx(`border rounded-20 px-16 py-24 p-lg-32 h-100`, className)} >
    <TitleColor as={'h3'} size={'sm'} color={color} className={`mb-16`}>
      {title}
    </TitleColor>
    <div className={`text-block`}>
      {description}
    </div>
  </div>
}
