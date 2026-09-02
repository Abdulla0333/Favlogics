import { useState } from 'react'
import { ERROR_MESSAGES } from '@/constants'
import { SidebarUsersSkeleton } from '@/components/loading/panels/SidebarUsersSkeleton'
import { Drawer, SidebarIcon } from '@/components/ui'
import type { SidebarUser } from '@/types'

const INBOX_ITEMS = [
  { id: 'my-inbox', label: 'My Inbox', count: null, icon: 'profile' as const },
  { id: 'all', label: 'All', count: 28, icon: 'people' as const },
  { id: 'unassigned', label: 'Unassigned', count: 5, icon: 'unassigned' as const },
] as const

const TEAM_ITEMS = [
  { id: 'sales', label: 'Sales', count: 7, icon: 'team-sales' as const },
  { id: 'support', label: 'Customer Support', count: 16, icon: 'team-support' as const },
] as const

const CHANNEL_ITEMS = [
  { id: 'whatsapp', label: 'Fit4Life', icon: 'whatsapp' as const },
  { id: 'instagram', label: 'Fit4Life', icon: 'instagram' as const },
] as const

interface InboxSidebarProps {
  users: SidebarUser[]
  isLoadingUsers: boolean
  isOpen: boolean
  isMobile: boolean
  selectedUserId: number | null
  onSelectUser: (userId: number) => void
  onClose: () => void
}

export function InboxSidebar({
  users,
  isLoadingUsers,
  isOpen,
  isMobile,
  selectedUserId,
  onSelectUser,
  onClose,
}: InboxSidebarProps) {
  const [activeInboxId, setActiveInboxId] = useState<(typeof INBOX_ITEMS)[number]['id']>('my-inbox')
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null)
  const [activeChannelId, setActiveChannelId] = useState('whatsapp')
  const [teamsOpen, setTeamsOpen] = useState(true)
  const [usersOpen, setUsersOpen] = useState(true)
  const [channelsOpen, setChannelsOpen] = useState(true)

  function handleSelectUser(userId: number) {
    onSelectUser(userId)
    if (isMobile) onClose()
  }

  const content = (
    <>
      <div className="inbox-sidebar-header">
        <h2 className="inbox-sidebar-title">Inbox</h2>
        {isMobile && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inbox menu"
            className="inbox-sidebar-close"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="inbox-sidebar-content scrollbar-thin">
        <div className="inbox-sidebar-nav">
          {INBOX_ITEMS.map((item) => {
            const isActive = activeInboxId === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveInboxId(item.id)}
                className={`inbox-sidebar-row ${isActive ? 'inbox-sidebar-row--active' : ''}`}
              >
                <span className="inbox-sidebar-row-main">
                  <SidebarIcon name={item.icon} className="sidebar-icon sidebar-icon--row" />
                  <span className="inbox-sidebar-row-label inbox-sidebar-row-label--nav">
                    {item.label}
                  </span>
                </span>
                {item.count !== null && (
                  <span className="inbox-sidebar-count">{item.count}</span>
                )}
              </button>
            )
          })}
        </div>

        <SectionToggle
          label="Teams"
          open={teamsOpen}
          onToggle={() => setTeamsOpen((current) => !current)}
        />
        {teamsOpen && (
          <div className="inbox-sidebar-group">
            {TEAM_ITEMS.map((item) => {
              const isActive = activeTeamId === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTeamId(item.id)}
                  className={`inbox-sidebar-row ${isActive ? 'inbox-sidebar-row--selected' : ''}`}
                >
                  <span className="inbox-sidebar-row-main">
                    <SidebarIcon name={item.icon} className="sidebar-icon sidebar-icon--row" />
                    <span className="inbox-sidebar-row-label">{item.label}</span>
                  </span>
                  <span className="inbox-sidebar-count">{item.count}</span>
                </button>
              )
            })}
          </div>
        )}

        <SectionToggle
          label="Users"
          open={usersOpen}
          onToggle={() => setUsersOpen((current) => !current)}
        />
        {usersOpen && (
          <div className="inbox-sidebar-group">
            {isLoadingUsers ? (
              <SidebarUsersSkeleton />
            ) : users.length === 0 ? (
              <p className="inbox-sidebar-empty">{ERROR_MESSAGES.loadUsers}</p>
            ) : (
              users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  isActive={selectedUserId === user.id}
                  onSelect={() => handleSelectUser(user.id)}
                />
              ))
            )}
          </div>
        )}

        <SectionToggle
          label="Channels"
          open={channelsOpen}
          onToggle={() => setChannelsOpen((current) => !current)}
        />
        {channelsOpen && (
          <div className="inbox-sidebar-channels">
            {CHANNEL_ITEMS.map((item) => {
              const isActive = activeChannelId === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveChannelId(item.id)}
                  className={`inbox-sidebar-channel ${isActive ? 'inbox-sidebar-channel--active' : ''}`}
                >
                  <span className="inbox-sidebar-row-main">
                    {item.icon === 'whatsapp' ? (
                      <span className="inbox-sidebar-channel-icon inbox-sidebar-channel-icon--whatsapp">
                        <SidebarIcon
                          name="whatsapp"
                          className="sidebar-icon sidebar-icon--channel"
                        />
                      </span>
                    ) : (
                      <span className="inbox-sidebar-channel-icon inbox-sidebar-channel-icon--instagram">
                        <SidebarIcon
                          name="instagram"
                          className="sidebar-icon sidebar-icon--instagram"
                        />
                      </span>
                    )}
                    <span className="inbox-sidebar-row-label">{item.label}</span>
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </>
  )

  if (isMobile) {
    return (
      <Drawer
        variant="sidebar"
        open={isOpen}
        onClose={onClose}
        closeLabel="Close inbox menu"
      >
        <aside className="dashboard-panel inbox-sidebar inbox-sidebar--drawer flex h-full w-[min(280px,88vw)] flex-col">
          {content}
        </aside>
      </Drawer>
    )
  }

  if (!isOpen) {
    return null
  }

  return (
    <aside className="dashboard-panel inbox-sidebar inbox-sidebar--desktop hidden h-full w-[168px] shrink-0 flex-col lg:flex">
      {content}
    </aside>
  )
}

function SectionToggle({
  label,
  open,
  onToggle,
}: {
  label: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="inbox-sidebar-section-toggle"
    >
      <span>{label}</span>
      <SidebarIcon
        name="chevron"
        className={`sidebar-icon sidebar-icon--chevron ${open ? 'sidebar-icon--chevron-open' : ''}`}
      />
    </button>
  )
}

function UserRow({
  user,
  isActive,
  onSelect,
}: {
  user: SidebarUser
  isActive: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`inbox-sidebar-row inbox-sidebar-user-row ${isActive ? 'inbox-sidebar-row--active' : ''}`}
    >
      <span className="inbox-sidebar-row-main">
        <span className="inbox-sidebar-user-avatar">
          <SidebarIcon name="user" className="sidebar-icon sidebar-icon--user" />
        </span>
        <span className="inbox-sidebar-row-label inbox-sidebar-row-label--user">
          {user.name}
        </span>
      </span>
      {user.count !== null && (
        <span className="inbox-sidebar-count">{user.count}</span>
      )}
    </button>
  )
}
