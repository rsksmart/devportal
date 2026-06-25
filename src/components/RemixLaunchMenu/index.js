import React, { useState, useRef, useEffect } from 'react'
import RemixLaunchButton from '/src/components/RemixLaunchButton'

// A small dropdown for pages that have more than one deployable contract.
// `contracts` is an array of { label, remix?, code?, contractUrl? }.
// Each item reuses RemixLaunchButton, so the pre-flight modal and deep-link
// behavior are identical to the in-page buttons.
export default function RemixLaunchMenu({ contracts = [], label = 'Try in Remix IDE' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleOutside(e) {
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
    <div className="position-relative" ref={ref}>
      <button
        type="button"
        className="btn btn-primary btn-sm w-100 d-flex justify-content-between align-items-center"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span>{label}</span>
        <span aria-hidden="true">{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div className="d-flex flex-column gap-8 mt-8 p-8 border rounded bg-body">
          {contracts.map((contract, i) => (
            <RemixLaunchButton
              key={i}
              deepLink={contract.remix}
              code={contract.code}
              contractUrl={contract.contractUrl}
              label={contract.label}
              className="btn btn-outline-secondary btn-sm w-100 text-start"
            />
          ))}
        </div>
      )}
    </div>
  )
}
