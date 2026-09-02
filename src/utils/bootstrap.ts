import { BREAKPOINTS, LOADING_TIMINGS } from '@/constants'

export function getBootstrapDelayMs(): number {
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia(`(max-width: ${BREAKPOINTS.mobileMax}px)`).matches

  return isMobile
    ? LOADING_TIMINGS.mobileDelayMs
    : LOADING_TIMINGS.desktopDelayMs
}
