import { useMemo } from 'react'
import { useAppContext } from '../context/AppProvider'
import type { InboxDashboardProps } from '../types'

export function useInboxDashboardProps(): InboxDashboardProps {
  const {
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
    showMobileChat,
    setShowMobileChat,
  } = useAppContext()

  return useMemo(
    () => ({
      conversations,
      sidebarUsers,
      isLoadingSidebarUsers,
      isLoadingConversations,
      selectedId,
      selectedConversation,
      messages,
      userDetails,
      searchQuery,
      onSearchChange: setSearchQuery,
      onSelect: setSelectedId,
      onSend: handleSendMessage,
      error,
      isLoadingMessages,
      isLoadingUserDetails,
      isSending,
      showMobileChat,
      onShowMobileChat: setShowMobileChat,
    }),
    [
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
      showMobileChat,
      setShowMobileChat,
    ],
  )
}
