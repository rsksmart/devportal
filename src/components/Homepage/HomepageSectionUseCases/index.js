import Card from "/src/components/Card";
import Translate from "@docusaurus/core/lib/client/exports/Translate";

const useCaseData = {
  title: <Translate>Browse by use case</Translate>,
  description: null,
  cards: [
    {
      title: <Translate>Generate yield</Translate>,
      color: 'orange',
      description: (
        <Translate>BTCFi context and vault-related work on Rootstock. Vault SDK tutorials are not on the portal yet. Live vault access depends on each program.</Translate>
      ),
      list: [
        {
          title: <Translate>Generate Yield</Translate>,
          href: '/use-cases/btcfi-finance-yield/',
        },
      ],
    },
    {
      title: <Translate>Bridge assets</Translate>,
      color: 'cyan',
      description: (
        <Translate>Move value between Bitcoin, Rootstock, and other chains. End-user peg guides sit under Resources. Published Dev Portal guide: LayerZero OFT.</Translate>
      ),
      list: [
        {
          title: <Translate>Bridge Assets</Translate>,
          href: '/use-cases/interoperability/',
        },
        {
          title: <Translate>LayerZero OFTs on Rootstock</Translate>,
          href: '/use-cases/interoperability/rootstock-layerzero/',
        },
      ],
    },
    {
      title: <Translate>Onboard users</Translate>,
      color: 'green',
      description: (
        <Translate>Lower onboarding friction with smart wallets, familiar login, or USSD where data networks are not available.</Translate>
      ),
      list: [
        {
          title: <Translate>Getting started with Para</Translate>,
          href: '/use-cases/onboarding-ux/para/',
        },
        {
          title: <Translate>Internet-free DeFi with USSD</Translate>,
          href: '/use-cases/onboarding-ux/ussd-rootstock-defi/',
        },
      ],
    },
    {
      title: <Translate>Automation and AI</Translate>,
      color: 'pink',
      description: (
        <Translate>Connect MCP, SDK modules, and guarded permissions so automation can read the chain and submit limited transactions.</Translate>
      ),
      list: [
        {
          title: <Translate>Conversational app with on-chain actions</Translate>,
          href: '/use-cases/ai-automation/ai-agent-rootstock/',
        },
        // {
        //   title: <Translate>Integrate SDK logic into workflows</Translate>,
        //   href: '/use-cases/ai-automation/integrate-rootstock-sdk/',
        // },
      ],
    },
    {
      title: <Translate>RIF economy and payments</Translate>,
      color: 'orange',
      description: (
        <Translate>Collective governance and machine-payable HTTP flows. x402 is covered in the Resources tutorial linked below.</Translate>
      ),
      list: [
        {
          title: <Translate>DAO voting with Collective SDK</Translate>,
          href: '/use-cases/integrate-rif-economy/build-dao-voting-colollective-sdk/',
        },
        {
          title: <Translate>x402 payments tutorial</Translate>,
          href: '/resources/tutorials/integrate-x402/',
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
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-16 g-lg-24">
        {useCaseData.cards.map((item, idx) => (
          <div className={`col`} key={idx}>
            <Card index={`${idx + 1}.`} title={item.title} color={item.color} description={item.description} list={item.list}/>
          </div>
        ))}
      </div>
    </section>
  );
}
