import { buildFallbackProductImage, formatCurrency } from '../store/storeUtils.js'

const placeholderImage = buildFallbackProductImage('FreshLane', 'Selection')

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
