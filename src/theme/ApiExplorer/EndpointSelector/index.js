/**
 * Endpoint picker shown above the request sample on the static JSON-RPC pages.
 *
 * Two axes plus a custom URL: the public nodes need no API key, the RPC API
 * does. Whatever is picked here is what the samples below print, so what the
 * reader copies is runnable as-is.
 */
import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import {
  ACCESS,
  ACCESS_OPTIONS,
  NETWORKS,
  chainIdFor,
  networkLabel,
  validateApiKey,
} from "../endpoints";

const PUBLIC_NODES_PAGE = "/node-operators/public-nodes/";
const RPC_DASHBOARD = "https://rpc.rootstock.io/";

function AccessSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const current = ACCESS_OPTIONS.find((o) => o.id === value) || ACCESS_OPTIONS[0];

  return (
    <span className="openapi-endpoint__select">
      <button
        type="button"
        className="openapi-endpoint__select-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      >
        {current.label} <span className="openapi-endpoint__chev">▾</span>
      </button>
      {open && (
        <span className="openapi-endpoint__menu" role="listbox">
          {ACCESS_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="option"
              aria-selected={option.id === value}
              className={
                "openapi-endpoint__menu-item" +
                (option.id === value ? " active" : "")
              }
              onMouseDown={() => {
                onChange(option.id);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </span>
      )}
    </span>
  );
}

function useVerify(resolved, network) {
  const [result, setResult] = useState(null);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  useEffect(() => setResult(null), [resolved]);

  async function run() {
    setResult({ state: "pending", message: "Checking…" });
    try {
      const response = await fetch(resolved, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_chainId",
          params: [],
          id: 1,
        }),
      });
      if (!alive.current) return;
      if (!response.ok) {
        setResult({ state: "fail", message: `HTTP ${response.status}` });
        return;
      }
      const data = await response.json();
      if (!alive.current) return;
      if (data.error) {
        setResult({ state: "fail", message: data.error.message || "RPC error" });
        return;
      }
      const expected = chainIdFor(network);
      const got = String(data.result || "").toLowerCase();
      setResult(
        got === expected
          ? { state: "ok", message: `Works — chain ID ${got} (${networkLabel(network)})` }
          : { state: "warn", message: `Answered with chain ID ${got}, expected ${expected}` }
      );
    } catch (e) {
      if (!alive.current) return;
      setResult({ state: "fail", message: "Endpoint unreachable from the browser" });
    }
  }

  return [result, run];
}

export default function EndpointSelector({ endpoint, resolved }) {
  const {
    access,
    network,
    apiKey,
    remember,
    setAccess,
    setNetwork,
    setApiKey,
    setRemember,
  } = endpoint;

  const [copied, setCopied] = useState(false);
  const [verifyResult, runVerify] = useVerify(resolved, network);
  const keyCheck = validateApiKey(apiKey);

  async function copyEndpoint() {
    try {
      await navigator.clipboard.writeText(resolved);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {}
  }

  return (
    <div className="openapi-endpoint">
      <div className="openapi-endpoint__row">
        <span className="openapi-endpoint__label">Access</span>
        <AccessSelect value={access} onChange={setAccess} />
        {access === ACCESS.PUBLIC && (
          <span className="openapi-endpoint__note">
            No API key required ·{" "}
            <Link to={PUBLIC_NODES_PAGE}>about the public nodes</Link>
          </span>
        )}
      </div>

      <div className="openapi-endpoint__row">
        <span className="openapi-endpoint__label">Network</span>
        {NETWORKS.map((n) => (
          <button
            key={n.id}
            type="button"
            className={
              "openapi-endpoint__tab" + (n.id === network ? " active" : "")
            }
            onClick={() => setNetwork(n.id)}
          >
            {n.label}
          </button>
        ))}
      </div>

      {access === ACCESS.RPC_API && (
        <>
          <div className="openapi-endpoint__row">
            <span className="openapi-endpoint__label">API key</span>
            <input
              type="text"
              className={
                "openapi-endpoint__input" +
                (keyCheck.state === "warn" ? " warn" : "")
              }
              value={apiKey}
              spellCheck={false}
              autoComplete="off"
              placeholder="Paste your key from the RPC dashboard"
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          {keyCheck.message && (
            <p className="openapi-endpoint__msg warn">{keyCheck.message}</p>
          )}
          <div className="openapi-endpoint__row openapi-endpoint__row--sub">
            <label className="openapi-endpoint__remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember on this device
            </label>
            <span className="openapi-endpoint__note">
              Kept in your browser only ·{" "}
              <Link href={RPC_DASHBOARD}>get a key</Link>
            </span>
          </div>
        </>
      )}

      <div className="openapi-endpoint__resolved">
        <code>{resolved}</code>
        {resolved && (
          <>
            <button
              type="button"
              className="openapi-endpoint__verify"
              disabled={verifyResult?.state === "pending"}
              onClick={runVerify}
              title="Send one eth_chainId call to check this endpoint answers"
            >
              Verify
            </button>
            <button
              type="button"
              className="openapi-endpoint__copy"
              title="Copy endpoint"
              aria-label="Copy endpoint"
              onClick={copyEndpoint}
            >
              {copied ? (
                "Copied"
              ) : (
                // the glyph the theme puts on its code blocks
                <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
                  />
                </svg>
              )}
            </button>
          </>
        )}
      </div>

      {verifyResult && (
        <p className={"openapi-endpoint__msg openapi-endpoint__msg--after " + verifyResult.state}>
          {verifyResult.message}
        </p>
      )}
    </div>
  );
}
