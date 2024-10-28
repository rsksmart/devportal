import React from 'react'
import Link from '/src/components/Link'
import clsx from 'clsx'

export const badgeSrc = ({ title, color, logo, logoColor, label, labelColor }) => {

  const encodedTitle = title.replace(/-/g, '--').replace(/_/g, '__').replace(/ /g, '_')
  const colorsMatch = {
    pink : '#FF70E0',
    purple : '#9E75FF',
    green : '#78C700',
  }
  console.log(encodedTitle);
  color = colorsMatch[color] || color;
  labelColor = colorsMatch[labelColor] || labelColor || 'gray';
  label = label ? `&label=${label}&labelColor=${labelColor}` : ''

  logoColor = colorsMatch[logoColor] || logoColor || 'white';
  logo = logo ? `&logo=${logo}&logoColor=${logoColor}` : ''

  return encodeURI(
    `https://img.shields.io/badge/${encodedTitle}-${color || 'blue'}?${logo}${label}`
  ).replace(/#/g, '%23')
}

function Tag({children, href, ...props}) {
  return href ? (
    <Link href={href} {...props}>
      {children}
    </Link>
  ) : (
    <div {...props}>{children}</div>
  );
}

export default function ShieldsBadge ({ title, color, href, label, labelColor, logo, logoColor, ...props }) {

  const src = badgeSrc({ title, color, logo, logoColor, label, labelColor })

  return title && src && <Tag href={href || null} {...props} className={`position-relative z-0 d-inline-flex`}>
    <img src={src} alt={label ?? name} {...props} />
  </Tag>
}
