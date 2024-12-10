import Card from "/src/components/Card";
import Translate from "@docusaurus/core/lib/client/exports/Translate";

const data = {
  title: <Translate>Browse by DevTools</Translate>,
  description: null,
  cards: [
    {
      title: <Translate>Get RBTC</Translate>,
      color: 'orange',
      link: {
        title: <Translate>Read more</Translate>,
        href: 'https://rootstock.io/rbtc/',
      },
      description: (
        <Translate>Explore the various ways to get RBTC using the PowPeg App, On/Off Ramps, or Exchanges.</Translate>
      ),

    },
    {
      title: <Translate>Quick Starts</Translate>,
      color: 'yellow',
      link: {
        title: <Translate>Read more</Translate>,
        href: '/developers/quickstart/',
      },
      description: (
        <Translate>View a repository of starter kits, sample codes and tutorials for creating, testing and deploying smart contracts on Rootstock.</Translate>
      ),
    },
    {
      title: (
        <>EVM-compatible<br/>Tools</>
      ),
      color: 'cyan',
      link: {
        title: <Translate>Read more</Translate>,
        href: '/dev-tools/',
      },
      description: (
        <Translate>Build and deploy faster with EVM-compatible tools and guides on Rootstock.</Translate>
      ),
    },
    {
      title: <Translate>SDKs and Integration Guides</Translate>,
      color: 'pink',
      link: {
        title: <Translate>Read more</Translate>,
        href: '/developers/integrate/',
      },
      description: (
        <Translate>Get up to speed, using easy-to-set-up SDKs and Integration Guides.</Translate>
      ),
    }
  ]
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
            <Card index={`${idx + 1}.`} title={item.title} color={item.color} description={item.description}
                  link={item.link}/>
          </div>
        ))}
      </div>
    </section>
  );
}
