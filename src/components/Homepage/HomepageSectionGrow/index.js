import Card from '/src/components/Card';
import Translate from '@docusaurus/core/lib/client/exports/Translate';

const data = {
  title: <Translate>Funding and governance</Translate>,
  description: (
    <Translate>
      Rootstock Collective runs grants, governance, and builder programs on Rootstock.
    </Translate>
  ),
  card: {
    title: <Translate>Rootstock Collective</Translate>,
    color: 'pink',
    description: (
      <Translate>
        Apply for grants, join builder programs, and participate in Collective governance.
      </Translate>
    ),
    link: {
      title: <Translate>Open Rootstock Collective</Translate>,
      href: 'https://rootstockcollective.xyz/',
      target: '_blank',
    },
  },
};

export default function HomepageSectionGrow() {
  return (
    <section className={`mb-0`}>
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
      <div className="row g-16 g-lg-24">
        <div className="col-12">
          <Card
            title={data.card.title}
            color={data.card.color}
            description={data.card.description}
            link={data.card.link}
          />
        </div>
      </div>
    </section>
  );
}
