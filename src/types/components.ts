import type {
  Conversation,
  DummyUser,
  Message,
  SidebarUser,
} from './inbox'

export interface InboxDashboardProps {
  conversations: Conversation[]
  sidebarUsers: SidebarUser[]
  isLoadingSidebarUsers: boolean
  isLoadingConversations: boolean
  selectedId: number | null
  selectedConversation: Conversation | null
  messages: Message[]
  userDetails: DummyUser | null
  searchQuery: string
  onSearchChange: (value: string) => void
  onSelect: (id: number) => void
  onSend: (body: string) => Promise<void>
  error?: string | null
  isLoadingMessages: boolean
  isLoadingUserDetails: boolean
  isSending: boolean
  showMobileChat: boolean
  onShowMobileChat: (show: boolean) => void
  className?: string
}
