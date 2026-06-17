import Card from '/src/components/Card';
import Translate from '@docusaurus/core/lib/client/exports/Translate';

const data = {
  title: <Translate>Build with AI</Translate>,
  description: (
    <Translate>
      Install Rootstock's MCP Server and connect Cursor or Claude to deploy contracts, query chain data, and run on-chain operations from your editor.
    </Translate>
  ),
  link: {
    title: <Translate>Get started with MCP</Translate>,
    href: '/developers/quickstart/mcp/',
  },
};

export default function HomepageSectionBuildWithAI() {
  return (
    <section className={`mb-64`}>
      <Card
        title={data.title}
        color="cyan"
        description={data.description}
        link={data.link}
      />
    </section>
  );
}
