import { Navigate } from 'react-router-dom'
import { InboxDashboard } from '../components/layout/InboxDashboard'
import { useAppContext } from '../context/AppProvider'
import { useInboxDashboardProps } from '../hooks/useInboxDashboardProps'
import { ROUTES } from '../routes/paths'

export function InboxPage() {
  const { phase } = useAppContext()
  const dashboardProps = useInboxDashboardProps()

  if (phase !== 'ready') {
    return <Navigate to={ROUTES.loading} replace />
  }

  return (
    <div className="app-shell app-shell--enter h-[100dvh] overflow-hidden p-0 sm:p-1.5">
      <div className="app-shell-frame flex h-full flex-col overflow-hidden rounded-none sm:rounded-2xl">
        <InboxDashboard {...dashboardProps} />
      </div>
    </div>
  )
}
