/**
 * On the static JSON-RPC pages, shows the handwritten code samples in a
 * language dropdown, under an endpoint picker (public node / RPC API / custom)
 * that rewrites the base URL in the sample. Other pages keep the theme's
 * client-generated snippets.
 */
import React, { useMemo, useState } from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import Original from "@theme-original/ApiExplorer/CodeSnippets";
import CodeBlock from "@theme/CodeBlock";
import EndpointSelector from "../EndpointSelector";
import { useEndpoint } from "../EndpointContext";
import { buildEndpoints, resolveEndpoint, rewriteEndpoint } from "../endpoints";

const PRISM_LANG = {
  curl: "bash",
  bash: "bash",
  shell: "bash",
  javascript: "javascript",
  js: "javascript",
  python: "python",
  go: "go",
  java: "java",
};

export default function CodeSnippets(props) {
  const { codeSamples, servers } = props;
  const { frontMatter } = useDoc();
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const endpoint = useEndpoint();

  const endpoints = useMemo(() => buildEndpoints(servers), [servers]);
  const resolved = useMemo(
    () => resolveEndpoint(endpoint, endpoints),
    [endpoint.access, endpoint.network, endpoint.apiKey, endpoints]
  );

  if (!frontMatter.hide_send_button || !codeSamples || codeSamples.length === 0) {
    return <Original {...props} />;
  }

  const current = codeSamples[Math.min(active, codeSamples.length - 1)];
  const prism = PRISM_LANG[String(current.lang || "").toLowerCase()] || "text";
  const source = rewriteEndpoint(
    String(current.source || "").trim(),
    resolved,
    endpoints
  );

  return (
    <div className="openapi-static-request">
      <EndpointSelector endpoint={endpoint} resolved={resolved} />
      <div className="openapi-static-request__head">
        <span className="openapi-static-request__title">Request example</span>
        <span className="openapi-lang-select">
          <button
            type="button"
            className="openapi-lang-select__btn"
            onClick={() => setMenuOpen((v) => !v)}
            onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
          >
            {current.label || current.lang}{" "}
            <span className="openapi-lang-select__chev">▾</span>
          </button>
          {menuOpen && (
            <span className="openapi-lang-select__menu">
              {codeSamples.map((s, i) => (
                <button
                  key={s.label || s.lang || i}
                  type="button"
                  className={
                    "openapi-lang-select__item" + (i === active ? " active" : "")
                  }
                  onMouseDown={() => {
                    setActive(i);
                    setMenuOpen(false);
                  }}
                >
                  {s.label || s.lang}
                </button>
              ))}
            </span>
          )}
        </span>
      </div>
      <CodeBlock language={prism}>{source}</CodeBlock>
    </div>
  );
}
