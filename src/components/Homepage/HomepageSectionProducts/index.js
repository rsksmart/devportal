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
          Bridge in/out of Rootstock.
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
        {
          title: 'RIF on Chain',
          href: 'https://rifonchain.com/',
        },
      ],

    },
    {
      title: 'Wallets',
      color: 'green',
      description: (
        <>
          View wallets compatible with the Rootstock platform.
        </>
      ),
      list: [
        {
          title: 'Metamask',
          href: '#',
        },
        {
          title: 'MyCrypto',
          href: '#',
        },
        {
          title: 'Bitget',
          href: '#',
        },
      ],
    },
    {
      title: (
        <>
          RIF Suite
        </>
      ),
      color: 'pink',
      description: (
        <>
          Explore Open-source tools and technologies for faster, 
          and more rewarding ways to build on Bitcoin.
        </>
      ),
      list: [
        {
          title: 'RNS',
          href: '#',
        },
        {
          title: 'Relay',
          href: '#',
        },
      ],
    },
    {
      title: 'No-Code',
      color: 'yellow',
      description: (
        <>
          No-code platforms and tools to deploy on Rootstock.
        </>
      ),
      list: [
        {
          title: 'Tools',
          href: '/developer-tools/',
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
