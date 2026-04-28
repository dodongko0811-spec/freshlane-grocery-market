import { useDeferredValue, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { SORT_OPTIONS, STORE_CATEGORIES } from '../store/storeUtils.js'
import { useStore } from '../store/storeContext.js'

export function StorePage() {
  const { visibleProducts, status, error, addToCart, hideProduct } = useStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? 'all'
  const [sortBy, setSortBy] = useState('featured')
  const deferredQuery = useDeferredValue(query)

  const filteredProducts = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    const items = visibleProducts.filter((product) => {
      const matchesQuery =
        !q ||
        `${product.title} ${product.brand} ${product.description}`.toLowerCase().includes(q)
      const matchesCategory = category === 'all' || product.category === category
      return matchesQuery && matchesCategory
    })

    return items.toSorted((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating-desc') return b.rating - a.rating
      return b.rating - a.rating
    })
  }, [category, deferredQuery, sortBy, visibleProducts])

  function updateCategory(nextCategory) {
    const next = new URLSearchParams(searchParams)
    next.set('category', nextCategory)
    setSearchParams(next)
  }

  return (
    <div className="page-stack">
      <section className="panel section-block store-hero">
        <SectionTitle
          eyebrow="Live store"
          title="Browse the grocery floor."
          text="Search the live product feed, narrow it by category, and drop items straight into the cart."
        />

        <div className="store-toolbar">
          <label className="field field-search">
            <span>Search products</span>
            <input
              type="search"
              placeholder="Apple, oil, eggs, snack..."
              value={query}
              onChange={(event) => {
                const nextQuery = event.target.value
                const next = new URLSearchParams(searchParams)
                if (nextQuery.trim()) next.set('q', nextQuery)
                else next.delete('q')
                setSearchParams(next)
              }}
            />
          </label>

          <label className="field">
            <span>Sort by</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              {SORT_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="chip-row">
          {STORE_CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`chip${category === item.id ? ' is-active' : ''}`}
              onClick={() => updateCategory(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {status === 'loading' ? <p className="loading-line">Loading grocery products...</p> : null}
        {error ? <p className="notice">{error}</p> : null}
        <p className="store-count">
          Showing <strong>{filteredProducts.length}</strong> products from the active shelf.
        </p>
        <div className="store-layout">
          <aside className="store-rail">
            <article className="rail-card rail-card--accent">
              <p>Weekly Deal</p>
              <strong>Bring home the pantry basics with less guesswork.</strong>
              <span>Use the filters and header search to narrow the live feed.</span>
            </article>
            <article className="rail-card">
              <p>Store status</p>
              <strong>{status === 'loading' ? 'Loading feed' : 'Ready to shop'}</strong>
              <span>{filteredProducts.length} products visible right now</span>
            </article>
            <article className="rail-card">
              <p>Quick note</p>
              <strong>{error ? 'Offline fallback active' : 'Live data connected'}</strong>
              <span>{error || 'Product data loads from DummyJSON groceries.'}</span>
            </article>
          </aside>

          <div>
            <div className="product-grid product-grid--store">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onHide={hideProduct}
                  actionLabel="Add to cart"
                />
              ))}
            </div>

            {filteredProducts.length === 0 ? (
              <p className="empty-message">Nothing matches that search right now. Try another keyword.</p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
