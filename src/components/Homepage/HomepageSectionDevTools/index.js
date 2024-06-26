import clsx from 'clsx';

import Card from "/src/components/Card";

const data = {
  title: 'Browse by Dev Tools',
  description: null,
  cards: [
    {
      title: 'Get RBTC',
      color: 'pink',
      link: {
        title: 'Read more',
        href: '#',
      },
      description: (
        <>
          Explore the various ways to get RBTC using Flyover, On/Off Ramps, and Exchanges
        </>
      ),

    },
    {
      title: 'Try the starter kits',
      color: 'yellow',
      link: {
        title: 'Read more',
        href: '#',
      },
      description: (
        <>
          View a repository of boilerplate code for creating, testing and deploying smart contracts on Rootstock.
        </>
      ),
    },
    {
      title: (
        <>
          Explore Guides<br/>and Tutorials
        </>
      ),
      color: 'cyan',
      link: {
        title: 'Read more',
        href: '#',
      },
      description: (
        <>
          Get up to speed with examples and step-by-step guides on how to deploy DApps on Rootstock.
        </>
      ),
    },
    {
      title: 'Integration Guides',
      color: 'orange',
      link: {
        title: 'Read more',
        href: '#',
      },
      description: (
        <>
          Want to integrate any of Rootstock products? Explore the integration guides and kits to help you get started.
        </>
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
