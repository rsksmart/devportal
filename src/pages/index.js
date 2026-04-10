import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import HomepageSectionGuides from "/src/components/Homepage/HomepageSectionGuides";
import HomepageSectionWelcome from "/src/components/Homepage/HomepageSectionWelcome";
import HomepageSectionDevTools from "/src/components/Homepage/HomepageSectionDevTools";
import HomepageSectionProducts from "/src/components/Homepage/HomepageSectionProducts";
import HomepageSectionUseCases from "/src/components/Homepage/HomepageSectionUseCases";
import HomepageSectionCommunity from "/src/components/Homepage/HomepageSectionCommunity";
import HomepageAside from "/src/components/Homepage/Aside";
import React from "react";

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      description="Rootstock is the first open source Smart Contract platform secured by the Bitcoin Network. Rootstock adds value and expand functionality to the Bitcoin ecosystem by providing smart contracts and greater scalability.">
      <main>
        <div className="row">
          <div className="col-12 col-lg-9 col-xl-10">
            <HomepageSectionWelcome />
            <HomepageSectionGuides />
            <HomepageSectionDevTools />
            <HomepageSectionUseCases />
            <HomepageSectionProducts />
            <HomepageSectionCommunity />
          </div>
          <div className="col-12 col-lg-3 col-xl-2">
            <HomepageAside />
          </div>
        </div>
      </main>
    </Layout>
  );
}
