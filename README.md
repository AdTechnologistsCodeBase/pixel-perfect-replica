# Elitecare Multispeciality Hospital

React + Vite + TypeScript website using React Router, with static HTML prerendering for public routes.

## Development

```sh
bun install
bun run dev
```

Build and preview the production bundle:

```sh
bun run build
bun run preview
```

## Deploy to Vercel

Configure the Vercel project with:

- Framework preset: Vite
- Install command: `bun install`
- Build command: `bun run build`
- Output directory: `dist`

The production build prerenders each public route into static HTML so page content, titles, canonical URLs, social metadata, and structured data are present before client-side JavaScript runs. `vercel.json` keeps trailing-slash URLs consistent and redirects legacy paths. A generated `404.html` preserves the not-found page without treating unknown URLs as successful homepage responses. No runtime server is required.

## Hospital photographs

The six supplied original photographs are kept in `src/assets/hospital-photo-sources/`. The build converts them into compressed, responsive WebP sizes in `public/images/`; page markup selects the appropriate size, and below-the-fold photos load lazily. The hospital exterior is prioritized for the homepage and used in social sharing metadata. The supplied logo generates the favicon and touch icons from `src/assets/elitecare-logo.png`. Vercel caches image and icon responses for a week with stale-while-revalidate.

## SEO documentation

See [docs/seo-launch-checklist.md](./docs/seo-launch-checklist.md) for the page keyword/title map, Google Business Profile checklist, Search Console setup, responsible local authority actions, and deployment limitations.

## Supplied contact information

The owner supplied the hospital name, phone number, street address, and six photographs. Contact the hospital to verify availability-dependent services and home visits. This website does not accept online enquiries. No doctor profiles, opening hours, credentials, or external Google-account changes have been added.
