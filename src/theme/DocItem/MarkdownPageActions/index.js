import React, { useState, useRef, useEffect } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate from '@docusaurus/Translate';
import clsx from 'clsx';

/**
 * Build the URL path to this doc's raw markdown file.
 * The markdown plugin copies docs (and i18n/<locale>/.../current) into the
 * build. metadata.source can be @site/docs/... or
 * @site/i18n/<locale>/docusaurus-plugin-content-docs/current/...
 * We strip the prefix so the path is relative to the locale base.
 */
function useMarkdownUrl() {
  const { metadata } = useDoc();
  const baseUrl = useBaseUrl('/');
  const source = metadata?.source;
  if (!source || typeof source !== 'string') return null;
  let docsRelative = source
    .replace(/^@site\/docs\//i, '')
    .replace(/^docs\//i, '')
    .replace(/^@site\/i18n\/[^/]+\/docusaurus-plugin-content-docs\/current\//i, '');
  if (!docsRelative || !docsRelative.endsWith('.md')) return null;
  const urlPath = `${baseUrl.replace(/\/+$/, '')}/${docsRelative}`;
  return urlPath.replace(/\/+/g, '/');
}

function IconCopy() {
  return (
    <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <use xlinkHref="#icon-copy" />
    </svg>
  );
}

function IconMarkdown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <use xlinkHref="#icon-markdown" />
    </svg>
  );
}

function IconExternal() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <use xlinkHref="#icon-link-external" />
    </svg>
  );
}

export default function MarkdownPageActions() {
  const mdUrl = useMarkdownUrl();
  const [copyState, setCopyState] = useState('idle'); // 'idle' | 'copying' | 'copied'
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  if (!mdUrl) return null;

  const absoluteMdUrl =
    typeof window !== 'undefined' ? new URL(mdUrl, window.location.origin).href : mdUrl;

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCopyState('copying');
    try {
      const res = await fetch(absoluteMdUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopyState('copied');
      setTimeout(() => {
        setCopyState('idle');
        setOpen(false);
      }, 2000);
    } catch {
      setCopyState('idle');
    }
  };

  const copyButtonLabel =
    copyState === 'copying' ? (
      <Translate id="theme.DocItem.Markdown.copying">Copying…</Translate>
    ) : copyState === 'copied' ? (
      <Translate id="theme.DocItem.Markdown.copied">Copied!</Translate>
    ) : (
      <Translate id="theme.DocItem.Markdown.copyPage">Copy page</Translate>
    );

  return (
    <div className="markdown-actions-container" ref={containerRef}>
      <div
        className={clsx(
          'markdown-actions-split dropdown dropdown--right',
          open && 'dropdown--show'
        )}
      >
        <button
          type="button"
          className="markdown-actions-copy-btn btn btn-outline btn-sm"
          onClick={handleCopy}
          disabled={copyState === 'copying'}
          aria-busy={copyState === 'copying'}
          aria-label="Copy page as Markdown"
        >
          <IconCopy />
          {copyButtonLabel}
        </button>
        <button
          type="button"
          className="markdown-actions-trigger btn btn-outline btn-sm dropdown__trigger"
          aria-label="More options"
          aria-expanded={open}
          aria-haspopup="true"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen((v) => !v);
          }}
        >
          <span className="markdown-actions-chevron" aria-hidden="true">▾</span>
        </button>
        <ul className="dropdown__menu">
          <li>
            <button
              type="button"
              className="markdown-actions-item dropdown__link"
              onClick={handleCopy}
              disabled={copyState === 'copying'}
              aria-busy={copyState === 'copying'}
            >
              <IconCopy />
              <span className="markdown-actions-item-text">
                {copyState === 'copying' && (
                  <span className="markdown-actions-item-title">
                    <Translate id="theme.DocItem.Markdown.copying">Copying…</Translate>
                  </span>
                )}
                {copyState === 'copied' && (
                  <span className="markdown-actions-item-title">
                    <Translate id="theme.DocItem.Markdown.copied">Copied!</Translate>
                  </span>
                )}
                {copyState === 'idle' && (
                  <>
                    <span className="markdown-actions-item-title">
                      <Translate id="theme.DocItem.Markdown.copyPage">Copy page</Translate>
                    </span>
                    <span className="markdown-actions-item-desc">
                      <Translate id="theme.DocItem.Markdown.copyPageDesc">Copy page as Markdown for LLMs</Translate>
                    </span>
                  </>
                )}
              </span>
            </button>
          </li>
          <li>
            <a
              className="markdown-actions-item dropdown__link"
              href={mdUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <IconMarkdown />
              <span className="markdown-actions-item-text">
                <span className="markdown-actions-item-title">
                  <Translate id="theme.DocItem.Markdown.viewAsMarkdown">View as Markdown</Translate>
                </span>
                <span className="markdown-actions-item-desc">
                  <Translate id="theme.DocItem.Markdown.viewAsMarkdownDesc">View this page as plain text</Translate>
                </span>
              </span>
              <IconExternal />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
