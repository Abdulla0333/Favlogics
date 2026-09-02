import { ERROR_MESSAGES } from '../constants'

export function getErrorMessage(
  error: unknown,
  fallback = ERROR_MESSAGES.loadInbox,
): string {
  if (error instanceof Error && error.message) return error.message
  return fallback
}
