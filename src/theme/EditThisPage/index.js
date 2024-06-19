import React from 'react';
import Translate from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import IconEdit from '@theme/Icon/Edit';
export default function EditThisPage({editUrl}) {
  return (
    <Link to={editUrl} className={`link-base d-inline-flex gap-8 align-items-center ${ThemeClassNames.common.editThisPage}`}>
      <IconEdit />
      <Translate
        id="theme.common.editThisPage"
        description="The link label to edit the current page">
        Edit this page
      </Translate>
    </Link>
  );
}
