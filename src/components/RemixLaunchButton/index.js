import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { pushDataLayer } from '/src/_utils/analytics'

// `#url=` loads a file from a URL; `?#code=` loads a base64-encoded snippet.
const REMIX_URL_BASE = 'https://remix.ethereum.org/#url='
const REMIX_CODE_BASE = 'https://remix.ethereum.org/?#code='

// Default Solidity file used when neither `contractUrl` nor `code` is provided.
const DEFAULT_CONTRACT_URL =
  'https://github.com/rsksmart/rootstock-quick-start-guide/blob/feat/complete/contracts/MyToken.sol'

// UTF-8 safe base64 encode (btoa alone breaks on non-ASCII characters).
function encodeBase64(source) {
  return btoa(String.fromCharCode(...new TextEncoder().encode(source)))
}

// Build the Remix deep-link. A pre-built `deepLink` wins; otherwise a GitHub
// `contractUrl` takes precedence, then a raw Solidity `code` snippet that is
// base64-encoded and passed via `?#code=`.
function buildRemixUrl({ deepLink, contractUrl, code }) {
  if (deepLink) {
    return deepLink
  }
  if (contractUrl) {
    return `${REMIX_URL_BASE}${contractUrl}`
  }
  if (code) {
    return `${REMIX_CODE_BASE}${encodeURIComponent(encodeBase64(code))}`
  }
  return `${REMIX_URL_BASE}${DEFAULT_CONTRACT_URL}`
}

const STEPS = [
  {
    title: 'Install MetaMask',
    body: (
      <>
        Add the{' '}
        <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">
          MetaMask browser extension
        </a>{' '}
        if you haven&apos;t already.
      </>
    ),
  },
  {
    title: 'Add Rootstock Testnet to MetaMask',
    body: (
      <>
        Configure the Rootstock network in MetaMask. Follow the{' '}
        <a href="/dev-tools/wallets/metamask/" target="_blank" rel="noopener noreferrer">
          MetaMask configuration guide
        </a>{' '}
        for the exact steps.
      </>
    ),
  },
  {
    title: 'Connect Remix to Rootstock',
    body: (
      <>
        In Remix, open the <strong>Deploy &amp; Run Transactions</strong> tab and set{' '}
        <strong>Environment</strong> to <strong>Injected Provider - MetaMask</strong>. MetaMask
        will ask you to confirm the connection.
      </>
    ),
  },
]

export default function RemixLaunchButton({
  label = 'Try in Remix IDE',
  contractUrl,
  code,
  deepLink,
  className = 'btn btn-primary mt-8',
}) {
  const [show, setShow] = useState(false)
  const remixUrl = buildRemixUrl({ deepLink, contractUrl, code })

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          pushDataLayer('remixLaunchModalOpen', { contractUrl: remixUrl })
          setShow(true)
        }}
      >
        {label}
      </button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        size="md"
        aria-labelledby="remix-modal-title"
      >
        <button
          type="button"
          onClick={() => setShow(false)}
          className="btn-blank d-flex position-absolute end-0 top-0 text-body z-1 me-32 mt-32"
          aria-label="Close"
        >
          <svg width="24" height="24">
            <use xlinkHref="#icon-close-circle" />
          </svg>
        </button>

        <Modal.Body>
          <Modal.Title as="h4" id="remix-modal-title" className="mb-16 subtitle-2 pe-32">
            Before you open Remix
          </Modal.Title>

          <p className="mb-16">
            To interact with this contract on Rootstock, make sure you&apos;re set up first:
          </p>

          <ol className="mb-16 ps-20">
            {STEPS.map((step, i) => (
              <li key={i} className="mb-12">
                <strong>{step.title}</strong> &mdash; {step.body}
              </li>
            ))}
          </ol>

          <p className="mb-24 small">
            Need more detail? See the full{' '}
            <a href="/developers/quickstart/remix/" target="_blank" rel="noopener noreferrer">
              Remix + Rootstock guide
            </a>
            .
          </p>

          <div className="d-flex gap-16 flex-wrap">
            <a
              href={remixUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              onClick={() => {
                pushDataLayer('remixLaunchConfirm', { contractUrl: remixUrl })
                setShow(false)
              }}
            >
              Open in Remix IDE
            </a>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
