import React from "react";
import clsx from "clsx";
import Link from '/src/components/Link';

import {SplideSlide} from "@splidejs/react-splide";

export default function CarouselItem({title, href, target, image, ...props}) {

  const TagName = ({href, children, title, ...props}) => {
    return href ? (
      <Link title={title} className={clsx('slide-wrap')} href={href || null} target={target} rel={target === '_blank' ? 'noopener noreferrer' : null} {...props}>
        {children}
      </Link>
    ) : (
      <div className={clsx('slide-wrap')} {...props}>
        {children}
      </div>
    )
  }

  return image && <SplideSlide >
    <TagName href={href} target={target} title={title} {...props}>
      <img src={image} alt={title || null} />
    </TagName>
  </SplideSlide>
}
