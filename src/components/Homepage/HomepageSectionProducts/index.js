import Card from '/src/components/Card';
import Link from '/src/components/Link';
import Translate from '@docusaurus/core/lib/client/exports/Translate';

const data = {
  title: <Translate>Infrastructure and tooling</Translate>,
  description: (
    <Translate>
      Bridges, wallets, RPC access, and the Rootstock Explorer for Rootstock deployments.
    </Translate>
  ),
  cards: [
    {
      title: <Translate>Bridges</Translate>,
      color: 'orange',
      description: (
        <Translate>Move BTC and assets between Bitcoin and Rootstock.</Translate>
      ),
      list: [
        {
          title: <Translate>Atlas Bridge guide</Translate>,
          href: '/resources/guides/atlas/',
        },
        {
          title: <Translate>RBTC Flyover</Translate>,
          href: '/developers/integrate/flyover/',
        },
        {
          title: <Translate>PowPeg App</Translate>,
          href: 'https://powpeg.rootstock.io',
          target: '_blank',
        },
      ],
    },
    {
      title: <Translate>Wallets</Translate>,
      color: 'green',
      description: (
        <Translate>Wallets and connection patterns for Rootstock testnet and mainnet.</Translate>
      ),
      list: [
        {
          title: <Translate>MetaMask on Rootstock</Translate>,
          href: '/dev-tools/wallets/metamask',
        },
        {
          title: <Translate>Wallets catalog</Translate>,
          href: '/dev-tools/wallets/',
        },
      ],
    },
    {
      title: <Translate>RPC API</Translate>,
      color: 'yellow',
      description: (
        <Translate>JSON-RPC endpoints and methods for Rootstock nodes.</Translate>
      ),
      list: [
        {
          title: <Translate>Open Rootstock RPC</Translate>,
          href: 'https://rpc.rootstock.io/',
          target: '_blank',
        },
        {
          title: <Translate>First RPC call</Translate>,
          href: '/developers/rpc-api/rootstock/setup/',
        },
        {
          title: <Translate>RPC methods reference</Translate>,
          href: '/developers/rpc-api/rootstock/methods/',
        },
      ],
    },
    {
      title: <Translate>Rootstock Explorer</Translate>,
      color: 'pink',
      description: (
        <Translate>
          Search blocks, transactions, contracts, and dApps on Rootstock mainnet and testnet.
        </Translate>
      ),
      list: [
        {
          title: <Translate>Open Rootstock Explorer</Translate>,
          href: 'https://explorer.rootstock.io/',
          target: '_blank',
        },
        {
          title: <Translate>Navigate the explorer</Translate>,
          href: '/dev-tools/explorers/rootstock-explorer/intro-to-explorer/',
        },
        {
          title: <Translate>Explorer guides</Translate>,
          href: '/dev-tools/explorers/rootstock-explorer/',
        },
      ],
    },
  ],
};

export default function HomepageSectionProducts() {
  return (
    <section className={`mb-64`}>
      <div className="mb-32 d-flex flex-column flex-md-row align-items-md-end justify-content-md-between gap-16">
        <div>
          {data.title && (
            <h2 className={`h1 mb-0`}>{data.title}</h2>
          )}
          {data.description && (
            <div className="markdown mt-12">
              {data.description}
            </div>
          )}
        </div>
        <Link href="/dev-tools/" className="fw-bold flex-shrink-0">
          <Translate>All Dev Tools guides</Translate>
        </Link>
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-16 g-lg-24">
        {data.cards.map((item, idx) => (
          <div className={`col`} key={idx}>
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
