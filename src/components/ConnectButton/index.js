import React, { useState, useRef, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

function ConnectWalletInner() {
  const { useAppKit, useAppKitAccount } = require('@reown/appkit/react');
  const { useDisconnect } = require('wagmi');
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  if (!isConnected) {
    return (
      <button className={styles.btn} onClick={() => open({ view: 'Connect' })}>
        Connect Wallet
      </button>
    );
  }

  const shortAddr = `${address.slice(0, 6)}…${address.slice(-4)}`;

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button className={styles.btn} onClick={() => setDropdownOpen((v) => !v)}>
        {shortAddr}
      </button>
      {dropdownOpen && (
        <div className={styles.dropdown}>
          <button
            className={styles.dropdownItem}
            onClick={() => { disconnect(); setDropdownOpen(false); }}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

export default function ConnectButton() {
  return (
    <BrowserOnly>
      {() => <ConnectWalletInner />}
    </BrowserOnly>
  );
}
