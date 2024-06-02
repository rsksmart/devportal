// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import {createNavItems} from './src/_utils/utils.js';

const customNavItems = createNavItems('./docs');

/** @type {import('@docusaurus/types').Config} */
const config = {
  noIndex: true, // set to false to enable search engine indexing

  title: 'Rootstock Developers Portal',
  tagline: 'Welcome to Rootstock',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://dev.rootstock.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'rsksmart', // Usually your GitHub org/user name.
  projectName: 'devportal', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: ['docusaurus-plugin-sass'],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/', // Serve the docs at the site's root
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false, // Optional: disable the blog plugin
        theme: {
          customCss: ['./src/scss/app.scss'],
          // customCss: ['./src/css/custom.css']
        },
      }),
    ],
  ],
  // themes: ['@docusaurus/theme-search-algolia'],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      // Replace with your project's social card
      image: 'img/og.jpg',
      navbar: {
        title: 'Docs',
        logo: {
          alt: 'Rootstock Devportal',
          src: 'img/logo.svg',
        },
        items: [
          {
            to: '/',
            position: 'left',
            activeBasePath: '/home',
            label: 'Home',
          },
          ...customNavItems,
          {
            href: 'https://github.com/rsksmart/devportal',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        // style: 'dark',
        links: [
          {
            title: 'WHITEPAPER',
            items: [
              {
                label: 'Original Whitepaper',
                href: 'https://rootstock.io/rsk_white_paper-original.pdf',
              },
              {
                label: 'Updated Whitepaper',
                href: 'https://rootstock.io/static/a79b27d4889409602174df4710102056/RS-whitepaper.pdf',
              },
              {
                label: 'RIF Whitepaper',
                href: 'https://rootstock.io/static/add903ce229a6f45a606cd78b028cf9e/RIF-whitepaper-V2.pdf',
              },
            ],
          },
          {
            title: 'RESOURCES',
            items: [
              {
                label: 'Merged Mining',
                href: 'https://rootstock.io/mine-btc-with-rootstock/',
              },
              {
                label: 'Rootstock Explorer',
                href: 'https://explorer.rootstock.io/',
              },
              {
                label: 'About RootstockLabs',
                href: 'https://www.rootstocklabs.com/about-us/',
              },
              {
                label: 'Blog',
                href: 'https://blog.rootstock.io/',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()}. RootstockLabs. All rights reserved`
      },
      socials: {
        discord: 'http://discord.gg/rootstock',
        x: 'https://twitter.com/rootstock_io',
        telegram: 'https://t.me/rskofficialcommunity'
      },
      tagline:{
        text1 : 'Build',
        text2 : 'Together',
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
