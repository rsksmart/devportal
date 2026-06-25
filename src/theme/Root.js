import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import OriginalRoot from '@theme-original/Root';

export default function Root(props) {
  const { i18n, siteConfig } = useDocusaurusContext();
  const localePrefix =
    i18n.currentLocale === i18n.defaultLocale ? '' : `/${i18n.currentLocale}`;
  const llmsHref = `${siteConfig.url}${localePrefix}/llms.txt`;

  return (
    <>
      <Head>
        <link rel="llms-txt" href={llmsHref} />
      </Head>
      <OriginalRoot {...props} />
    </>
  );
}
