import React, { Suspense } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const BaseAskCookbook = React.lazy(() =>
  import("@cookbookdev/docsbot/react-fixed")
);

export default function AskCookbook() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const { keys } = customFields;
  const COOKBOOK_PUBLIC_API_KEY = keys.cookbook;

  return (
    <BrowserOnly>
      {() => (
        <Suspense>
          <BaseAskCookbook
            apiKey={COOKBOOK_PUBLIC_API_KEY}
            onOpen={() => {
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({ event: "askCookbookClick" });
              console.log("✅ askCookbookClick event fired from onOpen prop");
            }}
          />
        </Suspense>
      )}
    </BrowserOnly>
  );
}
