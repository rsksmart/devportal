import Button from '/src/components/Button';
import Card from '/src/components/Card';
import Translate from '@docusaurus/core/lib/client/exports/Translate';

const content = {
  title: <Translate>Rootstock Documentation</Translate>,
  description: (
    <Translate>Rootstock is the Bitcoin sidechain secured by over 85% of Bitcoin's hash power through merge mining. Build EVM-compatible smart contracts and financial applications with Bitcoin-grade security and familiar Ethereum tooling.</Translate>
  ),
  cta: {
    title: <Translate>Quick Start</Translate>,
    url: '/developers/quickstart/',
  },
  icpTiles: [
    {
      title: <Translate>Institutions</Translate>,
      color: 'orange',
      description: (
        <Translate>
          Evaluate Bitcoin-grade security and production infrastructure for financial applications on Rootstock.
        </Translate>
      ),
      list: [
        {
          title: <Translate>Explore Institutional</Translate>,
          href: 'https://www.rootstocklabs.com/institutional/',
          target: '_blank',
        },
        {
          title: <Translate>Read the security model</Translate>,
          href: '/concepts/powpeg/security-model/',
        },
      ],
    },
    {
      title: <Translate>Builders</Translate>,
      color: 'purple',
      description: (
        <Translate>
          Deploy smart contracts and Bitcoin-powered products with EVM-compatible tooling and starter kits.
        </Translate>
      ),
      list: [
        {
          title: <Translate>View quick starts</Translate>,
          href: '/developers/quickstart/',
        },
        {
          title: <Translate>Deploy with Hardhat</Translate>,
          href: '/developers/quickstart/hardhat/',
        },
      ],
    },
    {
      title: <Translate>Integrate</Translate>,
      color: 'green',
      description: (
        <Translate>
          Connect wallets, custody, oracles, payments, and bridging infrastructure to Rootstock.
        </Translate>
      ),
      list: [
        {
          title: <Translate>View integration guides</Translate>,
          href: '/developers/integrate/',
        },
        {
          title: <Translate>Browse dev tools</Translate>,
          href: '/dev-tools/',
        },
      ],
    },
  ],
};

export default function HomepageSectionWelcome() {
  return (
    <section className={`mb-64`}>
      {content.title && (
        <h1 className='mb-24 fs-56'>
          {content.title}
        </h1>
      )}
      {content.description && (
        <p className={`h2 mb-32`}>{content.description}</p>
      )}
      {content.cta && (
        <div className="mb-32">
          <Button href={content.cta.url} size={`lg`}>
            {content.cta.title}
          </Button>
        </div>
      )}
      <div className="row row-cols-1 row-cols-md-3 g-16 g-lg-24">
        {content.icpTiles.map((item, idx) => (
          <div className={`col`} key={idx}>
            <Card
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
