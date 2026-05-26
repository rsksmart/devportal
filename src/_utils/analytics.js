export function pushDataLayer(event, extra = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    pageUrl: window.location.href,
    pagePath: window.location.pathname,
    pageTitle: document.title,
    timestamp: new Date().toISOString(),
    ...extra,
  });
}
