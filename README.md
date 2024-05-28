# Rootstock Devportal

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

For more information on how to use Docusaurus, please refer to the [Docusaurus Documentation](https://docusaurus.io/docs).

## Requirements
- Node 18

## Installation and development
### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Project Structure
The structure of this website is based on the `docs` folder. This structure allows for a scalable and organized website, where new sections can be easily added by creating new directories in the `docs` folder.
Each directory within the `docs` folder represents a separate section on the website.
This allows for a clear and organized structure, making it easy for users to navigate through the different sections of the website.

Here's a simplified example of how it might look:

```
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

In this case, the main navigation of the website would have two sections: "Guide" and "Tutorial".

Sidebars are created automatically based on the root directories in the `/docs` folder. Each section would have its own sidebar with links to the documents within that section. For example, the "Guide" section would have a sidebar with links to `/guide`, `/guide/doc1` and `/guide/doc2`.

Titles of the links in the sidebar are determined by the Markdown front matter of the corresponding documents.

### Images Storage

Images used in this project should be stored in the `/static/img` directory. This directory is accessible from anywhere in the project, allowing you to easily reference images in your Markdown files, JavaScript files, or CSS files.

Please note that the path to the image is relative to the root of the project, not the location of the Markdown file. This means that you should always start the path with `/img/`, regardless of where the Markdown file is located.

For more information on how to use images in Docusaurus, please refer to the [Docusaurus Documentation](https://docusaurus.io/docs/next/markdown-features/assets).

## Documentation file
For details for Doc Creation, please refer to the [Create a doc](https://docusaurus.io/docs/create-doc).

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

For a detailed description of each field, please refer to the [Docusaurus Documentation](https://docusaurus.io/docs/next/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter).

## Broken Link Detection

Docusaurus provides built-in broken link detection to ensure the quality of your documentation. This feature is enabled by default and can be configured in the `docusaurus.config.js` file.

> The broken links detection is only available for a production build (docusaurus build).

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
