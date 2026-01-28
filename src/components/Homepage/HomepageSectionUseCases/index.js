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
          title: <Translate>Deploying Your First Organic Yield Vault</Translate>,
          href: '/use-cases/btcfi-finance/yield-vaults',
        },
        {
          title: <Translate>Building Automated Yield Vaults</Translate>,
          href: '/use-cases/btcfi-finance/automate-yield-vault',
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
          title: <Translate>Super Bridge SDK</Translate>,
          href: '/use-cases/interoperability/integrate-super-bridge-sdk',
        },
        {
          title: <Translate>Layerzero OFTs</Translate>,
          href: '/use-cases/interoperability/rootstock-layerzero',
        },
      ],
    },
    {
      title: <Translate>Onboard Users</Translate>,
      color: 'green',
      description: (
        <Translate>Remove onboarding friction with social login, smart wallets, and human-readable names.</Translate>
      ),
      list: [
        {
          title: <Translate>Smart Wallet Onboarding with Para SDK</Translate>,
          href: '/use-cases/onboarding-ux/smart-wallet-para-sdk',
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
          title: <Translate>Conversational AI Agent with Blockchain Actions</Translate>,
          href: '/use-cases/ai-agents/ai-agent-rootstock',
        },
        {
          title: <Translate>Integrating SDK Logic into Agentic Workflows</Translate>,
          href: '/use-cases/ai-agents/integrate-rootstock-sdk',
        },
      ],
    },
    {
      title: <Translate>Govern Communities</Translate>,
      color: 'cyan',
      description: (
        <Translate>Manage shared treasuries and protocol parameters with on-chain voting and the Collective SDK.</Translate>
      ),
      list: [
        {
          title: <Translate>On-Chain Voting with Collective SDK</Translate>,
          href: '/use-cases/govern-communities/onchain-voting-collective-sdk',
        },
      ],
    },
    {
      title: <Translate>Automate Payments</Translate>,
      color: 'orange',
      description: (
        <Translate>Launch custom tokens and integrate Bitcoin-native payments, stablecoins, and agentic commerce.</Translate>
      ),
      list: [
        {
          title: <Translate>Agentic Commerce with x402</Translate>,
          href: '/use-cases/payments-assets/agentic-commerce',
        },
        {
          title: <Translate>Mock USDT0 for Testnet</Translate>,
          href: '/use-cases/payments-assets/stablecoin-mock-usdt0',
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
