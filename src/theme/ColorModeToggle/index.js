import React from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {translate} from '@docusaurus/Translate';
import IconLightMode from '@theme/Icon/LightMode';
import styles from './styles.module.scss';

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

          <svg className={clsx(styles.toggleIcon, styles.lightToggleIcon)} width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.1.19H7.9v2.97h1.2V.19ZM13.96 2.2l-2.08 2.08.84.84 2.08-2.08-.84-.84ZM16.81 7.9h-2.97v1.2h2.97V7.9ZM12.72 11.88l-.84.84 2.08 2.08.84-.84-2.08-2.08ZM9.1 13.84H7.9v2.97h1.2v-2.97ZM4.28 11.88 2.2 13.96l.84.84 2.08-2.08-.84-.84ZM3.16 7.9H.19v1.2h2.97V7.9ZM3.04 2.2l-.84.84 2.08 2.08.84-.84L3.04 2.2ZM8.5 4.94a3.56 3.56 0 1 0 0 7.12 3.56 3.56 0 0 0 0-7.12Z"
              fill="currentColor"/>
          </svg>
          <svg className={clsx(styles.toggleIcon, styles.darkToggleIcon)} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.6.13a4.54 4.54 0 0 0-.58 6.73 4.55 4.55 0 0 0 6.84-.43c.03.07.06.12.07.18.15 1 .05 2-.24 2.97a7.41 7.41 0 0 1-5.67 5.25 7.38 7.38 0 0 1-7.41-2.7 7.25 7.25 0 0 1-1.55-5.5A7.24 7.24 0 0 1 4.25.77c1.3-.65 2.7-.9 4.16-.68.05 0 .1.03.19.05Z" fill="currentColor"/>
          </svg>
        </span>
      </button>
    </div>
  );
}

export default React.memo(ColorModeToggle);
