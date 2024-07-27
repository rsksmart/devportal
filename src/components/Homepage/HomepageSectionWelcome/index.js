import clsx from 'clsx';
import Button from '/src/components/Button';
import TitleColor from "/src/components/TitleColor";

const content = {
  // suptitle: 'Overview',
  title: 'Rootstock Documentation',
  description: (
    <>
      Explore guides, quick starts, and SDKs to build and integrate your dApps.
    </>
  ),
  links: [
    {
      title: 'Quick Start',
      url: '/developers/quickstart/',
    },
    {
      title: 'Explore Docs',
      url: '/concepts/fundamentals/',
    }
  ]
};

export default function HomepageSectionWelcome() {
  return (
    <section className={`mb-64`}>
      {content.suptitle && (
        <p className={`mb-24 fs-12 fw-medium`}> {content.suptitle}</p>
      )}
      {content.title && (
        <h1 className='mb-24 fs-56'>{content.title}</h1>
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
