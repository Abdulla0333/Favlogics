import { type FormEvent, type KeyboardEvent, type ReactNode, useState } from 'react'
import { ERROR_MESSAGES } from '@/constants'
import { useTheme } from '@/context/ThemeProvider'
import { ChatComposerSkeleton, ChatPanelSkeleton } from '@/components/loading/panels/ChatPanelSkeleton'
import {
  ChatHeaderIcon,
  ComposerIcon,
  IconButton,
  MessageBubble,
} from '@/components/ui'
import type { Conversation, Message } from '@/types'

interface ChatPanelProps {
  conversation: Conversation | null
  messages: Message[]
  isLoading: boolean
  isSending: boolean
  onSend: (body: string) => Promise<void>
  onBack?: () => void
  onOpenDetails?: () => void
}

function ChatHeaderButton({
  label,
  children,
  dark = false,
  onClick,
  isActive = false,
}: {
  label: string
  children: ReactNode
  dark?: boolean
  onClick?: () => void
  isActive?: boolean
}) {
  return (
    <IconButton
      label={label}
      onClick={onClick}
      isActive={isActive}
      className={`chat-header-button ${dark ? 'chat-header-button--dark' : ''} ${isActive ? 'chat-header-button--active' : ''}`}
    >
      {children}
    </IconButton>
  )
}

function ComposerToolButton({
  label,
  children,
  onClick,
}: {
  label: string
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <IconButton
      label={label}
      onClick={onClick}
      className="chat-composer-tool-button"
    >
      {children}
    </IconButton>
  )
}

export function ChatPanel({
  conversation,
  messages,
  isLoading,
  isSending,
  onSend,
  onBack,
  onOpenDetails,
}: ChatPanelProps) {
  const [draft, setDraft] = useState('')
  const { theme, toggleTheme } = useTheme()

  if (!conversation && isLoading) {
    return (
      <section className="dashboard-panel chat-panel flex h-full min-w-0 flex-1 flex-col">
        <header className="chat-panel-header">
          <SkeletonTitle />
          <HeaderActionsPlaceholder />
        </header>
        <div className="chat-panel-messages scrollbar-thin">
          <ChatPanelSkeleton />
        </div>
        <div className="chat-panel-composer-form">
          <ChatComposerSkeleton />
        </div>
      </section>
    )
  }

  if (!conversation) {
    return (
      <section className="dashboard-panel dashboard-empty-state flex h-full flex-1 items-center justify-center text-[13px]">
        {ERROR_MESSAGES.selectConversation}
      </section>
    )
  }

  async function submitDraft() {
    if (!draft.trim() || isSending) return

    const value = draft
    setDraft('')
    await onSend(value)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    await submitDraft()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void submitDraft()
    }
  }

  return (
    <section className="dashboard-panel chat-panel flex h-full min-w-0 flex-1 flex-col">
      <header className="chat-panel-header">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="chat-panel-back-button mr-1 flex h-8 w-8 items-center justify-center rounded-lg lg:hidden"
              aria-label="Back to conversations"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          <h3 className="chat-panel-title truncate">{conversation.name}</h3>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {onOpenDetails && (
            <ChatHeaderButton label="View contact details" onClick={onOpenDetails}>
              <svg
                className="chat-header-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </ChatHeaderButton>
          )}
          <ChatHeaderButton label="More options">
            <ChatHeaderIcon name="menu-dots" />
          </ChatHeaderButton>
          <ChatHeaderButton label="Toggle dark mode" onClick={toggleTheme} isActive={theme === 'dark'}>
            <ChatHeaderIcon name="moon" />
          </ChatHeaderButton>
          <ChatHeaderButton label="Archive conversation" dark>
            <ChatHeaderIcon name="archive" />
          </ChatHeaderButton>
        </div>
      </header>

      <div className="chat-panel-messages scrollbar-thin">
        {isLoading ? (
          <ChatPanelSkeleton />
        ) : (
          <>
            <div className="chat-date-separator">28 August 2025</div>
            <div className="chat-message-list">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="chat-panel-composer-form">
        {isLoading ? (
          <ChatComposerSkeleton />
        ) : (
        <div className="chat-composer">
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type something...."
            rows={2}
            className="chat-composer-input"
          />

          <div className="chat-composer-toolbar">
            <div className="flex items-center gap-0.5">
              <ComposerToolButton label="Add image">
                <ComposerIcon name="image" />
              </ComposerToolButton>
              <ComposerToolButton label="Add video">
                <ComposerIcon name="video" />
              </ComposerToolButton>
              <ComposerToolButton label="Add document">
                <ComposerIcon name="document" />
              </ComposerToolButton>
              <ComposerToolButton label="Add emoji">
                <ComposerIcon name="emoji" />
              </ComposerToolButton>
              <ComposerToolButton label="Undo">
                <ComposerIcon name="undo" />
              </ComposerToolButton>
            </div>

            <div className="flex items-center gap-0.5">
              <ComposerToolButton label="Quick actions">
                <ComposerIcon name="lightning" />
              </ComposerToolButton>
              <ComposerToolButton
                label="Send message"
                onClick={() => void submitDraft()}
              >
                <ComposerIcon name="microphone" />
              </ComposerToolButton>
            </div>
          </div>
        </div>
        )}
      </form>
    </section>
  )
}

function SkeletonTitle() {
  return <div className="chat-panel-title-skeleton skeleton-shimmer h-2.5 w-24 rounded" aria-hidden />
}

function HeaderActionsPlaceholder() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      <div className="chat-header-button skeleton-shimmer opacity-60" />
      <div className="chat-header-button skeleton-shimmer opacity-60" />
      <div className="chat-header-button chat-header-button--dark skeleton-shimmer opacity-60" />
    </div>
  )
}
