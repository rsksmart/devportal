import clsx from 'clsx';

import Card from "/src/components/Card";

const data = {
  title: 'Connect with the Community',
  description: null,
  cards: [
    {
      title: 'Discord',
      color: 'cyan',
      icon: 'discord',
      link: {
        title: 'Join Discord',
        href: 'https://discord.com/invite/rootstock',
        target: '_blank',
      },
      description: (
        <>
          Join the Rootstock<br/> Developer Community on Discord.
        </>
      ),

    },
    {
      title: 'GitHub',
      color: 'contrast',
      icon: 'github',
      link: {
        title: 'Star on Github',
        href: 'https://github.com/rsksmart/devportal',
        target: '_blank',
      },
      description: (
        <>
          Explore open source tools, smart contracts and starter kits for deploying and integrating your dApps.
        </>
      ),
    },
    {
      title: 'Stay Connected',
      color: 'yellow',
      link: {
        title: 'View upcoming Events',
        href: 'https://rootstock.io/events',
        target: '_blank',
      },
      description: (
        <>
          View upcoming events, community calls,<br/> webinars, and meetups happening<br/> around the world.
        </>
      ),
    },
  ]
};

export default function HomepageSectionCommunity() {
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
        {data.cards.map((item, idx) => (
          <div className={`col-12 ${idx === 2 ? 'col-md-12' : 'col-md-6'}`} key={idx}>
            <Card index={`${idx + 1}.`} title={item.title} color={item.color} description={item.description}
                  link={item.link} icon={item.icon} />
          </div>
        ))}
      </div>
    </section>
  );
}
