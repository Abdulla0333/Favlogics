import { useMemo, useState } from 'react'
import { APP_BRANDING, ERROR_MESSAGES } from '@/constants'
import { ConversationListSkeleton } from '@/components/loading/panels/ConversationListSkeleton'
import { Avatar, ConversationIcon } from '@/components/ui'
import {
  formatConversationTimestamp,
  getConversationTimestampOrder,
} from '@/utils'
import type { Conversation } from '@/types'

interface ConversationListProps {
  conversations: Conversation[]
  selectedId: number | null
  searchQuery: string
  onSearchChange: (value: string) => void
  onSelect: (id: number) => void
  isInboxSidebarOpen: boolean
  onToggleInboxSidebar: () => void
  isLoading?: boolean
}

type StatusFilter = 'open' | 'all'
type SortOrder = 'newest' | 'oldest'

export function ConversationList({
  conversations,
  selectedId,
  searchQuery,
  onSearchChange,
  onSelect,
  isInboxSidebarOpen,
  onToggleInboxSidebar,
  isLoading = false,
}: ConversationListProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')
  const [unreadOnly, setUnreadOnly] = useState(false)
  const [readIds, setReadIds] = useState<Set<number>>(() => new Set())

  const visibleConversations = useMemo(() => {
    let list = conversations.filter((conversation) => {
      const isUnread = conversation.unread && !readIds.has(conversation.id)

      if (statusFilter === 'open' && !isUnread) return false
      if (unreadOnly && !isUnread) return false

      return true
    })

    list = [...list].sort((left, right) => {
      const leftOrder = getConversationTimestampOrder(left.timestamp)
      const rightOrder = getConversationTimestampOrder(right.timestamp)
      return sortOrder === 'newest' ? leftOrder - rightOrder : rightOrder - leftOrder
    })

    return list
  }, [conversations, readIds, sortOrder, statusFilter, unreadOnly])

  function handleSelect(conversationId: number) {
    setReadIds((current) => {
      const next = new Set(current)
      next.add(conversationId)
      return next
    })
    onSelect(conversationId)
  }

  function handleCompose() {
    onSearchChange('')
    setStatusFilter('all')
    setUnreadOnly(false)
  }

  return (
    <section className="dashboard-panel conversation-list flex h-full w-full min-w-0 flex-col lg:w-[250px] lg:shrink-0">
      <div className="conversation-list-header">
        <div className="conversation-list-header-main">
          <div className="conversation-list-header-left">
            <button
              type="button"
              aria-label={isInboxSidebarOpen ? 'Hide inbox sidebar' : 'Show inbox sidebar'}
              aria-expanded={isInboxSidebarOpen}
              onClick={onToggleInboxSidebar}
              className="conversation-list-icon-button"
            >
              <ConversationIcon name="menu" className="conversation-icon conversation-icon--header" />
            </button>
            <h2 className="conversation-list-title">{APP_BRANDING.activeUserDisplayName}</h2>
          </div>
          <button
            type="button"
            aria-label="Compose"
            onClick={handleCompose}
            className="conversation-list-icon-button"
          >
            <ConversationIcon name="compose" className="conversation-icon conversation-icon--header" />
          </button>
        </div>
      </div>

      <div className="conversation-list-toolbar">
        <div className="conversation-list-search-row">
          <div className="conversation-list-search-field">
            <ConversationIcon name="search" className="conversation-icon conversation-icon--search" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search Chat"
              className="conversation-list-search-input"
            />
          </div>
          <button
            type="button"
            aria-label="Show unread only"
            aria-pressed={unreadOnly}
            onClick={() => setUnreadOnly((current) => !current)}
            className={`conversation-list-filter-button ${unreadOnly ? 'conversation-list-filter-button--active' : ''}`}
          >
            <ConversationIcon name="filter" className="conversation-icon conversation-icon--header" />
          </button>
        </div>

        <div className="conversation-list-filters">
          <FilterButton
            label={statusFilter === 'open' ? 'Open' : 'All'}
            active={statusFilter === 'open'}
            onClick={() =>
              setStatusFilter((current) => (current === 'open' ? 'all' : 'open'))
            }
          />
          <FilterButton
            label={sortOrder === 'newest' ? 'Newest' : 'Oldest'}
            active={sortOrder === 'oldest'}
            onClick={() =>
              setSortOrder((current) => (current === 'newest' ? 'oldest' : 'newest'))
            }
          />
        </div>
      </div>

      <div className="conversation-list-items scrollbar-thin">
        {isLoading ? (
          <ConversationListSkeleton />
        ) : visibleConversations.length === 0 ? (
          <p className="conversation-list-empty">
            {conversations.length === 0
              ? ERROR_MESSAGES.noConversations
              : 'No conversations match your filters.'}
          </p>
        ) : (
          <ul className="conversation-list-stack">
            {visibleConversations.map((conversation) => {
              const isActive = conversation.id === selectedId
              const isUnread =
                conversation.unread && !readIds.has(conversation.id)
              const colorIndex = conversations.findIndex(
                (item) => item.id === conversation.id,
              )

              return (
                <li key={conversation.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(conversation.id)}
                    className={`conversation-card ${isActive ? 'conversation-card--active' : ''}`}
                  >
                    <Avatar
                      name={conversation.name}
                      colorIndex={colorIndex >= 0 ? colorIndex : 0}
                    />
                    <div className="conversation-card-content">
                      <div className="conversation-card-top">
                        <p
                          className={`conversation-card-name ${isUnread ? 'conversation-card-name--unread' : ''}`}
                        >
                          {conversation.name}
                        </p>
                        <span className="conversation-card-time">
                          {formatConversationTimestamp(conversation.timestamp)}
                        </span>
                      </div>
                      <p className="conversation-card-preview">{conversation.preview}</p>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}

function FilterButton({
  label,
  active = false,
  onClick,
}: {
  label: string
  active?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`conversation-filter-button ${active ? 'conversation-filter-button--active' : ''}`}
    >
      <span>{label}</span>
      <ConversationIcon
        name="chevron-down"
        className="conversation-icon conversation-icon--chevron"
      />
    </button>
  )
}
