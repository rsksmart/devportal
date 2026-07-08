import React, { useCallback, useEffect, useRef, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import styles from "./styles.module.scss";

// Native currency symbol per known Rootstock chain (chainId is hex, lowercase).
// Falls back to a generic symbol for any other connected network.
const NATIVE_SYMBOL_BY_CHAIN = {
  "0x1e": "RBTC", // Rootstock Mainnet (30)
  "0x1f": "tRBTC", // Rootstock Testnet (31)
};
const DEFAULT_SYMBOL = "RBTC";
const WEI_PER_ETHER = 1000000000000000000n; // 1e18
const BALANCE_DECIMALS = 4;

/** Shorten an address to the familiar 0x1234…abcd form. */
function shortenAddress(address) {
  if (!address) return "";
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

/** Convert a wei balance (hex string) to a fixed-decimal human string, using
 *  BigInt so we never lose precision on large balances. */
function formatBalance(weiHex) {
  let wei;
  try {
    wei = BigInt(weiHex);
  } catch {
    return "0";
  }
  const whole = wei / WEI_PER_ETHER;
  const scale = 10n ** BigInt(BALANCE_DECIMALS);
  const fraction = ((wei % WEI_PER_ETHER) * scale) / WEI_PER_ETHER;
  const fractionStr = fraction.toString().padStart(BALANCE_DECIMALS, "0");
  return `${whole.toString()}.${fractionStr}`;
}

function symbolForChain(chainId) {
  return NATIVE_SYMBOL_BY_CHAIN[(chainId || "").toLowerCase()] || DEFAULT_SYMBOL;
}

function WalletIcon() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1h1a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm2 1v9h14V10h-4a2 2 0 0 0 0 4h4v-2h-4V9h4V8H5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={open ? styles.chevronOpen : styles.chevron}
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ConnectWallet() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState(DEFAULT_SYMBOL);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const containerRef = useRef(null);

  const hasProvider =
    typeof window !== "undefined" && typeof window.ethereum !== "undefined";

  const refreshBalance = useCallback(async (address) => {
    if (!address || !window.ethereum) return;
    try {
      const [weiHex, chainId] = await Promise.all([
        window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        }),
        window.ethereum.request({ method: "eth_chainId" }),
      ]);
      setSymbol(symbolForChain(chainId));
      setBalance(formatBalance(weiHex));
    } catch (err) {
      console.error("Failed to fetch RBTC balance:", err);
      setBalance(null);
    }
  }, []);

  const applyAccounts = useCallback(
    (accounts) => {
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        refreshBalance(accounts[0]);
      } else {
        setAccount(null);
        setBalance(null);
        setMenuOpen(false);
      }
    },
    [refreshBalance]
  );

  // Restore an already-authorized connection on mount without prompting, and
  // subscribe to wallet events so the UI stays in sync.
  useEffect(() => {
    if (!hasProvider) return undefined;

    window.ethereum
      .request({ method: "eth_accounts" })
      .then(applyAccounts)
      .catch((err) => console.error("Failed to read accounts:", err));

    const handleAccountsChanged = (accounts) => applyAccounts(accounts);
    const handleChainChanged = () => {
      if (account) refreshBalance(account);
    };

    window.ethereum.on?.("accountsChanged", handleAccountsChanged);
    window.ethereum.on?.("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener?.(
        "accountsChanged",
        handleAccountsChanged
      );
      window.ethereum.removeListener?.("chainChanged", handleChainChanged);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasProvider, applyAccounts]);

  // Close the dropdown on outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const connect = useCallback(async () => {
    if (!hasProvider) {
      window.open("https://metamask.io/download/", "_blank", "noopener");
      return;
    }
    setError(null);
    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      applyAccounts(accounts);
    } catch (err) {
      // 4001 = user rejected the request.
      if (err?.code !== 4001) {
        setError("Could not connect wallet. Please try again.");
      }
      console.error("Wallet connection failed:", err);
    } finally {
      setIsConnecting(false);
    }
  }, [hasProvider, applyAccounts]);

  const disconnect = useCallback(() => {
    // MetaMask exposes no programmatic disconnect; we reset our local state so
    // the UI returns to the disconnected view. The next connect will prompt.
    setAccount(null);
    setBalance(null);
    setMenuOpen(false);
  }, []);

  // Disconnected state — a single connect button.
  if (!account) {
    return (
      <div className={styles.walletRoot} ref={containerRef}>
        <button
          type="button"
          className={`btn btn-sm ${styles.connectBtn}`}
          onClick={connect}
          disabled={isConnecting}
          aria-label={
            hasProvider ? "Connect wallet" : "Install MetaMask to connect wallet"
          }
        >
          <WalletIcon />
          <span>{isConnecting ? "Connecting…" : "Connect Wallet"}</span>
        </button>
        {error && (
          <span className={styles.error} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }

  // Connected state — button toggles a dropdown with balance + disconnect.
  return (
    <div className={styles.walletRoot} ref={containerRef}>
      <button
        type="button"
        className={`btn btn-sm ${styles.connectBtn} ${styles.connectedBtn}`}
        onClick={() => setMenuOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-label={`Wallet ${shortenAddress(account)}. Open wallet menu`}
      >
        <span className={styles.statusDot} aria-hidden="true" />
        <span className={styles.address}>{shortenAddress(account)}</span>
        <ChevronIcon open={menuOpen} />
      </button>

      {menuOpen && (
        <div className={styles.dropdown} role="menu">
          <div className={styles.balanceRow}>
            <span className={styles.balanceLabel}>Balance</span>
            <span className={styles.balanceValue}>
              {balance !== null ? `${balance} ${symbol}` : "—"}
            </span>
          </div>
          <button
            type="button"
            className={`btn btn-sm ${styles.disconnectBtn}`}
            onClick={disconnect}
            role="menuitem"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

export default function WrappedConnectWallet() {
  return (
    <BrowserOnly>{() => <ConnectWallet />}</BrowserOnly>
  );
}
