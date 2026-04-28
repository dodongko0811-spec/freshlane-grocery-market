import { formatCurrency } from '../store/storeUtils.js'

const placeholderImage =
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22720%22%20height%3D%22540%22%20viewBox%3D%220%200%20720%20540%22%3E%3Crect%20width%3D%22720%22%20height%3D%22540%22%20rx%3D%2236%22%20fill%3D%22%23f4efe7%22/%3E%3Cpath%20d%3D%22M165%20356h390l-37-137c-5-20-24-34-44-34H246c-20%200-39%2014-44%2034Z%22%20fill%3D%22%23e2c9a4%22/%3E%3Cpath%20d%3D%22M252%20202c8-19%2026-30%2048-30h120c22%200%2040%2011%2048%2030l24%2045H228Z%22%20fill%3D%22%2390673b%22/%3E%3Ccircle%20cx%3D%22286%22%20cy%3D%22306%22%20r%3D%2238%22%20fill%3D%22%23f5f1e9%22/%3E%3Ccircle%20cx%3D%22430%22%20cy%3D%22316%22%20r%3D%2238%22%20fill%3D%22%23f5f1e9%22/%3E%3C/svg%3E'

export function ProductCard({
  product,
  onAddToCart,
  onHide,
  onRestore,
  hidden = false,
  showActions = true,
  actionLabel = 'Add to cart',
  tone,
}) {
  const groups = product.groups || []
  const inferredTone = tone || (
    groups.includes('seasonal') || groups.includes('promo')
      ? 'best'
      : ['fresh-produce', 'dairy-eggs', 'bakery'].includes(product.category)
        ? 'fresh'
        : product.category === 'frozen'
          ? 'frozen'
          : 'pantry'
  )
  const badges = []
  if (groups.includes('promo')) badges.push({ label: 'On Sale', className: 'badge--sale' })
  if (groups.includes('seasonal')) badges.push({ label: 'New This Week', className: 'badge--new' })

  return (
    <article className={`product-card product-card--tone-${inferredTone}${hidden ? ' is-hidden' : ''}`}>
      <div className="product-media">
        {badges.length > 0 ? (
          <div className="product-badges">
            {badges.map((badge) => (
              <span key={badge.label} className={`product-badge ${badge.className}`}>
                {badge.label}
              </span>
            ))}
          </div>
        ) : null}
        <img
          src={product.image || placeholderImage}
          alt={product.title}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = placeholderImage
          }}
        />
      </div>

      <div className="product-body">
        <div className="product-topline">
          <p>{product.brand}</p>
          <span>{product.categoryLabel || 'Featured'}</span>
        </div>
        <h3>{product.title}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-meta">
          <strong>{formatCurrency(product.price)}</strong>
          <span>{product.rating?.toFixed?.(1) ?? '4.5'} rating</span>
        </div>

        {showActions ? (
          <div className="product-actions">
            {onAddToCart ? (
              <button
                type="button"
                className="button button-primary"
                onClick={() => onAddToCart(product.id)}
              >
                {actionLabel}
              </button>
            ) : null}

            {hidden && onRestore ? (
              <button
                type="button"
                className="button button-ghost"
                onClick={() => onRestore(product.id)}
              >
                Restore
              </button>
            ) : null}

            {!hidden && onHide ? (
              <button
                type="button"
                className="button button-ghost"
                onClick={() => onHide(product.id)}
              >
                Remove
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}
