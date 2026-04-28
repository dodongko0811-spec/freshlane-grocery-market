import { normalizeApiProduct } from './storeUtils.js'

const GROCERIES_URL =
  'https://dummyjson.com/products/category/groceries?limit=0&select=id,title,description,price,category,brand,rating,stock,thumbnail,images'

export async function loadGroceryCatalog() {
  const response = await fetch(GROCERIES_URL)
  if (!response.ok) {
    throw new Error(`Failed to load products (${response.status})`)
  }

  const json = await response.json()
  return (json.products || []).map(normalizeApiProduct)
}

export const fallbackCatalog = [
  {
    id: 'fallback-apple',
    source: 'api',
    sourceId: 'fallback-apple',
    title: 'Apple',
    description: 'Crisp, bright, and ready for lunch boxes or smoothie bowls.',
    category: 'fresh-produce',
    brand: 'FreshLane Selection',
    price: 1.49,
    rating: 4.8,
    stock: 42,
    categoryLabel: 'Fresh Produce',
    image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22640%22%20height%3D%22480%22%20viewBox%3D%220%200%20640%20480%22%3E%3Crect%20width%3D%22640%22%20height%3D%22480%22%20rx%3D%2232%22%20fill%3D%22%23f3efe7%22/%3E%3Ccircle%20cx%3D%22320%22%20cy%3D%22220%22%20r%3D%2282%22%20fill%3D%22%23cf6e3a%22/%3E%3Cpath%20d%3D%22M320%20143c18-29%2049-43%2078-48-7%2037-31%2068-60%2090%22%20fill%3D%22none%22%20stroke%3D%22%23547c3b%22%20stroke-width%3D%2214%22%20stroke-linecap%3D%22round%22/%3E%3C/svg%3E',
  },
  {
    id: 'fallback-eggs',
    source: 'api',
    sourceId: 'fallback-eggs',
    title: 'Free Range Eggs',
    description: 'Everyday kitchen staple for breakfasts, baking, and quick dinners.',
    category: 'dairy-eggs',
    brand: 'FreshLane Selection',
    price: 2.99,
    rating: 4.7,
    stock: 18,
    categoryLabel: 'Dairy & Eggs',
    image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22640%22%20height%3D%22480%22%20viewBox%3D%220%200%20640%20480%22%3E%3Crect%20width%3D%22640%22%20height%3D%22480%22%20rx%3D%2232%22%20fill%3D%22%23f3efe7%22/%3E%3Cellipse%20cx%3D%22310%22%20cy%3D%22250%22%20rx%3D%22124%22%20ry%3D%2284%22%20fill%3D%22%23f7e1b0%22/%3E%3Cellipse%20cx%3D%22440%22%20cy%3D%22286%22%20rx%3D%22102%22%20ry%3D%2268%22%20fill%3D%22%23f2d89d%22/%3E%3C/svg%3E',
  },
]
