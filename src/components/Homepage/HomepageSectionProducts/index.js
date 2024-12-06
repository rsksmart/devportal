import Card from "/src/components/Card";

const data = {
  title: 'Browse by Products',
  description: null,
  cards: [
    {
      title: 'Bridges',
      color: 'orange',
      description: (
        <>
          Bridge in/out of Rootstock.
        </>
      ),
      list: [
        {
          title: 'RBTC Flyover',
          href: '/developers/integrate/flyover/',
        },
        {
          title: 'PowPeg App',
          href: 'https://powpeg.rootstock.io',
        },
        {
          title: 'Token Bridge',
          href: 'https://dapp.tokenbridge.rootstock.io',
        },
      ],

    },
    {
      title: 'Wallets',
      color: 'green',
      description: (
        <>
          View wallets compatible with the Rootstock platform.
        </>
      ),
      list: [
        {
          title: 'MetaMask',
          href: '/dev-tools/wallets/metamask',
        },
        {
          title: 'Wallets on Rootstock',
          href: '/dev-tools/wallets/',
        }
      ],
    },
    {
      title: (
        <>
          RIF Tools
        </>
      ),
      color: 'pink',
      description: (
        <>
          Explore Open-source tools and technologies for faster, 
          and more rewarding ways to build on Bitcoin.
        </>
      ),
      list: [
        {
          title: 'Name Service',
          href: 'https://rns.rifos.org/',
        },
        {
          title: 'Relay',
          href: '/developers/integrate/rif-relay',
        },
      ],
    },
    {
      title: 'RPC API',
      color: 'yellow',
      description: (
        <>
          Deploy and interact with EVM compatible smart contracts on Rootstock using JSON RPC methods using the Rootstock RPC API.
        </>
      ),
      list: [
        {
          title: 'Make First API Call',
          href: '/developers/rpc-api/rootstock/setup/',
        },
        {
          title: 'View JSON RPC Methods',
          href: '/developers/rpc-api/rootstock/methods/',
        }
      ],
    },
  ]
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
            <Card index={`${idx + 1}.`} title={item.title} color={item.color} description={item.description} list={item.list}/>
          </div>
        ))}
      </div>
    </section>
  );
}
