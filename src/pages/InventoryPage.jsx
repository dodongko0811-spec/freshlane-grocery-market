import { useMemo, useState } from 'react'
import { EmptyState } from '../components/EmptyState.jsx'
import { ProductCard } from '../components/ProductCard.jsx'
import { SectionTitle } from '../components/SectionTitle.jsx'
import {
  STORE_CATEGORIES,
  createId,
  normalizeCustomProduct,
  resolveCategoryLabel,
} from '../store/storeUtils.js'
import { useStore } from '../store/storeContext.js'

const emptyForm = {
  title: '',
  description: '',
  price: '',
  brand: 'FreshLane Market',
  category: 'pantry',
  stock: '20',
  image: '',
}

export function InventoryPage() {
  const {
    allProducts,
    customProducts,
    hiddenProductIds,
    addCustomProduct,
    updateCustomProduct,
    removeCustomProduct,
    restoreProduct,
  } = useStore()
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [preview, setPreview] = useState(null)

  const hiddenProducts = useMemo(
    () =>
      allProducts
        .filter((product) => hiddenProductIds.includes(product.id))
        .map((product) => ({
          ...product,
          categoryLabel: product.categoryLabel || resolveCategoryLabel(product.category),
        })),
    [allProducts, hiddenProductIds],
  )

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
    setPreview(null)
  }

  function submitProduct(event) {
    event.preventDefault()

    const payload = {
      id: editingId ?? createId('custom'),
      title: form.title.trim(),
      description: form.description.trim(),
      price: Number.parseFloat(form.price) || 0,
      brand: form.brand.trim() || 'FreshLane Market',
      category: form.category,
      stock: Number.parseInt(form.stock, 10) || 20,
      image: form.image.trim(),
      source: 'custom',
      sourceId: null,
    }

    const normalized = normalizeCustomProduct(payload)

    if (editingId) {
      updateCustomProduct(normalized)
    } else {
      addCustomProduct(normalized)
    }

    resetForm()
    setPreview(normalized)
  }

  function editProduct(product) {
    setEditingId(product.id)
    setForm({
      title: product.title,
      description: product.description,
      price: String(product.price),
      brand: product.brand,
      category: product.category,
      stock: String(product.stock),
      image: product.image || '',
    })
    setPreview(product)
  }

  return (
    <div className="page-stack">
      <section className="panel section-block">
        <SectionTitle
          eyebrow="Inventory control"
          title="Add, edit, hide, and remove products."
          text="Custom products stay in local storage, while API products can be hidden from the storefront and restored later."
        />

        <div className="inventory-layout">
          <form className="inventory-form" onSubmit={submitProduct}>
            <div className="form-grid">
              <label className="field">
                <span>Product name</span>
                <input
                  required
                  value={form.title}
                  onChange={(event) => setForm({ ...form, title: event.target.value })}
                  placeholder="Organic banana bunch"
                />
              </label>
              <label className="field">
                <span>Brand</span>
                <input
                  value={form.brand}
                  onChange={(event) => setForm({ ...form, brand: event.target.value })}
                  placeholder="FreshLane Market"
                />
              </label>
              <label className="field field-full">
                <span>Description</span>
                <textarea
                  required
                  rows="4"
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  placeholder="Simple, honest copy for the shelf."
                />
              </label>
              <label className="field">
                <span>Price</span>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(event) => setForm({ ...form, price: event.target.value })}
                />
              </label>
              <label className="field">
                <span>Stock</span>
                <input
                  required
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(event) => setForm({ ...form, stock: event.target.value })}
                />
              </label>
              <label className="field field-full">
                <span>Category</span>
                <select
                  value={form.category}
                  onChange={(event) => setForm({ ...form, category: event.target.value })}
                >
                  {STORE_CATEGORIES.filter((item) => item.id !== 'all').map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field field-full">
                <span>Image URL</span>
                <input
                  value={form.image}
                  onChange={(event) => setForm({ ...form, image: event.target.value })}
                  placeholder="https://..."
                />
              </label>
            </div>

            <div className="inventory-actions">
              <button type="submit" className="button button-primary">
                {editingId ? 'Update product' : 'Add product'}
              </button>
              <button type="button" className="button button-secondary" onClick={resetForm}>
                Clear form
              </button>
            </div>
          </form>

          <aside className="inventory-preview">
            <h3>Preview</h3>
            {preview ? (
              <ProductCard
                product={{ ...preview, categoryLabel: resolveCategoryLabel(preview.category) }}
                showActions={false}
              />
            ) : (
              <EmptyState
                title="No product preview yet"
                text="Add a product to see a live preview here."
              />
            )}
          </aside>
        </div>
      </section>

      <section className="panel section-block">
        <SectionTitle
          eyebrow="Custom items"
          title={`Your local products (${customProducts.length})`}
          text="These items are fully editable in your browser and saved between sessions."
        />

        {customProducts.length ? (
          <div className="inventory-list">
            {customProducts.map((product) => (
              <article key={product.id} className="inventory-row">
                <div>
                  <p className="inventory-name">{product.title}</p>
                  <p className="inventory-meta">
                    {resolveCategoryLabel(product.category)} · ${product.price.toFixed(2)}
                  </p>
                </div>
                <div className="inventory-row-actions">
                  <button
                    type="button"
                    className="button button-ghost"
                    onClick={() => editProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="button button-ghost"
                    onClick={() => removeCustomProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No custom products yet"
            text="Use the form above to add your own grocery items."
          />
        )}
      </section>

      <section className="panel section-block">
        <SectionTitle
          eyebrow="Hidden items"
          title={`Removed from storefront (${hiddenProducts.length})`}
          text="These products are hidden from the public shelf but can be restored when they come back in stock."
        />

        {hiddenProducts.length ? (
          <div className="inventory-list">
            {hiddenProducts.map((product) => (
              <article key={product.id} className="inventory-row">
                <div>
                  <p className="inventory-name">{product.title}</p>
                  <p className="inventory-meta">
                    {resolveCategoryLabel(product.category)} · ${product.price.toFixed(2)}
                  </p>
                </div>
                <button
                  type="button"
                  className="button button-ghost"
                  onClick={() => restoreProduct(product.id)}
                >
                  Restore
                </button>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nothing is hidden"
            text="Use the store page to remove items from the shelf."
            actionLabel="Browse store"
            actionTo="/store"
          />
        )}
      </section>

      <section className="panel section-block">
        <SectionTitle
          eyebrow="Store actions"
          title="API products are editable in the interface, not on the remote server."
          text="DummyJSON gives us a free API to build the flow, while your browser state keeps the store functional."
        />
        <div className="feature-grid">
          <article className="feature-card">
            <h3>Hide items</h3>
            <p>Remove product cards from the live shelf without deleting the local record.</p>
          </article>
          <article className="feature-card">
            <h3>Restore items</h3>
            <p>Bring anything back to the shop when you need it again.</p>
          </article>
          <article className="feature-card">
            <h3>Keep it local</h3>
            <p>The add/edit/delete workflow survives refreshes through local storage.</p>
          </article>
        </div>
      </section>
    </div>
  )
}
