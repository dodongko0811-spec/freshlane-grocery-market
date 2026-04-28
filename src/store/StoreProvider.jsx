import { useEffect, useMemo, useReducer } from 'react'
import { fallbackCatalog, loadGroceryCatalog, starterCatalog } from './api.js'
import {
  STORAGE_KEYS,
  buildCartTotals,
  createId,
  classifyShelfGroups,
  loadFromStorage,
  normalizeCustomProduct,
  saveToStorage,
} from './storeUtils.js'
import { StoreContext } from './storeContext.js'

const initialState = {
  apiProducts: [],
  customProducts: loadFromStorage(STORAGE_KEYS.customProducts, []),
  hiddenProductIds: loadFromStorage(STORAGE_KEYS.hiddenProducts, []),
  cart: loadFromStorage(STORAGE_KEYS.cart, []),
  status: 'loading',
  error: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, status: 'loading', error: null }
    case 'LOAD_SUCCESS':
      return { ...state, status: 'ready', apiProducts: action.products, error: null }
    case 'LOAD_ERROR':
      return {
        ...state,
        status: 'ready',
        apiProducts: action.products,
        error: action.error,
      }
    case 'ADD_CUSTOM_PRODUCT':
      return { ...state, customProducts: [action.product, ...state.customProducts] }
    case 'UPDATE_CUSTOM_PRODUCT':
      return {
        ...state,
        customProducts: state.customProducts.map((product) =>
          product.id === action.product.id ? action.product : product,
        ),
      }
    case 'REMOVE_CUSTOM_PRODUCT':
      return {
        ...state,
        customProducts: state.customProducts.filter((product) => product.id !== action.id),
        hiddenProductIds: state.hiddenProductIds.filter((id) => id !== action.id),
        cart: state.cart.filter((item) => item.id !== action.id),
      }
    case 'HIDE_PRODUCT':
      if (state.hiddenProductIds.includes(action.id)) return state
      return {
        ...state,
        hiddenProductIds: [action.id, ...state.hiddenProductIds],
        cart: state.cart.filter((item) => item.id !== action.id),
      }
    case 'RESTORE_PRODUCT':
      return {
        ...state,
        hiddenProductIds: state.hiddenProductIds.filter((id) => id !== action.id),
      }
    case 'ADD_TO_CART': {
      const existing = state.cart.find((item) => item.id === action.id)
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }

      return {
        ...state,
        cart: [...state.cart, { id: action.id, quantity: 1 }],
      }
    }
    case 'SET_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.id ? { ...item, quantity: action.quantity } : item,
          )
          .filter((item) => item.quantity > 0),
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      }
    case 'CLEAR_CART':
      return { ...state, cart: [] }
    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    let cancelled = false

    async function loadProducts() {
      dispatch({ type: 'LOAD_START' })
      try {
        const products = await loadGroceryCatalog()
        if (!cancelled) {
          dispatch({ type: 'LOAD_SUCCESS', products })
        }
      } catch (error) {
        if (!cancelled) {
          dispatch({
            type: 'LOAD_ERROR',
            products: fallbackCatalog,
            error:
              error instanceof Error
                ? error.message
                : 'Could not load live grocery data right now.',
          })
        }
      }
    }

    loadProducts()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.customProducts, state.customProducts)
  }, [state.customProducts])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.hiddenProducts, state.hiddenProductIds)
  }, [state.hiddenProductIds])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.cart, state.cart)
  }, [state.cart])

  const allProducts = useMemo(
    () => [
      ...starterCatalog.map((product) => ({
        ...product,
        groups: product.groups || classifyShelfGroups(product),
      })),
      ...state.apiProducts,
      ...state.customProducts,
    ],
    [state.apiProducts, state.customProducts],
  )
  const visibleProducts = useMemo(
    () => allProducts.filter((product) => !state.hiddenProductIds.includes(product.id)),
    [allProducts, state.hiddenProductIds],
  )
  const cartItems = useMemo(() => {
    const productMap = new Map(allProducts.map((product) => [product.id, product]))
    return state.cart
      .map((item) => {
        const product = productMap.get(item.id)
        return product ? { ...item, product } : null
      })
      .filter(Boolean)
  }, [state.cart, allProducts])

  const cartTotals = useMemo(
    () => buildCartTotals(state.cart, allProducts),
    [state.cart, allProducts],
  )

  const customProductCount = state.customProducts.length
  const hiddenProductCount = state.hiddenProductIds.length
  const cartCount = state.cart.reduce((count, item) => count + item.quantity, 0)

  const value = useMemo(
    () => ({
      apiProducts: state.apiProducts,
      status: state.status,
      error: state.error,
      allProducts,
      visibleProducts,
      cartItems,
      cartTotals,
      customProducts: state.customProducts,
      hiddenProductIds: state.hiddenProductIds,
      cartCount,
      customProductCount,
      hiddenProductCount,
      addCustomProduct(product) {
        const normalized = normalizeCustomProduct({
          ...product,
          id: createId('custom'),
          source: 'custom',
        })
        dispatch({ type: 'ADD_CUSTOM_PRODUCT', product: normalized })
        return normalized
      },
      updateCustomProduct(product) {
        dispatch({ type: 'UPDATE_CUSTOM_PRODUCT', product: normalizeCustomProduct(product) })
      },
      removeCustomProduct(id) {
        dispatch({ type: 'REMOVE_CUSTOM_PRODUCT', id })
      },
      hideProduct(id) {
        dispatch({ type: 'HIDE_PRODUCT', id })
      },
      restoreProduct(id) {
        dispatch({ type: 'RESTORE_PRODUCT', id })
      },
      addToCart(id) {
        dispatch({ type: 'ADD_TO_CART', id })
      },
      setCartQuantity(id, quantity) {
        dispatch({ type: 'SET_CART_QUANTITY', id, quantity })
      },
      removeFromCart(id) {
        dispatch({ type: 'REMOVE_FROM_CART', id })
      },
      clearCart() {
        dispatch({ type: 'CLEAR_CART' })
      },
    }),
    [
      state.apiProducts,
      allProducts,
      cartCount,
      cartItems,
      cartTotals,
      customProductCount,
      state.customProducts,
      state.error,
      hiddenProductCount,
      state.hiddenProductIds,
      state.status,
      visibleProducts,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
