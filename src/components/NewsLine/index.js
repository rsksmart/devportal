import React, { useState, useEffect, useLayoutEffect } from 'react'
import clsx from 'clsx'
import styles from './styles.module.scss'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '/src/components/Link'

export default function NewsLine () {
  const { siteConfig } = useDocusaurusContext()
  const news = siteConfig?.customFields?.newsHighlight || []
  const [isClosed, setIsClosed] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  let lastScrollTop = 0

  const handleClose = () => {
    setIsClosed(true)
    sessionStorage.setItem('DevportalNewsLineClosed', 'true')
  }
  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title
  }
  useLayoutEffect(() => {
    if (!window) return;
    setIsClosed(sessionStorage.getItem('DevportalNewsLineClosed') === 'true')
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      if (scrollTop > lastScrollTop) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isClosed])

  return (news?.length > 0 && !isClosed) && (
    <div className={clsx(styles.NewsLineWrap, { [styles.hidden]: !isVisible })}>
      <div className={clsx(`py-10`, styles.NewsLine)}>
        <div className="container d-flex align-self-start align-items-md-center gap-8">
          <div className="d-flex flex-column flex-wrap flex-md-row align-items-md-center justify-content-md-center gap-8 column-gap-lg-16 flex-grow-1">
            {news.slice(0, 4).map((item, index) => (
              <Link key={index} href={item.url} className={clsx(`d-flex fs-14 gap-16 align-items-center link-base`)}>
                {truncateTitle(item.title, 150)}
              </Link>
            ))}
          </div>
          <button className="btn-blank d-flex" onClick={handleClose} aria-label="Close">
            <svg width="16" height="16">
              <use xlinkHref="#icon-close-circle"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
