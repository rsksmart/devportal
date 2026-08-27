import React from 'react';
import Layout from '@theme/Layout';
import Cheatsheet from '@site/src/components/Cheatsheet';
import LlmsTxtDirective from '/src/components/LlmsTxtDirective';

export default function CheatsheetPage() {
  return (
    <Layout
      title="Rootstock Developer Cheatsheet"
      description="Everything you need to start building on Rootstock. Network setup, starter kits, AI tooling, and institutional entry points on one page."
      wrapperClassName="cheatsheet-page"
      noFooter>
      <LlmsTxtDirective />
      <Cheatsheet />
    </Layout>
  );
}
