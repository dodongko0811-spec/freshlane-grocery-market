# FreshLane Grocery Market

FreshLane Grocery Market is a React grocery storefront inspired by retail catalog layouts. It uses a free public product API for live grocery data, plus local browser storage for custom inventory and cart state.

Live site: [https://freshlane-grocery-market.web.app](https://freshlane-grocery-market.web.app)

## Features

- Live grocery catalog from a free API
- Category filters, search, and sorting
- Product add-to-cart flow
- Local inventory management for adding, editing, hiding, restoring, and deleting products
- Persistent cart and inventory state with `localStorage`
- Responsive layout for desktop and mobile

## Stack

- React
- React Router
- Vite
- Free product API: DummyJSON groceries

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- Custom products are stored locally in the browser.
- Hiding a product removes it from the storefront and lets you restore it later from the Inventory page.
- Checkout is a local demo flow, so no order is sent to a server.
- Firebase Hosting serves the production build from `dist/`.
