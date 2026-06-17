import Card from '/src/components/Card';
import Translate from '@docusaurus/core/lib/client/exports/Translate';

const data = {
  title: <Translate>Browse by Products</Translate>,
  description: (
    <Translate>Rootstock-native products and infrastructure for bridges, wallets, RIF, and RPC.</Translate>
  ),
  cards: [
    {
      title: <Translate>Bridges</Translate>,
      color: 'orange',
      description: (
        <Translate>Move assets in and out of Rootstock.</Translate>
      ),
      list: [
        {
          title: <Translate>RBTC Flyover</Translate>,
          href: '/developers/integrate/flyover/',
        },
        {
          title: <Translate>PowPeg App</Translate>,
          href: 'https://powpeg.rootstock.io',
        },
        {
          title: <Translate>Token Bridge</Translate>,
          href: 'https://dapp.tokenbridge.rootstock.io',
        },
      ],
    },
    {
      title: <Translate>Wallets</Translate>,
      color: 'green',
      description: (
        <Translate>Wallets compatible with Rootstock.</Translate>
      ),
      list: [
        {
          title: <Translate>MetaMask</Translate>,
          href: '/dev-tools/wallets/metamask',
        },
        {
          title: <Translate>Wallets on Rootstock</Translate>,
          href: '/dev-tools/wallets/',
        },
      ],
    },
    {
      title: (
        <Translate>RIF Tools</Translate>
      ),
      color: 'pink',
      description: (
        <Translate>Open-source RIF tools for names, relay, and Bitcoin-native UX.</Translate>
      ),
      list: [
        {
          title: <Translate>Name Service</Translate>,
          href: 'https://rns.rifos.org/',
        },
        {
          title: <Translate>Relay</Translate>,
          href: '/developers/integrate/rif-relay',
        },
      ],
    },
    {
      title: <Translate>RPC API</Translate>,
      color: 'yellow',
      description: (
        <Translate>Deploy and interact with contracts via JSON-RPC on Rootstock.</Translate>
      ),
      list: [
        {
          title: <Translate>Make First API Call</Translate>,
          href: '/developers/rpc-api/rootstock/setup/',
        },
        {
          title: <Translate>View JSON RPC Methods</Translate>,
          href: '/developers/rpc-api/rootstock/methods/',
        },
      ],
    },
  ],
};

export default function HomepageSectionProducts() {
  return (
    <section className={`mb-64`}>
      <div className="mb-32">
        {data.title && (
          <h2 className={`h1 mb-0`}>{data.title}</h2>
        )}
        {data.description && (
          <div className="markdown mt-12">
            {data.description}
          </div>
        )}
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-16 g-lg-24">
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
