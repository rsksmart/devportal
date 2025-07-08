import React, { useEffect, Suspense } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

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
      if (el?.shadowRoot) {
        const btn = el.shadowRoot.querySelector("#ask-cookbook-button");
        if (btn) {
          // Prevent duplicate listeners
          if (!btn.dataset.listenerAttached) {
            btn.addEventListener("click", () => {
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                event: "askCookbookClick",
                componentId: "ask-cookbook-button",
                componentLabel: btn.innerText.trim() || "Ask Cookbook",
                pageUrl: window.location.href,
                pagePath: window.location.pathname,
                pageTitle: document.title,
                timestamp: new Date().toISOString(),
              });
              console.log("✅ askCookbookClick event fired.");
            });
            btn.dataset.listenerAttached = "true";
            console.log("✅ Listener attached to ask-cookbook button.");
          }
          obs.disconnect();
        }
      }
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
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
