import clsx from 'clsx';

import Card from "/src/components/Card";

const data = {
  title: 'Guides for Builders',
  description: (
    <>
      <p>Whether you're a developer building a dApp Rootstock, a node miner running a merged mining on Rootstock, or a general user of tools and services, you'll find everything you need to get started right here.</p>
    </>
  ),
  cards: [
    {
      title: 'New to Web3?',
      color: 'orange',
      description: (
        <>
          See the ways you can get started.
        </>
      ),
      list: [
        {
          title: 'Explore Core Concepts',
          href: '#',
        },
        {
          title: 'Deploy your First DApp on Rootstock',
          href: '#',
        },
      ],

    },
    {
      title: 'Developers',
      color: 'purple',
      description: (
        <>
          Start building and integrating DApps
        </>
      ),
      list: [
        {
          title: 'Deploy Smart Contracts',
          href: '#',
        },
        {
          title: 'Quick start guide with Hardhat',
          href: '#',
        },
      ],
    },
    {
      title: 'Node Operators',
      color: 'green',
      description: (
        <>
          Are you a node miner? Interested in merged mining on Rootstock? Get up and running with Rootstock nodes or use the RPC API.
        </>
      ),
      list: [
        {
          title: 'Run a Node',
          href: '#',
        },
        {
          title: 'RPC API',
          href: '#',
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
      <div className="row row-cols-1 row-cols-md-3 g-16 g-lg-24">
        {data.cards.map((item, idx) => (
          <div className={`col`} key={idx}>
            <Card index={`${idx + 1}.`} title={item.title} color={item.color} description={item.description} list={item.list}/>
          </div>
        ))}
      </div>
    </section>
  );
}
