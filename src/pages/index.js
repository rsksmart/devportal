import Layout from '@theme/Layout';

import HomepageSectionWelcome from '/src/components/Homepage/HomepageSectionWelcome';
import HomepageSectionDocsOrientation from '/src/components/Homepage/HomepageSectionDocsOrientation';
import HomepageSectionUseCases from '/src/components/Homepage/HomepageSectionUseCases';
import HomepageSectionProducts from '/src/components/Homepage/HomepageSectionProducts';
import HomepageSectionGrow from '/src/components/Homepage/HomepageSectionGrow';
import HomepageAside from '/src/components/Homepage/Aside';
import LlmsTxtDirective from '/src/components/LlmsTxtDirective';
import React from 'react';

export default function Home() {
  return (
    <Layout
      description="Rootstock developer documentation: quickstarts, integration guides, API reference, and use case recipes for building on a Bitcoin sidechain secured by merge mining.">
      <main>
        <LlmsTxtDirective />
        <div className="row">
          <div className="col-12 col-lg-9 col-xl-10">
            <HomepageSectionWelcome />
            <HomepageSectionDocsOrientation />
            <HomepageSectionUseCases />
            <HomepageSectionProducts />
            <HomepageSectionGrow />
          </div>
          <div className="col-12 col-lg-3 col-xl-2">
            <HomepageAside />
          </div>
        </div>
      </main>
    </Layout>
  );
}
