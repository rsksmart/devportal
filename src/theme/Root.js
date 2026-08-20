/**
 * Only wraps the app in the JSON-RPC endpoint provider, so the endpoint a
 * reader picks on one method page still applies on the next one. Renders no
 * markup of its own — every page outside the JSON-RPC reference is unchanged.
 */
import React from "react";
import { EndpointProvider } from "./ApiExplorer/EndpointContext";

export default function Root({ children }) {
  return <EndpointProvider>{children}</EndpointProvider>;
}
