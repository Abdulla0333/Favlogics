import { Navigate, Route, Routes } from 'react-router-dom'
import { InboxPage } from '../pages/InboxPage'
import { LoadingPage } from '../pages/LoadingPage'
import { ROUTES } from './paths'

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.loading} element={<LoadingPage />} />
      <Route path={ROUTES.inbox} element={<InboxPage />} />
      <Route path="*" element={<Navigate to={ROUTES.loading} replace />} />
    </Routes>
  )
}
