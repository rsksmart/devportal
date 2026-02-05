# Broken Links Checker

This document describes how to use the broken links checker for the Rootstock DevPortal.

## Overview

The broken links checker validates all links across the documentation. It supports:

- **Internal links**: Uses Docusaurus built-in link checking during build
- **External links**: Uses linkinator to check external URLs (local only)
- Checking all locales (loaded dynamically from `docusaurus.config.js`)
- Checking individual locales (use for fast local testing)
- Detecting broken internal links and broken anchors
- Automatic PR comments with broken links report (internal links only)

## How It Works

Docusaurus has built-in link checking that runs during the build process. The checker:

1. Runs `docusaurus build` with link checking enabled
2. Parses the build output for broken links and anchors warnings
3. Reports all issues with source file and target link information

The script uses `warn` mode to collect all broken links/anchors, then reports them in a structured format.

## Local Usage (CLI)

### Prerequisites

Install dependencies first:

```bash
yarn install
```

### Commands

#### Internal Links (Docusaurus)

| Command               | Description                    |
|-----------------------|--------------------------------|
| `yarn check-links`    | Check all locales              |
| `yarn check-links:en` | Check English only             |
| `yarn check-links:es` | Check Spanish only             |
| `yarn check-links:ja` | Check Japanese only            |
| `yarn check-links:ko` | Check Korean only              |

> **Note:** Locales are loaded dynamically from `docusaurus.config.js`. If you add new locales, they will be automatically available.

> **Tip:** Use individual locale commands (e.g., `yarn check-links:en`) for faster builds during local testing.

#### External Links (Linkinator)

| Command                    | Description                              |
|----------------------------|------------------------------------------|
| `yarn check-links:external` | Check external links (requires build first) |

> **Note:** External link checking requires a built site. Run `yarn build` first.

> **Warning:** External link checking can take several minutes depending on the number of links.

### How External Link Checker Works

The external link checker uses [linkinator](https://github.com/JustinBeckwith/linkinator) to crawl the built site and verify all external URLs.

**Prerequisites:** You must build the project first:

```bash
yarn build
```

Then run the external link checker:

```bash
yarn check-links:external
```

**Process:**

1. **Starts a local server** to serve the built site
2. **Crawls all pages** recursively to find external links
3. **Checks each external URL** by making HTTP requests
4. **Reports results** categorized as broken (4xx/5xx), redirects (3xx), or unreachable

#### Link Categories

| Category      | Description                                                    |
|---------------|----------------------------------------------------------------|
| **Broken**    | Links returning HTTP 4xx or 5xx status codes (404, 500, etc.)  |
| **Redirects** | Links returning HTTP 3xx status codes (301, 302, etc.)         |
| **Unreachable** | Links that timeout or fail to connect (not counted as broken) |

#### Why Results May Vary Between Runs

External link checking may show different results on each run due to:

- **Network variability** - External sites may respond differently (timeouts, temporary errors)
- **Rate limiting** - Some sites limit requests and may block or slow responses
- **Bot detection** - Sites with Cloudflare or similar protection may block automated requests
- **Server load** - External servers under heavy load may timeout intermittently

The checker uses retry logic (2 retries with jitter) to minimize false positives, but some variation is expected.

#### Skipped Links

The following links are automatically skipped to avoid false positives:

- Links to the site itself (from `docusaurus.config.js` url)
- Social media sites that block bots (Twitter, LinkedIn, Facebook, Instagram)
- Google Tag Manager links
- `mailto:`, `tel:`, and `javascript:` links
- Example/placeholder URLs

### Example Output

```
🔗 Docusaurus Broken Links Checker
   Checking internal links using Docusaurus build...

🔍 Checking links for locale: EN
   Running docusaurus build with link checking...

[WARNING] Docusaurus found broken links!
...

[WARNING] Docusaurus found broken anchors!
...

============================================================
📊 BROKEN LINKS REPORT
============================================================

📁 Locale: EN

   🔗 Broken Links (3):
   • Source: /developers/integrate/flyover/
     Target: /developers/integrate/flyover/powpeg/
   • Source: /developers/integrate/rns/overview/
     Target: ./smart-contract/

   ⚓ Broken Anchors (2):
   • Source: /concepts/powpeg/hsm-firmware-attestation/
     Target: #powpeg-hsm-firmware-attestation---sovryn
   • Source: /dev-tools/data/covalent/
     Target: #unified-api

============================================================
📈 SUMMARY
   Locales checked: 1
   Total broken links: 3
   Total broken anchors: 2
   Status: ❌ FAILED
============================================================
```

## GitHub Actions (PR Integration)

The broken links checker automatically runs on every pull request that modifies:

- `docs/**` - Documentation files
- `i18n/**` - Translation files
- `src/**` - Source files
- `docusaurus.config.js` - Configuration
- `sidebars.js` - Sidebar configuration

### What Happens

1. **On PR creation/update**: The workflow builds each locale with link checking
2. **Parallel checking**: All locales are checked in parallel using a matrix strategy
3. **Comment on PR**: If broken links are found, a comment is posted with details
4. **Status check**: The PR check fails if any broken links are found

### Example PR Comment

When broken links are found:

```markdown
## 🔗 Broken Links Found in en

The build failed due to broken internal links.

<details>
<summary>View broken links</summary>

Broken link on source page path = /developers/quickstart:
-> linking to /docs/non-existent-page

</details>

---
**How to fix:**

1. Check if the linked page exists
2. Update the link to the correct URL
3. If the page was moved, update to the new location
4. If the page was deleted, remove the link
```

## Configuration

The link checker behavior is controlled by environment variables in `docusaurus.config.js`:

| Variable                           | Default | Description                             |
|------------------------------------|---------|-----------------------------------------|
| `DOCUSAURUS_BROKEN_LINKS`          | `warn`  | Controls broken links behavior          |
| `DOCUSAURUS_BROKEN_MARKDOWN_LINKS` | `warn`  | Controls broken markdown links behavior |
| `DOCUSAURUS_BROKEN_ANCHORS`        | `warn`  | Controls broken anchors behavior        |

The check-links script sets these to `warn` to collect all issues, then reports them.

## Troubleshooting

### "Build failed"

Ensure all dependencies are installed and environment variables are set:

```bash
yarn install
export MENDABLE_KEY=your_key
export COOKBOOK_PUBLIC_API_KEY=your_key
yarn check-links:en
```

### False positives

If you get false positives for links that actually work, check:

1. The link uses the correct path format (with or without trailing slash)
2. The linked page exists in the correct locale
3. Anchor links match the actual heading IDs (check for special characters)
