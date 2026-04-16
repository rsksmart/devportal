/**
 * This file exists to support TypeScript sidebar customization.
 * We keep changes minimal and only rename the DeFi overview label:
 * "Overview" → "DeFi"
 */
// @ts-check

import { createSidebars } from "./src/_utils/utils.js";

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
// @ts-ignore
const sidebars = createSidebars("./docs");

function renameDefiOverviewToDefi(items: unknown): void {
  if (!Array.isArray(items)) return;

  for (const item of items as any[]) {
    if (!item || typeof item !== "object") continue;

    if (
      item.type === "doc" &&
      item.label === "Overview" &&
      typeof item.id === "string" &&
      item.id.replace(/\\/g, "/").endsWith("06-use-cases/defi/index")
    ) {
      item.label = "DeFi";
      continue;
    }

    if (Array.isArray(item.items)) renameDefiOverviewToDefi(item.items);
  }
}

for (const key of Object.keys(sidebars)) {
  renameDefiOverviewToDefi((sidebars as any)[key]);
}

export default sidebars;

