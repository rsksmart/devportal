[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/rsksmart/devportal/badge)](https://scorecard.dev/viewer/?uri=github.com/rsksmart/devportal)
[![CodeQL](https://github.com/rsksmart/rskj/workflows/CodeQL/badge.svg)](https://github.com/rsksmart/devportal/actions?query=workflow%3ACodeQL)
<img src="rootstock-logo.png" alt="RSK Logo" style="width:100%; height: auto;" />

# Rootstock Developer Portal

This repo contains the [Rootstock Developer Portal](https://dev.rootstock.io). The Developer Docs is the home for Rootstock documentation for end users and developers. Check out our quickstarts, tutorials, API reference, and code examples.

_Start your journey to building dApps on Rootstock, see the [Quick Start Guide](./docs/02-developers/04-quickstart/index.md) or see the [setup](#set-up) instructions, or the [contributing](CONTRIBUTING_DOCS.md) guide for how to contribute to Rootstock Documentation._

🚀 [Send us feedback](#issues)

🚀 Join the [global Rootstock community on Discord](http://discord.gg/rootstock)

> This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator. For more information on how to use Docusaurus, please refer to the [Docusaurus Documentation](https://docusaurus.io/docs).

## Requirements
- Node 18+

## Installation and development

## Set Up

Clone this repository, and run the following commands in the root directory:

### Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Usage 

### Production Build

```bash
yarn build
```

This command generates static content into the `build` directory and also detects broken links.

## Project Structure

The structure of this website is based on the `docs` folder. This structure allows for a scalable and organized website, where new sections can be easily added by creating new directories in the `docs` folder.
Each directory within the `docs` folder represents a separate section on the website.
This allows for a clear and organized structure, making it easy for users to navigate through the different sections of the website.

Here's a simplified example of how it might look:

```text
/docs
  /guide
    index.md
    doc1.md
    doc2.md
  /tutorial
    index.md
    doc3.md
    doc4.md
```

### Main Navigation and Sidebars

The main navigation of the website is created based on the root directories in the `/docs` folder. Each directory has its own sidebar for easy navigation.

> Root directories name must contain only a character that is a letter, a number, a dash, or an underscore. If it doesn't, the directory is ignored and won't appear in main navigation.

In this case, the main navigation of the website would have two sections: "Guide" and "Tutorial".

Sidebars are created automatically based on the root directories in the `/docs` folder. Each section would have its own sidebar with links to the documents within that section. For example, the "Guide" section would have a sidebar with links to `/guide`, `/guide/doc1` and `/guide/doc2`.

Titles of the links in the sidebar are determined by the Markdown front matter of the corresponding documents. See [Style Guide](STYLE-GUIDE.md)

### Images Storage

Images used in this project should be stored in the `/static/img` directory. This directory is accessible from anywhere in the project, allowing you to easily reference images in your Markdown files, JavaScript files, or CSS files.

Please note that the path to the image is relative to the root of the project, not the location of the Markdown file. This means that you should always start the path with `/img/`, regardless of where the Markdown file is located.

For more information on how to use images in Docusaurus, please refer to the [Contributing Docs](CONTRIBUTING_DOCS.md).

## Writing original documentation

Steps:
1. Locate the `docs` folder
2. Create a markdown file in the section you wish to add the docs.
3. Add `title`, `sidebar_label`, `tags`, `description`, and `sidebar_position` attributes
   to the front matter as appropriate - see below for more details.
4. If the new page is within a collection, and it is named `index.md`, add a `section_title`, `menu_title`. Ensure that you set a `permalink` attribute in the front matter, with a trailing `/`.

Each documentation file should start with a Markdown front matter. This is a base set of metadata about the file, and it's written at the top of the file enclosed between two lines of three dashes. Here is a basic example for file `/docs/concepts/architecture/index.md`:

```markdown
---
title: Run Ethereum dApps with Bitcoin Network Security
description: "The Rootstock virtual machine is compatible with Ethereum Virtual machine at an opcode level."
sidebar_label: Architecture
sidebar_position: 1
---
```

In this case, "Architecture" would be the title of the link in the sidebar, and the link would lead to `/concepts/architecture`.

The base Markdown front matter includes the following fields:

- `title`: The text title of your document. Used for the page metadata and as a fallback value in multiple places (sidebar, next/previous buttons...). Automatically added at the top of your doc if it does not contain any Markdown title.
- `description`: A brief description of the document. This is optional and is not displayed in the sidebar. The description of your document, which will become the `<meta name="description" content="..."/>` and `<meta property="og:description" content="..."/>` in `<head>`, used by search engines.
- `sidebar_label`: The label of the document in the sidebar. If this is not provided, the `title` will be used.
- `sidebar_position`: The position of the document in the sidebar. Documents with lower numbers appear first. If this is not provided, the documents will be ordered alphabetically.

For details for Doc Creation, please refer to the [Style Guide](STYLE-GUIDE.md).

For a detailed description of each field, please refer to the [Docusaurus Documentation](https://docusaurus.io/docs/next/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter).

### Moving existing documentation

This applies when you have documentation already published on the devportal,
but wish to move or rename it. All redirects are handled using `vercel.json` file.

1. Do **not** use `git mv` to move/ rename the file
2. Instead create a new file in the target location/ file path,
   and leave the previous one there.
3. In the new file, copy all the contents from the previous file, add previous and new path urls to `vercel.json`.

**Why**: This is done because when a page is published at a certain URL,
that URL may be linked to externally.
By renaming/ moving a page, the URL changes, and any external links
may get a "404 Page Not Found" error.
In this scenario, a redirect is preferred as it is
much more user friendly, and search engine friendly.

## Links

1. When adding links, prefer absolute links - e.g. links beginning with `/`,
   over relative links - e.g. links beginning with `./` or `../`
1. Run `yarn build` to identify any broken links -
   this includes both links to other pages within devportal,
   and links to anchor references within devportal pages,
   however does not include links to external pages (not within devportal).

### Broken Link Detection

This runs tests that check whether there are any errors in the site. Uses Docusaurus provides built-in broken link detection to ensure the quality of documentation. This feature is enabled by default and can be configured in the `docusaurus.config.js` file.


```bash
yarn build
```

> The broken links detection is only available for both local and production builds (docusaurus build).

Here's an example of how it might look:

```javascript
module.exports = {
  // ...
  onBrokenLinks: 'warn', // or 'throw', 'ignore'
  onBrokenMarkdownLinks: 'warn', // or 'throw', 'ignore'
  // ...
};
```

By default, it set to `warn`: Docusaurus will log a warning in the console, but the build will continue.

For more details on broken link detection in Docusaurus, please refer to the [Docusaurus Documentation](https://docusaurus.io/docs/next/api/docusaurus-config#onBrokenLinks).

## Findability

When you add new documentation, you should check that a visitor
is able to find it through *both* the navigation bar,
and the search functionality. The Algolia and Mendable AI Search component regularly crawls and updates content.

### Navigation menu

- If your new pages are within a collection
  - The reader may use "previous" and "next" links to go through the pages in a sequence
  - Ensure that all pages within the collection have a value for `sidebar_position`
  - Look at `/docs/developers/smart-contracts.md` for a good example of this

### Search results

- A reader may find your new pages through the Algolia search feature and Mendable ASK AI.
- To maximize the quality of the search results,
  ensure that you add all of the following to the front matter for each new page
  - `title`:
    This is the title of the page which is also displayed to the reader.
    Avoid using special characters, unicode characters, or emoji,
    as readers are less likely to use these in search.
  - `sidebar_label`:
    The menu title appears in the navigation menu, ensure to add this on each page for easy navigation.
  - `sidebar_position`:
    The position of the content on the side navigation.
  - `tags`:
    Use this to set the categories, labels, or other keywords which
    you think a reader would search for when looking for this page.
    - Use only relevant tags. See [Style Guide](STYLE-GUIDE.md) for how to use tags.
  - `description`:
    If this is not present, it defaults to the first 200 words in the content.
    It is a good idea to set this to include any words or phrases which
    you think a reader would search for when looking for this page.

## Changelog

A changelog is a file which contains a curated, chronologically ordered list of notable changes for each version of a project.

[Rootstock Changelog](https://dev.rootstock.io/changelog/) provides information about the latest product updates to the RSKj node and products within the Rootstock Ecosystem.

To update the changelog or add a new article, see `/changelog.md` folder. Create a file with the date and title of the change. For e.g, `2024-07-04-introducing-arrowhead-6-3-0.md`. 

Add the update details. See below for an example:

```markdown
---
title: "Introducing Arrowhead 6.3.1: What You Need To Know About Rootstock’s Upcoming Patch Network Upgrade"
author: Rootstock
tags: [release]
image: https://blog.rootstock.io/wp-content/uploads/2024/07/Arrowhead-6.3.1-Release.png
url: https://blog.rootstock.io/noticia/introducing-arrowhead-6-3-1-what-you-need-to-know-about-rootstocks-upcoming-patch-network-upgrade/
---

**Summary**: The Rootstock network will undergo a patch network upgrade on block 6,549,300. This mandatory upgrade fixes the PowPeg outage reported on June 24th; users who adhere to these changes must update their nodes to the latest version
```

> Image and logo usage is optional. Currently, changelog announcements can only link externally to the [Rootstock blog](https://blog.rootstock.io) or [project repository](https://github.com/rsksmart).

### Updating RSKj

When a new version of Rootstock (RSKj) node is released:

- Update the version numbers list in the public nodes page:
  - `/node-operators/setup/reproducible.md`
- Update the version numbers and checksums in the installation instructions pages:
  - `/node-operators/setup/installation/java.md`
  - `/node-operators/setup/node-runner/linux.md/`
  - `/node-operators/setup/node-runner/macos.md/`
  - `/node-operators/setup/node-runner/ubuntu.md`
- Update the version numbers and checksums in the reproducible builds and security chain pages:
  - `/node-operators/setup/reproducible.md`
- Update to add/ remove/ update any RPC methods, if relevant, in the RPC page
  - `/node-operators/json-rpc.md/`
- Do a global search with the old version number so as not to miss out on other pages using the old version number.

## Contributing

> - For changes to general content, site pages, images, etc. See the [docs folder](/docs/).
> - For changes to the logic, or looking adding new features to the devportal. Refer to `docusaurus.config.js`, `/src/components` folders.

### Issues

We encourage you to
[report issues](https://github.com/rsksmart/devportal/issues).
When you open an issue, you should be given the option to choose a category.
Choose the most appropriate one.

Next, the description should be automatically populated from a template.
Fill it in accordingly.
Note that **Describe the bug**, **Reproduce**, **Device Type**, and **Screenshots** sections are compulsory,
and the **Addditional Contest** section is optional.

### Pull Requests (PR)

You can also contribute to the Developer's portal by sending a
[PR](https://github.com/rsksmart/devportal/pulls).

When you open a pull request,
the description should be automatically populated from a template.
Fill it in accordingly.
Note that **Title** and **Description**, **screenshot**, and **checklist** sections are compulsory,
and the **testing**, and **Refs** sections are optional.

> Note to run `yarn build` to test the build output of your branch prior to creating a new pull request, or pushing more commits to an existing one. Don't introduce any regressions!
