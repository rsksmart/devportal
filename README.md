<p align="center">
  <a href="https://dev.rootstock.io">
    <img alt="Rootstock-logo" src="/content/rsk-devportal/assets/img/courses/rootstock-logo.png" width="100" />
  </a>
</p>
<h1 align="center">
  Rootstock + RIF Developer Portal
</h1>

This repo contains the Rootstock + RIF Developer Portal:[https://dev.rootstock.io](https://dev.rootstock.io). The Developer Portal is the home for Rootstock (RSK) documentation for end users and developers. Check out our quickstarts, tutorials, API reference, and code examples.

_Start your journey to building dApps on Rootstock, see the [quick start guide](/guides/quickstart/) or see [setup](#set-up) instructions, or the [contributing](#contributing) guide for how to contribute to the Rootstock Developer Portal._

🚀 [Send us feedback](#issues)

🚀 Join the [Join the global Rootstock community on Discord](https://rootstock.io/discord)

## Table of Contents

* [Requirements](#requirements)
* [Set up](#set-up)
* [Development mode](#development-mode)
* [Preview site](#preview-site)
* [Cleaning cache](#cleaning-cache)
* [Test build outputs](#test-build-outputs)
* [Contributing](#contributing)
* [Links](#links)
* [Findability](#findability)
* [Navigation menu](#navigation-menu)
* [Search results](#search-results)
* [Updating RSKj](#updating-rskj)
* [Issues](#issues)
* [Pull requests](#pull-requests)

## Requirements
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
* [nvm](https://github.com/nvm-sh/nvm)

## Set up

Clone this repository, and run the following commands in the root directory:
```shell
nvm use
```

```shell
yarn install
```

## Usage

### Production build

```bash
yarn run build
```

Compiles your site for production so it can be deployed. Note: It should be run from the project root.

You will now find a site ready for production in `src`.

### Development mode

```bash
yarn run develop
```

The `develop` command compiles and serves a development build of the DevPortal, this reflects any source code changes in the browser in real time. Note: It should be run from the project root.

Edit `src/pages/index.tsx` to see your site updates in real-time! This update will be served at [http://localhost:8000/](http://localhost:8000/). Each time you save a file, the site will get regenerated.

### Preview Site

```shell
yarn run serve
```

The `serve` command serves the production build of the site for testing prior to deployment, and can be viewed via: `http://localhost:9000/`.

### Cleaning Cache

```shell
yarn run clean
```

Note: This is useful as a last resort when your local project seems to have [issues](https://www.gatsbyjs.com/docs/reference/gatsby-cli/#clean) or content does not seem to be refreshing.

### Test build outputs

To run tests that check whether there are any errors in the site:

```bash
NA
```

This runs tests that check whether there are any errors in the site.
Currently uses the Gatsby Remark check links plugin to runs the following basic checks:

- Detects broken links to pages and headings

## Contributing

> - For changes to general content, site pages, images, etc. See the [content folder](/content/).
> - For changes to the logic, or looking adding new features to the devportal. Refer to `gatsby-config.ts`, `gatsby-node.ts`, `/src` pages.

## Add new env variable

To add a new environtment variable you have to create the variable in the `.env.*` file adding `GATSBY_*` prefix. This is needed for [Vercel](https://vercel.com/) which the cloud provider for the devportal. 
Then it will be available under for instance `process.env.GATSBY_API_URL` in your code.
```
process.env.GATSBY_API_URL;
```

### Writing original documentation

Steps:

1. Locate the `content` folder
2. Create a markdown file in the section you wish to add the docs.
3. Add `title`, `menu_title`, `tags`, `description`, and `menu_order` attributes
   to the front matter as appropriate - see below for more details.
4. If the new page is within a collection, and it is named `index.md`, add a `section_title`, `menu_title`. Ensure that you set a `permalink` attribute in the front matter, with a trailing `/`.

**See example below:**

```
---
layout: rsk
section_title: Rootstock Blockchain
menu_title: About Rootstock Blockchain
title: Rootstock Blockchain
tags: rsk
description: What is Rootstock?
menu_order: 2
permalink: /rsk/
---
```


### Replicating existing documentation

This applies if you have documentation in other git repositories
which need to be replicated here.
This is expected to be used sparingly, only for libraries with existing documentation.

Steps:

1. Create a markdown file which contains **only** front matter.
2. Edit `/.git-cached-copy.config.json` to specify the details
   of files from other git repositories that should be copied.

Tips:

- Test the build output to ensure that the following common errors are fixed
  - Hyperlinks to anchors by ID attribute are correct
  - Referenced image files are also copied

### Moving existing documentation

This applies when you have documentation already published on the devportal,
but wish to move or rename it.

1. Do **not** use `git mv` to move/ rename the file
1. Instead create a new file in the target location/ file path,
   and leave the previous one there.
1. In the new file, copy all the contents from the previous file.
1. In the previous file, delete all contents,
   and replace the front matter with redirection instructions.
   Note that both URLs should be absolute and end with `/`.
   For example:

```yaml
---
layout: redirect
permalink: /develop/apps/tools/stats/
redirect: /tools/
---
```

**Why**: This is done because when a page is published at a certain URL,
that URL may be linked to externally.
By renaming/ moving a page, the URL changes, and any external links
may get a "404 Page Not Found" error.
In this scenario, a redirect is preferred as it is
much more user friendly, and search engine friendly.

### Links

1. When adding links, prefer absolute links - e.g. links beginning with `/`,
   over relative links - e.g. links beginning with `./` or `../`
1. Run `??` to identify any broken links -
   this includes both links to other pages within devportal,
   and links to anchor references within devportal pages,
   however does not include links to external pages (not within devportal).

### Findability

When you add new documentation, you should check that a visitor
is able to find it through *both* the navigation bar,
and the search functionality.

#### Navigation menu

- If your new pages are within a collection
  - The reader may use "previous" and "next" links to go through the pages in a sequence
  - Ensure that all pages within the collection have a **unique** value for `menu_order`
    in their front matter - use positive whole numbers only
  - Ensure that the sequence is in a correct order -
    it starts from lowest `menu_order` and ends at highest `menu_order`
  - Look at `_quick-start/*.md` for a good example of this

#### Search results

- A reader may find your new pages through the search feature available at `/search/index.html`
- To maximize the quality of the search results,
  ensure that you add all of the following to the front matter for each new page
  - `title`:
    This is the title of the page which is also displayed to the reader.
    Avoid using special characters, unicode characters, or emoji,
    as readers are less likely to use these in search.
`menu_title`:
The menu title appears in the navigation menu, ensure to add this on each page for easy navigation.
  - `tags`:
    Use this to set the categories, labels, or other keywords which
    you think a reader would search for when looking for this page.
  - `description`:
    If this is not present, it defaults to the first 200 words in the content.
    It is a good idea to set this to include any words or phrases which
    you think a reader would search for when looking for this page.

### Updating RSKj

When a new version of RSKj is released:

- Update the version numbers list in the public nodes page:
  - `rsk/node/reproducible.md`
- Update the version numbers and checksums in the installation instructions pages:
  - `rsk/node/install/java.md`
  - `rsk/node/contribute/linux.md`
  - `rsk/node/contribute/macos.md`
  - `rsk/node/install/ubuntu.md`
- Update the version numbers and checksums in the reproducible builds page:
  - `rsk/node/reproducible.md`
- Update to add/ remove/ update any RPC methods, if relevant, in the RPC page
  - `rsk/node/architecture/json-rpc.md`

### Issues

We encourage you to
[report issues](https://github.com/rsksmart/rsksmart.github.io/issues).
When you open an issue, you should be given the option to choose a category.
Choose the most appropriate one.

Next, the description should be automatically populated from a template.
Fill it in accordingly.
Note that **What** and **Why** sections are compulsory,
and the **Refs** section is optional.

### Pull Requests

You can also contribute to the Developer's portal by sending a
[PR](https://github.com/rsksmart/rsksmart.github.io/pulls).

When you open a pull request,
the description should be automatically populated from a template.
Fill it in accordingly.
Note that **What** and **Why** sections are compulsory,
and the **Refs** section is optional.

Please run `??` to test the build output of your branch prior to
creating a new pull request, or pushing more commits to an existing one.
Don't introduce any regressions!