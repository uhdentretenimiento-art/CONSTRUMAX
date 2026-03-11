# AI Rules for this App

## Tech stack (quick facts)

- **Framework:** Next.js (App Router)
- **UI:** React 19 + TypeScript
- **Styling:** Tailwind CSS (v4) via `src/app/globals.css`
- **Component primitives:** Radix UI (via shadcn/ui-style components)
- **Design system components:** shadcn/ui components live in `src/components/ui/*`
- **Icons:** `lucide-react`
- **Animation:** `framer-motion`
- **Toasts/notifications:** `sonner`
- **Carousel/slider:** `swiper`
- **Class utilities:** `clsx`, `class-variance-authority`, `tailwind-merge` (typically via `src/lib/utils.ts`)

## Library usage rules (do this, not that)

### Routing & pages
- **Use Next.js file-based routing** under `src/app/**`.
- **Do not add React Router**. Navigation should use Next components/utilities (e.g., `next/link`, `next/navigation`).

### Components
- Prefer composing from **shadcn/ui components in `src/components/ui`**.
- If you need a new reusable UI piece, put it in:
  - `src/components/` (app-specific components)
  - `src/components/ui/` (generic UI primitives/patterns consistent with the existing UI folder)
- **Do not edit third-party code**; only modify local components.

### Styling
- Use **Tailwind CSS classes** for styling (layout, spacing, typography, colors).
- For conditional/variant classnames:
  - Use the existing helpers from `src/lib/utils.ts` (commonly `cn(...)`).
  - Use **CVA** (`class-variance-authority`) for variants when a component has multiple visual states.

### Icons
- Use **`lucide-react`** for all icons.
- Keep icons inline as React components; avoid SVG files unless there’s a strong reason.

### Animation
- Use **`framer-motion`** for UI animations/transitions.
- Prefer subtle, performance-friendly animations; avoid animating layout-heavy properties when possible.

### Feedback / notifications
- Use **`sonner`** for toast notifications.
- Keep toasts short and actionable.

### Carousels / sliders
- Use **`swiper`** for any carousel/slider UI.
- Prefer simple configurations; avoid adding another carousel library.

### Data & types
- Static content should live in `src/data/*`.
- Shared types go in `src/types/*`.
- Shared non-UI logic/helpers go in `src/lib/*`.

### Server vs Client Components (Next App Router)
- Default to **Server Components**.
- Add `"use client"` only when you need client-only features (state, effects, browser APIs, event handlers).

### SEO & metadata
- Use Next.js metadata conventions in `src/app/*` (e.g., `layout.tsx`, route handlers, sitemap routes).
- For structured data, use the existing patterns/components in `src/components/StructuredData.tsx` and schemas in `src/lib/*`.
