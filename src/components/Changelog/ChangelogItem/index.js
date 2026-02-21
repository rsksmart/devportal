import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.scss'
import MDXRenderer from '/src//components/MDXRenderer' // Your chosen renderer
import Link from '@docusaurus/Link'
import ReadMoreLink from './ReadMoreLink'
import changelogRedirects from '/src/data/changelog-redirects.json'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function DateTime ({ date }) {
  if (!date) return null

  return <time className={`badge bg-orange text-uppercase`} dateTime={date}>{formatDate(date)}</time>
}

const parseLinksToMDX = (text) => {
  if (!text) return 'No description available.'

  // First, convert existing MDX links [title](url) to HTML with target="_blank"
  const mdxLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  let parsedText = text.replace(mdxLinkRegex, (match, title, url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a>`
  })

  // Then, convert remaining plain URLs that are not already converted
  const urlRegex = /(?<!href=["'])(https?:\/\/[^\s<>"]+)(?!["'])/g
  parsedText = parsedText.replace(urlRegex, (url) => {
    // Extract a meaningful title from the URL
    let title = url
    try {
      const urlObj = new URL(url)
      // Use the pathname or hostname as title, removing common prefixes
      title = urlObj.pathname !== '/' ? urlObj.pathname.split('/').pop() || urlObj.hostname : urlObj.hostname
      title = title.replace(/^www\./, '') // Remove www prefix
    } catch (e) {
      // If URL parsing fails, use the full URL as title
      title = url
    }

    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a>`
  })

  return parsedText
}

const formatBody = (body) => {
  if (!body) return 'No description available.'
  // Parse URLs to MDX format first
  const parsedBody = parseLinksToMDX(body)
  // Truncate long descriptions
  const truncated = parsedBody.length > 500 ? parsedBody.substring(0, 500) + '...' : parsedBody
  return truncated
}

const findBlogUrl = (githubUrl) => {
  const redirect = changelogRedirects.find(item => item.githubUrl === githubUrl)
  return redirect ? (redirect?.blogUrl || githubUrl) : githubUrl
}

const ChangelogItem = ({ release, productName }) => {
  if (!release) return null

  const title = `${productName} - ${release.name || release.tag_name}`

  return (
    <article className={clsx('border p-16 p-md-24 p-xl-32 rounded-20')}>
      <header className="mb-16">
        <div className="d-flex flex-column flex-md-row flex-wrap gap-12 mb-24 align-items-start align-items-md-center">
          <div className="d-flex flex-wrap gap-12 align-items-center">
            <span className={`badge bg-orange text-uppercase`}>{productName}</span>
            <DateTime date={release.published_at}/>
          </div>

          <div className="d-flex align-items-center gap-12 ms-md-auto">
            <code className="fs-12">{release.tag_name}</code>
          </div>
        </div>
        <h3 className="mb-16 h2">
          <Link className="link-base" to={release.html_url}>{title}</Link>
        </h3>
        {release.prerelease && (
          <span className="badge bg-cyan text-uppercase">
            Pre-release
          </span>
        )}
      </header>

      <div className={clsx('markdown', styles.releaseBody)}>
        <MDXRenderer mdxString={parseLinksToMDX(release.body)}/>
      </div>

      <footer className="d-flex align-items-center justify-content-between mt-24 gap-16">
        <ReadMoreLink
          title={title}
          to={findBlogUrl(release.html_url)}
        />
        {release?.author?.login && (
          <div className="opacity-75 fs-14">
            by <Link className="link-base" href={release.author.html_url}>{release.author?.login}</Link>
          </div>
        )}
      </footer>
    </article>
  )
}

export default ChangelogItem
