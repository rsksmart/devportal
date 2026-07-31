/**
 * On the static JSON-RPC pages, shows a fixed response example (success/error
 * as tabs when both are present) instead of the live send-request panel. Other
 * pages keep the theme's original panel.
 */
import React, { useState } from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import Original from "@theme-original/ApiExplorer/Response";
import CodeBlock from "@theme/CodeBlock";

function collectExamples(item) {
  const resp = item && item.responses && (item.responses["200"] || item.responses[200]);
  const media = resp && resp.content && resp.content["application/json"];
  if (!media) return [];
  if (media.examples && typeof media.examples === "object") {
    return Object.entries(media.examples).map(([k, v]) => [
      k.charAt(0).toUpperCase() + k.slice(1),
      v && v.value !== undefined ? v.value : v,
    ]);
  }
  if (media.example !== undefined) return [["Success", media.example]];
  return [];
}

export default function Response(props) {
  const { frontMatter } = useDoc();
  const [active, setActive] = useState(0);

  if (!frontMatter.hide_send_button) return <Original {...props} />;

  const entries = collectExamples(props.item);
  if (entries.length === 0) return <Original {...props} />;

  return (
    <div className="openapi-static-response">
      <div className="openapi-static-response__head">
        <span className="openapi-static-response__title">Response example</span>
        <span className="openapi-static-response__chip">HTTP 200</span>
        {entries.length > 1 && (
          <span className="openapi-static-response__tabs">
            {entries.map(([k], i) => (
              <button
                key={k}
                type="button"
                className={
                  "openapi-static-response__tab" + (i === active ? " active" : "")
                }
                onClick={() => setActive(i)}
              >
                {k}
              </button>
            ))}
          </span>
        )}
      </div>
      <CodeBlock language="json">
        {JSON.stringify(entries[Math.min(active, entries.length - 1)][1], null, 2)}
      </CodeBlock>
    </div>
  );
}
