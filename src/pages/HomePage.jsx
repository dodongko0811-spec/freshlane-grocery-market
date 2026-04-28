import { NavLink } from 'react-router-dom'
import { MetricCard } from '../components/MetricCard.jsx'
import { ProductCard } from '../components/ProductCard.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { STORE_CATEGORIES } from '../store/storeUtils.js'
import { useStore } from '../store/storeContext.js'

const promoCopy = [
  {
    title: 'Weekly Fresh Picks',
    text: 'Use this page like a store flyer: a quick scan, a few good finds, then move on.',
  },
  {
    title: 'Bundle & Save',
    text: 'Mix everyday essentials with custom stock items and keep the shelf from feeling empty.',
  },
  {
    title: 'Market Deals',
    text: 'The cart updates live, so the page behaves more like a real shop counter than a demo.',
  },
]

const serviceCards = [
  {
    title: 'Quick browse',
    text: 'Search products instantly and filter by grocery aisle without extra clicking.',
  },
  {
    title: 'Custom shelf',
    text: 'Add, edit, hide, and restore items in a personal inventory list that stays in the browser.',
  },
  {
    title: 'Local checkout',
    text: 'Adjust the cart, save changes locally, and finish with a simple checkout flow.',
  },
]

export function HomePage() {
  const { visibleProducts, addToCart } = useStore()
  const featured = visibleProducts.slice(0, 6)
  const departments = STORE_CATEGORIES.filter((item) => item.id !== 'all').map((item) => ({
    ...item,
    count: visibleProducts.filter((product) => product.category === item.id).length,
  }))
  const departmentCardClasses = [
    'department-card--0',
    'department-card--1',
    'department-card--2',
    'department-card--3',
    'department-card--4',
    'department-card--5',
    'department-card--6',
  ]

  return (
    <div className="page-stack">
      <section className="home-hero panel">
        <div className="hero-copy">
          <p className="eyebrow">Storefront notes</p>
          <h1>
            Grocery shopping that feels like a real store run.
          </h1>
          <p className="lead">
            FreshLane combines live grocery data, local product management, and a cart that reacts
            immediately. Add items, remove them from the shelf, and keep the market moving.
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
          text="The cards stay uneven on purpose, like a person laid out the aisle notes instead of a grid system."
        />
        <div className="department-grid">
          {departments.map((department, index) => (
            <NavLink
              key={department.id}
              to={`/store?category=${department.id}`}
              className={`department-card ${departmentCardClasses[index] ?? 'department-card--6'}`}
            >
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
        <div className="product-grid product-grid--featured">
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
          title="Small notes from the floor."
          text="Promotions, savings, and service notes sit in a slightly uneven grid so the page feels less assembled by a tool."
        />
        <div className="news-grid news-grid--featured">
          {serviceCards.map((card, index) => (
            <article key={card.title} className={`news-card news-card--${index + 1}`}>
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
