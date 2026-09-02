import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { InboxDashboard } from '../components/layout/InboxDashboard'
import { LoadingScreen } from '../components/loading/LoadingScreen'
import { useAppContext } from '../context/AppProvider'
import { useInboxDashboardProps } from '../hooks/useInboxDashboardProps'
import { ROUTES } from '../routes/paths'

export function LoadingPage() {
  const navigate = useNavigate()
  const { phase, isDataReady, setHoneycombCycleDone } = useAppContext()
  const dashboardProps = useInboxDashboardProps()

  useEffect(() => {
    if (phase === 'ready') {
      navigate(ROUTES.inbox, { replace: true })
    }
  }, [phase, navigate])

  return (
    <LoadingScreen
      onHoneycombCycleComplete={() => setHoneycombCycleDone(true)}
      dashboardLoaded={isDataReady}
      dashboardContent={
        isDataReady ? (
          <InboxDashboard
            {...dashboardProps}
            className="landing-dashboard-content h-full w-full min-w-0 bg-white lg:h-[665px] lg:w-[1200px] lg:min-w-[1200px]"
          />
        ) : undefined
      }
    />
  )
}
