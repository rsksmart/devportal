import React from 'react';
import clsx from 'clsx';
import LastUpdated from '@theme/LastUpdated';
import styles from './styles.module.scss';
import {useDoc} from "@docusaurus/theme-common/internal";
export default function EditMetaRow() {
  const {metadata} = useDoc();
  const {lastUpdatedAt, lastUpdatedBy, tags} = metadata;
  return (
    <div className={clsx('d-flex justify-content-end mt-24 fs-12 text-end', styles.lastUpdated)}>
      {(lastUpdatedAt || lastUpdatedBy) && (
        <LastUpdated
          lastUpdatedAt={lastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
        />
      )}
    </div>
  );
}
