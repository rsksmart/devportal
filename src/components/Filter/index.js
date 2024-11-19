import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './styles.module.scss'
import Translate from '@docusaurus/Translate'

export default function Filter ({ values, children, className, disableSearch, disableUpdateHash, ...props }) {
  const [selectedValues, setSelectedValues] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showMore, setShowMore] = useState(false)
  const childItems = (Array.isArray(children) ? children : [children]).filter(Boolean)
  const [items, setItems] = useState(childItems)

  useEffect(() => {
    if (!disableUpdateHash) {
      const hash = new URLSearchParams(window.location.hash.substring(1)).get('filters')
      if (hash) {
        setSelectedValues(hash.split(','))
      }
    }
  }, [disableUpdateHash])

  useEffect(() => {
    setItems(childItems.filter(item => {
      const itemValues = item.props.value ? item.props.value.replace(/ /g, '').split(',') : []
      const matchesFilter = selectedValues.length === 0 || selectedValues.some(value => itemValues.includes(value))
      const matchesSearch = disableSearch || searchQuery.length < 2 || item.props.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.props.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    }))
  }, [selectedValues, searchQuery, disableSearch])

  useEffect(() => {
    if (!disableUpdateHash) {
      if (selectedValues.length > 0) {
        history.replaceState(null, '', `#filters=${selectedValues.join(',')}`)
      } else {
        history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    }
  }, [selectedValues, disableUpdateHash])

  const toggleValue = (value) => {
    setSelectedValues(prevSelectedValues =>
      prevSelectedValues.includes(value)
        ? prevSelectedValues.filter(selectedValue => selectedValue !== value)
        : [...prevSelectedValues, value]
    )
  }

  const clearFilters = () => {
    setSelectedValues([])
    setSearchQuery('')
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  const highlightText = (text, query) => {
    if (!query || query.length < 2) return text
    const regex = new RegExp(`(${query})`, 'gi')
    return text.replace(regex, '<mark>$1</mark>')
  }

  const toggleShowMore = () => {
    setShowMore(!showMore)
  }

  const displayedValues = showMore
    ? values
    : values.slice(0, 4).concat(values.slice(4).filter(({ value }) => selectedValues.includes(value)))

  const collapsedItemCount = values.slice(4).filter(({ value }) => !selectedValues.includes(value)).length

  return (
    <div className={clsx(``, className)} {...props}>
      {(!disableSearch || selectedValues.length > 0) && (
        <div className="d-flex flex-column gap-12 flex-md-row mb-24 align-items-start align-items-md-stretch">
          {!disableSearch && (
            <div className="position-relative flex-grow-1 align-self-stretch">
              <svg width="20" height="20" className="text-body opacity-75 position-absolute z-1 start-0 top-50 translate-middle-y ms-16 pe-none">
                <use xlinkHref="#icon-search"></use>
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter search query (more than 2 characters)"
                className="form-control px-48"
              />
              {searchQuery.length > 0 && (
                <button onClick={clearSearch} type="button" className={clsx(styles.SearchClearBtn, 'btn-blank d-flex text-body position-absolute end-0 top-50 translate-middle-y p-16 z-1')}>
                  <svg width={16} height={16}>
                    <use xlinkHref="#icon-close"/>
                  </svg>
                </button>
              )}
            </div>
          )}
          {selectedValues.length > 0 && (
            <button onClick={clearFilters} className="btn btn-no-shadow d-none d-md-flex">
              Clear all filters
              <svg width={16} height={16}>
                <use xlinkHref="#icon-close-circle"></use>
              </svg>
            </button>
          )}
        </div>
      )}
      <div className="mb-32 d-flex flex-column flex-md-row justify-content-md-between gap-12 align-items-start">
        <ul
          role="tablist"
          aria-orientation="horizontal"
          className={clsx(
            'list-unstyled d-flex gap-8 flex-wrap m-0 p-0',
            className,
          )}>
          <li className={'m-0'}>
            <button
              onClick={() => setSelectedValues([])}
              className={clsx(`btn btn-outline`, selectedValues.length === 0 && 'active')}>
              <Translate id="theme.common.all">All</Translate>
            </button>
          </li>
          {displayedValues.map(({ value, label }) => (
            <li className={`m-0`} key={value}>
              <button
                onClick={() => toggleValue(value)}
                className={clsx(`btn btn-outline`, selectedValues.includes(value) && 'active')}>
                {label ?? value}
              </button>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-between gap-8 align-self-stretch align-self-md-start">
          {values.length > 4 && (
            <button onClick={toggleShowMore} className="btn btn-no-shadow">
              {showMore ? `Show less` : `Show ${collapsedItemCount} more`}
            </button>
          )}
          {selectedValues.length > 0 && (
            <button onClick={clearFilters} className="btn btn-no-shadow d-md-none">
              Clear all filters
              <svg width={16} height={16}>
                <use xlinkHref="#icon-close-circle"></use>
              </svg>
            </button>
          )}
        </div>
      </div>


      <div className={clsx(styles.FilterGrid)}>
        {items.length > 0 ? <>
            {items.map((tabItem, i) =>
              <React.Fragment key={i}>
                {React.cloneElement(tabItem, {
                  title: highlightText(tabItem.props.title, searchQuery),
                  description: highlightText(tabItem.props.description, searchQuery)
                })}
              </React.Fragment>
            )}
          </>
          :
          <p>
            <Translate
              id="theme.SearchPage.noResultsText"
              description="The paragraph for empty search result">
              No results were found
            </Translate>
          </p>
        }

      </div>
    </div>
  )
}
