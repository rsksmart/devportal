import Card from "/src/components/Card";

const data = {
  title: 'Browse by Products',
  description: null,
  cards: [
    {
      title: 'Bridges',
      color: 'orange',
      description: (
        <>
          See the ways you can get started.
        </>
      ),
      list: [
        {
          title: 'Flyover',
          href: '#',
        },
        {
          title: '2 Way Peg',
          href: '#',
        },
      ],

    },
    {
      title: 'Wallets',
      color: 'green',
      description: (
        <>
          Start building and integrating DApps
        </>
      ),
      list: [
        {
          title: 'RIF Wallet',
          href: '#',
        },
      ],
    },
    {
      title: (
        <>
          Name <br/> Services
        </>
      ),
      color: 'pink',
      description: (
        <>
          See the ways you can get started.
        </>
      ),
      list: [
        {
          title: 'RNS',
          href: '#',
        },
        {
          title: 'rLogin',
          href: '#',
        },
      ],
    },
    {
      title: 'Exchanges',
      color: 'yellow',
      description: (
        <>
          Start building and integrating DApps
        </>
      ),
      list: [
        {
          title: 'Fast BTC',
          href: '#',
        }
      ],
    },
  ]
};

export default function HomepageSectionProducts() {
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
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-16 g-lg-24">
        {data.cards.map((item, idx) => (
          <div className={`col`} key={idx}>
            <Card index={`${idx + 1}.`} title={item.title} color={item.color} description={item.description} list={item.list}/>
          </div>
        ))}
      </div>
    </section>
  );
}
