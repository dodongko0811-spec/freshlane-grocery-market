export const STORAGE_KEYS = {
  customProducts: 'freshlane.custom-products.v1',
  hiddenProducts: 'freshlane.hidden-products.v1',
  cart: 'freshlane.cart.v1',
}

export const STORE_CATEGORIES = [
  { id: 'all', label: 'All items' },
  { id: 'fresh-produce', label: 'Fresh Produce' },
  { id: 'meat-seafood', label: 'Meat & Seafood' },
  { id: 'dairy-eggs', label: 'Dairy & Eggs' },
  { id: 'pantry', label: 'Pantry' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'pet-care', label: 'Pet Care' },
  { id: 'custom', label: 'Custom Items' },
]

export const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating-desc', label: 'Top Rated' },
]

export function loadFromStorage(key, fallback) {
  try {
    if (typeof window === 'undefined') return fallback
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function saveToStorage(key, value) {
  try {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore storage failures in private browsing or quota-limited contexts.
  }
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value)
}

export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function createId(prefix) {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const freshnessKeywords = /apple|banana|cucumber|pepper|tomato|broccoli|carrot|lettuce|orange|grape|melon|berry|spinach|onion|potato|cabbage|mushroom/
const proteinKeywords = /beef|chicken|fish|steak|meat|prawn|shrimp|salmon|tuna|pork/
const dairyKeywords = /egg|milk|cheese|butter|yogurt|cream/
const pantryKeywords = /oil|rice|pasta|sauce|flour|salt|sugar|oat|bread|cereal|coffee|tea|jam|honey|noodle|biscuit/
const snackKeywords = /chips|cookie|cracker|snack|bar|popcorn|candy|chocolate/
const petKeywords = /cat|dog|pet/

export function classifyProduct(product) {
  const text = `${product.title ?? ''} ${product.description ?? ''}`.toLowerCase()

  if (petKeywords.test(text)) return 'pet-care'
  if (proteinKeywords.test(text)) return 'meat-seafood'
  if (freshnessKeywords.test(text)) return 'fresh-produce'
  if (dairyKeywords.test(text)) return 'dairy-eggs'
  if (snackKeywords.test(text)) return 'snacks'
  if (pantryKeywords.test(text)) return 'pantry'

  return 'pantry'
}

export function resolveCategoryLabel(categoryId) {
  return STORE_CATEGORIES.find((item) => item.id === categoryId)?.label ?? 'All items'
}

export function normalizeApiProduct(product) {
  const image = product.thumbnail || product.images?.[0] || ''
  const category = classifyProduct(product)

  return {
    id: `api-${product.id}`,
    sourceId: product.id,
    source: 'api',
    title: product.title,
    description: product.description,
    category,
    brand: product.brand || 'FreshLane Selection',
    price: Number(product.price) || 0,
    rating: Number(product.rating) || 4.2,
    stock: Number(product.stock) || 0,
    image,
    slug: slugify(product.title || `item-${product.id}`),
    categoryLabel: resolveCategoryLabel(category),
  }
}

export function normalizeCustomProduct(product) {
  return {
    id: product.id ?? createId('custom'),
    sourceId: product.sourceId ?? null,
    source: 'custom',
    title: product.title,
    description: product.description,
    category: product.category || 'custom',
    brand: product.brand || 'FreshLane Market',
    price: Number(product.price) || 0,
    rating: Number(product.rating) || 4.5,
    stock: Number(product.stock) || 25,
    image: product.image || '',
    slug: slugify(product.title || 'custom-item'),
    note: product.note || 'Created locally in your inventory.',
    categoryLabel: resolveCategoryLabel(product.category || 'custom'),
  }
}

export function buildCartTotals(items, catalog) {
  const itemMap = new Map(catalog.map((product) => [product.id, product]))
  const subtotal = items.reduce((sum, item) => {
    const product = itemMap.get(item.id)
    return sum + (product?.price || 0) * item.quantity
  }, 0)

  const delivery = subtotal > 0 ? 4.99 : 0
  const tax = subtotal * 0.06
  return {
    subtotal,
    delivery,
    tax,
    total: subtotal + delivery + tax,
  }
}
