import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.scss';

export default function LlmsTxtDirective() {
  const llmsPath = useBaseUrl('/llms.txt');

  return (
    <div className={styles.llmsTxtDirective}>
      <Translate id="components.llmsTxtDirective.text">
        For the complete documentation index, see
      </Translate>{' '}
      <Link to={llmsPath}>llms.txt</Link>
    </div>
  );
}
