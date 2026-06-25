import React, { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import RemixLaunchButton from '/src/components/RemixLaunchButton'

// Inline play triangle (no matching sprite icon exists).
function IconPlay() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4.5 2.5v11a.5.5 0 0 0 .76.43l9-5.5a.5.5 0 0 0 0-.86l-9-5.5a.5.5 0 0 0-.76.43Z" />
    </svg>
  )
}

// Solid downward triangle (closed on all sides) for the dropdown caret.
function IconCaretDown() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
      <path d="M1 3.5h8L5 8z" />
    </svg>
  )
}

// Document/file icon for each contract entry (from the SVG sprite).
function IconDoc() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <use xlinkHref="#icon-doc" />
    </svg>
  )
}

// A dropdown for pages with more than one deployable contract. Styled to match
// the "Copy page" markdown-actions menu. `contracts` is an array of
// { label, remix?, code?, contractUrl? }. Each item reuses RemixLaunchButton,
// so the pre-flight modal and deep-link behavior match the in-page buttons.
export default function RemixLaunchMenu({ contracts = [], label = 'Try in Remix IDE' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleOutside(e) {
      // The pre-flight modal renders in a portal on document.body (outside this
      // ref). Ignore clicks inside the modal/backdrop so the dropdown does not
      // close while the user is interacting with the modal.
      if (e.target.closest && e.target.closest('.modal, .modal-backdrop')) {
        return
      }
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  if (!contracts.length) {
    return null
  }

  return (
    <div className="remix-menu" ref={ref}>
      <div className={clsx('remix-menu-split dropdown', open && 'dropdown--show')}>
        <button
          type="button"
          className="remix-menu-trigger"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-haspopup="true"
        >
          <IconPlay />
          <span className="remix-menu-trigger-label">{label}</span>
          <span className="markdown-actions-chevron" aria-hidden="true">
            <IconCaretDown />
          </span>
        </button>
        <ul className="dropdown__menu">
          {contracts.map((contract, i) => (
            <li key={i}>
              <RemixLaunchButton
                deepLink={contract.remix}
                code={contract.code}
                contractUrl={contract.contractUrl}
                className="markdown-actions-item dropdown__link"
                label={
                  <>
                    <IconDoc />
                    <span className="markdown-actions-item-text">
                      <span className="markdown-actions-item-title">{contract.label}</span>
                    </span>
                  </>
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
