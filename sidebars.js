/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

import {createSidebars} from './src/_utils/utils.js';

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
// @ts-ignore
const sidebars = createSidebars('./docs');

// Post-process generated sidebar to rename only the DeFi "Overview" entry.
// (We keep all other sidebar labels unchanged.)
function renameDefiOverviewToDefi(items) {
  if (!Array.isArray(items)) return;

  for (const item of items) {
    if (!item || typeof item !== 'object') continue;

    // Docusaurus doc sidebar item
    if (
      item.type === 'doc' &&
      item.label === 'Overview' &&
      typeof item.id === 'string' &&
      item.id.replace(/\\/g, '/').endsWith('06-use-cases/defi/index')
    ) {
      item.label = 'DeFi';
      continue;
    }

    // Category / nested items
    if (Array.isArray(item.items)) renameDefiOverviewToDefi(item.items);
  }
}

for (const key of Object.keys(sidebars)) {
  renameDefiOverviewToDefi(sidebars[key]);
}

export default sidebars;

