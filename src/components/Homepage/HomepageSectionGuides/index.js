import clsx from 'clsx';

import Card from "/src/components/Card";

const data = {
  title: 'Guides for Builders',
  description: (
    <>
      {/* <p>Are you a node miner? Interested in merged mining on Rootstock?
        Setup and manage the Rootstock Nodes.</p> */}
    </>
  ),
  cards: [
    {
      title: 'Beginner to Web3?',
      color: 'orange',
      description: (
        <>
          Explore Rootstock Fundamentals and resources to begin your development journey.
        </>
      ),
      list: [
        {
          title: 'Core Concepts',
          href: '/concepts/rootstock-overview/',
        },
        {
          title: 'Become a Rootstock Blockchain Developer',
          href: '/resources/courses/',
        },
      ],

    },
    {
      title: 'Deploy Smart Contracts',
      color: 'purple',
      description: (
        <>
          EVM-compatible tools and guides to deploy and scale your dApps on Rootstock.
        </>
      ),
      list: [
        {
          title: 'Quick Starts',
          href: '/developers/quickstart/',
        },
        {
          title: 'Join the Discord Community',
          href: 'http://discord.gg/rootstock',
        },
      ],
    },
    {
      title: 'Become a Node Miner',
      color: 'green',
      description: (
        <>
          Interested in merged mining on Rootstock?
          Setup a Rootstock node or use the RPC API.
        </>
      ),
      list: [
        {
          title: 'Merged Mining',
          href: '/node-operators/merged-mining/getting-started/',
        },
        {
          title: 'RPC API',
          href: 'https://rpc.rootstock.io/',
        },
      ],
    },
    {
      title: 'Apply for a Grant',
      color: 'yellow',
      description: (
        <>
          Get funding and support to build your next dApp on Rootstock through the strategic grants program.
        </>
      ),
      list: [
        {
          title: 'Apply now',
          href: 'https://rootstock.io/grants/',
        },
        {
          title: 'Refer and Earn',
          href: 'https://rootstock.io/referral/',
        },
      ],
    },
  ]
};

export default function HomepageSectionGuides() {
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
            <Card index={`${idx + 1}.`} title={item.title} color={item.color} description={item.description} list={item.list}/>
          </div>
        ))}
      </div>
    </section>
  );
}
