import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useStore } from '../store/storeContext.js'
import { LogoMark } from './LogoMark.jsx'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/store', label: 'Shop' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/cart', label: 'Cart' },
]

export function Layout() {
  const { cartCount, status } = useStore()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  function handleSearchSubmit(event) {
    event.preventDefault()
    navigate(`/store?q=${encodeURIComponent(search.trim())}`)
  }

  return (
    <div className="shell">
      <header className="site-header">
        <div className="utility-strip">
          <p>FreshLane Grocery Market</p>
          <div className="utility-links">
            <span>Today&apos;s restock</span>
            <span>Store desk</span>
            <span>Order help</span>
          </div>
        </div>

        <div className="masthead">
          <NavLink to="/" className="brand" aria-label="FreshLane Grocery home">
            <LogoMark />
            <span>
              <strong>FreshLane</strong>
              <small>Grocery Market</small>
            </span>
          </NavLink>

          <form className="searchbar" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              placeholder="Search groceries, deals, or brands"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search groceries"
            />
            <button type="submit">Search</button>
          </form>

          <div className="masthead-actions">
            <span className={`status-pill ${status === 'loading' ? 'is-loading' : ''}`}>
              {status === 'loading' ? 'Loading live feed' : 'Live feed'}
            </span>
            <NavLink to="/cart" className="cart-pill">
              Cart <strong>{cartCount}</strong>
            </NavLink>
          </div>
        </div>

        <nav className="department-nav" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div>
          <p className="footer-kicker">FreshLane Grocery Market</p>
          <h2>Everyday groceries, local inventory control, and cart flow in one place.</h2>
        </div>
        <p>
          Built with React, React Router, and a free product API, then shaped into a grocery
          storefront with local product management.
        </p>
      </footer>
    </div>
  )
}
