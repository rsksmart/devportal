/**
 * The reader's endpoint choice, shared by every JSON-RPC method page.
 *
 * Provided once from the swizzled Root, so picking an endpoint (and pasting a
 * key) survives navigation across the 50 method pages instead of resetting on
 * each one. Storage is touched only in effects — the pages are prerendered.
 *
 * The API key is a credential: it lives in sessionStorage and is gone when the
 * tab closes, unless the reader explicitly asks to remember it.
 */
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ACCESS } from "./endpoints";

const PREFS_KEY = "rootstock.rpc.endpoint";
const API_KEY_KEY = "rootstock.rpc.apiKey";

const DEFAULT_PREFS = {
  access: ACCESS.PUBLIC,
  network: "testnet",
  remember: false,
};

const EndpointContext = createContext(null);

function useEndpointState({ persist }) {
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [apiKey, setApiKey] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!persist) return;
    try {
      const raw = window.localStorage.getItem(PREFS_KEY);
      if (raw) setPrefs((p) => ({ ...p, ...JSON.parse(raw) }));
      const key =
        window.localStorage.getItem(API_KEY_KEY) ??
        window.sessionStorage.getItem(API_KEY_KEY);
      if (key) setApiKey(key);
    } catch (e) {
      // private mode / storage disabled — defaults are fine
    }
    setHydrated(true);
  }, [persist]);

  useEffect(() => {
    if (!persist || !hydrated) return;
    try {
      window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch (e) {}
  }, [persist, hydrated, prefs]);

  useEffect(() => {
    if (!persist || !hydrated) return;
    try {
      const store = prefs.remember ? window.localStorage : window.sessionStorage;
      const other = prefs.remember ? window.sessionStorage : window.localStorage;
      other.removeItem(API_KEY_KEY);
      if (apiKey) store.setItem(API_KEY_KEY, apiKey);
      else store.removeItem(API_KEY_KEY);
    } catch (e) {}
  }, [persist, hydrated, apiKey, prefs.remember]);

  return useMemo(
    () => ({
      ...prefs,
      apiKey,
      setAccess: (access) => setPrefs((p) => ({ ...p, access })),
      setNetwork: (network) => setPrefs((p) => ({ ...p, network })),
      setRemember: (remember) => setPrefs((p) => ({ ...p, remember })),
      setApiKey,
    }),
    [prefs, apiKey]
  );
}

export function EndpointProvider({ children }) {
  const value = useEndpointState({ persist: true });
  return (
    <EndpointContext.Provider value={value}>{children}</EndpointContext.Provider>
  );
}

/**
 * Falls back to component-local state when no provider is mounted, so the
 * selector still works if the Root override is ever dropped — it just stops
 * remembering the choice between pages.
 */
export function useEndpoint() {
  const shared = useContext(EndpointContext);
  const local = useEndpointState({ persist: false });
  return shared || local;
}
