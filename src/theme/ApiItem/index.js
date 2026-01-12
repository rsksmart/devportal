import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { DocProvider } from '@docusaurus/plugin-content-docs/client';
import { HtmlClassNameProvider } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { createAuth } from '@theme/ApiExplorer/Authorization/slice';
import { createPersistanceMiddleware } from '@theme/ApiExplorer/persistanceMiddleware';
import ApiItemLayout from '@theme/ApiItem/Layout';
import CodeBlock from '@theme/CodeBlock';
import DocItemMetadata from '@theme/DocItem/Metadata';
import SkeletonLoader from '@theme/SkeletonLoader';
import clsx from 'clsx';
import { ungzip } from 'pako';
import { Provider } from 'react-redux';

import { createStoreWithoutState, createStoreWithState } from './store';

let ApiExplorer = (_) => <div />;

if (ExecutionEnvironment.canUseDOM) {
  ApiExplorer = require('@theme/ApiExplorer').default;
}

function base64ToUint8Array(base64) {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export default function ApiItem(props) {
  const docHtmlClassName = `docs-doc-id-${props.content.metadata.id}`;
  const MDXComponent = props.content;
  const { frontMatter } = MDXComponent;
  const { info_path: infoPath } = frontMatter;
  let { api } = frontMatter;
  const { schema } = frontMatter;
  const { sample } = frontMatter;

  if (api) {
    try {
      api = JSON.parse(
        new TextDecoder().decode(ungzip(base64ToUint8Array(api)))
      );
    } catch {}
  }

  const { siteConfig } = useDocusaurusContext();
  const themeConfig = siteConfig.themeConfig;
  const options = themeConfig.api;
  const isBrowser = useIsBrowser();

  const statusRegex = new RegExp('(20[0-9]|2[1-9][0-9])');

  let store2 = {};
  const persistanceMiddleware = createPersistanceMiddleware(options);

  if (!isBrowser) {
    store2 = createStoreWithoutState({}, [persistanceMiddleware]);
  }

  if (isBrowser) {
    let acceptArray = [];
    for (const [code, content] of Object.entries(api?.responses ?? [])) {
      if (statusRegex.test(code)) {
        acceptArray.push(Object.keys(content.content ?? {}));
      }
    }
    acceptArray = acceptArray.flat();

    const content = api?.requestBody?.content ?? {};
    const contentTypeArray = Object.keys(content);
    const servers = api?.servers ?? [];
    const params = {
      path: [],
      query: [],
      header: [],
      cookie: [],
    };
    api?.parameters?.forEach((param) => {
      const paramType = param.in;
      const paramsArray = params[paramType];
      paramsArray.push(param);
    });
    const auth = createAuth({
      security: api?.security,
      securitySchemes: api?.securitySchemes,
      options,
    });

    const server = window?.sessionStorage.getItem('server');
    const serverObject = JSON.parse(server) ?? {};

    store2 = createStoreWithState(
      {
        accept: {
          value: acceptArray[0],
          options: acceptArray,
        },
        contentType: {
          value: contentTypeArray[0],
          options: contentTypeArray,
        },
        server: {
          value: serverObject.url ? serverObject : undefined,
          options: servers,
        },
        response: { value: undefined },
        body: { type: 'empty' },
        params,
        auth,
      },
      [persistanceMiddleware]
    );
  }

  if (api) {
    return (
      <DocProvider content={props.content}>
        <HtmlClassNameProvider className={docHtmlClassName}>
          <DocItemMetadata />
          <ApiItemLayout hideAside={true}>
            <Provider store={store2}>
              <div className={clsx('row', 'theme-api-markdown')}>
                <div className="col col-lg-7 openapi-left-panel__container">
                  <MDXComponent />
                </div>
                <div className="col col-lg-5 openapi-right-panel__container">
                  <BrowserOnly fallback={<SkeletonLoader size="lg" />}>
                    {() => {
                      return <ApiExplorer item={api} infoPath={infoPath} />;
                    }}
                  </BrowserOnly>
                </div>
              </div>
            </Provider>
          </ApiItemLayout>
        </HtmlClassNameProvider>
      </DocProvider>
    );
  } else if (schema) {
    return (
      <DocProvider content={props.content}>
        <HtmlClassNameProvider className={docHtmlClassName}>
          <DocItemMetadata />
          <ApiItemLayout hideAside={true}>
            <div className={clsx('row', 'theme-api-markdown')}>
              <div className="col col-lg-7 openapi-left-panel__container schema">
                <MDXComponent />
              </div>
              <div className="col col-lg-5 openapi-right-panel__container">
                <CodeBlock language="json" title={`${frontMatter.title}`}>
                  {JSON.stringify(sample, null, 2)}
                </CodeBlock>
              </div>
            </div>
          </ApiItemLayout>
        </HtmlClassNameProvider>
      </DocProvider>
    );
  }

  return (
    <DocProvider content={props.content}>
      <HtmlClassNameProvider className={docHtmlClassName}>
        <DocItemMetadata />
        <ApiItemLayout>
          <div className="row">
            <div className="col col--12 markdown">
              <MDXComponent />
            </div>
          </div>
        </ApiItemLayout>
      </HtmlClassNameProvider>
    </DocProvider>
  );
}
