/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DUMMYJSON_API_URL: string
  readonly VITE_JSONPLACEHOLDER_API_URL: string
  readonly VITE_USERS_LIMIT: string
  readonly VITE_MESSAGES_LIMIT: string
  readonly VITE_POSTS_PREVIEW_LIMIT: string
  readonly VITE_LOADING_DELAY_MS: string
  readonly VITE_MOBILE_LOADING_DELAY_MS: string
  readonly VITE_PREVIEW_DURATION_MS: string
  readonly VITE_HONEYCOMB_CYCLE_INTERVAL_MS: string
  readonly VITE_MOBILE_LOADING_CYCLE_MS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
