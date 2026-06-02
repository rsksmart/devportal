/**
 * This file exists to support TypeScript sidebar customization.
 */
// @ts-check

import { createSidebars } from "./src/_utils/utils.js";

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
// @ts-ignore
const sidebars = createSidebars("./docs");

export default sidebars;

