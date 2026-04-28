import { useMemo, useState } from 'react'
import { EmptyState } from '../components/EmptyState.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { buildCartTotals, formatCurrency } from '../store/storeUtils.js'
import { useStore } from '../store/storeContext.js'

export function CartPage() {
  const { cartItems, allProducts, setCartQuantity, removeFromCart, clearCart } = useStore()
  const [confirmation, setConfirmation] = useState('')

  const totals = useMemo(() => buildCartTotals(cartItems, allProducts), [allProducts, cartItems])

  function checkout() {
    if (!cartItems.length) return
    clearCart()
    setConfirmation('Your grocery order was placed. This demo stores the confirmation locally.')
  }

  return (
    <div className="page-stack">
      <section className="panel section-block">
        <SectionTitle
          eyebrow="Cart"
          title="Review the basket and finish the order."
          text="Adjust quantities, remove items, and place a demo checkout to complete the flow."
        />
        {confirmation ? <p className="success-line">{confirmation}</p> : null}
      </section>

      <section className="panel section-block cart-layout">
        <div className="cart-list">
          {cartItems.length ? (
            cartItems.map(({ id, quantity, product }) => (
              <article key={id} className="cart-row">
                <img src={product.image} alt={product.title} loading="lazy" />
                <div className="cart-row-copy">
                  <strong>{product.title}</strong>
                  <span>{product.brand}</span>
                  <p>{formatCurrency(product.price)} each</p>
                </div>
                <div className="cart-stepper">
                  <button
                    type="button"
                    className="button button-ghost"
                    onClick={() => setCartQuantity(id, quantity - 1)}
                  >
                    -
                  </button>
                  <strong>{quantity}</strong>
                  <button
                    type="button"
                    className="button button-ghost"
                    onClick={() => setCartQuantity(id, quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button type="button" className="button button-ghost" onClick={() => removeFromCart(id)}>
                  Remove
                </button>
              </article>
            ))
          ) : (
            <EmptyState
              title="Your cart is empty"
              text="Add some groceries from the Store page to see the checkout flow."
              actionLabel="Go to store"
              actionTo="/store"
            />
          )}
        </div>

        <aside className="cart-summary">
          <h3>Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatCurrency(totals.subtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <strong>{formatCurrency(totals.delivery)}</strong>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <strong>{formatCurrency(totals.tax)}</strong>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <strong>{formatCurrency(totals.total)}</strong>
          </div>

          <button type="button" className="button button-primary button-wide" onClick={checkout}>
            Place order
          </button>
          <p className="summary-note">Checkout is a local demo, so nothing is sent to a server.</p>
        </aside>
      </section>
    </div>
  )
}
