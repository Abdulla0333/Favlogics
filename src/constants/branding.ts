import { ACTIVE_USER_FALLBACK } from './inbox'

export const APP_BRANDING = {
  productName: 'BOXpad',
  activeUserDisplayName: `${ACTIVE_USER_FALLBACK.firstName} ${ACTIVE_USER_FALLBACK.lastName}`,
} as const
