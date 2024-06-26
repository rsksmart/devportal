import clsx from 'clsx';
import Button from '/src/components/Button';
import TitleColor from "/src/components/TitleColor";

const content = {
  suptitle: 'Overview',
  title: 'Welcome to Roostock',
  description: (
    <>
      Explore guides, quick starts, and API references to build and integrate your DApp.
    </>
  ),
  links: [
    {
      title: 'Quick Start',
      url: '/developers/',
    },
    {
      title: 'Use the Starter Kits',
      url: '/developers/quickstart/starter-kits/',
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
        <TitleColor as={`h1`} size={'md'} className={`mb-24`}>
          {content.title}
        </TitleColor>
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
