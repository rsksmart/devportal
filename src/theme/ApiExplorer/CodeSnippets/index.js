/**
 * On the static JSON-RPC pages, shows the handwritten code samples in a
 * language dropdown, with a Testnet/Mainnet switch that rewrites the base URL
 * in the sample. Other pages keep the theme's client-generated snippets.
 */
import React, { useState } from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import Original from "@theme-original/ApiExplorer/CodeSnippets";
import CodeBlock from "@theme/CodeBlock";

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

function resolveServerUrl(server) {
  let url = server.url || "";
  const vars = server.variables || {};
  for (const [name, v] of Object.entries(vars)) {
    url = url.replaceAll(`{${name}}`, (v && v.default) || name.toUpperCase());
  }
  return url;
}

function serverLabel(server) {
  const u = (server.url || "").toLowerCase();
  if (u.includes("testnet")) return "Testnet";
  if (u.includes("mainnet")) return "Mainnet";
  return server.description || server.url;
}

export default function CodeSnippets(props) {
  const { codeSamples, servers } = props;
  const { frontMatter } = useDoc();
  const [active, setActive] = useState(0);
  const [net, setNet] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!frontMatter.hide_send_button || !codeSamples || codeSamples.length === 0) {
    return <Original {...props} />;
  }

  const serverList = Array.isArray(servers) ? servers : [];
  const bases = serverList.map(resolveServerUrl);

  const current = codeSamples[Math.min(active, codeSamples.length - 1)];
  const prism = PRISM_LANG[String(current.lang || "").toLowerCase()] || "text";

  let source = String(current.source || "").trim();
  if (bases.length > 1) {
    const target = bases[Math.min(net, bases.length - 1)];
    for (const base of bases) {
      if (base !== target) source = source.replaceAll(base, target);
    }
  }

  return (
    <div className="openapi-static-request">
      {bases.length > 1 && (
        <div className="openapi-network-row">
          <span className="openapi-network-row__label">Network</span>
          {serverList.map((s, i) => (
            <button
              key={s.url}
              type="button"
              title={s.description || s.url}
              className={
                "openapi-network-row__tab" + (i === net ? " active" : "")
              }
              onClick={() => setNet(i)}
            >
              {serverLabel(s)}
            </button>
          ))}
        </div>
      )}
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
