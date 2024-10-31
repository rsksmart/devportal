import React from 'react'
import {useEffect, useState} from 'react'
import { Tooltip } from 'react-tooltip'
import { useColorMode } from '@docusaurus/theme-common'
import Link from '/src/components/Link';

function generateUniqueId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}
export const badgeSrc = ({ title, color, logo, logoColor, label, labelColor, version }) => {
  if (version) {
    title = version
    label = label ?? 'version'
    color = color ?? 'blue'
  }

  let encodedTitle = title ? title.replace(/-/g, '--').replace(/_/g, '__').replace(/ /g, '_') : ''

  const colorsMatch = {
    pink: '#FF70E0',
    purple: '#9E75FF',
    green: '#78C700',
    orange: '#FF9100',
    cyan: '#08FFD1',
    yellow: '#DEFF1A'
  }

  color = colorsMatch[color] || color
  labelColor = colorsMatch[labelColor] || labelColor || 'gray'
  label = label ? `&label=${label}&labelColor=${labelColor}` : ''

  logoColor = colorsMatch[logoColor] || logoColor || 'white'
  logo = logo ? `&logo=${logo}&logoColor=${logoColor}` : ''

  return encodeURI(
    `https://img.shields.io/badge/${encodedTitle}-${color || 'gray'}?${logo}${label}`
  ).replace(/#/g, '%23')
}

function Tag ({ children, href, ...props }) {
  return href ? (
    <Link href={href} {...props}>
      {children}
    </Link>
  ) : (
    <span {...props}>{children}</span>
  )
}

export default function ShieldsBadge ({ title, color, href, label, labelColor, logo, logoColor, version, tooltip = null, ...props }) {

  const src = badgeSrc({ title, color, logo, logoColor, label, labelColor, version })

  const tooltipId = tooltip ? generateUniqueId('tooltip') : null;

  const {colorMode} = useColorMode();
  const [toolTipColor, setTooltipColor] = useState('light');

  useEffect(() => {
    if (tooltip) {
      setTooltipColor(colorMode === 'light' ? 'dark' : 'light');
    }
  }, [colorMode]);

  return src && <>
    <Tag href={href || null} {...props} className={`d-inline-flex align-bottom`}
         data-tooltip-id={tooltip && tooltipId}
         data-tooltip-content={tooltip}
    >
      <img src={src} alt={title || ''} {...props} />
      {tooltip && (
        <Tooltip id={tooltipId} opacity={0.95} wrapper={"span"} variant={toolTipColor} className="px-8 py-4 fs-12"/>
      )}
    </Tag>
  </>
}
