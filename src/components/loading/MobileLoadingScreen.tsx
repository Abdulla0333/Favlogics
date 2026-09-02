import { useEffect, type ReactNode } from "react";
import { LOADING_TIMINGS } from "../../constants";
import { AnimatedEnergyRing } from "./AnimatedEnergyRing";
import { LandingDashboardPreview } from "./LandingDashboardPreview";

interface MobileLoadingScreenProps {
  dashboardLoaded?: boolean;
  dashboardContent?: ReactNode;
  onHoneycombCycleComplete?: () => void;
}

export function MobileLoadingScreen({
  dashboardLoaded = false,
  dashboardContent,
  onHoneycombCycleComplete,
}: MobileLoadingScreenProps) {
  useEffect(() => {
    if (!onHoneycombCycleComplete) return;

    const timer = window.setTimeout(() => {
      onHoneycombCycleComplete();
    }, LOADING_TIMINGS.mobileCycleMs);

    return () => window.clearTimeout(timer);
  }, [onHoneycombCycleComplete]);

  return (
    <div className="mobile-loading-screen">
      <div className="mobile-loading-strip">
        <AnimatedEnergyRing compact />
        <div className="mobile-loading-strip-text">
          <p className="mobile-loading-strip-title">
            Extracting Information...
          </p>
          <p className="mobile-loading-strip-subtitle">
            Loading your inbox dashboard
          </p>
        </div>
      </div>

      <div className="mobile-loading-app">
        <div className="mobile-loading-app-card">
          <LandingDashboardPreview
            isLoaded={dashboardLoaded}
            loadedContent={dashboardContent}
            className="landing-dashboard-panel--fullscreen"
          />
        </div>
      </div>
    </div>
  );
}
