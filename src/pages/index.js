import Layout from '@theme/Layout';

import HomepageSectionWelcome from '/src/components/Homepage/HomepageSectionWelcome';
import HomepageSectionBuildWithAI from '/src/components/Homepage/HomepageSectionBuildWithAI';
import HomepageSectionUseCases from '/src/components/Homepage/HomepageSectionUseCases';
// import HomepageSectionDevTools from '/src/components/Homepage/HomepageSectionDevTools';
import HomepageSectionProducts from '/src/components/Homepage/HomepageSectionProducts';
import HomepageSectionGrow from '/src/components/Homepage/HomepageSectionGrow';
import HomepageAside from '/src/components/Homepage/Aside';
import LlmsTxtDirective from '/src/components/LlmsTxtDirective';
import React from 'react';

export default function Home() {
  return (
    <Layout
      description="Rootstock is the Bitcoin sidechain secured by over 85% of Bitcoin's hash power through merge mining. Build EVM-compatible smart contracts and financial applications with Bitcoin-grade security and familiar Ethereum tooling.">
      <main>
        <LlmsTxtDirective />
        <div className="row">
          <div className="col-12 col-lg-9 col-xl-10">
            <HomepageSectionWelcome />
            <HomepageSectionBuildWithAI />
            <HomepageSectionUseCases />
            {/* <HomepageSectionDevTools /> */}
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
