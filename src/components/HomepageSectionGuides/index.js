import clsx from 'clsx';
import Heading from '@theme/Heading';

import Button from '../Button';
import Card from "../Card";

const GuidesList = [
  {
    title: 'New to Web3?',
    color: 'orange',
    description: (
      <>
        See the ways you can get started.
      </>
    ),
  },
  {
    title: 'Developers',
    color: 'purple',
    description: (
      <>
        Start building and integrating DApps
      </>
    ),
  },
  {
    title: 'Node Operators',
    color: 'green',
    description: (
      <>
        Are you a node miner? Interested in merged mining on Rootstock? Get up and running with Rootstock nodes or use the RPC API.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={``} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageSectionGuides() {
  return (
    <section className={`mb-64`}>

      <h2 className={`h1`}>Guides for Builders</h2>
      <div className="text-block">
        <p>Whether you're a developer building a dApp Rootstock, a node miner running a merged mining on Rootstock, or a general user of tools and services, you'll find everything you need to get started right here.</p>
      </div>
      <div className="row row-cols-1 row-cols-lg-3">
        {GuidesList.map((item, idx) => (
          <div className={`col`} key= {idx}>
            <Card title={item.title} color={item.color} description={item.description} />
          </div>
        ))}
      </div>

    </section>
  );
}
