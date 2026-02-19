import Button from '/src/components/Button';
import Translate from "@docusaurus/core/lib/client/exports/Translate";

const content = {
  // suptitle: 'Overview',
  title: <Translate>Rootstock Documentation</Translate>,
  description: (
    <Translate>Explore guides, quick starts, and SDKs to build and integrate your dApps.</Translate>
  ),
  links: [
    {
      title: <Translate>Quick Start</Translate>,
      url: '/developers/quickstart/',
    },
    {
      title: <Translate>Explore Docs</Translate>,
      url: '/developers/blockchain-essentials/',
    }
  ]
};

export default function HomepageSectionWelcome() {
  return (
    <section className={`mb-64`}>
      {content.suptitle && (
        <p className={`mb-24 fs-12 fw-medium`}>
          {content.suptitle}
        </p>
      )}
      {content.title && (
        <h1 className='mb-24 fs-56'>
          {content.title}
        </h1>
      )}
      {content.description && (
        <p className={`h2 mb-32`}>{content.description}</p>
      )}
      <div className="d-flex gap-24">
        {content.links.map((link, idx) => (
          <Button href={link.url} key={idx} size={`lg`}>
            {link.title}
          </Button>
        ))}
      </div>
    </section>
  );
}
