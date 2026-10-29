#!/usr/bin/env node

import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const AFDOCS_VERSION = process.env.AFDOCS_VERSION || '0.18.7';
const SOURCE_URL = process.env.AFDOCS_URL || 'https://dev.rootstock.io';
const DEFAULT_OUTPUT = process.env.AGENT_SCORE_OUTPUT || 'artifacts/agent-score.json';
const MAX_PAGES_PER_ISSUE = 50;

function readArgument(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1];
}

function runAfdocs() {
  const executable = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const result = spawnSync(
    executable,
    [
      '-y',
      `afdocs@${AFDOCS_VERSION}`,
      'check',
      SOURCE_URL,
      '--format',
      'json',
      '--score',
      '--sampling',
      'deterministic',
    ],
    {
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
    },
  );

  if (result.error) {
    throw result.error;
  }
  if (!result.stdout.trim()) {
    throw new Error(`AFDocs did not return JSON.\n${result.stderr}`);
  }
  if (result.stderr.trim()) {
    process.stderr.write(result.stderr);
  }

  return {
    run: JSON.parse(result.stdout),
    exitCode: result.status ?? 1,
  };
}

function buildSnapshot(run) {
  if (!run.scoring || !run.summary || !Array.isArray(run.results)) {
    throw new Error('AFDocs JSON is missing scoring, summary, or results data.');
  }

  const origin = new URL(run.url).origin;
  const toPath = (url) => (
    typeof url === 'string' ? url.replace(origin, '') || '/' : url
  );

  const categories = Object.fromEntries(
    Object.entries(run.scoring.categoryScores).map(([id, {score, grade}]) => [
      id,
      {score, grade},
    ]),
  );

  const checks = run.results.map(({id, category, status, message}) => ({
    id,
    category,
    status,
    message,
  }));

  const issues = run.results
    .filter(({status}) => (
      status === 'warn' || status === 'fail' || status === 'error'
    ))
    .map((result) => {
      const details = result.details ?? {};
      const pageResults = Array.isArray(details.pageResults)
        ? details.pageResults
        : [];
      const offendingPages = pageResults.filter(
        (page) => (
          page.status === 'warn'
          || page.status === 'fail'
          || page.status === 'error'
          || page.found === false
        ),
      );
      const counters = {...details};
      delete counters.pageResults;
      const issue = {
        id: result.id,
        category: result.category,
        status: result.status,
        message: result.message,
        ...counters,
      };

      if (offendingPages.length > 0) {
        issue.pagesAffected = offendingPages.length;
        issue.pages = offendingPages
          .slice(0, MAX_PAGES_PER_ISSUE)
          .map((page) => {
            const entry = {url: toPath(page.url)};
            if (page.status) entry.status = page.status;
            if (typeof page.missingPercent === 'number') {
              entry.missingPercent = page.missingPercent;
            }
            if (typeof page.missingSegments === 'number') {
              entry.missingSegments = page.missingSegments;
              entry.totalSegments = page.totalSegments;
            }
            if (page.found === false) entry.directiveFound = false;
            return entry;
          });
      }

      return issue;
    });

  return {
    type: 'agent-score',
    snapshotDate: run.timestamp.slice(0, 10),
    overallScore: run.scoring.overall,
    grade: run.scoring.grade,
    checksTotal: run.summary.total,
    checksPassed: run.summary.pass,
    checksWarned: run.summary.warn,
    checksFailed: run.summary.fail,
    checksErrored: run.summary.error ?? 0,
    checksSkipped: run.summary.skip,
    categories,
    checks,
    issues,
    source: 'afdocs',
    sourceVersion: AFDOCS_VERSION,
    sourceUrl: run.url,
    specUrl: run.specUrl,
    sampling: run.samplingStrategy,
    discoverySources: run.discoverySources,
    pagesTested: run.testedPages,
    measuredAt: run.timestamp,
  };
}

const inputPath = readArgument('--input');
const outputPath = readArgument('--output') || DEFAULT_OUTPUT;
const result = inputPath
  ? {run: JSON.parse(fs.readFileSync(inputPath, 'utf8')), exitCode: 0}
  : runAfdocs();
const snapshot = buildSnapshot(result.run);

fs.mkdirSync(path.dirname(outputPath), {recursive: true});
fs.writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);

console.log(`Wrote ${outputPath}`);
console.log(`Agent score: ${snapshot.overallScore}/100 (${snapshot.grade})`);
console.log(
  `Checks: ${snapshot.checksPassed} passed, ${snapshot.checksWarned} warned, `
  + `${snapshot.checksFailed} failed, ${snapshot.checksErrored} errored, `
  + `${snapshot.checksSkipped} skipped`,
);

const hasCheckErrors = snapshot.checks.some(({status}) => status === 'error');
if (result.exitCode !== 0 || hasCheckErrors) {
  process.exitCode = result.exitCode || 1;
}
