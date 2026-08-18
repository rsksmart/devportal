/**
 * Client-side redirects for paths moved without :path* wildcards.
 * vercel.json handles these in production; this covers yarn start / local preview.
 */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const REDIRECTS = {
  // PowPeg nested under Foundations
  // Security Model hub redirects ship in Phase 1B after Coinspect / Security sign-off.
  '/concepts/powpeg': '/concepts/foundations/powpeg/',
  '/concepts/powpeg/': '/concepts/foundations/powpeg/',
  '/concepts/powpeg/hsm-firmware-attestation':
    '/concepts/foundations/powpeg/hsm-firmware-attestation/',
  '/concepts/powpeg/hsm-firmware-attestation/':
    '/concepts/foundations/powpeg/hsm-firmware-attestation/',
  '/concepts/powpeg/member-updates':
    '/concepts/foundations/powpeg/member-updates/',
  '/concepts/powpeg/member-updates/':
    '/concepts/foundations/powpeg/member-updates/',
  '/concepts/powpeg/security-model':
    '/concepts/foundations/powpeg/security-model/',
  '/concepts/powpeg/security-model/':
    '/concepts/foundations/powpeg/security-model/',
  // Merged mining nested under Foundations
  '/concepts/merged-mining': '/concepts/foundations/merged-mining/',
  '/concepts/merged-mining/': '/concepts/foundations/merged-mining/',
  // Former use-cases wildcards (explicit pages only)
  '/use-cases/ai-agents': '/use-cases/ai-automation/',
  '/use-cases/ai-agents/': '/use-cases/ai-automation/',
  '/use-cases/ai-agents/ai-agent-rootstock':
    '/use-cases/ai-automation/ai-agent-rootstock/',
  '/use-cases/ai-agents/ai-agent-rootstock/':
    '/use-cases/ai-automation/ai-agent-rootstock/',
  '/use-cases/ai-agents/mcp-rootstock':
    '/use-cases/ai-automation/mcp-rootstock/',
  '/use-cases/ai-agents/mcp-rootstock/':
    '/use-cases/ai-automation/mcp-rootstock/',
  '/use-cases/btcfi-finance': '/use-cases/btcfi-finance-yield/',
  '/use-cases/btcfi-finance/': '/use-cases/btcfi-finance-yield/',
  '/use-cases/btcfi-finance/cross-chain-lending-rbtc':
    '/use-cases/btcfi-finance-yield/cross-chain-lending-rbtc/',
  '/use-cases/btcfi-finance/cross-chain-lending-rbtc/':
    '/use-cases/btcfi-finance-yield/cross-chain-lending-rbtc/',
  '/use-cases/btcfi-finance/yield-vaults-sdk':
    '/use-cases/btcfi-finance-yield/yield-vaults-sdk/',
  '/use-cases/btcfi-finance/yield-vaults-sdk/':
    '/use-cases/btcfi-finance-yield/yield-vaults-sdk/',
};

const LOCALES = ['es', 'ja', 'ko'];

function withLocales(map) {
  const out = {...map};
  for (const [from, to] of Object.entries(map)) {
    for (const locale of LOCALES) {
      out[`/${locale}${from}`] = `/${locale}${to}`;
    }
  }
  return out;
}

const ALL_REDIRECTS = withLocales(REDIRECTS);

function redirectIfNeeded(pathname) {
  const destination = ALL_REDIRECTS[pathname];
  if (!destination || pathname === destination) {
    return;
  }
  const {hash, search} = window.location;
  window.location.replace(`${destination}${search}${hash}`);
}

if (ExecutionEnvironment.canUseDOM) {
  redirectIfNeeded(window.location.pathname);
}

export function onRouteUpdate({location}) {
  redirectIfNeeded(location.pathname);
}
