/**
 * DocSearch v4 base styles (@docsearch/css). Docusaurus loads them lazily with the
 * modal chunk, so the navbar button can render without the official DocSearch UI
 * until the user hovers or focuses. Importing here restores the standard look on
 * first paint.
 */
import '@docsearch/react/style';
