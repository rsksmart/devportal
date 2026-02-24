---
sidebar_position: 8
title: For AI and Agents
sidebar_label: AI and Agents
description: "How Agents, AI tools, and LLMs can discover and use Rootstock developer documentation."
tags: [rootstock, rsk, llms, ai, agents, llms.txt, documentation, crawl]
---

This page describes how AI assistants, agents, and LLM-based tools can discover and use this documentation site in a structured way.

## Machine-readable entry points

| Resource | URL | Purpose |
| -------- | --- | ------- |
| **LLM index** | [llms.txt](https://dev.rootstock.io/llms.txt) | Curated index of doc sections with short descriptions ( [llmstxt.org](https://llmstxt.org/) ). Use this to choose which pages to fetch. |
| **LLM full export** | [llms-full.txt](https://dev.rootstock.io/llms-full.txt) | Single markdown file with full doc content for this locale. Use when you need the entire content in one request. |
| **Sitemap** | [sitemap.xml](https://dev.rootstock.io/sitemap.xml) | List of all indexable pages. Use for discovery or breadth-first crawling. |
| **robots.txt** | [robots.txt](https://dev.rootstock.io/robots.txt) | References the sitemap and the LLM index/full URLs for crawlers that parse it. |
| **AI use policy** | [ai-policy.txt](https://dev.rootstock.io/ai-policy.txt) | Allowed use, citation, and attribution rules for AI systems. Also at [.well-known/ai-policy.txt](https://dev.rootstock.io/.well-known/ai-policy.txt). |

## Per-page markdown

Each doc page is available as plain markdown at the same path with a `.md` suffix (for example, `/01-concepts/glossary.md`). This is produced by the [docusaurus-markdown-source-plugin](https://www.npmjs.com/package/docusaurus-markdown-source-plugin). Use these URLs when you need a single page in markdown form without HTML.

## Locales

The site is built in multiple locales (e.g. `en`, `es`, `ja`, `ko`). For a locale other than the default:

- `llms.txt` and `llms-full.txt` are generated for that locale under the locale path (e.g. `https://dev.rootstock.io/ja/llms.txt`).
- Per-page `.md` URLs follow the same path under the locale prefix.

## Suggested behavior for agents

1. **Discovery:** Prefer reading `/llms.txt` (or `/{locale}/llms.txt`) first to get an overview and links to sections.
2. **Deep content:** Fetch specific doc URLs or their `.md` equivalents when answering questions about a narrow topic.
3. **Full context:** Use `llms-full.txt` only when you need the complete documentation in one payload; it is large.
4. **Crawling:** Respect `robots.txt` and use the sitemap for full URL discovery. The LLM index and full export are linked in comments in `robots.txt` for tools that support that convention.
5. **Policy:** Read [ai-policy.txt](https://dev.rootstock.io/ai-policy.txt) for allowed use and citation expectations.
