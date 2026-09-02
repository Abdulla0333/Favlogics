import { useEffect, useState } from 'react'
import { Lottie } from 'lottie-react'

interface AnimatedEnergyRingProps {
  compact?: boolean
}

export function AnimatedEnergyRing({ compact = false }: AnimatedEnergyRingProps) {
  const [animation, setAnimation] = useState<object | null>(null)

  useEffect(() => {
    let cancelled = false

    void import('../../assets/lottie/energy-ring.json').then((module) => {
      if (!cancelled) setAnimation(module.default)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div
      className={`landing-energy-ring ${compact ? 'landing-energy-ring--compact' : ''}`}
      aria-hidden
    >
      <div className="landing-energy-ring-blend">
        {animation ? (
          <Lottie
            src={animation}
            loop
            autoplay
            className="landing-energy-ring-lottie"
          />
        ) : null}
      </div>
    </div>
  )
}
