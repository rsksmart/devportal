import Card from '/src/components/Card';
import Translate from '@docusaurus/core/lib/client/exports/Translate';

const data = {
  title: <Translate>Grow with Rootstock</Translate>,
  description: (
    <Translate>Grants, Collective programs, and ecosystem support for new projects.</Translate>
  ),
  card: {
    title: <Translate>Grants and Collective</Translate>,
    color: 'pink',
    description: (
      <Translate>Apply for grants and join governance programs that fund builders on Rootstock.</Translate>
    ),
    list: [
      {
        title: <Translate>Apply for a grant</Translate>,
        href: 'https://rootstock.io/grants/',
        target: '_blank',
      },
      {
        title: <Translate>Rootstock Collective</Translate>,
        href: 'https://rootstockcollective.xyz/',
        target: '_blank',
      },
    ],
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
        <div className="col-12 col-md-6">
          <Card
            title={data.card.title}
            color={data.card.color}
            description={data.card.description}
            list={data.card.list}
          />
        </div>
      </div>
    </section>
  );
}
