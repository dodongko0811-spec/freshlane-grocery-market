import { NavLink } from 'react-router-dom'
import { MetricCard } from '../components/MetricCard.jsx'
import { ProductCard } from '../components/ProductCard.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { STORE_CATEGORIES } from '../store/storeUtils.js'
import { useStore } from '../store/storeContext.js'

const promoCopy = [
  {
    title: 'Weekly Fresh Picks',
    text: 'A faster way to stock your kitchen with produce, dairy, and pantry staples.',
  },
  {
    title: 'Bundle & Save',
    text: 'Mix everyday essentials with custom stock items to keep every shelf moving.',
  },
  {
    title: 'Market Deals',
    text: 'Shop the most useful items first and keep the cart flowing with live updates.',
  },
]

const serviceCards = [
  {
    title: 'Fast Browse',
    text: 'Search products instantly and filter by grocery department.',
  },
  {
    title: 'Custom Shelf',
    text: 'Add, edit, hide, and restore items in your own inventory list.',
  },
  {
    title: 'Local Checkout',
    text: 'Save cart changes in the browser and demo a real checkout flow.',
  },
]

export function HomePage() {
  const { visibleProducts, addToCart } = useStore()
  const featured = visibleProducts.slice(0, 6)
  const departments = STORE_CATEGORIES.filter((item) => item.id !== 'all').map((item) => ({
    ...item,
    count: visibleProducts.filter((product) => product.category === item.id).length,
  }))

  return (
    <div className="page-stack">
      <section className="home-hero panel">
        <div className="hero-copy">
          <p className="eyebrow">Always fresh value</p>
          <h1>
            Grocery shopping that feels busy, practical, and easy to stock.
          </h1>
          <p className="lead">
            FreshLane combines live grocery data, local product management, and a cart that
            actually responds. Add items, remove them from the shelf, and keep the market moving.
          </p>

          <div className="hero-actions">
            <NavLink to="/store" className="button button-primary">
              Shop now
            </NavLink>
            <NavLink to="/inventory" className="button button-secondary">
              Manage products
            </NavLink>
          </div>

          <div className="hero-metrics">
            <MetricCard label="Live grocery feed" value={`${visibleProducts.length} items`} note="Free API source" />
            <MetricCard label="Custom inventory" value="Editable" note="Add and remove products" />
            <MetricCard label="Cart workflow" value="Persistent" note="Saved locally in browser" />
          </div>
        </div>

        <div className="hero-rail">
          <article className="promo-feature">
            <div className="promo-feature__header">
              <span>Featured this week</span>
              <strong>Fresh produce and kitchen essentials</strong>
            </div>
            <div className="promo-feature__stack">
              {featured.slice(0, 3).map((product) => (
                <button
                  key={product.id}
                  type="button"
                  className="stack-item"
                  onClick={() => addToCart(product.id)}
                >
                  <img src={product.image} alt={product.title} loading="lazy" />
                  <div>
                    <p>{product.title}</p>
                    <span>${product.price.toFixed(2)}</span>
                  </div>
                </button>
              ))}
            </div>
          </article>

          <div className="promo-mini-grid">
            {promoCopy.map((item) => (
              <article key={item.title} className="mini-promo">
                <p>{item.title}</p>
                <span>{item.text}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="panel section-block">
        <SectionTitle
          eyebrow="Departments"
          title="Shop by grocery department."
          text="A quick way to mirror a retail storefront with clear categories and easy scanning."
        />
        <div className="department-grid">
          {departments.map((department) => (
            <NavLink key={department.id} to={`/store?category=${department.id}`} className="department-card">
              <strong>{department.label}</strong>
              <span>{department.count} items</span>
            </NavLink>
          ))}
        </div>
      </section>

      <section className="panel section-block">
        <SectionTitle
          eyebrow="Featured shelf"
          title="Best sellers that keep the shelf feeling real."
          text="These cards use the live grocery feed and respond to the cart button immediately."
        />
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="panel section-block split-banner">
        <div className="banner-copy">
          <SectionTitle
            eyebrow="Weekly deal"
            title="Stock the pantry without overthinking it."
            text="The layout keeps one strong promotion in view while the rest of the store stays accessible."
          />
          <div className="hero-actions">
            <NavLink to="/store" className="button button-primary">
              Explore deals
            </NavLink>
          </div>
        </div>
        <div className="banner-grid">
          {visibleProducts.slice(3, 6).map((product) => (
            <button key={product.id} type="button" className="banner-product" onClick={() => addToCart(product.id)}>
              <img src={product.image} alt={product.title} loading="lazy" />
              <div>
                <strong>{product.title}</strong>
                <span>{product.categoryLabel || 'Featured'}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="panel section-block">
        <SectionTitle
          eyebrow="What&apos;s happening"
          title="Promotions, savings, and service notes in a simple retail grid."
          text="This section replaces the news-and-promotions feel from the reference with grocery-friendly updates."
        />
        <div className="news-grid">
          {serviceCards.map((card, index) => (
            <article key={card.title} className="news-card">
              <p className="news-kicker">Update {String(index + 1).padStart(2, '0')}</p>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <NavLink to="/store" className="news-link">
                Explore
              </NavLink>
            </article>
          ))}
        </div>
      </section>

      <section className="panel section-block">
        <SectionTitle
          eyebrow="Why it works"
          title="The core workflow is still real."
          text="Search, sort, add, remove, hide, restore, and checkout all update local state in the browser."
        />
        <div className="feature-grid">
          <article className="feature-card">
            <h3>Search and shop</h3>
            <p>Use the top search bar or the Store page filters to find groceries fast.</p>
          </article>
          <article className="feature-card">
            <h3>Manage inventory</h3>
            <p>Add custom products, edit them later, or remove shelf items whenever needed.</p>
          </article>
          <article className="feature-card">
            <h3>Complete checkout</h3>
            <p>Adjust quantities, remove items, and place a local demo order from the cart.</p>
          </article>
        </div>
      </section>
    </div>
  )
}
