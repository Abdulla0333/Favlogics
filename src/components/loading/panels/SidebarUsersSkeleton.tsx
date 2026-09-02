export function SidebarUsersSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="inbox-sidebar-users-skeleton" aria-busy="true" aria-label="Loading users">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="inbox-sidebar-row inbox-sidebar-row--skeleton">
          <span className="inbox-sidebar-user-avatar inbox-sidebar-user-avatar--skeleton" />
          <span className="inbox-sidebar-skeleton-line skeleton-shimmer" />
        </div>
      ))}
    </div>
  )
}
