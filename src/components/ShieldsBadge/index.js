import React from "react";
import Link from '/src/components/Link';
import clsx from "clsx";
import { makeBadge, ValidationError } from 'badge-maker'

export default function ShieldsBadge ({variant, href, className, size, target, title, icon, stretched, children, ...props}) {

  const format = {
    label: 'build',
    message: 'passed',
    color: 'brightgreen',
  }

  const svg = makeBadge(format)
  console.log(svg) // <svg...

  return <>
    {svg}
  </>
}
