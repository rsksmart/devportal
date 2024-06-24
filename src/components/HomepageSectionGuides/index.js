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
];

export default function HomepageSectionGuides() {
  return (
    <section className={`mb-64`}>

      <h2 className={`h1 mb-12`}>Guides for Builders</h2>
      <div className="markdown mb-24">
        <p>Whether you're a developer building a dApp Rootstock, a node miner running a merged mining on Rootstock, or a general user of tools and services, you'll find everything you need to get started right here.</p>
      </div>
      <div className="row row-cols-1 row-cols-lg-3">
        {GuidesList.map((item, idx) => (
          <div className={`col`} key= {idx}>
            <Card title={item.title} color={item.color} description={item.description} list={item.list} />
          </div>
        ))}
      </div>

    </section>
  );
}
