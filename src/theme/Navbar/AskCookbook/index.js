import React, { useEffect, Suspense } from "react";
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

  useEffect(() => {
    const observer = new MutationObserver((mutations, obs) => {
      const el = document.querySelector("ask-cookbook");
      if (el && el.shadowRoot) {
        const btn = el.shadowRoot.querySelector("#ask-cookbook-button");
        if (btn) {
          btn.addEventListener("click", () => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: "askCookbookClick" });
            console.log("✅ askCookbookClick fired from MutationObserver in React.");
          });
          console.log("✅ Listener attached to ask-cookbook button.");
          obs.disconnect();
        }
      }
    });

    observer.observe(document, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  return (
    <BrowserOnly>
      {() => (
        <Suspense>
          <BaseAskCookbook apiKey={COOKBOOK_PUBLIC_API_KEY} />
        </Suspense>
      )}
    </BrowserOnly>
  );
}
