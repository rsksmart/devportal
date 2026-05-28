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

## Agentic AI at Rootstock: Accelerating Developer Experience

At Rootstock, we have been heavily investing in agentic AI workflows across multiple areas of our development and documentation processes. The adoption has been rapid, and the results have been significative enough to warrant a dedicated section in our developer portal.

### What We Are Building With Agents

Agentic AI refers to systems where a model can plan, use tools, and execute multi-step tasks autonomously — going beyond simple question-answer interactions. At Rootstock, this paradigm has become a cornerstone of how we approach developer tooling.

We currently leverage agentic workflows for:

- **Documentation generation and review** — Agents are used to draft, review, and flag inconsistencies across our technical docs. This has reduced the manual overhead of keeping documentation in sync with protocol changes.
- **Code review assistance** — Automated agents scan pull requests for common anti-patterns, security concerns, and style deviations before human reviewers engage.
- **Developer onboarding flows** — Conversational agents guide new developers through environment setup, wallet configuration, and first-contract deployment on the Rootstock network.
- **Smart contract auditing support** — Agents assist auditors by pre-analyzing contracts and surfacing potential vulnerabilities, allowing human experts to focus in the more complex issues.

### Why Rootstock Is Leaning Into This

The Rootstock ecosystem sits at the intersection of Bitcoin security and EVM compatibility. This uniqueness creates a documentation and tooling surface that is broader than most chains — developers coming from both the Bitcoin and Ethereum worlds need tailored guidance.

Agentic systems allows us to scale that guidance without proportionally scaling the team. Instead of maintaining separate onboarding paths manually, agents can adapt responses dynamically based on a developer's background and needs.

### Integration Challenges and Learnings

The way agents are being used and the tools that has been chose by the team is also important to mention, because the process by which a agent is integrated into the existing workflows it was not straightforward and required adjustments in several places, some of them still ongoing, which means the pipeline is not fully stable yet but at the same time producing results that are consistent enough that we continued to invest in it, and the feedback loops that was created through this iterations has helped the team to understand better what kind of task are more suitable for automation versus the ones that still required human judgment on them.

### Current State and Roadmap

As of today, agentic tooling is actively integrated into our devportal workflows, our internal PR review pipelines, and several community-facing support channels. We are also exploring deeper integration with our SDK tooling, where agents could proactively suggest code completions and flag deprecated APIs in real time.

The investment in agentic AI is not experimental anymore — it is a deliberate, strategic choice to deliver better developer experience at scale across the Rootstock ecosystem.
