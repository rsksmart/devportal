import React from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {translate} from '@docusaurus/Translate';
import IconLightMode from '@theme/Icon/LightMode';
import IconDarkMode from '@theme/Icon/DarkMode';
import styles from './styles.module.css';
function ColorModeToggle({className, buttonClassName, value, onChange}) {
  const isBrowser = useIsBrowser();
  const title = translate(
    {
      message: 'Switch between dark and light mode (currently {mode})',
      id: 'theme.colorToggle.ariaLabel',
      description: 'The ARIA label for the navbar color mode toggle',
    },
    {
      mode:
        value === 'dark'
          ? translate({
              message: 'dark mode',
              id: 'theme.colorToggle.ariaLabel.mode.dark',
              description: 'The name for the dark color mode',
            })
          : translate({
              message: 'light mode',
              id: 'theme.colorToggle.ariaLabel.mode.light',
              description: 'The name for the light color mode',
            }),
    },
  );
  return (
    <div className={clsx(styles.toggle, className)}>
      <button
        className={clsx(
          styles.toggleButton,
          !isBrowser && styles.toggleButtonDisabled,
          buttonClassName,
        )}
        type="button"
        onClick={() => onChange(value === 'dark' ? 'light' : 'dark')}
        disabled={!isBrowser}
        title={title}
        aria-label={title}
        aria-live="polite">
        <span className={styles.toggleButtonInner}>
          <IconLightMode
            width="16"
            height="16"
            className={clsx(styles.toggleIcon, styles.lightToggleIcon)}
          />
          <svg className={clsx(styles.toggleIcon, styles.darkToggleIcon)} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.6.13a4.54 4.54 0 0 0-.58 6.73 4.55 4.55 0 0 0 6.84-.43c.03.07.06.12.07.18.15 1 .05 2-.24 2.97a7.41 7.41 0 0 1-5.67 5.25 7.38 7.38 0 0 1-7.41-2.7 7.25 7.25 0 0 1-1.55-5.5A7.24 7.24 0 0 1 4.25.77c1.3-.65 2.7-.9 4.16-.68.05 0 .1.03.19.05Z" fill="#fff"/>
          </svg>
        </span>
      </button>
    </div>
  );
}

export default React.memo(ColorModeToggle);
