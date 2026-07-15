import React, { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import BrowserOnly from '@docusaurus/BrowserOnly'
import IconRbtc from '@theme/Icon/Rbtc'

// Rootstock chain ids (as reported by MetaMask, lowercase hex) mapped to the
// native currency label shown next to the balance.
const CURRENCY_BY_CHAIN_ID = {
  '0x1e': 'RBTC', // Rootstock Mainnet
  '0x1f': 'tRBTC', // Rootstock Testnet
}
const DEFAULT_CURRENCY_SYMBOL = 'RBTC'

// EIP-1193 error code for "user rejected request" (e.g. closed the MetaMask
// popup) - not a real failure, so we don't log it.
const USER_REJECTED_ERROR_CODE = 4001

function shortenAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Formats an `eth_getBalance` wei hex string into a trimmed decimal string
// (max 4 fraction digits). Plain BigInt math avoids pulling in a
// bignumber/ethers dependency just for this.
function formatBalance(weiHex) {
  const wei = BigInt(weiHex)
  const divisor = 10n ** 18n
  const whole = wei / divisor
  const fraction = wei % divisor
  const fractionStr = fraction.toString().padStart(18, '0').slice(0, 4)
  return `${whole.toString()}.${fractionStr}`.replace(/\.?0+$/, '') || '0'
}

function WalletConnectButton() {
  const [address, setAddress] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [balance, setBalance] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const containerRef = useRef(null)

  const fetchBalance = useCallback(async (account) => {
    if (!account) return
    try {
      const weiHex = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      })
      setBalance(formatBalance(weiHex))
    } catch (error) {
      console.error('Failed to fetch RBTC balance:', error)
    }
  }, [])

  // Syncs component state to a given account (or clears it when disconnected).
  const refreshAccount = useCallback(
    async (account) => {
      if (!account) {
        setAddress(null)
        setChainId(null)
        setBalance(null)
        return
      }
      setAddress(account)
      try {
        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' })
        setChainId(currentChainId)
      } catch (error) {
        console.error('Failed to read the connected chain id:', error)
      }
      await fetchBalance(account)
    },
    [fetchBalance],
  )

  useEffect(() => {
    if (typeof window.ethereum === 'undefined') {
      return undefined
    }

    // Restores an already-authorized connection without prompting the user.
    window.ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts) => refreshAccount(accounts[0]))
      .catch((error) => console.error('Failed to read connected accounts:', error))

    const handleAccountsChanged = (accounts) => refreshAccount(accounts[0])
    const handleChainChanged = () => {
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts) => refreshAccount(accounts[0]))
        .catch((error) => console.error('Failed to refresh account after network change:', error))
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged)
    window.ethereum.on('chainChanged', handleChainChanged)

    return () => {
      window.ethereum.removeListener?.('accountsChanged', handleAccountsChanged)
      window.ethereum.removeListener?.('chainChanged', handleChainChanged)
    }
  }, [refreshAccount])

  useEffect(() => {
    function handleOutsideClick(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    function handleEscape(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed. Please install MetaMask to use this feature.')
      return
    }
    setIsConnecting(true)
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await refreshAccount(accounts[0])
    } catch (error) {
      if (error?.code !== USER_REJECTED_ERROR_CODE) {
        console.error('Failed to connect wallet:', error)
      }
    } finally {
      setIsConnecting(false)
    }
  }

  async function disconnectWallet() {
    setMenuOpen(false)
    try {
      // Best-effort: supported by newer MetaMask versions (EIP-2255). Older
      // wallets have no API for a dApp to force a disconnect, so this is
      // wrapped in a try/catch and we always clear local state below.
      await window.ethereum?.request({
        method: 'wallet_revokePermissions',
        params: [{ eth_accounts: {} }],
      })
    } catch (error) {
      // Not supported everywhere - ignore and fall back to local state only.
    }
    setAddress(null)
    setChainId(null)
    setBalance(null)
  }

  if (!address) {
    return (
      <button
        type="button"
        className="btn btn-outline btn-sm wallet-connect-trigger"
        onClick={connectWallet}
        disabled={isConnecting}
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    )
  }

  const currencySymbol = CURRENCY_BY_CHAIN_ID[chainId?.toLowerCase()] || DEFAULT_CURRENCY_SYMBOL

  return (
    <div className="wallet-connect" ref={containerRef}>
      <div className={clsx('dropdown', menuOpen && 'dropdown--show')}>
        <button
          type="button"
          className="wallet-connect-trigger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-haspopup="true"
          aria-expanded={menuOpen}
          aria-label={`Wallet connected: ${address}. Toggle wallet menu.`}
        >
          {shortenAddress(address)}
        </button>
        <ul className="dropdown__menu wallet-connect-menu" role="menu">
          <li
            className="wallet-connect-balance"
            role="none"
            aria-label={`Balance: ${balance !== null ? `${balance} ${currencySymbol}` : 'loading'}`}
          >
            <IconRbtc />
            <span>{balance !== null ? `${balance} ${currencySymbol}` : 'Loading balance...'}</span>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="dropdown__link wallet-connect-disconnect"
              onClick={disconnectWallet}
            >
              Disconnect
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

// `window.ethereum` only exists in the browser, so this is rendered lazily
// via BrowserOnly to keep the static/SSR build clean (same pattern used by
// AddNetworkButtons).
export default function WrappedWalletConnectButton() {
  return (
    <BrowserOnly fallback={<span className="wallet-connect-placeholder" aria-hidden="true" />}>
      {() => <WalletConnectButton />}
    </BrowserOnly>
  )
}
