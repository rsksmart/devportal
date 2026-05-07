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

export default sidebars;

