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
            <path d="M8.59535 0.133273C6.12343 2.09493 6.45372 5.2431 8.01759 6.86194C9.63856 8.53983 12.8263 8.93501 14.8651 6.43152C14.8898 6.50104 14.9175 6.55246 14.926 6.60579C15.085 7.61613 14.9812 8.60648 14.6938 9.58255C14.2378 11.1338 13.3736 12.4146 12.1067 13.4087C11.1948 14.1239 10.1573 14.581 9.01606 14.8314C7.48456 15.1685 6.00826 14.9876 4.58241 14.4134C3.39071 13.9334 2.40079 13.1535 1.60696 12.1308C0.347682 10.5072 -0.191057 8.65124 0.0602276 6.63816C0.395274 3.95946 1.8078 1.96447 4.24736 0.760813C5.55709 0.114228 6.94963 -0.145739 8.41165 0.0799468C8.46305 0.0875649 8.51254 0.109467 8.59535 0.133273Z" fill="currentColor"/>
          </svg>
        </span>
      </button>
    </div>
  );
}

export default React.memo(ColorModeToggle);
