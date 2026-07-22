import Link from '/src/components/Link';
import Translate from '@docusaurus/core/lib/client/exports/Translate';
import styles from './styles.module.scss';

const sections = [
  {
    title: <Translate>Concepts</Translate>,
    description: (
      <Translate>
        Platform fundamentals, rBTC, PowPeg security, and the Rootstock stack.
      </Translate>
    ),
    href: '/concepts/',
  },
  {
    title: <Translate>Developers</Translate>,
    description: (
      <Translate>
        Quickstarts, smart contracts, integrations, libraries, and RPC API.
      </Translate>
    ),
    href: '/developers/',
  },
  {
    title: <Translate>Node Operators</Translate>,
    description: (
      <Translate>
        Node setup, merge mining, JSON-RPC, and network maintenance.
      </Translate>
    ),
    href: '/node-operators/',
  },
  {
    title: <Translate>Resources</Translate>,
    description: (
      <Translate>
        Tutorials, guides, FAQ, and how to contribute to these docs.
      </Translate>
    ),
    href: '/resources/',
  },
  {
    title: <Translate>Dev Tools</Translate>,
    description: (
      <Translate>
        Wallets, bridges, Hardhat, Foundry, and the tooling catalog.
      </Translate>
    ),
    href: '/dev-tools/',
  },
  {
    title: <Translate>Use Cases</Translate>,
    description: (
      <Translate>
        Step-by-step implementation guides grouped by goal.
      </Translate>
    ),
    href: '/use-cases/',
  },
];

export default function HomepageSectionDocsOrientation() {
  return (
    <section className={`mb-64`}>
      <h2 className="h1 mb-12">
        <Translate>How to use these docs</Translate>
      </h2>
      <p className="markdown mb-32">
        <Translate>
          The sections below match the main navigation. Each one covers a different part of the portal, from core concepts and developer guides to node operations and tooling.
        </Translate>
      </p>
      <div className={`row row-cols-1 row-cols-md-2 row-cols-xl-3 g-16 ${styles.grid}`}>
        {sections.map((item, idx) => (
          <div className="col" key={idx}>
            <div className={`${styles.tile} h-100 rounded-20 px-16 py-24 p-lg-32 border`}>
              <h3 className="h3 mb-8">
                <Link href={item.href} className="fw-bold">
                  {item.title}
                </Link>
              </h3>
              <p className="markdown fw-medium mb-0">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
