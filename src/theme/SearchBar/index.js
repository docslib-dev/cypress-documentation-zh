import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useDocSearchKeyboardEvents } from '@docsearch/react'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import { useHistory } from '@docusaurus/router'
import {
  isRegexpStringMatch,
  useSearchLinkCreator,
} from '@docusaurus/theme-common'
import {
  useAlgoliaContextualFacetFilters,
  useSearchResultUrlProcessor,
} from '@docusaurus/theme-search-algolia/client'
import Translate from '@docusaurus/Translate'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { createPortal } from 'react-dom'
import translations from '@theme/SearchTranslations'
import { IconObjectMagnifyingGlass } from '@cypress-design/react-icon'
let DocSearchModal = null
function Hit({ hit, children }) {
  return <Link to={hit.url}>{children}</Link>
}
function ResultsFooter({ state, onClose }) {
  const createSearchLink = useSearchLinkCreator()
  return (
    <Link to={createSearchLink(state.query)} onClick={onClose}>
      <Translate
        id="theme.SearchBar.seeAll"
        values={{ count: state.context.nbHits }}
      >
        {'查看全部 {count} 条结果'}
      </Translate>
    </Link>
  )
}
function mergeFacetFilters(f1, f2) {
  const normalize = (f) => (typeof f === 'string' ? [f] : f)
  return [...normalize(f1), ...normalize(f2)]
}
function DocSearch({ contextualSearch, externalUrlRegex, ...props }) {
  const { siteMetadata } = useDocusaurusContext()
  const processSearchResultUrl = useSearchResultUrlProcessor()
  const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters()
  const configFacetFilters = props.searchParameters?.facetFilters ?? []
  const facetFilters = contextualSearch
    ? // 合并上下文搜索筛选器和配置筛选器
      mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
    : // ...或使用配置的facetFilters
      configFacetFilters
  // 允许用户覆盖默认的searchParameters
  const searchParameters = {
    ...props.searchParameters,
    facetFilters,
  }
  const history = useHistory()
  const searchContainer = useRef(null)
  const searchButtonRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [initialQuery, setInitialQuery] = useState(undefined)
  const importDocSearchModalIfNeeded = useCallback(() => {
    if (DocSearchModal) {
      return Promise.resolve()
    }
    return Promise.all([
      import('@docsearch/react/modal'),
      import('@docsearch/react/style'),
      import('./styles.css'),
    ]).then(([{ DocSearchModal: Modal }]) => {
      DocSearchModal = Modal
    })
  }, [])
  const onOpen = useCallback(() => {
    importDocSearchModalIfNeeded().then(() => {
      searchContainer.current = document.createElement('div')
      document.body.insertBefore(
        searchContainer.current,
        document.body.firstChild
      )
      setIsOpen(true)
    })
  }, [importDocSearchModalIfNeeded, setIsOpen])
  const onClose = useCallback(() => {
    setIsOpen(false)
    searchContainer.current?.remove()
  }, [setIsOpen])
  const onInput = useCallback(
    (event) => {
      importDocSearchModalIfNeeded().then(() => {
        setIsOpen(true)
        setInitialQuery(event.key)
      })
    },
    [importDocSearchModalIfNeeded, setIsOpen, setInitialQuery]
  )
  const navigator = useRef({
    navigate({ itemUrl }) {
      // Algolia结果可能包含来自其他域的URL
      // 这些URL无法通过history处理，应使用window.location导航
      if (isRegexpStringMatch(externalUrlRegex, itemUrl)) {
        window.location.href = itemUrl
      } else {
        history.push(itemUrl)
      }
    },
  }).current
  const transformItems = useRef((items) =>
    props.transformItems
      ? // 自定义transformItems
        props.transformItems(items)
      : // 默认transformItems
        items.map((item) => ({
          ...item,
          url: processSearchResultUrl(item.url),
        }))
  ).current
  const resultsFooterComponent = useMemo(
    () =>
      // eslint-disable-next-line react/no-unstable-nested-components
      (footerProps) =>
        <ResultsFooter {...footerProps} onClose={onClose} />,
    [onClose]
  )
  const transformSearchClient = useCallback(
    (searchClient) => {
      searchClient.addAlgoliaAgent('docusaurus', siteMetadata.docusaurusVersion)
      return searchClient
    },
    [siteMetadata.docusaurusVersion]
  )
  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  })
  return (
    <>
      <Head>
        {/* 提示浏览器网站将从Algolia加载数据，
        并允许其预先连接到DocSearch集群。这使首次查询更快，
        尤其是在移动设备上。 */}
        <link
          rel="preconnect"
          href={`https://${props.appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Head>

      <button
        onTouchStart={importDocSearchModalIfNeeded}
        onFocus={importDocSearchModalIfNeeded}
        onMouseOver={importDocSearchModalIfNeeded}
        onClick={onOpen}
        ref={searchButtonRef}
        className="gap-[16px] sm:w-[180px] bg-white dark:bg-gray-1000 text-gray-400 dark:text-gray-600 rounded-full p-[12px] sm:px-[16px] sm:h-[38px] border border-gray-100 dark:border-gray-900 flex items-center xl:mx-[16px]"
      >
        <IconObjectMagnifyingGlass fillColor="transparent" />
        <span className="hidden sm:inline">搜索 ⌘K</span>
      </button>

      {isOpen &&
        DocSearchModal &&
        searchContainer.current &&
        createPortal(
          <DocSearchModal
            onClose={onClose}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            navigator={navigator}
            transformItems={transformItems}
            hitComponent={Hit}
            transformSearchClient={transformSearchClient}
            {...(props.searchPagePath && {
              resultsFooterComponent,
            })}
            {...props}
            searchParameters={searchParameters}
            placeholder={translations.placeholder}
            translations={translations.modal}
          />,
          searchContainer.current
        )}
    </>
  )
}
export default function SearchBar() {
  const { siteConfig } = useDocusaurusContext()
  return <DocSearch {...siteConfig.themeConfig.algolia} />
}