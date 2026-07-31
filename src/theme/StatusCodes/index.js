/**
 * Renders the response of a JSON-RPC method as a "Returns" section showing only
 * the result schema, with its description. The jsonrpc/id envelope and the 200
 * status are constants, so they aren't repeated; the example lives on the right
 * in Response example. Other pages use the theme's own component.
 */
import React from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import Original from "@theme-original/StatusCodes";
import Heading from "@theme/Heading";
import Markdown from "@theme/Markdown";
import { JsonRpcSchema, flattenScalarOneOf } from "../openapi-schema";

export default function StatusCodes(props) {
  const { frontMatter } = useDoc();
  const { responses } = props;
  const codes = responses ? Object.keys(responses) : [];

  if (
    !frontMatter.hide_send_button ||
    codes.length !== 1 ||
    String(codes[0]) !== "200"
  ) {
    return <Original {...props} />;
  }

  const resp = responses["200"] || {};
  const media = (resp.content && resp.content["application/json"]) || null;
  const schema = media && media.schema;
  const result =
    (schema && schema.properties && schema.properties.result) || schema;

  return (
    <div className="openapi-returns">
      <Heading as="h2" className="openapi-tabs__heading" id="returns">
        Returns
      </Heading>
      {resp.description ? <Markdown>{resp.description}</Markdown> : null}
      {result ? <JsonRpcSchema schema={flattenScalarOneOf(result)} schemaType="response" /> : null}
    </div>
  );
}
