import React from 'react';

import Translate from '@docusaurus/Translate';
import clsx from "clsx";

import {useDoc} from "@docusaurus/theme-common/internal";
import EditThisPage from '@theme/EditThisPage';

import IconPaste from "@theme/Icon/Paste";
import IconCommunity from "@theme/Icon/Community";
import IconChangelog from "@theme/Icon/Changelog";

import Link from '@docusaurus/Link';

export default function MoreActions({editUrl}) {

  //TODO fix for usign outside DocProvider
  if(!editUrl) {
    const {metadata} = useDoc();
    editUrl = metadata.editUrl;
  }

  return <div className={clsx(``)}>
    <h4 className={`title-s mb-12 text-uppercase`}>
      <Translate
        id="theme.MoreActions.title">
        More
      </Translate>
    </h4>
    <ul className={`m-0 list-unstyled d-flex flex-column align-items-start gap-8`}>
      {editUrl && (
        <li className={`py-3`}>
          <EditThisPage editUrl={editUrl}/>
        </li>
      )}
      <li className={`py-3`}>
        <Link to={`#`} className={`link-base d-inline-flex gap-8 align-items-center`}>
          <IconPaste/>
          <Translate
            id="theme.common.reportAnIssue"
          >
            Report an Issue
          </Translate>
        </Link>
      </li>
      <li className={`py-3`}>
        <Link to={`#`} className={`link-base d-inline-flex gap-8 align-items-center`}>
          <IconCommunity/>
          <Translate
            id="theme.common.joinCommunity"
          >
            Join the Community
          </Translate>
        </Link>
      </li>
      <li className={`py-3`}>
        <Link to={`#`} className={`link-base d-inline-flex gap-8 align-items-center`}>
          <IconChangelog/>
          <Translate
            id="theme.common.changelog"
          >
            Changelog
          </Translate>
        </Link>
      </li>
    </ul>
  </div>
}
