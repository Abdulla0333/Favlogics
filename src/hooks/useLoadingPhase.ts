import { useEffect, useState } from 'react'
import { LOADING_TIMINGS } from '../constants'

export type LoadingPhase = 'skeleton' | 'preview' | 'ready'

export function useLoadingPhase(
  isBootstrapping: boolean,
  honeycombCycleDone: boolean,
) {
  const [phase, setPhase] = useState<LoadingPhase>('skeleton')
  const canAdvance = !isBootstrapping && honeycombCycleDone

  useEffect(() => {
    if (!canAdvance) {
      setPhase('skeleton')
      return
    }

    setPhase('preview')

    const timer = window.setTimeout(() => {
      setPhase('ready')
    }, LOADING_TIMINGS.previewDurationMs)

    return () => {
      window.clearTimeout(timer)
    }
  }, [canAdvance])

  return phase
}
