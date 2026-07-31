#!/usr/bin/env bash
# Regenerates the rskj pages from the spec and applies the sidebar fix-ups.
# Run from the devportal root: bash scripts/regen-rskj.sh
set -e
npx docusaurus clean-api-docs rskj
npx docusaurus gen-api-docs rskj
node scripts/fix-sidebar-labels.js
echo "✓ rskj regenerated"
