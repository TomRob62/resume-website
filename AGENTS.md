# AGENTS.md

## Coding Practices for Web Development with Next.js (SSG-first)

This project follows best practices for building a high-performance statically generated (SSG) Next.js website using the App Router and TypeScript. Conventions here prioritize fast build-time rendering, minimal client-side JavaScript, and CDN-friendly delivery.

### 1. Code Structure & Organization
- Use the `app/` directory and Server Components by default. Make client components explicit with `"use client"` only when necessary for interactivity.
- Organize components, hooks, and utilities in clearly named folders. Keep server-only logic separate from client code.
- Co-locate styles (Tailwind or CSS modules) with components where it improves readability.
- Keep files and functions small and focused. If a file grows >100 lines (excluding comments), extract helpers or child components.
- Document non-obvious behavior and public APIs with comments and exported types.

### 2. TypeScript & Type Safety
- Use strict TypeScript settings. Avoid `any` and prefer precise interfaces/types for props and shared data.
- Export shared types from a `types/` or `lib/types.ts` to avoid duplication.

### 3. Styling
- Use Tailwind CSS (with purge/content scanning) for tiny CSS bundles. Configure `content` so unused classes are removed.
- Prefer utility classes and small component-scoped styles over large runtime CSS-in-JS bundles.
- Keep global styles minimal (resets, base typography). Use semantic HTML and accessible markup.
 - Design mobile-first: build styles and layouts with the smallest viewport in mind, then scale up using Tailwind's responsive utilities (sm/md/lg/xl/2xl).
 - Use responsive container widths and max-widths (`container`, `max-w-*`) so content reads well on wide screens.
 - Ensure touch targets are large enough (recommended >= 44x44px) and provide adequate spacing for interactive elements on mobile.
 - Prefer fluid typography (clamp, responsive text utilities) and line-length limits for readability on desktop.
 - Respect safe-area insets (`env(safe-area-inset-*)`) for devices with notches, and include `meta viewport` in layout for correct scaling.

### 4. Data Fetching & State Management (SSG-focused)
- Prefer Server Components and static `fetch` calls so data is fetched at build time and emitted as HTML.
- Use `generateStaticParams` (App Router) to pre-render dynamic routes during the build.
- Use ISR (`revalidate`) for pages that need periodic updates instead of forcing dynamic rendering.
- Avoid client-side data fetching for content that can be pre-rendered; fetch on the client only for user-specific or interactive data.
- Keep global state minimal; use React Context or small client-state libraries only where needed for interactivity.

### 5. Performance (SSG & hydration)
These practices focus on producing small, fast-to-hydrate pages from SSG output.
- Server-first rendering: keep as much UI as possible in Server Components to reduce client JavaScript.
- Minimize client component surface area: only mark components `use client` when interactivity requires it.
- Dynamic imports & code splitting: lazy-load heavy or rarely-used client components (e.g., charts, editors) with `next/dynamic` and `ssr: false` where appropriate.
- Image optimization: use Next.js `<Image />` to automatically size, optimize, and lazy-load images; prefer responsive `sizes` and `priority` for critical images.
 - Responsive images: supply appropriate `sizes` and let `<Image />` generate srcsets; for background images, serve multiple resolutions and prefer CSS `image-set` or small decorative images.
- Fonts: use `next/font` or preload critical fonts to avoid layout shifts.
- Bundle size: tree-shake, import only what you need, and analyze bundles during CI (bundle analyzer) to catch regressions.
- Hydration cost: avoid expensive computations during render; memoize heavy computations and split large components.
- CSS size: configure Tailwind to purge unused classes and prefer utility-first for smaller CSS output.
- Network: serve static HTML and assets via CDN, set proper caching headers for immutable assets, and use preconnect/preload for critical resources.

### 11. Responsive Design & Testing
- Test layouts at common breakpoints and viewport sizes (e.g., 360x640, 375x812, 768x1024, 1024x1366, 1440x900). Prioritize mobile-first testing.
- Use browser device emulation and physical devices where possible. Run Lighthouse audits in mobile and desktop modes and prioritize mobile FCP/CLS metrics.
- Visual regression: add snapshot testing or visual diffing (Percy, Chromatic, Playwright/Compare) for critical pages across viewports.
- Touch & keyboard: verify tap targets, gestures, and keyboard navigation work properly on mobile and desktop.
- Performance budgets: set size/time budgets for JS, images, and fonts in CI; fail the build if budgets are exceeded.
- Accessibility on mobile: test with screen readers and ensure color contrast and hit areas are sufficient on smaller screens.

### 6. Accessibility (a11y)
- Use semantic HTML and ARIA attributes where appropriate.
- Ensure keyboard accessibility for all interactive controls.
- Test with screen readers and automated a11y tools (axe, Lighthouse).

### 7. Linting, Formatting & CI
- Use ESLint, TypeScript strict mode, and Prettier. Fail CI on lint/type errors.
- Add bundle size and Lighthouse checks to CI to detect regressions early.

### 8. Testing
- Write unit and integration tests for components and utilities.
- Use Jest and React Testing Library; add end-to-end checks (Cypress, Playwright) for critical flows.

### 9. Build, Caching & Deployment
- Prefer SSG + ISR for fast edge delivery: static HTML served from CDN, revalidate periodically.
- For very frequently changing content, use on-demand revalidation or serverless functions rather than forcing full rebuilds.
- Configure `Cache-Control` headers for static assets and HTML as appropriate (long TTL for immutable assets, shorter for HTML with revalidation).
- Consider `next export` only for extremely simple sites without server-side features; otherwise rely on Next.js static HTML + CDN hosting.

### 10. Security
- Never commit secrets. Use environment variables and keep `.env*` out of version control.
- Validate and sanitize all user input and external data.



