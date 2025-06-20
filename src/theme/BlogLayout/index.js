import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogAside from "@theme/BlogAside";
import Button from "/src/components/Button";
import Translate from '@docusaurus/Translate';
import { useHistory } from "react-router-dom";

export default function BlogLayout(props) {
  const {toc, children, ...layoutProps} = props;
  let history = useHistory();

  return (
    <Layout {...layoutProps}>
      <div className="mb-18 mb-md-24 mb-xl-32">
        <Button size={'sm'} className={`btn-no-shadow px-12`} onClick={() => history.goBack()}>
          <svg width={12} height={12}>
            <use xlinkHref="#icon-arrow-l"/>
          </svg>
          <Translate
            id="theme.common.back">
            Back
          </Translate>
        </Button>
      </div>

      <div className="row">
        <main
          className={clsx('col-12 col-lg-9 col-xl-10')}>
          {children}
        </main>
        <div className="col-12 col-lg-3 col-xl-2">
          {toc && <div className="mb-24">{toc}</div>}
          <BlogAside />
        </div>

      </div>
    </Layout>
  );
}
