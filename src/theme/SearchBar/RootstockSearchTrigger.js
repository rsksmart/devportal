import React, {forwardRef, useEffect, useState} from 'react';

const defaultKeyboardShortcuts = {'Ctrl/Cmd+K': true, '/': true};

function SearchIcon({size = 20, color = 'currentColor'}) {
  return (
    <svg
      width={size}
      height={size}
      className="rs-search-trigger__icon"
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
 * Rootstock navbar search control. Uses `rs-search-trigger` so DocSearch v4 CSS
 * cannot restyle the button. Keeps `DocSearch-Button` for NotFound click-through.
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
      className="rs-search-trigger DocSearch-Button"
      aria-label={showCmdK ? `${buttonAriaLabel} (${ariaShortcut})` : buttonAriaLabel}
      aria-keyshortcuts={showCmdK ? ariaShortcut : undefined}
      ref={ref}
      {...rest}>
      <span className="rs-search-trigger__inner">
        <SearchIcon />
        <span className="rs-search-trigger__placeholder">{buttonText}</span>
      </span>
      {showCmdK && modKey !== null && (
        <span className="rs-search-trigger__keys">
          <kbd
            className={
              modKey === '⌘'
                ? 'rs-search-trigger__key'
                : 'rs-search-trigger__key rs-search-trigger__key--ctrl'
            }>
            {modKey}
          </kbd>
          <kbd className="rs-search-trigger__key">K</kbd>
        </span>
      )}
    </button>
  );
});

export default RootstockSearchTrigger;
