import Card from "/src/components/Card";
import Translate from "@docusaurus/core/lib/client/exports/Translate";

const useCaseData = {
  title: <Translate>Browse by Use Cases</Translate>,
  description: null,
  cards: [
    {
      title: <Translate>Generate Yield</Translate>,
      color: 'orange', 
      description: (
        <Translate>Transform Bitcoin from a passive asset into productive capital with yield-bearing vaults and staking mechanisms.</Translate>
      ),
      list: [
        {
          title: <Translate>ERC-4626 Yield Vaults</Translate>,
          href: '/use-cases/btcfi-finance/vaults-btcfi',
        },
        {
          title: <Translate>Liquid Staking (st-rBTC)</Translate>,
          href: '/use-cases/btcfi-finance/liquid-staking-rbtc',
        },
      ],
    },
    {
      title: <Translate>Bridge Assets</Translate>,
      color: 'cyan',
      description: (
        <Translate>Securely bridge assets between Bitcoin and Rootstock using trust-minimized protocols.</Translate>
      ),
      list: [
        {
          title: <Translate>Union Bridge (BitVMX)</Translate>,
          href: '/use-cases/interoperability/union-bridge-bitvmx',
        },
        {
          title: <Translate>Flyover Fast Bridge</Translate>,
          href: '/use-cases/interoperability/flyover-fast-bridge',
        },
      ],
    },
    {
      title: <Translate>Onboard Users</Translate>,
      color: 'green', 
      description: (
        <Translate>Remove onboarding friction with gasless transactions, social login, and human-readable names.</Translate>
      ),
      list: [
        {
          title: <Translate>Gasless Relay</Translate>,
          href: '/use-cases/onboarding-ux/gasless-transactions-relay',
        },
        {
          title: <Translate>Smart Wallet Onboarding</Translate>,
          href: '/use-cases/onboarding-ux/smart-wallet-onboarding',
        },
      ],
    },
    {
      title: <Translate>Build AI Agents</Translate>,
      color: 'pink',
      description: (
        <Translate>Connect AI models to on-chain data and deploy autonomous agents for intelligent portfolio management.</Translate>
      ),
      list: [
        {
          title: <Translate>MCP Server Integration</Translate>,
          href: '/use-cases/ai-emerging/mcp-server-setup',
        },
        {
          title: <Translate>Autonomous Agents</Translate>,
          href: '/use-cases/ai-emerging/autonomous-agents-btcfi',
        },
      ],
    },
  ]
};

export default function HomepageSectionUseCases() {
  return (
    <section className={`mb-64`}>
      <div className="mb-32">
        {useCaseData.title && (
          <h2 className={`h1 mb-0`}>{useCaseData.title}</h2>
        )}
        {useCaseData.description && (
          <div className="markdown mt-12">
            {useCaseData.description}
          </div>
        )}
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-16 g-lg-24">
        {useCaseData.cards.map((item, idx) => (
          <div className={`col`} key={idx}>
            <Card index={`${idx + 1}.`} title={item.title} color={item.color} description={item.description} list={item.list}/>
          </div>
        ))}
      </div>
    </section>
  );
}