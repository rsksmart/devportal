import React from 'react';

import Translate from '@docusaurus/Translate';
import clsx from "clsx";

import {useDoc} from "@docusaurus/theme-common/internal";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import EditThisPage from '@theme/EditThisPage';

import IconPaste from "@theme/Icon/Paste";
import IconCommunity from "@theme/Icon/Community";
import IconChangelog from "@theme/Icon/Changelog";

import Link from '@docusaurus/Link';
import { RequestArticle } from '../../../components/RequestArticle'

export default function MoreActions({editUrl}) {

  const {siteConfig} = useDocusaurusContext();
  const links = siteConfig?.customFields?.moreLinks || {};

  //TODO fix for usign outside DocProvider
  if(editUrl === undefined) {
    const {metadata} = useDoc();
    editUrl = metadata.editUrl;
  }

  return <div className={clsx(``)}>
    <h4 className={`title-s mb-12 text-uppercase`}>
      <Translate
        id="theme.moreLinks.title">
        More
      </Translate>
    </h4>
    <ul className={`m-0 list-unstyled d-flex flex-column align-items-start gap-8`}>
      {editUrl && (
        <li className={`py-3`}>
          <EditThisPage editUrl={editUrl}/>
        </li>
      )}
      {links.reportIssue && (
        <li className={`py-3`}>
          <Link to={links.reportIssue.url} className={`link-base d-inline-flex gap-8 align-items-center`}>
            <IconPaste/>
            <Translate
              id="theme.moreLinks.reportIssue"
            >
              {links.reportIssue.title}
            </Translate>
          </Link>
        </li>
      )}
      {links.joinCommunity && (
        <li className={`py-3`}>
          <Link to={links.joinCommunity.url} className={`link-base d-inline-flex gap-8 align-items-center`}>
            <IconCommunity/>
            <Translate
              id="theme.moreLinks.joinCommunity"
            >
              {links.joinCommunity.title}
            </Translate>
          </Link>
        </li>
      )}
      {links.changelog && (
        <li className={`py-3`}>
          <Link to={links.changelog.url} className={`link-base d-inline-flex gap-8 align-items-center`}>
            <IconChangelog/>
            <Translate
              id="theme.moreLinks.changelog"
            >
              {links.changelog.title}
            </Translate>
          </Link>
        </li>
      )}
      {links?.requestArticle && links.requestArticle?.form?.id && (
        <li className={`py-3`}>
          <RequestArticle label={links.requestArticle.title} form={links.requestArticle.form} />
        </li>
      )}
    </ul>
  </div>
}
