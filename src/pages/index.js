import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import HomepageSectionGuides from "/src/components/Homepage/HomepageSectionGuides";
import HomepageSectionWelcome from "/src/components/Homepage/HomepageSectionWelcome";
import HomepageSectionDevTools from "/src/components/Homepage/HomepageSectionDevTools";
import HomepageSectionProducts from "/src/components/Homepage/HomepageSectionProducts";
import HomepageSectionCommunity from "/src/components/Homepage/HomepageSectionCommunity";
import HomepageAside from "/src/components/Homepage/Aside";
import React from "react";

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <main>
        <div className="row">
          <div className="col-12 col-lg-9 col-xl-10">
            <HomepageSectionWelcome />
            <HomepageSectionGuides />
            <HomepageSectionDevTools />
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
