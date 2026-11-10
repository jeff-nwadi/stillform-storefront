# Stillform storefront

Frontend-only Next.js storefront built to the Stillform Paper design. The shop, product, cart and story experiences are connected; sample catalog data and cart persistence are local to the browser.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS 4
- shadcn/ui configuration with local Button and Input primitives
- Anime.js for the homepage entrance motion
- Lenis for smooth scrolling, disabled when reduced motion is requested
- Zustand for browser cart and favorites state, persisted to local storage

## Frontend boundary

The product catalog is sample data in `src/lib/products.ts`. Checkout is intentionally a disabled visual placeholder. No database, authentication, payment, or server-side security integration is included; backend integration can be added separately.

## Fonts and imagery

The design uses `Canela Text` as the preferred display face and falls back to Instrument Serif or Georgia. Add a properly licensed Canela font file to serve that face in production. DM Sans is the body font fallback stack. Product and editorial images currently use Unsplash URLs.
