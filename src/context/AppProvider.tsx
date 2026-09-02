import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useAppData } from '../hooks/useAppData'
import { useLoadingPhase, type LoadingPhase } from '../hooks/useLoadingPhase'
import type {
  Conversation,
  DummyUser,
  Message,
  SidebarUser,
} from '../types'

interface AppContextValue {
  phase: LoadingPhase
  isBootstrapping: boolean
  isDataReady: boolean
  honeycombCycleDone: boolean
  setHoneycombCycleDone: (done: boolean) => void
  showMobileChat: boolean
  setShowMobileChat: (show: boolean) => void
  conversations: Conversation[]
  sidebarUsers: SidebarUser[]
  isLoadingSidebarUsers: boolean
  isLoadingConversations: boolean
  selectedId: number | null
  selectedConversation: Conversation | null
  messages: Message[]
  userDetails: DummyUser | null
  searchQuery: string
  setSearchQuery: (value: string) => void
  setSelectedId: (id: number) => void
  handleSendMessage: (body: string) => Promise<void>
  error: string | null
  isLoadingMessages: boolean
  isLoadingUserDetails: boolean
  isSending: boolean
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [showMobileChat, setShowMobileChat] = useState(false)
  const [honeycombCycleDone, setHoneycombCycleDone] = useState(false)

  const {
    isBootstrapping,
    isDataReady,
    conversations,
    sidebarUsers,
    isLoadingSidebarUsers,
    isLoadingConversations,
    selectedId,
    selectedConversation,
    messages,
    userDetails,
    searchQuery,
    setSearchQuery,
    setSelectedId,
    handleSendMessage,
    error,
    isLoadingMessages,
    isLoadingUserDetails,
    isSending,
  } = useAppData()

  const phase = useLoadingPhase(isBootstrapping, honeycombCycleDone)

  const value = useMemo<AppContextValue>(
    () => ({
      phase,
      isBootstrapping,
      isDataReady,
      honeycombCycleDone,
      setHoneycombCycleDone,
      showMobileChat,
      setShowMobileChat,
      conversations,
      sidebarUsers,
      isLoadingSidebarUsers,
      isLoadingConversations,
      selectedId,
      selectedConversation,
      messages,
      userDetails,
      searchQuery,
      setSearchQuery,
      setSelectedId,
      handleSendMessage,
      error,
      isLoadingMessages,
      isLoadingUserDetails,
      isSending,
    }),
    [
      phase,
      isBootstrapping,
      isDataReady,
      honeycombCycleDone,
      showMobileChat,
      conversations,
      sidebarUsers,
      isLoadingSidebarUsers,
      isLoadingConversations,
      selectedId,
      selectedConversation,
      messages,
      userDetails,
      searchQuery,
      setSearchQuery,
      setSelectedId,
      handleSendMessage,
      error,
      isLoadingMessages,
      isLoadingUserDetails,
      isSending,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }

  return context
}
