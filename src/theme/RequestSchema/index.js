/**
 * Renders the request body of a JSON-RPC method as a "Parameters" section: the
 * positional params listed by name, each with its type and description. The
 * shared jsonrpc/method/id envelope is not repeated here — a note links to the
 * JSON-RPC protocol page. Any non-envelope body uses the theme's own component.
 */
import React from "react";
import Original from "@theme-original/RequestSchema";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import { JsonRpcSchema, schemaKindLabel, flattenScalarOneOf } from "../openapi-schema";

function isJsonRpcEnvelope(schema) {
  const p = schema && schema.properties;
  return !!(p && p.jsonrpc && p.method && p.params && p.id);
}

export default function RequestSchema(props) {
  const { body, jsonrpcParams } = props;
  const media = body && body.content && body.content["application/json"];
  const schema = media && media.schema;

  if (!schema || !isJsonRpcEnvelope(schema)) {
    return <Original {...props} />;
  }

  const params = schema.properties.params || {};
  const items = params.items || {};
  const positions = Array.isArray(items.oneOf)
    ? items.oneOf
    : Object.keys(items).length
      ? [items]
      : [];
  const maxItems = typeof params.maxItems === "number" ? params.maxItems : positions.length;
  const hasParams = maxItems > 0 && positions.length > 0;

  return (
    <div className="openapi-jsonrpc">
      <Heading as="h2" className="openapi-tabs__heading" id="parameters">
        Parameters
      </Heading>

      <p className="openapi-jsonrpc__note">
        The JSON-RPC 2.0 envelope (<code>jsonrpc</code>, <code>method</code>,{" "}
        <code>id</code>) is the same for every method and is shown in the request
        sample — see <Link to="/rskj/json-rpc-protocol">JSON-RPC protocol</Link>.
      </p>

      {!hasParams ? (
        <p className="openapi-jsonrpc__empty">
          This method does not accept any parameters — send an empty{" "}
          <code>params</code> array.
        </p>
      ) : (
        positions.map((pos, i) => {
          const meta = (jsonrpcParams && jsonrpcParams[i]) || {};
          const name = meta.name || pos.title || `param ${i}`;
          return (
            <div key={i} className="openapi-jsonrpc__param">
              <Heading
                as="h3"
                className="openapi-jsonrpc__param-heading"
                id={`param-${i}-${String(name).toLowerCase()}`}
              >
                <span className="openapi-jsonrpc__param-index">[{i}]</span>{" "}
                <span className="openapi-jsonrpc__param-name">{name}</span>
                <span className="openapi-jsonrpc__param-type">
                  · {schemaKindLabel(flattenScalarOneOf(pos))}
                </span>
                {meta.required && (
                  <span className="openapi-schema__required">required</span>
                )}
              </Heading>
              {meta.description ? (
                <p className="openapi-jsonrpc__param-desc">{meta.description}</p>
              ) : null}
              <JsonRpcSchema schema={flattenScalarOneOf(pos)} schemaType="request" showType={false} />
            </div>
          );
        })
      )}
    </div>
  );
}
