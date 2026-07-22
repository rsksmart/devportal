import Button from '/src/components/Button';
import Card from '/src/components/Card';
import Translate from '@docusaurus/core/lib/client/exports/Translate';

const content = {
  title: <Translate>Rootstock Documentation</Translate>,
  tagline: (
    <Translate>Everything you need to build on Bitcoin.</Translate>
  ),
  usp: (
    <Translate>
      Build with familiar EVM tools on a network secured by over 85% of Bitcoin's hash power via merge mining.
    </Translate>
  ),
  cta: {
    title: <Translate>Quickstarts</Translate>,
    url: '/developers/quickstart/',
  },
  goalSection: {
    title: <Translate>Choose your path</Translate>,
    intro: (
      <Translate>
        Find the right starting point for your journey on Rootstock: build smart contracts, integrate, or prepare for mainnet.
      </Translate>
    ),
  },
  goalTiles: [
    {
      title: <Translate>Build</Translate>,
      color: 'purple',
      description: (
        <Translate>
          Write, compile, and deploy smart contracts with EVM tooling and starter kits.
        </Translate>
      ),
      list: [
        {
          title: <Translate>View all quickstarts</Translate>,
          href: '/developers/quickstart/',
        },
        {
          title: <Translate>Deploy with Hardhat</Translate>,
          href: '/developers/quickstart/hardhat/',
        },
        {
          title: <Translate>Deploy with Foundry</Translate>,
          href: '/developers/quickstart/foundry/',
        },
      ],
    },
    {
      title: <Translate>Integrate</Translate>,
      color: 'green',
      description: (
        <Translate>
          Connect wallets, bridges, oracles, and third-party SDKs to an existing product.
        </Translate>
      ),
      list: [
        {
          title: <Translate>Bridge with Atlas</Translate>,
          href: '/resources/guides/atlas/',
        },
        {
          title: <Translate>RBTC Flyover</Translate>,
          href: '/developers/integrate/flyover/',
        },
      ],
    },
    {
      title: <Translate>Launch</Translate>,
      color: 'orange',
      description: (
        <Translate>
          Review the PowPeg security model, audit contracts, and configure mainnet deployments.
        </Translate>
      ),
      list: [
        {
          title: <Translate>PowPeg protocol overview</Translate>,
          href: '/concepts/powpeg/',
        },
        {
          title: <Translate>Read the security model</Translate>,
          href: '/concepts/powpeg/security-model/',
        },
        {
          title: <Translate>Mainnet deployment checklist</Translate>,
          href: '/developers/smart-contracts/smart-contracts-best-practices/#considerations-for-deploying-to-the-rootstock-mainnet',
        },
      ],
    },
  ],
};

export default function HomepageSectionWelcome() {
  return (
    <section className={`mb-64`}>
      {content.title && (
        <h1 className='mb-16 fs-56'>
          {content.title}
        </h1>
      )}
      {content.tagline && (
        <p className={`h2 mb-16`}>{content.tagline}</p>
      )}
      {content.usp && (
        <p className={`markdown mb-32`}>{content.usp}</p>
      )}
      {content.cta && (
        <div className="mb-48">
          <Button href={content.cta.url} size={`lg`}>
            {content.cta.title}
          </Button>
        </div>
      )}
      {content.goalSection && (
        <div className="mb-32">
          <h2 className="h1 mb-12">{content.goalSection.title}</h2>
          <p className="markdown mb-0">{content.goalSection.intro}</p>
        </div>
      )}
      <div className="row row-cols-1 row-cols-md-3 g-16 g-lg-24">
        {content.goalTiles.map((item, idx) => (
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
