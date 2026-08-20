/**
 * Endpoint model for the static JSON-RPC pages.
 *
 * The spec exposes a flat `servers` list; readers think in two axes — how they
 * reach a node (public node without a key / RPC API with a key) and which
 * network. This module maps one onto the other, so the page can offer the
 * keyless public nodes next to the RPC API.
 *
 * Spec-driven when `servers` carries `x-rootstock: {access, network}`, with the
 * defaults below filling whatever the spec does not describe yet.
 */

export const ACCESS = {
  PUBLIC: "public-node",
  RPC_API: "rpc-api",
};

export const ACCESS_OPTIONS = [
  { id: ACCESS.PUBLIC, label: "Public node" },
  { id: ACCESS.RPC_API, label: "RPC API" },
];

export const NETWORKS = [
  { id: "testnet", label: "Testnet", chainId: "0x1f" },
  { id: "mainnet", label: "Mainnet", chainId: "0x1e" },
];

export const API_KEY_PLACEHOLDER = "YOUR_API_KEY";

const DEFAULT_ENDPOINTS = [
  { access: ACCESS.PUBLIC, network: "testnet", url: "https://public-node.testnet.rsk.co" },
  { access: ACCESS.PUBLIC, network: "mainnet", url: "https://public-node.rsk.co" },
  { access: ACCESS.RPC_API, network: "testnet", url: "https://rpc.testnet.rootstock.io/{apiKey}" },
  { access: ACCESS.RPC_API, network: "mainnet", url: "https://rpc.mainnet.rootstock.io/{apiKey}" },
];

function classifyServer(server) {
  const meta = server["x-rootstock"] || {};
  const url = String(server.url || "");
  const low = url.toLowerCase();
  return {
    access: meta.access || (low.includes("public-node") ? ACCESS.PUBLIC : ACCESS.RPC_API),
    network: meta.network || (low.includes("testnet") ? "testnet" : "mainnet"),
    url,
    variables: server.variables,
  };
}

/** Spec servers merged over the defaults, keyed by access + network. */
export function buildEndpoints(servers) {
  const merged = DEFAULT_ENDPOINTS.map((e) => ({ ...e }));
  for (const server of Array.isArray(servers) ? servers : []) {
    if (!server || !server.url) continue;
    const entry = classifyServer(server);
    const i = merged.findIndex(
      (m) => m.access === entry.access && m.network === entry.network
    );
    if (i >= 0) merged[i] = entry;
    else merged.push(entry);
  }
  return merged;
}

export function findEndpoint(endpoints, access, network) {
  return endpoints.find((e) => e.access === access && e.network === network);
}

/** Fills server variables; `apiKey` takes the reader's key, or the placeholder. */
export function resolveUrl(entry, apiKey) {
  if (!entry) return "";
  let url = String(entry.url || "");
  for (const [name, v] of Object.entries(entry.variables || {})) {
    if (name === "apiKey") continue;
    url = url.split(`{${name}}`).join((v && v.default) || name.toUpperCase());
  }
  return url.split("{apiKey}").join(String(apiKey || "").trim() || API_KEY_PLACEHOLDER);
}

export function resolveEndpoint(state, endpoints) {
  return resolveUrl(
    findEndpoint(endpoints, state.access, state.network),
    state.apiKey
  );
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Swaps whichever Rootstock base URL a hand-written sample happens to carry for
 * the one the reader picked. Matching by host (with an optional path segment,
 * which is where the API key sits) rather than by literal string, so it holds
 * whether the sample says `rpc.testnet.rootstock.io/YOUR_API_KEY` or a bare
 * `public-node.rsk.co`, and survives the spec changing its own URLs.
 */
export function rewriteEndpoint(source, target, endpoints) {
  if (!source || !target) return source;
  const hosts = new Set();
  for (const entry of endpoints) {
    const match = /^https?:\/\/([^/\s{]+)/i.exec(String(entry.url || ""));
    if (match) hosts.add(match[1].toLowerCase());
  }
  if (hosts.size === 0) return source;
  const alternatives = [...hosts].map(escapeRegExp).join("|");
  const re = new RegExp(
    `https?://(?:${alternatives})(?:/[^\\s'"\`\\\\)]*)?`,
    "gi"
  );
  return source.replace(re, () => target);
}

/**
 * Shape check only — the exact key format is not published, so a mismatch is a
 * warning and never blocks the input.
 */
const API_KEY_SHAPE = /^[A-Za-z0-9_-]{8,64}$/;

export function validateApiKey(key) {
  const value = String(key || "").trim();
  if (!value) return { state: "empty" };
  if (!API_KEY_SHAPE.test(value)) {
    return {
      state: "warn",
      message:
        "This doesn't look like a key from the RPC dashboard — the samples below still use it.",
    };
  }
  return { state: "ok" };
}

export function chainIdFor(network) {
  return (NETWORKS.find((n) => n.id === network) || {}).chainId;
}

export function networkLabel(network) {
  return (NETWORKS.find((n) => n.id === network) || {}).label || network;
}
