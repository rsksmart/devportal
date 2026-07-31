/**
 * Hides the live request form on the static JSON-RPC pages (the request is
 * shown as a code sample instead). Other pages keep the theme's form.
 */
import React from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import Original from "@theme-original/ApiExplorer/Request";

export default function Request(props) {
  const { frontMatter } = useDoc();
  if (frontMatter.hide_send_button) return null;
  return <Original {...props} />;
}
