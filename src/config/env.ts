const ENV_DEFAULTS: Record<keyof ImportMetaEnv, string> = {
  VITE_DUMMYJSON_API_URL: 'https://dummyjson.com',
  VITE_JSONPLACEHOLDER_API_URL: 'https://jsonplaceholder.typicode.com',
  VITE_USERS_LIMIT: '9',
  VITE_MESSAGES_LIMIT: '10',
  VITE_POSTS_PREVIEW_LIMIT: '100',
  VITE_LOADING_DELAY_MS: '1800',
  VITE_MOBILE_LOADING_DELAY_MS: '800',
  VITE_PREVIEW_DURATION_MS: '900',
  VITE_HONEYCOMB_CYCLE_INTERVAL_MS: '2200',
  VITE_MOBILE_LOADING_CYCLE_MS: '2800',
}

function readEnv(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key]
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim()
  }

  return ENV_DEFAULTS[key]
}

function readEnvNumber(key: keyof ImportMetaEnv): number {
  const parsed = Number(readEnv(key))

  if (!Number.isFinite(parsed)) {
    throw new Error(
      `Invalid number for environment variable "${key}". Expected a numeric value.`,
    )
  }

  return parsed
}

export const env = {
  dummyJsonApiUrl: readEnv('VITE_DUMMYJSON_API_URL'),
  jsonPlaceholderApiUrl: readEnv('VITE_JSONPLACEHOLDER_API_URL'),
  usersLimit: readEnvNumber('VITE_USERS_LIMIT'),
  messagesLimit: readEnvNumber('VITE_MESSAGES_LIMIT'),
  postsPreviewLimit: readEnvNumber('VITE_POSTS_PREVIEW_LIMIT'),
  loadingDelayMs: readEnvNumber('VITE_LOADING_DELAY_MS'),
  mobileLoadingDelayMs: readEnvNumber('VITE_MOBILE_LOADING_DELAY_MS'),
  previewDurationMs: readEnvNumber('VITE_PREVIEW_DURATION_MS'),
  honeycombCycleIntervalMs: readEnvNumber('VITE_HONEYCOMB_CYCLE_INTERVAL_MS'),
  mobileLoadingCycleMs: readEnvNumber('VITE_MOBILE_LOADING_CYCLE_MS'),
} as const
