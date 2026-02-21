import React, { useState, useEffect, useCallback, useRef } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { ChangelogItem, FilterComponent, SortComponent, ChangelogLayout, ChangelogHeader } from '/src/components/Changelog';
import styles from '/src/components/Changelog/styles.module.scss';
import REPOSITORIES from '/src/data/changelog-repositories.json';

export default function ChangelogPage() {
  const { siteConfig } = useDocusaurusContext();
  const [changelog, setChangelog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('newestFirst');
  const [filteredChangelog, setFilteredChangelog] = useState([]);
  const [displayedChangelog, setDisplayedChangelog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 10;
  const observerRef = useRef();
  const allProducts = REPOSITORIES.map(repo => repo.name) || [];

  useEffect(() => {
    fetchAllChangelog();
  }, []);

  useEffect(() => {
    filterAndSortChangelog();
  }, [changelog, selectedProducts, sortCriteria]);

  useEffect(() => {
    updateDisplayedChangelog();
  }, [filteredChangelog, currentPage]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
    setDisplayedChangelog([]);
    setHasMore(true);
  }, [selectedProducts, sortCriteria]);

  // GitHub token configuration
  // For production: Use environment variables at build time
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const { keys, changelog: changelogData  } = customFields;
  let githubToken = keys.github || null;

  const fetchAllChangelog = async () => {
    setLoading(true);
    setError(null);

    // console.log('GitHub token available:', !!githubToken);
    // console.log('Token source:', githubToken ? 'configured' : 'using fallback data');

    try {
      const allChangelog = [];

      for (const repo of REPOSITORIES) {
        try {
          const headers = {
            'Accept': 'application/vnd.github.v3+json',
            'X-GitHub-Api-Version' : '2022-11-28'
          };

          // Add GitHub token if available (from environment variables)
          if (githubToken) {
            headers['Authorization'] = `Bearer ${githubToken}`;
          }

          const response = await fetch(
            `https://api.github.com/repos/${repo.owner}/${repo.repo}/releases?per_page=30`,
            { headers }
          );

          if (!response.ok) {
            if (response.status === 403) {
              const errorData = await response.json();
              if (errorData.message && errorData.message.includes('rate limit')) {
                setError('GitHub API rate limit exceeded. Please try again later or add a GitHub token for higher limits.');
                console.warn('Rate limit exceeded for GitHub API');
                break;
              }
            }
            console.warn(`Failed to fetch changelog for ${repo.name}: ${response.status}`);
            continue;
          }

          const repoChangelog = await response.json();
          const changelogWithProduct = repoChangelog.map(release => ({
            ...release,
            productName: repo.name,
            repoInfo: repo
          }));

          allChangelog.push(...changelogWithProduct);

          // Add small delay between requests to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 100));

        } catch (err) {
          console.warn(`Error fetching changelog for ${repo.name}:`, err);
        }
      }

      if (allChangelog.length === 0 && !error) {
        // Use mock data for testing when API is rate limited
        setChangelog([]);
        setError('Add a GitHub token for live data.');
      } else {
        setChangelog(allChangelog);
      }
    } catch (err) {
      setError('Failed to fetch changelog. Please try again later.');
      console.error('Error fetching changelog:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortChangelog = () => {
    let filtered = [...changelog];

    // Filter by selected products
    if (selectedProducts.length > 0) {
      filtered = filtered.filter(release =>
        selectedProducts.includes(release.productName)
      );
    }

    // Sort changelog entries
    filtered.sort((a, b) => {
      switch (sortCriteria) {
        case 'newestFirst':
          return new Date(b.published_at) - new Date(a.published_at);
        case 'oldestFirst':
          return new Date(a.published_at) - new Date(b.published_at);
        case 'nameAsc':
          return (a.name || a.tag_name).localeCompare(b.name || b.tag_name);
        case 'nameDesc':
          return (b.name || b.tag_name).localeCompare(a.name || a.tag_name);
        default:
          return 0;
      }
    });

    setFilteredChangelog(filtered);
  };

  const updateDisplayedChangelog = () => {
    const startIndex = 0;
    const endIndex = currentPage * ITEMS_PER_PAGE;
    const newDisplayedChangelog = filteredChangelog.slice(startIndex, endIndex);

    setDisplayedChangelog(newDisplayedChangelog);
    setHasMore(endIndex < filteredChangelog.length);
  };

  const loadMoreChangelog = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setLoadingMore(false);
    }, 500); // Small delay to show loading state
  }, [loadingMore, hasMore]);

  // Intersection Observer for infinite scroll
  const lastChangelogElementRef = useCallback(node => {
    if (loading || loadingMore) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreChangelog();
      }
    }, {
      threshold: 1.0,
      rootMargin: '100px'
    });

    if (node) observerRef.current.observe(node);
  }, [loading, loadingMore, hasMore, loadMoreChangelog]);

  const handleProductChange = (product) => {
    setSelectedProducts(prev =>
      prev.includes(product)
        ? prev.filter(p => p !== product)
        : [...prev, product]
    );
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const changelogTitle = changelogData?.title || 'Changelog';
  const changelogDescription = changelogData?.description || undefined;

  return (
    <ChangelogLayout
      title={changelogTitle}
      description={changelogDescription}
    >
      <div className="row gx-48">
        <div className={clsx(" col-12 col-lg-3")}>
          <div className={clsx(styles.sidebar, 'pe-lg-24 me-lg-n24 mb-24 pb-24 mb-lg-0 pb-lg-0 h-lg-100 position-relative')}>
            <div className="position-lg-sticky d-flex flex-column gap-24 gap-lg-44" style={{"top": "var(--rsk-navbar-height)"}}>
              <SortComponent
                sortCriteria={sortCriteria}
                handleSortChange={handleSortChange}
              />
              <FilterComponent
                selectedProducts={selectedProducts}
                handleProductChange={handleProductChange}
                allProducts={allProducts}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-9">
          <ChangelogHeader data={{title: changelogTitle, description: changelogDescription}} />

          {loading && (
            <div className="text-center py-64">
              <div className="spinner-border text-primary" role="status" style={{ width: '2rem', height: '2rem' }}>
                <span className="visually-hidden">Loading changelog...</span>
              </div>
              <p className="mt-16">Fetching latest updates...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Error</h4>
              <p className="mb-0">{error}</p>
              <hr />
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={fetchAllChangelog}
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && filteredChangelog.length === 0 && !error && (
            <div className="text-center py-64">
              <h3>No updates found</h3>
              <p className="mb-0">
                {selectedProducts.length > 0
                  ? 'Try adjusting your filters to see more updates.'
                  : 'No updates are currently available.'
                }
              </p>
            </div>
          )}

          {!loading && filteredChangelog.length > 0 && (
            <div>
              <div className="opacity-50 mb-24">
                Showing {displayedChangelog.length} of {filteredChangelog.length} update{filteredChangelog.length !== 1 ? 's' : ''}
                {selectedProducts.length > 0 && (
                  <span> for {selectedProducts.join(', ')}</span>
                )}
              </div>
              <div className="d-flex flex-column gap-24 gap-md-64">
                {displayedChangelog.map((release, index) => {
                  const isLast = index === displayedChangelog.length - 1;
                  return (
                    <div
                      key={`${release.repoInfo.repo}-${release.id}`}
                      ref={isLast ? lastChangelogElementRef : null}
                    >
                      <ChangelogItem
                        release={release}
                        productName={release.productName}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Loading indicator for infinite scroll */}
              {loadingMore && (
                <div className="text-center py-32">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading more updates...</span>
                  </div>
                  <p className="mt-16">Loading more updates...</p>
                </div>
              )}

              {/* End of results indicator */}
              {!hasMore && displayedChangelog.length > 0 && (
                <div className="text-center py-32">
                  <p className="mb-0">
                    <em>You've reached the end of the changelog</em>
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </ChangelogLayout>
  );
}
