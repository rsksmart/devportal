import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { pushDataLayer } from '/src/_utils/analytics'

const REMIX_URL =
  'https://remix.ethereum.org/#url=https://github.com/rsksmart/rootstock-quick-start-guide/blob/feat/complete/contracts/MyToken.sol'

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

export default function RemixLaunchButton({ label = 'Try in Remix IDE' }) {
  const [show, setShow] = useState(false)

  return (
    <>
      <button
        type="button"
        className="btn btn-primary mt-8"
        onClick={() => {
          pushDataLayer('remixLaunchModalOpen', { contractUrl: REMIX_URL })
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

          <p className="mb-24 text-muted small">
            Need more detail? See the full{' '}
            <a href="/developers/quickstart/remix/" target="_blank" rel="noopener noreferrer">
              Remix + Rootstock guide
            </a>
            .
          </p>

          <div className="d-flex gap-16 flex-wrap">
            <a
              href={REMIX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              onClick={() => {
                pushDataLayer('remixLaunchConfirm', { contractUrl: REMIX_URL })
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
