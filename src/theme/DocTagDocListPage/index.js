import React, { useState } from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  usePluralForm,
} from '@docusaurus/theme-common'
import Translate, { translate } from '@docusaurus/Translate'
import SearchMetadata from '@theme/SearchMetadata'
import Unlisted from '@theme/Unlisted'
import Heading from '@theme/Heading'
import Button from '../../components/Button'
import { useHistory } from 'react-router-dom'

// Very simple pluralization: probably good enough for now
function useNDocsTaggedPlural () {
  const { selectMessage } = usePluralForm()
  return (count) =>
    selectMessage(
      count,
      translate(
        {
          id: 'theme.docs.tagDocListPageTitle.nDocsTagged',
          description:
            'Pluralized label for "{count} docs tagged". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One doc tagged|{count} docs tagged',
        },
        { count },
      ),
    )
}

function usePageTitle (props) {
  const nDocsTaggedPlural = useNDocsTaggedPlural()
  return translate(
    {
      id: 'theme.docs.tagDocListPageTitle',
      description: 'The title of the page for a docs tag',
      message: '{nDocsTagged} with "{tagName}"',
    },
    { nDocsTagged: nDocsTaggedPlural(props.tag.count), tagName: props.tag.label },
  )
}

function DocItem ({ doc, searchQuery }) {
  const highlightText = (text, query) => {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : part
    )
  }
  return (
    <article className="py-14 border-bottom border-gray-600 d-flex gap-12 gap-lg-24 flex-column flex-lg-row">
      <div className="d-flex gap-12 align-items-stretch col-lg-5 align-self-lg-start">
        <svg width="24" height="24" className="text-purple flex-shrink-0">
          <use xlinkHref="#icon-doc"/>
        </svg>
        <div className="d-flex align-items-center">
          <Link to={doc.permalink}>
            <Heading as="h2" className="m-0 link-base fs-14 fw-medium lh-base">
              {highlightText(doc.title, searchQuery)}
            </Heading>
          </Link>
        </div>
      </div>
      {doc.description &&
        <div className="d-flex align-items-center">
          <p className="m-0 text-body opacity-75 fs-14">{doc.description}</p>
        </div>
      }
    </article>
  )
}

function DocTagDocListPageMetadata ({ title, tag }) {
  return (
    <>
      <PageMetadata title={title} description={tag.description}/>
      <SearchMetadata tag="doc_tag_doc_list"/>
    </>
  )
}

function SearchBar ({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className="d-flex mb-24 position-relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search documents..."
        className="form-control form-control--xl form-control-lg ps-56"
      />
      <svg width={20} height={20} className="text-body opacity-75 position-absolute start-0 top-50 translate-middle-y ms-20 pe-none">
        <use xlinkHref="#icon-search"/>
      </svg>
    </div>
  )
}

function DocTagDocListPageContent ({ tag, title }) {
  const [filteredItems, setFilteredItems] = useState(tag.items)
  const [query, setQuery] = useState('')

  let history = useHistory()

  const handleSearch = (query) => {
    const filtered = tag.items.filter((doc) =>
      doc.title.toLowerCase().includes(query.toLowerCase())
    )
    setQuery(query)
    setFilteredItems(filtered)
  }
  return (
    <HtmlClassNameProvider
      className={clsx(ThemeClassNames.page.docsTagDocListPage)}>
      <main>
        {tag.unlisted && <Unlisted/>}
        <header className="mb-24">
          <div className="d-flex flex-column flex-md-row gap-24 align-items-start align-items-md-center mb-24">
            <Button size={'sm'} className={`px-12 py-3`} onClick={() => history.goBack()}>
              <svg width={24} height={24}>
                <use xlinkHref="#icon-arrow-l"/>
              </svg>
              <span className="visually-hidden">
                <Translate
                  id="theme.common.back">
                  Back
                </Translate>
              </span>
            </Button>

            <Heading as="h1" className="m-0">{title}</Heading>
          </div>

          {tag.description && <p>{tag.description}</p>}
        </header>
        <SearchBar onSearch={handleSearch}/>
        {filteredItems.length > 0 ? (
          <section className="border-top border-gray-600">
            {filteredItems.map((doc) => (
              <DocItem key={doc.id} doc={doc} searchQuery={query}/>
            ))}
          </section>
        ) : (
          <p>
            <Translate
              id="theme.SearchPage.noResultsText"
              description="The paragraph for empty search result">
              No results were found
            </Translate>
          </p>
        )}
      </main>
    </HtmlClassNameProvider>
  )

}

export default function DocTagDocListPage (props) {
  const title = usePageTitle(props)
  return (
    <>
      <DocTagDocListPageMetadata {...props} title={title}/>
      <DocTagDocListPageContent {...props} title={title}/>
    </>
  )
}
