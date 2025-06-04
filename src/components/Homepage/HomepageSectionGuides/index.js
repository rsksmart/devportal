import Card from "/src/components/Card";
import Translate from "@docusaurus/core/lib/client/exports/Translate";

const data = {
  title: <Translate>Guides for Builders</Translate>,
  description: null,
  cards: [
    {
      title: <Translate>Beginner to Web3?</Translate>,
      color: 'orange',
      description: (
        <Translate>Explore Rootstock Fundamentals and resources to begin your development journey.</Translate>
      ),
      list: [
        {
          title: <Translate>Core Concepts</Translate>,
          href: '/concepts/fundamentals/',
        },
        {
          title: <Translate>Become a Rootstock Blockchain Developer</Translate>,
          href: '/resources/courses/',
        },
      ],

    },
    {
      title: <Translate>Deploy Smart Contracts</Translate>,
      color: 'purple',
      description: (
        <Translate>EVM-compatible tools and guides to deploy and scale your dApps on Rootstock.</Translate>
      ),
      list: [
        {
          title: <Translate>Quick Starts</Translate>,
          href: '/developers/quickstart/',
        },
        {
          title: <Translate>Join the Discord Community</Translate>,
          href: 'http://discord.gg/rootstock',
        },
      ],
    },
    {
      title: <Translate>Become a Merged Miner</Translate>,
      color: 'green',
      description: (
        <Translate>Interested in merged mining on Rootstock? Setup a Rootstock node or use the RPC API.</Translate>
      ),
      list: [
        {
          title: <Translate>Merged Mining</Translate>,
          href: '/node-operators/merged-mining/getting-started/',
        },
        {
          title: <Translate>RPC API</Translate>,
          href: 'https://rpc.rootstock.io/',
        },
      ],
    },
    {
      title: <Translate>Apply for a Grant</Translate>,
      color: 'pink',
      description: (
        <Translate>Get funding and support to build your next dApp on Rootstock through the strategic grants program.</Translate>
      ),
      list: [
        {
          title: <Translate>Apply now</Translate>,
          href: 'https://rootstock.io/grants/',
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
