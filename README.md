# Elitecare Multispeciality Hospital

React + Vite + TypeScript website using React Router, with static HTML prerendering for public routes.
Public pages use a clinical blue accent palette with reduced-motion-aware transitions.

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

The six supplied original photographs are kept in `src/assets/hospital-photo-sources/`. The hospital front image `hospitalfrontimages.png` is converted into compressed, responsive WebP sizes in `public/images/`; page markup selects the appropriate size, and below-the-fold photos load lazily. The front image is prioritized for the homepage and used in social sharing metadata. The supplied logo at `src/assets/logo.png` is copied to `public/logo.png` and used for the favicon and touch icons. Vercel caches image and icon responses for a week with stale-while-revalidate.

## SEO documentation

See [docs/seo-launch-checklist.md](./docs/seo-launch-checklist.md) for the page keyword/title map, Google Business Profile checklist, Search Console setup, responsible local authority actions, and deployment limitations.

## Supplied contact information

The owner supplied the hospital name, phone number, street address, doctor names and qualifications, and six photographs. Doctor qualifications are displayed as supplied; verify them before publication. Contact the hospital to verify availability-dependent services and home visits. This website does not accept online enquiries. No opening hours or external Google-account changes have been added.
