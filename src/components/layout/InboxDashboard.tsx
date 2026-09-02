import { useEffect, useState } from 'react'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { ChatPanel } from './ChatPanel'
import { ConversationList } from './ConversationList'
import { InboxSidebar } from './InboxSidebar'
import { TopNavbar } from './TopNavbar'
import { UserDetailPanel } from './UserDetailPanel'
import type { InboxDashboardProps } from '../../types'

export function InboxDashboard({
  conversations,
  sidebarUsers,
  isLoadingSidebarUsers,
  isLoadingConversations,
  selectedId,
  selectedConversation,
  messages,
  userDetails,
  searchQuery,
  onSearchChange,
  onSelect,
  onSend,
  error,
  isLoadingMessages,
  isLoadingUserDetails,
  isSending,
  showMobileChat,
  onShowMobileChat,
  className = '',
}: InboxDashboardProps) {
  const isLgUp = useMediaQuery('(min-width: 1024px)')
  const isXlUp = useMediaQuery('(min-width: 1280px)')
  const [detailPanelOpen, setDetailPanelOpen] = useState(true)
  const [inboxSidebarOpen, setInboxSidebarOpen] = useState(false)
  const [mobileDetailsOpen, setMobileDetailsOpen] = useState(false)

  useEffect(() => {
    setInboxSidebarOpen(isLgUp)
  }, [isLgUp])

  useEffect(() => {
    if (!showMobileChat) {
      setMobileDetailsOpen(false)
    }
  }, [showMobileChat])

  useBodyScrollLock((inboxSidebarOpen && !isLgUp) || (mobileDetailsOpen && !isXlUp))

  return (
    <div className={`flex h-full flex-col overflow-hidden ${className}`}>
      <TopNavbar />

      {error && (
        <div className="dashboard-error-banner px-4 py-2 text-center text-[12px]">
          {error}
        </div>
      )}

      <div className="dashboard-canvas flex min-h-0 flex-1 gap-1.5 p-1 max-sm:gap-1 max-sm:p-1 sm:gap-2 sm:p-2">
        <InboxSidebar
          users={sidebarUsers}
          isLoadingUsers={isLoadingSidebarUsers}
          isOpen={inboxSidebarOpen}
          isMobile={!isLgUp}
          selectedUserId={selectedId}
          onSelectUser={onSelect}
          onClose={() => setInboxSidebarOpen(false)}
        />

        <div
          className={`${
            showMobileChat ? 'hidden lg:flex' : 'flex'
          } h-full min-h-0 min-w-0 flex-1 lg:w-[250px] lg:flex-none lg:shrink-0`}
        >
          <ConversationList
            conversations={conversations}
            selectedId={selectedId}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            isInboxSidebarOpen={inboxSidebarOpen}
            onToggleInboxSidebar={() => setInboxSidebarOpen((open) => !open)}
            isLoading={isLoadingConversations}
            onSelect={(id) => {
              onSelect(id)
              onShowMobileChat(true)
            }}
          />
        </div>

        <div
          className={`${
            showMobileChat ? 'flex' : 'hidden'
          } h-full min-h-0 min-w-0 w-full flex-1 lg:flex`}
        >
          <ChatPanel
            conversation={selectedConversation}
            messages={messages}
            isLoading={isLoadingConversations || isLoadingMessages}
            isSending={isSending}
            onSend={onSend}
            onBack={() => onShowMobileChat(false)}
            onOpenDetails={
              !isXlUp && selectedConversation
                ? () => setMobileDetailsOpen(true)
                : undefined
            }
          />
        </div>

        <UserDetailPanel
          conversation={selectedConversation}
          userDetails={userDetails}
          isLoading={isLoadingUserDetails}
          isOpen={detailPanelOpen}
          onToggle={() => setDetailPanelOpen((open) => !open)}
          mobileOpen={mobileDetailsOpen}
          onMobileClose={() => setMobileDetailsOpen(false)}
          isMobile={!isXlUp}
        />
      </div>
    </div>
  )
}
