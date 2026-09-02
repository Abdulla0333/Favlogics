import { env } from '../config/env'

export const BREAKPOINTS = {
  mobileMax: 1023,
} as const

export const LOADING_TIMINGS = {
  desktopDelayMs: env.loadingDelayMs,
  mobileDelayMs: env.mobileLoadingDelayMs,
  previewDurationMs: env.previewDurationMs,
  honeycombIntervalMs: env.honeycombCycleIntervalMs,
  mobileCycleMs: env.mobileLoadingCycleMs,
} as const

export const LANDING_LAYOUT = {
  designWidth: 1392,
  contentHeight: 820,
  framePadding: 48,
  dashboardPreviewWidth: 1200,
  dashboardPreviewHeight: 665,
} as const

export const ERROR_MESSAGES = {
  loadInbox: 'Unable to load inbox data. Please refresh and try again.',
  sendMessage: 'Message could not be sent. Please try again.',
  loadUsers: 'Unable to load users.',
  noConversations: 'No conversations found.',
  selectConversation: 'Select a conversation to start messaging.',
} as const

export const QUERY_TIMINGS = {
  defaultStaleMs: 60_000,
  threadStaleMs: 30_000,
  retry: 1,
} as const
