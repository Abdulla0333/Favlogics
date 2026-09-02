# Favlogix Front-End Assessment

**BOXpad Inbox Dashboard** — React + TypeScript implementation of the [Figma design](https://www.figma.com/design/YTNzTHOKnI6rJZbtzjyU0r/Front-end-Assessment).

---

## For reviewers (quick start)

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

| Step | What to check |
|------|----------------|
| 1 | `/` — loading screen: honeycomb animation, skeleton, then dashboard preview |
| 2 | Wait for cycle (~13s desktop / ~3s mobile) → auto-navigate to `/inbox` |
| 3 | `/inbox` — sidebar, conversations, chat, user details |
| 4 | Search conversations, select a thread, send a message |
| 5 | Resize to mobile — responsive chat/detail panels |
| 6 | Refresh `/inbox` — SPA routing works |

```bash
npm run build
npm run typecheck
```

---

## What was implemented

- **Loading flow** — skeleton → preview → ready (API + honeycomb cycle gated)
- **Figma-aligned UI** — honeycomb hero, Lottie energy ring, dashboard layout
- **Live APIs** — DummyJSON users + JSONPlaceholder messages (TanStack Query)
- **Routing** — `/` loading, `/inbox` dashboard
- **Responsive** — mobile loading layout; collapsible panels on small screens
- **Clean architecture** — typed env, constants, utils, API service layer, reusable UI

---

## Tech stack

React 19 · TypeScript (strict) · Vite 6 · Tailwind CSS v4 · TanStack Query v5 · React Router v7 · lottie-react

---

## Key files to review

| File | Purpose |
|------|---------|
| `src/hooks/useAppData.ts` | Data orchestration, search, send message |
| `src/services/api/inboxService.ts` | API calls & mapping |
| `src/context/AppProvider.tsx` | Loading phase + shared state |
| `src/components/layout/InboxDashboard.tsx` | Dashboard composition |
| `src/components/loading/LoadingScreen.tsx` | Loading UX |
| `src/components/ui/` | Reusable primitives (`AssetIcon`, `IconButton`, `Drawer`, etc.) |
| `src/utils/` | Pure helpers (`bootstrap`, `conversation`, `time`, `string`) |

---

## Project structure

```
src/
├── assets/
│   ├── figma/                    # Design-system SVGs by area
│   ├── hex/                      # Honeycomb landing icons
│   ├── lottie/energy-ring.json
│   └── landing-background.png
├── components/
│   ├── icons/                    # Inline SVG icons (ChevronDown)
│   ├── layout/                   # Dashboard panels
│   ├── loading/                  # Loading screen, skeletons, hero text
│   │   └── panels/               # Per-panel skeleton loaders
│   └── ui/                       # Reusable primitives + barrel export
│       ├── AssetIcon.tsx         # Base <img> icon
│       ├── createAssetIcon.tsx   # Factory for typed Figma icon maps
│       ├── IconButton.tsx        # Accessible icon button
│       ├── Drawer.tsx            # Mobile slide-over shell
│       └── index.ts
├── config/env.ts                 # App config (built-in defaults; optional local .env overrides)
├── constants/                    # API limits, timings, branding, messages
├── context/                      # AppProvider, ThemeProvider
├── hooks/                        # Data, media queries, loading phase (+ index.ts)
├── lib/queryClient.ts
├── pages/                        # LoadingPage, InboxPage
├── routes/
├── services/api/                 # client, routes, mappers, inboxService, index.ts
├── types/
└── utils/                        # bootstrap, conversation, delay, error, string, time
```

Import alias: `@/` → `src/` (e.g. `import { APP_BRANDING } from '@/constants'`).

---

## Environment keys (optional)

The app runs with built-in defaults in `src/config/env.ts`. To override locally, copy `.env.example` to `.env` and set only the keys you need:

- `VITE_DUMMYJSON_API_URL`
- `VITE_JSONPLACEHOLDER_API_URL`
- `VITE_USERS_LIMIT`
- `VITE_MESSAGES_LIMIT`
- `VITE_POSTS_PREVIEW_LIMIT`
- `VITE_LOADING_DELAY_MS`
- `VITE_MOBILE_LOADING_DELAY_MS`
- `VITE_PREVIEW_DURATION_MS`
- `VITE_HONEYCOMB_CYCLE_INTERVAL_MS`
- `VITE_MOBILE_LOADING_CYCLE_MS`

---

## Assumptions

- DummyJSON users → conversations; JSONPlaceholder posts → chat messages
- Sidebar badge counts are design placeholders
- Message send is mock POST with optimistic local update
- Left sidebar nav icons are visual only
- Energy ring: Lottie JSON (~809 KB), code-split and lazy-loaded

---

## Deploy

```bash
npm run build
```

Deploy `dist/` to Vercel or Netlify. `vercel.json` handles SPA routing on refresh.

---

## Submission notes

| Method | Notes |
|--------|-------|
| **GitHub repo** | Recommended for reviewers |
| **Zip** | Include source only (~1–1.5 MB). Exclude `node_modules`, `dist`, `.env` |
