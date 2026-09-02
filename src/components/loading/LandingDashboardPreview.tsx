import type { ReactNode } from "react";
import { DashboardSkeletonPreview } from "./DashboardSkeletonPreview";

interface LandingDashboardPreviewProps {
  isLoaded?: boolean;
  loadedContent?: ReactNode;
  className?: string;
}

export function LandingDashboardPreview({
  isLoaded = false,
  loadedContent,
  className = "",
}: LandingDashboardPreviewProps) {
  return (
    <div className={`landing-dashboard-panel ${className}`.trim()}>
      <div
        className={`landing-dashboard-stage ${
          isLoaded ? "landing-dashboard-stage--loaded" : ""
        }`}
      >
        {!isLoaded && (
          <div className="landing-dashboard-layer landing-dashboard-layer--skeleton">
            <DashboardSkeletonPreview />
          </div>
        )}
        {isLoaded && loadedContent && (
          <div className="landing-dashboard-layer landing-dashboard-layer--loaded landing-dashboard-layer--instant">
            {loadedContent}
          </div>
        )}
      </div>
    </div>
  );
}
