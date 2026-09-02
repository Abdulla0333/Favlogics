export const ROUTES = {
  loading: '/',
  inbox: '/inbox',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
