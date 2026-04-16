import React from 'react';
import Link from '@docusaurus/Link';

/**
 * Swizzled MDXComponents at `src/theme/MDXComponents.js` shadows the theme folder, so
 * `@theme/MDXComponents/A` must exist here. Same behavior as theme-classic MDXA.
 */
export default function MDXA(props) {
  return <Link {...props} />;
}
