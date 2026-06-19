import Card from '/src/components/Card';
import Link from '/src/components/Link';
import Translate from '@docusaurus/core/lib/client/exports/Translate';

const useCaseData = {
  title: <Translate>Browse by use case</Translate>,
  description: (
    <Translate>
      Step-by-step guides for Bitcoin DeFi, Bridge, Onboard, Pay, and AI.
    </Translate>
  ),
  cards: [
    {
      title: <Translate>Bitcoin DeFi</Translate>,
      color: 'orange',
      description: (
        <Translate>
          Lending, vaults, and stablecoin flows with rBTC and on-chain assets.
        </Translate>
      ),
      list: [
        {
          title: <Translate>Rootstock DeFi developer guide</Translate>,
          href: '/resources/guides/defi-developer-guide/',
        },
        {
          title: <Translate>Integrate USDRIF Vault</Translate>,
          href: '/use-cases/btcfi-finance-yield/yield-vaults-sdk/',
        },
        {
          title: <Translate>Cross-chain rBTC lending</Translate>,
          href: '/use-cases/btcfi-finance-yield/cross-chain-lending-rbtc/',
        },
        {
          title: <Translate>View Bitcoin DeFi guides</Translate>,
          href: '/use-cases/btcfi-finance-yield/',
        },
      ],
    },
    {
      title: <Translate>Bridge</Translate>,
      color: 'cyan',
      description: (
        <Translate>
          Move assets between Bitcoin, Rootstock, and other networks.
        </Translate>
      ),
      list: [
        {
          title: <Translate>Atlas Bridge guide</Translate>,
          href: '/resources/guides/atlas/',
        },
        {
          title: <Translate>LayerZero OFT on Rootstock</Translate>,
          href: '/use-cases/interoperability/rootstock-layerzero/',
        },
        {
          title: <Translate>View Bridge guides</Translate>,
          href: '/use-cases/interoperability/',
        },
      ],
    },
    {
      title: <Translate>Onboard</Translate>,
      color: 'green',
      description: (
        <Translate>
          Wallet connection, social login, and low-connectivity onboarding patterns.
        </Translate>
      ),
      list: [
        {
          title: <Translate>Para smart wallet onboarding</Translate>,
          href: '/use-cases/onboarding-ux/para/',
        },
        {
          title: <Translate>USSD DeFi relay</Translate>,
          href: '/use-cases/onboarding-ux/ussd-rootstock-defi/',
        },
        {
          title: <Translate>View Onboard guides</Translate>,
          href: '/use-cases/onboarding-ux/',
        },
      ],
    },
    {
      title: <Translate>Pay</Translate>,
      color: 'yellow',
      description: (
        <Translate>
          Programmable payments, splits, and pay-per-use APIs on Rootstock.
        </Translate>
      ),
      list: [
        {
          title: <Translate>x402 payments on Rootstock</Translate>,
          href: '/use-cases/payments-assets/integrate-x402/',
        },
        {
          title: <Translate>Prism payment splits</Translate>,
          href: '/use-cases/payments-assets/prism-payment-splits/',
        },
        {
          title: <Translate>View Pay guides</Translate>,
          href: '/use-cases/payments-assets/',
        },
      ],
    },
    {
      title: <Translate>AI</Translate>,
      color: 'pink',
      description: (
        <Translate>
          Install the Rootstock MCP Server, then build agents with scoped on-chain reads and actions.
        </Translate>
      ),
      list: [
        {
          title: <Translate>MCP quickstart</Translate>,
          href: '/developers/quickstart/mcp/',
        },
        {
          title: <Translate>AI agent with on-chain actions</Translate>,
          href: '/use-cases/ai-automation/ai-agent-rootstock/',
        },
        {
          title: <Translate>View AI guides</Translate>,
          href: '/use-cases/ai-automation/',
        },
      ],
    },
  ],
};

export default function HomepageSectionUseCases() {
  return (
    <section className="mb-64">
      <div className="mb-32 d-flex flex-column flex-md-row align-items-md-end justify-content-md-between gap-16">
        <div>
          {useCaseData.title && (
            <h2 className="h1 mb-0">{useCaseData.title}</h2>
          )}
          {useCaseData.description && (
            <div className="markdown mt-12">{useCaseData.description}</div>
          )}
        </div>
        <Link href="/use-cases/" className="fw-bold flex-shrink-0">
          <Translate>All use case guides</Translate>
        </Link>
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-16 g-lg-24">
        {useCaseData.cards.map((item, idx) => (
          <div className="col" key={idx}>
            <Card
              index={`${idx + 1}.`}
              title={item.title}
              color={item.color}
              description={item.description}
              list={item.list}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
