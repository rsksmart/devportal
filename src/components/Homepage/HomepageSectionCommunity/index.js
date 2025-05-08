import Card from "/src/components/Card";
import Translate from "@docusaurus/core/lib/client/exports/Translate";
import {translate} from '@docusaurus/Translate';

const data = {
  title: <Translate>Connect with the Community</Translate>,
  description: null,
  cards: [
    {
      title: <Translate>Discord</Translate>,
      color: 'cyan',
      icon: 'discord',
      link: {
        title: <Translate>Join Discord</Translate>,
        href: 'https://discord.com/invite/rootstock',
        target: '_blank',
      },
      description: `Join the Rootstock \n Developer Community on Discord.`
    },
    {
      title: <Translate>GitHub</Translate>,
      color: 'contrast',
      icon: 'github',
      link: {
        title: <Translate>Star on Github</Translate>,
        href: 'https://github.com/rsksmart/devportal',
        target: '_blank',
      },
      description: `Explore open source tools, smart contracts and starter kits for deploying and integrating your dApps.`
    },
    {
      title: <Translate>Stay Connected</Translate>,
      color: 'yellow',
      link: {
        title: <Translate>View upcoming Events</Translate>,
        href: 'https://rootstock.io/events',
        target: '_blank',
      },
      description: `View upcoming events, community calls, webinars, and meetups happening \n around the world.`
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
            <Card index={`${idx + 1}.`} title={item.title} color={item.color} description={translate({message:item.description})}
                  link={item.link} icon={item.icon} />
          </div>
        ))}
      </div>
    </section>
  );
}
