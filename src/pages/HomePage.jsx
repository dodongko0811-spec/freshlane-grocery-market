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
    title: 'Promo Aisle',
    text: 'Seasonal cookies, rice packs, and cleaning staples keep the discount shelf active.',
  },
  {
    title: 'Shelf Types',
    text: 'Perishable and non-perishable grouping helps the catalog feel more like a real store floor.',
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
  const sortedVisible = [...visibleProducts].toSorted((a, b) => b.rating - a.rating || a.price - b.price)
  const featured = sortedVisible.slice(0, 6)
  const newThisWeek = sortedVisible
    .filter((product) => (product.groups || []).includes('seasonal'))
    .slice(0, 4)
  const freshShelf = sortedVisible
    .filter((product) => (product.groups || []).includes('perishable'))
    .slice(0, 6)
  const pantryShelf = sortedVisible
    .filter((product) => (product.groups || []).includes('non-perishable'))
    .slice(0, 6)
  const promoShelf = sortedVisible
    .filter((product) => (product.groups || []).includes('promo'))
    .slice(0, 3)
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
              <strong>Rice, drinks, canned fish, bakery, seasonal items, and pantry staples</strong>
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
          text="From rice and drinks to bakery, canned fish, paper goods, laundry, and baby essentials, the aisle labels mirror a real supermarket shelf."
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
          eyebrow="New this week"
          title="Seasonal picks and fresh arrivals."
          text="Small runs of holiday snacks, summer drinks, and week-of arrivals keep the store feeling current."
        />
        <div className="product-grid product-grid--featured">
          {(newThisWeek.length > 0 ? newThisWeek : featured).map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="panel section-block">
        <SectionTitle
          eyebrow="Fresh market"
          title="Produce, dairy, bakery, and frozen shelves."
          text="This section stays on the perishable side of the store: quick-rotate items that belong in the front half of a market run."
        />
        <div className="product-grid product-grid--featured">
          {freshShelf.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="panel section-block">
        <SectionTitle
          eyebrow="Pantry staples"
          title="Cans, sauces, rice, drinks, and shelf-stable essentials."
          text="The pantry side keeps the store grounded with the things people come back for every week."
        />
        <div className="product-grid product-grid--featured">
          {pantryShelf.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="panel section-block split-banner">
        <div className="banner-copy">
          <SectionTitle
            eyebrow="Sale corner"
            title="A visible promo rail for marked-down items."
            text="Promo items show their own On Sale badge, so the discount shelf feels like a real supermarket endcap."
          />
          <div className="hero-actions">
            <NavLink to="/store" className="button button-primary">
              Explore deals
            </NavLink>
          </div>
        </div>
        <div className="banner-grid">
          {(promoShelf.length > 0 ? promoShelf : featured.slice(3, 6)).map((product) => (
            <button key={product.id} type="button" className="banner-product" onClick={() => addToCart(product.id)}>
              {(product.groups || []).includes('promo') || (product.groups || []).includes('seasonal') ? (
                <div className="product-badges">
                  {(product.groups || []).includes('promo') ? (
                    <span className="product-badge badge--sale">On Sale</span>
                  ) : null}
                  {(product.groups || []).includes('seasonal') ? (
                    <span className="product-badge badge--new">New This Week</span>
                  ) : null}
                </div>
              ) : null}
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
