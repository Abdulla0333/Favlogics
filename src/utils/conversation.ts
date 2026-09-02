import { CONVERSATION_TIMESTAMPS } from '@/constants'

export function getConversationTimestampOrder(timestamp: string): number {
  const normalized =
    timestamp.toLowerCase() === 'yesterday' ? 'Yesterday' : timestamp
  const index = CONVERSATION_TIMESTAMPS.indexOf(
    normalized as (typeof CONVERSATION_TIMESTAMPS)[number],
  )

  return index >= 0 ? index : CONVERSATION_TIMESTAMPS.length
}

export function formatConversationTimestamp(timestamp: string): string {
  if (timestamp.toLowerCase() === 'yesterday') {
    return 'Yesterday'
  }

  return timestamp
}
