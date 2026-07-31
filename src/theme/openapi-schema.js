/**
 * Schema helpers and renderer for the JSON-RPC method pages.
 *
 * flattenScalarOneOf() collapses a oneOf whose branches are all scalars into a
 * single inline type, listing the alternatives as bullets so each constraint
 * stays next to its variant.
 *
 * JsonRpcSchema() renders a schema consistently: a scalar (or a schema with no
 * property name) becomes a tidy row with its type, description and possible
 * values; a oneOf with object branches becomes variant tabs; objects and arrays
 * use the theme's own node.
 */
import React, { useState } from "react";
import Markdown from "@theme/Markdown";
import SchemaNode from "@theme/Schema";

const SCALAR_TYPES = ["string", "integer", "number", "boolean", "null"];

function isScalar(s) {
  if (!s || typeof s !== "object") return false;
  if (s.properties || s.items || s.oneOf || s.anyOf || s.allOf) return false;
  return SCALAR_TYPES.includes(s.type) || Array.isArray(s.enum);
}

function variantLabel(v) {
  if (v.type === "null") return "null";
  return v.title || v.type || "value";
}

export function flattenScalarOneOf(node) {
  if (Array.isArray(node)) return node.map(flattenScalarOneOf);
  if (!node || typeof node !== "object") return node;

  const out = {};
  for (const [k, v] of Object.entries(node)) out[k] = flattenScalarOneOf(v);

  const variants = out.oneOf;
  if (!Array.isArray(variants) || variants.length === 0) return out;
  if (!variants.every(isScalar)) return out;

  const { oneOf, ...rest } = out;
  const flat = { ...rest };

  if (variants.length === 1) {
    return { ...variants[0], ...rest, type: variants[0].type };
  }

  const types = [...new Set(variants.map((v) => v.type || "string"))];
  flat.type = types.join(" | ");

  const bullets = variants.map((v) => {
    const bits = [];
    if (v.description) bits.push(v.description.replace(/\s+$/, "").replace(/\.$/, ""));
    if (v.pattern) bits.push("pattern \`" + v.pattern + "\`");
    if (Array.isArray(v.enum))
      bits.push("one of " + v.enum.map((x) => "\`" + String(x) + "\`").join(", "));
    return "- **" + variantLabel(v) + "** — " + (bits.join(" · ") || v.type);
  });
  flat.description = flat.description
    ? flat.description + "\n\n" + bullets.join("\n")
    : bullets.join("\n");

  return flat;
}

// One-word kind label for the parameter heading: string / one of / object / array.
export function schemaKindLabel(s) {
  if (!s || typeof s !== "object") return "";
  if (Array.isArray(s.oneOf)) return "one of";
  if (isScalar(s)) return s.type || "string";
  if (s.type === "array" || s.items) return "array";
  return "object";
}

function ScalarRow({ schema, showType = true }) {
  const title = schema.title;
  const type = schema.type || (Array.isArray(schema.enum) ? "string" : "");
  return (
    <div className="openapi-scalar">
      {showType ? (
        <span className="openapi-scalar__type">
          {title && title !== type ? (
            <>
              {title} <em>({type})</em>
            </>
          ) : (
            type
          )}
        </span>
      ) : null}
      {schema.description ? <Markdown>{schema.description}</Markdown> : null}
      {schema.pattern ? (
        <p className="openapi-scalar__meta">
          <strong>Possible values:</strong> Value must match regular expression{" "}
          <code>{schema.pattern}</code>
        </p>
      ) : null}
      {Array.isArray(schema.enum) ? (
        <p className="openapi-scalar__meta">
          <strong>Possible values:</strong> [
          {schema.enum.map((v, i) => (
            <React.Fragment key={String(v)}>
              {i > 0 ? ", " : ""}
              <code>{String(v)}</code>
            </React.Fragment>
          ))}
          ]
        </p>
      ) : null}
    </div>
  );
}

function VariantTabs({ variants, schemaType }) {
  const [active, setActive] = useState(0);
  const current = variants[Math.min(active, variants.length - 1)];
  return (
    <div className="openapi-onetabs-wrap">
      <div className="openapi-onetabs">
        {variants.map((v, i) => (
          <button
            key={variantLabel(v) + i}
            type="button"
            className={"openapi-onetab" + (i === active ? " active" : "")}
            onClick={() => setActive(i)}
          >
            {variantLabel(v)}
          </button>
        ))}
      </div>
      <div className="openapi-onetabs__panel">
        <JsonRpcSchema schema={current} schemaType={schemaType} />
      </div>
    </div>
  );
}

export function JsonRpcSchema({ schema, schemaType, showType = true }) {
  if (!schema || typeof schema !== "object") return null;
  if (Array.isArray(schema.oneOf) && schema.oneOf.length > 0) {
    return <VariantTabs variants={schema.oneOf} schemaType={schemaType} />;
  }
  if (isScalar(schema)) {
    return <ScalarRow schema={schema} showType={showType} />;
  }
  return <SchemaNode schema={schema} schemaType={schemaType} />;
}
