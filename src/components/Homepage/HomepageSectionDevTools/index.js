import Card from '/src/components/Card';
import Translate from '@docusaurus/core/lib/client/exports/Translate';

const data = {
  title: <Translate>Browse by DevTools</Translate>,
  description: (
    <Translate>Wallets, RPC, and EVM-compatible tooling to build and run applications on Rootstock.</Translate>
  ),
  cards: [
    {
      title: <Translate>Get RBTC</Translate>,
      color: 'orange',
      link: {
        title: <Translate>Read more</Translate>,
        href: 'https://rootstock.io/rbtc/',
      },
      description: (
        <Translate>Get RBTC through the PowPeg App, on/off ramps, or exchanges.</Translate>
      ),
    },
    {
      title: (
        <>EVM-compatible<br/>Tools</>
      ),
      color: 'cyan',
      link: {
        title: <Translate>Browse dev tools</Translate>,
        href: '/dev-tools/',
      },
      description: (
        <Translate>Hardhat, Foundry, Wagmi, wallets, oracles, and deployment tooling for Rootstock.</Translate>
      ),
    },
  ],
};

export default function HomepageSectionDevTools() {
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
      <div className="row row-cols-1 row-cols-md-2 g-16 g-lg-24">
        {data.cards.map((item, idx) => (
          <div className={`col`} key={idx}>
            <Card
              index={`${idx + 1}.`}
              title={item.title}
              color={item.color}
              description={item.description}
              link={item.link}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
