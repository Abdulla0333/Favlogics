import type { ReactNode } from 'react'
import { BREAKPOINTS, HONEYCOMB_ITEMS } from '@/constants'
import { useLandingScale, useMediaQuery, LANDING_DESIGN_WIDTH } from '@/hooks'
import { AnimatedEnergyRing } from './AnimatedEnergyRing'
import { CircularGlowBackground } from './CircularGlowBackground'
import { HoneycombGrid } from './HoneycombButton'
import { LandingDashboardPreview } from './LandingDashboardPreview'
import { LoadingHeroText } from './LoadingHeroText'
import { MobileLoadingScreen } from './MobileLoadingScreen'

interface LoadingScreenProps {
  dashboardLoaded?: boolean
  dashboardContent?: ReactNode
  onHoneycombCycleComplete?: () => void
}

export function LoadingScreen({
  dashboardLoaded = false,
  dashboardContent,
  onHoneycombCycleComplete,
}: LoadingScreenProps) {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.mobileMax}px)`)
  const { ref, scale, scaledWidth, scaledHeight } = useLandingScale()

  const dashboardPreview = (
    <LandingDashboardPreview
      isLoaded={dashboardLoaded}
      loadedContent={dashboardContent}
    />
  )

  return (
    <>
      <MobileLoadingScreen
        dashboardLoaded={dashboardLoaded}
        dashboardContent={dashboardContent}
        onHoneycombCycleComplete={
          isMobile ? onHoneycombCycleComplete : undefined
        }
      />

      <div className="landing-page landing-page--desktop">
        <div className="landing-shell">
          <div className="landing-frame" ref={ref}>
            <CircularGlowBackground />

            <div className="landing-frame-inner">
              <div
                className="landing-scale-slot"
                style={{ width: scaledWidth, height: scaledHeight }}
              >
                <div
                  className="landing-scaled-content"
                  style={{
                    width: LANDING_DESIGN_WIDTH,
                    transform: `scale(${scale})`,
                  }}
                >
                  <div className="landing-glass-panel">
                    <section className="landing-hero-section">
                      <HoneycombGrid
                        items={HONEYCOMB_ITEMS}
                        onCycleComplete={
                          isMobile ? undefined : onHoneycombCycleComplete
                        }
                      />
                      <div className="landing-ring-slot">
                        <AnimatedEnergyRing />
                      </div>
                      <div className="landing-hero-text">
                        <LoadingHeroText />
                      </div>
                    </section>

                    <div className="landing-dashboard-anchor">
                      {dashboardPreview}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
