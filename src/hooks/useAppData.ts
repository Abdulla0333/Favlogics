import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { ERROR_MESSAGES } from '../constants'
import { sendMessage, waitForBootstrap } from '../services/api'
import type { Message } from '../types'
import { getBootstrapDelayMs, getErrorMessage } from '../utils'
import {
  queryKeys,
  useConversationsQuery,
  useMessagesQuery,
  useSidebarUsersQuery,
  useUserDetailsQuery,
} from './queries'

export function useAppData() {
  const queryClient = useQueryClient()
  const [minDelayDone, setMinDelayDone] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)

  const sidebarUsersQuery = useSidebarUsersQuery()
  const conversationsQuery = useConversationsQuery()
  const messagesQuery = useMessagesQuery(selectedId)
  const userDetailsQuery = useUserDetailsQuery(selectedId)

  useEffect(() => {
    let cancelled = false

    void waitForBootstrap(getBootstrapDelayMs()).then(() => {
      if (!cancelled) setMinDelayDone(true)
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const list = conversationsQuery.data
    if (!list?.length || selectedId !== null) return
    setSelectedId(list[0].id)
  }, [conversationsQuery.data, selectedId])

  const conversations = conversationsQuery.data ?? []
  const messages = messagesQuery.data ?? []
  const userDetails = userDetailsQuery.data ?? null

  const isLoadingSidebarUsers = sidebarUsersQuery.isPending
  const isLoadingConversations = conversationsQuery.isPending
  const isLoadingMessages = selectedId !== null && messagesQuery.isPending
  const isLoadingUserDetails = selectedId !== null && userDetailsQuery.isPending

  const isDataReady = minDelayDone
  const isBootstrapping = !minDelayDone

  const queryError =
    sidebarUsersQuery.error ??
    conversationsQuery.error ??
    messagesQuery.error ??
    userDetailsQuery.error

  const error =
    sendError ?? (queryError ? getErrorMessage(queryError) : null)

  const handleSendMessage = useCallback(
    async (body: string) => {
      if (!selectedId || !body.trim()) return

      setIsSending(true)
      setSendError(null)
      try {
        const newMessage = await sendMessage(selectedId, body.trim())
        queryClient.setQueryData<Message[]>(
          queryKeys.messages(selectedId),
          (current) => [...(current ?? []), newMessage],
        )
      } catch {
        setSendError(ERROR_MESSAGES.sendMessage)
      } finally {
        setIsSending(false)
      }
    },
    [queryClient, selectedId],
  )

  const filteredConversations = conversations.filter((conversation) => {
    const query = searchQuery.toLowerCase()
    return (
      conversation.name.toLowerCase().includes(query) ||
      conversation.preview.toLowerCase().includes(query) ||
      conversation.company.toLowerCase().includes(query)
    )
  })

  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedId) ??
    null

  return {
    isBootstrapping,
    isDataReady,
    conversations: filteredConversations,
    sidebarUsers: sidebarUsersQuery.data ?? [],
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
  }
}
