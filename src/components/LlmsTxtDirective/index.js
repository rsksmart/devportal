import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.scss';

export default function LlmsTxtDirective() {
  const { i18n, siteConfig } = useDocusaurusContext();
  const localePrefix =
    i18n.currentLocale === i18n.defaultLocale ? '' : `/${i18n.currentLocale}`;
  const llmsHref = `${siteConfig.url}${localePrefix}/llms.txt`;

  return (
    <div className={styles.llmsTxtDirective}>
      <Translate id="components.llmsTxtDirective.text">
        For the complete documentation index, see
      </Translate>{' '}
      <a href={llmsHref}>llms.txt</a>
    </div>
  );
}
