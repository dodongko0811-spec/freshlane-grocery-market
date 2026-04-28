import { normalizeApiProduct, resolveCategoryLabel } from './storeUtils.js'

const GROCERIES_URL =
  'https://dummyjson.com/products/category/groceries?limit=0&select=id,title,description,price,category,brand,rating,stock,thumbnail,images'

function svgData(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function makePackImage({ title, subtitle, bg, panel, accent, ribbon }) {
  return svgData(`
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="540" viewBox="0 0 720 540">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${bg[0]}" />
          <stop offset="100%" stop-color="${bg[1]}" />
        </linearGradient>
        <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${panel[0]}" />
          <stop offset="100%" stop-color="${panel[1]}" />
        </linearGradient>
      </defs>
      <rect width="720" height="540" rx="36" fill="url(#bg)" />
      <circle cx="120" cy="112" r="24" fill="${accent}" opacity="0.18" />
      <circle cx="602" cy="98" r="34" fill="${accent}" opacity="0.12" />
      <circle cx="608" cy="434" r="28" fill="${accent}" opacity="0.14" />
      <rect x="132" y="98" width="456" height="316" rx="34" fill="url(#panel)" />
      <rect x="178" y="142" width="364" height="164" rx="26" fill="${accent}" opacity="0.15" />
      <rect x="208" y="168" width="304" height="112" rx="22" fill="${accent}" opacity="0.24" />
      <rect x="226" y="182" width="268" height="86" rx="18" fill="#fff9f2" opacity="0.8" />
      <text x="360" y="222" text-anchor="middle" fill="#2f261f" font-family="Georgia, serif" font-size="58" font-weight="700">${title}</text>
      <text x="360" y="258" text-anchor="middle" fill="#7d6d60" font-family="Inter, sans-serif" font-size="22" letter-spacing="3">${subtitle}</text>
      <rect x="176" y="322" width="368" height="42" rx="21" fill="${ribbon}" opacity="0.9" />
      <text x="360" y="349" text-anchor="middle" fill="#fffaf2" font-family="Inter, sans-serif" font-size="18" font-weight="700" letter-spacing="2">${title.toUpperCase()}</text>
    </svg>
  `)
}

export const starterCatalog = [
  {
    id: 'starter-rice',
    source: 'starter',
    sourceId: 'starter-rice',
    title: 'Premium Rice 5kg',
    description: 'Family-size rice for daily meals, packed for easy pantry storage.',
    category: 'rice-grains',
    brand: 'FreshLane Essentials',
    price: 14.99,
    rating: 4.8,
    stock: 60,
    categoryLabel: resolveCategoryLabel('rice-grains'),
    image: makePackImage({
      title: 'RICE',
      subtitle: '5KG',
      bg: ['#f6efe4', '#efe0c5'],
      panel: ['#fffaf2', '#f1e6d2'],
      accent: '#c79c56',
      ribbon: '#6c8f39',
    }),
  },
  {
    id: 'starter-coffee',
    source: 'starter',
    sourceId: 'starter-coffee',
    title: 'House Coffee Blend',
    description: 'Smooth coffee blend for mornings, desk breaks, and late-night refills.',
    category: 'coffee-drinks',
    brand: 'FreshLane Essentials',
    price: 8.99,
    rating: 4.9,
    stock: 44,
    categoryLabel: resolveCategoryLabel('coffee-drinks'),
    image: makePackImage({
      title: 'COFFEE',
      subtitle: 'GROUND',
      bg: ['#f5e6d4', '#e7c9a2'],
      panel: ['#fffaf4', '#f1ddd0'],
      accent: '#7b4f2a',
      ribbon: '#c62d12',
    }),
  },
  {
    id: 'starter-tissue',
    source: 'starter',
    sourceId: 'starter-tissue',
    title: 'Tissue Box',
    description: 'Soft facial tissues for counters, bathrooms, and bedside tables.',
    category: 'household-paper',
    brand: 'FreshLane Home',
    price: 2.49,
    rating: 4.6,
    stock: 80,
    categoryLabel: resolveCategoryLabel('household-paper'),
    image: makePackImage({
      title: 'TISSUE',
      subtitle: 'BOX',
      bg: ['#f3efe7', '#e7e0d5'],
      panel: ['#fffdf8', '#efe8df'],
      accent: '#8f8478',
      ribbon: '#7d6d60',
    }),
  },
  {
    id: 'starter-wipes',
    source: 'starter',
    sourceId: 'starter-wipes',
    title: 'Wet Wipes',
    description: 'Handy wipes for quick cleanups, travel bags, and lunch boxes.',
    category: 'household-paper',
    brand: 'FreshLane Home',
    price: 3.49,
    rating: 4.5,
    stock: 52,
    categoryLabel: resolveCategoryLabel('household-paper'),
    image: makePackImage({
      title: 'WIPES',
      subtitle: '40 PCS',
      bg: ['#edf6f6', '#d8e9ea'],
      panel: ['#f8fefe', '#e2f0ef'],
      accent: '#5c8a8d',
      ribbon: '#55702c',
    }),
  },
  {
    id: 'starter-dish-soap',
    source: 'starter',
    sourceId: 'starter-dish-soap',
    title: 'Dish Soap',
    description: 'Everyday dishwashing liquid for the sink and the quick evening cleanup.',
    category: 'cleaning',
    brand: 'FreshLane Home',
    price: 4.29,
    rating: 4.7,
    stock: 34,
    categoryLabel: resolveCategoryLabel('cleaning'),
    image: makePackImage({
      title: 'SOAP',
      subtitle: 'DISH',
      bg: ['#f7f3e8', '#e5e1d2'],
      panel: ['#fffdf9', '#efe9dc'],
      accent: '#3d7fa3',
      ribbon: '#f04a23',
    }),
  },
  {
    id: 'starter-laundry-detergent',
    source: 'starter',
    sourceId: 'starter-laundry-detergent',
    title: 'Laundry Detergent',
    description: 'Laundry detergent for everyday clothes, towels, and linens.',
    category: 'cleaning',
    brand: 'FreshLane Home',
    price: 11.99,
    rating: 4.8,
    stock: 27,
    categoryLabel: resolveCategoryLabel('cleaning'),
    image: makePackImage({
      title: 'DETERGENT',
      subtitle: 'LAUNDRY',
      bg: ['#eef2fb', '#dfe7f6'],
      panel: ['#fefeff', '#e8edf9'],
      accent: '#5b73b8',
      ribbon: '#55702c',
    }),
  },
  {
    id: 'starter-noodles',
    source: 'starter',
    sourceId: 'starter-noodles',
    title: 'Instant Noodles',
    description: 'Quick noodles for late dinners, pantry backups, and budget meals.',
    category: 'foods-staples',
    brand: 'FreshLane Everyday',
    price: 1.19,
    rating: 4.4,
    stock: 96,
    categoryLabel: resolveCategoryLabel('foods-staples'),
    image: makePackImage({
      title: 'NOODLES',
      subtitle: 'INSTANT',
      bg: ['#f7ebdb', '#efd4a6'],
      panel: ['#fff9f2', '#f7e4c8'],
      accent: '#d56b2b',
      ribbon: '#7b4f2a',
    }),
  },
  {
    id: 'starter-cereal',
    source: 'starter',
    sourceId: 'starter-cereal',
    title: 'Breakfast Cereal',
    description: 'A simple breakfast staple for quick mornings and school prep.',
    category: 'breakfast',
    brand: 'FreshLane Everyday',
    price: 5.99,
    rating: 4.5,
    stock: 45,
    categoryLabel: resolveCategoryLabel('breakfast'),
    image: makePackImage({
      title: 'CEREAL',
      subtitle: 'BREAKFAST',
      bg: ['#f3efe6', '#e2d6c0'],
      panel: ['#fffaf3', '#f1e7d6'],
      accent: '#b68a49',
      ribbon: '#c62d12',
    }),
  },
  {
    id: 'starter-bread',
    source: 'starter',
    sourceId: 'starter-bread',
    title: 'Sandwich Bread',
    description: 'Soft bread loaf for toast, sandwiches, and quick breakfast prep.',
    category: 'bakery',
    brand: 'FreshLane Bakery',
    price: 3.49,
    rating: 4.5,
    stock: 40,
    categoryLabel: resolveCategoryLabel('bakery'),
    image: makePackImage({
      title: 'BREAD',
      subtitle: 'LOAF',
      bg: ['#f4e5d0', '#e3c9a6'],
      panel: ['#fffaf4', '#f5e7d6'],
      accent: '#9e6b3f',
      ribbon: '#6c8f39',
    }),
  },
  {
    id: 'starter-croissant',
    source: 'starter',
    sourceId: 'starter-croissant',
    title: 'Butter Croissant',
    description: 'Flaky bakery pastry for breakfast, coffee breaks, and quick snacks.',
    category: 'bakery',
    brand: 'FreshLane Bakery',
    price: 2.29,
    rating: 4.7,
    stock: 28,
    categoryLabel: resolveCategoryLabel('bakery'),
    image: makePackImage({
      title: 'PASTRY',
      subtitle: 'BUTTER',
      bg: ['#f7ecdf', '#edd2af'],
      panel: ['#fffaf6', '#f4e4cf'],
      accent: '#c79c56',
      ribbon: '#c62d12',
    }),
  },
  {
    id: 'starter-soda',
    source: 'starter',
    sourceId: 'starter-soda',
    title: 'Soft Drinks',
    description: 'Chilled drinks for lunch, family meals, and weekend snacks.',
    category: 'beverages',
    brand: 'FreshLane Drinks',
    price: 1.99,
    rating: 4.5,
    stock: 72,
    categoryLabel: resolveCategoryLabel('beverages'),
    image: makePackImage({
      title: 'SODA',
      subtitle: 'DRINKS',
      bg: ['#f8ecf0', '#f3d2da'],
      panel: ['#fff8fa', '#f2e2e6'],
      accent: '#c84d68',
      ribbon: '#f04a23',
    }),
  },
  {
    id: 'starter-canned',
    source: 'starter',
    sourceId: 'starter-canned',
    title: 'Canned Tuna',
    description: 'Protein-packed canned tuna for quick lunches and easy dinners.',
    category: 'canned-goods',
    brand: 'FreshLane Pantry',
    price: 2.79,
    rating: 4.6,
    stock: 58,
    categoryLabel: resolveCategoryLabel('canned-goods'),
    image: makePackImage({
      title: 'TUNA',
      subtitle: 'CANNED',
      bg: ['#eef1f7', '#dce4f1'],
      panel: ['#ffffff', '#edf2fa'],
      accent: '#5b73b8',
      ribbon: '#55702c',
    }),
  },
  {
    id: 'starter-ketchup',
    source: 'starter',
    sourceId: 'starter-ketchup',
    title: 'Tomato Sauce',
    description: 'Kitchen sauce for pasta, simmered meals, and quick stir-fry dinners.',
    category: 'condiments',
    brand: 'FreshLane Pantry',
    price: 2.19,
    rating: 4.6,
    stock: 64,
    categoryLabel: resolveCategoryLabel('condiments'),
    image: makePackImage({
      title: 'SAUCE',
      subtitle: 'TOMATO',
      bg: ['#f7ece8', '#f1d8cf'],
      panel: ['#fff8f6', '#f5e6df'],
      accent: '#c62d12',
      ribbon: '#7b4f2a',
    }),
  },
  {
    id: 'starter-frozen',
    source: 'starter',
    sourceId: 'starter-frozen',
    title: 'Frozen Mixed Veggies',
    description: 'Frozen vegetables for quick cooking, meal prep, and stir-fries.',
    category: 'frozen',
    brand: 'FreshLane Frozen',
    price: 3.99,
    rating: 4.4,
    stock: 48,
    categoryLabel: resolveCategoryLabel('frozen'),
    image: makePackImage({
      title: 'FROZEN',
      subtitle: 'VEG',
      bg: ['#edf7f8', '#d9eef0'],
      panel: ['#f8fefe', '#e4f2f3'],
      accent: '#5c8a8d',
      ribbon: '#55702c',
    }),
  },
  {
    id: 'starter-shampoo',
    source: 'starter',
    sourceId: 'starter-shampoo',
    title: 'Shampoo',
    description: 'Daily hair care for family bathrooms and personal grooming shelves.',
    category: 'personal-care',
    brand: 'FreshLane Home',
    price: 6.79,
    rating: 4.6,
    stock: 31,
    categoryLabel: resolveCategoryLabel('personal-care'),
    image: makePackImage({
      title: 'SHAMPOO',
      subtitle: 'CARE',
      bg: ['#f5eef7', '#e2d4ed'],
      panel: ['#fffafc', '#f0e5f6'],
      accent: '#8b5fb5',
      ribbon: '#55702c',
    }),
  },
  {
    id: 'starter-baby-wipes',
    source: 'starter',
    sourceId: 'starter-baby-wipes',
    title: 'Baby Wipes',
    description: 'Gentle wipes for baby care and quick on-the-go cleanup.',
    category: 'baby-care',
    brand: 'FreshLane Home',
    price: 4.59,
    rating: 4.7,
    stock: 35,
    categoryLabel: resolveCategoryLabel('baby-care'),
    image: makePackImage({
      title: 'BABY',
      subtitle: 'WIPES',
      bg: ['#f2f7fb', '#dcebf5'],
      panel: ['#fefeff', '#e5f0f8'],
      accent: '#8fb6d3',
      ribbon: '#c62d12',
    }),
  },
]

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
