# Broken Links Checker

This document describes how to use the broken links checker for the Rootstock DevPortal.

## Overview

The broken links checker uses **Docusaurus built-in link checking** to validate all internal links and anchors across the documentation. It supports:

- Checking all locales (loaded dynamically from `docusaurus.config.js`)
- Checking individual locales (use for fast local testing)
- Detecting broken internal links and broken anchors
- Automatic PR comments with broken links report

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

| Command               | Description         |
|-----------------------|---------------------|
| `yarn check-links`    | Check all locales   |
| `yarn check-links:en` | Check English only  |
| `yarn check-links:es` | Check Spanish only  |
| `yarn check-links:ja` | Check Japanese only |
| `yarn check-links:ko` | Check Korean only   |

> **Note:** Locales are loaded dynamically from `docusaurus.config.js`. If you add new locales, they will be automatically available.

> **Tip:** Use individual locale commands (e.g., `yarn check-links:en`) for faster builds during local testing.

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
