import { useEffect, useRef, useState } from 'react'
import { LANDING_LAYOUT } from '../constants'

export const LANDING_DESIGN_WIDTH = LANDING_LAYOUT.designWidth
export const LANDING_CONTENT_HEIGHT = LANDING_LAYOUT.contentHeight

export function useLandingScale() {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const update = () => {
      const { width } = element.getBoundingClientRect()
      const nextScale = Math.min(
        (width - LANDING_LAYOUT.framePadding) / LANDING_DESIGN_WIDTH,
        1,
      )
      setScale(nextScale > 0 ? nextScale : 1)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return {
    ref,
    scale,
    scaledWidth: LANDING_DESIGN_WIDTH * scale,
    scaledHeight: LANDING_CONTENT_HEIGHT * scale,
  }
}
