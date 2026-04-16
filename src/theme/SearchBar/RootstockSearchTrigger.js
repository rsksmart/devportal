import React, {forwardRef, useEffect, useState} from 'react';

const defaultKeyboardShortcuts = {'Ctrl/Cmd+K': true, '/': true};

function SearchIcon({size = 20, color = 'currentColor'}) {
  return (
    <svg
      width={size}
      height={size}
      className="DocSearch-Search-Icon"
      viewBox="0 0 24 24"
      aria-hidden="true">
      <circle
        cx="11"
        cy="11"
        r="8"
        stroke={color}
        fill="none"
        strokeWidth="1.4"
      />
      <path
        d="m21 21-4.3-4.3"
        stroke={color}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Rootstock navbar search control. Matches DocSearch DOM and class names expected by
 * `src/scss/components/_search.scss` and NotFound (`.DocSearch-Button`).
 */
const RootstockSearchTrigger = forwardRef(function RootstockSearchTrigger(
  {translations = {}, keyboardShortcuts = defaultKeyboardShortcuts, ...rest},
  ref,
) {
  const {buttonText = 'Search', buttonAriaLabel = 'Search'} = translations;
  const [modKey, setModKey] = useState(null);

  useEffect(() => {
    if (typeof navigator === 'undefined') {
      return;
    }
    setModKey(
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl',
    );
  }, []);

  const showCmdK = keyboardShortcuts['Ctrl/Cmd+K'];
  const ariaShortcut = modKey === '⌘' ? 'Meta+k' : 'Control+k';

  return (
    <button
      type="button"
      className="DocSearch DocSearch-Button"
      aria-label={showCmdK ? `${buttonAriaLabel} (${ariaShortcut})` : buttonAriaLabel}
      aria-keyshortcuts={showCmdK ? ariaShortcut : undefined}
      ref={ref}
      {...rest}>
      <span className="DocSearch-Button-Container">
        <SearchIcon />
        <span className="DocSearch-Button-Placeholder">{buttonText}</span>
      </span>
      {showCmdK && modKey !== null && (
        <span className="DocSearch-Button-Keys">
          <kbd
            className={
              modKey === '⌘'
                ? 'DocSearch-Button-Key'
                : 'DocSearch-Button-Key DocSearch-Button-Key--ctrl'
            }>
            {modKey}
          </kbd>
          <kbd className="DocSearch-Button-Key">K</kbd>
        </span>
      )}
    </button>
  );
});

export default RootstockSearchTrigger;
